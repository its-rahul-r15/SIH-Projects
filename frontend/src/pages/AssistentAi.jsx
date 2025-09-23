// client/src/pages/Assistant.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function Assistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef();
  const location = useLocation();

  // Check if this is full page mode or floating mode
  const isFullPage = location.pathname === '/dashboard/assistant';

  // Sample quick questions
  const quickQuestions = [
    "Best courses after 12th science?",
    "How to prepare for JEE Mains?",
    "Career in computer science?",
    "Scholarships for engineering?",
    "Improve coding skills?"
  ];

  useEffect(() => {
    (async () => {
      try {
        const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
        const token = localStorage.getItem('token');
        const res = await API.get('https://sih-projects-delta.vercel.app/api/assistant/history', { 
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data?.ok) {
          setMessages(res.data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch history', err);
        setIsOnline(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage(text = input) {
    if (!text.trim()) return;
    
    const messageText = text.trim();
    const userMsg = { 
      role: 'user', 
      text: messageText, 
      createdAt: new Date().toISOString() 
    };
    
    setMessages(m => [...m, userMsg]);
    setInput('');
    setSending(true);

    try {
      const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
      const token = localStorage.getItem('token');
      const res = await API.post('https://sih-projects-delta.vercel.app/api/assistant/chat', 
        { message: messageText }, 
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (res.data?.ok) {
        const aiMsg = { 
          role: 'assistant', 
          text: res.data.data.reply, 
          createdAt: new Date().toISOString() 
        };
        setMessages(m => [...m, aiMsg]);
        setIsOnline(true);
      } else {
        throw new Error('No response data');
      }
    } catch (err) {
      console.error(err);
      const errorMsg = { 
        role: 'assistant', 
        text: 'Sorry, I encountered an error. Please try again.', 
        createdAt: new Date().toISOString(),
        isError: true
      };
      setMessages(m => [...m, errorMsg]);
      setIsOnline(false);
    } finally {
      setSending(false);
    }
  }

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const clearChat = () => {
    setMessages([]);
  };

  // Full Page Mode
  if (isFullPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden mb-6"
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                <div>
                  <h1 className="text-4xl font-bold mb-2">🤖 AI Career Assistant</h1>
                  <p className="text-blue-100 text-lg">
                    Get personalized guidance on courses, careers, exams, and more
                  </p>
                </div>
                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                  <div className={`flex items-center px-4 py-2 rounded-full backdrop-blur-sm ${
                    isOnline ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      isOnline ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <span>{isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                  <button
                    onClick={clearChat}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all duration-300"
                  >
                    🗑️ Clear Chat
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar with Quick Questions */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sticky top-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">💡</span> Quick Questions
                </h3>
                <div className="space-y-3">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-300 text-sm text-gray-700 hover:text-blue-700"
                    >
                      {question}
                    </button>
                  ))}
                </div>

                {/* Tips Section */}
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <span className="mr-2">💡</span> Pro Tips
                  </h4>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    <li>• Ask about specific courses and careers</li>
                    <li>• Inquire about exam preparation tips</li>
                    <li>• Get scholarship information</li>
                    <li>• Discuss your career doubts</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Chat Container */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden flex flex-col h-[70vh]">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">AI Assistant is ready to help</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {messages.length} messages
                    </span>
                  </div>
                </div>

                {/* Messages Area */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-6 space-y-4"
                >
                  <AnimatePresence>
                    {messages.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="text-6xl mb-4">🤖</div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">
                          Welcome to AI Career Assistant!
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                          I'm here to help you with career guidance, course information, 
                          exam preparation, and much more. Ask me anything!
                        </p>
                      </motion.div>
                    ) : (
                      messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
                            message.role === 'user' 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none' 
                              : message.isError
                              ? 'bg-red-50 border border-red-200 text-red-800 rounded-bl-none'
                              : 'bg-gray-50 border border-gray-200 text-gray-800 rounded-bl-none'
                          }`}>
                            <div className="whitespace-pre-wrap leading-relaxed">
                              {message.text}
                            </div>
                            <div className={`text-xs mt-2 ${
                              message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {new Date(message.createdAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {sending && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-none p-4">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input Area */}
                <div className="border-t p-4 bg-white">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-24 transition-all duration-300"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { 
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        placeholder="Ask about courses, careers, exams, scholarships..."
                        disabled={sending}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                        ⏎ Enter to send
                      </div>
                    </div>
                    <button
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
                      onClick={() => sendMessage()}
                      disabled={sending || !input.trim()}
                    >
                      {sending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>🚀</span>
                          <span>Send</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Floating Mode
  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isExpanded ? 'w-96 h-[600px]' : 'w-80 h-16'
    }`}>
      {/* Minimized State */}
      {!isExpanded && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl p-4 text-white cursor-pointer hover:shadow-3xl transition-all duration-300"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-xl">🤖</div>
              <div>
                <div className="font-semibold">AI Assistant</div>
                <div className="text-blue-100 text-xs">Click to chat</div>
              </div>
            </div>
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
          </div>
        </motion.div>
      )}

      {/* Expanded State */}
      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-full"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-xl">🤖</div>
                <div>
                  <div className="font-semibold">AI Career Assistant</div>
                  <div className="text-blue-100 text-xs">Online • Ready to help</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={clearChat}
                  className="text-white/80 hover:text-white p-1"
                  title="Clear chat"
                >
                  🗑️
                </button>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="text-white/80 hover:text-white p-1"
                  title="Minimize"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-3 space-y-2"
          >
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-4xl mb-2">🤖</div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    Career Assistant
                  </h3>
                  <p className="text-xs text-gray-500">
                    Ask me about courses, careers, exams...
                  </p>
                </motion.div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none text-sm' 
                        : message.isError
                        ? 'bg-red-50 border border-red-200 text-red-800 rounded-bl-none text-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none text-sm'
                    }`}>
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {message.text}
                      </div>
                      <div className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.createdAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {/* Typing Indicator */}
            {sending && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 rounded-2xl rounded-bl-none p-3">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Questions */}
          {messages.length === 0 && (
            <div className="px-3 pb-2">
              <div className="text-xs text-gray-500 mb-2 font-medium">Quick questions:</div>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded-lg transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t p-3 bg-gray-50">
            <div className="flex gap-2">
              <input
                className="flex-1 text-sm p-2 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask about careers, courses..."
                disabled={sending}
              />
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-3 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                onClick={() => sendMessage()}
                disabled={sending || !input.trim()}
              >
                {sending ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  '🚀'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}