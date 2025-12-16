// server/index.js

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
// Enable CORS for all routes

const app = express();
const PORT = 3001;

// Parse JSON request bodies
app.use(express.json());

// PostgreSQL connection
// This connects the server to the study_hub database
const db = new Pool({
  database: 'study_hub',
});

// --------------------
// Basic routes
// --------------------

// Health check route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Students route
// This is still using static data
app.get('/students', (req, res) => {
  res.json([
    { id: 1, name: 'Redu Davison ' },
    { id: 2, name: 'Luana Furtado' },
  ]);
});

/* ===========================
   MATERIALS ROUTES
   Data now comes from Postgres
   =========================== */

// Get all materials
app.get('/materials', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM materials ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching materials');
  }
});

// Get one material by id
app.get('/materials/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM materials WHERE id = $1', [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).send('Material not found');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching material');
  }
});

// Create a new material
app.post('/materials', async (req, res) => {
  const {
    title,
    category,
    default_link,
    is_recurring,
    default_day,
    recurrence_pattern,
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO materials
       (title, category, default_link, is_recurring, default_day, recurrence_pattern)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        title,
        category,
        default_link,
        is_recurring,
        default_day,
        recurrence_pattern,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating material');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
