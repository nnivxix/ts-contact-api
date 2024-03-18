import express from "express";
import auth from "../routes/auth";
import { default as apiRoute } from "../routes/api";
import { errorMiddleware } from "../middleware/error-middleware";

const api = express();

api.use(express.json());
api.use(auth);
api.use(apiRoute);
api.use(errorMiddleware);

export default api;
