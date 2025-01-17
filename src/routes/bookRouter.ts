import express, { RequestHandler } from 'express';
import authenticate from '../middlewares/authMiddleware';
import checkAdminMiddleware from '../middlewares/checkAdminMiddleware';
import ControllerFactory from '../factory/ControllerFactory';

const router = express.Router();


const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};
const checkAdmin: RequestHandler = (req, res, next) => {checkAdminMiddleware(req, res, next)};

const bookController = ControllerFactory.createBookController();

router.get("/", async(req, res) => {await bookController.bookList(req, res)});
    
    //rotas protegidas com middlware de auth
router.post("/", middlewareAuth, checkAdmin, async(req, res) => {await bookController.createBook(req, res)});
router.put("/:bookId", middlewareAuth, checkAdmin, async(req, res) => {await bookController.updateBook(req, res)});
router.delete("/:bookId", middlewareAuth, checkAdmin, async(req, res) => {await bookController.deleteBook(req, res)});




export default router;

