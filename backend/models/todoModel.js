import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },     
    message:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        default:false
    },
  
},{
    timestamps : true
})



const Todo = mongoose.model('Todo',todoSchema)

export default Todo