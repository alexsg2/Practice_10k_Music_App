import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { profileReducer, IProfileProps } from './reducers';

const logger = createLogger({
  collapsed: () => true,
});

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
