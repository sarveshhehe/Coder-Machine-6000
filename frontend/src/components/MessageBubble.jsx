import { motion } from 'framer-motion';
import { FiCopy } from 'react-icons/fi';
import { useMemo } from 'react';
import CodeBlock from './CodeBlock';
import CopyButton from './CopyButton';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  const parsedContent = useMemo(() => {
    const lines = message.content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeLang = '';
    let codeContent = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const codeFence = line.match(/^```(\w*)/);
      if (codeFence) {
        if (inCodeBlock) {
          elements.push(
            <CodeBlock
              key={`code-${i}`}
              language={codeLang || 'text'}
              code={codeContent.join('\n')}
            />
          );
          inCodeBlock = false;
          codeContent = [];
        } else {
          inCodeBlock = true;
          codeLang = codeFence[1];
        }
      } else {
        if (inCodeBlock) {
          codeContent.push(line);
        } else {
          elements.push(
            <p key={`text-${i}`} className="mb-2 last:mb-0">
              {line || <br />}
            </p>
          );
        }
      }
    }
    return elements;
  }, [message.content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`relative max-w-3xl rounded-lg p-4 ${
          isUser
            ? 'bg-primary text-background'
            : 'bg-surface border border-border'
        }`}
      >
        {!isUser && (
          <CopyButton
            text={message.content}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        )}

        <div className={`prose prose-invert max-w-none ${isUser ? 'prose-p:text-background' : ''}`}>
          {parsedContent}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
