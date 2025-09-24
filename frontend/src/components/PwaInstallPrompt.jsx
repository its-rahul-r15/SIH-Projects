// components/PwaInstallPrompt.jsx
import React, { useEffect, useState } from 'react';

export default function PwaInstallPrompt({ autoShow = true }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handler(e) {
      e.preventDefault();
      setDeferredPrompt(e);
      if (autoShow) setVisible(true);
    }
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [autoShow]);

  async function onInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setVisible(false);
    setDeferredPrompt(null);
    // optionally send analytics on choice.outcome
  }

  if (!visible || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80 text-center">
        <h3 className="font-semibold">Install Career Path</h3>
        <p className="text-sm my-2">Add Career Path to your home screen for quick access and offline features.</p>
        <div className="flex justify-center gap-2">
          <button onClick={onInstall} className="px-3 py-1 bg-indigo-600 text-white rounded">Install</button>
          <button onClick={() => setVisible(false)} className="px-3 py-1 border rounded">Maybe later</button>
        </div>
      </div>
    </div>
  );
}
