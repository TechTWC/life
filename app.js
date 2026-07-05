const STORAGE_KEY = "life-ledger:v1";
const THEME_KEY = "life-ledger:theme";
const LANGUAGES = ["zh", "en"];
const TIME_SLOT_MINUTES = 30;

const CATEGORY_OPTIONS = [
  { id: "deep-work", zh: "深度工作", en: "Deep work" },
  { id: "work", zh: "工作/行政", en: "Work / admin" },
  { id: "learning", zh: "學習", en: "Learning" },
  { id: "health", zh: "健康", en: "Health" },
  { id: "relationships", zh: "人際/家庭", en: "Relationships" },
  { id: "life-admin", zh: "生活雜務", en: "Life admin" },
  { id: "rest", zh: "休息恢復", en: "Recovery" },
  { id: "entertainment", zh: "娛樂", en: "Entertainment" },
  { id: "leak", zh: "流失/無意識", en: "Leak / autopilot" },
  { id: "other", zh: "其他", en: "Other" },
];

const VALUE_OPTIONS = [
  { id: "investment", zh: "投資人生", en: "Life investment" },
  { id: "maintenance", zh: "必要維持", en: "Maintenance" },
  { id: "recovery", zh: "恢復休息", en: "Recovery" },
  { id: "leak", zh: "流失時間", en: "Leaked time" },
];

