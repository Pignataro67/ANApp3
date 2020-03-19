import React, { Component } from 'react';
import ConfirmRouteContainer from '../containers/ConfirmRouteContainer';
import ResultsContainer from '../containers/ResultsContainer';
import SearchContainer from '../containers/SearchContainer';
import  { Switch, Route } from 'react-router';

export default class Card extends Component {

}

<Switch>
  <Route exact path="/" component={SearchContainer}/>
  <Route exact path="/confirm_route" component={ConfirmRouteContainer}/>
  <Route exact path="/results" component={ResultsContainer}/>
</Switch>

import React from 'react';

const Card = (props) => {
  return <div>{props.children}</div>
}

export default Card;