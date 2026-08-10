import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { getCurrentUser } from "@/services/authService";
const AuthContext = createContext();   

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const login = (userData,token) => {
        localStorage.setItem('token', token);
        setUser(userData);
    }
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }
    const updateUser = (updatedUser) => {
        setUser((prev) => ({
            ...prev, ...updatedUser
        }))
};
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }
            try{
                const data = await getCurrentUser(token);
                setUser(data.user);
                setLoading(false);
            }catch(err){
                console.error(err);
                localStorage.removeItem('token');
                setUser(null);
                setLoading(false);
            }
        }
        checkUser();
    },[]);

    return(
        <AuthContext.Provider
            value={{
                user,loading,login,logout, updateUser,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);