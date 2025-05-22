
Full Stack App (React + Node.js)
This is a full-stack web application with a React.js frontend and a Node.js/Express backend.

Project Structure

root/
│
├── client/          # React frontend
│   └── ...
│
├── server/          # Node.js + Express backend
│   └── ...
│
└── README.md


🚀 Getting Started
Prerequisites
Make sure you have the following installed:

Node.js (v14 or later)

npm (v6 or later)


▶️ Running the Application
<!-- ============================================================== -->
1️⃣ Start the Frontend (React)

cd client
npm install     # Install dependencies
npm start       # Starts on http://localhost:3000

This will start the development server and open the app in your default browser.

2️⃣ Start the Backend (Node.js + Express)

cd server
npm install     # Install backend dependencies
npm start       # Starts backend server on http://localhost:5000 (or as configured)

Make sure your frontend is configured to make API calls to this backend URL (proxy in client/package.json or using full URL in fetch/axios).


🔧 Environment Variables
Create a .env file inside the server/ directory and add your environment configurations (like DB connection strings, secret keys, etc.), for example:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key


🧪 Available Scripts (Frontend)
Inside the client/ directory:

npm start - Starts the React development server.

npm run build - Builds the app for production.

npm test - Runs tests in watch mode.

npm run eject - Exposes all configs (irreversible).

🛠 Tech Stack
Frontend: React.js, JavaScript, HTML5, CSS3

Backend: Node.js, Express.js

Database: MongoDB 

Tools: VS Code




