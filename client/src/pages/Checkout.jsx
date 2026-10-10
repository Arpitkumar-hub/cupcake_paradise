
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/orderApi";
import {
  createPaymentOrder,
  verifyPayment,
} from "../api/paymentApi";

function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCustomer((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  // Load Razorpay Checkout SDK
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => resolve(!!window.Razorpay);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });

  const handlePlaceOrder = async () => {
    if (loading) return;

    const cleanCustomer = {
      name: customer.name.trim(),
      email: customer.email.trim(),
      phone: customer.phone.trim(),
      address: customer.address.trim(),
    };

    if (
      !cleanCustomer.name ||
      !cleanCustomer.email ||
      !cleanCustomer.phone ||
      !cleanCustomer.address
    ) {
      alert("Please fill in all customer details.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanCustomer.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (cart.length === 0 || !Number.isFinite(Number(totalPrice)) || Number(totalPrice) <= 0) {
      alert("Your cart is empty or the total amount is invalid.");
      return;
    }

    // Vite exposes this variable only if configured during frontend build.
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID?.trim();

    if (!razorpayKey) {
      alert(
        "Razorpay Key ID is missing. Add VITE_RAZORPAY_KEY_ID in Render frontend Environment and redeploy."
      );
      return;
    }

    try {
      setLoading(true);

      const sdkLoaded = await loadRazorpayScript();

      if (!sdkLoaded) {
        throw new Error("Unable to load Razorpay Checkout. Please try again.");
      }

      // Ask backend to create a Razorpay order.
      const paymentResponse = await createPaymentOrder(Number(totalPrice));

      if (
        !paymentResponse?.success ||
        !paymentResponse?.order?.id ||
        !paymentResponse?.order?.amount
      ) {
        throw new Error(
          paymentResponse?.message || "The payment order could not be created."
        );
      }

      const paymentOrder = paymentResponse.order;

      const options = {
        key: razorpayKey,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency || "INR",
        name: "Cupcake Paradise",
        description: "Cupcake Paradise Order",
        order_id: paymentOrder.id,

        prefill: {
          name: cleanCustomer.name,
          email: cleanCustomer.email,
          contact: cleanCustomer.phone,
        },

        notes: {
          delivery_address: cleanCustomer.address,
        },

        theme: {
          color: "#ec4899",
        },

        handler: async (paymentResult) => {
          try {
            // Verify payment signature through the backend.
            const verification = await verifyPayment({
              razorpay_order_id: paymentResult.razorpay_order_id,
              razorpay_payment_id: paymentResult.razorpay_payment_id,
              razorpay_signature: paymentResult.razorpay_signature,
            });

            if (!verification?.success) {
              throw new Error("Payment verification failed.");
            }

            // Create the store order only after verification succeeds.
            const orderData = {
              customer: cleanCustomer,
              items: cart.map((item) => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
              })),
              totalPrice: Number(totalPrice),
              paymentId: paymentResult.razorpay_payment_id,
              paymentOrderId: paymentResult.razorpay_order_id,
              paymentStatus: "Paid",
            };

            await createOrder(orderData);

            clearCart();
            alert("Payment successful! Your order has been placed.");
            navigate("/success");
          } catch (error) {
            console.error("Payment verification/order error:", error);

            alert(
              "We could not confirm order placement. If money was deducted, please contact support before attempting another payment."
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const checkout = new window.Razorpay(options);

      checkout.on("payment.failed", (event) => {
        console.error("Razorpay payment failed:", event.error);

        alert(
          event.error?.description ||
            "Payment failed. Please try again."
        );

        setLoading(false);
      });

      checkout.open();
    } catch (error) {
      console.error("Checkout initialization error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to start payment. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-6">
      <div className="max-w-5xl mx-auto rounded-3xl bg-white p-6 shadow-xl md:p-10">
        <h1 className="mb-10 text-center text-4xl font-bold text-pink-600">
          Checkout
        </h1>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Customer Details */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">
              Customer Details
            </h2>

            <form
              id="checkout-form"
              onSubmit={(e) => {
                e.preventDefault();
                handlePlaceOrder();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                autoComplete="name"
                value={customer.name}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                autoComplete="email"
                value={customer.email}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                autoComplete="tel"
                value={customer.phone}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
                required
              />

              <textarea
                name="address"
                placeholder="Delivery Address"
                autoComplete="street-address"
                value={customer.address}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-lg border p-3"
                required
              />
            </form>
          </section>

          {/* Order Summary */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">
              Order Summary
            </h2>

            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between gap-4 border-b py-3"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-bold">
                  ₹{Number(item.price) * Number(item.quantity)}
                </p>
              </div>
            ))}

            <div className="mt-8 flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={loading || cart.length === 0}
              className="mt-8 w-full rounded-full bg-pink-500 py-4 text-lg font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading
                ? "Processing Payment..."
                : `Pay ₹${totalPrice}`}
            </button>

            <p className="mt-4 text-center text-sm text-gray-500">
              Your payment is processed securely through Razorpay.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
