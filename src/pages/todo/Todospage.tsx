import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.scss';

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function Todospage() {
  const MAX_TODOS_COUNT = 200;
  const TODOS_LIMIT = 20;
  const [todosList, setTodosList] = useState<ITodo[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${TODOS_LIMIT}`);

        setTodosList(result.data);
        console.log(result.data);
      } catch (ex) {
        console.log(ex);
      } finally {
      }
    };

    fetchData();
  }, [page]);

  return (
    <div>
      <h1>Todos list:</h1>
      <ul>
        {todosList.map((todo: ITodo) => {
          return (
            <li key={todo.id} className={todo.completed ? 'checked' : ''}>
              {todo.id}. {todo.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
