// User Dashboard (/dashboard route)
// This is the landing page after login and should include:

//  Top Navigation or Sidebar:
//  Practice Problems – /problems

//  Contests – /contests

//  My Submissions – /submissions

//  My Profile – /profile

// Leaderboard – /leaderboard (optional)


//  Main Panel (Personal Overview)
// Questions Solved

// Performance Summary (accuracy, average time)

// Recent Activity (last 5 submissions)

// Contests Participated

// File: client/src/pages/Dashboard.jsx
// File: client/src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ListChecks,
  Trophy,
  User,
  Users,
  Plus,
  FileText,
} from 'lucide-react';

const Dashboard = ({ role = "admin" }) => {
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col w-64 p-4 space-y-4 text-white bg-gray-800">
        <h2 className="mb-6 text-xl font-bold">OJ Dashboard</h2>
        <Link to="/problems" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <ListChecks className="w-5 h-5" /> Problems
        </Link>
        <Link to="/contests" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <Trophy className="w-5 h-5" /> Contests
        </Link>
        <Link to="/profile" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <User className="w-5 h-5" /> My Profile
        </Link>
        <Link to="/submissions" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <FileText className="w-5 h-5" /> My Submissions
        </Link>

        {/* Admin-only options */}
        {role === "admin" && (
          <>
            <hr className="my-2 border-gray-600" />
            <Link to="/admin/users" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
              <Users className="w-5 h-5" /> Manage Users
            </Link>
          <Link to="/add-problem" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
  <Plus className="w-5 h-5" /> Add Problem
</Link>

          </>
        )}
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <h1 className="mb-6 text-2xl font-bold">Welcome, {role === "admin" ? "Admin" : "User"} </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">Questions Solved</h3>
            <p className="text-3xl font-bold text-green-600">-</p>
          </div>

          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">📈 Accuracy</h3>
            <p className="text-3xl font-bold text-blue-600">-</p>
          </div>

          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">Avg Time / Submission</h3>
            <p className="text-2xl">-</p>
          </div>

          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold"> Contests Participated</h3>
            <p className="text-2xl">3</p>
          </div>

          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold"> Total Submissions</h3>
            <p className="text-2xl">-</p>
          </div>

          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold"> Best Rank</h3>
            <p className="text-2xl">-</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;