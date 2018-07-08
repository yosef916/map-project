import React, { Component } from 'react'
import {DebounceInput} from 'react-debounce-input'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import './App.css'

class Menu extends Component {

	//https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_sidebar_shift
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

  state= {
  	query: ''
  }

  updateQuery = (query) => {
  	this.setState({ query: query })
  }

	render() {
    const map=this.props.map
    const query = this.state.query
    let showingLocation
    
    //when the user types the name of a location the menu will filter the locations
    if(query) {
    	const match = new RegExp(escapeRegExp(query), 'i')
    	// console.log(match)
    	showingLocation = this.props.locations.filter((location) => match.test(location.title))
    	// console.log(showingLocation)
    } else {
    	showingLocation = this.props.locations
    }

  	return (
	  	<div>	
	  		<div className="w3-sidebar w3-bar-block w3-card w3-animate-left" id="mySidebar">
				  <button 
				  	className="w3-bar-item w3-button w3-large"
				  	onClick={this.w3_close}
			  	>Close &times;</button>
			  	<DebounceInput 
            type='text'
            placeholder='Search for location'
            value={this.state.query}
            onChange={event => this.updateQuery(event.target.value)}
        	/>
				  <ul>
				  	{showingLocation.map((location, i) => (
							<li key={i} onClick={() => this.props.locationItemClicked(location)}>{location.title}</li>
				  	))}
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