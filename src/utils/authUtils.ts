import jwt from "jsonwebtoken";

export const createJWT = (user) => {
	const token = jwt.sign(
		{
			id: user.id,
			username: user.username
		},
		process.env.JWT_SECRET
	);

	return token;
};

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