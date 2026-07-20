import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const useFirebaseTasks = (initialValue = []) => {
  const [tasks, setTasks] = useState(initialValue);
  const [user, setUser] = useState(null);

  // 1. Escuchar el estado de autenticación del usuario
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (!currentUser) {
        // Fallback: Si se desloguea, vuelve al localStorage
        const local = localStorage.getItem("tareas");
        setTasks(local ? JSON.parse(local) : initialValue);
      }
    });
    return () => unsubscribeAuth();
  }, [initialValue]);

  // 2. Escuchar Firestore en tiempo real (si está logueado)
  useEffect(() => {
    if (!user) return;

    // Guardamos las tareas en un documento único por usuario dentro de la colección "chekeo_tasks"
    const docRef = doc(db, "chekeo_tasks", user.email);

    const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setTasks(docSnap.data().lista || []);
      } else {
        setTasks([]);
      }
    });

    return () => unsubscribeSnapshot();
  }, [user]);

  // 3. Función para guardar (reemplaza al setStoredValue viejo)
  const saveTasks = async (newTasks) => {
    // Primero actualizamos el estado local para que sea instantáneo en la UI
    setTasks(newTasks);

    if (user) {
      try {
        const docRef = doc(db, "chekeo_tasks", user.email);
        // Guardamos la lista en la nube
        await setDoc(docRef, { lista: newTasks }, { merge: true });
      } catch (error) {
        console.error("Error al guardar en Firestore:", error);
      }
    } else {
      // Si está en modo invitado, guarda en localStorage
      localStorage.setItem("tareas", JSON.stringify(newTasks));
    }
  };

  return [tasks, saveTasks, user];
};