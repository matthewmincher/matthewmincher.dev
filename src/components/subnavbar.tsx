import * as React from "react";
import { Link } from 'gatsby';
import * as Styles from './subnavbar.module.scss';

interface SubNavBarItem {
	url: string;
	title: string;
}

interface SubNavBarProps {
	items: SubNavBarItem[];
}

const SubNavBar: React.FC<SubNavBarProps> = ({ items }) => {
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