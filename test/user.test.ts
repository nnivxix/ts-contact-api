import supertest from "supertest";
import server from "../src/app/server";
import { logger } from "../src/app/logging";
import { RefreshUser } from "./helpers/refresh-user";

describe("POST /api/users", () => {
	afterEach(async () => {
		await RefreshUser.delete();
	});
	it("should reject register new user if request is invalid", async () => {
		const response = await supertest(server).post("/api/users").send({
			username: "",
			password: "",
			name: "",
		});

		logger.debug(response.body);

		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should register new user", async () => {
		const response = await supertest(server).post("/api/users").send({
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
		await RefreshUser.create();
	});
	afterEach(async () => {
		await RefreshUser.delete();
	});

	it("it should be able to login", async () => {
		const response = await supertest(server).post("/api/users/login").send({
			username: "hanasa test new",
			password: "password1234",
		});

		logger.debug(response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe("hanasa test new");
		expect(response.body.data.token).toBeDefined();
	});
	it("it should be reject login user if username wrong", async () => {
		const response = await supertest(server).post("/api/users/login").send({
			username: "hanasa test",
			password: "password1234",
		});

		logger.debug(response.body);

		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
	it("it should be reject login user if password wrong", async () => {
		const response = await supertest(server).post("/api/users/login").send({
			username: "hanasa test new",
			password: "password1234677",
		});

		logger.debug(response.body);

		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/user", () => {
	beforeEach(async () => {
		await RefreshUser.create();
	});
	afterEach(async () => {
		await RefreshUser.delete();
	});

	it("should be able to get user", async () => {
		const response = await supertest(server)
			.get("/api/user")
			.set("X-API-TOKEN", "token1234");

		logger.debug(response.body);

		expect(response.status).toBe(200);
		expect(response.body.data.name).toBe("hanasa test new");
	});
	it("should be reject if token is invalid", async () => {
		const response = await supertest(server)
			.get("/api/user")
			.set("X-API-TOKEN", "token14");

		logger.debug(response.body);

		expect(response.status).toBe(401);
		expect(response.body.message).toBeDefined();
	});
});
