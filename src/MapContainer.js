import React, { Component } from 'react'
import './App.css'

var locations = [
  {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
  {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
  {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
  {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
  {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
  {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
]

//https://www.npmjs.com/package/fetch-google-maps
class MapContainer extends Component {
	initMap() {
		const google = window.google
		const fetchGoogleMaps = require('fetch-google-maps')
	 
		fetchGoogleMaps({
		  apiKey: "AIzaSyBvH98tHuyefd1LNBuCsSmhTOmFfwgEvFk",
		  language: 'en',
		  libraries: ['geometry']
		}).then(( Maps ) => {
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
				<div id="map"></div>
			</div>
		)
	}
}

export default MapContainer