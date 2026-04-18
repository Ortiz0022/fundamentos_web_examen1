export default function Legend() {
    return (
        <section className="legend-card" aria-label="Leyenda de estados de asientos">
            <h2>Leyenda</h2>

            <div className="legend-items">
                <div className="legend-item">
                    <span className="legend-dot seat seat--available" />
                    <span>Disponible</span>
                </div>

                <div className="legend-item">
                    <span className="legend-dot seat seat--occupied" />
                    <span>Ocupado</span>
                </div>

                <div className="legend-item">
                    <span className="legend-dot seat seat--suggested" />
                    <span>Sugerido</span>
                </div>
            </div>
        </section>
    );
}