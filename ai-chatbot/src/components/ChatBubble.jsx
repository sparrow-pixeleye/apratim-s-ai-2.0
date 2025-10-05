import React from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '../lib/utils';
import { Bot, User } from 'lucide-react';

const ChatBubble = ({ message, isUser }) => {
  return (
    <div className={cn(
      "flex w-full mb-6",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex items-start gap-3 max-w-[80%]",
        isUser && "flex-row-reverse"
      )}>
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-muted-foreground"
        )}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        
        <Card className={cn(
          "shadow-sm border",
          isUser 
            ? "bg-primary text-primary-foreground border-primary/20" 
            : "bg-background border-border"
        )}>
          <CardContent className="p-4">
            <p className={cn(
              "text-sm whitespace-pre-wrap",
              isUser && "text-primary-foreground"
            )}>
              {message}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatBubble;