"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadFile_controller_1 = require("../controllers/uploadFile.controller");
const multer_1 = require("../middlewares/multer");
const router = (0, express_1.Router)();
router.route("/excel").post(multer_1.namesExcelFile, uploadFile_controller_1.uploadFile);
exports.default = router;
