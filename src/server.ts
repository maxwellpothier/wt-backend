import express from "express";
import router from "./routers/router";
import identityRouter from "./routers/identityRouter";
import morgan from "morgan";
import { protectDataCalls } from "./utils/middlewareUtils";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
	throw new Error("Hello");
	// console.log("Hello from express");
	// res.status(200);
	// res.json({message: "Message from the api", secondMessage: req.middlewareMessage});
});

app.use("/api", protectDataCalls, router);
app.use("/identity", identityRouter);

// Error handler
app.use((err, req, res, next) => {
	console.log(err);
	res.json({message: "Something went wrong"});
});

export default app;