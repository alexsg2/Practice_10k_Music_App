import { Timestamp } from 'firebase/firestore';
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


export interface IMusicPiecesProps {
  composer: string;
  instrument: string[];
  note: string,
  piece: string,
  title: string,
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
      return {...state, musicPieces: [...action.payload] };
    default:
      return state;
  }
};


export interface IPracticeDataProps {
  composer: string;
  duration: number;
  id: string;
  instrument: string[];
  note: string,
  piece: string,
  practiceDate: Timestamp;
  status: "Not Started" | "Started" | "Completed";
  title: string;
}

export interface IPracticeProps {
  currentWeekPracticeData: IPracticeDataProps[]
}

function serializeTimestamp(timestamp: { seconds: number, nanoseconds: number }): string {
  return new Date(timestamp.seconds * 1000).toISOString();
}


const initialPracticeDataState: IPracticeProps = {
  currentWeekPracticeData: []
};

export const practiceReducer = (state = initialPracticeDataState, action: any) => {
  switch (action.type) {
    case SET_PRACTICE_DATE_BY_WEEK:
      const serializedPayload = action.payload.map((item: IPracticeDataProps) => {
        if (item.practiceDate && item.practiceDate?.seconds !== undefined) {
          return { ...item, practiceDate: serializeTimestamp(item.practiceDate) };
        }
        return item;
      });
      
      return { ...state, currentWeekPracticeData: serializedPayload };
    default:
      return state;
  }
};

