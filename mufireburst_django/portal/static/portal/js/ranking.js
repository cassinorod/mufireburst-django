const rankingButtons = document.querySelectorAll("[data-ranking-tab]");
const rankingPanels = document.querySelectorAll("[data-ranking-panel]");

rankingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.rankingTab;

    rankingButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    rankingPanels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.rankingPanel === selected));
  });
});
