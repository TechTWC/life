const STORAGE_KEY = "life-ledger:v1";
const THEME_KEY = "life-ledger:theme";

const DEFAULT_CATEGORIES = [
  { id: "deep-work", label: "深度工作" },
  { id: "work", label: "工作/行政" },
  { id: "learning", label: "學習" },
  { id: "health", label: "健康" },
  { id: "relationships", label: "人際/家庭" },
  { id: "life-admin", label: "生活雜務" },
  { id: "rest", label: "休息恢復" },
  { id: "entertainment", label: "娛樂" },
  { id: "leak", label: "流失/無意識" },
  { id: "other", label: "其他" },
];

const VALUE_LABELS = {
  investment: "投資人生",
  maintenance: "必要維持",
  recovery: "恢復休息",
  leak: "流失時間",
};

const DEFAULT_STATE = {
  version: 1,
  settings: {
    focusMinutes: 50,
    breakMinutes: 10,
  },
  days: {},
  currentTimer: null,
  pace: {
    active: false,
    mode: "focus",
    nextAt: null,
  },
};

const els = {
  currentDate: document.querySelector("#currentDate"),
  themeToggle: document.querySelector("#themeToggle"),
  dailyIntention: document.querySelector("#dailyIntention"),
  metricTracked: document.querySelector("#metricTracked"),
  metricCoverage: document.querySelector("#metricCoverage"),
  metricInvestment: document.querySelector("#metricInvestment"),
  metricLeak: document.querySelector("#metricLeak"),
  metricScore: document.querySelector("#metricScore"),
  timerStatus: document.querySelector("#timerStatus"),
  timerDisplay: document.querySelector("#timerDisplay"),
  timerTitle: document.querySelector("#timerTitle"),
  timerCategory: document.querySelector("#timerCategory"),
  timerValue: document.querySelector("#timerValue"),
  startTimer: document.querySelector("#startTimer"),
  stopTimer: document.querySelector("#stopTimer"),
  paceStatus: document.querySelector("#paceStatus"),
  focusMinutes: document.querySelector("#focusMinutes"),
  breakMinutes: document.querySelector("#breakMinutes"),
  nextBreakText: document.querySelector("#nextBreakText"),
  togglePace: document.querySelector("#togglePace"),
  notifyPermission: document.querySelector("#notifyPermission"),
  entryForm: document.querySelector("#entryForm"),
  entryTitle: document.querySelector("#entryTitle"),
  entryStart: document.querySelector("#entryStart"),
  entryEnd: document.querySelector("#entryEnd"),
  entryCategory: document.querySelector("#entryCategory"),
  entryValue: document.querySelector("#entryValue"),
  entryNote: document.querySelector("#entryNote"),
  categoryBars: document.querySelector("#categoryBars"),
  entryList: document.querySelector("#entryList"),
  sortEntries: document.querySelector("#sortEntries"),
  clearDay: document.querySelector("#clearDay"),
  reviewWins: document.querySelector("#reviewWins"),
  reviewLeaks: document.querySelector("#reviewLeaks"),
  reviewTomorrow: document.querySelector("#reviewTomorrow"),
  reviewNote: document.querySelector("#reviewNote"),
  exportJson: document.querySelector("#exportJson"),
  exportCsv: document.querySelector("#exportCsv"),
  importJson: document.querySelector("#importJson"),
  weekSummary: document.querySelector("#weekSummary"),
  toast: document.querySelector("#toast"),
  breakDialog: document.querySelector("#breakDialog"),
  breakDialogText: document.querySelector("#breakDialogText"),
  startBreak: document.querySelector("#startBreak"),
  skipBreak: document.querySelector("#skipBreak"),
};

let state = loadState();
let selectedDate = todayKey();
let tickingHandle = null;
let toastHandle = null;

init();

function init() {
  hydrateTheme();
  populateCategorySelects();
  els.currentDate.value = selectedDate;
  els.focusMinutes.value = state.settings.focusMinutes;
  els.breakMinutes.value = state.settings.breakMinutes;
  setDefaultEntryTimes();
  bindEvents();
  render();
  tickingHandle = window.setInterval(tick, 1000);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredCloneSafe(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return normalizeState(parsed);
  } catch (error) {
    console.error("Unable to load Life Ledger state", error);
    return structuredCloneSafe(DEFAULT_STATE);
  }
}

