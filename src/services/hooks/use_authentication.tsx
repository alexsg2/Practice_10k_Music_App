import { useState, useEffect } from 'react';

import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';


const auth = getAuth();


export function useAuthentication()
{
    const [user, setUser] = useState<User>();
    const [userData, setUserData] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => { const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setLoading(true);
        if (user) {
            setUser(user);
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
                else {
                    // No 'firestore' document associated with user
                    setUser(undefined);
                    setUserData(undefined);
                }
            }
            catch (e) {
                setUser(undefined);
                setUserData(undefined);
            }
        }
        else {
            setUser(undefined);
            setUserData(undefined);
        }
        setLoading(false);
    });

    return unsubscribe; }, []);
    
    return { user, userData, loading };
}
