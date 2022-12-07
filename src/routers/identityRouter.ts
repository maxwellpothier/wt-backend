import {Router} from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../utils/middlewareUtils";
import { createNewUser, login } from "../handlers/user";

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

identityRouter.post("/create", inputValidators.signup,createNewUser);
identityRouter.post("/establish", inputValidators.login, login);

export default identityRouter;