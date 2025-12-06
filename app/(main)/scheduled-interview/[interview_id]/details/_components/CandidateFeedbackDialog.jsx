import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";


function getOverallScore(feedback) {
  const rating = feedback?.rating || {};

  if (typeof rating.overallScore === "number") {
    return Math.round(rating.overallScore);
  }

  const tech = rating.technicalSkills ?? 0;
  const comm = rating.communication ?? 0;
  const prob = rating.problemSolving ?? 0;
  const exp = rating.experience ?? 0;

  let score =
    tech * 0.3 +
    prob * 0.3 +
    comm * 0.25 +
    exp * 0.15;

  const rec = (feedback?.recommendation || "").toLowerCase();

  if (rec === "hire" || rec === "recommended") {
    score += 0.5;
  } else if (rec === "reject" || rec === "no" || rec === "not recommended") {
    score -= 1;
  }

  score = Math.max(0, Math.min(10, score));
  return Math.round(score);
}


function CandidateFeedbackDialog({ candidate }) {

  const feedback = candidate?.feedback?.feedback || {};

  const rating = feedback?.rating || {};
  const overallScore = getOverallScore(feedback);

 
  const rec = (feedback?.recommendation || "").toLowerCase();
  const isNegative =
    rec === "reject" || rec === "no" || rec === "not recommended";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-blue-600">
          View Report
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>

          <DialogDescription asChild>
            <div className="mt-5">
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  {/* Profile bubble with first letter of name */}
                  <h2 className="bg-blue-500 p-3 px-4.5 font-bold text-white rounded-full">
                    {candidate.userName?.[0]}
                  </h2>

                  <div>
                    <h2 className="font-bold">{candidate?.userName}</h2>
                    <h2 className="text-sm text-gray-500">
                      {candidate?.userEmail}
                    </h2>
                  </div>
                </div>

                {/* AI Overall Score */}
                <div className="flex gap-3 items-center">
                  <h2 className="text-blue-500 font-bold text-2xl">
                    {overallScore}/10
                  </h2>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="font-bold">Skill Assessment</h2>

                <div className="mt-3 grid grid-cols-2 gap-10">
                  {/* Technical Skills */}
                  <div>
                    <h2 className="flex justify-between">
                      Technical Skills{" "}
                      <span>{rating?.technicalSkills}/10</span>
                    </h2>
                    <Progress
                      value={(rating?.technicalSkills || 0) * 10}
                      className="mt-1"
                    />
                  </div>

                  {/* Communication */}
                  <div>
                    <h2 className="flex justify-between">
                      Communication <span>{rating?.communication}/10</span>
                    </h2>
                    <Progress
                      value={(rating?.communication || 0) * 10}
                      className="mt-1"
                    />
                  </div>

                  {/* Problem Solving */}
                  <div>
                    <h2 className="flex justify-between">
                      Problem Solving{" "}
                      <span>{rating?.problemSolving}/10</span>
                    </h2>
                    <Progress
                      value={(rating?.problemSolving || 0) * 10}
                      className="mt-1"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <h2 className="flex justify-between">
                      Experience <span>{rating?.experience}/10</span>
                    </h2>
                    <Progress
                      value={(rating?.experience || 0) * 10}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="font-bold">Performance Summary</h2>

                <div className="p-5 bg-secondary my-3 rounded-md">
                  {Array.isArray(feedback?.summary)
                    ? feedback.summary.map((line, index) => (
                        <p key={index}>{line}</p>
                      ))
                    : feedback?.summary && <p>{feedback.summary}</p>}
                </div>
              </div>

             
              <div
                className={`p-5 mt-10 flex items-center justify-between rounded-md ${
                  isNegative ? "bg-red-100" : "bg-green-100"
                }`}
              >
                <div>
                  <h2
                    className={`font-bold ${
                      isNegative ? "text-red-700" : "text-green-700"
                    }`}
                  >
                    Recommendation Msg:
                  </h2>

                  <p
                    className={`${
                      isNegative ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {feedback?.recommendationMsg ||
                      "No recommendation message provided."}
                  </p>
                </div>

                <Button
                  className={`${
                    isNegative ? "bg-red-700" : "bg-green-700"
                  }`}
                >
                  Send Msg
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
