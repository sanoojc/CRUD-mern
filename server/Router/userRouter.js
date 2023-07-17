import express from "express"
import multer from 'multer'
import { editUserProfile, login, logout, postEditUser, signup, validateUser } from "../controller/userController.js"

const router=express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()+".jpg"
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

router.post("/login",login)
router.post("/signup",signup)
router.get('/check-auth',validateUser)
router.get('/edit-user/:id',editUserProfile)
router.get('/logout',logout)
router.post('/editUserProfile',upload.single('profile'),postEditUser)



export default router