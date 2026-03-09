import { motion } from 'framer-motion';
import { FiMessageSquare, FiPlus, FiSettings, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Sidebar = ({ conversations, currentId, onSelect, onNewChat, onClose, onOpenSettings }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="w-64 bg-surface border-r border-border flex flex-col h-full"
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        <h2 className="font-semibold text-lg">Conversations</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-surface-hover rounded-md transition-colors"
          aria-label="Close sidebar"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2 bg-primary text-background rounded-md hover:bg-accent transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      <div className="px-4 mb-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {filtered.map((conv) => (
          <motion.button
            key={conv.id}
            whileHover={{ x: 4 }}
            onClick={() => onSelect(conv.id)}
            className={`w-full text-left px-3 py-2 my-1 rounded-md flex items-center gap-3 transition-colors ${
              conv.id === currentId
                ? 'bg-surface-hover text-primary'
                : 'hover:bg-surface-hover'
            }`}
          >
            <FiMessageSquare className="w-4 h-4 text-secondary flex-shrink-0" />
            <span className="truncate text-sm">{conv.title}</span>
          </motion.button>
        ))}
        {filtered.length === 0 && (
          <p className="text-secondary text-sm text-center mt-4">No conversations yet</p>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-surface-hover rounded-md transition-colors text-secondary hover:text-primary"
        >
          <FiSettings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
