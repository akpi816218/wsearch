import { Coords, Displacement } from './types';

/**
 * Displace coordinates by a displacement
 * @param {Coords} coords The coordinates to displace
 * @param {Displacement} displacement The displacement to apply
 * @returns {Coords} The displaced coordinates
 */
export function displaceCoords(
	coords: Coords,
	displacement: Displacement
): Coords {
	return {
		row: coords.row + displacement.row,
		col: coords.col + displacement.col
	};
}
