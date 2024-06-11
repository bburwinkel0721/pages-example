let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;

var map = L.map('map-id').setView(newYorkCoords, mapZoomLevel);

const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json'


d3.json(url).then(jsonData =>{
  // get the data for the station
  const stationArray = jsonData.data.stations

  // for (station of stationArray){
  //   var marker = L.marker([station.lat, station.lon])
  //   marker.bindPopup(`<b>${station.name}</b><br>${station.capacity}`)
  //   marker.addTo(map);
  // }
  const markerArray = stationArray.map(station =>{
    return L.marker([station.lat, station.lon])
    .bindPopup(`<b>${station.name}</b><br>${station.capacity}`)
  })
  var stationMarkerLayer = L.layerGroup(markerArray);
  stationMarkerLayer.addTo(map)
  
  var baseMaps = {
    "OpenStreetMap": tileLayer
  };

  var overlayMaps = {
      "Bike Stations": stationMarkerLayer
  };
  var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
})
