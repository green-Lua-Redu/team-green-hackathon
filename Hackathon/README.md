# Team Green Hackathon

Starting point for the Team Green hackathon project.

## Team

- Luana
- Redu

## Goal

Build a React-based project with a clear MVP and strong collaboration.

## Status

Project initialized. React setup coming next.

Hackathon Project :rocket::fire:
A full‑stack hackathon project built with teamwork, learning, chaos, and resilience.
Disclaimer: Some things may be broken. This is a feature, not a bug :smile:
:brain: Project Overview
This project was built during a hackathon using:
Frontend: React (Vite)
Backend: Node.js + Express
Database: PostgreSQL
The goal was to practice full‑stack integration, APIs, and collaboration under real‑world constraints (time pressure, bugs, fires :fire:, and Zoom confusion).
:package: Tech Stack
Node.js
Express
React
PostgreSQL
Vite
Fetch API
:hammer_and_wrench: Prerequisites
Make sure you have the following installed:
Node.js (v18+ recommended)
npm
PostgreSQL (running locally)
Check versions:
Check versions:
node -v
npm -v
psql --version
:file_cabinet: Database Setup
Open Postgres:
psql postgres
Create the database:
CREATE DATABASE study_hub;
Connect to it:
\c study_hub
Create the materials table:
CREATE TABLE materials (
id SERIAL PRIMARY KEY,
title TEXT NOT NULL,
category TEXT,
default_day TEXT,
default_link TEXT
);
Backend Setup (Express Server)
Go to the server folder:
cd server
Install dependencies:
npm install
Create a .env file:
DATABASE_URL=postgres://localhost:5432/study_hub
Start the server:
npm run dev
The backend should run on:
http://localhost:3001
Test it in the browser:
http://localhost:3001/materials
Frontend Setup (React)
Go to the client folder:
cd client
Install dependencies:
npm install
Start the frontend:
npm run dev
Frontend runs on:
http://localhost:5173
:link: API Endpoints
GET all materials
GET /materials
POST new material
POST /materials
Body:
{
"title": "Example Task",
"category": "manual",
"default_day": "Monday",
"default_link": "https://example.com"
}
DELETE material
DELETE /materials/:id
:test_tube: Common Issues
Nothing shows on frontend
Check if backend is running
Check fetch URLs (localhost:3001)
Database errors
Make sure Postgres is running
Confirm database name is study_hub
CORS issues
Backend uses cors() middleware
:handshake: Team & Credits
Built with collaboration, patience, and humor during a hackathon.
Special thanks to everyone who pair‑programmed, debugged, survived broken builds, and kept going :green_heart:
:fire_extinguisher: Final Notes
This project reflects learning in progress, not perfection.
We shipped. We learned. We survived.
