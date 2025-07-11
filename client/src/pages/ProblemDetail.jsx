
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import Prism, { highlight } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import axios from 'axios';

const BACK_URL = import.meta.env.VITE_BACKEND_URL;
const REVIEW_URL = `${BACK_URL}/api/ai-review`;

const defaultCodes = {
  cpp: '#include<iostream>\nusing namespace std;\n\nint main() {\n    // your code here\n    return 0;\n}',
  java: 'public class Main {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
  python: '# your code here\ndef main():\n    pass\n\nmain()',
};

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [codeByLang, setCodeByLang] = useState(defaultCodes);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('cpp');
  const [submissionSummary, setSubmissionSummary] = useState(null);
  const [aiReview, setAiReview] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  // Load problem and starter code
useEffect(() => {
  const fetchProblem = async () => {
    try {
      const res = await axios.get(`${BACK_URL}/api/problems/${id}`);
      const prob = res.data.data;
      setProblem(prob);

      const starter = prob.starter_code || {};
      const initialCodeMap = {
        cpp: starter.cpp || defaultCodes.cpp,
        java: starter.java || defaultCodes.java,
        python: starter.python || defaultCodes.python,
      };
      setCodeByLang(initialCodeMap);

      // Load saved code only after initializing codeByLang
      const saved = localStorage.getItem(`code_${id}_${language}`);
      // console.log(`[LOAD] saved code for ${language}:`, saved);
      setCode(saved || initialCodeMap[language]);
    } catch (error) {
      console.error(' Error fetching problem:', error);
    }
  };

  if (id) fetchProblem();
}, [id, language]); //include language here to ensure correct saved version is picked

useEffect(() => {
  const saved = localStorage.getItem(`code_${id}_${language}`);
  if (codeByLang[language]) {
    setCode(saved || codeByLang[language]);
  }
}, [codeByLang, language, id]);


  // Save code to localStorage whenever it changes
useEffect(() => {
  if (id && language) {
    // console.log(`[SAVE] Saving code for ${language}:`, code);
    localStorage.setItem(`code_${id}_${language}`, code);
  }
}, [id, language, code]);

