"use client"
import React from "react";
import Image from "next/image";
import { supabase } from "@/services/supabaseClient";
import { Button } from "@/components/ui/button";


function Login(){

    // used to signin with google

    const signInWithGoogle = async () =>{
        const {error} = await supabase.auth.signInWithOAuth({
            provider:'google',
            options: {
        
        redirectTo: `${window.location.origin}/`,
      },
        })

        if(error){
            console.error('Error:',error.message)
        }
        
    }

    return(
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='flex flex-col items-center border-2 rounded-2xl p-8 '>
                <Image src = {'/logos.png'}  alt ='logo' 
                width ={400} height={100} className='w-[200px] mb-1 ' />

                <div className='flex items-center flex-col '>
                    <img src={'/login.jpeg'} alt='login' width ={600} height={400}
                    className='w-[400px] h-[350px] rounded-2xl ' /> 

                    <h2 className='text-2xl font-bold text-center mt-4 '>Welcome to TalkCruiter</h2>
                    <p className='text-gray-600 text-center'>Sign In with Google Authentication</p>
                    <Button className='mt-7 w-full' onClick ={signInWithGoogle} >
                    Login with Google</Button>
                </div>
            </div>
        </div>
    )
}

export default Login