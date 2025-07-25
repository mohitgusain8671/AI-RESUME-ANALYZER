import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMate" },
    { name: "description", content: "AI-powered tool that analyzes resumes, scores them for job fit, and provides smart insights!" },
  ];
}

export default function Home() {

  const { kv, auth } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResume, setLoadingResume] = useState(false);

  useEffect(()=>{
    if(!auth.isAuthenticated) {
      navigate(`/auth?next=/`);
    }
  },[auth.isAuthenticated]);
 
  useEffect(()=>{
    const loadResumes = async () => {
      setLoadingResume(true);
      const resumes = ( await kv.list('resume:*', true) ) as KVItem[];
      const parsedResumes = resumes.map((resume)=>(
        JSON.parse(resume.value) as Resume
      ))
      setResumes(parsedResumes || []);
      console.log(resumes);
      setLoadingResume(false);
    }
    loadResumes();
  },[])


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-8">
        <h1>
          Track Your Applications & Resume Ratings
        </h1>
        {
          !loadingResume && resumes.length === 0 ? (
            <h2>
              No Resumes Found. Upload Your resume to get started.
            </h2>
          ) : (
            <h2>
              Review your submissions and check AI-powered feedback.
            </h2>
          )
        }
      </div>
      {
        loadingResume && (
          <div className="flex flex-col items-center justify-center">
            <img src='/images/resume-scan-2.gif' className="w-[200px]" />
          </div>
        )
      }
      {
        !loadingResume && resumes.length > 0 && <div className="resumes-section">
          {resumes.map((resume: Resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      }
      {
        !loadingResume && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to='/upload' className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>)
      }
    </section>
    
  </main>;
}
