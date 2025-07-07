import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export default function CreateContest() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    problems: [],
  });

  const [allProblems, setAllProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
       const res = await axios.get(`http://localhost:8000/api/problems/problemlist`);
    setAllProblems(res.data.data);
      } catch (err) {
        console.error("Failed to fetch problems", err);
      }
    };
    fetchProblems();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleProblemToggle = (problemId) => {
  const id = String(problemId); 
  console.log(form.problems)// ensure it's a string
  setForm((prev) => {
    const exists = prev.problems.includes(id);
    const updated = exists
      ? prev.problems.filter((pid) => pid !== id)
      : [...prev.problems, id];
    return { ...prev, problems: updated };
  });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/contests/create", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Contest created successfully!");
      navigate("/contests");
    } catch (err) {
      console.error(err);
      alert("Failed to create contest");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl p-6 mx-auto space-y-4 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold">Create Contest</h1>

      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="w-full p-2 border rounded"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        type="datetime-local"
        name="startTime"
        value={form.startTime}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="datetime-local"
        name="endTime"
        value={form.endTime}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <div>
        <h2 className="mt-4 mb-2 font-semibold">Select Problems</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {allProblems.map((problem) => (
            <label
              key={problem._id}
              className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50"
            >
              <input
  type="checkbox"
  className="mr-2"
checked={form.problems.includes(String(problem._id))}

  onChange={() => handleProblemToggle(problem._id)}
/>

              {problem.title}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Create Contest
      </button>
    </form>
  );
}
