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
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
      <textarea
        className="w-full p-4 border border-gray-200 rounded-xl resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message here..."
        aria-label="Input text"
      />
      <div className="flex justify-end mt-4">
        <Button
          onClick={handleSend}
          disabled={isLoading}
          aria-label="Send message"
          className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-6 rounded-xl shadow-sm transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send</span>
              <Send className="h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MessageInputForm;