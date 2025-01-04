import express from "express";
import userRouter from "./userRouter";
import roleRouter from "./roleRouter";

const router = (app: express.Router) => {
    app.use("/user", userRouter)
    app.use("/role", roleRouter)
}

export default router;