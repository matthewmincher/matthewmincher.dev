import * as React from "react"
import isEmail from "validator/lib/isEmail";
import Layout from "../components/layout";
import * as Styles from './contact.module.scss';

class ContactPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				name: '',
				email: '',
				message: ''
			},
			errors: {

			}
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const { formData } = this.state;
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			formData: {
				...formData,
				[name]: value
			}
		})
	}
	handleSubmit(event){
		event.preventDefault()

		const { formData } = this.state;
		const { name, email, message} = formData;

		const errors = {};

		if(!isEmail(email)) {
			errors.email = "Please enter a valid email address"
		}

		if(message.length < 10) {
			errors.message = "Please enter a message"
		}

		this.setState({
			errors: errors
		});

		if(Object.keys(errors).length > 0){
			return
		}
	}

	render() {
		return (
			<Layout pageTitle="Contact Me">
				<div className="constrainedContent">
					<form className={Styles.contactForm} method="post" onSubmit={this.handleSubmit}>
						<div className={Styles.row}>
							<div className={Styles.col}>
								<div className={Styles.labelContainer}>
									<label htmlFor="name">Name</label>
								</div>
								<input
									id="name"
									type="text"
									name="name"
									value={this.state.name}
									onChange={this.handleInputChange}
								/>
							</div>
							<div className={Styles.col}>
								<div className={Styles.labelContainer}>
									<label htmlFor="email">Email</label>
									{this.state.errors.email &&
									<span className={Styles.inputErrorHint}>{this.state.errors.email}</span>
									}
								</div>
								<input
									id="email"
									type="email"
									name="email"
									inputMode="email"
									value={this.state.email}
									onChange={this.handleInputChange}
								/>
							</div>
						</div>

						<div className={Styles.labelContainer}>
							<label htmlFor="message">Message</label>
							{this.state.errors.message &&
							<span className={Styles.inputErrorHint}>{this.state.errors.message}</span>
							}
						</div>
						<textarea
							id="message"
							name="message"
							rows="5"
							value={this.state.message}
							onChange={this.handleInputChange}
						/>
						<input className={Styles.submit} type="submit" value="Send" />
					</form>
				</div>
			</Layout>
		)
	}
}

export default ContactPage