import React from 'react';
import { useToast } from '../../context/ToastContext';

export const ToastContainerComponent = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container-smartmart position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
      {toasts.map(t => (
        <div 
          key={t.id} 
          className={`toast show align-items-center text-white bg-${t.variant === 'primary' ? 'dark' : t.variant} border-0 shadow-lg mb-2`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body d-flex align-items-center gap-2">
              {t.variant === 'success' && <i className="bi bi-check-circle-fill text-success fs-5"></i>}
              {t.variant === 'primary' && <i className="bi bi-bag-check-fill text-warning fs-5"></i>}
              {t.variant === 'danger' && <i className="bi bi-exclamation-triangle-fill text-danger fs-5"></i>}
              <div>
                <strong>{t.title}</strong>
                <div className="small">{t.message}</div>
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white me-2 m-auto" 
              onClick={() => removeToast(t.id)}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
};
