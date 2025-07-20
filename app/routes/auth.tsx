import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  return [
    { title: "ResuMate | Auth" },
    { name: "description", content: "Login or register to access your ResuMate Dashboard." },
  ];
}

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate();
  useEffect(()=>{
    if(auth.isAuthenticated) {
      navigate(next);
    }

  },[auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome to ResuMate</h1>
            <h2>Sign in to unlock smarter career tools</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in ...</p>
              </button>
            ) : (
              <>
                {
                  auth.isAuthenticated ? (
                    <button className="auth-button" onClick={() => auth.signOut()}>
                      <p>Log Out</p> 
                    </button>
                  ) : (
                    <button className="auth-button" onClick={() => auth.signIn()}>
                      <p>Login</p>
                    </button>
                  )
                }
              </>
            )}
          </div>
        </section>
      </div>
        
    </main>
  )
}

export default auth