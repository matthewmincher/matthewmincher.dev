import * as React from "react";

interface FocusLink {
	url: string;
	title: string;
}

export const focusLinks: FocusLink[] = [
	{url: "/cv/", title: "Full Stack"},
	{url: "/cv/backend/", title: "Backend Focus"},
	{url: "/cv/frontend/", title: "Frontend Focus"}
];

export const personalStatement: React.ReactElement = (
	<div>
		<p className="my-4">A conscientious developer with over 10 years experience. During a multi-faceted role with Code Fanatics, responsible for the entire development lifecycle ranging from strategy, ideation, development, testing, and support (incident management and helpdesk)</p>
		<p className="my-4">Possesses strong time management skills with the ability to efficiently handle multiple tasks or priorities. Has a proven track record of ably implementing new technologies as required to complete projects.</p>
	</div>
);