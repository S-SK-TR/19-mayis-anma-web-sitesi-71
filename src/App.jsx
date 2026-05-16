import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store';
import { AppShell } from '@/components/layout/AppShell';
import { PageTransition } from '@/components/layout/PageTransition';
import { OfflineBanner } from '@/components/OfflineBanner';

function App() {
  const { theme } = useStore();

  return (
    <div className={`app ${theme}`}>
      <OfflineBanner />
      <AppShell>
        <AnimatePresence mode="wait">
          <PageTransition>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-[var(--text-primary)]">19 Mayıs Anma Web Sitesi</h1>
              <p className="text-[var(--text-muted)] mt-2">Premium PWA Deneyimi</p>
            </motion.div>
          </PageTransition>
        </AnimatePresence>
      </AppShell>
    </div>
  );
}

export default App;