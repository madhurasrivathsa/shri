import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest,NextResponse} from "next/server";
import bcryptjs from "bcryptjs";

connect();
export async function POST(request:Request){
    try {
        const reqBody=await request.json()
        const {username,email,password}=reqBody
        console.log(reqBody);
        //check if user already exists
        const user =await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exists "},{status:400})
        }
        //hash password
        const salt= await bcryptjs.genSalt(10);
        const hashedpassword=await bcryptjs.hash(password,salt)
        //insert data to the database
        const newUser= new User({
            username,
            email,
            password:hashedpassword
        })
        const saveduser=await newUser.save()
        console.log("Saved user is ", saveduser);
        return NextResponse.json({message:"User Inserted successfully"},{status:200})


        
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500})

        
    }
}


