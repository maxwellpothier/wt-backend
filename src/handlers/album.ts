import prisma from "../db";

export const getAlbums = async (req, res) => {
	const albums = await prisma.album.findMany({
		include: {
			posts: true,
		},
	});

	res.json({data: albums});
};

export const getAlbumById = async (req, res) => {
	const album = await prisma.album.findUnique({
		where: {
			id: req.params.id
		},
		include: {
			posts: true,
		},
	});
	
	res.json({data: album});
};

export const addAlbum = async (req, res) => {
	const album = await prisma.album.create({
		data: {
			title: req.body.title,
			artist: req.body.artist,
			yearReleased: req.body.yearReleased,
			url: req.body.url,
		},
	});

	res.json({data: album});
};