GamingWithMe
Live Application: gamingwithme.vercel.app

A modern web application for discovering, searching, and managing games, built using TypeScript, React, and Vite. This project demonstrates practical use of component-driven architecture, external API integration, and modern development workflows.

Table of Contents
Features

Demo

Getting Started

Project Structure

Technologies Used

Development & Contributing

Suggestions for Improvement

License

Features
Responsive frontend for searching and displaying game information.

Integration with external APIs (e.g., RAWG for game data; see environment config).

Admin interface for game/data management.

Secure handling of environment variables, including local HTTPS support for development.

Type-safe codebase (TypeScript) for reliability.

Deployed with Vercel for CI/CD and live updates.

Demo
Visit the live site: gamingwithme.vercel.app

Getting Started
Prerequisites
Node.js (v16+ recommended)

npm (comes with Node)

Git

Installation
Clone the repository:

bash
git clone https://github.com/impappdavid/gamingwithme.git
cd gamingwithme
Install dependencies:

bash
npm install
Local HTTPS Development
Default setup includes certificates (localhost.pem, localhost-key.pem).
If missing, generate or obtain local dev certificates.

Start the development server:

bash
npm run dev
Visit https://localhost:5173 (default Vite port).

Project Structure
text
gamingwithme/
├── public/              # Static assets
├── src/                 # Source code (main app)
│   ├── components/      # React components
│   ├── pages/           # App pages/views
│   ├── api/             # Logic for API integration (e.g., RAWG)
│   └── ...              # Other logic (hooks, utils, state)
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
Technologies Used
React – component-based UI

TypeScript – static typing & reliable code

Vite – fast bundler and dev server

ESLint – code quality checks

Vercel – deployment, CI/CD

See package.json for full list.

Development & Contributing
Scripts
npm run dev – starts local dev server

npm run build – builds for production

npm run lint – runs linter

Contributing
Fork and clone the repo.

Follow [feature branch workflow]:

bash
git checkout -b feature/your-feature
Make changes, run tests/lints.

Push branch and open a Pull Request.
