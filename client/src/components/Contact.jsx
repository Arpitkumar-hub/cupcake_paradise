import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

function Contact() {
  return (
    <section id="contact" className="py-28 bg-pink-50">
      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-pink-500 font-semibold">
            Contact Us
          </span>

          <h2 className="text-5xl font-bold text-gray-800 mt-3">
            Get In Touch
          </h2>

          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            We'd love to hear from you. Whether it's a custom order or a question,
            we're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 border rounded-xl mb-5 outline-none focus:border-pink-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 border rounded-xl mb-5 outline-none focus:border-pink-500"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-4 border rounded-xl mb-5 outline-none focus:border-pink-500"
            />

            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full p-4 border rounded-xl mb-5 outline-none focus:border-pink-500"
            />

            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-semibold transition">
              Send Message
            </button>

          </div>

          {/* Contact Info */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">

            <h3 className="text-3xl font-bold mb-8">
              Contact Information
            </h3>

            <div className="space-y-6 text-lg">

              <div className="space-y-6">

  <div className="flex items-center gap-4">
    <MapPin size={24} className="text-pink-500" />
    <p className="text-gray-700">
      Dehradun, Uttarakhand, India
    </p>
  </div>

  <div className="flex items-center gap-4">
    <Phone size={24} className="text-pink-500" />
    <p className="text-gray-700">
      +91 9027500174
    </p>
  </div>

  <div className="flex items-center gap-4">
    <Mail size={24} className="text-pink-500" />
    <p className="text-gray-700">
      hello@cupcakeparadise.com
    </p>
  </div>

  <div className="flex items-center gap-4">
    <Clock size={24} className="text-pink-500" />
    <p className="text-gray-700">
      Mon - Sun | 9:00 AM - 9:00 PM
    </p>
  </div>

</div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;