import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/admin/login");
  };

  return (
    <div className="w-64 bg-pink-500 text-white min-h-screen p-6 flex flex-col">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10">
        🧁 Cupcake Admin
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 flex-1">

        <Link
          to="/admin"
          className="hover:bg-pink-600 p-3 rounded-lg transition"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="hover:bg-pink-600 p-3 rounded-lg transition"
        >
          🧁 Products
        </Link>

        <Link
          to="/admin/orders"
          className="hover:bg-pink-600 p-3 rounded-lg transition"
        >
          📦 Orders
        </Link>

      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 hover:bg-red-600 transition p-3 rounded-lg font-semibold"
      >
        🚪 Logout
      </button>

    </div>
  );
}

export default Sidebar;