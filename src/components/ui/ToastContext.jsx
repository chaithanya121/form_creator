import React from 'react';
import { ToastProvider } from '@/context/ToastContext'; // Import the provider

function App() {
  return (
    <ToastProvider>
      {/* Your app components */}
    </ToastProvider>
  );
}

export default App;