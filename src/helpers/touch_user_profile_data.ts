/*
 * Helper functions to add/remove/edit user data in Firestore.
 */

import { db } from '../config/firebase';
import { doc, setDoc, deleteDoc, DocumentReference, updateDoc, getDoc } from 'firebase/firestore';


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


export const saveUserData = async (userId: string, name: string, dob: string,
                                   email: string, instruments: string[], level: string[],
                                   password: string): Promise<void> =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, { userId, name, dob, email, instruments, level, password });
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


export const fetchUserData = async (userId: string, field: string): Promise<any> =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const fieldValue = userData[field];
            return fieldValue;
        }
        else {
            return null;
        }
    }
    catch (e) {
        // Handle in main code
    }
};


export const setUserDataField = async (userId: string, field: string, value: any): Promise<void> =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, { [field]: value });
    }
    catch (e) {
        // Handle in main code
    }
};
