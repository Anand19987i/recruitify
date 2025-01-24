import express from "express";

import { categoryJobs, filterCard, getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").post(getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route("/update/:id").put(updateJob);
router.route("/filter-jobs").get(filterCard);
router.route("/category").get(categoryJobs);



export default router;
