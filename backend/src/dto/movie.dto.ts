// export interface CreateMovieDTO {
//   movieName: string;
//   country: string;
//   genre: string;
//   whereToWatch: string;
//   rating: number;
//   releasedYear?: number;
// }


import { z } from "zod";
import { createMovieSchema, updateMovieSchema } from "../schemas/movie.schema";

export type CreateMovieDTO = z.infer<typeof createMovieSchema>;

export type UpdateMovieDTO = z.infer<typeof updateMovieSchema>;