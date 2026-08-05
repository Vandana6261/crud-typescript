import Router from "express";
import { addMovie, getAllMovies, updateMovie, deleteMovie } from "../controllers/movie.controller";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

console.log("movie route")

router.get("/movies", asyncHandler(getAllMovies))
router.post("/movies", asyncHandler(addMovie))
// router.get("/movies/:id")
router.patch("/movies/:id", asyncHandler(updateMovie))
router.delete("/movies/:id", asyncHandler(deleteMovie))


export default router;