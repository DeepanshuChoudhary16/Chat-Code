import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const userSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength:[6,'Email must be at least 6 characters long'],
        maxLength:[50,'Email must not be longer than 50 characters']
    },
    password:{
        type:String,
        select: false
    }

})



userSchema.pre("save",async function (next) {
    if(!this.isModified("password"))
    {
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
    
})

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(  // .sign method use to generate jwt which have three parameters
        {                 
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
        }
        
    )
}

const User = mongoose.model('User',userSchema);
export default User




