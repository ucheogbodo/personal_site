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

  // --- INTERACTIVE TOUCHES ---

  // 1. Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Custom Cursor
  const cursor = document.getElementById('custom-cursor');
  if (cursor && matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const hoverTargets = document.querySelectorAll('a, button, .project-card, .writing-item, .lab-card');
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      target.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }
}());