const I18N = {
  zh: {
    appTitle: "Life Ledger｜每天怎麼花時間",
    brandKicker: "Life Ledger",
    mainHeadline: "把每天活成可回顧、可調整、可累積的系統",
    dateLabel: "日期",
    languageLabel: "語言",
    themeToggle: "切換主題",
    tabOverview: "總覽",
    tabGrid: "24 小時格子補記",
    tabTimeline: "時間線",
    tabReview: "每日回顧",
    heroEyebrow: "今日核心問題",
    heroQuestion: "今天結束時，我希望自己不後悔什麼？",
    dailyIntentionPlaceholder: "例如：完成一個最重要的產出、好好運動、晚上不要被短影音吃掉。",
    metricTrackedLabel: "已記錄時間",
    metricInvestmentLabel: "投資人生",
    metricInvestmentHelp: "深度工作、學習、健康、人際等可累積時間。",
    metricLeakLabel: "流失時間",
    metricLeakHelp: "不是用來自責，是用來看見可調整的缺口。",
    metricScoreLabel: "今日掌舵感",
    metricScoreHelp: "由記錄完整度與高價值時間比例估算。",
    coverageEmpty: "今天還有很多空白，先記下一段。",
    coverageText: "以清醒 16 小時計，已看見 {coverage}% 的時間流向。",
    timerTitle: "當下正在做什麼",
    timerStatusIdle: "未開始",
    timerStatusRunning: "進行中：{title}",
    activityNameLabel: "活動名稱",
    timerTitlePlaceholder: "例如：寫產品規格、運動、滑手機",
    categoryLabel: "分類",
    valueLabel: "時間價值",
    startTimer: "開始記錄",
    stopTimer: "停止並存入今天",
    unnamedActivity: "未命名活動",
    startedToast: "已開始：{title}",
    savedToast: "已存入：{title}，{duration}",
    paceEyebrow: "休息提醒工作流",
    paceTitle: "專注一段、休息一段",
    paceHelp: "這裡沿用「提醒自己不要陷進去」的精神：不是追求一直工作，而是讓節奏回到你手上。",
    focusMinutesLabel: "專注分鐘",
    breakMinutesLabel: "休息分鐘",
    nextReminderLabel: "下一次提醒",
    paceOff: "關閉",
    paceFocus: "專注中",
    paceBreak: "休息中",
    notStarted: "尚未啟動",
    togglePaceOn: "啟動提醒",
    togglePaceOff: "關閉提醒",
    allowNotification: "允許瀏覽器通知",
    paceOffToast: "已關閉休息提醒。",
    paceOnToast: "已啟動休息提醒。",
    notificationUnsupported: "這個瀏覽器不支援通知。",
    notificationGranted: "已允許瀏覽器通知。",
    notificationDenied: "尚未允許通知，你仍會看到頁面內提醒。",
    remindBreak: "提醒休息",
    remindReturn: "提醒回來",
    after: "{time} 後",
    paceTimeError: "時間格式錯誤，請重新啟動",
    breakNotifyTitle: "該休息了",
    breakNotifyBody: "專注 {focus} 分鐘後，休息 {rest} 分鐘。",
    returnNotifyTitle: "休息結束",
    returnNotifyBody: "回到下一段專注，先選一件最重要的事。",
    returnToast: "休息結束，回到下一段專注。",
    breakDialogTitle: "該休息了",
    breakDialogText: "你已經專注 {focus} 分鐘。站起來、喝水、看遠方，休息 {rest} 分鐘。",
    breakFallbackToast: "該休息了：站起來、喝水、看遠方。",
    startBreak: "開始休息",
    skipBreak: "略過這次",
    startBreakToast: "開始休息 {rest} 分鐘。",
    skipBreakToast: "已略過休息，下一段專注開始。",
    gridEyebrow: "24H GRID",
    gridTitle: "24 小時 × 每 30 分鐘補記",
    gridHelp: "把一天切成 48 格，像填表格一樣補上做了什麼。按下儲存後，系統會把連續相同內容自動合併成時間紀錄。",
    gridDefaultCategory: "格子預設分類",
    gridDefaultValue: "格子預設時間價值",
    fillGridFromEntries: "用既有時間線填入空白",
    saveTimeGrid: "儲存格子成紀錄",
    clearTimeGrid: "清空格子",
    gridHint: "提示：格子只會覆蓋「由格子建立」的紀錄，不會刪除你用計時器或手動表單建立的紀錄。",
    gridCellPlaceholder: "做了什麼",
    gridAriaLabel: "{time} 到 {end} 做了什麼",
    gridSavedToast: "已把 {count} 格轉成 {entries} 筆時間紀錄。",
    gridEmptyToast: "格子是空的，已移除由格子建立的紀錄。",
    gridClearedToast: "已清空格子與由格子建立的紀錄。",
    gridClearConfirm: "確定清空這一天的 24 小時格子嗎？由格子建立的紀錄也會移除，但手動與計時器紀錄會保留。",
    gridFilledToast: "已從既有時間線填入 {count} 個空白格。",
    gridNoEntriesToast: "沒有可填入格子的既有時間線紀錄。",
    gridEntryNote: "由 24 小時格子補記建立",
    manualLogTitle: "補記一段時間",
    whatDidYouDoLabel: "做了什麼",
    entryTitlePlaceholder: "例如：讀書、開會、通勤、耍廢",
    startLabel: "開始",
    endLabel: "結束",
    noteLabel: "備註",
    entryNotePlaceholder: "選填：為什麼做、下次怎麼調整",
    addEntry: "新增時間紀錄",
    titleRequiredToast: "請先輸入做了什麼。",
    invalidTimeToast: "請確認開始與結束時間。",
    addedToast: "已新增：{title}",
    mapTitle: "今日時間分布",
    noRecords: "還沒有紀錄。",
    timelineTitle: "今天的時間線",
    sortEntries: "依時間排序",
    clearDay: "清空今天",
    noEntriesToday: "今天尚未記錄任何活動。",
    sortedToast: "已依開始時間排序。",
    clearNothingToast: "今天目前沒有資料可清空。",
    clearDayConfirm: "確定清空 {date} 的意圖、紀錄、格子與回顧嗎？這個動作無法復原。",
    clearDayToast: "已清空這一天。",
    deletedToast: "已刪除：{title}",
    deletedFallbackToast: "已刪除紀錄。",
    duplicateNote: "複製的紀錄",
    duplicatedToast: "已複製：{title}",
    copyTitle: "複製",
    deleteTitle: "刪除",
    uncategorized: "未分類",
    reviewTitle: "每日收工回顧",
    reviewWinsLabel: "今天完成了什麼？",
    reviewWinsPlaceholder: "列出可見成果，不要只看感覺。",
    reviewLeaksLabel: "今天哪裡浪費了生命？",
    reviewLeaksPlaceholder: "誠實描述觸發點，不用責備自己。",
    reviewTomorrowLabel: "明天要守住哪一件事？",
    reviewTomorrowPlaceholder: "一句話就好：明天最重要的防線。",
    reviewNoteLabel: "給今天的自己一句話",
    reviewNotePlaceholder: "用來建立長期的自我對話。",
    dataTitle: "資料掌控權",
    dataHelp: "目前資料儲存在這台裝置的瀏覽器 localStorage。你可以隨時匯出、備份、搬家。",
    exportJson: "匯出 JSON",
    exportCsv: "匯出 CSV",
    importJson: "匯入 JSON",
    last7DaysLabel: "最近 7 天",
    weekNoData: "尚無資料",
    weekSummary: "記錄 {tracked}；投資 {investment}；流失 {leak}",
    exportedJsonToast: "已匯出 JSON 備份。",
    exportedCsvToast: "已匯出 CSV。",
    importConfirm: "匯入會覆蓋目前瀏覽器中的 Life Ledger 資料，確定繼續嗎？",
    importedToast: "已匯入 JSON。",
    importFailedToast: "匯入失敗，請確認 JSON 格式。",
    timerNote: "由計時器建立",
  },
  en: {
    appTitle: "Life Ledger | How your day is spent",
    brandKicker: "Life Ledger",
    mainHeadline: "Turn every day into a system you can review, adjust, and compound",
    dateLabel: "Date",
    languageLabel: "Language",
    themeToggle: "Toggle theme",
    tabOverview: "Overview",
    tabGrid: "24h grid",
    tabTimeline: "Timeline",
    tabReview: "Daily review",
    heroEyebrow: "Core question",
    heroQuestion: "At the end of today, what do I not want to regret?",
    dailyIntentionPlaceholder: "Example: finish the one important output, train well, avoid losing the night to short videos.",
    metricTrackedLabel: "Tracked time",
    metricInvestmentLabel: "Life investment",
    metricInvestmentHelp: "Deep work, learning, health, relationships, and time that compounds.",
    metricLeakLabel: "Leaked time",
    metricLeakHelp: "Not for self-blame. It shows the gap you can adjust.",
    metricScoreLabel: "Steering score",
    metricScoreHelp: "Estimated from tracking completeness and high-value time ratio.",
    coverageEmpty: "The day is still mostly blank. Log one block first.",
    coverageText: "Assuming 16 waking hours, you have made {coverage}% of the day visible.",
    timerTitle: "What are you doing now?",
    timerStatusIdle: "Not started",
    timerStatusRunning: "Running: {title}",
    activityNameLabel: "Activity name",
    timerTitlePlaceholder: "Example: write product spec, workout, scroll phone",
    categoryLabel: "Category",
    valueLabel: "Time value",
    startTimer: "Start tracking",
    stopTimer: "Stop and save to today",
    unnamedActivity: "Untitled activity",
    startedToast: "Started: {title}",
    savedToast: "Saved: {title}, {duration}",
    paceEyebrow: "Break reminder workflow",
    paceTitle: "Focus, then recover",
    paceHelp: "This keeps the same principle: do not fall into a tunnel. The goal is not endless work; it is getting the rhythm back in your hands.",
    focusMinutesLabel: "Focus minutes",
    breakMinutesLabel: "Break minutes",
    nextReminderLabel: "Next reminder",
    paceOff: "Off",
    paceFocus: "Focusing",
    paceBreak: "On break",
    notStarted: "Not started",
    togglePaceOn: "Start reminders",
    togglePaceOff: "Stop reminders",
    allowNotification: "Allow browser notifications",
    paceOffToast: "Break reminders are off.",
    paceOnToast: "Break reminders are on.",
    notificationUnsupported: "This browser does not support notifications.",
    notificationGranted: "Browser notifications are enabled.",
    notificationDenied: "Notifications are not allowed yet. In-page reminders will still appear.",
    remindBreak: "Break reminder",
    remindReturn: "Return reminder",
    after: "in {time}",
    paceTimeError: "Time format error. Restart reminders.",
    breakNotifyTitle: "Time to break",
    breakNotifyBody: "After {focus} minutes of focus, take a {rest}-minute break.",
    returnNotifyTitle: "Break is over",
    returnNotifyBody: "Return to the next focus block. Choose the most important thing first.",
    returnToast: "Break is over. Return to the next focus block.",
    breakDialogTitle: "Time to break",
    breakDialogText: "You have focused for {focus} minutes. Stand up, drink water, look far away, and rest for {rest} minutes.",
    breakFallbackToast: "Time to break: stand up, drink water, and look far away.",
    startBreak: "Start break",
    skipBreak: "Skip this time",
    startBreakToast: "Starting a {rest}-minute break.",
    skipBreakToast: "Break skipped. Next focus block started.",
    gridEyebrow: "24H GRID",
    gridTitle: "24 hours × 30-minute fill-in grid",
    gridHelp: "Split the day into 48 cells and fill in what you did like a spreadsheet. When saved, adjacent cells with the same text are merged into time records.",
    gridDefaultCategory: "Default category",
    gridDefaultValue: "Default time value",
    fillGridFromEntries: "Fill blanks from timeline",
    saveTimeGrid: "Save grid as records",
    clearTimeGrid: "Clear grid",
    gridHint: "Tip: the grid only overwrites records created by the grid. Timer and manual records are not deleted.",
    gridCellPlaceholder: "What did you do?",
    gridAriaLabel: "What did you do from {time} to {end}?",
    gridSavedToast: "Saved {count} cells into {entries} time records.",
    gridEmptyToast: "The grid is empty. Grid-created records were removed.",
    gridClearedToast: "Grid and grid-created records cleared.",
    gridClearConfirm: "Clear this day’s 24-hour grid? Records created by the grid will be removed, but manual and timer records will stay.",
    gridFilledToast: "Filled {count} blank cells from existing timeline records.",
    gridNoEntriesToast: "No existing timeline records can be used to fill the grid.",
    gridEntryNote: "Created from the 24-hour grid",
    manualLogTitle: "Add a time block manually",
    whatDidYouDoLabel: "What did you do?",
    entryTitlePlaceholder: "Example: reading, meeting, commute, wasted time",
    startLabel: "Start",
    endLabel: "End",
    noteLabel: "Note",
    entryNotePlaceholder: "Optional: why you did it, what to adjust next time",
    addEntry: "Add time record",
    titleRequiredToast: "Enter what you did first.",
    invalidTimeToast: "Check the start and end time.",
    addedToast: "Added: {title}",
    mapTitle: "Today's time map",
    noRecords: "No records yet.",
    timelineTitle: "Today's timeline",
    sortEntries: "Sort by time",
    clearDay: "Clear today",
    noEntriesToday: "No activities recorded today.",
    sortedToast: "Sorted by start time.",
    clearNothingToast: "There is no data to clear for today.",
    clearDayConfirm: "Clear intention, records, grid, and review for {date}? This cannot be undone.",
    clearDayToast: "This day has been cleared.",
    deletedToast: "Deleted: {title}",
    deletedFallbackToast: "Record deleted.",
    duplicateNote: "Duplicated record",
    duplicatedToast: "Duplicated: {title}",
    copyTitle: "Duplicate",
    deleteTitle: "Delete",
    uncategorized: "Uncategorized",
    reviewTitle: "Daily shutdown review",
    reviewWinsLabel: "What did you complete today?",
    reviewWinsPlaceholder: "List visible outcomes, not only feelings.",
    reviewLeaksLabel: "Where did life leak away today?",
    reviewLeaksPlaceholder: "Describe the trigger honestly. No self-blame.",
    reviewTomorrowLabel: "What must you protect tomorrow?",
    reviewTomorrowPlaceholder: "One sentence is enough: tomorrow's most important guardrail.",
    reviewNoteLabel: "One line to yourself",
    reviewNotePlaceholder: "Build a long-term conversation with yourself.",
    dataTitle: "Data control",
    dataHelp: "Your data is stored in this browser's localStorage. You can export, back up, and move it anytime.",
    exportJson: "Export JSON",
    exportCsv: "Export CSV",
    importJson: "Import JSON",
    last7DaysLabel: "Last 7 days",
    weekNoData: "No data yet",
    weekSummary: "Tracked {tracked}; invested {investment}; leaked {leak}",
    exportedJsonToast: "JSON backup exported.",
    exportedCsvToast: "CSV exported.",
    importConfirm: "Importing will overwrite the current Life Ledger data in this browser. Continue?",
    importedToast: "JSON imported.",
    importFailedToast: "Import failed. Check the JSON format.",
    timerNote: "Created by timer",
  },
};

