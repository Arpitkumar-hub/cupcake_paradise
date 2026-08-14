import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, Heart, ShoppingCart, Star } from "lucide-react";
import { getProducts } from "../api/productApi";
import { useCart } from "../context/CartContext";

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
  "Chocolate biscoff": chocolate,
};

function Menu() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];

  const filteredItems = products.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    const searchMatch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-pink-500">
          Loading Cupcakes...
        </h1>
      </div>
    );
  }

  return (
    <section
      id="menu"
      className="pt-32 pb-24 bg-gradient-to-b from-pink-50 via-white to-rose-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[5px] text-pink-500 font-semibold">
            Our Menu
          </span>

          <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mt-4">
            Delicious Cupcakes
          </h2>

          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">
            Freshly baked every day using premium ingredients. Find your
            favorite cupcake below.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto relative mb-12">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search cupcakes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-5 py-4 rounded-full border border-pink-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? "bg-pink-500 text-white"
                  : "bg-white text-gray-700 hover:bg-pink-500 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {filteredItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col"
            >
              <div className="relative h-72 bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">

                <button className="absolute top-4 right-4 bg-white rounded-full p-3 shadow">
                  <Heart size={20} />
                </button>

                <img
                  src={imageMap[item.name]}
                  alt={item.name}
                  className="w-52 h-52 object-contain hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">         
                       <span className="inline-block w-fit mx-auto px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-medium mb-4">
                  {item.category}
                </span>

                <h3 className="text-2xl font-bold text-gray-800 text-center">
                  {item.name}
                </h3>

                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(Math.round(item.rating || 5))].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-center text-gray-500 mt-4 text-sm">
                  {item.description}
                </p>

                <div className="mt-auto pt-6">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-3xl font-bold text-pink-600">
                      ₹{item.price}
                    </span>

                    <span
                      className={`text-sm font-semibold ${
                        item.stock > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    disabled={item.stock === 0}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;