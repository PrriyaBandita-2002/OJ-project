import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Editor from "react-simple-code-editor";
import { highlight } from "prismjs";
import Prism from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_COMPILER_URL;
function Home() {
  const navigate = useNavigate();

  const templates = {
    "C++": `#include <iostream>
using namespace std;

int main() {
    int num1, num2;
    cin >> num1 >> num2;
    cout << "Sum is: " << num1 + num2 << endl;
    return 0;
}`,
    C: `#include <stdio.h>

int main() {
    int num1, num2;
    scanf("%d %d", &num1, &num2);
    printf("Sum is: %d\n", num1 + num2);
    return 0;
}`,
    Java: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int num1 = sc.nextInt();
    int num2 = sc.nextInt();
    System.out.println("Sum is: " + (num1 + num2));
  }
}`,
    Python: `num1 = int(input())
num2 = int(input())
print("Sum is:", num1 + num2)`,
  };

  const prismMap = {
    "C++": "cpp",
    C: "c",
    Java: "java",
    Python: "python",
  };

  const [lang, setLang] = useState("Cpp");
  const [code, setCode] = useState(templates["C++"]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const languages = ["C++", "C", "Java", "Python"];

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setOutput("");

    const payload = {
      language: lang.toLowerCase(),
      code,
      input,
    };

    try {
      const { data } = await axios.post(`${BASE_URL}/run`, payload);
      setOutput(data.output);
    } catch (error) {
      if (error.response) {
        setOutput(`Error: ${error.response.data.error || "Server error occurred"}`);
      } else if (error.request) {
        setOutput("Error: Could not connect to server.");
      } else {
        setOutput(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-gray-800 bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">Online Judge</h1>
        <div>
          <a href="/login" className="mr-4 text-sm font-medium text-gray-700 hover:underline">
            Login
          </a>
          <a href="/signup" className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
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
        <a href="/ProblemsList" className="px-6 py-3 text-white bg-blue-600 rounded shadow hover:bg-blue-700">
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
            <p className="text-gray-600">Participate in real-time contests and compete with others.</p>
          </div>
          <div className="p-6 bg-white border rounded shadow-sm">
            <h4 className="mb-2 text-xl font-semibold text-blue-600">Practice Problems</h4>
            <p className="text-gray-600">Access a wide variety of challenges across difficulty levels.</p>
          </div>
          <div className="p-6 bg-white border rounded shadow-sm">
            <h4 className="mb-2 text-xl font-semibold text-blue-600">Code Evaluation</h4>
            <p className="text-gray-600">Get instant feedback with accurate test case evaluation.</p>
          </div>
        </div>
      </section>

      {/* Compiler Section */}
      <section className="px-6 py-10 bg-gray-50">
        <h3 className="mb-4 text-2xl font-semibold">Mini Playground</h3>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          {/* Language Selector */}
          <div className="flex space-x-2">
            {languages.map((language) => (
              <button
                key={language}
                className={`px-3 py-1 text-sm rounded border ${
                  lang === language
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => {
                  setLang(language);
                  setCode(templates[language]);
                }}
              >
                {language}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              className="flex items-center px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
              onClick={handleSubmit}
            >
              ▶ Run
            </button>
            <button
              className="flex items-center px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              onClick={() => navigate("/compiler")}
            >
              Playground
            </button>
          </div>
        </div>

        {/* Editor */}
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) =>
            highlight(code, Prism.languages[prismMap[lang]] || Prism.languages.clike, prismMap[lang])
          }
          padding={12}
          style={{
            fontFamily: "Fira Code, monospace",
            fontSize: 14,
            backgroundColor: "#f9fafb",
            minHeight: 200,
          }}
        />

        {/* Input and Output */}
        <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Program Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={5}
              className="w-full p-3 text-sm border border-gray-300 rounded-md resize-none"
              placeholder="Enter input (optional)"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Output</label>
            <div className="p-3 overflow-y-auto font-mono text-sm bg-gray-100 border border-gray-200 rounded-md h-28">
              {output || "Output will appear here..."}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 mt-10 text-sm text-center text-gray-500 bg-white border-t">
        &copy; 2025 Online Judge Platform. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
