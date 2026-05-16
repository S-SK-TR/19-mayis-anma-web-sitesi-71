import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store';
import { AppShell } from '@/components/layout/AppShell';
import { OfflineBanner } from '@/components/OfflineBanner';
import { VideoPlayer } from '@/components/VideoPlayer';

function App() {
  const { theme } = useStore();

  return (
    <div className={`app ${theme}`}>
      <OfflineBanner />
      <AppShell>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <h1 className="text-4xl font-bold text-[var(--text-primary)]">19 Mayıs Anma ve Gençlik Spor Bayramı</h1>
            <p className="text-[var(--text-muted)] mt-2">Premium PWA Deneyimi</p>
            <VideoPlayer
              videoSrc="/videos/19-mayis-anma.mp4"
              posterSrc="/images/19-mayis-poster.jpg"
              title="19 Mayıs Anma ve Gençlik Spor Bayramı"
              description="Atatürk ve gençlik spor bayramını anlatan video"
            />
          </motion.div>
        </AnimatePresence>
      </AppShell>
    </div>
  );
}

export default App;