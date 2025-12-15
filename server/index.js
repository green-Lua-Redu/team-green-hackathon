// server/index.js
const express = require('express');

const app = express();
const PORT = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// --- Example routes ---

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Students route
app.get('/students', (req, res) => {
  res.json([
    { id: 1, name: 'Redu Davison ' },
    { id: 2, name: 'Luana Furtado' },
  ]);
});
let materials = [
  { id: 1, title: 'Personal Growth & Feedback', category: 'Growth' },
  { id: 2, title: '1:1s', category: 'Mentorship' },
  {
    id: 3,
    title: 'Milestone Project',
    category: 'Project',
    platform: 'GitHub',
  },
  {
    id: 4,
    title: 'Communication Practice',
    category: 'Practice',
    platform: 'Slack',
  },
  {
    id: 5,
    title: 'Feedback Practice',
    category: 'Practice',
    platform: 'Slack',
  },
  { id: 6, title: 'Retro', category: 'Team Activity' },
  { id: 7, title: 'Weekly Survey', category: 'Survey' },
  { id: 8, title: 'Quiz', category: 'Assessment' },
  { id: 9, title: 'Checklist Items', category: 'Checklist' },
  { id: 10, title: 'Knowledge Checks', category: 'Assessment' },
];

// Get all materials
app.get('/materials', (req, res) => {
  res.json(materials);
});

// Get one material by ID
app.get('/materials/:id', (req, res) => {
  const material = materials.find((m) => m.id === parseInt(req.params.id));
  material ? res.json(material) : res.status(404).send('Material not found');
});

// Add new material
app.post('/materials', (req, res) => {
  const newMaterial = { id: materials.length + 1, ...req.body };
  materials.push(newMaterial);
  res.status(201).json(newMaterial);
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
