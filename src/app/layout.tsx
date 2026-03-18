import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Portfolio | Raphaël Développeur Web Junior",
  description: "Portfolio de développeur web junior. Découvrez mes projets, compétences et réalisations en React, Next.js et développement web moderne.",
  keywords: ["développeur web", "portfolio", "React", "Next.js", "développeur junior", "web development"],
  authors: [{ name: "Raphaël" }],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Portfolio | Raphaël Développeur Web Junior",
    description: "Développeur web passionné par la création d'expériences web modernes et intuitives.",
    url: siteUrl,
    siteName: "Portfolio Raphaël Streiff",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/projects/wildify.jpg",
        width: 1200,
        height: 630,
        alt: "Aperçu du portfolio de Raphaël Streiff",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Raphaël Développeur Web Junior",
    description: "Découvrez mes projets, compétences et réalisations web.",
    images: ["/projects/wildify.jpg"],
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
