// AuthProvider.jsx
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

export const AuthContext = createContext();

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(10000); // Initial balance

  // ✅ New State: Paid Bills (will hold an array of paid bill IDs)
  const [paidBills, setPaidBills] = useState([]);

  // ✅ Mark a bill as paid (push the bill id into paidBills array)
  const markBillAsPaid = (billId) => {
    setPaidBills((prev) => [...prev, billId]);
  };

  // ✅ Reset Password Function
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      if (!user.displayName || !user.photoURL) {
        await updateProfile(user, {
          displayName: user.displayName || "User",
          photoURL: user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png",
        });
      }
      setUser(user);
      return user;
    });
  };

  const logout = () => {
    return signOut(auth).then(() => setUser(null));
  };

  const updateUser = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        balance,
        setBalance,
        paidBills,         // ✅ expose paidBills
        markBillAsPaid,    // ✅ expose markBillAsPaid
        register,
        login,
        logout,
        googleLogin,
        updateUser,
        resetPassword,
      }}
    >
      {loading ? (
        <div className="text-center mt-10">Loading user...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
