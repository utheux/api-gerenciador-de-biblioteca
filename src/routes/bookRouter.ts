import express, { RequestHandler } from 'express';
import BookController from "../controllers/BookController";
import DataSourceSingleton from '../database/DataSourceSingleton';
import Book from "../database/models/Book";
import BookRepository from "../repositories/BookRepository";
import authenticate from '../middlewares/authMiddleware';
import checkAdminMiddleware from '../middlewares/checkAdminMiddleware';
import BookNotifier from '../observer/BookNotifier';
import UserNotifier from '../observer/UserNotifier';
import ControllerFactory from '../factory/ControllerFactory';

const router = express.Router();


const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};
const checkAdmin: RequestHandler = (req, res, next) => {checkAdminMiddleware(req, res, next)};

const bookController = ControllerFactory.createController("book");

if (bookController instanceof BookController){
    router.get("/", async(req, res) => {await bookController.bookList(req, res)});
    
    //rotas protegidas com middlware de auth
    router.post("/", middlewareAuth, checkAdmin, async(req, res) => {await bookController.createBook(req, res)});
    router.put("/:bookId", middlewareAuth, checkAdmin, async(req, res) => {await bookController.updateBook(req, res)});
    router.delete("/:bookId", middlewareAuth, checkAdmin, async(req, res) => {await bookController.deleteBook(req, res)});

} else {
    throw new Error("Controller is not of type BookController");
}


export default router;

