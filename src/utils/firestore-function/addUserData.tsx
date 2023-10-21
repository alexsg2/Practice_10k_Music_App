// userDataFunctions.ts
import { db, auth } from '../../config/firebase';
import { setDoc, doc, addDoc, collection } from 'firebase/firestore';
import { IProfileProps } from "../../redux/reducers"

interface IUserDataProps extends Omit<IProfileProps, 'password'> {
    userId: string;
}

export const addUserData = async ({userId, name, instruments, level, dateOfBirth, email, profilePicture}:IUserDataProps): Promise<void> => {
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
        const userDocRef = doc(db, "users", userId);
        await setDoc(userDocRef, {
            userID: userId,
            name,
            instruments: instruments,
            level: level,
            dateOfBirth,
            email,
            profilePicture
        });

        console.log("Document written with id: ", userDocRef.id);
    }
    catch(error){
        console.error("Error adding user: ", error);
    }
    
}
