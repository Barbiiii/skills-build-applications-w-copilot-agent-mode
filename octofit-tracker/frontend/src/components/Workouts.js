import React, { useState, useEffect } from 'react';

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const url = `${apiBaseUrl}/workouts/`;
      console.log('📡 Fetching workouts from:', url);
      try {
        const response = await fetch(url);
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
  }, [apiBaseUrl]);

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
        <h2>💪 Workouts</h2>
        <button className="btn btn-primary btn-sm">+ Create Workout</button>
      </div>

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

