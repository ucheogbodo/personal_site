/**
 * main.js — Project filter logic
 * Toggles .hidden on project cards by data-type attribute.
 */

(function () {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards  = document.querySelectorAll('.project-card');

  function setFilter(filterValue) {
    // Update cards
    projectCards.forEach(function (card) {
      if (filterValue === 'all' || card.dataset.type === filterValue) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // Update button active states
    filterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });

    const activeBtn = document.querySelector(`[data-filter="${filterValue}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }
  }

  // Bind click handlers
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setFilter(btn.dataset.filter);
    });
  });

  // Default state: "all" active
  setFilter('all');
}());
