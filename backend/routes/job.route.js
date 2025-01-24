import express from "express";

import { categoryJobs, filterCard, getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(postJob);
router.route("/get").get(getAllJobs);
<<<<<<< HEAD
router.route("/getadminjobs").post(getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route("/update/:id").put(updateJob);
router.route("/filter-jobs").get(filterCard);
router.route("/category").get(categoryJobs);

=======
router.route("/getadminjobs").get(getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route("/update/:id").put(updateJob);
>>>>>>> bf8bb31a862e6643cc03d1db27ac85dd554a0117


export default router;
