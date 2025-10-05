import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, Paperclip } from 'lucide-react';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div className="flex-1 flex gap-2">
          <Button type="button" variant="ghost" size="sm" className="px-3">
            <Paperclip size={16} />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={disabled}
              className="pr-12 min-h-[40px]"
            />
          </div>
        </div>
        <Button 
          type="submit" 
          disabled={!message.trim() || disabled}
          className="px-4"
        >
          <Send size={16} className="mr-2" />
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;