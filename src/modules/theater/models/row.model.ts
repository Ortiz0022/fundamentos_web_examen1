import type { Seat } from './seat.model';

export interface TheaterRow {
    rowLabel: string;
    seats: Seat[];
}