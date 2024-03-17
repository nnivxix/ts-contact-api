import bcrypt from "bcrypt";
import { prismaClient } from "../app/database";
import { ResposeError } from "../error/response-error";
import {
	RegisterUserRequest,
	UserResponse,
	toUserResponse,
} from "../model/user";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

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
}
