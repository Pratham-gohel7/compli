import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch("http://localhost:5001/api/employees/employees")
      .then((response) => response.json())
      .then((data) => setChartData(data))
      .catch((error) => console.error("Error fetching employee data:", error));
  }, []);

  return (
    <div className="right-content">
      <h1 className="text-3xl font-semibold">Welcome to CompliTrack</h1>

      {/* <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default Dashboard;
