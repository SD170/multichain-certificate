"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.namesExcelFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const MULTER_STORAGE = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        // console.log(file);
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        // console.log(file)
        callback(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
exports.namesExcelFile = (0, multer_1.default)({
    storage: MULTER_STORAGE,
    fileFilter: function (req, file, callback) {
        var ext = path_1.default.extname(file.originalname);
        if (ext !== '.xlsx') {
            return callback(new Error('only excel files are allowed'));
        }
        callback(null, true);
    },
}).single('namesFile');
