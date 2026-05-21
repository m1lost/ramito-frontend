import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying email...');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setMessage('Invalid verification link');
      return;
    }

    const verifyEmail = async () => {
      try {
        await api.get(`/auth/verify-email?token=${token}`);
        setMessage('Email verified successfully');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Verification failed');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div
      className="card p-4 text-center"
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        backgroundColor: '#bebec5'
      }}
    >
      <h2>Email Verification</h2>
      <hr />
      <p>{message}</p>
    </div>
  );
}
