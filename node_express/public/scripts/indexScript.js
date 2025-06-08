
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
         var div = document.querySelector("main");
         if (!div) {
            throw new Error("Could not find main element");
         }

         var aboutPage = data.pages.find(pages => pages.name === "Home");
         if (!aboutPage) {
            throw new Error("Could not find Home / Index data");
         }

         var h1 = div.querySelector(".home_page_title");
         var p1 = div.querySelector(".p1");
         var p2 = div.querySelector(".p2");
         var p3 = div.querySelector(".p3");

         if (!h1 || !p1 || !p2 || !p3) {
            throw new Error("Could not find one or more elements with specified classes");
         }

         h1.textContent = aboutPage.content[0];
         p1.textContent = aboutPage.content[1];
         p2.textContent = aboutPage.content[2];
         p3.textContent = aboutPage.content[3];

      })
      .catch(error => console.error("Error fetching JSON data:", error));
});