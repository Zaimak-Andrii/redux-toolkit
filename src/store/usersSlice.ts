import { IUser } from './../models/user';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const SLICE_NAME: string = 'users';

// Тип для данных в Slice
type UserSliceType = {
  usersList: IUser[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

// Начальное состояние, в котором указаны типы данных
const initialState: UserSliceType = {
  usersList: [],
  status: 'idle',
  error: null,
};

// Функция получения пользователей от сервера
export const fetchUsers = createAsyncThunk(
  // Action name
  `${SLICE_NAME}/fetchUsers`,
  // Declare the type your function argument here:
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      // Check for response status
      if (!response.ok) throw new Error('Server error!');

      // Inferred return type: Promise<IUser>
      return (await response.json()) as IUser[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const usersSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {
    // Объявление функции внутри
    addUser(state, action: PayloadAction<IUser>) {
      // Запись списка пользователя, полученного от сервера, в переменную UsersList
      state.usersList.push(action.payload);
    },
  },
  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.status = 'succeeded';
      state.usersList = action.payload;
      state.error = null;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
