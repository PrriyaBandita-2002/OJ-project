const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirInputs = path.join(__dirname, "inputs");

if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true });
}

// Creates a temporary file with user's input data
const generateInputFile = async (input) => {
  const jobID = uuid();
  const inputfilename = `${jobID}.txt`;
  const inputPath = path.join(dirInputs, inputfilename);
  fs.writeFileSync(inputPath, input);
  return inputPath;
};

module.exports = {
  generateInputFile,
};
