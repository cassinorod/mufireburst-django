document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('[data-home-tab]');
  const panels = document.querySelectorAll('[data-home-panel]');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = tab.getAttribute('data-home-tab');

      tabs.forEach(function (item) {
        item.classList.remove('is-active');
      });

      panels.forEach(function (panel) {
        panel.classList.remove('is-active');
      });

      tab.classList.add('is-active');
      const activePanel = document.querySelector('[data-home-panel="' + target + '"]');
      if (activePanel) {
        activePanel.classList.add('is-active');
      }
    });
  });
});
