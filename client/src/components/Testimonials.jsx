const reviews = [
  {
    name: "Aakarsh tyagi",
    image: "👨",
    review:
      "The cupcakes were incredibly fresh, soft, and beautifully decorated. My family loved every bite!",
  },
  {
    name: "Ansh jaglan",
    image: "👨",
    review:
      "Amazing quality and quick delivery. The Red Velvet cupcake is my absolute favorite!",
  },
  {
    name: "Vishal tyagi",
    image: "👨",
    review:
      "Ordered for my birthday party and everyone kept asking where they came from. Highly recommended!",
  },
];

function Testimonials() {
  return (
   <section id="testimonials" className="py-28 bg-pink-50">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-pink-500 font-semibold">
            Testimonials
          </span>

          <h2 className="text-5xl font-bold text-gray-800 mt-3">
            What Our Customers Say
          </h2>

          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            Thousands of happy customers trust Cupcake Paradise for every celebration.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="text-6xl text-center">
                {review.image}
              </div>

              <div className="text-yellow-500 text-center mt-4 text-xl">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-600 text-center mt-6 leading-7">
                "{review.review}"
              </p>

              <h3 className="text-center font-bold text-xl mt-6">
                {review.name}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;