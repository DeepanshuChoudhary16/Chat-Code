import {Router} from 'express';
import { createProject } from '../controllers/project.controller.js';
import { authUser } from '../middleware/auth.middleware.js';
const router = Router();

router.route("/create").post(authUser,createProject)

export default router