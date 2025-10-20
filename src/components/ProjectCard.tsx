'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import type { Project } from '@/data/projects';
import { useState } from 'react';
import VideoModal from './VideoModal';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true }}
        className="group glass-effect rounded-lg overflow-hidden hover-lift"
      >
        {/* Image du projet */}
        <div className="relative h-64 overflow-hidden bg-secondary">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay au hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
            <div className="flex space-x-4">
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-blue hover:bg-accent-blue/80 text-primary px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                aria-label={`Voir le code source de ${project.title}`}
              >
                <FaGithub size={20} />
                <span>Github</span>
              </Link>
              
              {/* Bouton Démo - Vidéo OU Lien externe */}
              {project.demoVideo ? (
                <button
                  type='button'
                  onClick={() => setIsVideoOpen(true)}
                  className="bg-accent-green hover:bg-accent-green/80 text-primary px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                  aria-label={`Voir la démo de ${project.title}`}
                >
                  <FaExternalLinkAlt size={18} />
                  <span>Démo</span>
                </button>
              ) : project.demoUrl ? (
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-green hover:bg-accent-green/80 text-primary px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                  aria-label={`Voir la démo de ${project.title}`}
                >
                  <FaExternalLinkAlt size={18} />
                  <span>Démo</span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-heading font-bold text-neutral-light group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
          
          <p className="text-neutral text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Stack technique */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-secondary-light rounded-full text-accent-blue text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal vidéo */}
      {project.demoVideo && (
        <VideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl={project.demoVideo}
          title={project.title}
        />
      )}
    </>
  );
}
