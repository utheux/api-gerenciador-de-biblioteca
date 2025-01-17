import ControllerFactory from "../factory/ControllerFactory";
import express from "express";


const router = express.Router()

const roleController = ControllerFactory.createRoleController();

router.post("/", (req, res) => {roleController.createRole(req, res)});
router.get("/", (req, res) => {roleController.roleList(req, res)});





export default router;