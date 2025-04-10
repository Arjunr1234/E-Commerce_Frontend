import React, { useContext, useEffect, useState } from "react";
import { Users, DollarSign } from "lucide-react";
import { COLORS } from "../utils/constants";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getRevenueService } from "../services/adminService";
import { useErrorHandler } from "../hooks/useErrorHandle";

function Dashboard() {
  const [monthyRevenue, setMonthlyRevenue] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const handleError = useErrorHandler();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRevenueService();
        if (response.success) {
          setMonthlyRevenue(response.monthlyRevenue);
          setTotalUsers(response.totalCustomers);
          setTotalRevenue(response.totalRevenue);
          setWeeklyData(response.weekelyRevenue);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between hover:scale-[1.02] transition-all duration-300">
          <div>
            <h2 className="text-gray-500 text-sm font-medium">Total Users</h2>
            <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
          </div>
          <div className="text-blue-600 text-3xl">👥</div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between hover:scale-[1.02] transition-all duration-300">
          <div>
            <h2 className="text-gray-500 text-sm font-medium">Total Revenue</h2>
            <p className="text-2xl font-bold text-gray-800">₹ {totalRevenue}</p>
          </div>
          <div className="text-green-600 text-3xl">💰</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Monthly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Weekly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
