import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";

import chocolate from "../assets/cupcakes/chocolate.png";
import strawberry from "../assets/cupcakes/strawberry.png";
import vanilla from "../assets/cupcakes/vanilla.png";
import redvelvet from "../assets/cupcakes/redvelvet.png";
import blueberry from "../assets/cupcakes/blueberry.png";
import caramel from "../assets/cupcakes/caramel.png";

const imageMap = {
  "Classic Vanilla Cupcake": vanilla,
  "Chocolate Delight": chocolate,
  "Red Velvet": redvelvet,
  "Strawberry Bliss": strawberry,
  "Blueberry Dream": blueberry,
  "Caramel Crunch": caramel,
  "Chocolate biscoff": chocolate
};

function FeaturedCupcakes() {

  const [cupcakes, setCupcakes] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
console.log("Products:", data);
setCupcakes(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="menu" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-pink-500 font-semibold uppercase tracking-[4px]">
            Our Best Sellers
          </span>

          <h2 className="text-5xl font-bold text-gray-800 mt-3">
            Featured Cupcakes
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 text-center leading-8">
  Freshly baked every day with premium ingredients and handcrafted
  perfection. Find your favorite flavor.
</p>
        </div>

        {/* Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {cupcakes.map((cupcake) => (
              <div
                key={cupcake._id}
                className="w-[330px] bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden group"
              >

<div className="bg-gradient-to-br from-pink-50 to-rose-100 h-[300px] flex items-center justify-center">                 <img
  src={imageMap[cupcake.name]}
  alt={cupcake.name}
  className="w-52 h-52 object-contain"
/>
                </div>

                <div className="p-8 text-center">

                  <h3 className="text-2xl font-bold text-gray-800">
                    {cupcake.name}
                  </h3>

                  <p className="text-yellow-500 text-lg mt-2">
                    {"★".repeat(Math.round(cupcake.rating))}
                  </p>

                  <p className="text-3xl font-bold text-pink-600 mt-3">
                    ₹{cupcake.price}
                  </p>

                  <button className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-full font-semibold transition duration-300">
                    Order Now
                  </button>

                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}

export default FeaturedCupcakes;
