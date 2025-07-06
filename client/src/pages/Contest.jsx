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
              <h2 className="text-xl font-semibold">{contest.title}</h2>
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
