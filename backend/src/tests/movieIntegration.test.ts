import request from "supertest";
import app from "../app";
import { connectTestDB, disconnectTestDB } from "./db";
import Movie from "../models/movie.model";

beforeAll(async () => {
    await connectTestDB();
});


afterAll(async () => {
    await disconnectTestDB();
});


beforeEach(async () => {
  await Movie.deleteMany({});
});


test("should get all movies", async () => {

    const response = await request(app)
        .get("/api/movies");

    expect(response.statusCode)
        .toBe(200);

});


test("should create a movie", async () => {

  const response = await request(app)
    .post("/api/movies")
    .send({
      movieName: "Avatar",
      country: "USA",
      genre: "Action",
      whereToWatch: "Netflix",
      rating: 8,
    });


  expect(response.statusCode).toBe(201);


  expect(response.body.success)
    .toBe(true);


  expect(response.body.data.movieName)
    .toBe("Avatar");


  // Check database also contains the movie
  const movie = await Movie.findOne({
    movieName: "Avatar",
  });


  expect(movie).not.toBeNull();

  expect(movie?.rating)
    .toBe(8);

});


test("should update a movie", async () => {

  // Step 1: Create a movie first
  const createResponse = await request(app)
    .post("/api/movies")
    .send({
      movieName: "Avatar",
      country: "USA",
      genre: "Action",
      whereToWatch: "Netflix",
      rating: 8,
    });


  const movieId = createResponse.body.data._id;


  // Step 2: Update the movie
  const updateResponse = await request(app)
    .patch(`/api/movies/${movieId}`)
    .send({
      rating: 9,
    });


  // Step 3: Check API response
  expect(updateResponse.statusCode)
    .toBe(200);


  expect(updateResponse.body.success)
    .toBe(true);


  expect(updateResponse.body.data.rating)
    .toBe(9);



  // Step 4: Check database
  const movie = await Movie.findById(movieId);


  expect(movie).not.toBeNull();


  expect(movie?.rating)
    .toBe(9);

});


test("should delete a movie", async () => {

  // Step 1: Create a movie
  const createResponse = await request(app)
    .post("/api/movies")
    .send({
      movieName: "Avatar",
      country: "USA",
      genre: "Action",
      whereToWatch: "Netflix",
      rating: 8,
    });


  const movieId = createResponse.body.data._id;


  // Step 2: Delete the movie
  const deleteResponse = await request(app)
    .delete(`/api/movies/${movieId}`);


  // Step 3: Check API response
  expect(deleteResponse.statusCode)
    .toBe(200);


  expect(deleteResponse.body.success)
    .toBe(true);


  expect(deleteResponse.body.message)
    .toBe("Movie deleted successfully");



  // Step 4: Check database
  const movie = await Movie.findById(movieId);


  expect(movie)
    .toBeNull();

});




// Failure test cases

test("should not create movie with invalid rating", async () => {

  const response = await request(app)
    .post("/api/movies")
    .send({
      movieName: "Avatar",
      country: "USA",
      genre: "Action",
      whereToWatch: "Netflix",
      rating: 15,
    });


  expect(response.statusCode)
    .toBe(400);


  expect(response.body.success)
    .toBe(false);


  expect(response.body.message)
    .toBe("Validation error");

});



test("should not create movie with invalid country", async () => {

  const response = await request(app)
    .post("/api/movies")
    .send({
      movieName: "Avatar",
      country: 45,
      genre: "Action",
      whereToWatch: "Netflix",
      rating: 15,
    });


  expect(response.statusCode)
    .toBe(400);


  expect(response.body.success)
    .toBe(false);


  expect(response.body.message)
    .toBe("Validation error");

});



test("should return 404 when updating non-existing movie", async () => {

  const fakeId = "507f1f77bcf86cd799439011";


  const response = await request(app)
    .patch(`/api/movies/${fakeId}`)
    .send({
      rating: 9,
    });


  expect(response.status)
    .toBe(404);


  expect(response.body.success)
    .toBe(false);


  expect(response.body.message)
    .toBe("Movie not found");

});


test("should return 404 when deleting non-existing movie", async () => {

  const fakeId = "507f1f77bcf86cd799439011";


  const response = await request(app)
    .delete(`/api/movies/${fakeId}`);


  expect(response.status)
    .toBe(404);


  expect(response.body.success)
    .toBe(false);


  expect(response.body.message)
    .toBe("Movie not found");

});
