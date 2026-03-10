import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, Bookmark, Share2, ShieldCheck, FileText, ChevronLeft } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

export default function JobDetail() {
  const { id } = useParams();
  
  // Using mock data for ID 1
  const job = {
    title: 'Front Desk Executive',
    company: 'Goa Seas Resort',
    location: 'Calangute, North Goa',
    pay: '₹15,000 - ₹20,000/mo',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'We are looking for a friendly and professional Front Desk Executive to join our luxury resort team in Calangute. You will be the first point of contact for our guests, ensuring they have a memorable Goan holiday experience from the moment they arrive.',
    requirements: [
      'Must be a resident of Goa (18-30 years).',
      'Fluent in English, Hindi, and Konkani.',
      'Excellent communication and interpersonal skills.',
      'Basic computer knowledge and ability to use hotel management software.'
    ],
    aboutCompany: 'Goa Seas Resort is a premier 5-star beachfront property located in the heart of Calangute. We pride ourselves on authentic Goan hospitality combined with world-class amenities.'
  };

  return (
    <Layout>
      <div className="bg-sand-light border-b border-gray-200">
        <div className="container py-8">
          <Link to="/jobs" className="inline-flex items-center gap-1 text-terracotta hover:underline mb-6 text-sm font-bold">
            <ChevronLeft size={16} /> Back to Jobs
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-md bg-white border border-gray-200 flex items-center justify-center text-terracotta font-bold text-2xl flex-shrink-0 shadow-sm">
                {job.company.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{job.title}</h1>
                <p className="text-lg text-gray-700 font-medium mb-3">{job.company}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><MapPin size={16} className="text-turquoise" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Briefcase size={16} className="text-turquoise" /> {job.pay}</span>
                  <span className="flex items-center gap-1"><Clock size={16} className="text-turquoise" /> {job.type}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[200px]">
              <Button className="w-full">Apply Now</Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1"><Bookmark size={16} /> Save</Button>
                <Button variant="ghost" className="flex-1 border border-gray-300"><Share2 size={16} /> Share</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-deep-green mb-4 border-b border-gray-200 pb-2">Job Description</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{job.description}</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-deep-green mb-4 border-b border-gray-200 pb-2">Requirements & Skills</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 text-lg">
                {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-deep-green mb-4 border-b border-gray-200 pb-2">About The Employer</h2>
              <p className="text-gray-700 text-lg">{job.aboutCompany}</p>
            </section>
          </div>
          
          <aside className="space-y-6">
            <Card>
              <h3 className="font-bold text-lg mb-4 text-center">Employer Verified</h3>
              <div className="flex items-center justify-center gap-2 text-turquoise-dark bg-turquoise-light p-3 rounded-lg mb-4">
                <ShieldCheck size={20} />
                <span className="font-bold">Verified Local Business</span>
              </div>
              <p className="text-sm text-center text-gray-600 mb-4">
                This employer has been verified by the GoaWorks team.
              </p>
              <Button variant="outline" className="w-full">View Company Profile</Button>
            </Card>

            <Card className="bg-sand-light border-none shadow-none">
              <h3 className="font-bold text-lg mb-2">Resume Ready?</h3>
              <p className="text-sm text-gray-600 mb-4">Make sure your Youth Profile is up to date before applying.</p>
              <Link to="/profile" className="flex items-center justify-center gap-2 text-terracotta font-bold hover:underline">
                <FileText size={16} /> Update Profile
              </Link>
            </Card>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
