import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	switch (true) {
		case error instanceof ZodError:
			res.status(400).json({
				message: `Validation Error`,
				errors: error.issues,
			});
			break;
		case error instanceof ResponseError:
			res.status(error.status).json({
				errors: error.message,
			});
			break;
		default:
			res.status(500).json({
				errors: error.message,
			});
	}
};
