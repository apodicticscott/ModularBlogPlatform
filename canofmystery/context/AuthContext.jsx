'use client'
import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import Loader from "../components/loader/loader"
import firebase_app from '/firebase/config';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ?  
            <div
                className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-base-100 ${loading ? "opacity-100" : "opacity-0"} transition-all duration-500`}
            >
                <Loader className={`${loading ? "scale-100" : "scale-70"} transition duration-500`}/>
            </div>: children}
        </AuthContext.Provider>
    );
};