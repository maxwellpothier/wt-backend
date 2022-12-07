import express from "express";
import router from "./routers/router";
import identityRouter from "./routers/identityRouter";
import morgan from "morgan";
import cors from "cors";
import { protectDataCalls } from "./utils/middlewareUtils";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res, next) => {
	console.log("Hello from express");
	res.status(200);
	res.json({message: "Message from the api", secondMessage: req.middlewareMessage});
});

app.use("/api", protectDataCalls, router);
app.use("/identity", identityRouter);

// Error handler
app.use((err, req, res, next) => {
	if (err.type === "auth") {
		res.status(401).json({message: err.message});
	} else if (err.type === "input") {
		res.status(400).json({message: err.message});
	} else {
		res.status(500).json({message: err.message});
	}
});

export default app;