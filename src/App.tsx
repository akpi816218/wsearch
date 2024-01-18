import { useState } from 'react';
import RootLayout from './_components/RootLayout';
import { Button, Divider, Input, Textarea } from '@nextui-org/react';
import { WordResult, findWords } from '../lib';

export default function App() {
	const [matrix, setMatrix] = useState<string[][]>([]);
	const [searchTerm, setSearchTerm] = useState<string[]>([]);
	const [solution, setSolution] = useState<WordResult[]>([]);
	const [error, setError] = useState<string>('');

	return (
		<RootLayout>
			<main className="flex flex-col w-screen justify-center items-center px-12 py-16 md:p-16 lg:p-32 gap-4 md:gap-8 dark:text-white text-center text-xl font-mono tracking-widest">
				<h1 className="font-semibold sm:text-2xl md:text-4xl">
					Wordsearch Solver
				</h1>
				<form
					className="flex flex-col justify-center items-center gap-8 w-full"
					onSubmit={submitForm}
				>
					<Textarea
						isRequired
						isMultiline
						label="Puzzle data"
						classNames={{
							input: 'tracking-widest'
						}}
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
							setSearchTerm(
								value
									.toUpperCase()
									.replaceAll(/[^A-Z]{2,}/g, ',')
									.split(/[^A-Z]/)
							)
						}
					/>
					<div className="flex flex-row items-center justify-center gap-4 md:gap-8">
						{/* <Button
							size="lg"
							color="danger"
							onPress={() => {
								setSolution([]);
								console.log('cleared');
							}}
						>
							Clear solution
						</Button> */}
						<Button onPress={submit} size="lg" color="success">
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

				<Divider className="my-8" />

				{/* <Button size="lg" color="secondary">
					Save data locally
				</Button>
				<Button
					size="lg"
					color="primary"
					onPress={() => {
						let error = '';
						const lsMatrix = localStorage.getItem('wordsearch-matrix'),
							lsSearchTerm = localStorage.getItem('wordsearch-searchTerm');
						try {
							if (lsMatrix) {
								const data = JSON.parse(lsMatrix);
								if (
									Array.isArray(data) &&
									data.every(row => Array.isArray(row))
								)
									setMatrix(data);
								else throw new Error();
							} else throw new Error();
						} catch {
							error += ' Matrix data is invalid. ';
						}

						try {
							if (lsSearchTerm) {
								const data = JSON.parse(lsSearchTerm);
								if (Array.isArray(data)) setSearchTerm(data);
								else throw new Error();
							} else throw new Error();
						} catch {
							error += ' Search term data is invalid. ';
						}
						setError(error.trim().replaceAll(/\s{2,}/g, ' '));
					}}
				>
					Restore locally saved data
				</Button> */}
			</main>
		</RootLayout>
	);

	function submit() {
		try {
			const newSolution = findWords(
				matrix,
				searchTerm.filter(e => e.length > 0)
			);
			if (newSolution.length === 0) throw new Error('Word not found');
			setSolution(newSolution);
			const notFoundWords = newSolution
				.filter(word => word.coords.length === 0)
				.map(word => word.word);
			setError('');
			if (notFoundWords.length > 0)
				throw new Error(
					`Word${notFoundWords.length > 1 ? 's' : ''} not found: ${notFoundWords.join(', ')}`
				);
		} catch (e) {
			setError((e as Error).message);
		}
	}

	function submitForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		submit();
	}
}
