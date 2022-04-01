import React, { FunctionComponent } from 'react';
import { IUser } from '../../models/user';

type UserItemProps = {
  index: number;
  user: IUser;
};

const UserItem: FunctionComponent<UserItemProps> = ({ user: { id, name }, index }) => {
  return (
    <li key={id}>
      {index}. {name}
    </li>
  );
};

export default UserItem;
