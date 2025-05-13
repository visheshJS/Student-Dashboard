import React, { createContext, useContext, useState , useEffect} from 'react';
import { auth } from '../config/firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';


const AuthContext = createContext();
export const useAuth=()=>useContext(AuthContext);

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    const[loading, setLoading]=useState(true)

    //Sign up
    const signup=(email, password)=> {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //Login
    const login=(email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    //Logout
    const logout=()=>{
        return signOut(auth)
    }
    

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (user)=>{
            setUser(user)
            setLoading(false)
        });
        return unsubscribe;
    },[]);

    const value={
        currentUser:user,
        signup,
        login,
        logout,
    };

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}