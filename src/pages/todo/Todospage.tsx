import { LinearProgress, Pagination, PaginationItem } from '@mui/material';
import axios from 'axios';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomPagination from '../../components/pagination/pagination';
import './style.scss';
import TodoItem from './TodoItem';

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Todospage: FunctionComponent = () => {
  const MAX_TODOS_COUNT = 200;
  const TODOS_LIMIT = 20;
  // Получение параметров из строки запроса
  const pageParams = useParams();

  const [todosList, setTodosList] = useState<ITodo[]>([]);
  const [pagesCount, setPageCount] = useState<number>(0);
  const [page, setPage] = useState<number>(Number(pageParams?.page || 1));

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        {todosList.map((todo: ITodo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>

      {pagesCount > 0 && <CustomPagination className={'pagination'} pagesCount={pagesCount} page={page} setPage={setPage} />}
    </div>
  );
};

export default Todospage;
