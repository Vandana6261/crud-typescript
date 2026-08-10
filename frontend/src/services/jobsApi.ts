import api from "../api/axios";
import type { ApiResponse, JobItem } from "../types/job.types";

export const getJobs = async ():Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/jobs');
    console.log(response.data);
    return response.data
}


export const getJobById = async (id: string): Promise<JobItem> => {
  const response = await api.get<JobItem>(`/jobs/${id}`);
  return response.data;
};

// export const createJob = async (jobData: ...) => {
//   const response = await api.post('/jobs', jobData);

//   return response.data;
// };

// export const updateJob = async (id: string, jobData: ...) => {
//   const response = await api.put(`/jobs/${id}`, jobData);

//   return response.data;
// };

// export const deleteJob = async (id: string) => {
//   const response = await api.delete(`/jobs/${id}`);

//   return response.data;
// };


// export const getJobs2 = async (): Promise<ApiResponse> => {
//     const response = await fetch("http://localhost:5000/api/jobs", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });

//     if (!response.ok) {
//         console.log(response, "response");
//         throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     // console.log(response, "response");
    
//     const data: ApiResponse = await response.json();

//     console.log("Backend data:", data);

//     return data;
// };