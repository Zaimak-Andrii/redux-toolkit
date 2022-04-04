import { LinearProgress } from '@mui/material';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomPagination from '../../components/pagination/pagination';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { useAppSelector } from '../../hook/useAppSelector';
import { fetchTodos } from '../../store/todosSlice';
import './style.scss';
import TodosList from '../../components/todos/todosList';

const Todospage: FunctionComponent = () => {
  // Максивальное количество постов
  const MAX_TODOS_COUNT = 200;
  // Лимит загрузки постов
  const TODOS_LIMIT = 20;
  // Получение параметров из строки запроса
  const pageParams = useParams();

  // Работа со store
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.todos);

  // Страница
  const [page, setPage] = useState<number>(Number(pageParams?.page || 1));
  // Вычисление количества страниц
  const pagesCount = useMemo<number>(() => Math.ceil(MAX_TODOS_COUNT / TODOS_LIMIT), [MAX_TODOS_COUNT]);

  useEffect(() => {
    dispatch(fetchTodos({ limit: TODOS_LIMIT, page: page }));
  }, [page, dispatch]);

  return (
    <div className='todos'>
      <h1>Todos list:</h1>

      {status === 'loading' && <LinearProgress />}
      {error && <h2>An error occured: {error}</h2>}

      <TodosList />

      {pagesCount > 0 && <CustomPagination className={'pagination'} pagesCount={pagesCount} page={page} setPage={setPage} />}
    </div>
  );
};

export default Todospage;
