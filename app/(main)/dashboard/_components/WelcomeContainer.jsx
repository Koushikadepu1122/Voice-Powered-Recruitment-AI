"use client"
import { useUser } from "@/provider";
import React from "react";
import Image from "next/image";

function WelcomeContainer(){

    const {user} = useUser()
    return(
        <div className='bg-white border-2 p-4 mt-3 ml-9 mr-9 rounded-xl flex justify-between items-center '>
            <div>
                <h2 className='text-lg font-bold '>
                    Welcome Back, {user?.name}
                </h2>
                <h2 className='text-cyan-800'>AI-Driven Interviews, Hassel-Free Hiring</h2>
            </div>
            {user && <Image src ={user?.picture} alt='userAvatar' height={40} width={40}
            className='rounded-full' />}
        </div>
    )
}

export default WelcomeContainer