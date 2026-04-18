import type { Seat } from '../models/seat.model';

interface SeatItemProps {
    seat: Seat;
    isSuggested: boolean;
}

export default function SeatItem({ seat, isSuggested }: SeatItemProps) {
    const visualStateClass = seat.estado
        ? 'seat--occupied'
        : isSuggested
            ? 'seat--suggested'
            : 'seat--available';

    const accessibleLabel = `Fila ${seat.rowLabel}, asiento ${seat.seatNumber}, ${seat.estado ? 'ocupado' : isSuggested ? 'sugerido' : 'disponible'
        }`;

    return (
        <div
            className={`seat ${visualStateClass}`}
            title={accessibleLabel}
            aria-label={accessibleLabel}
        >
            {seat.seatNumber}
        </div>
    );
}