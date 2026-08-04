import { Document } from "mongoose";

// this Documents tell that This Movie object has all Mongoose document features plus my custom movie fields
export interface IMovie extends Document {
  movieName: string;
  country: string;
  genre: string;
  whereToWatch: string;
  rating: number;
  releasedYear?: number;
}