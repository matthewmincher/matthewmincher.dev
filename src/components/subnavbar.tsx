import * as React from "react";
import { Link } from 'gatsby';

interface SubNavBarItem {
	url: string;
	title: string;
}

interface SubNavBarProps {
	items: SubNavBarItem[];
}

const SubNavBar: React.FC<SubNavBarProps> = ({ items }) => {
	return (
		<nav className="bg-stone-100 print:hidden">
			<div className="w-full mx-auto px-2.5 flex flex-grow flex-shrink-0 max-w-screen-xl">
				<ul className="m-0 p-0 list-none flex gap-x-6">
					{items.map((item) => (
						<li key={item.url}>
							<Link
								to={item.url}
								className="m-0 self-center pb-1 leading-8 font-bold decoration-0 text-emerald-900 border-t-2 border-b-2 border-transparent transition-all duration-200 ease-in-out hover:text-emerald-500"
								activeClassName="text-emerald-500 border-b-emerald-500"
							>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}

export default SubNavBar