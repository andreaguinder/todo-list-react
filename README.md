# Gestor de Tareas con Hooks y Persistencia

## Descripción del Proyecto

Esta aplicación es una lista de tareas (To-Do List) dinámica desarrollada con React y Vite. La aplicación permite gestionar tareas de forma eficiente, incluyendo funcionalidades para agregar, eliminar y alternar el estado de completado de cada una, además de filtrar las tareas en tiempo real mediante un buscador.

Este proyecto fue desarrollado para profundizar en el manejo avanzado de Hooks en React, implementando:

* Gestión de estado y efectos: Uso de useState y useEffect.

* Manipulación del DOM: Implementación de useRef para enfocar automáticamente el buscador al montar el componente.

* Optimización de rendimiento: Uso de useMemo para el filtrado inteligente de tareas.

* Lógica reutilizable: Creación de un Custom Hook (useLocalStorage) para manejar la persistencia de datos en el navegador de forma modular.

---

## Funcionalidades Implementadas

* Estado Persistente: Las tareas se guardan automáticamente en el localStorage mediante un hook personalizado.

* Optimización: El filtrado de tareas no se recalcula innecesariamente gracias a useMemo.

* UX (Experiencia de Usuario): El foco en el input de búsqueda es automático gracias a useRef.

* Feedback: La lista se divide automáticamente en "Pendientes" y "Completadas" con contadores dinámicos que se actualizan en tiempo real.

---

## Estructura de Archivos Principal

La aplicación está organizada para favorecer la escalabilidad y limpieza:

* src/components/: Contiene los componentes reutilizables (Navbar, Form, ContenedorTareas, Tarea, Footer).

* src/hooks/: Implementación del custom hook useLocalStorage.js.

* src/data/: Archivo de configuración inicial (mock.js).

* src/styles/: Estilos modulares (.module.scss) aplicados a cada componente.

---

## ¿Te gustaría colaborar o tenés un desafío laboral?

¡Me encantaría conectar con vos! Estoy abierta a nuevas oportunidades, proyectos desafiantes o simplemente charlar sobre tecnología.

* **Email:** [andreabelen.guinder@gmail.com](mailto:andreabelen.guinder@gmail.com)
* **LinkedIn:** [https://www.linkedin.com/in/andrea-guinder/](https://www.linkedin.com/in/andrea-guinder/)
* **Portfolio:** [https://andreaguinder.com/](https://andreaguinder.com/)