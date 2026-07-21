import { useState, useRef, useEffect } from "react";
import styles from './Navbar.module.scss';
import { LogOut } from 'lucide-react';

const Navbar = ({ onSearch, imagen, alt, user, onLogin, onLogout }) => {
    const [search, setSearch] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSearch = (e) => {
        const valor = e.target.value;
        setSearch(valor);
        onSearch(valor);
    };

    return (
        <div className={styles.navbar}>
            {/* Cabecera con Logo y Auth */}
            <div className={styles.topHeader}>
                <h1>
                    <img src={imagen} alt={alt} className={styles.logoChekeo} />
                </h1>
                
                <div className={styles.authContainer}>
                    {user ? (
                        <div className={styles.userInfo}>
                            {user.photoURL && (
                                <img 
                                    src={user.photoURL} 
                                    alt={user.displayName || "Avatar"} 
                                    className={styles.avatar} 
                                    referrerPolicy="no-referrer"
                                    title={`Hola, ${user.displayName || 'Usuario'}`}
                                />
                            )}
                            <button 
                                type="button"
                                className={styles.logoutBtn} 
                                onClick={onLogout}
                                aria-label="Cerrar sesión"
                                title="Cerrar sesión"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <button 
                            type="button" 
                            className={styles.loginBtn} 
                            onClick={onLogin}
                        >
                            Conectar con Google
                        </button>
                    )}
                </div>
            </div>
            
            <input 
                type="text"
                placeholder="Busca tu tarea..."
                ref={inputRef}
                onChange={handleSearch}
                value={search} 
            />
        </div>
    );
};

export { Navbar };