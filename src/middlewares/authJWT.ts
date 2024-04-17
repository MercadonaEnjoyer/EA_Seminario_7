import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";

import User from "../models/User";
import Todo from '../models/Todo';
import Post from '../models/Post';

import IJwtPayload from '../models/JWTPayload';

const _SECRET: string = 'api+jwt';



  // https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5

export async function verifyToken (req: Request, res: Response, next: NextFunction) {
    console.log("verifyToken");
    
    const token = req.header("x-access-token");
    if (!token) return res.status(403).json({ message: "No token provided" });
    console.log(token);

  try {
    
    const decoded = jwt.verify(token, _SECRET) as IJwtPayload;
    console.log("verifyToken");
    console.log(decoded);
    req.userId = decoded.id;
    const user = await User.find({username: req.userId}, { password: 0 });
    console.log(user);
    if (!user) return res.status(404).json({ message: "No user found" });

    
    next();

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export async function isOwner (req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.find({username: req.userId});

    const todoId = req.params.id;
    const todo = await Post.findById(todoId);

    if (!todo) return res.status(403).json({ message: "No user found" });

    if (todo.user != req.userId) return res.status(403).json({ message: "Not Owner" });

    next();

  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

export async function postOwner (req: Request, res: Response, next: NextFunction) {
  try {
    
    const user = await User.findOne({username: req.userId});

    console.log("estas aqui: " + user._id);

    const postId = req.params.id;
    const post = await Post.findById(req.params.id);
    console.log("Post owner: " + post.owner);

    if (!post) return res.status(403).json({ message: "No user found" });


    if (!user._id.equals(post.owner)) return res.status(403).json({ message: "Not Owner" });

    next();

  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

