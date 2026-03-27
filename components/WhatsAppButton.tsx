import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const message = encodeURIComponent("Hola, quiero automatizar mi negocio para generar más ventas.");
  
  return (
    <a 
      href={`https://wa.me/1234567890?text=${message}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-neon text-black p-4 rounded-full shadow-[0_0_20px_rgba(239,255,0,0.3)] hover:scale-110 transition-transform duration-300 flex items-center justify-center"
    >
      <MessageCircle size={28} className="fill-current" />
    </a>
  );
}
