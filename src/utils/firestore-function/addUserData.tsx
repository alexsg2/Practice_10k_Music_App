// userDataFunctions.ts
import { db, auth } from '../../config/firebase';
import { setDoc, doc } from 'firebase/firestore';
export const addUserData = async (
    userId: string,
    username: string, 
    instruments: string[], 
    level: string, 
    age: number
): Promise<void> => {
    // Add a new document in collection "users"
    try{
        // TODO check if user is authenticated first
        await setDoc(doc(db, "users"), {
            userID: userId,
            username: username,
            instruments: instruments,
            level: level,
            age: age
        });
    }
    catch(error){
        console.error("Error adding user: ", error);
    }
    
}