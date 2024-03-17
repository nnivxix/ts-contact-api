import supertest from "supertest";
import api from "../src/app/api";
import { logger } from "../src/app/logging";
import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt";

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

describe("POST /api/users/login", () => {
	beforeEach(async () => {
		await prismaClient.user.create({
			data: {
				username: "hanasa test new",
				name: "hanasa test new",
				password: await bcrypt.hash("password1234", 10),
				token: "token1234",
			},
		});
	});
	afterEach(async () => {
		await prismaClient.user.deleteMany({
			where: {
				username: {
					contains: "test",
				},
			},
		});
	});

	it("it should be able to login", async () => {
		const response = await supertest(api).post("/api/users/login").send({
			username: "hanasa test new",
			password: "password1234",
		});

		logger.debug(response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("hanasa test new");
		expect(response.body.data.token).toBeDefined();
	});
	it("it should be reject login user if username wrong", async () => {
		const response = await supertest(api).post("/api/users/login").send({
			username: "hanasa test",
			password: "password1234",
		});

		logger.debug(response.body);

		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
	it("it should be reject login user if password wrong", async () => {
		const response = await supertest(api).post("/api/users/login").send({
			username: "hanasa test new",
			password: "password1234677",
		});

		logger.debug(response.body);

		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});