const DEFAULT_STATE = {
  version: 1,
  settings: {
    focusMinutes: 50,
    breakMinutes: 10,
    language: "zh",
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
  languageSelect: document.querySelector("#languageSelect"),
  themeToggle: document.querySelector("#themeToggle"),
  dailyIntention: document.querySelector("#dailyIntention"),
  metricTracked: document.querySelector("#metricTracked"),
  metricCoverage: document.querySelector("#metricCoverage"),
  metricInvestment: document.querySelector("#metricInvestment"),
  metricLeak: document.querySelector("#metricLeak"),
  metricScore: document.querySelector("#metricScore"),
  timerStatus: document.querySelector("#timerStatus"),
  timerDisplay: document.querySelector("#timerDisplay"),
  timerTitle: document.querySelector("#timerTitleInput"),
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
  timeGrid: document.querySelector("#timeGrid"),
  gridCategory: document.querySelector("#gridCategory"),
  gridValue: document.querySelector("#gridValue"),
  fillGridFromEntries: document.querySelector("#fillGridFromEntries"),
  saveTimeGrid: document.querySelector("#saveTimeGrid"),
  clearTimeGrid: document.querySelector("#clearTimeGrid"),
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
  els.currentDate.value = selectedDate;
  els.languageSelect.value = getLanguage();
  els.focusMinutes.value = state.settings.focusMinutes;
  els.breakMinutes.value = state.settings.breakMinutes;
  setDefaultEntryTimes();
  applyLanguage();
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
  if (!LANGUAGES.includes(next.settings.language)) next.settings.language = "zh";
  next.days = raw.days && typeof raw.days === "object" ? raw.days : {};
  Object.keys(next.days).forEach((dateKey) => {
    next.days[dateKey] = normalizeDay(next.days[dateKey]);
  });
  next.currentTimer = raw.currentTimer || null;
  next.pace = { ...next.pace, ...(raw.pace || {}) };
  return next;
}

function normalizeDay(day) {
  return {
    intention: typeof day?.intention === "string" ? day.intention : "",
    entries: Array.isArray(day?.entries) ? day.entries : [],
    grid: day?.grid && typeof day.grid === "object" ? day.grid : {},
    review: {
      wins: typeof day?.review?.wins === "string" ? day.review.wins : "",
      leaks: typeof day?.review?.leaks === "string" ? day.review.leaks : "",
      tomorrow: typeof day?.review?.tomorrow === "string" ? day.review.tomorrow : "",
      note: typeof day?.review?.note === "string" ? day.review.note : "",
    },
  };
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
    state.days[dateKey] = normalizeDay({});
  } else {
    state.days[dateKey] = normalizeDay(state.days[dateKey]);
  }
  return state.days[dateKey];
}

