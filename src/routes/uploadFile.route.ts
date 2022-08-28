import multer from "multer";
import { Router } from "express";
import { uploadFile } from '../controllers/uploadFile.controller';
import { namesExcelFile } from '../middlewares/multer';


const router = Router();

router.route("/excel").post(namesExcelFile, uploadFile);


export default router;
