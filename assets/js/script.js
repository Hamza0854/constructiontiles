/* =========================================================
   STRATA CERAMICHE — Interactions
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* -------- Sticky nav shadow on scroll -------- */
    const nav = document.querySelector('.navbar-strata');
    if (nav) {
        const onScroll = () => {
            if (window.scrollY > 8) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* -------- Scroll reveal -------- */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }

    /* -------- Collections page: filter chips -------- */
    const chips = document.querySelectorAll('.filter-chip');
    const products = document.querySelectorAll('[data-cat]');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const cat = chip.dataset.filter;
            products.forEach(p => {
                if (cat === 'all' || p.dataset.cat === cat) {
                    p.style.display = '';
                } else {
                    p.style.display = 'none';
                }
            });
        });
    });

    /* -------- Register form: simple front-end handling -------- */
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const success = document.getElementById('formSuccess');
            // simple required-field check
            let valid = true;
            form.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderBottomColor = '#B5562C';
                    valid = false;
                } else {
                    field.style.borderBottomColor = '';
                }
            });
            if (!valid) return;

            if (success) {
                success.classList.add('show');
                success.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            form.reset();
        });
    }

    /* -------- Update year in footer -------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
