import {Router} from 'express'
import {registerUser,loggedinUser} from '../controllers/user.controller.js'

const router = Router()

router.route("/register").post(registerUser)
router.route('/login').post(loggedinUser)

export default router;