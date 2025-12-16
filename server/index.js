const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3001;

// --------------------
// Middleware
// --------------------

// Enable CORS so the frontend can access the backend
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// --------------------
// PostgreSQL connection
// --------------------

// Connects the server to the study_hub database
const db = new Pool({
  database: 'study_hub',
  // user: 'your_user',
  // password: 'your_password',
  // host: 'localhost',
  // port: 5432,
});

// --------------------
// Basic routes
// --------------------

// Health check route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Optional route to test database connectivity
app.get('/db-test', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() as now');
    res.json({ ok: true, now: result.rows[0].now });
  } catch (error) {
    console.error('DB TEST ERROR:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Static students route (not connected to DB yet)
app.get('/students', (req, res) => {
  res.json([
    { id: 1, name: 'Redu Davison' },
    { id: 2, name: 'Luana Furtado' },
  ]);
});

/* ===========================
   MATERIALS ROUTES
   Data comes from PostgreSQL
   =========================== */

// Get all materials
app.get('/materials', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM materials ORDER BY id'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('GET /materials ERROR:', error);
    res.status(500).json({
      error: 'Error fetching materials',
      details: error.message,
    });
  }
});

// Get a single material by id
app.get('/materials/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM materials WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Material not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('GET /materials/:id ERROR:', error);
    res.status(500).json({
      error: 'Error fetching material',
      details: error.message,
    });
  }
});

// Create a new material
app.post('/materials', async (req, res) => {
  // Debug: log what the frontend is sending
  console.log('REQ BODY:', req.body);

  const {
    title,
    category,
    default_link,
    is_recurring,
    default_day,
    recurrence_pattern,
  } = req.body;

  // Minimal validation for required fields
  if (!title || !category) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['title', 'category'],
      received: req.body,
    });
  }

  try {
    const result = await db.query(
      `INSERT INTO materials
       (title, category, default_link, is_recurring, default_day, recurrence_pattern)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        title,
        category,
        default_link ?? null,
        is_recurring ?? false,
        default_day ?? null,
        recurrence_pattern ?? null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('POST /materials DB ERROR:', error);

    // Return detailed error information for debugging
    res.status(500).json({
      error: 'Error creating material',
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint,
    });
  }
});

// --------------------
// Start server
// --------------------

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
