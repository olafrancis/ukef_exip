var DTFS;
!(function () {
  var e = document.querySelector('.js-hide'),
    t = document.querySelector('.govuk-cookie-banner'),
    o = document.querySelector('.js-cookies-button-accept'),
    n = document.querySelector('.js-cookies-button-reject'),
    c = document.querySelector('.change-cookies-submit-button'),
    i = function () {
      const e = new Date();
      return e.setDate(e.getDate() + 1), e.toUTCString(), 'expires=' + e + '; ';
    };
  const u = function () {
    return 'domain=' + window.location.hostname;
  };
  var r = function () {
      document.cookie = 'optionalCookies=false; path=/; SameSite=Strict; secure; ' + i() + u();
    },
    d = function () {
      document.cookie = 'optionalCookies=true; path=/; SameSite=Strict; secure; ' + i() + u();
    };
  n &&
    n.addEventListener('click', function (e) {
      r();
    }),
    o &&
      o.addEventListener('click', function (e) {
        d();
      }),
    document.cookie.includes('optionalCookies') ||
      (t.removeAttribute('hidden'),
      t.setAttribute('tabindex', '-1'),
      t.focus(),
      t.addEventListener('blur', function () {
        t.removeAttribute('tabindex');
      })),
    e &&
      e.addEventListener('click', function (e) {
        t.setAttribute('hidden', 'hidden'), e.preventDefault();
      }),
    c &&
      c.addEventListener('click', function (e) {
        if (document.querySelector('input[name="optionalCookies"]:checked')) {
          const e = document.querySelector('input[name="optionalCookies"]:checked').value;
          'reject' === e && r(), 'accept' === e && d();
        }
      }),
    ((DTFS = void 0 === DTFS ? {} : DTFS).cookies = {});
})();
//# sourceMappingURL=cookies.js.map
