import { Button } from "@/components/ui/button";
import moment from "moment";
import React from "react";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

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
    tech * 0.3 + // 30%
    prob * 0.3 + // 30%
    comm * 0.25 + // 25%
    exp * 0.15; // 15%

  const rec = (feedback?.recommendation || "").toLowerCase();

  if (rec === "hire" || rec === "recommended") {
    score += 0.5;
  } else if (rec === "reject" || rec === "no" || rec === "not recommended") {
    score -= 1;
  }

  score = Math.max(0, Math.min(10, score));
  return Math.round(score);
}


function CandidateList({ candidateList }) {
  return (
    <div>
      <h2 className="font-bold my-5">
        Candidates({candidateList?.length || 0})
      </h2>

      {candidateList?.map((candidate, index) => {
       
        const feedback = candidate?.feedback?.feedback || {};
        const overallScore = getOverallScore(feedback);

        return (
          <div
            key={index}
            className="p-5 flex gap-3 items-center justify-between bg-white rounded-lg"
          >
            
            <div className="flex items-center gap-5">
              <h2 className="bg-blue-500 p-3 px-4.5 font-bold text-white rounded-full">
                {candidate.userName?.[0]}
              </h2>

              <div>
                <h2 className="font-bold">{candidate?.userName}</h2>
                <h2 className="text-sm text-gray-500">
                  Completed On:{" "}
                  {candidate?.created_at
                    ? moment(candidate.created_at).format("MMM DD, yyyy")
                    : "N/A"}
                </h2>
              </div>
            </div>

          
            <div className="flex gap-3 items-center">
              <h2 className="text-green-600">{overallScore}/10</h2>
              <CandidateFeedbackDialog candidate={candidate} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CandidateList;
