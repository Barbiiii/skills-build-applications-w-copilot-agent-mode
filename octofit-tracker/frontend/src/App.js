import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
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

        {/* Main Content */}
        <main className="container-lg py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-light mt-5 pt-4 border-top">
          <div className="container-fluid text-center py-3">
            <p className="mb-0 text-muted">
              &copy; 2026 Octofit Tracker | Powered by Django REST API & React
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return (
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Welcome to Octofit Tracker</h1>
          <p className="lead text-muted">Track your fitness activities and compete with your team!</p>
        </div>

        <div className="alert alert-info border-0 shadow-sm mb-4" role="alert">
          <strong>🔗 API Base URL:</strong> <code>{apiBaseUrl}</code>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">👥 Teams</h5>
                <p className="card-text">Manage and view all teams in the system.</p>
                <Link to="/teams" className="btn btn-primary btn-sm">
                  View Teams
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">👤 Users</h5>
                <p className="card-text">Browse user profiles and team memberships.</p>
                <Link to="/users" className="btn btn-primary btn-sm">
                  View Users
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🏃 Activities</h5>
                <p className="card-text">Track and log your fitness activities.</p>
                <Link to="/activities" className="btn btn-primary btn-sm">
                  View Activities
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">💪 Workouts</h5>
                <p className="card-text">Explore available workout routines.</p>
                <Link to="/workouts" className="btn btn-primary btn-sm">
                  View Workouts
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🏆 Leaderboard</h5>
                <p className="card-text">Check the competitive rankings.</p>
                <Link to="/leaderboard" className="btn btn-primary btn-sm">
                  View Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

