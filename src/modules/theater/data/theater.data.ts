import type { TheaterRow } from '../models/row.model';
import type { Seat } from '../models/seat.model';

function createRow(rowLabel: string, totalSeats: number, occupiedNumbers: number[], startId: number): TheaterRow {
    const seats: Seat[] = [];

    for (let seatNumber = 1; seatNumber <= totalSeats; seatNumber++) {
        seats.push({
            id: startId + seatNumber - 1,
            estado: occupiedNumbers.includes(seatNumber),
            rowLabel,
            seatNumber,
        });
    }

    return {
        rowLabel,
        seats,
    };
}

export function createInitialTheaterRows(): TheaterRow[] {
    const rowsConfig = [
        { rowLabel: 'A', totalSeats: 10, occupied: [2, 7] },
        { rowLabel: 'B', totalSeats: 10, occupied: [4, 5] },
        { rowLabel: 'C', totalSeats: 10, occupied: [1, 8] },
        { rowLabel: 'D', totalSeats: 10, occupied: [3, 9] },
        { rowLabel: 'E', totalSeats: 10, occupied: [6] },
        { rowLabel: 'F', totalSeats: 10, occupied: [2, 10] },
        { rowLabel: 'G', totalSeats: 10, occupied: [] },
    ];

    let currentId = 1;

    return rowsConfig.map((config) => {
        const row = createRow(config.rowLabel, config.totalSeats, config.occupied, currentId);
        currentId += config.totalSeats;
        return row;
    });
}