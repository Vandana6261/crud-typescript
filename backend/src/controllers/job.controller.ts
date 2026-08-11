import Job from "../models/job.model";
import {
  createJob,
  getJobs,
  updateJobService,
  deleteJobService,
} from "../services/job.services"
import {
  createJobSchema,
  updateJobSchema,
} from "../schemas/job.schema";
import AppError from "../utils/AppError";

interface JobParams {
  id: string;
}

export const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await getJobs();

  return res.status(200).json({
    success: true,
    data: jobs,
  });
};

export const addJob = async (req: Request, res: Response) => {
  const jobData = createJobSchema.parse(req.body);
  const recruiterId = req.user.userId;
  const job = await createJob(jobData, recruiterId);
  return res.status(201).json({
    success: true,
    data: job,
  });
};

export const updateJob = async (req: Request<JobParams>, res: Response) => {
  const jobData = updateJobSchema.parse(req.body);
  const { id } = req.params;
  const recruiterId = req.user.userId;

  // Ensure the job belongs to the recruiter
  const existingJob = await Job.findById(id);
  if (!existingJob) {
    throw new AppError("Job not found", 404);
  }
  if (existingJob.recruiter?.toString() !== recruiterId) {
    throw new AppError("Not authorized to edit this job", 403);
  }

  const job = await updateJobService(id, jobData);
  return res.status(200).json({
    success: true,
    data: job,
  });
};

export const deleteJob = async (req: Request<JobParams>, res: Response) => {
  const { id } = req.params;
  const recruiterId = req.user.userId;

  const existingJob = await Job.findById(id);
  if (!existingJob) {
    throw new AppError("Job not found", 404);
  }
  if (existingJob.recruiter?.toString() !== recruiterId) {
    throw new AppError("Not authorized to delete this job", 403);
  }

  const job = await deleteJobService(id);
  return res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
};