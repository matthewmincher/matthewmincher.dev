import * as React from "react"
import Layout from "../../components/layout";
import * as Styles from "./sent.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCheck} from "@fortawesome/free-solid-svg-icons";

const ContactSentPage = () => {
	return (
		<Layout pageTitle="Message Sent">
			<div className="constrainedContent">
				<div className={Styles.iconContainer}>
					<FontAwesomeIcon className={Styles.icon} icon={faCheck} size="5x" />
				</div>
				<h1 className={Styles.heroTitle}>Thanks for your message</h1>
				<div className={Styles.heroSubtitle}>I'll get back to you as soon as I can!</div>

			</div>

		</Layout>
	)
}

export default ContactSentPage