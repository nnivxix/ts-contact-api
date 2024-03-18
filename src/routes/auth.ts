import express from "express";
import { UserController } from "../controller/user-controller";

const auth = express.Router();

auth.post("/api/users", UserController.register);
auth.post("/api/users/login", UserController.login);

export default auth;
