function _fetchDropdownLocations(input) {
    debugger
    return fetch(`RailsApi/search_locations/${input}`)
    .then(response => response.json())
    .then(locations => locations.predictions)
}

function _getLatLong(location) {
  return 
  fetch(`RailsApi/confirm_route/convert_lat_long/${location}`)
  .then(response => response.json())
  .then(addressInfo => addressInfo.results[0].geometry.location)
}  

function _convertStartLatLong(location) {
  console.log(location)
  return (dispatch) => {
    dispatch({type: 'CONVERTING_START_LAT_LONG'})
    return _getLatLong(location).then(({ lat, lng }) => dispatch({type: 'RETRIEVE_START_LAT_LONG', startLat: lat, startLng: lng}))
  };
}

function _convertDestinationLatLong(location) {
  console.log(location)
  return (dispatch) => {
    dispatch({type: 'CONVERTING_DESTINATION_LAT_LONG'})
    return _getLatLong(location).then(({ lat, lng })=> dispatch({type: 'RETRIEVE_DESTINATION_LAT_LONG', destinationLat: lat, destinationLng: lng }))
  };
}

export function fetchStartingLocation(input) {
  console.log(input)
  return (dispatch) => {
    dispatch({ type: 'FETCHING_SUGGESTED_START_LOCATIONS' });
    _fetchDropdownLocations(input).then(suggestedStartingLocations => dispatch({ type: 'DISPLAY_START_LOCATIONS', suggestedStartingLocations }));
  };
}

export function fetchDestination(input) {
  console.log(input)
  return (dispatch) => {
    dispatch({ type: 'FETCHING_SUGGESTED_DESTINATION' });
    _fetchDropdownLocations(input).then(suggestedDestinations => dispatch({ type: 'DISPLAY_DESTINATIONS', suggestedDestinations }));
  };
}

export function convertStartLatLong(location) {
  console.log(location)
  return (dispatch) => {
    dispatch({type: 'CONVERTING_START_LAT_LONG'})
    return
    _getLatLong(location).then(({ lat, lng }) => dispatch({type: 'RETRIEVE_START_LAT_LONG', startLat: lat, startLatLong: lng}));
  };
}

export function convertDestinationLatLong(location) {
  console.log(location)
  return (dispatch) => {
    dispatch({type: 'CONVERTING_DESTINATION_LAT_LONG'})
    return
    _getLatLong(location).then(({ lat, lng }) => dispatch({type: 'RETRIEVE_DESTINATION_LAT_LONG', destinationLat: lat, destinationLong: lng}));
  };
}

export function convertLatLong(startLocation, destinationLocation) {
  return async (dispatch) => {
    await dispatch(_convertStartLatLong(startLocation))
    await dispatch(_convertDestinationLatLong(destinationLocation))
    debugger
  };
}

export function fetchUberEstimate(startLat, startLng, destinationLat, destinationLng) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_UBER_ESTIMATE' });
    fetch(`/RailsApi/uber?startLat=${startLat}&startLng=${startLng}&destinationLat=${destinationLat}&destinationLng=${destinationLng}`)
    .then(response => response.json())  
    .then(data => dispatch({ type: 'ADD_UBER_ESTIMATES_TO_STATE', estimates: data.prices }))
  };
}

export function fetchLyftEstimate(startLat, startLng, destinationLat, destinationLng) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_LYFT_ESTIMATE' });
    fetch(`/RailsApi/lyft?startLat=${startLat}&startLng=${startLng}&destinationLat=${destinationLat}&destinationLng=${destinationLng}`)
    .then(response => response.json())
    .then(data => dispatch({ type: 'ADD_LYFT_ESTIMATES_TO_STATE', estimates: data.cost_estimates })) 
  };
}  

export function getMapboxKey(){
  return (dispatch) => {
    dispatch({ type: 'FETCHING_MAPBOX_KEY' });
    fetch("/RailsApi/confirm_route/mapbox")
    .then(response => response.text())
    .then(key => dispatch({ type: 'ADD_MAPBOX_KEY_TO_STATE', key }));
  };
}