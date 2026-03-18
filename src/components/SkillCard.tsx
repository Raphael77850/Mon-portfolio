"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaICursor,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiExpress,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
  SiVscodium,
} from "react-icons/si";
import Tilt from "react-parallax-tilt";
import type { Skill } from "@/data/skills";

const iconMap: Record<string, IconType> = {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  SiTypescript,
  FaReact,
  SiNextdotjs,
  SiTailwindcss,
  FaNodeJs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  FaGitAlt,
  FaGithub,
  SiVscodium,
  FaICursor,
};

interface SkillCardProps {
  skill: Skill;
  index: number;
  size?: "small" | "medium" | "large"; // Pour Bento Grid
}

export default function SkillCard({
  skill,
  index,
  size = "small",
}: SkillCardProps) {
  const IconComponent = iconMap[skill.icon];

  // Tailles différentes selon l'importance
  const sizeClasses = {
    small: "col-span-1",
    medium: "md:col-span-2",
    large: "md:col-span-2 md:row-span-2",
  };

  const iconSizes = {
    small: 40,
    medium: 48,
    large: 64,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={sizeClasses[size]}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        transitionSpeed={2000}
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#60A5FA"
        glarePosition="all"
        glareBorderRadius="12px"
        className="h-full"
      >
        <div className="glass-effect rounded-lg p-6 h-full flex flex-col items-center justify-center space-y-4 hover:border-accent-blue/50 transition-all duration-300 group relative overflow-hidden">
          {/* Effet de glow background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Icône */}
          {IconComponent && (
            <div className="text-accent-blue relative z-10 transition-transform duration-300 group-hover:scale-110">
              <IconComponent size={iconSizes[size]} />
            </div>
          )}

          {/* Nom de la compétence */}
          <h3
            className={`text-neutral-light font-medium text-center relative z-10 ${
              size === "large" ? "text-xl" : "text-base"
            }`}
          >
            {skill.name}
          </h3>

          {/* Badge catégorie (optionnel pour grandes cartes) */}
          {size === "large" && (
            <span className="px-3 py-1 bg-secondary-light rounded-full text-accent-blue text-xs font-medium relative z-10">
              {skill.category}
            </span>
          )}
        </div>
      </Tilt>
    </motion.div>
  );
}
