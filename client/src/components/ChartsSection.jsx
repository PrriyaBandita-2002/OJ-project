// src/components/ChartsSection.jsx
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#34d399', '#fbbf24', '#f87171']; // Easy, Medium, Hard colors

const ChartsSection = ({ difficultyStats, submissionsOverTime }) => {
  const pieData = [
    { name: 'Easy', value: difficultyStats.Easy || 0 },
    { name: 'Medium', value: difficultyStats.Medium || 0 },
    { name: 'Hard', value: difficultyStats.Hard || 0 },
  ];

  const barData = submissionsOverTime.map((entry) => ({
    date: entry._id,
    submissions: entry.count,
  }));

  return (
    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
      {/* Pie Chart - Difficulty-wise Solved */}
      <div className="p-4 bg-white shadow rounded-2xl">
        <h3 className="mb-4 text-lg font-semibold">Problems Solved by Difficulty</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Submissions Over Time */}
      <div className="p-4 bg-white shadow rounded-2xl">
        <h3 className="mb-4 text-lg font-semibold">Submissions Over Last 30 Days</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />

            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="submissions" fill="#60a5fa" name="Submissions" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
