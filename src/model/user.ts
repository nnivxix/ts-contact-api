import { User } from "@prisma/client";

export type UserResponse = {
	id: number;
	username: string;
	name: string;
	token?: string;
};

export type RegisterUserRequest = {
	username: string;
	name: string;
	password: string;
};

export type LoginUserRequest = {
	username: string;
	password: string;
};

export function toUserResponse(user: User): UserResponse {
	return {
		id: user.id,
		username: user.username,
		name: user.name,
	};
}
