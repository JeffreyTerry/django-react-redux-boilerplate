import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage,
}

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer)
});

// The persistStore makes it so that the Redux store persists
// between page reloads, etc...
export const persistor = persistStore(store);

// The root `state` object is structured like so: 
// {
//     users: {
//         users: {
//             fetchUserError: false,
//             current: {...}
//         },
//         teachers: {
//             all: []
//         },
//         etc...
//     }
// }