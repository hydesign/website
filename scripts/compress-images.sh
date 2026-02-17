#!/bin/bash
# 图片压缩脚本 - 使用 WebP 格式，在保持画质的前提下大幅减少体积
# 使用方法:
#   ./compress-images.sh              # 压缩 images folder → 生成 .webp
#   ./compress-images.sh --sync       # 压缩后同步 .webp 到 images/ 供网站使用
#   ./compress-images.sh dry-run      # 预览模式，不实际执行

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
IMAGES_SOURCE="$ROOT_DIR/images folder"
IMAGES_WEB="$ROOT_DIR/images"
DRY_RUN=false
DO_SYNC=false

for arg in "$@"; do
    case "$arg" in
        dry-run) DRY_RUN=true ;;
        --sync)  DO_SYNC=true ;;
    esac
done

if [[ "$DRY_RUN" == true ]]; then
    echo "🔍 Dry-run 模式：只显示将要压缩的文件"
    echo ""
fi

# 格式化文件大小 (兼容 macOS)
format_size() {
    local bytes=$1
    if [[ $bytes -ge 1048576 ]]; then
        echo "$(( bytes / 1048576 ))MB"
    elif [[ $bytes -ge 1024 ]]; then
        echo "$(( bytes / 1024 ))KB"
    else
        echo "${bytes}B"
    fi
}

# 检查依赖
for cmd in cwebp gif2webp; do
    if ! command -v $cmd &>/dev/null; then
        echo "❌ 需要安装 $cmd: brew install webp"
        exit 1
    fi
done

total_before=0
total_after=0

compress_png() {
    local input="$1"
    local output="${input%.png}.webp"
    
    if [[ -f "$output" && "$input" -ot "$output" ]]; then
        echo "  ⏭️  已存在更新的 WebP，跳过: $(basename "$input")"
        return
    fi
    
    local size_before=$(stat -f%z "$input" 2>/dev/null || stat -c%s "$input" 2>/dev/null)
    total_before=$((total_before + size_before))
    
    if [[ "$DRY_RUN" == true ]]; then
        echo "  📄 PNG → WebP (q95): $(basename "$input") ($(format_size $size_before))"
        return
    fi
    
    # -q 95: 高质量，肉眼几乎无法区分
    # -m 6: 最高压缩级别（稍慢但更小）
    if cwebp -q 95 -m 6 "$input" -o "$output" 2>/dev/null; then
        local size_after=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
        total_after=$((total_after + size_after))
        local saved=$(( (size_before - size_after) * 100 / size_before ))
        echo "  ✅ $(basename "$input") → $(basename "$output") (节省 ${saved}%)"
    else
        echo "  ⚠️  跳过 $(basename "$input")"
    fi
}

compress_jpg() {
    local input="$1"
    local output="${input%.jpg}.webp"
    [[ "$input" == *.jpeg ]] && output="${input%.jpeg}.webp"
    
    if [[ -f "$output" && "$input" -ot "$output" ]]; then
        echo "  ⏭️  已存在更新的 WebP，跳过: $(basename "$input")"
        return
    fi
    
    local size_before=$(stat -f%z "$input" 2>/dev/null || stat -c%s "$input" 2>/dev/null)
    total_before=$((total_before + size_before))
    
    if [[ "$DRY_RUN" == true ]]; then
        echo "  📄 JPG → WebP (q90): $(basename "$input") ($(format_size $size_before))"
        return
    fi
    
    if cwebp -q 90 -m 6 "$input" -o "$output" 2>/dev/null; then
        local size_after=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
        total_after=$((total_after + size_after))
        local saved=$(( (size_before - size_after) * 100 / size_before ))
        echo "  ✅ $(basename "$input") → $(basename "$output") (节省 ${saved}%)"
    else
        echo "  ⚠️  跳过 $(basename "$input")"
    fi
}

compress_gif() {
    local input="$1"
    local output="${input%.gif}.webp"
    
    if [[ -f "$output" && "$input" -ot "$output" ]]; then
        echo "  ⏭️  已存在更新的 WebP，跳过: $(basename "$input")"
        return
    fi
    
    local size_before=$(stat -f%z "$input" 2>/dev/null || stat -c%s "$input" 2>/dev/null)
    total_before=$((total_before + size_before))
    
    if [[ "$DRY_RUN" == true ]]; then
        echo "  🎬 GIF → WebP 动画 (q80): $(basename "$input") ($(format_size $size_before))"
        return
    fi
    
    # -q 80: 动画 GIF 通常可以更激进地压缩
    # -m 6: 高压缩
    if gif2webp -q 80 -m 6 "$input" -o "$output" 2>/dev/null; then
        local size_after=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
        total_after=$((total_after + size_after))
        local saved=$(( (size_before - size_after) * 100 / size_before ))
        echo "  ✅ $(basename "$input") → $(basename "$output") (节省 ${saved}%)"
    else
        echo "  ⚠️  跳过 $(basename "$input")"
    fi
}

echo "📁 扫描目录: $IMAGES_SOURCE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 遍历所有子目录
while IFS= read -r -d '' dir; do
    echo ""
    echo "📂 $(basename "$dir")/"
    
    for img in "$dir"/*.png "$dir"/*.PNG; do
        [[ -f "$img" ]] && compress_png "$img"
    done
    
    for img in "$dir"/*.jpg "$dir"/*.jpeg "$dir"/*.JPG "$dir"/*.JPEG; do
        [[ -f "$img" ]] && compress_jpg "$img"
    done
    
    for img in "$dir"/*.gif "$dir"/*.GIF; do
        [[ -f "$img" ]] && compress_gif "$img"
    done
done < <(find "$IMAGES_SOURCE" -mindepth 1 -maxdepth 1 -type d -print0 | sort -z)

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [[ "$DRY_RUN" == false && $total_before -gt 0 ]]; then
    echo "📊 原始文件总大小: $(format_size $total_before)"
    echo "📊 WebP 文件总大小: $(format_size $total_after)"
    if [[ $total_after -lt $total_before ]]; then
        total_saved=$(( (total_before - total_after) * 100 / total_before ))
        echo "🎉 总计节省: $(format_size $(( total_before - total_after ))) (${total_saved}%)"
    fi
fi

# 同步 WebP 到 images/ 目录
if [[ "$DO_SYNC" == true && "$DRY_RUN" == false ]]; then
    echo ""
    echo "📤 同步 WebP 到 images/ ..."
    synced=0
    while IFS= read -r -d '' f; do
        rel="${f#$IMAGES_SOURCE/}"
        dest="$IMAGES_WEB/$rel"
        destdir="$(dirname "$dest")"
        [[ -d "$destdir" ]] || mkdir -p "$destdir"
        if cp "$f" "$dest" 2>/dev/null; then
            echo "  ✓ $rel"
            ((synced++)) || true
        fi
    done < <(find "$IMAGES_SOURCE" -name "*.webp" -type f -print0 2>/dev/null)
    echo "  已同步 $synced 个 WebP 文件到 images/"
fi

echo ""
if [[ "$DRY_RUN" == false ]]; then
    echo "💡 下一步: 在 js/gallery-config.js 中将 .png/.gif/.jpg 扩展名改为 .webp"
    echo "   运行 ./scripts/update-gallery-to-webp.js 可自动完成（若存在）。"
fi
