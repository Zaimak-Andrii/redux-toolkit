import { FunctionComponent } from 'react';
import { useAppSelector } from '../../hook/useAppSelector';
import { ITodo } from '../../models/todo';
import TodoItem from './TodoItem';

const TodosList: FunctionComponent = () => {
  const { todosList } = useAppSelector((state) => state.todos);

  return (
    <ul>
      {todosList.map((todo: ITodo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodosList;
