import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { viewOrderService } from '../services/adminService';
import { toast } from 'sonner';

function ViewOrder() {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const orderId = location.state?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewOrderService(orderId);
        if (response.success) {
          setOrders(response.orderDetails);
        } else {
          toast.error("Failed to fetch order details");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    if (orderId) fetchData();
  }, [orderId]);

  const total = orders.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h1>

      {orders.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Subtotal</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-sm text-gray-800">{item.productName}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">₹{item.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">₹{item.price * item.quantity}</td>
                </tr>
              ))}
              <tr className="bg-blue-100">
                <td colSpan="3" className="px-6 py-4 text-right font-semibold text-gray-700">Total</td>
                <td className="px-6 py-4 font-bold text-gray-900">₹{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No order details found.</p>
      )}
    </div>
  );
}

export default ViewOrder;
