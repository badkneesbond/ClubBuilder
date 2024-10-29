import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setError(null);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Error logging in');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
        fetch('http://localhost:5000/api/getXml')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.users && Array.isArray(data.users)) {
            setUsers(data.users);
          } else {
            setUsers([]);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label>Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Users List</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>First Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Last Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Phone</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Alignment</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Pured</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Length Adjustment</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Brand</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Model</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Shaft</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Clubs</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Lie Adjustment</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.firstName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.lastName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.phone}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.alignment}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.pure}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.adjustment}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.brand}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.model}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.shaft}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.clubs}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.lieangle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
