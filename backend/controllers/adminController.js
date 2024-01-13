import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js'
import generateAdminToken from '../utils/generateAdminToken.js'
import User from '../models/userModel.js'

//@desc Auth admin/set token
//route POST /api/admin/auth
//@access Public

const authAdmin = asyncHandler(async(req,res) =>{
    const {email,password} = req.body
    const admin = await Admin.findOne({email})
    if(admin.password === password){
        generateAdminToken(res,admin._id)
        res.status(201).json({
            _id:admin._id,
            email:admin.email,
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }

})


//@desc Auth admin/logout
//route POST /api/admin/logout
//@access Public

const logoutAdmin = async (req,res) =>{
    res.cookie('jwtAdmin','',{
        httpOnly:true,
        expires:new Date()
    })
    res.status(200).json({message:'Admin Logged Out'})

}


//@desc Auth admin/GETUSER
//route POST /api/admin/get-user
//@access Private


const getAllUser = asyncHandler(async(req,res) => {
    const userData =  await User.find({}, { name: 1, email: 1 ,profileImageName:1})
    if(userData){
        res.status(200).json(userData)
    }else{
        res.status(400)
        throw new Error("Error Fetching data")
    }
})

//@desc Auth admin/UPDATEUSER
//route PUT /api/admin/update-user
//@access Private

const updateUserData = asyncHandler(async(req,res) => {
    const userId  = req.body.userId 
    const user =  await User.findById(userId)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
    const updatedUser = await user.save();

    res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email
    })
    }else{
        res.status(400)
        throw new Error('User Not found')
    }
})

//@desc Auth admin/Delete User
//route DELETE /api/admin/delete-user
//@access Private


const deleteUser = asyncHandler(async(req,res)=>{
        const userId = req.body.userId
        const deleted = await User.findByIdAndDelete(userId)
        if(deleted){
            res.status(200).json({success:true,message:'User Deleted Succesfully'})
        }else{
            res.status(404).json({success:false,message:'USER delete Failed'})
        }
})


const addNewUser = asyncHandler(async(req,res) =>{
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


export{
    authAdmin,
    logoutAdmin,
    getAllUser,
    updateUserData,
    deleteUser,
    addNewUser
}