import { Request, Response } from "express";
import ReservationRepository from "../repositories/ReservationRepository";

export default class ReservationController {
    private reservationRepository;

    constructor(reservationRepository: ReservationRepository){
        this.reservationRepository = reservationRepository;
    }

    async createReservation(req: Request, res: Response){
        const {date} = req.body;
        const userId = req.user?.userId;
        const {bookId} = req.params


        const {success, message, reservation} = await this.reservationRepository.createReservation(Number(userId), Number(bookId), date);
        
        if(!success){
            return res.status(404).json({message: message});
        }
        
        return res.status(201).json({
            success: success,
            message: message,
            reservation
        });
    }
}