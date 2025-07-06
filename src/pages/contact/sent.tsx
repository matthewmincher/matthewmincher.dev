import * as React from "react"
import Layout from "../../components/layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCheck} from "@fortawesome/free-solid-svg-icons";
import type { PageProps } from "@/types";

const ContactSentPage: React.FC<PageProps> = () => {
	return (
		<Layout pageTitle="Message Sent">
			<div className="w-full mx-auto max-w-screen-xl">
				<div className="text-center mt-10">
					<FontAwesomeIcon className="text-emerald-500" icon={faCheck} size="5x" />
				</div>
				<h1 className="text-emerald-500 text-center text-4xl my-1">Thanks for your message</h1>
				<div className="text-center text-gray-600">I'll get back to you as soon as I can!</div>
			</div>

		</Layout>
	)
}

export default ContactSentPage