import { useState, useEffect, useMemo } from "react";
import "./main.scss";
import { ContenedorGeneral } from "./components/ContenedorGeneral/ContenedorGeneral";
import { Navbar } from "./components/Navbar/Navbar";
import { Form } from "./components/Form/Form";
import { ContenedorTareas } from "./components/ContenedorTareas/ContenedorTareas";
import { Footer } from "./components/Footer/Footer";
import { tareas } from "./data/mock";
import { ModalSuccess } from './components/ModalSuccess/ModalSuccess';
import { UpdateToast } from './components/UpdateToast/UpdateToast';

// 🚀 Reemplazamos el useLocalStorage viejo por el de Firebase
import { useFirebaseTasks } from "./hooks/useFirebaseTasks";
import { auth, googleProvider } from "./config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

import logo from "./assets/logo-todoan.png";

function App() {
  // Cambiamos al nuevo hook inteligente. Le pasamos el mock 'tareas' como valor inicial
  const [listaTareas, setListaTareas, user] = useFirebaseTasks(tareas);

  // Funciones de autenticación directas
  const loginConGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  // Tus funciones quedan exactamente igual porque setListaTareas hace toda la magia por detrás
  const agregarTarea = (dataTareas) => {
    // Usamos una estretagia más segura para los IDs autoincrementales basados en lo que ya hay
    const nuevoId = listaTareas.length > 0 ? Math.max(...listaTareas.map(t => t.id)) + 1 : 1;
    setListaTareas([{ id: nuevoId, ...dataTareas }, ...listaTareas]);
  };

  const handleToggle = (id) => {
    setListaTareas(listaTareas.map(t =>
      t.id === id ? { ...t, status: !t.status } : t
    ));
  };

  const handleDelete = (id) => {
    setListaTareas(listaTareas.filter(t => t.id !== id));
  };

  const [busqueda, setBusqueda] = useState("");

  const tareasFiltradas = useMemo(() => {
    return listaTareas.filter(t =>
      t.title.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [listaTareas, busqueda]);

  const logoAlt = "Logo de Todoan, tu App de tareas";
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const handleAppInstalled = () => {
      setMostrarModal(true);
      if (typeof window.clarity === 'function') {
        window.clarity("event", "pwa_install");
      }
    };
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => window.removeEventListener('appinstalled', handleAppInstalled);
  }, []);

  return (
    <>
      <ContenedorGeneral>
        {/* 💡 Le pasamos los datos del usuario y las funciones de login a la Navbar para que maneje el botón */}
        <Navbar 
          imagen={logo} 
          alt={logoAlt} 
          onSearch={(valor) => setBusqueda(valor)}
          user={user}
          onLogin={loginConGoogle}
          onLogout={logout}
        />
        
        <Form agregarTarea={agregarTarea} />
        <ContenedorTareas listaTareas={tareasFiltradas} handleToggle={handleToggle} handleDelete={handleDelete} />
        <Footer />
      </ContenedorGeneral>

      <ModalSuccess imagen={logo} alt={logoAlt} isOpen={mostrarModal} onClose={() => setMostrarModal(false)} />
      <UpdateToast />
    </>
  );
}

export default App;