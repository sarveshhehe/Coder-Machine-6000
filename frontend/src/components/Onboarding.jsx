import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiKey, FiExternalLink } from 'react-icons/fi';

const Onboarding = ({ onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('API key is required');
      return;
    }
    if (!apiKey.trim().startsWith('AIza')) {
      setError('Invalid API key format. It should start with "AIza".');
      return;
    }
    setError('');
    onSave(apiKey.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-surface border border-border rounded-xl p-8"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome to Coder Machine 6000</h1>
        <p className="text-secondary mb-6">
          To start coding with AI, you'll need a Gemini API key. Follow the steps below.
        </p>

        <ol className="space-y-4 mb-8 text-sm">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary text-background rounded-full flex items-center justify-center font-bold">1</span>
            <span>
              Visit{' '}
              <a
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline inline-flex items-center gap-1"
              >
                Google AI Studio <FiExternalLink className="w-3 h-3" />
              </a>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary text-background rounded-full flex items-center justify-center font-bold">2</span>
            <span>Sign in with your Google account</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary text-background rounded-full flex items-center justify-center font-bold">3</span>
            <span>Generate a Gemini API key</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary text-background rounded-full flex items-center justify-center font-bold">4</span>
            <span>Paste the key below</span>
          </li>
        </ol>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
              Gemini API Key
            </label>
            <div className="relative">
              <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza..."
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-background rounded-lg hover:bg-accent transition-colors font-medium"
          >
            Save & Start Chatting
          </button>
        </form>

        <p className="mt-4 text-xs text-secondary text-center">
          Your API key is stored locally and never sent to our servers except when making requests to Gemini.
        </p>
      </motion.div>
    </div>
  );
};

export default Onboarding;
