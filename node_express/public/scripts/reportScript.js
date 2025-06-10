
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
      const div = document.getElementsByClassName("report_body")[0]; 
      if (!div) {
         throw new Error("Could not find 'report_body' element"); 
      }

      const aboutPage = data.pages.find(pages => pages.name === "Report"); 1
      if (!aboutPage) {
         throw new Error("Could not find Report page data");
      }
         
      const h1 = div.querySelector(".report_title");
      const l1 = div.querySelector(".l1");
      const inp1 = div.querySelector(".inp1");
      const l2 = div.querySelector(".l2");
      const l3 = div.querySelector(".l3");
      const inp3 = div.querySelector("#description");
      const s1 = div.querySelector(".submit_btn");

      if (!h1 || !l1 || !inp1 || !l2 || !l3 || !inp3 || !s1) {
         throw new Error("Could not find one or more elements with specified classes");
      }

      h1.textContent = aboutPage.content[0];
      l1.textContent = aboutPage.content[1];
      inp1.setAttribute ("placeholder", aboutPage.content[2]);
      l2.textContent = aboutPage.content[3];
      l3.textContent = aboutPage.content[4];
      inp3.setAttribute ("placeholder", aboutPage.content[5]);
      s1.textContent = aboutPage.content[6];
   })
   .catch(error => console.error("Error fetching JSON data:", error));

   document.querySelector("#menu").addEventListener('click', () => {
      console.log("Menu icon clicked");
      document.querySelector(".nav_bar").classList.toggle("show_nav");
   });
});