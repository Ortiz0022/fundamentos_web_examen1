import type { TheaterRow } from '../models/row.model';
import { getMaxRowSize, getRowIndexesByStageProximity } from '../utils/theater.utils';

/**
 * Busca el bloque consecutivo de asientos libres dentro de una fila 
 * que esté más cerca del centro horizontal del escenario.
 */
function findConsecutiveSeatsInRow(row: TheaterRow, quantity: number): Set<number> {
    const totalSeats = row.seats.length;
    const centerIndex = (totalSeats - 1) / 2;
    
    let bestBlock: Set<number> | null = null;
    let minCenterDistance = Infinity;

    for (let i = 0; i <= totalSeats - quantity; i++) {
        // Revisar si el bloque de tamaño "quantity" a partir de i está libre
        let isFree = true;
        const currentBlockIds: number[] = [];
        
        for (let j = 0; j < quantity; j++) {
            const seat = row.seats[i + j];
            if (seat.estado) {
                isFree = false;
                break;
            }
            currentBlockIds.push(seat.id);
        }

        if (isFree) {
            // Calcular qué tan cerca del centro está este bloque (usando su índice medio)
            const blockCenter = i + (quantity - 1) / 2;
            const distanceToCenter = Math.abs(blockCenter - centerIndex);

            if (distanceToCenter < minCenterDistance) {
                minCenterDistance = distanceToCenter;
                bestBlock = new Set(currentBlockIds);
            }
        }
    }

    return bestBlock || new Set<number>();
}

/**
 * Recibe la cantidad de asientos requerida y devuelve un Set con ids sugeridos.
 * Reglas:
 * - Se busca primero desde la fila más cercana al escenario (A) hacia atrás.
 * - Dentro de la fila, se prefiere el bloque de asientos más centrado respecto a la pantalla.
 */
export function suggest(rows: TheaterRow[], quantity: number): Set<number> {
    const maxRowSize = getMaxRowSize(rows);

    if (quantity > maxRowSize) {
        return new Set<number>();
    }

    const orderedRowIndexes = getRowIndexesByStageProximity(rows.length);

    for (const rowIndex of orderedRowIndexes) {
        const row = rows[rowIndex];
        const suggestion = findConsecutiveSeatsInRow(row, quantity);

        if (suggestion.size > 0) {
            return suggestion;
        }
    }

    return new Set<number>();
}