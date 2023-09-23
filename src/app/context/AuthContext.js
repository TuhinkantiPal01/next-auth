const { createContext, useContext, useState, useEffect } = require("react");
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.config";
const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubScribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubScribe();
  }, [user]);

  const AuthInfo = {
    user,
    googleSignIn,
    logOut
  };

  return <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
