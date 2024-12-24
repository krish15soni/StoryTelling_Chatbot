import { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  const typeWriter = (text, callback) => {
    let index = 0;
    setAnswer("");
    const interval = setInterval(() => {
      setAnswer((prev) => prev + text[index]);
      index += 1;
      if (index === text.length) {
        clearInterval(interval);
        callback && callback();
      }
    }, 50);
  };

  async function generateAnswer(prompt) {
    if (!prompt.trim()) return;

    setGeneratingAnswer(true);
    setQuestion(""); // Clear input immediately

    // Add user question to chat history
    setChatHistory((prev) => [...prev, { type: "question", content: prompt }]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCvqiha0ptIr6OhRkvCc-z9-vzUyvfU3PM`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: prompt }] }],
        },
      });

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setChatHistory((prev) => [...prev, { type: "answer", content: aiResponse }]);

      // Simulate typing animation for the AI response
      typeWriter(aiResponse, () => setGeneratingAnswer(false));
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
      setGeneratingAnswer(false);
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 to-black text-white">
      <div className="max-w-4xl mx-auto flex flex-col h-full p-6">
        {/* Header */}
        <header className="text-center py-8 mb-6">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-purple-500">
            Interactive StoryTeller AI
          </h1>
          <p className="text-gray-300 text-lg mt-2">
            Start your own unique storytelling adventure with AI. Ask a question or write a prompt.
          </p>
          <p className="text-gray-400 mt-4 text-sm italic">Name: Dhumil Soni | Roll Number: 1187</p>
        </header>

        {/* Chat Container */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto bg-black bg-opacity-80 backdrop-blur-lg rounded-lg p-6 shadow-lg space-y-4 border border-gray-700">
          {chatHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center text-gray-300">
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg backdrop-blur-lg">
                <h2 className="text-3xl font-semibold text-teal-400">Welcome to StoryTeller AI!</h2>
                <p className="mt-4 text-gray-400">
                  Type your own prompt or ask a question to begin your storytelling adventure.
                </p>
              </div>
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`transition-transform transform-gpu ${chat.type === "question" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block max-w-3xl p-4 rounded-lg shadow-md ${chat.type === "question"
                    ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-br-none"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 text-gray-200 rounded-bl-none"}`}
                >
                  <ReactMarkdown>{chat.content}</ReactMarkdown>
                </div>
              </div>
            ))
          )}

          {generatingAnswer && (
            <div className="text-left animate-pulse">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-gray-300 p-4 rounded-lg">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generateAnswer(question);
          }}
          className="mt-4"
        >
          <div className="flex gap-4">
            <textarea
              required
              className="flex-1 p-4 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 focus:ring-teal-400 focus:border-teal-400 resize-none shadow-lg"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question or start your own story..."
              rows="2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(question);
                }
              }}
            ></textarea>
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-medium transition-all transform shadow-lg ${generatingAnswer ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
              disabled={generatingAnswer}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
