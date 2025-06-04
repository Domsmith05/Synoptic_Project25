require('dotenv').config(); 

const express = require("express");
const path = require('path');
const app = express();
const port = 4000;
const {Pool} = require('pg');

const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT
});

module.exports = pool;

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to DB at:', res.rows[0].now);
  }
});

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