import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, UploadCloud, UserCircle2, Building2 } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import './LoginSignup.css';

export default function LoginSignup() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [role, setRole] = useState('seeker'); // 'seeker' or 'employer'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, do auth here. For now, redirect to Home.
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-pattern"></div>
      <div className="auth-wave"></div>
      
      <Card className="auth-card">
        <div className="auth-logo">
          <Briefcase className="text-terracotta" size={36} />
          <h1 className="text-2xl text-deep-green mb-0">GoaWorks</h1>
        </div>
        <p className="text-center text-gray mb-6 text-sm">Your First Opportunity Starts in Goa</p>
        
        <div className="auth-tabs">
          <div 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </div>
          <div 
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </div>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleSubmit} className="flex-col gap-4">
            <Input label="Email or Phone Number" placeholder="Enter your email or phone" required />
            <Input label="Password or OTP" type="password" placeholder="Enter password or OTP" required />
            <div className="flex justify-between items-center mt-2">
              <label className="flex items-center gap-2 text-sm text-gray">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="text-sm text-terracotta font-medium">Forgot Password?</a>
            </div>
            <Button type="submit" variant="primary" className="w-full mt-4">Login to GoaWorks</Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="flex-col gap-4">
            <label className="input-label">I am a...</label>
            <div className="role-selector">
              <div 
                className={`role-card ${role === 'seeker' ? 'selected' : ''}`}
                onClick={() => setRole('seeker')}
              >
                <UserCircle2 size={32} className={`mx-auto mb-2 ${role === 'seeker' ? 'text-turquoise' : 'text-gray-400'}`} style={{margin: '0 auto 8px auto'}} />
                <span className="font-bold text-sm block">Job Seeker</span>
              </div>
              <div 
                className={`role-card ${role === 'employer' ? 'selected' : ''}`}
                onClick={() => setRole('employer')}
              >
                <Building2 size={32} className={`mx-auto mb-2 ${role === 'employer' ? 'text-turquoise' : 'text-gray-400'}`} style={{margin: '0 auto 8px auto'}} />
                <span className="font-bold text-sm block">Employer</span>
              </div>
            </div>

            <Input label="Full Name" placeholder="E.g. Rohan Naik" required />
            <Input label="Email Address" type="email" placeholder="rohan@example.com" required />
            <Input label="Phone Number" type="tel" placeholder="+91 00000 00000" required />
            
            {role === 'seeker' && (
              <>
                <Input label="Age" type="number" min="18" max="30" placeholder="Must be between 18-30" required />
                <div>
                  <label className="input-label">Verification Document (Domicile/Aadhaar/College ID)</label>
                  <div className="file-upload">
                    <UploadCloud size={28} className="text-terracotta mx-auto mb-2" style={{margin: '0 auto 8px auto'}} />
                    <p className="text-sm text-gray-600 font-medium">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG (max. 5MB)</p>
                  </div>
                </div>
              </>
            )}

            {role === 'employer' && (
              <Input label="Company / Business Name" placeholder="E.g. Goan Seas Resorts" required />
            )}

            <Button type="submit" variant="primary" className="w-full mt-4">Create Account</Button>
            <p className="text-xs text-center text-gray mt-2">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        )}
      </Card>
      
      <Link to="/" className="absolute top-4 left-4 btn btn-ghost btn-sm text-white" style={{background: 'rgba(0,0,0,0.2)'}}>
        &larr; Back to Home
      </Link>
    </div>
  );
}
