import { SET_PROFILE } from './actions';


export interface IProfileProps {
  profilePicture: string | number | null;
  name: string,
  dateOfBirth: string,
  instruments: string[],
  level: string,
}

const initialState: IProfileProps = {
  profilePicture: null,
  name: '',
  dateOfBirth: '',
  instruments: [],
  level: '',
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
