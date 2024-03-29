import { NextFunction, Request, Response } from "express";
import { LoginUserRequest, RegisterUserRequest } from "../model/user";
import { UserService } from "../service/user-service";
import { UserRequest } from "../types/user-request";

export class UserController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const request: RegisterUserRequest = req.body;
			const response = await UserService.register(request);

			res.status(201).json({
				data: response,
			});
		} catch (error) {
			next(error);
		}
	}

	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const request: LoginUserRequest = req.body;
			const response = await UserService.login(request);

			res.status(200).json({
				data: response,
			});
		} catch (error) {
			next(error);
		}
	}

	static async get(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const response = await UserService.get(req.user!);

			res.status(200).json({
				data: response,
			});
		} catch (error) {
			next(error);
		}
	}

	static async update(req: UserRequest, res: Response, next: NextFunction) {
		try {
			const request = req.body;
			const response = await UserService.update(req.user!, request);

			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async logout(req: UserRequest, res: Response, next: NextFunction) {
		try {
			await UserService.logout(req.user!);
			res.status(200).json({
				data: "Ok",
			});
		} catch (e) {
			next(e);
		}
	}
}
