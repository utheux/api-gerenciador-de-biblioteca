import Reservation from "../../database/models/Reservation";

export default interface InterfaceReservationRepository {
    createReservation(userId: number, bookId: number, date: Date): Promise<{ success: boolean; message?: string; reservation?: Reservation}>;
    listReversation(userId: number): Promise<{ success: boolean; message?: string; reservations?: Reservation[]}>;
    updateReservation(id: number, date: Date): Promise<{ success: boolean; message?: string; reservation?: Reservation}>;
    deleteReservation(id: number, userId: number): Promise<{success: boolean; message?: string}>;
}