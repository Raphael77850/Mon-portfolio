import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Portfolio | Raphaël Développeur Web Junior",
  description: "Portfolio de développeur web junior. Découvrez mes projets, compétences et réalisations en React, Next.js et développement web moderne.",
  keywords: ["développeur web", "portfolio", "React", "Next.js", "développeur junior", "web development"],
  authors: [{ name: "Raphaël" }],
  openGraph: {
    title: "Portfolio | Raphaël Développeur Web Junior",
    description: "Développeur web passionné par la création d'expériences web modernes et intuitives.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
