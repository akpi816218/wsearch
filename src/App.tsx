import { useState } from 'react';
import RootLayout from './_components/RootLayout';
import { Button, Input, Textarea } from '@nextui-org/react';
import { WordResult, findWords } from '../lib';

export default function App() {
	const [matrix, setMatrix] = useState<string[][]>([]);
	const [searchTerm, setSearchTerm] = useState<string[]>([]);
	const [solution, setSolution] = useState<WordResult[]>([]);
	const [error, setError] = useState<string>('');

	return (
		<RootLayout>
			<main className="flex flex-col w-screen justify-center items-center p-8 md:p-16 lg:p-32 gap-4 md:gap-8 dark:text-white text-center text-xl font-mono">
				<h1 className="font-semibold text-3xl">Wordsearch Solver</h1>
				<form
					className="flex flex-col justify-center items-center gap-8 w-full"
					onSubmit={submitForm}
				>
					<Textarea
						isRequired
						isMultiline
						label="Puzzle data"
						size="lg"
						placeholder={`\
QWERTYUIOP
ASDFGHJKLT
ZXCVBNMEWS\
`}
						value={matrix.map(row => row.join('')).join('\n')}
						onValueChange={value =>
							setMatrix(
								value
									.toUpperCase()
									.split('\n')
									.map(row =>
										row.replaceAll(/\s/g, '').replaceAll('\t', '').split('')
									)
									.filter(row => row.length > 0)
							)
						}
					/>
					<Input
						isRequired
						isClearable
						variant="underlined"
						label="Search term(s), comma-separated"
						size="lg"
						placeholder="MEW"
						value={searchTerm.join()}
						onValueChange={value =>
							setSearchTerm(value.toUpperCase().split(/[^A-Z]/))
						}
					/>
					<div className="flex justify-center">
						<Button onPress={submit} size="lg">
							Solve
						</Button>
					</div>
					<p className="text-red-500">{error}</p>
				</form>

				<table>
					<tbody>
						{matrix.map((row, y) => (
							<tr key={y} className="align-middle">
								{row.map((letter, x) => (
									<td
										key={x}
										className={`tracking-widest leading-none align-middle text-center pl-[.175rem] pt-[.25rem] !w-8 !h-8 !aspect-square dark:border-white border-black border-1.5 sm:text-xs md:text-lg lg:text-xl ${
											solution.some(e =>
												e.coords.some(coords =>
													coords.some(
														coord => coord.col === x && coord.row === y
													)
												)
											)
												? 'bg-green-500'
												: ''
										}`}
									>
										{letter}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</main>
		</RootLayout>
	);

	function submit() {
		try {
			const newSolution = findWords(matrix, searchTerm);
			if (newSolution.length === 0) throw new Error('Word not found');
			setSolution(newSolution);
			setError('');
		} catch (e) {
			setError((e as Error).message);
		}
	}

	function submitForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		submit();
	}
}
