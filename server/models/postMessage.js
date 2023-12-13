import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title : String,
    message : String,
    name : String,
    creator : String,
    tags : [String],
    selectedFile : String,
    likes :{
        type : [String],
        deafault :[],
    },
    createdAt :{
        type:Date,
        default : new Date(),
    },
});
const PostMessage = mongoose.model('PostMesage',postSchema);

export default PostMessage;