// src/pages/ProblemDetail.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import { highlight } from 'prismjs/components/prism-core';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_COMPILER_URL;
const BACK_URL = import.meta.env.VITE_BACKEND_URL;
const defaultCodes = {
  cpp: '#include<iostream>\nusing namespace std;\n\nint main() {\n    // your code here\n    return 0;\n}',
  java: 'public class Main {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
  python: '# your code here\ndef main():\n    pass\n\nmain()',
};

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('cpp');
useEffect(() => {
  if (!id) return;
  const fetchProblem = async () => {
    try {
      const res = await axios.get(`${BACK_URL}/api/problems/${id}`);
      const prob = res.data.data;
      setProblem(prob);

      const starter = prob.starter_code?.[language] || defaultCodes[language];
      setCode(starter);
    } catch (error) {
      console.error('Error fetching problem:', error);
    }
  };
  fetchProblem();
}, [id, language]);

  const handleRun = async () => {
    setIsLoading(true);
    setOutput('');
    try {
      const res = await axios.post(`${BASE_URL}/run`, {
        language,
        code,
        input,
      });
      setOutput(res.data.output);
    } catch {
      setOutput('Error: Could not run the code.');
    } finally {
      setIsLoading(false);
    }
  };

  const languageOptions = [
    { label: 'C++', value: 'cpp' },
    { label: 'Java', value: 'java' },
    { label: 'Python', value: 'python' },
  ];

  if (!problem) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex flex-col h-screen lg:flex-row">
      {/* Left Panel: Problem Description */}
      <div className="p-6 overflow-auto bg-white border-r lg:w-1/2">
        <h2 className="mb-2 text-2xl font-bold">{problem.title}</h2>
        <p className="mb-2 text-sm text-gray-600">Difficulty: {problem.difficulty}</p>

        <div className="mb-4 text-sm whitespace-pre-wrap">
          <strong>Description:</strong>
          <p>{problem.description}</p>
        </div>

        <div className="mb-2 text-sm">
          <strong>Input Format:</strong>
          <p>{problem.input_format}</p>
        </div>

        <div className="mb-2 text-sm">
          <strong>Output Format:</strong>
          <p>{problem.output_format}</p>
        </div>

        <div className="mb-2 text-sm">
          <strong>Constraints:</strong>
          <ul className="list-disc list-inside">
            {problem.constraints?.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="mb-2 text-sm">
          <strong>TestCases:</strong>
          {problem.example_cases?.map((ex, i) => (
            <div key={i} className="p-2 mb-2 border rounded bg-gray-50">
              <p><strong>Input:</strong> {ex.input}</p>
              <p><strong>Output:</strong> {ex.output}</p>
            </div>
          ))}
        </div>

        <button
          className="px-4 py-2 mt-4 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
          onClick={() => document.getElementById('editor-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Solve Now
        </button>
      </div>

      {/* Right Panel: Code Editor & Execution */}
      <div id="editor-section" className="flex flex-col p-6 space-y-6 overflow-auto lg:w-1/2 bg-gray-50">
        {/* Language Selector */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Language:</label>
          <select
            className="p-1 text-sm border rounded"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setCode(defaultCodes[e.target.value]);
            }}
          >
            {languageOptions.map((lang) => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>

        {/* Code Editor */}
        <div className="border rounded bg-white shadow-sm h-[300px] overflow-y-auto">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => {
              const langMap = {
                cpp: Prism.languages.cpp,
                java: Prism.languages.java,
                python: Prism.languages.python,
              };
              return highlight(code, langMap[language], language);
            }}
            padding={12}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 14,
              minHeight: '100%',
              backgroundColor: '#f9fafb',
            }}
          />
        </div>

        {/* Code Actions */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => setCode('')}
            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-400 rounded hover:bg-red-50"
          >
            Clear Code
          </button>
          <button
            onClick={() => setCode(defaultCodes[language])}
            className="px-4 py-2 text-sm font-medium text-green-600 border border-green-400 rounded hover:bg-green-50"
          >
            Reset Code
          </button>
        </div>

        {/* Custom Input */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Program Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            className="w-full p-2 text-sm border border-gray-300 rounded"
            placeholder="Enter input (optional)"
          />
        </div>

        {/* Run Code Button */}
        <button
          onClick={handleRun}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-semibold transition ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.6 3.11a.375.375 0 0 1-.56-.327V8.887c0-.285.308-.465.56-.326l5.6 3.11z"
            />
          </svg>
          {isLoading ? 'Running...' : 'Run Code'}
        </button>

        {/* Output Section */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Output</label>
          <div className="p-3 overflow-y-auto font-mono text-sm bg-gray-100 border border-gray-200 rounded-md h-28">
            {output || 'Output will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
