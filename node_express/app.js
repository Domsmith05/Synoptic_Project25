require('dotenv').config(); 

const express = require("express");
const path = require('path');
const app = express();
const port = 4000;
const {Pool} = require('pg');
const fs = require("fs").promises; 
const {Client} = require('pg');

const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT
});

const client = new Client({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT
});

app.use(express.json());

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to DB at:', res.rows[0].now);
  }
});

client.connect()
   .then(() => console.log('Connected to the database'))
   .catch(err => console.error('Connection error', err.stack));



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get("/api/reading/:locationId", async (req, res) => {
    const {locationId} = req.params;

    const queryText = `
        SELECT
            loc.locname,
            r.pressure,
            r.readingtime
        FROM
            synoptic25.location AS loc
        JOIN
            synoptic25.readings AS r ON loc.location_id = r.location_id
        WHERE
            loc.location_id = $1
        ORDER BY
            r.readingtime DESC
        LIMIT 1;
    `;

    try {
        const { rows } = await pool.query(queryText, [locationId]);

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: "No readings found for this location." });
        }
    } catch (err) {
        console.error(`Error fetching data for location ${locationId}:`, err);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Same as above? but getting "user" data to check if user can log in - if so return a success message (Doesn't do anything yet, will do in V2)
app.get("/api/login", async (req, res) => {});


app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});

app.post("/pageData", async (req, res) => {
   try {
      //console.log("Received request for page data...");
      const theData = await fs.readFile("pageData.json", "utf8");
      res.json(JSON.parse(theData));
   } catch {
      console.error("Error reading pageData.json");
      res.status(500).send("Error reading page data.");
   }
});


// Needs testing
app.post("/api/sendSignUpData", (req, res) => {
   const {forename, surname, email} = req.body;

   if (!forename || !surname || !email) {
      return res.status(400).json({ error: "All fields are required." });
   }

   const queryText = `
      INSERT INTO synoptic25.signup (forename, surname, email)
      VALUES ($1, $2, $3)
      RETURNING *;
   `;

   pool.query(queryText, [forename, surname, email])
      .then(result => {
         res.status(201).json({ message: "Sign-up successful!", data: result.rows[0] });
      })
      .catch(err => {
         console.error("Error inserting sign-up data:", err);
         res.status(500).json({ error: "Internal server error." });
      });
});




app.get("/", (req, res) => {
   console.log("Serving main page...");
   res.sendFile(path.join(__dirname, 'public/map.html'), err => {
      if (err) {
         console.error("Error sending file:", err);
         res.status(500).send("Error sending file.");
      }
   });
});