import {Router} from "express";
import { body } from "express-validator";
import { handleInputErrors, protectDataCalls } from "../utils/middlewareUtils";
import { createNewUser, login, getCurrUser } from "../handlers/user";

const identityRouter = Router();

const inputValidators = {
	login: [
		body("username").isString(),
		body("password").isString(),
		handleInputErrors
	],
	signup: [
		body("username").isString(),
		body("password").isString(),
		handleInputErrors
	],
};

identityRouter.get("/", protectDataCalls, getCurrUser);
identityRouter.post("/create", inputValidators.signup,createNewUser);
identityRouter.post("/establish", inputValidators.login, login);

export default identityRouter;