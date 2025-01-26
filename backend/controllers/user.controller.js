import userModel from "../models/user.model.js";
import { asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import redisClient from "../service/redis.service.js"
const generateAccessToken = async(userId)=>
    {
        try {
            const user = await userModel.findById(userId)
            const accessToken =user.generateAccessToken()// calling geratedAccess token which is present in user model
        
    
            return {accessToken}
    
    
        } catch (error) {
            throw new ApiError(500 , "Something is wrong while access token")
            
        }
    }
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
    delete user._doc.password
    if(!createdUser)
        {
            throw new ApiError(500,"Something going wrong while creating User")
        }
    return res
    .status(201)
    .json(new ApiResponse(200 , {user:user,createdUser , token }, "User register successfully"))
})

const loggedinUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password)
    {
        throw new ApiError(400,"Enter email and password");
    }

    const user = await userModel.findOne({email}).select('+password');

    if(!user)
    {
        throw new ApiError(401,"Email or User is invalid");
    }
    const isValidPassword = await user.isValidPassword(password);

    if(!isValidPassword)
    {
        throw new ApiError(402,"Password is Invalid ,Enter correct password");
    }

    const token = await generateAccessToken(user._id)
    const options={
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
    delete user._doc.password;
    res.cookie("accessToken", token, options); // syntax for cookie library

    return res
    .status(200)
    //.cookie("accessToken", accessToken, options) for cookie-parser
    .json(
        
        new ApiResponse(
            200,
            { user: user,token},
            "User logged In Successfully"
        )
    )
})

const profileController = asyncHandler(async(req,res)=>{
    console.log(req.user);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            { user: req.user},
            "User Profile In Successfully Access"
        )
    )
})

const loggedoutUser= asyncHandler(async(req,res)=>{
    try {
        const cookieToken = req.cookies.get('accessToken')
        if(!cookieToken)
        {
            console.log("Accress Token not found in cookie");
        }
        const decodedCookie = decodeURIComponent(cookieToken);
        const token = decodedCookie?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        redisClient.set(token,'logout','EX',60*60*24)
        console.log("User logOut Successfully")
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "User logOut Successfully"
            ),
        )
    } 
    catch (error) {
        console.log("error in logout endpoint");
        throw new ApiError(402,"Error in Logout endPoint")
    }
})

export {
    registerUser,
    loggedinUser,
    profileController,
    loggedoutUser
}

