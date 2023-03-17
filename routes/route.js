import { Router } from "express";

const router = Router();

//import all controllers
import * as controller from "../controllers/appController.js";

//POST METHODS
router.route("/register").post(controller.register); //register user
// router.route("/registerMail").post(controller.); //send the email
router.route("/authenticate").post((req, res) => res.end()); //authenticate user
router.route("/login").post(controller.login); //login in app

//GET METHODS
router.route("/user/:username").get(controller.getUser); // user with username
router.route("/generateOTP").get(controller.generateOTP); //generate OTP
router.route("/verifyOTP").get(controller.verifyOTP); //verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); // reset all varibles

//PUT METHODS
router.route("/updateUser").put(controller.updateUser); //update user profile
router.route("/resetPassword").put(controller.resetPassword); //reset password

export default router;
