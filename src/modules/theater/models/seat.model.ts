export interface Seat {
    id: number;
    estado: boolean; // true = ocupado, false = libre
    rowLabel: string;
    seatNumber: number;
}