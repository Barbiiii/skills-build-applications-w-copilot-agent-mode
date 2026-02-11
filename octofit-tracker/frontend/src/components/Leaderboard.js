import React, { useState, useEffect } from 'react';

function Leaderboard({ apiBaseUrl }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const url = `${apiBaseUrl}/leaderboard/`;
      console.log('Fetching leaderboard from:', url);
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Leaderboard data received:', data);

        // Handle both paginated and plain array responses
        const leaderboardList = data.results || data;
        setEntries(Array.isArray(leaderboardList) ? leaderboardList : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setEntries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [apiBaseUrl]);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      {entries.length === 0 ? (
        <div className="alert alert-warning">No leaderboard entries available</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Week Start</th>
              </tr>
            </thead>
            <tbody>
              {entries
                .sort((a, b) => a.rank - b.rank)
                .map((entry) => (
                  <tr key={entry.id}>
                    <td>
                      <strong>
                        {entry.rank === 1 && '🥇'}
                        {entry.rank === 2 && '🥈'}
                        {entry.rank === 3 && '🥉'}
                        {entry.rank > 3 && '·'} {entry.rank}
                      </strong>
                    </td>
                    <td>{entry.user || 'N/A'}</td>
                    <td>{entry.points}</td>
                    <td>{new Date(entry.week_start).toLocaleDateString()}</td>
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

