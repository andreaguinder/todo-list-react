import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithRedirect, 
  getRedirectResult, 
  signOut 
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase'; 

const AuthContext = createContext();

googleProvider.setCustomParameters({ prompt: 'select_account' });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        // 1. Procesar el resultado de la redirección al volver a la app
        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    setUser(result.user);
                }
            })
            .catch((error) => {
                console.error("Error al procesar el resultado de redirección:", error);
            });

        // 2. Escuchar cambios en el estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            // Usa redirección completa: el Service Worker no lo puede bloquear
            await signInWithRedirect(auth, googleProvider);
        } catch (error) {
            console.error("Error al iniciar sesión con Google desde el contexto:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, authLoading, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}