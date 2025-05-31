const express = require("express");
const path = require('path');
const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, 'public')));

//
// Do whatever you want with this, it's just a set-up of files and folders 
// - you don't even have to use node or express, but if you want to it's now set up.
// Didn't bother with EJS or any templating engine, as you mentioned not needing it.
//

app.listen(port, () => {
   console.log(`Supposedly listening on port ${port} - don't trust it.`);
});


app.get("/", (req, res) => {
   console.log(req.url);
   res.sendFile(path.join(__dirname, 'public/index.html'), err => {
      if (err) {
         console.error("Error sending file:", err);
         res.status(500).send("Error sending file.");
      }
   });
   
});