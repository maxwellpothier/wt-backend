import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../utils/authUtils";

export const createNewUser = async (req, res) => {
	const user = await prisma.user.create({
		data: {
			username: req.body.username,
			password: await hashPassword(req.body.password),
		},
	});

	const token = createJWT(user);
	res.json({token});
};

export const login = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username,
		},
	});

	if (!user) {
		res.status(401);
		res.json({message: "Username not found"});
		return;
	}

	const validPassword = await comparePasswords(req.body.password, user.password);

	if (!validPassword) {
		res.status(401);
		res.json({message: "Incorrect password"});
		return;
	}

	const token = createJWT(user);
	res.json({token});
};