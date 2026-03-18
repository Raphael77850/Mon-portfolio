"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

/**
 * Extrait l'ID de la vidéo depuis une URL YouTube ou Vimeo
 * Supporte les formats : youtube.com/watch?v=, youtu.be/, vimeo.com/, youtube.com/embed/
 *
 * @param url - URL complète de la vidéo
 * @returns Object avec le type (youtube/vimeo/local) et l'ID ou URL
 */
function parseVideoUrl(url: string): {
  type: "youtube" | "vimeo" | "local";
  id: string;
} {
  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return { type: "youtube", id: match[1] };
    }
  }

  // Vimeo patterns
  const vimeoPattern = /vimeo\.com\/(?:video\/)?(\d+)/;
  const vimeoMatch = url.match(vimeoPattern);
  if (vimeoMatch?.[1]) {
    return { type: "vimeo", id: vimeoMatch[1] };
  }

  // Vidéo locale par défaut
  return { type: "local", id: url };
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title,
}: VideoModalProps) {
  const videoData = parseVideoUrl(videoUrl);

  // Gestion fermeture avec Échap + blocage scroll body
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Empêche le scroll en arrière-plan
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay avec backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
            aria-label="Fermer la vidéo"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full max-w-6xl pointer-events-auto">
              {/* Header avec titre et bouton fermer */}
              <div className="flex items-center justify-between mb-3 px-2">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-neutral-light hover:text-accent-blue"
                  aria-label="Fermer la vidéo"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Vidéo Container - Aspect ratio 16:9 */}
              <div className="relative aspect-video bg-black rounded-lg shadow-2xl overflow-hidden">
                {videoData.type === "youtube" && (
                  // YouTube Embed optimisé (youtube-nocookie.com pour RGPD)
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoData.id}?autoplay=1&rel=0&modestbranding=1`}
                    title={`Démo vidéo de ${title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                )}

                {videoData.type === "vimeo" && (
                  // Vimeo Embed
                  <iframe
                    src={`https://player.vimeo.com/video/${videoData.id}?autoplay=1&title=0&byline=0&portrait=0`}
                    title={`Démo vidéo de ${title}`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                )}

                {videoData.type === "local" && (
                  // Vidéo locale avec support WebM + MP4 (fallback)
                  <video
                    controls
                    autoPlay
                    preload="metadata"
                    poster={videoData.id
                      .replace(/\.(mp4|webm)$/, ".jpg")
                      .replace("/videos/", "/videos/posters/")}
                    className="absolute inset-0 w-full h-full object-contain"
                    aria-label={`Démo vidéo de ${title}`}
                  >
                    {/* WebM (meilleure compression) pour navigateurs modernes */}
                    <source
                      src={videoData.id.replace(".mp4", ".webm")}
                      type="video/webm"
                    />
                    {/* MP4 (fallback) pour compatibilité maximale */}
                    <source src={videoData.id} type="video/mp4" />
                    <track kind="captions" srcLang="fr" label="Français" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                )}
              </div>

              {/* Note accessibilité (visible uniquement pour screen readers) */}
              <p className="sr-only">
                Appuyez sur Échap ou cliquez en dehors de la vidéo pour fermer.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
