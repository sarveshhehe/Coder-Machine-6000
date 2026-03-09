import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import Onboarding from './components/Onboarding';
import SettingsPanel from './components/SettingsPanel';
import useLocalStorage from './hooks/useLocalStorage';
import useChat from './hooks/useChat';

function App() {
  const [apiKey, setApiKey] = useLocalStorage('gemini-api-key', '');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [conversations, setConversations] = useLocalStorage('conversations', []);

  const {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
    setMessages,
  } = useChat(apiKey);

  useEffect(() => {
    if (currentConversationId) {
      const conv = conversations.find(c => c.id === currentConversationId);
      if (conv) {
        setMessages(conv.messages);
      } else {
        setCurrentConversationId(null);
        clearMessages();
      }
    } else {
      clearMessages();
    }
  }, [currentConversationId, conversations, setMessages, clearMessages]);

  const handleNewChat = () => {
    setCurrentConversationId(null);
    clearMessages();
  };

  const handleSelectConversation = (id) => {
    setCurrentConversationId(id);
  };

  const handleSendMessage = async (content) => {
    const newMessages = await sendMessage(content);
    
    if (!currentConversationId) {
      const newId = Date.now().toString();
      const newConv = {
        id: newId,
        title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
        messages: newMessages,
        createdAt: new Date().toISOString(),
      };
      setConversations([newConv, ...conversations]);
      setCurrentConversationId(newId);
    } else {
      const updated = conversations.map(conv =>
        conv.id === currentConversationId
          ? { ...conv, messages: newMessages }
          : conv
      );
      setConversations(updated);
    }
  };

  if (!apiKey) {
    return <Onboarding onSave={setApiKey} />;
  }

  return (
    <div className="flex h-screen bg-background text-primary overflow-hidden">
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <Sidebar
            conversations={conversations}
            currentId={currentConversationId}
            onSelect={handleSelectConversation}
            onNewChat={handleNewChat}
            onClose={() => setIsSidebarOpen(false)}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col min-w-0">
        <ChatInterface
          messages={messages}
          loading={loading}
          error={error}
          onSendMessage={handleSendMessage}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
      </main>

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsPanel
            apiKey={apiKey}
            onUpdateApiKey={setApiKey}
            onClearAll={() => {
              setConversations([]);
              setCurrentConversationId(null);
              clearMessages();
            }}
            onClose={() => setIsSettingsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
