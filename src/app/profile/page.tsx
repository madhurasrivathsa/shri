"use client";
import Link from "next/link";
import React, { useEffect,useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

    
export default function Profile(){
    const router=useRouter();
    const [data,setData]=useState("nothing")
    const onLogout = async()=>{// on clicking signup it should have a datebase connection so its a async function
        try {
            const response= await axios.get("api/users/logout");
            console.log("Logged  out successfully",response.status)
            router.push("/login")
            
        } catch (error:any) {
            console.log("unable to logout",error.message)
            
        }
    }
    const getUserDetails = async()=>{
       const res =  await axios.get('/api/users/me')
       console.log(res.data);
       setData(res.data.data._id)

    }
       
    return(
        <div className="flex items-center justify-between">
        <h1>ProfilePage</h1>
        <h2>{
        data==='nothing'?"Nothing":<Link
        href={`/profile/${data}`}>{data}
        </Link>}</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onLogout}>
        Logout
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={getUserDetails}>
        GetUserDetails
        </button>
      </div>
    )


}