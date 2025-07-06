import * as React from "react"
import axios from "axios";
import { navigate } from "gatsby"
import isEmail from "validator/lib/isEmail";
import Layout from "../components/layout";
import type { PageProps } from "@/types";

interface FormData {
	name: string;
	email: string;
	message: string;
}

interface FormErrors {
	[key: string]: string;
}

interface ContactPageState {
	formData: FormData;
	errors: FormErrors;
	sending: boolean;
}

class ContactPage extends React.Component<PageProps, ContactPageState> {
	constructor(props: PageProps) {
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

	handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
	handleSubmit(event: React.FormEvent<HTMLFormElement>){
		event.preventDefault()

		const { formData } = this.state;
		const { email, message} = formData;

		const errors: FormErrors = {};

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
			url: "https://aw8qcbgsbl.execute-api.eu-west-2.amazonaws.com/api/contact",
			data: this.state.formData
		}).then((response) => {
			if(response.status >= 200 && response.status < 300){
				navigate('/contact/sent')
			}
		}).catch((error) => {
			if(error.response){
				let params = error.response.data;

				if(typeof params.errors !== "undefined"){
					let errors: FormErrors = {};

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
				<div className="w-full mx-auto max-w-screen-xl px-2.5">
					<h1 className="mt-16 text-center text-emerald-500 text-3xl md:text-4xl">Leave me a message and I'll get back to you</h1>

					<form className="bg-stone-100 rounded-xl mt-10 mb-10 p-6" method="post" onSubmit={this.handleSubmit}>
						<div className="flex gap-x-5 align-bottom">
							<div className="flex-1 flex flex-col">
								<div className="mb-3 flex-grow">
									<label className="text-xl text-emerald-900" htmlFor="name">Name</label>
								</div>
								<input
									className="w-full h-10 text-xl box-border border border-stone-200 p-2 outline-emerald-500 mb-5"
									id="name"
									type="text"
									name="name"
									value={this.state.formData.name}
									onChange={this.handleInputChange}
									disabled={this.state.sending}
								/>
							</div>
							<div className="flex-1 flex flex-col">
								<div className="mb-3 flex-grow">
									<label htmlFor="email" className="text-xl text-emerald-900">Email*</label>
									{this.state.errors.email &&
									<span className="float-end text-xs leading-5 text-red-600 transition-all duration-200 ease-in-out">{this.state.errors.email}</span>
									}
								</div>
								<input
									className="w-full h-10 text-xl box-border border-2 border border-stone-200 p-2 outline-emerald-500 mb-5"
									id="email"
									type="email"
									name="email"
									inputMode="email"
									value={this.state.formData.email}
									onChange={this.handleInputChange}
									disabled={this.state.sending}
								/>
							</div>
						</div>

						<div className="mb-3">
							<label htmlFor="message" className="text-xl text-emerald-900">Message*</label>
							{this.state.errors.message &&
							<span className="float-end text-xs leading-5 text-red-600 transition-all duration-200 ease-in-out">{this.state.errors.message}</span>
							}
						</div>
						<textarea
							className="w-full text-xl box-border border-2 border border-stone-200 p-2 outline-emerald-500 mb-5"
							id="message"
							name="message"
							rows={5}
							value={this.state.formData.message}
							onChange={this.handleInputChange}
							disabled={this.state.sending}
						/>
						<input className="w-[30%] min-w-20 border-2 border-emerald-900 rounded-xl text-xl block mx-auto mb-2 h-12 hover:text-stone-100 hover:bg-emerald-500 hover:border-emerald-500 disabled:text-stone-100 disabled:bg-emerald-500 disabled:border-emerald-500 transition-all duration-200 ease-in-out cursor-pointer disabled:cursor-wait" type="submit" value="Send" disabled={this.state.sending} />
					</form>
				</div>
			</Layout>
		)
	}
}

export default ContactPage