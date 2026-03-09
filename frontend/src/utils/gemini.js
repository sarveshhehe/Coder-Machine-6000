// This file is intentionally left minimal as the actual API calls
// are handled by the backend. The frontend only needs to send requests
// to the backend API. However, we include a helper to format messages.

export const formatMessagesForAPI = (messages) => {
  return messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));
};

// No direct Gemini API calls here – all go through our backend.
