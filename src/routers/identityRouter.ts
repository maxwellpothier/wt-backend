import {Router} from "express";
import { createNewUser, login } from "../handlers/user";

const identityRouter = Router();

identityRouter.post("/create", createNewUser);
identityRouter.post("/establish", login);

export default identityRouter;