import React, { FunctionComponent } from 'react';
import { useAppSelector } from '../../hook/useAppSelector';
import { IUser } from '../../models/user';
import UserItem from './UserItem';

const UsersList: FunctionComponent = () => {
  const { usersList } = useAppSelector((state) => state.users);

  return (
    <>
      <ul>
        {usersList.map((user: IUser, index) => {
          return <UserItem key={user.id} user={user} index={index + 1} />;
        })}
      </ul>
    </>
  );
};

export default UsersList;
