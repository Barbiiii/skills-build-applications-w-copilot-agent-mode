import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMedalEmoji = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '·';
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'table-warning';
      case 2:
        return 'table-info';
      case 3:
        return 'table-secondary';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev/api`
        : 'http://localhost:8000/api';
      const url = `${baseUrl}/leaderboard/`;

      console.log('📡 Fetching leaderboard from:', url);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('✅ Leaderboard data received:', data);

        // Handle both paginated and plain array responses
        const leaderboardList = data.results || data;
        setEntries(Array.isArray(leaderboardList) ? leaderboardList : []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching leaderboard:', err);
        setError(err.message);
        setEntries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading leaderboard...
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
        <h2>🏆 Leaderboard</h2>
        <button className="btn btn-primary btn-sm">Refresh</button>
      </div>

      {entries.length === 0 ? (
        <div className="alert alert-warning">No leaderboard entries available</div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Points</th>
                <th scope="col">Week Start</th>
                <th scope="col">Badge</th>
              </tr>
            </thead>
            <tbody>
              {entries
                .sort((a, b) => a.rank - b.rank)
                .map((entry) => (
                  <tr key={entry.id} className={getRankColor(entry.rank)}>
                    <td>
                      <strong className="fs-5">{getMedalEmoji(entry.rank)} #{entry.rank}</strong>
                    </td>
                    <td>
                      <strong>{entry.user || '—'}</strong>
                    </td>
                    <td>
                      <span className="badge bg-primary fs-6">{entry.points} pts</span>
                    </td>
                    <td>{new Date(entry.week_start).toLocaleDateString()}</td>
                    <td>
                      {entry.rank <= 3 && (
                        <span className="badge bg-success">Top {entry.rank}</span>
                      )}
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

export default Leaderboard;

