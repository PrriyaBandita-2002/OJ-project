import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ContestDetail() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/contests/${id}`);
        setContest(res.data);
        setAccessGranted(true);
      } catch (err) {
        if (err.response?.status === 403) {
          setAccessGranted(false);
          setContest(err.response?.data);
        }
      }
    };

    fetchContest();
  }, [id]);

useEffect(() => {
  const interval = setInterval(() => {
    if (!contest || accessGranted) return;

    const start = new Date(contest.startTime).getTime();
    const now = Date.now();
    const distance = start - now;

    if (distance <= 0) {
      window.location.reload(); // Trigger access refresh
    }

    const h = Math.floor(distance / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);
    setCountdown(`${h}h ${m}m ${s}s`);
  }, 1000);

  return () => clearInterval(interval);
}, [contest, accessGranted]);


if (!accessGranted) {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-red-600">⏳ Contest Not Started</h1>
      <p className="mt-2 text-gray-700">This contest will be available when the timer ends.</p>
      <p className="mt-4 font-mono text-lg">{countdown}</p>
    </div>
  );
}


  if (!contest) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{contest.title}</h1>
      <p className="mb-4 text-gray-700">{contest.description}</p>
      <p className="mb-2 text-sm text-gray-500">
        {new Date(contest.startTime).toLocaleString()} - {new Date(contest.endTime).toLocaleString()}
      </p>

      <h2 className="mt-4 mb-2 text-lg font-semibold">Problems</h2>
      <ul className="space-y-2">
        {contest.problems.map((p) => (
          <li key={p._id}>
            <a href={`/problems/${p._id}`} className="text-blue-600 hover:underline">
              {p.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
