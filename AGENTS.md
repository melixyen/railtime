# AGENTS.md

「接軌時刻」railtime：台灣鐵路、捷運、公車時刻與動態查詢的純前端網頁集合，以 `gh-pages` 分支直接由 GitHub Pages 提供，沒有建置流程。

## 各 HTML 用途

### 主要頁面
| 檔案 | 用途 |
|---|---|
| `index.html` | 接軌時刻主程式：台鐵、捷運時刻表與路線轉乘查詢 |
| `tratrtc.html` | 與 `index.html` 內容完全相同的副本，修改時兩個檔案要一起改 |
| `ft.html` | 台鐵列車速查：車站即時到離站與當日時刻 |
| `busp.html` | 公車運輸 QR CODE 雲端看板：查公車路線、製作站牌看板 |
| `app/xzbt.html` | 汐止雲端車站：汐止地區的車站看板 |
| `xctsg823.html` | 新昌市民活動中心公車動態看板（823、F902）；單檔自包含，不引入外部 JS |
| `klrt.html` | 基隆輕軌模擬器 |
| `calc_tymetro.html` | 桃園機場捷運時刻表計算器（讀 `time_tymetro.json`） |
| `group_train.html` | 台鐵列車行駛模式群組化系統 |

### 舊版或示範頁
| 檔案 | 用途 |
|---|---|
| `ctra2016.html`、`ctra2017.html`、`ctra2017n.html` | 台鐵 2016、2017 年旅次（客運量）查詢 |
| `canvas_map_demo.html` | 路網圖選擇器（`canvasTaiwanRailwayMap.js`）示範 |
| `gindex.html` | GitHub Pages 自動產生的預設專案頁 |

## 共用程式與資料
- `ttlib/ptx.js`：[rocptx](https://github.com/melixyen/rocptx) 的 `dist/ptx.js` 原樣複製，更新時直接以新版覆蓋，不要在這裡修改。`ft.html` 則是直接從 `https://melixyen.github.io/rocptx/dist/ptx.js` 載入。
- `ttlib/fn.js`、`ttlib/defined.js`、`ttlib/data.js`：接軌時刻共用函式、設定與資料。
- TDX proxy：各頁在載入 ptx.js 之後有一段 inline script，其中的 `TDX_PROXY_URL` 是開關，改成空字串 `''` 就恢復直連 TDX。走 proxy 時，各頁以 `rocptx.proxy.enabled` 判斷，不設定 AppID/AppKey、也不呼叫 `initToken`。
- `w0.json` ~ `w6.json`：台鐵星期日到星期六的代表時刻表，`w0` 為星期日。由 `ttlib/fn.js` 的 `getTRA_TimeTable2Data` 讀取，使用的頁面有 `index.html`、`tratrtc.html`、`group_train.html`。
- `ronnywang_trtc.json`：台北捷運時刻表；`time_tymetro.json`：桃園機場捷運時刻表。

## nodejs_script/
這個目錄放「直接用 `node` 執行、不依賴 npm 套件」的工具程式，需要 Node 18 以上（使用內建 `fetch`）。

### get_trc_week_timetable.js：更新台鐵時刻表 w0.json ~ w6.json
從臺鐵 OpenData「[鐵路時刻表-JSON](https://ods.railway.gov.tw/tra-ods-web/ods/download/dataResource/railway_schedule/JSON/list)」下載指定日期的每日時刻表，覆蓋專案根目錄的 `w0.json` ~ `w6.json`。

```bash
cd nodejs_script
node get_trc_week_timetable.js {w0 日期} {w1 日期} {w2 日期} {w3 日期} {w4 日期} {w5 日期} {w6 日期}
```

範例：

```bash
node get_trc_week_timetable.js 20261101 20261102 20261103 20261104 20261105 20261106 20261107
```

- **日期格式**：八位數年月日，對應 OpenData 上的檔名（`20261101.json`）。
- **日期順序**：依序是星期日到星期六，每個日期的星期幾必須對應 `w0`～`w6`，否則會直接報錯。
- **不會只寫一部分**：7 個檔案都下載成功、確認有 `TrainInfos` 資料之後，才一次寫入；寫入的是原始檔案內容，不重新排版。
- **可選日期**：OpenData 通常提供從今天起約 60 天的檔案，日期不在清單上時，程式會列出目前可下載的範圍。
- **選日期的建議**：挑同一週、沒有連假或補假的日期，避免抓到加開或停駛班次的特殊時刻表。可以比較同一個星期幾各天的檔案大小，明顯偏離的那天通常就是特殊日。
