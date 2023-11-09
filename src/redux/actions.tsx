import { IProfileProps, IMusicPiecesProps, IPracticeDataProps } from './reducers'

// Types
export const SET_PROFILE = 'SET_PROFILE';
export const SET_MUSIC_PIECES = 'SET_MUSIC_PIECES';
export const SET_PRACTICE_DATE_BY_WEEK = "SET_PRACTICE_DATE_BY_WEEK";

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
export const setProfile = (payload: IProfileProps) => ({
  type: SET_PROFILE,
  payload,
});

export const setMusicPieces = (payload: IMusicPiecesProps[]) => ({
  type: SET_MUSIC_PIECES,
  payload,
});

export const setPracticeData = (payload: IPracticeDataProps[]) => ({
  type: SET_PRACTICE_DATE_BY_WEEK,
  payload,
});
