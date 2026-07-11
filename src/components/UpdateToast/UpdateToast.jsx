
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useEffect } from 'react';
import { Download } from 'lucide-react';
import styles from './UpdateToast.module.scss';

const UpdateToast = () => {

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW registrado con éxito');
    },
    onRegisterError(error) {
      console.error('Error al registrar el SW:', error);
    }
  });

  useEffect(() => {
    window.forzarModalPWA = (estado) => {
      setNeedRefresh(estado);
    };
  }, [setNeedRefresh]);


  if (!needRefresh) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.toastContainer}>

        <button className={styles.closeButton} onClick={() => setNeedRefresh(false)}></button>
        
        <div className={styles.iconContainer}>
          <Download className={styles.downloadIcon} />
        </div>
        
        <p className={styles.text}>Hay una nueva versión disponible</p>
        
        <div className={styles.buttonGroup}>

          <button 
            className={styles.updateButton} 
            onClick={() => updateServiceWorker(true)}
          >
            Actualizar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export { UpdateToast };