import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getCustomerService } from '../services/adminService';
import { toast } from 'sonner';

// const customerData = [
//     { name: "John Doe", location: "New York" },
//     { name: "Jane Smith", location: "Kerala" },
//     { name: "Arjun Kumar", location: "Kerala" },
//     { name: "Nandhakrishnan", location: "Mumbai" },
//     { name: "Unni", location: "Kerala" },
//     { name: "Ashil siby", location: "Chennai" },
//     { name: "David Lee", location: "Mumbai" },
//     { name: "Fatima Noor", location: "Dubai" },
//     { name: "Chris Evans", location: "Delhi" },
//     { name: "Neha Sharma", location: "Delhi" }
//   ];

  const customers = [
    {
      _id: "6613a001f1a8a2a9c0a1a001",
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "9876543210",
      location: "New York",
      totalSpent: 1200
    },
    {
      _id: "6613a001f1a8a2a9c0a1a002",
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "8765432109",
      location: "California",
      totalSpent: 980
    },
    {
      _id: "6613a001f1a8a2a9c0a1a003",
      name: "Arjun Kumar",
      email: "arjunkumar@example.com",
      phone: "9876501234",
      location: "Kerala",
      totalSpent: 1500
    },
    {
      _id: "6613a001f1a8a2a9c0a1a004",
      name: "Sara Ali",
      email: "saraali@example.com",
      phone: "9988776655",
      location: "Mumbai",
      totalSpent: 720
    },
    {
      _id: "6613a001f1a8a2a9c0a1a005",
      name: "Mike Johnson",
      email: "mikejohnson@example.com",
      phone: "9001122334",
      location: "Texas",
      totalSpent: 1750
    },
    {
      _id: "6613a001f1a8a2a9c0a1a006",
      name: "Priya Nair",
      email: "priyanair@example.com",
      phone: "9445566778",
      location: "Chennai",
      totalSpent: 890
    },
    {
      _id: "6613a001f1a8a2a9c0a1a007",
      name: "David Lee",
      email: "davidlee@example.com",
      phone: "9334455667",
      location: "Chicago",
      totalSpent: 1320
    },
    {
      _id: "6613a001f1a8a2a9c0a1a008",
      name: "Fatima Noor",
      email: "fatimanoor@example.com",
      phone: "9887766554",
      location: "Dubai",
      totalSpent: 640
    }
  ];
  

  

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a52a2a", "#8a2be2", "#5f9ea0", "#d2691e", "#ff1493", "#228b22"];



function Customer() {

    const [customers, setCustomers] = useState([]);


    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await getCustomerService();
                if(response.success){
                    toast.success("success");
                    setCustomers(response.customers)
                }
            } catch (error) {
                
            }
        }
        fetchData()
    },[])


    const locationCounts = customers.reduce((acc, curr) => {
        acc[curr.location] = (acc[curr.location] || 0) + 1;
        return acc;
      }, {});
    
      const pieChartData = Object.entries(locationCounts).map(([location, count]) => ({
        name: location,
        value: count
      }));
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
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
    {customers.map((customer, index) => (
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
        <td className="p-3 font-semibold text-green-600">₹{customer.totalSpent}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  )
}

export default Customer
