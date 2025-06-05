document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const dataDisplay = document.getElementById("dataDisplay");

            // Create HTML elements to display the JSON data
            const nameElement = document.createElement(".p1");
            nameElement.textContent = "Name: " + data.name;

            const ageElement = document.querySelector(".p2");
            ageElement.textContent = "Version: " + data.age;

            const cityElement = document.createElement(".p3");
            cityElement.textContent = "Description: " + data.city;

            // Append the elements to the "dataDisplay" div
            dataDisplay.appendChild(nameElement);
            dataDisplay.appendChild(ageElement);
            dataDisplay.appendChild(cityElement);
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});