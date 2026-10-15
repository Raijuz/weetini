#!/bin/bash

# Script khởi động dự án Weetini (Backend + Frontend)
echo "🚀 Đang khởi động dự án Weetini..."

# Lấy đường dẫn thư mục gốc dự án
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Kiểm tra và khởi động Backend FastAPI nếu chưa chạy
if lsof -i :8000 > /dev/null 2>&1; then
    echo "✓ Backend đã đang chạy tại http://localhost:8000"
else
    echo "📦 Đang khởi động Backend FastAPI..."
    (cd "$ROOT_DIR/server" && "$ROOT_DIR/venv/bin/uvicorn" main:app --host 127.0.0.1 --port 8000 --reload) &
    BACKEND_PID=$!
    echo "✓ Backend PID: $BACKEND_PID"
fi

# Chờ 1 giây
sleep 1

# Khởi động Frontend Vite
echo "💻 Đang khởi động Frontend React (Vite)..."
cd "$ROOT_DIR/client" && npm run dev
