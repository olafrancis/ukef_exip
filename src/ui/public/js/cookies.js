var EXIP;!function(){const e=document.querySelector(".js-hide"),t=document.querySelector(".govuk-cookie-banner"),o=document.querySelector(".js-cookies-button-accept"),n=document.querySelector(".js-cookies-button-reject"),c=document.querySelector(".change-cookies-submit-button"),i="https:"==window.location.protocol?"__Secure-optionalCookies":"optionalCookies",u=e=>{document.cookie=i+"="+e+"; path=/; SameSite=Strict; secure; "+(()=>{const e=new Date,t=e.setDate(e.getDate()+1);return"expires="+new Date(t).toUTCString()+"; "})()+"domain="+window.location.hostname};document.cookie.includes(i)||(t.removeAttribute("hidden"),t.setAttribute("tabindex","-1"),t.focus(),t.addEventListener("blur",(()=>{t.removeAttribute("tabindex")}))),n&&n.addEventListener("click",(function(e){u(!1)})),o&&o.addEventListener("click",(function(e){u(!0)})),e&&e.addEventListener("click",(function(e){t.setAttribute("hidden","hidden"),e.preventDefault()})),c&&c.addEventListener("click",(function(e){if(document.querySelector('input[name="optionalCookies"]:checked')){const e=document.querySelector('input[name="optionalCookies"]:checked').value;"reject"===e&&u(!1),"accept"===e&&u(!0)}})),(EXIP=void 0===EXIP?{}:EXIP).cookies={}}();
//# sourceMappingURL=cookies.js.map