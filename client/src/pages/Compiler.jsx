import { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight } from 'prismjs/components/prism-core';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const BASE_URL = import.meta.env.VITE_COMPILER_URL;
const REVIEW_URL = import.meta.env.VITE_GOOGLE_GEMINI_API_URL;

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
print(a + b)`
};

export default function CompilerApp() {
  const [code, setCode] = useState(defaultCodes["Cpp"]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [lang, setLang] = useState('Cpp');
  const [aiReview, setAiReview] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCode(defaultCodes[lang]);
  }, [lang]);

  const handleRun = async () => {
    setIsLoading(true);
    setOutput('');
    try {
      const { data } = await axios.post(`${BASE_URL}/run`, {
        language: lang.toLowerCase() === 'cpp' ? 'cpp' : lang.toLowerCase(),
        code,
        input,
      });
      setOutput(data.output);
    } catch (error) {
      setOutput('Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };
const handleAiReview = async () => {
  setIsReviewing(true);
  setAiReview(''); // Clear previous
  try {
    const { data } = await axios.post(REVIEW_URL, { code });
    setAiReview(data.review);
  } catch (error) {
    setAiReview('Error in AI review: ' + error.message);
  } finally {
    setIsReviewing(false);
  }
};


  const languages = ['C', 'Cpp', 'Java', 'Python'];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="mb-6 text-4xl font-extrabold text-center text-gray-800">Online Code Compiler</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Code Editor Section */}
        <div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-lg">
          <div className="flex flex-wrap gap-2 mb-4">
            {languages.map(language => (
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

          <div className="flex-grow overflow-y-auto bg-gray-100 rounded-lg" style={{ height: '500px' }}>
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => {
                const lower = lang.toLowerCase();
                const prismLang =
                  lower === 'python' ? Prism.languages.python :
                  lower === 'java' ? Prism.languages.java :
                  lower === 'c' ? Prism.languages.c :
                  Prism.languages.clike;
                return highlight(code, prismLang, lang.toLowerCase());
              }}
              padding={15}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 14,
                minHeight: '500px'
              }}
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setCode('')}
              className="flex-1 px-4 py-2 text-red-600 bg-red-100 border border-red-300 rounded hover:bg-red-200"
            >Clear</button>
            <button
              onClick={() => setCode(defaultCodes[lang])}
              className="flex-1 px-4 py-2 text-green-600 bg-green-100 border border-green-300 rounded hover:bg-green-200"
            >Reset</button>
          </div>
        </div>

        {/* Input / Output / Review Section */}
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="mb-2 text-lg font-semibold text-gray-700">Input</h2>
            <textarea
              rows="4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input values..."
              className="w-full p-3 text-sm border border-gray-300 rounded-md resize-none"
            />
          </div>

          <div className="p-4 overflow-y-auto bg-white rounded-lg shadow-lg" style={{ height: '150px' }}>
            <h2 className="mb-2 text-lg font-semibold text-gray-700">Output</h2>
            <div className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{output || 'Output will appear here...'}</div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="mb-2 text-lg font-semibold text-gray-700">AI Review</h2>
            <div className="overflow-y-auto prose-sm prose text-gray-800" style={{ height: '150px' }}>
              {aiReview === '' ? <div>Waiting for review...</div> : <ReactMarkdown>{aiReview}</ReactMarkdown>}
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <button
              onClick={handleRun}
              disabled={isLoading}
              className="flex-1 px-4 py-2 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >{isLoading ? 'Running...' : 'Run Code'}</button>

          <button
  onClick={handleAiReview}
  disabled={isReviewing}
  className="flex-1 px-4 py-2 font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isReviewing ? 'Reviewing...' : 'AI Review'}
</button>
          </div>
        </div>
      </div>
    </div>
  );
}