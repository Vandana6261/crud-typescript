import { CreateMovieDTO, UpdateMovieDTO } from "../dto/movie.dto";
import Movie from "../models/movie.model";


export const getMovies = async () => {
  const movies = await Movie.find();

  return movies;
};


export const createMovie = async (movieData: CreateMovieDTO) => {
  console.log("service start")
  const movie = await Movie.create(movieData);
  console.log("service end")

  return movie;
}

export const updateMovieService = async (id: string, movieData: UpdateMovieDTO) => {
    console.log("service start")
    const updatedMovie = await Movie.findByIdAndUpdate(
        id,
        { $set: movieData },
        {
            new: true,
            runValidators: true,
        }
    );
    console.log("service end")
    return updatedMovie;
};


export const deleteMovieService = async (id: string) => {
    const findAndDeleteMovie = await Movie.findByIdAndDelete(id);
    return findAndDeleteMovie;
}