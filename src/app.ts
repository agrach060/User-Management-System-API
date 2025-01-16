import express, { Application } from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";


const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

export default app;