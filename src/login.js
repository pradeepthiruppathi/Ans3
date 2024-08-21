import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', formData);
      console.log(res.data);
      // handle success (e.g., redirect to profile page)
      if (res.data.isAdmin) {
        history.push('/admin-dashboard');
      } else {
        history.push('/profile');
      }
    } catch (err) {
      console.error(err.response.data);
      // handle error
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
