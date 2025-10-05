import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-start mb-6">
      <div className="flex items-start gap-3 max-w-[80%]">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground flex-shrink-0">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="bg-muted rounded-lg px-4 py-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;