function bindEvents() {
  els.currentDate.addEventListener("change", () => {
    selectedDate = els.currentDate.value || todayKey();
    render();
  });

  els.languageSelect.addEventListener("change", () => {
    state.settings.language = LANGUAGES.includes(els.languageSelect.value) ? els.languageSelect.value : "zh";
    saveState();
    applyLanguage();
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

  els.saveTimeGrid.addEventListener("click", saveTimeGrid);
  els.clearTimeGrid.addEventListener("click", clearTimeGrid);
  els.fillGridFromEntries.addEventListener("click", fillGridFromExistingEntries);

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

function getLanguage() {
  return LANGUAGES.includes(state?.settings?.language) ? state.settings.language : "zh";
}

function t(key, params = {}) {
  const dictionary = I18N[getLanguage()] || I18N.zh;
  const template = dictionary[key] ?? I18N.zh[key] ?? key;
  return Object.entries(params).reduce((text, [paramKey, value]) => text.replaceAll(`{${paramKey}}`, String(value)), template);
}

function applyLanguage() {
  const language = getLanguage();
  document.documentElement.lang = language === "zh" ? "zh-Hant" : "en";
  document.title = t("appTitle");
  els.languageSelect.value = language;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });

  populateCategorySelects();
  populateValueSelects();
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
  const selects = [els.timerCategory, els.entryCategory, els.gridCategory];
  selects.forEach((select) => {
    const previous = select.value || "other";
    select.innerHTML = CATEGORY_OPTIONS.map((category) => `<option value="${category.id}">${escapeHtml(getCategoryLabel(category.id))}</option>`).join("");
    select.value = CATEGORY_OPTIONS.some((category) => category.id === previous) ? previous : "other";
  });
}

function populateValueSelects() {
  const selects = [els.timerValue, els.entryValue, els.gridValue];
  selects.forEach((select) => {
    const previous = select.value || "investment";
    select.innerHTML = VALUE_OPTIONS.map((value) => `<option value="${value.id}">${escapeHtml(getValueLabel(value.id))}</option>`).join("");
    select.value = VALUE_OPTIONS.some((value) => value.id === previous) ? previous : "investment";
  });
  if (!els.gridValue.value) els.gridValue.value = "maintenance";
}

function setDefaultEntryTimes() {
  const now = new Date();
  const end = toTimeInput(now);
  const startDate = new Date(now.getTime() - TIME_SLOT_MINUTES * 60 * 1000);
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
  const title = cleanText(els.timerTitle.value) || t("unnamedActivity");
  state.currentTimer = {
    id: createId(),
    title,
    category: els.timerCategory.value,
    value: els.timerValue.value,
    startedAt: new Date().toISOString(),
  };
  saveState();
  showToast(t("startedToast", { title }));
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
    note: t("timerNote"),
    source: "timer",
    createdAt: new Date().toISOString(),
  };
  getDay(dateKey).entries.push(entry);
  state.currentTimer = null;
  saveState();

  if (dateKey !== selectedDate) {
    selectedDate = dateKey;
    els.currentDate.value = selectedDate;
  }

  showToast(t("savedToast", { title: entry.title, duration: formatMinutes(minutes) }));
  render();
}

