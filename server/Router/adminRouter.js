import express from "express"
import { checkAdminLoggedIn, createUser, deleteUser, editUser, getEditUser, getUsers, logout, validateAdminLogin} from "../controller/adminController.js"
const router=express.Router()

router.get('/check-auth',checkAdminLoggedIn)
router.post('/login',validateAdminLogin)
router.get('/logout',logout)
router.get('/users',getUsers)
router.get('/deleteUser/:id',deleteUser)
router.post('/createUser',createUser)
router.get('/getEdit-user/:id',getEditUser)
router.post('/editUser',editUser)

export default router

