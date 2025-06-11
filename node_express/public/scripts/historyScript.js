
document.addEventListener("DOMContentLoaded", function () 
{
   // Dynamically loads the page data from JSON
   fetch('/pageData', {method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({}) 
   })
   .then(response => {
      if (! response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
   })

   .then(data => {
      const div = document.querySelector("main"); 
      if (!div) {
         throw new Error("Could not find main element"); 
      }

      const historyPage = data.pages.find(pages => pages.name === "History"); 1
      if (!historyPage) {
         throw new Error("Could not find History page data");
      }

      // Creates table to display readings
         
      const h1 = div.querySelector(".history_page_title");
      const p1 = div.querySelector(".p1");
      const th1 = div.querySelector(".th1");
      const th2 = div.querySelector(".th2");
      const th3 = div.querySelector(".th3");
      const th4 = div.querySelector(".th4");
      const p2 = div.querySelector(".p2");

      if (!h1 || !p1 || !th1 || !th2 || !th3) {
         throw new Error("Could not find one or more elements with specified classes");
      }

      h1.textContent = historyPage.content[0];
      p1.textContent = historyPage.content[1];
      th1.textContent = historyPage.content[2];
      th2.textContent = historyPage.content[3];
      th3.textContent = historyPage.content[4];
      th4.textContent = historyPage.content[5];
      p2.textContent = historyPage.content[6];
   })
   .catch(error => console.error("Error fetching JSON data:", error));

   document.querySelector("#menu").addEventListener('click', () => {
      console.log("Menu icon clicked");
      document.querySelector(".nav_bar").classList.toggle("show_nav");
   });

   // Function to fill the readings table with data from the sql server
   async function fillReadingsTable() {
    const tableBody = document.getElementById('data-table-body');
    if (!tableBody) return;

    try 
    {
        const response = await fetch('/api/all-readings');
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

            const statusCell = document.createElement('td');
            statusCell.textContent = reading.status;
            row.appendChild(statusCell);

            tableBody.appendChild(row);
        });

    } 
    catch (error) 
    {
        console.error("Could not fetch or populate readings table:", error);
        tableBody.innerHTML = `<tr><td colspan="3">Error loading data.</td></tr>`;
    }
}
   fillReadingsTable();
});