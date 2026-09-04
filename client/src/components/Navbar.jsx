import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section[id]");

      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (
          window.scrollY >= top &&
          window.scrollY < top + height
        ) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl shadow-xl border-b border-pink-100"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          className="text-2xl lg:text-3xl font-bold text-pink-500"
        >
          🧁 Cupcake Paradise
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`transition duration-300 ${
                  active === link.href.substring(1)
                    ? "text-pink-500 font-bold"
                    : "text-gray-700 hover:text-pink-500"
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-5">

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart
              size={28}
              className="text-pink-500 hover:scale-110 transition"
            />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Button */}
          <a
            href="#contact"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition hover:scale-105"
          >
            Order Now
          </a>

        </div>

        {/* Mobile Right */}
        <div className="flex md:hidden items-center gap-4">

          <Link to="/cart" className="relative">
            <ShoppingCart size={28} className="text-pink-500" />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={30} className="text-pink-500" />
            ) : (
              <Menu size={30} className="text-pink-500" />
            )}
          </button>

        </div>

      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl shadow-lg">
          <ul className="flex flex-col items-center py-6 space-y-6">

            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg transition ${
                    active === link.href.substring(1)
                      ? "text-pink-500 font-bold"
                      : "text-gray-700 hover:text-pink-500"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold"
            >
              Order Now
            </a>

          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;