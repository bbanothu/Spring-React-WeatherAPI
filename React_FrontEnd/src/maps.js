import React, { useState, Component } from 'react';
import { Map, Marker , GoogleApiWrapper } from 'google-maps-react';
import './App.css';
import {apiKey} from './key'
const mapStyles = {
  width: '41%',
  height: '40%',
  marginTop: 10
};

export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google}
    style={{width: '100%', height: '100%', position: 'relative'}}
    className={'map'}
    zoom={14}
    style={mapStyles}
    initialCenter={{
      lat: parseInt(this.props.latitude),
      lng: parseInt(this.props.longitude)
    }}
    >

  <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'SOMA'}
    position={{lat: parseInt(this.props.latitude), lng: parseInt(this.props.longitude)}} />
</Map>
//       <div>
//         <Map
//           google={this.props.google}
//           zoom={14}

//           style={mapStyles}
          
          // initialCenter={{
          //   lat: parseInt(this.props.latitude),
          //   lng: parseInt(this.props.longitude)
          // }}
//         />

// <Marker
//     position={{lat: parseInt(this.props.latitude), lng: parseInt(this.props.longitude)}} />
//       </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer);

