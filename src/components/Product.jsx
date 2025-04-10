import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LabelList,
} from "recharts";
import { getProductService } from "../services/adminService";
import { useErrorHandler } from "../hooks/useErrorHandle";

function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handleError = useErrorHandler();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductService();
        if (response.success) {
          setProducts(response.products);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const topSellingProducts = [...products]
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5)
    .map((item) => ({
      ...item,
      revenue: item.totalSold * item.price,
    }));

  return (
    <div>
      <div className="w-full h-[400px] p-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Top-Selling Products</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topSellingProducts}
            margin={{ top: 20, right: 40, left: 10, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              yAxisId="left"
              label={{ value: "Quantity", angle: -90, position: "insideLeft" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "Revenue (₹)",
                angle: -90,
                position: "insideRight",
              }}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="totalSold"
              fill="#8884d8"
              name="Quantity Sold"
              yAxisId="left"
            >
              <LabelList dataKey="totalSold" position="top" />
            </Bar>
            <Bar
              dataKey="revenue"
              fill="#82ca9d"
              name="Revenue"
              yAxisId="right"
            >
              <LabelList dataKey="revenue" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 flex flex-col justify-center items-center ">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="mb-4 p-2 border  rounded-md w-full max-w-md"
        />

        <div className="overflow-x-auto shadow-md rounded-lg bg-white w-[100%]">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Price (₹)
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Total Sold
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-3">{product.name}</td>
                  <td className="px-6 py-3">{product.category}</td>
                  <td className="px-6 py-3">₹{product.price}</td>
                  <td className="px-6 py-3">{product.totalSold}</td>
                  <td className="px-6 py-3">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
