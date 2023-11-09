import { getAuth,
         createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut,
         EmailAuthProvider, reauthenticateWithCredential, updatePassword, deleteUser } from 'firebase/auth';


import { DataManagementAPI } from './data_management_api';

const auth = getAuth();


export const AuthenticationAPI =
{
    async register(profilePicture: string, name: string, dateOfBirth: string, instruments: string[], level: string, email: string, password: string)
    {
        await createUserWithEmailAndPassword(auth, email, password);
        return await DataManagementAPI.addUserProfile({ email, profilePicture, name, dateOfBirth, instruments, level });
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
            await DataManagementAPI.updateUserProfile({ email, name, dateOfBirth, instruments, level });
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
            await DataManagementAPI.deleteUserData();
            await deleteUser(currentUser);
            return await signOut(auth);
        }
        else {
            return Promise.reject('User not authenticated.');
        }
    }
};
