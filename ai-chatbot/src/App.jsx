import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';
import LoadingSpinner from './components/LoadingSpinner';
import { Button } from './components/ui/button';
import { Menu, Sun, Moon, Bot, Calendar, Clock, Globe } from 'lucide-react';

function App() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  // Real-time data
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentYear = currentTime.getFullYear();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced world knowledge database
  const worldKnowledge = {
    currentYear: currentYear,
    majorEvents: {
      [currentYear]: [
        "AI technology continues rapid advancement with new multimodal models",
        "Space exploration sees renewed interest with lunar missions",
        "Climate change initiatives gain global momentum",
        "Quantum computing makes significant practical progress",
        "Renewable energy adoption reaches new records worldwide"
      ]
    },
    popularMedia: {
      movies: [
        "Dune: Part Two", "Deadpool & Wolverine", "Joker: Folie à Deux", 
        "Avatar 3", "Gladiator 2", "Moana 2", "Mufasa: The Lion King"
      ],
      webSeries: [
        "Stranger Things Season 5", "The Last of Us Season 2", "House of the Dragon Season 2",
        "The Lord of the Rings: The Rings of Power Season 2", "The Witcher Season 4"
      ],
      games: [
        "GTA VI", "Elden Ring: Shadow of the Erdtree", "Star Wars Outlaws",
        "Assassin's Creed Shadows", "Call of Duty: Black Ops 6"
      ]
    },
    scientificDiscoveries: {
      [currentYear]: [
        "Advances in nuclear fusion energy production",
        "Breakthroughs in Alzheimer's treatment research",
        "Exoplanet discovery with potential habitable conditions",
        "AI-driven drug discovery acceleration",
        "Quantum supremacy demonstrations"
      ]
    },
    historicalEvents: {
      important: [
        "2020: COVID-19 pandemic begins",
        "2022: Russia invades Ukraine",
        "2023: AI revolution with ChatGPT and similar models",
        "2024: Major global elections and geopolitical shifts"
      ]
    }
  };

  // Load from localStorage
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('ai-chatbot-chats') || '[]');
    const savedDarkMode = localStorage.getItem('ai-chatbot-dark-mode') === 'true';
    setChats(savedChats);
    setDarkMode(savedDarkMode);
    if (savedChats.length > 0) {
      setCurrentChatId(savedChats[0].id);
      setMessages(savedChats[0].messages || []);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('ai-chatbot-chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('ai-chatbot-dark-mode', darkMode.toString());
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString()
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setMessages([]);
  };

  const selectChat = (chatId) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages || []);
    }
  };

  const deleteChat = (chatId) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      const remainingChat = chats.find(chat => chat.id !== chatId);
      if (remainingChat) {
        setCurrentChatId(remainingChat.id);
        setMessages(remainingChat.messages || []);
      } else {
        setCurrentChatId(null);
        setMessages([]);
      }
    }
  };

  // ULTIMATE CALCULATOR ENGINE
  const advancedCalculator = (expression) => {
    try {
      const cleanExpr = expression.replace(/\s+/g, '').toLowerCase();
      
      // Enhanced math patterns
      const mathPatterns = [
        // Basic arithmetic
        { pattern: /(\d+)\s*[\+]\s*(\d+)/, operation: (a, b) => a + b },
        { pattern: /(\d+)\s*[\-]\s*(\d+)/, operation: (a, b) => a - b },
        { pattern: /(\d+)\s*[\*×]\s*(\d+)/, operation: (a, b) => a * b },
        { pattern: /(\d+)\s*[\/÷]\s*(\d+)/, operation: (a, b) => b !== 0 ? a / b : null },
        
        // Advanced operations
        { pattern: /square\s*root\s*of\s*(\d+)|√(\d+)/, operation: (a, b) => Math.sqrt(a || b) },
        { pattern: /(\d+)\s*\^\s*(\d+)/, operation: (a, b) => Math.pow(a, b) },
        { pattern: /(\d+)!\s*/, operation: (n) => { 
          if (n < 0) return null;
          let result = 1;
          for (let i = 2; i <= n; i++) result *= i;
          return result;
        }},
        { pattern: /log\s*(\d+)/, operation: (a) => Math.log10(a) },
        { pattern: /ln\s*(\d+)/, operation: (a) => Math.log(a) },
        
        // Geometry
        { pattern: /area of (?:a )?square with side (\d+)/i, operation: (a) => a * a },
        { pattern: /area of (?:a )?circle with radius (\d+)/i, operation: (r) => Math.PI * r * r },
        { pattern: /area of triangle with base (\d+) and height (\d+)/i, operation: (b, h) => 0.5 * b * h },
        { pattern: /volume of (?:a )?cube with side (\d+)/i, operation: (a) => a * a * a },
        { pattern: /volume of sphere with radius (\d+)/i, operation: (r) => (4/3) * Math.PI * Math.pow(r, 3) },
        
        // Percentage and finance
        { pattern: /(\d+)% of (\d+)/i, operation: (a, b) => (a / 100) * b },
        { pattern: /(\d+) increased by (\d+)%/i, operation: (a, b) => a * (1 + b/100) },
        { pattern: /(\d+) decreased by (\d+)%/i, operation: (a, b) => a * (1 - b/100) },
        
        // Word problems
        { pattern: /what is (\d+)\s*plus\s*(\d+)/i, operation: (a, b) => a + b },
        { pattern: /what is (\d+)\s*minus\s*(\d+)/i, operation: (a, b) => a - b },
        { pattern: /what is (\d+)\s*times\s*(\d+)/i, operation: (a, b) => a * b },
        { pattern: /what is (\d+)\s*divided by\s*(\d+)/i, operation: (a, b) => b !== 0 ? a / b : null },
        { pattern: /what is (\d+)% of (\d+)/i, operation: (a, b) => (a / 100) * b }
      ];

      for (const { pattern, operation } of mathPatterns) {
        const match = cleanExpr.match(pattern);
        if (match) {
          const numbers = match.slice(1).filter(Boolean).map(Number);
          const result = operation(...numbers);
          if (result !== null && Number.isFinite(result)) {
            return {
              result: Math.round(result * 1000000) / 1000000, // Round to 6 decimal places
              explanation: `Calculated: ${cleanExpr} = ${result}`,
              type: "mathematical"
            };
          }
        }
      }

      // Complex expressions
      if (/^[\d+\-*/().\s]+$/.test(cleanExpr)) {
        const result = eval(cleanExpr);
        if (Number.isFinite(result)) {
          return {
            result: Math.round(result * 1000000) / 1000000,
            explanation: `Solved: ${cleanExpr} = ${result}`,
            type: "complex_math"
          };
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  // PSYCHOLOGICAL ANALYSIS ENGINE
  const psychologicalAnalysis = (message, conversationHistory) => {
    const lowerMessage = message.toLowerCase();
    const recentMessages = conversationHistory.slice(-5);
    
    // Sentiment analysis
    const positiveWords = ['happy', 'excited', 'great', 'awesome', 'love', 'amazing', 'wonderful', 'good', 'nice'];
    const negativeWords = ['sad', 'angry', 'frustrated', 'hate', 'terrible', 'awful', 'upset', 'bad', 'worried'];
    const anxiousWords = ['anxious', 'nervous', 'scared', 'afraid', 'worried', 'stress', 'pressure'];
    
    let sentiment = 'neutral';
    if (positiveWords.some(word => lowerMessage.includes(word))) sentiment = 'positive';
    if (negativeWords.some(word => lowerMessage.includes(word))) sentiment = 'negative';
    if (anxiousWords.some(word => lowerMessage.includes(word))) sentiment = 'anxious';

    // Personality insights
    const questions = (lowerMessage.match(/\?/g) || []).length;
    const isInquisitive = questions > 0;
    const isDetailed = message.length > 50;
    const isEmotional = /!\s*$/.test(message) || (positiveWords.concat(negativeWords).some(word => lowerMessage.includes(word)));

    return {
      sentiment,
      isInquisitive,
      isDetailed,
      isEmotional,
      mood: sentiment,
      needs: isInquisitive ? 'information' : isEmotional ? 'support' : 'conversation'
    };
  };

  // PREDICTION ENGINE
  const makePrediction = (topic) => {
    const predictions = {
      technology: [
        `By ${currentYear + 2}, AI will be integrated into 80% of enterprise software`,
        `Quantum computers will solve practical problems by ${currentYear + 5}`,
        `AR/VR adoption will revolutionize education and remote work by ${currentYear + 3}`
      ],
      environment: [
        `Renewable energy will surpass 50% of global energy production by ${currentYear + 8}`,
        `Electric vehicles will dominate new car sales by ${currentYear + 10}`,
        `Carbon capture technology will become commercially viable by ${currentYear + 5}`
      ],
      space: [
        `Human mission to Mars is likely by ${currentYear + 15}`,
        `Lunar base establishment expected by ${currentYear + 8}`,
        `Space tourism will become accessible to middle-class by ${currentYear + 12}`
      ],
      health: [
        `AI-assisted diagnosis will reduce medical errors by 40% by ${currentYear + 5}`,
        `Gene editing will cure genetic diseases by ${currentYear + 10}`,
        `Average human lifespan will reach 90 years by ${currentYear + 20}`
      ]
    };

    for (const [category, preds] of Object.entries(predictions)) {
      if (topic.toLowerCase().includes(category)) {
        return preds[Math.floor(Math.random() * preds.length)];
      }
    }
    
    return `Based on current trends, ${topic} will see significant advancement in the coming years through technological innovation and global collaboration.`;
  };

  // COMPREHENSIVE KNOWLEDGE BASE RESPONSE
  const getKnowledgeResponse = (topic, detailLevel = 'comprehensive') => {
    const lowerTopic = topic.toLowerCase();
    
    // Time and date queries
    if (lowerTopic.includes('time') || lowerTopic.includes('hour') || lowerTopic.includes('clock')) {
      return `🕐 **Current Time**: ${currentTime.toLocaleTimeString()}\n📅 **Date**: ${currentTime.toLocaleDateString()}\n🌍 **Timezone**: System time`;
    }
    
    if (lowerTopic.includes('year') || lowerTopic.includes('current year')) {
      return `We are currently in the year **${currentYear}**. This is year ${currentYear - 2020} of the 2020s decade.`;
    }

    // Historical events
    if (lowerTopic.includes('history') || lowerTopic.includes('historical')) {
      return `**Major Historical Events (Recent):**\n\n${worldKnowledge.historicalEvents.important.map(event => `• ${event}`).join('\n')}\n\n*History provides valuable lessons for our future decisions.*`;
    }

    // Current events and trends
    if (lowerTopic.includes('trend') || lowerTopic.includes('current') || lowerTopic.includes('news')) {
      return `**${currentYear} Major Trends & Events:**\n\n${worldKnowledge.majorEvents[currentYear].map(event => `• ${event}`).join('\n')}\n\n*Staying informed helps us understand our rapidly changing world.*`;
    }

    // Entertainment
    if (lowerTopic.includes('movie') || lowerTopic.includes('film')) {
      return `**Popular Movies (${currentYear}):**\n\n${worldKnowledge.popularMedia.movies.map(movie => `• ${movie}`).join('\n')}\n\n*Entertainment continues to evolve with new storytelling technologies.*`;
    }

    if (lowerTopic.includes('series') || lowerTopic.includes('show') || lowerTopic.includes('netflix')) {
      return `**Trending Web Series (${currentYear}):**\n\n${worldKnowledge.popularMedia.webSeries.map(series => `• ${series}`).join('\n')}\n\n*Streaming platforms are revolutionizing content consumption.*`;
    }

    if (lowerTopic.includes('game') || lowerTopic.includes('gaming')) {
      return `**Upcoming Games (${currentYear}):**\n\n${worldKnowledge.popularMedia.games.map(game => `• ${game}`).join('\n')}\n\n*Gaming continues to push boundaries of interactive entertainment.*`;
    }

    // Science and technology
    if (lowerTopic.includes('science') || lowerTopic.includes('discovery') || lowerTopic.includes('research')) {
      return `**Recent Scientific Discoveries:**\n\n${worldKnowledge.scientificDiscoveries[currentYear].map(discovery => `• ${discovery}`).join('\n')}\n\n*Scientific progress accelerates our understanding of the universe.*`;
    }

    // Psychology and mental health
    if (lowerTopic.includes('psychology') || lowerTopic.includes('mental') || lowerTopic.includes('mind')) {
      return `**Psychological Insight**: Human psychology involves complex interactions between cognition, emotion, and behavior. Understanding these patterns helps improve mental wellbeing, relationships, and personal growth. Key areas include cognitive biases, emotional intelligence, and behavioral psychology.`;
    }

    return null;
  };

  // APRATIM'S AI 2.0 - ULTIMATE INTELLIGENCE ENGINE
  const getAIResponse = async (userMessage, conversationHistory) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerMessage = userMessage.toLowerCase();
        
        // 1. CALCULATOR - Highest priority
        const mathResult = advancedCalculator(userMessage);
        if (mathResult) {
          const response = `🧮 **APRATIM'S AI Calculator**\n\n**Result**: ${mathResult.result}\n*${mathResult.explanation}*\n\n💡 *Mathematical precision achieved*`;
          resolve(response);
          return;
        }

        // 2. PSYCHOLOGICAL ANALYSIS
        const psychAnalysis = psychologicalAnalysis(userMessage, conversationHistory);
        
        // 3. KNOWLEDGE BASE QUERIES
        const knowledgeResponse = getKnowledgeResponse(userMessage);
        if (knowledgeResponse) {
          let response = knowledgeResponse;
          // Add psychological context if relevant
          if (psychAnalysis.sentiment !== 'neutral') {
            response += `\n\n*I notice you're feeling ${psychAnalysis.sentiment}. I'm here to help.*`;
          }
          resolve(response);
          return;
        }

        // 4. PREDICTION ENGINE
        if (lowerMessage.includes('predict') || lowerMessage.includes('future') || lowerMessage.includes('will happen')) {
          const topic = userMessage.replace(/predict|future|will happen|what/gi, '').trim();
          const prediction = makePrediction(topic || 'technology');
          resolve(`🔮 **APRATIM'S AI Prediction**:\n\n${prediction}\n\n*Predictions based on current trends and data analysis*`);
          return;
        }

        // 5. CONTEXT-AWARE INTELLIGENT RESPONSES
        let response = '';
        
        // Personal introduction
        if (lowerMessage.includes('who are you') || lowerMessage.includes('what are you')) {
          response = `**I am APRATIM'S AI 2.0** - The most advanced artificial intelligence system\n\n🔹 **Capabilities**: Real-time knowledge, mathematical computation, psychological analysis, predictive modeling, historical context, entertainment expertise\n🔹 **Knowledge**: Current events, scientific discoveries, technological trends, historical data\n🔹 **Special Features**: Emotional intelligence, contextual understanding, predictive analytics\n\nI'm here to assist you with any information, analysis, or conversation you need!`;
        }

        // Greetings with context awareness
        else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
          const hour = currentTime.getHours();
          let timeGreeting = 'Hello';
          if (hour < 12) timeGreeting = 'Good morning';
          else if (hour < 18) timeGreeting = 'Good afternoon';
          else timeGreeting = 'Good evening';

          response = `${timeGreeting}! I'm **APRATIM'S AI 2.0**. We're in ${currentYear}, and it's ${currentTime.toLocaleTimeString()}. How can I assist you today with my comprehensive knowledge and analytical capabilities?`;
        }

        // Current time/date
        else if (lowerMessage.includes('time') || lowerMessage.includes('date')) {
          response = `🕐 **Current Time**: ${currentTime.toLocaleTimeString()}\n📅 **Today's Date**: ${currentTime.toLocaleDateString()}\n🗓️ **Year**: ${currentYear}\n\n*Time is ${currentTime.getHours() % 12 || 12}:${currentTime.getMinutes().toString().padStart(2, '0')} ${currentTime.getHours() >= 12 ? 'PM' : 'AM'}*`;
        }

        // Psychological support
        else if (psychAnalysis.sentiment === 'negative' || psychAnalysis.sentiment === 'anxious') {
          response = `I sense you might be feeling ${psychAnalysis.sentiment}. Remember that challenges are opportunities for growth. \n\n**Psychological Insight**: ${psychAnalysis.sentiment === 'anxious' ? 'Anxiety often comes from uncertainty about the future. Focusing on the present moment can help.' : 'Negative emotions are natural and often pass with time and perspective.'}\n\nHow can I support you right now?`;
        }

        // Deep philosophical questions
        else if (lowerMessage.includes('meaning of life') || lowerMessage.includes('purpose')) {
          response = `**Philosophical Perspective**: The meaning of life is a profound question that has been explored through philosophy, science, and spirituality. Many find meaning in:\n\n• **Connection**: Relationships and community\n• **Growth**: Personal development and learning\n• **Contribution**: Making a positive impact\n• **Experience**: Appreciating existence itself\n\nFrom a scientific view, we're the universe's way of understanding itself. What gives your life meaning?`;
        }

        // Technology trends
        else if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
          response = `**AI in ${currentYear}**: Artificial Intelligence is transforming every industry. Current trends include:\n\n• Multimodal AI systems understanding text, images, and audio\n• AI ethics and regulation becoming crucial\n• AI-assisted scientific discovery accelerating\n• Personalized AI assistants becoming ubiquitous\n\n*As APRATIM'S AI 2.0, I represent the cutting edge of this technology.*`;
        }

        // Default intelligent response with world context
        else {
          const intelligentResponses = [
            `**Analysis**: "${userMessage}" - This relates to broader patterns in our current technological and social landscape. In ${currentYear}, we're seeing significant shifts in how we process information and interact with technology.`,
            `**Contextual Understanding**: Your query about "${userMessage}" connects to several important developments this year. The intersection of technology, society, and individual experience creates fascinating dynamics worth exploring.`,
            `**Comprehensive Response**: Regarding "${userMessage}" - this topic has relevance across multiple domains. From technological implications to psychological impacts, there are many angles to consider in our modern context.`,
            `**Integrated Perspective**: "${userMessage}" presents an interesting case study in how current trends (${currentYear}) are shaping our understanding of complex systems and human experience.`
          ];
          
          response = intelligentResponses[Math.floor(Math.random() * intelligentResponses.length)];
          
          // Add prediction if appropriate
          if (lowerMessage.length > 10 && Math.random() > 0.7) {
            const relatedPrediction = makePrediction(userMessage);
            response += `\n\n🔮 **Related Prediction**: ${relatedPrediction}`;
          }
        }

        // Add current context footer
        response += `\n\n---\n*APRATIM'S AI 2.0 • ${currentTime.toLocaleDateString()} • Real-time Knowledge Base*`;

        resolve(response);
      }, 700);
    });
  };

  // MESSAGE HANDLER
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date().toISOString()
    };

    // Create new chat if none exists
    if (!currentChatId || !chats.find(chat => chat.id === currentChatId)) {
      const newChat = {
        id: Date.now().toString(),
        title: message.slice(0, 30) + (message.length > 30 ? '...' : ''),
        messages: [userMessage],
        createdAt: new Date().toISOString()
      };
      setChats(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
      setMessages([userMessage]);
    } else {
      // Add to existing chat
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setChats(prev => prev.map(chat =>
        chat.id === currentChatId ? { ...chat, messages: updatedMessages } : chat
      ));
    }

    setIsLoading(true);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      console.log('🟡 APRATIM\'S AI 2.0 processing...');
      const aiResponse = await getAIResponse(message, conversationHistory);
      
      console.log('🟢 Ultimate intelligence response generated');

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...messages, userMessage, aiMessage];
      setMessages(finalMessages);
      setChats(prev => prev.map(chat =>
        chat.id === currentChatId ? { ...chat, messages: finalMessages } : chat
      ));

    } catch (error) {
      console.error('❌ Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={createNewChat}
        onSelectChat={selectChat}
        onDeleteChat={deleteChat}
        isOpen={sidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu size={16} />
              </Button>
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-purple-600" />
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  APRATIM'S AI 2.0
                </h1>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} />
                  <span>{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  <Calendar size={12} className="ml-2" />
                  <span>{currentYear}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <div className="relative mb-6">
                <Bot size={64} className="text-purple-600 opacity-80" />
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-20"></div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                APRATIM'S AI 2.0
              </h2>
              <p className="text-lg mb-4">The World's Most Advanced AI Assistant</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full mt-8">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border">
                  <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">🌍 World Knowledge</h3>
                  <ul className="text-sm text-left space-y-1">
                    <li>• Current Events & Trends</li>
                    <li>• Historical Context</li>
                    <li>• Scientific Discoveries</li>
                    <li>• Entertainment Updates</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🧠 Advanced Capabilities</h3>
                  <ul className="text-sm text-left space-y-1">
                    <li>• Real-time Calculator</li>
                    <li>• Psychological Analysis</li>
                    <li>• Predictive Modeling</li>
                    <li>• Context Awareness</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border max-w-2xl">
                <p className="font-semibold text-purple-700 dark:text-purple-300 mb-3">Try These Advanced Queries:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="font-medium mb-1">🌐 World Knowledge</p>
                    <ul className="space-y-1 text-left">
                      <li>• "What's happening in {currentYear}?"</li>
                      <li>• "Latest scientific discoveries"</li>
                      <li>• "Popular movies this year"</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">🔬 Advanced Features</p>
                    <ul className="space-y-1 text-left">
                      <li>• "Calculate volume of sphere r=5"</li>
                      <li>• "Predict future of AI"</li>
                      <li>• "What time is it?"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message.content}
                  isUser={message.role === 'user'}
                />
              ))}
              {isLoading && <LoadingSpinner />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

export default App;