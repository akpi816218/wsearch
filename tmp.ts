import { bruteForceFindWord } from './lib';

console.log(
	JSON.stringify(
		bruteForceFindWord(
			`AAAAAAAAAA
AAAABBAAAA
AAAAAAAAAA\
`
				.split('\n')
				.map(a => a.split('')),
			'BB'
		),
		undefined,
		2
	)
);
