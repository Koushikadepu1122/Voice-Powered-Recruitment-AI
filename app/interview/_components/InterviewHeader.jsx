import Image from "next/image";
import React from "react";

function InterviewHeader() {
    return(
        <div className='p-4 shadow-sm'>
            <Image src={'/logos.png'} alt="logo" width={200} height={100}
            className='w-[150px] '/>
        </div>
    )
}

export default InterviewHeader