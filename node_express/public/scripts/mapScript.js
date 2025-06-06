const map = L.map('map').setView([-26.1931, 28.0710], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Borders of the "Maker's Valley" Area
var MakersValleyPolygon = L.polygon([
    [-26.1917, 28.0620],
    [-26.1905, 28.0625],
    [-26.1880, 28.0690],
    [-26.1890, 28.0690],
    [-26.1874, 28.0738],
    [-26.1948, 28.0769],
    [-26.1955, 28.0750],
    [-26.1968, 28.0755],
    [-26.1968, 28.0755],
    [-26.1982, 28.0755],
    [-26.1983, 28.0748],
    [-26.2010, 28.0754],
    [-26.2018, 28.0742],
    [-26.2020, 28.0675],
    [-26.1999, 28.0654],
    [-26.1982, 28.0677]
], {
   color: 'blue',
   weight: 1,
   opacity: 0.8,
   fillColor: '#00ffff',
   fillOpacity: 0.15,
   alt: 'Maker\'s Valley Region'
}).addTo(map);
MakersValleyPolygon.bindPopup('Maker\'s Valley Region')//.openPopup();

// Border of the "Extension" Area
var ExtensionPolygon = L.polygon([
    [-26.1874, 28.0738],
    [-26.1948, 28.0769],
    [-26.1918, 28.0845],
    [-26.1848, 28.0815]
], {
   color: 'orange',
   weight: 1,
   opacity: 0.8,
   fillColor: '#00ffff',
   fillOpacity: 0.15,
   alt: 'Extension Region'
}).addTo(map);
ExtensionPolygon.bindPopup('Extension Region')//.openPopup();

// Testing an attempt to add a panel for displaying the water data - override with your code when you want
var waterInfo = L.control();

waterInfo.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
   }

waterInfo.update = function (props) {
    this._div.innerHTML = '<h4>Water Monitor Information</h4>' +  (props ? 
      props.pressure : 'Click on a water monitor');
}

waterInfo.addTo(map);

// Markers for the location of devices
//Original Location: -26.2041, 28.0473 - changed to be inside Maker's Valley
const device1Pointer = L.marker([-26.1901, 28.0670]).addTo(map);
device1Pointer.bindPopup('Water monitor 1')
device1Pointer.on('click', function(e) {
   //device1Pointer.setContent("Water Data! at " + e.latlng.toString());
   alert("Water Data! at " + e.latlng.toString());
   device1Pointer.openPopup();
});
const device2Pointer = L.marker([-26.2001, 28.0660]).addTo(map);
device2Pointer.bindPopup('Water Monitor 2')//.openPopup();

const device3Pointer = L.marker([-26.1955, 28.0690]).addTo(map);
device3Pointer.bindPopup('Water Monitor 3')//.openPopup();

const device4Pointer = L.marker([-26.1900, 28.0810]).addTo(map);
device4Pointer.bindPopup('Water Monitor 4')//.openPopup();

const device5Pointer = L.marker([-26.1889, 28.0803]).addTo(map);
device5Pointer.bindPopup('Water Monitor 5')//.openPopup();