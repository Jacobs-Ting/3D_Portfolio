# Bibi’s Little World｜鼻鼻的小小世界

React、Vite、Three.js、React Three Fiber、drei 與 GSAP 製作的互動式微縮城市。所有 3D 物件均以幾何模型建立，不需 API 金鑰或付費素材。

## 從資料夾直接開啟

雙擊根目錄的 `index.html` 即可進入 3D 網站，會自動開啟 `standalone/index.html`，不再顯示啟動說明，也不必安裝 Node.js 或啟動本機伺服器。請保留 `standalone/` 資料夾；也可以單獨分享其中的 `index.html`。JavaScript、CSS、圖示與程式化 3D 模型皆已打包於這個獨立 HTML；線上字體無網路時使用系統字體。

修改原始碼後，執行 `npm run build` 同時更新正式部署檔與獨立版。若只更新獨立版，可執行 `npm run build:standalone`。`dist/index.html` 直接開啟時也會進入隨附的獨立版；經由 HTTP / GitHub Pages 瀏覽時，仍使用一般 Vite 建置。

需要即時修改／開發時，macOS 可雙擊 `啟動小小世界.command`，會啟動 Vite 並自動開啟瀏覽器。使用期間請保留終端機視窗，結束時按 Control + C。此開發方式需要 Node.js 22.12 以上版本。

## 安裝與執行

使用 Node.js 22.12 以上版本。

```sh
npm install
npm run dev
```

開啟終端機顯示的網址。正式建置與預覽：

```sh
npm run build
npm run preview
```

`dist/` 即為可部署的靜態網站。Vite 使用 `base: './'`，支援 GitHub Pages 專案子路徑。

## 操作

- 拖曳旋轉、滾輪縮放；手機單指旋轉、雙指縮放。
- 點擊建築或浮動標籤開啟 HTML 介紹面板，同時聚焦鏡頭。
- 左側導覽提供鍵盤可操作的同等入口；Tab 選取、Enter 啟動、Escape 關閉。
- 首頁按鈕返回全景；快速導覽依序介紹五站，每站 10 秒自動前進，也可跳至下一站或隨時結束。
- 工坊小機器人支援跳躍；基地台、無人機、PCB、螢幕、資料箱、相機與郵筒可點擊。
- `Ⅱ` 可切換減少動畫，亦自動尊重系統設定。
- `♪` 開啟瀏覽器合成的輕柔環境和弦，預設關閉，無外部音檔。
- `2D` 模式提供完整內容；不支援 WebGL 時自動啟用。

## 修改內容

資料皆在 `src/data/`：

| 檔案 | 內容 |
| --- | --- |
| profile.js | 個人介紹、興趣、照片（photos: [{src, alt}]） |
| career.js | 學歷、職涯時間軸 |
| skills.js | 技能標籤 |
| projects.js | 工程專案公開摘要 |
| tools.js | AI 工具、功能、技術、截圖與 Demo |
| creations.js | 遊戲與小說收藏，含公開連結與構想 |
| portfolio.js | 從 Jacobs AI LAB 整合的 35 個作品與工具連結、分類、說明 |
| navigation.js | 原網站分類網址與小島區域的對應 |
| siteConfig.js | 網站名稱、聯絡方式與主題區設定 |

已從使用者提供的 Jacobs_Portfolio_Space-main/index.html、script.js、style.css 整合公開介紹與作品目錄。35 個連結依原檔保留，`published` 表示原站提供連結，並非獨立驗證完成狀態；`concept` 表示構想中。既有四項 AI 工程工具方向另置於可展開區塊，保留待補狀態。未提供的學校、公司、日期、照片與信箱仍待補。網站不內嵌公司文件、機密量測或私人資料。

圖片可放 `public/images/`，並使用 `import.meta.env.BASE_URL + 'images/檔名.jpg'` 建立子路徑相容的 URL。新增作品只需修改資料陣列，不必修改場景。

