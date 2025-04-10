import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getOrderService } from "../services/adminService";
import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "../hooks/useErrorHandle";
import { ORDER_COLORS, CATEGORY_COLORS } from "../utils/constants";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [limit] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [bestCategory, setBestCategory] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const totalOrder = orderStatus.reduce((sum, item) => sum + item.count, 0);
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrderService();
        if (response.success) {
          setOrders(response.orders);
          setBestCategory(response.bestCategory);
          setOrderStatus(response.orderStatus);
          setTotalOrders(response.totalOrders);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrderService(
          currentPage,
          limit,
          search,
          status
        );
        if (response.success) {
          setOrders(response.orders);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, [search, status, currentPage]);

  const totalCategory = bestCategory.reduce((sum, item) => sum + item.count, 0);

  const dataWithPercentage = bestCategory.map((item) => ({
    ...item,
    percent: ((item.count / totalCategory) * 100).toFixed(1),
  }));

  const totalPages = Math.ceil(totalOrders / limit);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            🛒 Order Status
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={orderStatus}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                label={({ status, count }) =>
                  `${status} (${((count / totalOrder) * 100).toFixed(1)}%)`
                }
              >
                {orderStatus.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={ORDER_COLORS[index % ORDER_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value} orders`}
                labelFormatter={(label) => `Status: ${label}`}
              />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Best Ordered Category📦
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={dataWithPercentage}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label={({ category, percent }) => `${category} (${percent}%)`}
              >
                {dataWithPercentage.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `${((value / totalCategory) * 100).toFixed(1)}%`,
                  name,
                ]}
              />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 bg-gray-50 ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-64 px-4 py-2 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm font-semibold">
                <th className="px-6 py-4 text-left">Order Date</th>
                <th className="px-6 py-4 text-left">Customer Name</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Total</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className=" hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{order.customerName}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm 
                      ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ₹{order.totalAmount}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="inline-flex cursor-pointer items-center gap-1 bg-blue-500 text-white px-3 py-1.5 text-xs rounded-md hover:bg-blue-600 transition"
                      onClick={() =>
                        navigate("/view-order", { state: { id: order._id } })
                      }
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
