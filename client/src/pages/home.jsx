import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate=useNavigate();
  const [language, setLanguage] = useState("C++");
  const languages = ["C++", "Java", "Python"];

  return (
    <div className="text-gray-800 bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">Online Judge</h1>
        <div>
          <a href="/login" className="mr-4 text-sm font-medium text-gray-700 hover:underline">
            Login
          </a>
          <a
            href="/signup"
            className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Register
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center bg-gradient-to-b from-gray-100 to-white">
        <h2 className="mb-4 text-4xl font-bold text-gray-900">Practice Coding Challenges</h2>
        <p className="mb-6 text-lg text-gray-600">
          Improve your coding skills with real contests and curated problems.
        </p>
        <a
          href="/problems"
          className="px-6 py-3 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl px-6 py-16 mx-auto">
        <div className="mb-10 text-center">
          <h3 className="mb-4 text-3xl font-bold text-gray-900">Features</h3>
          <p className="text-lg text-gray-600">
           Online Platform to master competitive programming.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white border rounded shadow-sm">
            <h4 className="mb-2 text-xl font-semibold text-blue-600">Timed Contests</h4>
            <p className="text-gray-600">
              Participate in real-time contests and compete with others.
            </p>
          </div>
          <div className="p-6 bg-white border rounded shadow-sm">
            <h4 className="mb-2 text-xl font-semibold text-blue-600">Practice Problems</h4>
            <p className="text-gray-600">
              Access a wide variety of challenges across difficulty levels.
            </p>
          </div>
          <div className="p-6 bg-white border rounded shadow-sm">
            <h4 className="mb-2 text-xl font-semibold text-blue-600">Code Evaluation</h4>
            <p className="text-gray-600">
              Get instant feedback with accurate test case evaluation.
            </p>
          </div>
        </div>
      </section>

      {/* Compiler Section */}
     <section className="px-6 py-10 bg-gray-50">
        <h3 className="mb-4 text-2xl font-semibold">Mini Playground</h3>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          {/* Language selector */}
          <div className="flex space-x-2">
            {languages.map((lang) => (
              <button
                key={lang}
                className={`px-3 py-1 text-sm rounded border ${
                  language === lang
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => setLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="flex items-center px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100">
              <i className="mr-1 fa fa-clipboard" /> Copy
            </button>
            <button className="flex items-center px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700">
              <i className="mr-1 fa fa-play-circle" /> Run
            </button>
            <button
              className="flex items-center px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              onClick={() => navigate("/playground")}
            >
              <img
                src="/static/images/LeetCode_Playground.png"
                alt="Playground"
                className="w-4 h-4 mr-1"
              />
              Playground
            </button>
          </div>
        </div>

        {/* Editor */}
        <textarea
          className="w-full h-40 p-4 font-mono text-white bg-black rounded resize-none"
          placeholder={`// ${language} code goes here...`}
        />
      </section>


      {/* Footer */}
      <footer className="py-6 mt-10 text-sm text-center text-gray-500 bg-white border-t">
        &copy; 2025 Online Judge Platform. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
