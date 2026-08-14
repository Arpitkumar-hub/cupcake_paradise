import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { getProducts } from "../../api/productApi";
import { getOrders } from "../../api/orderApi";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [productsData, ordersData] = await Promise.all([
        getProducts(),
        getOrders(),
      ]);

      setProducts(productsData);
      setOrders(ordersData);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Total products
  const totalProducts = products.length;

  // Total orders
  const totalOrders = orders.length;

  // Paid orders
  const paidOrders = orders.filter(
    (order) =>
      order.paymentStatus === "Paid" ||
      order.status === "Paid"
  );

  // Pending orders
  const pendingOrders = orders.filter(
    (order) =>
      order.paymentStatus !== "Paid" &&
      order.status !== "Paid"
  );

  // Revenue from successful payments
  const revenue = paidOrders.reduce(
    (total, order) => total + Number(order.totalPrice || 0),
    0
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">

        {/* Header */}
        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Cupcake Paradise Admin
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your bakery business
            </p>
          </div>

          <button
            onClick={fetchDashboardData}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            ↻ Refresh
          </button>

        </header>

        {/* Dashboard */}
        <main className="p-8">

          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Dashboard Overview
          </h2>

          {loading ? (
            <div className="bg-white rounded-xl shadow p-10 text-center">
              <p className="text-xl text-pink-500 font-semibold">
                Loading dashboard...
              </p>
            </div>
          ) : (
            <>
              {/* Main Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {/* Products */}
                <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-pink-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-gray-500 text-lg">
                        Products
                      </h3>

                      <p className="text-4xl font-bold text-gray-800 mt-3">
                        {totalProducts}
                      </p>
                    </div>

                    <div className="text-4xl">
                      🧁
                    </div>
                  </div>
                </div>

                {/* Orders */}
                <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-gray-500 text-lg">
                        Total Orders
                      </h3>

                      <p className="text-4xl font-bold text-gray-800 mt-3">
                        {totalOrders}
                      </p>
                    </div>

                    <div className="text-4xl">
                      📦
                    </div>
                  </div>
                </div>

                {/* Revenue */}
                <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-gray-500 text-lg">
                        Revenue
                      </h3>

                      <p className="text-4xl font-bold text-gray-800 mt-3">
                        ₹{revenue}
                      </p>
                    </div>

                    <div className="text-4xl">
                      💰
                    </div>
                  </div>
                </div>

                {/* Pending */}
                <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-yellow-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-gray-500 text-lg">
                        Pending Orders
                      </h3>

                      <p className="text-4xl font-bold text-gray-800 mt-3">
                        {pendingOrders.length}
                      </p>
                    </div>

                    <div className="text-4xl">
                      ⏳
                    </div>
                  </div>
                </div>

              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-2xl font-semibold">
                    Recent Orders
                  </h2>

                  <span className="text-gray-500">
                    Latest {Math.min(5, orders.length)}
                  </span>

                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No orders yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                      <thead>
                        <tr className="bg-pink-500 text-white">

                          <th className="p-3 text-left">
                            Customer
                          </th>

                          <th className="p-3 text-left">
                            Total
                          </th>

                          <th className="p-3 text-left">
                            Payment
                          </th>

                          <th className="p-3 text-left">
                            Status
                          </th>

                        </tr>
                      </thead>

                      <tbody>

                        {orders
                          .slice(0, 5)
                          .map((order) => {

                            const isPaid =
                              order.paymentStatus === "Paid" ||
                              order.status === "Paid";

                            return (
                              <tr
                                key={order._id}
                                className="border-b hover:bg-gray-50"
                              >

                                <td className="p-3">
                                  {order.customer?.name || "Unknown"}
                                </td>

                                <td className="p-3 font-semibold">
                                  ₹{order.totalPrice || 0}
                                </td>

                                <td className="p-3">

                                  <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                      isPaid
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                                  >
                                    {isPaid ? "Paid" : "Pending"}
                                  </span>

                                </td>

                                <td className="p-3">
                                  {order.status || "Pending"}
                                </td>

                              </tr>
                            );
                          })}

                      </tbody>

                    </table>

                  </div>
                )}

              </div>

            </>
          )}

        </main>

      </div>
    </div>
  );
}

export default Dashboard;