import {useState, useEffect} from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';


const auth = getAuth();
import { db } from "../../config/firebase"


export function useAuthentication() {
  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
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
        } finally {
          setLoading(false);
        }
      } else {
        setUser(undefined);
        setUserData(undefined);
        setLoading(false);
      }
    });

    return unsubscribeFromAuthStatusChanged;
  }, []);
  
  return {
    user, userData, loading
  };
}