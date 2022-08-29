import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import fs from "fs";



//load env vars
dotenv.config({ path: __dirname + '/../config.env' });


//route files
import homeRoutes from "./routes/home.route";
import fileUploadRoutes from "./routes/uploadFile.route";
import { multichainMW } from './middlewares/multichainConnector';


const app = express();



//body parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // can't go with formidable

//dev logging middleware
if (process.env.NODE_ENV === 'development') {   //only when using dev env
    app.use(morgan('dev'));
}


// static files
app.use(express.static("public"));
app.use('/js', express.static(__dirname + 'public/js'));


// set template engine
app.set('view engine', 'ejs');
// also setting the view
app.set("views", path.join(__dirname, "views"));


// adding multichain middleware
app.use(multichainMW);


//mount routers
app.use('/uploadFiles', fileUploadRoutes);
app.use('/', homeRoutes);







const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
});