function normalizeState(raw) {
  const next = structuredCloneSafe(DEFAULT_STATE);
  if (!raw || typeof raw !== "object") return next;
  next.version = 1;
  next.settings = { ...next.settings, ...(raw.settings || {}) };
  next.days = raw.days && typeof raw.days === "object" ? raw.days : {};
  next.currentTimer = raw.currentTimer || null;
  next.pace = { ...next.pace, ...(raw.pace || {}) };
  return next;
}

function structuredCloneSafe(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getDay(dateKey = selectedDate) {
  if (!state.days[dateKey]) {
    state.days[dateKey] = {
      intention: "",
      entries: [],
      review: {
        wins: "",
        leaks: "",
        tomorrow: "",
        note: "",
      },
    };
  }
  return state.days[dateKey];
}

function bindEvents() {
  els.currentDate.addEventListener("change", () => {
    selectedDate = els.currentDate.value || todayKey();
    render();
  });

  els.themeToggle.addEventListener("click", toggleTheme);

  els.dailyIntention.addEventListener("input", () => {
    getDay().intention = els.dailyIntention.value;
    saveState();
  });

  els.startTimer.addEventListener("click", startTimer);
  els.stopTimer.addEventListener("click", stopTimer);

  els.focusMinutes.addEventListener("input", updatePaceSettings);
  els.breakMinutes.addEventListener("input", updatePaceSettings);
  els.togglePace.addEventListener("click", togglePace);
  els.notifyPermission.addEventListener("click", requestNotifications);
  els.startBreak.addEventListener("click", startBreakFromDialog);
  els.skipBreak.addEventListener("click", skipBreak);

  els.entryForm.addEventListener("submit", addManualEntry);
  els.sortEntries.addEventListener("click", sortEntries);
  els.clearDay.addEventListener("click", clearSelectedDay);

  [els.reviewWins, els.reviewLeaks, els.reviewTomorrow, els.reviewNote].forEach((node) => {
    node.addEventListener("input", saveReview);
  });

  els.exportJson.addEventListener("click", exportJson);
  els.exportCsv.addEventListener("click", exportCsv);
  els.importJson.addEventListener("change", importJson);

  window.addEventListener("beforeunload", () => {
    window.clearInterval(tickingHandle);
    saveState();
  });
}

function hydrateTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") {
    document.documentElement.dataset.theme = saved;
    return;
  }
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem(THEME_KEY, next);
}

function populateCategorySelects() {
  const options = DEFAULT_CATEGORIES.map((category) => `<option value="${category.id}">${category.label}</option>`).join("");
  els.timerCategory.innerHTML = options;
  els.entryCategory.innerHTML = options;
}

function setDefaultEntryTimes() {
  const now = new Date();
  const end = toTimeInput(now);
  const startDate = new Date(now.getTime() - 30 * 60 * 1000);
  els.entryStart.value = toTimeInput(startDate);
  els.entryEnd.value = end;
}

function updatePaceSettings() {
  const focus = clamp(parseInt(els.focusMinutes.value, 10) || 50, 5, 180);
  const rest = clamp(parseInt(els.breakMinutes.value, 10) || 10, 1, 60);
  state.settings.focusMinutes = focus;
  state.settings.breakMinutes = rest;
  saveState();
  renderPace();
}

function startTimer() {
  const title = cleanText(els.timerTitle.value) || "未命名活動";
  state.currentTimer = {
    id: createId(),
    title,
    category: els.timerCategory.value,
    value: els.timerValue.value,
    startedAt: new Date().toISOString(),
  };
  saveState();
  showToast(`已開始：${title}`);
  renderTimer();
}

