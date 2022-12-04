import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { userInfo } from "os";

export const protectDataCalls = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({message: "Missing bearer"});
		return;
	}

	const [, token] = bearer.split(" ");

	if (!token) {
		res.status(401);
		res.json({message: "Missing auth token"})
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (err) {
		res.status(401);
		res.json({
			message: "Invalid auth token",
			error: err
		});
	}
};

export const onlyAdmin = (req, res, next) => {
	if (req.user.id === process.env.ADMIN_USER_ID) {
		next();
	} else {
		res.status(401);
		res.json({message: "Only admin can access this route"});
		return;
	}
};

export const handleInputErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(400);
		res.json({errors: errors.array()});
	} else {
		next();
	}
};