import { faStackOverflow, faGithub, faTwitter, faInstagram, faLastfm, faGoodreadsG, faSteam } from '@fortawesome/free-brands-svg-icons'
import type { ContactData } from '../types';

const data: ContactData = {
	professional: [
		{
			link: 'https://stackoverflow.com/users/590487/matt',
			label: 'Stack Overflow',
			icon: faStackOverflow
		},
		{
			link: 'https://github.com/matthewmincher',
			label: 'Github',
			icon: faGithub
		}
	],
	personal: [
		{
			link: 'https://twitter.com/matthewmincher',
			label: 'Twitter',
			icon: faTwitter
		},
		{
			link: 'https://instagram.com/matthewmincher',
			label: 'Instagram',
			icon: faInstagram
		},
		{
			link: 'https://www.last.fm/user/matthewmincher',
			label: 'Last.fm',
			icon: faLastfm
		},
		{
			link: 'https://www.goodreads.com/user/show/22574656-matthew',
			label: 'Goodreads',
			icon: faGoodreadsG
		},
		{
			link: 'https://steamcommunity.com/id/hartshill/',
			label: 'Steam',
			icon: faSteam
		}
	]
}

export default data;