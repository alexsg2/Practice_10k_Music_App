import {useState, useEffect} from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';


const auth = getAuth();
import { db } from "../../config/firebase"


export function useAuthentication() {
  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
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
