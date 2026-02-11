import React, { useState, useEffect } from 'react';

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      const url = `${apiBaseUrl}/activities/`;
      console.log('Fetching activities from:', url);
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Activities data received:', data);

        // Handle both paginated and plain array responses
        const activitiesList = data.results || data;
        setActivities(Array.isArray(activitiesList) ? activitiesList : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [apiBaseUrl]);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <div className="alert alert-warning">No activities available</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.activity_type}</td>
                  <td>{activity.user || 'N/A'}</td>
                  <td>{activity.duration_minutes}</td>
                  <td>{activity.calories_burned || 'N/A'}</td>
                  <td>{new Date(activity.performed_at).toLocaleDateString()}</td>
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

