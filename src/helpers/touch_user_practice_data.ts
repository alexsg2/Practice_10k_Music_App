/*
 * Helper functions to add/remove/edit/fetch user practice data in Firestore.
 */

import { db } from '../config/firebase';
import { doc, setDoc, deleteDoc, DocumentReference, updateDoc } from 'firebase/firestore';


// TODO : Complete entire file with collection information
export const addPracticeData = async (userId: string, name: string, dob: string,
                                  email: string, instruments: string[], level: string[],
                                  password: string): Promise<void> =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, { userId, name, dob, email, instruments, level, password });
    }
    catch (e) {
        // Handle in main code.
    }
};


export const deletePracticeData = async (userId: string): Promise<void> =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        await deleteDoc(userDocRef);
    }
    catch (e) {
        // Handle in main code
    }
};


export const setPraticeDataField = async (docRef: DocumentReference, field: string, value: any): Promise<void> =>
{
    try {
        await updateDoc(docRef, { [field]: value });
    }
    catch (e) {
        // Handle in main code
    }
};

export const fetchPraticeDataField = async (docRef: DocumentReference, field: string, value: any): Promise<void> =>
{
    try {
        // TODO : write logic to fetch data
        // await (docRef, { [field]: value });
    }
    catch (e) {
        // Handle in main code
    }
};
