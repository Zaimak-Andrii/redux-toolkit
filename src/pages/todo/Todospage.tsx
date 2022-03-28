import { LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomPagination from '../../components/pagination/pagination';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagesCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await axios(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${TODOS_LIMIT}`);

        setTodosList(result.data);
      } catch (ex) {
        console.log(ex);
      } finally {
        setPageCount(Math.ceil(MAX_TODOS_COUNT / TODOS_LIMIT));
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className='todos'>
      <h1>Todos list:</h1>

      {isLoading ? <LinearProgress /> : ''}

      <ul>
        {todosList.map((todo: ITodo) => {
          return (
            <li key={todo.id} className={todo.completed ? 'checked' : ''}>
              {todo.id}. {todo.title}
            </li>
          );
        })}
      </ul>

      {pagesCount > 0 && <CustomPagination className={'pagination'} pagesCount={pagesCount} page={page} setPage={setPage} />}
    </div>
  );
}
