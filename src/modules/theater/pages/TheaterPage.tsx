import TheaterHeader from '../components/TheaterHeader';
import Legend from '../components/Legend';
import SeatGrid from '../components/SeatGrid';
import ReservationForm from '../components/ReservationForm';
import TheaterFooter from '../components/TheaterFooter';
import { useTheaterReservation } from '../hooks/useTheaterReservation';
import '../styles/theater.css';

export default function TheaterPage() {
    const {
        rows,
        quantity,
        message,
        suggestedSeatIds,
        maxRowSize,
        handleQuantityChange,
        handleSuggestSeats,
        handleConfirmReservation,
    } = useTheaterReservation();

    return (
        <main className="theater-page">
            <div className="theater-shell">
                <TheaterHeader />

                <section className="theater-panel">

                    <div className="theater-main-content">
                        <div className="theater-main-content__left" id="mapa">
                            <SeatGrid rows={rows} suggestedSeatIds={suggestedSeatIds} />
                        </div>

                        <aside className="theater-main-content__right" id="reserva">
                            <ReservationForm
                                quantity={quantity}
                                maxRowSize={maxRowSize}
                                message={message}
                                onQuantityChange={handleQuantityChange}
                                onSuggestSeats={handleSuggestSeats}
                                onConfirmReservation={handleConfirmReservation}
                            />
                            <Legend />
                        </aside>
                    </div>
                </section>

                <TheaterFooter />
            </div>
        </main>
    );
}