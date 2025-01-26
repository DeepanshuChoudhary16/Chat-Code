import {Router} from 'express';
import { createProject,getAllProject,addUserToProject } from '../controllers/project.controller.js';
import { authUser } from '../middleware/auth.middleware.js';
const router = Router();

router.route("/create").post(authUser,createProject)
router.route("/all").get(authUser,getAllProject)
router.route("/add-user").put(authUser,addUserToProject)
export default router