const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// Compiles and executes C code with given input
const executeC = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    const compile = `gcc "${filepath}" -o "${outPath}"`;
    const run = inputPath ? `"${outPath}" < "${inputPath}"` : `"${outPath}"`;

    exec(`${compile} && ${run}`, (error, stdout, stderr) => {
      if (error) return reject({ error, stderr });
      resolve(stdout || stderr);
    });
  });
};

module.exports = {
  executeC,
};
