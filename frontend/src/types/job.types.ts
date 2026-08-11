export interface JobItem {
  _id: string;
  title: string;
  companyName: string;
  companyWebsite: string;
  contactEmail: string;
  location: string;
  employmentType: string;
  experience?: string;
  salary?: string;
  skills: string[];
  description: string;
  createdAt: String;
  updatedAt: String;
  applicationStartDate?: Date;
  applicationDeadline?: Date;
  // recruiter id (ObjectId)
  recruiter?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: JobItem[];
}