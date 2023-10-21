import React from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from "../../config/firebase"
const auth = getAuth();


export function useAuthentication() {
  const [user, setUser] = React.useState<User>();
  const [userData, setUserData] = React.useState<any>();
  
  React.useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error("No such user document!");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setUser(undefined);
        setUserData(undefined);
      }
    });

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user, userData
  };
}
