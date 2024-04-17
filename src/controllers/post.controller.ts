import { Request, Response } from 'express'

import Post from '../models/Post';

export async function createPost (req: Request, res: Response): Promise<Response> {
    const { id, owner, title, text } = req.body;
  
    console.log('Creating post');
    const newPost = {
      id: id,
      owner: owner,
      title: title,
      text: text
    }
    console.log(newPost);
    const post = new Post(newPost);
    await post.save();
    console.log(post);
  
    return res.json({
      message: "post created",
      post
    });
}

export async function getPosts (req: Request, res: Response): Promise<Response> {
    console.log('Get posts');
    const posts = await Post.find();
    return res.json(posts);
}
  
export async function getPost(req: Request, res: Response): Promise<Response> {
    console.log('Get post');
    const _id = req.params.id;
    const post = await Post.findById(_id).populate('user');
    console.log(post);
    return res.json(post);
}
  
export async function deletePost(req: Request, res: Response): Promise<Response> {
    console.log('Delete post');
    const _id = req.params.id;
    const post = await Post.findByIdAndRemove(_id);
    return res.json({
      message: "post deleted",
      post
    });
}
  
export async function updatePost(req: Request, res: Response): Promise<Response> {
    console.log('Update post');
    const _id = req.params.id;
    const { id, user, title, text } = req.body;
    const post = await Post.findByIdAndUpdate(_id, {
      id,
      user,
      title,
      text
    }, {new: true});
    return res.json({
      message: "Post updated",
      post
    });
}