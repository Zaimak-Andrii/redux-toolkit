import { IUser } from './../pages/Userspage';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

const SLICE_NAME: string = 'users';

// Тип для данных в Slice
type UserSliceType = {
  usersList: IUser[];
};

// Начальное состояние, в котором указаны типы данных
const initialState: UserSliceType = {
  usersList: [],
};

/**  ОбЪявление функции по записи пользователей (полученных с сервера) в список пользователей
 * Для типизирования параметров в функии используется CaseReducer с дженериком где
 * - первый параметр это тип state (тип initialState)
 * - второй параметр это action.payload c типом получаемых данных (PayloadAction<тип_данных>)
 */
/*
const addUsers: CaseReducer<UserSliceType, PayloadAction<IUser[]>> = (state, action) => {
  state.usersList = action.payload;
};*/

const usersSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {
    // Объявление функции внутри
    addUsers(state, action: PayloadAction<IUser[]>) {
      // Запись списка пользователей, полученных от сервера, в переменную UsersList
      state.usersList = action.payload;
    },
    //addUsers,
  },
});

export const { addUsers } = usersSlice.actions;

export default usersSlice.reducer;
