import React from "react";
import { Button } from "./custom/button";
import { Send, Loader2 } from "lucide-react";

const MessageInputForm = ({
  inputText,
  setInputText,
  handleSend,
  isLoading,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white backdrop-blur-sm p-4 shadow-lg border-t border-gray-100">
      <div className="max-w-4xl mx-auto flex gap-3">
        <textarea
          className="flex-grow p-3 border border-gray-200 rounded-xl resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message here..."
          aria-label="Input text"
        />
        <Button
          onClick={handleSend}
          disabled={isLoading}
          aria-label="Send message"
          className="self-end bg-blue-600 hover:bg-blue-700 text-white h-12 w-12 rounded-xl shadow-sm transition-colors"
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <Send className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MessageInputForm;
