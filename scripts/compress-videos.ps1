# Script de compression vidéo pour portfolio (Windows PowerShell)
# Nécessite FFmpeg : https://ffmpeg.org/download.html

Write-Host "🎬 Compression des vidéos de démo" -ForegroundColor Blue
Write-Host "==================================" -ForegroundColor Blue
Write-Host ""

# Vérifier si FFmpeg est installé
try {
    $ffmpegVersion = ffmpeg -version 2>&1 | Select-String "ffmpeg version" | Select-Object -First 1
    Write-Host "✅ FFmpeg détecté : $ffmpegVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ FFmpeg n'est pas installé !" -ForegroundColor Red
    Write-Host ""
    Write-Host "Installation requise :"
    Write-Host "1. Télécharger depuis https://ffmpeg.org/download.html"
    Write-Host "2. Ou installer avec Chocolatey : choco install ffmpeg"
    Write-Host "3. Ou installer avec Scoop : scoop install ffmpeg"
    exit 1
}
Write-Host ""

# Dossiers
$INPUT_DIR = ".\public\videos\raw"
$OUTPUT_DIR = ".\public\videos"
$POSTERS_DIR = ".\public\videos\posters"

# Créer les dossiers si nécessaire
New-Item -ItemType Directory -Force -Path $INPUT_DIR | Out-Null
New-Item -ItemType Directory -Force -Path $OUTPUT_DIR | Out-Null
New-Item -ItemType Directory -Force -Path $POSTERS_DIR | Out-Null

# Vérifier si des vidéos existent
$videos = Get-ChildItem -Path $INPUT_DIR -Include *.mp4,*.mov,*.avi,*.mkv -Recurse -ErrorAction SilentlyContinue

if ($videos.Count -eq 0) {
    Write-Host "❌ Aucune vidéo trouvée dans $INPUT_DIR" -ForegroundColor Red
    Write-Host ""
    Write-Host "📝 Instructions :"
    Write-Host "1. Placez vos vidéos brutes dans : $INPUT_DIR"
    Write-Host "2. Formats supportés : .mp4, .mov, .avi, .mkv"
    Write-Host "3. Relancez ce script"
    exit 1
}

Write-Host "📂 Vidéos trouvées : $($videos.Count)" -ForegroundColor Cyan
$videos | ForEach-Object { Write-Host "   - $($_.Name)" }
Write-Host ""

# Fonction de compression
function Compress-Video {
    param (
        [string]$InputPath
    )
    
    $filename = [System.IO.Path]::GetFileName($InputPath)
    $name = [System.IO.Path]::GetFileNameWithoutExtension($InputPath)
    $outputMP4 = Join-Path $OUTPUT_DIR "$name.mp4"
    $outputWebM = Join-Path $OUTPUT_DIR "$name.webm"
    $poster = Join-Path $POSTERS_DIR "$name.jpg"
    
    Write-Host "🎥 Traitement : $filename" -ForegroundColor Blue
    Write-Host "-----------------------------------"
    
    # 1. Compression MP4 (H.264)
    Write-Host "  📹 Génération MP4 optimisé..."
    & ffmpeg -i "$InputPath" `
        -c:v libx264 `
        -preset slow `
        -crf 28 `
        -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" `
        -profile:v high `
        -level 4.0 `
        -pix_fmt yuv420p `
        -movflags +faststart `
        -c:a aac `
        -b:a 128k `
        -ac 2 `
        -ar 44100 `
        -y `
        "$outputMP4" `
        -loglevel error -stats 2>&1 | Out-Null
    
    # 2. Compression WebM (VP9)
    Write-Host "  🌐 Génération WebM optimisé..."
    & ffmpeg -i "$InputPath" `
        -c:v libvpx-vp9 `
        -crf 35 `
        -b:v 0 `
        -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" `
        -c:a libopus `
        -b:a 96k `
        -ac 2 `
        -y `
        "$outputWebM" `
        -loglevel error -stats 2>&1 | Out-Null
    
    # 3. Génération poster
    Write-Host "  🖼️  Génération poster image..."
    & ffmpeg -i "$InputPath" `
        -ss 00:00:02 `
        -vframes 1 `
        -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" `
        -q:v 2 `
        -y `
        "$poster" `
        -loglevel error 2>&1 | Out-Null
    
    # Statistiques
    $sizeInput = (Get-Item $InputPath).Length / 1MB
    $sizeMP4 = (Get-Item $outputMP4).Length / 1MB
    $sizeWebM = (Get-Item $outputWebM).Length / 1MB
    
    Write-Host "  ✅ Terminé !" -ForegroundColor Green
    Write-Host "     Original : $("{0:N2}" -f $sizeInput) MB"
    Write-Host "     MP4      : $("{0:N2}" -f $sizeMP4) MB (réduction: $("{0:N0}" -f (100 - ($sizeMP4/$sizeInput*100)))%)"
    Write-Host "     WebM     : $("{0:N2}" -f $sizeWebM) MB (réduction: $("{0:N0}" -f (100 - ($sizeWebM/$sizeInput*100)))%)"
    Write-Host ""
}

# Traiter toutes les vidéos
foreach ($video in $videos) {
    Compress-Video -InputPath $video.FullName
}

Write-Host "==================================" -ForegroundColor Green
Write-Host "🎉 Compression terminée !" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Résultats :"
Write-Host "   MP4     : $((Get-ChildItem "$OUTPUT_DIR\*.mp4" -ErrorAction SilentlyContinue).Count) fichiers"
Write-Host "   WebM    : $((Get-ChildItem "$OUTPUT_DIR\*.webm" -ErrorAction SilentlyContinue).Count) fichiers"
Write-Host "   Posters : $((Get-ChildItem "$POSTERS_DIR\*.jpg" -ErrorAction SilentlyContinue).Count) images"
Write-Host ""
Write-Host "📝 Prochaines étapes :"
Write-Host "   1. Vérifiez les vidéos dans : $OUTPUT_DIR"
Write-Host "   2. Mettez à jour src/data/projects.ts :"
Write-Host "      demoVideo: '/videos/wildify.mp4'"
Write-Host "   3. Testez : npm run dev"
Write-Host ""
