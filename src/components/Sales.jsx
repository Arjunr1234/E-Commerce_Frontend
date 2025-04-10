import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useErrorHandler } from "../hooks/useErrorHandle";
import { reportServie } from "../services/adminService";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Sales() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());
  const [salesData, setSalesData] = useState([]);
  const handleError = useErrorHandler();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportServie(startDate, endDate);
        if (response.success) {
          setSalesData(response.salesData);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  const handleDownload = () => {
    if (salesData.length === 0) {
      toast.error("No data to export");
      return;
    }

    const formattedData = salesData.map((item) => ({
      Date: new Date(item.createdAt || item.date).toLocaleDateString("en-GB"),
      Customer: item.customerName || item.customer,
      Product: item.productName || item.product,
      Quantity: item.quantity,
      Price: item.productPrice || item.price,
      Subtotal: item.quantity * (item.productPrice || item.price),
    }));

    const total = formattedData.reduce((acc, row) => acc + row.Subtotal, 0);
    formattedData.push({
      Date: "",
      Customer: "",
      Product: "",
      Quantity: "",
      Price: "Total",
      Subtotal: total,
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "Sales_Report.xlsx");
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-3xl mx-auto mt-6 max-w-7xl">
      <h2 className="text-3xl mb-6 font-bold text-gray-800 text-center">
        📊 Sales Report
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col">
          <label
            htmlFor="startDate"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Select start date"
            className="w-full h-10 px-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="endDate"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Select end date"
            className="w-full h-10 px-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="flex items-end justify-end">
          <button
            onClick={handleDownload}
            className="px-5 cursor-pointer py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition duration-300 shadow-md"
          >
            ⬇️ Download
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-blue-50 text-gray-700 sticky top-0">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Quantity</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {salesData.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition duration-200 ease-in-out"
              >
                <td className="px-4 py-3 text-gray-800">
                  {new Date(item.createdAt || item.date).toLocaleDateString(
                    "en-GB"
                  )}
                </td>
                <td className="px-4 py-3 text-gray-800">
                  {item.customerName || item.customer}
                </td>
                <td className="px-4 py-3 text-gray-800">
                  {item.productName || item.product}
                </td>
                <td className="px-4 py-3 text-gray-800">{item.quantity}</td>
                <td className="px-4 py-3 text-gray-800">
                  ₹{item.productPrice || item.price}
                </td>
                <td className="px-4 py-3 text-gray-800 font-semibold">
                  ₹{item.quantity * (item.productPrice || item.price)}
                </td>
              </tr>
            ))}
            {salesData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No sales data available for the selected date range.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="bg-blue-100 font-semibold">
              <td colSpan="5" className="px-4 py-2 text-right text-gray-700">
                Total
              </td>
              <td className="px-4 py-2 text-gray-900">
                ₹
                {salesData.reduce(
                  (acc, item) =>
                    acc + item.quantity * (item.productPrice || item.price),
                  0
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Sales;
