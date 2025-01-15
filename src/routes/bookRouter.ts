import express, { RequestHandler } from 'express';
import BookController from "../controllers/BookController";
import DataSourceSingleton from '../database/DataSourceSingleton';
import Book from "../database/models/Book";
import BookRepository from "../repositories/BookRepository";
import authenticate from '../middlewares/authMiddleware';
import checkAdminMiddleware from '../middlewares/checkAdminMiddleware';

const myDataSource = DataSourceSingleton.getInstance();

const router = express.Router();

const bookRepository = new BookRepository(myDataSource.getRepository(Book));
const bookController = new BookController(bookRepository);
const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};
const checkAdmin: RequestHandler = (req, res, next) => {checkAdminMiddleware(req, res, next)};

router.get("/", (req, res) => {bookController.bookList(req, res)});

//rotas protegidas com middlware de auth
router.post("/", middlewareAuth, checkAdmin, (req, res) => {bookController.createBook(req, res)});
router.put("/:bookId", middlewareAuth, checkAdmin, (req, res) => {bookController.updateBook(req, res)});
router.delete("/bookId", middlewareAuth, checkAdmin, (req, res) => {bookController.deleteBook(req, res)});

export default router;

