import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiX, FiKey, FiTrash2 } from 'react-icons/fi';

const SettingsPanel = ({ apiKey, onUpdateApiKey, onClearAll, onClose }) => {
  const [keyInput, setKeyInput] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);

  const handleSaveKey = () => {
    if (keyInput.trim()) {
      onUpdateApiKey(keyInput.trim());
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 w-80 h-full bg-surface border-l border-border shadow-xl z-50 flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-semibold text-lg">Settings</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-surface-hover rounded-md transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <section>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <FiKey className="w-4 h-4" /> Gemini API Key
          </h3>
          <div className="space-y-3">
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIza..."
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm font-mono"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-secondary hover:text-primary"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
            <button
              onClick={handleSaveKey}
              className="w-full py-2 bg-primary text-background rounded-md hover:bg-accent transition-colors text-sm"
            >
              Update Key
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium mb-3 text-red-400">Danger Zone</h3>
          <button
            onClick={() => {
              if (window.confirm('Are you sure? This will delete all conversations.')) {
                onClearAll();
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2 border border-red-800 text-red-300 rounded-md hover:bg-red-900/20 transition-colors text-sm"
          >
            <FiTrash2 className="w-4 h-4" />
            Clear All Conversations
          </button>
        </section>
      </div>

      <div className="p-4 border-t border-border text-xs text-secondary">
        <p>Coder Machine 6000 v1.0.0</p>
        <p>Powered by Gemini 1.5 Flash</p>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;
