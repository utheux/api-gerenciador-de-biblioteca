import express from 'express';
import UserRepository from '../repositories/UserRepository';
import DataSourceSingleton from '../database/dataSourceSingleton';
import User from '../database/models/User';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import authenticate from '../middlewares/authMiddleware';
import { RequestHandler } from 'express-serve-static-core';
import Role from '../database/models/Role';

const myDataSource = DataSourceSingleton.getInstance();

const router = express.Router();

const userRepository = new UserRepository(myDataSource.getRepository(User), myDataSource.getRepository(Role));
const userController = new UserController(userRepository);
const authController = new AuthController(userRepository);

const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};

router.post("/", (req, res)=> {userController.createUser(req, res)});
router.post("/login", (req, res) => {authController.login(req, res)});
router.put("/:userId/role/:roleId", (req, res) => {userController.assignRoleToUser(req, res)});

// rotas com middleware de autenticação
router.get("/",middlewareAuth, (req, res) => {userController.listUsers(req, res)});
router.put("/",middlewareAuth, (req, res) => {userController.updateUser(req, res)});
router.delete("/",middlewareAuth, (req, res) => {userController.deleteUser(req, res)});

export default router;