import configureStore from 'redux';
import counterReducer from './reducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
