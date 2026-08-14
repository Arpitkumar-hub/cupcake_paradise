import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import {
  getOrders,
  updateOrderStatus,
} from "../../api/orderApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrders();

      setOrders(data);
    } catch (error) {
      console.error("Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (error) {
      console.error("Status Update Error:", error);

      alert("Failed to update order status.");
    }
  };

  const getPaymentBadge = (paymentStatus) => {
    if (paymentStatus === "Paid") {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
          Paid
        </span>
      );
    }

    if (paymentStatus === "Failed") {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
          Failed
        </span>
      );
    }

    return (
      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
        Pending
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-700",
      Processing: "bg-blue-100 text-blue-700",
      Shipped: "bg-purple-100 text-purple-700",
      Delivered: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          styles[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {status || "Pending"}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">

        {/* Header */}
        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Orders
            </h1>

            <p className="text-gray-500 mt-1">
              Manage customer orders and payments
            </p>
          </div>

          <button
            onClick={fetchOrders}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold"
          >
            ↻ Refresh
          </button>
        </header>

        <main className="p-8">

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">
                Total Orders
              </p>

              <p className="text-3xl font-bold mt-2">
                {orders.length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">
                Paid Orders
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {
                  orders.filter(
                    (order) =>
                      order.paymentStatus === "Paid"
                  ).length
                }
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">
                Revenue
              </p>

              <p className="text-3xl font-bold text-pink-600 mt-2">
                ₹
                {orders
                  .filter(
                    (order) =>
                      order.paymentStatus === "Paid"
                  )
                  .reduce(
                    (total, order) =>
                      total +
                      Number(order.totalPrice || 0),
                    0
                  )}
              </p>
            </div>

          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-semibold mb-6">
              Customer Orders
            </h2>

            {loading ? (
              <div className="text-center py-10">
                <p className="text-pink-500 font-semibold">
                  Loading orders...
                </p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No orders found.
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
                        Phone
                      </th>

                      <th className="p-3 text-left">
                        Total
                      </th>

                      <th className="p-3 text-left">
                        Payment
                      </th>

                      <th className="p-3 text-left">
                        Order Status
                      </th>

                      <th className="p-3 text-left">
                        Date
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {orders.map((order) => (

                      <tr
                        key={order._id}
                        className="border-b hover:bg-gray-50"
                      >

                        {/* Customer */}
                        <td className="p-3">

                          <div>
                            <p className="font-semibold">
                              {order.customer?.name || "Unknown"}
                            </p>

                            <p className="text-sm text-gray-500">
                              {order.customer?.email}
                            </p>
                          </div>

                        </td>

                        {/* Phone */}
                        <td className="p-3">
                          {order.customer?.phone}
                        </td>

                        {/* Total */}
                        <td className="p-3 font-bold">
                          ₹{order.totalPrice}
                        </td>

                        {/* Payment */}
                        <td className="p-3">
                          {getPaymentBadge(
                            order.paymentStatus
                          )}
                        </td>

                        {/* Order Status */}
                        <td className="p-3">

                          <div className="flex flex-col gap-2">

                            {getStatusBadge(order.status)}

                            <select
                              value={
                                order.status || "Pending"
                              }
                              onChange={(e) =>
                                handleStatusChange(
                                  order._id,
                                  e.target.value
                                )
                              }
                              className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                            >

                              <option value="Pending">
                                Pending
                              </option>

                              <option value="Processing">
                                Processing
                              </option>

                              <option value="Shipped">
                                Shipped
                              </option>

                              <option value="Delivered">
                                Delivered
                              </option>

                              <option value="Cancelled">
                                Cancelled
                              </option>

                            </select>

                          </div>

                        </td>

                        {/* Date */}
                        <td className="p-3 text-sm text-gray-500">
                          {order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>
            )}

          </div>

        </main>

      </div>
    </div>
  );
}

export default Orders;