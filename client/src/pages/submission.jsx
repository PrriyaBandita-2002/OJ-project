import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/submit/user/${userId}`);
        setSubmissions(res.data.submissions);
        // console.log(res.data.submissions);
      } catch (error) {
        console.error("Failed to fetch submissions", error);
      }
    };

    if (userId) fetchSubmissions();
  }, [userId]);

  const formatTime = (start, end) => {
    const diff = new Date(end) - new Date(start); // in ms
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60));

    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">My Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 text-left border">Problem</th>
                <th className="px-4 py-2 border">Verdict</th>
                <th className="px-4 py-2 border">Passed</th>
                <th className="px-4 py-2 border">Time Taken</th>
                <th className="px-4 py-2 border">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, i) => (
                <tr key={sub._id} className="text-center hover:bg-gray-50">
                  <td className="px-4 py-2 border">{i + 1}</td>
<td className="px-4 py-2 text-left border">
 <Link to={`/problems/${sub.problem}`} className="text-blue-600 hover:underline">

    {sub.problemTitle}
  </Link>
</td>


                  <td className={`px-4 py-2 border font-medium ${sub.verdict === "Accepted" ? "text-green-600" : "text-red-500"}`}>
                    {sub.verdict}
                  </td>
                  <td className="px-4 py-2 border">
                    {sub.passed} / {sub.total}
                  </td>
                  <td className="px-4 py-2 border">
                    {formatTime(sub.createdAt, sub.submittedAt || sub.createdAt)}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(sub.submittedAt || sub.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Submissions;
