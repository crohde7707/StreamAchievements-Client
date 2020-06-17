import React from 'react';
import {Link} from 'react-router-dom';
import Footer from '../components/footer';
import TermsContent from '../components/terms-content';

import './terms-of-use-page.css';

export default class LegalTermsPage extends React.Component {

	render() {

		return (
			<div className="legal-page">
				<div className="section-wrapper header">
					<div className="section-content">
						<Link to="/home"><img alt="StreamAchievements Logo" className="logo" src={require('../img/logo.png')} /></Link>
					</div>
				</div>
				<div className="section-wrapper content">
					<div className="section-content title">
						<h1>TERMS OF USE</h1>
						<h4>Last updated November 18, 2019</h4>
 					</div>
 					<div className="section-content bubble">
 						<TermsContent />
 					</div>
				</div>
				<Footer />
			</div>
		);
	}
}