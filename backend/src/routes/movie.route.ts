import Router from "express";
import { addMovie, getAllMovies, updateMovie, deleteMovie } from "../controllers/movie.controller";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();


router.get("/", asyncHandler(getAllMovies))
router.post("/", asyncHandler(addMovie))
// router.get("/:id")
router.patch("/:id", asyncHandler(updateMovie))
router.delete("/:id", asyncHandler(deleteMovie))


export default router;