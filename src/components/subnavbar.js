import * as React from "react";
import { Link } from 'gatsby';
import * as Styles from './subnavbar.module.scss';
import contactData from "../data/aroundtheweb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SubNavBar = ({ items }) => {
	return (
		<nav className={Styles.top}>
			<div className={Styles.container}>
				<ul className={Styles.navbarStart}>
					{items.map((item) => (
						<li key={item.url}><Link to={item.url} activeClassName={Styles.active}>{item.title}</Link></li>
					))}

				</ul>
			</div>
		</nav>
	)
}

export default SubNavBar