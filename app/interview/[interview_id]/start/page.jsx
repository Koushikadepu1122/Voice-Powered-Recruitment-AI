"use client";

import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, MicOff, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import TimerComponent from "./_components/TimerComponent";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";


let vapi = null;
if (typeof window !== "undefined") {
  vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
}


function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);

  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const hasStartedRef = useRef(false);


  
  useEffect(() => {
    if (!vapi) return;

    const handleMessage = (message) => {
      console.log("Message:", message);
      if (message?.conversation) {
        const convoString = JSON.stringify(message.conversation);
        console.log("Conversation string:", convoString);
        setConversation(convoString);
      }
    };

    const handleCallStart = () => {
      console.log("Call has started.");
      toast("Call Connected...");
    };

    const handleSpeechStart = () => {
      console.log("Assistant speech has started.");
      setActiveUser(false);
    };

    const handleSpeechEnd = () => {
      console.log("Assistant speech has ended.");
      setActiveUser(true); 
    };

    const handleCallEnd = () => {
      
      console.log("Call-end event received from Vapi.");
    };

        const handleError = (error) => {
      
        if (error?.errorMsg === "Meeting has ended") {
          console.log("Interview meeting ended normally.");
          return;
        }

        
        console.error("Vapi error:", error);
        toast("Something went wrong with the call.");
      };


    vapi.on("message", handleMessage);
    vapi.on("call-start", handleCallStart);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-end", handleCallEnd);
    vapi.on("error", handleError);

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", handleCallStart);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-end", handleCallEnd);
      vapi.off("error", handleError);
      vapi.stop();
    };
  }, []);

  // Start call when interviewInfo is ready
        useEffect(() => {
        if (interviewInfo && !hasStartedRef.current) {
          hasStartedRef.current = true;   // ✅ ensure we only start once
          startCall();
        }
      }, [interviewInfo]);

  const startCall = () => {
    if (!interviewInfo || !vapi) return;

    // Build question list string
    const questionList = interviewInfo?.interviewData?.questionList
      ?.map((item) => item?.question)
      .join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.jobPosition,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions and assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let’s get started with a few questions!"

Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below are the questions to ask one by one:

Questions: ${questionList}

If the candidate struggles, offer hints or rephrase the question without giving away the answer.
Provide brief, encouraging feedback after each answer.
After 5–7 questions, wrap up the interview smoothly by summarizing their performance and end on a positive note.

Key Guidelines:
- Be friendly, engaging, and witty.
- Keep responses short and natural.
- Adapt based on the candidate’s confidence level.
- Ensure the interview remains focused on React.
`.trim(),
          },
        ],
      },
    };

    console.log("Starting call with options:", assistantOptions);
    vapi.start(assistantOptions);
  };

  
  const stopInterview = async () => {
    if (!vapi || loading) return;

    toast("Interview Ended... Please Wait...");
    console.log("STOP...");

    try {
      vapi.stop();
    } catch (e) {
      console.log("Error stopping Vapi:", e);
    }

    await GenerateFeedback();
  };

  const GenerateFeedback = async () => {
    setLoading(true);
    console.log("conversation", conversation);

    if (!conversation) {
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post("/api/ai-feedback", {
        conversation: conversation,
      });

      console.log(result?.data);
      const Content = result.data.content;
      const FINAL_CONTENT = Content.replace("json", "");
      console.log(FINAL_CONTENT);

      const { data, error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: JSON.parse(FINAL_CONTENT),
            recommended: false,
          },
        ])
        .select();

      console.log(data, error);
      router.replace("/interview/" + interview_id + "/completed");
    } catch (err) {
      console.error(err);
      toast("Something went wrong while generating feedback.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMic = async () => {
  const newMuteState = !isMuted;
  setIsMuted(newMuteState);

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    stream.getAudioTracks().forEach((track) => {
      track.enabled = !newMuteState;
    });

  } catch (err) {
    console.error("Mic access error:", err);
    }
  };


  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          <TimerComponent start={true} />
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src={"/ai.jpeg"}
              alt="ai"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>

        <div className="bg-white h-[400px] rounded-lg border flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <div className="flex items-center justify-center bg-primary text-white 
                    h-[50px] w-[50px] rounded-full text-2xl font-semibold ">
              {interviewInfo?.userName?.[0]}
            </div>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center mt-7">
        {isMuted ? (
          <MicOff
            onClick={toggleMic}
            className="h-12 w-10 p-3 bg-red-500 text-white rounded-full cursor-pointer"
          />
        ) : (
          <Mic
            onClick={toggleMic}
            className="h-12 w-10 p-3 bg-gray-500 text-white rounded-full cursor-pointer"
          />
        )}


        {!loading ? (
          <Phone
            className="h-12 w-10 p-3 bg-red-500 text-white rounded-full cursor-pointer"
            onClick={stopInterview}
          />
        ) : (
          <Loader2Icon className="animate-spin" />
        )}
      </div>

      <h2 className="text-sm text-gray-500 text-center mt-5">
        Interview in Progress...
      </h2>
    </div>
  );
}

export default StartInterview;
