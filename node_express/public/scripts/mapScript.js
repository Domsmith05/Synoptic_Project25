document.addEventListener('DOMContentLoaded', () => {

    const map = L.map('map').setView([-26.1931, 28.0710], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var MakersValleyPolygon = L.polygon([
        [-26.1917, 28.0620], [-26.1905, 28.0625], [-26.1880, 28.0690],
        [-26.1890, 28.0690], [-26.1874, 28.0738], [-26.1948, 28.0769],
        [-26.1955, 28.0750], [-26.1968, 28.0755], [-26.1968, 28.0755],
        [-26.1982, 28.0755], [-26.1983, 28.0748], [-26.2010, 28.0754],
        [-26.2018, 28.0742], [-26.2020, 28.0675], [-26.1999, 28.0654],
        [-26.1982, 28.0677]
    ], { color: 'blue', weight: 1, opacity: 0.8, fillColor: '#00ffff', fillOpacity: 0.15, alt: 'Maker\'s Valley Region' }).addTo(map);
    MakersValleyPolygon.bindPopup('Maker\'s Valley Region');

    var ExtensionPolygon = L.polygon([
        [-26.1874, 28.0738], [-26.1948, 28.0769], [-26.1918, 28.0845],
        [-26.1848, 28.0815]
    ], { color: 'orange', weight: 1, opacity: 0.8, fillColor: '#00ffff', fillOpacity: 0.15, alt: 'Extension Region' }).addTo(map);
    ExtensionPolygon.bindPopup('Extension Region');

    async function onMarkerClick(e) {
        const marker = e.target;
        const locationId = marker.db_id;
        const popup = marker.getPopup();
        popup.setContent('Loading...');
        marker.openPopup();

        try {
            const response = await fetch(`/api/reading/${locationId}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                popup.setContent(`Error: ${errorData.error || 'Could not fetch data.'}`);
                return;
            }

            const data = await response.json();
            const popupContent = `
                <b>${data.locname}</b><br>
                Latest Reading: <b>${data.pressure}</b><br>
                Last Updated: ${new Date(data.readingtime).toLocaleString()}
            `;
         
            popup.setContent(popupContent);

        } catch (err) {
            console.error("Error fetching or processing data:", err);
            popup.setContent('Failed to load data. See console for details.');
        }
    }

    const device1Pointer = L.marker([-26.1901, 28.0670]).addTo(map).bindPopup("");
    device1Pointer.db_id = 'Location 1';
    device1Pointer.on('click', onMarkerClick); 

    const device2Pointer = L.marker([-26.2001, 28.0660]).addTo(map).bindPopup("");
    device2Pointer.db_id = 'Location 2';
    device2Pointer.on('click', onMarkerClick);

    const device3Pointer = L.marker([-26.1955, 28.0690]).addTo(map).bindPopup("");
    device3Pointer.db_id = 'Location 3';
    device3Pointer.on('click', onMarkerClick);

    const device4Pointer = L.marker([-26.1945, 28.0758]).addTo(map).bindPopup("");
    device4Pointer.db_id = 'Location 4';
    device4Pointer.on('click', onMarkerClick);

    const device5Pointer = L.marker([-26.1900, 28.0810]).addTo(map).bindPopup("");
    device5Pointer.db_id = 'Location 5';
    device5Pointer.on('click', onMarkerClick);

    const device6Pointer = L.marker([-26.1889, 28.0803]).addTo(map).bindPopup("");
    device6Pointer.db_id = 'Location 6';
    device6Pointer.on('click', onMarkerClick);
});

/*
document.addEventListener("DOMContentLoaded", function () {
   fetch('/pageData', {method: 'POST',
         headers: {"Content-Type": "application/json"},
      body: JSON.stringify({}) // Empty object as body
      })
      .then(response => {
         if (! response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         return response.json();
      })
      .then(data => {
         const div = document.getElementsByClassName("about_content")[0]; !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         if (!div) {
            throw new Error("Could not find element with class 'about_content'"); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         }

         const aboutPage = data.pages.find(pages => pages.name === "About Us"); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
         if (!aboutPage) {
            throw new Error("Could not find About page data"); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         }
            
         !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         aboutPage.content.forEach(text => {
         const p = document.createElement("p");
         p.textContent = text;
         div.appendChild(p);
         });
      })
      .catch(error => console.error("Error fetching JSON data:", error));

      // Josh's Foo Bars
      
      document.querySelector("#menu").addEventListener('click', () => {
         console.log("Menu icon clicked");
         document.querySelector(".nav_bar").classList.toggle("show_nav");
      });
});
*/
