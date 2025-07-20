import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "constants/index";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMate" },
    { name: "description", content: "AI-powered tool that analyzes resumes, scores them for job fit, and provides smart insights!" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-18">
        <h1>
          Track Your Applications & Resume Ratings
        </h1>
        <h2>
          AI-powered tool that analyzes resumes, scores them for job fit, and provides smart insights!
        </h2>
      </div>
      {
        resumes.length > 0 && <div className="resumes-section">
          {resumes.map((resume: Resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      }
    </section>
    
  </main>;
}
