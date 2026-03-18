import Link from "next/link";
import { FaArrowDown, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import SkillCard from "@/components/SkillCard";
import { getProjects } from "@/data/projects";
import { getSkills } from "@/data/skills";

export default function Home() {
  const projects = getProjects();
  const sortedSkills = getSkills();
  const featuredSkillIds = new Set([
    "react",
    "nextjs",
    "typescript",
    "tailwind",
  ]);

  const reactSkill = sortedSkills.find((skill) => skill.id === "react");
  const nextSkill = sortedSkills.find((skill) => skill.id === "nextjs");
  const typeScriptSkill = sortedSkills.find(
    (skill) => skill.id === "typescript",
  );
  const tailwindSkill = sortedSkills.find((skill) => skill.id === "tailwind");
  const otherSkills = sortedSkills.filter(
    (skill) => !featuredSkillIds.has(skill.id),
  );

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-neutral-light mb-4">
                Raphaël Streiff
                <span className="block text-gradient mt-2">
                  Développeur Web Passionné
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-neutral max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Je crée des expériences web modernes et intuitives avec un code
              propre et performant.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-fade-in">
              <Link
                href="#projects"
                className="bg-gradient-to-r from-accent-blue to-accent-green hover:opacity-90 text-primary font-medium px-8 py-4 rounded-lg transition-all duration-300 hover-lift"
              >
                Voir mes projets
              </Link>
              <Link
                href="#contact"
                className="glass-effect text-neutral-light font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:border-accent-blue"
              >
                Me contacter
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-12 animate-fade-in">
              <Link
                href="https://github.com/Raphael77850"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral hover:text-accent-blue transition-all duration-300 hover-lift"
                aria-label="GitHub"
              >
                <FaGithub size={28} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/rapha%C3%ABl-streiff-3019a5309/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral hover:text-accent-blue transition-all duration-300 hover-lift"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={28} />
              </Link>
              <Link
                href="mailto:raphael.streiff93@gmail.com"
                className="text-neutral hover:text-accent-blue transition-all duration-300 hover-lift"
                aria-label="Email"
              >
                <FaEnvelope size={28} />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Link
            href="#projects"
            className="text-neutral hover:text-accent-blue transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <FaArrowDown size={24} />
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-primary-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-light mb-4">
              Mes <span className="text-gradient">Projets</span>
            </h2>
            <p className="text-neutral text-lg max-w-2xl mx-auto">
              Découvrez une sélection de mes réalisations récentes, de la
              conception au déploiement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
              Compétences
            </h2>
            <p className="text-neutral text-lg max-w-2xl mx-auto">
              Un ensemble de technologies modernes que je maîtrise et utilise au
              quotidien
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* Skills principales - GRANDES cartes */}
            {reactSkill && (
              <SkillCard skill={reactSkill} index={0} size="large" />
            )}
            {nextSkill && (
              <SkillCard skill={nextSkill} index={1} size="large" />
            )}

            {/* Skills importantes - MOYENNES cartes */}
            {typeScriptSkill && (
              <SkillCard skill={typeScriptSkill} index={2} size="medium" />
            )}
            {tailwindSkill && (
              <SkillCard skill={tailwindSkill} index={3} size="medium" />
            )}

            {/* Autres skills - PETITES cartes */}
            {otherSkills.map((skill, idx) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                index={idx + 4}
                size="small"
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-primary-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-light mb-4">
                À <span className="text-gradient">Propos</span>
              </h2>
            </div>

            <div className="glass-effect rounded-lg p-8 md:p-12 space-y-6">
              <p className="text-neutral text-lg leading-relaxed">
                Bonjour ! Je suis un développeur web junior passionné par la
                création d&apos;interfaces modernes et intuitives. Diplômé
                d&apos;une formation intensive en développement web, je combine
                créativité et rigueur technique pour transformer des idées en
                expériences digitales mémorables.
              </p>

              <p className="text-neutral text-lg leading-relaxed">
                Mon parcours m&apos;a permis de maîtriser les technologies
                front-end (React, Next.js, Tailwind CSS) et back-end (Node.js,
                bases de données). Je suis constamment en quête
                d&apos;apprentissage et de nouveaux défis pour perfectionner mes
                compétences.
              </p>

              <p className="text-neutral text-lg leading-relaxed">
                Au-delà du code, je privilégie une approche centrée sur
                l&apos;utilisateur avec un focus particulier sur
                l&apos;accessibilité, les performances et le SEO. Mon objectif ?
                Créer des solutions web qui font la différence.
              </p>

              <div className="pt-6">
                <Link
                  href="#contact"
                  className="bg-gradient-to-r from-accent-blue to-accent-green hover:opacity-90 text-primary font-medium px-8 py-4 rounded-lg transition-all duration-300 hover-lift"
                >
                  Travaillons ensemble
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-light mb-4">
              Me <span className="text-gradient">Contacter</span>
            </h2>
            <p className="text-neutral text-lg max-w-2xl mx-auto">
              Un projet en tête ? Une question ? N&apos;hésitez pas à me
              contacter, je serai ravi d&apos;échanger avec vous.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
