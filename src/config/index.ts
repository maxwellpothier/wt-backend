import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";

let envConfig;

if (stage === "production") {
	envConfig = require("./prod").default;
} else if (stage === "staging") {
	envConfig = require("./staging");
} else {
	envConfig = require("./local");
}

export default merge({
	stage,
	env: process.env.NODE_ENV,
	port: 4550,
	secrets: {
		jwt: process.env.JWT_SECRET,
		dbUrl: process.env.DATABASE_URL,
	},
}, envConfig);