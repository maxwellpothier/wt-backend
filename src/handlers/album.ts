export const getAlbums = (req, res) => {
	res.status(200);
	res.json({message: "Here's all the albums!"});
};

export const getAlbumById = (req, res) => {
	res.status(200);
	res.json({message: `Here's the album under id: ${req.params.id}`});
};

export const addAlbum = (req, res) => {
	res.status(200);
	res.json({message: `Adding new album! ${req.body.title}, ${req.body.artist}, ${req.body.yearReleased}, ${req.body.url}!`});
};