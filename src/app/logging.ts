import winston from "winston";

export const logger = winston.createLogger({
	level: "debug",
	format: winston.format.json(),
	transports: [
		new winston.transports.File({ filename: "logs/debug.log", level: "debug" }),
		new winston.transports.File({ filename: "logs/express.log" }),
	],
});
