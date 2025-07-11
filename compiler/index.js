const express = require("express");
const dotenv = require("dotenv");
const { generateFile } = require("./generateFile");
const { generateInputFile } = require("./generateInputFile");
const { executeCpp } = require("./executeCpp");
const { executePython } = require("./executePython");
const { executeC } = require("./executeC");
const { executeJava } = require("./executeJava");
const { aiCodeReview } = require("./aireview");
const cors = require("cors");
const app = express();
dotenv.config();

// Middleware setup
app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}); // Enable Cross-Origin Resource Sharing
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data

// Basic health check endpoint
app.get("/", (req, res) => {
  res.json({ online: "compiler" });
});
app.post("/ai-review", async (req, res) => {
  const { code } = req.body;
  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code!" });
  }
  try {
    const review = await aiCodeReview(code);
    res.json({ review: review });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error in AI review, error: " + error.message });
  }
});

// Main endpoint to compile and run C++ code
app.post("/run", async (req, res) => {
  // Extract language, code, and input from request body with defaults
  const { language = "cpp", code, input = "" } = req.body;

  // Validate that code is provided
  if (code === undefined || code.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Empty code! Please provide some code to execute.",
    });
  }

  try {
    // Generate a temporary file with the user's code
    const filePath = await generateFile(language, code);

    // Generate a temporary file with the user's input (if any)
    const inputPath = await generateInputFile(input);

    // Compile and execute the C++ code
    console.log("Running:", { language, filePath });

    let output;
    switch (language.toLowerCase()) {
      case "cpp":
        output = await executeCpp(filePath, inputPath);
        break;
      case "c":
        output = await executeC(filePath, inputPath);
        break;
      case "java":
        output = await executeJava(filePath, inputPath);
        break;
      case "python":
        output = await executePython(filePath, inputPath);
        break;
      default:
        return res
          .status(400)
          .json({ success: false, error: "Unsupported language" });
    }

    res.json({ success: true, filePath, language, output, inputPath });
  } catch (error) {
    console.error("Execution Error:", error);
    return res.status(500).json({
      success: false,
      error: error.stderr || error.error?.message || "Unknown error",
    });
  }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
