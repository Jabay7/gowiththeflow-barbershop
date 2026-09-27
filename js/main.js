/* Go With The Flow Barbershop — site behaviour.
   Deliberately tiny: no libraries, no analytics, no cookies, no network calls.
   Everything here works without JavaScript too; this only adds polish. */

(function () {
  'use strict';

  /* ---------------- Mobile nav ---------------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------- Open now / today ----------------
     Hours are read from the table in index.html, so editing the table is the
     only change needed when hours change. Times are evaluated in the shop's
     time zone (Pacific) no matter where the visitor is. */
  var HOURS = {
    0: [6 * 60, 23 * 60 + 45], // Sunday    6:00 am – 11:45 pm
    1: [5 * 60, 23 * 60],      // Monday    5:00 am – 11:00 pm
    2: [5 * 60, 23 * 60],
    3: [5 * 60, 23 * 60],
    4: [5 * 60, 23 * 60],
    5: [5 * 60, 22 * 60],      // Friday    5:00 am – 10:00 pm
    6: [6 * 60, 22 * 60]       // Saturday  6:00 am – 10:00 pm
  };

  function pacificNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var hour = parseInt(map.hour, 10) % 24;
      return { day: days[map.weekday], mins: hour * 60 + parseInt(map.minute, 10) };
    } catch (err) {
      return null;
    }
  }

  function fmt(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    var suffix = h >= 12 ? 'pm' : 'am';
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + (m ? ':' + (m < 10 ? '0' + m : m) : '') + ' ' + suffix;
  }

  var now = pacificNow();
  if (now) {
    var row = document.querySelector('[data-hours] tr[data-day="' + now.day + '"]');
    if (row) { row.classList.add('is-today'); }

    var span = HOURS[now.day];
    var isOpen = span && now.mins >= span[0] && now.mins < span[1];
    var line = document.querySelector('[data-open-status-line]');
    var trust = document.querySelector('[data-open-status]');

    if (line) {
      line.classList.add(isOpen ? 'is-open' : 'is-closed');
      line.textContent = isOpen
        ? 'Open now · closes ' + fmt(span[1])
        : (span && now.mins < span[0] ? 'Closed · opens ' + fmt(span[0]) : 'Closed for tonight');
    }
    if (trust && isOpen) { trust.textContent = 'Open now · until ' + fmt(span[1]); }
  }

  /* ---------------- Footer year ---------------- */
  var year = document.querySelector('[data-year]');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
