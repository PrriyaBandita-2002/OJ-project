const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

// Mapping of language names to file extensions
const extMap = {
  cpp: "cpp",
  c: "c",
  java: "java",
  python: "py",
};

// Creates a temporary file with user's code content
const generateFile = async (language, content) => {
  const jobID = uuid();

  const extension = extMap[language.toLowerCase()];
  if (!extension) throw new Error("Unsupported language");

  const filename = `${jobID}.${extension}`;
  const filePath = path.join(dirCodes, filename);

  fs.writeFileSync(filePath, content);
  return filePath;
};

module.exports = {
  generateFile,
};
