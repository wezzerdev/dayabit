import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send, RotateCcw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

interface ChatOption {
  label: string;
  value: string;
  nextStep: string;
}

interface TriggerPlan {
  planId: string;
  timestamp: number;
}

export default function WhatsAppWidget({ triggerPlan }: { triggerPlan: TriggerPlan | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [options, setOptions] = useState<ChatOption[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [textInput, setTextInput] = useState('');
  
  // Lead information collected
  const [leadData, setLeadData] = useState({
    service: '',
    businessType: '',
    products: '',
    branding: '',
    customNote: '',
    phone: '',
    email: ''
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const phoneNumber = "525625785033"; // Mexico code (52) + user number (5625785033)

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initialize Chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      resetChat();
    }
  }, [isOpen]);

  // Listen to plan triggers from PricingCards
  useEffect(() => {
    if (triggerPlan) {
      startPlanChat(triggerPlan.planId);
    }
  }, [triggerPlan]);

  const startPlanChat = (planId: string) => {
    setIsOpen(true);
    setIsTyping(true);
    setOptions([]); // Clear any current options
    
    let service = '';
    let businessType = '';
    let products = '';
    let botGreeting = '';

    if (planId === 'esencial') {
      service = 'Página Web';
      businessType = 'Negocio Local';
      botGreeting = "¡Hola! Veo que te interesa el plan *Presencia Esencial*. 🌐 He pre-seleccionado una Página Web de una sola sección para tu negocio.";
    } else if (planId === 'vitrina') {
      service = 'Catálogo Digital';
      products = 'Menos de 30 productos';
      botGreeting = "¡Hola! Veo que te interesa el plan *Vitrina Interactiva*. 🛒 He configurado un Catálogo Digital de hasta 30 productos con enlace de cotización por WhatsApp.";
    } else if (planId === 'pro') {
      service = 'Catálogo Digital';
      products = 'Hasta 1,000 productos';
      botGreeting = "¡Hola! Veo que te interesa el plan *Catálogo Pro & Pedidos*. 🛒 He configurado un Catálogo Digital robusto de hasta 1,000 productos y carrito de compras.";
    }

    const updatedLead = {
      service,
      businessType,
      products,
      branding: '',
      customNote: '',
      phone: '',
      email: ''
    };
    setLeadData(updatedLead);

    // Initial greeting bubble
    setMessages([
      {
        id: `plan-msg-1-${Date.now()}`,
        sender: 'bot',
        text: botGreeting,
        timestamp: new Date()
      }
    ]);

    // Next step is branding
    setCurrentStep('branding');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `plan-msg-2-${Date.now()}`,
          sender: 'bot',
          text: "¿Cuentas ya con logotipo e identidad de marca definidos para tu proyecto?",
          timestamp: new Date()
        }
      ]);
      setOptions([
        { label: "👍 Sí, ya tengo logotipo y colores", value: "Sí tiene logotipo", nextStep: "collect_phone" },
        { label: "🎨 No, necesito apoyo de diseño", value: "Necesita diseño de identidad", nextStep: "collect_phone" }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep('welcome');
    setLeadData({
      service: '',
      businessType: '',
      products: '',
      branding: '',
      customNote: '',
      phone: '',
      email: ''
    });
    
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        {
          id: 'msg-1',
          sender: 'bot',
          text: "¡Hola! 👋 Bienvenido a Dayabit. Estoy aquí para ayudarte a perfilar el sitio web o catálogo digital ideal para tu negocio.",
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
      
      // Delay showing first question
      setTimeout(() => {
        setIsTyping(true);
        setMessages(prev => [
          ...prev,
          {
            id: 'msg-2',
            sender: 'bot',
            text: "¿Qué tipo de solución digital estás buscando para tu negocio?",
            timestamp: new Date()
          }
        ]);
        setOptions([
          { label: "🌐 Página Web Profesional", value: "Página Web", nextStep: "web_business_type" },
          { label: "🛒 Catálogo Digital", value: "Catálogo Digital", nextStep: "catalog_size" },
          { label: "💬 Consulta Especial", value: "Consulta Especial", nextStep: "custom_note" }
        ]);
        setIsTyping(false);
      }, 800);
    }, 600);
  };

  const handleOptionClick = (option: ChatOption) => {
    // Add user response bubble
    const userMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: option.label,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setOptions([]); // Clear current options during transition

    // Update state based on current step
    let updatedLead = { ...leadData };
    if (currentStep === 'welcome') {
      updatedLead.service = option.value;
    } else if (currentStep === 'web_business_type') {
      updatedLead.businessType = option.value;
    } else if (currentStep === 'catalog_size') {
      updatedLead.products = option.value;
    } else if (currentStep === 'branding') {
      updatedLead.branding = option.value;
    }
    setLeadData(updatedLead);

    // If the next step is summary, open WhatsApp immediately in the click handler to bypass popup blockers
    if (option.nextStep === 'summary') {
      const ticketMessage = buildSummaryText(updatedLead);
      const encodedText = encodeURIComponent(ticketMessage);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
    }

    // Transition to next bot message
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      processNextStep(option.nextStep);
    }, 1000);
  };

  const processNextStep = (step: string) => {
    setCurrentStep(step);
    const botMsgId = `bot-${Date.now()}`;

    if (step === 'web_business_type') {
      setMessages(prev => [
        ...prev,
        {
          id: botMsgId,
          sender: 'bot',
          text: "¡Excelente elección! 🌐 Para entender la complejidad del diseño, ¿qué tipo de negocio tienes?",
          timestamp: new Date()
        }
      ]);
      setOptions([
        { label: "💼 Servicios / Consultoría", value: "Servicios o Consultoría", nextStep: "branding" },
        { label: "🏪 Negocio Local / Tienda Física", value: "Negocio Local", nextStep: "branding" },
        { label: "✨ Marca Personal / Portafolio", value: "Marca Personal", nextStep: "branding" }
      ]);
    } else if (step === 'catalog_size') {
      setMessages(prev => [
        ...prev,
        {
          id: botMsgId,
          sender: 'bot',
          text: "¡Genial! 🛒 Un catálogo digital impulsará mucho tus ventas. ¿Aproximadamente cuántos artículos necesitas exhibir?",
          timestamp: new Date()
        }
      ]);
      setOptions([
        { label: "✨ Menos de 30 (Vitrina básica)", value: "Menos de 30 productos", nextStep: "branding" },
        { label: "📦 Hasta 1,000 (Catálogo Pro)", value: "Hasta 1,000 productos", nextStep: "branding" },
        { label: "🤔 Aún no estoy seguro", value: "Indefinido", nextStep: "branding" }
      ]);
    } else if (step === 'branding') {
      setMessages(prev => [
        ...prev,
        {
          id: botMsgId,
          sender: 'bot',
          text: "¿Cuentas ya con logotipo e identidad de marca definidos?",
          timestamp: new Date()
        }
      ]);
      setOptions([
        { label: "👍 Sí, ya tengo logotipo y colores", value: "Sí tiene logotipo", nextStep: "collect_phone" },
        { label: "🎨 No, necesito apoyo de diseño", value: "Necesita diseño de identidad", nextStep: "collect_phone" }
      ]);
    } else if (step === 'custom_note') {
      setMessages(prev => [
        ...prev,
        {
          id: botMsgId,
          sender: 'bot',
          text: "Perfecto. 💬 Por favor, descríbeme tu duda o requerimiento especial en el campo de abajo:",
          timestamp: new Date()
        }
      ]);
    } else if (step === 'collect_phone') {
      setMessages(prev => [
        ...prev,
        {
          id: botMsgId,
          sender: 'bot',
          text: "¡Excelente! 📱 Para poder enviarte la cotización formal, los Términos y Condiciones y respaldar tu proyecto, por favor escribe tu **número de teléfono** de contacto:",
          timestamp: new Date()
        }
      ]);
    } else if (step === 'collect_email') {
      setMessages(prev => [
        ...prev,
        {
          id: botMsgId,
          sender: 'bot',
          text: "¡Muchas gracias! 📧 Por último, compártenos tu **correo electrónico** para enviarte la propuesta en PDF y tu información de facturación SAT CFDI 4.0:",
          timestamp: new Date()
        }
      ]);
    } else if (step === 'summary') {
      setMessages(prev => [
        ...prev,
        {
          id: botMsgId,
          sender: 'bot',
          text: "¡Listo! 🎉 He estructurado los detalles de tu solicitud. Presiona el botón verde de abajo para abrir WhatsApp y enviarme tu ticket de cotización sin compromisos.",
          timestamp: new Date()
        }
      ]);
    }
  };

  const handleCustomTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    const userText = textInput.trim();
    setTextInput('');

    const userMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Update state based on current step
    const updatedLead = { ...leadData };
    
    if (currentStep === 'custom_note') {
      updatedLead.customNote = userText;
      setLeadData(updatedLead);
      
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        processNextStep('collect_phone');
      }, 1000);
      
    } else if (currentStep === 'collect_phone') {
      updatedLead.phone = userText;
      setLeadData(updatedLead);
      
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        processNextStep('collect_email');
      }, 1000);
      
    } else if (currentStep === 'collect_email') {
      updatedLead.email = userText;
      setLeadData(updatedLead);
      
      // Open WhatsApp immediately inside direct submit click handler to bypass popups
      const ticketMessage = buildSummaryText(updatedLead);
      const encodedText = encodeURIComponent(ticketMessage);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        processNextStep('summary');
      }, 1000);
    }
  };

  const buildSummaryText = (data: typeof leadData) => {
    let ticket = "💼 *SOLICITUD DE COTIZACIÓN - DAYABIT*\n";
    ticket += "=================================\n\n";
    
    ticket += "📋 *Detalles del Proyecto:*\n";
    ticket += `• Servicio: ${data.service}`;
    
    if (data.service === "Página Web" && data.businessType) {
      ticket += ` (${data.businessType})`;
    } else if (data.service === "Catálogo Digital" && data.products) {
      ticket += ` (${data.products})`;
    }
    ticket += "\n";
    
    if (data.branding) {
      ticket += `• Identidad de marca: ${data.branding}\n`;
    }

    if (data.customNote) {
      ticket += `• Notas especiales: ${data.customNote}\n`;
    }
    
    ticket += "\n👤 *Datos de Contacto:*\n";
    if (data.phone) {
      ticket += `• Teléfono: ${data.phone}\n`;
    }
    if (data.email) {
      ticket += `• Correo: ${data.email}\n`;
    }
    
    ticket += "\n=================================\n";
    ticket += "💡 Nuestros costos ya incluyen impuestos facturables.\n";
    ticket += "⚖️ Puedes consultar nuestros Términos y Condiciones en el pie de página de dayabit.com\n\n";
    ticket += "💬 ¿Cuándo podríamos programar una breve llamada de 15 minutos?";
    return ticket;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Interactive Guided Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="w-[calc(100vw-32px)] sm:w-[380px] rounded-3xl glass-card border border-white/[0.08] shadow-2xl overflow-hidden mb-4 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="14" fill="url(#widget-logo-glow)" opacity="0.1" />
                      <rect x="7" y="6" width="4" height="20" rx="2" fill="url(#widget-logo-left-grad)" />
                      <path d="M9 6H19C24.52 6 29 10.48 29 16C29 21.52 24.52 26 19 26H9" stroke="url(#widget-logo-loop-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="17" cy="12" r="2.5" fill="url(#widget-logo-bit-grad)" />
                      <circle cx="21" cy="16" r="2.5" fill="url(#widget-logo-bit-grad)" />
                      <circle cx="17" cy="20" r="2.5" fill="url(#widget-logo-bit-grad)" />
                      <path d="M17 12L21 16L17 20" stroke="url(#widget-logo-bit-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                      <defs>
                        <linearGradient id="widget-logo-glow" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#8b5cf6" />
                          <stop offset="1" stopColor="#06b6d4" />
                        </linearGradient>
                        <linearGradient id="widget-logo-left-grad" x1="7" y1="6" x2="11" y2="26" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#8b5cf6" />
                          <stop offset="1" stopColor="#6366f1" />
                        </linearGradient>
                        <linearGradient id="widget-logo-loop-grad" x1="9" y1="6" x2="29" y2="26" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#6366f1" />
                          <stop offset="0.5" stopColor="#4f46e5" />
                          <stop offset="1" stopColor="#06b6d4" />
                        </linearGradient>
                        <linearGradient id="widget-logo-bit-grad" x1="14.5" y1="12" x2="23.5" y2="20" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#06b6d4" />
                          <stop offset="1" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#070913]" />
                </div>
                <div className="text-left">
                  <h4 className="text-white font-bold text-sm">Asistente Dayabit</h4>
                  <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Configurando tu cotización
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                {/* Reset Chat Button */}
                <button 
                  onClick={resetChat}
                  title="Reiniciar chat"
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                {/* Close Button */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 bg-[#0b1220]/95 overflow-y-auto space-y-4 text-xs">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed text-left ${
                      msg.sender === 'user' 
                        ? 'bg-violet-600 text-white rounded-tr-none shadow-md shadow-violet-600/10' 
                        : 'bg-white/[0.04] border border-white/[0.04] text-slate-300 rounded-tl-none'
                    }`}>
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-1.5" : ""}>{line}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/[0.04] border border-white/[0.04] rounded-2xl rounded-tl-none p-3.5 flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Interactive Options or Action Buttons Container */}
            <div className="p-4 bg-[#0d1627] border-t border-white/[0.04] flex flex-col gap-2 shrink-0">
              
              {/* Guided Choice Buttons */}
              {options.length > 0 && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="w-full py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-violet-500/40 text-slate-200 hover:text-white font-medium text-left text-xs transition-all duration-200 cursor-pointer flex items-center justify-between group"
                    >
                      <span>{option.label}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-400 text-[10px]">Elegir →</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Free Text Input (For custom note, phone, and email stages) */}
              {(currentStep === 'custom_note' || currentStep === 'collect_phone' || currentStep === 'collect_email') && (
                <form onSubmit={handleCustomTextSubmit} className="flex gap-2 w-full animate-in fade-in duration-200">
                  <input
                    type={currentStep === 'collect_email' ? 'email' : currentStep === 'collect_phone' ? 'tel' : 'text'}
                    placeholder={
                      currentStep === 'collect_phone' 
                        ? "Ej. 55 1234 5678" 
                        : currentStep === 'collect_email' 
                          ? "Ej. cliente@empresa.com" 
                          : "Escribe tu duda aquí..."
                    }
                    required
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="flex-1 bg-white/[0.03] text-white placeholder-slate-500 text-xs py-3 px-4 rounded-xl border border-white/[0.06] focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!textInput.trim()}
                    className={`p-3 rounded-xl transition-all ${
                      textInput.trim() 
                        ? 'bg-violet-600 text-white hover:scale-105 cursor-pointer shadow-lg' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                </form>
              )}

              {/* Final Checkout Button (Send consolidated ticket to WhatsApp) */}
              {currentStep === 'summary' && (
                <div className="space-y-2 animate-in fade-in zoom-in-95 duration-300">
                  <a
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(buildSummaryText(leadData))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/35 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-center decoration-none"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Enviar cotización por WhatsApp
                  </a>
                  <p className="text-[9px] text-slate-500 text-center leading-none">
                    Se abrirá WhatsApp con tu resumen de cotización para iniciar el contacto.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all cursor-pointer group relative"
        aria-label="Iniciar Cotizador Interactivo"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping opacity-75" />
        <MessageCircle className="w-7 h-7 relative z-10 fill-white/10 group-hover:scale-110 transition-transform" />
      </motion.button>

    </div>
  );
}
