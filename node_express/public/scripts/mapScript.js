const map = L.map('map').setView([-26.2041, 28.0473], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Markers for the location of devices
const device1Pointer = L.marker([-26.2041, 28.0473]).addTo(map);
device1Pointer.bindPopup('Device 1').openPopup();