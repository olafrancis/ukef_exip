var EXIP;
!(function () {
  const t = document.getElementById('form'),
    e = document.getElementById('submit-button');
  t &&
    t.addEventListener('submit', () => {
      e.setAttribute('disabled', 'true'), e.setAttribute('aria-disabled', 'true'), e.classList.add('govuk-button--disabled');
    }),
    ((EXIP = void 0 === EXIP ? {} : EXIP).formSubmission = {});
})();
//# sourceMappingURL=formSubmission.js.map
