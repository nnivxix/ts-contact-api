import server from "./app/server";
import { logger } from "./app/logging";

server.listen(8000, () => {
	logger.info("listen on port 8000");
	console.log("server running on http://localhost:8000");
});
