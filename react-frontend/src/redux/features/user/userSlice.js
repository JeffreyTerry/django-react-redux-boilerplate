import { createSlice } from '@reduxjs/toolkit';
import { apiActionFactory } from '../../utils';
import {
  fetchUserFromServer,
} from '../../../api/user/UserAPI';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {}
  },
  reducers: {
    fetchUser(state, action) {
      state.fetchUserError = false;
      state.current = action.payload
    },
    fetchUserFailure(state) {
      state.fetchUserError = true;
    },
  }
})


export const fetchUser = apiActionFactory(
  userSlice.actions.fetchUser,
  fetchUserFromServer,
  userSlice.actions.fetchUserFailure,
  true
);

export default userSlice.reducer;
