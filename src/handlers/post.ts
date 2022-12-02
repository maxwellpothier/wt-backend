export const getAllPosts = (req, res) => {
	res.status(200);
	res.json({message: "Here's all the posts!"});
};

export const getUserPosts = (req, res) => {
	res.status(200);
	res.json({message: `Here's all the posts from ${req.params.userid}!`});
};

export const createPost = (req, res) => {
	res.status(200);
	res.json({message: `Create new post for user ${req.params.userid}`});
};

export const editPost = (req, res) => {
	res.status(200);
	res.json({message: `Edit post ${req.params.id} for user ${req.params.userid}`});
};

export const deletePost = (req, res) => {
	res.status(200);
	res.json({message: `Delete post ${req.params.id} for user ${req.params.userid}`});
};