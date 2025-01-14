import RoleController from "../controllers/RoleController";
import DataSourceSingleton from "../database/DataSourceSingleton";
import Role from "../database/models/Role";
import RoleRepository from "../repositories/RoleRespository";
import express from "express";

const myDataSource = DataSourceSingleton.getInstance();

const router = express.Router()

const roleRepository = new RoleRepository(myDataSource.getRepository(Role));
const roleController = new RoleController(roleRepository);

router.post("/", (req, res) => {roleController.createRole(req, res)});
router.get("/", (req, res) => {roleController.roleList(req, res)});

export default router;