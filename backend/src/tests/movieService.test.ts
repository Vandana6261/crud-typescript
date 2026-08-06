// test("my first test", () => {
//     expect(1 + 1).toBe(2);
// });

import {
  createMovie,
  getMovies,
  updateMovieService, deleteMovieService
} from "../services/movie.services";
import Movie from "../models/movie.model";

jest.mock("../models/movie.model");

test("should throw error when rating is greater than 10", async () => {
  const movieData = {
    movieName: "Avatar",
    country: "USA",
    genre: "Action",
    whereToWatch: "Netflix",
    rating: -1,
  };

  await expect(createMovie(movieData)).rejects.toThrow("Invalid rating");
});

test("should create movie when rating is valid", async () => {
  const movieData = {
    movieName: "Avatar",
    country: "USA",
    genre: "Action",
    whereToWatch: "Netflix",
    rating: 8,
  };

  (Movie.create as jest.Mock).mockResolvedValue(movieData);

  const result = await createMovie(movieData);

  expect(result).toEqual(movieData);

  expect(Movie.create).toHaveBeenCalledWith(movieData);
});


test("should return all movies", async () => {
  const movies = [
    {
      movieName: "Avatar",
      rating: 8,
    },
    {
      movieName: "Titanic",
      rating: 9,
    },
  ];

  (Movie.find as jest.Mock).mockResolvedValue(movies);

  const result = await getMovies();

  expect(result).toEqual(movies);
  expect(Movie.find).toHaveBeenCalled();
});


test("should update movie successfully", async () => {
  const id = "movie123";

  const movieData = {
    rating: 9,
  };

  const updatedMovie = {
    movieName: "Avatar",
    rating: 9,
  };

  (Movie.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedMovie);
  const result = await updateMovieService(id, movieData);

  expect(result).toEqual(updatedMovie);
  expect(Movie.findByIdAndUpdate).toHaveBeenCalledWith(id, { $set: movieData }, { new: true, runValidators: true});
//   expect(Movie.findByIdAndUpdate).toHaveBeenCalledWith(id, { $set: movieData }, expect.any(Object));

});


test("should delete movie successfully", async () => {
    const id = "movie123";

    const deletedMovie = {
        movieName: "Avatar",
        rating: 8,
    };

    (Movie.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedMovie);
    const result = await deleteMovieService(id);

    expect(result).toEqual(deletedMovie);
    expect(Movie.findByIdAndDelete).toHaveBeenCalledWith(id);
});