// userDataFunctions.ts
import { db, auth } from '../../config/firebase';
import { setDoc, doc, addDoc, collection } from 'firebase/firestore';
export const addUserData = async (
    userId: string,
    username: string, 
    instruments: string[], 
    level: string,
    dob: string
): Promise<void> => {
    // Add a new document in collection "users"
    try{
        // TODO check if user is authenticated first
        // await setDoc(doc(db, "users", "someusersinfo"), {
        //     userID: userId,
        //     username: username,
        //     instruments: instruments,
        //     level: level,
        //     age: age
        // });

        const docRef = await addDoc(collection(db, "users"), {
                userID: userId,
                username: username,
                instruments: instruments,
                level: level,
                DOB: dob
        });

        console.log("Document written with id: ", docRef.id);
    }
    catch(error){
        console.error("Error adding user: ", error);
    }
    
}