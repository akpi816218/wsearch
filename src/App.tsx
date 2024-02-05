import { useState } from 'react';
import RootLayout from './_components/RootLayout';
import {
	Button,
	Divider,
	Input,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ScrollShadow,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Textarea,
	useDisclosure
} from '@nextui-org/react';
import { WordResult, findWords } from '../lib';
import DynamicWrapper from './_components/DynamicWrapper';
import ScrollShadowComponent from './_components/ScrollShadowComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';

export default function App() {
	const [matrix, setMatrix] = useState<string[][]>([]);
	const [searchTerm, setSearchTerm] = useState<string[]>([]);
	const [solution, setSolution] = useState<WordResult[]>([]);
	const [error, setError] = useState<string>('');
	const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
	const [displaySolution, setDisplaySolution] = useState<WordResult[]>([]);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<RootLayout>
			<main className="grid items-stretch justify-stretch w-screen min-h-screen px-12 py-16 md:p-16 lg:p-32">
				<DynamicWrapper smallWrapper={ScrollShadowComponent}>
					<div className="flex flex-col justify-center items-center gap-4 md:gap-8 dark:text-white text-center text-xl font-mono tracking-widest">
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
											.filter(
												(row, i, arr) => row.length > 0 || i === arr.length - 1
											)
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
										Array.from(
											new Set(
												value
													.toUpperCase()
													.replaceAll(/[^A-Z]{2,}/g, ',')
													.split(/[^A-Z]/)
											)
										)
									)
								}
							/>
							<div className="flex flex-row items-center justify-center gap-4 md:gap-8">
								<Button
									size="lg"
									color="danger"
									onPress={() => setSolution([])}
								>
									Clear solution
								</Button>
								<Button onPress={submit} size="lg" color="success">
									Solve
								</Button>
							</div>
							<p className="text-red-500 text-base">{error}</p>
						</form>

						<Table
							selectionMode="multiple"
							color="warning"
							className="text-start"
							selectedKeys={selectedKeys}
							disabledKeys={
								new Set(
									solution
										.filter(wr => wr.coords.length === 0)
										.map(wr => wr.word)
								)
							}
							onSelectionChange={keys => {
								const newKeys =
									keys instanceof Set
										? (keys as Set<string>)
										: new Set(solution.map(e => e.word));
								setSelectedKeys(newKeys);
								setDisplaySolution(solution.filter(wr => newKeys.has(wr.word)));
							}}
						>
							<TableHeader>
								<TableColumn>Word</TableColumn>
								<TableColumn>Frequency</TableColumn>
							</TableHeader>
							<TableBody items={solution} emptyContent="Press 'Solve'">
								{item => (
									<TableRow key={item.word}>
										<TableCell>{item.word}</TableCell>
										<TableCell
											className={`${item.coords.length === 0 ? '!text-red-500' : ''}`}
										>
											{item.coords.length}
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>

						<table>
							<tbody>
								{matrix.map((row, y) => (
									<tr key={y} className="align-middle">
										{row.map((letter, x) => (
											<td
												key={x}
												className={`tracking-widest leading-none align-middle text-center pl-[.175rem] pt-[.25rem] !w-8 !h-8 !aspect-square dark:border-white border-black border-1.5 sm:text-xs md:text-lg lg:text-xl ${
													displaySolution.some(e =>
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

						<Divider className="mt-8" />

						<Button onPress={onOpen} color="secondary">
							Credits
						</Button>
						<Modal title="Credits" isOpen={isOpen} onOpenChange={onOpenChange}>
							<ModalContent>
								<ModalHeader>Credits</ModalHeader>
								<ModalBody>
									<div className="flex flex-col gap-4">
										<p className="mb-4">
											Wordsearch Solver is a Progressive Web App that allows you
											to input a wordsearch puzzle and a list of words to search
											for. It will then find and highlight the words in the
											puzzle. The source code is available on{' '}
											<Link
												href="https://github.com/akpi816218/wsearch"
												target="_blank"
												underline="always"
												isExternal
											>
												GitHub
											</Link>
											.
											<br />
											<br />
											Developed by{' '}
											<Link
												href="https://akpi.is-a.dev/"
												target="_blank"
												underline="always"
												isExternal
											>
												Akhil Pillai
											</Link>
											.
										</p>
										<h2 className="text-lg font-semibold font-press-start text-indigo-600 underline underline-offset-2">
											Open Source Libraries
										</h2>
										<Table
											isStriped
											classNames={{
												wrapper: 'border-neutral-500 border-2'
											}}
										>
											<TableHeader>
												<TableColumn>Library</TableColumn>
												<TableColumn>License</TableColumn>
											</TableHeader>
											<TableBody
												items={[
													{
														name: 'NextUI',
														license: 'MIT',
														github: 'nextui-org/nextui'
													},
													{
														name: 'React',
														license: 'MIT',
														github: 'facebook/react'
													},
													{
														name: 'TypeScript',
														license: 'Apache-2.0',
														github: 'microsoft/TypeScript'
													},
													{
														name: 'Tailwind CSS',
														license: 'MIT',
														github: 'tailwindlabs/tailwindcss'
													},
													{
														name: 'Font Awesome',
														license: 'MIT',
														github: 'FortAwesome/react-fontawesome'
													},
													{
														name: 'ESLint',
														license: 'MIT',
														github: 'eslint/eslint'
													},
													{
														name: 'eslint-plugin-react',
														license: 'MIT',
														github: 'jsx-eslint/eslint-plugin-react',
														isMono: true
													},
													{
														name: 'Prettier',
														license: 'MIT',
														github: 'prettier/prettier'
													},
													{
														name: 'Vite',
														license: 'MIT',
														github: 'vitejs/vite'
													},
													{
														name: 'vite-plugin-react',
														license: 'MIT',
														github: 'vitejs/vite-plugin-react',
														isMono: true
													},
													{
														name: 'Puppeteer',
														license: 'Apache-2.0'
													}
												]}
											>
												{item => (
													<TableRow key={item.name}>
														<TableCell>{item.name}</TableCell>
														<TableCell>{item.license}</TableCell>
													</TableRow>
												)}
											</TableBody>
										</Table>
									</div>
								</ModalBody>
								<ModalFooter>
									<Button onPress={onOpenChange} color="warning">
										Close
									</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>

						<div className="flex flex-row justify-center align-middle gap-8 md:gap-12 tracking-normal text-xl">
							<Link
								href="https://github.com/akpi816218/wsearch"
								target="_blank"
								underline="always"
								isExternal
							>
								<FontAwesomeIcon icon={faGithub} className="mr-2 mb-1" />
								Source
							</Link>
							<Link
								href="https://akpi.is-a.dev/"
								target="_blank"
								underline="always"
								isExternal
							>
								<FontAwesomeIcon icon={faGlobe} className="mr-2 mb-1" />
								Akhil Pillai
							</Link>
						</div>
					</div>
				</DynamicWrapper>
			</main>
		</RootLayout>
	);

	function submit() {
		try {
			const newSolution = findWords(
				matrix,
				searchTerm.filter(e => e.length > 0)
			)
				.sort((a, b) => a.word.localeCompare(b.word))
				.sort((a, b) => b.coords.length - a.coords.length);
			if (newSolution.length === 0) throw new Error('Word not found');
			setSelectedKeys(
				new Set(newSolution.filter(e => e.coords.length > 0).map(e => e.word))
			);
			setDisplaySolution(newSolution.map(e => e));
			setSolution(newSolution);
			const notFoundWords = newSolution
				.filter(word => word.coords.length === 0)
				.map(word => word.word);
			setError('');
			const countNotFound = notFoundWords.length;
			if (countNotFound > 0)
				throw new Error(
					`${countNotFound} word${countNotFound > 1 ? 's' : ''} not found`
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
