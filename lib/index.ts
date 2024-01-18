import { bruteForceFindWord } from './algo/BruteForce';
import { WordResult } from './types';

/**
 * Find words in a matrix
 * @param {string[][]} matrix The 2D matrix to search
 * @param {string[]} words The words to search for
 * @returns {WordResult[]} An array of the coordinates of each occurrance of the word
 */
export function findWords(matrix: string[][], words: string[]): WordResult[] {
	if (matrix.length === 0) throw new Error('Matrix has no rows');
	if (matrix[0].length === 0) throw new Error('Matrix has no columns');
	if (
		Math.min(...matrix.map(row => row.length)) !==
		Math.max(...matrix.map(row => row.length))
	)
		throw new Error('Matrix is of variable length');
	if (words.length === 0) throw new Error('Word is empty');

	words = words.map(w => w.toUpperCase());
	matrix = matrix.map(row => row.map(letter => letter.toUpperCase()));

	return words.map(word => bruteForceFindWord(matrix, word));
}

export {
	type Coords,
	Directions,
	type Displacement,
	Methods,
	type SearchStackValue,
	type WordResult
} from './types';
export { displaceCoords } from './helpers';
export { bruteForceFindWord } from './algo/BruteForce';
