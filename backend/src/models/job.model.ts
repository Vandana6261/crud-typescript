import mongoose, { Schema } from "mongoose";
import { IJob } from "../types/job.types";

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyWebsite: {
      type: String,
      required: true,
      trim: true,
    },

    contactEmail: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      required: true,
    },

    experience: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: String,
      trim: true,
    },

    skills: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    description: {
      type: String,
      required: true,
      trim: true,
    },
    applicationStartDate: {
      type: Date,
      required: true,
    },

    applicationDeadline: {
      type: Date,
      required: true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model<IJob>("Job", jobSchema);

export default Job;