import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getCustomerService } from "../services/adminService";
import { useErrorHandler } from "../hooks/useErrorHandle";
import { COLORS } from "../utils/constants";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [customerLocation, setCustomerLocation] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);
  const handleError = useErrorHandler();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCustomerService();
        if (response.success) {
          setCustomers(response.customers);
          setCustomerLocation(response.customerLocation);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, []);

  const locationCounts = customerLocation.reduce((acc, curr) => {
    acc[curr.location] = (acc[curr.location] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(locationCounts).map(
    ([location, count]) => ({
      name: location,
      value: count,
    })
  );

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.toLowerCase().includes(search.toLowerCase()) ||
    customer.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + limit
  );

  return (
    <div>
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="p-6 rounded-2xl bg-white shadow-2xl w-full ">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Customer Distribution by Location
          </h2>
          <div className="flex justify-center">
            <PieChart width={400} height={300}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-6">
        <div className="bg-white shadow-md rounded-xl px-4 py-3 w-full flex justify-center ">
          <input
            type="text"
            placeholder="Search customers by name..."
            className="w-[300px] px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Total Spent</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {paginatedCustomers.map((customer, index) => (
            <tr
              key={customer._id}
              className={`hover:bg-blue-50 transition duration-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <td className="p-3">{customer.name}</td>
              <td className="p-3">{customer.email}</td>
              <td className="p-3">{customer.phone}</td>
              <td className="p-3">{customer.location}</td>
              <td className="p-3 font-semibold text-green-600">
                ₹{customer.totalSpent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-600 font-medium flex items-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Customer;
