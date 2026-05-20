import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser({ email, password }));
    if (res.error) {
      alert('Login failed');
      return;
    }
    navigate('/');
  };

  return (
    <div
      className="card p-4 align-content-center"
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: '#bebec5'
      }}
    >
      <div className="mb-3 text-center">
        <h2>Login</h2>
      </div>
      <hr />
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abccdefg@ramito.com"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
