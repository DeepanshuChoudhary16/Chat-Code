import projectModel from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";

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
})

const
export {
    createProject,
    getAllProject};
