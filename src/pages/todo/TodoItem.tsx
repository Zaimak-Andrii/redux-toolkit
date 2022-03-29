import React, { FunctionComponent } from 'react';
import { ITodo } from './Todospage';

const TodoItem: FunctionComponent<ITodo> = ({ id, completed, title, userId }) => {
  return (
    <li key={id} className={completed ? 'checked' : ''}>
      {id}. {title}
    </li>
  );
};

export default TodoItem;
