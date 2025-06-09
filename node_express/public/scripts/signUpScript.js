document.addEventListener("DOMContentLoaded", function () {
   fetch('/pageData', {method: 'POST',
         headers: {"Content-Type": "application/json"},
      body: JSON.stringify({}) // Empty object as body
      })
      .then(response => {
         if (! response.ok) {
            console.log("Error fetching JSON data:", error);
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         return response.json();
      })
      .then(data => {
        
         var loginMain = document.querySelector(".login_main")[0];
         

         if (!loginMain) {
            throw new Error("Could not find login form or sign up form elements");
         }

         var signUpPage = data.pages.find(pages => pages.name === "Sign Up");
         if (!signUpPage) {
            throw new Error("Could not find signUp page data");
         }

         var h3_1 = loginMain.querySelector(".signup_title");
         var legend1 = loginMain.querySelector(".legend1");
         var l1 = loginMain.querySelector(".label1");
         var l2 = loginMain.querySelector(".label2");
         var l3 = loginMain.querySelector(".label3");
         var legend2 = loginMain.querySelector(".legend2");
         var l4 = loginMain.querySelector(".label4");
         var l5 = loginMain.querySelector(".label5");
         var ta1 = loginMain.querySelector(".textarea");
         var h3_2 = loginMain.querySelector(".login_title");
         var h4 = loginMain.querySelector("form h4");

         if (!h3_1 || !legend1 || !l1 || !l2 || !l3 || !legend2 || !l4 || !l5 || !ta1 || !h3_2 || !h4) {
            throw new Error("Could not find one or more elements with specified classes");
         }

         h3_1.textContent = signUpPage.content[0];
         legend1.textContent = signUpPage.content[1];
         l1.textContent = signUpPage.content[2];
         l2.textContent = signUpPage.content[3];
         l3.textContent = signUpPage.content[4];
         legend2.textContent = signUpPage.content[5];
         l4.textContent = signUpPage.content[6];
         l5.textContent = signUpPage.content[7];
         ta1.textContent = signUpPage.content[8];
         h3_2.textContent = signUpPage.content[9];
         h4.textContent = signUpPage.content[10];

      })
      .catch(error => console.error("Error fetching JSON data:", error));


      // Josh's Foo Bars
      
      document.querySelector("#menu").addEventListener('click', () => {
         console.log("Menu icon clicked");
         document.querySelector(".nav_bar").classList.toggle("show_nav");
      });
     
});




