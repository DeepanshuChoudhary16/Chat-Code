import {Router} from 'express';
import { createProject,getAllProject,addUserToProject , getProjectById } from '../controllers/project.controller.js';
import { authUser } from '../middleware/auth.middleware.js';
const router = Router();

router.route("/create").post(authUser,createProject)
router.route("/all").get(authUser,getAllProject)
router.route("/add-user").put(authUser,addUserToProject)
router.route("/get-project/:projectId").get(authUser,getProjectById)
export default router