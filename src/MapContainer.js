import React, { Component } from 'react'
import './App.css'

//https://www.npmjs.com/package/fetch-google-maps
class MapContainer extends Component {
	initMap() {
		const google = window.google
		const fetchGoogleMaps = require('fetch-google-maps')
	 //MAP DISPLAY
		fetchGoogleMaps({
		  apiKey: "AIzaSyBvH98tHuyefd1LNBuCsSmhTOmFfwgEvFk",
		  language: 'en',
		  libraries: ['geometry']
		}).then((Maps) => {
		    const map = new Maps.Map(document.getElementById('map'), {
		      zoom: 8,
		      center: new Maps.LatLng(-34.397, 150.644),
		      styles: [
	          {
	            featureType: 'water',
	            stylers: [
	              { color: '#19a0d8' }
	            ]
	          },{
	            featureType: 'administrative',
	            elementType: 'labels.text.stroke',
	            stylers: [
	              { color: '#ffffff' },
	              { weight: 6 }
	            ]
	          },{
	            featureType: 'administrative',
	            elementType: 'labels.text.fill',
	            stylers: [
	              { color: '#e85113' }
	            ]
	          },{
	            featureType: 'road.highway',
	            elementType: 'geometry.stroke',
	            stylers: [
	              { color: '#efe9e4' },
	              { lightness: -40 }
	            ]
	          },{
	            featureType: 'transit.station',
	            stylers: [
	              { weight: 9 },
	              { hue: '#e85113' }
	            ]
	          },{
	            featureType: 'road.highway',
	            elementType: 'labels.icon',
	            stylers: [
	              { visibility: 'off' }
	            ]
	          },{
	            featureType: 'water',
	            elementType: 'labels.text.stroke',
	            stylers: [
	              { lightness: 100 }
	            ]
	          },{
	            featureType: 'water',
	            elementType: 'labels.text.fill',
	            stylers: [
	              { lightness: -100 }
	            ]
	          },{
	            featureType: 'poi',
	            elementType: 'geometry',
	            stylers: [
	              { visibility: 'on' },
	              { color: '#f0e4d3' }
	            ]
	          },{
	            featureType: 'road.highway',
	            elementType: 'geometry.fill',
	            stylers: [
	              { color: '#efe9e4' },
	              { lightness: -25 }
	            ]
	          }
	        ]
		  	})
			})
	}

	render() {
  	return (
  		<div className="w3-container">
				<div id="map">
					{this.initMap()}
				</div>
			</div>
		)
	}
}

export default MapContainer