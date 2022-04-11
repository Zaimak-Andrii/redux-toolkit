import { RootState } from './index';
import { ITodo } from './../models/todo';
import { createSlice, createAsyncThunk, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

//Slice name
const SLICE_NAME = 'todos';

// Тип для данных в Slice
type TodosSliceType = {
  todosList: ITodo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

// Начальное состояние, в котором указаны типы данных
const initialState: TodosSliceType = {
  todosList: [],
  status: 'idle',
  error: null,
};

// Запись ошибки
const setError: CaseReducer<TodosSliceType, PayloadAction<string | null>> = (state, action) => {
  state.status = 'failed';
  state.error = action.payload;
};

// Тип данных для получения списка дел
type FetchTodosType = {
  limit: number;
  page: number;
};
// Получение списка дел от сервера
export const fetchTodos = createAsyncThunk<ITodo[], FetchTodosType, { rejectValue: string }>(`${SLICE_NAME}/fetchTodos`, async ({ limit, page }, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`);

    // Check for response status
    if (!response.ok) throw new Error(`Server error! Status code: ${response.status}`);

    // Inferred return type: Promise<ITodo[]>
    return (await response.json()) as ITodo[];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Toggle todo
export const fetchToggleTodo = createAsyncThunk<void, { id: number }, { rejectValue: string }>(`${SLICE_NAME}/toggleTodo`, async ({ id }, { rejectWithValue, getState, dispatch }) => {
  try {
    // Поиск todo по id в списке дел. Здесь приводим к RootState.
    const state = getState() as RootState;
    // Поиск todo по id, для изменения значения.
    const todo = state.todos.todosList.find((todo: ITodo) => todo.id === id);

    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      // Запрос на изменение флага completed конкретного todo.
      body: JSON.stringify({ completed: !todo?.completed }),
    });

    // Check for response status
    if (!response.ok) throw new Error(`Server error! Method toggleTodo. Status code: ${response.status}`);

    //Вызываем событие для изменения checkBox
    dispatch(toggleComplete({ id }));
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Создание Slice
const todosSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {
    toggleComplete(state, action: PayloadAction<{ id: number }>) {
      const toggledTodo = state.todosList.find((todo: ITodo) => todo.id === action.payload.id);

      //Проверка на существоание todo
      if (!toggledTodo) return;

      toggledTodo.completed = !toggledTodo?.completed;
    },
  },
  extraReducers: {
    //==================FetchTodos=======================
    [fetchTodos.pending.type]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled.type]: (state, action) => {
      state.status = 'succeeded';
      state.todosList = action.payload;
      state.error = null;
    },
    [fetchTodos.rejected.type]: setError,
    //==================FetchToggleTodos==================
    [fetchToggleTodo.rejected.type]: setError,
  },
});
export const { toggleComplete } = todosSlice.actions;

export default todosSlice.reducer;
