import * as React from "react"
import Layout from "../components/layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Styles from "./index.module.scss"


import { faStackOverflow, faGithub, faTwitter, faInstagram, faLastfm, faGoodreadsG, faSteam } from '@fortawesome/free-brands-svg-icons'



const IndexPage = () => {
	return (
		<Layout pageTitle="Home">
			<div className={Styles.heroAvatar}>

			</div>
			<h1 className={Styles.heroTitle}>Matthew Mincher</h1>
			<div className={Styles.heroSubtitle}>Software Engineer at <a href="https://www.codefanatics.co.uk" target="_blank" rel="noreferrer">Code Fanatics</a>. Full Stack Developer.</div>

			<div className={Styles.linksContainer}>
				<div className="constrainedContent">
					<h2>Around the web</h2>

					<div className={Styles.professional}>
						<a title="Stackoverflow" href="https://stackoverflow.com/users/590487/matt" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faStackOverflow} size="4x" /></a>
						<a title="Github" href="https://github.com/matthewmincher" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} size="4x" /></a>

					</div>
					<div className={Styles.personal}>
						<a title="Twitter" href="https://twitter.com/matthewmincher" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
						<a title="Instagram" href="https://instagram.com/matthewmincher" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
						<a title="Last.fm" href="https://www.last.fm/user/matthewmincher" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLastfm} size="2x" /></a>
						<a title="Goodreads" href="https://www.goodreads.com/user/show/22574656-matthew" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGoodreadsG} size="2x" /></a>
						<a title="Steam" href="https://steamcommunity.com/id/hartshill/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faSteam} size="2x" /></a>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default IndexPage