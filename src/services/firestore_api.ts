import { getAuth } from 'firebase/auth';
import { db } from '../config/firebase';
import { doc, setDoc, getDocs, collection, deleteDoc, query, where } from 'firebase/firestore';


import { STATUS } from '../assets/constants';
import { IProfileProps } from '../redux/reducers';
interface IUserDataProps extends Omit<IProfileProps, 'profilePicture'> {}

// TODO : Implement in redux to make fetching practice data for the week (and today)
//        easier!! --> Bailey
// import { IPracticeProps } from '../redux/reducers';
// interface IPracticeDataProps {
//     practiceId: string;
// }

const auth = getAuth();


export const FirestoreAPI =
{
    async addUserProfile({ email, name, dateOfBirth, instruments, level }: IUserDataProps)
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            return await setDoc(userDocRef, { email, name, dateOfBirth, instruments, level });
        }
        else {
            throw new Error('User is not undefined. Cannot add user profile.');
        }
    },

    async updateUserProfile({ email, name, dateOfBirth, instruments, level }: IUserDataProps)
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            return await setDoc(userDocRef, { email, name, dateOfBirth, instruments, level }, { merge: true });
        }
        else {
            throw new Error('User is undefined. Cannot update user profile.');
        }
    },

    async deleteUserProfile()
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const practiceSnap = await getDocs(collection(userDocRef, 'practiceData'));
            practiceSnap.forEach((doc) => { deleteDoc(doc.ref); });
            const musicSnap = await getDocs(collection(userDocRef, 'musicPieces'));
            musicSnap.forEach((doc) => { deleteDoc(doc.ref); });
            return await deleteDoc(userDocRef);
        }
        else {
            throw new Error('User is undefined. Cannot delete user profile.');
        }
    },


    async saveMusicPiece(title: string, piece: string, composer: string, instrument: string, notes: string)
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const musicCol = collection(userDocRef, 'musicPieces');
            const musicQuery = await query(musicCol, where('title', '==', title),
                                                     where('piece', '==', piece),
                                                     where('composer', '==', composer),
                                                     where('instrument', '==', instrument),
                                                     where('notes', '==', notes))
            const querySnap = await getDocs(musicQuery);
            if (querySnap.empty) {
                return await setDoc(doc(musicCol), { title, piece, composer, instrument, notes });
            }
        }
        else {
            throw new Error('User is undefined. Cannot save music piece.');
        }
    },

    async getAllMusicPieces()
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const musicCol = collection(userDocRef, 'musicPieces');
            const querySnap = await getDocs(musicCol);
            const musicData: any[] = [];
            querySnap.forEach((doc) => { musicData.push({ id: doc.id, ...doc.data() }); });
            return musicData;
        }
        else {
            throw new Error('User is undefined. Cannot get music pieces.');
        }
    },


    async addPracticeData(title: string, piece: string, composer: string, instrument: string, practiceDate: Date, notes: string)
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const practiceCol = collection(userDocRef, 'practiceData');
            await setDoc(doc(practiceCol), { title, piece, composer, instrument, practiceDate, duration: 0, status: STATUS[0], notes });
            return await this.saveMusicPiece(title, piece, composer, instrument, notes);
        }
        else {
            throw new Error('User is undefined. Cannot add practice data.');
        }
    },

    async updatePracticeDataByField(practiceId: string, updatedFields: Record<string, any>)
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            // start of validation for Record object
            const keys = ['title', 'piece', 'composer', 'instrument', 'duration', 'status', 'notes'];
            const invalidFields = Object.keys(updatedFields).filter(key => !keys.includes(key));
            if (invalidFields.length > 0) {
                throw new Error('Invalid field names found in list of updates: ' + invalidFields.join(', '));
            }
            if ('status' in updatedFields && ![STATUS[0], STATUS[1], STATUS[2]].includes(updatedFields['status'])) {
                throw new Error("Invalid value found for 'status' field: " + updatedFields['status']);
            }
            // end of validation for Record object
            const practiceDataRef = doc(db, 'users', currentUser.uid, 'practiceData', practiceId);
            return await setDoc(practiceDataRef, updatedFields, { merge: true });
        }
        else {
            throw new Error('User is undefined. Cannot update practice data.');
        }
    },

    async deletePracticeData(practiceId: string)
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const practiceDataRef = doc(db, 'users', currentUser.uid, 'practiceData', practiceId);
            return await deleteDoc(practiceDataRef);
        }
        else {
            throw new Error('User is undefined. Cannot delete practice data.');
        }
    },


    async getAllPracticeDataByDate(dateStart: Date, dateEnd: Date)
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const practiceCol = collection(userDocRef, 'practiceData');
            const practiceQuery = query(practiceCol, where('practiceDate', ">=", dateStart),
                                                     where('practiceDate', '<=', dateEnd));
            const querySnap = await getDocs(practiceQuery);
            const practiceData: any[] = [];
            querySnap.forEach((doc) => { practiceData.push({ id: doc.id, ...doc.data() }); });
            return practiceData;
        }
        else {
            throw new Error('User is undefined. Cannot get practice data.');
        }
    },

    async getStartedPracticeDataByDate(dateStart: Date, dateEnd: Date)
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const practiceCol = collection(userDocRef, 'practiceData');
            const practiceQuery = query(practiceCol, where('practiceDate', ">=", dateStart),
                                                     where('practiceDate', '<=', dateEnd));
            const querySnap = await getDocs(practiceQuery);
            const practiceData: any[] = [];
            querySnap.forEach((doc) => { const practiceDoc = doc.data();
                                         if (practiceDoc.status !== STATUS[0]) {
                                             practiceData.push({ id: doc.id, ...doc.data() });
                                         }
                                       });
            return practiceData;
        }
        else {
            throw new Error('User is undefined. Cannot get practice data.');
        }
    },

    async getPracticeHoursAndPiecesByDate(dateStart: Date, dateEnd: Date)
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const practiceCol = collection(userDocRef, 'practiceData');
            const practiceQuery = query(practiceCol, where('practiceDate', ">=", dateStart),
                                                     where('practiceDate', '<=', dateEnd));
            const querySnap = await getDocs(practiceQuery);
            let [hours, pieces] = [0, 0];
            querySnap.forEach((doc) => { const practiceDoc = doc.data();
                                         if (practiceDoc.status !== STATUS[0]) {
                                             hours++;
                                             pieces++;
                                         }
                                       });
            return [hours, pieces];
        }
        else {
            throw new Error('User is undefined. Cannot get practice data.');
        }
    },

    async getMostPracticedComposersByDate(dateStart: Date, dateEnd: Date)
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const practiceCol = collection(userDocRef, 'practiceData');
            const practiceQuery = query(practiceCol, where('practiceDate', ">=", dateStart),
                                                     where('practiceDate', '<=', dateEnd));
            const querySnap = await getDocs(practiceQuery);
            const composersMap = new Map<string, number>();
            querySnap.forEach((doc) => { const practiceDoc = doc.data();
                                         const composer = practiceDoc.composer;
                                         if (composersMap.has(composer)) {
                                             composersMap.set(composer, composersMap.get(composer) + practiceDoc.duration);
                                         }
                                         else {
                                             composersMap.set(composer, practiceDoc.duration);
                                         }
                                       });
            const sortedComposers = Array.from(composersMap, ([composer, hour]) => ({ composer, hour })).sort((a, b) => b.hour - a.hour);
            return sortedComposers.slice(0, 5);
        }
        else {
            throw new Error('User is undefined. Cannot get practice data.');
        }
    },
};

