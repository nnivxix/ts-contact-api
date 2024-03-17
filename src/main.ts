import api from "./app/api";
import { logger } from "./app/logging";

api.get("/", (req, res) => {
	res.json({
		message: "Hello Wolrd",
	});
});

api.listen(8000, () => {
	logger.info("listen on port 8000");
});
