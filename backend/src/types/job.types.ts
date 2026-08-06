import { Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  companyName: string;
  companyWebsite: string;
  contactEmail: string;
  location: string;

  employmentType:
    | "Full-time"
    | "Part-time"
    | "Internship"
    | "Contract";

  experience: string;

  salary?: string;

  skills: string[];

  description: string;
}