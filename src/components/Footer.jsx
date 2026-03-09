import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--deep-green)', color: 'var(--white)', padding: '4rem 0 2rem 0', marginTop: 'auto' }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4" style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Poppins' }}>
              <Briefcase className="text-sand" size={28} />
              <span className="text-white">GoaWorks</span>
            </Link>
            <p className="mb-4" style={{ color: 'var(--sand-dark)', maxWidth: '250px' }}>
              Your First Opportunity Starts in Goa. Designed exclusively for the youth of this beautiful state.
            </p>
            <div className="flex gap-4">
              <a href="#" style={{ color: 'var(--sand)' }} className="hover:text-white"><Instagram size={24} /></a>
              <a href="#" style={{ color: 'var(--sand)' }} className="hover:text-white"><Facebook size={24} /></a>
              <a href="#" style={{ color: 'var(--sand)' }} className="hover:text-white"><Linkedin size={24} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-sand">Job Seekers</h4>
            <ul className="flex-col gap-2 flex" style={{ color: 'var(--gray-300)' }}>
              <li><Link to="/jobs" className="hover:text-white">Browse Jobs</Link></li>
              <li><Link to="/jobs?type=internship" className="hover:text-white">Internships</Link></li>
              <li><Link to="/profile" className="hover:text-white">Youth Profile</Link></li>
              <li><Link to="/login" className="hover:text-white">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-sand">Employers</h4>
            <ul className="flex-col gap-2 flex" style={{ color: 'var(--gray-300)' }}>
              <li><Link to="/login" className="hover:text-white">Post a Job</Link></li>
              <li><Link to="/login" className="hover:text-white">Employer Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-sand">About GoaWorks</h4>
            <ul className="flex-col gap-2 flex" style={{ color: 'var(--gray-300)' }}>
              <li><Link to="/" className="hover:text-white">About Us</Link></li>
              <li><Link to="/" className="hover:text-white">Contact</Link></li>
              <li><Link to="/" className="hover:text-white">Partner with Us</Link></li>
              <li><a href="https://goa.gov.in" target="_blank" rel="noreferrer" className="hover:text-white">Govt Links</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 text-center text-sm" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'var(--sand-dark)' }}>
          &copy; {new Date().getFullYear()} GoaWorks. Built for Goan Youth. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
