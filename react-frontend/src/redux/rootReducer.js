import { combineReducers } from 'redux';
import userReducer from './features/user/userSlice';

const appReducer = combineReducers({
  user: userReducer,
  // Add more reducers here as necessary (e.g. teachers, etc...)
});

// Dispatch this action when logging out, etc... in order to clear the Redux store.
const CLEAR_REDUX_STORE_ACTION = { type: 'CLEAR_REDUX_STORE' };

const rootReducer = (state, action) => {
  if (action.type === CLEAR_REDUX_STORE_ACTION.type) {
    state = undefined;
  }

  return appReducer(state, action);
}

export const clearReduxStore = () => (CLEAR_REDUX_STORE_ACTION);
export default rootReducer;