function stopTimer() {
  if (!state.currentTimer) return;
  const timer = state.currentTimer;
  const started = new Date(timer.startedAt);
  const ended = new Date();
  const minutes = Math.max(1, Math.round((ended - started) / 60000));
  const dateKey = toDateKey(started);
  const entry = {
    id: timer.id,
    title: timer.title,
    category: timer.category,
    value: timer.value,
    start: toTimeInput(started),
    end: toTimeInput(ended),
    minutes,
    note: "由計時器建立",
    createdAt: new Date().toISOString(),
  };
  getDay(dateKey).entries.push(entry);
  state.currentTimer = null;
  saveState();

  if (dateKey !== selectedDate) {
    selectedDate = dateKey;
    els.currentDate.value = selectedDate;
  }

  showToast(`已存入：${entry.title}，${formatMinutes(minutes)}`);
  render();
}

function addManualEntry(event) {
  event.preventDefault();
  const title = cleanText(els.entryTitle.value);
  if (!title) {
    showToast("請先輸入做了什麼。");
    return;
  }

  const minutes = minutesBetween(els.entryStart.value, els.entryEnd.value);
  if (!Number.isFinite(minutes) || minutes <= 0) {
    showToast("請確認開始與結束時間。");
    return;
  }

  const entry = {
    id: createId(),
    title,
    category: els.entryCategory.value,
    value: els.entryValue.value,
    start: els.entryStart.value,
    end: els.entryEnd.value,
    minutes,
    note: cleanText(els.entryNote.value),
    createdAt: new Date().toISOString(),
  };

  getDay().entries.push(entry);
  saveState();
  els.entryTitle.value = "";
  els.entryNote.value = "";
  setDefaultEntryTimes();
  showToast(`已新增：${entry.title}`);
  render();
}

function saveReview() {
  getDay().review = {
    wins: els.reviewWins.value,
    leaks: els.reviewLeaks.value,
    tomorrow: els.reviewTomorrow.value,
    note: els.reviewNote.value,
  };
  saveState();
}

function sortEntries() {
  const day = getDay();
  day.entries.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
  saveState();
  renderEntries();
  renderCategoryBars();
  showToast("已依開始時間排序。");
}

function clearSelectedDay() {
  const day = getDay();
  if (!day.entries.length && !day.intention && !Object.values(day.review).some(Boolean)) {
    showToast("今天目前沒有資料可清空。");
    return;
  }
  const confirmed = window.confirm(`確定清空 ${selectedDate} 的意圖、紀錄與回顧嗎？這個動作無法復原。`);
  if (!confirmed) return;
  delete state.days[selectedDate];
  saveState();
  render();
  showToast("已清空這一天。");
}

function deleteEntry(entryId) {
  const day = getDay();
  const entry = day.entries.find((item) => item.id === entryId);
  day.entries = day.entries.filter((item) => item.id !== entryId);
  saveState();
  render();
  showToast(entry ? `已刪除：${entry.title}` : "已刪除紀錄。");
}

function duplicateEntry(entryId) {
  const day = getDay();
  const entry = day.entries.find((item) => item.id === entryId);
  if (!entry) return;
  day.entries.push({ ...entry, id: createId(), createdAt: new Date().toISOString(), note: entry.note || "複製的紀錄" });
  saveState();
  render();
  showToast(`已複製：${entry.title}`);
}

function togglePace() {
  if (state.pace.active) {
    state.pace = { active: false, mode: "focus", nextAt: null };
    showToast("已關閉休息提醒。");
  } else {
    state.pace = {
      active: true,
      mode: "focus",
      nextAt: addMinutes(new Date(), state.settings.focusMinutes).toISOString(),
    };
    showToast("已啟動休息提醒。");
  }
  saveState();
  renderPace();
}

async function requestNotifications() {
  if (!("Notification" in window)) {
    showToast("這個瀏覽器不支援通知。");
    return;
  }
  const permission = await Notification.requestPermission();
  showToast(permission === "granted" ? "已允許瀏覽器通知。" : "尚未允許通知，你仍會看到頁面內提醒。");
}

