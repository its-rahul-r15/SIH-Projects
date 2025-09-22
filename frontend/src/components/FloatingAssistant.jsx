// client/src/components/FloatingAssistant.jsx
import React, { useState } from 'react';

import { FaRobot } from 'react-icons/fa';
import Assistant from '../pages/AssistentAi';

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center"
        title="AI Assistant"
      >
        <FaRobot size={24} />
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-80 h-[70vh] bg-white border rounded shadow-lg flex flex-col">
          <Assistant />
        </div>
      )}
    </>
  );
}
