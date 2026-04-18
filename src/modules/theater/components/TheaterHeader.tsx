export default function TheaterHeader() {
    return (
        <header className="theater-header">
            <div className="theater-header__content">
                <p className="theater-header__eyebrow">🎭 Sistema de Reservas de Gala</p>
                <h1>Gran Teatro UNA</h1>
                <p className="theater-header__text">
                    Selección inteligente para la mejor experiencia
                </p>
            </div>
            <div className="theater-header__action">
                <span className="badge">Reserva ya</span>
            </div>
        </header>
    );
}