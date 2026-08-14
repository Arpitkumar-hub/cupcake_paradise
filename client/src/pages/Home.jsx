import Navbar from "../components/Navbar";
import hero from "../assets/cupcake.png";
import FeaturedCupcakes from "../components/FeaturedCupcakes";
import WhyChooseUs from "../components/WhyChooseUs";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import FadeIn from "../animations/FadeIn";
import Menu from "../components/Menu";

function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen pt-24 bg-gradient-to-r from-pink-50 to-rose-100 flex items-center"
      >
        <div className="max-w-7xl mx-auto w-full px-12 lg:px-20">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Side */}
            <motion.div
              className="pl-16 lg:pl-28"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full font-semibold mb-6">
                🧁 Fresh Today
              </span>

              <h1 className="text-5xl lg:text-6xl font-extrabold text-red-600 leading-tight">
                Freshly Baked
                <br />
                Cupcakes Made
                <br />
                With Love ❤️
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-8 max-w-md">
                Experience handcrafted cupcakes baked fresh every day using
                premium ingredients. Discover delicious flavors, beautiful
                designs, and unforgettable taste.
              </p>

              <div className="mt-8 flex gap-5">
                <button className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition">
                  Order Now
                </button>

                <button className="border-2 border-pink-500 text-pink-500 px-8 py-3 rounded-full hover:bg-pink-500 hover:text-white transition">
                  View Menu
                </button>
              </div>
            </motion.div>

            {/* Right Side */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.img
                src={hero}
                alt="Cupcakes"
                className="w-[520px] lg:w-[620px] object-contain drop-shadow-[0_25px_40px_rgba(236,72,153,0.35)]"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.05,
                }}
              />
            </motion.div>

          </div>

        </div>
      </section>

      <Menu />

     <FadeIn>
  <FeaturedCupcakes />
</FadeIn>

<FadeIn>
  <WhyChooseUs />
</FadeIn>

<FadeIn>
  <About />
</FadeIn>

<FadeIn>
  <Testimonials />
</FadeIn>

<FadeIn>
  <Gallery />
</FadeIn>

<FadeIn>
  <Contact />
</FadeIn>

<Footer />
    </>
  );
}

export default Home;