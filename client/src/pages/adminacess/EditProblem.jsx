// // src/pages/EditProblem.jsx
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// const EditProblem = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [form, setForm] = useState(null);

//   useEffect(() => {
//     const fetchProblem = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/api/problems/edit/${id}`);
//         setForm(res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch problem:", err);
//       }
//     };
//     fetchProblem();
//   }, [id]);
// useEffect(() => {
//   const fetchTestCases = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/testcases/problem/${id}`);
//       setForm(prev => ({ ...prev, test_cases: res.data.testCases }));
//     } catch (err) {
//       console.error("Failed to fetch test cases:", err);
//     }
//   };
//   fetchTestCases();
// }, [id]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleArrayChange = (field, index, subfield, value) => {
//     const updated = [...form[field]];
//     updated[index][subfield] = value;
//     setForm({ ...form, [field]: updated });
//   };

//   const handleTopicsChange = (e, idx) => {
//     const updated = [...form.topics];
//     updated[idx] = e.target.value;
//     setForm({ ...form, topics: updated });
//   };

//   const handleConstraintChange = (index, value) => {
//     const updated = [...form.constraints];
//     updated[index] = value;
//     setForm({ ...form, constraints: updated });
//   };

//   const handleStarterCodeChange = (lang, value) => {
//     setForm({ ...form, starter_code: { ...form.starter_code, [lang]: value } });
//   };

//   const addField = (field, value) => {
//     setForm({ ...form, [field]: [...form[field], value] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`${BASE_URL}/api/problems/edit/${id}`, form, {


//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
// await axios.put(`${BASE_URL}/api/testcases/updateMany/${id}`, form.test_cases, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       alert("Problem updated successfully!");
//       navigate("/problemslist");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update problem.");
//     }
//   };

//   if (!form) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="max-w-4xl p-6 mx-auto mt-10 bg-white shadow rounded-xl">
//       <h2 className="mb-6 text-2xl font-bold">Edit Problem</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Title" />
//         <textarea name="description" value={form.description} onChange={handleChange} className="w-full h-24 p-2 border rounded" placeholder="Description" />

//         <div>
//           <label>Topics:</label>
//           {form.topics.map((topic, idx) => (
//             <input
//               key={idx}
//               value={topic}
//               onChange={(e) => handleTopicsChange(e, idx)}
//               className="w-full p-2 my-1 border rounded"
//             />
//           ))}
//           <button type="button" onClick={() => addField("topics", "")} className="text-sm text-blue-500">+ Add Topic</button>
//         </div>

//         <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full p-2 border rounded">
//           <option>Easy</option>
//           <option>Medium</option>
//           <option>Hard</option>
//         </select>

//         <input name="input_format" value={form.input_format} onChange={handleChange} placeholder="Input Format" className="w-full p-2 border rounded" />
//         <input name="output_format" value={form.output_format} onChange={handleChange} placeholder="Output Format" className="w-full p-2 border rounded" />

//         <div>
//           <label>Constraints:</label>
//           {form.constraints.map((c, i) => (
//             <input
//               key={i}
//               value={c}
//               onChange={(e) => handleConstraintChange(i, e.target.value)}
//               className="w-full p-2 my-1 border rounded"
//             />
//           ))}
//           <button type="button" onClick={() => addField("constraints", "")} className="text-sm text-blue-500">+ Add Constraint</button>
//         </div>

//         <div>
//           <label>Example Cases:</label>
//           {form.example_cases.map((ex, i) => (
//             <div key={i} className="mb-2 space-y-1">
//               <input
//                 value={ex.input}
//                 onChange={(e) => handleArrayChange("example_cases", i, "input", e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Input"
//               />
//               <input
//                 value={ex.output}
//                 onChange={(e) => handleArrayChange("example_cases", i, "output", e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Output"
//               />
//             </div>
//           ))}
//           <button type="button" onClick={() => addField("example_cases", { input: "", output: "" })} className="text-sm text-blue-500">+ Add Example Case</button>
//         </div>

//         <div>
//           <label>Test Cases:</label>
//           {form.test_cases.map((tc, i) => (
//             <div key={i} className="mb-2 space-y-1">
//               <input
//                 value={tc.input}
//                 onChange={(e) => handleArrayChange("test_cases", i, "input", e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Input"
//               />
//               <input
//                 value={tc.output}
//                 onChange={(e) => handleArrayChange("test_cases", i, "output", e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Output"
//               />
//             </div>
//           ))}
//           <button type="button" onClick={() => addField("test_cases", { input: "", output: "" })} className="text-sm text-blue-500">+ Add Test Case</button>
//         </div>

//         <div>
//           <label>Starter Code:</label>
//           {["cpp", "java", "python"].map((lang) => (
//             <div key={lang}>
//               <label className="block mt-2 font-medium capitalize">{lang}</label>
//               <textarea
//                 value={form.starter_code?.[lang] || ""}
//                 onChange={(e) => handleStarterCodeChange(lang, e.target.value)}
//                 className="w-full h-24 p-2 border rounded"
//               />
//             </div>
//           ))}
//         </div>

