import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const getApiBaseUrl = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  return 'http://localhost:8000/api';
};

function App() {
  const apiBaseUrl = getApiBaseUrl();
  console.log('App initialized with API Base URL:', apiBaseUrl);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🐙 Octofit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home apiBaseUrl={apiBaseUrl} />} />
            <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
            <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
            <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
            <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
            <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home({ apiBaseUrl }) {
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Welcome to Octofit Tracker</h1>
        <p className="lead">Track your fitness activities and compete with your team!</p>
        <div className="alert alert-info" role="alert">
          <strong>API Base URL:</strong> {apiBaseUrl}
        </div>
        <p>Use the navigation menu to explore:</p>
        <ul>
          <li><strong>Teams</strong> - Manage teams</li>
          <li><strong>Users</strong> - View user profiles</li>
          <li><strong>Activities</strong> - Log and track activities</li>
          <li><strong>Workouts</strong> - Browse available workouts</li>
          <li><strong>Leaderboard</strong> - Check rankings</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
