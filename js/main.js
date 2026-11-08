/**
 * Serengeti Wildebeest Camps - Main Interactive Components
 * Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initReviewsCarousel();
  initGalleryLightbox();
  initReservationForm();
});

/**
 * 1. Hero Background Slider (Home Page)
 */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');
  if (!slides.length) return;

  let currentIndex = 0;
  let timer = null;

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    if (indicators[currentIndex]) {
      indicators[currentIndex].classList.remove('active');
    }

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    if (indicators[currentIndex]) {
      indicators[currentIndex].classList.add('active');
    }
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
  }

  indicators.forEach((indicator, idx) => {
    indicator.addEventListener('click', () => {
      goToSlide(idx);
      startTimer();
    });
  });

  startTimer();
}

/**
 * 2. Tripadvisor Reviews Carousel (Home Page)
 */
function initReviewsCarousel() {
  const container = document.getElementById('reviews-container');
  const prevBtn = document.getElementById('review-prev-btn');
  const nextBtn = document.getElementById('review-next-btn');
  const dotsContainer = document.getElementById('review-dots');
  if (!container) return;

  const reviews = [
    {
      name: 'Brenda D',
      from: 'South Africa',
      title: 'We had an Incredible stay',
      text: 'Its a nice serene and tranquil place in Serengeti where we stayed with animals roaming about and birds chattering close to our room in the wild.',
      avatar: 'assets/guest-brenda-d-1.webp'
    },
    {
      name: 'Sarah Z',
      from: '@sarahz83150',
      title: 'Great location',
      text: 'We spend only 1 night in this lodge : the room is half tent/half stone, very spacious and comfortable with a balcony and an amazing view facing the bush. We spotted some buffalos in the morning.',
      avatar: 'assets/guest-sarah-z-2.webp'
    },
    {
      name: 'Sarah Z',
      from: 'Paris, France',
      title: 'Amazing stay !!',
      text: 'I was here two nights in January 2021, when I was on Safari in Serengeti National Park. It was a magical experience. The view, the lodge, the bath and shower, the staff, the food...',
      avatar: 'assets/guest-sarah-z-3.webp'
    },
    {
      name: 'Boris Mikhailov',
      from: 'St. Petersburg, Russia',
      title: 'Amazing week at a special place',
      text: 'Serengeti Safari Lodge is an amazing place, no effort has been spared to make the hotel an oasis in the middle of the jungle. The rooms have unhindered 360 view of Serengeti.',
      avatar: 'assets/guest-boris-mikhailov-4.webp'
    },
    {
      name: 'Caroline',
      from: 'Brisbane, Australia',
      title: 'Lovely! Worth Every Penny',
      text: 'We stayed at this unique lodge as part of our Tanzania safari for 2 nights and our stay was very pleasant. The tents and mess are set harmoniously as one with nature with no obstacles.',
      avatar: 'assets/guest-caroline-5.webp'
    }
  ];

  let currentIndex = 0;
  let timer = null;

  function renderReviews() {
    const isMobile = window.innerWidth < 768;
    const pair = isMobile
      ? [reviews[currentIndex]]
      : [reviews[currentIndex], reviews[(currentIndex + 1) % reviews.length]];

    container.innerHTML = pair
      .map(
        (r) => `
        <article class="review-card">
          <div class="review-author">
            <img src="${r.avatar}" alt="${r.name}" class="review-avatar">
            <div style="flex: 1;">
              <p class="font-semibold">${r.name}</p>
              <p style="font-size: 0.75rem; color: var(--muted-foreground);">${r.from}</p>
            </div>
            <img data-logo src="assets/tripadvisor-owl.webp" alt="Tripadvisor" style="height: 1.5rem; width: 1.5rem; object-fit: contain;">
          </div>
          <div class="bubbles-container" style="margin-top: 1rem;">
            <span class="bubble filled"></span>
            <span class="bubble filled"></span>
            <span class="bubble filled"></span>
            <span class="bubble filled"></span>
            <span class="bubble filled"></span>
          </div>
          <h3 style="margin-top: 0.75rem; font-family: var(--font-sans); font-size: 1rem; font-weight: 700;">${r.title}</h3>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; line-height: 1.6; color: var(--muted-foreground);">“${r.text}”</p>
          <p style="margin-top: 1rem; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted-foreground);">Reviewed on Tripadvisor</p>
        </article>
      `
      )
      .join('');

    renderDots();
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = reviews
      .map(
        (_, idx) => `
        <button class="review-dot ${idx === currentIndex ? 'active' : ''}" aria-label="Review ${idx + 1}" data-index="${idx}"></button>
      `
      )
      .join('');

    dotsContainer.querySelectorAll('.review-dot').forEach((dot) => {
      dot.addEventListener('click', (e) => {
        currentIndex = parseInt(e.target.dataset.index, 10);
        renderReviews();
        resetTimer();
      });
    });
  }

  function nextReview() {
    currentIndex = (currentIndex + 1) % reviews.length;
    renderReviews();
  }

  function prevReview() {
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    renderReviews();
  }

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextReview, 6500);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextReview(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevReview(); resetTimer(); });

  window.addEventListener('resize', renderReviews);

  renderReviews();
  resetTimer();
}

/**
 * 3. Photo Gallery Lightbox (Gallery Page)
 */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!galleryItems.length || !modal || !modalImg) return;

  const images = Array.from(galleryItems).map((item) => {
    const img = item.querySelector('img');
    return img ? img.getAttribute('src') : '';
  });

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    modalImg.src = images[currentIndex];
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex];
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === closeBtn) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/**
 * 4. Contact & Availability Reservation Form (Contact Page)
 */
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value || '';
    const email = form.querySelector('[name="email"]')?.value || '';
    const checkIn = form.querySelector('[name="checkin"]')?.value || '';
    const checkOut = form.querySelector('[name="checkout"]')?.value || '';
    const guests = form.querySelector('[name="guests"]')?.value || '2';
    const msg = form.querySelector('[name="message"]')?.value || '';

    const text = `Hi Tanzania Wild Camps! Booking request for Serengeti Wildebeest Camps%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0ACheck in: ${encodeURIComponent(checkIn)}%0ACheck out: ${encodeURIComponent(checkOut)}%0AGuests: ${encodeURIComponent(guests)}%0A${encodeURIComponent(msg)}`;

    window.open(`https://wa.me/255655451003?text=${text}`, '_blank');
  });
}
