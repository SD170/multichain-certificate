import { Request, Response, NextFunction } from 'express';
import asyncHandler from "../middlewares/async";


//  @desc       upload a file
//  @route      POST /uploadFiles/excel
//  @access     public
export const uploadFile = asyncHandler(async (req: RequestExtended, res: Response, next: NextFunction) => {

    console.log(req.file);
    res.redirect(`/?toast="file uploaded successfully"`)

});