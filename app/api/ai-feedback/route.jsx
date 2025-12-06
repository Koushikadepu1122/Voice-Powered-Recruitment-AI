import { NextResponse } from "next/server";
import { FEEDBACK_PROMPT } from "@/services/Constants";
import OpenAI from "openai";

export async function POST(req){

    const {conversation} = await req.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation))

    try{
        const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    })
    const completion = await openai.chat.completions.create({
        model: "openai/gpt-4o-mini",
        messages: [
            { role: "system", content: "Return ONLY valid JSON. No explanation. No markdown. No extra text." },
          { role: "user", content: FINAL_PROMPT }
        ],
      })
      return NextResponse.json({
          content: completion.choices[0].message.content,
        });
     // return NextResponse.json(completion.choices[0].message)
    // const completion = await openai.chat.completions.create({
    //     model: "google/gemini-2.0-flash-exp:free",
    //     messages: [
    //       { role: "user", content: FINAL_PROMPT }
    //     ],
        
    //   })
    //   return NextResponse.json(completion.choices[0].message)
    }
    catch (e) {
        console.log(e)
        return NextResponse.json(e)
        // console.error("Error:", e);
        // return NextResponse.json(
        //   { error: e.message || "Unknown error" },
        //   { status: 500 }
        // );
      } 
}