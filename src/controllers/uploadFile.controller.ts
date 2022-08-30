import { Request, Response, NextFunction } from 'express';
import asyncHandler from "../middlewares/async";
import xlsx from 'node-xlsx';
import { v4 as uuidv4 } from 'uuid';
import { createCertificate } from '../utils/pdfCreator';


//  @desc       upload a file
//  @route      POST /uploadFiles/excel
//  @access     public
export const uploadFile = asyncHandler(async (req: RequestExtended, res: Response, next: NextFunction) => {


    // reading the uploaded excel files
    const fileSheet = xlsx.parse(`${__dirname}/../../${req.file.path}`);
    const nameData = fileSheet[0].data as any;

    // publising on multichain as data stream
    for (let i = 1; i < nameData.length; i++) {
        // formatting data appropriately for multichain
        const info = {
            name: nameData[i][0],
            course: nameData[i][1],
            marks: nameData[i][2]
        }
        // formatting data appropriately for multichain
        const streamData = {
            json: info
        }
        // key for multichain
        const streamKey = uuidv4();

        // publishing
        const txnID = await req.multichain.publish({ stream: process.env.MULTICHAIN_CERT_STREAM_TXN, key: 'cr7', data: streamData });

        // creating the certificates
        await createCertificate(info.name, info.course, info.marks, streamKey);

    }



    // redirecting to the homepage
    res.redirect(`/?toast="file uploaded successfully"`);

});