import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité du portfolio de Raphaël Streiff.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen section-padding pt-32">
      <div className="container-custom max-w-3xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-light">
            Politique de confidentialité
          </h1>
          <p className="text-neutral">Dernière mise à jour: 18 mars 2026</p>
        </header>

        <section className="glass-effect rounded-lg p-6 md:p-8 space-y-4 text-neutral leading-relaxed">
          <p>
            Les données transmises via le formulaire de contact (nom, email, message) sont utilisées
            uniquement pour répondre à votre demande.
          </p>
          <p>
            Aucune donnée n&apos;est vendue ou cédée à des tiers. Les informations sont conservées pendant
            une durée proportionnée au traitement de votre demande.
          </p>
          <p>
            Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en envoyant
            un email à{' '}
            <a href="mailto:raphael.streiff93@gmail.com" className="text-accent-blue hover:underline">
              raphael.streiff93@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
