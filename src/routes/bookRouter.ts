import express, { RequestHandler } from 'express';
import BookController from "../controllers/BookController";
import DataSourceSingleton from '../database/DataSourceSingleton';
import Book from "../database/models/Book";
import BookRepository from "../repositories/BookRepository";
import authenticate from '../middlewares/authMiddleware';

const myDataSource = DataSourceSingleton.getInstance();

const router = express.Router();

const bookRepository = new BookRepository(myDataSource.getRepository(Book));
const bookController = new BookController(bookRepository);
const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};

router.get("/", (req, res) => {bookController.bookList(req, res)});

//rotas protegidas com middlware de auth
router.post("/", middlewareAuth, (req, res) => {bookController.createBook(req, res)});
router.put("/:bookId", middlewareAuth, (req, res) => {bookController.updateBook(req, res)});
router.delete("/bookId", middlewareAuth, (req, res) => {bookController.deleteBook(req, res)});

export default router;

