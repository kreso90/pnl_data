'use client';
import Loader from '@/components/Loader';
import useAuth from '@/hooks/useAuth';
import React from 'react'

export default function Dashboard() {
  const { logout, user, loading } = useAuth();

  return (
    <>
    {!loading ? 
    <>
      <div>Dashboard {user?.name}</div>
      <button onClick={logout}>Logout</button>
    </> : <Loader/>}
    </>
  )
}
