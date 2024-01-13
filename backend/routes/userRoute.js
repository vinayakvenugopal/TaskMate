import express from 'express'
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { multerUploadUserProfile } from '../config/multerConfig.js';
import {
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
} from '../controllers/userController.js';

router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,getUserProfile).put(multerUploadUserProfile.single('profileImageName'),protect,updateUserProfile)
router.post('/addTodo/:userId',addTodo)
router.get('/getTodo/:userId',getTodo)
router.patch('/changeStatus/:todoId',changeStatus)
router.delete('/deleteTodo/:todoId',deleteTodo)
router.put('/updateTodo/:todoId',updateTodo)

export default router