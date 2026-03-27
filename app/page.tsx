"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Zap,
  Target,
  Bot,
  Monitor,
  Palette,
  Share2,
  Sparkles,
  Activity,
} from "lucide-react";

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,255,0,0.05)_0%,transparent_50%)]" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-4xl text-center z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse"></span>
            Sistemas de IA para escalar negocios
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
            Dejá de perder clientes por no{" "}
            <span className="text-neon">responder a tiempo.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Automatizamos tu negocio con IA para que conviertas más consultas en
            ventas, 24/7. Sin esfuerzo manual. Sin perder oportunidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contacto"
              className="w-full sm:w-auto px-8 py-4 bg-neon text-black font-bold rounded-lg hover:shadow-[0_0_30px_rgba(239,255,0,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Ver cómo funciona <ArrowRight size={20} />
            </a>
            <a
              href="#contacto"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold rounded-lg border border-white/20 hover:bg-white/5 transition-all"
            >
              Agendar demo
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="w-full py-24 px-6 bg-surface/50 border-y border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Si tardás más de 5 minutos,{" "}
            <span className="text-gray-500">
              la venta es de tu competencia.
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: <Clock className="text-neon mb-4" size={32} />,
                title: "Lentitud",
                desc: "Los clientes no esperan. Buscan inmediatez y se van si no la tienen.",
              },
              {
                icon: <Activity className="text-neon mb-4" size={32} />,
                title: "Trabajo Repetitivo",
                desc: "Perdés horas respondiendo las mismas preguntas de precio y ubicación.",
              },
              {
                icon: <Target className="text-neon mb-4" size={32} />,
                title: "Ventas Perdidas",
                desc: "Mensajes fuera de horario que se enfrían y nunca se concretan.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-background border border-white/5"
              >
                {item.icon}
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section className="w-full py-32 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            El sistema que trabaja por vos.
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
            Nexora automatiza tu negocio para que respondas al instante, filtres
            clientes y cierres más ventas sin esfuerzo.
          </p>
        </motion.div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="w-full pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Main Offer Highlighted */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-2 bg-gradient-to-br from-surface to-background p-10 rounded-3xl border border-neon/20 relative overflow-hidden group hover:border-neon/50 transition-colors"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bot size={120} className="text-neon" />
              </div>
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-neon/10 text-neon rounded-full text-sm font-bold mb-6">
                  OFERTA PRINCIPAL
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  Automatización de WhatsApp
                </h3>
                <p className="text-gray-400 mb-8 max-w-md text-lg">
                  Un bot inteligente que atiende consultas, califica leads y
                  agenda citas 24/7. Tu negocio no duerme.
                </p>
                <ul className="space-y-3 font-medium text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <Zap size={16} className="text-neon" /> Respuestas en 1
                    segundo
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap size={16} className="text-neon" /> Integración con CRMs
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Other Services */}
            {[
              {
                icon: <Monitor size={28} />,
                title: "Diseño Web",
                desc: "Landing pages optimizadas para convertir visitantes en clientes.",
              },
              {
                icon: <Sparkles size={28} />,
                title: "IA Solutions",
                desc: "Sistemas a medida para reducir costos operativos.",
              },
              {
                icon: <Share2 size={28} />,
                title: "Social Media",
                desc: "Estrategias de contenido que generan demanda real.",
              },
              {
                icon: <Palette size={28} />,
                title: "Branding",
                desc: "Identidad visual premium que justifica precios más altos.",
              },
              {
                icon: <Activity size={28} />,
                title: "Sport Design",
                desc: "Gráficas de alto impacto para el nicho deportivo.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-surface p-8 rounded-3xl border border-white/5 hover:bg-white/[0.02] transition-colors glow-hover"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="w-full py-24 px-6 bg-surface border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Cómo funciona</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-10 right-10 h-[1px] bg-gradient-to-r from-neon/0 via-neon/50 to-neon/0"></div>
            {[
              {
                step: "01",
                title: "Analizamos tu negocio",
                desc: "Detectamos los cuellos de botella en tu proceso de ventas actual.",
              },
              {
                step: "02",
                title: "Creamos el sistema",
                desc: "Implementamos la IA y las automatizaciones adaptadas a tu marca.",
              },
              {
                step: "03",
                title: "Optimizamos y escalás",
                desc: "Medimos resultados y ajustamos para maximizar tu facturación.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-background border border-neon flex items-center justify-center text-neon font-bold text-xl mb-6 shadow-[0_0_15px_rgba(239,255,0,0.2)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF */}
      <section className="w-full py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Resultados reales
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface p-8 rounded-2xl border border-white/5">
              <p className="text-lg italic text-gray-300 mb-6">
                "Desde que implementamos el bot de WhatsApp con Nexora,
                filtramos a los curiosos y solo hablamos con gente lista para
                comprar. Las ventas subieron un 40% el primer mes."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                <div>
                  <h4 className="font-bold">Martín L.</h4>
                  <p className="text-xs text-neon">Dueño de E-commerce</p>
                </div>
              </div>
            </div>
            <div className="bg-surface p-8 rounded-2xl border border-white/5">
              <p className="text-lg italic text-gray-300 mb-6">
                "Antes perdía horas respondiendo mensajes a la madrugada. Ahora
                el sistema agenda las consultas automáticamente. Literalmente me
                devolvieron mi tiempo libre."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                <div>
                  <h4 className="font-bold">Sofía R.</h4>
                  <p className="text-xs text-neon">
                    Directora de Clínica Estética
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section id="contacto" className="w-full py-32 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto bg-neon text-black rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">
              Empezá a convertir más clientes hoy.
            </h2>
            <p className="text-lg font-medium mb-10 opacity-80">
              Cupos limitados esta semana para implementaciones a medida.
            </p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
            >
              Hablar por WhatsApp <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
