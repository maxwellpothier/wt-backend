import {Router} from "express";

const router = Router();

/**
 * POSTS
 */
router.get("/posts", () => {});
router.get("/posts/:userid", () => {});
router.post("/posts/:userid", () => {});
router.put("/posts/:userid/:id", () => {});
router.delete("/posts/:userid/:id", () => {});

/**
 * ALBUMS
 */
router.get("/albums", () => {});
router.get("/albums/:id", () => {});
router.post("/albums", () => {});
