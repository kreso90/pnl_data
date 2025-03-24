'use client';
import useAuth from '@/hooks/useAuth';
import React from 'react'

export default function Dashboard() {
  const { logout, user } = useAuth();
  
  return (
    <>
    {user ? <div>Loading...</div> : <div>Dashboard</div>}
    <button onClick={logout}>Logout</button>
    </>
  )
}
