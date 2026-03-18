"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowDown, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import SkillCard from "@/components/SkillCard";
import { getProjects } from "@/data/projects";
import { skills } from "@/data/skills";

export default function Home() {
  const projects = getProjects();

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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-neutral-light mb-4">
                Raphaël Streiff
                <span className="block text-gradient mt-2">
                  Développeur Web Passionné
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-neutral max-w-2xl mx-auto leading-relaxed"
            >
              Je crée des expériences web modernes et intuitives avec un code
              propre et performant.
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
                  const element = document.querySelector("#projects");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-accent-blue to-accent-green hover:opacity-90 text-primary font-medium px-8 py-4 rounded-lg transition-all duration-300 hover-lift"
              >
                Voir mes projets
              </button>
              <button
                type="button"
                onClick={() => {
                  const element = document.querySelector("#contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
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
              const element = document.querySelector("#projects");
              if (element) element.scrollIntoView({ behavior: "smooth" });
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
              Découvrez une sélection de mes réalisations récentes, de la
              conception au déploiement.
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
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
              Compétences
            </h2>
            <p className="text-neutral text-lg max-w-2xl mx-auto">
              Un ensemble de technologies modernes que je maîtrise et utilise au
              quotidien
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* Skills principales - GRANDES cartes */}
            <SkillCard skill={skills[4]} index={0} size="large" /> {/* React */}
            <SkillCard skill={skills[5]} index={1} size="large" />{" "}
            {/* Next.js */}
            {/* Skills importantes - MOYENNES cartes */}
            <SkillCard skill={skills[3]} index={2} size="medium" />{" "}
            {/* TypeScript */}
            <SkillCard skill={skills[6]} index={3} size="medium" />{" "}
            {/* Tailwind */}
            {/* Autres skills - PETITES cartes */}
            {skills.slice(7).map((skill, idx) => (
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
                <button
                  type="button"
                  onClick={() => {
                    const element = document.querySelector("#contact");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
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
              Un projet en tête ? Une question ? N&apos;hésitez pas à me
              contacter, je serai ravi d&apos;échanger avec vous.
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
