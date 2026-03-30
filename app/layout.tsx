import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexora | Automatizamos tu negocio con IA",
  description:
    "Dejá de perder clientes por no responder a tiempo. Automatizamos tu negocio para que conviertas más.",
  icons: {
    icon: [
      { url: "/favicon-nexora.png", type: "image/png" },
    ],
    shortcut: "/favicon-nexora.png",
    apple: "/favicon-nexora.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.className} bg-background text-white antialiased selection:bg-neon selection:text-black`}
      >
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
