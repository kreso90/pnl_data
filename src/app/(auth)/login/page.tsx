'use client';
import useAuth from '@/hooks/useAuth';
import React, { useState } from 'react'

export default function LoginPage() {
  
  const { login, error } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    login(email, password);
  };

  return (
    <div className="main">
      <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="m-bottom-20">
              <label htmlFor="name">Username</label>
              <input type="text" id="name" value={email} onChange={(e) => (setEmail(e.target.value))}/>
          </div>
          <div className="m-bottom-30">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => (setPassword(e.target.value))}/>
          </div>
          <button type="submit">Login to dashboard</button>
          {error && <p>{error}</p>}
      </form>
    </div>
  )
}
