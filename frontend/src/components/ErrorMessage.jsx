import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-200">
      <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default ErrorMessage;
