import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../utils/authUtils";

export const createNewUser = async (req, res, next) => {
	try {
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				password: await hashPassword(req.body.password),
			},
		});
	
		const token = createJWT(user);
		res.json({token});
	} catch (err) {
		err.type = "input";
		err.message = "Username is already taken";
		next(err);
	}
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

export const getCurrUser = async (req, res) => {
	// for now, this will only grab the username and id
	res.status(200);
	res.json({data: req.user});
};

export const getUserInfo = async (req, res, next) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: req.params.userid,
			},
			select: {
				posts: true,
				id: true,
				username: true
			},
		});

		res.status(200);
		res.json({data: user});
	} catch (err) {
		err.message = "Error getting user info";
		next(err);
	}
}