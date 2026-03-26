// ==================== SHARED: MOBILE MENU ====================
document.addEventListener('DOMContentLoaded', function() {

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('open');
    });
  }

  // ==================== SHARED: SCROLL ANIMATIONS ====================
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ==================== EXPLORE PAGE: FILTER & SEARCH ====================
  const filterTags = document.querySelectorAll('.filter-tag');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterTags.length > 0) {
    filterTags.forEach(function(tag) {
      tag.addEventListener('click', function() {
        filterTags.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');

        var filter = this.dataset.filter;
        projectCards.forEach(function(card) {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // --- Search ---
  var searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var query = this.value.toLowerCase().trim();
      projectCards.forEach(function(card) {
        var title = card.querySelector('h3');
        if (!title) return;
        if (query === '' || title.textContent.toLowerCase().includes(query)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  }

  // --- Load More (simulate) ---
  var loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      this.textContent = 'Đã tải hết dự án';
      this.disabled = true;
      this.style.opacity = '0.5';
      this.style.cursor = 'default';
    });
  }

  // ==================== CHECKOUT PAGE ====================

  // --- Payment method toggle ---
  var paymentMethods = document.querySelectorAll('.payment-method');
  var cardForm = document.getElementById('cardForm');

  if (paymentMethods.length > 0) {
    paymentMethods.forEach(function(method) {
      method.addEventListener('click', function() {
        paymentMethods.forEach(function(m) { m.classList.remove('active'); });
        this.classList.add('active');

        var radio = this.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        if (cardForm) {
          cardForm.style.display = radio && radio.value === 'card' ? 'block' : 'none';
        }
      });
    });
  }

  // --- Card number formatting ---
  var cardNumber = document.getElementById('cardNumber');
  if (cardNumber) {
    cardNumber.addEventListener('input', function() {
      var val = this.value.replace(/\D/g, '');
      val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
      this.value = val.substring(0, 19);
    });
  }

  // --- Expiry formatting ---
  var expiry = document.getElementById('expiry');
  if (expiry) {
    expiry.addEventListener('input', function() {
      var val = this.value.replace(/\D/g, '');
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      this.value = val.substring(0, 5);
    });
  }

  // --- CVC: numbers only ---
  var cvc = document.getElementById('cvc');
  if (cvc) {
    cvc.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').substring(0, 3);
    });
  }

  // --- Promo code ---
  var applyPromo = document.getElementById('applyPromo');
  if (applyPromo) {
    applyPromo.addEventListener('click', function() {
      var code = document.getElementById('promoCode');
      if (code && code.value.trim().length > 0) {
        this.textContent = 'Đã áp dụng';
        this.style.background = '#D1FAE5';
        this.style.borderColor = '#065F46';
        this.style.color = '#065F46';
      }
    });
  }

  // --- Pay button ---
  var payBtn = document.getElementById('payBtn');
  if (payBtn) {
    payBtn.addEventListener('click', function() {
      var fullName = document.getElementById('fullName');
      var email = document.getElementById('email');

      if (fullName && !fullName.value.trim()) {
        fullName.style.borderColor = 'var(--danger)';
        fullName.focus();
        return;
      }

      if (email && !email.value.trim()) {
        email.style.borderColor = 'var(--danger)';
        email.focus();
        return;
      }

      // Simulate processing
      this.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;">Đang xử lý...</span>';
      this.disabled = true;
      this.style.opacity = '0.7';

      var btn = this;
      setTimeout(function() {
        btn.innerHTML = 'Thanh toán thành công!';
        btn.style.background = '#10B981';
        btn.style.opacity = '1';
      }, 2000);
    });
  }

  // --- Reset input border on focus ---
  document.querySelectorAll('input').forEach(function(input) {
    input.addEventListener('focus', function() {
      this.style.borderColor = 'var(--primary)';
    });
    input.addEventListener('blur', function() {
      this.style.borderColor = '';
    });
  });

  // ==================== PRODUCT PAGE: THUMBNAILS ====================
  var thumbs = document.querySelectorAll('.thumb');
  var mainImg = document.getElementById('mainProductImg');

  if (thumbs.length > 0 && mainImg) {
    thumbs.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        thumbs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        var imgUrl = this.dataset.img;
        if (imgUrl) {
          mainImg.src = imgUrl;
        }
      });
    });
  }

  // ==================== HOMEPAGE: FILTER BUTTONS ====================
  var filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  }

  // ==================== MY PROJECTS: TAB TOGGLE ====================
  var tabs = document.querySelectorAll('.tab');
  if (tabs.length > 0) {
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  }

  // ==================== CONTACT FORM ====================
  var contactBtn = document.querySelector('.contact-form .btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      this.textContent = 'Đã gửi thành công!';
      this.style.background = '#10B981';
    });
  }
});
