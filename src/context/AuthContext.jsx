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
        // 1. Procesar el resultado del redirect (si fue derivado por bloqueo de popup)
        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    setUser(result.user);
                }
            })
            .catch((error) => {
                console.error("Error al procesar redirect:", error);
            });

        // 2. Escuchar la sesión de Firebase
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            // Intentar abrir pop-up sincrónicamente
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            // Si el navegador bloquea el popup, usamos redirect como plan de respaldo
            if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
                console.warn("Popup bloqueado, redirigiendo...");
                await signInWithRedirect(auth, googleProvider);
            } else {
                console.error("Error al iniciar sesión con Google:", error);
                throw error;
            }
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