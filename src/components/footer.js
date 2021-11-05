import * as React from "react";
import * as Styles from './footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css';


const Footer = () => {
	return (
		<footer className={Styles.main}>
			<div className="constrainedContent">
				<FontAwesomeIcon icon={faCopyright} /> Matthew Mincher {(new Date().getFullYear())}
			</div>
		</footer>
	)
}

export default Footer