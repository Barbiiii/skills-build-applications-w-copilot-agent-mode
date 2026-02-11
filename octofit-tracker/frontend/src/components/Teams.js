import React, { useState, useEffect } from 'react';

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const url = `${apiBaseUrl}/teams/`;
      console.log('📡 Fetching teams from:', url);
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('✅ Teams data received:', data);

        // Handle both paginated and plain array responses
        const teamsList = data.results || data;
        setTeams(Array.isArray(teamsList) ? teamsList : []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching teams:', err);
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [apiBaseUrl]);

  if (loading) {
    return (
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading teams...
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
      <h2 className="mb-4">👥 Teams</h2>
      {teams.length === 0 ? (
        <div className="alert alert-warning">No teams available</div>
      ) : (
        <div className="row g-4">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text text-muted">{team.description}</p>
                </div>
                <div className="card-footer bg-white border-top">
                  <button className="btn btn-sm btn-outline-primary">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;

