import * as React from "react"
import axios from "axios";
import { navigate } from "gatsby"
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

			},
			sending: false
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
		const { email, message} = formData;

		const errors = {};

		if(!isEmail(email)) {
			errors.email = "The email must be a valid email address."
		}

		if(message.length < 10) {
			errors.message = "The message must be at least 10 characters."
		}

		this.setState({
			errors: errors
		});

		if(Object.keys(errors).length > 0){
			return
		}

		this.setState({
			sending: true
		});

		axios({
			method: "POST",
			url: "https://api.matthewmincher.dev/api/contact",
			data: this.state.formData
		}).then((response) => {
			if(response.data && response.data.success){
				navigate('/contact/sent')
			}
		}).catch((error) => {
			if(error.response){
				let params = error.response.data;

				if(typeof params.errors !== "undefined"){
					let errors = {};

					for(let key in params.errors){
						errors[key] = params.errors[key][0];
					}

					this.setState({
						errors: errors
					});
				}
			}
		}).finally(() => {
			this.setState({
				sending: false
			});
		});
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
									disabled={this.state.sending}
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
									disabled={this.state.sending}
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
							disabled={this.state.sending}
						/>
						<input className={Styles.submit} type="submit" value="Send" disabled={this.state.sending} />
					</form>
				</div>
			</Layout>
		)
	}
}

export default ContactPage