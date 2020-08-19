import React, { Component } from 'react';
import axios from 'axios';
import ReCaptcha from 'react-google-recaptcha';

const jingle = new Audio(`${process.env.PUBLIC_URL}/audio/Burning-Questions.mp3`);

export default class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				Name: '',
				Email: '',
				Subject: '',
				Query: '',
			},
			validInput: [true, true, true, true],
			submit: false,
		};
		this.recaptcha = React.createRef();
	}

	startJingle = () => {
		if (!jingle.playing) {
			jingle.loop = true;
			try {
				jingle.play();
			} catch (error) {
				console.log('Some features of this website are not available on your device...');
			}
		}
	};

	clickColor = (i) => {
		let validInput = this.state.validInput;
		validInput[i] = true;
		this.setState({
			validInput,
		});
	};

	updateForm = (e) => {
		let form = this.state.form;
		form[e.target.name] = e.target.value;
		this.setState({
			form,
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const verifyEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let validInput = [];
		for (let [key, value] of Object.entries(this.state.form)) {
			key === 'Email' ? validInput.push(verifyEmail.test(value)) : validInput.push(value !== '');
		}

		this.setState(
			{
				validInput,
				submit: validInput.indexOf(false) === -1 && this.recaptcha.current.getValue(),
			},
			() => {
				if (this.state.submit) {
					axios
						.post('http://woof-dwight.uk:420/api/nodemailer', {
							name: this.state.form.Name,
							email: this.state.form.Email,
							subject: this.state.form.Subject,
							query: this.state.form.Query,
						})
						.then((res) => {
							if (res.data.msg === 'success') {
								this.props.onSubmit();
								this.recaptcha.current.reset();
								this.setState({
									form: {
										Name: '',
										Email: '',
										Subject: '',
										Query: '',
									},
									submit: false,
								});
							} else if (res.data.msg === 'fail') {
								this.setState(
									{
										submit: false,
									},
									() => alert('Query failed to send.')
								);
							}
						});
				}
			}
		);
	};

	render() {
		return (
			<form className='theform' onClick={() => this.startJingle()}>
				{['Name', 'Email', 'Subject'].map((title, i) => (
					<React.Fragment key={title}>
						<h5>{`${title}:`}</h5>
						<input
							name={title}
							placeholder={title}
							aria-label={`${title} text field`}
							type={title === 'Email' ? 'email' : 'text'}
							value={this.state.form[title]}
							onClick={() => this.clickColor(i)}
							onChange={(e) => this.updateForm(e)}
							style={{
								background: this.state.validInput[i] ? 'white' : 'palevioletred',
							}}
						/>
					</React.Fragment>
				))}
				<h5>Query:</h5>
				<textarea
					name='Query'
					placeholder='Query'
					aria-label={'query text field'}
					type='text'
					value={this.state.form.Query}
					onClick={() => this.clickColor(3)}
					onChange={(e) => this.updateForm(e)}
					style={{ background: this.state.validInput[3] ? 'white' : 'palevioletred' }}
				/>
				<ReCaptcha ref={this.recaptcha} sitekey='6LdLLu4UAAAAABHSeQbk2dUtCi-mpCbfeE-Q6hBi' />
				<button
					onClick={(e) => this.onSubmit(e)}
					style={{ display: !this.state.submit ? 'block' : 'none' }}
				>
					Submit
				</button>
				<img
					alt='loading...'
					src={`${process.env.PUBLIC_URL}/images/spinner.gif`}
					style={{ display: this.state.submit ? 'block' : 'none' }}
				/>
			</form>
		);
	}
}
