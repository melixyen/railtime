//從臺鐵 OpenData「鐵路時刻表-JSON」下載指定日期的每日時刻表，替換上一層目錄的 w0.json ~ w6.json（w0 為星期日）
//用法：node get_trc_week_timetable.js {w0 日期} {w1 日期} ... {w6 日期}
//日期為 OpenData 檔名的八位數年月日，例如 node get_trc_week_timetable.js 20261101 20261102 20261103 20261104 20261105 20261106 20261107
//只用 Node 內建模組與 fetch（Node 18 以上），不依賴 npm 套件
const fs = require('fs');
const path = require('path');

const ODS_ORIGIN = 'https://ods.railway.gov.tw';
const LIST_URL = ODS_ORIGIN + '/tra-ods-web/ods/download/dataResource/railway_schedule/JSON/list';
const OUT_DIR = path.join(__dirname, '..');
const WEEK_NAME = '日一二三四五六';

function fail(msg) {
    console.error('錯誤：' + msg);
    process.exit(1);
}

function weekdayOf(ymd) {
    const d = new Date(Date.UTC(+ymd.slice(0, 4), +ymd.slice(4, 6) - 1, +ymd.slice(6, 8)));
    if (d.getUTCFullYear() != +ymd.slice(0, 4) || d.getUTCMonth() != +ymd.slice(4, 6) - 1 || d.getUTCDate() != +ymd.slice(6, 8)) return -1;
    return d.getUTCDay();
}

//解析清單頁，回傳 { '20261101': '下載網址', ... }
async function getFileList() {
    const res = await fetch(LIST_URL);
    if (!res.ok) fail('無法取得檔案清單 HTTP ' + res.status + '：' + LIST_URL);
    const html = await res.text();
    const map = {};
    for (const tr of html.match(/<tr[\s\S]*?<\/tr>/g) || []) {
        const name = tr.match(/(\d{8})\.json/);
        const href = tr.match(/href="([^"]+)"/);
        if (name && href) map[name[1]] = new URL(href[1], ODS_ORIGIN).href;
    }
    return map;
}

async function main() {
    const dates = process.argv.slice(2);
    if (dates.length != 7) fail('需要 7 個日期參數，依序對應 w0（星期日）到 w6（星期六），例如 20261101 20261102 ... 20261107');

    //先檢查全部參數：八位數日期，且星期幾要對應 w0 ~ w6
    dates.forEach((ymd, i) => {
        if (!/^\d{8}$/.test(ymd)) fail('日期必須是八位數年月日（OpenData 檔名格式），收到 ' + ymd);
        const w = weekdayOf(ymd);
        if (w < 0) fail('不存在的日期 ' + ymd);
        if (w != i) fail('w' + i + ' 應為星期' + WEEK_NAME[i] + '，但 ' + ymd + ' 是星期' + WEEK_NAME[w]);
    });

    const list = await getFileList();
    const missing = dates.filter((d) => !list[d]);
    if (missing.length) {
        const avail = Object.keys(list).sort();
        fail('OpenData 上找不到 ' + missing.join(', ') + '.json，目前可下載範圍 ' + (avail.length ? avail[0] + ' ~ ' + avail[avail.length - 1] : '（清單為空）'));
    }

    //全部下載並驗證成功後才寫檔，避免只替換到一部分
    const bufs = [];
    for (let i = 0; i < 7; i++) {
        const res = await fetch(list[dates[i]]);
        if (!res.ok) fail('下載 ' + dates[i] + '.json 失敗 HTTP ' + res.status);
        const buf = Buffer.from(await res.arrayBuffer());
        let json;
        try { json = JSON.parse(buf.toString('utf8')); } catch (e) { fail(dates[i] + '.json 不是有效的 JSON'); }
        if (!Array.isArray(json.TrainInfos) || !json.TrainInfos.length) fail(dates[i] + '.json 沒有 TrainInfos 資料');
        bufs.push(buf);
        console.log('已下載 ' + dates[i] + '.json（星期' + WEEK_NAME[i] + '，' + json.TrainInfos.length + ' 班次）');
    }

    bufs.forEach((buf, i) => {
        const file = path.join(OUT_DIR, 'w' + i + '.json');
        fs.writeFileSync(file, buf);
        console.log('w' + i + '.json ← ' + dates[i] + '.json');
    });
}

main().catch((e) => fail(e && e.message || String(e)));
