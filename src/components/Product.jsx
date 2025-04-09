import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LabelList
} from 'recharts';
import { getProductService } from '../services/adminService';
import { toast } from 'sonner';
import { handleError } from '../utils/errorHandler';
import { useAuth } from '../context/AuthContext';
import { useErrorHandler } from '../hooks/useErrorHandle';




function Product() {
    const {logout} = useAuth()
    const [products, setProduct] = useState([])
    const handleError = useErrorHandler()

    const topSellingProducts = products.slice(0, 5).map((item) => ({
        ...item,
        revenue: item.totalSold * item.price,
      }));

      useState(() => {
         const fetchData = async() => {
            try {
                const response = await getProductService();
                if(response.success){
                    setProduct(response.products)
                }
            } catch (error) {
                handleError(error)
            }
         }
         fetchData()
      },[])


  return (
    <div>
      <div className="w-full  h-[400px] p-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Top-Selling Products</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topSellingProducts}
            margin={{ top: 20, right: 40, left: 10, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={0} textAnchor="end" interval={0} />
            
           
            <YAxis yAxisId="left" label={{ value: "Quantity", angle: -90, position: 'insideLeft' }} />
           
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: "Revenue (₹)", angle: -90, position: 'insideRight' }}
            />

            <Tooltip />
            <Legend />
            
            {/* Quantity Sold Bar */}
            <Bar
              dataKey="totalSold"
              fill="#8884d8"
              name="Quantity Sold"
              yAxisId="left"
            >
              <LabelList dataKey="totalSold" position="top" />
            </Bar>

            {/* Revenue Bar */}
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

      <div className="p-4">
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Product Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Price (₹)</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Total Sold</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product, index) => (
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
    </div>
    </div>
  );
}

export default Product;
