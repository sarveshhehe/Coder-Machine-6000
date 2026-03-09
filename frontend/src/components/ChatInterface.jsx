import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiSend, FiStopCircle } from 'react-icons/fi';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ErrorMessage from './ErrorMessage';

const ChatInterface = ({ messages, loading, error, onSendMessage, onToggleSidebar, isSidebarOpen }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && !loading) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  return (
    <div className="flex flex-col h-full">
      <header className="h-14 flex items-center px-4 border-b border-border bg-surface/50 backdrop-blur-sm">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-surface-hover rounded-md transition-colors mr-2"
          aria-label="Toggle sidebar"
        >
          <FiMenu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Coder Machine 6000</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex"
          >
            <TypingIndicator />
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ErrorMessage message={error} />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border bg-surface/50 backdrop-blur-sm p-4">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask a coding question... (Shift+Enter for new line)"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none min-h-[52px] max-h-[200px] font-mono text-sm"
              disabled={loading}
            />
            {loading && (
              <button
                onClick={() => window.stopGeneration?.()}
                className="absolute right-2 bottom-2 p-2 text-secondary hover:text-primary transition-colors"
                aria-label="Stop generation"
              >
                <FiStopCircle className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`p-3 rounded-lg transition-colors ${
              !input.trim() || loading
                ? 'bg-border text-secondary cursor-not-allowed'
                : 'bg-primary text-background hover:bg-accent'
            }`}
            aria-label="Send message"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
