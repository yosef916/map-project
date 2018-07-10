import React, { Component } from 'react'
import './App.css'

class MapContainer extends Component {
	render() {
  	return (
  		<div className="w3-container" role="application" aria-label="select your location from the map">
				<div id="map" >
					{this.props.map}
				</div>
			</div>
		)
	}
}

export default MapContainer