import express, { RequestHandler } from "express";
import AddressRepository from "../repositories/AddressRepository";
import DataSourceSingleton from "../database/DataSourceSingleton";
import Address from "../database/models/Address";
import User from "../database/models/User";
import AddressController from "../controllers/AddressController";
import authenticate from "../middlewares/authMiddleware";

const myDataSource = DataSourceSingleton.getInstance();

const router = express.Router();
const adressRepository = new AddressRepository(myDataSource.getRepository(Address), myDataSource.getRepository(User));
const adressController = new AddressController(adressRepository);

const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};

router.post("/", middlewareAuth, (req, res)=> {adressController.createAddress(req, res)});

export default router;
