import { BriefcaseBusinessIcon, Calendar, Code2Icon, Component, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const SidebarOptions = [{
    name: 'Dashboard',
    icon:LayoutDashboard,
    path:'/dashboard'
},
{
    name: 'Scheduled Interview',
    icon: Calendar,
    path:'/scheduled-interview'
},
{
    name: 'All Interviews',
    icon:List,
    path:'/all-interview'
},
{
    name: 'Billing',
    icon:WalletCards,
    path:'/billing'
},

]

export const InterviewType = [
    {
        title: 'Technical',
        icon: Code2Icon
    },
    {
        title: 'Behavioral',
        icon: User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },
    {
        title: 'Problem Solving',
        icon: Puzzle
    },
    {
        title: 'Leadership',
        icon: Component
    },
    
]

export const FEEDBACK_PROMPT = `{{conversation}}

You are an interview evaluator.

Based on this interview conversation between assistant and user, you must:

1. Evaluate the candidate's performance.
2. Give ratings OUT OF 10 for:
   - technicalSkills
   - communication
   - problemSolving
   - experience
3. Also calculate a single overallScore out of 10 (you can average or judge holistically).
4. Write a short summary of the interview (3 lines).
5. Decide whether the candidate is recommended for hire.

Important:
- Return ONLY valid JSON.
- Do NOT include any explanation, comments, markdown, or extra text outside the JSON.
- Ratings must be numbers from 0 to 10 (decimals allowed, e.g. 7.5).

Return JSON in exactly this format (keys must match):

{
  "feedback": {
    "rating": {
      "technicalSkills": <number 0-10>,
      "communication": <number 0-10>,
      "problemSolving": <number 0-10>,
      "experience": <number 0-10>,
      "overallScore": <number 0-10>
    },
    "summary": "<3 line summary>",
    "recommendation": "hire" | "hold" | "reject",
    "recommendationMsg": "<one line message>"
  }
}`;
