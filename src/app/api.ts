import express from "express";
import { publicApi } from "../route/api";
import { errorMiddleware } from "../middleware/error-middleware";

const api = express();

api.use(express.json());
api.use(publicApi);
api.use(errorMiddleware);

export default api;
