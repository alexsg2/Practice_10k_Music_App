import { INCREMENT, DECREMENT } from './actions';

const counterInitialState = {
  count: 0,
};

/*
This is where the store (global object) gets updated
When an action is dispatched it ends up here at the reducer.
The reducer checks the type of the action and does the updating to the store.
*/
const counterReducer = (state = counterInitialState, action: any) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// const profileInitialState = {
//   name: "",
//   dateOfBirth: "",
//   instruments: [],
//   level: [],
//   email: "",
//   password: "",
// };

// const profileReducer = (state = profileInitialState, action: any) => {
//   switch (action.type) {
//     case SET_USER_FIELDS:
//       return { ...state,  ...action.payload };
//     default:
//       return state;
//   }
// };

export default counterReducer;
