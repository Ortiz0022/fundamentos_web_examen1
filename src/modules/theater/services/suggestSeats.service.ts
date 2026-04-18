import type { TheaterRow } from '../models/row.model';
import { getMaxRowSize, getRowIndexesByCenterProximity } from '../utils/theater.utils';

/**
 * Busca un bloque consecutivo de asientos libres dentro de una fila.
 * Si lo encuentra, retorna un Set con sus ids.
 * Si no, retorna un Set vacío.
 */
function findConsecutiveSeatsInRow(row: TheaterRow, quantity: number): Set<number> {
    let consecutiveSeats: number[] = [];

    for (const seat of row.seats) {
        if (!seat.estado) {
            consecutiveSeats.push(seat.id);

            if (consecutiveSeats.length === quantity) {
                return new Set(consecutiveSeats);
            }
        } else {
            consecutiveSeats = [];
        }
    }

    return new Set<number>();
}

/**
 * Recibe la cantidad de asientos requerida y devuelve un Set con ids sugeridos.
 * Reglas:
 * - Si quantity > tamaño máximo de una fila => Set vacío
 * - Si no existe un bloque consecutivo suficiente => Set vacío
 * - Se busca primero desde la fila más cercana al centro
 */
export function suggest(rows: TheaterRow[], quantity: number): Set<number> {
    const maxRowSize = getMaxRowSize(rows);

    if (quantity > maxRowSize) {
        return new Set<number>();
    }

    const orderedRowIndexes = getRowIndexesByCenterProximity(rows.length);

    for (const rowIndex of orderedRowIndexes) {
        const row = rows[rowIndex];
        const suggestion = findConsecutiveSeatsInRow(row, quantity);

        if (suggestion.size > 0) {
            return suggestion;
        }
    }

    return new Set<number>();
}