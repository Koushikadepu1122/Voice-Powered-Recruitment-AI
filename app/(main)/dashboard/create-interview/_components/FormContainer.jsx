import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from "@/services/Constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function FormContainer({onHandleInputChange, GoToNext }){

    const [interviewType, SetInterviewType] = useState([])
    useEffect(() =>{
        if(interviewType){
            onHandleInputChange('type', interviewType)
        }
    }, [interviewType])

    const AddInterviewType = (type) =>{
        const data = interviewType.includes(type)
        if(!data){
            SetInterviewType(prev => [...prev, type])
        } else{
            const result =interviewType.filter(item => item!= type)
            SetInterviewType(result)
        }
    }

    return(
        <div className='p-5 bg-white rounded-2xl'>
            <div>
                <h2 className='text-sm font-medium'>Job Position</h2>
                <Input placeholder="eg. Full Stack Developer" className='mt-2'
                onChange={(event) => onHandleInputChange('jobPosition', event.target.value)} />
            </div>

            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Job Description</h2>
                <Textarea placeholder='Enter detailed job description' className='h-[200px] mt-2'
                onChange={(event) => onHandleInputChange('jobDescription', event.target.value)} />
            </div>

            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Interview Duration</h2>

                <Select onValueChange ={(value) => onHandleInputChange('duration', value)}>
                    <SelectTrigger className="w-full mt-2 cursor-pointer">
                        <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className='cursor-pointer' value="5 Min">5 Min</SelectItem>
                        <SelectItem className='cursor-pointer' value="15 Min">15 Min</SelectItem>
                        <SelectItem className='cursor-pointer' value="30 Min">30 Min</SelectItem>
                        <SelectItem className='cursor-pointer' value="45 Min">45 Min</SelectItem>
                        <SelectItem className='cursor-pointer' value="60 Min">60 Min</SelectItem>
                    </SelectContent>
                    </Select>
                
            </div>

            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Interview Type</h2>
                <div className='flex gap-3 flex-wrap mt-2 cursor-pointer'>
                    {InterviewType.map((type,index)=> (
                        <div key={index} 
                        className={`flex items-center gap-2 p-1 px-2 bg-white border
                        border-gray-300 rounded-2xl hover:bg-gray-200
                        ${interviewType.includes(type.title) && 'bg-blue-100 text-cyan-600'}`} 
                    onClick={()=> AddInterviewType(type.title)}>
                            <type.icon className='h-5 w-5'/>
                            <span>{type.title}</span>
                        </div>
                    ))}
                </div>
                
            </div>

            <div className='mt-7 flex justify-end' onClick={() => GoToNext()}>

            <Button className='bg-blue-700 cursor-pointer'>Generate Question <ArrowRight /> </Button>

            </div>

        </div>
    )
}

export default FormContainer