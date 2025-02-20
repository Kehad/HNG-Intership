import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "./custom/card";
import { Alert, AlertDescription } from "./custom/alert";
import MessageCard from "./MessageCard";
import MessageInputForm from "./MessageInputForm";
import Header from "./Header";

const languages = [
  { code: "en", name: "English" },
  { code: "pt", name: "Portuguese" },
  { code: "es", name: "Spanish" },
  { code: "ru", name: "Russian" },
  { code: "tr", name: "Turkish" },
  { code: "fr", name: "French" },
];

const HelloWorld = () => {
  const [messages, setMessages] = useState([
    {
      id: 1739828729046,
      text: "Hello World",
      language: "en",
      translation: "",
      summary: "",
    },
  ]);
  const [inputText, setInputText] = useState("Hello World");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [translateMessageId, setTranslateMessageId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const ets = async (text) => {
    const languageDetectorCapabilities =
      await self.ai.languageDetector.capabilities();
    const canDetect = languageDetectorCapabilities.available;
    let detector;
    if (canDetect === "no") {
      // The language detector isn't usable.
      return;
    }
    if (canDetect === "readily") {
      const someUserText = "Hallo und herzlich willkommen!";
      // The language detector can immediately be used.
      detector = await self.ai.languageDetector.create();
      const results = await detector.detect(text);
      return results[0];
    } else {
      // The language detector can be used after model download.
      detector = await self.ai.languageDetector.create({
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
          });
        },
      });
      await detector.ready;
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Detect language using Chrome AI API
      const { detectedLanguage } = await ets(inputText);
      const newMessage = {
        id: Date.now(),
        text: inputText,
        language: detectedLanguage,
        translation: "",
        summary: "",
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    } catch (err) {
      console.log(err)
      setError("You can only use Google Chrome");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async (messageId, targetLanguage) => {
    setIsLoading(true);
    setError(null);

    try {
      const message = messages.find((m) => m.id === messageId);
      if (!message) return;

      const translator = await self.translation.createTranslator({
        sourceLanguage: message.language,
        targetLanguage: targetLanguage,
      });

      const translation = await translator.translate(message.text);

      setMessages(
        messages.map((m) => {
          if (m.id === messageId) {
            return {
              ...m,
              language: targetLanguage,
              translation: translation,
            };
          }
          return m;
        })
      );
    } catch (err) {
      setError("Translation failed. Please try again.");
    } finally {
      setIsLoading(false);
      setTranslateMessageId(null);
    }
  };

  const buttonTranslateHandler = (messageId) => {
    setTranslateMessageId(translateMessageId === messageId ? null : messageId);
  };

  const handleSummarize = async (messageId) => {
    setIsLoading(true);
    setError(null);

    try {
      const message = messages.find((m) => m.id === messageId);
      if (!message) return;

      const options = {
        sharedContext: "Extra content",
        type: "key-points",
        format: "markdown",
        length: "medium",
      };

      const available = (await self.ai.summarizer.capabilities()).available;
      console.log(available);
      let summarizer;

      summarizer = await self.ai.summarizer.create(options);
      console.log(summarizer);
      const summary = await summarizer.summarize(message.text, {
        context: "This article is intended for a tech-savvy audience.",
      });
      console.log(summary);

      setMessages(
        messages.map((m) => {
          if (m.id === messageId) {
            return {
              ...m,
              summary: summary,
            };
          }
          return m;
        })
      );
    } catch (err) {
      setError("Summarization failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4 bg-gradient-to-b from-blue-50 to-white pb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="h-[calc(100vh-16rem)] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
              {messages?.map((message) => (
                <div key={message.id} className="mb-6 last:mb-8 animate-fadeIn">
                  <MessageCard
                    message={message}
                    isLoading={isLoading}
                    translateMessageId={translateMessageId}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                    handleTranslate={handleTranslate}
                    handleSummarize={handleSummarize}
                    buttonTranslateHandler={buttonTranslateHandler}
                    languages={languages}
                  />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
          </Card>

          {error && (
            <Alert
              variant="destructive"
              className="animate-shake bg-red-50 border-red-200 text-red-800"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </main>
      <MessageInputForm
        inputText={inputText}
        setInputText={setInputText}
        handleSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  );
};

export default HelloWorld;
