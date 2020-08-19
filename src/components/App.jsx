import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import '../css/style.scss';
import Header from './header';
import TermsAndCond from './terms-and-conditions';
import Form from './form';

export default class App extends Component {
	state = {
		landing: true,
		tac: false,
	};

	render() {
		console.log(document.getElementsByID(body).style);
		return (
			<React.Fragment>
				<Route path='/' exact>
					<main>
						<div className='landing' style={{ display: this.state.landing ? 'block' : 'none' }}>
							<Header />
							<Form onSubmit={() => this.setState({ landing: false, tac: false })} />
							<TermsAndCond
								display={this.state.tac}
								onClick={() => this.setState({ tac: !this.state.tac })}
							/>
						</div>
						<div className='outro' style={{ display: !this.state.landing ? 'block' : 'none' }}>
							<p>Donate now for a faster response time!</p>
							<form
								action='https://www.paypal.com/cgi-bin/webscr'
								method='post'
								target='_blank'
							>
								<input type='hidden' name='cmd' value='_donations' />
								<input type='hidden' name='business' value='simonwoof@live.co.uk' />
								<input type='hidden' name='item_name' value="Sim's Holistic Consultancy" />
								<input type='hidden' name='currency_code' value='GBP' />
								<input
									type='image'
									src='https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif'
									border='0'
									name='submit'
									title='PayPal - The safer, easier way to pay online!'
									alt='Donate with PayPal button'
								/>
							</form>
							<button onClick={() => this.setState({ landing: true, captcha: false })}>
								Ask again?
							</button>
							<img src={`${process.env.PUBLIC_URL}/images/sim.png`} alt='<3 sim <3' />
						</div>
					</main>
				</Route>
				<Route path='/' render={() => <Redirect to='/' />} />
			</React.Fragment>
		);
	}
}
