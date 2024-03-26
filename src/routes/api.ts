import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";

const api = express.Router();

api.use("/api/user", authMiddleware);

api.get("/api/user", UserController.get);
api.patch("/api/user", UserController.update);
api.delete("/api/user", UserController.logout);

export default api;
