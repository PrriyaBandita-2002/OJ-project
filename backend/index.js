import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import DBConnection from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import ProblemRoutes from "./routes/problemsRoute.js";
import TestCaseRoutes from "./routes/testcaseRoutes.js";
import SolutionRoutes from "./routes/solutionRoutes.js";
import submissionRoutes from "./routes/submission.routes.js";
import contestRoutes from "./routes/contest.routes.js";
import aiReviewRoute from "./ai-review.js";
// import aiChatRoute from "./ai-chat.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = ["https://oj-project-xi.vercel.app", "https://www.iiya.me"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DBConnection();

app.use("/api/auth", userRoutes);
app.use("/api/problems", ProblemRoutes);
app.use("/api/solutions", SolutionRoutes);
app.use("/api/testcases", TestCaseRoutes);
app.use("/api/submit", submissionRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/ai-review", aiReviewRoute);
// app.use("/api/ai-chat", aiChatRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OJ Auth Server is running!",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
