const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// Compiles and executes C++ code with given input
const executeCpp = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const isWin = process.platform === "win32";
  const exeExt = isWin ? ".exe" : "";
  const outPath = path.join(outputPath, `${jobId}${exeExt}`);

  return new Promise((resolve, reject) => {
    // Compile C++ file with g++ and then execute it with input
    const runCmd = isWin
      ? `g++ "${filepath}" -o "${outPath}" && "${outPath}" < "${inputPath}"`
      : `g++ "${filepath}" -o "${outPath}" && "${outPath}" < "${inputPath}"`;
    exec(runCmd, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

module.exports = {
  executeCpp,
};
