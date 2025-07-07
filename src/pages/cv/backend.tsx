import * as React from "react"
import Layout from "../../components/layout";
import PdfIcon from "../../images/icon_pdf.svg";
import {withPrefix} from "gatsby";
import Obfuscate from 'react-obfuscate';
import SubNavBar from "../../components/subnavbar";
import type { PageProps } from "@/types";

import {focusLinks, personalStatement} from "../../data/sharedcv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

const skillsItem = (s: string) => <li key={s} className="border-b-2 border-dotted border-gray-300 mr-4 mb-1 inline-block">{s}</li>

const CvPage: React.FC<PageProps> = () => {
	return (
		<Layout pageTitle="CV - Backend">
			<SubNavBar items={focusLinks} />
			<div className="w-full max-w-screen-xl mx-auto print:px-4 print:text-[80%] px-2.5">
				<div className="float-end mr-7 text-sm group print:hidden">
					<a
						href={withPrefix("/exports/matthewmincher-cv-backend.pdf")}
						target="_blank"
						rel="noreferrer"
						className="px-1 py-3"
					>
						<img
							src={PdfIcon}
							width={30}
							className="inline-block align-middle"
							alt=""
						/> <span className="border-b-[3px] border-transparent transition-all duration-200 ease-in group-hover:border-red-600">View as PDF</span>
					</a>
				</div>

				<h1 className="mb-0">Matthew Mincher</h1>
				<div className="mt-1">
					www.matthewmincher.dev
				</div>
				<div className="mt-1">
					<Obfuscate
						email="matthew@mincher.org"
						className="border-b-2 border-stone-300 border-dashed hover:border-emerald-500 hover:text-emerald-500"
					/>
				</div>
				<div className="hidden print:block mt-1">
					<Obfuscate tel="07791771866" />
				</div>
				<div className="mt-1">Chester, UK</div>

				<h2 className="text-xl mt-4 mb-1 font-bold">Personal Statement</h2>
				{personalStatement}

				<h2 className="text-xl mt-4 font-bold">Skills</h2>

				<div className="flex flex-wrap">
					<ul className="min-w-[50%] p-0 m-0 list-disc">
						<li className="list-none text-lg mb-1">Platform</li>
						<li className="ml-10">Linux (Ubuntu) server management</li>
						<li className="ml-10">MySQL (Percona Server) management & optimisation</li>
						<li className="ml-10">Docker</li>
						<li className="ml-10">AWS (S3/SES/SQS)</li>
						<li className="ml-10">Bash scripting</li>
					</ul>
					<ul className="min-w-[50%] p-0 m-0 list-disc">
						<li className="list-none text-lg mb-1">Backend</li>
						<li className="ml-10">PHP (OO + MVC)</li>
						<li className="ml-10">MySQL</li>
						<li className="ml-10">NodeJS</li>
						<li className="ml-10">Redis</li>
						<li className="ml-10">Apache Solr</li>
					</ul>
					<ul className="min-w-[50%] p-0 m-0 list-disc">
						<li className="list-none text-lg mb-1">Frontend</li>
						<li className="ml-10">HTML/CSS</li>
						<li className="ml-10">Javascript</li>
					</ul>
				</div>

				<h2 className="text-xl mt-4 font-bold mb-1">Experience</h2>

				<h3 className="text-emerald-900 font-bold">Code Fanatics, July 2011 - Present</h3>
				<div className="italic">Technical Director - 2014</div>
				<div className="italic">Developer - 2011</div>
				<div className="mt-1">
					<p>Working as part of a small team to develop multiplayer cross-platform online games, projects were also undertaken for external companies. Personal focus was the backend API and client architecture.</p>
				</div>
				<div>
					<div className="ml-10 pt-2.5">
						<div className="pb-4">
							<h4 style={{
								color: "#DC3A34"
							}}>Gangster Paradise App</h4>
							<div className="text-xs">
								<a className="border-b-2 border-stone-300 border-dashed hover:border-emerald-500 hover:text-emerald-500" href="https://www.gangsterparadiseapp.com" target="_blank" rel="noreferrer">https://www.gangsterparadiseapp.com</a>
								<span className="print:hidden"><FontAwesomeIcon icon={faUpRightFromSquare} className="ml-1 w-4 h-4 " /></span>
							</div>
							<div className="text-xs mt-1">
								<span className="italic">2011 - 2021</span>
							</div>
							<div>
								<p className="my-4">The web games Gangster Paradise 1 & 2 were reimagined and taken to the next level as a mobile app. GP is a complex multiplayer online game with a huge range of functionality - including social features such as a forum, leaderboards, and direct/group messaging.</p>
								<p className="my-4">Implemented and maintained a complex API. Reduced the average wall clock execution time of the API from  over 150ms to 30ms using xhprof to profile code paths. Implemented automatic deadlock resolution in our framework and ORM to simplify day to day development.</p>
								<p className="my-4">Responsible for performance - monitored request and error patterns to fix badly-behaved controllers or SQL queries.</p>
								<p className="my-4">Integrated third party APIs including: Google Play Developer API, Firebase Cloud Messaging, Apple Push Notification service, Amazon Simple Email Service, multiple OAuth providers.</p>
							</div>
							<div>
								<ul className="list-none">
									{[
										'PHP',
										'MySQL',
										'REST',
										'ReactPHP',
										'ZeroMQ',
										'Redis',
										'Memcached',
										'Solr',
										'API Integration'
									].map(skillsItem)}
								</ul>
							</div>
							<div>
								<h5 className="font-bold mt-2">Recent Major Projects for GP</h5>

								<div className="border-l-2 border-l-gray-300 mt-2 ml-5 pl-5">
									<div className="text-sm"><strong>"OCs"</strong> (released summer 2020, updated autumn 2021)</div>
									<p className="my-[3px]">Websockets and ReactPHP were used to allow players to collaborate in real time. Departure from our usual API methodology which allowed us to improve reactivity without overburdening game clients.</p>
								</div>

								<div className="border-l-2 border-l-gray-300 mt-2 ml-5 pl-5">
									<div className="text-sm"><strong>Account Deletion</strong> (autumn 2021)</div>
									<p className="my-[3px]">Self service account deletion to comply with app store guidelines above and beyond GDPR. Additions to our web based account management portal, modifications to our moderator web app to help them process deletions, as well as game API changes to support erasure of personal data automatically.</p>
								</div>

								<div className="border-l-2 border-l-gray-300 mt-2 ml-5 pl-5">
									<div className="text-sm"><strong>Voided Purchase Management</strong> (early 2020)</div>
									<p>Handle one-time notifications from Apple, and proactively interact with the Google Play API to reduce refund abuse. Link notifications to purchases and game accounts to inform players of issues and facilitate moderator action.</p>
								</div>
							</div>
						</div>

						<h4 className="font-bold afterPageBreak mt-2">XPERMIT®</h4>
						<div className="text-xs">
							<span className="italic">2019 - 2021</span> (DBT Software Ltd)
						</div>
						<div>
							<p className="my-4">Consulted on the design of a REST API for XPERMIT. Responsible for integrating that API on the iOS and Android clients.</p>
						</div>
						<div>
							<ul className="list-none">
								{[
									'REST',
									'Client Integration',
									'iOS (Swift)',
									'Android (Java)',
									'Security / Robustness',
									'Encryption',
									'Authentication',
									'Agile',
								].map(skillsItem)}
							</ul>
						</div>

						<h4 className="font-bold mt-2">Chop Shop</h4>
						<div className="text-xs">
							<span className="italic">2016 - 2021</span>
						</div>
						<div>
							<p className="my-4">A multiplayer online mobile game available on iOS and Android in which the player takes photos of cars which are identified and valued in game. Vehicles can be sold, upgraded, and raced. Includes social elements such as leaderboards, a timeline, and profiles.</p>
							<p className="my-4">Implemented using our bespoke MVC framework mentioned below.</p>
							<p className="my-4">Particular attention was paid to minimising the number of HTTP requests done by a client (to reduce battery and network impact on mobile devices) which lead us to queue certain state changes for the next time the client contacts the server rather than polling or pushing data proactively. This was done automatically without developer intervention.</p>
						</div>
						<div>
							<ul className="list-none">
								{[
									'PHP',
									'MySQL',
									'REST',
									'Linux',
									'Docker',
									'RabbitMQ',
									'API Integration',
									'In App Billing',
									'Push Notifications',
									'Game Design'
								].map(skillsItem)}
							</ul>
						</div>

						<h4 className="font-bold mt-2">Unreleased Project</h4>
						<div className="text-xs">
							<span className="italic">2014 - 2016</span>
						</div>
						<div>
							<p className="my-4">Extensive backend architecture of a bespoke MVC framework in PHP to enable white-label game development. Performance profiling, request logging, and error tracing automatically handled. Integration with ReactPHP + RabbitMQ for asynchronous event driven services.</p>
							<p className="my-4">Reusable mod panel web app created covering generic game moderation activity, while allowing specific games to easily extend further. Twig utilised for the view layer to simplify development and encourage reuse.</p>
						</div>
						<div>
							<ul className="list-none">
								{[
									'PHP',
									'MySQL',
									'HTML/CSS',
									'Javascript',
									'Twig',
									'Linux',
									'ReactPHP',
									'RabbitMQ'
								].map(skillsItem)}
							</ul>
						</div>
					</div>
				</div>

				<h3 className="text-emerald-900 font-bold mt-4">Eden Interactive, Sept 2010 - June 2011</h3>
				<div className="italic">PHP/MySQL Developer</div>
				<div>
					<p className="my-4">Procedural style PHP with an emphasis on testable and reusable functions that could be composed. Contributions included work A/B testing new features, interacting with SOAP APIs and adding support for digital product downloads.</p>
				</div>
				<div>
					<ul className="list-none">
						{[
							'PHP',
							'MySQL',
							'Linux',
							'Solr'
						].map(skillsItem)}
					</ul>
				</div>

				<h3 className="text-emerald-900 font-bold mt-4">Stuart Web Enterprises, Sept 2008 - May 2009</h3>
				<div className="italic">Software Developer</div>
				<div>
					<p className="my-4">Part time work on the second version of web game Gangster Paradise. Key contributions included a mission system, casinos, and gameplay achievements.</p>
				</div>
				<div>
					<ul className="list-none">
						{[
							'PHP',
							'MySQL',
							'jQuery',
							'HTML/CSS',
							'Game Design'
						].map(skillsItem)}
					</ul>
				</div>

				<h2 className="text-xl mt-4 font-bold mb-1">Education</h2>

				<h3 className="text-emerald-900 font-bold">University of Chester, 2007 - 2010</h3>
				<div>BSc Computer Science - first-class honors</div>

				<h3 className="text-emerald-900 font-bold mt-4">St Joseph's College, 2005 - 2007</h3>
				<div>A-Levels AABB</div>

				<h3 className="text-emerald-900 font-bold mt-4">St Joseph's College, 2003 - 2005</h3>
				<div>GCSEs 5A* 5A</div>

				<div className="h-10" />
			</div>
		</Layout>
	)
}

export default CvPage