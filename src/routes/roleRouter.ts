import RoleController from "../controllers/RoleController";
import ControllerFactory from "../factory/ControllerFactory";
import express from "express";


const router = express.Router()

const roleController = ControllerFactory.createController("role");

if (roleController instanceof RoleController) {
    router.post("/", (req, res) => {roleController.createRole(req, res)});
    router.get("/", (req, res) => {roleController.roleList(req, res)});

} else {
    throw new Error("Controller is not of type roleController");
}



export default router;