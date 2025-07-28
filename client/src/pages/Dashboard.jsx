// client/src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ListChecks,
  Trophy,
  User,
  FileText,
} from 'lucide-react';
import axios from 'axios';
import ChartsSection from '../components/ChartsSection';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const role = localStorage.getItem("role") || "user";
  const userId = localStorage.getItem("userId");
const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const [stats, setStats] = useState({
  questionsSolved: 0,
  totalSubmissions: 0,
  accuracy: "-",
  avgTime: "-",
  contests: 0,
  bestRank: "-",
  difficultyStats: { Easy: 0, Medium: 0, Hard: 0 },
  submissionsOverTime: [],
});


useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/submit/stats/${userId}`);
setStats({
  questionsSolved: res.data.questionsSolved,
  totalSubmissions: res.data.totalSubmissions,
  accuracy: res.data.accuracy,
  avgTime: res.data.avgTime,      
  contests: res.data.contests,  
  bestRank: res.data.bestRank,     
  difficultyStats: res.data.difficultyStats,
  submissionsOverTime: res.data.submissionsOverTime,
});

    } catch (err) {
      console.error("Failed to fetch stats:", err.message);
    }
  };

  if (userId) fetchStats();
}, [userId, submissionSuccess]);

useEffect(() => {
  if (localStorage.getItem("submissionSuccess") === "true") {
    setSubmissionSuccess(true);
    localStorage.removeItem("submissionSuccess");
  }
}, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col w-64 p-4 space-y-4 text-white bg-gray-800">
        <h2 className="mb-6 text-xl font-bold">OJ Dashboard</h2>
        <Link to="/ProblemsList" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <ListChecks className="w-5 h-5" /> Problems
        </Link>
        <Link to="/contests" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <Trophy className="w-5 h-5" /> Contests
        </Link>
        <Link to="/profile" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <User className="w-5 h-5" /> My Profile
        </Link>
        <Link to="/submission" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <FileText className="w-5 h-5" /> My Submissions
        </Link>
          <Link to="/solution" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <FileText className="w-5 h-5" /> Hints to some problems
        </Link>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <h1 className="mb-6 text-2xl font-bold">
          Welcome, {role === "admin" ? "Admin" : "User"}
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">Questions Solved</h3>
            <p className="text-3xl font-bold text-green-600">{stats.questionsSolved}</p>
          </div>

          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">Accuracy</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.accuracy}</p>
          </div>

          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">Avg Time / Submission</h3>
            <p className="text-2xl">{stats.avgTime}</p>
          </div>

          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">Contests Participated</h3>
            <p className="text-2xl">{stats.contests}</p>
          </div>

          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">Total Submissions</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.totalSubmissions}</p>
          </div>

          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">Best Rank</h3>
            <p className="text-2xl">{stats.bestRank}</p>
          </div>
       <div className="col-span-1 md:col-span-2 lg:col-span-3">
  <ChartsSection
    difficultyStats={stats.difficultyStats}
    submissionsOverTime={stats.submissionsOverTime}
  />
</div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
