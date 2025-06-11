
document.addEventListener("DOMContentLoaded", function () {
   //console.log("DOM fully loaded and parsed");
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
        
         var loginMain = document.querySelector(".login_main");
         //var loginMain = document.getElementsByClassName("login_main")[0];

         if (!loginMain) {
            throw new Error("Could not find login form or sign up form elements");
         }

         const signUpPage = data.pages.find(pages => pages.name === "Sign Up");
         if (!signUpPage) {
            throw new Error("Could not find signUp page data");
         }

         var h3_1 = loginMain.querySelector(".signup_title");
         var legend1 = loginMain.querySelector(".legend1");
         var l1 = loginMain.querySelector(".label1");
         var l2 = loginMain.querySelector(".label2");
         var l3_1 = loginMain.querySelector(".label3");
         var legend2 = loginMain.querySelector(".legend2");
         var l4 = loginMain.querySelector(".label4");
         var l5 = loginMain.querySelector(".label5");
         var l3_2 = loginMain.querySelector(".login_form .label3");
         var h3_2 = loginMain.querySelector(".login_title");
         var h4 = loginMain.querySelector("form h4");

         if (!h3_1 || !legend1 || !l1 || !l2 || !l3_1 || !legend2 || !l4 || !l5 || !l3_2 || !h3_2 || !h4) {
            throw new Error("Could not find one or more elements with specified classes");
         }

         h3_1.textContent = signUpPage.content[0];
         legend1.textContent = signUpPage.content[1];
         l1.textContent = signUpPage.content[2];
         l2.textContent = signUpPage.content[3];
         l3_1.textContent = signUpPage.content[4];
         legend2.textContent = signUpPage.content[5];
         l4.textContent = signUpPage.content[6];
         l5.textContent = signUpPage.content[7];
         l3_2.textContent = signUpPage.content[4];
         h3_2.textContent = signUpPage.content[8];
         h4.textContent = signUpPage.content[9];

      })
      .catch(error => console.error("Error fetching JSON data:", error));


      // Hamburger menu functionality
      
      document.querySelector("#menu").addEventListener('click', () => {
         console.log("Menu icon clicked");
         document.querySelector(".nav_bar").classList.toggle("show_nav");
      });
      
      const form1 = document.getElementsByClassName("sign_up_form")[0];
      
      form1.addEventListener("submit", async (event) => {
         event.preventDefault(); // Prevent the default form submission
         
         const formForename = document.querySelector("#forename").value.trim();
         const formSurname = document.querySelector("#surname").value.trim();
         const formEmail = document.querySelector("#email").value.trim();
         
         if (!formForename || !formSurname || !formEmail) {
            alert("Please fill in all fields.");
            return;
         }
         
         try {
            await sendSignUpData(formForename, formSurname, formEmail);
            alert("Sign-up successful!");
            // Clear form once sent
            document.querySelector(".sign_up_form").reset();
         } catch (error) {
            console.error("Error when sending sign-up data ", error);
            alert("An error occurred while signing up. Please try again.");
         }
      });

      async function sendSignUpData (forename, surname, email) {
         const response = await fetch(`/api/sendSignUpData`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               forename: forename,
               surname: surname,
               email: email
            })
         });
      }

});