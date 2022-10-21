import PostModel from '../models/postMessages.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostModel.find({});
        
        res.status(200).json(postMessages);
    } catch (err) {
        res.status(404).json({ message: err.message});
    }
}

export const createPost = async (req, res) => {
    const body = req.body;
    const newPost = new PostModel(body);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.body;

    try {
        const post = await PostModel.findByIdAndDelete(id);
        if (!post) {
            res.status(404).json({ message: "post doesn't exists" });
        } else 
        res.status(200).json({ message: 'successfully deleted the post'});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
