import express from "express";
import userRouter from "./userRouter";
import roleRouter from "./roleRouter";
import bookRouter from "./bookRouter";
import addressRouter from "./addressRouter"
import reservationRouter from "./reservationRouter";

const router = (app: express.Router) => {
    app.use("/user", userRouter)
    app.use("/role", roleRouter)
    app.use("/book", bookRouter)
    app.use("/address", addressRouter)
    app.use("/reservation", reservationRouter)
}

export default router;