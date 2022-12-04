import {Router} from "express";
import { createPost, deletePost, editPost, getAllPosts, getUserPosts } from "../handlers/post";
import {body} from "express-validator";
import { handleInputErrors } from "../utils/middlewareUtils";

const router = Router();

const inputValidators = {
	post: [
		body("content").isString(),
		handleInputErrors
	],
	album: [
		body("title").isString(),
		body("artist").isString(),
		body("yearReleased").isString(),
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
router.get("/albums", () => {});
router.get("/albums/:id", () => {});
router.post("/albums", inputValidators.album, () => {});

export default router;