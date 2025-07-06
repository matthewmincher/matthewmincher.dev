import * as React from "react"
import Layout from "../components/layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';

import contactData from "../data/aroundtheweb"
import {StaticImage} from "gatsby-plugin-image";
import type { PageProps } from "@/types";

const IndexPage: React.FC<PageProps> = () => {
	return (
		<Layout pageTitle="Home">
			<div className="w-[120px] h-[120px] bg-gray-400 mt-10 mx-auto overflow-hidden rounded-3xl">
				<StaticImage src="../images/me.jpeg" width={120} height={120} quality={100} layout="fixed" loading={"eager"} alt="Matthew Mincher" />
			</div>
			<h1 className="text-emerald-500 text-center text-5xl my-1 font-bold">Matthew Mincher</h1>
			<div className="text-center text-gray-600">Full Stack Developer.</div>

			<div className="bg-emerald-950 mt-20 mb-10 py-8 px-2.5">
				<div className="w-full mx-auto max-w-screen-xl">
					<div className="relative pt-[300px] md:pt-0">
						<h2 className="text-emerald-500 opacity-80 text-4xl mb-8 font-bold">Around the web</h2>

						<div className="absolute -top-14 right-1/2 translate-x-1/2 md:-right-14 md:translate-x-0 md:-bottom-14 bg-white rounded-xl overflow-hidden border-1 border-stone-100">
							<StaticImage src="../images/map.png" width={488} height={310} quality={100} layout="fixed" alt="Based in Chester, UK" />
						</div>

						<div className="mb-8 flex gap-x-10">
							{contactData.professional.map((link) => (
								<a className="text-stone-100 hover:text-emerald-500" key={link.label} title={link.label} aria-label={link.label} href={link.link} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={link.icon} size="4x" /></a>
							))}
						</div>
						<div className="flex gap-x-10">
							{contactData.personal.map((link) => (
								<a className="text-stone-100 hover:text-emerald-500" key={link.label} title={link.label} aria-label={link.label} href={link.link} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={link.icon} size="2x" /></a>
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
