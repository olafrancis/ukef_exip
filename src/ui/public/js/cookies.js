var EXIP;
!(function () {
  var e = document.querySelector('.js-hide'),
    t = document.querySelector('.govuk-cookie-banner'),
    o = document.querySelector('.js-cookies-button-accept'),
    n = document.querySelector('.js-cookies-button-reject'),
    c = document.querySelector('.change-cookies-submit-button'),
    i = 'https:' == window.location.protocol ? '__Secure-optionalCookies' : 'optionalCookies',
    u = function () {
      const e = new Date();
      return e.setDate(e.getDate() + 1), e.toUTCString(), 'expires=' + e + '; ';
    };
  const r = function () {
    return 'domain=' + window.location.hostname;
  };
  var d = function () {
      document.cookie = i + '=false; path=/; SameSite=Strict; secure; ' + u() + r();
    },
    a = function () {
      document.cookie = i + '=true; path=/; SameSite=Strict; secure; ' + u() + r();
    };
  n &&
    n.addEventListener('click', function (e) {
      d();
    }),
    o &&
      o.addEventListener('click', function (e) {
        a();
      }),
    document.cookie.includes(i) ||
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
          'reject' === e && d(), 'accept' === e && a();
        }
      }),
    ((EXIP = void 0 === EXIP ? {} : EXIP).cookies = {});
})();
//# sourceMappingURL=cookies.js.map
