import React, { FunctionComponent } from 'react';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { ITodo } from '../../models/todo';
import { fetchToggleTodo } from '../../store/todosSlice';
import './style.scss';

const TodoItem: FunctionComponent<ITodo> = ({ id, completed, title }) => {
  const dispatch = useAppDispatch();

  return (
    <li key={id} className={completed ? 'checked' : ''}>
      <input type={'checkbox'} checked={completed} onChange={() => dispatch(fetchToggleTodo({ id }))} />
      {id}. {title}
    </li>
  );
};

export default TodoItem;
