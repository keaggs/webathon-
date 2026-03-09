import React from 'react';
import { Camera, MapPin, Briefcase, Mail, Phone, Edit3, CheckCircle, UploadCloud, Download, Plus, FileText } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Profile() {
  return (
    <Layout>
      <div className="bg-turquoise-light border-b border-gray-200 py-12 relative">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-sand">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-terracotta text-white rounded-full hover:bg-terracotta-dark transition-colors border-2 border-white shadow-sm" aria-label="Edit photo">
                <Camera size={16} />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Rohan Naik</h1>
                <span className="badge badge-green">
                  <CheckCircle size={14} /> Verified Goan Youth
                </span>
              </div>
              <p className="text-lg text-gray-700 font-medium mb-2">22 Years Old • Job Seeker</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1"><MapPin size={16} className="text-turquoise" /> Mapusa, North Goa</span>
                <span className="flex items-center gap-1"><Mail size={16} className="text-turquoise" /> rohan.naik@example.com</span>
                <span className="flex items-center gap-1"><Phone size={16} className="text-turquoise" /> +91 98765 43210</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="bg-white"><Edit3 size={16} /> Edit Profile</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-deep-green">About Me</h2>
                <button className="text-terracotta hover:underline text-sm font-bold flex items-center gap-1"><Edit3 size={14}/> Edit</button>
              </div>
              <p className="text-gray-700">
                A passionate and eager learner looking for opportunities in the Hospitality and Tourism sector. Born and raised in Mapusa, I have a deep love for Goan culture and love interacting with people from all over the world. I am organized, friendly, and always ready to learn new skills.
              </p>
            </Card>

            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-deep-green">Experience & Education</h2>
                <button className="text-terracotta hover:underline text-sm font-bold flex items-center gap-1"><Plus size={14}/> Add New</button>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-sand-light rounded-md flex items-center justify-center text-terracotta">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Hospitality Intern</h3>
                    <p className="text-gray-600">Sunset Beach Resort • Anjuna</p>
                    <p className="text-sm text-gray-500 mb-2">Oct 2024 - Dec 2024 (3 mos)</p>
                    <p className="text-sm text-gray-700">Assisted at the front desk, managed guest inquiries, and helped coordinate small events at the resort.</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 flex gap-4">
                  <div className="w-12 h-12 bg-turquoise-light rounded-md flex items-center justify-center text-turquoise-dark">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Bachelors in Arts</h3>
                    <p className="text-gray-600">St. Xavier's College • Mapusa</p>
                    <p className="text-sm text-gray-500">Graduated: June 2024</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-deep-green mb-4">Application History</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h4 className="font-bold">Front Desk Executive</h4>
                    <p className="text-sm text-gray-600">Goa Seas Resort • Applied 2 days ago</p>
                  </div>
                  <span className="badge" style={{background: '#fef3c7', color: '#d97706', alignSelf: 'flex-start'}}>Shortlisted</span>
                </div>
                <div className="border border-gray-200 rounded p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h4 className="font-bold">Event Coordinator</h4>
                    <p className="text-sm text-gray-600">Sunburn Entertainment • Applied 1 week ago</p>
                  </div>
                  <span className="badge" style={{background: '#e0e7ff', color: '#4338ca', alignSelf: 'flex-start'}}>Applied</span>
                </div>
                <div className="border border-gray-200 rounded p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h4 className="font-bold">Social Media Intern</h4>
                    <p className="text-sm text-gray-600">Goa Tourism Board • Applied 1 month ago</p>
                  </div>
                  <span className="badge badge-green" style={{alignSelf: 'flex-start'}}>Hired</span>
                </div>
              </div>
            </Card>
          </div>
          
          <aside className="space-y-6">
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-deep-green">Top Skills</h3>
                <button className="text-terracotta"><Edit3 size={16} /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-gray">Communication</span>
                <span className="badge badge-gray">English (Fluent)</span>
                <span className="badge badge-gray">Konkani (Native)</span>
                <span className="badge badge-gray">Customer Service</span>
                <span className="badge badge-gray">Microsoft Office</span>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-lg text-deep-green mb-4">Resume</h3>
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between mb-4 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-terracotta-light text-terracotta p-2 rounded">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">rohan_naik_resume.pdf</p>
                    <p className="text-xs text-gray-500">Updated 2 days ago</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-terracotta"><Download size={20} /></button>
              </div>
              <Button variant="outline" className="w-full border-dashed border-2 flex items-center justify-center gap-2">
                <UploadCloud size={18} /> Replace Resume
              </Button>
            </Card>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
