import {Router} from "express";
import { createPost, deletePost, editPost, getAllPosts, getUserPosts } from "../handlers/post";
import {body} from "express-validator";
import { handleInputErrors, onlyAdmin } from "../utils/middlewareUtils";
import { addAlbum, getAlbumById, getAlbums } from "../handlers/album";

const router = Router();

const inputValidators = {
	post: [
		body("content").isString(),
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
router.post("/posts/:userid", inputValidators.post, createPost);
router.put("/posts/:userid/:id", inputValidators.post, editPost);
router.delete("/posts/:userid/:id", deletePost);

/**
 * ALBUMS
 */
router.get("/albums", getAlbums);
router.get("/albums/:id", getAlbumById);
router.post("/albums", inputValidators.album, onlyAdmin, addAlbum);

export default router;