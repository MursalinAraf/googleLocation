import React from 'react';
import './App.css';
import {InfoWindow,withScriptjs,withGoogleMap,GoogleMap,Marker} from "react-google-maps";



class App extends React.Component{
  constructor(){
    super();
    this.state = {
      lat : 0,
      long : 0,
      isHidden : true,
      name : 'Syed Mursalin Rahman'
    }
  }

 // getting current position and saving it to the state
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
          lat : position.coords.latitude,
          long : position.coords.longitude
      })
    });
  }

  //toggling the marker 
   markerToggle = () => {
    this.setState({
      isHidden : !this.state.isHidden
    })
  }

//Saving Data Into console 
      saveToConsole = (e) => {
        e.preventDefault();
        console.log(`Hello this is ${this.state.name}. Your Latitude Is ${this.state.lat} and 
        Longitude Is ${this.state.long}`)
      }


  render(){
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: this.state.lat, lng: this.state.long }}
      >
        <Marker
          draggable = {true}
          position={{ lat:  this.state.lat, lng:  this.state.long }}
          onClick = {this.markerToggle}
        >
          {
            this.state.isHidden ? null : <InfoWindow >
            <div>
              <label>Latitude</label>
              <input type="text" value={this.state.lat} name = "lat"/>
              <br />
              <label>Longitude</label>
              <input type="text"  value={this.state.long} name = "long"  />
              <h4>
                Latitude Is : {this.state.lat}
              </h4>
              <h4>
                Longitude Is : {this.state.long}
              </h4>
              <h4>Developed By : Syed Mursalin Rahman</h4>
              <button className="btnConsole" onClick={this.saveToConsole}>Send To Console</button>
            </div>
          </InfoWindow>
          }
        </Marker>
      </GoogleMap>
    ));

    return (
      <div>
   <MapWithAMarker
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJ5I8PrB4rZqn6zpqToU84kR_ISNZ8GGA&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `160%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `160%` }} />}
/>
</div>

    );
  }

}

// AIzaSyCJ5I8PrB4rZqn6zpqToU84kR_ISNZ8GGA -> This is the API KEY i have used for accessing 
export default App;
