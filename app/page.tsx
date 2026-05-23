"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion, useInView, useMotionValue, useSpring,
  AnimatePresence, useScroll, useTransform,
} from "framer-motion";
import {
  ArrowRight, Bot, Monitor, Palette, Share2, Sparkles, Activity,
  Zap, TrendingUp, Users, Clock, CheckCircle, ChevronRight, Star,
  MessageCircle, Target, Rocket, ShieldCheck, ChevronDown, Send,
  BarChart3, Cpu, Globe, Lock, Play,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════════ */
const NEON = "#13F48A";
const NEON_DIM = "rgba(19,244,138,";

/* ══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
const stagger = (d = 0.09) => ({
  hidden: {},
  visible: { transition: { staggerChildren: d } },
});

/* ══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════════════════════ */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const sp = useSpring(mv, { stiffness: 55, damping: 16 });
  const [display, setDisplay] = useState("0");
  useEffect(() => { if (inView) mv.set(to); }, [inView, mv, to]);
  useEffect(() => { const u = sp.on("change", v => setDisplay(Math.round(v).toString())); return u; }, [sp]);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════════
   CTA BUTTON — shimmer + spring glow
══════════════════════════════════════════════════════════════ */
function Cta({
  href, children, variant = "primary", external, className = "",
}: {
  href: string; children: React.ReactNode;
  variant?: "primary" | "ghost"; external?: boolean; className?: string;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.035, y: -2,
        boxShadow: variant === "primary"
          ? `0 0 48px ${NEON_DIM}0.42), 0 0 18px ${NEON_DIM}0.18)`
          : `0 0 18px ${NEON_DIM}0.07)`,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl font-bold transition-colors ${
        variant === "primary"
          ? "bg-neon text-black px-8 py-4"
          : "border border-white/10 text-white/75 px-7 py-4 hover:border-white/20 hover:bg-white/[0.03]"
      } ${className}`}
    >
      <motion.span
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/28 to-transparent"
        initial={{ x: "-110%" }}
        whileHover={{ x: "110%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO BACKGROUND — layered mesh + scanlines
══════════════════════════════════════════════════════════════ */
function HeroBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* radial glows */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full"
        style={{ background: `radial-gradient(circle, ${NEON_DIM}0.045) 0%, transparent 65%)` }} />
      <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full"
        style={{ background: `radial-gradient(circle, ${NEON_DIM}0.055) 0%, transparent 60%)` }} />
      <div className="absolute -bottom-20 -left-32 h-[500px] w-[500px] rounded-full"
        style={{ background: `radial-gradient(circle, ${NEON_DIM}0.04) 0%, transparent 60%)` }} />
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `linear-gradient(${NEON_DIM}1) 1px,transparent 1px),linear-gradient(90deg,${NEON_DIM}1) 1px,transparent 1px)`,
          backgroundSize: "72px 72px",
        }} />
      {/* horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-20"
        style={{ background: `linear-gradient(90deg, transparent, ${NEON}, transparent)` }}
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FLOATING BADGE
══════════════════════════════════════════════════════════════ */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
      style={{ borderColor: `${NEON_DIM}0.25)`, background: `${NEON_DIM}0.05)`, color: NEON }}
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: NEON }} />
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STAT CARD
══════════════════════════════════════════════════════════════ */
function StatCard({ value, suffix, label, icon }: {
  value: number; suffix: string; label: string; icon: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUp}
      className="group flex flex-col items-center gap-2 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 text-center transition-all duration-300 hover:border-neon/20 hover:bg-neon/[0.03]"
    >
      <div className="mb-1 opacity-50 transition-opacity group-hover:opacity-80" style={{ color: NEON }}>{icon}</div>
      <p className="text-4xl font-black tracking-tight md:text-5xl">
        <Counter to={value} suffix={suffix} />
      </p>
      <p className="max-w-[110px] text-xs leading-snug text-gray-500 md:text-sm">{label}</p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SERVICE CARD — bento variant
══════════════════════════════════════════════════════════════ */
function ServiceCard({
  icon, title, desc, tag, features, accent = false, className = "",
}: {
  icon: React.ReactNode; title: string; desc: string;
  tag?: string; features?: string[]; accent?: boolean; className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.16,1,0.3,1] } }}
      className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 ${
        accent
          ? "border-neon/25 bg-neon/[0.04] hover:border-neon/50"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.035]"
      } ${className}`}
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: accent
          ? `radial-gradient(circle at 25% 35%, ${NEON_DIM}0.07) 0%, transparent 55%)`
          : `radial-gradient(circle at 25% 35%, ${NEON_DIM}0.04) 0%, transparent 55%)` }}
      />
      {/* top shimmer line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${NEON_DIM}0.6), transparent)` }} />

      <div className="relative z-10">
        {tag && (
          <span className="mb-5 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
            style={{ background: `${NEON_DIM}0.1)`, color: NEON }}>
            {tag}
          </span>
        )}
        <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${
          accent ? "text-neon" : "text-gray-300"
        }`}
          style={{ background: accent ? `${NEON_DIM}0.1)` : "rgba(255,255,255,0.05)" }}>
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-400">{desc}</p>
        {features && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-gray-300">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: NEON }} />{f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TESTIMONIAL
══════════════════════════════════════════════════════════════ */
function Testimonial({ quote, name, role, metric, metricLabel }: {
  quote: string; name: string; role: string; metric: string; metricLabel: string;
}) {
  return (
    <motion.div variants={fadeUp}
      className="group flex flex-col gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/[0.10]"
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} fill={NEON} style={{ color: NEON }} />
        ))}
      </div>
      <p className="flex-1 text-sm italic leading-relaxed text-gray-300">"{quote}"</p>
      <div className="flex items-center justify-between border-t border-white/[0.05] pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border text-sm font-black"
            style={{ background: `${NEON_DIM}0.08)`, borderColor: `${NEON_DIM}0.2)`, color: NEON }}>
            {name[0]}
          </div>
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-black" style={{ color: NEON }}>{metric}</p>
          <p className="text-xs text-gray-500">{metricLabel}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FAQ ITEM
