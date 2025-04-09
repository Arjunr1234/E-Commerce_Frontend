import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function Sales() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleGenerateReport = () => {
    if (startDate && endDate) {
      console.log('Generating report from', startDate, 'to', endDate)
      // Fetch report data here using startDate & endDate
    } else {
      alert('Please select both start and end dates')
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Sales Report</h2>

      <div className="flex flex-col gap-4 sm:flex-row mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1" htmlFor="startDate">
            Start Date
          </label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="p-2 h-10 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1" htmlFor="endDate">
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
            className="p-2 h-10 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleGenerateReport}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        Generate Report
      </button>

      <div className="mt-6">
        {/* You can display your report here */}
      </div>
    </div>
  )
}

export default Sales
