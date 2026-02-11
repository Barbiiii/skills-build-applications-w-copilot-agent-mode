import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      const REACT_APP_CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
      const url = REACT_APP_CODESPACE_NAME
        ? `https://${REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
        : 'http://localhost:8000/api/activities/';

      console.log('📡 Fetching activities from:', url);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('✅ Activities data received:', data);

        // Handle both paginated and plain array responses
        const activitiesList = data.results || data;
        setActivities(Array.isArray(activitiesList) ? activitiesList : []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching activities:', err);
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading activities...
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
        <h2 className="mb-0">🏃 Activities</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Log Activity</button>
      </div>

      {/* Log Activity Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Log New Exercise</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Activity Type</label>
                    <select className="form-select">
                      <option>Running</option>
                      <option>Cycling</option>
                      <option>Swimming</option>
                      <option>Yoga</option>
                      <option>Strength Training</option>
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Duration (min)</label>
                      <input type="number" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Calories</label>
                      <input type="number" className="form-control" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Performed At</label>
                    <input type="datetime-local" className="form-control" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Confirm Log</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activities.length === 0 ? (
        <div className="alert alert-warning">No activities available</div>
      ) : (
        <div className="table-responsive shadow-sm rounded border">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">User</th>
                <th scope="col">Activity Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Calories Burned</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <strong>{activity.user || '—'}</strong>
                  </td>
                  <td>
                    <span className="badge bg-success">{activity.activity_type}</span>
                  </td>
                  <td>{activity.duration_minutes}</td>
                  <td>{activity.calories_burned || '—'}</td>
                  <td>{new Date(activity.performed_at).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
