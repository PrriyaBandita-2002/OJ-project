const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// Executes Python code with optional input
const executePython = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0];

  return new Promise((resolve, reject) => {
    let command;

    // Check if inputPath exists and has actual input
    if (inputPath && fs.existsSync(inputPath)) {
      const inputContent = fs.readFileSync(inputPath, "utf-8").trim();
      command = inputContent
        ? `python3 "${filepath}" < "${inputPath}"`
        : `python3 "${filepath}"`;
    } else {
      command = `python3 "${filepath}"`;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject({ error, stderr });
      }
      resolve(stdout || stderr);
    });
  });
};

module.exports = {
  executePython,
};
