import {Router} from "express";
import { createPost, deletePost, editPost, getAllPosts, getOnePost, getUserPosts } from "../handlers/post";
import {body} from "express-validator";
import { handleInputErrors, onlyAdmin } from "../utils/middlewareUtils";
import { addAlbum, getAlbumById, getAlbums } from "../handlers/album";

const router = Router();

const inputValidators = {
	createPost: [
		body("content").isString(),
		body("rating").isFloat(),
		body("albumId").isString(),
		handleInputErrors
	],
	editPost: [
		body("content").isString(),
		body("rating").isFloat(),
		handleInputErrors
	],
	album: [
		body("title").isString(),
		body("artist").isString(),
		body("yearReleased").isInt(),
		body("url").isString(),
		handleInputErrors
	],
};

/**
 * POSTS
 */
router.get("/posts", getAllPosts);
router.get("/posts/:userid", getUserPosts);
router.get("/posts/:userid/:id", getOnePost);
router.post("/posts/:userid", inputValidators.createPost, createPost);
router.put("/posts/:userid/:id", inputValidators.editPost, editPost);
router.delete("/posts/:userid/:id", deletePost);

/**
 * ALBUMS
 */
router.get("/albums", getAlbums);
router.get("/albums/:id", getAlbumById);
router.post("/albums", inputValidators.album, onlyAdmin, addAlbum);

export default router;