function addManualEntry(event) {
  event.preventDefault();
  const title = cleanText(els.entryTitle.value);
  if (!title) {
    showToast(t("titleRequiredToast"));
    return;
  }

  const minutes = minutesBetween(els.entryStart.value, els.entryEnd.value);
  if (!Number.isFinite(minutes) || minutes <= 0) {
    showToast(t("invalidTimeToast"));
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
    source: "manual",
    createdAt: new Date().toISOString(),
  };

  getDay().entries.push(entry);
  saveState();
  els.entryTitle.value = "";
  els.entryNote.value = "";
  setDefaultEntryTimes();
  showToast(t("addedToast", { title: entry.title }));
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
  day.entries.sort(compareEntriesByTime);
  saveState();
  renderEntries();
  renderCategoryBars();
  showToast(t("sortedToast"));
}

function clearSelectedDay() {
  const day = getDay();
  const hasGrid = Object.keys(day.grid || {}).length > 0;
  if (!day.entries.length && !day.intention && !hasGrid && !Object.values(day.review).some(Boolean)) {
    showToast(t("clearNothingToast"));
    return;
  }
  const confirmed = window.confirm(t("clearDayConfirm", { date: selectedDate }));
  if (!confirmed) return;
  delete state.days[selectedDate];
  saveState();
  render();
  showToast(t("clearDayToast"));
}

