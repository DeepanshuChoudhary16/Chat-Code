import {Router} from 'express'
import {registerUser,loggedinUser, profileController ,loggedoutUser,getAllUser} from '../controllers/user.controller.js'
import { authUser } from '../middleware/auth.middleware.js'

const router = Router()

router.route("/register").post(registerUser)
router.route('/login').post(loggedinUser)
router.route('/profile').get(authUser,profileController)
router.route('/logout').get(authUser,loggedoutUser)
router.route('/all').get(authUser,getAllUser)
export default router;