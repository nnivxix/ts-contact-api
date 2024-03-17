import bcrypt from "bcrypt";
import { prismaClient } from "../app/database";
import { ResposeError } from "../error/response-error";
import {
	LoginUserRequest,
	RegisterUserRequest,
	UserResponse,
	toUserResponse,
} from "../model/user";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { v4 as uuid } from "uuid";

export class UserService {
	static async register(request: RegisterUserRequest): Promise<UserResponse> {
		const registerRequest = Validation.validate(
			UserValidation.REGISTER,
			request
		);

		const totalUsersWithSameUsername = await prismaClient.user.count({
			where: {
				username: request.username,
			},
		});

		if (totalUsersWithSameUsername != 0)
			throw new ResposeError(400, "Username already exist");

		registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

		const user = await prismaClient.user.create({
			data: registerRequest,
		});

		return toUserResponse(user);
	}
	static async login(request: LoginUserRequest): Promise<UserResponse> {
		const loginRequest = Validation.validate(UserValidation.LOGIN, request);

		let user = await prismaClient.user.findFirst({
			where: {
				username: request.username,
			},
		});

		if (!user) {
			throw new ResposeError(401, "Username or password is wrong");
		}
		const checkPassword = await bcrypt.compare(
			loginRequest.password,
			user?.password
		);

		if (!checkPassword) {
			throw new ResposeError(401, "Username or password is wrong");
		}

		const updateUser = await prismaClient.user.update({
			where: {
				username: loginRequest.username,
			},
			data: {
				token: uuid(),
			},
		});

		const response = toUserResponse(updateUser);
		response.token = updateUser.token!;

		return response;
	}
}
