import { useEffect, useState } from "react";
import axios from "axios";

export default function Contest() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/contests");
        setContests(res.data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };
    fetchContests();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">All Contests</h1>
      {contests.length === 0 ? (
        <p>No contests available.</p>
      ) : (
        <div className="space-y-4">
          {contests.map((contest) => (
            <div
              key={contest._id}
              className="p-4 transition border rounded-lg shadow-sm hover:shadow-md"
            >
<div className="flex items-center gap-2">
  <h2 className="text-xl font-semibold">{contest.title}</h2>
  {new Date(contest.startTime) > new Date() ? (
    <span className="px-2 py-0.5 text-xs text-blue-600 bg-blue-100 rounded">Upcoming</span>
  ) : new Date(contest.endTime) < new Date() ? (
    <span className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded">Ended</span>
  ) : (
    <span className="px-2 py-0.5 text-xs text-green-700 bg-green-100 rounded">Live</span>
  )}
</div>


              <p>{contest.description}</p>
              <p className="text-sm text-gray-500">
                Start: {new Date(contest.startTime).toLocaleString()} | End:{" "}
                {new Date(contest.endTime).toLocaleString()}
              </p>
              <p className="mt-2 text-sm">
                Problems: {contest.problems?.length || 0}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
