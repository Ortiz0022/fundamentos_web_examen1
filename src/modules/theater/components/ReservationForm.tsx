interface ReservationFormProps {
    quantity: string;
    maxRowSize: number;
    message: string;
    onQuantityChange: (value: string) => void;
    onSuggestSeats: () => void;
    onConfirmReservation: () => void;
}

export default function ReservationForm({
    quantity,
    maxRowSize,
    message,
    onQuantityChange,
    onSuggestSeats,
    onConfirmReservation,
}: ReservationFormProps) {
    return (
        <section className="reservation-card" aria-label="Formulario de reserva">
            <h2>Reservar asientos</h2>

            <label htmlFor="seat-quantity" className="reservation-card__label">
                Cantidad de asientos
            </label>

            <input
                id="seat-quantity"
                type="number"
                min={1}
                max={maxRowSize}
                value={quantity}
                onChange={(event) => onQuantityChange(event.target.value)}
                placeholder="Ejemplo: 3"
            />

            <p className="reservation-card__help">
                Máximo permitido por fila: {maxRowSize}
            </p>

            <div className="reservation-card__actions">
                <button type="button" className="btn btn--primary" onClick={onSuggestSeats}>
                    Sugerir asientos
                </button>

                <button type="button" className="btn btn--secondary" onClick={onConfirmReservation}>
                    Confirmar reserva
                </button>
            </div>

            <p className="reservation-card__message">{message}</p>
        </section>
    );
}