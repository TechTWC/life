(() => {
  if (typeof CATEGORY_OPTIONS === "undefined") return;

  const additions = [
    { after: "health", category: { id: "sleep", zh: "睡覺", en: "Sleep" } },
    { after: "life-admin", category: { id: "commute", zh: "通勤", en: "Commute" } },
  ];

  additions.forEach(({ after, category }) => {
    if (CATEGORY_OPTIONS.some((item) => item.id === category.id)) return;
    const index = CATEGORY_OPTIONS.findIndex((item) => item.id === after);
    if (index >= 0) {
      CATEGORY_OPTIONS.splice(index + 1, 0, category);
    } else {
      CATEGORY_OPTIONS.push(category);
    }
  });

  if (typeof applyLanguage === "function") applyLanguage();
  if (typeof render === "function") render();
})();
