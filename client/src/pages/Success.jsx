import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">

      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">

        <h1 className="text-5xl mb-4">🎉</h1>

        <h2 className="text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h2>

        <p className="mt-4 text-gray-600">
          Thank you for choosing Cupcake Paradise.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full"
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  );
}

export default Success;