import express from 'express';
import UserRepository from '../repositories/UserRepository';
import DataSourceSingleton from '../database/DataSourceSingleton';
import User from '../database/models/User';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import authenticate from '../middlewares/authMiddleware';
import { RequestHandler } from 'express-serve-static-core';
import Role from '../database/models/Role';
import checkAdminMiddleware from '../middlewares/checkAdminMiddleware';
import ControllerFactory from '../factory/ControllerFactory';

const myDataSource = DataSourceSingleton.getInstance();

const router = express.Router();

const userController = ControllerFactory.createController("user");
const authController = ControllerFactory.createController("role");

const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};
const checkAdmin: RequestHandler = (req, res, next) => {checkAdminMiddleware(req, res, next)};

if (userController instanceof UserController) {
    router.post("/", (req, res)=> {userController.createUser(req, res)});

    // rota para atrelar role a user
    router.put("/:userId/role/:roleId", (req, res) => {userController.assignRoleToUser(req, res)});
    
    // rotas com middleware de autenticação
    router.get("/",middlewareAuth, checkAdmin, (req, res) => {userController.listUsers(req, res)});
    router.put("/",middlewareAuth, (req, res) => {userController.updateUser(req, res)});
    router.delete("/",middlewareAuth, (req, res) => {userController.deleteUser(req, res)});

}

if (authController instanceof AuthController){
    router.post("/login", (req, res) => {authController.login(req, res)});

}

export default router;