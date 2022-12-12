import {Router} from "express";
import { body } from "express-validator";
import { handleInputErrors, protectDataCalls } from "../utils/middlewareUtils";
import { createNewUser, login, getCurrUser, getUserInfo, editUserInfo, deleteUser } from "../handlers/user";

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
	edit: [
		body("username").isString(),
		body("firstName").isString(),
		body("lastName").isString(),
		body("email").isString(),
		handleInputErrors
	]
};

identityRouter.get("/", protectDataCalls, getCurrUser);
identityRouter.put("/", protectDataCalls, inputValidators.edit, editUserInfo);
identityRouter.delete("/", protectDataCalls, deleteUser);
identityRouter.get("/:userid", getUserInfo);
identityRouter.post("/create", inputValidators.signup, createNewUser);
identityRouter.post("/establish", inputValidators.login, login);

export default identityRouter;