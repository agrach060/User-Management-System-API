import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { swagger } from "./utils/swagger";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app: Application = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use(errorHandler);

export default app;