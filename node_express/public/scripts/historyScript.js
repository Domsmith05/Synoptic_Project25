
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
      const div = document.querySelector("main"); 
      if (!div) {
         throw new Error("Could not find main element"); 
      }

      const aboutPage = data.pages.find(pages => pages.name === "History"); 1
      if (!aboutPage) {
         throw new Error("Could not find History page data");
      }
         
      const h1 = div.querySelector(".history_page_title");
      const p1 = div.querySelector(".p1");
      const th1 = div.querySelector(".th1");
      const th2 = div.querySelector(".th2");
      const th3 = div.querySelector(".th3");

      if (!h1 || !p1 || !th1 || !th2 || !th3) {
         throw new Error("Could not find one or more elements with specified classes");
      }

      h1.textContent = aboutPage.content[0];
      p1.textContent = aboutPage.content[1];
      th1.textContent = aboutPage.content[2];
      th2.textContent = aboutPage.content[3];
      th3.textContent = aboutPage.content[4];
   })
   .catch(error => console.error("Error fetching JSON data:", error));

   document.querySelector("#menu").addEventListener('click', () => {
      console.log("Menu icon clicked");
      document.querySelector(".nav_bar").classList.toggle("show_nav");
   });
});