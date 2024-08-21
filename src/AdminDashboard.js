import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/admin/users');
        setUsers(res.data);

        // Prepare data for the chart
        const dates = res.data.map(user => user.lastLoginDate.split('T')[0]);
        const counts = res.data.map(user => user.count);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'User Login Counts',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      } catch (err) {
        console.error(err.response.data);
        // handle error
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="user-list">
        <h2>Registered Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Count</th>
              <th>Last Login Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.count}</td>
                <td>{user.lastLoginDate.split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="chart-container">
        <h2>User Login Count Over Time</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
