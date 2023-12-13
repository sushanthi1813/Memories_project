
import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';
import router from "../routes/posts.js";
// export const getPosts = async (req,res) =>{
//     try{
//         const postMessage = await PostMessage.find();
//         res.status(200).json(postMessage);
//     }catch(error){
//         res.status(404).json({message: error.message});
//     }
// }
export const getPosts = async (req, res) => {
    try {
      const postMessages = await PostMessage.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
      res.status(200).json(postMessages);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
export const createPost = async (req ,res) => {
    const post = req.body;
    const newPostMessage = new PostMessage({...post ,creator : req.userId,createdAt :new Date().toISOString()});
    try{
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    }catch(error){
        res.status(409).json9({message : error.message});
    }
}

export const updatePost =async (req,res) =>{
    const { id : _id } = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    
    const updatePost = await PostMessage.findByIdAndUpdate(_id , { ...post,_id } ,{new:true});

    res.json(updatePost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findOneAndDelete({ _id: id });
    console.log('DELETE');
    res.json({ message: "Post deleted successfully." });
}



export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}


