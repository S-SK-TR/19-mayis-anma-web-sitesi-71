import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AppShell = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col bg-[var(--bg-base)]"
    >
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </motion.div>
  );
};

export { AppShell };