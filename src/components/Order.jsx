import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { getOrderService } from '../services/adminService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// const orderStatus = [
//   { status: "Pending", count: 22 },
//   { status: "Cancelled", count: 4 },
//   { status: "Completed", count: 23 }
// ];

// const categoryData = [
//   { category: 'Electronics', count: 320 },
//   { category: 'Clothing', count: 255 },
//   { category: 'Footwear', count: 170 },
//   { category: 'Accessories', count: 315 }
// ];

// const orders = [
//     {
//       _id: "ORD001",
//       createdAt: "2024-04-01T15:30:00Z",
//       customerName: "User 003",
//       status: "Completed",
//       totalAmount: 2697
//     },
//     {
//       _id: "ORD002",
//       createdAt: "2024-04-02T11:00:00Z",
//       customerName: "User 001",
//       status: "Pending",
//       totalAmount: 1899
//     },
//     {
//       _id: "ORD003",
//       createdAt: "2024-04-03T10:00:00Z",
//       customerName: "User 002",
//       status: "Pending",
//       totalAmount: 2297
//     },
//     {
//       _id: "ORD004",
//       createdAt: "2024-04-04T09:30:00Z",
//       customerName: "User 004",
//       status: "Completed",
//       totalAmount: 2299
//     },
//     {
//       _id: "ORD005",
//       createdAt: "2024-04-05T16:15:00Z",
//       customerName: "User 005",
//       status: "Completed",
//       totalAmount: 6298
//     },
//     {
//       _id: "ORD006",
//       createdAt: "2024-04-06T13:20:00Z",
//       customerName: "User 006",
//       status: "Completed",
//       totalAmount: 1499
//     },
//     {
//       _id: "ORD007",
//       createdAt: "2024-04-07T10:10:00Z",
//       customerName: "User 007",
//       status: "Completed",
//       totalAmount: 1798
//     },
//     {
//       _id: "ORD008",
//       createdAt: "2024-04-08T17:30:00Z",
//       customerName: "User 008",
//       status: "Completed",
//       totalAmount: 2599
//     },
//     {
//       _id: "ORD009",
//       createdAt: "2024-04-09T13:40:00Z",
//       customerName: "User 009",
//       status: "Completed",
//       totalAmount: 1398
//     },
//     {
//       _id: "ORD010",
//       createdAt: "2024-04-10T11:15:00Z",
//       customerName: "User 001",
//       status: "Cancelled",
//       totalAmount: 999
//     }
//   ]
  


const ORDER_COLORS = ["#FACC15", "#EF4444", "#10B981"];
const CATEGORY_COLORS = ["#6366F1", "#3B82F6", "#F472B6", "#22D3EE"];


const Order = () => {

  const [orders, setOrders] = useState([]);
  const [bestCategory, setBestCategory] = useState([]);
  const [orderStatus, setOrderStatus] = useState([])
  const totalOrder = orderStatus.reduce((sum, item) => sum + item.count, 0);
  const navigate = useNavigate()

  useEffect(() => {
      const fetchData = async() => {
         try {
            const response = await getOrderService();
            if(response.success){
                
                setOrders(response.orders);
                setBestCategory(response.bestCategory);
                setOrderStatus(response.orderStatus)
            }
         } catch (error) {
            
         }
      }
      fetchData()
  },[]);


  const totalCategory = bestCategory.reduce((sum, item) => sum + item.count, 0);

  const dataWithPercentage = bestCategory.map(item => ({
    ...item,
    percent: ((item.count / totalCategory) * 100).toFixed(1)
  }));

  

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
                  <Cell key={index} fill={ORDER_COLORS[index % ORDER_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} orders`} labelFormatter={(label) => `Status: ${label}`} />
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
                label={({ category, percent }) =>
                  `${category} (${percent}%)`
                }
              >
                {dataWithPercentage.map((entry, index) => (
                  <Cell key={index} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${((value / totalCategory) * 100).toFixed(1)}%`, name]}
              />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>


      <div className="p-6 bg-gray-50 min-h-screen">
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
                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm 
                      ${order.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">₹{order.totalAmount}</td>
                <td className="px-6 py-4 text-center">
                  <button className="inline-flex cursor-pointer items-center gap-1 bg-blue-500 text-white px-3 py-1.5 text-xs rounded-md hover:bg-blue-600 transition"
                   onClick={() => navigate('/view-order', {state:{id:order._id}})}>
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Order;
