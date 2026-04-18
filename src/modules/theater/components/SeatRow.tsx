import type { TheaterRow } from '../models/row.model';
import SeatItem from './SeatItem';

interface SeatRowProps {
    row: TheaterRow;
    suggestedSeatIds: Set<number>;
}

export default function SeatRow({ row, suggestedSeatIds }: SeatRowProps) {
    return (
        <div className="seat-row">
            <div className="seat-row__label">{row.rowLabel}</div>

            <div className="seat-row__seats">
                {row.seats.map((seat) => (
                    <SeatItem
                        key={seat.id}
                        seat={seat}
                        isSuggested={suggestedSeatIds.has(seat.id)}
                    />
                ))}
            </div>
        </div>
    );
}