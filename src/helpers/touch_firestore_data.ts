/*
 * Helper functions to add/update/remove data in Firestore related to the user.
 */

import { db } from '../config/firebase';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';


import { IProfileProps } from "../redux/reducers"
interface IUserDataProps extends Omit<IProfileProps, 'profilePicture'> {
    userId: string;
}

export const addUserAccount = async ({ userId, name, dateOfBirth, instruments, level }: IUserDataProps): Promise<void> =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, { userId, name, dateOfBirth, instruments, level });
        
        const practiceCollection = collection(userDocRef, 'practiceData');
        await setDoc(doc(practiceCollection, 'placeholder'), {});   // creates subcollection within user collection
    }
    catch (e) {
        console.log("not adding user, because of: " + e);
        // Handle rest in main code.
    }
};


export const updateUserProfile = async ({ userId, name, dateOfBirth, instruments, level }: IUserDataProps): Promise<void> =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, { name, dateOfBirth, instruments, level }, { merge: true });
    }
    catch (e) {
        console.log("not updating user, because of: " + e);
        // Handle rest in main code.
    }
};


export const deleteUserAccount = async (userId: string): Promise<void> =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        const practiceQuerySnapshot = await getDocs(collection(userDocRef, 'practiceData'));
        practiceQuerySnapshot.forEach((doc) => { deleteDoc(doc.ref); });
        await deleteDoc(userDocRef);
    }
    catch (e) {
        console.log("not deleting user, because of: " + e);
        // Handle rest in main code
    }
};



export const addPracticeData = async (userId: string, title: string, piece: string, composer: string, duration: number, notes: string) =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        const practiceCollection = collection(userDocRef, 'practiceData');
        // TODO : find a way to add practice data here
    }
    catch (e) {
        console.log("not adding practice, because of: " + e);
        // Handle rest in main code
    }
};


// TODO : create a function to --> fetch practice data by date range, update pratice data and delete practice data
