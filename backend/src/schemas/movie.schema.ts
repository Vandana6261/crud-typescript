import { z } from "zod";

export const createMovieSchema = z.object({
  movieName: z
    .string()
    .min(1, "Movie name is required"),

  country: z
    .string()
    .min(1, "Country is required"),

  genre: z
    .string()
    .min(1, "Genre is required"),

  whereToWatch: z
    .string()
    .min(1, "Where to watch is required"),

  rating: z
    .number()
    .min(0)
    .max(10),

  releasedYear: z
    .number()
    .optional(),
});


export const updateMovieSchema = createMovieSchema.partial();