import React, { Component } from 'react'
import './App.css'

class Map extends Component {
	initMap() {
		var map
		
	  map = new google.maps.Map(document.getElementById('map'), {
	      center: {lat: -34.397, lng: 150.644},
	      zoom: 13
    });
	}

	render() {
  	return (
  		<div className="w3-container">
				<div id="map"></div>

			</div>
		)
	}
}

export default Map