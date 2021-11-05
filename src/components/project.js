import * as React from "react";
import * as Styles from './project.module.scss';
import {GatsbyImage} from "gatsby-plugin-image";
import BackgroundImage from 'gatsby-background-image'

const Project = ({name, image, stack, link, colorPrimary}) => {
	console.log(stack);
	return (
		<div className={Styles.project} style={{
			backgroundColor: colorPrimary
		}}>

			<BackgroundImage
				className={Styles.backdropImage}
				{...image}
				style={{
					height: '100%',
					backgroundSize: '100% 100%',
				}}
			>
				<div className={Styles.title}>{name}</div>

				<div className={Styles.stackContainer}>
					{stack.map((item) => {
						return (<div className={Styles.item}><img src={item.image} /> {item.name}</div>)
					})}
				</div>
			</BackgroundImage>


		</div>
	)
}

export default Project