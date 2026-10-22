// import { NextFunction, Request, Response, Router } from "express";
// import z from "zod";
// import { catchAsync } from "../utils/catchAsync";


// export const validateRequest = ( zodSchema : z.ZodObject) => {
// 	return catchAsync((req: Request, res: Response, next: NextFunction) => {
// 		// const payload = req.body? req.body :  {}
// 		const payload = req.body ?? {};

// 		const result = zodSchema.safeParse(payload);
// 		if (!result.success) {
// 			// throw new Error (payload.error.message)// ekline ekline error show kore
// 			// throw new Error (payload.error.issues[0].message)// sob error show kore 1 tar pore 1 ta , 1 ta solve hole porerte
// 			// karon payload.error.issues ekta arrary return kore

// 			// let errorMessage = ""
// 			// payload.error.issues.forEach((issue)=>{              // forEach kono kicu return kore na
// 			// 	errorMessage = errorMessage + ". " + issue.message;
// 			// });
// 			console.log(result.error);
// 			console.log(result.error.issues);

// 			throw new Error(result.error.issues[0].message);
// 		}
// 		req.body = result.data;
// 		next();
// 	});
// };

import { NextFunction, Request, Response } from "express";
import z from "zod";
import { catchAsync } from "../utils/catchAsync";

export const validateRequest = (zodSchema: z.ZodObject) => {
    return catchAsync(
        (req: Request, res: Response, next: NextFunction) => {


            // const payload = req.body ? req.body : {}
            const payload = req.body ?? {}

            const result = zodSchema.safeParse(payload);

            if (!result.success) {
                console.log(result.error);
                console.log(result.error.issues);

                throw new Error(result.error.issues[0].message)
            }

            req.body = result.data

            next()

        }
    )
}