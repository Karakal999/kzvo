#!/bin/bash

echo "🧹 Очищення кешу мов..."

# Зупиняємо dev server якщо запущений
pkill -f "vite" || true

# Очищаємо node_modules/.vite
rm -rf node_modules/.vite

# Очищаємо dist
rm -rf dist

echo "✅ Кеш очищено!"
echo "📝 Тепер:"
echo "   1. Відкрийте браузер"
echo "   2. Натисніть F12 (консоль)"
echo "   3. Виконайте: localStorage.clear()"
echo "   4. Перезавантажте сторінку: Cmd+Shift+R"
echo ""
echo "🚀 Запускаю dev server..."
npm run dev
