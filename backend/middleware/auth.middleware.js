import jwt from "jsonwebtoken";
import redisClient from "../service/redis.service.js";
import { ApiError } from "../utils/ApiError.js";


export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.Token || req.header("Authorization")?.replace("Bearer ", "");
        console.log("auth token",token)

        if (!token) {
            throw new ApiError(401,"No token found in cookies");
        }

        const isBlackListed = await redisClient.get(token);

        if (isBlackListed) {

            res.cookie('token', '');

            return res.status(401).send({ error: 'Unauthorized User' });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {

        console.log(error);

        res.status(401).send({ error: 'Unauthorized User' });
    }
}
















// import { asyncHandler } from "../utils/asyncHandler.js"
// import { ApiError } from '../utils/ApiError.js';
// import User from '../models/user.model.js';
// import jwt from "jsonwebtoken"
// import redisClient from "../service/redis.service.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// export const authUser = asyncHandler(async (req, res, next) => {
//   try {
//     console.log("enter in try part");
    
//     //while using cookie library
//     const cookieToken = req.cookies.get('accessToken'); // get the cookies 
//     if (!cookieToken) {
//       throw new ApiError(401, "No token found in cookies");
//     }
//     const decodedCookie = decodeURIComponent(cookieToken); // receiving a cookie in URL-encoded
//     console.log("decode cookie",decodedCookie)
//     const token = decodedCookie?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
//     console.log("token in auth",token)

//     // while using cookie-parser we don't do URL-encoded of cookie
//     // const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
    
//     if (!token) {
//       throw new ApiError(401, "Unauthorized request - No token found");
//     }

//     const isBlackListed = await redisClient.get(token)

//     if(isBlackListed)
//     {
//       // res.cookies('token','')
//       console.log("isblackListed")
//       return res
//       .status(401)
//       .json(
//         new ApiResponse(
//           401,"Unauthorizes User"
//         )
//       )
//     }
//     // Verify the JWT token
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     console.log("decodedToken:", decodedToken);

//     if (decodedToken.exp < Date.now() / 1000) {
//         throw new ApiError(401, "Token has expired");
//       }

//     const user = await User.findOne({ email: decodedToken?.email });
//     console.log("User found:", user);

//     if (!user) {
//       throw new ApiError(401, "Invalid access token - User not found");
//     }

//     req.user = user; // Attach user to request object
//     next();
//   } 
//   catch (error) {
//     console.error('Error in authUser middleware:', error);
  
//     throw new ApiError(401, "Invalid access token in catch");
//   }
// });
