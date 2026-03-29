"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight, Bot, Monitor, Palette, Share2, Sparkles, Activity,
  Zap, TrendingUp, Users, Clock, CheckCircle, ChevronRight, Star,
  MessageCircle, Target, Rocket, ShieldCheck, ChevronDown, Send,
} from "lucide-react";

/* ─── VARIANTS ───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

/* ─── CTA BUTTON ─────────────────────────────────────────── */
function CtaButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}) {
  const base =
    variant === "primary"
      ? "bg-neon text-black font-black"
      : "border border-white/10 text-white/80 font-semibold bg-transparent hover:bg-white/[0.04] hover:border-white/20";

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{
        scale: 1.03,
        y: -2,
        boxShadow:
          variant === "primary"
            ? "0 0 50px rgba(239,255,0,0.45), 0 0 20px rgba(239,255,0,0.2)"
            : "0 0 20px rgba(239,255,0,0.06)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base overflow-hidden transition-colors ${base} ${className}`}
    >
      {/* shimmer sweep */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

/* ─── ANIMATED COUNTER ───────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, motionVal, to]);

  useEffect(() => {
    const unsub = spring.on("change", (v) =>
      setDisplay(Math.round(v).toString())
    );
    return unsub;
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ─── ORBS ───────────────────────────────────────────────── */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-neon/[0.03] blur-[120px]" />
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-neon/[0.04] blur-[100px]" />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-neon/[0.03] blur-[90px]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(239,255,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(239,255,0,0.8) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

/* ─── BENTO CARD ─────────────────────────────────────────── */
function BentoCard({
  icon, title, desc, tag, className = "",
}: {
  icon: React.ReactNode; title: string; desc: string;
  tag?: string; className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative group rounded-2xl border bg-white/[0.02] border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.04] p-8 overflow-hidden transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(239,255,0,0.04),transparent_60%)]" />
      <div className="relative z-10">
        {tag && (
          <span className="inline-block px-3 py-1 bg-neon/10 text-neon text-xs font-bold rounded-full mb-5 tracking-widest uppercase">
            {tag}
          </span>
        )}
        <div className="w-12 h-12 rounded-xl bg-white/5 text-gray-300 flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── TESTIMONIAL ────────────────────────────────────────── */
function TestimonialCard({
  quote, name, role, metric,
}: {
  quote: string; name: string; role: string; metric: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 flex flex-col gap-6 hover:border-white/10 transition-colors"
    >
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="text-neon fill-neon" />
        ))}
      </div>
      <p className="text-gray-300 leading-relaxed italic text-sm">"{quote}"</p>
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon/20 to-neon/5 border border-neon/20 flex items-center justify-center text-neon font-bold text-sm">
            {name[0]}
          </div>
          <div>
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-neon font-bold text-lg">{metric}</p>
          <p className="text-xs text-gray-500">resultado</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── FAQ ITEM ───────────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
        open
          ? "border-neon/30 bg-neon/[0.03]"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.10]"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="text-neon/40 text-sm font-black tabular-nums shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-bold text-base text-white leading-snug">{q}</span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 transition-colors ${open ? "text-neon" : "text-gray-500"}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-7 pb-6">
              <div className="ml-10 border-l border-neon/20 pl-5">
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── CONTACT FORM ───────────────────────────────────────── */
function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="formulario" className="w-full py-32 px-6 border-t border-white/[0.05]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <p className="text-neon text-sm font-bold tracking-widest uppercase mb-4">
            Escribinos
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Contanos sobre
            <br />
            <span className="text-neon">tu negocio.</span>
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Completá el formulario y te respondemos en menos de 2 horas con un
            diagnóstico inicial sin cargo.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative"
        >
          {/* Card glow border */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-neon/10 via-transparent to-neon/5 pointer-events-none" />

          <div className="relative bg-[#0a0a0a] border border-white/[0.07] rounded-3xl p-8 md:p-12">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 gap-5 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center">
                    <CheckCircle size={28} className="text-neon" />
                  </div>
                  <h3 className="text-2xl font-black">¡Mensaje enviado!</h3>
                  <p className="text-gray-400 max-w-xs text-sm">
                    Te respondemos en menos de 2 horas. Revisá tu bandeja de entrada.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-neon text-sm font-bold underline underline-offset-4 mt-2 hover:opacity-70 transition-opacity"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  {/* Nombre + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Nombre
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Tu nombre"
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 focus:border-neon focus:bg-neon/[0.03] focus:shadow-[0_0_0_3px_rgba(239,255,0,0.06)]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Email de empresa
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vos@tuempresa.com"
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 focus:border-neon focus:bg-neon/[0.03] focus:shadow-[0_0_0_3px_rgba(239,255,0,0.06)]"
                      />
                    </div>
                  </div>

                  {/* Servicio */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      ¿Qué necesitás?
                    </label>
                    <select
                      defaultValue=""
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-gray-300 outline-none transition-all duration-200 focus:border-neon focus:bg-neon/[0.03] focus:shadow-[0_0_0_3px_rgba(239,255,0,0.06)] appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#111]">
                        Seleccioná un servicio
                      </option>
                      <option value="ia" className="bg-[#111]">Agentes de IA / Automatización</option>
                      <option value="cm" className="bg-[#111]">Community Management Estratégico</option>
                      <option value="web" className="bg-[#111]">Diseño Web que Convierte</option>
                      <option value="ads" className="bg-[#111]">Growth & Paid Ads</option>
                      <option value="branding" className="bg-[#111]">Branding Premium</option>
                      <option value="todo" className="bg-[#111]">Todo lo anterior (escalar 🚀)</option>
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Contanos tu situación
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="¿Cuál es tu mayor problema hoy? ¿Qué querés lograr? Cuanto más nos cuentes, mejor el diagnóstico."
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 focus:border-neon focus:bg-neon/[0.03] focus:shadow-[0_0_0_3px_rgba(239,255,0,0.06)] resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        boxShadow:
                          "0 0 40px rgba(239,255,0,0.35), 0 0 15px rgba(239,255,0,0.15)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="group relative w-full overflow-hidden bg-neon text-black font-black text-base py-4 rounded-xl flex items-center justify-center gap-2"
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.55, ease: "easeInOut" }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        Enviar y recibir diagnóstico gratis
                        <Send size={16} />
                      </span>
                    </motion.button>
                    <p className="text-center text-gray-600 text-xs mt-3">
                      Sin spam · Respuesta en menos de 2 horas · 100% confidencial
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FAQ SECTION ────────────────────────────────────────── */
function FaqSection() {
  const faqs = [
    {
      q: "¿En cuánto tiempo veo resultados?",
      a: "Depende del servicio, pero en automatizaciones el impacto es inmediato: el primer día el sistema ya está respondiendo leads. En Community Management y Paid Ads, los resultados medibles aparecen entre la semana 2 y el mes 1. No trabajamos con plazos de 3 meses para \"ver si funciona\".",
    },
    {
      q: "¿Qué incluye el servicio de Community Management?",
      a: "Incluye estrategia de contenido mensual, producción y publicación de piezas para Instagram, Facebook y/o LinkedIn, gestión de comentarios y mensajes directos, reporte mensual de métricas, y opcionalmente pauta en Meta y Google Ads para escalar el alcance orgánico. No es solo postear fotos: es construir una audiencia que compra.",
    },
    {
      q: "¿Ofrecen soporte post-lanzamiento?",
      a: "Sí, siempre. No lanzamos y desaparecemos. Todos nuestros servicios incluyen un período de soporte y optimización post-lanzamiento. Además, somos partners de largo plazo: muchos clientes llevan más de 12 meses trabajando con nosotros porque seguimos generando valor mes a mes.",
    },
    {
      q: "¿Necesito conocimientos técnicos para usar los sistemas de IA?",
      a: "Para nada. Nos encargamos de todo: configuración, integración con tus herramientas actuales (WhatsApp, CRM, agenda) y capacitación. Vos solo ves los resultados en el dashboard. Si algo falla, nosotros lo resolvemos, no vos.",
    },
    {
      q: "¿Trabajan con cualquier tipo de negocio?",
      a: "Trabajamos mejor con negocios que ya tienen tracción y quieren escalar: e-commerce, clínicas, inmobiliarias, SaaS, consultoras y dueños de negocio que están dejando plata sobre la mesa por falta de automatización o presencia digital. Si tenés dudas sobre si aplica tu caso, agendá la auditoría gratuita y te lo decimos en 30 minutos.",
    },
  ];

  return (
    <section className="w-full py-32 px-6 border-t border-white/[0.05]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <p className="text-neon text-sm font-bold tracking-widest uppercase mb-4">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Preguntas frecuentes.
          </h2>
          <p className="text-gray-500 text-base">
            Todo lo que necesitás saber antes de empezar.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger(0.08)}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-10 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            ¿Tenés una pregunta que no está acá?
          </p>
          <CtaButton
            href="https://wa.me/1234567890"
            variant="secondary"
            external
            className="px-6 py-3 text-sm"
          >
            Preguntanos por WhatsApp <ArrowRight size={14} />
          </CtaButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden bg-[#050505]">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <FloatingOrbs />

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/20 bg-neon/5 text-xs font-semibold text-neon mb-8 tracking-wider uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          IA + Diseño de élite · Partners de crecimiento
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-5xl text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6"
        >
          Dejá de perder clientes
          <br />
          <span className="relative inline-block">
            <span className="text-neon">por no responder a tiempo.</span>
            <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon to-transparent opacity-60" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="relative z-10 max-w-2xl text-center text-lg md:text-xl text-gray-400 mb-12 leading-relaxed"
        >
          Escalamos tu negocio con{" "}
          <span className="text-white font-semibold">IA y diseño de élite</span>{" "}
          para que conviertas más consultas en ventas, 24/7. Tu empresa en{" "}
          <span className="text-white font-semibold">piloto automático</span>,
          sin perder el control.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          <CtaButton href="#formulario" variant="primary">
            Quiero una Auditoría Gratis <ArrowRight size={18} />
          </CtaButton>
          <CtaButton href="#servicios" variant="secondary">
            Ver cómo lo hacemos <ChevronRight size={16} />
          </CtaButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="relative z-10 mt-16 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500"
        >
          {[
            "+50 negocios escalados",
            "Respuesta en <1 seg",
            "Partners, no proveedores",
            "Sin contrato mínimo",
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={14} className="text-neon" />
              <span>{t}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="w-full py-20 px-6 border-y border-white/[0.05]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger(0.12)}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: 50,  suffix: "+",  label: "Negocios escalados",           icon: <TrendingUp size={20} /> },
            { value: 98,  suffix: "%",  label: "Clientes satisfechos",          icon: <Star size={20} /> },
            { value: 3,   suffix: "x",  label: "Aumento promedio en ventas",    icon: <Zap size={20} /> },
            { value: 10,  suffix: "hs", label: "Semanales recuperadas con IA",  icon: <Clock size={20} /> },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col items-center gap-2">
              <div className="text-neon mb-1 opacity-60">{stat.icon}</div>
              <p className="text-4xl md:text-5xl font-black tracking-tight text-white">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-gray-500 text-xs md:text-sm leading-snug max-w-[130px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── PROBLEMA ──────────────────────────────────────── */}
      <section className="w-full py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-neon text-sm font-bold tracking-widest uppercase mb-4">
              El problema real
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]">
              Mientras vos atendés el negocio,
              <br />
              <span className="text-gray-600">tu competencia te come el almuerzo.</span>
            </h2>
            <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              No es falta de producto ni de ganas. Es que operar de forma manual
              en 2025 te hace invisible ante clientes que compran en segundos.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger(0.15)}
            className="grid md:grid-cols-3 gap-5"
          >
            {[
              { icon: <Clock size={24} />, title: "Respondés tarde o nunca", desc: "El 78% de los compradores elige al primero en responder. Si tardás más de 5 minutos en contestar un mensaje, esa venta ya no es tuya.", stat: "5 min", statLabel: "es todo lo que tenés para cerrar" },
              { icon: <Activity size={24} />, title: "10 horas semanales tiradas", desc: "Precio, disponibilidad, horario, cómo llego. Las mismas preguntas, todos los días. Tiempo que no genera valor y te agota mentalmente.", stat: "10hs", statLabel: "por semana en tareas que la IA puede hacer" },
              { icon: <Users size={24} />, title: "Leads que se enfrían solos", desc: "Un mensaje a las 11pm sin respuesta es una venta perdida para siempre. Tu competencia tiene sistemas que contestan a las 3am. Vos, no.", stat: "60%", statLabel: "de consultas nocturnas sin atender" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-7 hover:border-white/10 transition-all">
                <div className="w-11 h-11 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-5">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{item.desc}</p>
                <div className="pt-4 border-t border-white/[0.05]">
                  <span className="text-2xl font-black text-white">{item.stat}</span>
                  <span className="text-gray-600 text-xs ml-2">{item.statLabel}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICIOS ─────────────────────────────────────── */}
      <section id="servicios" className="w-full py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-neon text-sm font-bold tracking-widest uppercase mb-4">Lo que hacemos</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              No somos una agencia más.
              <br />
              <span className="text-gray-500">Somos tu equipo de crecimiento.</span>
            </h2>
            <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto">
              Combinamos tecnología de vanguardia con estrategia real para que cada peso que invertís vuelva multiplicado.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.08)} className="grid md:grid-cols-3 gap-5">
            {/* Hero card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.01, boxShadow: "0 0 40px rgba(239,255,0,0.08)", transition: { duration: 0.2 } }}
              className="md:col-span-2 relative group bg-neon/[0.04] border border-neon/20 hover:border-neon/50 rounded-2xl p-10 overflow-hidden transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500"><Bot size={160} className="text-neon" /></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_20%_50%,rgba(239,255,0,0.05),transparent_60%)]" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-neon/10 text-neon text-xs font-bold rounded-full mb-6 tracking-widest uppercase">★ Servicio estrella</span>
                <h3 className="text-3xl font-black mb-4 tracking-tight">Agentes de IA que trabajan por vos</h3>
                <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-lg">
                  Eliminamos las tareas repetitivas que te quitan{" "}
                  <span className="text-white font-semibold">10 horas a la semana</span>.
                  Implementamos agentes de IA en WhatsApp, email y web para que tu empresa atienda, califique y cierre ventas{" "}
                  <span className="text-white font-semibold">mientras vos descansás</span>.
                </p>
                <ul className="flex flex-wrap gap-3">
                  {["Respuesta en <1s", "Calificación de leads", "Agenda automática", "Integración CRM"].map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-sm text-gray-300 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon inline-block" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* CM card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative group rounded-2xl border bg-white/[0.02] border-white/[0.06] hover:border-neon/20 hover:bg-white/[0.04] p-8 overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(239,255,0,0.04),transparent_60%)]" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-neon/10 text-neon text-xs font-bold rounded-full mb-5 tracking-widest uppercase">Nuevo</span>
                <div className="w-12 h-12 rounded-xl bg-white/5 text-gray-300 flex items-center justify-center mb-6"><MessageCircle size={22} /></div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">Community Management Estratégico</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  No solo posteamos fotos. Creamos comunidades, gestionamos tu reputación y convertimos seguidores en clientes con{" "}
                  <span className="text-gray-300 font-medium">estrategia de contenido real + pauta en Meta y Google</span>{" "}
                  para que tus redes vendan, no solo se vean lindas.
                </p>
              </div>
            </motion.div>

            <BentoCard icon={<Monitor size={22} />} title="Diseño Web que Convierte" desc="Tu web carga en milisegundos con Next.js mientras la de tu competencia tarda 5 segundos. Landing pages diseñadas para vender, no solo para existir." tag="Next.js · Velocidad" />
            <BentoCard icon={<Share2 size={22} />} title="Growth & Paid Ads" desc="Pauta inteligente en Meta, Google y TikTok. Cada peso invertido rastreado, optimizado y reportado. Sin magia negra, con resultados medibles." />
            <BentoCard icon={<Palette size={22} />} title="Branding Premium" desc="Una identidad visual que justifica precios más altos antes de que abras la boca. El diseño es la primera venta que hacés." />
          </motion.div>
        </div>
      </section>

      {/* ── POR QUÉ NEXORA ────────────────────────────────── */}
      <section className="w-full py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <p className="text-neon text-sm font-bold tracking-widest uppercase mb-4">Por qué Nexora</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              No somos proveedores.
              <br />
              <span className="text-neon">Somos tus partners.</span>
            </h2>
            <p className="text-gray-500 text-lg mt-6 max-w-xl mx-auto">
              Nos importa que tu negocio crezca porque cuando vos ganás, nosotros ganamos. Así de simple.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.15)} className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Rocket size={28} />, title: "Velocidad de ejecución", desc: "No hacemos presupuestos que demoran 3 semanas. En 48hs tenés una estrategia clara y en 7 días el primer sistema funcionando. El tiempo es dinero, el tuyo también.", highlight: "De idea a ejecución en 7 días." },
              { icon: <Sparkles size={28} />, title: "Tecnología de vanguardia", desc: "Usamos Next.js, IA generativa, automatización con n8n y las últimas APIs del mercado. No te vendemos herramientas de 2018 con precio de 2025.", highlight: "IA real. No humo." },
              { icon: <Target size={28} />, title: "Foco 100% en ventas", desc: "No diseñamos para que quede lindo en el portfolio. Cada decisión de diseño, copy y automatización está orientada a una sola cosa: que tu negocio facture más.", highlight: "Resultados medibles, siempre." },
            ].map((pillar, i) => (
              <motion.div key={i} variants={fadeUp} className="relative group p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-neon/20 transition-all duration-300">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(239,255,0,0.04),transparent_60%)]" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-neon/10 text-neon flex items-center justify-center mb-6">{pillar.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{pillar.desc}</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-white/[0.05]">
                    <ShieldCheck size={14} className="text-neon shrink-0" />
                    <span className="text-neon text-xs font-bold">{pillar.highlight}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────────── */}
      <section className="w-full py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <p className="text-neon text-sm font-bold tracking-widest uppercase mb-4">Nuestro proceso</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              Tres pasos para que
              <br />
              tu negocio trabaje solo.
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon/20 to-transparent -translate-x-1/2" />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.2)} className="flex flex-col gap-16">
              {[
                { step: "01", title: "Auditoría gratuita", desc: "Analizamos tu proceso de ventas actual y te decimos en 30 minutos exactamente dónde estás perdiendo plata. Sin rodeos, sin PowerPoints de relleno.", icon: <Activity size={22} />, side: "left" },
                { step: "02", title: "Diseño del sistema", desc: "Construimos la estrategia y el stack tecnológico a medida. Nada genérico. Cada automatización, cada copy y cada flujo está pensado para tu industria y tu cliente.", icon: <Sparkles size={22} />, side: "right" },
                { step: "03", title: "Lanzamos y escalamos", desc: "En 7 días tu sistema está vivo. Medimos todo, reportamos todo y optimizamos mes a mes para que tu facturación siga subiendo sin que tengas que estar encima.", icon: <TrendingUp size={22} />, side: "left" },
              ].map((item) => (
                <motion.div key={item.step} variants={fadeUp} className="md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 flex flex-col">
                  <div className={`w-full ${item.side === "left" ? "md:text-right" : "md:order-3 md:text-left"}`}>
                    {item.side === "left" && (<div>
                      <p className="text-neon/30 text-6xl font-black leading-none mb-3 tracking-tighter">{item.step}</p>
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>)}
                  </div>
                  <div className="flex items-center justify-center md:order-2">
                    <div className="w-14 h-14 rounded-full bg-[#050505] border-2 border-neon flex items-center justify-center text-neon shadow-[0_0_20px_rgba(239,255,0,0.25)] z-10 shrink-0">{item.icon}</div>
                  </div>
                  <div className={`w-full ${item.side === "right" ? "md:order-1 md:text-right" : ""}`}>
                    {item.side === "right" && (<div>
                      <p className="text-neon/30 text-6xl font-black leading-none mb-3 tracking-tighter">{item.step}</p>
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ───────────────────────────────────── */}
      <section className="w-full py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-neon text-sm font-bold tracking-widest uppercase mb-4">Resultados reales</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Ellos ya están escalando.
              <br />
              <span className="text-gray-600">¿Cuándo empezás vos?</span>
            </h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.15)} className="grid md:grid-cols-2 gap-6">
            <TestimonialCard quote="Filtramos a los curiosos y ahora solo hablamos con gente lista para comprar. El bot de Nexora paga solo en el primer mes. Ojalá lo hubiera hecho antes." name="Martín L." role="Dueño de E-commerce, Montevideo" metric="+40% ventas" />
            <TestimonialCard quote="Antes perdía horas respondiendo mensajes a la madrugada. Ahora el sistema agenda solo. Me devolvieron mi tiempo libre y mis ventas subieron igual." name="Sofía R." role="Directora de Clínica Estética, Buenos Aires" metric="-10hs/semana" />
            <TestimonialCard quote="La landing nueva convierte el doble y carga en un segundo. Mi competencia sigue con webs lentas de 2019. La diferencia es brutal." name="Diego M." role="CEO Inmobiliaria, Punta del Este" metric="2x conversión" />
            <TestimonialCard quote="En 7 días teníamos el sistema vivo y los leads calificados entrando solos al CRM. No son una agencia, son realmente un equipo de tu lado." name="Valentina C." role="Fundadora de SaaS B2B, Montevideo" metric="7 días al lanzar" />
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────── */}
      <section id="contacto" className="w-full py-32 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-neon/[0.06] blur-[80px] rounded-3xl" />
          <div className="relative bg-[#0a0a0a] border border-neon/20 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/20 bg-neon/5 text-xs font-bold text-neon mb-8 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
              Cupos limitados — solo 5 auditorías por semana
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[1.0]">
              Tu competencia ya está
              <br />
              <span className="text-neon">usando IA. ¿Y vos?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Agendá tu auditoría gratuita hoy. En 30 minutos te mostramos exactamente cuánto estás dejando sobre la mesa y cómo recuperarlo. Sin compromiso, sin letra chica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CtaButton href="https://wa.me/1234567890" variant="primary" external className="px-10 py-5 text-lg">
                Empezar a Escalar Ahora <ArrowRight size={20} />
              </CtaButton>
              <CtaButton href="#formulario" variant="secondary" className="px-8 py-5 text-base">
                Escribirnos
              </CtaButton>
            </div>
            <p className="text-gray-600 text-sm mt-6">
              Respondemos en menos de 2 horas · Sin contrato mínimo · 100% personalizado
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── FORMULARIO ────────────────────────────────────── */}
      <ContactForm />

      {/* ── FAQ ───────────────────────────────────────────── */}
      <FaqSection />

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="w-full py-10 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <div className="w-6 h-6 bg-neon rounded-md flex items-center justify-center">
              <Zap size={13} className="text-black" />
            </div>
            Nexora
          </div>
          <p>© {new Date().getFullYear()} Nexora · Partners de crecimiento digital</p>
          <div className="flex gap-6">
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#formulario" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
