import React from 'react'
import { Link } from 'react-router';
import { usePuterStore } from '~/lib/puter';

const Navbar = () => {
  const { auth } = usePuterStore();
  return (
    <nav className="navbar">
        <Link to="/">
            <p className="text-2xl font-bold text-gradient">
                ResuMate
            </p>
        </Link>
        <div className='flex gap-4'>
          <Link to='/upload' className='primary-button w-fit'>
            Upload Resume
          </Link>
          {
            auth.isAuthenticated && <button onClick={()=>auth.signOut()} className='primary-button w-fit'>Log Out</button>
          }
        </div>
        
    </nav>
  )
}

export default Navbar