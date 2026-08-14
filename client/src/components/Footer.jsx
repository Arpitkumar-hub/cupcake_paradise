import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-pink-600 text-white pt-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            🧁 Cupcake Paradise
          </h2>

          <p className="text-pink-100 leading-7">
            Crafting happiness one cupcake at a time with premium ingredients,
            handcrafted recipes, and unforgettable flavors.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-pink-100">
            <li>
              <a href="#home" className="hover:text-white transition">
                Home
              </a>
            </li>

            <li>
              <a href="#about" className="hover:text-white transition">
                About
              </a>
            </li>

            <li>
              <a href="#menu" className="hover:text-white transition">
                Menu
              </a>
            </li>

            <li>
              <a href="#gallery" className="hover:text-white transition">
                Gallery
              </a>
            </li>

            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-pink-100">

            <div className="flex items-center gap-3">
              <MapPin size={20} />
              <p>Dehradun, Uttarakhand</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={20} />
              <p>+91 9027500174</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={20} />
              <p>hello@cupcakeparadise.com</p>
            </div>

          </div>
        </div>

        {/* Social */}
        <div className="flex gap-5">
  <FaInstagram
    className="text-3xl cursor-pointer hover:text-pink-200 hover:scale-110 transition duration-300"
  />

  <FaFacebookF
    className="text-3xl cursor-pointer hover:text-pink-200 hover:scale-110 transition duration-300"
  />

  <FaYoutube
    className="text-3xl cursor-pointer hover:text-pink-200 hover:scale-110 transition duration-300"
  />
</div>

      </div>

      <div className="border-t border-pink-400 mt-12 py-6 text-center text-pink-100">
        © 2026 Cupcake Paradise. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;