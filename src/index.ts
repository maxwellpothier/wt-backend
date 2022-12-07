import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";
import config from "./config";

const port = 4550;

console.log("Here's the config", config);

app.listen(config.port, () => {
	console.log(`Server listening on port ${config.port}`)
})