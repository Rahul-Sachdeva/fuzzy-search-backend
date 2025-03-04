import express from "express";
import {getAllReviewingCriminals, addMultipleCriminals, exportCriminalData, updateCriminal, addCriminal, deleteCriminal, deleteCriminals, getCriminal, getAllCriminals, getAllLogs, updateReviewStatusToCleared, getCountsByAction, getCrimesByLocation, getUpdateLogs, getLatestActivityFeed} from "../Controllers/criminal.controller.js";
import { authenticateUser } from "../Middlewares/auth.middleware.js";
import multer from "multer";
const storage = multer.memoryStorage(); // Store files in memory instead of disk
export const upload = multer({ storage });

const criminalRouter = express.Router()

criminalRouter.route("/get-criminal/:id").get(getCriminal)
criminalRouter.route("/get-all-criminals").get(getAllCriminals)
criminalRouter.route("/add-criminal").post(upload.single("photo"), addCriminal)
criminalRouter.route("/update-criminal/:id").post(updateCriminal)
criminalRouter.route("/delete-criminal/:id").post(deleteCriminal)
criminalRouter.route("/delete-criminals").post(deleteCriminals)
criminalRouter.route('/add-multiple-criminals').post(upload.single('file'), addMultipleCriminals);
criminalRouter.route('/export-criminals').get(exportCriminalData);
criminalRouter.route('/get-all-logs').get(getAllLogs);
criminalRouter.route('/get-review-criminals').get(getAllReviewingCriminals);
criminalRouter.route('/update-status').put(updateReviewStatusToCleared);
criminalRouter.route('/counts-by-action').get(getCountsByAction);
criminalRouter.route('/counts-by-location').get(getCrimesByLocation);
criminalRouter.route('/updates').get(getUpdateLogs);
criminalRouter.route('/latest-activity').get(getLatestActivityFeed);
export default criminalRouter