import {
  Cake,
  Heart,
  Truck,
  Gift,
  Star,
  ChefHat,
  Wheat,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <Cake size={48} className="text-pink-500" />,
    title: "Freshly Baked Daily",
    description:
      "Every cupcake is baked fresh each day for the perfect taste and texture.",
  },
  {
    icon: <Wheat size={48} className="text-pink-500" />,
    title: "Premium Ingredients",
    description:
      "We use fresh dairy, Belgian chocolate, and the finest natural ingredients.",
  },
  {
    icon: <Heart size={48} className="text-pink-500 fill-pink-500" />,
    title: "Made with Love",
    description:
      "Every cupcake is handcrafted with passion and attention to every detail.",
  },
  {
    icon: <Truck size={48} className="text-pink-500" />,
    title: "Fast Delivery",
    description:
      "Fresh cupcakes delivered safely to your doorstep in premium packaging.",
  },
  {
    icon: <Gift size={48} className="text-pink-500" />,
    title: "Custom Designs",
    description:
      "Personalized cupcakes for birthdays, weddings, and special celebrations.",
  },
  {
    icon: <Star size={48} className="text-pink-500 fill-pink-500" />,
    title: "Top Rated",
    description:
      "Thousands of happy customers trust Cupcake Paradise for every occasion.",
  },
  {
    icon: <Sparkles size={48} className="text-pink-500" />,
    title: "Finest Chocolate",
    description:
      "Rich premium chocolate selected to create unforgettable flavors.",
  },
  {
    icon: <ChefHat size={48} className="text-pink-500" />,
    title: "Expert Bakers",
    description:
      "Our experienced pastry chefs craft every cupcake with perfection.",
  },
];

function WhyChooseUs() {
  return (
    <section id="why-us" className="py-28 bg-pink-50">
      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-pink-500 font-semibold">
            Why Choose Us
          </span>

          <h2 className="text-5xl font-bold text-gray-800 mt-3">
            Crafted with Passion,
            <br />
            Served with Love
          </h2>

          <p className="mt-5 text-gray-500 text-lg max-w-2xl mx-auto">
            Every cupcake is handcrafted with premium ingredients, baked fresh
            daily, and beautifully presented to create unforgettable moments.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-500 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;