import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";

const api = express.Router();

api.use("/api/user", authMiddleware);

api.get("/api/user", UserController.get);

export default api;
