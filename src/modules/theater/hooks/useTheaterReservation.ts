import { useMemo, useState } from 'react';
import { createInitialTheaterRows } from '../data/theater.data';
import type { TheaterRow } from '../models/row.model';
import { suggest } from '../services/suggestSeats.service';
import { getMaxRowSize } from '../utils/theater.utils';

export function useTheaterReservation() {
    const [rows, setRows] = useState<TheaterRow[]>(createInitialTheaterRows);
    const [quantity, setQuantity] = useState<string>('');
    const [suggestedSeatIds, setSuggestedSeatIds] = useState<Set<number>>(new Set());
    const [message, setMessage] = useState<string>('');

    const maxRowSize = useMemo(() => getMaxRowSize(rows), [rows]);

    function clearSuggestion() {
        setSuggestedSeatIds(new Set());
    }

    function handleQuantityChange(value: string) {
        setQuantity(value);
        setMessage('');
    }

    function validateQuantity(): number | null {
        const parsedQuantity = Number(quantity);

        if (quantity.trim() === '') {
            setMessage('Debe ingresar una cantidad de asientos.');
            clearSuggestion();
            return null;
        }

        if (!Number.isInteger(parsedQuantity) || Number.isNaN(parsedQuantity)) {
            setMessage('La cantidad debe ser un número entero válido.');
            clearSuggestion();
            return null;
        }

        if (parsedQuantity <= 0) {
            setMessage('La cantidad debe ser mayor que cero.');
            clearSuggestion();
            return null;
        }

        if (parsedQuantity > maxRowSize) {
            setMessage(`La cantidad no puede exceder ${maxRowSize} asientos por fila.`);
            clearSuggestion();
            return null;
        }

        return parsedQuantity;
    }

    function handleSuggestSeats() {
        const validQuantity = validateQuantity();

        if (validQuantity === null) {
            return;
        }

        const result = suggest(rows, validQuantity);

        if (result.size === 0) {
            setSuggestedSeatIds(new Set());
            setMessage('No hay suficientes asientos consecutivos disponibles.');
            return;
        }

        setSuggestedSeatIds(result);
        setMessage('Asientos sugeridos correctamente.');
    }

    function handleConfirmReservation() {
        if (suggestedSeatIds.size === 0) {
            setMessage('Primero debes generar una sugerencia de asientos.');
            return;
        }

        const updatedRows = rows.map((row) => ({
            ...row,
            seats: row.seats.map((seat) =>
                suggestedSeatIds.has(seat.id)
                    ? { ...seat, estado: true }
                    : seat
            ),
        }));

        setRows(updatedRows);
        setSuggestedSeatIds(new Set());
        setQuantity('');
        setMessage('Reserva confirmada con éxito.');
    }

    return {
        rows,
        quantity,
        message,
        suggestedSeatIds,
        maxRowSize,
        handleQuantityChange,
        handleSuggestSeats,
        handleConfirmReservation,
    };
}