import express from "express";
import userRouter from "./userRouter";
import roleRouter from "./roleRouter";
import bookRouter from "./bookRouter";

const router = (app: express.Router) => {
    app.use("/user", userRouter)
    app.use("/role", roleRouter)
    app.use("/book", bookRouter)
}

export default router;