#!/bin/bash
# Script de compression vidéo pour portfolio
# Nécessite FFmpeg : https://ffmpeg.org/download.html

set -e

# Couleurs pour output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎬 Compression des vidéos de démo${NC}"
echo "=================================="
echo ""

# Vérifier si FFmpeg est installé
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}❌ FFmpeg n'est pas installé !${NC}"
    echo ""
    echo "Installation requise :"
    echo "- Windows : https://ffmpeg.org/download.html ou 'choco install ffmpeg'"
    echo "- macOS   : brew install ffmpeg"
    echo "- Linux   : sudo apt install ffmpeg"
    exit 1
fi

echo -e "${GREEN}✅ FFmpeg détecté : $(ffmpeg -version | head -n 1)${NC}"
echo ""

# Dossiers
INPUT_DIR="./public/videos/raw"
OUTPUT_DIR="./public/videos"
POSTERS_DIR="./public/videos/posters"

# Créer les dossiers si nécessaire
mkdir -p "$INPUT_DIR"
mkdir -p "$OUTPUT_DIR"
mkdir -p "$POSTERS_DIR"

# Vérifier si des vidéos existent
if [ -z "$(ls -A $INPUT_DIR 2>/dev/null)" ]; then
    echo -e "${RED}❌ Aucune vidéo trouvée dans $INPUT_DIR${NC}"
    echo ""
    echo "📝 Instructions :"
    echo "1. Créez le dossier : mkdir -p $INPUT_DIR"
    echo "2. Placez vos vidéos brutes dedans (Wildify_démo.mp4, etc.)"
    echo "3. Relancez ce script"
    exit 1
fi

echo "📂 Vidéos trouvées dans $INPUT_DIR :"
ls -lh "$INPUT_DIR"
echo ""

# Fonction de compression
compress_video() {
    local input="$1"
    local filename=$(basename "$input")
    local name="${filename%.*}"
    local output_mp4="$OUTPUT_DIR/${name}.mp4"
    local output_webm="$OUTPUT_DIR/${name}.webm"
    local poster="$POSTERS_DIR/${name}.jpg"
    
    echo -e "${BLUE}🎥 Traitement : $filename${NC}"
    echo "-----------------------------------"
    
    # 1. Compression MP4 (H.264) - Compatibilité maximale
    echo "  📹 Génération MP4 optimisé..."
    ffmpeg -i "$input" \
        -c:v libx264 \
        -preset slow \
        -crf 28 \
        -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" \
        -profile:v high \
        -level 4.0 \
        -pix_fmt yuv420p \
        -movflags +faststart \
        -c:a aac \
        -b:a 128k \
        -ac 2 \
        -ar 44100 \
        -y \
        "$output_mp4" \
        -loglevel error -stats
    
    # 2. Compression WebM (VP9) - Meilleure compression
    echo "  🌐 Génération WebM optimisé..."
    ffmpeg -i "$input" \
        -c:v libvpx-vp9 \
        -crf 35 \
        -b:v 0 \
        -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" \
        -c:a libopus \
        -b:a 96k \
        -ac 2 \
        -y \
        "$output_webm" \
        -loglevel error -stats
    
    # 3. Génération image poster (thumbnail à 2 secondes)
    echo "  🖼️  Génération poster image..."
    ffmpeg -i "$input" \
        -ss 00:00:02 \
        -vframes 1 \
        -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" \
        -q:v 2 \
        -y \
        "$poster" \
        -loglevel error
    
    # Statistiques
    local size_input=$(du -h "$input" | cut -f1)
    local size_mp4=$(du -h "$output_mp4" | cut -f1)
    local size_webm=$(du -h "$output_webm" | cut -f1)
    
    echo -e "${GREEN}  ✅ Terminé !${NC}"
    echo "     Original : $size_input"
    echo "     MP4      : $size_mp4"
    echo "     WebM     : $size_webm"
    echo ""
}

# Traiter toutes les vidéos
for video in "$INPUT_DIR"/*.{mp4,mov,avi,mkv} 2>/dev/null; do
    [ -e "$video" ] || continue
    compress_video "$video"
done

echo -e "${GREEN}=================================="
echo "🎉 Compression terminée !"
echo "==================================${NC}"
echo ""
echo "📊 Résultats :"
echo "   MP4  : $(ls -1 $OUTPUT_DIR/*.mp4 2>/dev/null | wc -l) fichiers dans $OUTPUT_DIR"
echo "   WebM : $(ls -1 $OUTPUT_DIR/*.webm 2>/dev/null | wc -l) fichiers dans $OUTPUT_DIR"
echo "   Posters : $(ls -1 $POSTERS_DIR/*.jpg 2>/dev/null | wc -l) images dans $POSTERS_DIR"
echo ""
echo "📝 Prochaines étapes :"
echo "   1. Vérifiez les vidéos compressées dans $OUTPUT_DIR"
echo "   2. Mettez à jour src/data/projects.ts avec les chemins :"
echo "      demoVideo: '/videos/wildify.mp4'"
echo "   3. Testez : npm run dev"
echo ""
