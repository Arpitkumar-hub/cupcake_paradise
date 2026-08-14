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
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  // Load Razorpay Checkout
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    // Validate customer details
    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Check cart
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      // Load Razorpay
      const razorpayLoaded = await loadRazorpayScript();

      if (!razorpayLoaded) {
        alert("Razorpay failed to load.");
        setLoading(false);
        return;
      }

      // Create Razorpay order through backend
      const paymentResponse = await createPaymentOrder(totalPrice);

      if (!paymentResponse.success) {
        alert("Unable to create payment.");
        setLoading(false);
        return;
      }

      const razorpayOrder = paymentResponse.order;

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency: "INR",

        name: "Cupcake Paradise",

        description: "Cupcake Paradise Order",

        order_id: razorpayOrder.id,

        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },

        theme: {
          color: "#ec4899",
        },

        handler: async function (response) {
          try {
            // Verify payment
            const verification = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (!verification.success) {
              alert("Payment verification failed.");
              setLoading(false);
              return;
            }

            // Create order ONLY after successful payment
            const orderData = {
              customer,

              items: cart.map((item) => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
              })),

              totalPrice,

              paymentId: response.razorpay_payment_id,

              paymentOrderId: response.razorpay_order_id,

              paymentStatus: "Paid",
            };

            await createOrder(orderData);

            clearCart();

            alert("Payment successful! Order placed.");

            navigate("/success");
          } catch (error) {
            console.error("Payment verification error:", error);

            alert(
              "Payment was completed but order verification failed."
            );

            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      // Open Razorpay
      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);

        alert(
          response.error.description || "Payment failed. Please try again."
        );

        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);

      alert("Unable to start payment. Please try again.");

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Customer Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Customer Details
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customer.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mb-4"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mb-4"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mb-4"
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              value={customer.address}
              onChange={handleChange}
              rows="5"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b py-3"
              >
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-bold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

            <div className="flex justify-between text-2xl font-bold mt-8">
              <span>Total</span>

              <span>₹{totalPrice}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="mt-8 w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white py-4 rounded-full text-lg font-semibold transition"
            >
              {loading
                ? "Processing Payment..."
                : `💳 Pay ₹${totalPrice}`}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;