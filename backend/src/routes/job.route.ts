import Router from "express";
import asyncHandler from "../middleware/asyncHandler";
import { addJob, getAllJobs, updateJob, deleteJob } from "../controllers/job.controller";

const router = Router();


router.get("/", asyncHandler(getAllJobs))
router.post("/", asyncHandler(addJob))
// router.get("/:id")
router.patch("/:id", asyncHandler(updateJob))
router.delete("/:id", asyncHandler(deleteJob))


export default router;