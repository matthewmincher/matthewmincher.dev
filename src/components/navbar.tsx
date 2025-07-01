import * as React from "react";
import { Link } from 'gatsby';
import * as Styles from './navbar.module.scss';

const NavBar: React.FC = () => {
	return (
		<nav className={Styles.top}>
			<div className={Styles.container}>
				<ul className={Styles.navbarStart}>
					<li><Link to="/" activeClassName={Styles.active}>Home</Link></li>
					<li><Link to="/cv/" partiallyActive={true} activeClassName={Styles.active}>CV</Link></li>
				</ul>

				<ul className={Styles.navbarEnd}>
					<li><Link to="/contact/" activeClassName={Styles.active}>Get in Touch</Link></li>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar