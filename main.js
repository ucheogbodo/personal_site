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

  // --- MUTABLE TIMELINE & LAYOUT SORTING ---
  const sortBtn = document.getElementById('btn-sort');
  const layoutBtn = document.getElementById('btn-layout');
  const projectsGrid = document.getElementById('projects-grid');

  if (sortBtn && layoutBtn && projectsGrid) {
    let currentSort = 'desc'; // 'desc' (newest first) or 'asc' (oldest first)
    let currentLayout = 'grid'; // 'grid' or 'timeline'

    function sortProjects() {
      // Get all cards (except the ghost card)
      const cards = Array.from(projectsGrid.querySelectorAll('.project-card:not(.project-card--ghost)'));
      const ghostCard = projectsGrid.querySelector('.project-card--ghost');

      cards.sort((a, b) => {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);
        return currentSort === 'desc' ? dateB - dateA : dateA - dateB;
      });

      // Re-append elements in new order
      cards.forEach(card => projectsGrid.appendChild(card));
      if (ghostCard) {
        projectsGrid.appendChild(ghostCard); // Keep ghost card at the very end
      }
    }

    // Sort toggle event
    sortBtn.addEventListener('click', () => {
      currentSort = currentSort === 'desc' ? 'asc' : 'desc';
      sortBtn.textContent = `sort: ${currentSort === 'desc' ? 'newest' : 'oldest'}`;
      sortProjects();
    });

    // Layout toggle event
    layoutBtn.addEventListener('click', () => {
      currentLayout = currentLayout === 'grid' ? 'timeline' : 'grid';
      layoutBtn.textContent = `view: ${currentLayout}`;
      
      if (currentLayout === 'timeline') {
        projectsGrid.classList.add('timeline-active');
        layoutBtn.classList.add('active');
      } else {
        projectsGrid.classList.remove('timeline-active');
        layoutBtn.classList.remove('active');
      }
    });

    // Run initial sort (newest first)
    sortProjects();
  }

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
    document.body.classList.add('custom-cursor-active');
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
