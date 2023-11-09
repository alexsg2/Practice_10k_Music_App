import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { profileReducer, musicPieceReducer, practiceReducer } from './reducers';

const logger = createLogger({
  collapsed: () => true,
});

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    profile: profileReducer,
    music: musicPieceReducer,
    practice: practiceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
