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
        
        try {
            const {success, message, reservation} = await this.reservationRepository.createReservation(Number(userId), Number(bookId), date);
            if(!success){
                return res.status(404).json({message: message});
            }
            return res.status(201).json({
                success: success,
                message: message,
                reservation
            });
            
        } catch (erro) {
            return res.status(500).json({message: erro})
        }

        
        
    }

    async listReservation(req: Request, res: Response) {
        const userId = req.user?.userId;
        try {
            const reservations = await this.reservationRepository.listReversation(Number(userId));

            return res.status(200).json(reservations);
        } catch (erro) {
            return res.status(500).json({message: erro});
        }
    }

    async updateReservation(req: Request, res: Response) {
        const {date} = req.body;
        const {id} = req.params;

        try {
            const {success, message, reservation} = await this.reservationRepository.updateReservation(Number(id), date);
            if (!success) {
                return res.status(404).json(message);
            }
            return res.status(200).json(reservation);

        } catch (erro) {
            return res.status(500).json({message: erro});
        }
    }

    async deleteReservation(req: Request, res: Response) {
        const {id} = req.params;
        const userId = req.user?.userId;

        try {
            const {success, message} = await this.reservationRepository.deleteReservation(Number(id), Number(userId));
            if(!success) {
                return res.status(404).json(message);
            }
            return res.status(204)
        } catch(erro) {
            return res.status(500).json({message: erro});
        }
    }


}