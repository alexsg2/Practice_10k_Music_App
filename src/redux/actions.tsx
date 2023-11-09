import { IProfileProps, IMusicPiecesProps, IPracticeDataProps } from './reducers'


export const SET_PROFILE = 'SET_PROFILE';

export const setProfile = (payload: IProfileProps) => ({
  type: SET_PROFILE,
  payload,
});


export const SET_MUSIC_PIECES = 'SET_MUSIC_PIECES';

export const setMusicPieces = (payload: IMusicPiecesProps[]) => ({
  type: SET_MUSIC_PIECES,
  payload,
});


export const SET_PRACTICE_DATE_BY_WEEK = "SET_PRACTICE_DATE_BY_WEEK";

export const setPracticeData = (payload: IPracticeDataProps[]) => ({
  type: SET_PRACTICE_DATE_BY_WEEK,
  payload,
});
