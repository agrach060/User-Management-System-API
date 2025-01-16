import express, { Application } from "express";
import authRoutes from "./routes/authRoutes";

const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

export default app;