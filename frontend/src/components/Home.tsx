import React, { useState, useEffect } from 'react';
import type { JobItem, ApiResponse } from '../types/job.types';
import { getJobs } from '../services/jobsApi';

export const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const result = await getJobs();

        if (result.success) {
          setJobs(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch jobs", error);
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
    <div className="min-h-screen bg-[var(--color-page)] text-[var(--color-body)] transition-colors duration-300">
      {/* Hero Section */}
      <header className="glass-panel border-x-0 border-t-0 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-[var(--color-title)]">
            Find Your Dream Tech Job
          </h1>
          <p className="text-lg text-[var(--color-body)] mb-8">
            Discover top opportunities from innovative companies.
          </p>
          
          {/* Search Bar */}
          <div className="flex items-center bg-[var(--color-inputBg)] border border-[var(--color-inputBorder)] rounded-xl p-2 shadow-2xl max-w-xl mx-auto backdrop-blur-xl">
            <svg className="w-5 h-5 text-[var(--color-placeholder)] ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by title, company, or skills..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-transparent text-[var(--color-title)] placeholder-[var(--color-placeholder)] focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-title)]">Featured Openings</h2>
          <span className="text-sm font-medium text-[var(--color-muted)]">{filteredJobs.length} Jobs Available</span>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto"></div>
            <p className="mt-4 text-[var(--color-muted)]">Loading listings...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl">
            <p className="text-[var(--color-muted)] text-lg">No matching jobs found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <div 
                key={job._id} 
                className="glass-panel rounded-2xl p-6 hover:border-[var(--color-primary)]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--color-title)] group-hover:text-[var(--color-primary)] transition-colors">
                        {job.title}
                      </h3>
                      <a 
                        href={job.companyWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm font-semibold text-[var(--color-secondary)] hover:underline"
                      >
                        {job.companyName} ↗
                      </a>
                    </div>
                    <span className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      {job.employmentType}
                    </span>
                  </div>

                  {/* Details Badges */}
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-[var(--color-muted)] mb-4">
                    <div className="flex items-center gap-1">
                      📍 {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      ⏳ {job.experience}
                    </div>
                    <div className="flex items-center gap-1 font-medium text-[var(--color-secondary)]">
                      💰 {job.salary}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[var(--color-body)] text-sm mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {job?.skills?.length && job?.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-[var(--color-inputBg)] border border-[var(--color-cardBorder)] text-[var(--color-body)] text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[var(--color-cardBorder)] flex items-center justify-between">
                  <span className="text-xs text-[var(--color-muted)]">
                    Posted: {new Date(job?.createdAt).toLocaleDateString()}
                  </span>
                  <a 
                    href={`mailto:${job.contactEmail}?subject=Application for ${job.title}`}
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primaryHover)] text-black font-semibold text-sm px-4 py-2 rounded-xl transition-colors shadow-lg shadow-[var(--color-primary)]/20"
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