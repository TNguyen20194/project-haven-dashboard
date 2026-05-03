import express from "express";
import cors from "cors";
import assessmentSessiontRoutes from "./routes/assessmentSessions.routes.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/assessment-sessions", assessmentSessiontRoutes)

export default app;