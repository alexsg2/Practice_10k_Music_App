import { getAuth, onAuthStateChanged,
         createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut,
         EmailAuthProvider, reauthenticateWithCredential, updatePassword, deleteUser } from 'firebase/auth';


import { FirestoreAPI } from './firestore_api';

const auth = getAuth();


export const AuthenticationAPI =
{
    async getCurrentUser()
    { 
        return new Promise((resolve, reject) =>
        {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user);
                }
                else {
                    reject('User not authenticated.');
                }
            });

            return unsubscribe;
        });
    },


    async register(name: string, dateOfBirth: string, instruments: string[], level: string, email: string, password: string)
    {
        await createUserWithEmailAndPassword(auth, email, password);
        return await FirestoreAPI.addUserProfile({ email, name, dateOfBirth, instruments, level });
    },

    async logIn(email: string, password: string)
    {
        return await signInWithEmailAndPassword(auth, email, password);
    },

    async resetPassword(email: string)
    {
        return await sendPasswordResetEmail(auth, email);
    },

    async logOut()
    {
        return await signOut(auth);
    },


    async changePassword(email: string, oldPassword: string, newPassword: string)
    {
        if (oldPassword) {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const cred = EmailAuthProvider.credential(email, oldPassword);
                await reauthenticateWithCredential(currentUser, cred);
                return await updatePassword(currentUser, newPassword);
            }
            else {
                return Promise.reject('User not authenticated.');
            }
        }
    },

    async updateProfile(name: string, email: string, dateOfBirth: string, instruments: string[], level: string, oldPassword: string, newPassword: string)
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            await FirestoreAPI.updateUserProfile({ email, name, dateOfBirth, instruments, level });
            return await this.changePassword(email, oldPassword, newPassword); // nothing happens if newPassword is empty
        }
        else {
            return Promise.reject('User not authenticated.');
        }
    },
    
    async deleteAccount(email: string, password: string)
    {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const cred = EmailAuthProvider.credential(email, password);
            await reauthenticateWithCredential(currentUser, cred);
            await FirestoreAPI.deleteUserProfile();
            await deleteUser(currentUser);
            return await signOut(auth);
        }
        else {
            return Promise.reject('User not authenticated.');
        }
    }
};
