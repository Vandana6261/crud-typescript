import { CreateJobDTO, UpdateJobDTO } from "../dto/job.dto";
import Job from "../models/job.model";

export const getJobs = async () => {
  const jobs = await Job.find();
  return jobs;
};

export const createJob = async (jobData: CreateJobDTO) => {
  const job = await Job.create(jobData);
  return job;
};

export const updateJobService = async (
  id: string,
  jobData: UpdateJobDTO
) => {
  const updatedJob = await Job.findByIdAndUpdate(
    id,
    { $set: jobData },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  return updatedJob;
};

export const deleteJobService = async (id: string) => {
  const deletedJob = await Job.findByIdAndDelete(id);
  return deletedJob;
};