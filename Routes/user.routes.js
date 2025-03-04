import express from "express";
import { deleteUser, getAllUser, getUser, loginUser, logoutUser, registerUser, updateUser } from "../Controllers/user.controller.js";
import { authenticateUser } from "../Middlewares/auth.middleware.js";
import multer from "multer";
const storage = multer.memoryStorage(); // Store files in memory instead of disk
export const upload = multer({ storage });

const userRouter = express.Router()

userRouter.route("/get-user/:id").get(authenticateUser,getUser)
userRouter.route("/allUsers").get(getAllUser)
userRouter.route("/register-user").post(upload.single("avatar"), registerUser);
userRouter.route("/login-user").post(upload.none(),loginUser);
userRouter.route("/update-user").post(upload.none(),authenticateUser, updateUser)
userRouter.route("/delete-user/:id").get(deleteUser)
userRouter.route("/logout").get(authenticateUser,logoutUser)

export default userRouter