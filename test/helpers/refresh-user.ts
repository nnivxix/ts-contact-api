import { prismaClient } from "../../src/app/database";
import bcrypt from "bcrypt";

export class RefreshUser {
	static async delete() {
		await prismaClient.user.deleteMany({
			where: {
				username: "hanasa test new",
			},
		});
	}

	static async create() {
		await prismaClient.user.create({
			data: {
				username: "hanasa test new",
				name: "hanasa test new",
				password: await bcrypt.hash("password1234", 10),
				token: "token1234",
			},
		});
	}
}
