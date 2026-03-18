# Scripts d'Optimisation Portfolio

Ce dossier contient des scripts utilitaires pour optimiser votre portfolio.

## 📹 Compression Vidéos

### Windows (PowerShell)
```powershell
.\scripts\compress-videos.ps1
```

### macOS/Linux (Bash)
```bash
chmod +x scripts/compress-videos.sh
./scripts/compress-videos.sh
```

### Fonctionnalités
- ✅ Compression MP4 (H.264) pour compatibilité maximale
- ✅ Compression WebM (VP9) pour meilleure performance
- ✅ Génération automatique des posters (thumbnails)
- ✅ Réduction ~85% de la taille des vidéos

### Prérequis
**FFmpeg doit être installé** :
- Windows : `choco install ffmpeg` ou `scoop install ffmpeg`
- macOS : `brew install ffmpeg`
- Linux : `sudo apt install ffmpeg`

### Usage

1. **Placer vos vidéos brutes** dans `public/videos/raw/` :
   ```
   public/videos/raw/
   ├── Wildify_démo.mp4
   ├── Veever_démo.mp4
   └── Bringuerie_demo.mp4
   ```

2. **Lancer le script** :
   ```powershell
   .\scripts\compress-videos.ps1
   ```

3. **Résultat** dans `public/videos/` :
   ```
   public/videos/
   ├── wildify.mp4      (compressé)
   ├── wildify.webm     (encore plus compressé)
   ├── veever.mp4
   ├── veever.webm
   └── posters/
       ├── wildify.jpg  (thumbnail)
       └── veever.jpg
   ```

4. **Mettre à jour** `src/data/projects.ts` :
   ```typescript
   demoVideo: '/videos/wildify.mp4'
   ```

### Documentation Complète
Voir [`Guide/COMPRESSION_VIDEOS.md`](../Guide/COMPRESSION_VIDEOS.md) pour plus de détails.

---

## 🔮 Scripts Futurs

D'autres scripts d'optimisation seront ajoutés ici :
- 🖼️ Compression images (WebP)
- 🎨 Génération de favicons
- 📊 Analyse de performance
- 🔍 Génération sitemap dynamique

---

**Note** : Ces scripts sont optionnels mais fortement recommandés pour des performances optimales.
