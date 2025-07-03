const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeJava = (filepath, inputPath) => {
  const jobId = path.basename(filepath, ".java");
  const dir = path.dirname(filepath);
  const filename = path.basename(filepath); // e.g., HelloWorld.java
  const classname = filename.split(".")[0]; // e.g., HelloWorld

  return new Promise((resolve, reject) => {
    const compile = `javac "${filepath}"`;
    const run = inputPath
      ? `java -cp "${dir}" ${classname} < "${inputPath}"`
      : `java -cp "${dir}" ${classname}`;

    exec(`${compile} && ${run}`, (error, stdout, stderr) => {
      if (error) {
        return reject({ error, stderr });
      }
      resolve(stdout || stderr);
    });
  });
};

module.exports = {
  executeJava,
};
