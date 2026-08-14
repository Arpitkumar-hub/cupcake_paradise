import gallery1 from "../assets/gallery/gallery1.jpg";
import gallery2 from "../assets/gallery/gallery2.jpg";
import gallery3 from "../assets/gallery/gallery3.jpg";
import gallery4 from "../assets/gallery/gallery4.jpg";
import gallery5 from "../assets/gallery/gallery5.jpg";
import gallery6 from "../assets/gallery/gallery6.jpg";
import gallery7 from "../assets/gallery/gallery7.jpg";
import gallery8 from "../assets/gallery/gallery8.jpg";

const images = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
];

function Gallery() {
  return (
<section id="gallery" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-pink-500 font-semibold">
            Gallery
          </span>

          <h2 className="text-5xl font-bold text-gray-800 mt-3">
            Sweet Moments
          </h2>

          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            Take a look at our handcrafted cupcakes, celebration cakes, and delicious bakery creations.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl shadow-lg group cursor-pointer"
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
          ))}

        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-semibold transition">
            Follow Us on Instagram
          </button>
        </div>

      </div>
    </section>
  );
}

export default Gallery;