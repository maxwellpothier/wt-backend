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

export const editUserInfo = async (req, res, next) => {
	try {
		const editedUser = await prisma.user.update({
			where: {
				id: req.user.id,
			},
			data: {
				username: req.body.username,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
			},
		});

		res.status(200);
		res.json({data: editedUser});
	} catch (err) {
		err.message = "Error editing user info";
		next(err);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		await prisma.post.deleteMany({
			where: {
				belongsToId: req.user.id,
			},
		});
	} catch (err) {
		err.message = "Error deleting associated posts";
		next(err);
	}

	try {
		const deletedUser = await prisma.user.delete({
			where: {
				id: req.user.id,
			},
		});

		res.json({data: deletedUser});
	} catch (err) {
		err.message = "Error deleting user";
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