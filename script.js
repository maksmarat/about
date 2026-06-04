const tabTriggers = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");
const tabButtons = document.querySelectorAll(".nav-tab");
const brandLink = document.querySelector("[data-tab-link]");

function activateTab(tabName, updateHash = true) {
  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === tabName;
    panel.classList.toggle("hidden", !isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });

  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (updateHash) {
    history.replaceState(null, "", `#${tabName}`);
  }
}

tabTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    activateTab(trigger.dataset.tab);
  });
});

brandLink.addEventListener("click", (event) => {
  event.preventDefault();
  activateTab("home");
});

const initialTab = window.location.hash.replace("#", "");
const existingPanel = Array.from(panels).some((panel) => panel.dataset.panel === initialTab);

activateTab(existingPanel ? initialTab : "home", Boolean(existingPanel));
