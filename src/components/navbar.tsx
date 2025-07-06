import * as React from "react";
import { Link } from 'gatsby';

const NavBar: React.FC = () => {
	return (
		<nav className="bg-stone-100 print:hidden">
			<div className="w-full mx-auto h-16 px-2.5 flex flex-grow flex-shrink-0 max-w-screen-xl">
				<ul className="m-0 p-0 list-none flex gap-x-6">
					<li className="flex flex-grow-0 flex-shrink flex-row">
						<Link
							to="/"
							className="self-center text-xl leading-8 font-bold decoration-0 text-emerald-900 border-t-2 border-b-2 border-transparent transition-all duration-200 ease-in-out hover:text-emerald-500"
							activeClassName="text-emerald-500 border-b-emerald-500"
						>
							Home
						</Link>
					</li>
					<li className="flex flex-grow-0 flex-shrink flex-row">
						<Link
							to="/cv/"
							partiallyActive={true}
							className="self-center text-xl leading-8 font-bold decoration-0 text-emerald-900 border-t-2 border-b-2 border-transparent transition-all duration-200 ease-in-out hover:text-emerald-500"
							activeClassName="text-emerald-500 border-b-emerald-500"
						>
							CV
						</Link>
					</li>
				</ul>

				<ul className="m-0 p-0 list-none flex ml-auto text-right">
					<li className="flex flex-grow-0 flex-shrink flex-row">
						<Link
							to="/contact/"
							className="self-center py-1 px-5 leading-6 font-bold decoration-0 text-emerald-900 border-2 border-emerald-900 rounded-2xl transition-all duration-200 ease-in-out hover:text-stone-100 hover:bg-emerald-900"
							activeClassName="text-stone-100 bg-emerald-900"
						>
							Get in Touch
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar