import express from 'express';
import UserRepository from '../repositories/UserRepository';
import { myDataSource } from '../database/dataSource';
import User from '../database/models/User';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import authenticate from '../middlewares/authMiddleware';
import { RequestHandler } from 'express-serve-static-core';

const router = express.Router();

const userRepository = new UserRepository(myDataSource.getRepository(User));
const userController = new UserController(userRepository);
const authController = new AuthController(userRepository);

const middlewareAuth: RequestHandler = (req, res, next) => {authenticate(req, res, next)};

router.post("/", (req, res)=> {userController.createUser(req, res)});
router.post("/login", (req, res) => {authController.login(req, res)})

router.get("/",middlewareAuth, (req, res) => {userController.listUsers(req, res)});
router.put("/:id",middlewareAuth, (req, res) => {userController.updateUser(req, res)});
router.delete("/:id",middlewareAuth, (req, res) => {userController.deleteUser(req, res)});

export default router;