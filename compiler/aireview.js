// const { GoogleGenAI } = require("@google/genai");
// const dotenv = require("dotenv");

// dotenv.config();

// const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// const aiCodeReview = async (code) => {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents:
//       "Analyze the following code and provide a short and concise review of the code. Also, provide a list of potential improvements and suggestions for the code. " +
//       code,
//   });
//   return response.text;
// };

// module.exports = {
//   aiCodeReview,
// };
const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY);

const aiCodeReview = async (code) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // or "gemini-pro"

  const prompt = `Analyze the following code and provide a concise review. Include any potential improvements:\n\n${code}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
};

module.exports = {
  aiCodeReview,
};
