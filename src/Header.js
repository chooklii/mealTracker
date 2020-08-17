import React from 'react';
import {Link} from "react-router-dom"

class Header extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			activeMenuIndex: 1,
			time: 5,
			mobileMenu: false

		}
	}
	changeMenu(){
		const currentState = this.state.mobileMenu
		if(currentState){
			this.setState({
				mobileMenu: false
			})
			document.getElementsByTagName("body")[0].style.marginLeft = "0px"
		}else{
			this.setState({
				mobileMenu: true
			})
			document.getElementsByTagName("body")[0].style.marginLeft = "256px"
		}
	}

render() {
    return (
        <div>
            <div id="header">
			<div id="nav-wrapper">
			{/*Not displayed on mobile*/}
				<nav id="nav">
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/allMeal">Alle anzeigen</Link></li>
						<li><Link to="/recommend">Empfehlung</Link></li>
						<li><Link to="/addMeal">Essen hinzufügen</Link></li>
					</ul>
				</nav>
			</div>
				<div id="logo">
				</div>
			</div>
			{/*Mobile Menu*/}
				<div id="mobileMenuWrapper">
					<span id="mobilMenuSpan" onClick={() => this.changeMenu()}>
					<div id="mobileMenuIcon"></div>
					</span>

					<h1 id="MobileHeading">MealTracker</h1>
				</div>
				{this.state.mobileMenu &&

				<div id="mobileMenu">
					<ul>
						<li className="mobileMenuPoint" onClick={() => this.changeMenu()}><Link className="mobileMenuLink" to="/">Home</Link></li>
						<li className="mobileMenuPoint" onClick={() => this.changeMenu()}><Link className="mobileMenuLink" to="/allMeal">Alle Essen</Link></li>
						<li className="mobileMenuPoint" onClick={() => this.changeMenu()}><Link className="mobileMenuLink" to="/recommend">Empfehlung</Link></li>
						<li className="mobileMenuPoint" onClick={() => this.changeMenu()}><Link className="mobileMenuLink" to="/addMeal">Essen hinzufügen</Link></li>
					</ul>
				</div>

				}
		</div>
    )
}
}
export default Header;
