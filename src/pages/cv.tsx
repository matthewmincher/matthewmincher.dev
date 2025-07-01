import * as React from "react"
import Layout from "../components/layout";
import * as Styles from "./cv.module.scss"
import PdfIcon from "../images/icon_pdf.svg";
import {withPrefix} from "gatsby";
import Obfuscate from 'react-obfuscate';
import SubNavBar from "../components/subnavbar";

import {focusLinks, personalStatement} from "../data/sharedcv";
import type { PageProps } from "../types";

const CvPage: React.FC<PageProps> = () => {
	return (
		<Layout pageTitle="CV">
			<SubNavBar items={focusLinks} />
			<div className={`constrainedContent ${Styles.container}`}>
				<div className={Styles.download}>
					<a href={withPrefix("/exports/matthewmincher-cv.pdf")} target="_blank" rel="noreferrer">
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
						<li className={Styles.category}>Mobile</li>
						<li className={Styles.item}>Cross Platform (Apache Cordova)</li>
						<li className={Styles.item}>Native iOS (Swift / Objective C)</li>
						<li className={Styles.item}>Native Android (Java)</li>
						<li className={Styles.item}>App Store guidelines and submission (Apple, Google, Amazon)</li>
					</ul>
					<ul className={Styles.last}>
						<li className={Styles.category}>Frontend</li>
						<li className={Styles.item}>HTML/CSS</li>
						<li className={Styles.item}>Javascript</li>
						<li className={Styles.item}>jQuery</li>
						<li className={Styles.item}>Wordpress</li>
						<li className={Styles.item}>Gatsby</li>
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
								<p>Active development has continued with new features, upgrades, and modernisation.</p>
								<p>With over a million installations and thousands of active players, gained experience at every level - from designing and implementing a new feature to handling player feedback and issues on that feature.</p>
							</div>
							<div className={Styles.skills}>
								<ul>
									<li>PHP</li>
									<li>MySQL</li>
									<li>REST</li>
									<li>HTML/CSS</li>
									<li>Javascript / jQuery</li>
									<li>Apache Cordova</li>
									<li>iOS (Objective-C, then Swift)</li>
									<li>Android (Java)</li>
									<li>Linux</li>
									<li>ReactPHP</li>
									<li>ZeroMQ</li>
									<li>Redis</li>
									<li>Memcached</li>
									<li>Solr</li>
									<li>In App Billing</li>
									<li>Push Notifications</li>
									<li>Game Design</li>
								</ul>
							</div>
							<div className={Styles.recent}>
								<h5>Recent Major Projects for GP</h5>

								<div className={Styles.subproject}>
									<div className={Styles.title}><strong>iOS client rebuild</strong> (released Early 2021)</div>
									<p>Rewrote iOS version of the game from Objective-C to Swift, and moved from Apache Cordova to WKWebview, supplemented by our own native components.</p>
								</div>
								<div className={Styles.subproject}>
									<div className={Styles.title}><strong>"OCs"</strong> (released summer 2020)</div>
									<p>Websockets and ReactPHP were used to allow players to collaborate in real time.</p>
								</div>
							</div>
						</div>

						<h4 className="afterPageBreak">XPERMIT®</h4>
						<div className={Styles.annotation}>
							<span className={Styles.dates}>2019 - 2021</span> (DBT Software Ltd)
						</div>
						<div className={Styles.work}>
							<p>Creation of native apps for Android and iOS to protect files from unauthorised viewing. Each app interacts with the XPERMIT API and the device OS to make managing files and permissions easy.</p>
							<p>Responsible for the implementation of both mobile apps. Key areas of work included protecting documents from unauthorised viewing via screenshots or recordings, and preventing access to decrypted files.</p>
						</div>
						<div className={Styles.skills}>
							<ul>
								<li>iOS (Swift)</li>
								<li>Android (Java)</li>
								<li>API Integration</li>
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
							<p>A mobile game available on iOS and Android in which the player takes photos of cars which are identified and valued in game. Vehicles can be sold, upgraded, and raced. Includes leaderboards, a timeline, and profiles.</p>
							<p>Responsible for the implementation of the mobile apps, as well as backend architecture and a large portion of the API.</p>
							<p>Made contributions to game design, and handled technical user issues &amp; support.</p>
						</div>
						<div className={Styles.skills}>
							<ul>
								<li>PHP</li>
								<li>REST API</li>
								<li>MySQL</li>
								<li>iOS (Swift)</li>
								<li>Android (Java)</li>
								<li>Javascript</li>
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
							<p>A mobile game using Cordova. Extensive backend architecture including a bespoke MVC framework in PHP. Elements of this project were taken forward into future work. Novel contributions included creating 3D scenes using Three.js, and modelling combat in an object-oriented fashion.</p>
						</div>
						<div className={Styles.skills}>
							<ul>
								<li>PHP</li>
								<li>MySQL</li>
								<li>HTML/CSS</li>
								<li>Javascript</li>
								<li>Three.js</li>
								<li>Linux</li>
								<li>Apache Cordova</li>
								<li>ReactPHP</li>
								<li>RabbitMQ</li>
								<li>Game Design</li>
							</ul>
						</div>


					</div>
				</div>

				<h3 className={Styles.workplace}>Eden Interactive, Sept 2010 - June 2011</h3>
				<div className={Styles.occupation}>PHP/MySQL Developer</div>
				<div className={Styles.work}>
					<p>Varied work for a large Christian eCommerce retailer. This included building features for the customer facing website as well as improving and maintaining internal infrastructure. IT support also undertaken.</p>
				</div>
				<div className={Styles.skills}>
					<ul>
						<li>PHP</li>
						<li>MySQL</li>
						<li>jQuery</li>
						<li>HTML/CSS</li>
						<li>Linux</li>
						<li>Solr</li>
						<li>A/B Testing</li>
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