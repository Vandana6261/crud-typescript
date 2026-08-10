import React, { useState } from 'react';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitApi?: (payload: JobFormData) => Promise<void> | void;
}

export interface JobFormData {
  title: string;
  companyName: string;
  companyWebsite: string;
  contactEmail: string;
  location: string;
  employmentType: string;
  experience: string;
  salary?: string;
  skills: string | string[];
  description: string;
  applicationStartDate: string;
  applicationDeadline: string;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ isOpen, onClose, onSubmitApi }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    companyWebsite: '',
    contactEmail: '',
    location: '',
    employmentType: 'Full-time',
    experience: '',
    salary: '',
    skills: '',
    description: '',
    applicationStartDate: '',
    applicationDeadline: ''
  });

  const [formError, setFormError] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setApiError('');

    const requiredFields: (keyof typeof formData)[] = [
      'title',
      'companyName',
      'companyWebsite',
      'contactEmail',
      'location',
      'employmentType',
      'experience',
      'skills',
      'description',
      'applicationStartDate',
      'applicationDeadline'
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        setFormError(`Please fill out all required fields. Missing: ${field}`);
        console.log(formError)
        return;
      }
    }

    const payload: JobFormData = {
      ...formData,
      skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      applicationStartDate: new Date(formData.applicationStartDate).toISOString(),
      applicationDeadline: new Date(formData.applicationDeadline).toISOString(),
    };

    setIsSubmitting(true);
    try {
      if (onSubmitApi) {
        await onSubmitApi(payload);
      }
      onClose();
    } catch (err: any) {
      setApiError(err.message || 'Failed to submit data to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden text-body">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cardBorder bg-inputBg">
          <h2 className="text-xl font-semibold text-title">
            Job Position Details
          </h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-title text-xl font-bold px-2 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {formError && (
            <div className="p-3 rounded-lg bg-alert/10 border border-alert text-alert text-sm">
              {formError}
            </div>
          )}

          {apiError && (
            <div className="p-3 rounded-lg bg-alert/10 border border-alert text-alert text-sm">
              {apiError}
            </div>
          )}

          <form id="jobForm" onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* title */}
              <div>
                <label className="block text-sm font-medium text-title mb-1">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Backend Developer"
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* company name */}
              <div>
                <label className="block text-sm font-medium text-title mb-1">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Example Company"
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* company website */}
              <div>
                <label className="block text-sm font-medium text-title mb-1">Company Website *</label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* contact email */}
              <div>
                <label className="block text-sm font-medium text-title mb-1">Contact Email *</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* location */}
              <div>
                <label className="block text-sm font-medium text-title mb-1">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Bhopal, India"
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* Employment type */}
              <div>
                <label className="block text-sm font-medium text-title mb-1">Employment Type *</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title focus:outline-none focus:border-primary text-sm"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-title mb-1">Experience *</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="2+ years"
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* salary */}
              <div>
                <label className="block text-sm font-medium text-title mb-1">Salary <span className="text-muted">(Optional)</span></label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="6-10"
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

            {/* skills */}
            <div>
              <label className="block text-sm font-medium text-title mb-1">Skills * <span className="text-muted">(comma-separated)</span></label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Node.js, MongoDB, TypeScript"
                className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
              />
            </div>

            {/* description */}
            <div>
              <label className="block text-sm font-medium text-title mb-1">Description *</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="We are looking for a backend developer..."
                className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* app. start date */}
              <div>
                <label className="block text-sm font-medium text-title mb-1">Application Start Date *</label>
                <input
                  type="date"
                  name="applicationStartDate"
                  value={formData.applicationStartDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* app. deadline */}
              <div>
                <label className="block text-sm font-medium text-title mb-1">Application Deadline *</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

          </form>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-cardBorder bg-inputBg">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-title border border-cardBorder transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="jobForm"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg text-sm font-medium bg-primary hover:bg-primaryHover text-white transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Details'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default JobApplicationModal;