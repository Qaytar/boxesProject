import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/verify', { credentials: 'include' });
            const data = await response.json();
            setUser(data);
            return data; // Returning the user data here
        } catch (error) {
            console.error("Error during verification:", error);
            setUser(null);
            return null;
        }
    };


    return (
        <AuthContext.Provider value={{ user, checkAuth, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};


