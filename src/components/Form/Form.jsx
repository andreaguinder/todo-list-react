import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import styles from "./Form.module.scss";

const Form = ({ agregarTarea }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estaCompletada, setEstaCompletada] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("El nombre de la tarea no puede estar vacío");
      return;
    }

    agregarTarea({
      title: title,
      descripcion: descripcion,
      status: estaCompletada,
    });

    // Reseteamos estados y replegamos el form
    setTitle("");
    setDescripcion("");
    setEstaCompletada(false);
    setError("");
    setIsOpen(false);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() !== "") {
      setError("");
    }
  };

  return (
    <section className={styles.containerForm}>
      {/* Botón Header que dispara la apertura/cierre */}
      <button
        type="button"
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h2>Agregar tarea nueva</h2>
        <span
          className={`${styles.iconContainer} ${isOpen ? styles.isOpen : ""}`}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>

      {/* Contenedor wrapper para animar la altura sin desmontar del DOM */}
      <div
        className={`${styles.formCollapseWrapper} ${
          isOpen ? styles.isOpen : ""
        }`}
      >
        <form onSubmit={handleSubmit}>
          <div className={styles.general}>
            <div className={styles.info}>
              <div>
                <label htmlFor="title">Nombre de la tarea</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Ej: Ir al super"
                  onChange={handleTitle}
                  value={title}
                />
                {error && <span className={styles.errorTitle}>{error}</span>}
              </div>
              <div>
                <label htmlFor="descripcion">¿Tiene descripción?</label>
                <textarea
                  name="descripcion"
                  id="descripcion"
                  placeholder="Ej: Comprar pan"
                  onChange={(e) => setDescripcion(e.target.value)}
                  value={descripcion}
                />
              </div>
            </div>
            <div className={styles.completada}>
              <p>¿Está completada?</p>
              <label>
                <input
                  type="radio"
                  name="estaCompletada"
                  value="true"
                  onChange={(e) =>
                    setEstaCompletada(e.target.value === "true")
                  }
                  checked={estaCompletada === true}
                />
                Si
              </label>
              <label>
                <input
                  type="radio"
                  name="estaCompletada"
                  value="false"
                  onChange={(e) =>
                    setEstaCompletada(e.target.value === "true")
                  }
                  checked={estaCompletada === false}
                />
                No
              </label>
            </div>
          </div>
          <div>
            <button type="submit">Agregar tarea</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export { Form };