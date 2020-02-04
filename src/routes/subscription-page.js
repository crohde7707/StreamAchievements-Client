import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import qs from 'query-string';
import connector from '../redux/connector';
import {updateStatus} from '../redux/profile-reducer';
import { PayPalButton } from "react-paypal-button-v2";

import Template from '../components/template';

import './subscription-page.css';

class SubscriptionPage extends React.Component {

	constructor() {
		super();

		this.state = {
			expired: false,
			verified: false,
			fetch: false
		}
	}

	componentDidMount() {
		
	}

	render() {
		let content;

		content = (
			<div>
				<PayPalButton
					vault="true"
        			options={{
        				vault: true,
        				'client-id': 'AadUIUhNKJec8L90fAu3Cp1sbznvzjRq0PWPKrdorjcQk7Oqjk8D7aJQASunDIMbp9iae5CGMZYm32Q6'
        			}}
        			createSubscription={(data, actions) => {
				        return actions.subscription.create({
				            plan_id: 'P-1GX33385AF788601GLX74LHY'
				        });
        			}}
        			onApprove={(data, actions) => {
          				// Capture the funds from the transaction
          				return actions.subscription.get().then(function(details) {
            				// Show a success message to your buyer
            				alert("Subscription completed");
 
            				// OPTIONAL: Call your server to save the subscription
            				return fetch("/paypal-subscription-complete", {
              					method: "post",
              					body: JSON.stringify({
                					orderID: data.orderID,
                					subscriptionID: data.subscriptionID
              					})
            				});
          				});
        			}}
      			/>
			</div>
		);

		return (
			<Template spinner={{isLoading: this.state.fetch, fullscreen: true}}>
				{content}
				<script src="https://www.paypal.com/sdk/js?client-id=AadUIUhNKJec8L90fAu3Cp1sbznvzjRq0PWPKrdorjcQk7Oqjk8D7aJQASunDIMbp9iae5CGMZYm32Q6"></script>
			</Template>
		);
	}
}

function headerMapStateToProps(state) {
	return {
		profile: state.profile
	};
}

export default connector(headerMapStateToProps)(SubscriptionPage);