## GitHub Pages 部署

1. 將完整專案上傳至自己的 GitHub 儲存庫，預設分支為 `main`（如使用其他分支，修改 workflow）。
2. 到儲存庫 Settings → Pages → Build and deployment，Source 選擇 **GitHub Actions**。
3. 推送 main 或手動執行 Deploy GitHub Pages workflow。
4. workflow 安裝、建置並部署 `dist`；完成後使用 Actions 顯示的網址。

此交付包含部署設定，並未替使用者建立 GitHub 儲存庫或上傳部署。

## 架構與效能

`World.jsx` 包含可重用的建築、人物、機器人、景觀與相機元件；`App.jsx` 管理導覽、資料面板、2D 模式與音效；`style.css` 負責桌機與手機版型。樹木使用 InstancedMesh；場景僅一盞陰影方向光，手機降低 DPR，無大型外部模型。GSAP 動畫時暫停 OrbitControls，結束後恢復；相機切換會清除前一個動畫。

## 目前範圍與可擴充項目

包含 Phase 1 MVP，以及 Phase 2 的人物、無人機、齒輪、雲、快速導覽、熊熊彩蛋；包含 Phase 3 的 2D 替代與預設關閉音效。照片／作品截圖等待真實素材，尚未實作照片燈箱、複雜機械手臂、連續步行角色或真實水流／樹木搖晃。環境音目前是合成和弦。若要更多細節，建議拆分 World.jsx 中各主題區至獨立檔案，並以真機測量繪製呼叫與效能後再擴充。

## Jacobs AI LAB 內容整合

- 中央廣場：Jacobs／鼻鼻的六段個人介紹、約 17 年 RF 經驗、RD／TPM、AI 工程、SaaS 探索與職涯陪跑。
- 工程師研究所：12 個 RF、電磁學、通訊系統、電子電路、AI 演算法與自然科學作品。
- AI 工具工坊：6 個工作與求職工具，另外保留既有 4 個工具方向。
- 遊戲創作樂園：16 個遊戲、小說、文學與休閒作品，加上 3 個獨立標示的創作構想。
- 生活湖畔：4 個旅行、休閒、生成藝術與新聞入口（生活相關作品也可從樂園的原站分類開啟）。

各區依原站分類使用可逐層展開的折疊目錄，預設收合，提供全部展開／全部收合與文字搜尋；搜尋會自動展開符合的分類。分類深連結會自動展開對應路徑；原站 `#profile`、`#bio`、`#career`、`#work`、`#electromagnetics`、`#comm-systems`、`#urban-love` 等網址會開啟對應小島面板與分類。原 CSS 的卡片分類／色彩提示與 script.js 的分區導覽／鍵盤操作概念已改寫為 React 元件，保留小島原有的奶油色介面。來源資料未提供截圖，不為公開作品顯示大量空白截圖佔位。

「九點，等你」沿用 Online Dating Story 原網址，去除重複項目；原先只有構想的生命演化與歷史題材改以新提供的具體作品呈現，懸疑、校園靈異與科幻機甲構想另列。

執行 `npm test` 可檢查資料完整性、分類路由與去重。

### 折疊目錄的分類設定

`src/data/catalogSections.js` 定義原站分類階層，使用作品的 `category` 對應，不需在 UI 寫死作品。

- 求職轉職
- 工作專用
- 休閒娛樂 → 網頁小遊戲、互動式小說（都會愛情輕小說、權力遊戲）、小品文學創作
- 技術研究工作室 → 基礎科學教室（電磁學筆記、通訊系統筆記、電子電路筆記、人工智慧演算法、自然科學）
- 新聞推播

「關於我」的六段個人介紹於中央廣場以可展開區塊呈現。額外的創作構想仍獨立分類。分類標題顯示包含子層的作品總數，支援鍵盤 Tab、Enter／Space 操作。
