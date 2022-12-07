import prisma from "../db";

// TODO: add try/catch for error handling so the server doesn't break
export const getAllPosts = async (req, res, next) => {
	try {
		const posts = await prisma.post.findMany({
			include: {
				album: true,
			},
		});
	
		res.json({data: posts});
	} catch (err) {
		err.message = "Error getting all posts";
		next(err);
	}
};

export const getUserPosts = async (req, res, next) => {
	try {
		const posts = await prisma.post.findMany({
			where: {
				belongsToId: req.params.userid,
			},
			include: {
				album: true,
			},
		});
	
		res.json({data: posts});
	} catch (err) {
		err.message = `Error getting all posts for user ${req.params.userid}`;
		next(err);
	}
};

export const getOnePost = async (req, res, next) => {
	try {
		const post = await prisma.post.findUnique({
			where: {
				id_belongsToId: {
					id: req.params.id,
					belongsToId: req.params.userid,
				},
			},
			include: {
				album: true,
			},
		});
	
		res.json({data: post});
	} catch (err) {
		err.message = `Error getting post ${req.params.id}`;
		next(err);
	}
};

export const createPost = async (req, res, next) => {
	try {		
		const post = await prisma.post.create({
			data: {
				content: req.body.content,
				rating: req.body.rating,
				belongsToId: req.user.id,
				albumId: req.body.albumId
			},
		});
	
		res.json({data: post});
	} catch (err) {
		err.message = `Error creating post with rating ${req.body.rating}`;
		next(err);
	}
};

export const editPost = async (req, res, next) => {
	try {
		const edited = await prisma.post.update({
			where: {
				id_belongsToId: {
					id: req.params.id,
					belongsToId: req.user.id,
				},
			},
			data: {
				content: req.body.content,
				rating: req.body.rating,
			}
		});
	
		res.json({data: edited});
	} catch (err) {
		err.message = "There was an error editing post";
		next(err);
	}
};

export const deletePost = async (req, res, next) => {
	try {
		const deleted = await prisma.post.delete({
			where: {
				id_belongsToId: {
					id: req.params.id,
					belongsToId: req.user.id,
				},
			},
		});
	
		res.json({data: deleted});
	} catch (err) {
		err.message = "Error deleting message";
		next(err);
	}
};