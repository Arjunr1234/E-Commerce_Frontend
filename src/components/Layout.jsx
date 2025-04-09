import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaChartLine,
  FaSignOutAlt,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const Layout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  const confimLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        toast.success("Successfully logged out!");
      }
    });
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      {/* Mobile Header */}
      <div className="sm:hidden bg-white border-b border-gray-200 flex items-center justify-between p-4">
        <h1 className="text-2xl font-semibold text-gray-800">Let's Shop</h1>
        <div
          className="text-2xl cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "×" : "☰"}
        </div>
      </div>

      
      <div
        className={`w-full sm:w-1/5 bg-white text-gray-800 border-r border-gray-200 p-6 flex flex-col sm:block transition-transform duration-300 ${
          isSidebarOpen ? "block" : "hidden sm:block"
        }`}
      >
        <h1 className="text-2xl font-semibold mb-8 text-center text-gray-800">Admin Panel</h1>
        <ul className="space-y-4">
          {[
            { to: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
            { to: "/customers", icon: <FaUsers />, label: "Customers" },
            { to: "/products", icon: <FaBox />, label: "Products" },
            { to: "/orders", icon: <FaChartLine />, label: "Orders" },
            { to: "/report", icon: <FaFileInvoiceDollar />, label: "Report" },
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActiveRoute(to)
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{icon}</span>
                <span>{label}</span>
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={confimLogout}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-red-600 w-full"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-full sm:w-4/5 bg-gray-200 overflow-y-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
