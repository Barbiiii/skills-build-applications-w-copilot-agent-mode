import React, { useState, useEffect } from 'react';

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      const url = `${apiBaseUrl}/activities/`;
      console.log('📡 Fetching activities from:', url);
      try {
        const response = await fetch(url);
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
  }, [apiBaseUrl]);

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
        <h2>🏃 Activities</h2>
        <button className="btn btn-primary btn-sm">+ Log Activity</button>
      </div>

      {activities.length === 0 ? (
        <div className="alert alert-warning">No activities available</div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
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