function deleteEntry(entryId) {
  const day = getDay();
  const entry = day.entries.find((item) => item.id === entryId);
  day.entries = day.entries.filter((item) => item.id !== entryId);
  saveState();
  render();
  showToast(entry ? t("deletedToast", { title: entry.title }) : t("deletedFallbackToast"));
}

function duplicateEntry(entryId) {
  const day = getDay();
  const entry = day.entries.find((item) => item.id === entryId);
  if (!entry) return;
  day.entries.push({ ...entry, id: createId(), source: entry.source || "manual", createdAt: new Date().toISOString(), note: entry.note || t("duplicateNote") });
  saveState();
  render();
  showToast(t("duplicatedToast", { title: entry.title }));
}

function togglePace() {
  if (state.pace.active) {
    state.pace = { active: false, mode: "focus", nextAt: null };
    showToast(t("paceOffToast"));
  } else {
    state.pace = {
      active: true,
      mode: "focus",
      nextAt: addMinutes(new Date(), state.settings.focusMinutes).toISOString(),
    };
    showToast(t("paceOnToast"));
  }
  saveState();
  renderPace();
}

async function requestNotifications() {
  if (!("Notification" in window)) {
    showToast(t("notificationUnsupported"));
    return;
  }
  const permission = await Notification.requestPermission();
  showToast(permission === "granted" ? t("notificationGranted") : t("notificationDenied"));
}

function maybeFirePaceReminder() {
  if (!state.pace.active || !state.pace.nextAt) return;
  const nextAt = new Date(state.pace.nextAt);
  if (Number.isNaN(nextAt.getTime()) || Date.now() < nextAt.getTime()) return;

  if (state.pace.mode === "focus") {
    showBreakDialog();
    state.pace.mode = "break";
    state.pace.nextAt = addMinutes(new Date(), state.settings.breakMinutes).toISOString();
    notify(t("breakNotifyTitle"), t("breakNotifyBody", { focus: state.settings.focusMinutes, rest: state.settings.breakMinutes }));
  } else {
    state.pace.mode = "focus";
    state.pace.nextAt = addMinutes(new Date(), state.settings.focusMinutes).toISOString();
    notify(t("returnNotifyTitle"), t("returnNotifyBody"));
    showToast(t("returnToast"));
  }

  saveState();
  renderPace();
}

function showBreakDialog() {
  els.breakDialogText.textContent = t("breakDialogText", { focus: state.settings.focusMinutes, rest: state.settings.breakMinutes });
  if (typeof els.breakDialog.showModal === "function" && !els.breakDialog.open) {
    els.breakDialog.showModal();
  } else {
    showToast(t("breakFallbackToast"));
  }
}

function startBreakFromDialog() {
  if (els.breakDialog.open) els.breakDialog.close();
  state.pace.active = true;
  state.pace.mode = "break";
  state.pace.nextAt = addMinutes(new Date(), state.settings.breakMinutes).toISOString();
  saveState();
  renderPace();
  showToast(t("startBreakToast", { rest: state.settings.breakMinutes }));
}

function skipBreak() {
  if (els.breakDialog.open) els.breakDialog.close();
  state.pace.active = true;
  state.pace.mode = "focus";
  state.pace.nextAt = addMinutes(new Date(), state.settings.focusMinutes).toISOString();
  saveState();
  renderPace();
  showToast(t("skipBreakToast"));
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
  renderTimeGrid();
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
  els.metricCoverage.textContent = tracked ? t("coverageText", { coverage }) : t("coverageEmpty");
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
    els.timerStatus.textContent = t("timerStatusIdle");
    els.startTimer.disabled = false;
    els.stopTimer.disabled = true;
    return;
  }
  const started = new Date(state.currentTimer.startedAt);
  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - started.getTime()) / 1000));
  els.timerDisplay.textContent = formatSeconds(elapsedSeconds);
  els.timerStatus.textContent = t("timerStatusRunning", { title: state.currentTimer.title });
  els.startTimer.disabled = true;
  els.stopTimer.disabled = false;
}

