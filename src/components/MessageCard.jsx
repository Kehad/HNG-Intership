/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "./custom/button";
import { Languages, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "./custom/select";

import PropTypes from "prop-types";

const MessageCard = ({
  message,
  isLoading,
  translateMessageId,
  selectedLanguage,
  setSelectedLanguage,
  handleTranslate,
  handleSummarize,
  buttonTranslateHandler,
  languages,
}) => {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <p className="text-gray-800 text-lg leading-relaxed">
            {message.text}
          </p>
          <span className="inline-flex items-center px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full font-medium">
            {message.language}
          </span>
        </div>
        <div className="flex flex-col gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
          <Button
            disabled={isLoading}
            onClick={() => buttonTranslateHandler(message.id)}
            aria-label="Translate text"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-xl transition-all duration-200 hover:scale-105"
            title="Translate text"
          >
            <Languages className="h-4 w-4 mr-1" />
            Translate
          </Button>
          {message.text.length >= 150 && (
            <Button
              disabled={isLoading}
              onClick={() => handleSummarize(message.id)}
              aria-label="Summarize text"
              className="bg-blue-600 hover:bg-blue-700 text-white  text-sm  rounded-xl transition-all duration-200 hover:scale-105"
              title="Summarize text"
            >
              <FileText className="h-4 w-4 mr-1" />
              Summarize
            </Button>
          )}
        </div>
      </div>

      {translateMessageId === message.id && (
        <div className="mt-6 animate-slideDown">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-48 bg-white/90 border-gray-200 hover:border-blue-300 transition-colors">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem
                  key={lang.code}
                  value={lang.code}
                  onClick={() => handleTranslate(message.id, lang.code)}
                  className="hover:bg-blue-50 cursor-pointer"
                >
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {message.summary && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-xl border border-blue-100 animate-fadeIn">
          <p className="font-medium mb-2 text-blue-800">Summary</p>
          <p className="text-blue-900 leading-relaxed">{message.summary}</p>
        </div>
      )}

      {message.translation && (
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl border border-gray-100 animate-fadeIn">
          <p className="font-medium text-gray-700 leading-relaxed">
            {message.translation}
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageCard;
