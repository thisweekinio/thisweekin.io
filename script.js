// Set current year
    document.getElementById('yearSpan').textContent = new Date().getFullYear();

    const searchInput = document.getElementById('searchInput');
    const chips = document.querySelectorAll('.twi-chip');
    const cards = document.querySelectorAll('.newsletter-card');
    const noResults = document.getElementById('noResults');

    let activeCategory = 'all';

    function filterCards() {
      const query = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      cards.forEach(card => {
        const title = (card.getAttribute('data-title') || '').toLowerCase();
        const categories = (card.getAttribute('data-categories') || '').toLowerCase();
        const matchesCategory = activeCategory === 'all' || categories.split(' ').includes(activeCategory);
        const matchesSearch = query === '' || title.includes(query);

        if (matchesCategory && matchesSearch) {
          card.classList.remove('d-none');
          visibleCount++;
        } else {
          card.classList.add('d-none');
        }
      });

      if (visibleCount === 0) {
        noResults.classList.remove('d-none');
      } else {
        noResults.classList.add('d-none');
      }
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCategory = chip.getAttribute('data-category');
        filterCards();
      });
    });

    searchInput.addEventListener('input', filterCards);