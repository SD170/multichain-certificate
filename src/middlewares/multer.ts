import multer from 'multer';
import path from 'path';



const MULTER_STORAGE = multer.diskStorage({
    destination: function (req, file, callback) {
        // console.log(file);
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        // console.log(file)
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

export const namesExcelFile = multer({
    storage: MULTER_STORAGE,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.xlsx') {
            return callback(new Error('only excel files are allowed'))
        }
        callback(null, true)
    },
}).single('namesFile');