function maybeFirePaceReminder() {
  if (!state.pace.active || !state.pace.nextAt) return;
  const nextAt = new Date(state.pace.nextAt);
  if (Number.isNaN(nextAt.getTime()) || Date.now() < nextAt.getTime()) return;

  if (state.pace.mode === "focus") {
    showBreakDialog();
    state.pace.mode = "break";
    state.pace.nextAt = addMinutes(new Date(), state.settings.breakMinutes).toISOString();
    notify("該休息了", `專注 ${state.settings.focusMinutes} 分鐘後，休息 ${state.settings.breakMinutes} 分鐘。`);
  } else {
    state.pace.mode = "focus";
    state.pace.nextAt = addMinutes(new Date(), state.settings.focusMinutes).toISOString();
    notify("休息結束", "回到下一段專注，先選一件最重要的事。");
    showToast("休息結束，回到下一段專注。");
  }

  saveState();
  renderPace();
}

function showBreakDialog() {
  els.breakDialogText.textContent = `你已經專注 ${state.settings.focusMinutes} 分鐘。站起來、喝水、看遠方，休息 ${state.settings.breakMinutes} 分鐘。`;
  if (typeof els.breakDialog.showModal === "function" && !els.breakDialog.open) {
    els.breakDialog.showModal();
  } else {
    showToast("該休息了：站起來、喝水、看遠方。");
  }
}

function startBreakFromDialog() {
  if (els.breakDialog.open) els.breakDialog.close();
  state.pace.active = true;
  state.pace.mode = "break";
  state.pace.nextAt = addMinutes(new Date(), state.settings.breakMinutes).toISOString();
  saveState();
  renderPace();
  showToast(`開始休息 ${state.settings.breakMinutes} 分鐘。`);
}

function skipBreak() {
  if (els.breakDialog.open) els.breakDialog.close();
  state.pace.active = true;
  state.pace.mode = "focus";
  state.pace.nextAt = addMinutes(new Date(), state.settings.focusMinutes).toISOString();
  saveState();
  renderPace();
  showToast("已略過休息，下一段專注開始。");
}

function notify(title, body) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  new Notification(title, { body });
}

function tick() {
  renderTimer();
  renderPace();
  maybeFirePaceReminder();
}

function render() {
  const day = getDay();
  els.dailyIntention.value = day.intention || "";
  els.reviewWins.value = day.review?.wins || "";
  els.reviewLeaks.value = day.review?.leaks || "";
  els.reviewTomorrow.value = day.review?.tomorrow || "";
  els.reviewNote.value = day.review?.note || "";
  renderMetrics();
  renderTimer();
  renderPace();
  renderEntries();
  renderCategoryBars();
  renderWeekSummary();
}

function renderMetrics() {
  const entries = getDay().entries;
  const tracked = sum(entries.map((entry) => entry.minutes));
  const investment = sum(entries.filter((entry) => entry.value === "investment").map((entry) => entry.minutes));
  const leak = sum(entries.filter((entry) => entry.value === "leak").map((entry) => entry.minutes));
  const score = calculateScore(entries);

  els.metricTracked.textContent = formatMinutes(tracked);
  els.metricInvestment.textContent = formatMinutes(investment);
  els.metricLeak.textContent = formatMinutes(leak);
  els.metricScore.textContent = String(score);

  const coverage = Math.min(100, Math.round((tracked / (16 * 60)) * 100));
  els.metricCoverage.textContent = tracked
    ? `以清醒 16 小時計，已看見 ${coverage}% 的時間流向。`
    : "今天還有很多空白，先記下一段。";
}

function calculateScore(entries) {
  const tracked = sum(entries.map((entry) => entry.minutes));
  if (!tracked) return 0;
  const investment = sum(entries.filter((entry) => entry.value === "investment").map((entry) => entry.minutes));
  const recovery = sum(entries.filter((entry) => entry.value === "recovery").map((entry) => entry.minutes));
  const leak = sum(entries.filter((entry) => entry.value === "leak").map((entry) => entry.minutes));
  const coverageScore = Math.min(40, (tracked / (12 * 60)) * 40);
  const valueScore = ((investment + recovery * 0.55) / tracked) * 45;
  const leakPenalty = (leak / tracked) * 25;
  return Math.max(0, Math.min(100, Math.round(coverageScore + valueScore - leakPenalty + 15)));
}

