import React from 'react';
import solutions from './Solution'; // path to your solution file

const HintsPage = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Problem Hints (C++ | Python | Java)</h1>
      {Object.entries(solutions).map(([problemKey, langSolutions]) => (
        <div key={problemKey} className="pb-4 mb-6 border-b">
          <h2 className="text-xl font-semibold capitalize">{problemKey}</h2>
          <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-3">
            {Object.entries(langSolutions).map(([lang, code]) => (
              <div key={lang}>
                <h3 className="font-medium text-md">{lang.toUpperCase()}</h3>
                <pre className="bg-gray-100 p-2 rounded overflow-auto text-sm max-h-[300px]">
                  <code>{code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HintsPage;
