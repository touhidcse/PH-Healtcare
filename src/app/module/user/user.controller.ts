import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpstatus from "http-status";
import { UserServices } from "./user.service";


const uploadProfileImage = catchAsync(async (req: Request, res: Response) => {

    console.log(req.file,"req.file");

    if(!req.file){
        throw new Error ("No file uplodaded");
    }

    const userId = req.user?.userId  // auth middleware e ace nicer dike

    const result = await UserServices.uploadProfileImage(req.file?.buffer, userId!)
	sendResponse(res, {
		statusCode: httpstatus.OK,
		success: true,
		message: "Image uploaded Successfully",
		data: result
	});
});

export const UserController = {
    uploadProfileImage,
}