import supertest from "supertest";
import api from "../src/app/api";
import { logger } from "../src/app/logging";
import { prismaClient } from "../src/app/database";

describe("POST /api/users", () => {
	afterEach(async () => {
		await prismaClient.user.deleteMany({
			where: {
				username: {
					contains: "test",
				},
			},
		});
	});
	it("should reject register new user if request is invalid", async () => {
		const response = await supertest(api).post("/api/users").send({
			username: "",
			password: "",
			name: "",
		});

		logger.debug(response.body);

		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should register new user", async () => {
		const response = await supertest(api).post("/api/users").send({
			username: "hanasa test",
			password: "test123",
			name: "hanasa test",
		});

		logger.debug(response.body);
		expect(response.status).toBe(201);
		expect(response.body.data.username).toBe("hanasa test");
		expect(response.body.data.name).toBe("hanasa test");
	});
});