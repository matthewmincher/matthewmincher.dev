import * as React from "react"
import Layout from "../components/layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Styles from "./index.module.scss"
import '@fortawesome/fontawesome-svg-core/styles.css';

import PhpLogo from "../images/logo-php.svg"
import MysqlLogo from "../images/logo-mysql.svg"
import NodejsLogo from "../images/logo-nodejs.svg"

import MapImage from "../images/map.png"
import contactData from "../data/aroundtheweb"



const IndexPage = () => {
	return (
		<Layout pageTitle="Home">
			<div className={Styles.heroAvatar}>

			</div>
			<h1 className={Styles.heroTitle}>Matthew Mincher</h1>
			<div className={Styles.heroSubtitle}>Software Engineer at <a href="https://www.codefanatics.co.uk" target="_blank" rel="noreferrer">Code Fanatics</a>. Full Stack Developer.</div>

			<div className="constrainedContent">
				<div className={Styles.skillsSection + ' ' + Styles.server}>
					<div className={Styles.item}>
						<div className={Styles.identity}>
							<img src={PhpLogo} height="65" alt="PHP" />
						</div>

					</div>
					<div className={Styles.item}>
						<div className={Styles.identity}>
							<img src={MysqlLogo} height="65" alt="mySQL" />
						</div>
					</div>

					<div className={Styles.item}>
						<div className={Styles.identity}>
							<img src={NodejsLogo} height="65" alt="nodeJS" />
						</div>
					</div>
				</div>
			</div>


			<div className={Styles.linksContainer}>
				<div className="constrainedContent">
					<div className={Styles.positionContainer}>
						<h2>Around the web</h2>

						<div className={Styles.map}>
							<img alt="Based in Chester, UK" src={MapImage} />
						</div>

						<div className={Styles.professional}>
							{contactData.professional.map((link) => (
								<a key={link.label} title={link.label} aria-label={link.label} href={link.link} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={link.icon} size="4x" /></a>
							))}
						</div>
						<div className={Styles.personal}>
							{contactData.personal.map((link) => (
								<a key={link.label} title={link.label} aria-label={link.label} href={link.link} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={link.icon} size="2x" /></a>
							))}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default IndexPage