import { ScrollShadow } from '@nextui-org/react';

export default function ScrollShadowComponent({
	children
}: {
	children: React.ReactNode;
}) {
	return <ScrollShadow className="m-0 p-0">{children}</ScrollShadow>;
}
