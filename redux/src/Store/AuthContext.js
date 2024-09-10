import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null); 

    useEffect(() => {
        // Check if there's a token in localStorage
        const token = localStorage.getItem('jwt');
        const storedRole = localStorage.getItem('role'); 

        if (token) {
            const fetchUserRole = async () => {
                try {
                    const response = await fetch("http://localhost:1337/api/users/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setRole(userData.role || storedRole); 
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setIsAuthenticated(false);
                }
            };
            fetchUserRole();
        } else {
            setIsAuthenticated(false);
            setRole(storedRole); 
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};