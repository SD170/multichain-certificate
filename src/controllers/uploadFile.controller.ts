import { Request, Response, NextFunction } from 'express';
import asyncHandler from "../middlewares/async";


interface RequestWithFiles extends Request {
    files: any,
    fields: any
}

//  @desc       upload a file
//  @route      POST /api/v1/tickets/new
//  @access     public
export const uploadFile = asyncHandler(async (req: RequestWithFiles, res: Response, next: NextFunction) => {


    console.log(req.file);
    res.redirect(`/?toast="file uploaded successfully"`)

});