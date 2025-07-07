import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ListChecks,
  Trophy,
  User,
  Users,
  Plus,
  FileText,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const AdminDashboard = () => {
    const navigate = useNavigate();

  // State for counts
  const [stats, setStats] = useState({
    users: 0,
    problems: 0,
    contests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, problemsRes, contestsRes] = await Promise.all([
          axios.get(`http://localhost:8000/api/auth/count`),
          axios.get(`${BASE_URL}/api/problems/count`),
          axios.get(`${BASE_URL}/api/contests/count`),
        ]);
        setStats({
          users: usersRes.data.count,
          problems: problemsRes.data.count,
          contests: contestsRes.data.count,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col w-64 p-4 space-y-4 text-white bg-gray-800">
        <h2 className="mb-6 text-xl font-bold">Admin Panel</h2>

        <Link to="/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <LayoutDashboard className="w-5 h-5" /> Overview
        </Link>

        <Link to="/ProblemsList" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <ListChecks className="w-5 h-5" /> Problems
        </Link>

        <Link to="/contests" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <Trophy className="w-5 h-5" /> Contests
        </Link>

        <Link to="/submissions" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <FileText className="w-5 h-5" /> Submissions
        </Link>

        <Link to="/profile" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <User className="w-5 h-5" /> My Profile
        </Link>

        {/* Admin Actions */}
        <hr className="my-2 border-gray-600" />

        <Link to="/add-problem" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <Plus className="w-5 h-5" /> Add Problem
        </Link>

        <Link to="/create-contest" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <Trophy className="w-5 h-5" /> Create Contest
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 mt-auto text-red-400 rounded hover:bg-gray-700"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <h1 className="mb-6 text-2xl font-bold">Welcome, Admin</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.users}</p>
          </div>

          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">Total Problems</h3>
            <p className="text-3xl font-bold text-green-600">{stats.problems}</p>
          </div>

          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">Total Contests</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.contests}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
