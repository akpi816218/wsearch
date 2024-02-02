export default function DynamicWrapper({
	children,
	smallWrapper,
	largeWrapper
}: {
	children: React.ReactNode;
	smallWrapper?: ({
		children
	}: {
		children: React.ReactNode;
	}) => React.ReactNode;
	largeWrapper?: ({
		children
	}: {
		children: React.ReactNode;
	}) => React.ReactNode;
}) {
	if (window.matchMedia('(max-width: 768px)').matches)
		return smallWrapper ? smallWrapper({ children }) : children;
	else return largeWrapper ? largeWrapper({ children }) : children;
}
