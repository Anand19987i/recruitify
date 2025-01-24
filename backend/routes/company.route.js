import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register/:userId").post(registerCompany);
router.route("/get/:userId").get( getCompany);
router.route("/get/:id").get(getCompanyById);
router.route("/update/:id").put(singleUpload, updateCompany);

export default router;
