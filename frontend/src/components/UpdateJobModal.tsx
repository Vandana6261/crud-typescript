import React, { useEffect, useState } from "react";
import api from "../api/axios";
import type { JobItem } from "../types/job.types";
import { updateJob } from "../services/jobsApi";

interface UpdateJobModalProps {
  isOpen: boolean;
  job: JobItem | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface UpdateFormData {
  title: string;
  companyName: string;
  companyWebsite: string;
  contactEmail: string;
  location: string;
  employmentType: string;
  experience: string;
  salary: string;
  skills: string;
  description: string;
  applicationStartDate: string;
  applicationDeadline: string;
}

const emptyForm: UpdateFormData = {
  title: "",
  companyName: "",
  companyWebsite: "",
  contactEmail: "",
  location: "",
  employmentType: "Full-time",
  experience: "",
  salary: "",
  skills: "",
  description: "",
  applicationStartDate: "",
  applicationDeadline: "",
};

/** Converts a Date/string from the API into the value expected by <input type="date" />.*/
const formatDateForInput = (date?: Date | string): string => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const UpdateJobModal: React.FC<UpdateJobModalProps> = ({
  isOpen,
  job,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<UpdateFormData>(emptyForm);
  const [formError, setFormError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormData = {
    title: job?.title ?? "",
    companyName: job?.companyName ?? "",
    companyWebsite: job?.companyWebsite ?? "",
    contactEmail: job?.contactEmail ?? "",
    location: job?.location ?? "",
    employmentType: job?.employmentType ?? "Full-time",
    experience: job?.experience ?? "",
    salary: job?.salary ?? "",
    skills: job?.skills?.join(", ") ?? "",
    description: job?.description ?? "",
    applicationStartDate: formatDateForInput(job?.applicationStartDate),
    applicationDeadline: formatDateForInput(job?.applicationDeadline),
  }

  /* Whenever a different job is selected, populate the form with that job's existing values.*/
  useEffect(() => {
    if (!job) {
      setFormData(emptyForm);
      return;
    }

    setFormData(initialFormData);

    setFormError("");
    setApiError("");
  }, [job]);

  if (!isOpen || !job) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }

    if (apiError) {
      setApiError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError("");
    setApiError("");

    const requiredFields: (keyof UpdateFormData)[] = [
      "title",
      "companyName",
      "companyWebsite",
      "contactEmail",
      "location",
      "employmentType",
      "experience",
      "skills",
      "description",
      "applicationStartDate",
      "applicationDeadline",
    ];

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        setFormError(`Please fill out all required fields. Missing: ${field}`);
        return;
      }
    }

    // Convert comma-separated skills back into an array.
    const skills = formData.skills.split(",").map((skill) => skill.trim()).filter(Boolean);

    if (skills.length === 0) {
      setFormError("Please enter at least one skill.");
      return;
    }

    // Validate dates.
    const startDate = new Date(formData.applicationStartDate);
    const deadlineDate = new Date(formData.applicationDeadline);

    if (Number.isNaN(startDate.getTime())) {
      setFormError("Please enter a valid application start date.");
      return;
    }

    if (Number.isNaN(deadlineDate.getTime())) {
      setFormError("Please enter a valid application deadline.");
      return;
    }

    if (deadlineDate < startDate) {
      setFormError(
        "Application deadline cannot be before the application start date."
      );
      return;
    }

    const payload = {
      title: formData.title.trim(),
      companyName: formData.companyName.trim(),
      companyWebsite: formData.companyWebsite.trim(),
      contactEmail: formData.contactEmail.trim(),
      location: formData.location.trim(),
      employmentType: formData.employmentType,
      experience: formData.experience.trim(),
      salary: formData.salary.trim(),
      skills,
      description: formData.description.trim(),
      applicationStartDate: startDate.toISOString(),
      applicationDeadline: deadlineDate.toISOString(),
    };

    try {
      setIsSubmitting(true);
      const result = await updateJob(job._id, payload);
      
      if(result.success) {
        onClose();
        onSuccess();
      }
      setFormData(initialFormData);
    } catch (error: any) {
      console.error("Failed to update job:", error);

      setApiError(
        error?.response?.data?.message ||
          error?.response?.data?.errors?.[0]?.message ||
          "Failed to update job. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    setFormError("");
    setApiError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden text-body">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cardBorder bg-inputBg">
          <div>
            <h2 className="text-xl font-semibold text-title">
              Update Job Position
            </h2>

            <p className="text-xs text-muted mt-1">
              Update the details of "{job.title}"
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-muted hover:text-title text-2xl font-bold px-2 transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto flex-1">
          {formError && (
            <div className="mb-4 p-3 rounded-lg bg-alert/10 border border-alert text-alert text-sm">
              {formError}
            </div>
          )}

          {apiError && (
            <div className="mb-4 p-3 rounded-lg bg-alert/10 border border-alert text-alert text-sm">
              {apiError}
            </div>
          )}

          <form
            id="updateJobForm"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Title + Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-title mb-1">
                  Job Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Backend Developer"
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-title mb-1">
                  Company Name *
                </label>

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

            {/* Website + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-title mb-1">
                  Company Website *
                </label>

                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-title mb-1">
                  Contact Email *
                </label>

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

            {/* Location + Employment Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-title mb-1">
                  Location *
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Bhopal, India"
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-title mb-1">
                  Employment Type *
                </label>

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

            {/* Experience + Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-title mb-1">
                  Experience *
                </label>

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="2+ years"
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-title mb-1">
                  Salary{" "}
                  <span className="text-muted">(Optional)</span>
                </label>

                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="6-10 LPA"
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-title mb-1">
                Skills *{" "}
                <span className="text-muted">(comma-separated)</span>
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Node.js, MongoDB, TypeScript"
                className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-title mb-1">
                Description *
              </label>

              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="We are looking for a backend developer..."
                className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title placeholder-placeholder focus:outline-none focus:border-primary text-sm resize-none"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-title mb-1">
                  Application Start Date *
                </label>

                <input
                  type="date"
                  name="applicationStartDate"
                  value={formData.applicationStartDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-lg bg-inputBg border border-inputBorder text-title focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-title mb-1">
                  Application Deadline *
                </label>

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

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-cardBorder bg-inputBg">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg text-sm font-medium text-body hover:text-title border border-cardBorder hover:bg-card transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="updateJobForm"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary hover:bg-primaryHover text-zinc-950 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Updating..." : "Update Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateJobModal;