function renderTimer() {
  if (!state.currentTimer) {
    els.timerDisplay.textContent = "00:00:00";
    els.timerStatus.textContent = "未開始";
    els.startTimer.disabled = false;
    els.stopTimer.disabled = true;
    return;
  }
  const started = new Date(state.currentTimer.startedAt);
  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - started.getTime()) / 1000));
  els.timerDisplay.textContent = formatSeconds(elapsedSeconds);
  els.timerStatus.textContent = `進行中：${state.currentTimer.title}`;
  els.startTimer.disabled = true;
  els.stopTimer.disabled = false;
}

function renderPace() {
  els.focusMinutes.value = state.settings.focusMinutes;
  els.breakMinutes.value = state.settings.breakMinutes;

  if (!state.pace.active) {
    els.paceStatus.textContent = "關閉";
    els.nextBreakText.textContent = "尚未啟動";
    els.togglePace.textContent = "啟動提醒";
    return;
  }

  const nextAt = new Date(state.pace.nextAt);
  const label = state.pace.mode === "focus" ? "專注中" : "休息中";
  els.paceStatus.textContent = label;
  els.togglePace.textContent = "關閉提醒";

  if (Number.isNaN(nextAt.getTime())) {
    els.nextBreakText.textContent = "時間格式錯誤，請重新啟動";
    return;
  }

  const seconds = Math.max(0, Math.ceil((nextAt.getTime() - Date.now()) / 1000));
  const action = state.pace.mode === "focus" ? "提醒休息" : "提醒回來";
  els.nextBreakText.textContent = `${action}：${formatSecondsShort(seconds)} 後`;
}

function renderEntries() {
  const entries = [...getDay().entries];
  if (!entries.length) {
    els.entryList.className = "entry-list empty-state";
    els.entryList.textContent = "今天尚未記錄任何活動。";
    return;
  }

  els.entryList.className = "entry-list";
  els.entryList.innerHTML = entries
    .map((entry) => {
      const category = findCategory(entry.category);
      const valueLabel = VALUE_LABELS[entry.value] || entry.value || "未分類";
      const note = entry.note ? `<div class="entry-note">${escapeHtml(entry.note)}</div>` : "";
      return `
        <article class="entry-item">
          <div class="entry-time">
            <span>${escapeHtml(entry.start)} → ${escapeHtml(entry.end)}</span>
            <small>${formatMinutes(entry.minutes)}</small>
          </div>
          <div>
            <p class="entry-title">${escapeHtml(entry.title)}</p>
            <div class="entry-meta">
              <span class="tag">${escapeHtml(category.label)}</span>
              <span class="tag">${escapeHtml(valueLabel)}</span>
            </div>
            ${note}
          </div>
          <div class="entry-actions">
            <button class="icon-button secondary-button" type="button" title="複製" data-action="duplicate" data-id="${entry.id}">⧉</button>
            <button class="icon-button danger-button" type="button" title="刪除" data-action="delete" data-id="${entry.id}">×</button>
          </div>
        </article>
      `;
    })
    .join("");

  els.entryList.querySelectorAll("button[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      if (button.dataset.action === "delete") deleteEntry(id);
      if (button.dataset.action === "duplicate") duplicateEntry(id);
    });
  });
}

function renderCategoryBars() {
  const entries = getDay().entries;
  const total = sum(entries.map((entry) => entry.minutes));
  if (!total) {
    els.categoryBars.className = "category-bars empty-state";
    els.categoryBars.textContent = "還沒有紀錄。";
    return;
  }

  const byCategory = entries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + entry.minutes;
    return acc;
  }, {});

  const rows = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([categoryId, minutes]) => {
      const category = findCategory(categoryId);
      const width = Math.max(4, Math.round((minutes / total) * 100));
      return `
        <div class="bar-row">
          <div class="bar-label">
            <span>${escapeHtml(category.label)}</span>
            <span>${formatMinutes(minutes)}</span>
          </div>
          <div class="bar-track" aria-hidden="true">
            <div class="bar-fill" style="--bar-width: ${width}%"></div>
          </div>
        </div>
      `;
    })
    .join("");

  els.categoryBars.className = "category-bars";
  els.categoryBars.innerHTML = rows;
}

