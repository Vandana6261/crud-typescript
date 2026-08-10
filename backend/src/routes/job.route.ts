import Router from "express";
import asyncHandler from "../middleware/asyncHandler";
import { addJob, getAllJobs, updateJob, deleteJob } from "../controllers/job.controller";
import app from "../app";
import requireAuth from "../middleware/requireAuth";

const router = Router();

router.use(requireAuth);
router.get("/", asyncHandler(getAllJobs))
router.post("/", asyncHandler(addJob))
// router.get("/:id")
router.patch("/:id", asyncHandler(updateJob))
router.delete("/:id", asyncHandler(deleteJob))


export default router;