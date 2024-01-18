export interface Displacement {
	row: number;
	col: number;
}

export const Directions: Displacement[] = [
	{
		row: -1,
		col: -1
	},
	{
		row: -1,
		col: 0
	},
	{
		row: -1,
		col: 1
	},
	{
		row: 0,
		col: -1
	},
	{
		row: 0,
		col: 1
	},
	{
		row: 1,
		col: -1
	},
	{
		row: 1,
		col: 0
	},
	{
		row: 1,
		col: 1
	}
];

export type Coords = { row: number; col: number };

export enum Methods {
	BruteForce = 'BruteForce'
}

export interface SearchStackValue extends Coords {
	letter: string;
	row: number;
	col: number;
}

export interface WordResult {
	word: string;
	coords: Coords[][];
}
