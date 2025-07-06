import * as React from "react";

const Footer: React.FC = () => {
	return (
		<footer className="bg-stone-100 border-t-4 border-stone-300 min-h-12 py-3 text-xs text-stone-600 box-border print:hidden px-2.5">
			<div className="w-full mx-auto max-w-screen-xl">
				© Matthew Mincher {(new Date().getFullYear())}
			</div>
		</footer>
	)
}

export default Footer