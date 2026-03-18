"use client";

import Link from "next/link";
import { FaEnvelope, FaGithub, FaHeart, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Raphael77850",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rapha%C3%ABl-streiff-3019a5309/",
    icon: FaLinkedin,
  },
  {
    name: "Email",
    href: "mailto:raphael.streiff93@gmail.com",
    icon: FaEnvelope,
  },
];

const footerLinks = [
  { name: "Mentions légales", href: "/legal" },
  { name: "Politique de confidentialité", href: "/privacy" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark border-t border-neutral-dark/20">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Colonne 1: À propos */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold text-gradient">
              Portfolio
            </h3>
            <p className="text-neutral text-sm leading-relaxed">
              Développeur web junior passionné par la création d&apos;interfaces
              modernes et intuitives. Toujours en quête d&apos;apprentissage et
              de nouveaux défis.
            </p>
          </div>

          {/* Colonne 2: Navigation rapide */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading font-semibold text-neutral-light">
              Navigation
            </h4>
            <ul className="space-y-2">
              {["Accueil", "Projets", "Compétences", "À propos", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => {
                        const href = `#${item
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/\s+/g, "-")}`;
                        const element = document.querySelector(
                          item === "Accueil"
                            ? "#hero"
                            : item === "À propos"
                              ? "#about"
                              : href,
                        );
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="text-neutral hover:text-accent-blue transition-colors duration-300 text-sm"
                    >
                      {item}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Colonne 3: Réseaux sociaux */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading font-semibold text-neutral-light">
              Me suivre
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral hover:text-accent-blue transition-all duration-300 hover-lift"
                  aria-label={link.name}
                >
                  <link.icon size={24} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-dark/20 my-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-neutral text-sm">
            © {currentYear} Portfolio. Tous droits réservés.
          </p>

          <div className="flex items-center space-x-1 text-neutral text-sm">
            <span>Fait avec</span>
            <FaHeart className="text-accent-blue mx-1" size={14} />
            <span>par un développeur passionné</span>
          </div>

          <div className="flex space-x-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-neutral hover:text-accent-blue transition-colors duration-300 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
