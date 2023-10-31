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
        // Handle rest in main code
    }
};



export const addPracticeData = async (userId: string, title: string, piece: string, composer: string, practiceDate: Date, notes: string) =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        const practiceCollection = collection(userDocRef, 'practiceData');
        await setDoc(doc(practiceCollection), { title, piece, composer, practiceDate, duration: 0, status: "Not Yet Started", notes });
    }
    catch (e: any) {
        console.log("not adding practice, because of: " + e.message);
        // Handle rest in main code
    }
};


export const getPracticeDataByDate = async (userId: string, dateStart: Date, dateEnd: Date) => 
{
    const userDocRef = doc(db, 'users', userId);
    const practiceCollection = collection(userDocRef, 'practiceData');
    const practiceQuery = query(practiceCollection, where('practiceDate', ">=", dateStart), where('practiceDate', '<=', dateEnd));
    try {
        const querySnap = await getDocs(practiceQuery);
        const practiceData: any[] = [];
        querySnap.forEach((doc) => { practiceData.push({ id: doc.id, ...doc.data() }); });
        return practiceData;
    }
    catch (e: any) {
        console.log("not getting practice by date, because of: " + e.message);
        // Handle rest in main code
    }
}


export const updatePracticeData = async (userId: string, practiceId: string, title: string, piece: string, composer: string, practiceDate: Date, duration: number, status: string, notes: string) => {
    const practiceDataRef = doc(db, 'users', userId, "practiceData", practiceId);
    try {
        await setDoc(practiceDataRef, { title, piece, composer, practiceDate, duration, status, notes }, { merge: true });
    }
    catch (e: any) {
        console.log("not updating practice, because of: " + e.message);
        // Handle rest in main code
    }
}


export const deletePracticeData = async (userId: string, practiceId: string) => {
    const practiceDataRef = doc(db, 'users', userId, "practiceData", practiceId);
    try {
        await deleteDoc(practiceDataRef);
    }
    catch (e: any) {
        console.log("not deleting practice, because of: " + e.message);
        // Handle rest in main code
    }
}
