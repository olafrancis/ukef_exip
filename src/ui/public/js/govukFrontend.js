var DTFS;
!(function () {
  'use strict';
  var t = {
      d: function (e, n) {
        for (var o in n) t.o(n, o) && !t.o(e, o) && Object.defineProperty(e, o, { enumerable: !0, get: n[o] });
      },
      o: function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      },
      r: function (t) {
        'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      },
    },
    e = {};
  function n(t, e) {
    if (window.NodeList.prototype.forEach) return t.forEach(e);
    for (var n = 0; n < t.length; n++) e.call(window, t[n], n, t);
  }
  function o(t) {
    (this.$module = t),
      (this.moduleId = t.getAttribute('id')),
      (this.$sections = t.querySelectorAll('.govuk-accordion__section')),
      (this.$showAllButton = ''),
      (this.browserSupportsSessionStorage = i.checkForSessionStorage()),
      (this.controlsClass = 'govuk-accordion__controls'),
      (this.showAllClass = 'govuk-accordion__show-all'),
      (this.showAllTextClass = 'govuk-accordion__show-all-text'),
      (this.sectionExpandedClass = 'govuk-accordion__section--expanded'),
      (this.sectionButtonClass = 'govuk-accordion__section-button'),
      (this.sectionHeaderClass = 'govuk-accordion__section-header'),
      (this.sectionHeadingClass = 'govuk-accordion__section-heading'),
      (this.sectionHeadingTextClass = 'govuk-accordion__section-heading-text'),
      (this.sectionHeadingTextFocusClass = 'govuk-accordion__section-heading-text-focus'),
      (this.sectionShowHideToggleClass = 'govuk-accordion__section-toggle'),
      (this.sectionShowHideToggleFocusClass = 'govuk-accordion__section-toggle-focus'),
      (this.sectionShowHideTextClass = 'govuk-accordion__section-toggle-text'),
      (this.upChevronIconClass = 'govuk-accordion-nav__chevron'),
      (this.downChevronIconClass = 'govuk-accordion-nav__chevron--down'),
      (this.sectionSummaryClass = 'govuk-accordion__section-summary'),
      (this.sectionSummaryFocusClass = 'govuk-accordion__section-summary-focus');
  }
  t.r(e),
    t.d(e, {
      default: function () {
        return S;
      },
    }),
    function (t) {
      var e, n, o, i;
      ('defineProperty' in Object &&
        (function () {
          try {
            return Object.defineProperty({}, 'test', { value: 42 }), !0;
          } catch (t) {
            return !1;
          }
        })()) ||
        ((e = Object.defineProperty),
        (n = Object.prototype.hasOwnProperty('__defineGetter__')),
        (o = 'Getters & setters cannot be defined on this javascript engine'),
        (i = 'A property cannot both have accessors and be writable or have a value'),
        (Object.defineProperty = function (t, s, r) {
          if (e && (t === window || t === document || t === Element.prototype || t instanceof Element)) return e(t, s, r);
          if (null === t || !(t instanceof Object || 'object' == typeof t)) throw new TypeError('Object.defineProperty called on non-object');
          if (!(r instanceof Object)) throw new TypeError('Property description must be an object');
          var a = String(s),
            l = 'value' in r || 'writable' in r,
            c = 'get' in r && typeof r.get,
            u = 'set' in r && typeof r.set;
          if (c) {
            if ('function' !== c) throw new TypeError('Getter must be a function');
            if (!n) throw new TypeError(o);
            if (l) throw new TypeError(i);
            Object.__defineGetter__.call(t, a, r.get);
          } else t[a] = r.value;
          if (u) {
            if ('function' !== u) throw new TypeError('Setter must be a function');
            if (!n) throw new TypeError(o);
            if (l) throw new TypeError(i);
            Object.__defineSetter__.call(t, a, r.set);
          }
          return 'value' in r && (t[a] = r.value), t;
        }));
    }.call(('object' == typeof window && window) || ('object' == typeof self && self) || ('object' == typeof global && global) || {}),
    function (t) {
      'bind' in Function.prototype ||
        Object.defineProperty(Function.prototype, 'bind', {
          value: function (t) {
            var e,
              n = Array,
              o = Object,
              i = o.prototype,
              s = n.prototype,
              r = function () {},
              a = i.toString,
              l = 'function' == typeof Symbol && 'symbol' == typeof Symbol.toStringTag,
              c = Function.prototype.toString,
              u = function (t) {
                try {
                  return c.call(t), !0;
                } catch (t) {
                  return !1;
                }
              },
              d = '[object Function]',
              h = '[object GeneratorFunction]';
            e = function (t) {
              if ('function' != typeof t) return !1;
              if (l) return u(t);
              var e = a.call(t);
              return e === d || e === h;
            };
            var p = s.slice,
              f = s.concat,
              m = s.push,
              v = Math.max,
              b = this;
            if (!e(b)) throw new TypeError('Function.prototype.bind called on incompatible ' + b);
            for (
              var g,
                y = p.call(arguments, 1),
                w = function () {
                  if (this instanceof g) {
                    var e = b.apply(this, f.call(y, p.call(arguments)));
                    return o(e) === e ? e : this;
                  }
                  return b.apply(t, f.call(y, p.call(arguments)));
                },
                E = v(0, b.length - y.length),
                k = [],
                C = 0;
              C < E;
              C++
            )
              m.call(k, '$' + C);
            return (
              (g = Function('binder', 'return function (' + k.join(',') + '){ return binder.apply(this, arguments); }')(w)),
              b.prototype && ((r.prototype = b.prototype), (g.prototype = new r()), (r.prototype = null)),
              g
            );
          },
        });
    }.call(('object' == typeof window && window) || ('object' == typeof self && self) || ('object' == typeof global && global) || {}),
    function (t) {
      var e;
      ('DOMTokenList' in this && (!('classList' in (e = document.createElement('x'))) || (!e.classList.toggle('x', !1) && !e.className))) ||
        (function (e) {
          var n;
          ('DOMTokenList' in e &&
            e.DOMTokenList &&
            (!document.createElementNS ||
              !document.createElementNS('http://www.w3.org/2000/svg', 'svg') ||
              document.createElementNS('http://www.w3.org/2000/svg', 'svg').classList instanceof DOMTokenList)) ||
            (e.DOMTokenList = (function () {
              var e = !0,
                n = function (t, n, o, i) {
                  Object.defineProperty ? Object.defineProperty(t, n, { configurable: !1 === e || !!i, get: o }) : t.__defineGetter__(n, o);
                };
              try {
                n({}, 'support');
              } catch (t) {
                e = !1;
              }
              return function (e, o) {
                var i = this,
                  s = [],
                  r = {},
                  a = 0,
                  l = 0,
                  c = function (t) {
                    n(
                      i,
                      t,
                      function () {
                        return d(), s[t];
                      },
                      !1,
                    );
                  },
                  u = function () {
                    if (a >= l) for (; l < a; ++l) c(l);
                  },
                  d = function () {
                    var t,
                      n,
                      i = arguments,
                      l = /\s+/;
                    if (i.length)
                      for (n = 0; n < i.length; ++n)
                        if (l.test(i[n]))
                          throw (
                            (((t = new SyntaxError('String "' + i[n] + '" contains an invalid character')).code = 5), (t.name = 'InvalidCharacterError'), t)
                          );
                    for (
                      '' ===
                        (s =
                          'object' == typeof e[o]
                            ? ('' + e[o].baseVal).replace(/^\s+|\s+$/g, '').split(l)
                            : ('' + e[o]).replace(/^\s+|\s+$/g, '').split(l))[0] && (s = []),
                        r = {},
                        n = 0;
                      n < s.length;
                      ++n
                    )
                      r[s[n]] = !0;
                    (a = s.length), u();
                  };
                return (
                  d(),
                  n(i, 'length', function () {
                    return d(), a;
                  }),
                  (i.toLocaleString = i.toString =
                    function () {
                      return d(), s.join(' ');
                    }),
                  (i.item = function (t) {
                    return d(), s[t];
                  }),
                  (i.contains = function (t) {
                    return d(), !!r[t];
                  }),
                  (i.add = function () {
                    d.apply(i, (t = arguments));
                    for (var t, n, l = 0, c = t.length; l < c; ++l) (n = t[l]), r[n] || (s.push(n), (r[n] = !0));
                    a !== s.length && ((a = s.length >>> 0), 'object' == typeof e[o] ? (e[o].baseVal = s.join(' ')) : (e[o] = s.join(' ')), u());
                  }),
                  (i.remove = function () {
                    d.apply(i, (t = arguments));
                    for (var t, n = {}, l = 0, c = []; l < t.length; ++l) (n[t[l]] = !0), delete r[t[l]];
                    for (l = 0; l < s.length; ++l) n[s[l]] || c.push(s[l]);
                    (s = c), (a = c.length >>> 0), 'object' == typeof e[o] ? (e[o].baseVal = s.join(' ')) : (e[o] = s.join(' ')), u();
                  }),
                  (i.toggle = function (e, n) {
                    return d.apply(i, [e]), t !== n ? (n ? (i.add(e), !0) : (i.remove(e), !1)) : r[e] ? (i.remove(e), !1) : (i.add(e), !0);
                  }),
                  i
                );
              };
            })()),
            'classList' in (n = document.createElement('span')) &&
              (n.classList.toggle('x', !1),
              n.classList.contains('x') &&
                (n.classList.constructor.prototype.toggle = function (e) {
                  var n = arguments[1];
                  if (n === t) {
                    var o = !this.contains(e);
                    return this[o ? 'add' : 'remove'](e), o;
                  }
                  return this[(n = !!n) ? 'add' : 'remove'](e), n;
                })),
            (function () {
              var t = document.createElement('span');
              if ('classList' in t && (t.classList.add('a', 'b'), !t.classList.contains('b'))) {
                var e = t.classList.constructor.prototype.add;
                t.classList.constructor.prototype.add = function () {
                  for (var t = arguments, n = arguments.length, o = 0; o < n; o++) e.call(this, t[o]);
                };
              }
            })(),
            (function () {
              var t = document.createElement('span');
              if ('classList' in t && (t.classList.add('a'), t.classList.add('b'), t.classList.remove('a', 'b'), t.classList.contains('b'))) {
                var e = t.classList.constructor.prototype.remove;
                t.classList.constructor.prototype.remove = function () {
                  for (var t = arguments, n = arguments.length, o = 0; o < n; o++) e.call(this, t[o]);
                };
              }
            })();
        })(this);
    }.call(('object' == typeof window && window) || ('object' == typeof self && self) || ('object' == typeof global && global) || {}),
    function (t) {
      'Document' in this ||
        ('undefined' == typeof WorkerGlobalScope &&
          'function' != typeof importScripts &&
          (this.HTMLDocument
            ? (this.Document = this.HTMLDocument)
            : ((this.Document = this.HTMLDocument = document.constructor = new Function('return function Document() {}')()),
              (this.Document.prototype = document))));
    }.call(('object' == typeof window && window) || ('object' == typeof self && self) || ('object' == typeof global && global) || {}),
    function (t) {
      ('Element' in this && 'HTMLElement' in this) ||
        (function () {
          if (!window.Element || window.HTMLElement) {
            window.Element = window.HTMLElement = new Function('return function Element() {}')();
            var t,
              e = document.appendChild(document.createElement('body')),
              n = e.appendChild(document.createElement('iframe')).contentWindow.document,
              o = (Element.prototype = n.appendChild(n.createElement('*'))),
              i = {},
              s = function (t, e) {
                var n,
                  o,
                  r,
                  a = t.childNodes || [],
                  l = -1;
                if (1 === t.nodeType && t.constructor !== Element) for (n in ((t.constructor = Element), i)) (o = i[n]), (t[n] = o);
                for (; (r = e && a[++l]); ) s(r, e);
                return t;
              },
              r = document.getElementsByTagName('*'),
              a = document.createElement,
              l = 100;
            o.attachEvent('onpropertychange', function (t) {
              for (var e, n = t.propertyName, s = !i.hasOwnProperty(n), a = o[n], l = i[n], c = -1; (e = r[++c]); )
                1 === e.nodeType && (s || e[n] === l) && (e[n] = a);
              i[n] = a;
            }),
              (o.constructor = Element),
              o.hasAttribute ||
                (o.hasAttribute = function (t) {
                  return null !== this.getAttribute(t);
                }),
              c() || ((document.onreadystatechange = c), (t = setInterval(c, 25))),
              (document.createElement = function (t) {
                var e = a(String(t).toLowerCase());
                return s(e);
              }),
              document.removeChild(e);
          } else window.HTMLElement = window.Element;
          function c() {
            return (
              l-- || clearTimeout(t),
              !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) &&
                (s(document, !0), t && document.body.prototype && clearTimeout(t), !!document.body.prototype)
            );
          }
        })();
    }.call(('object' == typeof window && window) || ('object' == typeof self && self) || ('object' == typeof global && global) || {}),
    function (t) {
      var e;
      ('document' in this &&
        'classList' in document.documentElement &&
        'Element' in this &&
        'classList' in Element.prototype &&
        ((e = document.createElement('span')).classList.add('a', 'b'), e.classList.contains('b'))) ||
        (function (t) {
          var e = !0,
            n = function (t, n, o, i) {
              Object.defineProperty ? Object.defineProperty(t, n, { configurable: !1 === e || !!i, get: o }) : t.__defineGetter__(n, o);
            };
          try {
            n({}, 'support');
          } catch (t) {
            e = !1;
          }
          var o = function (t, i, s) {
            n(
              t.prototype,
              i,
              function () {
                var t,
                  r = this,
                  a = '__defineGetter__DEFINE_PROPERTY' + i;
                if (r[a]) return t;
                if (((r[a] = !0), !1 === e)) {
                  for (var l, c = o.mirror || document.createElement('div'), u = c.childNodes, d = u.length, h = 0; h < d; ++h)
                    if (u[h]._R === r) {
                      l = u[h];
                      break;
                    }
                  l || (l = c.appendChild(document.createElement('div'))), (t = DOMTokenList.call(l, r, s));
                } else t = new DOMTokenList(r, s);
                return (
                  n(r, i, function () {
                    return t;
                  }),
                  delete r[a],
                  t
                );
              },
              !0,
            );
          };
          o(t.Element, 'classList', 'className'),
            o(t.HTMLElement, 'classList', 'className'),
            o(t.HTMLLinkElement, 'relList', 'rel'),
            o(t.HTMLAnchorElement, 'relList', 'rel'),
            o(t.HTMLAreaElement, 'relList', 'rel');
        })(this);
    }.call(('object' == typeof window && window) || ('object' == typeof self && self) || ('object' == typeof global && global) || {}),
    (o.prototype.init = function () {
      if (this.$module) {
        this.initControls(), this.initSectionHeaders();
        var t = this.checkIfAllSectionsOpen();
        this.updateShowAllButton(t);
      }
    }),
    (o.prototype.initControls = function () {
      (this.$showAllButton = document.createElement('button')),
        this.$showAllButton.setAttribute('type', 'button'),
        this.$showAllButton.setAttribute('class', this.showAllClass),
        this.$showAllButton.setAttribute('aria-expanded', 'false');
      var t = document.createElement('span');
      t.classList.add(this.upChevronIconClass), this.$showAllButton.appendChild(t);
      var e = document.createElement('div');
      e.setAttribute('class', this.controlsClass), e.appendChild(this.$showAllButton), this.$module.insertBefore(e, this.$module.firstChild);
      var n = document.createElement('span');
      n.classList.add(this.showAllTextClass),
        this.$showAllButton.appendChild(n),
        this.$showAllButton.addEventListener('click', this.onShowOrHideAllToggle.bind(this));
    }),
    (o.prototype.initSectionHeaders = function () {
      n(
        this.$sections,
        function (t, e) {
          var n = t.querySelector('.' + this.sectionHeaderClass);
          this.constructHeaderMarkup(n, e),
            this.setExpanded(this.isExpanded(t), t),
            n.addEventListener('click', this.onSectionToggle.bind(this, t)),
            this.setInitialState(t);
        }.bind(this),
      );
    }),
    (o.prototype.constructHeaderMarkup = function (t, e) {
      var n = t.querySelector('.' + this.sectionButtonClass),
        o = t.querySelector('.' + this.sectionHeadingClass),
        i = t.querySelector('.' + this.sectionSummaryClass),
        s = document.createElement('button');
      s.setAttribute('type', 'button'), s.setAttribute('aria-controls', this.moduleId + '-content-' + (e + 1));
      for (var r = 0; r < n.attributes.length; r++) {
        var a = n.attributes.item(r);
        'id' !== a.nodeName && s.setAttribute(a.nodeName, a.nodeValue);
      }
      var l = document.createElement('span');
      l.classList.add(this.sectionHeadingTextClass), (l.id = n.id);
      var c = document.createElement('span');
      c.classList.add(this.sectionHeadingTextFocusClass), l.appendChild(c), (c.innerHTML = n.innerHTML);
      var u = document.createElement('span');
      u.classList.add(this.sectionShowHideToggleClass), u.setAttribute('data-nosnippet', '');
      var d = document.createElement('span');
      d.classList.add(this.sectionShowHideToggleFocusClass), u.appendChild(d);
      var h = document.createElement('span'),
        p = document.createElement('span');
      if (
        (p.classList.add(this.upChevronIconClass),
        d.appendChild(p),
        h.classList.add(this.sectionShowHideTextClass),
        d.appendChild(h),
        s.appendChild(l),
        s.appendChild(this.getButtonPunctuationEl()),
        null != i)
      ) {
        var f = document.createElement('span'),
          m = document.createElement('span');
        m.classList.add(this.sectionSummaryFocusClass), f.appendChild(m);
        for (var v = 0, b = i.attributes.length; v < b; ++v) {
          var g = i.attributes.item(v).nodeName,
            y = i.attributes.item(v).nodeValue;
          f.setAttribute(g, y);
        }
        (m.innerHTML = i.innerHTML), i.parentNode.replaceChild(f, i), s.appendChild(f), s.appendChild(this.getButtonPunctuationEl());
      }
      s.appendChild(u), o.removeChild(n), o.appendChild(s);
    }),
    (o.prototype.onSectionToggle = function (t) {
      var e = this.isExpanded(t);
      this.setExpanded(!e, t), this.storeState(t);
    }),
    (o.prototype.onShowOrHideAllToggle = function () {
      var t = this,
        e = this.$sections,
        o = !this.checkIfAllSectionsOpen();
      n(e, function (e) {
        t.setExpanded(o, e), t.storeState(e);
      }),
        t.updateShowAllButton(o);
    }),
    (o.prototype.setExpanded = function (t, e) {
      var n = e.querySelector('.' + this.upChevronIconClass),
        o = e.querySelector('.' + this.sectionShowHideTextClass),
        i = e.querySelector('.' + this.sectionButtonClass),
        s = t ? 'Hide' : 'Show',
        r = document.createElement('span');
      r.classList.add('govuk-visually-hidden'),
        (r.innerHTML = ' this section'),
        (o.innerHTML = s),
        o.appendChild(r),
        i.setAttribute('aria-expanded', t),
        t
          ? (e.classList.add(this.sectionExpandedClass), n.classList.remove(this.downChevronIconClass))
          : (e.classList.remove(this.sectionExpandedClass), n.classList.add(this.downChevronIconClass));
      var a = this.checkIfAllSectionsOpen();
      this.updateShowAllButton(a);
    }),
    (o.prototype.isExpanded = function (t) {
      return t.classList.contains(this.sectionExpandedClass);
    }),
    (o.prototype.checkIfAllSectionsOpen = function () {
      return this.$sections.length === this.$module.querySelectorAll('.' + this.sectionExpandedClass).length;
    }),
    (o.prototype.updateShowAllButton = function (t) {
      var e = this.$showAllButton.querySelector('.' + this.upChevronIconClass),
        n = this.$showAllButton.querySelector('.' + this.showAllTextClass),
        o = t ? 'Hide all sections' : 'Show all sections';
      this.$showAllButton.setAttribute('aria-expanded', t),
        (n.innerHTML = o),
        t ? e.classList.remove(this.downChevronIconClass) : e.classList.add(this.downChevronIconClass);
    });
  var i = {
    checkForSessionStorage: function () {
      var t,
        e = 'this is the test string';
      try {
        return window.sessionStorage.setItem(e, e), (t = window.sessionStorage.getItem(e) === e.toString()), window.sessionStorage.removeItem(e), t;
      } catch (t) {
        ('undefined' != typeof console && void 0 !== console.log) || console.log('Notice: sessionStorage not available.');
      }
    },
  };
  (o.prototype.storeState = function (t) {
    if (this.browserSupportsSessionStorage) {
      var e = t.querySelector('.' + this.sectionButtonClass);
      if (e) {
        var n = e.getAttribute('aria-controls'),
          o = e.getAttribute('aria-expanded');
        void 0 !== n ||
          ('undefined' != typeof console && void 0 !== console.log) ||
          console.error(new Error('No aria controls present in accordion section heading.')),
          void 0 !== o ||
            ('undefined' != typeof console && void 0 !== console.log) ||
            console.error(new Error('No aria expanded present in accordion section heading.')),
          n && o && window.sessionStorage.setItem(n, o);
      }
    }
  }),
    (o.prototype.setInitialState = function (t) {
      if (this.browserSupportsSessionStorage) {
        var e = t.querySelector('.' + this.sectionButtonClass);
        if (e) {
          var n = e.getAttribute('aria-controls'),
            o = n ? window.sessionStorage.getItem(n) : null;
          null !== o && this.setExpanded('true' === o, t);
        }
      }
    }),
    (o.prototype.getButtonPunctuationEl = function () {
      var t = document.createElement('span');
      return t.classList.add('govuk-visually-hidden', 'govuk-accordion__section-heading-divider'), (t.innerHTML = ', '), t;
    });
  var s = o;
  (function (t) {
    'Window' in this ||
      ('undefined' == typeof WorkerGlobalScope &&
        'function' != typeof importScripts &&
        (function (t) {
          t.constructor ? (t.Window = t.constructor) : ((t.Window = t.constructor = new Function('return function Window() {}')()).prototype = this);
        })(this));
  }.call(('object' == typeof window && window) || ('object' == typeof self && self) || ('object' == typeof global && global) || {}),
    function (t) {
      (function (t) {
        if (!('Event' in t)) return !1;
        if ('function' == typeof t.Event) return !0;
        try {
          return new Event('click'), !0;
        } catch (t) {
          return !1;
        }
      })(this) ||
        (function () {
          var e = {
            click: 1,
            dblclick: 1,
            keyup: 1,
            keypress: 1,
            keydown: 1,
            mousedown: 1,
            mouseup: 1,
            mousemove: 1,
            mouseover: 1,
            mouseenter: 1,
            mouseleave: 1,
            mouseout: 1,
            storage: 1,
            storagecommit: 1,
            textinput: 1,
          };
          if ('undefined' != typeof document && 'undefined' != typeof window) {
            var n = (window.Event && window.Event.prototype) || null;
            (window.Event = Window.prototype.Event =
              function (e, n) {
                if (!e) throw new Error('Not enough arguments');
                var o;
                if ('createEvent' in document) {
                  o = document.createEvent('Event');
                  var i = !(!n || n.bubbles === t) && n.bubbles,
                    s = !(!n || n.cancelable === t) && n.cancelable;
                  return o.initEvent(e, i, s), o;
                }
                return (
                  ((o = document.createEventObject()).type = e),
                  (o.bubbles = !(!n || n.bubbles === t) && n.bubbles),
                  (o.cancelable = !(!n || n.cancelable === t) && n.cancelable),
                  o
                );
              }),
              n && Object.defineProperty(window.Event, 'prototype', { configurable: !1, enumerable: !1, writable: !0, value: n }),
              'createEvent' in document ||
                ((window.addEventListener =
                  Window.prototype.addEventListener =
                  Document.prototype.addEventListener =
                  Element.prototype.addEventListener =
                    function () {
                      var t = this,
                        n = arguments[0],
                        i = arguments[1];
                      if (t === window && n in e)
                        throw new Error(
                          'In IE8 the event: ' +
                            n +
                            ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.',
                        );
                      t._events || (t._events = {}),
                        t._events[n] ||
                          ((t._events[n] = function (e) {
                            var n,
                              i = t._events[e.type].list,
                              s = i.slice(),
                              r = -1,
                              a = s.length;
                            for (
                              e.preventDefault = function () {
                                !1 !== e.cancelable && (e.returnValue = !1);
                              },
                                e.stopPropagation = function () {
                                  e.cancelBubble = !0;
                                },
                                e.stopImmediatePropagation = function () {
                                  (e.cancelBubble = !0), (e.cancelImmediate = !0);
                                },
                                e.currentTarget = t,
                                e.relatedTarget = e.fromElement || null,
                                e.target = e.target || e.srcElement || t,
                                e.timeStamp = new Date().getTime(),
                                e.clientX &&
                                  ((e.pageX = e.clientX + document.documentElement.scrollLeft), (e.pageY = e.clientY + document.documentElement.scrollTop));
                              ++r < a && !e.cancelImmediate;

                            )
                              r in s && -1 !== o(i, (n = s[r])) && 'function' == typeof n && n.call(t, e);
                          }),
                          (t._events[n].list = []),
                          t.attachEvent && t.attachEvent('on' + n, t._events[n])),
                        t._events[n].list.push(i);
                    }),
                (window.removeEventListener =
                  Window.prototype.removeEventListener =
                  Document.prototype.removeEventListener =
                  Element.prototype.removeEventListener =
                    function () {
                      var t,
                        e = this,
                        n = arguments[0],
                        i = arguments[1];
                      e._events &&
                        e._events[n] &&
                        e._events[n].list &&
                        -1 !== (t = o(e._events[n].list, i)) &&
                        (e._events[n].list.splice(t, 1),
                        e._events[n].list.length || (e.detachEvent && e.detachEvent('on' + n, e._events[n]), delete e._events[n]));
                    }),
                (window.dispatchEvent =
                  Window.prototype.dispatchEvent =
                  Document.prototype.dispatchEvent =
                  Element.prototype.dispatchEvent =
                    function (t) {
                      if (!arguments.length) throw new Error('Not enough arguments');
                      if (!t || 'string' != typeof t.type) throw new Error('DOM Events Exception 0');
                      var e = this,
                        n = t.type;
                      try {
                        if (!t.bubbles) {
                          t.cancelBubble = !0;
                          var o = function (t) {
                            (t.cancelBubble = !0), (e || window).detachEvent('on' + n, o);
                          };
                          this.attachEvent('on' + n, o);
                        }
                        this.fireEvent('on' + n, t);
                      } catch (o) {
                        t.target = e;
                        do {
                          (t.currentTarget = e),
                            '_events' in e && 'function' == typeof e._events[n] && e._events[n].call(e, t),
                            'function' == typeof e['on' + n] && e['on' + n].call(e, t),
                            (e = 9 === e.nodeType ? e.parentWindow : e.parentNode);
                        } while (e && !t.cancelBubble);
                      }
                      return !0;
                    }),
                document.attachEvent('onreadystatechange', function () {
                  'complete' === document.readyState && document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: !0 }));
                }));
          }
          function o(t, e) {
            for (var n = -1, o = t.length; ++n < o; ) if (n in t && t[n] === e) return n;
            return -1;
          }
        })();
    }.call(('object' == typeof window && window) || ('object' == typeof self && self) || ('object' == typeof global && global) || {}));
  function r(t) {
    (this.$module = t), (this.debounceFormSubmitTimer = null);
  }
  (r.prototype.handleKeyDown = function (t) {
    var e = t.target;
    'button' === e.getAttribute('role') && 32 === t.keyCode && (t.preventDefault(), e.click());
  }),
    (r.prototype.debounce = function (t) {
      if ('true' === t.target.getAttribute('data-prevent-double-click'))
        return this.debounceFormSubmitTimer
          ? (t.preventDefault(), !1)
          : void (this.debounceFormSubmitTimer = setTimeout(
              function () {
                this.debounceFormSubmitTimer = null;
              }.bind(this),
              1e3,
            ));
    }),
    (r.prototype.init = function () {
      this.$module.addEventListener('keydown', this.handleKeyDown), this.$module.addEventListener('click', this.debounce);
    });
  var a = r;
  function l(t) {
    this.$module = t;
  }
  (l.prototype.init = function () {
    this.$module && ('boolean' == typeof this.$module.open || this.polyfillDetails());
  }),
    (l.prototype.polyfillDetails = function () {
      var t,
        e = this.$module,
        n = (this.$summary = e.getElementsByTagName('summary').item(0)),
        o = (this.$content = e.getElementsByTagName('div').item(0));
      n &&
        o &&
        (o.id ||
          (o.id =
            'details-content-' +
            ((t = new Date().getTime()),
            void 0 !== window.performance && 'function' == typeof window.performance.now && (t += window.performance.now()),
            'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (e) {
              var n = (t + 16 * Math.random()) % 16 | 0;
              return (t = Math.floor(t / 16)), ('x' === e ? n : (3 & n) | 8).toString(16);
            }))),
        e.setAttribute('role', 'group'),
        n.setAttribute('role', 'button'),
        n.setAttribute('aria-controls', o.id),
        (n.tabIndex = 0),
        !0 === (null !== e.getAttribute('open'))
          ? (n.setAttribute('aria-expanded', 'true'), o.setAttribute('aria-hidden', 'false'))
          : (n.setAttribute('aria-expanded', 'false'), o.setAttribute('aria-hidden', 'true'), (o.style.display = 'none')),
        this.polyfillHandleInputs(n, this.polyfillSetAttributes.bind(this)));
    }),
    (l.prototype.polyfillSetAttributes = function () {
      var t = this.$module,
        e = this.$summary,
        n = this.$content,
        o = 'true' === e.getAttribute('aria-expanded'),
        i = 'true' === n.getAttribute('aria-hidden');
      return (
        e.setAttribute('aria-expanded', o ? 'false' : 'true'),
        n.setAttribute('aria-hidden', i ? 'false' : 'true'),
        (n.style.display = o ? 'none' : ''),
        null !== t.getAttribute('open') ? t.removeAttribute('open') : t.setAttribute('open', 'open'),
        !0
      );
    }),
    (l.prototype.polyfillHandleInputs = function (t, e) {
      t.addEventListener('keypress', function (t) {
        var n = t.target;
        (13 !== t.keyCode && 32 !== t.keyCode) || ('summary' === n.nodeName.toLowerCase() && (t.preventDefault(), n.click ? n.click() : e(t)));
      }),
        t.addEventListener('keyup', function (t) {
          var e = t.target;
          32 === t.keyCode && 'summary' === e.nodeName.toLowerCase() && t.preventDefault();
        }),
        t.addEventListener('click', e);
    });
  var c = l;
  function u(t) {
    (this.$module = t),
      (this.$textarea = t.querySelector('.govuk-js-character-count')),
      (this.$visibleCountMessage = null),
      (this.$screenReaderCountMessage = null),
      (this.lastInputTimestamp = null);
  }
  (u.prototype.defaults = { characterCountAttribute: 'data-maxlength', wordCountAttribute: 'data-maxwords' }),
    (u.prototype.init = function () {
      if (this.$textarea) {
        var t = this.$module,
          e = this.$textarea,
          n = document.getElementById(e.id + '-info');
        e.insertAdjacentElement('afterend', n);
        var o = document.createElement('div');
        (o.className = 'govuk-character-count__sr-status govuk-visually-hidden'),
          o.setAttribute('aria-live', 'polite'),
          (this.$screenReaderCountMessage = o),
          n.insertAdjacentElement('afterend', o);
        var i = document.createElement('div');
        (i.className = n.className),
          i.classList.add('govuk-character-count__status'),
          i.setAttribute('aria-hidden', 'true'),
          (this.$visibleCountMessage = i),
          n.insertAdjacentElement('afterend', i),
          n.classList.add('govuk-visually-hidden'),
          (this.options = this.getDataset(t));
        var s = this.defaults.characterCountAttribute;
        this.options.maxwords && (s = this.defaults.wordCountAttribute),
          (this.maxLength = t.getAttribute(s)),
          this.maxLength &&
            (e.removeAttribute('maxlength'),
            this.bindChangeEvents(),
            'onpageshow' in window
              ? window.addEventListener('pageshow', this.updateCountMessage.bind(this))
              : window.addEventListener('DOMContentLoaded', this.updateCountMessage.bind(this)),
            this.updateCountMessage());
      }
    }),
    (u.prototype.getDataset = function (t) {
      var e = {},
        n = t.attributes;
      if (n)
        for (var o = 0; o < n.length; o++) {
          var i = n[o],
            s = i.name.match(/^data-(.+)/);
          s && (e[s[1]] = i.value);
        }
      return e;
    }),
    (u.prototype.count = function (t) {
      var e;
      this.options.maxwords ? (e = (t.match(/\S+/g) || []).length) : (e = t.length);
      return e;
    }),
    (u.prototype.bindChangeEvents = function () {
      var t = this.$textarea;
      t.addEventListener('keyup', this.handleKeyUp.bind(this)),
        t.addEventListener('focus', this.handleFocus.bind(this)),
        t.addEventListener('blur', this.handleBlur.bind(this));
    }),
    (u.prototype.checkIfValueChanged = function () {
      this.$textarea.oldValue || (this.$textarea.oldValue = ''),
        this.$textarea.value !== this.$textarea.oldValue && ((this.$textarea.oldValue = this.$textarea.value), this.updateCountMessage());
    }),
    (u.prototype.updateCountMessage = function () {
      this.updateVisibleCountMessage(), this.updateScreenReaderCountMessage();
    }),
    (u.prototype.updateVisibleCountMessage = function () {
      var t = this.$textarea,
        e = this.$visibleCountMessage,
        n = this.maxLength - this.count(t.value);
      this.isOverThreshold() ? e.classList.remove('govuk-character-count__message--disabled') : e.classList.add('govuk-character-count__message--disabled'),
        n < 0
          ? (t.classList.add('govuk-textarea--error'), e.classList.remove('govuk-hint'), e.classList.add('govuk-error-message'))
          : (t.classList.remove('govuk-textarea--error'), e.classList.remove('govuk-error-message'), e.classList.add('govuk-hint')),
        (e.innerHTML = this.formattedUpdateMessage());
    }),
    (u.prototype.updateScreenReaderCountMessage = function () {
      var t = this.$screenReaderCountMessage;
      this.isOverThreshold() ? t.removeAttribute('aria-hidden') : t.setAttribute('aria-hidden', !0), (t.innerHTML = this.formattedUpdateMessage());
    }),
    (u.prototype.formattedUpdateMessage = function () {
      var t,
        e = this.$textarea,
        n = this.options,
        o = this.maxLength - this.count(e.value),
        i = 'character';
      return (
        n.maxwords && (i = 'word'), (i += -1 === o || 1 === o ? '' : 's'), (t = o < 0 ? 'too many' : 'remaining'), 'You have ' + Math.abs(o) + ' ' + i + ' ' + t
      );
    }),
    (u.prototype.isOverThreshold = function () {
      var t = this.$textarea,
        e = this.options,
        n = this.count(t.value);
      return (this.maxLength * (e.threshold ? e.threshold : 0)) / 100 <= n;
    }),
    (u.prototype.handleKeyUp = function () {
      this.updateVisibleCountMessage(), (this.lastInputTimestamp = Date.now());
    }),
    (u.prototype.handleFocus = function () {
      this.valueChecker = setInterval(
        function () {
          (!this.lastInputTimestamp || Date.now() - 500 >= this.lastInputTimestamp) && this.checkIfValueChanged();
        }.bind(this),
        1e3,
      );
    }),
    (u.prototype.handleBlur = function () {
      clearInterval(this.valueChecker);
    });
  var d = u;
  function h(t) {
    (this.$module = t), (this.$inputs = t.querySelectorAll('input[type="checkbox"]'));
  }
  (h.prototype.init = function () {
    var t = this.$module;
    n(this.$inputs, function (t) {
      var e = t.getAttribute('data-aria-controls');
      e && document.getElementById(e) && (t.setAttribute('aria-controls', e), t.removeAttribute('data-aria-controls'));
    }),
      'onpageshow' in window
        ? window.addEventListener('pageshow', this.syncAllConditionalReveals.bind(this))
        : window.addEventListener('DOMContentLoaded', this.syncAllConditionalReveals.bind(this)),
      this.syncAllConditionalReveals(),
      t.addEventListener('click', this.handleClick.bind(this));
  }),
    (h.prototype.syncAllConditionalReveals = function () {
      n(this.$inputs, this.syncConditionalRevealWithInputState.bind(this));
    }),
    (h.prototype.syncConditionalRevealWithInputState = function (t) {
      var e = document.getElementById(t.getAttribute('aria-controls'));
      if (e && e.classList.contains('govuk-checkboxes__conditional')) {
        var n = t.checked;
        t.setAttribute('aria-expanded', n), e.classList.toggle('govuk-checkboxes__conditional--hidden', !n);
      }
    }),
    (h.prototype.unCheckAllInputsExcept = function (t) {
      n(
        document.querySelectorAll('input[type="checkbox"][name="' + t.name + '"]'),
        function (e) {
          t.form === e.form && e !== t && ((e.checked = !1), this.syncConditionalRevealWithInputState(e));
        }.bind(this),
      );
    }),
    (h.prototype.unCheckExclusiveInputs = function (t) {
      n(
        document.querySelectorAll('input[data-behaviour="exclusive"][type="checkbox"][name="' + t.name + '"]'),
        function (e) {
          t.form === e.form && ((e.checked = !1), this.syncConditionalRevealWithInputState(e));
        }.bind(this),
      );
    }),
    (h.prototype.handleClick = function (t) {
      var e = t.target;
      'checkbox' === e.type &&
        (e.getAttribute('aria-controls') && this.syncConditionalRevealWithInputState(e),
        e.checked && ('exclusive' === e.getAttribute('data-behaviour') ? this.unCheckAllInputsExcept(e) : this.unCheckExclusiveInputs(e)));
    });
  var p = h;
  function f(t) {
    this.$module = t;
  }
  (function (t) {
    ('document' in this && 'matches' in document.documentElement) ||
      (Element.prototype.matches =
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        function (t) {
          for (var e = this, n = (e.document || e.ownerDocument).querySelectorAll(t), o = 0; n[o] && n[o] !== e; ) ++o;
          return !!n[o];
        });
  }.call(('object' == typeof window && window) || ('object' == typeof self && self) || ('object' == typeof global && global) || {}),
    function (t) {
      ('document' in this && 'closest' in document.documentElement) ||
        (Element.prototype.closest = function (t) {
          for (var e = this; e; ) {
            if (e.matches(t)) return e;
            e = 'SVGElement' in window && e instanceof SVGElement ? e.parentNode : e.parentElement;
          }
          return null;
        });
    }.call(('object' == typeof window && window) || ('object' == typeof self && self) || ('object' == typeof global && global) || {}),
    (f.prototype.init = function () {
      var t = this.$module;
      t && (this.setFocus(), t.addEventListener('click', this.handleClick.bind(this)));
    }),
    (f.prototype.setFocus = function () {
      var t = this.$module;
      'true' !== t.getAttribute('data-disable-auto-focus') &&
        (t.setAttribute('tabindex', '-1'),
        t.addEventListener('blur', function () {
          t.removeAttribute('tabindex');
        }),
        t.focus());
    }),
    (f.prototype.handleClick = function (t) {
      var e = t.target;
      this.focusTarget(e) && t.preventDefault();
    }),
    (f.prototype.focusTarget = function (t) {
      if ('A' !== t.tagName || !1 === t.href) return !1;
      var e = this.getFragmentFromUrl(t.href),
        n = document.getElementById(e);
      if (!n) return !1;
      var o = this.getAssociatedLegendOrLabel(n);
      return !!o && (o.scrollIntoView(), n.focus({ preventScroll: !0 }), !0);
    }),
    (f.prototype.getFragmentFromUrl = function (t) {
      return -1 !== t.indexOf('#') && t.split('#').pop();
    }),
    (f.prototype.getAssociatedLegendOrLabel = function (t) {
      var e = t.closest('fieldset');
      if (e) {
        var n = e.getElementsByTagName('legend');
        if (n.length) {
          var o = n[0];
          if ('checkbox' === t.type || 'radio' === t.type) return o;
          var i = o.getBoundingClientRect().top,
            s = t.getBoundingClientRect();
          if (s.height && window.innerHeight) if (s.top + s.height - i < window.innerHeight / 2) return o;
        }
      }
      return document.querySelector("label[for='" + t.getAttribute('id') + "']") || t.closest('label');
    }));
  var m = f;
  function v(t) {
    this.$module = t;
  }
  (v.prototype.init = function () {
    this.$module && this.setFocus();
  }),
    (v.prototype.setFocus = function () {
      var t = this.$module;
      'true' !== t.getAttribute('data-disable-auto-focus') &&
        'alert' === t.getAttribute('role') &&
        (t.getAttribute('tabindex') ||
          (t.setAttribute('tabindex', '-1'),
          t.addEventListener('blur', function () {
            t.removeAttribute('tabindex');
          })),
        t.focus());
    });
  var b = v;
  function g(t) {
    (this.$module = t),
      (this.$menuButton = t && t.querySelector('.govuk-js-header-toggle')),
      (this.$menu = this.$menuButton && t.querySelector('#' + this.$menuButton.getAttribute('aria-controls')));
  }
  (g.prototype.init = function () {
    this.$module &&
      this.$menuButton &&
      this.$menu &&
      (this.syncState(this.$menu.classList.contains('govuk-header__navigation-list--open')),
      this.$menuButton.addEventListener('click', this.handleMenuButtonClick.bind(this)));
  }),
    (g.prototype.syncState = function (t) {
      this.$menuButton.classList.toggle('govuk-header__menu-button--open', t), this.$menuButton.setAttribute('aria-expanded', t);
    }),
    (g.prototype.handleMenuButtonClick = function () {
      var t = this.$menu.classList.toggle('govuk-header__navigation-list--open');
      this.syncState(t);
    });
  var y = g;
  function w(t) {
    (this.$module = t), (this.$inputs = t.querySelectorAll('input[type="radio"]'));
  }
  (w.prototype.init = function () {
    var t = this.$module;
    n(this.$inputs, function (t) {
      var e = t.getAttribute('data-aria-controls');
      e && document.getElementById(e) && (t.setAttribute('aria-controls', e), t.removeAttribute('data-aria-controls'));
    }),
      'onpageshow' in window
        ? window.addEventListener('pageshow', this.syncAllConditionalReveals.bind(this))
        : window.addEventListener('DOMContentLoaded', this.syncAllConditionalReveals.bind(this)),
      this.syncAllConditionalReveals(),
      t.addEventListener('click', this.handleClick.bind(this));
  }),
    (w.prototype.syncAllConditionalReveals = function () {
      n(this.$inputs, this.syncConditionalRevealWithInputState.bind(this));
    }),
    (w.prototype.syncConditionalRevealWithInputState = function (t) {
      var e = document.getElementById(t.getAttribute('aria-controls'));
      if (e && e.classList.contains('govuk-radios__conditional')) {
        var n = t.checked;
        t.setAttribute('aria-expanded', n), e.classList.toggle('govuk-radios__conditional--hidden', !n);
      }
    }),
    (w.prototype.handleClick = function (t) {
      var e = t.target;
      'radio' === e.type &&
        n(
          document.querySelectorAll('input[type="radio"][aria-controls]'),
          function (t) {
            var n = t.form === e.form;
            t.name === e.name && n && this.syncConditionalRevealWithInputState(t);
          }.bind(this),
        );
    });
  var E = w;
  function k(t) {
    (this.$module = t), (this.$linkedElement = null), (this.linkedElementListener = !1);
  }
  (k.prototype.init = function () {
    this.$module &&
      ((this.$linkedElement = this.getLinkedElement()), this.$linkedElement && this.$module.addEventListener('click', this.focusLinkedElement.bind(this)));
  }),
    (k.prototype.getLinkedElement = function () {
      var t = this.getFragmentFromUrl();
      return !!t && document.getElementById(t);
    }),
    (k.prototype.focusLinkedElement = function () {
      var t = this.$linkedElement;
      t.getAttribute('tabindex') ||
        (t.setAttribute('tabindex', '-1'),
        t.classList.add('govuk-skip-link-focused-element'),
        this.linkedElementListener || (this.$linkedElement.addEventListener('blur', this.removeFocusProperties.bind(this)), (this.linkedElementListener = !0))),
        t.focus();
    }),
    (k.prototype.removeFocusProperties = function () {
      this.$linkedElement.removeAttribute('tabindex'), this.$linkedElement.classList.remove('govuk-skip-link-focused-element');
    }),
    (k.prototype.getFragmentFromUrl = function () {
      return !!this.$module.hash && this.$module.hash.split('#').pop();
    });
  var C = k;
  function A(t) {
    (this.$module = t),
      (this.$tabs = t.querySelectorAll('.govuk-tabs__tab')),
      (this.keys = { left: 37, right: 39, up: 38, down: 40 }),
      (this.jsHiddenClass = 'govuk-tabs__panel--hidden');
  }
  (function (t) {
    ('document' in this && 'nextElementSibling' in document.documentElement) ||
      Object.defineProperty(Element.prototype, 'nextElementSibling', {
        get: function () {
          for (var t = this.nextSibling; t && 1 !== t.nodeType; ) t = t.nextSibling;
          return t;
        },
      });
  }.call(('object' == typeof window && window) || ('object' == typeof self && self) || ('object' == typeof global && global) || {}),
    function (t) {
      ('document' in this && 'previousElementSibling' in document.documentElement) ||
        Object.defineProperty(Element.prototype, 'previousElementSibling', {
          get: function () {
            for (var t = this.previousSibling; t && 1 !== t.nodeType; ) t = t.previousSibling;
            return t;
          },
        });
    }.call(('object' == typeof window && window) || ('object' == typeof self && self) || ('object' == typeof global && global) || {}),
    (A.prototype.init = function () {
      'function' == typeof window.matchMedia ? this.setupResponsiveChecks() : this.setup();
    }),
    (A.prototype.setupResponsiveChecks = function () {
      (this.mql = window.matchMedia('(min-width: 40.0625em)')), this.mql.addListener(this.checkMode.bind(this)), this.checkMode();
    }),
    (A.prototype.checkMode = function () {
      this.mql.matches ? this.setup() : this.teardown();
    }),
    (A.prototype.setup = function () {
      var t = this.$module,
        e = this.$tabs,
        o = t.querySelector('.govuk-tabs__list'),
        i = t.querySelectorAll('.govuk-tabs__list-item');
      if (e && o && i) {
        o.setAttribute('role', 'tablist'),
          n(i, function (t) {
            t.setAttribute('role', 'presentation');
          }),
          n(
            e,
            function (t) {
              this.setAttributes(t),
                (t.boundTabClick = this.onTabClick.bind(this)),
                (t.boundTabKeydown = this.onTabKeydown.bind(this)),
                t.addEventListener('click', t.boundTabClick, !0),
                t.addEventListener('keydown', t.boundTabKeydown, !0),
                this.hideTab(t);
            }.bind(this),
          );
        var s = this.getTab(window.location.hash) || this.$tabs[0];
        this.showTab(s), (t.boundOnHashChange = this.onHashChange.bind(this)), window.addEventListener('hashchange', t.boundOnHashChange, !0);
      }
    }),
    (A.prototype.teardown = function () {
      var t = this.$module,
        e = this.$tabs,
        o = t.querySelector('.govuk-tabs__list'),
        i = t.querySelectorAll('.govuk-tabs__list-item');
      e &&
        o &&
        i &&
        (o.removeAttribute('role'),
        n(i, function (t) {
          t.removeAttribute('role', 'presentation');
        }),
        n(
          e,
          function (t) {
            t.removeEventListener('click', t.boundTabClick, !0), t.removeEventListener('keydown', t.boundTabKeydown, !0), this.unsetAttributes(t);
          }.bind(this),
        ),
        window.removeEventListener('hashchange', t.boundOnHashChange, !0));
    }),
    (A.prototype.onHashChange = function (t) {
      var e = window.location.hash,
        n = this.getTab(e);
      if (n)
        if (this.changingHash) this.changingHash = !1;
        else {
          var o = this.getCurrentTab();
          this.hideTab(o), this.showTab(n), n.focus();
        }
    }),
    (A.prototype.hideTab = function (t) {
      this.unhighlightTab(t), this.hidePanel(t);
    }),
    (A.prototype.showTab = function (t) {
      this.highlightTab(t), this.showPanel(t);
    }),
    (A.prototype.getTab = function (t) {
      return this.$module.querySelector('.govuk-tabs__tab[href="' + t + '"]');
    }),
    (A.prototype.setAttributes = function (t) {
      var e = this.getHref(t).slice(1);
      t.setAttribute('id', 'tab_' + e),
        t.setAttribute('role', 'tab'),
        t.setAttribute('aria-controls', e),
        t.setAttribute('aria-selected', 'false'),
        t.setAttribute('tabindex', '-1');
      var n = this.getPanel(t);
      n.setAttribute('role', 'tabpanel'), n.setAttribute('aria-labelledby', t.id), n.classList.add(this.jsHiddenClass);
    }),
    (A.prototype.unsetAttributes = function (t) {
      t.removeAttribute('id'), t.removeAttribute('role'), t.removeAttribute('aria-controls'), t.removeAttribute('aria-selected'), t.removeAttribute('tabindex');
      var e = this.getPanel(t);
      e.removeAttribute('role'), e.removeAttribute('aria-labelledby'), e.classList.remove(this.jsHiddenClass);
    }),
    (A.prototype.onTabClick = function (t) {
      if (!t.target.classList.contains('govuk-tabs__tab')) return !1;
      t.preventDefault();
      var e = t.target,
        n = this.getCurrentTab();
      this.hideTab(n), this.showTab(e), this.createHistoryEntry(e);
    }),
    (A.prototype.createHistoryEntry = function (t) {
      var e = this.getPanel(t),
        n = e.id;
      (e.id = ''), (this.changingHash = !0), (window.location.hash = this.getHref(t).slice(1)), (e.id = n);
    }),
    (A.prototype.onTabKeydown = function (t) {
      switch (t.keyCode) {
        case this.keys.left:
        case this.keys.up:
          this.activatePreviousTab(), t.preventDefault();
          break;
        case this.keys.right:
        case this.keys.down:
          this.activateNextTab(), t.preventDefault();
      }
    }),
    (A.prototype.activateNextTab = function () {
      var t = this.getCurrentTab(),
        e = t.parentNode.nextElementSibling;
      if (e) var n = e.querySelector('.govuk-tabs__tab');
      n && (this.hideTab(t), this.showTab(n), n.focus(), this.createHistoryEntry(n));
    }),
    (A.prototype.activatePreviousTab = function () {
      var t = this.getCurrentTab(),
        e = t.parentNode.previousElementSibling;
      if (e) var n = e.querySelector('.govuk-tabs__tab');
      n && (this.hideTab(t), this.showTab(n), n.focus(), this.createHistoryEntry(n));
    }),
    (A.prototype.getPanel = function (t) {
      return this.$module.querySelector(this.getHref(t));
    }),
    (A.prototype.showPanel = function (t) {
      this.getPanel(t).classList.remove(this.jsHiddenClass);
    }),
    (A.prototype.hidePanel = function (t) {
      this.getPanel(t).classList.add(this.jsHiddenClass);
    }),
    (A.prototype.unhighlightTab = function (t) {
      t.setAttribute('aria-selected', 'false'), t.parentNode.classList.remove('govuk-tabs__list-item--selected'), t.setAttribute('tabindex', '-1');
    }),
    (A.prototype.highlightTab = function (t) {
      t.setAttribute('aria-selected', 'true'), t.parentNode.classList.add('govuk-tabs__list-item--selected'), t.setAttribute('tabindex', '0');
    }),
    (A.prototype.getCurrentTab = function () {
      return this.$module.querySelector('.govuk-tabs__list-item--selected .govuk-tabs__tab');
    }),
    (A.prototype.getHref = function (t) {
      var e = t.getAttribute('href');
      return e.slice(e.indexOf('#'), e.length);
    }));
  var L = A;
  var S = (function (t) {
    var e = void 0 !== (t = void 0 !== t ? t : {}).scope ? t.scope : document;
    n(e.querySelectorAll('[data-module="govuk-button"]'), function (t) {
      new a(t).init();
    }),
      n(e.querySelectorAll('[data-module="govuk-accordion"]'), function (t) {
        new s(t).init();
      }),
      n(e.querySelectorAll('[data-module="govuk-details"]'), function (t) {
        new c(t).init();
      }),
      n(e.querySelectorAll('[data-module="govuk-character-count"]'), function (t) {
        new d(t).init();
      }),
      n(e.querySelectorAll('[data-module="govuk-checkboxes"]'), function (t) {
        new p(t).init();
      });
    var o = e.querySelector('[data-module="govuk-error-summary"]');
    new m(o).init();
    var i = e.querySelector('[data-module="govuk-header"]');
    new y(i).init(),
      n(e.querySelectorAll('[data-module="govuk-notification-banner"]'), function (t) {
        new b(t).init();
      }),
      n(e.querySelectorAll('[data-module="govuk-radios"]'), function (t) {
        new E(t).init();
      });
    var r = e.querySelector('[data-module="govuk-skip-link"]');
    new C(r).init(),
      n(e.querySelectorAll('[data-module="govuk-tabs"]'), function (t) {
        new L(t).init();
      });
  })();
  (DTFS = void 0 === DTFS ? {} : DTFS).govukFrontend = e;
})();
//# sourceMappingURL=govukFrontend.js.map