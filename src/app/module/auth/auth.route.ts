import { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";
import {  UserValidation } from "./auth.validation";
import { catchAsync } from "../../utils/catchAsync";
import z from "zod";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();



router.post("/register", 
	// eita only register patient er jonno
// 	(req: Request, res: Response, next: NextFunction) => {

// 		try {
// 			// const payload = req.body? req.body :  {}
// 		const payload = req.body??  {}

// 		const result = PatientValidation.PatientRegistrationZodShcema.safeParse(payload)
// 		if(!result.success){
// 				// throw new Error (payload.error.message)// ekline ekline error show kore
// 				// throw new Error (payload.error.issues[0].message)// sob error show kore 1 tar pore 1 ta , 1 ta solve hole porerte
// 				// karon payload.error.issues ekta arrary return kore
		
// 				// let errorMessage = ""
// 				// payload.error.issues.forEach((issue)=>{              // forEach kono kicu return kore na
// 				// 	errorMessage = errorMessage + ". " + issue.message;
// 				// });
// 				console.log(result.error);
// 				console.log(result.error.issues);
		
// 				throw new Error (result.error.issues[0].message)
// 			}
// 		req.body = result.data
// 		next()

// 		} catch (error) {
// 			next(error)
// 		}
// }, 
validateRequest(UserValidation.PatientRegistrationZodShcema), AuthController.registerPatient);

router.post("/login", validateRequest(UserValidation.LoginZodSchema), AuthController.loginUser);

router.get(
	"/me",
	auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
	// validateRequest()
	AuthController.getMe,
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);
router.post("/forgot-password", 
	validateRequest(UserValidation.ForgetPasswordZodSchema),
	AuthController.forgetPassword);
router.post("/reset-password", 
	validateRequest(UserValidation.ResetPasswordZodSchema)
	,AuthController.resetPassword);
export const AuthRoutes = router;
