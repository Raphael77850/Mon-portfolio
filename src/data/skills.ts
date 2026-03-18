/**
 * Fichier de données pour les compétences techniques
 * Facilite l'intégration future d'un CMS headless
 */

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  icon: string; // Nom de l'icône de react-icons
  level?: number; // Optionnel: niveau de compétence sur 100
  order: number;
}

export const skills: Skill[] = [
  // Frontend
  {
    id: 'html',
    name: 'HTML5',
    category: 'frontend',
    icon: 'FaHtml5',
    level: 90,
    order: 1,
  },
  {
    id: 'css',
    name: 'CSS3',
    category: 'frontend',
    icon: 'FaCss3Alt',
    level: 85,
    order: 2,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    icon: 'FaJs',
    level: 85,
    order: 3,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    icon: 'SiTypescript',
    level: 80,
    order: 4,
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    icon: 'FaReact',
    level: 85,
    order: 5,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    icon: 'SiNextdotjs',
    level: 80,
    order: 6,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: 'SiTailwindcss',
    level: 85,
    order: 7,
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    icon: 'FaNodeJs',
    level: 75,
    order: 8,
  },
  {
    id: 'express',
    name: 'Express',
    category: 'backend',
    icon: 'SiExpress',
    level: 75,
    order: 9,
  },

  // Database
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'database',
    icon: 'SiMysql',
    level: 70,
    order: 12,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    icon: 'SiPostgresql',
    level: 70,
    order: 13,
  },

  // Tools
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    icon: 'FaGitAlt',
    level: 80,
    order: 14,
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    icon: 'FaGithub',
    level: 85,
    order: 15,
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    icon: 'SiVisualstudiocode',
    level: 90,
    order: 16,
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'tools',
    icon: 'FaCursor',
    level: 75,
    order: 17,
  },
];

export const categoryLabels: Record<Skill['category'], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Base de données',
  tools: 'Outils',
  other: 'Autres',
};

/**
 * Fonctions utilitaires pour récupérer les compétences
 */
export const getSkills = (): Skill[] => {
  return [...skills].sort((a, b) => a.order - b.order);
};

export const getSkillsByCategory = (category: Skill['category']): Skill[] => {
  return skills.filter((skill) => skill.category === category).sort((a, b) => a.order - b.order);
};

export const getSkillsGroupedByCategory = (): Record<string, Skill[]> => {
  const grouped: Record<string, Skill[]> = {
    frontend: [],
    backend: [],
    database: [],
    tools: [],
    other: [],
  };

  skills.forEach((skill) => {
    grouped[skill.category].push(skill);
  });

  // Trier chaque catégorie par ordre
  Object.keys(grouped).forEach((category) => {
    grouped[category].sort((a, b) => a.order - b.order);
  });

  return grouped;
};
