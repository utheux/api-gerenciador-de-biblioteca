import express from 'express';
import UserRepository from '../repositories/UserRepository';
import { myDataSource } from '../database/dataSource';
import User from '../database/models/User';
import UserController from '../controller/UserController';

const router = express.Router();

const userRepository = new UserRepository(myDataSource.getRepository(User));
const userController = new UserController(userRepository);

router.post("/", (req, res)=> {userController.createUser(req, res)});
router.get("/", (req, res) => {userController.listUsers(req, res)});
router.put("/:id", (req, res) => {userController.updateUser(req, res)});
router.delete("/:id", (req, res) => {userController.deleteUser(req, res)});

export default router;