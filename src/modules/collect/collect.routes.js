import { Router } from "express";
import { collect } from "./collect.controller.js";



const collectRouter = Router();

collectRouter.route('/collect')
             .post(collect); 


export default collectRouter ;
