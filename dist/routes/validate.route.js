"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_controller_1 = require("../controllers/validate.controller");
const router = (0, express_1.Router)();
router.route("/certificate/:streamKey").get(validate_controller_1.validateCert);
exports.default = router;
