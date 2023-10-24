/*
 * Helper functions to add/update/remove user data in Firestore.
 */


import { db } from '../config/firebase';
import { doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

import { IProfileProps } from "../redux/reducers"
interface IUserDataProps extends Omit<IProfileProps, 'password' | 'profilePicture'> {
    userId: string;
}


export const addUserData = async ({userId, name, dateOfBirth, instruments, level, email}:IUserDataProps): Promise<void> =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, {userID: userId, name, dateOfBirth, instruments, level, email});
    }
    catch (e) {
        // Handle in main code.
    }
};


// TODO : not updating db
export const updateUserData = async ({userId, name, dateOfBirth, instruments, level, email}:IUserDataProps): Promise<void> =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {name: name, dateOfBirth: dateOfBirth, instruments: instruments, level: level, email: email});
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
