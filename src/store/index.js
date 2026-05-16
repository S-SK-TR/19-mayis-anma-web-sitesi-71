import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // Tema state'i
      theme: 'dark',
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
      })),

      // Uygulama state'i
      app: {
        loading: false,
        error: null,
      },
      setAppState: (newState) => set((state) => ({
        app: { ...state.app, ...newState }
      })),
    }),
    {
      name: '19-mayis-store',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

export { useStore };