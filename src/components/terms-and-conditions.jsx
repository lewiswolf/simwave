import React, { Component } from 'react';

export default class TermsAndCond extends Component {
	render() {
		return (
			<div className='tac'>
				<button onClick={this.props.onClick}>{`Terms & Conditions`}</button>
				<div style={{ display: this.props.display ? 'block' : 'none' }} onClick={this.props.onClick}>
					All submissions are responded to in 2-14 working days. Quotes are calculated based on the
					depth and nature of the question provided and, once paid, are non-refundable. Donations
					made prior to the quoting phase of transaction are subtracted from the final quoted price,
					with any overhead being non-refundable. Simon Woof-Dwight is not liable for any actions or
					consequences made on behalf of the engaging party as a result from his consultancy. Simon
					Woof-Dwight retains the right to terminate the consultancy at any point. A termination
					made during the consultancy process will include a full refund for any unanswered
					questions. This clause does not include any previously concluded consultations.
				</div>
			</div>
		);
	}
}
