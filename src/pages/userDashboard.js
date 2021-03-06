import React from 'react';
import {urlAPI} from "../Constants";
import {Link} from 'react-router-dom';
import 'bulma/css/bulma.css';
import UD from "../UserDashboard.jpg";
 
class UserDashboard extends React.Component {
	constructor(props){
		super(props);
		this.state = {userID: "", tryoutList: [], tryoutIDs: []};
		const getListUrl = urlAPI + "listTryouts/?userID=" + this.props.userID;
        fetch(getListUrl)
			.then(
				res =>
					res.json()
			)
			.then(
				(result) => {
					this.setState({tryoutList: result.tryoutNames})
					this.setState({tryoutIDs: result.tryoutIDs})
				},
				(error) => {
					return <>Error with API call: {getListUrl}</>;
				}
			);
	}

	setTryoutID = (event) => {
		localStorage.setItem('currentTryoutID', event.target.id);
		localStorage.setItem('currentTryoutName', event.target.name);
	};

	render(){
		return (
			<div>
				<section className="section"  style={{backgroundColor:"black"}}>
					<div className="container is-vcentered">
						<p className="is-size-1">Hey {this.props.userFirstName}! Welcome back to DreamTeam!</p>
					</div>
				</section>
				<section className="section" style={{backgroundColor:"black"}}>
					<div className="container">
						<div className="columns">
							<div class="column is-8">
								<img src={UD} className="App-logo" alt="logo"/>
							</div>
							{/*<div className="column">*/}
							{/*	<div class="notification" style={{backgroundColor:"black"}}>*/}
							{/*		<h class="is-size-3">Upcoming Sessions</h>*/}
							{/*		<p className="is-size-5">*/}
							{/*			You have no Upcoming Sessions*/}
							{/*		</p>*/}
							{/*	</div>*/}
							{/*</div>*/}
							<div className="column">
								<div className="notification" style={{backgroundColor:"black"}}>
									<h class="is-size-3">Active Tryouts</h>
									<p class="is-size-5">
										{this.state.tryoutList.length > 0 ?
											<>
												{this.state.tryoutList.map(( tryout ) => <li key={this.state.tryoutIDs[this.state.tryoutList.indexOf(tryout)]}><Link to={'/TryoutDashboard'} id={this.state.tryoutIDs[this.state.tryoutList.indexOf(tryout)]} name={tryout} onClick={this.setTryoutID}>{tryout}</Link></li>)}
											</>
											:
											<>
											{"You have no Active Tryouts, create one "}
												<a href="/CreateATryout">
													here
												</a>
											</>
										}
									</p>
								</div>
							</div>
							{/*<div className="column">*/}
							{/*	<div className="notification" style={{backgroundColor:"black"}}>*/}
							{/*		<p class="is-size-3">Closed Tryouts</p>*/}
							{/*		<p className="is-size-5">*/}
							{/*			You have no closed Tryouts*/}
							{/*		</p>*/}
							{/*	</div>*/}
							{/*</div>*/}
						</div>
					</div>
				</section>
			</div>
		);
	}
}
 
export {UserDashboard};