'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 cursor-pointer"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-4xl pointer-events-auto">
              {/* Bouton fermer */}
              <button
                type="button"
                onClick={onClose}
                className="absolute -top-12 right-0 text-white hover:text-accent-blue transition-colors"
                aria-label="Fermer la vidéo"
              >
                <FaTimes size={24} />
              </button>
              
              {/* Vidéo */}
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full rounded-lg shadow-2xl"
                aria-label={`Démo vidéo de ${title}`}
              >
                <track
                  kind="captions"
                  src="/path/to/captions.vtt"
                  srcLang="fr"
                  label="Français"
                  default
                />
                <track
                  kind="captions"
                  src="/path/to/captions-en.vtt"
                  srcLang="en"
                  label="English"
                />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}