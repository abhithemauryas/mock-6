const mongoose=require("mongoose")

const PostSchema=mongoose.Schema({
    user: String,
    title: String,
    content: String,
    category:String,
    date:Date,
    likes:Number,
    comments:[{
        comment: {type: String},
        user:{type: String},
        date:Date
    }]
 

})

const PostModel = mongoose.model("Post", PostSchema)
module.exports={
    PostModel
}






