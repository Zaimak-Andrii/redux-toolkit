import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { ITodo } from '../../models/todo';
import './style.scss';

const TodoItem: FunctionComponent<ITodo> = ({ id, completed, title }) => {
  const [isChecked, setIsChecked] = useState(completed);
  const toggleHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setIsChecked((prev) => !prev);
  };
  return (
    <li key={id} className={isChecked ? 'checked' : ''}>
      <input type={'checkbox'} checked={isChecked} onChange={toggleHandler} />
      {id}. {title}
    </li>
  );
};

export default TodoItem;
