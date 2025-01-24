import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

<<<<<<< HEAD
router.route("/apply/:id").post(applyJob);
router.route("/get").get(getAppliedJobs);
router.route("/:id/applicants").get(getApplicants);
router.route("/status/:id/update").post(updateStatus);

=======
router.route("/apply/:id").get(applyJob);
router.route("/get").get(getAppliedJobs);
router.route("/:id/applicants").get(getApplicants);
router.route("/status/:id/update").post(updateStatus);
 
>>>>>>> bf8bb31a862e6643cc03d1db27ac85dd554a0117

export default router;
