"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Monitor,
  Palette,
  Share2,
  Sparkles,
  Activity,
  Zap,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  ChevronRight,
  Star,
} from "lucide-react";

/* ─── ANIMATION VARIANTS ─────────────────────────────────── */
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

/* ─── FLOATING ORBS BACKGROUND ──────────────────────────── */
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
  icon,
  title,
  desc,
  tag,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag?: string;
  className?: string;
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

/* ─── TESTIMONIAL CARD ───────────────────────────────────── */
function TestimonialCard({
  quote,
  name,
  role,
  metric,
}: {
  quote: string;
  name: string;
  role: string;
  metric: string;
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

/* ─── PAGE ───────────────────────────────────────────────── */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden bg-[#050505]">

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <FloatingOrbs />

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/20 bg-neon/5 text-xs font-semibold text-neon mb-8 tracking-wider uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          Sistemas de IA · Agencia de automatización
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-5xl text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6"
        >
          Tu negocio vendiendo
          <br />
          <span className="relative inline-block">
            <span className="text-neon">mientras dormís.</span>
            <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon to-transparent opacity-60" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="relative z-10 max-w-2xl text-center text-lg md:text-xl text-gray-400 mb-12 leading-relaxed"
        >
          Automatizamos tus ventas con IA para que respondas en{" "}
          <span className="text-white font-semibold">menos de 1 segundo</span>,
          califiques leads solo y cierres más, sin esfuerzo humano.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          <a
            href="#contacto"
            className="group relative px-8 py-4 bg-neon text-black font-bold rounded-xl text-base overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(239,255,0,0.35)] hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span className="relative z-10">Quiero automatizar mi negocio</span>
            <ArrowRight
              size={18}
              className="relative z-10 group-hover:translate-x-1 transition-transform"
            />
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </a>
          <a
            href="#servicios"
            className="px-8 py-4 border border-white/10 text-white/80 font-semibold rounded-xl text-base hover:bg-white/[0.04] hover:border-white/20 transition-all flex items-center gap-2"
          >
            Ver servicios <ChevronRight size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="relative z-10 mt-16 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500"
        >
          {[
            "+50 negocios automatizados",
            "Respuesta en <1 seg",
            "Soporte 24/7",
            "Sin contrato mínimo",
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={14} className="text-neon" />
              <span>{t}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          2. STATS
      ══════════════════════════════════════ */}
      <section className="w-full py-20 px-6 border-y border-white/[0.05]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger(0.12)}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            {
              value: 50,
              suffix: "+",
              label: "Proyectos entregados",
              icon: <TrendingUp size={20} />,
            },
            {
              value: 98,
              suffix: "%",
              label: "Clientes satisfechos",
              icon: <Star size={20} />,
            },
            {
              value: 3,
              suffix: "x",
              label: "Aumento promedio en ventas",
              icon: <Zap size={20} />,
            },
            {
              value: 24,
              suffix: "/7",
              label: "Disponibilidad del sistema",
              icon: <Clock size={20} />,
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col items-center gap-2"
            >
              <div className="text-neon mb-1 opacity-60">{stat.icon}</div>
              <p className="text-4xl md:text-5xl font-black tracking-tight text-white">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-gray-500 text-xs md:text-sm leading-snug max-w-[120px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          3. PROBLEMA
      ══════════════════════════════════════ */}
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
              Cada minuto sin responder
              <br />
              <span className="text-gray-600">es dinero que se va.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger(0.15)}
            className="grid md:grid-cols-3 gap-5"
          >
            {[
              {
                icon: <Clock size={24} />,
                title: "Respondés tarde",
                desc: "El 78% de los compradores elige al primero en responder. Si tardás más de 5 minutos, ya perdiste.",
                stat: "78%",
                statLabel: "van al que responde primero",
              },
              {
                icon: <Activity size={24} />,
                title: "Tiempo desperdiciado",
                desc: "Horas respondiendo las mismas preguntas de precio, horario y disponibilidad. Tiempo que no escala.",
                stat: "4hs",
                statLabel: "por día en mensajes repetitivos",
              },
              {
                icon: <Users size={24} />,
                title: "Leads que se enfrían",
                desc: "Un mensaje a las 2am sin respuesta es una venta que nunca va a pasar. Tu competencia sí contesta.",
                stat: "60%",
                statLabel: "de consultas nocturnas sin atender",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-7 hover:border-white/10 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {item.desc}
                </p>
                <div className="pt-4 border-t border-white/[0.05]">
                  <span className="text-2xl font-black text-white">
                    {item.stat}
                  </span>
                  <span className="text-gray-600 text-xs ml-2">
                    {item.statLabel}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. SERVICIOS — BENTO GRID
      ══════════════════════════════════════ */}
      <section
        id="servicios"
        className="w-full py-32 px-6 border-t border-white/[0.05]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-neon text-sm font-bold tracking-widest uppercase mb-4">
              Lo que hacemos
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              El stack completo
              <br />
              para escalar tu negocio.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger(0.08)}
            className="grid md:grid-cols-3 gap-5"
          >
            {/* Hero card — span 2 */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="md:col-span-2 relative group bg-neon/[0.04] border border-neon/20 hover:border-neon/50 rounded-2xl p-10 overflow-hidden transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Bot size={160} className="text-neon" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_20%_50%,rgba(239,255,0,0.05),transparent_60%)]" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-neon/10 text-neon text-xs font-bold rounded-full mb-6 tracking-widest uppercase">
                  ★ Oferta estrella
                </span>
                <h3 className="text-3xl font-black mb-4 tracking-tight">
                  Automatización de WhatsApp
                </h3>
                <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-lg">
                  Un agente de IA que atiende, califica y cierra consultas 24/7.
                  Se integra con tu CRM y agenda reuniones automáticamente.
                </p>
                <ul className="flex flex-wrap gap-3">
                  {[
                    "Respuesta en <1s",
                    "Calificación de leads",
                    "Agenda automática",
                    "Integración CRM",
                  ].map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-1.5 text-sm text-gray-300 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neon inline-block" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <BentoCard
              icon={<Monitor size={22} />}
              title="Diseño Web"
              desc="Landing pages diseñadas para convertir. Rápidas, hermosas y con foco en resultados."
              tag="Conversión"
            />
            <BentoCard
              icon={<Sparkles size={22} />}
              title="IA Solutions"
              desc="Sistemas a medida que reducen costos operativos y automatizan flujos complejos."
            />
            <BentoCard
              icon={<Share2 size={22} />}
              title="Social Media"
              desc="Estrategias de contenido que generan demanda real y posicionan tu marca."
            />
            <BentoCard
              icon={<Palette size={22} />}
              title="Branding"
              desc="Identidad visual premium que justifica precios más altos y genera confianza."
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. PROCESO
      ══════════════════════════════════════ */}
      <section className="w-full py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <p className="text-neon text-sm font-bold tracking-widest uppercase mb-4">
              Nuestro proceso
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              De cero a automatizado
              <br />
              en 3 pasos.
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon/20 to-transparent -translate-x-1/2" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger(0.2)}
              className="flex flex-col gap-16"
            >
              {[
                {
                  step: "01",
                  title: "Auditoría de tu negocio",
                  desc: "Analizamos en profundidad dónde estás perdiendo leads, qué preguntas se repiten y cómo es tu proceso de venta actual. Identificamos el cuello de botella exacto.",
                  icon: <Activity size={22} />,
                  side: "left",
                },
                {
                  step: "02",
                  title: "Diseño de la estrategia",
                  desc: "Construimos el sistema de automatización a medida: el flujo de conversación, la lógica de calificación y las integraciones necesarias para tu industria.",
                  icon: <Sparkles size={22} />,
                  side: "right",
                },
                {
                  step: "03",
                  title: "Ejecución y optimización",
                  desc: "Implementamos, testeamos y lanzamos. Después medimos resultados reales y ajustamos para maximizar la tasa de conversión mes a mes.",
                  icon: <TrendingUp size={22} />,
                  side: "left",
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  className="md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 flex flex-col"
                >
                  {/* Left slot */}
                  <div
                    className={`w-full ${
                      item.side === "left"
                        ? "md:text-right"
                        : "md:order-3 md:text-left"
                    }`}
                  >
                    {item.side === "left" && (
                      <div>
                        <p className="text-neon/30 text-6xl font-black leading-none mb-3 tracking-tighter">
                          {item.step}
                        </p>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="flex items-center justify-center md:order-2">
                    <div className="w-14 h-14 rounded-full bg-[#050505] border-2 border-neon flex items-center justify-center text-neon shadow-[0_0_20px_rgba(239,255,0,0.25)] z-10 shrink-0">
                      {item.icon}
                    </div>
                  </div>

                  {/* Right slot */}
                  <div
                    className={`w-full ${
                      item.side === "right"
                        ? "md:order-1 md:text-right"
                        : ""
                    }`}
                  >
                    {item.side === "right" && (
                      <div>
                        <p className="text-neon/30 text-6xl font-black leading-none mb-3 tracking-tighter">
                          {item.step}
                        </p>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. TESTIMONIOS
      ══════════════════════════════════════ */}
      <section className="w-full py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-neon text-sm font-bold tracking-widest uppercase mb-4">
              Resultados reales
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Lo que dicen nuestros clientes.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger(0.15)}
            className="grid md:grid-cols-2 gap-6"
          >
            <TestimonialCard
              quote="Desde que implementamos el bot de WhatsApp con Nexora, filtramos a los curiosos y solo hablamos con gente lista para comprar. El sistema paga solo."
              name="Martín L."
              role="Dueño de E-commerce"
              metric="+40% ventas"
            />
            <TestimonialCard
              quote="Antes perdía horas respondiendo a la madrugada. Ahora el sistema agenda las consultas automáticamente. Me devolvieron mi tiempo libre."
              name="Sofía R."
              role="Directora de Clínica Estética"
              metric="-6hs/día"
            />
            <TestimonialCard
              quote="La landing que nos hicieron convierte el doble que la anterior. Diseño impecable y cargó mucho más rápido. Cero quejas."
              name="Diego M."
              role="CEO de inmobiliaria"
              metric="2x conversión"
            />
            <TestimonialCard
              quote="Lo que más me sorprendió fue la velocidad. En una semana ya teníamos el sistema funcionando y los leads calificados entrando solos al CRM."
              name="Valentina C."
              role="Fundadora de SaaS B2B"
              metric="7 días al lanzar"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. CTA FINAL
      ══════════════════════════════════════ */}
      <section id="contacto" className="w-full py-32 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto relative"
        >
          <div className="absolute inset-0 bg-neon/[0.06] blur-[80px] rounded-3xl" />

          <div className="relative bg-[#0a0a0a] border border-neon/20 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/20 bg-neon/5 text-xs font-bold text-neon mb-8 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
              Cupos limitados esta semana
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[1.0]">
              Empezá a convertir más
              <br />
              <span className="text-neon">clientes hoy.</span>
            </h2>

            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Agendá una llamada de diagnóstico gratuita. En 30 minutos te
              decimos exactamente cómo automatizar tu negocio.
            </p>

            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-neon text-black px-10 py-5 rounded-xl font-black text-lg hover:shadow-[0_0_50px_rgba(239,255,0,0.4)] hover:-translate-y-1 transition-all relative overflow-hidden"
            >
              <span className="relative z-10">Hablar por WhatsApp ahora</span>
              <ArrowRight
                size={20}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </a>

            <p className="text-gray-600 text-sm mt-6">
              Sin compromiso · Respuesta en menos de 2 horas
            </p>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="w-full py-10 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <div className="w-6 h-6 bg-neon rounded-md flex items-center justify-center">
              <Zap size={13} className="text-black" />
            </div>
            Nexora
          </div>
          <p>© {new Date().getFullYear()} Nexora. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#servicios" className="hover:text-white transition-colors">
              Servicios
            </a>
            <a href="#contacto" className="hover:text-white transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
