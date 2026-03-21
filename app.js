// ==================== EXPLORE PAGE: FILTER & SEARCH ====================
document.addEventListener('DOMContentLoaded', function() {

  // --- Category Filter ---
  const filterTags = document.querySelectorAll('.filter-tag');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterTags.length > 0) {
    filterTags.forEach(tag => {
      tag.addEventListener('click', function() {
        filterTags.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;
        projectCards.forEach(card => {
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
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      projectCards.forEach(card => {
        const title = card.querySelector('h3');
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
  const loadMoreBtn = document.getElementById('loadMoreBtn');
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
  const paymentMethods = document.querySelectorAll('.payment-method');
  const cardForm = document.getElementById('cardForm');

  if (paymentMethods.length > 0) {
    paymentMethods.forEach(method => {
      method.addEventListener('click', function() {
        paymentMethods.forEach(m => m.classList.remove('active'));
        this.classList.add('active');

        const radio = this.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        if (cardForm) {
          cardForm.style.display = radio && radio.value === 'card' ? 'block' : 'none';
        }
      });
    });
  }

  // --- Card number formatting ---
  const cardNumber = document.getElementById('cardNumber');
  if (cardNumber) {
    cardNumber.addEventListener('input', function() {
      let val = this.value.replace(/\D/g, '');
      val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
      this.value = val.substring(0, 19);
    });
  }

  // --- Expiry formatting ---
  const expiry = document.getElementById('expiry');
  if (expiry) {
    expiry.addEventListener('input', function() {
      let val = this.value.replace(/\D/g, '');
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      this.value = val.substring(0, 5);
    });
  }

  // --- CVC: numbers only ---
  const cvc = document.getElementById('cvc');
  if (cvc) {
    cvc.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').substring(0, 3);
    });
  }

  // --- Promo code ---
  const applyPromo = document.getElementById('applyPromo');
  if (applyPromo) {
    applyPromo.addEventListener('click', function() {
      const code = document.getElementById('promoCode');
      if (code && code.value.trim().length > 0) {
        this.textContent = 'Đã áp dụng';
        this.style.background = '#D1FAE5';
        this.style.borderColor = '#065F46';
        this.style.color = '#065F46';
      }
    });
  }

  // --- Pay button ---
  const payBtn = document.getElementById('payBtn');
  if (payBtn) {
    payBtn.addEventListener('click', function() {
      const fullName = document.getElementById('fullName');
      const email = document.getElementById('email');

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

      setTimeout(() => {
        this.innerHTML = 'Thanh toán thành công!';
        this.style.background = '#10B981';
        this.style.opacity = '1';
      }, 2000);
    });
  }

  // --- Reset input border on focus ---
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
      this.style.borderColor = 'var(--primary)';
    });
    input.addEventListener('blur', function() {
      this.style.borderColor = '';
    });
  });

  // ==================== PRODUCT PAGE: THUMBNAILS ====================
  const thumbs = document.querySelectorAll('.thumb');
  const mainImg = document.querySelector('.product-img-placeholder');

  if (thumbs.length > 0 && mainImg) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        mainImg.style.background = this.style.background;
      });
    });
  }

  // ==================== HOMEPAGE: FILTER BUTTONS ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
});
