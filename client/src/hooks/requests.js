const API_URL = 'http://localhost:8000';

// TODO: Once API is ready.
// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

// TODO: Once API is ready.
// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchLaunches = await response.json();
  return fetchLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// TODO: Once API is ready.
// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  return await fetch(`${API_URL}/launches`, {
    method: "post",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(launch),
  });
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};