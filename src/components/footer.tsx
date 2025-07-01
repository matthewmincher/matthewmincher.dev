import * as React from "react";
import * as Styles from './footer.module.scss';

const Footer: React.FC = () => {
	return (
		<footer className={Styles.main}>
			<div className="constrainedContent">
				© Matthew Mincher {(new Date().getFullYear())}
			</div>
		</footer>
	)
}

export default Footer