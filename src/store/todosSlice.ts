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
// Тип данных для получения списка дел
type FetchTodosType = {
  limit: number;
  page: number;
};

const setError: CaseReducer<TodosSliceType, PayloadAction<string | null>> = (state, action) => {
  state.status = 'failed';
  state.error = action.payload;
};

// Получение списка дел от сервера
export const fetchTodos = createAsyncThunk<ITodo[], FetchTodosType, { rejectValue: string }>(`${SLICE_NAME}/fetchTodos`, async ({ limit, page }, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos1?_page=${page}&_limit=${limit}`);

    // Check for response status
    if (!response.ok) throw new Error(`Server error! Status code: ${response.status}`);

    // Inferred return type: Promise<ITodo[]>
    return (await response.json()) as ITodo[];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Создание Slice
const todosSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {},
  extraReducers: {
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
  },
});

export default todosSlice.reducer;
