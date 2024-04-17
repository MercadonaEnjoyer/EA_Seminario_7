import { Router } from 'express';
const router = Router();

import { createPost, getPosts, getPost, deletePost, updatePost } from '../controllers/post.controller'

import { verifyToken, postOwner } from '../middlewares/authJWT'

router.get( "/", getPosts );

router.post( "/", [verifyToken], createPost );

router.get( "/:id", getPost );

router.delete( "/:id", [verifyToken, postOwner], deletePost );

router.put ( "/:id", [verifyToken, postOwner], updatePost );

export default router;