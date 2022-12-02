import {Router} from "express";
import { createPost, deletePost, editPost, getAllPosts, getUserPosts } from "./handlers/post";

const router = Router();

/**
 * POSTS
 */
router.get("/posts", getAllPosts);
router.get("/posts/:userid", getUserPosts);
router.post("/posts/:userid", createPost);
router.put("/posts/:userid/:id", editPost);
router.delete("/posts/:userid/:id", deletePost);

/**
 * ALBUMS
 */
router.get("/albums", () => {});
router.get("/albums/:id", () => {});
router.post("/albums", () => {});

export default router;