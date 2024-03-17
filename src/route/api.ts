import express from "express";
import { UserController } from "../controller/user-controller";

export const publicApi = express.Router();

publicApi.post("/api/users", UserController.register);