function renderWeekSummary() {
  const keys = lastNDays(7, selectedDate);
  const entries = keys.flatMap((key) => state.days[key]?.entries || []);
  const tracked = sum(entries.map((entry) => entry.minutes));
  const investment = sum(entries.filter((entry) => entry.value === "investment").map((entry) => entry.minutes));
  const leak = sum(entries.filter((entry) => entry.value === "leak").map((entry) => entry.minutes));

  if (!tracked) {
    els.weekSummary.textContent = "尚無資料";
    return;
  }

  els.weekSummary.textContent = `記錄 ${formatMinutes(tracked)}；投資 ${formatMinutes(investment)}；流失 ${formatMinutes(leak)}`;
}

function exportJson() {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: "Life Ledger",
    ...state,
  };
  downloadFile(`life-ledger-${todayKey()}.json`, JSON.stringify(payload, null, 2), "application/json");
  showToast("已匯出 JSON 備份。");
}

function exportCsv() {
  const header = ["date", "start", "end", "minutes", "category", "value", "title", "note"];
  const rows = Object.entries(state.days).flatMap(([date, day]) =>
    (day.entries || []).map((entry) => [
      date,
      entry.start,
      entry.end,
      entry.minutes,
      findCategory(entry.category).label,
      VALUE_LABELS[entry.value] || entry.value,
      entry.title,
      entry.note || "",
    ])
  );

  const csv = [header, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n");

  downloadFile(`life-ledger-${todayKey()}.csv`, csv, "text/csv;charset=utf-8");
  showToast("已匯出 CSV。");
}

function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(String(reader.result || "{}"));
      const importedState = normalizeState(imported.days ? imported : imported.state);
      const confirmed = window.confirm("匯入會覆蓋目前瀏覽器中的 Life Ledger 資料，確定繼續嗎？");
      if (!confirmed) return;
      state = importedState;
      saveState();
      selectedDate = todayKey();
      els.currentDate.value = selectedDate;
      render();
      showToast("已匯入 JSON。");
    } catch (error) {
      console.error(error);
      showToast("匯入失敗，請確認 JSON 格式。");
    } finally {
      els.importJson.value = "";
    }
  };
  reader.readAsText(file);
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function showToast(message) {
  window.clearTimeout(toastHandle);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastHandle = window.setTimeout(() => {
    els.toast.classList.remove("show");
  }, 2600);
}

function cleanText(text) {
  return String(text || "").trim();
}

function createId() {
  if (crypto && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function todayKey() {
  return toDateKey(new Date());
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toTimeInput(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function timeToMinutes(value) {
  const [hours, minutes] = String(value || "00:00").split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesBetween(start, end) {
  const startMinutes = timeToMinutes(start);
  let endMinutes = timeToMinutes(end);
  if (endMinutes <= startMinutes) endMinutes += 24 * 60;
  return endMinutes - startMinutes;
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function formatMinutes(totalMinutes) {
  const safe = Math.max(0, Math.round(totalMinutes || 0));
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  return `${hours}h ${minutes}m`;
}

function formatSeconds(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds || 0));
  const hours = String(Math.floor(safe / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((safe % 3600) / 60)).padStart(2, "0");
  const seconds = String(safe % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function formatSecondsShort(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds || 0));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function lastNDays(count, endDateKey) {
  const [year, month, day] = endDateKey.split("-").map(Number);
  const end = new Date(year, month - 1, day);
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(end);
    date.setDate(end.getDate() - index);
    return toDateKey(date);
  });
}

function findCategory(categoryId) {
  return DEFAULT_CATEGORIES.find((category) => category.id === categoryId) || DEFAULT_CATEGORIES[DEFAULT_CATEGORIES.length - 1];
}

function sum(values) {
  return values.reduce((total, value) => total + (Number(value) || 0), 0);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (!/[",\n]/.test(text)) return text;
  return `"${text.replaceAll('"', '""')}"`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
