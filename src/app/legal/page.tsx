import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du portfolio de Raphaël Streiff.",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen section-padding pt-32">
      <div className="container-custom max-w-3xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-light">
            Mentions légales
          </h1>
          <p className="text-neutral">Dernière mise à jour: 18 mars 2026</p>
        </header>

        <section className="glass-effect rounded-lg p-6 md:p-8 space-y-4 text-neutral leading-relaxed">
          <p>Éditeur du site: Raphaël Streiff, développeur web.</p>
          <p>
            Contact:{" "}
            <a
              href="mailto:raphael.streiff93@gmail.com"
              className="text-accent-blue hover:underline"
            >
              raphael.streiff93@gmail.com
            </a>
          </p>
          <p>
            Ce site présente des projets personnels et professionnels. Les
            marques citées restent la propriété de leurs détenteurs respectifs.
          </p>
          <p>
            Hébergement: plateforme de déploiement cloud (ex: Vercel) selon
            l&apos;environnement de publication.
          </p>
        </section>
      </div>
    </main>
  );
}
