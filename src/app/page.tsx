'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowDown, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import ProjectCard from '@/components/ProjectCard';
import SkillCard from '@/components/SkillCard';
import ContactForm from '@/components/ContactForm';
import { getProjects } from '@/data/projects';
import { getSkillsGroupedByCategory, categoryLabels } from '@/data/skills';

export default function Home() {
  const projects = getProjects();
  const skillsGrouped = getSkillsGroupedByCategory();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-neutral-light mb-4">
                Raphaël Streiff
                <span className="block text-gradient mt-2">Développeur Web Passionné</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-neutral max-w-2xl mx-auto leading-relaxed"
            >
              Je crée des expériences web modernes et intuitives avec un code propre et performant.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            >
              <button
                type="button"
                onClick={() => {
                  const element = document.querySelector('#projects');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-accent-blue to-accent-green hover:opacity-90 text-primary font-medium px-8 py-4 rounded-lg transition-all duration-300 hover-lift"
              >
                Voir mes projets
              </button>
              <button
                type="button"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="glass-effect text-neutral-light font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:border-accent-blue"
              >
                Me contacter
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center space-x-6 mt-12"
            >
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
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            type="button"
            onClick={() => {
              const element = document.querySelector('#projects');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-neutral hover:text-accent-blue transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <FaArrowDown size={24} />
          </button>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-primary-light">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-light mb-4">
              Mes <span className="text-gradient">Projets</span>
            </h2>
            <p className="text-neutral text-lg max-w-2xl mx-auto">
              Découvrez une sélection de mes réalisations récentes, de la conception au déploiement.
            </p>
          </motion.div>

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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-light mb-4">
              Mes <span className="text-gradient">Compétences</span>
            </h2>
            <p className="text-neutral text-lg max-w-2xl mx-auto">
              Technologies et outils que je maîtrise pour donner vie à vos projets.
            </p>
          </motion.div>

          <div className="space-y-12">
            {Object.entries(skillsGrouped).map(([category, skills]) => {
              if (skills.length === 0) return null;
              
              return (
                <div key={category}>
                  <motion.h3
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-2xl font-heading font-semibold text-neutral-light mb-6"
                  >
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </motion.h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {skills.map((skill, index) => (
                      <SkillCard key={skill.id} skill={skill} index={index} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-primary-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-light mb-4">
                À <span className="text-gradient">Propos</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-effect rounded-lg p-8 md:p-12 space-y-6"
            >
              <p className="text-neutral text-lg leading-relaxed">
                Bonjour ! Je suis un développeur web junior passionné par la création d&apos;interfaces 
                modernes et intuitives. Diplômé d&apos;une formation intensive en développement web, 
                je combine créativité et rigueur technique pour transformer des idées en expériences 
                digitales mémorables.
              </p>

              <p className="text-neutral text-lg leading-relaxed">
                Mon parcours m&apos;a permis de maîtriser les technologies front-end (React, Next.js, 
                Tailwind CSS) et back-end (Node.js, bases de données). Je suis constamment en quête 
                d&apos;apprentissage et de nouveaux défis pour perfectionner mes compétences.
              </p>

              <p className="text-neutral text-lg leading-relaxed">
                Au-delà du code, je privilégie une approche centrée sur l&apos;utilisateur avec un 
                focus particulier sur l&apos;accessibilité, les performances et le SEO. Mon objectif ? 
                Créer des solutions web qui font la différence.
              </p>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-gradient-to-r from-accent-blue to-accent-green hover:opacity-90 text-primary font-medium px-8 py-4 rounded-lg transition-all duration-300 hover-lift"
                >
                  Travaillons ensemble
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-light mb-4">
              Me <span className="text-gradient">Contacter</span>
            </h2>
            <p className="text-neutral text-lg max-w-2xl mx-auto">
              Un projet en tête ? Une question ? N&apos;hésitez pas à me contacter, 
              je serai ravi d&apos;échanger avec vous.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
