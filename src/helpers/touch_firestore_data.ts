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
        console.log("not adding user account to firebase, because of: " + e);
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
        console.log("not updating user profile in firebase, because of: " + e);
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
        console.log("not deleting user account in firebase, because of: " + e);
        // Handle rest in main code
    }
};



export const addPracticeData = async (userId: string, title: string, piece: string, composer: string, instrument: string, practiceDate: Date, notes: string) =>
{
    try {
        const userDocRef = doc(db, 'users', userId);
        const practiceCollection = collection(userDocRef, 'practiceData');
        await setDoc(doc(practiceCollection), { title, piece, composer, instrument, practiceDate, duration: 0, status: 'Not Started', notes });
    }
    catch (e) {
        console.log("not adding practice data, because of: " + e);
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
    catch (e) {
        console.log("not getting practice data (by date), because of: " + e);
        // Handle rest in main code
    }
}


export const getPracticePiecesAndHoursByDate = async (userId: string, dateStart: Date, dateEnd: Date) => 
{
    const userDocRef = doc(db, 'users', userId);
    const practiceCollection = collection(userDocRef, 'practiceData');
    const practiceQuery = query(practiceCollection, where('practiceDate', ">=", dateStart), where('practiceDate', '<=', dateEnd));

    let hours = 0;
    let pieces = 0;
    try {
        const querySnap = await getDocs(practiceQuery);
        querySnap.forEach((doc) => { const practiceData = doc.data();
                                     hours += practiceData.duration;
                                     if (practiceData.status !== 'Not Started') {
                                         pieces += 1;
                                     }
        });
        return [pieces, hours];
    }
    catch (e) {
        console.log("not getting total practice hours/pieces (of Started Plans) by date, because of: " + e);
        // Handle rest in main code
        return [pieces, hours];
    }
}


// TODO: THIS FUNCTION HAS NOT YET BEEN TESTED !!!!
export const getMostPracticedComposersByDate = async (userId: string, dateStart: Date, dateEnd: Date) => 
{
    const userDocRef = doc(db, 'users', userId);
    const practiceCollection = collection(userDocRef, 'practiceData');
    const practiceQuery = query(practiceCollection, where('practiceDate', ">=", dateStart), where('practiceDate', '<=', dateEnd));

    try {
        const querySnap = await getDocs(practiceQuery);

        const composersMap = new Map<string, number>();
        querySnap.forEach((doc) => { const practiceData = doc.data();
                                     if (practiceData.status !== 'Not Yet Started') {
                                         const composer = practiceData.composer;
                                         if (composersMap.has(composer)) {
                                             composersMap.set(composer, composersMap.get(composer) + practiceData.duration);
                                         }
                                         else {
                                             composersMap.set(composer, practiceData.duration);
                                         }
                                     }
        });
        const sortedComposers = Array.from(composersMap, ([composer, hours]) => ({ composer, hours })).sort((a, b) => b.hours - a.hours);

        return sortedComposers.slice(0, 5);
    }
    catch (e) {
        console.log("not getting most practiced composers (of Started Plans) by date, because of: " + e);
        // Handle rest in main code
        return [];
    }
}


export const updatePracticeDataByFields = async (userId: string, practiceId: string, updatedFields: Record<string, any>) => {
    const practiceDataRef = doc(db, 'users', userId, "practiceData", practiceId);
    try {
        await setDoc(practiceDataRef, updatedFields, { merge: true });
    }
    catch (e) {
        console.log("not updating practice data fields, because of: " + e);
        // Handle rest in main code
    }
}


export const updateEntirePracticeData = async (userId: string, practiceId: string, title: string, piece: string, composer: string, instrument: string, practiceDate: Date, duration: number, status: string, notes: string) => {
    const updates = { title, piece, composer, instrument, practiceDate, duration, status, notes };
    try {
        await updatePracticeDataByFields(userId, practiceId, updates);
    }
    catch (e) {
        console.log("not updating entire practice data, because of: " + e);
        // Handle rest in main code
    }
}


export const deletePracticeData = async (userId: string, practiceId: string) => {
    const practiceDataRef = doc(db, 'users', userId, "practiceData", practiceId);
    try {
        await deleteDoc(practiceDataRef);
    }
    catch (e) {
        console.log("not deleting practice data, because of: " + e);
        // Handle rest in main code
    }
}
