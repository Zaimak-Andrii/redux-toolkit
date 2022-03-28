import React, { useEffect, useState } from 'react';

interface IGeo {
  lat: string;
  lng: string;
}

interface IAddress {
  street?: string;
  suit?: string;
  city: string;
  zipcode?: string;
  geo?: IGeo;
}

interface ICompany {
  name: string;
  catchPhrase?: string;
  bs?: string;
}

interface IUser {
  id: number;
  name: string;
  username: string;
  address?: IAddress;
  phone?: string;
  website?: string;
  company?: ICompany;
}

export default function Userspage() {
  const [usersList, setUserList] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data: IUser[] = await response.json();

        setUserList(data);
      } catch (ex) {
        console.log(ex);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Users list:</h1>
      {isLoading ? <h1>Loading...</h1> : ''}
      <ul>
        {usersList.map((user: IUser, index) => {
          return (
            <li key={user.id}>
              {index + 1}. {user.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
