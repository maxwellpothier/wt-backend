import prisma from "../db";

export const getAlbums = (req, res) => {
	res.status(200);
	res.json({message: "Here's all the albums!"});
};

export const getAlbumById = (req, res) => {
	res.status(200);
	res.json({message: `Here's the album under id: ${req.params.id}`});
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