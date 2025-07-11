import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// console.log("Loaded GEMINI API Key:", process.env.GEMINI_API_KEY); // Debug only

const router = express.Router();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/", async (req, res) => {
  const { code, language, problem } = req.body;

  try {
    const modelName = "gemini-2.0-flash"; // Specify the model name directly

    const prompt = `
You are an AI code reviewer. Review the submitted ${language.toUpperCase()} code in the context of the following problem.

### Problem Title:
${problem.title}

### Description:
${problem.description}

### Input Format:
${problem.input_format}

### Output Format:
${problem.output_format}

### Constraints:
${(problem.constraints || []).join("\n")}

### Examples:
${(problem.examples || [])
  .map(
    (ex, i) => `Example ${i + 1}:\nInput:\n${ex.input}\nOutput:\n${ex.output}`
  )
  .join("\n\n")}

### Submitted Code:
\`\`\`${language}
${code}
\`\`\`

Please give a short, helpful review of the code, list potential bugs or improvements, and explain whether it solves the problem correctly. Use markdown format.
`;

    const result = await genAI.models.generateContent({
      model: modelName,
      contents: [{ text: prompt }],
    });

    let text = "";
    // Access the text directly from the first candidate's content parts
    if (
      result &&
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0 &&
      result.candidates[0].content.parts[0].text
    ) {
      text = result.candidates[0].content.parts[0].text;
    } else {
      // Log the full result object for further debugging if needed (though it seems fine now)
      console.warn(
        "AI did not generate any extractable text from candidates. Full result object:",
        JSON.stringify(result, null, 2)
      );
      text =
        "No review could be generated for the provided code/problem. This might be due to a technical issue or content policy.";
    }

    res.json({ review: text });
  } catch (err) {
    console.error("AI Review Error:", err);
    res.status(500).json({
      message: "AI review failed",
      error: err.message || "Unknown error",
    });
  }
});

export default router;
