#!/bin/bash
# 将 gallery-config.js 中的图片扩展名 .png/.jpg/.jpeg/.gif 改为 .webp
# 使用前请先运行 ./compress-images.sh --sync 生成并同步 WebP 文件

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG="$SCRIPT_DIR/../js/gallery-config.js"

if [[ ! -f "$CONFIG" ]]; then
    echo "❌ 未找到 $CONFIG"
    exit 1
fi

# 备份
cp "$CONFIG" "$CONFIG.bak"

# 替换扩展名：.png / .jpg / .jpeg / .gif → .webp (macOS/Linux 兼容)
sed -E 's/\.(png|jpg|jpeg|gif)/.webp/g' "$CONFIG" > "$CONFIG.tmp"
# 特例：return-1.gif 转 WebP 后反而更大，保留原格式
sed -E 's/return-1\.webp/return-1.gif/g' "$CONFIG.tmp" > "$CONFIG.tmp2"
mv "$CONFIG.tmp2" "$CONFIG"
rm -f "$CONFIG.tmp"

echo "✅ 已更新 js/gallery-config.js 使用 .webp 格式"
echo "   备份文件: js/gallery-config.js.bak"
echo "   如需恢复: mv js/gallery-config.js.bak js/gallery-config.js"
