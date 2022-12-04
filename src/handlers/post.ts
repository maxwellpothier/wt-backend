import prisma from "../db";

export const getAllPosts = async (req, res) => {
	const posts = await prisma.post.findMany({
		include: {
			album: true,
		},
	});

	res.json({data: posts});
};

export const getUserPosts = async (req, res) => {
	const posts = await prisma.post.findMany({
		where: {
			belongsToId: req.params.userid,
		},
		include: {
			album: true,
		},
	});

	res.json({data: posts});
};

export const getOnePost = async (req, res) => {
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
};

export const createPost = async (req, res) => {
	const post = await prisma.post.create({
		data: {
			content: req.body.content,
			rating: req.body.rating,
			belongsToId: req.user.id,
			albumId: req.body.albumId
		},
	});

	res.json({data: post});
};

export const editPost = async (req, res) => {
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
};

export const deletePost = async (req, res) => {
	const deleted = await prisma.post.delete({
		where: {
			id_belongsToId: {
				id: req.params.id,
				belongsToId: req.user.id,
			},
		},
	});

	res.json({data: deleted});
};