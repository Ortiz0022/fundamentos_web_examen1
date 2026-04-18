import type { TheaterRow } from '../models/row.model';

export function getMaxRowSize(rows: TheaterRow[]): number {
    return Math.max(...rows.map((row) => row.seats.length));
}

/**
 * Retorna los índices de filas ordenados desde la más cercana al centro
 * hacia los extremos.
 *
 * Ejemplo con 7 filas:
 * [3, 2, 4, 1, 5, 0, 6]
 */
export function getRowIndexesByCenterProximity(totalRows: number): number[] {
    const center = Math.floor(totalRows / 2);
    const orderedIndexes: number[] = [center];

    for (let offset = 1; offset < totalRows; offset++) {
        const left = center - offset;
        const right = center + offset;

        if (left >= 0) orderedIndexes.push(left);
        if (right < totalRows) orderedIndexes.push(right);
    }

    return orderedIndexes;
}