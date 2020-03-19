import React, { Component } from 'react';
import Button from '../Button';
import RouteMap from './RouteMap';

class ConfirmRoute extends Component{
  render(){
    return(
      <div>
        <RouteMap mapboxKey={this.props.mapboxKey} startLngLat={this.props.startLngLat} destinationLngLat={this.props.destinationLngLat}/>
        <Button /> 
        <Button />
      </div>
    )
  }
}

export default ConfirmRoute;