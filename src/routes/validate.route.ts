import { Router } from "express";
import { validateCert } from '../controllers/validate.controller';


const router = Router();

router.route("/certificate/:streamKey").get(validateCert);


export default router;
