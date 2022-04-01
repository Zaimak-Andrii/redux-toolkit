import { LinearProgress } from '@mui/material';
import React, { useEffect } from 'react';
import UsersList from '../../components/users/usersList';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { useAppSelector } from '../../hook/useAppSelector';
import { fetchUsers } from '../../store/usersSlice';

export default function Userspage() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Users list:</h1>
      {status === 'loading' && <LinearProgress />}
      {error && <h2>An error occured: {error}</h2>}

      <UsersList />
    </div>
  );
}
