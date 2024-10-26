import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(applyJob);
router.route("/get").get(getAppliedJobs);
router.route("/:id/applicants").get(getApplicants);
router.route("/status/:id/update").post(updateStatus);
 

export default router;
