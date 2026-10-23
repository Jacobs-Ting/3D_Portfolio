#!/bin/zsh -l
# 雙擊本檔，以本機伺服器啟動 React / Vite 網站。
cd -- "${0:A:h}" || exit 1
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if ! command -v npm >/dev/null 2>&1; then
  print '找不到 Node.js / npm。請先安裝 Node.js 22.12 以上版本，再重新開啟本檔。'
  read '?按 Enter 結束…'
  exit 1
fi
if [[ ! -f node_modules/vite/bin/vite.js ]]; then
  print '首次啟動：正在安裝網站套件…'
  npm install || { read '?安裝失敗，按 Enter 結束…'; exit 1; }
fi
print '正在啟動鼻鼻的小小世界，瀏覽器將自動開啟。'
print '使用期間請保留這個終端機視窗。結束時按 Control + C。'
npm run dev -- --host 127.0.0.1 --open
