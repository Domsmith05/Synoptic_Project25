document.addEventListener('DOMContentLoaded', () => 
{
    const map = L.map('map').setView([-26.1931, 28.0710], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Funcvtion to fill the readings table with data from the sql server
    async function fillReadingsTable() 
    {
        const tableBody = document.getElementById('data-table-body');
        if (!tableBody) return;
        try 
        {
            const response = await fetch('/api/latest-readings');
            if (!response.ok) 
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const readings = await response.json();
            tableBody.innerHTML = '';

            readings.forEach(reading => 
            {
                const row = document.createElement('tr');

                const locationCell = document.createElement('td');
                locationCell.textContent = reading.locname;
                row.appendChild(locationCell);

                const timestampCell = document.createElement('td');
                timestampCell.textContent = new Date(reading.readingtime).toLocaleString();
                row.appendChild(timestampCell);

                const pressureCell = document.createElement('td');
                pressureCell.textContent = reading.pressure;
                row.appendChild(pressureCell);
                tableBody.appendChild(row);

                const statusCell = document.createElement('td');
                statusCell.textContent = reading.status;
                row.appendChild(statusCell);
            });

        } 
        catch (error) 
        {
            console.error("Could not fetch or populate readings table:", error);
            tableBody.innerHTML = `<tr><td colspan="3">Error loading data.</td></tr>`;
        }
    }

    fillReadingsTable();

    // Marks out makers valley
    var MakersValleyPolygon = L.polygon([
        [-26.1917, 28.0620], [-26.1905, 28.0625], [-26.1880, 28.0690],
        [-26.1890, 28.0690], [-26.1874, 28.0738], [-26.1948, 28.0769],
        [-26.1955, 28.0750], [-26.1968, 28.0755], [-26.1968, 28.0755],
        [-26.1982, 28.0755], [-26.1983, 28.0748], [-26.2010, 28.0754],
        [-26.2018, 28.0742], [-26.2020, 28.0675], [-26.1999, 28.0654],
        [-26.1982, 28.0677]
    ], { color: 'blue', weight: 1, opacity: 0.8, fillColor: '#00ffff', fillOpacity: 0.15, alt: 'Maker\'s Valley Region' }).addTo(map);
    MakersValleyPolygon.bindPopup('Maker\'s Valley Region');

    // Marks out the extended region
    var ExtensionPolygon = L.polygon([
        [-26.1874, 28.0738], [-26.1948, 28.0769], [-26.1918, 28.0845],
        [-26.1848, 28.0815]
    ], { color: 'orange', weight: 1, opacity: 0.8, fillColor: '#00ffff', fillOpacity: 0.15, alt: 'Extension Region' }).addTo(map);
    ExtensionPolygon.bindPopup('Extension Region');

    // Function to handle marker click events
    async function onMarkerClick(e) {
        const marker = e.target;
        const locationId = marker.db_id;
        const popup = marker.getPopup();
        popup.setContent('Loading...');
        marker.openPopup();

        try 
        {
            const response = await fetch(`/api/reading/${locationId}`);
            
            if (!response.ok) 
            {
                const errorData = await response.json();
                popup.setContent(`Error: ${errorData.error || 'Could not fetch data.'}`);
                return;
            }

            const data = await response.json();
            const popupContent = `
                <b>${data.locname}</b><br>
                Latest Reading: <b>${data.pressure}</b><br>
                Last Updated: ${new Date(data.readingtime).toLocaleString()}<br>
                Status: <b>${data.status}</b><br>
            `;
         
            popup.setContent(popupContent);

        } 
        catch (err) 
        {
            console.error("Error fetching or processing data:", err);
            popup.setContent('Failed to load data. See console for details.');
        }
    }

    // Create markers for each device location
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

// Fetches the page data and populates the map content
document.addEventListener("DOMContentLoaded", function () {
   
   fetch('/pageData', {method: 'POST',
         headers: {"Content-Type": "application/json"},
      body: JSON.stringify({}) 
      })
      .then(response => 
        {
         if (! response.ok) 
        {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         return response.json();
      })

      .then(data => 
        {
         const div = document.getElementsByClassName("map_content")[0]; 
         if (!div) 
        {
            throw new Error("Could not find element with class 'map_content'"); 
         }

         const aboutPage = data.pages.find(pages => pages.name === "Map"); 1
         if (!aboutPage) 
        {
            throw new Error("Could not find Map page data");
         }
            
         const h1 = div.querySelector(".headertext");
         const p1 = div.querySelector(".p1");
         const th1 = div.querySelector(".th1");
         const th2 = div.querySelector(".th2");
         const th3 = div.querySelector(".th3");
         const th4 = div.querySelector(".th4");

         if (!h1 || !p1 || !th1 || !th2 || !th3) 
        {
            throw new Error("Could not find one or more elements with specified classes");
         }

         h1.textContent = aboutPage.content[0];
         p1.textContent = aboutPage.content[1];
         th1.textContent = aboutPage.content[2];
         th2.textContent = aboutPage.content[3];
         th3.textContent = aboutPage.content[4];
         th4.textContent = aboutPage.content[5];
      })
      .catch(error => console.error("Error fetching JSON data:", error));
      


      // Josh's Foo Bars
      
      document.querySelector("#menu").addEventListener('click', () => 
    {
         console.log("Menu icon clicked");
         document.querySelector(".nav_bar").classList.toggle("show_nav");
      });
});

