import { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight } from 'prismjs/components/prism-core';
import Prism from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_COMPILER_URL;
const defaultCodes = {
  C: `#include <stdio.h>
int main() {
  int a, b;
  scanf("%d %d", &a, &b);
  printf("%d\\n", a + b);
  return 0;
}`,
  Cpp: `#include <iostream>
using namespace std;
int main() {
  int a, b;
  cin >> a >> b;
  cout << a + b << endl;
  return 0;
}`,
  Java: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int a = sc.nextInt();
    int b = sc.nextInt();
    System.out.println(a + b);
  }
}`,
  Python: `a = int(input())
b = int(input())
print(a + b)`,
};

function App() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState('Cpp');
  const languages = ['C', 'Cpp', 'Java', 'Python'];

  useEffect(() => {
    setCode(defaultCodes[lang]);
  }, [lang]);

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setOutput('');

    const payload = {
      language: lang.toLowerCase() === 'cpp' ? 'cpp' : lang.toLowerCase(),
      code,
      input,
    };

    try {
      const { data } = await axios.post(`${BASE_URL}/run`, payload);
      setOutput(data.output);
    } catch (error) {
      if (error.response) {
        setOutput(`Error: ${error.response.data.error || 'Server error occurred'}`);
      } else if (error.request) {
        setOutput('Error: Could not connect to server.');
      } else {
        setOutput(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 font-sans text-gray-800 bg-gray-50 lg:px-16">
      <h1 className="mb-10 text-4xl font-bold text-center text-indigo-600">
         Code Compiler 
      </h1>

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Code Editor Section */}
        <div className="space-y-4 lg:w-1/2">
          {/* Language Buttons */}
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => setLang(language)}
                className={`px-4 py-2 text-sm font-medium rounded border transition-colors duration-200 ${
                  lang === language
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {language}
              </button>
            ))}
          </div>

          {/* Code Editor */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-[400px] overflow-y-auto">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => {
                const lower = lang.toLowerCase();
                const prismLang =
                  lower === 'python'
                    ? Prism.languages.python
                    : lower === 'java'
                    ? Prism.languages.java
                    : lower === 'c'
                    ? Prism.languages.c
                    : Prism.languages.clike;
                return highlight(code, prismLang, lang.toLowerCase());
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

          {/* Editor Buttons */}
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setCode('')}
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-400 rounded hover:bg-red-50"
            >
              Clear Code
            </button>
            <button
              onClick={() => setCode(defaultCodes[lang])}
              className="px-4 py-2 text-sm font-medium text-green-600 border border-green-400 rounded hover:bg-green-50"
            >
              Reset Code
            </button>
          </div>

          {/* Run Button */}
          <button
            onClick={handleSubmit}
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
        </div>

        {/* Input and Output Section */}
        <div className="space-y-6 lg:w-1/2">
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
              {output || 'Output will appear here...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
