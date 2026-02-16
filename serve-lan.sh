#!/bin/bash
# 本地 + 局域网预览，手机可访问
# 用法: ./serve-lan.sh 或 bash serve-lan.sh
cd "$(dirname "$0")"
PORT=8080
echo "Starting server on port $PORT..."
echo ""
echo "本地访问: http://localhost:$PORT"
echo "手机访问: http://$(ipconfig getifaddr en0 2>/dev/null || echo 'YOUR_IP'):$PORT"
echo ""
echo "请确保手机与电脑在同一 WiFi"
python3 -m http.server $PORT --bind 0.0.0.0
