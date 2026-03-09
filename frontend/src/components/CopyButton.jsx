import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

const CopyButton = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-md bg-surface-hover hover:bg-background transition-colors ${className}`}
      aria-label="Copy message"
    >
      {copied ? (
        <FiCheck className="w-4 h-4 text-green-400" />
      ) : (
        <FiCopy className="w-4 h-4 text-secondary" />
      )}
    </button>
  );
};

export default CopyButton;
