Stack To Do List Application
This project is a fully functional, full-stack To Do List application built using the MERN stack (MongoDB, Express, React, Node.js). It demonstrates proficiency in building a complete single-page application (SPA) with dedicated backend API services and a MongoDB database hosted on Atlas.

🔗 Live Application Deployment
I am not adding screenshots.The application is deployed as a monorepo on Vercel you can check it out.

Live URL: https://backend-test-ten-orcin.vercel.app/

🚀 Key Features
The application provides a complete set of CRUD (Create, Read, Update, Delete) operations, ensuring full data persistence via MongoDB Atlas.

Create (Add Task): Users can input new tasks, which are saved to the persistent database.

Read (View List): The application fetches and displays all tasks on load and updates the list in real-time.

Update (Toggle Completion): Users can click a task to toggle its completion status.

Delete (Remove Task): Users can permanently remove tasks from the database and the UI.

Aesthetic UI: A clean, modern, and responsive user interface built with custom CSS.

⚙️ Technology Stack
This project utilizes a modern MERN stack monorepo structure.

Frontend (/frontend)
React: Used for building the single-page application (SPA) user interface.

Axios: Used for making asynchronous HTTP requests to the Express API.

CSS: Custom styling for a clean, aesthetic look and feel.

Backend (/backend)
Node.js & Express: Used to create a RESTful API service to handle business logic and database interactions.

MongoDB & Mongoose:

MongoDB Atlas: Cloud-hosted, persistent NoSQL database used to store all task data.

Mongoose: Object Data Modeling (ODM) library for Node.js, providing structure and validation for task schemas.

CORS: Middleware configured to allow cross-origin requests between the React frontend (hosted on Vercel) and the Express backend (hosted as a Serverless Function).

dotenv: Used for managing environment variables (like the MONGODB_URI) securely.

🌐 Deployment Architecture
The application is deployed using Vercel, utilizing a monorepo structure where the frontend and backend are hosted together but handled differently:

Frontend (Static Hosting): The React application is built via Vercel's static builder, hosted as static files, and served on the root path (/).

Backend (Serverless Function): The Express server code (backend/server.js) is automatically converted into an AWS Lambda (Serverless Function).

Routing: The primary package.json and a root-level vercel.json file are configured to route all API calls from the frontend (/api/tasks) to the Node.js Serverless Function, ensuring seamless full-stack communication.

Database Connection: The MONGODB_URI connection string is securely managed via Vercel's Environment Variables, allowing the backend Serverless Function to establish a secure link with MongoDB Atlas.

💻 Local Setup and Installation
To run this project locally, you need Node.js and npm installed.

Prerequisites
Node.js (v18+)

MongoDB Atlas Account (or local MongoDB instance)

Installation Steps
Clone the Repository:

Bash

git clone [YOUR_GITHUB_REPO_URL]
cd mern-task-list-app
Install Dependencies: Run the following command from the project root to install dependencies for the root, backend, and frontend concurrently:

Bash

npm install
npm --prefix backend install
npm --prefix frontend install
Configure Environment:

Create a file named .env in the backend/ folder.

Add your MongoDB Atlas connection string:

MONGODB_URI=mongodb+srv://<user>:<password>@cluster-name.mongodb.net/?appName=...
Run the Application: Run the dev script from the project root to start both the Node server (Port 5000) and the React client (Port 3000):

Bash

npm run dev
The application will be accessible at http://localhost:3000.
