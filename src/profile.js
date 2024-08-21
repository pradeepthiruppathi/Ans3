import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    gender: '',
    count: 0,
    lastLoginDate: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile');
        setUser(res.data);
      } catch (err) {
        console.error(err.response.data);
        // handle error
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Gender:</strong> {user.gender}
      </div>
      <div>
        <strong>Login Count:</strong> {user.count}
      </div>
      <div>
        <strong>Last Login Date:</strong> {user.lastLoginDate}
      </div>
    </div>
  );
};

export default Profile;
