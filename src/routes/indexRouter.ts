import express from "express";
import userRouter from "./userRouter";

const router = (app: express.Router) => {
    app.use("/user", userRouter)
}

export default router;