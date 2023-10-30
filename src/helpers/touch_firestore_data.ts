/*
 * Helper functions to add/update/remove data in Firestore related to the user.
 */

import { db } from '../config/firebase';
import { doc, setDoc, collection, getDocs, deleteDoc, query, where, and, updateDoc } from 'firebase/firestore';


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
        await setDoc(userDocRef, { userId, name, dateOfBirth, instruments, level }, { merge: true });
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



export const addPracticeData = async (userId: string, title: string, piece: string, composer: string, date: Date, duration: number, notes: string) =>
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
export const getPracticeData = async (userId: string, dateStart: Date, dateEnd:Date) => 
{
    const q = query(collection(db, 'users', userId, 'practiceLogs'), and(where('date', ">=", dateStart), where('date', '<=', dateEnd)));
    try{
        // query practiceLog collection to get practice logs by date range given
        // TODO this should have the practice logs of the user by the date
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    }
    catch(e){
        console.log("something went wrong getting the practice. error: " + e);
    }
}

export const updatePracticeData = async (userId: string, practiceLogId: string, data: any) => {
    const practiceLogRef = doc(db, userId, "practiceLogs", practiceLogId);
    try{
        await updateDoc(practiceLogRef, data);
    }
    catch(e){
        console.log("something went wrong with updating. error: " + e);
    }
}

export const deletePracticeData = async (userId: string, practiceLogId: string) => {
    const practiceLogRef = doc(db, userId, "practiceLogs", practiceLogId);
    try{
        await deleteDoc(practiceLogRef);
    }
    catch(e){
        console.log("something went wrong with deleting. error: " + e);
    }
}