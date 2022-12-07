import prisma from "../db";

export const getAlbums = async (req, res, next) => {
	try {
		const albums = await prisma.album.findMany({
			include: {
				posts: true,
			},
		});
	
		res.json({data: albums});
	} catch (err) {
		err.message = "Error getting albums";
		next(err);
	}
};

export const getAlbumById = async (req, res, next) => {
	try {
		const album = await prisma.album.findUnique({
			where: {
				id: req.params.id
			},
			include: {
				posts: true,
			},
		});
		
		res.json({data: album});
	} catch (err) {
		err.message = "Error getting one album";
		next(err);
	}
};

export const addAlbum = async (req, res, next) => {
	try {
		const album = await prisma.album.create({
			data: {
				title: req.body.title,
				artist: req.body.artist,
				yearReleased: req.body.yearReleased,
				url: req.body.url,
			},
		});
	
		res.json({data: album});
	} catch (err) {
		err.message = "Error adding album";
		next(err);
	}
};