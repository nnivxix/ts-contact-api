import server from "./app/server";
import { logger } from "./app/logging";

const PORT = process.env.PORT;

server.get("/", (req, res) => {
	const { query } = req;

	res.json({
		message: "Hello Wolrd",
		query: query,
	});
});

server.listen(PORT, () => {
	logger.info("listen on port 8000");
	console.log("server running on http://localhost:" + PORT);
});
