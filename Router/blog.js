const express=require("express")
const {authentication}=require("../middleware/authentication")
const blogRoute=express.Router()
const {PostModel}=require("../Models/blog.model")


blogRoute.post("/api/blogs",async(req,res)=>{
    try {
        let {user,title,content,date,likes,comments}=req.body
        date= date.split("-")
        date=new Date(date[2],date[1]-1,date[0])
        let savePost=new PostModel({user,title,content,date,likes,comments})
        await savePost.save()
        res.status(201).send({"msg":"Post has been created"})
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"something went wrong"})
    }
})



blogRoute.patch("/api/blogs/:id",async(req,res)=>{
    try {
        let id=req.params.id
        let data=req.body
        let savePost=await PostModel.findByIdAndUpdate({_id:id},data)
        res.status(204).send({"msg":"Post has been updated"})
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"something went wrong"}) 
    }
})
blogRoute.get("/api/blogs",async(req,res)=>{
    try {
        let savePost =await PostModel.find()
        res.status(200).send(savePost)
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"something went wrong"})  
    }
})

blogRoute.delete("/api/blogs/:id",async(req,res)=>{
    try {
        let id =res.params.id
        let savePost=await PostModel.findByIdAndDelete({_id:id})
        res.status(204).send({"msg":"Post has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"something went wrong"})    
    }
})
blogRoute.put("/api/blogs/:id/like",async(req,res)=>{
    try {
        let id= req.params.id
        let userId=req.body
        let savePost=await PostModel.findById({_id:id})
        console.log(savePost)
        savePost.likes=savePost.likes+1
        let LikePost=await PostModel.findByIdAndUpdate({_id:id},savePost)
        console.log(LikePost)
        res.status(204).send({"msg":"Post has been liked"})
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"something went wrong"})  
    }
})
blogRoute.put("/api/blogs/:id/comment",async(req,res)=>{
    try {
        let id=req.params.id
        let {userId,date,comment}=req.body
        date=date.split("-")
        date= new Date(date[2],date[1]-1,date[0])
        let  comments={
            comment,
            user:userId,
            date:date
        }
        console.log(comments,"comments")
    let savePost =await PostModel.findById({_id:id})

    savePost.comments.push(comments)
    console.log(savePost)
    let LikePost=await PostModel.findByIdAndUpdate({_id:id},savePost)
    console.log(LikePost)
    res.status(204).send({"msg":"Post has been Commented"})
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"something went wrong"})    
    }
})


module.exports={
    blogRoute
}