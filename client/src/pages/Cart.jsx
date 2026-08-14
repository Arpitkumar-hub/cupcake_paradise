import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-pink-500">
          🛒 Your Cart is Empty
        </h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-pink-50 py-28">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center mb-12">
          Shopping Cart
        </h1>

        <div className="space-y-6">

          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-lg p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-6">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-contain"
                />

                <div>
                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-pink-600 text-xl font-semibold mt-2">
                    ₹{item.price}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="w-10 h-10 rounded-full bg-gray-200"
                >
                  -
                </button>

                <span className="text-xl font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item._id)}
                  className="w-10 h-10 rounded-full bg-pink-500 text-white"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 ml-5"
                >
                  <Trash2 />
                </button>

              </div>
            </div>
          ))}

        </div>

        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8 text-right">

          <h2 className="text-3xl font-bold">
            Total : ₹{totalPrice}
          </h2>

          <button
  onClick={() => navigate("/checkout")}
  className="mt-6 bg-pink-500 text-white px-8 py-4 rounded-full text-lg hover:bg-pink-600"
>
  Proceed to Checkout
</button>

        </div>

      </div>
    </section>
  );
}

export default Cart;