const BTN_ATTR = "data-steam-cal-tabs-open";
const DEBUG = false;
const DEBUG_ID = "steam-cal-open-tabs-debug";

/** Matches e.g. "April 13", "APRIL 20", "Jan 3" */
const MONTH_DAY_RE =
  /^(january|february|march|april|may|june|july|august|september|october|november|december|jan\.?|feb\.?|mar\.?|apr\.?|jun\.?|jul\.?|aug\.?|sep\.?|sept\.?|oct\.?|nov\.?|dec\.?)\s+(\d{1,2})$/i;

function normalizeWs(s) {
  return s.trim().replace(/\s+/g, " ");
}

function isMonthDayText(s) {
  return MONTH_DAY_RE.test(normalizeWs(s));
}

function findDayColumns() {
  const out = [];
  const seen = new Set();

  for (const el of document.querySelectorAll(".Panel")) {
    const dateEl = el.firstElementChild;
    if (!dateEl?.classList?.contains("Panel")) continue;
    if (!isMonthDayText(dateEl.textContent)) continue;

    const row = el.parentElement;
    if (!row?.classList?.contains("Panel")) continue;

    const siblingPanels = [...row.children].filter((child) =>
      child.classList?.contains("Panel"),
    );

    if (siblingPanels.length !== 5) continue;
    if (!el.querySelector('a[href*="/app/"]')) continue;
    if (seen.has(el)) continue;

    seen.add(el);
    out.push(el);
  }

  return out;
}

function collectUniqueAppUrls(rootEl) {
  const seen = new Set();
  const urls = [];
  rootEl.querySelectorAll('a[href*="/app/"]').forEach((a) => {
    try {
      const u = new URL(a.href);
      const m = u.pathname.match(/\/app\/(\d+)/);
      if (!m) return;
      const id = m[1];
      if (seen.has(id)) return;
      seen.add(id);
      urls.push(u.origin + u.pathname);
    } catch {
      /* ignore */
    }
  });
  return urls;
}

function renderDebug({ columnsFound, buttonsPresent, buttonsInjected }) {
  if (!DEBUG) return;
  let el = document.getElementById(DEBUG_ID);
  if (!el) {
    el = document.createElement("div");
    el.id = DEBUG_ID;
    el.style.position = "fixed";
    el.style.right = "12px";
    el.style.bottom = "12px";
    el.style.zIndex = "2147483647";
    el.style.padding = "8px 10px";
    el.style.borderRadius = "6px";
    el.style.background = "rgba(0,0,0,0.75)";
    el.style.border = "1px solid rgba(255,255,255,0.18)";
    el.style.color = "#fff";
    el.style.font = "12px/1.3 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
    el.style.whiteSpace = "pre";
    el.style.pointerEvents = "none";
    document.documentElement.appendChild(el);
  }

  el.textContent =
    "Steam calendar debug\n" +
    `columnsFound: ${columnsFound}\n` +
    `buttonsPresent: ${buttonsPresent}\n` +
    `buttonsInjected: ${buttonsInjected}`;
}

function injectButtons() {
  const columns = findDayColumns();
  const buttonsPresent = document.querySelectorAll(`[${BTN_ATTR}]`).length;
  let buttonsInjected = 0;
  if (!columns.length) {
    renderDebug({ columnsFound: 0, buttonsPresent, buttonsInjected: 0 });
    if (DEBUG) console.log("[steam-cal-open-tabs] columnsFound=0");
    return;
  }

  for (const column of columns) {
    if (column.querySelector(`[${BTN_ATTR}]`)) continue;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute(BTN_ATTR, "1");
    btn.className = "steam-cal-tabs-open";
    btn.textContent = "Open all in tabs";

    btn.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const urls = collectUniqueAppUrls(column);
      for (const url of urls) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });

    const dateEl = column.firstElementChild;
    if (dateEl) {
      dateEl.after(btn);
    } else {
      column.prepend(btn);
    }
    buttonsInjected += 1;
  }

  renderDebug({
    columnsFound: columns.length,
    buttonsPresent,
    buttonsInjected,
  });
  if (DEBUG) {
    console.log("[steam-cal-open-tabs]", {
      columnsFound: columns.length,
      buttonsPresent,
      buttonsInjected,
    });
  }
}

let debounceTimer = 0;
function scheduleInject() {
  clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => injectButtons(), 120);
}

injectButtons();

const mo = new MutationObserver(scheduleInject);
mo.observe(document.body, { childList: true, subtree: true });