const handleAiReview = async () => {
  setReviewLoading(true);
  try {
    const { data } = await axios.post(REVIEW_URL, {
      code,
      language,
      problem: {
        title: problem.title,
        description: problem.description,
        input_format: problem.input_format,
        output_format: problem.output_format,
        constraints: problem.constraints,
        examples: problem.example_cases, // or adjust if key is different
      },
    });
// console.log("Sending to AI Review:", {
//   code,
//   language,
//   problem: {
//     title: problem.title,
//     description: problem.description,
//     input_format: problem.input_format,
//     output_format: problem.output_format,
//     constraints: problem.constraints,
//     examples: problem.example_cases,
//   },
// });

    setAiReview(data.review);
  } catch (error) {
    setAiReview(
      "Error in AI review: " + (error.response?.data?.message || error.message)
    );
  } finally {
    setReviewLoading(false);
  }
};


  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setCodeByLang(prev => ({ ...prev, [language]: code })); // save current code
    setLanguage(newLang);
  };

  const handleSubmit = async () => {
    if (!code.trim()) return alert('Please write some code before submitting.');

    setIsLoading(true);
    setOutput('');
    try {
      const token = localStorage.getItem("token");
        if (!token) {
      console.error("[AUTH] No token found in localStorage.");
      alert("You must be logged in to submit code.");
      return;
    }

          // console.log(`[SUBMIT] Submitting code for ${language}:`, code);
          // console.log("Sending payload:", { problemId: id, language, code });

      const res = await axios.post(`${BACK_URL}/api/submit`, {
        problemId: id,
        language,
        code,
      }, {
        headers: { Authorization: `Bearer ${token}` , "Content-Type": "application/json",},
      });

    console.log("[RESPONSE] Raw response:", res);
      const { verdict, testResults, problemTitle, timestamp } = res.data;
      // console.log(res.data);
      // console.log(`[SUBMIT SUCCESS] Verdict:`, verdict);
      //  console.log("[SUCCESS] Test Results:", testResults);
      const passedCount = testResults.filter((t) => t.passed).length;

      setSubmissionSummary({
        verdict,
        total: testResults.length,
        passed: passedCount,
        timestamp,
        problemTitle,
        code,
      });
 localStorage.setItem("submissionSuccess", "true");
 const formattedOutput =
  `Verdict: ${verdict}\n\n` +
  testResults.map((test, index) =>
    `Testcase ${index + 1}:\n` +
    `Input:\n${test.input}\n` +
    `Expected Output:\n${test.expectedOutput}\n` +
    `Your Output:\n${test.userOutput}\n` +
    `Result: ${test.passed ? 'Passed ' : 'Failed'}\n`
  ).join('\n');



      setOutput(formattedOutput);
      setActiveTab("submission");
    }  catch (err) {
    console.error("[ERROR] Submission failed:", err);
    if (err.response) {
      console.error("[ERROR] Server responded with:", err.response.data);
      alert(`Submission Error: ${err.response.data?.error || "Unknown error"}`);
    } else {
      alert("Network or unexpected error occurred during submission.");
    }
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

 const renderTabContent = () => {
  if (activeTab === "description") {
    return (
      <>
        <h2 className="mb-2 text-2xl font-bold">{problem.title}</h2>
        <p className="mb-2 text-sm text-gray-600">Difficulty: {problem.difficulty}</p>

        <div className="mb-4 prose-sm prose whitespace-pre-wrap max-w-none">
          <ReactMarkdown children={problem.description} remarkPlugins={[gfm]} rehypePlugins={[rehypeHighlight]} />
        </div>

        <div className="mb-2 text-sm"><strong>Input Format:</strong><p>{problem.input_format}</p></div>
        <div className="mb-2 text-sm"><strong>Output Format:</strong><p>{problem.output_format}</p></div>

        <div className="mb-2 text-sm">
          <strong>Constraints:</strong>
          <ul className="list-disc list-inside">
            {problem.constraints?.map((c, i) => <li key={i}>{c}</li>)}
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
      </>
    );
  }

  if (activeTab === "submission" && submissionSummary) {
    return (
      <div className="p-2 space-y-2 text-sm">
        <h3 className="text-lg font-semibold text-indigo-700">📄 Submission Summary</h3>
        <p><strong>Problem:</strong> {submissionSummary.problemTitle}</p>
        <p><strong>Verdict:</strong> {submissionSummary.verdict}</p>
        <p><strong>Passed:</strong> {submissionSummary.passed} / {submissionSummary.total}</p>
        <p><strong>Time:</strong> {new Date(submissionSummary.timestamp).toLocaleString()}</p>
      </div>
    );
  }

  if (activeTab === "solution") {
    return (
      <div className="text-sm">
        <p className="italic text-gray-500">Solution will be available after successful submission.</p>
      </div>
    );
  }

  if (activeTab === "review") {
    return (
      <div className="space-y-4 text-sm">
     <button
  onClick={handleAiReview}
  disabled={reviewLoading}
  className={`w-full px-4 py-2 text-sm font-semibold border rounded ${
    reviewLoading
      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
      : 'text-indigo-700 border-indigo-400 hover:bg-indigo-50'
  }`}
>
  {reviewLoading ? 'Reviewing...' : '🤖 Get AI Code Review'}
</button>

        <div className="overflow-y-auto prose-sm prose text-gray-800 max-w-none" style={{ maxHeight: "300px" }}>
          {aiReview ? <ReactMarkdown>{aiReview}</ReactMarkdown> : <p className="text-gray-500">Click the button (only once/not more than that) above to get feedback on your code.</p>}
        </div>
      </div>
    );
  }

  return <p className="text-sm text-gray-400">No data to display.</p>;
};


  return (
    <div className="flex flex-col h-screen lg:flex-row">
      {/* Left Panel */}
      <div className="h-full p-6 overflow-auto bg-white border-r lg:w-1/2">
        {/* Tabs */}
        <div className="flex pb-2 mb-4 space-x-4 text-sm font-semibold border-b">
{['description', 'submission', 'solution', 'review'].map(tab => (


            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 capitalize ${activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}>
              {tab}
            </button>
          ))}
        </div>
        {renderTabContent()}
      </div>

      {/* Right Panel */}
      <div className="p-6 space-y-6 overflow-auto lg:w-1/2 bg-gray-50">
        {/* Language Selector */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Language:</label>
          <select className="p-1 text-sm border rounded" value={language} onChange={handleLanguageChange}>
            {languageOptions.map((lang) => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
          {/* AI Review Button */}


        </div>

        {/* Code Editor */}
        <div className="border rounded bg-white shadow-sm h-[300px] overflow-y-auto">
          <Editor
            value={code}
        onValueChange={(newCode) => setCode(newCode)}
highlight={code => highlight(code, Prism.languages[language] || Prism.languages.cpp, language)}
            padding={12}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 14,
              backgroundColor: '#f9fafb',
              minHeight: '100%',
            }}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-4">
          <button onClick={() => setCode('')} className="px-4 py-2 text-sm text-red-600 border border-red-400 rounded hover:bg-red-50">Clear</button>
          <button onClick={() => setCode(defaultCodes[language])} className="px-4 py-2 text-sm text-green-600 border border-green-400 rounded hover:bg-green-50">Reset</button>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={isLoading} className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-white font-semibold rounded transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.6 3.11a.375.375 0 0 1-.56-.327V8.887c0-.285.308-.465.56-.326l5.6 3.11z" />
          </svg>
          {isLoading ? 'Submitting...' : 'Submit Code'}
        </button>

        {/* Output */}
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
