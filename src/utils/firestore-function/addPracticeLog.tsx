// userDataFunctions.ts
import { db, auth } from '../../config/firebase';
import { setDoc, doc } from 'firebase/firestore';
export const addPracticeLog = async (
    userId: string,
    musicId: string,
    note: string, 
    instrument: string, 
    duration: number
): Promise<void> => {
    // Add a new document in collection "users"
    try{
        // TODO check if user is authenticated first
        await setDoc(doc(db, "practiceLog"), {
            userID: userId,
            musicID: musicId,
            instrument: instrument,
            duration: duration,
            note: note
        });
    }
    catch(error){
        console.error("Error adding user: ", error);
    }
    
}