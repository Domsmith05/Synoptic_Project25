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


app.use(express.json());

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to DB at:', res.rows[0].now);
  }
});



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get("/api/reading/:locationId", async (req, res) => {
    const {locationId} = req.params;

    const queryText = `
        SELECT
            loc.locname,
            r.pressure,
            r.readingtime,
            r.status
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

app.get("/api/login", async (req, res) => {});


app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});

app.post("/pageData", async (req, res) => {
   try {
      const theData = await fs.readFile("pageData.json", "utf8");
      res.json(JSON.parse(theData));
   } catch {
      console.error("Error reading pageData.json");
      res.status(500).send("Error reading page data.");
   }
});


app.post("/api/sendSignUpData", async (req, res) => {
    const { forename, surname, email } = req.body;

    if (!forename || !surname || !email) {
        return res.status(400).json({ error: "Missing required fields (forename, surname, email)." });
    }

    const queryText = `
        INSERT INTO synoptic25.signup (fName, lName, email) 
        VALUES ($1, $2, $3)
        ON CONFLICT (email) DO NOTHING; 
    `;

    try {
        await pool.query(queryText, [forename, surname, email]);
        // Send a success response
        res.status(201).json({ message: "Signup successful!" });
    } catch (err) {
        console.error("Database error on signup:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});


app.get("/api/all-readings", async (req, res) => {
    const queryText = `
        SELECT
            loc.locname,
            r.readingtime,
            r.pressure,
            r.status
        FROM
            synoptic25.readings AS r
        JOIN
            synoptic25.location AS loc ON r.location_id = loc.location_id
        ORDER BY
            r.readingtime DESC;
    `;
    try {
        const { rows } = await pool.query(queryText);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching all readings:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.get("/api/latest-readings", async (req, res) => {
    const queryText = `
        WITH RankedReadings AS (
            SELECT
                loc.locname,
                r.readingtime,
                r.pressure,
                r.status,
                ROW_NUMBER() OVER(PARTITION BY r.location_id ORDER BY r.readingtime DESC) as rn
            FROM
                synoptic25.readings AS r
            JOIN
                synoptic25.location AS loc ON r.location_id = loc.location_id
        )
        SELECT
            locname,
            readingtime,
            pressure,
            status
        FROM
            RankedReadings
        WHERE
            rn = 1
        ORDER BY
            locname ASC;
    `;
    try {
        const { rows } = await pool.query(queryText);
        res.json(rows); 
    } catch (err) {
        console.error("Error fetching latest readings for table:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.post("/api/submit-report", async (req, res) => {
    const {location, description} = req.body;
    const username = 'User'; 
    if (!location || !description) {
        return res.status(400).json({ error: "Location and description are required." });
    }

    const reportId = `report_${Date.now()}`;
    const queryText = `
        INSERT INTO synoptic25.report (report_id, username, repmessage)
        VALUES ($1, $2, $3);
    `;
    try {
        await pool.query(queryText, [reportId, username, description]);
        res.status(201).json({ message: "Report submitted successfully!" });
    } catch (err) {
        console.error("Database error on report submission:", err);
        res.status(500).json({ error: "Internal server error." });
    }
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