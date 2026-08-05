import { Request, Response } from "express";
import { createMovie, getMovies, updateMovieService, deleteMovieService } from "../services/movie.services"
import { createMovieSchema, updateMovieSchema } from "../schemas/movie.schema";
import AppError from "../utils/AppError";

interface MovieParams {
  id: string;
}

export const getAllMovies = async (req: Request, res: Response) => {
    const movies = await getMovies();

    return res.status(200).json({success: true, data: movies});
}

export const addMovie = async (req: Request, res: Response) => {
    const movieData = createMovieSchema.parse(req.body);
    const movie = await createMovie(movieData);
    return res.status(201).json({success: true, data: movie});
}


export const updateMovie = async (req: Request<MovieParams>, res: Response) => {
    const movieData = updateMovieSchema.parse(req.body);
    const { id } = req.params;
    const movie = await updateMovieService(id, movieData);
    if(!movie) throw new AppError("Movie not found", 404);
    return res.status(200).json({success: true, data: movie});
}

export const deleteMovie = async (req: Request<MovieParams>, res: Response) => {
    const { id } = req.params;
    const movie = await deleteMovieService(id);
    if(!movie) throw new AppError("Movie not found", 404);
    return res.status(200).json({success: true, message: "Movie deleted successfully"});
}