function renderPace() {
  els.focusMinutes.value = state.settings.focusMinutes;
  els.breakMinutes.value = state.settings.breakMinutes;

  if (!state.pace.active) {
    els.paceStatus.textContent = t("paceOff");
    els.nextBreakText.textContent = t("notStarted");
    els.togglePace.textContent = t("togglePaceOn");
    return;
  }

  const nextAt = new Date(state.pace.nextAt);
  els.paceStatus.textContent = state.pace.mode === "focus" ? t("paceFocus") : t("paceBreak");
  els.togglePace.textContent = t("togglePaceOff");

  if (Number.isNaN(nextAt.getTime())) {
    els.nextBreakText.textContent = t("paceTimeError");
    return;
  }

  const seconds = Math.max(0, Math.ceil((nextAt.getTime() - Date.now()) / 1000));
  const action = state.pace.mode === "focus" ? t("remindBreak") : t("remindReturn");
  els.nextBreakText.textContent = `${action}：${t("after", { time: formatSecondsShort(seconds) })}`;
}

function renderTimeGrid() {
  const day = getDay();
  const grid = day.grid || {};
  const html = createTimeSlots().map((slot) => {
    const end = slotIndexToTime(slot.index + 1);
    const value = grid[slot.time] || "";
    return `
      <label class="grid-cell" title="${escapeHtml(slot.time)} – ${escapeHtml(end)}">
        <span>${escapeHtml(slot.time)}</span>
        <input type="text" data-grid-slot="${escapeHtml(slot.time)}" value="${escapeHtml(value)}" placeholder="${escapeHtml(t("gridCellPlaceholder"))}" aria-label="${escapeHtml(t("gridAriaLabel", { time: slot.time, end }))}" autocomplete="off" />
      </label>
    `;
  }).join("");
  els.timeGrid.innerHTML = html;
}

function readGridInputs() {
  const grid = {};
  els.timeGrid.querySelectorAll("input[data-grid-slot]").forEach((input) => {
    const title = cleanText(input.value);
    if (title) grid[input.dataset.gridSlot] = title;
  });
  return grid;
}

function saveTimeGrid() {
  const day = getDay();
  const grid = readGridInputs();
  day.grid = grid;
  day.entries = day.entries.filter((entry) => entry.source !== "time-grid");

  const gridEntries = buildEntriesFromGrid(grid, els.gridCategory.value, els.gridValue.value);
  day.entries.push(...gridEntries);
  day.entries.sort(compareEntriesByTime);
  saveState();
  render();

  const filledCells = Object.keys(grid).length;
  if (!filledCells) {
    showToast(t("gridEmptyToast"));
    return;
  }
  showToast(t("gridSavedToast", { count: filledCells, entries: gridEntries.length }));
}

function clearTimeGrid() {
  const confirmed = window.confirm(t("gridClearConfirm"));
  if (!confirmed) return;
  const day = getDay();
  day.grid = {};
  day.entries = day.entries.filter((entry) => entry.source !== "time-grid");
  saveState();
  render();
  showToast(t("gridClearedToast"));
}

function fillGridFromExistingEntries() {
  const day = getDay();
  const entries = day.entries.filter((entry) => entry.source !== "time-grid");
  if (!entries.length) {
    showToast(t("gridNoEntriesToast"));
    return;
  }

  const grid = { ...(day.grid || {}) };
  let filled = 0;
  entries.forEach((entry) => {
    const startIndex = clamp(Math.floor(timeToMinutes(entry.start) / TIME_SLOT_MINUTES), 0, 47);
    const endIndex = clamp(Math.ceil(timeToMinutes(entry.end) / TIME_SLOT_MINUTES), startIndex + 1, 48);
    for (let index = startIndex; index < endIndex; index += 1) {
      const slot = slotIndexToTime(index);
      if (!grid[slot]) {
        grid[slot] = entry.title;
        filled += 1;
      }
    }
  });

  day.grid = grid;
  saveState();
  renderTimeGrid();
  showToast(t("gridFilledToast", { count: filled }));
}

function buildEntriesFromGrid(grid, category, value) {
  const slots = createTimeSlots();
  const entries = [];
  let current = null;

  slots.forEach((slot) => {
    const title = cleanText(grid[slot.time]);
    if (!title) {
      flushCurrent();
      return;
    }

    if (current && current.title === title) {
      current.endIndex = slot.index + 1;
      return;
    }

    flushCurrent();
    current = {
      title,
      startIndex: slot.index,
      endIndex: slot.index + 1,
    };
  });
  flushCurrent();

  return entries;

  function flushCurrent() {
    if (!current) return;
    const minutes = (current.endIndex - current.startIndex) * TIME_SLOT_MINUTES;
    entries.push({
      id: createId(),
      title: current.title,
      category,
      value,
      start: slotIndexToTime(current.startIndex),
      end: slotIndexToTime(current.endIndex),
      minutes,
      note: t("gridEntryNote"),
      source: "time-grid",
      createdAt: new Date().toISOString(),
    });
    current = null;
  }
}

