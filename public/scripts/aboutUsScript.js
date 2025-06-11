
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
         const div = document.getElementsByClassName("about_content")[0];
         if (!div) {
            throw new Error("Could not find element with class 'about_content'");
         }

         const aboutPage = data.pages.find(pages => pages.name === "About Us");
         if (!aboutPage) {
            throw new Error("Could not find About page data");
         }

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