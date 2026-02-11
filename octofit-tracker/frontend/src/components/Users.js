import React, { useState, useEffect } from 'react';

function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const url = `${apiBaseUrl}/users/`;
      console.log('📡 Fetching users from:', url);
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('✅ Users data received:', data);

        // Handle both paginated and plain array responses
        const usersList = data.results || data;
        setUsers(Array.isArray(usersList) ? usersList : []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching users:', err);
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [apiBaseUrl]);

  if (loading) {
    return (
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading users...
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
        <h2>👤 Users</h2>
        <button className="btn btn-primary btn-sm">+ Add User</button>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-warning">No users available</div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Weight (kg)</th>
                <th scope="col">Height (cm)</th>
                <th scope="col">Team</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.name}</strong>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.age || '—'}</td>
                  <td>{user.weight_kg || '—'}</td>
                  <td>{user.height_cm || '—'}</td>
                  <td>
                    <span className="badge bg-info text-dark">{user.team || 'No Team'}</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">View</button>
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

export default Users;

