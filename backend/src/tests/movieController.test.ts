import { Request, Response } from "express";
import {
  getAllMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller";
import * as movieService from "../services/movie.services";
import httpMocks from "node-mocks-http";

// Mock the whole service file
jest.mock("../services/movie.services");

describe("Movie Controller", () => {
  test("should return all movies", async () => {
    // Fake request
    const req = {} as Request;

    // Fake response
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Fake movies returned by service
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

    // Mock service function
    (movieService.getMovies as jest.Mock).mockResolvedValue(movies);

    // Call controller
    await getAllMovies(req, res);

    // Check service call
    expect(movieService.getMovies).toHaveBeenCalled();

    // Check status code
    expect(res.status).toHaveBeenCalledWith(200);

    // Check JSON response
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: movies,
    });
  });

  test("should create a movie", async () => {
    const movieData = {
      movieName: "Avatar",
      country: "USA",
      genre: "Action",
      whereToWatch: "Netflix",
      rating: 8,
    };

    // Fake request
    const req = {
      body: movieData,
    } as Request;

    // Fake response
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock service
    (movieService.createMovie as jest.Mock).mockResolvedValue(movieData);

    // Call controller
    await addMovie(req, res);

    // Check service call
    expect(movieService.createMovie).toHaveBeenCalledWith(movieData);

    // Check status
    expect(res.status).toHaveBeenCalledWith(201);

    // Check response
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: movieData,
    });
  });

  test("should update a movie", async () => {
    const movieData = {
      rating: 9,
    };

    const updatedMovie = {
      movieName: "Avatar",
      rating: 9,
    };

    const req = httpMocks.createRequest({
      params: {
        id: "movie123",
      },
      body: movieData,
    }) as Request<{ id: string }>;

    const res = httpMocks.createResponse();

    (movieService.updateMovieService as jest.Mock).mockResolvedValue(
      updatedMovie,
    );

    await updateMovie(req, res);

    expect(movieService.updateMovieService).toHaveBeenCalledWith(
      "movie123",
      movieData,
    );

    expect(res.statusCode).toBe(200);

    expect(res._getJSONData()).toEqual({
      success: true,
      data: updatedMovie,
    });
  });

  test("should delete a movie", async () => {
    const req = httpMocks.createRequest({
      params: {
        id: "movie123",
      },
    }) as Request<{ id: string }>;

    const res = httpMocks.createResponse();

    (movieService.deleteMovieService as jest.Mock).mockResolvedValue({});

    await deleteMovie(req, res);

    expect(movieService.deleteMovieService).toHaveBeenCalledWith("movie123");

    expect(res.statusCode).toBe(200);

    expect(res._getJSONData()).toEqual({
      success: true,
      message: "Movie deleted successfully",
    });
  });
});
