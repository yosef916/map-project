import React, { Component } from 'react'
import './App.css'

class MapContainer extends Component {

	state = {
		markers: []
	}

	//https://www.npmjs.com/package/fetch-google-maps
	fetchGoogleMaps() {
		console.log(this)
		let mapComponent = this
		console.log(mapComponent.populateInfoWindow())

		const google = window.google
		const fetchGoogleMaps = require('fetch-google-maps')
	 	//MAP DISPLAY
		fetchGoogleMaps({
		  apiKey: "AIzaSyBvH98tHuyefd1LNBuCsSmhTOmFfwgEvFk",
		  language: 'en',
		  libraries: ['geometry']
		})

		function (Maps) {
    	var map = new Maps.Map(document.getElementById('map'), {
		      zoom: 14,
		      center: new Maps.LatLng(40.7281777, -73.984377),
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
 			//DRAW MARKERS
   		this.props.locations.map((locate) => {
	   		var position = locate.location
		    var title = locate.title
		    var marker = new window.google.maps.Marker({
		      position: position,
		      map: map,
		      title: title
	    	}) 

	    	this.state.markers.push(marker)

				var largeInfowindow = new window.google.maps.InfoWindow()
				var populate = this.populateInfoWindow()
	    	marker.addListener('click', function() {
          mapComponent.populateInfoWindow(mapComponent, largeInfowindow, map)
        })
   		})
		}
	}

  populateInfoWindow(marker, infowindow, map) {
  	// console.log(marker, infowindow, map)
    //Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker
      infowindow.setContent('<div>' + marker.title + '</div>')
      infowindow.open(map, marker)
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.setMarker = null;
      })
    }
  }

  infowindow() {
		content: {this.props.locations.title}
  } 

	initMap() {
		this.fetchGoogleMaps()
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