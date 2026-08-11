import api from "../api/axios";
import type { ApiResponse, JobItem } from "../types/job.types";

export interface JobCreatePayload {
  title: string;
  companyName: string;
  companyWebsite: string;
  contactEmail: string;
  location: string;
  employmentType: string;
  experience: string;
  salary: string;
  skills: string[];
  description: string;
  applicationStartDate: string;
  applicationDeadline: string;
}

export const getJobs = async ():Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/jobs');
    return response.data
}


export const getJobById = async (id: string): Promise<JobItem> => {
  const response = await api.get<JobItem>(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData: JobCreatePayload):Promise<ApiResponse> => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};

export const updateJob = async (id: string, jobData: JobCreatePayload) => {
  const response = await api.patch(`/jobs/${id}`, jobData);
  return response.data;
};

export const deleteJob = async (id: string) => {
  const response = await api.delete(`/jobs/${id}`);

  return response.data;
};
