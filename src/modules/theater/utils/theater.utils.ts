import type { TheaterRow } from '../models/row.model';

export function getMaxRowSize(rows: TheaterRow[]): number {
    return Math.max(...rows.map((row) => row.seats.length));
}

/**
 * Retorna los índices de filas ordenados desde la más cercana al escenario
 * (Fila A -> 0) hacia el final (Fila G).
 *
 * Ejemplo con 7 filas:
 * [0, 1, 2, 3, 4, 5, 6]
 */
export function getRowIndexesByStageProximity(totalRows: number): number[] {
    const orderedIndexes: number[] = [];
    for (let i = 0; i < totalRows; i++) {
        orderedIndexes.push(i);
    }
    return orderedIndexes;
}