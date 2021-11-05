import * as React from "react"
import Layout from "../components/layout";
import * as Styles from "./index.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';

import contactData from "../data/aroundtheweb"
import {StaticImage, getImage} from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge"
import Project from "../components/project";

import MysqlImage from "../images/logo-mysql.svg";
import PhpImage from "../images/logo-php.svg";
import {graphql} from "gatsby";

const IndexPage = ({data}) => {
	return (
		<Layout pageTitle="Home">
			<div className={Styles.heroAvatar}>
				<StaticImage src="../images/me.jpg" width={120} height={120} quality={100} layout="fixed" alt="Matthew Mincher" />
			</div>
			<h1 className={Styles.heroTitle}>Matthew Mincher</h1>
			<div className={Styles.heroSubtitle}><span>Software Engineer at <a href="https://www.codefanatics.co.uk" target="_blank" rel="noreferrer">Code Fanatics</a>.</span> <span>Full Stack Developer.</span></div>

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
					</div>
				</div>
			</div>

			<div className="constrainedContent">
				<h2>Projects</h2>
				<Project
					name="Gangster Paradise App"
					image={convertToBgImage(getImage(data.gpBackground))}
					stack={[
						{image: PhpImage},
						{image: MysqlImage}
					]}
					colorPrimary="maroon"
				/>
				<Project
					name="Chop Shop"
					image={convertToBgImage(getImage(data.chopshopBackground))}
					stack={[
						{image: PhpImage},
						{image: MysqlImage}
					]}
					colorPrimary="#353535"
				/>
			</div>
		</Layout>
	)
}


export const query = graphql`
     query {
       gpBackground: file(
         relativePath: { eq: "projects/gp/background.jpg" }
       ) {
         childImageSharp {
			gatsbyImageData(
				layout: FULL_WIDTH
				quality: 100
			)
        }
       }
       chopshopBackground: file(
         relativePath: { eq: "projects/chopshop/background.jpg" }
       ) {
         childImageSharp {
			gatsbyImageData(
				layout: FULL_WIDTH
				quality: 100
			)
        }
       }
     }
`;

export default IndexPage