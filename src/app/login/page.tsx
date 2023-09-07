"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function Signup()
{
    const router = useRouter();
    const[user,setUser]=React.useState({
        email:"",
        password:"",
    })
    const [buttonenabled,setButtonenabled]=React.useState(false);
    const[loading,setLoading]=React.useState(false) 
    const onLogin = async()=>{// on clicking signup it should have a datebase connection so its a async function
       try {
        setLoading(true);
        const response= await axios.post("api/users/login",user)
        console.log("The response form route.ts in login page is ",response)    
        router.push("/profile")   
       } catch (error:any) {
        console.log("error while Login",error.message)
        
       }finally{
        setLoading(false);
       }

    }
    useEffect(() => {     
      return () => {
        if(user.email.length>0 && user.password.length>0){
            setButtonenabled(true)
        }else{
            setButtonenabled(false)
        }
      }
    }, [user])
    

    return(
            
<div className=" flex v-screen justify-center ">
 
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <h1 className="font-bold">{loading?"Loading":"LoginForm"}</h1>   
  
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email" onChange={(e)=>setUser({...user,email:e.target.value})} value={user.email}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="password" onChange={(e)=>setUser({...user,password:e.target.value})} value={user.password}/>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onLogin}>
      {buttonenabled?"Login":"NoLogin"}
      </button>
      <Link href="/signup">Visit Signup Page</Link> 
    
    </div>
  </form>
 
</div>
    )





}