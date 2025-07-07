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
		<Layout pageTitle="CV - Frontend">
			<SubNavBar items={focusLinks} />
			<div className="w-full max-w-screen-xl mx-auto print:px-4 print:text-[80%] px-2.5">
				<div className="float-end mr-7 text-sm group print:hidden">
					<a
						href={withPrefix("/exports/matthewmincher-cv-frontend.pdf")}
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
						<li className="list-none text-lg mb-1">Mobile</li>
						<li className="ml-10">Cross Platform (Apache Cordova)</li>
						<li className="ml-10">Native iOS (Swift / Objective C)</li>
						<li className="ml-10">Native Android (Java)</li>
						<li className="ml-10">App Store guidelines and submission (Apple, Google, Amazon)</li>
					</ul>
					<ul className="min-w-[50%] p-0 m-0 list-disc">
						<li className="list-none text-lg mb-1">Frontend</li>
						<li className="ml-10">HTML/CSS</li>
						<li className="ml-10">Javascript</li>
						<li className="ml-10">jQuery</li>
						<li className="ml-10">Wordpress</li>
						<li className="ml-10">Gatsby</li>
					</ul>
					<ul className="min-w-[50%] p-0 m-0 list-disc">
						<li className="list-none text-lg mb-1">Backend</li>
						<li className="ml-10">PHP (OO + MVC)</li>
						<li className="ml-10">MySQL</li>
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
								<p className="my-4">The web games Gangster Paradise 1 & 2 were reimagined and taken to the next level as a mobile app. GP is a complex multiplayer online game with a huge range of functionality - including social features such as a forum, leaderboards, and direct/group messaging. Originally built with jQuery mobile, since heavily modified to meet requirements.</p>
								<p className="my-4">During early development, browser issues were common and problematic. Found and tested workarounds for WebView touch delays on Android + iOS. Improved performance due to a growing DOM by loading and temporarily caching fragments as necessary, and applied the same to the CSS and JS bindings those fragments required. Enabled us to continue to run on the extremely RAM constrained Blackberry platform as the game grew.</p>
								<p className="my-4">Responsible for the native clients (iOS, Android, and Blackberry). Originally Apache Cordova, with additional custom plugins. Updated app over time to match changes in platform guidelines and requirements, and to take advantage of new web standards and native capabilities.</p>
								<p className="my-4">Championed and implemented support for the brand new Blackberry 10 platform, which resulted in good ROI with GP reaching the top apps list of their storefront.</p>
							</div>
							<div>
								<ul className="list-none">
									{[
										'HTML/CSS',
										'Javascript / jQuery',
										'Apache Cordova',
										'iOS (Objective-C, then Swift)',
										'Android (Java)',
										'Game Design',
									].map(skillsItem)}
								</ul>
							</div>
							<div>
								<h5 className="font-bold mt-2">Recent Major Projects for GP</h5>

								<div className="border-l-2 border-l-gray-300 mt-2 ml-5 pl-5">
									<div className="text-sm"><strong>iOS client rebuild</strong> (released Early 2021)</div>
									<p className="my-[3px]">Rewrote iOS version of the game from Objective-C to Swift, and moved from Apache Cordova to WKWebview, supplemented by our own native components.</p>
								</div>
								<div className="border-l-2 border-l-gray-300 mt-2 ml-5 pl-5">
									<div className="text-sm"><strong>"OCs"</strong> (released summer 2020, updated autumn 2021)</div>
									<p className="my-[3px]">Websockets and were used to allow players to collaborate in real time, a departure from our usual REST methodology.</p>
								</div>
							</div>
						</div>

						<h4 className="font-bold afterPageBreak mt-2">XPERMIT®</h4>
						<div className="text-xs">
							<span className="italic">2019 - 2021</span> (DBT Software Ltd)
						</div>
						<div>
							<p className="my-4">Creation of native apps for Android and iOS to protect files from unauthorised viewing. Each app interacts with the XPERMIT API and the device OS to make managing files and permissions easy.</p>
							<p className="my-4">Responsible for the implementation of both mobile apps. Key areas of work included protecting documents from unauthorised viewing via screenshots or recordings, and preventing access to decrypted files.</p>
						</div>
						<div>
							<ul className="list-none">
								{[
									'iOS (Swift)',
									'Android (Java)',
									'API Integration',
									'Security / Robustness',
									'Encryption',
									'Authentication',
									'Agile'
								].map(skillsItem)}
							</ul>
						</div>

						<h4 className="font-bold mt-2">Chop Shop</h4>
						<div className="text-xs">
							<span className="italic">2016 - 2021</span>
						</div>
						<div>
							<p className="my-4">A native mobile game available on iOS and Android in which the player takes photos of cars which are identified and valued in game. Vehicles can be sold, upgraded, and raced. Includes leaderboards, a timeline, and profiles.</p>
							<p className="my-4">Responsible for the implementation of the mobile apps, as well as backend architecture and a large portion of the API.</p>
							<p className="my-4">Particular attention was paid to minimising the number of HTTP requests done by a client (to reduce battery and network impact on mobile devices). Client components observe a global state store, allowing them to update even if the HTTP request was unrelated. Both client and server can queue state changes to be exchanged next time a request is made.</p>
							<p className="my-4">Implemented Google Play Games support on Android, and Apple GameCenter on iOS, including authentication and achievements.</p>
						</div>
						<div>
							<ul className="list-none">
								{[
									'iOS (Swift)',
									'Android (Java)',
									'REST',
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
							<p className="my-4">A mobile game using Cordova. Elements of this project were taken forward into future work. Novel contributions included creating 3D scenes using Three.js.</p>
						</div>
						<div>
							<ul className="list-none">
								{[
									'HTML/CSS',
									'Javascript',
									'Three.js',
									'Apache Cordova',
									'Game Design'
								].map(skillsItem)}
							</ul>
						</div>
					</div>
				</div>

				<h3 className="text-emerald-900 font-bold mt-4">Eden Interactive, Sept 2010 - June 2011</h3>
				<div className="italic">PHP/MySQL Developer</div>
				<div>
					<p className="my-4">Varied work for a large Christian eCommerce retailer. This included building features for the customer facing website as well as improving and maintaining internal infrastructure. IT support also undertaken.</p>
				</div>
				<div>
					<ul>
						<li>PHP</li>
						<li>MySQL</li>
						<li>jQuery</li>
						<li>HTML/CSS</li>
						<li>A/B Testing</li>
					</ul>
					<ul className="list-none">
						{[
							'PHP',
							'MySQL',
							'jQuery',
							'HTML/CSS',
							'A/B Testing'
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