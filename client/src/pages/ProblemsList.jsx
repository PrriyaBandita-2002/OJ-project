import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const difficultyColors = {
  Easy: 'text-green-600 bg-green-100',
  Medium: 'text-yellow-600 bg-yellow-100',
  Hard: 'text-red-600 bg-red-100',
};

const topicTags = ['Array', 'String', 'Hash Table', 'DP', 'Greedy', 'Sorting', 'Math'];

export default function ProblemsList() {
  const [problems, setProblems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [topic, setTopic] = useState('All');
  const navigate = useNavigate();
const userRole = localStorage.getItem('role'); // or from context/auth state

  useEffect(() => {
    const fetchProblems = async () => {
      try {
       const res = await axios.get( `${BASE_URL}/api/problems/problemlist`);
setProblems(res.data.data); 

      } catch (err) {
        console.error(err);
      }
    };
    fetchProblems();
  }, []);

  const filtered = problems.filter((p) =>
    (filter === 'All' || p.difficulty === filter) &&
    (topic === 'All' || (p.topics && p.topics.includes(topic)))
  );
 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this problem?")) return;
  try {
    await axios.delete(`${BASE_URL}/api/problems/deleteProblem/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setProblems((prev) => prev.filter((p) => p._id !== id));
    alert("Problem deleted successfully!");
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete problem.");
  }
};



  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-indigo-700"> Practice Problems</h1>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {['All', 'Easy', 'Medium', 'Hard'].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border shadow-sm transition ${
                filter === level
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Topic Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {['All', ...topicTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setTopic(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border shadow-sm transition ${
                topic === tag
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Cards Layout */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map((p, index) => (
              <div
                key={p._id}
                className="p-4 transition bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:shadow-md"
                onClick={() => navigate(`/problems/${p._id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-indigo-700">
                    {index + 1}. {p.title}
                  </h2>
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      difficultyColors[p.difficulty] || 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {p.difficulty}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Acceptance:{" "}
                  <span className="font-medium">
                    {p.acceptance ? `${p.acceptance}%` : '—'}
                  </span>
                </div>
                {p.topics && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.topics.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 border border-gray-300 rounded-full px-2 py-0.5 text-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {/* ADMIN ONLY ACTIONS */}
  {userRole === 'admin' && (
    <div className="flex gap-2 mt-3">
    <button
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/edit-problem/${p._id}`);
  }}
  className="px-3 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600"
>
  Edit
</button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(p._id);
        }}
        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  )}
</div>
              
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            No problems found.
          </div>
        )}
      </div>
    </div>
  );
}
