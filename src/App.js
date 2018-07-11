import React, { Component } from 'react'
import Menu from './Menu'
import MapContainer from './MapContainer'
import './App.css'

var largeInfowindow
var markers = []
var appComponent

class App extends Component {
  state = {
    locations: [
      {title: 'Park Ave Penthouse',location: {lat: 40.7713024, lng: -73.9632393},venue: '4da74283fa8ca9942859f0ed'},
      {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}, venue: '4e3b11853151eaa7c4399f41'},
      {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}, venue: '4e5cd74eb99390f45c02672d'},
      {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}, venue: '4b720ca7f964a5201d6c2de3'},
      {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}, venue: '4bbb9dbded7776b0e1ad3e51'},
      {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}, venue: '4f52680fe4b0639bb9363366'}
    ],
    map: {},
    locationInfo: {}
  }

  //for any authentication error
  gm_authFailure(){
    window.alert("error");
  }
  componentDidMount() { 
    // console.log(this)
    appComponent = this
    window.gm_authFailure = this.gm_authFailure
    const fetchGoogleMaps = require('fetch-google-maps');
    //fetch google maps api and create a new map
    fetchGoogleMaps({
      apiKey: 'AIzaSyBvH98tHuyefd1LNBuCsSmhTOmFfwgEvFk',
      language: 'en',
      libraries: ['geometry']
    }).then(( maps ) => {
      const map = new maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: new maps.LatLng(40.7281777, -73.984377),
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

      this.state.locations.map ((location) => {
        if (window.google !== undefined) {
          // console.log(window.google)
          largeInfowindow = new window.google.maps.InfoWindow()

          var marker = new window.google.maps.Marker({
            map: map,
            draggable: true,
            animation: window.google.maps.Animation.DROP,
            position: location.location,
            title: location.title
          })
          // console.log(markers)
          markers.push(marker)
          
          marker.addListener('click', function() {
            // console.log(mapComponent)
            appComponent.foursquare(location)
            style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU
            // appComponent.populateInfoWindow(marker, map)
            // toggleBounce
          })
        }
      })


      appComponent.setState({ map: map })
      appComponent.initMap()
    }).catch(error => { alert(error) })
  }

  initMap() {
    // const map = this.state.map
    // console.log(window.google)

    //DRAW MARKERS
    // this.state.locations.map((locate) => {
    //   return this.locationClick(locate, this.state.map)
    // })
  }

  //WHEN THE USER CLICKS THE MARKER, THE INFOWINDOW WILL APPEAR
  // locationClick (location, mapObj) {
  //   const map = mapObj
  //   var position = location.location
  //   var title = location.title
  // }
  
  //WHEN THE USER CLICKS THE LOCATION FROM HAMBURGER MENU IT WILL REFER TO THE MARKER OF THAT LOCATION AND SHOW ITS INFOWINDOW
  locationItemClicked (location) {
    // console.log(location)
    // let clickedItem = markers.filter((marker) => marker.title === location.title)
    // console.log(clickedItem)
    appComponent.foursquare(location)
    // appComponent.populateInfoWindow(clickedItem[0])
    // console.log(clickedItem[0])
  }

  //Check to make sure the infowindow is not already opened on this marker
  populateInfoWindow(marker, map) {
    // console.log(marker, infowindow, map)
    if (largeInfowindow.marker !== marker) {
      largeInfowindow.marker = marker
      let locationInfoVar = this.state.locationInfo
      let content
      if (locationInfoVar) {
        // console.log(locationInfoVar)
        { locationInfoVar.bestPhoto ?
          content = '<div>' + marker.title + '</div>' + '<img style="width: 100px; height: 100px" src=' + locationInfoVar.bestPhoto.prefix + '300x300' + locationInfoVar.bestPhoto.suffix + ' alt=' + locationInfoVar.name + '/>'
          : 
          content = '<div>' + marker.title + '</div>' + '<b>Image is not available !</b>'
        }
        largeInfowindow.setContent(content)
      } else {
        largeInfowindow.setContent('<div>' + marker.title + '</div>')
      }
      largeInfowindow.open(map, marker)
      // Make sure the marker property is cleared if the largeInfowindow is closed.
      largeInfowindow.addListener('closeclick', function() {
        largeInfowindow.setMarker = null;
      })
    }
  }

  //https://github.com/HadeerFawzy/Neighborhood-Map/blob/master/neighberhood-map/src/MapComponent.js#L126
  //https://foursquare.com/developers/apps
  foursquare(marker) {
    // console.log(marker)

    var clientId='LTM5KBEOMK2WPX1NDJ4FWXNUH2WPY5CFK35YZWPIKN5PZYQH'
    var clientSecret='OZCXYGWJNOHLZVV15XE23I4XB1KMFTNS4QGBEHU1WSQ1NW4C'

    var url = 'https://api.foursquare.com/v2/venues/' + marker.venue + '?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20180711'

    fetch(url)
    .then(response => response.json())
    .then( (result) => {
        // console.log(result)
        // this.setState({
        //   locationInfo: result.response.venue
        // })
        let clickedItem = markers.filter((markerSaved) => markerSaved.title === marker.title)
        // console.log(clickedItem[0])
        this.populateInfoWindow(clickedItem[0])

        // console.log(this.state.locationInfo)
        this.setState({
          isLoaded: true,
          items: result.items
        })
      }).catch(
        (error => {this.setState({ isLoaded: true, error }) })
      )
  } 

  render() {
    return (
      <div className="App">
        <Menu 
          locations= {this.state.locations} 
          map={this.state.map} 
          locationItemClicked={this.locationItemClicked} 
        />
        <MapContainer 
          locations= {this.state.locations}
          map={this.initMap()}
        />
      </div>
    )
  }
}

export default App