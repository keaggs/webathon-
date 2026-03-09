import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Briefcase, Clock, LayoutGrid, List } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import './JobListings.css';

// Extended Mock Data
const ALL_JOBS = [
  { id: 1, title: 'Front Desk Executive', company: 'Goa Seas Resort', location: 'Calangute', pay: '₹15k - ₹20k/mo', type: 'Full-time', posted: '2 days ago', category: 'Hospitality' },
  { id: 2, title: 'Junior React Developer', company: 'TechGoa Solutions', location: 'Porvorim', pay: '₹25k - ₹35k/mo', type: 'Full-time', posted: '1 week ago', category: 'IT' },
  { id: 3, title: 'Event Coordinator', company: 'Sunburn Entertainment', location: 'Vagator', pay: '₹20k/mo', type: 'Contract', posted: '3 days ago', category: 'Events' },
  { id: 4, title: 'Social Media Intern', company: 'Goa Tourism Board', location: 'Panjim', pay: '₹8k/mo Stipend', type: 'Internship', posted: 'Just now', category: 'Tourism' },
  { id: 5, title: 'Marine Conservation Intern', company: 'Save Our Seas NGO', location: 'South Goa', pay: 'Unpaid', type: 'Internship', posted: '5 days ago', category: 'NGO' },
  { id: 6, title: 'Store Manager', company: 'Goa Handicrafts', location: 'Margao', pay: '₹18k/mo', type: 'Full-time', posted: '1 day ago', category: 'Retail' },
];

export default function JobListings() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'internship' ? 'Internship' : 'All';
  
  const [view, setView] = useState('list'); // 'list' or 'grid'
  
  return (
    <Layout>
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container">
          <h1 className="text-3xl text-deep-green mb-4">Find Your Perfect Role</h1>
          <div className="flex gap-2 max-w-2xl">
            <div className="flex-1 rounded-md border border-gray-300 flex items-center px-4 bg-gray-50">
              <Search className="text-gray-400" size={20} />
              <input type="text" placeholder="Search jobs, companies, skills..." className="w-full bg-transparent border-none p-3 outline-none" />
            </div>
            <Button>Search</Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="jobs-layout">
          {/* Sidebar Filters */}
          <aside className="jobs-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">Job Type</h3>
              <label className="filter-option"><input type="radio" name="type" defaultChecked={initialType === 'All'} /> All</label>
              <label className="filter-option"><input type="radio" name="type" /> Full-time</label>
              <label className="filter-option"><input type="radio" name="type" /> Part-time</label>
              <label className="filter-option"><input type="radio" name="type" defaultChecked={initialType === 'Internship'} /> Internship</label>
              <label className="filter-option"><input type="radio" name="type" /> Contract</label>
            </div>
            
            <div className="filter-section">
              <h3 className="filter-title">Location</h3>
              <label className="filter-option"><input type="checkbox" /> North Goa</label>
              <label className="filter-option"><input type="checkbox" /> South Goa</label>
              <label className="filter-option"><input type="checkbox" /> Remote</label>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Categories</h3>
              {['Hospitality', 'Tourism', 'IT', 'Retail', 'Events', 'NGO'].map(cat => (
                <label key={cat} className="filter-option"><input type="checkbox" /> {cat}</label>
              ))}
            </div>
          </aside>

          {/* Job Results */}
          <div className="jobs-content">
            <div className="jobs-header">
              <p className="text-gray-600 font-medium">Showing <strong>{ALL_JOBS.length}</strong> opportunities in Goa</p>
              <div className="view-toggles">
                <button 
                  className={`view-toggle ${view === 'list' ? 'active' : ''}`}
                  onClick={() => setView('list')}
                  aria-label="List View"
                >
                  <List size={20} />
                </button>
                <button 
                  className={`view-toggle ${view === 'grid' ? 'active' : ''}`}
                  onClick={() => setView('grid')}
                  aria-label="Grid View"
                >
                  <LayoutGrid size={20} />
                </button>
              </div>
            </div>

            <div className={`jobs-grid ${view === 'grid' ? 'grid-view' : 'list-view'}`}>
              {ALL_JOBS.map(job => (
                <Card key={job.id} className={view === 'list' ? 'job-card-list' : 'flex flex-col h-full'}>
                  <div className="job-header">
                    <div className="job-company mb-3">
                      <div className="w-12 h-12 rounded bg-sand-light flex items-center justify-center text-terracotta font-bold text-xl flex-shrink-0">
                        {job.company.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray">{job.company}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex flex-wrap gap-2 text-sm text-gray-700 ${view === 'grid' ? 'mb-4 flex-col' : 'flex-1 items-center'}`}>
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"><MapPin size={14} className="text-turquoise" /> {job.location}</span>
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"><Briefcase size={14} className="text-turquoise" /> {job.pay}</span>
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"><Clock size={14} className="text-turquoise" /> {job.type}</span>
                  </div>
                  
                  <div className={view === 'list' ? 'job-actions' : 'mt-auto pt-4 border-t border-gray-200'}>
                    <p className="text-xs text-gray-400 mb-2">{job.posted}</p>
                    <Link to={`/jobs/${job.id}`} className="btn btn-primary w-full text-center">Quick Apply</Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
