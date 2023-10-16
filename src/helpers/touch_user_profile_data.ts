/*
 * Helper functions to add/remove/edit user data in Firestore.
 */

import { db } from '../config/firebase';
import { doc, setDoc, deleteDoc, DocumentReference, updateDoc } from 'firebase/firestore';


export const addUserData = async (userId: string, name: string, dob: string,
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


export const deleteUserData = async (userId: string): Promise<void> =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        await deleteDoc(userDocRef);
    }
    catch (e) {
        // Handle in main code
    }
};


export const setUserDataField = async (docRef: DocumentReference, field: string, value: any): Promise<void> =>
{
    try {
        await updateDoc(docRef, { [field]: value });
    }
    catch (e) {
        // Handle in main code
    }
};
