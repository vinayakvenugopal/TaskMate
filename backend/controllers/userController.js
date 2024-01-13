import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import Todo from '../models/todoModel.js'
//@desc Auth user/set token
//route POST /api/users/auth
//@access Public

const authUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user&&(await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageName:user.profileImageName

        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }

})


//@desc Register a new User
//route POST /api/users/users
//@access Public

const registerUser = asyncHandler(async(req,res) =>{
    console.log(req.body);
    const {name,email,password} = req.body
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400);
        throw new Error('User Already Exist')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageName:user.profileImageName

        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

//@desc Logout a new User
//route POST /api/users/logout
//@access Public

const logoutUser = async (req,res) =>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date()
    })
    res.status(200).json({message:'User Logged Out'})

}
//@desc Get User Profile
//route GET /api/users/profile
//@access Private

const getUserProfile = async (req,res) =>{
    const user = {
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    res.status(200).json(user)
}

//@desc Get User Profile
//route PUT /api/users/profile
//@access Private

const updateUserProfile = async (req,res) =>{
const user = await User.findById(req.user._id)
console.log(user);
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
  

    if(req.body.password){
        user.password = req.body.password
    }

    if(req.file){

        user.profileImageName = req.file.filename || user.profileImageName;

    }

    const updatedUser = await user.save();


    res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        profileImageName:updatedUser.profileImageName

    })
}else{
    res.status(404)
    throw new Error("User Not Found")

}
}
const addTodo = async(req,res,next)=>{
    try {
        const {message} = req.body
        const {userId} = req.params
        console.log(message,'params')
        const todo = await Todo.create({
            message,
            userId,
        })
        console.log('res mongo');
        res.status(201).json({message:'Todo Added Sucesfully'})
    } catch (error) {
        console.log(error)
    }
}

const getTodo = async(req,res,next)=>{
    try {
        const {userId} = req.params
        
        const todo = await Todo.find({
            userId, 
        }).sort({createdAt:-1}) 
        res.status(201).json(todo)
    } catch (error) {
        next(error)
    }
}

const changeStatus = async(req,res,next)=>{
    try {
        const {todoId} = req.params
        let currentStatus
        const todo = await Todo.findOne({
            _id:todoId, 
        })
        console.log(todo);
        currentStatus = todo.isDone
        console.log(currentStatus)
        // const update = await Todo.Update({
        //     userId, 
        // },{$set:{isDone:!currentStatus}})
        todo.isDone = !currentStatus
        await todo.save()
        res.status(201).json({message:'Updated Succesfully'})
    } catch (error) {
        next(error)
    }
}

const deleteTodo = async(req,res,next)=>{
    try {
        const {todoId} = req.params
        const todo = await Todo.deleteOne({
            _id:todoId 
        })
        res.status(201).json(todo)
    } catch (error) {
        next(error)
    }
}

const updateTodo = async(req,res,next)=>{
    try {
        const {todoId} = req.params
        const todo = await Todo.findOne({
            _id:todoId 
        })
        if(todo){
            todo.message = req.body.message || todo.message
        }
        const updated = await todo.save()
        res.status(201).json({message:'Updated Succesfully'})
    } catch (error) {
        next(error)
    }
}









export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    addTodo,
    getTodo,
    changeStatus,
    deleteTodo,
    updateTodo
}