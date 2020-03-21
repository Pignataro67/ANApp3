function _fetchLocation(input) {
    debugger
    return fetch(`/search_start/${input}`)
    .then(response => response.json())
    .then(locations => locations.predictions)
  }

function _getLatLong(location) {
  return new Promise((resolve, reject) => {
    geocoder.geocode(location,  (err, data) => {
      try {
        if (err || !data.results || !data.results.length || !data.results[0].geometry) {
          console.log(data);
          if (data && data.status === 'OVER_QUERY_LIMIT') {
            reject('OVER_QUERY_LIMIT');
          }
          return resolve(false);
        } 
        return resolve(data.results[0].geometry.location);
      } catch(e) {
        return resolve(false);
      }
    });
  })
}  

export function fetchStartingLocation(input) {
  console.log(input)
  return (dispatch) => {
    dispatch({ type: 'FETCHING_SUGGESTED_START_LOCATIONS' });
    _fetchLocation(input).then(suggestedStartingLocations => dispatch({ type: 'DISPLAY_START_LOCATIONS', suggestedStartingLocations }));
  };
}

export function fetchDestination(input) {
  console.log(input)
    return (dispatch) => {
      dispatch({ type: 'FETCHING_SUGGESTED_DESTINATION' });
      _fetchLocation(input).then(suggestedDestinations => dispatch({ type: 'DISPLAY_DESTINATIONS', suggestedDestinations }));
    };
}