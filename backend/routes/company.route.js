import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

<<<<<<< HEAD
router.route("/register/:userId").post(registerCompany);
router.route("/get/:userId").get( getCompany);
router.route("/get/:id").get(getCompanyById);
=======
router.route("/register").post(registerCompany);
router.route("/get").get(getCompany);
router.route("/get/:id").get(  getCompanyById);
>>>>>>> bf8bb31a862e6643cc03d1db27ac85dd554a0117
router.route("/update/:id").put(singleUpload, updateCompany);

export default router;
