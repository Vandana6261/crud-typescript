import { Request, Response } from "express";
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

  const job = await createJob(jobData);

  return res.status(201).json({
    success: true,
    data: job,
  });
};

export const updateJob = async (req: Request<JobParams>, res: Response) => {
  const jobData = updateJobSchema.parse(req.body);

  const { id } = req.params;

  const job = await updateJobService(id, jobData);

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  return res.status(200).json({
    success: true,
    data: job,
  });
};

export const deleteJob = async (req: Request<JobParams>, res: Response) => {
  const { id } = req.params;

  const job = await deleteJobService(id);

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
};