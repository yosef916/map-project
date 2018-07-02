import React, { Component } from 'react'
import './App.css'

class Menu extends Component {

	w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
  }
  w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
  }

	render() {
  	return (
	  	<div>	
	  		<div className="w3-sidebar w3-bar-block w3-card w3-animate-left" id="mySidebar">
				  <button className="w3-bar-item w3-button w3-large"
				  onClick={this.w3_close}>Close &times;</button>
				  <ul>
						<li>1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
						<li>6</li>
				  </ul>
				</div>

				<div id="main"></div>

				<div className="w3-teal">
				  <button id="openNav" className="w3-button w3-teal w3-xlarge" onClick={this.w3_open}>&#9776;</button>
				</div>
			</div>
		)
	}
}

export default Menu