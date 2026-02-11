import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-success';
      case 'intermediate':
        return 'bg-warning';
      case 'advanced':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev/api`
        : 'http://localhost:8000/api';
      const url = `${baseUrl}/workouts/`;

      console.log('📡 Fetching workouts from:', url);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('✅ Workouts data received:', data);

        // Handle both paginated and plain array responses
        const workoutsList = data.results || data;
        setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching workouts:', err);
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading workouts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">💪 Workouts</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Create Workout</button>
      </div>

      {/* Create Workout Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Define New Workout</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Workout Name</label>
                    <input type="text" className="form-control" placeholder="e.g. Morning Burn" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea className="form-control" rows="3"></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Duration (min)</label>
                      <input type="number" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Difficulty</label>
                      <select className="form-select">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Save Workout</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {workouts.length === 0 ? (
        <div className="alert alert-warning">No workouts available</div>
      ) : (
        <div className="row g-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text text-muted">{workout.description}</p>
                  <div className="mb-3">
                    <span className={`badge ${getDifficultyBadgeColor(workout.difficulty)} me-2`}>
                      {workout.difficulty}
                    </span>
                    <span className="badge bg-info">⏱️ {workout.duration_minutes} min</span>
                  </div>
                  <small className="text-muted d-block mb-3">
                    Created by: {workout.created_by || 'System'}
                  </small>
                </div>
                <div className="card-footer bg-white border-top">
                  <button className="btn btn-sm btn-primary me-2">Start</button>
                  <button className="btn btn-sm btn-outline-secondary">More Info</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;

