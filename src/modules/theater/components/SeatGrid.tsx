import type { TheaterRow } from '../models/row.model';
import SeatRow from './SeatRow';

interface SeatGridProps {
    rows: TheaterRow[];
    suggestedSeatIds: Set<number>;
}

export default function SeatGrid({ rows, suggestedSeatIds }: SeatGridProps) {
    return (
        <section className="seat-grid-card" aria-label="Mapa de asientos del teatro">
            <h2>Mapa de asientos</h2>

            <div className="seat-grid">
                <div className="seat-grid__stage-indicator">Pantalla / Escenario</div>
                <div className="seat-grid__cinema-container">
                    {rows.map((row) => (
                        <SeatRow
                            key={row.rowLabel}
                            row={row}
                            suggestedSeatIds={suggestedSeatIds}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}