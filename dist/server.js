"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
//load env vars
dotenv_1.default.config({ path: __dirname + '/../config.env' });
//route files
const home_route_1 = __importDefault(require("./routes/home.route"));
const uploadFile_route_1 = __importDefault(require("./routes/uploadFile.route"));
const validate_route_1 = __importDefault(require("./routes/validate.route"));
// middlewares
const multichainConnector_1 = require("./middlewares/multichainConnector");
const app = (0, express_1.default)();
//body parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // can't go with formidable
//dev logging middleware
if (process.env.NODE_ENV === 'development') { //only when using dev env
    app.use((0, morgan_1.default)('dev'));
}
// static files
app.use(express_1.default.static("public"));
app.use('/js', express_1.default.static(__dirname + 'public/js'));
// set template engine
app.set('view engine', 'ejs');
// also setting the view
app.set("views", path_1.default.join(__dirname, "/../views"));
// adding multichain middleware
app.use(multichainConnector_1.multichainMW);
//mount routers
app.use('/uploadFiles', uploadFile_route_1.default);
app.use('/validate', validate_route_1.default);
app.use('/', home_route_1.default);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`);
});
