import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2, Smartphone, Send, Sparkles } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageColor: string;
  iconText: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Café de Especialidad (250g)",
    category: "Cafetería",
    price: 180,
    imageColor: "from-amber-700 to-amber-900",
    iconText: "☕"
  },
  {
    id: "prod-2",
    name: "Termo Inteligente LCD",
    category: "Accesorios",
    price: 350,
    imageColor: "from-slate-700 to-slate-900",
    iconText: "🔋"
  },
  {
    id: "prod-3",
    name: "Playera Premium Dayabit",
    category: "Ropa",
    price: 290,
    imageColor: "from-violet-700 to-violet-900",
    iconText: "👕"
  }
];

export default function InteractiveDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, amount: number) => {
    setCart((prevCart) => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Generate WhatsApp formatted message text
  const getWhatsAppMessage = () => {
    if (cart.length === 0) {
      return "El carrito está vacío. Agrega productos de la izquierda para ver la magia.";
    }
    
    let msg = "🛒 *NUEVO PEDIDO DESDE LA WEB*\n";
    msg += "---------------------------------\n\n";
    
    cart.forEach((item, index) => {
      msg += `${index + 1}. *${item.product.name}*\n`;
      msg += `   Cantidad: ${item.quantity} x $${item.product.price} MXN\n`;
      msg += `   Subtotal: $${item.quantity * item.product.price} MXN\n\n`;
    });
    
    msg += "---------------------------------\n";
    msg += `💰 *TOTAL A PAGAR: $${total} MXN*\n\n`;
    msg += "💬 ¿Me podrían confirmar el costo de envío y el tiempo de entrega?";
    return msg;
  };

  return (
    <section id="demo" className="py-24 bg-brand-bg relative">
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            Experiencia Viva
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight">
            Prueba Nuestro Catálogo Interactivo
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Agrega productos ficticios al carrito a la izquierda y observa a la derecha cómo se genera automáticamente el pedido estructurado listo para enviarse a WhatsApp.
          </p>
        </div>

        {/* Demo Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Catalog & Cart Controls */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Catalog Items */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-300 flex items-center gap-2 text-left">
                <span>🛍️</span> Catálogo de Muestra (Simulado)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockProducts.map((product) => {
                  const isInCart = cart.some(item => item.product.id === product.id);
                  return (
                    <div 
                      key={product.id}
                      className="glass-card p-5 rounded-2xl border border-white/[0.05] hover:border-white/[0.1] transition-all flex flex-col justify-between"
                    >
                      <div className="flex gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.imageColor} shrink-0 flex items-center justify-center text-2xl shadow-inner`}>
                          {product.iconText}
                        </div>
                        <div className="text-left">
                          <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                            {product.category}
                          </span>
                          <h4 className="text-white font-semibold text-sm line-clamp-1 mt-0.5">
                            {product.name}
                          </h4>
                          <p className="text-emerald-400 font-bold text-sm mt-1">
                            ${product.price} MXN
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <button
                          onClick={() => addToCart(product)}
                          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                            isInCart 
                              ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.08]'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          {isInCart ? 'Añadir otro' : 'Agregar al Carrito'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shopping Cart Content */}
            <div className="glass-card p-6 rounded-2xl border border-white/[0.05] text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-300 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-violet-400" />
                  Tu Carrito Simulado
                </h3>
                {cart.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="text-xs text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Vaciar
                  </button>
                )}
              </div>

              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-8 text-center text-slate-500 text-sm"
                  >
                    El carrito está vacío. Agrega algún producto arriba para iniciar la simulación.
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.product.iconText}</span>
                          <div>
                            <h4 className="text-white font-semibold text-xs sm:text-sm">
                              {item.product.name}
                            </h4>
                            <p className="text-slate-400 text-xs mt-0.5">
                              ${item.product.price} MXN c/u
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-slate-900 border border-white/[0.08] rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-white font-bold text-xs px-2.5 min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                    
                    <div className="flex justify-between items-center pt-4 border-t border-white/[0.06] mt-4">
                      <span className="text-slate-400 text-sm font-semibold">Total Acumulado:</span>
                      <span className="text-emerald-400 text-lg font-bold">${total} MXN</span>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column: Smartphone Mockup showing WhatsApp message */}
          <div className="lg:col-span-5 flex justify-center">
            
            <div className="relative w-full max-w-[320px] aspect-[9/18] bg-slate-950 rounded-[48px] border-4 border-slate-800 shadow-2xl p-3 flex flex-col justify-between overflow-hidden">
              {/* Speaker & Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-slate-800 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-700 rounded-full mb-1" />
              </div>

              {/* Phone Header */}
              <div className="pt-6 pb-2 px-3 border-b border-white/[0.04] bg-[#0c1221] -mx-3 -mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-bold">12:30</span>
                <div className="flex gap-1 items-center">
                  <div className="w-2.5 h-2.5 bg-slate-400 rounded-full" />
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* WhatsApp Interface Body */}
              <div className="flex-1 bg-[#0b141a] p-3 -mx-3 overflow-y-auto space-y-4 flex flex-col justify-end">
                {/* Chat Partner Header */}
                <div className="absolute top-11 left-0 right-0 py-2.5 px-4 bg-[#1f2c34] flex items-center gap-2.5 z-10 shadow">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">
                    D
                  </div>
                  <div>
                    <h5 className="text-white text-xs font-bold leading-none">Dayabit Soporte</h5>
                    <span className="text-[9px] text-emerald-400 leading-none">en línea</span>
                  </div>
                </div>

                {/* Simulated Chat Bubbles */}
                <div className="space-y-3 pt-12 pb-1 text-xs">
                  {/* Business Welcome message */}
                  <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-[#202c33] p-3 text-white text-left leading-relaxed">
                    👋 Hola. ¡Gracias por escribir a Dayabit! Agrega tus productos y envíanos el ticket para cotizar tu envío.
                  </div>

                  {/* Customer preformatted ticket bubble */}
                  {cart.length > 0 && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="max-w-[85%] ml-auto rounded-2xl rounded-tr-none bg-[#005c4b] p-3 text-white text-left leading-relaxed relative"
                    >
                      <pre className="font-sans text-[11px] whitespace-pre-wrap leading-tight text-slate-100">
                        {getWhatsAppMessage()}
                      </pre>
                      <span className="block text-[8px] text-emerald-300 text-right mt-1.5">
                        12:31 ✓✓
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Input & Send controls */}
              <div className="py-2.5 px-2 bg-[#1f2c34] -mx-3 -mb-3 flex items-center gap-2">
                <div className="flex-1 py-1.5 px-3 rounded-full bg-[#2a3942] text-[11px] text-slate-300 text-left truncate">
                  {cart.length > 0 ? "Ticket listo para enviar..." : "Elige productos..."}
                </div>
                <a
                  href={cart.length > 0 ? `https://wa.me/525625785033?text=${encodeURIComponent(getWhatsAppMessage())}` : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (cart.length === 0) {
                      e.preventDefault();
                    }
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    cart.length > 0 
                      ? 'bg-emerald-500 text-white shadow-lg cursor-pointer hover:scale-105' 
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5 fill-current ml-0.5" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
