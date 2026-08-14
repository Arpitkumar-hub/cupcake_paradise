import about from "../assets/about.png";

function About() {
  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src={about}
              alt="About Cupcake Paradise"
              className="rounded-3xl shadow-2xl w-full max-w-md hover:scale-105 transition duration-500"
            />
          </div>

          {/* Right Content */}
          <div>

            <span className="uppercase tracking-[5px] text-pink-500 font-semibold">
              About Us
            </span>

            <h2 className="text-5xl font-bold text-gray-800 mt-4">
              Crafted with Love,
              <br />
              Baked to Perfection
            </h2>

            <p className="text-gray-600 leading-8 mt-6 text-lg">
              At Cupcake Paradise, every cupcake is handcrafted using premium
              ingredients and baked fresh daily. Our mission is to make every
              celebration sweeter with unforgettable flavors and beautiful
              designs.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <div className="bg-pink-50 rounded-2xl p-6 text-center">
                <h3 className="text-4xl font-bold text-pink-500">10+</h3>
                <p className="text-gray-600 mt-2">Years Experience</p>
              </div>

              <div className="bg-pink-50 rounded-2xl p-6 text-center">
                <h3 className="text-4xl font-bold text-pink-500">5000+</h3>
                <p className="text-gray-600 mt-2">Happy Customers</p>
              </div>

              <div className="bg-pink-50 rounded-2xl p-6 text-center">
                <h3 className="text-4xl font-bold text-pink-500">25+</h3>
                <p className="text-gray-600 mt-2">Cupcake Flavors</p>
              </div>

              <div className="bg-pink-50 rounded-2xl p-6 text-center">
                <h3 className="text-4xl font-bold text-pink-500">100%</h3>
                <p className="text-gray-600 mt-2">Fresh Daily</p>
              </div>

            </div>

            <button className="mt-10 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-semibold transition">
              Read Our Story
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;