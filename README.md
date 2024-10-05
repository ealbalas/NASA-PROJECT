# NASA Project API

This project is designed to serve as a backend API for managing planetary data and space launches. Built using **Node.js** and **Express**, the application exposes routes for interacting with planetary and launch data. It handles incoming requests from the client-side (e.g., frontend running on `localhost:3000`) and provides JSON responses for various endpoints.

## To Run
From dir 'npm install' to install dependiencies and 'npm run deploy' to run application.

## 1. App Setup (`app.js`)

The core of the application is configured in `app.js`. The following features are set up:

- **Middleware Configuration**:
  - **CORS**: Configured to allow requests from `http://localhost:3000` to prevent cross-origin resource sharing issues.
  - **Morgan**: Used as a logging middleware to log HTTP requests in a combined format.
  - **`express.json()`**: Middleware for parsing incoming JSON payloads from requests.
  - **Static Files**: The app serves static files from the `public` directory for the frontend interface.

- **Routing**: The app integrates two routers:
  - `planetsRouter`: Manages routes related to planetary data, prefixed with `/planets`.
  - `launchesRouter`: Manages routes related to launch data, prefixed with `/launches`.

These routers handle the actual business logic for planets and launches.

---

## 2. Planetary Routes (`planets.router.js` and `planets.controller.js`)

The `planetsRouter` is responsible for handling routes that interact with planetary data. It includes routes like:

- **GET `/planets`** This route retrieves all avalible planets that meet our criteria.

---

## 3. Launch Routes (`launches.router.js` and `launches.controller.js`)

The `launchesRouter` is responsible for managing launch data. It includes routes like:

- **GET `/launches`**: This route retrieves all available launches. It invokes the `getAllLaunches` function from the `launches.controller.js` file, which in turn interacts with the model to retrieve launch data.
- **POST `/launches`**: This route allows adding a new launch. It expects a JSON payload with details about the launch (mission, rocket, launchDate, target) and performs validation before adding the launch to the dataset.

### Key Functions in `launches.controller.js`:

- **`getAllLaunches(req, res)`**: This function fetches all launches from the model and returns them as a JSON response. It uses `res.status(200).json()` to ensure proper HTTP status codes and JSON formatting.
  
- **`addNewLaunch(req, res)`**: This function handles adding new launches to the dataset. It performs validation on the incoming data (checks if mission, rocket, launchDate, and target are provided and if the date is valid). Upon successful validation, the launch is added, and a success response with status code `201` is returned.

---

## 4. Launches Model (`launches.model.js`)

The `launchesModel` is where the data for the launches is stored and managed. It includes:

- **`getAllLaunches()`**: Retrieves all the launch data currently stored in the application.
  
- **`addNewLaunch(launch)`**: Adds a new launch to the dataset. Each launch is assigned a flight number and some default values (e.g., customers, upcoming status, success status). This data is stored in a `Map` or similar in-memory data structure.

---

## 5. Handling Requests and Responses

The client (e.g., a frontend app) communicates with this backend by making HTTP requests to the appropriate routes. The backend processes these requests, interacts with the model to either retrieve or store data, and responds with JSON data. For example:
- A `POST` request to `/launches` sends launch data, which is validated and added to the dataset.
- A `GET` request to `/launches` retrieves all the stored launches and returns them to the client.

---

## 6. Debugging and Logging

Throughout the development process, several debugging techniques were employed:
- **Logging**: Both the `req` and `res` objects were logged in the controller to ensure they were being passed correctly and that incoming requests were being properly parsed.
- **Route Configuration**: Care was taken to ensure that routes were prefixed and handled correctly, including ensuring that the middleware was correctly applied to parse incoming JSON data.

---

## Summary

The NASA Project API is structured to handle space-related data (planets and launches). The backend is built using **Node.js** and **Express**, with middleware for CORS, logging, and JSON body parsing. The API is organized using routers to separate concerns for planets and launches, and the launch controller handles the core business logic such as data validation and storage. The project’s structure makes it easily extendable for additional features, such as handling more space-related data or adding more complex logic for launch management.

This project demonstrates how to build a modular and scalable Node.js API with clear separation of concerns between routing, controllers, and data models.
