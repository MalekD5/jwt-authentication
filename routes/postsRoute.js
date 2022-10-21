import express from "express";
import { getPosts, createPost, deletePost } from "../controllers/postsController.js";
import { ROLES } from "../config/roles.js";
import { verifyRoles } from "../middleware/verifyRoles.js";

const router = express.Router();

router.route('/')
    .get(verifyRoles(ROLES.admin), getPosts)
    .post(verifyRoles(ROLES.admin, ROLES.mod), createPost)
    .delete(deletePost);

export default router;
