import { displaceCoords } from '../helpers';
import { Coords, Directions, SearchStackValue, WordResult } from '../types';

/**
 * Use brute force to find a word in a matrix
 * @param {string[][]} matrix The 2D matrix to search
 * @param {string} word The word to search for
 * @returns {WordResult} An array of the coordinates of each occurrance of the word
 */
export function bruteForceFindWord(
	matrix: string[][],
	word: string
): WordResult {
	const checkResults: Coords[][] = [],
		height = matrix.length,
		width = matrix[0].length;

	const firstLetter = word[0];

	if (word.length === 1) {
		for (let row = 0; row < height; row++) {
			for (let col = 0; col < width; col++) {
				if (matrix[row][col] === firstLetter) checkResults.push([{ row, col }]);
			}
		}
		return { word, coords: checkResults };
	}

	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			if (matrix[row][col] !== firstLetter) continue;
			for (const direction of Directions) {
				const letterStack: SearchStackValue[] = [];
				for (let i = 0; i < word.length; i++) {
					const coords = displaceCoords(
						{ row, col },
						{ row: direction.row * i, col: direction.col * i }
					);
					if (coords.row < 0 || coords.row >= height) break;
					if (coords.col < 0 || coords.col >= width) break;
					if (matrix[coords.row][coords.col] !== word[i]) break;
					letterStack.push({
						letter: matrix[coords.row][coords.col],
						row: coords.row,
						col: coords.col
					});
				}
				if (
					letterStack.length === word.length &&
					letterStack.length > 0 &&
					letterStack
						.map(({ letter }) => letter)
						.join('')
						.toUpperCase() === word.toUpperCase()
				)
					checkResults.push(letterStack.map(({ row, col }) => ({ row, col })));
			}
		}
	}

	return {
		word,
		coords: removeBackwardsDuplicates(checkResults)
	};
}

/**
 * Remove duplicate coordinates from an array of coordinates
 * @param {Coords[][]} arr The array of coordinates to remove duplicates from
 */
function removeBackwardsDuplicates(arr: Coords[][]) {
	const result: Coords[][] = [];
	for (const item of arr) {
		const stringified = JSON.stringify(item);
		if (!result.some(r => JSON.stringify(r.reverse()) === stringified))
			result.push(item);
	}
	return result;
}
