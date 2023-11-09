import { SET_PROFILE, SET_MUSIC_PIECES, SET_PRACTICE_DATE_BY_WEEK } from './actions';


export interface IProfileProps {
  email: string;
  profilePicture: string;
  name: string,
  dateOfBirth: string,
  instruments: string[],
  level: string,
}

const initialState: IProfileProps = {
  email: '',
  profilePicture: '',
  name: '',
  dateOfBirth: '',
  instruments: [],
  level: '',
};

export const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...action.payload };
    default:
      return state;
  }
};


export interface IMusicPiecesProps {
  title: string,
  piece: string,
  composer: string;
  instrument: string;
  notes: string,
}

export interface IMusicProps {
  musicPieces: IMusicPiecesProps[]
}

const initialMusicPieceState: IMusicProps = {
  musicPieces: []
};

export const musicPieceReducer = (state = initialMusicPieceState, action: any) => {
  switch (action.type) {
    case SET_MUSIC_PIECES:
      return { ...state, musicPieces: [...action.payload] };
    default:
      return state;
  }
};


export interface IPracticeDataProps {
  id: string;
  title: string;
  piece: string,
  composer: string;
  instrument: string;
  notes: string;
  practiceDate: number;
  duration: number;
  status: string;
}

export interface IPracticeProps {
  weeklyPracticeData: IPracticeDataProps[]
}

const initialPracticeDataState: IPracticeProps = {
  weeklyPracticeData: []
};

export const practiceReducer = (state = initialPracticeDataState, action: any) => {
  switch (action.type) {
    case SET_PRACTICE_DATE_BY_WEEK:
      return { ...state, weeklyPracticeData: [...action.payload] };
    default:
      return state;
  }
};
