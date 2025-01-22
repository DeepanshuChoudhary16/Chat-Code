import userModel from "../models/user.model.js";
import { asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    console.log("email",email);

    if(email === "" || password ==="")
    {
        throw new ApiError(400,"All feild are required")
    }

    const existUser = await userModel.findOne({
        email: email
    })
    if (existUser) {
        throw new ApiError(409,"Email or Username already exists")
    } 

    const user = await userModel.create({
        email,
        password
    })
    const createdUser = await userModel.findById(user._id).select(
        "-password"
    )
    const token = await user.generateAccessToken()
    if(!createdUser)
        {
            throw new ApiError(500,"Something going wrong while creating User")
        }
    return res
    .status(201)
    .json(new ApiResponse(200 , {createdUser , token }, "User register successfully"))
})

export {
    registerUser
}

