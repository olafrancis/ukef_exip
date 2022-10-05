var DTFS;
!(function () {
  var e = document.querySelector('.js-hide'),
    t = document.querySelector('.govuk-cookie-banner'),
    o = document.querySelector('.js-cookies-button-accept'),
    n = document.querySelector('.js-cookies-button-reject'),
    i = function () {
      const e = new Date();
      return e.setDate(e.getDate() + 1), e.toGMTString(), e;
    };
  o &&
    o.addEventListener('click', function (e) {
      document.cookie = 'optionalCookies=true; SameSite=Lax; expires=' + i();
    }),
    n &&
      n.addEventListener('click', function (e) {
        document.cookie = 'optionalCookies=false; SameSite=Lax; expires=' + i();
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
    ((DTFS = void 0 === DTFS ? {} : DTFS).cookiesBanner = {});
})();
//# sourceMappingURL=cookiesBanner.js.map
