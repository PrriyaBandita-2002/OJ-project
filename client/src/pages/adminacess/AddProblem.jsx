import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const starterTemplates = {
  "C++": `#include <iostream>
using namespace std;

int main() {
    // your code goes here
    return 0;
}`,
  C: `#include <stdio.h>

int main() {
    // your code goes here
    return 0;
}`,
  Java: `public class Main {
  public static void main(String[] args) {
    // your code goes here
  }
}`,
  Python: `# your code goes here`,
};

const AddProblem = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("C++");
  const [starterCodeMap, setStarterCodeMap] = useState({ ...starterTemplates });

  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    input_format: "",
    output_format: "",
    constraints: [""],
    topics: [""],
    example_cases: [{ input: "", output: "" }],
    test_cases: [{ input: "", output: "" , hidden: false }],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
  };

  const handleStarterCodeChange = (e) => {
    setStarterCodeMap((prev) => ({
      ...prev,
      [language]: e.target.value,
    }));
  };

  const handleArrayChange = (field, index, subfield, value) => {
    const updatedArray = [...form[field]];
    updatedArray[index][subfield] = value;
    setForm({ ...form, [field]: updatedArray });
  };

  const handleTopicsChange = (e, idx) => {
    const updated = [...form.topics];
    updated[idx] = e.target.value;
    setForm({ ...form, topics: updated });
  };

  const addTopic = () => {
    setForm({ ...form, topics: [...form.topics, ""] });
  };

  const handleConstraintChange = (index, value) => {
    const updatedConstraints = [...form.constraints];
    updatedConstraints[index] = value;
    setForm({ ...form, constraints: updatedConstraints });
  };

  const addExampleCase = () => {
    setForm({ ...form, example_cases: [...form.example_cases, { input: "", output: "" }] });
  };

  const addTestCase = () => {
    setForm({ ...form, test_cases: [...form.test_cases, { input: "", output: "",hidden:"" }] });
  };

  const addConstraint = () => {
    setForm({ ...form, constraints: [...form.constraints, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/problems/createProblem`, {
        ...form,
        starter_code: starterCodeMap, // ✅ sending language-wise code
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Problem added successfully!");
      navigate("/ProblemsList");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        alert("Error: " + err.response.data.error);
      } else {
        alert("Failed to add problem.");
      }
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto mt-10 bg-white shadow rounded-xl">
      <h2 className="mb-6 text-2xl font-bold">Add New Problem</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full h-24 p-2 border rounded" />

        <div>
          <label className="font-semibold">Topics:</label>
          {form.topics.map((topic, idx) => (
            <input
              key={idx}
              value={topic}
              onChange={(e) => handleTopicsChange(e, idx)}
              className="w-full p-2 my-1 border rounded"
              placeholder={`Topic ${idx + 1}`}
            />
          ))}
          <button type="button" onClick={addTopic} className="mt-2 text-sm text-blue-500">+ Add Topic</button>
        </div>

        <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input name="input_format" value={form.input_format} onChange={handleChange} placeholder="Input Format" className="w-full p-2 border rounded" />
        <input name="output_format" value={form.output_format} onChange={handleChange} placeholder="Output Format" className="w-full p-2 border rounded" />

        <div>
          <label className="font-semibold">Constraints:</label>
          {form.constraints.map((constraint, idx) => (
            <input
              key={idx}
              value={constraint}
              onChange={(e) => handleConstraintChange(idx, e.target.value)}
              className="w-full p-2 my-1 border rounded"
              placeholder={`Constraint ${idx + 1}`}
            />
          ))}
          <button type="button" onClick={addConstraint} className="mt-2 text-sm text-blue-500">+ Add Constraint</button>
        </div>

        <div>
          <label className="font-semibold">Example Cases:</label>
          {form.example_cases.map((ex, idx) => (
            <div key={idx} className="mb-2 space-y-2">
              <input
                value={ex.input}
                onChange={(e) => handleArrayChange("example_cases", idx, "input", e.target.value)}
                placeholder="Input"
                className="w-full p-2 border rounded"
              />
              <input
                value={ex.output}
                onChange={(e) => handleArrayChange("example_cases", idx, "output", e.target.value)}
                placeholder="Output"
                className="w-full p-2 border rounded"
              />
              
            </div>
          ))}
          <button type="button" onClick={addExampleCase} className="text-sm text-blue-500">+ Add Example Case</button>
        </div>

        <div>
          <label className="font-semibold">Test Cases:</label>
          {form.test_cases.map((tc, idx) => (
            <div key={idx} className="mb-2 space-y-2">
              <input
                value={tc.input}
                onChange={(e) => handleArrayChange("test_cases", idx, "input", e.target.value)}
                placeholder="Input"
                className="w-full p-2 border rounded"
              />
              <input
                value={tc.output}
                onChange={(e) => handleArrayChange("test_cases", idx, "output", e.target.value)}
                placeholder="Output"
                className="w-full p-2 border rounded"
              />
               <label className="flex items-center space-x-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={tc.hidden}
          onChange={(e) => handleArrayChange("test_cases", idx, "hidden", e.target.checked)}
        />
        <span>Hidden Test Case</span>
      </label>
            </div>
          ))}
          <button type="button" onClick={addTestCase} className="text-sm text-blue-500">+ Add Test Case</button>
        </div>

        <div>
          <label className="font-semibold">Starter Code (Language):</label>
          <select value={language} onChange={handleLanguageChange} className="w-full p-2 mb-2 border rounded">
            {Object.keys(starterTemplates).map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <textarea
            value={starterCodeMap[language]}
            onChange={handleStarterCodeChange}
            placeholder={`Starter Code for ${language}`}
            className="w-full h-32 p-2 font-mono border rounded"
          />
        </div>

        <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded">Add Problem</button>
      </form>
    </div>
  );
};

export default AddProblem;
