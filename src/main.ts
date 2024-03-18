import server from "./app/server";
import { logger } from "./app/logging";

const PORT = process.env.PORT;

server.listen(PORT, () => {
	logger.info("listen on port 8000");
	console.log("server running on http://localhost:" + PORT);
});
