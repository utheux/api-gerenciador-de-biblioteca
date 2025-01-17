import express, { RequestHandler } from "express";
import authenticate from "../middlewares/authMiddleware";
import ControllerFactory from "../factory/ControllerFactory";

const router = express.Router();
const addressController = ControllerFactory.createAddressController();

const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};

router.post("/", middlewareAuth, (req, res) => { addressController.createAddress(req, res) });


export default router;
