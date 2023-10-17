// Types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_USER_FIELDS = 'SET_USER_FIELDS'

/*
Actions
Actions are dispatched (in the react components.
They all have types but they can also have a payload like this
The amount parameter would be passed in in the react component
and could be used to update the count variable by that amount
export const increment = (amount) => ({
  type: INCREMENT,
  payload: amount,
});
*/
export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

interface setUserFieldsProps {
  name: string,
  dateOfBirth: string,
  instruments: string[],
  level: string[],
  email: string,
  password: string,
};

export const setUserFields = (payload: setUserFieldsProps) => ({
  type: SET_USER_FIELDS,
  payload
});

