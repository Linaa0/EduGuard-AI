import { useCallback } from 'react';
import { useAppState } from '../context/AppStateContext';

export function useNavigate() {
  const { setAuthView, setCurrentPortal, showToast } = useAppState();

  const navigate = useCallback((to) => {
    if (to === '/auth' || to === '/login') {
      setAuthView('login');
      setCurrentPortal('auth');
    } else if (to === '/signup' || to === '/register') {
      setAuthView('role-select');
      setCurrentPortal('auth');
    } else if (to === '/' || to === '/landing') {
      setCurrentPortal('landing');
    } else if (to.startsWith('#')) {
      const el = document.querySelector(to);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
      }
    } else {
      if (showToast) {
        showToast('Navigation', `Route: ${to}`, 'info');
      }
    }
  }, [setAuthView, setCurrentPortal, showToast]);

  return navigate;
}
