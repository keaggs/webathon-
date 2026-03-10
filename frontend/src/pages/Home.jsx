import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, Coffee, Plane, Monitor, Fish, Tractor, ShoppingBag, Music, Landmark, Heart } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import './Home.css';

// Mock Data
const CATEGORIES = [
  { name: 'Hospitality & Hotels', icon: <Coffee size={32} /> },
  { name: 'Tourism & Travel', icon: <Plane size={32} /> },
  { name: 'IT & Tech', icon: <Monitor size={32} /> },
  { name: 'Fishing & Marine', icon: <Fish size={32} /> },
  { name: 'Agriculture & Farms', icon: <Tractor size={32} /> },
  { name: 'Retail & Shops', icon: <ShoppingBag size={32} /> },
  { name: 'Events & Entertainment', icon: <Music size={32} /> },
  { name: 'Government & NGOs', icon: <Landmark size={32} /> },
];

const FEATURED_JOBS = [
  { id: 1, title: 'Front Desk Executive', company: 'Goa Seas Resort', location: 'Calangute, North Goa', pay: '₹15,000 - ₹20,000/mo', type: 'Full-time' },
  { id: 2, title: 'Junior React Developer', company: 'TechGoa Solutions', location: 'Porvorim, North Goa', pay: '₹25,000 - ₹35,000/mo', type: 'Full-time' },
  { id: 3, title: 'Event Coordinator', company: 'Sunburn Entertainment', location: 'Vagator, North Goa', pay: '₹20,000/mo', type: 'Contract' },
];

const FEATURED_INTERNSHIPS = [
  { id: 4, title: 'Social Media Intern', company: 'Goa Tourism Board', location: 'Panjim', pay: '₹8,000/mo Stipend', type: 'Internship' },
  { id: 5, title: 'Marine Conservation Intern', company: 'Save Our Seas NGO', location: 'South Goa', pay: 'Unpaid / Certificate', type: 'Internship' },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All Goa');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/jobs');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <span className="badge badge-terracotta mb-4 px-4 py-1 text-sm">Welcome to GoaWorks</span>
          <h1 className="text-5xl mb-4" style={{ color: 'var(--deep-green)' }}>Your First Opportunity<br/>Starts in Goa</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Find jobs, internships, and entry-level positions tailored exclusively for the youth of our beautiful coastal state.
          </p>
          
          <form onSubmit={handleSearch} className="hero-search-container">
            <Search className="text-gray-400 ml-4" size={24} />
            <input 
              type="text" 
              className="hero-search-input" 
              placeholder="Search by job title, skill, or employer..." 
            />
            <Button type="submit" className="rounded-full px-8 hidden sm:flex">Search</Button>
          </form>

          <div className="filter-chips">
            {['All Goa', 'North Goa', 'South Goa', 'Remote'].map(chip => (
              <button
                key={chip}
                className={`chip ${activeFilter === chip ? 'active' : ''}`}
                onClick={() => setActiveFilter(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl text-center text-deep-green mb-12">Browse by Sector</h2>
          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="category-card" onClick={() => navigate('/jobs')}>
                <div className="category-icon">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-800">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl text-deep-green">Featured Jobs</h2>
            <Link to="/jobs" className="text-terracotta font-bold hover:underline">View All &rarr;</Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_JOBS.map(job => (
              <Card key={job.id} className="job-list-card">
                <div className="job-header">
                  <div className="job-company">
                    <div className="job-logo">{job.company.charAt(0)}</div>
                    <div>
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <p className="text-sm text-gray">{job.company}</p>
                    </div>
                  </div>
                  <span className="badge badge-sand">{job.type}</span>
                </div>
                
                <div className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2"><MapPin size={16} className="text-turquoise" /> {job.location}</div>
                  <div className="flex items-center gap-2"><Briefcase size={16} className="text-turquoise" /> {job.pay}</div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-200 w-full">
                  <Link to={`/jobs/${job.id}`} className="btn w-full btn-outline">View Details</Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Internships */}
      <section className="py-16 bg-sand-light">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl text-deep-green">Latest Internships</h2>
            <Link to="/jobs?type=internship" className="text-terracotta font-bold hover:underline">View All &rarr;</Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {FEATURED_INTERNSHIPS.map(job => (
              <Card key={job.id} className="job-list-card">
                <div className="job-header">
                  <div className="job-company">
                    <div className="job-logo">{job.company.charAt(0)}</div>
                    <div>
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <p className="text-sm text-gray">{job.company}</p>
                    </div>
                  </div>
                  <span className="badge badge-turquoise">{job.type}</span>
                </div>
                
                <div className="flex-col gap-2 flex mt-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2"><MapPin size={16} className="text-turquoise" /> {job.location}</div>
                  <div className="flex items-center gap-2"><Briefcase size={16} className="text-turquoise" /> {job.pay}</div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <Link to={`/jobs/${job.id}`} className="btn w-full btn-primary">Apply Now</Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="testimonial-section">
        <div className="container">
          <Heart size={48} className="text-sand mx-auto mb-6" />
          <h2 className="text-3xl mb-8">Goan Youth Success Stories</h2>
          
          <div className="testimonial-card">
            <p className="text-xl italic mb-6">
              "GoaWorks helped me find my first internship in Panjim without having to move out of state. It's so focused on local opportunities and really understands what we need."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                <img src="https://i.pravatar.cc/150?img=47" alt="Priya S." className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sand">Priya S.</h4>
                <p className="text-sm text-gray-300">Hired at TechGoa Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
