import { createContext, useContext, useEffect, useState } from 'react';
import { 
    onAuthStateChanged, 
    signInWithPopup, 
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
        // 🚀 1. Esto es CLAVE para mobile: Escucha si el usuario vuelve de la redirección de Google
        getRedirectResult(auth)
            .then((result) => {
                if (result?.user) {
                    setUser(result.user);
                }
            })
            .catch((error) => {
                console.error("Error al retornar de la redirección", error);
            })
            .finally(() => {
                setAuthLoading(false);
            });

        // 2. Escucha los cambios de estado normales de la sesión
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // Si no estamos esperando un resultado de redirección, apagamos el loading
            if (!window.location.search.includes('code=')) {
                setAuthLoading(false);
            }
        });
        
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = () => {
        setAuthLoading(true);

        // 🚀 Detectamos si es un celular o tablet
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // En el celu redirecciona en la misma pestaña (chau pop-ups bloqueados)
            return signInWithRedirect(auth, googleProvider);
        } else {
            // En la compu mantiene el pop-up cómodo de siempre
            return signInWithPopup(auth, googleProvider).catch((error) => {
                console.error("Error en popup:", error);
                setAuthLoading(false);
            });
        }
    };

    const logout = () => {
        setAuthLoading(true);
        return signOut(auth).finally(() => setAuthLoading(false));
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