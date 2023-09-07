import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest,NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();
export async function POST(request:Request){
    try {
        const reqBody=await request.json();
        const {email,password}=reqBody;
        console.log(reqBody);
        //check if user already exists
        const user =await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User Doesnot exists "},{status:400})
        }
        //Check if the password is correct
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid Password"},{status:400})
        }
        //creata token data
                const tokendata={
                id:user._id,
                username:user.username,
                email:user.email
                }
        //create token 
        const token = await jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:"1h"})
        const response=NextResponse.json({message:"User Logged in  successfully"},{success:true})
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response  
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500})

        
    }
}


