import { Router } from "express";
import { log } from "./logs.controller.js";




const logRouter = Router();    

logRouter.route('/')
             .get(log); 

export default logRouter;