══════════════════════════════════════════════════════════════ */
function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp}
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        open ? "border-neon/30" : "border-white/[0.06] hover:border-white/[0.10]"
      }`}
      style={{ background: open ? `${NEON_DIM}0.025)` : "rgba(255,255,255,0.015)" }}
    >
      <button onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="shrink-0 font-black tabular-nums text-sm" style={{ color: `${NEON_DIM}0.35)` }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-sm md:text-base text-white">{q}</span>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0" style={{ color: open ? NEON : "#6b7280" }}>
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-7 pb-6">
              <div className="ml-10 border-l pl-5 text-sm leading-relaxed text-gray-400"
                style={{ borderColor: `${NEON_DIM}0.18)` }}>
                {a}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT FORM — immersive, multi-step feel
══════════════════════════════════════════════════════════════ */
const inputCls = `w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200
  focus:border-neon focus:bg-neon/[0.03] focus:shadow-[0_0_0_3px_rgba(19,244,138,0.07)]`;

function ContactSection() {
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const fFocus = useCallback((name: string) => () => setFocused(name), []);
  const fBlur  = useCallback(() => setFocused(null), []);

  return (
    <section id="formulario" className="w-full border-t border-white/[0.05] py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} className="mb-16 text-center">
          <Badge>Escribinos</Badge>
          <h2 className="mt-6 text-4xl font-black tracking-tighter md:text-5xl">
            Contanos sobre<br />
            <span style={{ color: NEON }}>tu negocio.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-gray-500">
            Diagnóstico inicial gratis. Respondemos en menos de 2 horas.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

          {/* LEFT — value props */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger(0.1)} className="flex flex-col gap-5">
            {[
              { icon: <Clock size={20} />,     title: "Respuesta en 2hs",       desc: "Nada de esperar días. Si mandás el formulario hoy, hoy charlamos." },
              { icon: <ShieldCheck size={20} />, title: "100% confidencial",    desc: "Tu información nunca se comparte ni se usa para publicidad." },
              { icon: <Target size={20} />,     title: "Diagnóstico real",       desc: "No te mandamos un PDF genérico. Te decimos exactamente dónde perdés plata." },
              { icon: <Rocket size={20} />,     title: "Sin contratos largos",  desc: "Empezamos mes a mes. Si no ves resultados, te vas sin problema." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-start gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 transition-all hover:border-white/[0.09]"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${NEON_DIM}0.08)`, color: NEON }}>
                  {item.icon}
                </div>
                <div>
                  <p className="mb-1 font-bold text-sm">{item.title}</p>
                  <p className="text-xs leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Social proof strip */}
            <motion.div variants={fadeUp}
              className="mt-2 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                Ya confían en nosotros
              </p>
              <div className="flex flex-wrap gap-2">
                {["E-commerce","Clínicas","Inmobiliarias","SaaS","Consultoras","Coaches"].map((s, i) => (
                  <span key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-gray-400">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — form card */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} className="relative">
            {/* outer glow */}
            <div className="pointer-events-none absolute -inset-px rounded-3xl"
              style={{ background: `linear-gradient(135deg, ${NEON_DIM}0.12), transparent 50%, ${NEON_DIM}0.06))` }} />

            <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0a0a0a] p-8">
              {/* top shimmer */}
              <div className="absolute inset-x-8 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${NEON_DIM}0.5), transparent)` }} />

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="ok"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-5 py-14 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full border"
                      style={{ background: `${NEON_DIM}0.1)`, borderColor: `${NEON_DIM}0.3)` }}
                    >
                      <CheckCircle size={28} style={{ color: NEON }} />
                    </motion.div>
                    <h3 className="text-2xl font-black">¡Mensaje enviado!</h3>
                    <p className="max-w-xs text-sm text-gray-400">
                      Te respondemos antes de 2 horas. Revisá tu bandeja de entrada.
                    </p>
                    <button onClick={() => setSent(false)}
                      className="mt-1 text-sm font-bold underline underline-offset-4 transition-opacity hover:opacity-60"
                      style={{ color: NEON }}>
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={e => { e.preventDefault(); setSent(true); }}
                    className="flex flex-col gap-4"
                  >
                    <p className="mb-1 text-lg font-black tracking-tight">
                      Hablemos sin vueltas 👋
                    </p>

                    {/* Nombre */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Nombre</label>
                      <input type="text" required placeholder="Tu nombre"
                        onFocus={fFocus("nombre")} onBlur={fBlur}
                        className={inputCls} />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Email de empresa</label>
                      <input type="email" required placeholder="vos@tuempresa.com"
                        onFocus={fFocus("email")} onBlur={fBlur}
                        className={inputCls} />
                    </div>

                    {/* Servicio */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">¿Qué necesitás?</label>
                      <select defaultValue="" onFocus={fFocus("servicio")} onBlur={fBlur}
                        className={`${inputCls} cursor-pointer appearance-none`}>
                        <option value="" disabled className="bg-[#111]">Seleccioná un servicio</option>
                        <option value="ia"       className="bg-[#111]">Agentes de IA / Automatización</option>
                        <option value="cm"       className="bg-[#111]">Community Management Estratégico</option>
                        <option value="web"      className="bg-[#111]">Diseño Web que Convierte</option>
                        <option value="ads"      className="bg-[#111]">Growth & Paid Ads</option>
                        <option value="branding" className="bg-[#111]">Branding Premium</option>
                        <option value="todo"     className="bg-[#111]">Todo — quiero escalar 🚀</option>
                      </select>
                    </div>

                    {/* Mensaje */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Tu situación</label>
                      <textarea required rows={3} onFocus={fFocus("msg")} onBlur={fBlur}
                        placeholder="¿Cuál es tu mayor problema hoy? Cuanto más nos cuentes, mejor el diagnóstico."
                        className={`${inputCls} resize-none`} />
                    </div>

                    {/* Submit */}
                    <motion.button type="submit"
                      whileHover={{ scale: 1.02, y: -2,
                        boxShadow: `0 0 38px ${NEON_DIM}0.38), 0 0 14px ${NEON_DIM}0.16)` }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 420, damping: 22 }}
                      className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-4 font-black text-black"
                      style={{ background: NEON }}
                    >
                      <motion.span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/28 to-transparent"
                        initial={{ x: "-110%" }} whileHover={{ x: "110%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }} />
                      <span className="relative z-10 flex items-center gap-2 text-sm">
                        Enviar y recibir diagnóstico gratis <Send size={15} />
                      </span>
                    </motion.button>
                    <p className="text-center text-[11px] text-gray-600">
                      Sin spam · Sin compromiso · 100% confidencial
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden bg-[#050505] text-white">

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 pb-16 pt-24">
        <HeroBg />

        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }} className="relative z-10 mb-8">
          <Badge>IA + Diseño de élite · Partners de crecimiento</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mb-6 max-w-5xl text-center text-5xl font-black tracking-tighter leading-[0.93] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Dejá de perder clientes
          <br />
          <span className="relative" style={{ color: NEON }}>
            por no responder a tiempo.
            <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] opacity-50"
              style={{ background: `linear-gradient(90deg, transparent, ${NEON}, transparent)` }} />
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="relative z-10 mb-12 max-w-2xl text-center text-lg leading-relaxed text-gray-400 md:text-xl"
        >
          Escalamos tu negocio con{" "}
          <span className="font-semibold text-white">IA y diseño de élite</span>{" "}
          para que conviertas más consultas en ventas, 24/7.
          Tu empresa en <span className="font-semibold text-white">piloto automático</span>.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-10 flex flex-col items-center gap-4 sm:flex-row">
          <Cta href="#formulario" variant="primary" className="text-base">
            Quiero una Auditoría Gratis <ArrowRight size={17} />
          </Cta>
          <Cta href="#servicios" variant="ghost" className="text-base">
            Ver servicios <ChevronRight size={15} />
          </Cta>
        </motion.div>

        {/* trust strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.7 }}
          className="relative z-10 mt-16 flex flex-wrap justify-center gap-6 text-sm text-gray-500"
        >
          {["+50 negocios escalados","Respuesta en <1 seg","Partners, no proveedores","Sin contrato mínimo"].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={13} style={{ color: NEON }} />
              <span>{t}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════ STATS ════════════════════ */}
      <section className="w-full border-y border-white/[0.05] py-20 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger(0.11)}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-4">
          <StatCard value={50}  suffix="+"  label="Negocios escalados"          icon={<TrendingUp size={20}/>} />
          <StatCard value={98}  suffix="%"  label="Clientes satisfechos"         icon={<Star size={20}/>} />
          <StatCard value={3}   suffix="x"  label="Aumento promedio en ventas"   icon={<Zap size={20}/>} />
          <StatCard value={10}  suffix="hs" label="Semanales recuperadas con IA" icon={<Clock size={20}/>} />
        </motion.div>
      </section>

      {/* ════════════════════ PROBLEMA ════════════════════ */}
      <section className="w-full py-32 px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp} className="mb-16 text-center">
            <Badge>El problema real</Badge>
            <h2 className="mt-6 text-4xl font-black tracking-tighter leading-[1.05] md:text-6xl">
              Mientras vos atendés el negocio,
              <br />
              <span className="text-gray-600">tu competencia te come el almuerzo.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              No es falta de producto ni de ganas. Operar de forma manual en 2025
              te hace invisible ante clientes que compran en segundos.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger(0.13)} className="grid gap-5 md:grid-cols-3">
            {[
              { icon: <Clock size={22}/>,    title: "Respondés tarde o nunca",   desc: "El 78% de los compradores elige al primero en responder. Más de 5 minutos y esa venta ya no es tuya.", stat: "5 min", sub: "es todo lo que tenés" },
              { icon: <Activity size={22}/>, title: "10 horas semanales tiradas", desc: "Las mismas preguntas de precio y horario, todos los días. Tiempo que no escala y te agota mentalmente.",  stat: "10hs",  sub: "por semana en tareas evitables" },
              { icon: <Users size={22}/>,    title: "Leads que se enfrían solos", desc: "Un mensaje a las 11pm sin respuesta es una venta perdida. Tu competencia tiene sistemas que contestan a las 3am.",    stat: "60%",  sub: "de consultas nocturnas sin atender" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="group rounded-2xl border border-white/[0.05] bg-white/[0.02] p-7 transition-all hover:border-white/[0.09]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                <div className="border-t border-white/[0.05] pt-4">
                  <span className="text-2xl font-black">{item.stat}</span>
                  <span className="ml-2 text-xs text-gray-600">{item.sub}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ SERVICIOS — BENTO PREMIUM ════════════════════ */}
      <section id="servicios" className="w-full border-t border-white/[0.05] py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} className="mb-16 text-center">
            <Badge>Lo que hacemos</Badge>
            <h2 className="mt-6 text-4xl font-black tracking-tighter md:text-6xl">
              No somos una agencia más.
              <br />
              <span className="text-gray-500">Somos tu equipo de crecimiento.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
              Tecnología de vanguardia + estrategia real. Cada peso que invertís, multiplicado.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger(0.07)} className="grid gap-5 md:grid-cols-3">

            {/* ── HERO CARD: IA 2 cols ── */}
            <motion.div variants={fadeUp} whileHover={{ y: -5, transition: { duration: 0.22 } }}
              className="group relative overflow-hidden rounded-2xl border border-neon/20 bg-neon/[0.04] p-10 transition-all duration-300 hover:border-neon/45 md:col-span-2">
              {/* bg decoration */}
              <div className="pointer-events-none absolute right-0 top-0 opacity-[0.045] transition-opacity duration-500 group-hover:opacity-[0.08]">
                <Bot size={200} style={{ color: NEON }} className="translate-x-8 -translate-y-4" />
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 18% 55%, ${NEON_DIM}0.06) 0%, transparent 55%)` }} />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${NEON_DIM}0.55), transparent)` }} />

              <div className="relative z-10">
                <span className="mb-6 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                  style={{ background: `${NEON_DIM}0.1)`, color: NEON }}>★ Servicio estrella</span>
                <h3 className="mb-4 text-3xl font-black tracking-tight">
                  Agentes de IA que trabajan por vos
                </h3>
                <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-400">
                  Eliminamos las tareas repetitivas que te quitan{" "}
                  <span className="font-semibold text-white">10 horas a la semana</span>.
                  Agentes de IA en WhatsApp, email y web para que tu empresa atienda,
                  califique y cierre ventas{" "}
                  <span className="font-semibold text-white">mientras vos descansás</span>.
                </p>
                <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { icon: <Zap size={14}/>,       label: "Respuesta en <1s"    },
                    { icon: <BarChart3 size={14}/>,  label: "Calificación de leads" },
                    { icon: <Clock size={14}/>,      label: "Agenda automática"   },
                    { icon: <Cpu size={14}/>,        label: "Integración CRM"     },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-xs text-gray-300">
                      <span style={{ color: NEON }}>{f.icon}</span>
                      {f.label}
                    </div>
                  ))}
                </div>
                <Cta href="#formulario" variant="primary" className="text-sm px-6 py-3">
                  Quiero este servicio <ArrowRight size={15} />
                </Cta>
              </div>
            </motion.div>

            {/* ── Community Management ── */}
            <motion.div variants={fadeUp} whileHover={{ y: -5, transition: { duration: 0.22 } }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/[0.12]">
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 30% 30%, ${NEON_DIM}0.04) 0%, transparent 60%)` }} />
              <div className="relative z-10">
                <span className="mb-5 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                  style={{ background: `${NEON_DIM}0.08)`, color: NEON }}>Nuevo</span>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-gray-300">
                  <MessageCircle size={22} />
                </div>
                <h3 className="mb-3 text-xl font-bold tracking-tight">Community Management Estratégico</h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-400">
                  No posteamos fotos. Creamos comunidades y convertimos seguidores en
                  clientes con{" "}
                  <span className="font-medium text-gray-200">estrategia real + pauta en Meta y Google</span>.
                  Tus redes venden, no solo existen.
                </p>
                <ul className="flex flex-col gap-2">
                  {["Estrategia de contenido mensual","Pauta en Meta & Google Ads","Reportes de métricas reales"].map((f,i)=>(
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="h-1 w-1 rounded-full" style={{ background: NEON }} />{f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* ── Diseño Web ── */}
            <ServiceCard
              icon={<Monitor size={22}/>}
              title="Diseño Web que Convierte"
              desc="Tu web carga en milisegundos con Next.js mientras la de tu competencia tarda 5 segundos. Landing pages diseñadas para vender, no para existir."
              tag="Next.js · Velocidad"
            />

            {/* ── Growth & Ads ── */}
            <ServiceCard
              icon={<BarChart3 size={22}/>}
              title="Growth & Paid Ads"
              desc="Pauta inteligente en Meta, Google y TikTok. Cada peso rastreado, optimizado y reportado. Sin magia negra, con resultados medibles."
            />

            {/* ── Branding ── */}
            <ServiceCard
              icon={<Palette size={22}/>}
              title="Branding Premium"
              desc="Una identidad visual que justifica precios más altos antes de que abras la boca. El diseño es la primera venta que hacés."
            />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ POR QUÉ NEXORA ════════════════════ */}
      <section className="w-full border-t border-white/[0.05] py-32 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} className="mb-20 text-center">
            <Badge>Por qué Nexora</Badge>
            <h2 className="mt-6 text-4xl font-black tracking-tighter md:text-6xl">
              No somos proveedores.
              <br />
              <span style={{ color: NEON }}>Somos tus partners.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-gray-500">
              Nos importa que tu negocio crezca porque cuando vos ganás, nosotros ganamos.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger(0.13)} className="grid gap-6 md:grid-cols-3">
            {[
              { icon: <Rocket size={26}/>,    title: "Velocidad de ejecución",    desc: "48hs para la estrategia. 7 días para el primer sistema funcionando. Sin PowerPoints eternos.", highlight: "De idea a ejecución en 7 días." },
              { icon: <Sparkles size={26}/>,  title: "Tecnología de vanguardia",  desc: "Next.js, IA generativa, n8n y las últimas APIs. No te vendemos herramientas de 2018 con precio de 2025.", highlight: "IA real. No humo." },
              { icon: <Target size={26}/>,    title: "Foco 100% en ventas",       desc: "Cada decisión de diseño, copy y automatización está orientada a una sola cosa: que factures más.", highlight: "Resultados medibles, siempre." },
            ].map((p, i) => (
              <motion.div key={i} variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-300 hover:border-neon/20">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${NEON_DIM}0.05) 0%, transparent 60%)` }} />
                <div className="relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: `${NEON_DIM}0.08)`, color: NEON }}>{p.icon}</div>
                  <h3 className="mb-3 text-xl font-bold">{p.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-gray-500">{p.desc}</p>
                  <div className="flex items-center gap-2 border-t border-white/[0.05] pt-4">
                    <ShieldCheck size={13} style={{ color: NEON }} className="shrink-0" />
                    <span className="text-xs font-bold" style={{ color: NEON }}>{p.highlight}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ PROCESO ════════════════════ */}
      <section className="w-full border-t border-white/[0.05] py-32 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} className="mb-20 text-center">
            <Badge>Nuestro proceso</Badge>
            <h2 className="mt-6 text-4xl font-black tracking-tighter md:text-6xl">
              Tres pasos para que
              <br />tu negocio trabaje solo.
            </h2>
          </motion.div>

          <div className="relative">
            <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 md:block"
              style={{ background: `linear-gradient(to bottom, transparent, ${NEON_DIM}0.2), transparent)` }} />

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={stagger(0.18)} className="flex flex-col gap-16">
              {[
                { step:"01", title:"Auditoría gratuita",    desc:"Analizamos tu proceso de ventas y te decimos en 30 minutos exactamente dónde estás perdiendo plata. Sin rodeos.", icon:<Activity size={20}/>, side:"left" },
                { step:"02", title:"Diseño del sistema",    desc:"Construimos la estrategia y el stack a medida. Nada genérico. Cada flujo pensado para tu industria y tu cliente.", icon:<Sparkles size={20}/>, side:"right" },
                { step:"03", title:"Lanzamos y escalamos",  desc:"En 7 días tu sistema está vivo. Medimos, reportamos y optimizamos mes a mes para que tu facturación siga subiendo.", icon:<TrendingUp size={20}/>, side:"left" },
              ].map((item) => (
                <motion.div key={item.step} variants={fadeUp}
                  className="flex flex-col items-center gap-8 md:grid md:grid-cols-[1fr_auto_1fr]">
                  <div className={`w-full ${item.side==="left" ? "md:text-right" : "md:order-3"}`}>
                    {item.side === "left" && (
                      <div>
                        <p className="mb-3 text-6xl font-black leading-none tracking-tighter" style={{ color:`${NEON_DIM}0.18)` }}>{item.step}</p>
                        <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-gray-400">{item.desc}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center md:order-2">
                    <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2"
                      style={{ background:"#050505", borderColor:NEON, color:NEON, boxShadow:`0 0 20px ${NEON_DIM}0.22)` }}>
                      {item.icon}
                    </div>
                  </div>
                  <div className={`w-full ${item.side==="right" ? "md:order-1 md:text-right" : ""}`}>
                    {item.side === "right" && (
                      <div>
                        <p className="mb-3 text-6xl font-black leading-none tracking-tighter" style={{ color:`${NEON_DIM}0.18)` }}>{item.step}</p>
                        <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-gray-400">{item.desc}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════ TESTIMONIOS ════════════════════ */}
      <section className="w-full border-t border-white/[0.05] py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} className="mb-16 text-center">
            <Badge>Resultados reales</Badge>
            <h2 className="mt-6 text-4xl font-black tracking-tighter md:text-5xl">
              Ellos ya están escalando.
              <br /><span className="text-gray-600">¿Cuándo empezás vos?</span>
            </h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger(0.13)} className="grid gap-5 md:grid-cols-2">
            <Testimonial quote="Filtramos a los curiosos y solo hablamos con gente lista para comprar. El bot paga solo en el primer mes. Ojalá lo hubiera hecho antes." name="Martín L." role="E-commerce · Montevideo" metric="+40%" metricLabel="en ventas" />
            <Testimonial quote="Antes perdía horas respondiendo a la madrugada. Ahora el sistema agenda solo. Me devolvieron el tiempo libre y las ventas subieron igual." name="Sofía R." role="Clínica Estética · Buenos Aires" metric="-10hs" metricLabel="por semana" />
            <Testimonial quote="La landing nueva convierte el doble y carga en un segundo. Mi competencia sigue con webs lentas de 2019. La diferencia es brutal." name="Diego M." role="Inmobiliaria · Punta del Este" metric="2x" metricLabel="conversión" />
            <Testimonial quote="En 7 días teníamos el sistema vivo y los leads calificados entrando solos al CRM. No son una agencia, son un equipo de tu lado." name="Valentina C." role="SaaS B2B · Montevideo" metric="7 días" metricLabel="al lanzar" />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ CTA FINAL ════════════════════ */}
      <section id="contacto" className="w-full py-32 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} className="relative mx-auto max-w-4xl">
          <div className="pointer-events-none absolute inset-0 rounded-3xl blur-[70px]"
            style={{ background: `${NEON_DIM}0.07)` }} />
          <div className="relative overflow-hidden rounded-3xl border bg-[#0a0a0a] p-12 text-center md:p-16"
            style={{ borderColor: `${NEON_DIM}0.22)` }}>
            <div className="pointer-events-none absolute inset-x-1/4 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${NEON_DIM}0.6), transparent)` }} />
            <Badge>Cupos limitados — 5 auditorías por semana</Badge>
            <h2 className="mt-8 text-4xl font-black tracking-tighter leading-[1.0] md:text-6xl">
              Tu competencia ya está<br />
              <span style={{ color: NEON }}>usando IA. ¿Y vos?</span>
            </h2>
            <p className="mx-auto mt-5 mb-10 max-w-xl text-lg leading-relaxed text-gray-400">
              Agendá tu auditoría gratuita hoy. En 30 minutos te mostramos cuánto
              estás dejando sobre la mesa y cómo recuperarlo. Sin compromiso.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Cta href="https://wa.me/1234567890" variant="primary" external className="px-10 py-5 text-base">
                Empezar a Escalar Ahora <ArrowRight size={18}/>
              </Cta>
              <Cta href="#formulario" variant="ghost" className="px-8 py-5 text-base">
                Escribirnos
              </Cta>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Respondemos en &lt;2hs · Sin contrato mínimo · 100% personalizado
            </p>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════ FORMULARIO ════════════════════ */}
      <ContactSection />

      {/* ════════════════════ FAQ ════════════════════ */}
      <section className="w-full border-t border-white/[0.05] py-32 px-6">
        <div className="mx-auto max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} className="mb-14 text-center">
            <Badge>FAQ</Badge>
            <h2 className="mt-6 text-4xl font-black tracking-tighter md:text-5xl">
              Todo lo que necesitás<br />saber antes de empezar.
            </h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger(0.07)} className="flex flex-col gap-3">
            {[
              { q:"¿En cuánto tiempo veo resultados?", a:"En automatizaciones el impacto es inmediato: el primer día el sistema ya responde leads. En CM y Paid Ads, resultados medibles entre la semana 2 y el mes 1. No trabajamos con plazos de 3 meses para 'ver si funciona'." },
              { q:"¿Qué incluye Community Management?", a:"Estrategia de contenido mensual, producción y publicación para Instagram, Facebook y/o LinkedIn, gestión de mensajes directos, reportes de métricas y opcionalmente pauta en Meta y Google Ads. No es solo postear fotos: es construir una audiencia que compra." },
              { q:"¿Ofrecen soporte post-lanzamiento?", a:"Sí, siempre. Todos nuestros servicios incluyen soporte y optimización post-lanzamiento. Somos partners de largo plazo: muchos clientes llevan más de 12 meses con nosotros porque seguimos generando valor mes a mes." },
              { q:"¿Necesito conocimientos técnicos para usar la IA?", a:"Para nada. Nos encargamos de todo: configuración, integración con tus herramientas (WhatsApp, CRM, agenda) y capacitación. Vos solo ves los resultados. Si algo falla, lo resolvemos nosotros." },
              { q:"¿Trabajan con cualquier tipo de negocio?", a:"Trabajamos mejor con negocios que ya tienen tracción y quieren escalar: e-commerce, clínicas, inmobiliarias, SaaS y consultoras. Si tenés dudas, agendá la auditoría gratuita — en 30 minutos te decimos si podemos ayudarte." },
            ].map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} i={i} />
            ))}
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} className="mt-10 text-center">
            <p className="mb-4 text-sm text-gray-500">¿Tenés una pregunta que no está acá?</p>
            <Cta href="https://wa.me/1234567890" variant="ghost" external className="px-6 py-3 text-sm">
              Preguntanos por WhatsApp <ArrowRight size={14}/>
            </Cta>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer className="w-full border-t border-white/[0.05] py-10 px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-gray-600 md:flex-row">
          <div className="flex items-center gap-2 text-base font-bold text-white">
            <div className="flex h-6 w-6 items-center justify-center rounded-md"
              style={{ background: NEON }}>
              <Zap size={13} className="text-black" />
            </div>
            Nexora
          </div>
          <p>© {new Date().getFullYear()} Nexora · Partners de crecimiento digital</p>
          <div className="flex gap-6">
            <a href="#servicios" className="transition-colors hover:text-white">Servicios</a>
            <a href="#formulario" className="transition-colors hover:text-white">Contacto</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
