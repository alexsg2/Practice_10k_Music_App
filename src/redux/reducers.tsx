import { SET_PROFILE } from './actions';

export interface IProfileProps {
  name: string,
  profilePicture: string,
  dateOfBirth: string,
  instruments: string[],
  level: string[],
  email: string,
  password: string,
}
const initialState: IProfileProps = {
  name: '',
  profilePicture: '',
  dateOfBirth: '',
  instruments: [],
  level: [],
  email: '',
  password: '',
};

/*
This is where the store (global object) gets updated
When an action is dispatched it ends up here at the reducer.
The reducer checks the type of the action and does the updating to the store.
*/
export const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...action.payload };
    default:
      return state;
  }
};
