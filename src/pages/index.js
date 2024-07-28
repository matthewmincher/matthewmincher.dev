import * as React from "react"
import Layout from "../components/layout";
import * as Styles from "./index.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';

import contactData from "../data/aroundtheweb"
import {StaticImage} from "gatsby-plugin-image";


const IndexPage = () => {
	return (
		<Layout pageTitle="Home">
			<div className={Styles.heroAvatar}>
				<StaticImage src="../images/me.jpg" width={120} height={120} quality={100} layout="fixed" loading={"eager"} alt="Matthew Mincher" />
			</div>
			<h1 className={Styles.heroTitle}>Matthew Mincher</h1>
			<div className={Styles.heroSubtitle}>Full Stack Developer.</div>

			<div className="constrainedContent">

			</div>


			<div className={Styles.linksContainer}>
				<div className="constrainedContent">
					<div className={Styles.positionContainer}>
						<h2>Around the web</h2>

						<div className={Styles.map}>
							<StaticImage src="../images/map.png" width={488} height={310} quality={100} layout="fixed" alt="Based in Chester, UK" />
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
							
                				<link rel="me" href="https://mastodon.social/@matthewmincher" />
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default IndexPage
