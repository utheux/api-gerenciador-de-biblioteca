import express, { RequestHandler } from "express";
import DataSourceSingleton from "../database/DataSourceSingleton";
import AddressController from "../controllers/AddressController";
import authenticate from "../middlewares/authMiddleware";
import ControllerFactory from "../factory/ControllerFactory";

const router = express.Router();
const addressController = ControllerFactory.createController("address");

const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};

if (addressController instanceof AddressController) {
    router.post("/", middlewareAuth, (req, res) => { addressController.createAddress(req, res) });
  } else {
    throw new Error("Controller is not of type AddressController");
  }

export default router;
