import express from "express";
import auth from "../routes/auth";
import { default as apiRoute } from "../routes/api";
import { errorMiddleware } from "../middleware/error-middleware";

const server = express();

server.use(express.json());
server.use(auth);
server.use(apiRoute);
server.use(errorMiddleware);
export default server;
