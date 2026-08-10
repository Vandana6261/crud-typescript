import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1, "Job title is required"),

  companyName: z.string().min(1, "Company name is required"),

  companyWebsite: z.url("Please enter a valid company website URL"),

  contactEmail: z.email("Please enter a valid contact email"),

  location: z.string().min(1, "Location is required"),

  employmentType: z.enum([
    "Full-time",
    "Part-time",
    "Internship",
    "Contract",
  ]),

  experience: z.string().min(1, "Experience is required"),

  salary: z.string().optional(),

  skills: z.array(z.string().min(1)).min(1, "At least one skill is required"),

  description: z.string().min(10, "Description should be at least 10 characters"),

  applicationStartDate: z.coerce.date(),

  applicationDeadline: z.coerce.date(),
});

export const updateJobSchema = createJobSchema.partial();