function renderEntries() {
  const entries = [...getDay().entries].sort(compareEntriesByTime);
  if (!entries.length) {
    els.entryList.className = "entry-list empty-state";
    els.entryList.textContent = t("noEntriesToday");
    return;
  }

  els.entryList.className = "entry-list";
  els.entryList.innerHTML = entries
    .map((entry) => {
      const categoryLabel = getCategoryLabel(entry.category);
      const valueLabel = getValueLabel(entry.value) || t("uncategorized");
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
              <span class="tag">${escapeHtml(categoryLabel)}</span>
              <span class="tag">${escapeHtml(valueLabel)}</span>
            </div>
            ${note}
          </div>
          <div class="entry-actions">
            <button class="icon-button secondary-button" type="button" title="${escapeHtml(t("copyTitle"))}" data-action="duplicate" data-id="${entry.id}">⧉</button>
            <button class="icon-button danger-button" type="button" title="${escapeHtml(t("deleteTitle"))}" data-action="delete" data-id="${entry.id}">×</button>
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
    els.categoryBars.textContent = t("noRecords");
    return;
  }

  const byCategory = entries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + entry.minutes;
    return acc;
  }, {});

  const rows = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([categoryId, minutes]) => {
      const width = Math.max(4, Math.round((minutes / total) * 100));
      return `
        <div class="bar-row">
          <div class="bar-label">
            <span>${escapeHtml(getCategoryLabel(categoryId))}</span>
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
    els.weekSummary.textContent = t("weekNoData");
    return;
  }

  els.weekSummary.textContent = t("weekSummary", {
    tracked: formatMinutes(tracked),
    investment: formatMinutes(investment),
    leak: formatMinutes(leak),
  });
}

function exportJson() {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: "Life Ledger",
    ...state,
  };
  downloadFile(`life-ledger-${todayKey()}.json`, JSON.stringify(payload, null, 2), "application/json");
  showToast(t("exportedJsonToast"));
}

function exportCsv() {
  const header = ["date", "start", "end", "minutes", "category", "value", "title", "note", "source"];
  const rows = Object.entries(state.days).flatMap(([date, day]) =>
    (day.entries || []).map((entry) => [
      date,
      entry.start,
      entry.end,
      entry.minutes,
      getCategoryLabel(entry.category),
      getValueLabel(entry.value),
      entry.title,
      entry.note || "",
      entry.source || "manual",
    ])
  );

  const csv = [header, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n");

  downloadFile(`life-ledger-${todayKey()}.csv`, csv, "text/csv;charset=utf-8");
  showToast(t("exportedCsvToast"));
}

function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(String(reader.result || "{}"));
      const importedState = normalizeState(imported.days ? imported : imported.state);
      const confirmed = window.confirm(t("importConfirm"));
      if (!confirmed) return;
      state = importedState;
      saveState();
      selectedDate = todayKey();
      els.currentDate.value = selectedDate;
      applyLanguage();
      render();
      showToast(t("importedToast"));
    } catch (error) {
      console.error(error);
      showToast(t("importFailedToast"));
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

function createTimeSlots() {
  return Array.from({ length: 48 }, (_, index) => ({
    index,
    time: slotIndexToTime(index),
  }));
}

function slotIndexToTime(index) {
  const totalMinutes = index * TIME_SLOT_MINUTES;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function cleanText(text) {
  return String(text || "").trim();
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
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
  return (Number.isFinite(hours) ? hours : 0) * 60 + (Number.isFinite(minutes) ? minutes : 0);
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
  if (getLanguage() === "zh") return `${hours}小時 ${minutes}分`;
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

function compareEntriesByTime(a, b) {
  return timeToMinutes(a.start) - timeToMinutes(b.start) || timeToMinutes(a.end) - timeToMinutes(b.end);
}

function getCategoryLabel(categoryId) {
  const category = CATEGORY_OPTIONS.find((item) => item.id === categoryId) || CATEGORY_OPTIONS[CATEGORY_OPTIONS.length - 1];
  return category[getLanguage()] || category.zh;
}

function getValueLabel(valueId) {
  const value = VALUE_OPTIONS.find((item) => item.id === valueId);
  if (!value) return "";
  return value[getLanguage()] || value.zh;
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
