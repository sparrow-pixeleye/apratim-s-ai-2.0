import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = ({ 
  chats, 
  currentChatId, 
  onNewChat, 
  onSelectChat, 
  onDeleteChat,
  isOpen 
}) => {
  return (
    <div className={cn(
      "flex flex-col h-full bg-muted/20 border-r transition-all duration-300",
      isOpen ? "w-80" : "w-0 overflow-hidden"
    )}>
      <div className="p-4 border-b">
        <Button onClick={onNewChat} className="w-full justify-start gap-2">
          <Plus size={16} />
          New Chat
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        <div className="space-y-2">
          {chats.map((chat) => (
            <Card 
              key={chat.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md group",
                currentChatId === chat.id && "ring-2 ring-primary/20"
              )}
              onClick={() => onSelectChat(chat.id)}
            >
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <MessageSquare size={14} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-sm truncate">
                    {chat.title || "New Chat"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                >
                  <Trash2 size={12} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;