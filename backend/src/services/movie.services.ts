import { CreateMovieDTO, UpdateMovieDTO } from "../dto/movie.dto";
import Movie from "../models/movie.model";


export const getMovies = async () => {
  const movies = await Movie.find();

  return movies;
};


export const createMovie = async (movieData: CreateMovieDTO) => {

  if (movieData.rating < 0 || movieData.rating > 10) {
    throw new Error("Invalid rating");
  }

  const movie = await Movie.create(movieData);

  return movie;
};

export const updateMovieService = async (id: string, movieData: UpdateMovieDTO) => {
  const updatedMovie = await Movie.findByIdAndUpdate(
    id,
    { $set: movieData },
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );
  return updatedMovie;
};

export const deleteMovieService = async (id: string) => {
  const findAndDeleteMovie = await Movie.findByIdAndDelete(id);
  return findAndDeleteMovie;
};