//         <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded">Update Problem</button>
//       </form>
//     </div>
//   );
// };

// export default EditProblem;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const EditProblem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    const fetchProblemAndTestCases = async () => {
      try {
        const [problemRes, testCaseRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/problems/edit/${id}`),
          axios.get(`${BASE_URL}/api/testcases/problem/${id}`),
        ]);
        setForm(problemRes.data.data);
        setTestCases(testCaseRes.data.data); // Updated key: data.data
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchProblemAndTestCases();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, index, subfield, value) => {
    const updated = [...form[field]];
    updated[index][subfield] = value;
    setForm({ ...form, [field]: updated });
  };

  const handleTopicsChange = (e, idx) => {
    const updated = [...form.topics];
    updated[idx] = e.target.value;
    setForm({ ...form, topics: updated });
  };

  const handleConstraintChange = (index, value) => {
    const updated = [...form.constraints];
    updated[index] = value;
    setForm({ ...form, constraints: updated });
  };

  const addField = (field, value) => {
    setForm({ ...form, [field]: [...form[field], value] });
  };

  const handleStarterCodeChange = (lang, value) => {
    setForm({ ...form, starter_code: { ...form.starter_code, [lang]: value } });
  };

  const handleTestCaseChange = (index, field, value) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "", hidden: false, problem: id }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update problem
      await axios.put(`${BASE_URL}/api/problems/edit/${id}`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Update all test cases
      await axios.put(`${BASE_URL}/api/testcases/updateMany/${id}`, testCases, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert("Problem updated successfully!");
      navigate("/problemslist");
    } catch (err) {
      console.error(err);
      alert("Failed to update problem.");
    }
  };

  if (!form) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl p-6 mx-auto mt-10 bg-white shadow rounded-xl">
      <h2 className="mb-6 text-2xl font-bold">Edit Problem</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Title" />
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full h-24 p-2 border rounded" placeholder="Description" />

        <div>
          <label>Topics:</label>
          {form.topics.map((topic, idx) => (
            <input key={idx} value={topic} onChange={(e) => handleTopicsChange(e, idx)} className="w-full p-2 my-1 border rounded" />
          ))}
          <button type="button" onClick={() => addField("topics", "")} className="text-sm text-blue-500">+ Add Topic</button>
        </div>

        <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input name="input_format" value={form.input_format} onChange={handleChange} placeholder="Input Format" className="w-full p-2 border rounded" />
        <input name="output_format" value={form.output_format} onChange={handleChange} placeholder="Output Format" className="w-full p-2 border rounded" />

        <div>
          <label>Constraints:</label>
          {form.constraints.map((c, i) => (
            <input key={i} value={c} onChange={(e) => handleConstraintChange(i, e.target.value)} className="w-full p-2 my-1 border rounded" />
          ))}
          <button type="button" onClick={() => addField("constraints", "")} className="text-sm text-blue-500">+ Add Constraint</button>
        </div>

        <div>
          <label>Example Cases:</label>
          {form.example_cases.map((ex, i) => (
            <div key={i} className="mb-2 space-y-1">
              <input value={ex.input} onChange={(e) => handleArrayChange("example_cases", i, "input", e.target.value)} className="w-full p-2 border rounded" placeholder="Input" />
              <input value={ex.output} onChange={(e) => handleArrayChange("example_cases", i, "output", e.target.value)} className="w-full p-2 border rounded" placeholder="Output" />
            </div>
          ))}
          <button type="button" onClick={() => addField("example_cases", { input: "", output: "" })} className="text-sm text-blue-500">+ Add Example Case</button>
        </div>

        <div>
          <label>Test Cases:</label>
          {testCases.map((tc, i) => (
            <div key={i} className="mb-2 space-y-1">
              <input value={tc.input} onChange={(e) => handleTestCaseChange(i, "input", e.target.value)} className="w-full p-2 border rounded" placeholder="Input" />
              <input value={tc.output} onChange={(e) => handleTestCaseChange(i, "output", e.target.value)} className="w-full p-2 border rounded" placeholder="Output" />
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input type="checkbox" checked={tc.hidden} onChange={(e) => handleTestCaseChange(i, "hidden", e.target.checked)} />
                <span>Hidden Test Case</span>
              </label>
            </div>
          ))}
          <button type="button" onClick={addTestCase} className="text-sm text-blue-500">+ Add Test Case</button>
        </div>

        <div>
          <label>Starter Code:</label>
          {["cpp", "java", "python"].map((lang) => (
            <div key={lang}>
              <label className="block mt-2 font-medium capitalize">{lang}</label>
              <textarea value={form.starter_code?.[lang] || ""} onChange={(e) => handleStarterCodeChange(lang, e.target.value)} className="w-full h-24 p-2 border rounded" />
            </div>
          ))}
        </div>

        <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded">Update Problem</button>
      </form>
    </div>
  );
};

export default EditProblem;
