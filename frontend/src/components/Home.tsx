import React, { useState, useEffect } from 'react';
import type { JobItem, ApiResponse } from '../types/job.types';
import { getJobs } from '../services/jobsApi';

// Mock data based on your exact API response
const mockApiResponse: ApiResponse = {
  success: true,
  data: [
    {
      _id: "6a7459eeb5b70b9acfbe65ba",
      title: "Backend Developer",
      companyName: "Bidyut",
      companyWebsite: "https://www.technovasolutions.com",
      contactEmail: "jobs@technovasolutions.com",
      location: "Bangalore, India",
      employmentType: "Full-time",
      experience: "2-4 yrs",
      salary: "8-12 LPA",
      skills: ["Node.js", "TypeScript", "MongoDB", "Express.js"],
      description: "We are looking for a backend developer who has experience building REST APIs using Node.js and TypeScript. The candidate should understand databases, API design, and server-side development.",
      createdAt: "2026-08-06T09:54:54.844Z",
      updatedAt: "2026-08-06T09:59:25.890Z",
    },
    {
      _id: "6a74621bc43cac101b469c31",
      title: "Full Stack Developer",
      companyName: "CloudEdge Technologies",
      companyWebsite: "https://www.cloudedgetechnologies.com",
      contactEmail: "careers@cloudedgetechnologies.com",
      location: "Pune, India",
      employmentType: "Full-time",
      experience: "3+ yrs",
      salary: "12+ LPA",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
      description: "We are hiring a Full Stack Developer to build scalable web applications. The ideal candidate should have experience with frontend development, backend APIs, databases, and cloud deployment.",
      createdAt: "2026-08-06T10:29:47.084Z",
      updatedAt: "2026-08-06T10:29:47.084Z",
    }
  ]
};


export const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Simulating API fetch. Replace this block with your actual `fetch()` call.
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const result = await getJobs();

        if (result.success) {
          setJobs(result.data);
        }
        // const response = await fetch('YOUR_API_ENDPOINT');
        // const result: ApiResponse = await response.json();
        
      } catch (error) {
        console.error("Failed to fetch jobs", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4 text-center shadow-md">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Find Your Dream Tech Job</h1>
          <p className="text-lg text-blue-100 mb-8">Discover top opportunities from innovative companies.</p>
          
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-lg p-2 shadow-lg max-w-xl mx-auto">
            <svg className="w-5 h-5 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by title, company, or skills..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Openings</h2>
          <span className="text-sm font-medium text-gray-500">{filteredJobs.length} Jobs Available</span>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading listings...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">No matching jobs found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <div 
                key={job._id} 
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <a 
                        href={job.companyWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm font-semibold text-blue-600 hover:underline"
                      >
                        {job.companyName} ↗
                      </a>
                    </div>
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      {job.employmentType}
                    </span>
                  </div>

                  {/* Details Badges */}
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      📍 {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      ⏳ {job.experience}
                    </div>
                    <div className="flex items-center gap-1 font-medium text-emerald-600">
                      💰 {job.salary}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {job?.skills?.length && job?.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Posted: {new Date(job?.createdAt).toLocaleDateString()}
                  </span>
                  <a 
                    href={`mailto:${job.contactEmail}?subject=Application for ${job.title}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};