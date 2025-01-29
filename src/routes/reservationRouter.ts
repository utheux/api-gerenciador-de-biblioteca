import express, { RequestHandler } from "express";
import ReservationRepository from "../repositories/ReservationRepository";
import DataSourceSingleton from "../database/DataSourceSingleton";
import User from "../database/models/User";
import Book from "../database/models/Book";
import Reservation from "../database/models/Reservation";
import ReservationController from "../controllers/ReservationController";
import authenticate from "../middlewares/authMiddleware";

const myDataSource = DataSourceSingleton.getInstance();

const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};

const router = express.Router()
const reservationRepository = new ReservationRepository(myDataSource.getRepository(User), myDataSource.getRepository(Book), myDataSource.getRepository(Reservation));
const reservationController = new ReservationController(reservationRepository);

router.post("/:bookId", middlewareAuth, (req, res) => {reservationController.createReservation(req, res)});

export default router;