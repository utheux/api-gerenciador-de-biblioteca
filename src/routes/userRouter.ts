import express from 'express';
import DataSourceSingleton from '../database/DataSourceSingleton';
import authenticate from '../middlewares/authMiddleware';
import { RequestHandler } from 'express-serve-static-core';
import checkAdminMiddleware from '../middlewares/checkAdminMiddleware';
import ControllerFactory from '../factory/ControllerFactory';

const myDataSource = DataSourceSingleton.getInstance();

const router = express.Router();

const userController = ControllerFactory.createUserController();
const authController = ControllerFactory.createAuthController();

const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};
const checkAdmin: RequestHandler = (req, res, next) => {checkAdminMiddleware(req, res, next)};

router.post("/", (req, res)=> {userController.createUser(req, res)});
router.post("/login", (req, res) => {authController.login(req, res)});


// rota para atrelar role a user
router.put("/:userId/role/:roleId", (req, res) => {userController.assignRoleToUser(req, res)});
    
 // rotas com middleware de autenticação
router.get("/",middlewareAuth, checkAdmin, (req, res) => {userController.listUsers(req, res)});
router.put("/",middlewareAuth, (req, res) => {userController.updateUser(req, res)});
router.delete("/",middlewareAuth, (req, res) => {userController.deleteUser(req, res)});




export default router;