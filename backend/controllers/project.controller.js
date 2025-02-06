import projectModel from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

const createProject = asyncHandler(async(req,res)=>{
   try {
        const {name} = req.body;

        const loggedinUser = await User.findOne({email: req.user.email});
        const userId = loggedinUser._id;
     
        if(!name || !userId)
        {
            throw new ApiError(401,"Name or User is required");
        }
        const newProject = await projectModel.create({
            name,
            users:[userId]
        })
        console.log("creation of project is compelet");
        return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                {newProject},
                "Project created successfully"
            )
        )

    } catch (error) {
        console.log(error)
        throw new ApiError(400,"Project not created successfully");
    }
})

const getAllProject = asyncHandler(async(req,res)=>{
    try {
        const loggedInUser = await User.findOne({email:req.user.email})
        const userId = loggedInUser._id
    
        if(!userId){
            throw new ApiError(404,"User is required")
        }
    
        const alluserProject = await projectModel.find({
            users: userId
        })
    
        return res
        .status(200)
        .json(
            new ApiResponse(200,{projects: alluserProject})
        )
    } catch (error) {
        throw new ApiError(406,"Unbale to getAllProject")
    }
})

const addUserToProject = asyncHandler(async(req,res)=>{
    try {
        const {projectId,users} = req.body
        if(!projectId)
        {
            throw new ApiError(404,"ProjectId is required")
        }
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            throw new ApiError(404,"Invalid projectId")
        }
        if(!users)
        {
            throw new ApiError(404,"user are required")
        }
        if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId)))
        {
            throw new ApiError(404,"Invalis userId(s) in users array")
        }
        const LoggedInUser = await User.findOne({
            email:req.user.email
        })
        const userId = LoggedInUser._id
        const project = await projectModel.findOne({
            _id: projectId,
            users:userId
        })

        if(!project){
            throw new Error("user not belong to this project")
        }
        const updateProject = await projectModel.findOneAndUpdate({
            _id:projectId
        },
        {
            $addToSet:{
                users:{
                    $each:users
                }
            }
        },
        {
            new:true
        })
        console.log("User add to project successfully")
        return res
        .status(200)
        .json(new ApiResponse(200,{updateProject})
        )
        
    } catch (error) {
        console.log(error)
        
    }
})

const getProjectById = asyncHandler(async(req,res)=>{
    try {
        console.log("enter the try part")
        const {projectId} = req.params;
        if(!projectId)
        {
            throw new ApiError("project is required")
        }
        if(!mongoose.Types.ObjectId.isValid(projectId))
        {
            
            throw new ApiError("Invalid projectId");
        }
        console.log("all is good")
    
        const project = await projectModel.findOne({
            _id:projectId
        }).populate('users').exec()

        

        return res
        .status(200)
        .json(new ApiResponse(
            200,
            {project}
            ,"Project get Successfully"
        ))
    } catch (error) {
        throw new ApiError(401,"Error in projectGetById")
    }
})
export {
    createProject,
    getAllProject,
    addUserToProject,
    getProjectById 
};
