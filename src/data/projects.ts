/**
 * Fichier de données pour les projets du portfolio
 * Facilite l'intégration future d'un CMS headless
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  stack: string[];
  image: string;
  githubUrl: string;
  demoUrl?: string; // Pour les liens de démo externe (site déployé)
  demoVideo?: string; // Pour les vidéos YouTube/Vimeo (format: URL complète)
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    id: "projet-1",
    title: "Wildify",
    description:
      "Projet de formation a la Wild Code School, utilisant l'API de Spotify",
    longDescription:
      "Application web fullstack permettant aux utilisateurs de découvrir et partager leurs coups de cœur musicaux. Le projet intègre l'authentification OAuth Spotify, offrant une expérience personnalisée avec affichage du profil utilisateur, exploration d'artistes et de podcasts.",
    stack: [
      "React",
      "TypeScript",
      "Express.js",
      "MySQL",
      "Spotify API",
      "Docker",
      "Vite",
    ],
    image: "/projects/wildify.jpg",
    githubUrl: "https://github.com/Raphael77850",
    demoVideo: "/Wildify_démo.mp4",
    featured: true,
    order: 1,
  },
  {
    id: "projet-2",
    title: "Veever",
    description:
      "Projet de formation a la Wild Code School, V1 d'une plateforme de Recommandations Touristiques",
    longDescription:
      "Prototype d'une application web fullstack permettant aux utilisateurs de découvrir des hébergements et restaurants personnalisés via un questionnaire interactif. Le projet intègre un système d'authentification JWT, un dashboard administrateur complet et une gestion dynamique des établissements avec filtres et géolocalisation.",
    stack: [
      "React",
      "TypeScript",
      "Material-UI",
      "Express.js",
      "MySQL",
      "Node.js",
      "Docker",
      "Vite",
    ],
    image: "/projects/veever.jpg",
    githubUrl: "https://github.com/Raphael77850/Veever_wild_fixes",
    demoVideo: "/Veever_démo.mp4",
    featured: true,
    order: 2,
  },
  {
    id: "projet-3",
    title: "La Bringuerie",
    description:
      "Projet de formation a la Wild Code School, site vitrine d'événements festifs sur Bordeaux",
    longDescription:
      "Application web fullstack permettant la gestion et la promotion d'événements. Le projet propose une interface publique moderne avec hero section, carousel de commandements, formulaire de newsletter et contact, ainsi qu'un dashboard administrateur pour gérer les événements et utilisateurs.",
    stack: [
      "React",
      "TypeScript",
      "Express.js",
      "MySQL",
      "Material-UI",
      "JWT",
      "Docker",
      "Vite",
    ],
    image: "/projects/bringuerie.jpg",
    githubUrl: "https://github.com/Raphael77850/La-Bringuerie",
    demoUrl: "https://la-bringuerie-production.up.railway.app/",
    featured: true,
    order: 3,
  },
];

/**
 * Fonction utilitaire pour récupérer les projets
 * Prépare l'intégration future d'un CMS
 */
export const getProjects = (): Project[] => {
  return [...projects].sort((a, b) => a.order - b.order);
};

export const getFeaturedProjects = (): Project[] => {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};
