import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import DBConnection from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import ProblemRoutes from "./routes/problemsRoute.js";
import TestCaseRoutes from "./routes/testcaseRoutes.js";
import SolutionRoutes from "./routes/solutionRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DBConnection();

app.use("/api/auth", userRoutes);
app.use("/api/problems", ProblemRoutes);
app.get("/api/solutions", SolutionRoutes);
app.get("/api/testcases", TestCaseRoutes);
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
