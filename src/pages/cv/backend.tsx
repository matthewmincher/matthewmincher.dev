import * as React from "react"
import Layout from "../../components/layout";
import * as Styles from "../cv.module.scss"
import PdfIcon from "../../images/icon_pdf.svg";
import {withPrefix} from "gatsby";
import Obfuscate from 'react-obfuscate';
import SubNavBar from "../../components/subnavbar";
import type { PageProps } from "../../types";

import {focusLinks, personalStatement} from "../../data/sharedcv";

const CvPage: React.FC<PageProps> = () => {
	return (
		<Layout pageTitle="CV - Backend">
			<SubNavBar items={focusLinks} />
			<div className={`constrainedContent ${Styles.container}`}>
				<div className={Styles.download}>
					<a href={withPrefix("/exports/matthewmincher-cv-backend.pdf")} target="_blank" rel="noreferrer">
						<img
							src={PdfIcon}
							width={30}
							className={Styles.pdfIcon}
							alt=""
						/> <span>View as PDF</span>
					</a>
				</div>

				<h1 className={Styles.name}>Matthew Mincher</h1>
				<div className={Styles.website}>
					www.matthewmincher.dev
				</div>
				<div className={Styles.email}>
					<Obfuscate email="matthew@mincher.org" />
				</div>
				<div className={Styles.telephone}>
					<Obfuscate tel="07791771866" />
				</div>
				<div className={Styles.address}>Chester, UK</div>

				<h2>Personal Statement</h2>
				{personalStatement}

				<h2>Skills</h2>

				<div className={Styles.skillsContainer}>
					<ul>
						<li className={Styles.category}>Platform</li>
						<li className={Styles.item}>Linux (Ubuntu) server management</li>
						<li className={Styles.item}>MySQL (Percona Server) management & optimisation</li>
						<li className={Styles.item}>Docker</li>
						<li className={Styles.item}>AWS (S3/SES/SQS)</li>
						<li className={Styles.item}>Bash scripting</li>
					</ul>
					<ul>
						<li className={Styles.category}>Backend</li>
						<li className={Styles.item}>PHP (OO + MVC)</li>
						<li className={Styles.item}>MySQL</li>
						<li className={Styles.item}>NodeJS</li>
						<li className={Styles.item}>Redis</li>
						<li className={Styles.item}>Apache Solr</li>
					</ul>
					<ul className={Styles.last}>
						<li className={Styles.category}>Frontend</li>
						<li className={Styles.item}>HTML/CSS</li>
						<li className={Styles.item}>Javascript</li>
					</ul>
				</div>

				<h2>Experience</h2>

				<h3 className={Styles.workplace}>Code Fanatics, July 2011 - Present</h3>
				<div className={Styles.occupation}>Technical Director - 2014</div>
				<div className={Styles.occupation}>Developer - 2011</div>
				<div className={Styles.work}>
					<p>Working as part of a small team to develop multiplayer cross-platform online games, projects were also undertaken for external companies. Personal focus was the backend API and client architecture.</p>
				</div>
				<div className={Styles.work}>
					<div className={Styles.subproject}>
						<div style={{breakAfter: "page"}}>
							<h4 style={{
								color: "#DC3A34"
							}}>Gangster Paradise App</h4>
							<div className={Styles.annotation}>
								<span className={Styles.link}><a href="https://www.gangsterparadiseapp.com" target="_blank" rel="noreferrer">https://www.gangsterparadiseapp.com</a></span>
							</div>
							<div className={Styles.annotation}>
								<span className={Styles.dates}>2011 - 2021</span>
							</div>
							<div className={Styles.work}>
								<p>The web games Gangster Paradise 1 & 2 were reimagined and taken to the next level as a mobile app. GP is a complex multiplayer online game with a huge range of functionality - including social features such as a forum, leaderboards, and direct/group messaging.</p>
								<p>Implemented and maintained a complex API. Reduced the average wall clock execution time of the API from  over 150ms to 30ms using xhprof to profile code paths. Implemented automatic deadlock resolution in our framework and ORM to simplify day to day development.</p>
								<p>Responsible for performance - monitored request and error patterns to fix badly-behaved controllers or SQL queries.</p>
								<p>Integrated third party APIs including: Google Play Developer API, Firebase Cloud Messaging, Apple Push Notification service, Amazon Simple Email Service, multiple OAuth providers.</p>
							</div>
							<div className={Styles.skills}>
								<ul>
									<li>PHP</li>
									<li>MySQL</li>
									<li>REST</li>
									<li>ReactPHP</li>
									<li>ZeroMQ</li>
									<li>Redis</li>
									<li>Memcached</li>
									<li>Solr</li>
									<li>API Integration</li>
								</ul>
							</div>
							<div className={Styles.recent}>
								<h5>Recent Projects for GP</h5>

								<div className={Styles.subproject}>
									<div className={Styles.title}><strong>"OCs"</strong> (released summer 2020, updated autumn 2021)</div>
									<p>Websockets and ReactPHP were used to allow players to collaborate in real time. Departure from our usual API methodology which allowed us to improve reactivity without overburdening game clients.</p>
								</div>
								<div className={Styles.subproject}>
									<div className={Styles.title}><strong>Account Deletion</strong> (autumn 2021)</div>
									<p>Self service account deletion to comply with app store guidelines above and beyond GDPR. Additions to our web based account management portal, modifications to our moderator web app to help them process deletions, as well as game API changes to support erasure of personal data automatically.</p>
								</div>
								<div className={Styles.subproject}>
									<div className={Styles.title}><strong>Voided Purchase Management</strong> (early 2020)</div>
									<p>Handle one-time notifications from Apple, and proactively interact with the Google Play API to reduce refund abuse. Link notifications to purchases and game accounts to inform players of issues and facilitate moderator action.</p>
								</div>
							</div>
						</div>

						<h4 className="afterPageBreak">XPERMIT®</h4>
						<div className={Styles.annotation}>
							<span className={Styles.dates}>2019 - 2021</span> (DBT Software Ltd)
						</div>
						<div className={Styles.work}>
							<p>Consulted on the design of a REST API for XPERMIT. Responsible for integrating that API on the iOS and Android clients.</p>
						</div>
						<div className={Styles.skills}>
							<ul>
								<li>REST</li>
								<li>Client Integration</li>
								<li>iOS (Swift)</li>
								<li>Android (Java)</li>
								<li>Security / Robustness</li>
								<li>Encryption</li>
								<li>Authentication</li>
								<li>Agile</li>
							</ul>
						</div>

						<h4>Chop Shop</h4>
						<div className={Styles.annotation}>
							<span className={Styles.dates}>2016 - 2021</span>
						</div>
						<div className={Styles.work}>
							<p>A multiplayer online mobile game available on iOS and Android in which the player takes photos of cars which are identified and valued in game. Vehicles can be sold, upgraded, and raced. Includes social elements such as leaderboards, a timeline, and profiles.</p>
							<p>Implemented using our bespoke MVC framework mentioned below.</p>
							<p>Particular attention was paid to minimising the number of HTTP requests done by a client (to reduce battery and network impact on mobile devices) which lead us to queue certain state changes for the next time the client contacts the server rather than polling or pushing data proactively. This was done automatically without developer intervention.</p>
						</div>
						<div className={Styles.skills}>
							<ul>
								<li>PHP</li>
								<li>MySQL</li>
								<li>REST</li>
								<li>Linux</li>
								<li>Docker</li>
								<li>RabbitMQ</li>
								<li>API Integration</li>
								<li>In App Billing</li>
								<li>Push Notifications</li>
								<li>Game Design</li>
							</ul>
						</div>

						<h4>Unreleased Project</h4>
						<div className={Styles.annotation}>
							<span className={Styles.dates}>2014 - 2016</span>
						</div>
						<div className={Styles.work}>
							<p>Extensive backend architecture of a bespoke MVC framework in PHP to enable white-label game development. Performance profiling, request logging, and error tracing automatically handled. Integration with ReactPHP + RabbitMQ for asynchronous event driven services.</p>
							<p>Reusable mod panel web app created covering generic game moderation activity, while allowing specific games to easily extend further. Twig utilised for the view layer to simplify development and encourage reuse.</p>
						</div>
						<div className={Styles.skills}>
							<ul>
								<li>PHP</li>
								<li>MySQL</li>
								<li>HTML/CSS</li>
								<li>Javascript</li>
								<li>Twig</li>
								<li>Linux</li>
								<li>ReactPHP</li>
								<li>RabbitMQ</li>
							</ul>
						</div>


					</div>
				</div>

				<h3 className={Styles.workplace}>Eden Interactive, Sept 2010 - June 2011</h3>
				<div className={Styles.occupation}>PHP/MySQL Developer</div>
				<div className={Styles.work}>
					<p>Procedural style PHP with an emphasis on testable and reusable functions that could be composed. Contributions included work A/B testing new features, interacting with SOAP APIs and adding support for digital product downloads.</p>
				</div>
				<div className={Styles.skills}>
					<ul>
						<li>PHP</li>
						<li>MySQL</li>
						<li>Linux</li>
						<li>Solr</li>
					</ul>
				</div>

				<h3 className={Styles.workplace}>Stuart Web Enterprises, Sept 2008 - May 2009</h3>
				<div className={Styles.occupation}>Software Developer</div>
				<div className={Styles.work}>
					<p>Part time work on the second version of web game Gangster Paradise. Key contributions included a mission system, casinos, and gameplay achievements.</p>
				</div>
				<div className={Styles.skills}>
					<ul>
						<li>PHP</li>
						<li>MySQL</li>
						<li>jQuery</li>
						<li>HTML/CSS</li>
						<li>Game Design</li>
					</ul>
				</div>

				<h2>Education</h2>

				<h3 className={Styles.educator}>University of Chester, 2007 - 2010</h3>
				<div className={Styles.courses}>BSc Computer Science - first-class honors</div>

				<h3 className={Styles.educator}>St Joseph's College, 2005 - 2007</h3>
				<div className={Styles.courses}>A-Levels AABB</div>

				<h3 className={Styles.educator}>St Joseph's College, 2003 - 2005</h3>
				<div className={Styles.courses}>GCSEs 5A* 5A</div>

				<div className={Styles.bottomSpacer} />
			</div>
		</Layout>
	)
}

export default CvPage