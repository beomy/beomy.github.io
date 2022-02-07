!(function (e) {
  var t = {};
  function s(i) {
    if (t[i]) return t[i].exports;
    var n = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(n.exports, n, n.exports, s), (n.l = !0), n.exports;
  }
  (s.m = e),
    (s.c = t),
    (s.d = function (e, t, i) {
      s.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (s.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (s.t = function (e, t) {
      if ((1 & t && (e = s(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (s.r(i),
        Object.defineProperty(i, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var n in e)
          s.d(
            i,
            n,
            function (t) {
              return e[t];
            }.bind(null, n),
          );
      return i;
    }),
    (s.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return s.d(t, 'a', t), t;
    }),
    (s.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (s.p = ''),
    s((s.s = 1));
})([
  function (e, t, s) {
    (function (t) {
      window,
        (e.exports = (function (e) {
          var t = {};
          function s(i) {
            if (t[i]) return t[i].exports;
            var n = (t[i] = { i: i, l: !1, exports: {} });
            return e[i].call(n.exports, n, n.exports, s), (n.l = !0), n.exports;
          }
          return (
            (s.m = e),
            (s.c = t),
            (s.d = function (e, t, i) {
              s.o(e, t) ||
                Object.defineProperty(e, t, { enumerable: !0, get: i });
            }),
            (s.r = function (e) {
              'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {
                  value: 'Module',
                }),
                Object.defineProperty(e, '__esModule', { value: !0 });
            }),
            (s.t = function (e, t) {
              if ((1 & t && (e = s(e)), 8 & t)) return e;
              if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
              var i = Object.create(null);
              if (
                (s.r(i),
                Object.defineProperty(i, 'default', {
                  enumerable: !0,
                  value: e,
                }),
                2 & t && 'string' != typeof e)
              )
                for (var n in e)
                  s.d(
                    i,
                    n,
                    function (t) {
                      return e[t];
                    }.bind(null, n),
                  );
              return i;
            }),
            (s.n = function (e) {
              var t =
                e && e.__esModule
                  ? function () {
                      return e.default;
                    }
                  : function () {
                      return e;
                    };
              return s.d(t, 'a', t), t;
            }),
            (s.o = function (e, t) {
              return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (s.p = ''),
            s((s.s = 0))
          );
        })([
          function (e, t, s) {
            'use strict';
            function i() {}
            function n(e) {
              return e();
            }
            function r() {
              return Object.create(null);
            }
            function a(e) {
              e.forEach(n);
            }
            function o(e) {
              return 'function' == typeof e;
            }
            function l(e, t) {
              return e != e
                ? t == t
                : e !== t ||
                    (e && 'object' == typeof e) ||
                    'function' == typeof e;
            }
            function c(e) {
              return 0 === Object.keys(e).length;
            }
            function p(e, t, s, i) {
              if (e) {
                const n = d(e, t, s, i);
                return e[0](n);
              }
            }
            function d(e, t, s, i) {
              return e[1] && i
                ? (function (e, t) {
                    for (const s in t) e[s] = t[s];
                    return e;
                  })(s.ctx.slice(), e[1](i(t)))
                : s.ctx;
            }
            function u(e, t, s, i, n, r, a) {
              const o = (function (e, t, s, i) {
                if (e[2] && i) {
                  const n = e[2](i(s));
                  if (void 0 === t.dirty) return n;
                  if ('object' == typeof n) {
                    const e = [],
                      s = Math.max(t.dirty.length, n.length);
                    for (let i = 0; i < s; i += 1) e[i] = t.dirty[i] | n[i];
                    return e;
                  }
                  return t.dirty | n;
                }
                return t.dirty;
              })(t, i, n, r);
              if (o) {
                const n = d(t, s, i, a);
                e.p(n, o);
              }
            }
            function $(e, t) {
              e.appendChild(t);
            }
            function f(e, t, s) {
              e.insertBefore(t, s || null);
            }
            function m(e) {
              e.parentNode.removeChild(e);
            }
            function h(e) {
              return document.createElement(e);
            }
            function g() {
              return (function (e) {
                return document.createTextNode(e);
              })(' ');
            }
            function v(e, t, s) {
              null == s
                ? e.removeAttribute(t)
                : e.getAttribute(t) !== s && e.setAttribute(t, s);
            }
            let w;
            function S(e) {
              w = e;
            }
            function x() {
              if (!w)
                throw new Error(
                  'Function called outside component initialization',
                );
              return w;
            }
            function y(e) {
              x().$$.after_update.push(e);
            }
            s.r(t),
              s.d(t, 'Swiper', function () {
                return Vt;
              }),
              s.d(t, 'SwiperSlide', function () {
                return Ht;
              }),
              new Set(),
              new Set();
            const b = [],
              E = [],
              C = [],
              T = [],
              k = Promise.resolve();
            let M = !1;
            function P() {
              M || ((M = !0), k.then(O));
            }
            function z(e) {
              C.push(e);
            }
            let j = !1;
            const L = new Set();
            function O() {
              if (!j) {
                j = !0;
                do {
                  for (let e = 0; e < b.length; e += 1) {
                    const t = b[e];
                    S(t), I(t.$$);
                  }
                  for (b.length = 0; E.length; ) E.pop()();
                  for (let e = 0; e < C.length; e += 1) {
                    const t = C[e];
                    L.has(t) || (L.add(t), t());
                  }
                  C.length = 0;
                } while (b.length);
                for (; T.length; ) T.pop()();
                (M = !1), (j = !1), L.clear();
              }
            }
            function I(e) {
              if (null !== e.fragment) {
                e.update(), a(e.before_update);
                const t = e.dirty;
                (e.dirty = [-1]),
                  e.fragment && e.fragment.p(e.ctx, t),
                  e.after_update.forEach(z);
              }
            }
            const A = new Set();
            let D;
            function N(e, t) {
              e && e.i && (A.delete(e), e.i(t));
            }
            function B(e, t, s, i) {
              if (e && e.o) {
                if (A.has(e)) return;
                A.add(e),
                  (void 0).c.push(() => {
                    A.delete(e), i && (s && e.d(1), i());
                  }),
                  e.o(t);
              }
            }
            function V(e, t) {
              const s = e.$$;
              null !== s.fragment &&
                (a(s.on_destroy),
                s.fragment && s.fragment.d(t),
                (s.on_destroy = s.fragment = null),
                (s.ctx = []));
            }
            function G(e, t, s, l, c, p, d = [-1]) {
              const u = w;
              S(e);
              const $ = t.props || {},
                f = (e.$$ = {
                  fragment: null,
                  ctx: null,
                  props: p,
                  update: i,
                  not_equal: c,
                  bound: r(),
                  on_mount: [],
                  on_destroy: [],
                  before_update: [],
                  after_update: [],
                  context: new Map(u ? u.$$.context : []),
                  callbacks: r(),
                  dirty: d,
                  skip_bound: !1,
                });
              let h = !1;
              if (
                ((f.ctx = s
                  ? s(e, $, (t, s, ...i) => {
                      const n = i.length ? i[0] : s;
                      return (
                        f.ctx &&
                          c(f.ctx[t], (f.ctx[t] = n)) &&
                          (!f.skip_bound && f.bound[t] && f.bound[t](n),
                          h &&
                            (function (e, t) {
                              -1 === e.$$.dirty[0] &&
                                (b.push(e), P(), e.$$.dirty.fill(0)),
                                (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
                            })(e, t)),
                        s
                      );
                    })
                  : []),
                f.update(),
                (h = !0),
                a(f.before_update),
                (f.fragment = !!l && l(f.ctx)),
                t.target)
              ) {
                if (t.hydrate) {
                  const e = ((g = t.target), Array.from(g.childNodes));
                  f.fragment && f.fragment.l(e), e.forEach(m);
                } else f.fragment && f.fragment.c();
                t.intro && N(e.$$.fragment),
                  (function (e, t, s) {
                    const {
                      fragment: i,
                      on_mount: r,
                      on_destroy: l,
                      after_update: c,
                    } = e.$$;
                    i && i.m(t, s),
                      z(() => {
                        const t = r.map(n).filter(o);
                        l ? l.push(...t) : a(t), (e.$$.on_mount = []);
                      }),
                      c.forEach(z);
                  })(e, t.target, t.anchor),
                  O();
              }
              var g;
              S(u);
            }
            'undefined' != typeof window
              ? window
              : 'undefined' != typeof globalThis && globalThis,
              new Set([
                'allowfullscreen',
                'allowpaymentrequest',
                'async',
                'autofocus',
                'autoplay',
                'checked',
                'controls',
                'default',
                'defer',
                'disabled',
                'formnovalidate',
                'hidden',
                'ismap',
                'loop',
                'multiple',
                'muted',
                'nomodule',
                'novalidate',
                'open',
                'playsinline',
                'readonly',
                'required',
                'reversed',
                'selected',
              ]),
              'function' == typeof HTMLElement &&
                (D = class extends HTMLElement {
                  constructor() {
                    super(), this.attachShadow({ mode: 'open' });
                  }
                  connectedCallback() {
                    for (const e in this.$$.slotted)
                      this.appendChild(this.$$.slotted[e]);
                  }
                  attributeChangedCallback(e, t, s) {
                    this[e] = s;
                  }
                  $destroy() {
                    V(this, 1), (this.$destroy = i);
                  }
                  $on(e, t) {
                    const s =
                      this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
                    return (
                      s.push(t),
                      () => {
                        const e = s.indexOf(t);
                        -1 !== e && s.splice(e, 1);
                      }
                    );
                  }
                  $set(e) {
                    this.$$set &&
                      !c(e) &&
                      ((this.$$.skip_bound = !0),
                      this.$$set(e),
                      (this.$$.skip_bound = !1));
                  }
                });
            class q {
              $destroy() {
                V(this, 1), (this.$destroy = i);
              }
              $on(e, t) {
                const s = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
                return (
                  s.push(t),
                  () => {
                    const e = s.indexOf(t);
                    -1 !== e && s.splice(e, 1);
                  }
                );
              }
              $set(e) {
                this.$$set &&
                  !c(e) &&
                  ((this.$$.skip_bound = !0),
                  this.$$set(e),
                  (this.$$.skip_bound = !1));
              }
            }
            function H(e) {
              return (
                null !== e &&
                'object' == typeof e &&
                'constructor' in e &&
                e.constructor === Object
              );
            }
            function _(e, t) {
              void 0 === e && (e = {}),
                void 0 === t && (t = {}),
                Object.keys(t).forEach(function (s) {
                  void 0 === e[s]
                    ? (e[s] = t[s])
                    : H(t[s]) &&
                      H(e[s]) &&
                      Object.keys(t[s]).length > 0 &&
                      _(e[s], t[s]);
                });
            }
            var F = {
              body: {},
              addEventListener: function () {},
              removeEventListener: function () {},
              activeElement: { blur: function () {}, nodeName: '' },
              querySelector: function () {
                return null;
              },
              querySelectorAll: function () {
                return [];
              },
              getElementById: function () {
                return null;
              },
              createEvent: function () {
                return { initEvent: function () {} };
              },
              createElement: function () {
                return {
                  children: [],
                  childNodes: [],
                  style: {},
                  setAttribute: function () {},
                  getElementsByTagName: function () {
                    return [];
                  },
                };
              },
              createElementNS: function () {
                return {};
              },
              importNode: function () {
                return null;
              },
              location: {
                hash: '',
                host: '',
                hostname: '',
                href: '',
                origin: '',
                pathname: '',
                protocol: '',
                search: '',
              },
            };
            function X() {
              var e = 'undefined' != typeof document ? document : {};
              return _(e, F), e;
            }
            var Y = {
              document: F,
              navigator: { userAgent: '' },
              location: {
                hash: '',
                host: '',
                hostname: '',
                href: '',
                origin: '',
                pathname: '',
                protocol: '',
                search: '',
              },
              history: {
                replaceState: function () {},
                pushState: function () {},
                go: function () {},
                back: function () {},
              },
              CustomEvent: function () {
                return this;
              },
              addEventListener: function () {},
              removeEventListener: function () {},
              getComputedStyle: function () {
                return {
                  getPropertyValue: function () {
                    return '';
                  },
                };
              },
              Image: function () {},
              Date: function () {},
              screen: {},
              setTimeout: function () {},
              clearTimeout: function () {},
              matchMedia: function () {
                return {};
              },
              requestAnimationFrame: function (e) {
                return 'undefined' == typeof setTimeout
                  ? (e(), null)
                  : setTimeout(e, 0);
              },
              cancelAnimationFrame: function (e) {
                'undefined' != typeof setTimeout && clearTimeout(e);
              },
            };
            function R() {
              var e = 'undefined' != typeof window ? window : {};
              return _(e, Y), e;
            }
            function W(e) {
              return (W = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function (e) {
                    return e.__proto__ || Object.getPrototypeOf(e);
                  })(e);
            }
            function U(e, t) {
              return (U =
                Object.setPrototypeOf ||
                function (e, t) {
                  return (e.__proto__ = t), e;
                })(e, t);
            }
            function K() {
              if ('undefined' == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham) return !1;
              if ('function' == typeof Proxy) return !0;
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {}),
                  ),
                  !0
                );
              } catch (e) {
                return !1;
              }
            }
            function Q(e, t, s) {
              return (Q = K()
                ? Reflect.construct
                : function (e, t, s) {
                    var i = [null];
                    i.push.apply(i, t);
                    var n = new (Function.bind.apply(e, i))();
                    return s && U(n, s.prototype), n;
                  }).apply(null, arguments);
            }
            function Z(e) {
              var t = 'function' == typeof Map ? new Map() : void 0;
              return (Z = function (e) {
                if (
                  null === e ||
                  ((s = e),
                  -1 === Function.toString.call(s).indexOf('[native code]'))
                )
                  return e;
                var s;
                if ('function' != typeof e)
                  throw new TypeError(
                    'Super expression must either be null or a function',
                  );
                if (void 0 !== t) {
                  if (t.has(e)) return t.get(e);
                  t.set(e, i);
                }
                function i() {
                  return Q(e, arguments, W(this).constructor);
                }
                return (
                  (i.prototype = Object.create(e.prototype, {
                    constructor: {
                      value: i,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                  U(i, e)
                );
              })(e);
            }
            var J = (function (e) {
              var t, s;
              function i(t) {
                var s, i, n;
                return (
                  (i = (function (e) {
                    if (void 0 === e)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called",
                      );
                    return e;
                  })((s = e.call.apply(e, [this].concat(t)) || this))),
                  (n = i.__proto__),
                  Object.defineProperty(i, '__proto__', {
                    get: function () {
                      return n;
                    },
                    set: function (e) {
                      n.__proto__ = e;
                    },
                  }),
                  s
                );
              }
              return (
                (s = e),
                ((t = i).prototype = Object.create(s.prototype)),
                (t.prototype.constructor = t),
                (t.__proto__ = s),
                i
              );
            })(Z(Array));
            function ee(e) {
              void 0 === e && (e = []);
              var t = [];
              return (
                e.forEach(function (e) {
                  Array.isArray(e) ? t.push.apply(t, ee(e)) : t.push(e);
                }),
                t
              );
            }
            function te(e, t) {
              return Array.prototype.filter.call(e, t);
            }
            function se(e, t) {
              var s = R(),
                i = X(),
                n = [];
              if (!t && e instanceof J) return e;
              if (!e) return new J(n);
              if ('string' == typeof e) {
                var r = e.trim();
                if (r.indexOf('<') >= 0 && r.indexOf('>') >= 0) {
                  var a = 'div';
                  0 === r.indexOf('<li') && (a = 'ul'),
                    0 === r.indexOf('<tr') && (a = 'tbody'),
                    (0 !== r.indexOf('<td') && 0 !== r.indexOf('<th')) ||
                      (a = 'tr'),
                    0 === r.indexOf('<tbody') && (a = 'table'),
                    0 === r.indexOf('<option') && (a = 'select');
                  var o = i.createElement(a);
                  o.innerHTML = r;
                  for (var l = 0; l < o.childNodes.length; l += 1)
                    n.push(o.childNodes[l]);
                } else
                  n = (function (e, t) {
                    if ('string' != typeof e) return [e];
                    for (
                      var s = [], i = t.querySelectorAll(e), n = 0;
                      n < i.length;
                      n += 1
                    )
                      s.push(i[n]);
                    return s;
                  })(e.trim(), t || i);
              } else if (e.nodeType || e === s || e === i) n.push(e);
              else if (Array.isArray(e)) {
                if (e instanceof J) return e;
                n = e;
              }
              return new J(
                (function (e) {
                  for (var t = [], s = 0; s < e.length; s += 1)
                    -1 === t.indexOf(e[s]) && t.push(e[s]);
                  return t;
                })(n),
              );
            }
            se.fn = J.prototype;
            var ie = 'resize scroll'.split(' ');
            function ne(e) {
              return function () {
                for (
                  var t = arguments.length, s = new Array(t), i = 0;
                  i < t;
                  i++
                )
                  s[i] = arguments[i];
                if (void 0 === s[0]) {
                  for (var n = 0; n < this.length; n += 1)
                    ie.indexOf(e) < 0 &&
                      (e in this[n] ? this[n][e]() : se(this[n]).trigger(e));
                  return this;
                }
                return this.on.apply(this, [e].concat(s));
              };
            }
            ne('click'),
              ne('blur'),
              ne('focus'),
              ne('focusin'),
              ne('focusout'),
              ne('keyup'),
              ne('keydown'),
              ne('keypress'),
              ne('submit'),
              ne('change'),
              ne('mousedown'),
              ne('mousemove'),
              ne('mouseup'),
              ne('mouseenter'),
              ne('mouseleave'),
              ne('mouseout'),
              ne('mouseover'),
              ne('touchstart'),
              ne('touchend'),
              ne('touchmove'),
              ne('resize'),
              ne('scroll');
            var re = {
              addClass: function () {
                for (
                  var e = arguments.length, t = new Array(e), s = 0;
                  s < e;
                  s++
                )
                  t[s] = arguments[s];
                var i = ee(
                  t.map(function (e) {
                    return e.split(' ');
                  }),
                );
                return (
                  this.forEach(function (e) {
                    var t;
                    (t = e.classList).add.apply(t, i);
                  }),
                  this
                );
              },
              removeClass: function () {
                for (
                  var e = arguments.length, t = new Array(e), s = 0;
                  s < e;
                  s++
                )
                  t[s] = arguments[s];
                var i = ee(
                  t.map(function (e) {
                    return e.split(' ');
                  }),
                );
                return (
                  this.forEach(function (e) {
                    var t;
                    (t = e.classList).remove.apply(t, i);
                  }),
                  this
                );
              },
              hasClass: function () {
                for (
                  var e = arguments.length, t = new Array(e), s = 0;
                  s < e;
                  s++
                )
                  t[s] = arguments[s];
                var i = ee(
                  t.map(function (e) {
                    return e.split(' ');
                  }),
                );
                return (
                  te(this, function (e) {
                    return (
                      i.filter(function (t) {
                        return e.classList.contains(t);
                      }).length > 0
                    );
                  }).length > 0
                );
              },
              toggleClass: function () {
                for (
                  var e = arguments.length, t = new Array(e), s = 0;
                  s < e;
                  s++
                )
                  t[s] = arguments[s];
                var i = ee(
                  t.map(function (e) {
                    return e.split(' ');
                  }),
                );
                this.forEach(function (e) {
                  i.forEach(function (t) {
                    e.classList.toggle(t);
                  });
                });
              },
              attr: function (e, t) {
                if (1 === arguments.length && 'string' == typeof e)
                  return this[0] ? this[0].getAttribute(e) : void 0;
                for (var s = 0; s < this.length; s += 1)
                  if (2 === arguments.length) this[s].setAttribute(e, t);
                  else
                    for (var i in e)
                      (this[s][i] = e[i]), this[s].setAttribute(i, e[i]);
                return this;
              },
              removeAttr: function (e) {
                for (var t = 0; t < this.length; t += 1)
                  this[t].removeAttribute(e);
                return this;
              },
              transform: function (e) {
                for (var t = 0; t < this.length; t += 1)
                  this[t].style.transform = e;
                return this;
              },
              transition: function (e) {
                for (var t = 0; t < this.length; t += 1)
                  this[t].style.transition =
                    'string' != typeof e ? e + 'ms' : e;
                return this;
              },
              on: function () {
                for (
                  var e = arguments.length, t = new Array(e), s = 0;
                  s < e;
                  s++
                )
                  t[s] = arguments[s];
                var i = t[0],
                  n = t[1],
                  r = t[2],
                  a = t[3];
                function o(e) {
                  var t = e.target;
                  if (t) {
                    var s = e.target.dom7EventData || [];
                    if ((s.indexOf(e) < 0 && s.unshift(e), se(t).is(n)))
                      r.apply(t, s);
                    else
                      for (var i = se(t).parents(), a = 0; a < i.length; a += 1)
                        se(i[a]).is(n) && r.apply(i[a], s);
                  }
                }
                function l(e) {
                  var t = (e && e.target && e.target.dom7EventData) || [];
                  t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t);
                }
                'function' == typeof t[1] &&
                  ((i = t[0]), (r = t[1]), (a = t[2]), (n = void 0)),
                  a || (a = !1);
                for (var c, p = i.split(' '), d = 0; d < this.length; d += 1) {
                  var u = this[d];
                  if (n)
                    for (c = 0; c < p.length; c += 1) {
                      var $ = p[c];
                      u.dom7LiveListeners || (u.dom7LiveListeners = {}),
                        u.dom7LiveListeners[$] || (u.dom7LiveListeners[$] = []),
                        u.dom7LiveListeners[$].push({
                          listener: r,
                          proxyListener: o,
                        }),
                        u.addEventListener($, o, a);
                    }
                  else
                    for (c = 0; c < p.length; c += 1) {
                      var f = p[c];
                      u.dom7Listeners || (u.dom7Listeners = {}),
                        u.dom7Listeners[f] || (u.dom7Listeners[f] = []),
                        u.dom7Listeners[f].push({
                          listener: r,
                          proxyListener: l,
                        }),
                        u.addEventListener(f, l, a);
                    }
                }
                return this;
              },
              off: function () {
                for (
                  var e = arguments.length, t = new Array(e), s = 0;
                  s < e;
                  s++
                )
                  t[s] = arguments[s];
                var i = t[0],
                  n = t[1],
                  r = t[2],
                  a = t[3];
                'function' == typeof t[1] &&
                  ((i = t[0]), (r = t[1]), (a = t[2]), (n = void 0)),
                  a || (a = !1);
                for (var o = i.split(' '), l = 0; l < o.length; l += 1)
                  for (var c = o[l], p = 0; p < this.length; p += 1) {
                    var d = this[p],
                      u = void 0;
                    if (
                      (!n && d.dom7Listeners
                        ? (u = d.dom7Listeners[c])
                        : n &&
                          d.dom7LiveListeners &&
                          (u = d.dom7LiveListeners[c]),
                      u && u.length)
                    )
                      for (var $ = u.length - 1; $ >= 0; $ -= 1) {
                        var f = u[$];
                        (r && f.listener === r) ||
                        (r &&
                          f.listener &&
                          f.listener.dom7proxy &&
                          f.listener.dom7proxy === r)
                          ? (d.removeEventListener(c, f.proxyListener, a),
                            u.splice($, 1))
                          : r ||
                            (d.removeEventListener(c, f.proxyListener, a),
                            u.splice($, 1));
                      }
                  }
                return this;
              },
              trigger: function () {
                for (
                  var e = R(), t = arguments.length, s = new Array(t), i = 0;
                  i < t;
                  i++
                )
                  s[i] = arguments[i];
                for (
                  var n = s[0].split(' '), r = s[1], a = 0;
                  a < n.length;
                  a += 1
                )
                  for (var o = n[a], l = 0; l < this.length; l += 1) {
                    var c = this[l];
                    if (e.CustomEvent) {
                      var p = new e.CustomEvent(o, {
                        detail: r,
                        bubbles: !0,
                        cancelable: !0,
                      });
                      (c.dom7EventData = s.filter(function (e, t) {
                        return t > 0;
                      })),
                        c.dispatchEvent(p),
                        (c.dom7EventData = []),
                        delete c.dom7EventData;
                    }
                  }
                return this;
              },
              transitionEnd: function (e) {
                var t = this;
                return (
                  e &&
                    t.on('transitionend', function s(i) {
                      i.target === this &&
                        (e.call(this, i), t.off('transitionend', s));
                    }),
                  this
                );
              },
              outerWidth: function (e) {
                if (this.length > 0) {
                  if (e) {
                    var t = this.styles();
                    return (
                      this[0].offsetWidth +
                      parseFloat(t.getPropertyValue('margin-right')) +
                      parseFloat(t.getPropertyValue('margin-left'))
                    );
                  }
                  return this[0].offsetWidth;
                }
                return null;
              },
              outerHeight: function (e) {
                if (this.length > 0) {
                  if (e) {
                    var t = this.styles();
                    return (
                      this[0].offsetHeight +
                      parseFloat(t.getPropertyValue('margin-top')) +
                      parseFloat(t.getPropertyValue('margin-bottom'))
                    );
                  }
                  return this[0].offsetHeight;
                }
                return null;
              },
              styles: function () {
                var e = R();
                return this[0] ? e.getComputedStyle(this[0], null) : {};
              },
              offset: function () {
                if (this.length > 0) {
                  var e = R(),
                    t = X(),
                    s = this[0],
                    i = s.getBoundingClientRect(),
                    n = t.body,
                    r = s.clientTop || n.clientTop || 0,
                    a = s.clientLeft || n.clientLeft || 0,
                    o = s === e ? e.scrollY : s.scrollTop,
                    l = s === e ? e.scrollX : s.scrollLeft;
                  return { top: i.top + o - r, left: i.left + l - a };
                }
                return null;
              },
              css: function (e, t) {
                var s,
                  i = R();
                if (1 === arguments.length) {
                  if ('string' != typeof e) {
                    for (s = 0; s < this.length; s += 1)
                      for (var n in e) this[s].style[n] = e[n];
                    return this;
                  }
                  if (this[0])
                    return i
                      .getComputedStyle(this[0], null)
                      .getPropertyValue(e);
                }
                if (2 === arguments.length && 'string' == typeof e) {
                  for (s = 0; s < this.length; s += 1) this[s].style[e] = t;
                  return this;
                }
                return this;
              },
              each: function (e) {
                return e
                  ? (this.forEach(function (t, s) {
                      e.apply(t, [t, s]);
                    }),
                    this)
                  : this;
              },
              html: function (e) {
                if (void 0 === e) return this[0] ? this[0].innerHTML : null;
                for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
                return this;
              },
              text: function (e) {
                if (void 0 === e)
                  return this[0] ? this[0].textContent.trim() : null;
                for (var t = 0; t < this.length; t += 1)
                  this[t].textContent = e;
                return this;
              },
              is: function (e) {
                var t,
                  s,
                  i = R(),
                  n = X(),
                  r = this[0];
                if (!r || void 0 === e) return !1;
                if ('string' == typeof e) {
                  if (r.matches) return r.matches(e);
                  if (r.webkitMatchesSelector)
                    return r.webkitMatchesSelector(e);
                  if (r.msMatchesSelector) return r.msMatchesSelector(e);
                  for (t = se(e), s = 0; s < t.length; s += 1)
                    if (t[s] === r) return !0;
                  return !1;
                }
                if (e === n) return r === n;
                if (e === i) return r === i;
                if (e.nodeType || e instanceof J) {
                  for (t = e.nodeType ? [e] : e, s = 0; s < t.length; s += 1)
                    if (t[s] === r) return !0;
                  return !1;
                }
                return !1;
              },
              index: function () {
                var e,
                  t = this[0];
                if (t) {
                  for (e = 0; null !== (t = t.previousSibling); )
                    1 === t.nodeType && (e += 1);
                  return e;
                }
              },
              eq: function (e) {
                if (void 0 === e) return this;
                var t = this.length;
                if (e > t - 1) return se([]);
                if (e < 0) {
                  var s = t + e;
                  return se(s < 0 ? [] : [this[s]]);
                }
                return se([this[e]]);
              },
              append: function () {
                for (var e, t = X(), s = 0; s < arguments.length; s += 1) {
                  e = s < 0 || arguments.length <= s ? void 0 : arguments[s];
                  for (var i = 0; i < this.length; i += 1)
                    if ('string' == typeof e) {
                      var n = t.createElement('div');
                      for (n.innerHTML = e; n.firstChild; )
                        this[i].appendChild(n.firstChild);
                    } else if (e instanceof J)
                      for (var r = 0; r < e.length; r += 1)
                        this[i].appendChild(e[r]);
                    else this[i].appendChild(e);
                }
                return this;
              },
              prepend: function (e) {
                var t,
                  s,
                  i = X();
                for (t = 0; t < this.length; t += 1)
                  if ('string' == typeof e) {
                    var n = i.createElement('div');
                    for (
                      n.innerHTML = e, s = n.childNodes.length - 1;
                      s >= 0;
                      s -= 1
                    )
                      this[t].insertBefore(
                        n.childNodes[s],
                        this[t].childNodes[0],
                      );
                  } else if (e instanceof J)
                    for (s = 0; s < e.length; s += 1)
                      this[t].insertBefore(e[s], this[t].childNodes[0]);
                  else this[t].insertBefore(e, this[t].childNodes[0]);
                return this;
              },
              next: function (e) {
                return this.length > 0
                  ? e
                    ? this[0].nextElementSibling &&
                      se(this[0].nextElementSibling).is(e)
                      ? se([this[0].nextElementSibling])
                      : se([])
                    : this[0].nextElementSibling
                    ? se([this[0].nextElementSibling])
                    : se([])
                  : se([]);
              },
              nextAll: function (e) {
                var t = [],
                  s = this[0];
                if (!s) return se([]);
                for (; s.nextElementSibling; ) {
                  var i = s.nextElementSibling;
                  e ? se(i).is(e) && t.push(i) : t.push(i), (s = i);
                }
                return se(t);
              },
              prev: function (e) {
                if (this.length > 0) {
                  var t = this[0];
                  return e
                    ? t.previousElementSibling &&
                      se(t.previousElementSibling).is(e)
                      ? se([t.previousElementSibling])
                      : se([])
                    : t.previousElementSibling
                    ? se([t.previousElementSibling])
                    : se([]);
                }
                return se([]);
              },
              prevAll: function (e) {
                var t = [],
                  s = this[0];
                if (!s) return se([]);
                for (; s.previousElementSibling; ) {
                  var i = s.previousElementSibling;
                  e ? se(i).is(e) && t.push(i) : t.push(i), (s = i);
                }
                return se(t);
              },
              parent: function (e) {
                for (var t = [], s = 0; s < this.length; s += 1)
                  null !== this[s].parentNode &&
                    (e
                      ? se(this[s].parentNode).is(e) &&
                        t.push(this[s].parentNode)
                      : t.push(this[s].parentNode));
                return se(t);
              },
              parents: function (e) {
                for (var t = [], s = 0; s < this.length; s += 1)
                  for (var i = this[s].parentNode; i; )
                    e ? se(i).is(e) && t.push(i) : t.push(i),
                      (i = i.parentNode);
                return se(t);
              },
              closest: function (e) {
                var t = this;
                return void 0 === e
                  ? se([])
                  : (t.is(e) || (t = t.parents(e).eq(0)), t);
              },
              find: function (e) {
                for (var t = [], s = 0; s < this.length; s += 1)
                  for (
                    var i = this[s].querySelectorAll(e), n = 0;
                    n < i.length;
                    n += 1
                  )
                    t.push(i[n]);
                return se(t);
              },
              children: function (e) {
                for (var t = [], s = 0; s < this.length; s += 1)
                  for (var i = this[s].children, n = 0; n < i.length; n += 1)
                    (e && !se(i[n]).is(e)) || t.push(i[n]);
                return se(t);
              },
              filter: function (e) {
                return se(te(this, e));
              },
              remove: function () {
                for (var e = 0; e < this.length; e += 1)
                  this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this;
              },
            };
            Object.keys(re).forEach(function (e) {
              se.fn[e] = re[e];
            });
            var ae,
              oe,
              le,
              ce = se;
            function pe(e, t) {
              return void 0 === t && (t = 0), setTimeout(e, t);
            }
            function de() {
              return Date.now();
            }
            function ue(e, t) {
              void 0 === t && (t = 'x');
              var s,
                i,
                n,
                r = R(),
                a = r.getComputedStyle(e, null);
              return (
                r.WebKitCSSMatrix
                  ? ((i = a.transform || a.webkitTransform).split(',').length >
                      6 &&
                      (i = i
                        .split(', ')
                        .map(function (e) {
                          return e.replace(',', '.');
                        })
                        .join(', ')),
                    (n = new r.WebKitCSSMatrix('none' === i ? '' : i)))
                  : (s = (n =
                      a.MozTransform ||
                      a.OTransform ||
                      a.MsTransform ||
                      a.msTransform ||
                      a.transform ||
                      a
                        .getPropertyValue('transform')
                        .replace('translate(', 'matrix(1, 0, 0, 1,'))
                      .toString()
                      .split(',')),
                'x' === t &&
                  (i = r.WebKitCSSMatrix
                    ? n.m41
                    : 16 === s.length
                    ? parseFloat(s[12])
                    : parseFloat(s[4])),
                'y' === t &&
                  (i = r.WebKitCSSMatrix
                    ? n.m42
                    : 16 === s.length
                    ? parseFloat(s[13])
                    : parseFloat(s[5])),
                i || 0
              );
            }
            function $e(e) {
              return (
                'object' == typeof e &&
                null !== e &&
                e.constructor &&
                e.constructor === Object
              );
            }
            function fe() {
              for (
                var e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
                  t = 1;
                t < arguments.length;
                t += 1
              ) {
                var s = t < 0 || arguments.length <= t ? void 0 : arguments[t];
                if (null != s)
                  for (
                    var i = Object.keys(Object(s)), n = 0, r = i.length;
                    n < r;
                    n += 1
                  ) {
                    var a = i[n],
                      o = Object.getOwnPropertyDescriptor(s, a);
                    void 0 !== o &&
                      o.enumerable &&
                      ($e(e[a]) && $e(s[a])
                        ? fe(e[a], s[a])
                        : !$e(e[a]) && $e(s[a])
                        ? ((e[a] = {}), fe(e[a], s[a]))
                        : (e[a] = s[a]));
                  }
              }
              return e;
            }
            function me(e, t) {
              Object.keys(t).forEach(function (s) {
                $e(t[s]) &&
                  Object.keys(t[s]).forEach(function (i) {
                    'function' == typeof t[s][i] && (t[s][i] = t[s][i].bind(e));
                  }),
                  (e[s] = t[s]);
              });
            }
            function he() {
              return (
                ae ||
                  (ae = (function () {
                    var e = R(),
                      t = X();
                    return {
                      touch: !!(
                        'ontouchstart' in e ||
                        (e.DocumentTouch && t instanceof e.DocumentTouch)
                      ),
                      pointerEvents:
                        !!e.PointerEvent &&
                        'maxTouchPoints' in e.navigator &&
                        e.navigator.maxTouchPoints >= 0,
                      observer:
                        'MutationObserver' in e ||
                        'WebkitMutationObserver' in e,
                      passiveListener: (function () {
                        var t = !1;
                        try {
                          var s = Object.defineProperty({}, 'passive', {
                            get: function () {
                              t = !0;
                            },
                          });
                          e.addEventListener('testPassiveListener', null, s);
                        } catch (e) {}
                        return t;
                      })(),
                      gestures: 'ongesturestart' in e,
                    };
                  })()),
                ae
              );
            }
            function ge(e) {
              return (
                void 0 === e && (e = {}),
                oe ||
                  (oe = (function (e) {
                    var t = (void 0 === e ? {} : e).userAgent,
                      s = he(),
                      i = R(),
                      n = i.navigator.platform,
                      r = t || i.navigator.userAgent,
                      a = { ios: !1, android: !1 },
                      o = i.screen.width,
                      l = i.screen.height,
                      c = r.match(/(Android);?[\s\/]+([\d.]+)?/),
                      p = r.match(/(iPad).*OS\s([\d_]+)/),
                      d = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                      u = !p && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                      $ = 'Win32' === n,
                      f = 'MacIntel' === n;
                    return (
                      !p &&
                        f &&
                        s.touch &&
                        [
                          '1024x1366',
                          '1366x1024',
                          '834x1194',
                          '1194x834',
                          '834x1112',
                          '1112x834',
                          '768x1024',
                          '1024x768',
                        ].indexOf(o + 'x' + l) >= 0 &&
                        ((p = r.match(/(Version)\/([\d.]+)/)) ||
                          (p = [0, 1, '13_0_0']),
                        (f = !1)),
                      c && !$ && ((a.os = 'android'), (a.android = !0)),
                      (p || u || d) && ((a.os = 'ios'), (a.ios = !0)),
                      a
                    );
                  })(e)),
                oe
              );
            }
            function ve() {
              return (
                le ||
                  (le = (function () {
                    var e,
                      t = R();
                    return {
                      isEdge: !!t.navigator.userAgent.match(/Edge/g),
                      isSafari:
                        ((e = t.navigator.userAgent.toLowerCase()),
                        e.indexOf('safari') >= 0 &&
                          e.indexOf('chrome') < 0 &&
                          e.indexOf('android') < 0),
                      isWebView:
                        /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                          t.navigator.userAgent,
                        ),
                    };
                  })()),
                le
              );
            }
            var we = {
              name: 'resize',
              create: function () {
                var e = this;
                fe(e, {
                  resize: {
                    resizeHandler: function () {
                      e &&
                        !e.destroyed &&
                        e.initialized &&
                        (e.emit('beforeResize'), e.emit('resize'));
                    },
                    orientationChangeHandler: function () {
                      e &&
                        !e.destroyed &&
                        e.initialized &&
                        e.emit('orientationchange');
                    },
                  },
                });
              },
              on: {
                init: function (e) {
                  var t = R();
                  t.addEventListener('resize', e.resize.resizeHandler),
                    t.addEventListener(
                      'orientationchange',
                      e.resize.orientationChangeHandler,
                    );
                },
                destroy: function (e) {
                  var t = R();
                  t.removeEventListener('resize', e.resize.resizeHandler),
                    t.removeEventListener(
                      'orientationchange',
                      e.resize.orientationChangeHandler,
                    );
                },
              },
            };
            function Se() {
              return (Se =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var xe = {
                attach: function (e, t) {
                  void 0 === t && (t = {});
                  var s = R(),
                    i = this,
                    n = new (s.MutationObserver || s.WebkitMutationObserver)(
                      function (e) {
                        if (1 !== e.length) {
                          var t = function () {
                            i.emit('observerUpdate', e[0]);
                          };
                          s.requestAnimationFrame
                            ? s.requestAnimationFrame(t)
                            : s.setTimeout(t, 0);
                        } else i.emit('observerUpdate', e[0]);
                      },
                    );
                  n.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData:
                      void 0 === t.characterData || t.characterData,
                  }),
                    i.observer.observers.push(n);
                },
                init: function () {
                  if (this.support.observer && this.params.observer) {
                    if (this.params.observeParents)
                      for (
                        var e = this.$el.parents(), t = 0;
                        t < e.length;
                        t += 1
                      )
                        this.observer.attach(e[t]);
                    this.observer.attach(this.$el[0], {
                      childList: this.params.observeSlideChildren,
                    }),
                      this.observer.attach(this.$wrapperEl[0], {
                        attributes: !1,
                      });
                  }
                },
                destroy: function () {
                  this.observer.observers.forEach(function (e) {
                    e.disconnect();
                  }),
                    (this.observer.observers = []);
                },
              },
              ye = {
                name: 'observer',
                params: {
                  observer: !1,
                  observeParents: !1,
                  observeSlideChildren: !1,
                },
                create: function () {
                  me(this, { observer: Se(Se({}, xe), {}, { observers: [] }) });
                },
                on: {
                  init: function (e) {
                    e.observer.init();
                  },
                  destroy: function (e) {
                    e.observer.destroy();
                  },
                },
              };
            function be(e) {
              var t = X(),
                s = R(),
                i = this.touchEventsData,
                n = this.params,
                r = this.touches;
              if (!this.animating || !n.preventInteractionOnTransition) {
                var a = e;
                a.originalEvent && (a = a.originalEvent);
                var o = ce(a.target);
                if (
                  ('wrapper' !== n.touchEventsTarget ||
                    o.closest(this.wrapperEl).length) &&
                  ((i.isTouchEvent = 'touchstart' === a.type),
                  (i.isTouchEvent || !('which' in a) || 3 !== a.which) &&
                    !(
                      (!i.isTouchEvent && 'button' in a && a.button > 0) ||
                      (i.isTouched && i.isMoved)
                    ))
                )
                  if (
                    n.noSwiping &&
                    o.closest(
                      n.noSwipingSelector
                        ? n.noSwipingSelector
                        : '.' + n.noSwipingClass,
                    )[0]
                  )
                    this.allowClick = !0;
                  else if (!n.swipeHandler || o.closest(n.swipeHandler)[0]) {
                    (r.currentX =
                      'touchstart' === a.type
                        ? a.targetTouches[0].pageX
                        : a.pageX),
                      (r.currentY =
                        'touchstart' === a.type
                          ? a.targetTouches[0].pageY
                          : a.pageY);
                    var l = r.currentX,
                      c = r.currentY,
                      p = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
                      d = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
                    if (!p || !(l <= d || l >= s.screen.width - d)) {
                      if (
                        (fe(i, {
                          isTouched: !0,
                          isMoved: !1,
                          allowTouchCallbacks: !0,
                          isScrolling: void 0,
                          startMoving: void 0,
                        }),
                        (r.startX = l),
                        (r.startY = c),
                        (i.touchStartTime = de()),
                        (this.allowClick = !0),
                        this.updateSize(),
                        (this.swipeDirection = void 0),
                        n.threshold > 0 && (i.allowThresholdMove = !1),
                        'touchstart' !== a.type)
                      ) {
                        var u = !0;
                        o.is(i.formElements) && (u = !1),
                          t.activeElement &&
                            ce(t.activeElement).is(i.formElements) &&
                            t.activeElement !== o[0] &&
                            t.activeElement.blur();
                        var $ =
                          u &&
                          this.allowTouchMove &&
                          n.touchStartPreventDefault;
                        (n.touchStartForcePreventDefault || $) &&
                          a.preventDefault();
                      }
                      this.emit('touchStart', a);
                    }
                  }
              }
            }
            function Ee(e) {
              var t = X(),
                s = this.touchEventsData,
                i = this.params,
                n = this.touches,
                r = this.rtlTranslate,
                a = e;
              if ((a.originalEvent && (a = a.originalEvent), s.isTouched)) {
                if (!s.isTouchEvent || 'touchmove' === a.type) {
                  var o =
                      'touchmove' === a.type &&
                      a.targetTouches &&
                      (a.targetTouches[0] || a.changedTouches[0]),
                    l = 'touchmove' === a.type ? o.pageX : a.pageX,
                    c = 'touchmove' === a.type ? o.pageY : a.pageY;
                  if (a.preventedByNestedSwiper)
                    return (n.startX = l), void (n.startY = c);
                  if (!this.allowTouchMove)
                    return (
                      (this.allowClick = !1),
                      void (
                        s.isTouched &&
                        (fe(n, {
                          startX: l,
                          startY: c,
                          currentX: l,
                          currentY: c,
                        }),
                        (s.touchStartTime = de()))
                      )
                    );
                  if (s.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
                    if (this.isVertical()) {
                      if (
                        (c < n.startY &&
                          this.translate <= this.maxTranslate()) ||
                        (c > n.startY && this.translate >= this.minTranslate())
                      )
                        return (s.isTouched = !1), void (s.isMoved = !1);
                    } else if (
                      (l < n.startX && this.translate <= this.maxTranslate()) ||
                      (l > n.startX && this.translate >= this.minTranslate())
                    )
                      return;
                  if (
                    s.isTouchEvent &&
                    t.activeElement &&
                    a.target === t.activeElement &&
                    ce(a.target).is(s.formElements)
                  )
                    return (s.isMoved = !0), void (this.allowClick = !1);
                  if (
                    (s.allowTouchCallbacks && this.emit('touchMove', a),
                    !(a.targetTouches && a.targetTouches.length > 1))
                  ) {
                    (n.currentX = l), (n.currentY = c);
                    var p,
                      d = n.currentX - n.startX,
                      u = n.currentY - n.startY;
                    if (
                      !(
                        this.params.threshold &&
                        Math.sqrt(Math.pow(d, 2) + Math.pow(u, 2)) <
                          this.params.threshold
                      )
                    )
                      if (
                        (void 0 === s.isScrolling &&
                          ((this.isHorizontal() && n.currentY === n.startY) ||
                          (this.isVertical() && n.currentX === n.startX)
                            ? (s.isScrolling = !1)
                            : d * d + u * u >= 25 &&
                              ((p =
                                (180 * Math.atan2(Math.abs(u), Math.abs(d))) /
                                Math.PI),
                              (s.isScrolling = this.isHorizontal()
                                ? p > i.touchAngle
                                : 90 - p > i.touchAngle))),
                        s.isScrolling && this.emit('touchMoveOpposite', a),
                        void 0 === s.startMoving &&
                          ((n.currentX === n.startX &&
                            n.currentY === n.startY) ||
                            (s.startMoving = !0)),
                        s.isScrolling)
                      )
                        s.isTouched = !1;
                      else if (s.startMoving) {
                        (this.allowClick = !1),
                          !i.cssMode && a.cancelable && a.preventDefault(),
                          i.touchMoveStopPropagation &&
                            !i.nested &&
                            a.stopPropagation(),
                          s.isMoved ||
                            (i.loop && this.loopFix(),
                            (s.startTranslate = this.getTranslate()),
                            this.setTransition(0),
                            this.animating &&
                              this.$wrapperEl.trigger(
                                'webkitTransitionEnd transitionend',
                              ),
                            (s.allowMomentumBounce = !1),
                            !i.grabCursor ||
                              (!0 !== this.allowSlideNext &&
                                !0 !== this.allowSlidePrev) ||
                              this.setGrabCursor(!0),
                            this.emit('sliderFirstMove', a)),
                          this.emit('sliderMove', a),
                          (s.isMoved = !0);
                        var $ = this.isHorizontal() ? d : u;
                        (n.diff = $),
                          ($ *= i.touchRatio),
                          r && ($ = -$),
                          (this.swipeDirection = $ > 0 ? 'prev' : 'next'),
                          (s.currentTranslate = $ + s.startTranslate);
                        var f = !0,
                          m = i.resistanceRatio;
                        if (
                          (i.touchReleaseOnEdges && (m = 0),
                          $ > 0 && s.currentTranslate > this.minTranslate()
                            ? ((f = !1),
                              i.resistance &&
                                (s.currentTranslate =
                                  this.minTranslate() -
                                  1 +
                                  Math.pow(
                                    -this.minTranslate() + s.startTranslate + $,
                                    m,
                                  )))
                            : $ < 0 &&
                              s.currentTranslate < this.maxTranslate() &&
                              ((f = !1),
                              i.resistance &&
                                (s.currentTranslate =
                                  this.maxTranslate() +
                                  1 -
                                  Math.pow(
                                    this.maxTranslate() - s.startTranslate - $,
                                    m,
                                  ))),
                          f && (a.preventedByNestedSwiper = !0),
                          !this.allowSlideNext &&
                            'next' === this.swipeDirection &&
                            s.currentTranslate < s.startTranslate &&
                            (s.currentTranslate = s.startTranslate),
                          !this.allowSlidePrev &&
                            'prev' === this.swipeDirection &&
                            s.currentTranslate > s.startTranslate &&
                            (s.currentTranslate = s.startTranslate),
                          i.threshold > 0)
                        ) {
                          if (
                            !(Math.abs($) > i.threshold || s.allowThresholdMove)
                          )
                            return void (s.currentTranslate = s.startTranslate);
                          if (!s.allowThresholdMove)
                            return (
                              (s.allowThresholdMove = !0),
                              (n.startX = n.currentX),
                              (n.startY = n.currentY),
                              (s.currentTranslate = s.startTranslate),
                              void (n.diff = this.isHorizontal()
                                ? n.currentX - n.startX
                                : n.currentY - n.startY)
                            );
                        }
                        i.followFinger &&
                          !i.cssMode &&
                          ((i.freeMode ||
                            i.watchSlidesProgress ||
                            i.watchSlidesVisibility) &&
                            (this.updateActiveIndex(),
                            this.updateSlidesClasses()),
                          i.freeMode &&
                            (0 === s.velocities.length &&
                              s.velocities.push({
                                position:
                                  n[this.isHorizontal() ? 'startX' : 'startY'],
                                time: s.touchStartTime,
                              }),
                            s.velocities.push({
                              position:
                                n[
                                  this.isHorizontal() ? 'currentX' : 'currentY'
                                ],
                              time: de(),
                            })),
                          this.updateProgress(s.currentTranslate),
                          this.setTranslate(s.currentTranslate));
                      }
                  }
                }
              } else
                s.startMoving &&
                  s.isScrolling &&
                  this.emit('touchMoveOpposite', a);
            }
            function Ce(e) {
              var t = this,
                s = t.touchEventsData,
                i = t.params,
                n = t.touches,
                r = t.rtlTranslate,
                a = t.$wrapperEl,
                o = t.slidesGrid,
                l = t.snapGrid,
                c = e;
              if (
                (c.originalEvent && (c = c.originalEvent),
                s.allowTouchCallbacks && t.emit('touchEnd', c),
                (s.allowTouchCallbacks = !1),
                !s.isTouched)
              )
                return (
                  s.isMoved && i.grabCursor && t.setGrabCursor(!1),
                  (s.isMoved = !1),
                  void (s.startMoving = !1)
                );
              i.grabCursor &&
                s.isMoved &&
                s.isTouched &&
                (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
                t.setGrabCursor(!1);
              var p,
                d = de(),
                u = d - s.touchStartTime;
              if (
                (t.allowClick &&
                  (t.updateClickedSlide(c),
                  t.emit('tap click', c),
                  u < 300 &&
                    d - s.lastClickTime < 300 &&
                    t.emit('doubleTap doubleClick', c)),
                (s.lastClickTime = de()),
                pe(function () {
                  t.destroyed || (t.allowClick = !0);
                }),
                !s.isTouched ||
                  !s.isMoved ||
                  !t.swipeDirection ||
                  0 === n.diff ||
                  s.currentTranslate === s.startTranslate)
              )
                return (
                  (s.isTouched = !1),
                  (s.isMoved = !1),
                  void (s.startMoving = !1)
                );
              if (
                ((s.isTouched = !1),
                (s.isMoved = !1),
                (s.startMoving = !1),
                (p = i.followFinger
                  ? r
                    ? t.translate
                    : -t.translate
                  : -s.currentTranslate),
                !i.cssMode)
              )
                if (i.freeMode) {
                  if (p < -t.minTranslate())
                    return void t.slideTo(t.activeIndex);
                  if (p > -t.maxTranslate())
                    return void (t.slides.length < l.length
                      ? t.slideTo(l.length - 1)
                      : t.slideTo(t.slides.length - 1));
                  if (i.freeModeMomentum) {
                    if (s.velocities.length > 1) {
                      var $ = s.velocities.pop(),
                        f = s.velocities.pop(),
                        m = $.position - f.position,
                        h = $.time - f.time;
                      (t.velocity = m / h),
                        (t.velocity /= 2),
                        Math.abs(t.velocity) < i.freeModeMinimumVelocity &&
                          (t.velocity = 0),
                        (h > 150 || de() - $.time > 300) && (t.velocity = 0);
                    } else t.velocity = 0;
                    (t.velocity *= i.freeModeMomentumVelocityRatio),
                      (s.velocities.length = 0);
                    var g = 1e3 * i.freeModeMomentumRatio,
                      v = t.velocity * g,
                      w = t.translate + v;
                    r && (w = -w);
                    var S,
                      x,
                      y = !1,
                      b =
                        20 *
                        Math.abs(t.velocity) *
                        i.freeModeMomentumBounceRatio;
                    if (w < t.maxTranslate())
                      i.freeModeMomentumBounce
                        ? (w + t.maxTranslate() < -b &&
                            (w = t.maxTranslate() - b),
                          (S = t.maxTranslate()),
                          (y = !0),
                          (s.allowMomentumBounce = !0))
                        : (w = t.maxTranslate()),
                        i.loop && i.centeredSlides && (x = !0);
                    else if (w > t.minTranslate())
                      i.freeModeMomentumBounce
                        ? (w - t.minTranslate() > b &&
                            (w = t.minTranslate() + b),
                          (S = t.minTranslate()),
                          (y = !0),
                          (s.allowMomentumBounce = !0))
                        : (w = t.minTranslate()),
                        i.loop && i.centeredSlides && (x = !0);
                    else if (i.freeModeSticky) {
                      for (var E, C = 0; C < l.length; C += 1)
                        if (l[C] > -w) {
                          E = C;
                          break;
                        }
                      w = -(w =
                        Math.abs(l[E] - w) < Math.abs(l[E - 1] - w) ||
                        'next' === t.swipeDirection
                          ? l[E]
                          : l[E - 1]);
                    }
                    if (
                      (x &&
                        t.once('transitionEnd', function () {
                          t.loopFix();
                        }),
                      0 !== t.velocity)
                    ) {
                      if (
                        ((g = r
                          ? Math.abs((-w - t.translate) / t.velocity)
                          : Math.abs((w - t.translate) / t.velocity)),
                        i.freeModeSticky)
                      ) {
                        var T = Math.abs((r ? -w : w) - t.translate),
                          k = t.slidesSizesGrid[t.activeIndex];
                        g =
                          T < k
                            ? i.speed
                            : T < 2 * k
                            ? 1.5 * i.speed
                            : 2.5 * i.speed;
                      }
                    } else if (i.freeModeSticky) return void t.slideToClosest();
                    i.freeModeMomentumBounce && y
                      ? (t.updateProgress(S),
                        t.setTransition(g),
                        t.setTranslate(w),
                        t.transitionStart(!0, t.swipeDirection),
                        (t.animating = !0),
                        a.transitionEnd(function () {
                          t &&
                            !t.destroyed &&
                            s.allowMomentumBounce &&
                            (t.emit('momentumBounce'),
                            t.setTransition(i.speed),
                            setTimeout(function () {
                              t.setTranslate(S),
                                a.transitionEnd(function () {
                                  t && !t.destroyed && t.transitionEnd();
                                });
                            }, 0));
                        }))
                      : t.velocity
                      ? (t.updateProgress(w),
                        t.setTransition(g),
                        t.setTranslate(w),
                        t.transitionStart(!0, t.swipeDirection),
                        t.animating ||
                          ((t.animating = !0),
                          a.transitionEnd(function () {
                            t && !t.destroyed && t.transitionEnd();
                          })))
                      : t.updateProgress(w),
                      t.updateActiveIndex(),
                      t.updateSlidesClasses();
                  } else if (i.freeModeSticky) return void t.slideToClosest();
                  (!i.freeModeMomentum || u >= i.longSwipesMs) &&
                    (t.updateProgress(),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses());
                } else {
                  for (
                    var M = 0, P = t.slidesSizesGrid[0], z = 0;
                    z < o.length;
                    z += z < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
                  ) {
                    var j = z < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
                    void 0 !== o[z + j]
                      ? p >= o[z] &&
                        p < o[z + j] &&
                        ((M = z), (P = o[z + j] - o[z]))
                      : p >= o[z] &&
                        ((M = z), (P = o[o.length - 1] - o[o.length - 2]));
                  }
                  var L = (p - o[M]) / P,
                    O = M < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
                  if (u > i.longSwipesMs) {
                    if (!i.longSwipes) return void t.slideTo(t.activeIndex);
                    'next' === t.swipeDirection &&
                      (L >= i.longSwipesRatio
                        ? t.slideTo(M + O)
                        : t.slideTo(M)),
                      'prev' === t.swipeDirection &&
                        (L > 1 - i.longSwipesRatio
                          ? t.slideTo(M + O)
                          : t.slideTo(M));
                  } else {
                    if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
                    !t.navigation ||
                    (c.target !== t.navigation.nextEl &&
                      c.target !== t.navigation.prevEl)
                      ? ('next' === t.swipeDirection && t.slideTo(M + O),
                        'prev' === t.swipeDirection && t.slideTo(M))
                      : c.target === t.navigation.nextEl
                      ? t.slideTo(M + O)
                      : t.slideTo(M);
                  }
                }
            }
            function Te() {
              var e = this.params,
                t = this.el;
              if (!t || 0 !== t.offsetWidth) {
                e.breakpoints && this.setBreakpoint();
                var s = this.allowSlideNext,
                  i = this.allowSlidePrev,
                  n = this.snapGrid;
                (this.allowSlideNext = !0),
                  (this.allowSlidePrev = !0),
                  this.updateSize(),
                  this.updateSlides(),
                  this.updateSlidesClasses(),
                  ('auto' === e.slidesPerView || e.slidesPerView > 1) &&
                  this.isEnd &&
                  !this.isBeginning &&
                  !this.params.centeredSlides
                    ? this.slideTo(this.slides.length - 1, 0, !1, !0)
                    : this.slideTo(this.activeIndex, 0, !1, !0),
                  this.autoplay &&
                    this.autoplay.running &&
                    this.autoplay.paused &&
                    this.autoplay.run(),
                  (this.allowSlidePrev = i),
                  (this.allowSlideNext = s),
                  this.params.watchOverflow &&
                    n !== this.snapGrid &&
                    this.checkOverflow();
              }
            }
            function ke(e) {
              this.allowClick ||
                (this.params.preventClicks && e.preventDefault(),
                this.params.preventClicksPropagation &&
                  this.animating &&
                  (e.stopPropagation(), e.stopImmediatePropagation()));
            }
            function Me() {
              var e = this.wrapperEl,
                t = this.rtlTranslate;
              (this.previousTranslate = this.translate),
                this.isHorizontal()
                  ? (this.translate = t
                      ? e.scrollWidth - e.offsetWidth - e.scrollLeft
                      : -e.scrollLeft)
                  : (this.translate = -e.scrollTop),
                -0 === this.translate && (this.translate = 0),
                this.updateActiveIndex(),
                this.updateSlidesClasses();
              var s = this.maxTranslate() - this.minTranslate();
              (0 === s ? 0 : (this.translate - this.minTranslate()) / s) !==
                this.progress &&
                this.updateProgress(t ? -this.translate : this.translate),
                this.emit('setTranslate', this.translate, !1);
            }
            var Pe = !1;
            function ze() {}
            var je = {
              init: !0,
              direction: 'horizontal',
              touchEventsTarget: 'container',
              initialSlide: 0,
              speed: 300,
              cssMode: !1,
              updateOnWindowResize: !0,
              width: null,
              height: null,
              preventInteractionOnTransition: !1,
              userAgent: null,
              url: null,
              edgeSwipeDetection: !1,
              edgeSwipeThreshold: 20,
              freeMode: !1,
              freeModeMomentum: !0,
              freeModeMomentumRatio: 1,
              freeModeMomentumBounce: !0,
              freeModeMomentumBounceRatio: 1,
              freeModeMomentumVelocityRatio: 1,
              freeModeSticky: !1,
              freeModeMinimumVelocity: 0.02,
              autoHeight: !1,
              setWrapperSize: !1,
              virtualTranslate: !1,
              effect: 'slide',
              breakpoints: void 0,
              spaceBetween: 0,
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerColumnFill: 'column',
              slidesPerGroup: 1,
              slidesPerGroupSkip: 0,
              centeredSlides: !1,
              centeredSlidesBounds: !1,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0,
              normalizeSlideIndex: !0,
              centerInsufficientSlides: !1,
              watchOverflow: !1,
              roundLengths: !1,
              touchRatio: 1,
              touchAngle: 45,
              simulateTouch: !0,
              shortSwipes: !0,
              longSwipes: !0,
              longSwipesRatio: 0.5,
              longSwipesMs: 300,
              followFinger: !0,
              allowTouchMove: !0,
              threshold: 0,
              touchMoveStopPropagation: !1,
              touchStartPreventDefault: !0,
              touchStartForcePreventDefault: !1,
              touchReleaseOnEdges: !1,
              uniqueNavElements: !0,
              resistance: !0,
              resistanceRatio: 0.85,
              watchSlidesProgress: !1,
              watchSlidesVisibility: !1,
              grabCursor: !1,
              preventClicks: !0,
              preventClicksPropagation: !0,
              slideToClickedSlide: !1,
              preloadImages: !0,
              updateOnImagesReady: !0,
              loop: !1,
              loopAdditionalSlides: 0,
              loopedSlides: null,
              loopFillGroupWithBlank: !1,
              loopPreventsSlide: !0,
              allowSlidePrev: !0,
              allowSlideNext: !0,
              swipeHandler: null,
              noSwiping: !0,
              noSwipingClass: 'swiper-no-swiping',
              noSwipingSelector: null,
              passiveListeners: !0,
              containerModifierClass: 'swiper-container-',
              slideClass: 'swiper-slide',
              slideBlankClass: 'swiper-slide-invisible-blank',
              slideActiveClass: 'swiper-slide-active',
              slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
              slideVisibleClass: 'swiper-slide-visible',
              slideDuplicateClass: 'swiper-slide-duplicate',
              slideNextClass: 'swiper-slide-next',
              slideDuplicateNextClass: 'swiper-slide-duplicate-next',
              slidePrevClass: 'swiper-slide-prev',
              slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
              wrapperClass: 'swiper-wrapper',
              runCallbacksOnInit: !0,
              _emitClasses: !1,
            };
            function Le(e, t) {
              for (var s = 0; s < t.length; s++) {
                var i = t[s];
                (i.enumerable = i.enumerable || !1),
                  (i.configurable = !0),
                  'value' in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i);
              }
            }
            var Oe = {
                modular: {
                  useParams: function (e) {
                    var t = this;
                    t.modules &&
                      Object.keys(t.modules).forEach(function (s) {
                        var i = t.modules[s];
                        i.params && fe(e, i.params);
                      });
                  },
                  useModules: function (e) {
                    void 0 === e && (e = {});
                    var t = this;
                    t.modules &&
                      Object.keys(t.modules).forEach(function (s) {
                        var i = t.modules[s],
                          n = e[s] || {};
                        i.on &&
                          t.on &&
                          Object.keys(i.on).forEach(function (e) {
                            t.on(e, i.on[e]);
                          }),
                          i.create && i.create.bind(t)(n);
                      });
                  },
                },
                eventsEmitter: {
                  on: function (e, t, s) {
                    var i = this;
                    if ('function' != typeof t) return i;
                    var n = s ? 'unshift' : 'push';
                    return (
                      e.split(' ').forEach(function (e) {
                        i.eventsListeners[e] || (i.eventsListeners[e] = []),
                          i.eventsListeners[e][n](t);
                      }),
                      i
                    );
                  },
                  once: function (e, t, s) {
                    var i = this;
                    if ('function' != typeof t) return i;
                    function n() {
                      i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
                      for (
                        var s = arguments.length, r = new Array(s), a = 0;
                        a < s;
                        a++
                      )
                        r[a] = arguments[a];
                      t.apply(i, r);
                    }
                    return (n.__emitterProxy = t), i.on(e, n, s);
                  },
                  onAny: function (e, t) {
                    if ('function' != typeof e) return this;
                    var s = t ? 'unshift' : 'push';
                    return (
                      this.eventsAnyListeners.indexOf(e) < 0 &&
                        this.eventsAnyListeners[s](e),
                      this
                    );
                  },
                  offAny: function (e) {
                    if (!this.eventsAnyListeners) return this;
                    var t = this.eventsAnyListeners.indexOf(e);
                    return t >= 0 && this.eventsAnyListeners.splice(t, 1), this;
                  },
                  off: function (e, t) {
                    var s = this;
                    return s.eventsListeners
                      ? (e.split(' ').forEach(function (e) {
                          void 0 === t
                            ? (s.eventsListeners[e] = [])
                            : s.eventsListeners[e] &&
                              s.eventsListeners[e].forEach(function (i, n) {
                                (i === t ||
                                  (i.__emitterProxy &&
                                    i.__emitterProxy === t)) &&
                                  s.eventsListeners[e].splice(n, 1);
                              });
                        }),
                        s)
                      : s;
                  },
                  emit: function () {
                    var e,
                      t,
                      s,
                      i = this;
                    if (!i.eventsListeners) return i;
                    for (
                      var n = arguments.length, r = new Array(n), a = 0;
                      a < n;
                      a++
                    )
                      r[a] = arguments[a];
                    'string' == typeof r[0] || Array.isArray(r[0])
                      ? ((e = r[0]), (t = r.slice(1, r.length)), (s = i))
                      : ((e = r[0].events),
                        (t = r[0].data),
                        (s = r[0].context || i)),
                      t.unshift(s);
                    var o = Array.isArray(e) ? e : e.split(' ');
                    return (
                      o.forEach(function (e) {
                        if (i.eventsListeners && i.eventsListeners[e]) {
                          var n = [];
                          i.eventsListeners[e].forEach(function (e) {
                            n.push(e);
                          }),
                            n.forEach(function (e) {
                              e.apply(s, t);
                            });
                        }
                      }),
                      i
                    );
                  },
                },
                update: {
                  updateSize: function () {
                    var e,
                      t,
                      s = this.$el;
                    (e =
                      void 0 !== this.params.width && null !== this.params.width
                        ? this.params.width
                        : s[0].clientWidth),
                      (t =
                        void 0 !== this.params.height &&
                        null !== this.params.width
                          ? this.params.height
                          : s[0].clientHeight),
                      (0 === e && this.isHorizontal()) ||
                        (0 === t && this.isVertical()) ||
                        ((e =
                          e -
                          parseInt(s.css('padding-left') || 0, 10) -
                          parseInt(s.css('padding-right') || 0, 10)),
                        (t =
                          t -
                          parseInt(s.css('padding-top') || 0, 10) -
                          parseInt(s.css('padding-bottom') || 0, 10)),
                        Number.isNaN(e) && (e = 0),
                        Number.isNaN(t) && (t = 0),
                        fe(this, {
                          width: e,
                          height: t,
                          size: this.isHorizontal() ? e : t,
                        }));
                  },
                  updateSlides: function () {
                    var e = R(),
                      t = this.params,
                      s = this.$wrapperEl,
                      i = this.size,
                      n = this.rtlTranslate,
                      r = this.wrongRTL,
                      a = this.virtual && t.virtual.enabled,
                      o = a ? this.virtual.slides.length : this.slides.length,
                      l = s.children('.' + this.params.slideClass),
                      c = a ? this.virtual.slides.length : l.length,
                      p = [],
                      d = [],
                      u = [];
                    function $(e, s) {
                      return !t.cssMode || s !== l.length - 1;
                    }
                    var f = t.slidesOffsetBefore;
                    'function' == typeof f &&
                      (f = t.slidesOffsetBefore.call(this));
                    var m = t.slidesOffsetAfter;
                    'function' == typeof m &&
                      (m = t.slidesOffsetAfter.call(this));
                    var h = this.snapGrid.length,
                      g = this.snapGrid.length,
                      v = t.spaceBetween,
                      w = -f,
                      S = 0,
                      x = 0;
                    if (void 0 !== i) {
                      var y, b;
                      'string' == typeof v &&
                        v.indexOf('%') >= 0 &&
                        (v = (parseFloat(v.replace('%', '')) / 100) * i),
                        (this.virtualSize = -v),
                        n
                          ? l.css({ marginLeft: '', marginTop: '' })
                          : l.css({ marginRight: '', marginBottom: '' }),
                        t.slidesPerColumn > 1 &&
                          ((y =
                            Math.floor(c / t.slidesPerColumn) ===
                            c / this.params.slidesPerColumn
                              ? c
                              : Math.ceil(c / t.slidesPerColumn) *
                                t.slidesPerColumn),
                          'auto' !== t.slidesPerView &&
                            'row' === t.slidesPerColumnFill &&
                            (y = Math.max(
                              y,
                              t.slidesPerView * t.slidesPerColumn,
                            )));
                      for (
                        var E,
                          C = t.slidesPerColumn,
                          T = y / C,
                          k = Math.floor(c / t.slidesPerColumn),
                          M = 0;
                        M < c;
                        M += 1
                      ) {
                        b = 0;
                        var P = l.eq(M);
                        if (t.slidesPerColumn > 1) {
                          var z = void 0,
                            j = void 0,
                            L = void 0;
                          if (
                            'row' === t.slidesPerColumnFill &&
                            t.slidesPerGroup > 1
                          ) {
                            var O = Math.floor(
                                M / (t.slidesPerGroup * t.slidesPerColumn),
                              ),
                              I = M - t.slidesPerColumn * t.slidesPerGroup * O,
                              A =
                                0 === O
                                  ? t.slidesPerGroup
                                  : Math.min(
                                      Math.ceil(
                                        (c - O * C * t.slidesPerGroup) / C,
                                      ),
                                      t.slidesPerGroup,
                                    );
                            (z =
                              (j =
                                I -
                                (L = Math.floor(I / A)) * A +
                                O * t.slidesPerGroup) +
                              (L * y) / C),
                              P.css({
                                '-webkit-box-ordinal-group': z,
                                '-moz-box-ordinal-group': z,
                                '-ms-flex-order': z,
                                '-webkit-order': z,
                                order: z,
                              });
                          } else
                            'column' === t.slidesPerColumnFill
                              ? ((L = M - (j = Math.floor(M / C)) * C),
                                (j > k || (j === k && L === C - 1)) &&
                                  (L += 1) >= C &&
                                  ((L = 0), (j += 1)))
                              : (j = M - (L = Math.floor(M / T)) * T);
                          P.css(
                            'margin-' + (this.isHorizontal() ? 'top' : 'left'),
                            0 !== L && t.spaceBetween && t.spaceBetween + 'px',
                          );
                        }
                        if ('none' !== P.css('display')) {
                          if ('auto' === t.slidesPerView) {
                            var D = e.getComputedStyle(P[0], null),
                              N = P[0].style.transform,
                              B = P[0].style.webkitTransform;
                            if (
                              (N && (P[0].style.transform = 'none'),
                              B && (P[0].style.webkitTransform = 'none'),
                              t.roundLengths)
                            )
                              b = this.isHorizontal()
                                ? P.outerWidth(!0)
                                : P.outerHeight(!0);
                            else if (this.isHorizontal()) {
                              var V = parseFloat(
                                  D.getPropertyValue('width') || 0,
                                ),
                                G = parseFloat(
                                  D.getPropertyValue('padding-left') || 0,
                                ),
                                q = parseFloat(
                                  D.getPropertyValue('padding-right') || 0,
                                ),
                                H = parseFloat(
                                  D.getPropertyValue('margin-left') || 0,
                                ),
                                _ = parseFloat(
                                  D.getPropertyValue('margin-right') || 0,
                                ),
                                F = D.getPropertyValue('box-sizing');
                              b =
                                F && 'border-box' === F
                                  ? V + H + _
                                  : V + G + q + H + _;
                            } else {
                              var X = parseFloat(
                                  D.getPropertyValue('height') || 0,
                                ),
                                Y = parseFloat(
                                  D.getPropertyValue('padding-top') || 0,
                                ),
                                W = parseFloat(
                                  D.getPropertyValue('padding-bottom') || 0,
                                ),
                                U = parseFloat(
                                  D.getPropertyValue('margin-top') || 0,
                                ),
                                K = parseFloat(
                                  D.getPropertyValue('margin-bottom') || 0,
                                ),
                                Q = D.getPropertyValue('box-sizing');
                              b =
                                Q && 'border-box' === Q
                                  ? X + U + K
                                  : X + Y + W + U + K;
                            }
                            N && (P[0].style.transform = N),
                              B && (P[0].style.webkitTransform = B),
                              t.roundLengths && (b = Math.floor(b));
                          } else
                            (b =
                              (i - (t.slidesPerView - 1) * v) /
                              t.slidesPerView),
                              t.roundLengths && (b = Math.floor(b)),
                              l[M] &&
                                (this.isHorizontal()
                                  ? (l[M].style.width = b + 'px')
                                  : (l[M].style.height = b + 'px'));
                          l[M] && (l[M].swiperSlideSize = b),
                            u.push(b),
                            t.centeredSlides
                              ? ((w = w + b / 2 + S / 2 + v),
                                0 === S && 0 !== M && (w = w - i / 2 - v),
                                0 === M && (w = w - i / 2 - v),
                                Math.abs(w) < 0.001 && (w = 0),
                                t.roundLengths && (w = Math.floor(w)),
                                x % t.slidesPerGroup == 0 && p.push(w),
                                d.push(w))
                              : (t.roundLengths && (w = Math.floor(w)),
                                (x -
                                  Math.min(this.params.slidesPerGroupSkip, x)) %
                                  this.params.slidesPerGroup ==
                                  0 && p.push(w),
                                d.push(w),
                                (w = w + b + v)),
                            (this.virtualSize += b + v),
                            (S = b),
                            (x += 1);
                        }
                      }
                      if (
                        ((this.virtualSize = Math.max(this.virtualSize, i) + m),
                        n &&
                          r &&
                          ('slide' === t.effect || 'coverflow' === t.effect) &&
                          s.css({
                            width: this.virtualSize + t.spaceBetween + 'px',
                          }),
                        t.setWrapperSize &&
                          (this.isHorizontal()
                            ? s.css({
                                width: this.virtualSize + t.spaceBetween + 'px',
                              })
                            : s.css({
                                height:
                                  this.virtualSize + t.spaceBetween + 'px',
                              })),
                        t.slidesPerColumn > 1 &&
                          ((this.virtualSize = (b + t.spaceBetween) * y),
                          (this.virtualSize =
                            Math.ceil(this.virtualSize / t.slidesPerColumn) -
                            t.spaceBetween),
                          this.isHorizontal()
                            ? s.css({
                                width: this.virtualSize + t.spaceBetween + 'px',
                              })
                            : s.css({
                                height:
                                  this.virtualSize + t.spaceBetween + 'px',
                              }),
                          t.centeredSlides))
                      ) {
                        E = [];
                        for (var Z = 0; Z < p.length; Z += 1) {
                          var J = p[Z];
                          t.roundLengths && (J = Math.floor(J)),
                            p[Z] < this.virtualSize + p[0] && E.push(J);
                        }
                        p = E;
                      }
                      if (!t.centeredSlides) {
                        E = [];
                        for (var ee = 0; ee < p.length; ee += 1) {
                          var te = p[ee];
                          t.roundLengths && (te = Math.floor(te)),
                            p[ee] <= this.virtualSize - i && E.push(te);
                        }
                        (p = E),
                          Math.floor(this.virtualSize - i) -
                            Math.floor(p[p.length - 1]) >
                            1 && p.push(this.virtualSize - i);
                      }
                      if (
                        (0 === p.length && (p = [0]),
                        0 !== t.spaceBetween &&
                          (this.isHorizontal()
                            ? n
                              ? l.filter($).css({ marginLeft: v + 'px' })
                              : l.filter($).css({ marginRight: v + 'px' })
                            : l.filter($).css({ marginBottom: v + 'px' })),
                        t.centeredSlides && t.centeredSlidesBounds)
                      ) {
                        var se = 0;
                        u.forEach(function (e) {
                          se += e + (t.spaceBetween ? t.spaceBetween : 0);
                        });
                        var ie = (se -= t.spaceBetween) - i;
                        p = p.map(function (e) {
                          return e < 0 ? -f : e > ie ? ie + m : e;
                        });
                      }
                      if (t.centerInsufficientSlides) {
                        var ne = 0;
                        if (
                          (u.forEach(function (e) {
                            ne += e + (t.spaceBetween ? t.spaceBetween : 0);
                          }),
                          (ne -= t.spaceBetween) < i)
                        ) {
                          var re = (i - ne) / 2;
                          p.forEach(function (e, t) {
                            p[t] = e - re;
                          }),
                            d.forEach(function (e, t) {
                              d[t] = e + re;
                            });
                        }
                      }
                      fe(this, {
                        slides: l,
                        snapGrid: p,
                        slidesGrid: d,
                        slidesSizesGrid: u,
                      }),
                        c !== o && this.emit('slidesLengthChange'),
                        p.length !== h &&
                          (this.params.watchOverflow && this.checkOverflow(),
                          this.emit('snapGridLengthChange')),
                        d.length !== g && this.emit('slidesGridLengthChange'),
                        (t.watchSlidesProgress || t.watchSlidesVisibility) &&
                          this.updateSlidesOffset();
                    }
                  },
                  updateAutoHeight: function (e) {
                    var t,
                      s = [],
                      i = 0;
                    if (
                      ('number' == typeof e
                        ? this.setTransition(e)
                        : !0 === e && this.setTransition(this.params.speed),
                      'auto' !== this.params.slidesPerView &&
                        this.params.slidesPerView > 1)
                    )
                      if (this.params.centeredSlides)
                        this.visibleSlides.each(function (e) {
                          s.push(e);
                        });
                      else
                        for (
                          t = 0;
                          t < Math.ceil(this.params.slidesPerView);
                          t += 1
                        ) {
                          var n = this.activeIndex + t;
                          if (n > this.slides.length) break;
                          s.push(this.slides.eq(n)[0]);
                        }
                    else s.push(this.slides.eq(this.activeIndex)[0]);
                    for (t = 0; t < s.length; t += 1)
                      if (void 0 !== s[t]) {
                        var r = s[t].offsetHeight;
                        i = r > i ? r : i;
                      }
                    i && this.$wrapperEl.css('height', i + 'px');
                  },
                  updateSlidesOffset: function () {
                    for (var e = this.slides, t = 0; t < e.length; t += 1)
                      e[t].swiperSlideOffset = this.isHorizontal()
                        ? e[t].offsetLeft
                        : e[t].offsetTop;
                  },
                  updateSlidesProgress: function (e) {
                    void 0 === e && (e = (this && this.translate) || 0);
                    var t = this.params,
                      s = this.slides,
                      i = this.rtlTranslate;
                    if (0 !== s.length) {
                      void 0 === s[0].swiperSlideOffset &&
                        this.updateSlidesOffset();
                      var n = -e;
                      i && (n = e),
                        s.removeClass(t.slideVisibleClass),
                        (this.visibleSlidesIndexes = []),
                        (this.visibleSlides = []);
                      for (var r = 0; r < s.length; r += 1) {
                        var a = s[r],
                          o =
                            (n +
                              (t.centeredSlides ? this.minTranslate() : 0) -
                              a.swiperSlideOffset) /
                            (a.swiperSlideSize + t.spaceBetween);
                        if (
                          t.watchSlidesVisibility ||
                          (t.centeredSlides && t.autoHeight)
                        ) {
                          var l = -(n - a.swiperSlideOffset),
                            c = l + this.slidesSizesGrid[r];
                          ((l >= 0 && l < this.size - 1) ||
                            (c > 1 && c <= this.size) ||
                            (l <= 0 && c >= this.size)) &&
                            (this.visibleSlides.push(a),
                            this.visibleSlidesIndexes.push(r),
                            s.eq(r).addClass(t.slideVisibleClass));
                        }
                        a.progress = i ? -o : o;
                      }
                      this.visibleSlides = ce(this.visibleSlides);
                    }
                  },
                  updateProgress: function (e) {
                    if (void 0 === e) {
                      var t = this.rtlTranslate ? -1 : 1;
                      e = (this && this.translate && this.translate * t) || 0;
                    }
                    var s = this.params,
                      i = this.maxTranslate() - this.minTranslate(),
                      n = this.progress,
                      r = this.isBeginning,
                      a = this.isEnd,
                      o = r,
                      l = a;
                    0 === i
                      ? ((n = 0), (r = !0), (a = !0))
                      : ((r = (n = (e - this.minTranslate()) / i) <= 0),
                        (a = n >= 1)),
                      fe(this, { progress: n, isBeginning: r, isEnd: a }),
                      (s.watchSlidesProgress ||
                        s.watchSlidesVisibility ||
                        (s.centeredSlides && s.autoHeight)) &&
                        this.updateSlidesProgress(e),
                      r && !o && this.emit('reachBeginning toEdge'),
                      a && !l && this.emit('reachEnd toEdge'),
                      ((o && !r) || (l && !a)) && this.emit('fromEdge'),
                      this.emit('progress', n);
                  },
                  updateSlidesClasses: function () {
                    var e,
                      t = this.slides,
                      s = this.params,
                      i = this.$wrapperEl,
                      n = this.activeIndex,
                      r = this.realIndex,
                      a = this.virtual && s.virtual.enabled;
                    t.removeClass(
                      s.slideActiveClass +
                        ' ' +
                        s.slideNextClass +
                        ' ' +
                        s.slidePrevClass +
                        ' ' +
                        s.slideDuplicateActiveClass +
                        ' ' +
                        s.slideDuplicateNextClass +
                        ' ' +
                        s.slideDuplicatePrevClass,
                    ),
                      (e = a
                        ? this.$wrapperEl.find(
                            '.' +
                              s.slideClass +
                              '[data-swiper-slide-index="' +
                              n +
                              '"]',
                          )
                        : t.eq(n)).addClass(s.slideActiveClass),
                      s.loop &&
                        (e.hasClass(s.slideDuplicateClass)
                          ? i
                              .children(
                                '.' +
                                  s.slideClass +
                                  ':not(.' +
                                  s.slideDuplicateClass +
                                  ')[data-swiper-slide-index="' +
                                  r +
                                  '"]',
                              )
                              .addClass(s.slideDuplicateActiveClass)
                          : i
                              .children(
                                '.' +
                                  s.slideClass +
                                  '.' +
                                  s.slideDuplicateClass +
                                  '[data-swiper-slide-index="' +
                                  r +
                                  '"]',
                              )
                              .addClass(s.slideDuplicateActiveClass));
                    var o = e
                      .nextAll('.' + s.slideClass)
                      .eq(0)
                      .addClass(s.slideNextClass);
                    s.loop &&
                      0 === o.length &&
                      (o = t.eq(0)).addClass(s.slideNextClass);
                    var l = e
                      .prevAll('.' + s.slideClass)
                      .eq(0)
                      .addClass(s.slidePrevClass);
                    s.loop &&
                      0 === l.length &&
                      (l = t.eq(-1)).addClass(s.slidePrevClass),
                      s.loop &&
                        (o.hasClass(s.slideDuplicateClass)
                          ? i
                              .children(
                                '.' +
                                  s.slideClass +
                                  ':not(.' +
                                  s.slideDuplicateClass +
                                  ')[data-swiper-slide-index="' +
                                  o.attr('data-swiper-slide-index') +
                                  '"]',
                              )
                              .addClass(s.slideDuplicateNextClass)
                          : i
                              .children(
                                '.' +
                                  s.slideClass +
                                  '.' +
                                  s.slideDuplicateClass +
                                  '[data-swiper-slide-index="' +
                                  o.attr('data-swiper-slide-index') +
                                  '"]',
                              )
                              .addClass(s.slideDuplicateNextClass),
                        l.hasClass(s.slideDuplicateClass)
                          ? i
                              .children(
                                '.' +
                                  s.slideClass +
                                  ':not(.' +
                                  s.slideDuplicateClass +
                                  ')[data-swiper-slide-index="' +
                                  l.attr('data-swiper-slide-index') +
                                  '"]',
                              )
                              .addClass(s.slideDuplicatePrevClass)
                          : i
                              .children(
                                '.' +
                                  s.slideClass +
                                  '.' +
                                  s.slideDuplicateClass +
                                  '[data-swiper-slide-index="' +
                                  l.attr('data-swiper-slide-index') +
                                  '"]',
                              )
                              .addClass(s.slideDuplicatePrevClass)),
                      this.emitSlidesClasses();
                  },
                  updateActiveIndex: function (e) {
                    var t,
                      s = this.rtlTranslate ? this.translate : -this.translate,
                      i = this.slidesGrid,
                      n = this.snapGrid,
                      r = this.params,
                      a = this.activeIndex,
                      o = this.realIndex,
                      l = this.snapIndex,
                      c = e;
                    if (void 0 === c) {
                      for (var p = 0; p < i.length; p += 1)
                        void 0 !== i[p + 1]
                          ? s >= i[p] && s < i[p + 1] - (i[p + 1] - i[p]) / 2
                            ? (c = p)
                            : s >= i[p] && s < i[p + 1] && (c = p + 1)
                          : s >= i[p] && (c = p);
                      r.normalizeSlideIndex &&
                        (c < 0 || void 0 === c) &&
                        (c = 0);
                    }
                    if (n.indexOf(s) >= 0) t = n.indexOf(s);
                    else {
                      var d = Math.min(r.slidesPerGroupSkip, c);
                      t = d + Math.floor((c - d) / r.slidesPerGroup);
                    }
                    if ((t >= n.length && (t = n.length - 1), c !== a)) {
                      var u = parseInt(
                        this.slides.eq(c).attr('data-swiper-slide-index') || c,
                        10,
                      );
                      fe(this, {
                        snapIndex: t,
                        realIndex: u,
                        previousIndex: a,
                        activeIndex: c,
                      }),
                        this.emit('activeIndexChange'),
                        this.emit('snapIndexChange'),
                        o !== u && this.emit('realIndexChange'),
                        (this.initialized || this.params.runCallbacksOnInit) &&
                          this.emit('slideChange');
                    } else
                      t !== l &&
                        ((this.snapIndex = t), this.emit('snapIndexChange'));
                  },
                  updateClickedSlide: function (e) {
                    var t = this.params,
                      s = ce(e.target).closest('.' + t.slideClass)[0],
                      i = !1;
                    if (s)
                      for (var n = 0; n < this.slides.length; n += 1)
                        this.slides[n] === s && (i = !0);
                    if (!s || !i)
                      return (
                        (this.clickedSlide = void 0),
                        void (this.clickedIndex = void 0)
                      );
                    (this.clickedSlide = s),
                      this.virtual && this.params.virtual.enabled
                        ? (this.clickedIndex = parseInt(
                            ce(s).attr('data-swiper-slide-index'),
                            10,
                          ))
                        : (this.clickedIndex = ce(s).index()),
                      t.slideToClickedSlide &&
                        void 0 !== this.clickedIndex &&
                        this.clickedIndex !== this.activeIndex &&
                        this.slideToClickedSlide();
                  },
                },
                translate: {
                  getTranslate: function (e) {
                    void 0 === e && (e = this.isHorizontal() ? 'x' : 'y');
                    var t = this.params,
                      s = this.rtlTranslate,
                      i = this.translate,
                      n = this.$wrapperEl;
                    if (t.virtualTranslate) return s ? -i : i;
                    if (t.cssMode) return i;
                    var r = ue(n[0], e);
                    return s && (r = -r), r || 0;
                  },
                  setTranslate: function (e, t) {
                    var s = this.rtlTranslate,
                      i = this.params,
                      n = this.$wrapperEl,
                      r = this.wrapperEl,
                      a = this.progress,
                      o = 0,
                      l = 0;
                    this.isHorizontal() ? (o = s ? -e : e) : (l = e),
                      i.roundLengths &&
                        ((o = Math.floor(o)), (l = Math.floor(l))),
                      i.cssMode
                        ? (r[this.isHorizontal() ? 'scrollLeft' : 'scrollTop'] =
                            this.isHorizontal() ? -o : -l)
                        : i.virtualTranslate ||
                          n.transform(
                            'translate3d(' + o + 'px, ' + l + 'px, 0px)',
                          ),
                      (this.previousTranslate = this.translate),
                      (this.translate = this.isHorizontal() ? o : l);
                    var c = this.maxTranslate() - this.minTranslate();
                    (0 === c ? 0 : (e - this.minTranslate()) / c) !== a &&
                      this.updateProgress(e),
                      this.emit('setTranslate', this.translate, t);
                  },
                  minTranslate: function () {
                    return -this.snapGrid[0];
                  },
                  maxTranslate: function () {
                    return -this.snapGrid[this.snapGrid.length - 1];
                  },
                  translateTo: function (e, t, s, i, n) {
                    void 0 === e && (e = 0),
                      void 0 === t && (t = this.params.speed),
                      void 0 === s && (s = !0),
                      void 0 === i && (i = !0);
                    var r = this,
                      a = r.params,
                      o = r.wrapperEl;
                    if (r.animating && a.preventInteractionOnTransition)
                      return !1;
                    var l,
                      c = r.minTranslate(),
                      p = r.maxTranslate();
                    if (
                      ((l = i && e > c ? c : i && e < p ? p : e),
                      r.updateProgress(l),
                      a.cssMode)
                    ) {
                      var d,
                        u = r.isHorizontal();
                      return (
                        0 === t
                          ? (o[u ? 'scrollLeft' : 'scrollTop'] = -l)
                          : o.scrollTo
                          ? o.scrollTo(
                              (((d = {})[u ? 'left' : 'top'] = -l),
                              (d.behavior = 'smooth'),
                              d),
                            )
                          : (o[u ? 'scrollLeft' : 'scrollTop'] = -l),
                        !0
                      );
                    }
                    return (
                      0 === t
                        ? (r.setTransition(0),
                          r.setTranslate(l),
                          s &&
                            (r.emit('beforeTransitionStart', t, n),
                            r.emit('transitionEnd')))
                        : (r.setTransition(t),
                          r.setTranslate(l),
                          s &&
                            (r.emit('beforeTransitionStart', t, n),
                            r.emit('transitionStart')),
                          r.animating ||
                            ((r.animating = !0),
                            r.onTranslateToWrapperTransitionEnd ||
                              (r.onTranslateToWrapperTransitionEnd = function (
                                e,
                              ) {
                                r &&
                                  !r.destroyed &&
                                  e.target === this &&
                                  (r.$wrapperEl[0].removeEventListener(
                                    'transitionend',
                                    r.onTranslateToWrapperTransitionEnd,
                                  ),
                                  r.$wrapperEl[0].removeEventListener(
                                    'webkitTransitionEnd',
                                    r.onTranslateToWrapperTransitionEnd,
                                  ),
                                  (r.onTranslateToWrapperTransitionEnd = null),
                                  delete r.onTranslateToWrapperTransitionEnd,
                                  s && r.emit('transitionEnd'));
                              }),
                            r.$wrapperEl[0].addEventListener(
                              'transitionend',
                              r.onTranslateToWrapperTransitionEnd,
                            ),
                            r.$wrapperEl[0].addEventListener(
                              'webkitTransitionEnd',
                              r.onTranslateToWrapperTransitionEnd,
                            ))),
                      !0
                    );
                  },
                },
                transition: {
                  setTransition: function (e, t) {
                    this.params.cssMode || this.$wrapperEl.transition(e),
                      this.emit('setTransition', e, t);
                  },
                  transitionStart: function (e, t) {
                    void 0 === e && (e = !0);
                    var s = this.activeIndex,
                      i = this.params,
                      n = this.previousIndex;
                    if (!i.cssMode) {
                      i.autoHeight && this.updateAutoHeight();
                      var r = t;
                      if (
                        (r || (r = s > n ? 'next' : s < n ? 'prev' : 'reset'),
                        this.emit('transitionStart'),
                        e && s !== n)
                      ) {
                        if ('reset' === r)
                          return void this.emit('slideResetTransitionStart');
                        this.emit('slideChangeTransitionStart'),
                          'next' === r
                            ? this.emit('slideNextTransitionStart')
                            : this.emit('slidePrevTransitionStart');
                      }
                    }
                  },
                  transitionEnd: function (e, t) {
                    void 0 === e && (e = !0);
                    var s = this.activeIndex,
                      i = this.previousIndex,
                      n = this.params;
                    if (((this.animating = !1), !n.cssMode)) {
                      this.setTransition(0);
                      var r = t;
                      if (
                        (r || (r = s > i ? 'next' : s < i ? 'prev' : 'reset'),
                        this.emit('transitionEnd'),
                        e && s !== i)
                      ) {
                        if ('reset' === r)
                          return void this.emit('slideResetTransitionEnd');
                        this.emit('slideChangeTransitionEnd'),
                          'next' === r
                            ? this.emit('slideNextTransitionEnd')
                            : this.emit('slidePrevTransitionEnd');
                      }
                    }
                  },
                },
                slide: {
                  slideTo: function (e, t, s, i) {
                    void 0 === e && (e = 0),
                      void 0 === t && (t = this.params.speed),
                      void 0 === s && (s = !0);
                    var n = this,
                      r = e;
                    r < 0 && (r = 0);
                    var a = n.params,
                      o = n.snapGrid,
                      l = n.slidesGrid,
                      c = n.previousIndex,
                      p = n.activeIndex,
                      d = n.rtlTranslate,
                      u = n.wrapperEl;
                    if (n.animating && a.preventInteractionOnTransition)
                      return !1;
                    var $ = Math.min(n.params.slidesPerGroupSkip, r),
                      f = $ + Math.floor((r - $) / n.params.slidesPerGroup);
                    f >= o.length && (f = o.length - 1),
                      (p || a.initialSlide || 0) === (c || 0) &&
                        s &&
                        n.emit('beforeSlideChangeStart');
                    var m,
                      h = -o[f];
                    if ((n.updateProgress(h), a.normalizeSlideIndex))
                      for (var g = 0; g < l.length; g += 1)
                        -Math.floor(100 * h) >= Math.floor(100 * l[g]) &&
                          (r = g);
                    if (n.initialized && r !== p) {
                      if (
                        !n.allowSlideNext &&
                        h < n.translate &&
                        h < n.minTranslate()
                      )
                        return !1;
                      if (
                        !n.allowSlidePrev &&
                        h > n.translate &&
                        h > n.maxTranslate() &&
                        (p || 0) !== r
                      )
                        return !1;
                    }
                    if (
                      ((m = r > p ? 'next' : r < p ? 'prev' : 'reset'),
                      (d && -h === n.translate) || (!d && h === n.translate))
                    )
                      return (
                        n.updateActiveIndex(r),
                        a.autoHeight && n.updateAutoHeight(),
                        n.updateSlidesClasses(),
                        'slide' !== a.effect && n.setTranslate(h),
                        'reset' !== m &&
                          (n.transitionStart(s, m), n.transitionEnd(s, m)),
                        !1
                      );
                    if (a.cssMode) {
                      var v,
                        w = n.isHorizontal(),
                        S = -h;
                      return (
                        d && (S = u.scrollWidth - u.offsetWidth - S),
                        0 === t
                          ? (u[w ? 'scrollLeft' : 'scrollTop'] = S)
                          : u.scrollTo
                          ? u.scrollTo(
                              (((v = {})[w ? 'left' : 'top'] = S),
                              (v.behavior = 'smooth'),
                              v),
                            )
                          : (u[w ? 'scrollLeft' : 'scrollTop'] = S),
                        !0
                      );
                    }
                    return (
                      0 === t
                        ? (n.setTransition(0),
                          n.setTranslate(h),
                          n.updateActiveIndex(r),
                          n.updateSlidesClasses(),
                          n.emit('beforeTransitionStart', t, i),
                          n.transitionStart(s, m),
                          n.transitionEnd(s, m))
                        : (n.setTransition(t),
                          n.setTranslate(h),
                          n.updateActiveIndex(r),
                          n.updateSlidesClasses(),
                          n.emit('beforeTransitionStart', t, i),
                          n.transitionStart(s, m),
                          n.animating ||
                            ((n.animating = !0),
                            n.onSlideToWrapperTransitionEnd ||
                              (n.onSlideToWrapperTransitionEnd = function (e) {
                                n &&
                                  !n.destroyed &&
                                  e.target === this &&
                                  (n.$wrapperEl[0].removeEventListener(
                                    'transitionend',
                                    n.onSlideToWrapperTransitionEnd,
                                  ),
                                  n.$wrapperEl[0].removeEventListener(
                                    'webkitTransitionEnd',
                                    n.onSlideToWrapperTransitionEnd,
                                  ),
                                  (n.onSlideToWrapperTransitionEnd = null),
                                  delete n.onSlideToWrapperTransitionEnd,
                                  n.transitionEnd(s, m));
                              }),
                            n.$wrapperEl[0].addEventListener(
                              'transitionend',
                              n.onSlideToWrapperTransitionEnd,
                            ),
                            n.$wrapperEl[0].addEventListener(
                              'webkitTransitionEnd',
                              n.onSlideToWrapperTransitionEnd,
                            ))),
                      !0
                    );
                  },
                  slideToLoop: function (e, t, s, i) {
                    void 0 === e && (e = 0),
                      void 0 === t && (t = this.params.speed),
                      void 0 === s && (s = !0);
                    var n = e;
                    return (
                      this.params.loop && (n += this.loopedSlides),
                      this.slideTo(n, t, s, i)
                    );
                  },
                  slideNext: function (e, t, s) {
                    void 0 === e && (e = this.params.speed),
                      void 0 === t && (t = !0);
                    var i = this.params,
                      n = this.animating,
                      r =
                        this.activeIndex < i.slidesPerGroupSkip
                          ? 1
                          : i.slidesPerGroup;
                    if (i.loop) {
                      if (n && i.loopPreventsSlide) return !1;
                      this.loopFix(),
                        (this._clientLeft = this.$wrapperEl[0].clientLeft);
                    }
                    return this.slideTo(this.activeIndex + r, e, t, s);
                  },
                  slidePrev: function (e, t, s) {
                    void 0 === e && (e = this.params.speed),
                      void 0 === t && (t = !0);
                    var i = this.params,
                      n = this.animating,
                      r = this.snapGrid,
                      a = this.slidesGrid,
                      o = this.rtlTranslate;
                    if (i.loop) {
                      if (n && i.loopPreventsSlide) return !1;
                      this.loopFix(),
                        (this._clientLeft = this.$wrapperEl[0].clientLeft);
                    }
                    function l(e) {
                      return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
                    }
                    var c,
                      p = l(o ? this.translate : -this.translate),
                      d = r.map(function (e) {
                        return l(e);
                      }),
                      u = (r[d.indexOf(p)], r[d.indexOf(p) - 1]);
                    return (
                      void 0 === u &&
                        i.cssMode &&
                        r.forEach(function (e) {
                          !u && p >= e && (u = e);
                        }),
                      void 0 !== u &&
                        (c = a.indexOf(u)) < 0 &&
                        (c = this.activeIndex - 1),
                      this.slideTo(c, e, t, s)
                    );
                  },
                  slideReset: function (e, t, s) {
                    return (
                      void 0 === e && (e = this.params.speed),
                      void 0 === t && (t = !0),
                      this.slideTo(this.activeIndex, e, t, s)
                    );
                  },
                  slideToClosest: function (e, t, s, i) {
                    void 0 === e && (e = this.params.speed),
                      void 0 === t && (t = !0),
                      void 0 === i && (i = 0.5);
                    var n = this.activeIndex,
                      r = Math.min(this.params.slidesPerGroupSkip, n),
                      a = r + Math.floor((n - r) / this.params.slidesPerGroup),
                      o = this.rtlTranslate ? this.translate : -this.translate;
                    if (o >= this.snapGrid[a]) {
                      var l = this.snapGrid[a];
                      o - l > (this.snapGrid[a + 1] - l) * i &&
                        (n += this.params.slidesPerGroup);
                    } else {
                      var c = this.snapGrid[a - 1];
                      o - c <= (this.snapGrid[a] - c) * i &&
                        (n -= this.params.slidesPerGroup);
                    }
                    return (
                      (n = Math.max(n, 0)),
                      (n = Math.min(n, this.slidesGrid.length - 1)),
                      this.slideTo(n, e, t, s)
                    );
                  },
                  slideToClickedSlide: function () {
                    var e,
                      t = this,
                      s = t.params,
                      i = t.$wrapperEl,
                      n =
                        'auto' === s.slidesPerView
                          ? t.slidesPerViewDynamic()
                          : s.slidesPerView,
                      r = t.clickedIndex;
                    if (s.loop) {
                      if (t.animating) return;
                      (e = parseInt(
                        ce(t.clickedSlide).attr('data-swiper-slide-index'),
                        10,
                      )),
                        s.centeredSlides
                          ? r < t.loopedSlides - n / 2 ||
                            r > t.slides.length - t.loopedSlides + n / 2
                            ? (t.loopFix(),
                              (r = i
                                .children(
                                  '.' +
                                    s.slideClass +
                                    '[data-swiper-slide-index="' +
                                    e +
                                    '"]:not(.' +
                                    s.slideDuplicateClass +
                                    ')',
                                )
                                .eq(0)
                                .index()),
                              pe(function () {
                                t.slideTo(r);
                              }))
                            : t.slideTo(r)
                          : r > t.slides.length - n
                          ? (t.loopFix(),
                            (r = i
                              .children(
                                '.' +
                                  s.slideClass +
                                  '[data-swiper-slide-index="' +
                                  e +
                                  '"]:not(.' +
                                  s.slideDuplicateClass +
                                  ')',
                              )
                              .eq(0)
                              .index()),
                            pe(function () {
                              t.slideTo(r);
                            }))
                          : t.slideTo(r);
                    } else t.slideTo(r);
                  },
                },
                loop: {
                  loopCreate: function () {
                    var e = this,
                      t = X(),
                      s = e.params,
                      i = e.$wrapperEl;
                    i.children(
                      '.' + s.slideClass + '.' + s.slideDuplicateClass,
                    ).remove();
                    var n = i.children('.' + s.slideClass);
                    if (s.loopFillGroupWithBlank) {
                      var r = s.slidesPerGroup - (n.length % s.slidesPerGroup);
                      if (r !== s.slidesPerGroup) {
                        for (var a = 0; a < r; a += 1) {
                          var o = ce(t.createElement('div')).addClass(
                            s.slideClass + ' ' + s.slideBlankClass,
                          );
                          i.append(o);
                        }
                        n = i.children('.' + s.slideClass);
                      }
                    }
                    'auto' !== s.slidesPerView ||
                      s.loopedSlides ||
                      (s.loopedSlides = n.length),
                      (e.loopedSlides = Math.ceil(
                        parseFloat(s.loopedSlides || s.slidesPerView, 10),
                      )),
                      (e.loopedSlides += s.loopAdditionalSlides),
                      e.loopedSlides > n.length && (e.loopedSlides = n.length);
                    var l = [],
                      c = [];
                    n.each(function (t, s) {
                      var i = ce(t);
                      s < e.loopedSlides && c.push(t),
                        s < n.length &&
                          s >= n.length - e.loopedSlides &&
                          l.push(t),
                        i.attr('data-swiper-slide-index', s);
                    });
                    for (var p = 0; p < c.length; p += 1)
                      i.append(
                        ce(c[p].cloneNode(!0)).addClass(s.slideDuplicateClass),
                      );
                    for (var d = l.length - 1; d >= 0; d -= 1)
                      i.prepend(
                        ce(l[d].cloneNode(!0)).addClass(s.slideDuplicateClass),
                      );
                  },
                  loopFix: function () {
                    this.emit('beforeLoopFix');
                    var e,
                      t = this.activeIndex,
                      s = this.slides,
                      i = this.loopedSlides,
                      n = this.allowSlidePrev,
                      r = this.allowSlideNext,
                      a = this.snapGrid,
                      o = this.rtlTranslate;
                    (this.allowSlidePrev = !0), (this.allowSlideNext = !0);
                    var l = -a[t] - this.getTranslate();
                    t < i
                      ? ((e = s.length - 3 * i + t),
                        (e += i),
                        this.slideTo(e, 0, !1, !0) &&
                          0 !== l &&
                          this.setTranslate(
                            (o ? -this.translate : this.translate) - l,
                          ))
                      : t >= s.length - i &&
                        ((e = -s.length + t + i),
                        (e += i),
                        this.slideTo(e, 0, !1, !0) &&
                          0 !== l &&
                          this.setTranslate(
                            (o ? -this.translate : this.translate) - l,
                          )),
                      (this.allowSlidePrev = n),
                      (this.allowSlideNext = r),
                      this.emit('loopFix');
                  },
                  loopDestroy: function () {
                    var e = this.$wrapperEl,
                      t = this.params,
                      s = this.slides;
                    e
                      .children(
                        '.' +
                          t.slideClass +
                          '.' +
                          t.slideDuplicateClass +
                          ',.' +
                          t.slideClass +
                          '.' +
                          t.slideBlankClass,
                      )
                      .remove(),
                      s.removeAttr('data-swiper-slide-index');
                  },
                },
                grabCursor: {
                  setGrabCursor: function (e) {
                    if (
                      !(
                        this.support.touch ||
                        !this.params.simulateTouch ||
                        (this.params.watchOverflow && this.isLocked) ||
                        this.params.cssMode
                      )
                    ) {
                      var t = this.el;
                      (t.style.cursor = 'move'),
                        (t.style.cursor = e
                          ? '-webkit-grabbing'
                          : '-webkit-grab'),
                        (t.style.cursor = e ? '-moz-grabbin' : '-moz-grab'),
                        (t.style.cursor = e ? 'grabbing' : 'grab');
                    }
                  },
                  unsetGrabCursor: function () {
                    this.support.touch ||
                      (this.params.watchOverflow && this.isLocked) ||
                      this.params.cssMode ||
                      (this.el.style.cursor = '');
                  },
                },
                manipulation: {
                  appendSlide: function (e) {
                    var t = this.$wrapperEl,
                      s = this.params;
                    if (
                      (s.loop && this.loopDestroy(),
                      'object' == typeof e && 'length' in e)
                    )
                      for (var i = 0; i < e.length; i += 1)
                        e[i] && t.append(e[i]);
                    else t.append(e);
                    s.loop && this.loopCreate(),
                      (s.observer && this.support.observer) || this.update();
                  },
                  prependSlide: function (e) {
                    var t = this.params,
                      s = this.$wrapperEl,
                      i = this.activeIndex;
                    t.loop && this.loopDestroy();
                    var n = i + 1;
                    if ('object' == typeof e && 'length' in e) {
                      for (var r = 0; r < e.length; r += 1)
                        e[r] && s.prepend(e[r]);
                      n = i + e.length;
                    } else s.prepend(e);
                    t.loop && this.loopCreate(),
                      (t.observer && this.support.observer) || this.update(),
                      this.slideTo(n, 0, !1);
                  },
                  addSlide: function (e, t) {
                    var s = this.$wrapperEl,
                      i = this.params,
                      n = this.activeIndex;
                    i.loop &&
                      ((n -= this.loopedSlides),
                      this.loopDestroy(),
                      (this.slides = s.children('.' + i.slideClass)));
                    var r = this.slides.length;
                    if (e <= 0) this.prependSlide(t);
                    else if (e >= r) this.appendSlide(t);
                    else {
                      for (
                        var a = n > e ? n + 1 : n, o = [], l = r - 1;
                        l >= e;
                        l -= 1
                      ) {
                        var c = this.slides.eq(l);
                        c.remove(), o.unshift(c);
                      }
                      if ('object' == typeof t && 'length' in t) {
                        for (var p = 0; p < t.length; p += 1)
                          t[p] && s.append(t[p]);
                        a = n > e ? n + t.length : n;
                      } else s.append(t);
                      for (var d = 0; d < o.length; d += 1) s.append(o[d]);
                      i.loop && this.loopCreate(),
                        (i.observer && this.support.observer) || this.update(),
                        i.loop
                          ? this.slideTo(a + this.loopedSlides, 0, !1)
                          : this.slideTo(a, 0, !1);
                    }
                  },
                  removeSlide: function (e) {
                    var t = this.params,
                      s = this.$wrapperEl,
                      i = this.activeIndex;
                    t.loop &&
                      ((i -= this.loopedSlides),
                      this.loopDestroy(),
                      (this.slides = s.children('.' + t.slideClass)));
                    var n,
                      r = i;
                    if ('object' == typeof e && 'length' in e) {
                      for (var a = 0; a < e.length; a += 1)
                        (n = e[a]),
                          this.slides[n] && this.slides.eq(n).remove(),
                          n < r && (r -= 1);
                      r = Math.max(r, 0);
                    } else
                      (n = e),
                        this.slides[n] && this.slides.eq(n).remove(),
                        n < r && (r -= 1),
                        (r = Math.max(r, 0));
                    t.loop && this.loopCreate(),
                      (t.observer && this.support.observer) || this.update(),
                      t.loop
                        ? this.slideTo(r + this.loopedSlides, 0, !1)
                        : this.slideTo(r, 0, !1);
                  },
                  removeAllSlides: function () {
                    for (var e = [], t = 0; t < this.slides.length; t += 1)
                      e.push(t);
                    this.removeSlide(e);
                  },
                },
                events: {
                  attachEvents: function () {
                    var e = X(),
                      t = this.params,
                      s = this.touchEvents,
                      i = this.el,
                      n = this.wrapperEl,
                      r = this.device,
                      a = this.support;
                    (this.onTouchStart = be.bind(this)),
                      (this.onTouchMove = Ee.bind(this)),
                      (this.onTouchEnd = Ce.bind(this)),
                      t.cssMode && (this.onScroll = Me.bind(this)),
                      (this.onClick = ke.bind(this));
                    var o = !!t.nested;
                    if (!a.touch && a.pointerEvents)
                      i.addEventListener(s.start, this.onTouchStart, !1),
                        e.addEventListener(s.move, this.onTouchMove, o),
                        e.addEventListener(s.end, this.onTouchEnd, !1);
                    else {
                      if (a.touch) {
                        var l = !(
                          'touchstart' !== s.start ||
                          !a.passiveListener ||
                          !t.passiveListeners
                        ) && { passive: !0, capture: !1 };
                        i.addEventListener(s.start, this.onTouchStart, l),
                          i.addEventListener(
                            s.move,
                            this.onTouchMove,
                            a.passiveListener ? { passive: !1, capture: o } : o,
                          ),
                          i.addEventListener(s.end, this.onTouchEnd, l),
                          s.cancel &&
                            i.addEventListener(s.cancel, this.onTouchEnd, l),
                          Pe ||
                            (e.addEventListener('touchstart', ze), (Pe = !0));
                      }
                      ((t.simulateTouch && !r.ios && !r.android) ||
                        (t.simulateTouch && !a.touch && r.ios)) &&
                        (i.addEventListener('mousedown', this.onTouchStart, !1),
                        e.addEventListener('mousemove', this.onTouchMove, o),
                        e.addEventListener('mouseup', this.onTouchEnd, !1));
                    }
                    (t.preventClicks || t.preventClicksPropagation) &&
                      i.addEventListener('click', this.onClick, !0),
                      t.cssMode && n.addEventListener('scroll', this.onScroll),
                      t.updateOnWindowResize
                        ? this.on(
                            r.ios || r.android
                              ? 'resize orientationchange observerUpdate'
                              : 'resize observerUpdate',
                            Te,
                            !0,
                          )
                        : this.on('observerUpdate', Te, !0);
                  },
                  detachEvents: function () {
                    var e = X(),
                      t = this.params,
                      s = this.touchEvents,
                      i = this.el,
                      n = this.wrapperEl,
                      r = this.device,
                      a = this.support,
                      o = !!t.nested;
                    if (!a.touch && a.pointerEvents)
                      i.removeEventListener(s.start, this.onTouchStart, !1),
                        e.removeEventListener(s.move, this.onTouchMove, o),
                        e.removeEventListener(s.end, this.onTouchEnd, !1);
                    else {
                      if (a.touch) {
                        var l = !(
                          'onTouchStart' !== s.start ||
                          !a.passiveListener ||
                          !t.passiveListeners
                        ) && { passive: !0, capture: !1 };
                        i.removeEventListener(s.start, this.onTouchStart, l),
                          i.removeEventListener(s.move, this.onTouchMove, o),
                          i.removeEventListener(s.end, this.onTouchEnd, l),
                          s.cancel &&
                            i.removeEventListener(s.cancel, this.onTouchEnd, l);
                      }
                      ((t.simulateTouch && !r.ios && !r.android) ||
                        (t.simulateTouch && !a.touch && r.ios)) &&
                        (i.removeEventListener(
                          'mousedown',
                          this.onTouchStart,
                          !1,
                        ),
                        e.removeEventListener('mousemove', this.onTouchMove, o),
                        e.removeEventListener('mouseup', this.onTouchEnd, !1));
                    }
                    (t.preventClicks || t.preventClicksPropagation) &&
                      i.removeEventListener('click', this.onClick, !0),
                      t.cssMode &&
                        n.removeEventListener('scroll', this.onScroll),
                      this.off(
                        r.ios || r.android
                          ? 'resize orientationchange observerUpdate'
                          : 'resize observerUpdate',
                        Te,
                      );
                  },
                },
                breakpoints: {
                  setBreakpoint: function () {
                    var e = this.activeIndex,
                      t = this.initialized,
                      s = this.loopedSlides,
                      i = void 0 === s ? 0 : s,
                      n = this.params,
                      r = this.$el,
                      a = n.breakpoints;
                    if (a && (!a || 0 !== Object.keys(a).length)) {
                      var o = this.getBreakpoint(a);
                      if (o && this.currentBreakpoint !== o) {
                        var l = o in a ? a[o] : void 0;
                        l &&
                          [
                            'slidesPerView',
                            'spaceBetween',
                            'slidesPerGroup',
                            'slidesPerGroupSkip',
                            'slidesPerColumn',
                          ].forEach(function (e) {
                            var t = l[e];
                            void 0 !== t &&
                              (l[e] =
                                'slidesPerView' !== e ||
                                ('AUTO' !== t && 'auto' !== t)
                                  ? 'slidesPerView' === e
                                    ? parseFloat(t)
                                    : parseInt(t, 10)
                                  : 'auto');
                          });
                        var c = l || this.originalParams,
                          p = n.slidesPerColumn > 1,
                          d = c.slidesPerColumn > 1;
                        p && !d
                          ? (r.removeClass(
                              n.containerModifierClass +
                                'multirow ' +
                                n.containerModifierClass +
                                'multirow-column',
                            ),
                            this.emitContainerClasses())
                          : !p &&
                            d &&
                            (r.addClass(n.containerModifierClass + 'multirow'),
                            'column' === c.slidesPerColumnFill &&
                              r.addClass(
                                n.containerModifierClass + 'multirow-column',
                              ),
                            this.emitContainerClasses());
                        var u = c.direction && c.direction !== n.direction,
                          $ =
                            n.loop &&
                            (c.slidesPerView !== n.slidesPerView || u);
                        u && t && this.changeDirection(),
                          fe(this.params, c),
                          fe(this, {
                            allowTouchMove: this.params.allowTouchMove,
                            allowSlideNext: this.params.allowSlideNext,
                            allowSlidePrev: this.params.allowSlidePrev,
                          }),
                          (this.currentBreakpoint = o),
                          $ &&
                            t &&
                            (this.loopDestroy(),
                            this.loopCreate(),
                            this.updateSlides(),
                            this.slideTo(e - i + this.loopedSlides, 0, !1)),
                          this.emit('breakpoint', c);
                      }
                    }
                  },
                  getBreakpoint: function (e) {
                    var t = R();
                    if (e) {
                      var s = !1,
                        i = Object.keys(e).map(function (e) {
                          if ('string' == typeof e && 0 === e.indexOf('@')) {
                            var s = parseFloat(e.substr(1));
                            return { value: t.innerHeight * s, point: e };
                          }
                          return { value: e, point: e };
                        });
                      i.sort(function (e, t) {
                        return parseInt(e.value, 10) - parseInt(t.value, 10);
                      });
                      for (var n = 0; n < i.length; n += 1) {
                        var r = i[n],
                          a = r.point;
                        r.value <= t.innerWidth && (s = a);
                      }
                      return s || 'max';
                    }
                  },
                },
                checkOverflow: {
                  checkOverflow: function () {
                    var e = this.params,
                      t = this.isLocked,
                      s =
                        this.slides.length > 0 &&
                        e.slidesOffsetBefore +
                          e.spaceBetween * (this.slides.length - 1) +
                          this.slides[0].offsetWidth * this.slides.length;
                    e.slidesOffsetBefore && e.slidesOffsetAfter && s
                      ? (this.isLocked = s <= this.size)
                      : (this.isLocked = 1 === this.snapGrid.length),
                      (this.allowSlideNext = !this.isLocked),
                      (this.allowSlidePrev = !this.isLocked),
                      t !== this.isLocked &&
                        this.emit(this.isLocked ? 'lock' : 'unlock'),
                      t &&
                        t !== this.isLocked &&
                        ((this.isEnd = !1),
                        this.navigation && this.navigation.update());
                  },
                },
                classes: {
                  addClasses: function () {
                    var e = this.classNames,
                      t = this.params,
                      s = this.rtl,
                      i = this.$el,
                      n = this.device,
                      r = [];
                    r.push('initialized'),
                      r.push(t.direction),
                      t.freeMode && r.push('free-mode'),
                      t.autoHeight && r.push('autoheight'),
                      s && r.push('rtl'),
                      t.slidesPerColumn > 1 &&
                        (r.push('multirow'),
                        'column' === t.slidesPerColumnFill &&
                          r.push('multirow-column')),
                      n.android && r.push('android'),
                      n.ios && r.push('ios'),
                      t.cssMode && r.push('css-mode'),
                      r.forEach(function (s) {
                        e.push(t.containerModifierClass + s);
                      }),
                      i.addClass(e.join(' ')),
                      this.emitContainerClasses();
                  },
                  removeClasses: function () {
                    var e = this.$el,
                      t = this.classNames;
                    e.removeClass(t.join(' ')), this.emitContainerClasses();
                  },
                },
                images: {
                  loadImage: function (e, t, s, i, n, r) {
                    var a,
                      o = R();
                    function l() {
                      r && r();
                    }
                    ce(e).parent('picture')[0] || (e.complete && n)
                      ? l()
                      : t
                      ? (((a = new o.Image()).onload = l),
                        (a.onerror = l),
                        i && (a.sizes = i),
                        s && (a.srcset = s),
                        t && (a.src = t))
                      : l();
                  },
                  preloadImages: function () {
                    var e = this;
                    function t() {
                      null != e &&
                        e &&
                        !e.destroyed &&
                        (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                        e.imagesLoaded === e.imagesToLoad.length &&
                          (e.params.updateOnImagesReady && e.update(),
                          e.emit('imagesReady')));
                    }
                    e.imagesToLoad = e.$el.find('img');
                    for (var s = 0; s < e.imagesToLoad.length; s += 1) {
                      var i = e.imagesToLoad[s];
                      e.loadImage(
                        i,
                        i.currentSrc || i.getAttribute('src'),
                        i.srcset || i.getAttribute('srcset'),
                        i.sizes || i.getAttribute('sizes'),
                        !0,
                        t,
                      );
                    }
                  },
                },
              },
              Ie = {},
              Ae = (function () {
                function e() {
                  for (
                    var t, s, i = arguments.length, n = new Array(i), r = 0;
                    r < i;
                    r++
                  )
                    n[r] = arguments[r];
                  1 === n.length &&
                  n[0].constructor &&
                  n[0].constructor === Object
                    ? (s = n[0])
                    : ((t = n[0]), (s = n[1])),
                    s || (s = {}),
                    (s = fe({}, s)),
                    t && !s.el && (s.el = t);
                  var a = this;
                  (a.support = he()),
                    (a.device = ge({ userAgent: s.userAgent })),
                    (a.browser = ve()),
                    (a.eventsListeners = {}),
                    (a.eventsAnyListeners = []),
                    Object.keys(Oe).forEach(function (t) {
                      Object.keys(Oe[t]).forEach(function (s) {
                        e.prototype[s] || (e.prototype[s] = Oe[t][s]);
                      });
                    }),
                    void 0 === a.modules && (a.modules = {}),
                    Object.keys(a.modules).forEach(function (e) {
                      var t = a.modules[e];
                      if (t.params) {
                        var i = Object.keys(t.params)[0],
                          n = t.params[i];
                        if ('object' != typeof n || null === n) return;
                        if (!(i in s) || !('enabled' in n)) return;
                        !0 === s[i] && (s[i] = { enabled: !0 }),
                          'object' != typeof s[i] ||
                            'enabled' in s[i] ||
                            (s[i].enabled = !0),
                          s[i] || (s[i] = { enabled: !1 });
                      }
                    });
                  var o = fe({}, je);
                  a.useParams(o),
                    (a.params = fe({}, o, Ie, s)),
                    (a.originalParams = fe({}, a.params)),
                    (a.passedParams = fe({}, s)),
                    a.params &&
                      a.params.on &&
                      Object.keys(a.params.on).forEach(function (e) {
                        a.on(e, a.params.on[e]);
                      }),
                    (a.$ = ce);
                  var l = ce(a.params.el);
                  if ((t = l[0])) {
                    if (l.length > 1) {
                      var c = [];
                      return (
                        l.each(function (t) {
                          var i = fe({}, s, { el: t });
                          c.push(new e(i));
                        }),
                        c
                      );
                    }
                    var p, d, u;
                    return (
                      (t.swiper = a),
                      t && t.shadowRoot && t.shadowRoot.querySelector
                        ? ((p = ce(
                            t.shadowRoot.querySelector(
                              '.' + a.params.wrapperClass,
                            ),
                          )).children = function (e) {
                            return l.children(e);
                          })
                        : (p = l.children('.' + a.params.wrapperClass)),
                      fe(a, {
                        $el: l,
                        el: t,
                        $wrapperEl: p,
                        wrapperEl: p[0],
                        classNames: [],
                        slides: ce(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function () {
                          return 'horizontal' === a.params.direction;
                        },
                        isVertical: function () {
                          return 'vertical' === a.params.direction;
                        },
                        rtl:
                          'rtl' === t.dir.toLowerCase() ||
                          'rtl' === l.css('direction'),
                        rtlTranslate:
                          'horizontal' === a.params.direction &&
                          ('rtl' === t.dir.toLowerCase() ||
                            'rtl' === l.css('direction')),
                        wrongRTL: '-webkit-box' === p.css('display'),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: a.params.allowSlideNext,
                        allowSlidePrev: a.params.allowSlidePrev,
                        touchEvents:
                          ((d = [
                            'touchstart',
                            'touchmove',
                            'touchend',
                            'touchcancel',
                          ]),
                          (u = ['mousedown', 'mousemove', 'mouseup']),
                          a.support.pointerEvents &&
                            (u = ['pointerdown', 'pointermove', 'pointerup']),
                          (a.touchEventsTouch = {
                            start: d[0],
                            move: d[1],
                            end: d[2],
                            cancel: d[3],
                          }),
                          (a.touchEventsDesktop = {
                            start: u[0],
                            move: u[1],
                            end: u[2],
                          }),
                          a.support.touch || !a.params.simulateTouch
                            ? a.touchEventsTouch
                            : a.touchEventsDesktop),
                        touchEventsData: {
                          isTouched: void 0,
                          isMoved: void 0,
                          allowTouchCallbacks: void 0,
                          touchStartTime: void 0,
                          isScrolling: void 0,
                          currentTranslate: void 0,
                          startTranslate: void 0,
                          allowThresholdMove: void 0,
                          formElements:
                            'input, select, option, textarea, button, video, label',
                          lastClickTime: de(),
                          clickTimeout: void 0,
                          velocities: [],
                          allowMomentumBounce: void 0,
                          isTouchEvent: void 0,
                          startMoving: void 0,
                        },
                        allowClick: !0,
                        allowTouchMove: a.params.allowTouchMove,
                        touches: {
                          startX: 0,
                          startY: 0,
                          currentX: 0,
                          currentY: 0,
                          diff: 0,
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0,
                      }),
                      a.useModules(),
                      a.emit('_swiper'),
                      a.params.init && a.init(),
                      a
                    );
                  }
                }
                var t,
                  s,
                  i = e.prototype;
                return (
                  (i.emitContainerClasses = function () {
                    var e = this;
                    if (e.params._emitClasses && e.el) {
                      var t = e.el.className.split(' ').filter(function (t) {
                        return (
                          0 === t.indexOf('swiper-container') ||
                          0 === t.indexOf(e.params.containerModifierClass)
                        );
                      });
                      e.emit('_containerClasses', t.join(' '));
                    }
                  }),
                  (i.emitSlidesClasses = function () {
                    var e = this;
                    e.params._emitClasses &&
                      e.el &&
                      e.slides.each(function (t) {
                        var s = t.className.split(' ').filter(function (t) {
                          return (
                            0 === t.indexOf('swiper-slide') ||
                            0 === t.indexOf(e.params.slideClass)
                          );
                        });
                        e.emit('_slideClass', t, s.join(' '));
                      });
                  }),
                  (i.slidesPerViewDynamic = function () {
                    var e = this.params,
                      t = this.slides,
                      s = this.slidesGrid,
                      i = this.size,
                      n = this.activeIndex,
                      r = 1;
                    if (e.centeredSlides) {
                      for (
                        var a, o = t[n].swiperSlideSize, l = n + 1;
                        l < t.length;
                        l += 1
                      )
                        t[l] &&
                          !a &&
                          ((r += 1),
                          (o += t[l].swiperSlideSize) > i && (a = !0));
                      for (var c = n - 1; c >= 0; c -= 1)
                        t[c] &&
                          !a &&
                          ((r += 1),
                          (o += t[c].swiperSlideSize) > i && (a = !0));
                    } else
                      for (var p = n + 1; p < t.length; p += 1)
                        s[p] - s[n] < i && (r += 1);
                    return r;
                  }),
                  (i.update = function () {
                    var e = this;
                    if (e && !e.destroyed) {
                      var t = e.snapGrid,
                        s = e.params;
                      s.breakpoints && e.setBreakpoint(),
                        e.updateSize(),
                        e.updateSlides(),
                        e.updateProgress(),
                        e.updateSlidesClasses(),
                        e.params.freeMode
                          ? (i(), e.params.autoHeight && e.updateAutoHeight())
                          : (('auto' === e.params.slidesPerView ||
                              e.params.slidesPerView > 1) &&
                            e.isEnd &&
                            !e.params.centeredSlides
                              ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                              : e.slideTo(e.activeIndex, 0, !1, !0)) || i(),
                        s.watchOverflow &&
                          t !== e.snapGrid &&
                          e.checkOverflow(),
                        e.emit('update');
                    }
                    function i() {
                      var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                        s = Math.min(
                          Math.max(t, e.maxTranslate()),
                          e.minTranslate(),
                        );
                      e.setTranslate(s),
                        e.updateActiveIndex(),
                        e.updateSlidesClasses();
                    }
                  }),
                  (i.changeDirection = function (e, t) {
                    void 0 === t && (t = !0);
                    var s = this.params.direction;
                    return (
                      e || (e = 'horizontal' === s ? 'vertical' : 'horizontal'),
                      e === s ||
                        ('horizontal' !== e && 'vertical' !== e) ||
                        (this.$el
                          .removeClass(
                            '' + this.params.containerModifierClass + s,
                          )
                          .addClass(
                            '' + this.params.containerModifierClass + e,
                          ),
                        this.emitContainerClasses(),
                        (this.params.direction = e),
                        this.slides.each(function (t) {
                          'vertical' === e
                            ? (t.style.width = '')
                            : (t.style.height = '');
                        }),
                        this.emit('changeDirection'),
                        t && this.update()),
                      this
                    );
                  }),
                  (i.init = function () {
                    this.initialized ||
                      (this.emit('beforeInit'),
                      this.params.breakpoints && this.setBreakpoint(),
                      this.addClasses(),
                      this.params.loop && this.loopCreate(),
                      this.updateSize(),
                      this.updateSlides(),
                      this.params.watchOverflow && this.checkOverflow(),
                      this.params.grabCursor && this.setGrabCursor(),
                      this.params.preloadImages && this.preloadImages(),
                      this.params.loop
                        ? this.slideTo(
                            this.params.initialSlide + this.loopedSlides,
                            0,
                            this.params.runCallbacksOnInit,
                          )
                        : this.slideTo(
                            this.params.initialSlide,
                            0,
                            this.params.runCallbacksOnInit,
                          ),
                      this.attachEvents(),
                      (this.initialized = !0),
                      this.emit('init'));
                  }),
                  (i.destroy = function (e, t) {
                    void 0 === e && (e = !0), void 0 === t && (t = !0);
                    var s,
                      i = this,
                      n = i.params,
                      r = i.$el,
                      a = i.$wrapperEl,
                      o = i.slides;
                    return (
                      void 0 === i.params ||
                        i.destroyed ||
                        (i.emit('beforeDestroy'),
                        (i.initialized = !1),
                        i.detachEvents(),
                        n.loop && i.loopDestroy(),
                        t &&
                          (i.removeClasses(),
                          r.removeAttr('style'),
                          a.removeAttr('style'),
                          o &&
                            o.length &&
                            o
                              .removeClass(
                                [
                                  n.slideVisibleClass,
                                  n.slideActiveClass,
                                  n.slideNextClass,
                                  n.slidePrevClass,
                                ].join(' '),
                              )
                              .removeAttr('style')
                              .removeAttr('data-swiper-slide-index')),
                        i.emit('destroy'),
                        Object.keys(i.eventsListeners).forEach(function (e) {
                          i.off(e);
                        }),
                        !1 !== e &&
                          ((i.$el[0].swiper = null),
                          (s = i),
                          Object.keys(s).forEach(function (e) {
                            try {
                              s[e] = null;
                            } catch (e) {}
                            try {
                              delete s[e];
                            } catch (e) {}
                          })),
                        (i.destroyed = !0)),
                      null
                    );
                  }),
                  (e.extendDefaults = function (e) {
                    fe(Ie, e);
                  }),
                  (e.installModule = function (t) {
                    e.prototype.modules || (e.prototype.modules = {});
                    var s =
                      t.name ||
                      Object.keys(e.prototype.modules).length + '_' + de();
                    e.prototype.modules[s] = t;
                  }),
                  (e.use = function (t) {
                    return Array.isArray(t)
                      ? (t.forEach(function (t) {
                          return e.installModule(t);
                        }),
                        e)
                      : (e.installModule(t), e);
                  }),
                  (t = e),
                  (s = [
                    {
                      key: 'extendedDefaults',
                      get: function () {
                        return Ie;
                      },
                    },
                    {
                      key: 'defaults',
                      get: function () {
                        return je;
                      },
                    },
                  ]) && Le(t, s),
                  e
                );
              })();
            Ae.use([we, ye]);
            var De = Ae;
            function Ne() {
              return (Ne =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var Be = {
                update: function (e) {
                  var t = this,
                    s = t.params,
                    i = s.slidesPerView,
                    n = s.slidesPerGroup,
                    r = s.centeredSlides,
                    a = t.params.virtual,
                    o = a.addSlidesBefore,
                    l = a.addSlidesAfter,
                    c = t.virtual,
                    p = c.from,
                    d = c.to,
                    u = c.slides,
                    $ = c.slidesGrid,
                    f = c.renderSlide,
                    m = c.offset;
                  t.updateActiveIndex();
                  var h,
                    g,
                    v,
                    w = t.activeIndex || 0;
                  (h = t.rtlTranslate
                    ? 'right'
                    : t.isHorizontal()
                    ? 'left'
                    : 'top'),
                    r
                      ? ((g = Math.floor(i / 2) + n + l),
                        (v = Math.floor(i / 2) + n + o))
                      : ((g = i + (n - 1) + l), (v = n + o));
                  var S = Math.max((w || 0) - v, 0),
                    x = Math.min((w || 0) + g, u.length - 1),
                    y = (t.slidesGrid[S] || 0) - (t.slidesGrid[0] || 0);
                  function b() {
                    t.updateSlides(),
                      t.updateProgress(),
                      t.updateSlidesClasses(),
                      t.lazy && t.params.lazy.enabled && t.lazy.load();
                  }
                  if (
                    (fe(t.virtual, {
                      from: S,
                      to: x,
                      offset: y,
                      slidesGrid: t.slidesGrid,
                    }),
                    p === S && d === x && !e)
                  )
                    return (
                      t.slidesGrid !== $ &&
                        y !== m &&
                        t.slides.css(h, y + 'px'),
                      void t.updateProgress()
                    );
                  if (t.params.virtual.renderExternal)
                    return (
                      t.params.virtual.renderExternal.call(t, {
                        offset: y,
                        from: S,
                        to: x,
                        slides: (function () {
                          for (var e = [], t = S; t <= x; t += 1) e.push(u[t]);
                          return e;
                        })(),
                      }),
                      void (t.params.virtual.renderExternalUpdate && b())
                    );
                  var E = [],
                    C = [];
                  if (e) t.$wrapperEl.find('.' + t.params.slideClass).remove();
                  else
                    for (var T = p; T <= d; T += 1)
                      (T < S || T > x) &&
                        t.$wrapperEl
                          .find(
                            '.' +
                              t.params.slideClass +
                              '[data-swiper-slide-index="' +
                              T +
                              '"]',
                          )
                          .remove();
                  for (var k = 0; k < u.length; k += 1)
                    k >= S &&
                      k <= x &&
                      (void 0 === d || e
                        ? C.push(k)
                        : (k > d && C.push(k), k < p && E.push(k)));
                  C.forEach(function (e) {
                    t.$wrapperEl.append(f(u[e], e));
                  }),
                    E.sort(function (e, t) {
                      return t - e;
                    }).forEach(function (e) {
                      t.$wrapperEl.prepend(f(u[e], e));
                    }),
                    t.$wrapperEl.children('.swiper-slide').css(h, y + 'px'),
                    b();
                },
                renderSlide: function (e, t) {
                  var s = this.params.virtual;
                  if (s.cache && this.virtual.cache[t])
                    return this.virtual.cache[t];
                  var i = s.renderSlide
                    ? ce(s.renderSlide.call(this, e, t))
                    : ce(
                        '<div class="' +
                          this.params.slideClass +
                          '" data-swiper-slide-index="' +
                          t +
                          '">' +
                          e +
                          '</div>',
                      );
                  return (
                    i.attr('data-swiper-slide-index') ||
                      i.attr('data-swiper-slide-index', t),
                    s.cache && (this.virtual.cache[t] = i),
                    i
                  );
                },
                appendSlide: function (e) {
                  if ('object' == typeof e && 'length' in e)
                    for (var t = 0; t < e.length; t += 1)
                      e[t] && this.virtual.slides.push(e[t]);
                  else this.virtual.slides.push(e);
                  this.virtual.update(!0);
                },
                prependSlide: function (e) {
                  var t = this.activeIndex,
                    s = t + 1,
                    i = 1;
                  if (Array.isArray(e)) {
                    for (var n = 0; n < e.length; n += 1)
                      e[n] && this.virtual.slides.unshift(e[n]);
                    (s = t + e.length), (i = e.length);
                  } else this.virtual.slides.unshift(e);
                  if (this.params.virtual.cache) {
                    var r = this.virtual.cache,
                      a = {};
                    Object.keys(r).forEach(function (e) {
                      var t = r[e],
                        s = t.attr('data-swiper-slide-index');
                      s &&
                        t.attr('data-swiper-slide-index', parseInt(s, 10) + 1),
                        (a[parseInt(e, 10) + i] = t);
                    }),
                      (this.virtual.cache = a);
                  }
                  this.virtual.update(!0), this.slideTo(s, 0);
                },
                removeSlide: function (e) {
                  if (null != e) {
                    var t = this.activeIndex;
                    if (Array.isArray(e))
                      for (var s = e.length - 1; s >= 0; s -= 1)
                        this.virtual.slides.splice(e[s], 1),
                          this.params.virtual.cache &&
                            delete this.virtual.cache[e[s]],
                          e[s] < t && (t -= 1),
                          (t = Math.max(t, 0));
                    else
                      this.virtual.slides.splice(e, 1),
                        this.params.virtual.cache &&
                          delete this.virtual.cache[e],
                        e < t && (t -= 1),
                        (t = Math.max(t, 0));
                    this.virtual.update(!0), this.slideTo(t, 0);
                  }
                },
                removeAllSlides: function () {
                  (this.virtual.slides = []),
                    this.params.virtual.cache && (this.virtual.cache = {}),
                    this.virtual.update(!0),
                    this.slideTo(0, 0);
                },
              },
              Ve = {
                name: 'virtual',
                params: {
                  virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    renderExternalUpdate: !0,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0,
                  },
                },
                create: function () {
                  me(this, {
                    virtual: Ne(
                      Ne({}, Be),
                      {},
                      { slides: this.params.virtual.slides, cache: {} },
                    ),
                  });
                },
                on: {
                  beforeInit: function (e) {
                    if (e.params.virtual.enabled) {
                      e.classNames.push(
                        e.params.containerModifierClass + 'virtual',
                      );
                      var t = { watchSlidesProgress: !0 };
                      fe(e.params, t),
                        fe(e.originalParams, t),
                        e.params.initialSlide || e.virtual.update();
                    }
                  },
                  setTranslate: function (e) {
                    e.params.virtual.enabled && e.virtual.update();
                  },
                },
              };
            function Ge() {
              return (Ge =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var qe = {
                handle: function (e) {
                  var t = R(),
                    s = X(),
                    i = this.rtlTranslate,
                    n = e;
                  n.originalEvent && (n = n.originalEvent);
                  var r = n.keyCode || n.charCode,
                    a = this.params.keyboard.pageUpDown,
                    o = a && 33 === r,
                    l = a && 34 === r,
                    c = 37 === r,
                    p = 39 === r,
                    d = 38 === r,
                    u = 40 === r;
                  if (
                    !this.allowSlideNext &&
                    ((this.isHorizontal() && p) ||
                      (this.isVertical() && u) ||
                      l)
                  )
                    return !1;
                  if (
                    !this.allowSlidePrev &&
                    ((this.isHorizontal() && c) ||
                      (this.isVertical() && d) ||
                      o)
                  )
                    return !1;
                  if (
                    !(
                      n.shiftKey ||
                      n.altKey ||
                      n.ctrlKey ||
                      n.metaKey ||
                      (s.activeElement &&
                        s.activeElement.nodeName &&
                        ('input' === s.activeElement.nodeName.toLowerCase() ||
                          'textarea' ===
                            s.activeElement.nodeName.toLowerCase()))
                    )
                  ) {
                    if (
                      this.params.keyboard.onlyInViewport &&
                      (o || l || c || p || d || u)
                    ) {
                      var $ = !1;
                      if (
                        this.$el.parents('.' + this.params.slideClass).length >
                          0 &&
                        0 ===
                          this.$el.parents('.' + this.params.slideActiveClass)
                            .length
                      )
                        return;
                      var f = t.innerWidth,
                        m = t.innerHeight,
                        h = this.$el.offset();
                      i && (h.left -= this.$el[0].scrollLeft);
                      for (
                        var g = [
                            [h.left, h.top],
                            [h.left + this.width, h.top],
                            [h.left, h.top + this.height],
                            [h.left + this.width, h.top + this.height],
                          ],
                          v = 0;
                        v < g.length;
                        v += 1
                      ) {
                        var w = g[v];
                        w[0] >= 0 &&
                          w[0] <= f &&
                          w[1] >= 0 &&
                          w[1] <= m &&
                          ($ = !0);
                      }
                      if (!$) return;
                    }
                    this.isHorizontal()
                      ? ((o || l || c || p) &&
                          (n.preventDefault
                            ? n.preventDefault()
                            : (n.returnValue = !1)),
                        (((l || p) && !i) || ((o || c) && i)) &&
                          this.slideNext(),
                        (((o || c) && !i) || ((l || p) && i)) &&
                          this.slidePrev())
                      : ((o || l || d || u) &&
                          (n.preventDefault
                            ? n.preventDefault()
                            : (n.returnValue = !1)),
                        (l || u) && this.slideNext(),
                        (o || d) && this.slidePrev()),
                      this.emit('keyPress', r);
                  }
                },
                enable: function () {
                  var e = X();
                  this.keyboard.enabled ||
                    (ce(e).on('keydown', this.keyboard.handle),
                    (this.keyboard.enabled = !0));
                },
                disable: function () {
                  var e = X();
                  this.keyboard.enabled &&
                    (ce(e).off('keydown', this.keyboard.handle),
                    (this.keyboard.enabled = !1));
                },
              },
              He = {
                name: 'keyboard',
                params: {
                  keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 },
                },
                create: function () {
                  me(this, { keyboard: Ge({ enabled: !1 }, qe) });
                },
                on: {
                  init: function (e) {
                    e.params.keyboard.enabled && e.keyboard.enable();
                  },
                  destroy: function (e) {
                    e.keyboard.enabled && e.keyboard.disable();
                  },
                },
              },
              _e = {
                lastScrollTime: de(),
                lastEventBeforeSnap: void 0,
                recentWheelEvents: [],
                event: function () {
                  return R().navigator.userAgent.indexOf('firefox') > -1
                    ? 'DOMMouseScroll'
                    : (function () {
                        var e = X(),
                          t = 'onwheel' in e;
                        if (!t) {
                          var s = e.createElement('div');
                          s.setAttribute('onwheel', 'return;'),
                            (t = 'function' == typeof s.onwheel);
                        }
                        return (
                          !t &&
                            e.implementation &&
                            e.implementation.hasFeature &&
                            !0 !== e.implementation.hasFeature('', '') &&
                            (t = e.implementation.hasFeature(
                              'Events.wheel',
                              '3.0',
                            )),
                          t
                        );
                      })()
                    ? 'wheel'
                    : 'mousewheel';
                },
                normalize: function (e) {
                  var t = 0,
                    s = 0,
                    i = 0,
                    n = 0;
                  return (
                    'detail' in e && (s = e.detail),
                    'wheelDelta' in e && (s = -e.wheelDelta / 120),
                    'wheelDeltaY' in e && (s = -e.wheelDeltaY / 120),
                    'wheelDeltaX' in e && (t = -e.wheelDeltaX / 120),
                    'axis' in e &&
                      e.axis === e.HORIZONTAL_AXIS &&
                      ((t = s), (s = 0)),
                    (i = 10 * t),
                    (n = 10 * s),
                    'deltaY' in e && (n = e.deltaY),
                    'deltaX' in e && (i = e.deltaX),
                    e.shiftKey && !i && ((i = n), (n = 0)),
                    (i || n) &&
                      e.deltaMode &&
                      (1 === e.deltaMode
                        ? ((i *= 40), (n *= 40))
                        : ((i *= 800), (n *= 800))),
                    i && !t && (t = i < 1 ? -1 : 1),
                    n && !s && (s = n < 1 ? -1 : 1),
                    { spinX: t, spinY: s, pixelX: i, pixelY: n }
                  );
                },
                handleMouseEnter: function () {
                  this.mouseEntered = !0;
                },
                handleMouseLeave: function () {
                  this.mouseEntered = !1;
                },
                handle: function (e) {
                  var t = e,
                    s = this,
                    i = s.params.mousewheel;
                  s.params.cssMode && t.preventDefault();
                  var n = s.$el;
                  if (
                    ('container' !== s.params.mousewheel.eventsTarget &&
                      (n = ce(s.params.mousewheel.eventsTarget)),
                    !s.mouseEntered &&
                      !n[0].contains(t.target) &&
                      !i.releaseOnEdges)
                  )
                    return !0;
                  t.originalEvent && (t = t.originalEvent);
                  var r = 0,
                    a = s.rtlTranslate ? -1 : 1,
                    o = _e.normalize(t);
                  if (i.forceToAxis)
                    if (s.isHorizontal()) {
                      if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
                      r = -o.pixelX * a;
                    } else {
                      if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
                      r = -o.pixelY;
                    }
                  else
                    r =
                      Math.abs(o.pixelX) > Math.abs(o.pixelY)
                        ? -o.pixelX * a
                        : -o.pixelY;
                  if (0 === r) return !0;
                  if ((i.invert && (r = -r), s.params.freeMode)) {
                    var l = {
                        time: de(),
                        delta: Math.abs(r),
                        direction: Math.sign(r),
                      },
                      c = s.mousewheel.lastEventBeforeSnap,
                      p =
                        c &&
                        l.time < c.time + 500 &&
                        l.delta <= c.delta &&
                        l.direction === c.direction;
                    if (!p) {
                      (s.mousewheel.lastEventBeforeSnap = void 0),
                        s.params.loop && s.loopFix();
                      var d = s.getTranslate() + r * i.sensitivity,
                        u = s.isBeginning,
                        $ = s.isEnd;
                      if (
                        (d >= s.minTranslate() && (d = s.minTranslate()),
                        d <= s.maxTranslate() && (d = s.maxTranslate()),
                        s.setTransition(0),
                        s.setTranslate(d),
                        s.updateProgress(),
                        s.updateActiveIndex(),
                        s.updateSlidesClasses(),
                        ((!u && s.isBeginning) || (!$ && s.isEnd)) &&
                          s.updateSlidesClasses(),
                        s.params.freeModeSticky)
                      ) {
                        clearTimeout(s.mousewheel.timeout),
                          (s.mousewheel.timeout = void 0);
                        var f = s.mousewheel.recentWheelEvents;
                        f.length >= 15 && f.shift();
                        var m = f.length ? f[f.length - 1] : void 0,
                          h = f[0];
                        if (
                          (f.push(l),
                          m &&
                            (l.delta > m.delta || l.direction !== m.direction))
                        )
                          f.splice(0);
                        else if (
                          f.length >= 15 &&
                          l.time - h.time < 500 &&
                          h.delta - l.delta >= 1 &&
                          l.delta <= 6
                        ) {
                          var g = r > 0 ? 0.8 : 0.2;
                          (s.mousewheel.lastEventBeforeSnap = l),
                            f.splice(0),
                            (s.mousewheel.timeout = pe(function () {
                              s.slideToClosest(s.params.speed, !0, void 0, g);
                            }, 0));
                        }
                        s.mousewheel.timeout ||
                          (s.mousewheel.timeout = pe(function () {
                            (s.mousewheel.lastEventBeforeSnap = l),
                              f.splice(0),
                              s.slideToClosest(s.params.speed, !0, void 0, 0.5);
                          }, 500));
                      }
                      if (
                        (p || s.emit('scroll', t),
                        s.params.autoplay &&
                          s.params.autoplayDisableOnInteraction &&
                          s.autoplay.stop(),
                        d === s.minTranslate() || d === s.maxTranslate())
                      )
                        return !0;
                    }
                  } else {
                    var v = {
                        time: de(),
                        delta: Math.abs(r),
                        direction: Math.sign(r),
                        raw: e,
                      },
                      w = s.mousewheel.recentWheelEvents;
                    w.length >= 2 && w.shift();
                    var S = w.length ? w[w.length - 1] : void 0;
                    if (
                      (w.push(v),
                      S
                        ? (v.direction !== S.direction ||
                            v.delta > S.delta ||
                            v.time > S.time + 150) &&
                          s.mousewheel.animateSlider(v)
                        : s.mousewheel.animateSlider(v),
                      s.mousewheel.releaseScroll(v))
                    )
                      return !0;
                  }
                  return (
                    t.preventDefault
                      ? t.preventDefault()
                      : (t.returnValue = !1),
                    !1
                  );
                },
                animateSlider: function (e) {
                  var t = R();
                  return !(
                    (this.params.mousewheel.thresholdDelta &&
                      e.delta < this.params.mousewheel.thresholdDelta) ||
                    (this.params.mousewheel.thresholdTime &&
                      de() - this.mousewheel.lastScrollTime <
                        this.params.mousewheel.thresholdTime) ||
                    (!(
                      e.delta >= 6 && de() - this.mousewheel.lastScrollTime < 60
                    ) &&
                      (e.direction < 0
                        ? (this.isEnd && !this.params.loop) ||
                          this.animating ||
                          (this.slideNext(), this.emit('scroll', e.raw))
                        : (this.isBeginning && !this.params.loop) ||
                          this.animating ||
                          (this.slidePrev(), this.emit('scroll', e.raw)),
                      (this.mousewheel.lastScrollTime = new t.Date().getTime()),
                      1))
                  );
                },
                releaseScroll: function (e) {
                  var t = this.params.mousewheel;
                  if (e.direction < 0) {
                    if (this.isEnd && !this.params.loop && t.releaseOnEdges)
                      return !0;
                  } else if (
                    this.isBeginning &&
                    !this.params.loop &&
                    t.releaseOnEdges
                  )
                    return !0;
                  return !1;
                },
                enable: function () {
                  var e = _e.event();
                  if (this.params.cssMode)
                    return (
                      this.wrapperEl.removeEventListener(
                        e,
                        this.mousewheel.handle,
                      ),
                      !0
                    );
                  if (!e) return !1;
                  if (this.mousewheel.enabled) return !1;
                  var t = this.$el;
                  return (
                    'container' !== this.params.mousewheel.eventsTarget &&
                      (t = ce(this.params.mousewheel.eventsTarget)),
                    t.on('mouseenter', this.mousewheel.handleMouseEnter),
                    t.on('mouseleave', this.mousewheel.handleMouseLeave),
                    t.on(e, this.mousewheel.handle),
                    (this.mousewheel.enabled = !0),
                    !0
                  );
                },
                disable: function () {
                  var e = _e.event();
                  if (this.params.cssMode)
                    return (
                      this.wrapperEl.addEventListener(
                        e,
                        this.mousewheel.handle,
                      ),
                      !0
                    );
                  if (!e) return !1;
                  if (!this.mousewheel.enabled) return !1;
                  var t = this.$el;
                  return (
                    'container' !== this.params.mousewheel.eventsTarget &&
                      (t = ce(this.params.mousewheel.eventsTarget)),
                    t.off(e, this.mousewheel.handle),
                    (this.mousewheel.enabled = !1),
                    !0
                  );
                },
              };
            function Fe() {
              return (Fe =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var Xe = {
              update: function () {
                var e = this.params.navigation;
                if (!this.params.loop) {
                  var t = this.navigation,
                    s = t.$nextEl,
                    i = t.$prevEl;
                  i &&
                    i.length > 0 &&
                    (this.isBeginning
                      ? i.addClass(e.disabledClass)
                      : i.removeClass(e.disabledClass),
                    i[
                      this.params.watchOverflow && this.isLocked
                        ? 'addClass'
                        : 'removeClass'
                    ](e.lockClass)),
                    s &&
                      s.length > 0 &&
                      (this.isEnd
                        ? s.addClass(e.disabledClass)
                        : s.removeClass(e.disabledClass),
                      s[
                        this.params.watchOverflow && this.isLocked
                          ? 'addClass'
                          : 'removeClass'
                      ](e.lockClass));
                }
              },
              onPrevClick: function (e) {
                e.preventDefault(),
                  (this.isBeginning && !this.params.loop) || this.slidePrev();
              },
              onNextClick: function (e) {
                e.preventDefault(),
                  (this.isEnd && !this.params.loop) || this.slideNext();
              },
              init: function () {
                var e,
                  t,
                  s = this.params.navigation;
                (s.nextEl || s.prevEl) &&
                  (s.nextEl &&
                    ((e = ce(s.nextEl)),
                    this.params.uniqueNavElements &&
                      'string' == typeof s.nextEl &&
                      e.length > 1 &&
                      1 === this.$el.find(s.nextEl).length &&
                      (e = this.$el.find(s.nextEl))),
                  s.prevEl &&
                    ((t = ce(s.prevEl)),
                    this.params.uniqueNavElements &&
                      'string' == typeof s.prevEl &&
                      t.length > 1 &&
                      1 === this.$el.find(s.prevEl).length &&
                      (t = this.$el.find(s.prevEl))),
                  e &&
                    e.length > 0 &&
                    e.on('click', this.navigation.onNextClick),
                  t &&
                    t.length > 0 &&
                    t.on('click', this.navigation.onPrevClick),
                  fe(this.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0],
                  }));
              },
              destroy: function () {
                var e = this.navigation,
                  t = e.$nextEl,
                  s = e.$prevEl;
                t &&
                  t.length &&
                  (t.off('click', this.navigation.onNextClick),
                  t.removeClass(this.params.navigation.disabledClass)),
                  s &&
                    s.length &&
                    (s.off('click', this.navigation.onPrevClick),
                    s.removeClass(this.params.navigation.disabledClass));
              },
            };
            function Ye() {
              return (Ye =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var Re = {
              update: function () {
                var e = this.rtl,
                  t = this.params.pagination;
                if (
                  t.el &&
                  this.pagination.el &&
                  this.pagination.$el &&
                  0 !== this.pagination.$el.length
                ) {
                  var s,
                    i =
                      this.virtual && this.params.virtual.enabled
                        ? this.virtual.slides.length
                        : this.slides.length,
                    n = this.pagination.$el,
                    r = this.params.loop
                      ? Math.ceil(
                          (i - 2 * this.loopedSlides) /
                            this.params.slidesPerGroup,
                        )
                      : this.snapGrid.length;
                  if (
                    (this.params.loop
                      ? ((s = Math.ceil(
                          (this.activeIndex - this.loopedSlides) /
                            this.params.slidesPerGroup,
                        )) >
                          i - 1 - 2 * this.loopedSlides &&
                          (s -= i - 2 * this.loopedSlides),
                        s > r - 1 && (s -= r),
                        s < 0 &&
                          'bullets' !== this.params.paginationType &&
                          (s = r + s))
                      : (s =
                          void 0 !== this.snapIndex
                            ? this.snapIndex
                            : this.activeIndex || 0),
                    'bullets' === t.type &&
                      this.pagination.bullets &&
                      this.pagination.bullets.length > 0)
                  ) {
                    var a,
                      o,
                      l,
                      c = this.pagination.bullets;
                    if (
                      (t.dynamicBullets &&
                        ((this.pagination.bulletSize = c
                          .eq(0)
                          [this.isHorizontal() ? 'outerWidth' : 'outerHeight'](
                            !0,
                          )),
                        n.css(
                          this.isHorizontal() ? 'width' : 'height',
                          this.pagination.bulletSize *
                            (t.dynamicMainBullets + 4) +
                            'px',
                        ),
                        t.dynamicMainBullets > 1 &&
                          void 0 !== this.previousIndex &&
                          ((this.pagination.dynamicBulletIndex +=
                            s - this.previousIndex),
                          this.pagination.dynamicBulletIndex >
                          t.dynamicMainBullets - 1
                            ? (this.pagination.dynamicBulletIndex =
                                t.dynamicMainBullets - 1)
                            : this.pagination.dynamicBulletIndex < 0 &&
                              (this.pagination.dynamicBulletIndex = 0)),
                        (a = s - this.pagination.dynamicBulletIndex),
                        (l =
                          ((o =
                            a +
                            (Math.min(c.length, t.dynamicMainBullets) - 1)) +
                            a) /
                          2)),
                      c.removeClass(
                        t.bulletActiveClass +
                          ' ' +
                          t.bulletActiveClass +
                          '-next ' +
                          t.bulletActiveClass +
                          '-next-next ' +
                          t.bulletActiveClass +
                          '-prev ' +
                          t.bulletActiveClass +
                          '-prev-prev ' +
                          t.bulletActiveClass +
                          '-main',
                      ),
                      n.length > 1)
                    )
                      c.each(function (e) {
                        var i = ce(e),
                          n = i.index();
                        n === s && i.addClass(t.bulletActiveClass),
                          t.dynamicBullets &&
                            (n >= a &&
                              n <= o &&
                              i.addClass(t.bulletActiveClass + '-main'),
                            n === a &&
                              i
                                .prev()
                                .addClass(t.bulletActiveClass + '-prev')
                                .prev()
                                .addClass(t.bulletActiveClass + '-prev-prev'),
                            n === o &&
                              i
                                .next()
                                .addClass(t.bulletActiveClass + '-next')
                                .next()
                                .addClass(t.bulletActiveClass + '-next-next'));
                      });
                    else {
                      var p = c.eq(s),
                        d = p.index();
                      if ((p.addClass(t.bulletActiveClass), t.dynamicBullets)) {
                        for (
                          var u = c.eq(a), $ = c.eq(o), f = a;
                          f <= o;
                          f += 1
                        )
                          c.eq(f).addClass(t.bulletActiveClass + '-main');
                        if (this.params.loop)
                          if (d >= c.length - t.dynamicMainBullets) {
                            for (var m = t.dynamicMainBullets; m >= 0; m -= 1)
                              c.eq(c.length - m).addClass(
                                t.bulletActiveClass + '-main',
                              );
                            c.eq(c.length - t.dynamicMainBullets - 1).addClass(
                              t.bulletActiveClass + '-prev',
                            );
                          } else
                            u
                              .prev()
                              .addClass(t.bulletActiveClass + '-prev')
                              .prev()
                              .addClass(t.bulletActiveClass + '-prev-prev'),
                              $.next()
                                .addClass(t.bulletActiveClass + '-next')
                                .next()
                                .addClass(t.bulletActiveClass + '-next-next');
                        else
                          u
                            .prev()
                            .addClass(t.bulletActiveClass + '-prev')
                            .prev()
                            .addClass(t.bulletActiveClass + '-prev-prev'),
                            $.next()
                              .addClass(t.bulletActiveClass + '-next')
                              .next()
                              .addClass(t.bulletActiveClass + '-next-next');
                      }
                    }
                    if (t.dynamicBullets) {
                      var h = Math.min(c.length, t.dynamicMainBullets + 4),
                        g =
                          (this.pagination.bulletSize * h -
                            this.pagination.bulletSize) /
                            2 -
                          l * this.pagination.bulletSize,
                        v = e ? 'right' : 'left';
                      c.css(this.isHorizontal() ? v : 'top', g + 'px');
                    }
                  }
                  if (
                    ('fraction' === t.type &&
                      (n
                        .find('.' + t.currentClass)
                        .text(t.formatFractionCurrent(s + 1)),
                      n
                        .find('.' + t.totalClass)
                        .text(t.formatFractionTotal(r))),
                    'progressbar' === t.type)
                  ) {
                    var w;
                    w = t.progressbarOpposite
                      ? this.isHorizontal()
                        ? 'vertical'
                        : 'horizontal'
                      : this.isHorizontal()
                      ? 'horizontal'
                      : 'vertical';
                    var S = (s + 1) / r,
                      x = 1,
                      y = 1;
                    'horizontal' === w ? (x = S) : (y = S),
                      n
                        .find('.' + t.progressbarFillClass)
                        .transform(
                          'translate3d(0,0,0) scaleX(' +
                            x +
                            ') scaleY(' +
                            y +
                            ')',
                        )
                        .transition(this.params.speed);
                  }
                  'custom' === t.type && t.renderCustom
                    ? (n.html(t.renderCustom(this, s + 1, r)),
                      this.emit('paginationRender', n[0]))
                    : this.emit('paginationUpdate', n[0]),
                    n[
                      this.params.watchOverflow && this.isLocked
                        ? 'addClass'
                        : 'removeClass'
                    ](t.lockClass);
                }
              },
              render: function () {
                var e = this.params.pagination;
                if (
                  e.el &&
                  this.pagination.el &&
                  this.pagination.$el &&
                  0 !== this.pagination.$el.length
                ) {
                  var t =
                      this.virtual && this.params.virtual.enabled
                        ? this.virtual.slides.length
                        : this.slides.length,
                    s = this.pagination.$el,
                    i = '';
                  if ('bullets' === e.type) {
                    for (
                      var n = this.params.loop
                          ? Math.ceil(
                              (t - 2 * this.loopedSlides) /
                                this.params.slidesPerGroup,
                            )
                          : this.snapGrid.length,
                        r = 0;
                      r < n;
                      r += 1
                    )
                      e.renderBullet
                        ? (i += e.renderBullet.call(this, r, e.bulletClass))
                        : (i +=
                            '<' +
                            e.bulletElement +
                            ' class="' +
                            e.bulletClass +
                            '"></' +
                            e.bulletElement +
                            '>');
                    s.html(i),
                      (this.pagination.bullets = s.find('.' + e.bulletClass));
                  }
                  'fraction' === e.type &&
                    ((i = e.renderFraction
                      ? e.renderFraction.call(
                          this,
                          e.currentClass,
                          e.totalClass,
                        )
                      : '<span class="' +
                        e.currentClass +
                        '"></span> / <span class="' +
                        e.totalClass +
                        '"></span>'),
                    s.html(i)),
                    'progressbar' === e.type &&
                      ((i = e.renderProgressbar
                        ? e.renderProgressbar.call(this, e.progressbarFillClass)
                        : '<span class="' +
                          e.progressbarFillClass +
                          '"></span>'),
                      s.html(i)),
                    'custom' !== e.type &&
                      this.emit('paginationRender', this.pagination.$el[0]);
                }
              },
              init: function () {
                var e = this,
                  t = e.params.pagination;
                if (t.el) {
                  var s = ce(t.el);
                  0 !== s.length &&
                    (e.params.uniqueNavElements &&
                      'string' == typeof t.el &&
                      s.length > 1 &&
                      (s = e.$el.find(t.el)),
                    'bullets' === t.type &&
                      t.clickable &&
                      s.addClass(t.clickableClass),
                    s.addClass(t.modifierClass + t.type),
                    'bullets' === t.type &&
                      t.dynamicBullets &&
                      (s.addClass('' + t.modifierClass + t.type + '-dynamic'),
                      (e.pagination.dynamicBulletIndex = 0),
                      t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                    'progressbar' === t.type &&
                      t.progressbarOpposite &&
                      s.addClass(t.progressbarOppositeClass),
                    t.clickable &&
                      s.on('click', '.' + t.bulletClass, function (t) {
                        t.preventDefault();
                        var s = ce(this).index() * e.params.slidesPerGroup;
                        e.params.loop && (s += e.loopedSlides), e.slideTo(s);
                      }),
                    fe(e.pagination, { $el: s, el: s[0] }));
                }
              },
              destroy: function () {
                var e = this.params.pagination;
                if (
                  e.el &&
                  this.pagination.el &&
                  this.pagination.$el &&
                  0 !== this.pagination.$el.length
                ) {
                  var t = this.pagination.$el;
                  t.removeClass(e.hiddenClass),
                    t.removeClass(e.modifierClass + e.type),
                    this.pagination.bullets &&
                      this.pagination.bullets.removeClass(e.bulletActiveClass),
                    e.clickable && t.off('click', '.' + e.bulletClass);
                }
              },
            };
            function We() {
              return (We =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var Ue = {
              setTranslate: function () {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                  var e = this.scrollbar,
                    t = this.rtlTranslate,
                    s = this.progress,
                    i = e.dragSize,
                    n = e.trackSize,
                    r = e.$dragEl,
                    a = e.$el,
                    o = this.params.scrollbar,
                    l = i,
                    c = (n - i) * s;
                  t
                    ? (c = -c) > 0
                      ? ((l = i - c), (c = 0))
                      : -c + i > n && (l = n + c)
                    : c < 0
                    ? ((l = i + c), (c = 0))
                    : c + i > n && (l = n - c),
                    this.isHorizontal()
                      ? (r.transform('translate3d(' + c + 'px, 0, 0)'),
                        (r[0].style.width = l + 'px'))
                      : (r.transform('translate3d(0px, ' + c + 'px, 0)'),
                        (r[0].style.height = l + 'px')),
                    o.hide &&
                      (clearTimeout(this.scrollbar.timeout),
                      (a[0].style.opacity = 1),
                      (this.scrollbar.timeout = setTimeout(function () {
                        (a[0].style.opacity = 0), a.transition(400);
                      }, 1e3)));
                }
              },
              setTransition: function (e) {
                this.params.scrollbar.el &&
                  this.scrollbar.el &&
                  this.scrollbar.$dragEl.transition(e);
              },
              updateSize: function () {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                  var e = this.scrollbar,
                    t = e.$dragEl,
                    s = e.$el;
                  (t[0].style.width = ''), (t[0].style.height = '');
                  var i,
                    n = this.isHorizontal()
                      ? s[0].offsetWidth
                      : s[0].offsetHeight,
                    r = this.size / this.virtualSize,
                    a = r * (n / this.size);
                  (i =
                    'auto' === this.params.scrollbar.dragSize
                      ? n * r
                      : parseInt(this.params.scrollbar.dragSize, 10)),
                    this.isHorizontal()
                      ? (t[0].style.width = i + 'px')
                      : (t[0].style.height = i + 'px'),
                    (s[0].style.display = r >= 1 ? 'none' : ''),
                    this.params.scrollbar.hide && (s[0].style.opacity = 0),
                    fe(e, {
                      trackSize: n,
                      divider: r,
                      moveDivider: a,
                      dragSize: i,
                    }),
                    e.$el[
                      this.params.watchOverflow && this.isLocked
                        ? 'addClass'
                        : 'removeClass'
                    ](this.params.scrollbar.lockClass);
                }
              },
              getPointerPosition: function (e) {
                return this.isHorizontal()
                  ? 'touchstart' === e.type || 'touchmove' === e.type
                    ? e.targetTouches[0].clientX
                    : e.clientX
                  : 'touchstart' === e.type || 'touchmove' === e.type
                  ? e.targetTouches[0].clientY
                  : e.clientY;
              },
              setDragPosition: function (e) {
                var t,
                  s = this.scrollbar,
                  i = this.rtlTranslate,
                  n = s.$el,
                  r = s.dragSize,
                  a = s.trackSize,
                  o = s.dragStartPos;
                (t =
                  (s.getPointerPosition(e) -
                    n.offset()[this.isHorizontal() ? 'left' : 'top'] -
                    (null !== o ? o : r / 2)) /
                  (a - r)),
                  (t = Math.max(Math.min(t, 1), 0)),
                  i && (t = 1 - t);
                var l =
                  this.minTranslate() +
                  (this.maxTranslate() - this.minTranslate()) * t;
                this.updateProgress(l),
                  this.setTranslate(l),
                  this.updateActiveIndex(),
                  this.updateSlidesClasses();
              },
              onDragStart: function (e) {
                var t = this.params.scrollbar,
                  s = this.scrollbar,
                  i = this.$wrapperEl,
                  n = s.$el,
                  r = s.$dragEl;
                (this.scrollbar.isTouched = !0),
                  (this.scrollbar.dragStartPos =
                    e.target === r[0] || e.target === r
                      ? s.getPointerPosition(e) -
                        e.target.getBoundingClientRect()[
                          this.isHorizontal() ? 'left' : 'top'
                        ]
                      : null),
                  e.preventDefault(),
                  e.stopPropagation(),
                  i.transition(100),
                  r.transition(100),
                  s.setDragPosition(e),
                  clearTimeout(this.scrollbar.dragTimeout),
                  n.transition(0),
                  t.hide && n.css('opacity', 1),
                  this.params.cssMode &&
                    this.$wrapperEl.css('scroll-snap-type', 'none'),
                  this.emit('scrollbarDragStart', e);
              },
              onDragMove: function (e) {
                var t = this.scrollbar,
                  s = this.$wrapperEl,
                  i = t.$el,
                  n = t.$dragEl;
                this.scrollbar.isTouched &&
                  (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
                  t.setDragPosition(e),
                  s.transition(0),
                  i.transition(0),
                  n.transition(0),
                  this.emit('scrollbarDragMove', e));
              },
              onDragEnd: function (e) {
                var t = this.params.scrollbar,
                  s = this.scrollbar,
                  i = this.$wrapperEl,
                  n = s.$el;
                this.scrollbar.isTouched &&
                  ((this.scrollbar.isTouched = !1),
                  this.params.cssMode &&
                    (this.$wrapperEl.css('scroll-snap-type', ''),
                    i.transition('')),
                  t.hide &&
                    (clearTimeout(this.scrollbar.dragTimeout),
                    (this.scrollbar.dragTimeout = pe(function () {
                      n.css('opacity', 0), n.transition(400);
                    }, 1e3))),
                  this.emit('scrollbarDragEnd', e),
                  t.snapOnRelease && this.slideToClosest());
              },
              enableDraggable: function () {
                if (this.params.scrollbar.el) {
                  var e = X(),
                    t = this.scrollbar,
                    s = this.touchEventsTouch,
                    i = this.touchEventsDesktop,
                    n = this.params,
                    r = this.support,
                    a = t.$el[0],
                    o = !(!r.passiveListener || !n.passiveListeners) && {
                      passive: !1,
                      capture: !1,
                    },
                    l = !(!r.passiveListener || !n.passiveListeners) && {
                      passive: !0,
                      capture: !1,
                    };
                  r.touch
                    ? (a.addEventListener(
                        s.start,
                        this.scrollbar.onDragStart,
                        o,
                      ),
                      a.addEventListener(s.move, this.scrollbar.onDragMove, o),
                      a.addEventListener(s.end, this.scrollbar.onDragEnd, l))
                    : (a.addEventListener(
                        i.start,
                        this.scrollbar.onDragStart,
                        o,
                      ),
                      e.addEventListener(i.move, this.scrollbar.onDragMove, o),
                      e.addEventListener(i.end, this.scrollbar.onDragEnd, l));
                }
              },
              disableDraggable: function () {
                if (this.params.scrollbar.el) {
                  var e = X(),
                    t = this.scrollbar,
                    s = this.touchEventsTouch,
                    i = this.touchEventsDesktop,
                    n = this.params,
                    r = this.support,
                    a = t.$el[0],
                    o = !(!r.passiveListener || !n.passiveListeners) && {
                      passive: !1,
                      capture: !1,
                    },
                    l = !(!r.passiveListener || !n.passiveListeners) && {
                      passive: !0,
                      capture: !1,
                    };
                  r.touch
                    ? (a.removeEventListener(
                        s.start,
                        this.scrollbar.onDragStart,
                        o,
                      ),
                      a.removeEventListener(
                        s.move,
                        this.scrollbar.onDragMove,
                        o,
                      ),
                      a.removeEventListener(s.end, this.scrollbar.onDragEnd, l))
                    : (a.removeEventListener(
                        i.start,
                        this.scrollbar.onDragStart,
                        o,
                      ),
                      e.removeEventListener(
                        i.move,
                        this.scrollbar.onDragMove,
                        o,
                      ),
                      e.removeEventListener(
                        i.end,
                        this.scrollbar.onDragEnd,
                        l,
                      ));
                }
              },
              init: function () {
                if (this.params.scrollbar.el) {
                  var e = this.scrollbar,
                    t = this.$el,
                    s = this.params.scrollbar,
                    i = ce(s.el);
                  this.params.uniqueNavElements &&
                    'string' == typeof s.el &&
                    i.length > 1 &&
                    1 === t.find(s.el).length &&
                    (i = t.find(s.el));
                  var n = i.find('.' + this.params.scrollbar.dragClass);
                  0 === n.length &&
                    ((n = ce(
                      '<div class="' +
                        this.params.scrollbar.dragClass +
                        '"></div>',
                    )),
                    i.append(n)),
                    fe(e, { $el: i, el: i[0], $dragEl: n, dragEl: n[0] }),
                    s.draggable && e.enableDraggable();
                }
              },
              destroy: function () {
                this.scrollbar.disableDraggable();
              },
            };
            function Ke() {
              return (Ke =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var Qe = {
              setTransform: function (e, t) {
                var s = this.rtl,
                  i = ce(e),
                  n = s ? -1 : 1,
                  r = i.attr('data-swiper-parallax') || '0',
                  a = i.attr('data-swiper-parallax-x'),
                  o = i.attr('data-swiper-parallax-y'),
                  l = i.attr('data-swiper-parallax-scale'),
                  c = i.attr('data-swiper-parallax-opacity');
                if (
                  (a || o
                    ? ((a = a || '0'), (o = o || '0'))
                    : this.isHorizontal()
                    ? ((a = r), (o = '0'))
                    : ((o = r), (a = '0')),
                  (a =
                    a.indexOf('%') >= 0
                      ? parseInt(a, 10) * t * n + '%'
                      : a * t * n + 'px'),
                  (o =
                    o.indexOf('%') >= 0
                      ? parseInt(o, 10) * t + '%'
                      : o * t + 'px'),
                  null != c)
                ) {
                  var p = c - (c - 1) * (1 - Math.abs(t));
                  i[0].style.opacity = p;
                }
                if (null == l)
                  i.transform('translate3d(' + a + ', ' + o + ', 0px)');
                else {
                  var d = l - (l - 1) * (1 - Math.abs(t));
                  i.transform(
                    'translate3d(' + a + ', ' + o + ', 0px) scale(' + d + ')',
                  );
                }
              },
              setTranslate: function () {
                var e = this,
                  t = e.$el,
                  s = e.slides,
                  i = e.progress,
                  n = e.snapGrid;
                t
                  .children(
                    '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]',
                  )
                  .each(function (t) {
                    e.parallax.setTransform(t, i);
                  }),
                  s.each(function (t, s) {
                    var r = t.progress;
                    e.params.slidesPerGroup > 1 &&
                      'auto' !== e.params.slidesPerView &&
                      (r += Math.ceil(s / 2) - i * (n.length - 1)),
                      (r = Math.min(Math.max(r, -1), 1)),
                      ce(t)
                        .find(
                          '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]',
                        )
                        .each(function (t) {
                          e.parallax.setTransform(t, r);
                        });
                  });
              },
              setTransition: function (e) {
                void 0 === e && (e = this.params.speed),
                  this.$el
                    .find(
                      '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]',
                    )
                    .each(function (t) {
                      var s = ce(t),
                        i =
                          parseInt(
                            s.attr('data-swiper-parallax-duration'),
                            10,
                          ) || e;
                      0 === e && (i = 0), s.transition(i);
                    });
              },
            };
            function Ze() {
              return (Ze =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var Je = {
              getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                  s = e.targetTouches[0].pageY,
                  i = e.targetTouches[1].pageX,
                  n = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(i - t, 2) + Math.pow(n - s, 2));
              },
              onGestureStart: function (e) {
                var t = this.support,
                  s = this.params.zoom,
                  i = this.zoom,
                  n = i.gesture;
                if (
                  ((i.fakeGestureTouched = !1),
                  (i.fakeGestureMoved = !1),
                  !t.gestures)
                ) {
                  if (
                    'touchstart' !== e.type ||
                    ('touchstart' === e.type && e.targetTouches.length < 2)
                  )
                    return;
                  (i.fakeGestureTouched = !0),
                    (n.scaleStart = Je.getDistanceBetweenTouches(e));
                }
                (n.$slideEl && n.$slideEl.length) ||
                ((n.$slideEl = ce(e.target).closest(
                  '.' + this.params.slideClass,
                )),
                0 === n.$slideEl.length &&
                  (n.$slideEl = this.slides.eq(this.activeIndex)),
                (n.$imageEl = n.$slideEl.find(
                  'img, svg, canvas, picture, .swiper-zoom-target',
                )),
                (n.$imageWrapEl = n.$imageEl.parent('.' + s.containerClass)),
                (n.maxRatio =
                  n.$imageWrapEl.attr('data-swiper-zoom') || s.maxRatio),
                0 !== n.$imageWrapEl.length)
                  ? (n.$imageEl && n.$imageEl.transition(0),
                    (this.zoom.isScaling = !0))
                  : (n.$imageEl = void 0);
              },
              onGestureChange: function (e) {
                var t = this.support,
                  s = this.params.zoom,
                  i = this.zoom,
                  n = i.gesture;
                if (!t.gestures) {
                  if (
                    'touchmove' !== e.type ||
                    ('touchmove' === e.type && e.targetTouches.length < 2)
                  )
                    return;
                  (i.fakeGestureMoved = !0),
                    (n.scaleMove = Je.getDistanceBetweenTouches(e));
                }
                n.$imageEl && 0 !== n.$imageEl.length
                  ? (t.gestures
                      ? (i.scale = e.scale * i.currentScale)
                      : (i.scale =
                          (n.scaleMove / n.scaleStart) * i.currentScale),
                    i.scale > n.maxRatio &&
                      (i.scale =
                        n.maxRatio -
                        1 +
                        Math.pow(i.scale - n.maxRatio + 1, 0.5)),
                    i.scale < s.minRatio &&
                      (i.scale =
                        s.minRatio +
                        1 -
                        Math.pow(s.minRatio - i.scale + 1, 0.5)),
                    n.$imageEl.transform(
                      'translate3d(0,0,0) scale(' + i.scale + ')',
                    ))
                  : 'gesturechange' === e.type && i.onGestureStart(e);
              },
              onGestureEnd: function (e) {
                var t = this.device,
                  s = this.support,
                  i = this.params.zoom,
                  n = this.zoom,
                  r = n.gesture;
                if (!s.gestures) {
                  if (!n.fakeGestureTouched || !n.fakeGestureMoved) return;
                  if (
                    'touchend' !== e.type ||
                    ('touchend' === e.type &&
                      e.changedTouches.length < 2 &&
                      !t.android)
                  )
                    return;
                  (n.fakeGestureTouched = !1), (n.fakeGestureMoved = !1);
                }
                r.$imageEl &&
                  0 !== r.$imageEl.length &&
                  ((n.scale = Math.max(
                    Math.min(n.scale, r.maxRatio),
                    i.minRatio,
                  )),
                  r.$imageEl
                    .transition(this.params.speed)
                    .transform('translate3d(0,0,0) scale(' + n.scale + ')'),
                  (n.currentScale = n.scale),
                  (n.isScaling = !1),
                  1 === n.scale && (r.$slideEl = void 0));
              },
              onTouchStart: function (e) {
                var t = this.device,
                  s = this.zoom,
                  i = s.gesture,
                  n = s.image;
                i.$imageEl &&
                  0 !== i.$imageEl.length &&
                  (n.isTouched ||
                    (t.android && e.cancelable && e.preventDefault(),
                    (n.isTouched = !0),
                    (n.touchesStart.x =
                      'touchstart' === e.type
                        ? e.targetTouches[0].pageX
                        : e.pageX),
                    (n.touchesStart.y =
                      'touchstart' === e.type
                        ? e.targetTouches[0].pageY
                        : e.pageY)));
              },
              onTouchMove: function (e) {
                var t = this.zoom,
                  s = t.gesture,
                  i = t.image,
                  n = t.velocity;
                if (
                  s.$imageEl &&
                  0 !== s.$imageEl.length &&
                  ((this.allowClick = !1), i.isTouched && s.$slideEl)
                ) {
                  i.isMoved ||
                    ((i.width = s.$imageEl[0].offsetWidth),
                    (i.height = s.$imageEl[0].offsetHeight),
                    (i.startX = ue(s.$imageWrapEl[0], 'x') || 0),
                    (i.startY = ue(s.$imageWrapEl[0], 'y') || 0),
                    (s.slideWidth = s.$slideEl[0].offsetWidth),
                    (s.slideHeight = s.$slideEl[0].offsetHeight),
                    s.$imageWrapEl.transition(0),
                    this.rtl &&
                      ((i.startX = -i.startX), (i.startY = -i.startY)));
                  var r = i.width * t.scale,
                    a = i.height * t.scale;
                  if (!(r < s.slideWidth && a < s.slideHeight)) {
                    if (
                      ((i.minX = Math.min(s.slideWidth / 2 - r / 2, 0)),
                      (i.maxX = -i.minX),
                      (i.minY = Math.min(s.slideHeight / 2 - a / 2, 0)),
                      (i.maxY = -i.minY),
                      (i.touchesCurrent.x =
                        'touchmove' === e.type
                          ? e.targetTouches[0].pageX
                          : e.pageX),
                      (i.touchesCurrent.y =
                        'touchmove' === e.type
                          ? e.targetTouches[0].pageY
                          : e.pageY),
                      !i.isMoved && !t.isScaling)
                    ) {
                      if (
                        this.isHorizontal() &&
                        ((Math.floor(i.minX) === Math.floor(i.startX) &&
                          i.touchesCurrent.x < i.touchesStart.x) ||
                          (Math.floor(i.maxX) === Math.floor(i.startX) &&
                            i.touchesCurrent.x > i.touchesStart.x))
                      )
                        return void (i.isTouched = !1);
                      if (
                        !this.isHorizontal() &&
                        ((Math.floor(i.minY) === Math.floor(i.startY) &&
                          i.touchesCurrent.y < i.touchesStart.y) ||
                          (Math.floor(i.maxY) === Math.floor(i.startY) &&
                            i.touchesCurrent.y > i.touchesStart.y))
                      )
                        return void (i.isTouched = !1);
                    }
                    e.cancelable && e.preventDefault(),
                      e.stopPropagation(),
                      (i.isMoved = !0),
                      (i.currentX =
                        i.touchesCurrent.x - i.touchesStart.x + i.startX),
                      (i.currentY =
                        i.touchesCurrent.y - i.touchesStart.y + i.startY),
                      i.currentX < i.minX &&
                        (i.currentX =
                          i.minX + 1 - Math.pow(i.minX - i.currentX + 1, 0.8)),
                      i.currentX > i.maxX &&
                        (i.currentX =
                          i.maxX - 1 + Math.pow(i.currentX - i.maxX + 1, 0.8)),
                      i.currentY < i.minY &&
                        (i.currentY =
                          i.minY + 1 - Math.pow(i.minY - i.currentY + 1, 0.8)),
                      i.currentY > i.maxY &&
                        (i.currentY =
                          i.maxY - 1 + Math.pow(i.currentY - i.maxY + 1, 0.8)),
                      n.prevPositionX || (n.prevPositionX = i.touchesCurrent.x),
                      n.prevPositionY || (n.prevPositionY = i.touchesCurrent.y),
                      n.prevTime || (n.prevTime = Date.now()),
                      (n.x =
                        (i.touchesCurrent.x - n.prevPositionX) /
                        (Date.now() - n.prevTime) /
                        2),
                      (n.y =
                        (i.touchesCurrent.y - n.prevPositionY) /
                        (Date.now() - n.prevTime) /
                        2),
                      Math.abs(i.touchesCurrent.x - n.prevPositionX) < 2 &&
                        (n.x = 0),
                      Math.abs(i.touchesCurrent.y - n.prevPositionY) < 2 &&
                        (n.y = 0),
                      (n.prevPositionX = i.touchesCurrent.x),
                      (n.prevPositionY = i.touchesCurrent.y),
                      (n.prevTime = Date.now()),
                      s.$imageWrapEl.transform(
                        'translate3d(' +
                          i.currentX +
                          'px, ' +
                          i.currentY +
                          'px,0)',
                      );
                  }
                }
              },
              onTouchEnd: function () {
                var e = this.zoom,
                  t = e.gesture,
                  s = e.image,
                  i = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                  if (!s.isTouched || !s.isMoved)
                    return (s.isTouched = !1), void (s.isMoved = !1);
                  (s.isTouched = !1), (s.isMoved = !1);
                  var n = 300,
                    r = 300,
                    a = i.x * n,
                    o = s.currentX + a,
                    l = i.y * r,
                    c = s.currentY + l;
                  0 !== i.x && (n = Math.abs((o - s.currentX) / i.x)),
                    0 !== i.y && (r = Math.abs((c - s.currentY) / i.y));
                  var p = Math.max(n, r);
                  (s.currentX = o), (s.currentY = c);
                  var d = s.width * e.scale,
                    u = s.height * e.scale;
                  (s.minX = Math.min(t.slideWidth / 2 - d / 2, 0)),
                    (s.maxX = -s.minX),
                    (s.minY = Math.min(t.slideHeight / 2 - u / 2, 0)),
                    (s.maxY = -s.minY),
                    (s.currentX = Math.max(
                      Math.min(s.currentX, s.maxX),
                      s.minX,
                    )),
                    (s.currentY = Math.max(
                      Math.min(s.currentY, s.maxY),
                      s.minY,
                    )),
                    t.$imageWrapEl
                      .transition(p)
                      .transform(
                        'translate3d(' +
                          s.currentX +
                          'px, ' +
                          s.currentY +
                          'px,0)',
                      );
                }
              },
              onTransitionEnd: function () {
                var e = this.zoom,
                  t = e.gesture;
                t.$slideEl &&
                  this.previousIndex !== this.activeIndex &&
                  (t.$imageEl &&
                    t.$imageEl.transform('translate3d(0,0,0) scale(1)'),
                  t.$imageWrapEl &&
                    t.$imageWrapEl.transform('translate3d(0,0,0)'),
                  (e.scale = 1),
                  (e.currentScale = 1),
                  (t.$slideEl = void 0),
                  (t.$imageEl = void 0),
                  (t.$imageWrapEl = void 0));
              },
              toggle: function (e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e);
              },
              in: function (e) {
                var t,
                  s,
                  i,
                  n,
                  r,
                  a,
                  o,
                  l,
                  c,
                  p,
                  d,
                  u,
                  $,
                  f,
                  m,
                  h,
                  g = this.zoom,
                  v = this.params.zoom,
                  w = g.gesture,
                  S = g.image;
                w.$slideEl ||
                  (this.params.virtual &&
                  this.params.virtual.enabled &&
                  this.virtual
                    ? (w.$slideEl = this.$wrapperEl.children(
                        '.' + this.params.slideActiveClass,
                      ))
                    : (w.$slideEl = this.slides.eq(this.activeIndex)),
                  (w.$imageEl = w.$slideEl.find(
                    'img, svg, canvas, picture, .swiper-zoom-target',
                  )),
                  (w.$imageWrapEl = w.$imageEl.parent('.' + v.containerClass))),
                  w.$imageEl &&
                    0 !== w.$imageEl.length &&
                    (w.$slideEl.addClass('' + v.zoomedSlideClass),
                    void 0 === S.touchesStart.x && e
                      ? ((t =
                          'touchend' === e.type
                            ? e.changedTouches[0].pageX
                            : e.pageX),
                        (s =
                          'touchend' === e.type
                            ? e.changedTouches[0].pageY
                            : e.pageY))
                      : ((t = S.touchesStart.x), (s = S.touchesStart.y)),
                    (g.scale =
                      w.$imageWrapEl.attr('data-swiper-zoom') || v.maxRatio),
                    (g.currentScale =
                      w.$imageWrapEl.attr('data-swiper-zoom') || v.maxRatio),
                    e
                      ? ((m = w.$slideEl[0].offsetWidth),
                        (h = w.$slideEl[0].offsetHeight),
                        (i = w.$slideEl.offset().left + m / 2 - t),
                        (n = w.$slideEl.offset().top + h / 2 - s),
                        (o = w.$imageEl[0].offsetWidth),
                        (l = w.$imageEl[0].offsetHeight),
                        (c = o * g.scale),
                        (p = l * g.scale),
                        ($ = -(d = Math.min(m / 2 - c / 2, 0))),
                        (f = -(u = Math.min(h / 2 - p / 2, 0))),
                        (r = i * g.scale) < d && (r = d),
                        r > $ && (r = $),
                        (a = n * g.scale) < u && (a = u),
                        a > f && (a = f))
                      : ((r = 0), (a = 0)),
                    w.$imageWrapEl
                      .transition(300)
                      .transform('translate3d(' + r + 'px, ' + a + 'px,0)'),
                    w.$imageEl
                      .transition(300)
                      .transform('translate3d(0,0,0) scale(' + g.scale + ')'));
              },
              out: function () {
                var e = this.zoom,
                  t = this.params.zoom,
                  s = e.gesture;
                s.$slideEl ||
                  (this.params.virtual &&
                  this.params.virtual.enabled &&
                  this.virtual
                    ? (s.$slideEl = this.$wrapperEl.children(
                        '.' + this.params.slideActiveClass,
                      ))
                    : (s.$slideEl = this.slides.eq(this.activeIndex)),
                  (s.$imageEl = s.$slideEl.find(
                    'img, svg, canvas, picture, .swiper-zoom-target',
                  )),
                  (s.$imageWrapEl = s.$imageEl.parent('.' + t.containerClass))),
                  s.$imageEl &&
                    0 !== s.$imageEl.length &&
                    ((e.scale = 1),
                    (e.currentScale = 1),
                    s.$imageWrapEl
                      .transition(300)
                      .transform('translate3d(0,0,0)'),
                    s.$imageEl
                      .transition(300)
                      .transform('translate3d(0,0,0) scale(1)'),
                    s.$slideEl.removeClass('' + t.zoomedSlideClass),
                    (s.$slideEl = void 0));
              },
              toggleGestures: function (e) {
                var t = this.zoom,
                  s = t.slideSelector,
                  i = t.passiveListener;
                this.$wrapperEl[e]('gesturestart', s, t.onGestureStart, i),
                  this.$wrapperEl[e]('gesturechange', s, t.onGestureChange, i),
                  this.$wrapperEl[e]('gestureend', s, t.onGestureEnd, i);
              },
              enableGestures: function () {
                this.zoom.gesturesEnabled ||
                  ((this.zoom.gesturesEnabled = !0),
                  this.zoom.toggleGestures('on'));
              },
              disableGestures: function () {
                this.zoom.gesturesEnabled &&
                  ((this.zoom.gesturesEnabled = !1),
                  this.zoom.toggleGestures('off'));
              },
              enable: function () {
                var e = this.support,
                  t = this.zoom;
                if (!t.enabled) {
                  t.enabled = !0;
                  var s = !(
                      'touchstart' !== this.touchEvents.start ||
                      !e.passiveListener ||
                      !this.params.passiveListeners
                    ) && { passive: !0, capture: !1 },
                    i = !e.passiveListener || { passive: !1, capture: !0 },
                    n = '.' + this.params.slideClass;
                  (this.zoom.passiveListener = s),
                    (this.zoom.slideSelector = n),
                    e.gestures
                      ? (this.$wrapperEl.on(
                          this.touchEvents.start,
                          this.zoom.enableGestures,
                          s,
                        ),
                        this.$wrapperEl.on(
                          this.touchEvents.end,
                          this.zoom.disableGestures,
                          s,
                        ))
                      : 'touchstart' === this.touchEvents.start &&
                        (this.$wrapperEl.on(
                          this.touchEvents.start,
                          n,
                          t.onGestureStart,
                          s,
                        ),
                        this.$wrapperEl.on(
                          this.touchEvents.move,
                          n,
                          t.onGestureChange,
                          i,
                        ),
                        this.$wrapperEl.on(
                          this.touchEvents.end,
                          n,
                          t.onGestureEnd,
                          s,
                        ),
                        this.touchEvents.cancel &&
                          this.$wrapperEl.on(
                            this.touchEvents.cancel,
                            n,
                            t.onGestureEnd,
                            s,
                          )),
                    this.$wrapperEl.on(
                      this.touchEvents.move,
                      '.' + this.params.zoom.containerClass,
                      t.onTouchMove,
                      i,
                    );
                }
              },
              disable: function () {
                var e = this.zoom;
                if (e.enabled) {
                  var t = this.support;
                  this.zoom.enabled = !1;
                  var s = !(
                      'touchstart' !== this.touchEvents.start ||
                      !t.passiveListener ||
                      !this.params.passiveListeners
                    ) && { passive: !0, capture: !1 },
                    i = !t.passiveListener || { passive: !1, capture: !0 },
                    n = '.' + this.params.slideClass;
                  t.gestures
                    ? (this.$wrapperEl.off(
                        this.touchEvents.start,
                        this.zoom.enableGestures,
                        s,
                      ),
                      this.$wrapperEl.off(
                        this.touchEvents.end,
                        this.zoom.disableGestures,
                        s,
                      ))
                    : 'touchstart' === this.touchEvents.start &&
                      (this.$wrapperEl.off(
                        this.touchEvents.start,
                        n,
                        e.onGestureStart,
                        s,
                      ),
                      this.$wrapperEl.off(
                        this.touchEvents.move,
                        n,
                        e.onGestureChange,
                        i,
                      ),
                      this.$wrapperEl.off(
                        this.touchEvents.end,
                        n,
                        e.onGestureEnd,
                        s,
                      ),
                      this.touchEvents.cancel &&
                        this.$wrapperEl.off(
                          this.touchEvents.cancel,
                          n,
                          e.onGestureEnd,
                          s,
                        )),
                    this.$wrapperEl.off(
                      this.touchEvents.move,
                      '.' + this.params.zoom.containerClass,
                      e.onTouchMove,
                      i,
                    );
                }
              },
            };
            function et() {
              return (et =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var tt = {
              loadInSlide: function (e, t) {
                void 0 === t && (t = !0);
                var s = this,
                  i = s.params.lazy;
                if (void 0 !== e && 0 !== s.slides.length) {
                  var n =
                      s.virtual && s.params.virtual.enabled
                        ? s.$wrapperEl.children(
                            '.' +
                              s.params.slideClass +
                              '[data-swiper-slide-index="' +
                              e +
                              '"]',
                          )
                        : s.slides.eq(e),
                    r = n.find(
                      '.' +
                        i.elementClass +
                        ':not(.' +
                        i.loadedClass +
                        '):not(.' +
                        i.loadingClass +
                        ')',
                    );
                  !n.hasClass(i.elementClass) ||
                    n.hasClass(i.loadedClass) ||
                    n.hasClass(i.loadingClass) ||
                    r.push(n[0]),
                    0 !== r.length &&
                      r.each(function (e) {
                        var r = ce(e);
                        r.addClass(i.loadingClass);
                        var a = r.attr('data-background'),
                          o = r.attr('data-src'),
                          l = r.attr('data-srcset'),
                          c = r.attr('data-sizes'),
                          p = r.parent('picture');
                        s.loadImage(r[0], o || a, l, c, !1, function () {
                          if (
                            null != s &&
                            s &&
                            (!s || s.params) &&
                            !s.destroyed
                          ) {
                            if (
                              (a
                                ? (r.css(
                                    'background-image',
                                    'url("' + a + '")',
                                  ),
                                  r.removeAttr('data-background'))
                                : (l &&
                                    (r.attr('srcset', l),
                                    r.removeAttr('data-srcset')),
                                  c &&
                                    (r.attr('sizes', c),
                                    r.removeAttr('data-sizes')),
                                  p.length &&
                                    p.children('source').each(function (e) {
                                      var t = ce(e);
                                      t.attr('data-srcset') &&
                                        (t.attr(
                                          'srcset',
                                          t.attr('data-srcset'),
                                        ),
                                        t.removeAttr('data-srcset'));
                                    }),
                                  o &&
                                    (r.attr('src', o),
                                    r.removeAttr('data-src'))),
                              r
                                .addClass(i.loadedClass)
                                .removeClass(i.loadingClass),
                              n.find('.' + i.preloaderClass).remove(),
                              s.params.loop && t)
                            ) {
                              var e = n.attr('data-swiper-slide-index');
                              if (n.hasClass(s.params.slideDuplicateClass)) {
                                var d = s.$wrapperEl.children(
                                  '[data-swiper-slide-index="' +
                                    e +
                                    '"]:not(.' +
                                    s.params.slideDuplicateClass +
                                    ')',
                                );
                                s.lazy.loadInSlide(d.index(), !1);
                              } else {
                                var u = s.$wrapperEl.children(
                                  '.' +
                                    s.params.slideDuplicateClass +
                                    '[data-swiper-slide-index="' +
                                    e +
                                    '"]',
                                );
                                s.lazy.loadInSlide(u.index(), !1);
                              }
                            }
                            s.emit('lazyImageReady', n[0], r[0]),
                              s.params.autoHeight && s.updateAutoHeight();
                          }
                        }),
                          s.emit('lazyImageLoad', n[0], r[0]);
                      });
                }
              },
              load: function () {
                var e = this,
                  t = e.$wrapperEl,
                  s = e.params,
                  i = e.slides,
                  n = e.activeIndex,
                  r = e.virtual && s.virtual.enabled,
                  a = s.lazy,
                  o = s.slidesPerView;
                function l(e) {
                  if (r) {
                    if (
                      t.children(
                        '.' +
                          s.slideClass +
                          '[data-swiper-slide-index="' +
                          e +
                          '"]',
                      ).length
                    )
                      return !0;
                  } else if (i[e]) return !0;
                  return !1;
                }
                function c(e) {
                  return r
                    ? ce(e).attr('data-swiper-slide-index')
                    : ce(e).index();
                }
                if (
                  ('auto' === o && (o = 0),
                  e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0),
                  e.params.watchSlidesVisibility)
                )
                  t.children('.' + s.slideVisibleClass).each(function (t) {
                    var s = r
                      ? ce(t).attr('data-swiper-slide-index')
                      : ce(t).index();
                    e.lazy.loadInSlide(s);
                  });
                else if (o > 1)
                  for (var p = n; p < n + o; p += 1)
                    l(p) && e.lazy.loadInSlide(p);
                else e.lazy.loadInSlide(n);
                if (a.loadPrevNext)
                  if (
                    o > 1 ||
                    (a.loadPrevNextAmount && a.loadPrevNextAmount > 1)
                  ) {
                    for (
                      var d = a.loadPrevNextAmount,
                        u = o,
                        $ = Math.min(n + u + Math.max(d, u), i.length),
                        f = Math.max(n - Math.max(u, d), 0),
                        m = n + o;
                      m < $;
                      m += 1
                    )
                      l(m) && e.lazy.loadInSlide(m);
                    for (var h = f; h < n; h += 1)
                      l(h) && e.lazy.loadInSlide(h);
                  } else {
                    var g = t.children('.' + s.slideNextClass);
                    g.length > 0 && e.lazy.loadInSlide(c(g));
                    var v = t.children('.' + s.slidePrevClass);
                    v.length > 0 && e.lazy.loadInSlide(c(v));
                  }
              },
            };
            function st() {
              return (st =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var it = {
              LinearSpline: function (e, t) {
                var s, i, n, r, a;
                return (
                  (this.x = e),
                  (this.y = t),
                  (this.lastIndex = e.length - 1),
                  (this.interpolate = function (e) {
                    return e
                      ? ((a = (function (e, t) {
                          for (i = -1, s = e.length; s - i > 1; )
                            e[(n = (s + i) >> 1)] <= t ? (i = n) : (s = n);
                          return s;
                        })(this.x, e)),
                        (r = a - 1),
                        ((e - this.x[r]) * (this.y[a] - this.y[r])) /
                          (this.x[a] - this.x[r]) +
                          this.y[r])
                      : 0;
                  }),
                  this
                );
              },
              getInterpolateFunction: function (e) {
                this.controller.spline ||
                  (this.controller.spline = this.params.loop
                    ? new it.LinearSpline(this.slidesGrid, e.slidesGrid)
                    : new it.LinearSpline(this.snapGrid, e.snapGrid));
              },
              setTranslate: function (e, t) {
                var s,
                  i,
                  n = this,
                  r = n.controller.control,
                  a = n.constructor;
                function o(e) {
                  var t = n.rtlTranslate ? -n.translate : n.translate;
                  'slide' === n.params.controller.by &&
                    (n.controller.getInterpolateFunction(e),
                    (i = -n.controller.spline.interpolate(-t))),
                    (i && 'container' !== n.params.controller.by) ||
                      ((s =
                        (e.maxTranslate() - e.minTranslate()) /
                        (n.maxTranslate() - n.minTranslate())),
                      (i = (t - n.minTranslate()) * s + e.minTranslate())),
                    n.params.controller.inverse && (i = e.maxTranslate() - i),
                    e.updateProgress(i),
                    e.setTranslate(i, n),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses();
                }
                if (Array.isArray(r))
                  for (var l = 0; l < r.length; l += 1)
                    r[l] !== t && r[l] instanceof a && o(r[l]);
                else r instanceof a && t !== r && o(r);
              },
              setTransition: function (e, t) {
                var s,
                  i = this,
                  n = i.constructor,
                  r = i.controller.control;
                function a(t) {
                  t.setTransition(e, i),
                    0 !== e &&
                      (t.transitionStart(),
                      t.params.autoHeight &&
                        pe(function () {
                          t.updateAutoHeight();
                        }),
                      t.$wrapperEl.transitionEnd(function () {
                        r &&
                          (t.params.loop &&
                            'slide' === i.params.controller.by &&
                            t.loopFix(),
                          t.transitionEnd());
                      }));
                }
                if (Array.isArray(r))
                  for (s = 0; s < r.length; s += 1)
                    r[s] !== t && r[s] instanceof n && a(r[s]);
                else r instanceof n && t !== r && a(r);
              },
            };
            function nt() {
              return (nt =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var rt = {
              makeElFocusable: function (e) {
                return e.attr('tabIndex', '0'), e;
              },
              makeElNotFocusable: function (e) {
                return e.attr('tabIndex', '-1'), e;
              },
              addElRole: function (e, t) {
                return e.attr('role', t), e;
              },
              addElLabel: function (e, t) {
                return e.attr('aria-label', t), e;
              },
              disableEl: function (e) {
                return e.attr('aria-disabled', !0), e;
              },
              enableEl: function (e) {
                return e.attr('aria-disabled', !1), e;
              },
              onEnterKey: function (e) {
                var t = this.params.a11y;
                if (13 === e.keyCode) {
                  var s = ce(e.target);
                  this.navigation &&
                    this.navigation.$nextEl &&
                    s.is(this.navigation.$nextEl) &&
                    ((this.isEnd && !this.params.loop) || this.slideNext(),
                    this.isEnd
                      ? this.a11y.notify(t.lastSlideMessage)
                      : this.a11y.notify(t.nextSlideMessage)),
                    this.navigation &&
                      this.navigation.$prevEl &&
                      s.is(this.navigation.$prevEl) &&
                      ((this.isBeginning && !this.params.loop) ||
                        this.slidePrev(),
                      this.isBeginning
                        ? this.a11y.notify(t.firstSlideMessage)
                        : this.a11y.notify(t.prevSlideMessage)),
                    this.pagination &&
                      s.is('.' + this.params.pagination.bulletClass) &&
                      s[0].click();
                }
              },
              notify: function (e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(''), t.html(e));
              },
              updateNavigation: function () {
                if (!this.params.loop && this.navigation) {
                  var e = this.navigation,
                    t = e.$nextEl,
                    s = e.$prevEl;
                  s &&
                    s.length > 0 &&
                    (this.isBeginning
                      ? (this.a11y.disableEl(s),
                        this.a11y.makeElNotFocusable(s))
                      : (this.a11y.enableEl(s), this.a11y.makeElFocusable(s))),
                    t &&
                      t.length > 0 &&
                      (this.isEnd
                        ? (this.a11y.disableEl(t),
                          this.a11y.makeElNotFocusable(t))
                        : (this.a11y.enableEl(t),
                          this.a11y.makeElFocusable(t)));
                }
              },
              updatePagination: function () {
                var e = this,
                  t = e.params.a11y;
                e.pagination &&
                  e.params.pagination.clickable &&
                  e.pagination.bullets &&
                  e.pagination.bullets.length &&
                  e.pagination.bullets.each(function (s) {
                    var i = ce(s);
                    e.a11y.makeElFocusable(i),
                      e.a11y.addElRole(i, 'button'),
                      e.a11y.addElLabel(
                        i,
                        t.paginationBulletMessage.replace(
                          /\{\{index\}\}/,
                          i.index() + 1,
                        ),
                      );
                  });
              },
              init: function () {
                this.$el.append(this.a11y.liveRegion);
                var e,
                  t,
                  s = this.params.a11y;
                this.navigation &&
                  this.navigation.$nextEl &&
                  (e = this.navigation.$nextEl),
                  this.navigation &&
                    this.navigation.$prevEl &&
                    (t = this.navigation.$prevEl),
                  e &&
                    (this.a11y.makeElFocusable(e),
                    this.a11y.addElRole(e, 'button'),
                    this.a11y.addElLabel(e, s.nextSlideMessage),
                    e.on('keydown', this.a11y.onEnterKey)),
                  t &&
                    (this.a11y.makeElFocusable(t),
                    this.a11y.addElRole(t, 'button'),
                    this.a11y.addElLabel(t, s.prevSlideMessage),
                    t.on('keydown', this.a11y.onEnterKey)),
                  this.pagination &&
                    this.params.pagination.clickable &&
                    this.pagination.bullets &&
                    this.pagination.bullets.length &&
                    this.pagination.$el.on(
                      'keydown',
                      '.' + this.params.pagination.bulletClass,
                      this.a11y.onEnterKey,
                    );
              },
              destroy: function () {
                var e, t;
                this.a11y.liveRegion &&
                  this.a11y.liveRegion.length > 0 &&
                  this.a11y.liveRegion.remove(),
                  this.navigation &&
                    this.navigation.$nextEl &&
                    (e = this.navigation.$nextEl),
                  this.navigation &&
                    this.navigation.$prevEl &&
                    (t = this.navigation.$prevEl),
                  e && e.off('keydown', this.a11y.onEnterKey),
                  t && t.off('keydown', this.a11y.onEnterKey),
                  this.pagination &&
                    this.params.pagination.clickable &&
                    this.pagination.bullets &&
                    this.pagination.bullets.length &&
                    this.pagination.$el.off(
                      'keydown',
                      '.' + this.params.pagination.bulletClass,
                      this.a11y.onEnterKey,
                    );
              },
            };
            function at() {
              return (at =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var ot = {
              init: function () {
                var e = R();
                if (this.params.history) {
                  if (!e.history || !e.history.pushState)
                    return (
                      (this.params.history.enabled = !1),
                      void (this.params.hashNavigation.enabled = !0)
                    );
                  var t = this.history;
                  (t.initialized = !0),
                    (t.paths = ot.getPathValues(this.params.url)),
                    (t.paths.key || t.paths.value) &&
                      (t.scrollToSlide(
                        0,
                        t.paths.value,
                        this.params.runCallbacksOnInit,
                      ),
                      this.params.history.replaceState ||
                        e.addEventListener(
                          'popstate',
                          this.history.setHistoryPopState,
                        ));
                }
              },
              destroy: function () {
                var e = R();
                this.params.history.replaceState ||
                  e.removeEventListener(
                    'popstate',
                    this.history.setHistoryPopState,
                  );
              },
              setHistoryPopState: function () {
                (this.history.paths = ot.getPathValues(this.params.url)),
                  this.history.scrollToSlide(
                    this.params.speed,
                    this.history.paths.value,
                    !1,
                  );
              },
              getPathValues: function (e) {
                var t = R(),
                  s = (e ? new URL(e) : t.location).pathname
                    .slice(1)
                    .split('/')
                    .filter(function (e) {
                      return '' !== e;
                    }),
                  i = s.length;
                return { key: s[i - 2], value: s[i - 1] };
              },
              setHistory: function (e, t) {
                var s = R();
                if (this.history.initialized && this.params.history.enabled) {
                  var i;
                  i = this.params.url ? new URL(this.params.url) : s.location;
                  var n = this.slides.eq(t),
                    r = ot.slugify(n.attr('data-history'));
                  i.pathname.includes(e) || (r = e + '/' + r);
                  var a = s.history.state;
                  (a && a.value === r) ||
                    (this.params.history.replaceState
                      ? s.history.replaceState({ value: r }, null, r)
                      : s.history.pushState({ value: r }, null, r));
                }
              },
              slugify: function (e) {
                return e
                  .toString()
                  .replace(/\s+/g, '-')
                  .replace(/[^\w-]+/g, '')
                  .replace(/--+/g, '-')
                  .replace(/^-+/, '')
                  .replace(/-+$/, '');
              },
              scrollToSlide: function (e, t, s) {
                if (t)
                  for (var i = 0, n = this.slides.length; i < n; i += 1) {
                    var r = this.slides.eq(i);
                    if (
                      ot.slugify(r.attr('data-history')) === t &&
                      !r.hasClass(this.params.slideDuplicateClass)
                    ) {
                      var a = r.index();
                      this.slideTo(a, e, s);
                    }
                  }
                else this.slideTo(0, e, s);
              },
            };
            function lt() {
              return (lt =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var ct = {
              onHashCange: function () {
                var e = X();
                this.emit('hashChange');
                var t = e.location.hash.replace('#', '');
                if (t !== this.slides.eq(this.activeIndex).attr('data-hash')) {
                  var s = this.$wrapperEl
                    .children(
                      '.' + this.params.slideClass + '[data-hash="' + t + '"]',
                    )
                    .index();
                  if (void 0 === s) return;
                  this.slideTo(s);
                }
              },
              setHash: function () {
                var e = R(),
                  t = X();
                if (
                  this.hashNavigation.initialized &&
                  this.params.hashNavigation.enabled
                )
                  if (
                    this.params.hashNavigation.replaceState &&
                    e.history &&
                    e.history.replaceState
                  )
                    e.history.replaceState(
                      null,
                      null,
                      '#' +
                        this.slides.eq(this.activeIndex).attr('data-hash') ||
                        !1,
                    ),
                      this.emit('hashSet');
                  else {
                    var s = this.slides.eq(this.activeIndex),
                      i = s.attr('data-hash') || s.attr('data-history');
                    (t.location.hash = i || ''), this.emit('hashSet');
                  }
              },
              init: function () {
                var e = X(),
                  t = R();
                if (
                  !(
                    !this.params.hashNavigation.enabled ||
                    (this.params.history && this.params.history.enabled)
                  )
                ) {
                  this.hashNavigation.initialized = !0;
                  var s = e.location.hash.replace('#', '');
                  if (s)
                    for (var i = 0, n = this.slides.length; i < n; i += 1) {
                      var r = this.slides.eq(i);
                      if (
                        (r.attr('data-hash') || r.attr('data-history')) === s &&
                        !r.hasClass(this.params.slideDuplicateClass)
                      ) {
                        var a = r.index();
                        this.slideTo(a, 0, this.params.runCallbacksOnInit, !0);
                      }
                    }
                  this.params.hashNavigation.watchState &&
                    ce(t).on('hashchange', this.hashNavigation.onHashCange);
                }
              },
              destroy: function () {
                var e = R();
                this.params.hashNavigation.watchState &&
                  ce(e).off('hashchange', this.hashNavigation.onHashCange);
              },
            };
            function pt() {
              return (pt =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var dt = {
              run: function () {
                var e = this,
                  t = e.slides.eq(e.activeIndex),
                  s = e.params.autoplay.delay;
                t.attr('data-swiper-autoplay') &&
                  (s =
                    t.attr('data-swiper-autoplay') || e.params.autoplay.delay),
                  clearTimeout(e.autoplay.timeout),
                  (e.autoplay.timeout = pe(function () {
                    e.params.autoplay.reverseDirection
                      ? e.params.loop
                        ? (e.loopFix(),
                          e.slidePrev(e.params.speed, !0, !0),
                          e.emit('autoplay'))
                        : e.isBeginning
                        ? e.params.autoplay.stopOnLastSlide
                          ? e.autoplay.stop()
                          : (e.slideTo(
                              e.slides.length - 1,
                              e.params.speed,
                              !0,
                              !0,
                            ),
                            e.emit('autoplay'))
                        : (e.slidePrev(e.params.speed, !0, !0),
                          e.emit('autoplay'))
                      : e.params.loop
                      ? (e.loopFix(),
                        e.slideNext(e.params.speed, !0, !0),
                        e.emit('autoplay'))
                      : e.isEnd
                      ? e.params.autoplay.stopOnLastSlide
                        ? e.autoplay.stop()
                        : (e.slideTo(0, e.params.speed, !0, !0),
                          e.emit('autoplay'))
                      : (e.slideNext(e.params.speed, !0, !0),
                        e.emit('autoplay')),
                      e.params.cssMode &&
                        e.autoplay.running &&
                        e.autoplay.run();
                  }, s));
              },
              start: function () {
                return (
                  void 0 === this.autoplay.timeout &&
                  !this.autoplay.running &&
                  ((this.autoplay.running = !0),
                  this.emit('autoplayStart'),
                  this.autoplay.run(),
                  !0)
                );
              },
              stop: function () {
                return (
                  !!this.autoplay.running &&
                  void 0 !== this.autoplay.timeout &&
                  (this.autoplay.timeout &&
                    (clearTimeout(this.autoplay.timeout),
                    (this.autoplay.timeout = void 0)),
                  (this.autoplay.running = !1),
                  this.emit('autoplayStop'),
                  !0)
                );
              },
              pause: function (e) {
                this.autoplay.running &&
                  (this.autoplay.paused ||
                    (this.autoplay.timeout &&
                      clearTimeout(this.autoplay.timeout),
                    (this.autoplay.paused = !0),
                    0 !== e && this.params.autoplay.waitForTransition
                      ? (this.$wrapperEl[0].addEventListener(
                          'transitionend',
                          this.autoplay.onTransitionEnd,
                        ),
                        this.$wrapperEl[0].addEventListener(
                          'webkitTransitionEnd',
                          this.autoplay.onTransitionEnd,
                        ))
                      : ((this.autoplay.paused = !1), this.autoplay.run())));
              },
              onVisibilityChange: function () {
                var e = X();
                'hidden' === e.visibilityState &&
                  this.autoplay.running &&
                  this.autoplay.pause(),
                  'visible' === e.visibilityState &&
                    this.autoplay.paused &&
                    (this.autoplay.run(), (this.autoplay.paused = !1));
              },
              onTransitionEnd: function (e) {
                this &&
                  !this.destroyed &&
                  this.$wrapperEl &&
                  e.target === this.$wrapperEl[0] &&
                  (this.$wrapperEl[0].removeEventListener(
                    'transitionend',
                    this.autoplay.onTransitionEnd,
                  ),
                  this.$wrapperEl[0].removeEventListener(
                    'webkitTransitionEnd',
                    this.autoplay.onTransitionEnd,
                  ),
                  (this.autoplay.paused = !1),
                  this.autoplay.running
                    ? this.autoplay.run()
                    : this.autoplay.stop());
              },
            };
            function ut() {
              return (ut =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var $t = {
              setTranslate: function () {
                for (var e = this.slides, t = 0; t < e.length; t += 1) {
                  var s = this.slides.eq(t),
                    i = -s[0].swiperSlideOffset;
                  this.params.virtualTranslate || (i -= this.translate);
                  var n = 0;
                  this.isHorizontal() || ((n = i), (i = 0));
                  var r = this.params.fadeEffect.crossFade
                    ? Math.max(1 - Math.abs(s[0].progress), 0)
                    : 1 + Math.min(Math.max(s[0].progress, -1), 0);
                  s.css({ opacity: r }).transform(
                    'translate3d(' + i + 'px, ' + n + 'px, 0px)',
                  );
                }
              },
              setTransition: function (e) {
                var t = this,
                  s = t.slides,
                  i = t.$wrapperEl;
                if ((s.transition(e), t.params.virtualTranslate && 0 !== e)) {
                  var n = !1;
                  s.transitionEnd(function () {
                    if (!n && t && !t.destroyed) {
                      (n = !0), (t.animating = !1);
                      for (
                        var e = ['webkitTransitionEnd', 'transitionend'], s = 0;
                        s < e.length;
                        s += 1
                      )
                        i.trigger(e[s]);
                    }
                  });
                }
              },
            };
            function ft() {
              return (ft =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var mt = {
              setTranslate: function () {
                var e,
                  t = this.$el,
                  s = this.$wrapperEl,
                  i = this.slides,
                  n = this.width,
                  r = this.height,
                  a = this.rtlTranslate,
                  o = this.size,
                  l = this.browser,
                  c = this.params.cubeEffect,
                  p = this.isHorizontal(),
                  d = this.virtual && this.params.virtual.enabled,
                  u = 0;
                c.shadow &&
                  (p
                    ? (0 === (e = s.find('.swiper-cube-shadow')).length &&
                        ((e = ce('<div class="swiper-cube-shadow"></div>')),
                        s.append(e)),
                      e.css({ height: n + 'px' }))
                    : 0 === (e = t.find('.swiper-cube-shadow')).length &&
                      ((e = ce('<div class="swiper-cube-shadow"></div>')),
                      t.append(e)));
                for (var $ = 0; $ < i.length; $ += 1) {
                  var f = i.eq($),
                    m = $;
                  d && (m = parseInt(f.attr('data-swiper-slide-index'), 10));
                  var h = 90 * m,
                    g = Math.floor(h / 360);
                  a && ((h = -h), (g = Math.floor(-h / 360)));
                  var v = Math.max(Math.min(f[0].progress, 1), -1),
                    w = 0,
                    S = 0,
                    x = 0;
                  m % 4 == 0
                    ? ((w = 4 * -g * o), (x = 0))
                    : (m - 1) % 4 == 0
                    ? ((w = 0), (x = 4 * -g * o))
                    : (m - 2) % 4 == 0
                    ? ((w = o + 4 * g * o), (x = o))
                    : (m - 3) % 4 == 0 && ((w = -o), (x = 3 * o + 4 * o * g)),
                    a && (w = -w),
                    p || ((S = w), (w = 0));
                  var y =
                    'rotateX(' +
                    (p ? 0 : -h) +
                    'deg) rotateY(' +
                    (p ? h : 0) +
                    'deg) translate3d(' +
                    w +
                    'px, ' +
                    S +
                    'px, ' +
                    x +
                    'px)';
                  if (
                    (v <= 1 &&
                      v > -1 &&
                      ((u = 90 * m + 90 * v), a && (u = 90 * -m - 90 * v)),
                    f.transform(y),
                    c.slideShadows)
                  ) {
                    var b = p
                        ? f.find('.swiper-slide-shadow-left')
                        : f.find('.swiper-slide-shadow-top'),
                      E = p
                        ? f.find('.swiper-slide-shadow-right')
                        : f.find('.swiper-slide-shadow-bottom');
                    0 === b.length &&
                      ((b = ce(
                        '<div class="swiper-slide-shadow-' +
                          (p ? 'left' : 'top') +
                          '"></div>',
                      )),
                      f.append(b)),
                      0 === E.length &&
                        ((E = ce(
                          '<div class="swiper-slide-shadow-' +
                            (p ? 'right' : 'bottom') +
                            '"></div>',
                        )),
                        f.append(E)),
                      b.length && (b[0].style.opacity = Math.max(-v, 0)),
                      E.length && (E[0].style.opacity = Math.max(v, 0));
                  }
                }
                if (
                  (s.css({
                    '-webkit-transform-origin': '50% 50% -' + o / 2 + 'px',
                    '-moz-transform-origin': '50% 50% -' + o / 2 + 'px',
                    '-ms-transform-origin': '50% 50% -' + o / 2 + 'px',
                    'transform-origin': '50% 50% -' + o / 2 + 'px',
                  }),
                  c.shadow)
                )
                  if (p)
                    e.transform(
                      'translate3d(0px, ' +
                        (n / 2 + c.shadowOffset) +
                        'px, ' +
                        -n / 2 +
                        'px) rotateX(90deg) rotateZ(0deg) scale(' +
                        c.shadowScale +
                        ')',
                    );
                  else {
                    var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
                      T =
                        1.5 -
                        (Math.sin((2 * C * Math.PI) / 360) / 2 +
                          Math.cos((2 * C * Math.PI) / 360) / 2),
                      k = c.shadowScale,
                      M = c.shadowScale / T,
                      P = c.shadowOffset;
                    e.transform(
                      'scale3d(' +
                        k +
                        ', 1, ' +
                        M +
                        ') translate3d(0px, ' +
                        (r / 2 + P) +
                        'px, ' +
                        -r / 2 / M +
                        'px) rotateX(-90deg)',
                    );
                  }
                var z = l.isSafari || l.isWebView ? -o / 2 : 0;
                s.transform(
                  'translate3d(0px,0,' +
                    z +
                    'px) rotateX(' +
                    (this.isHorizontal() ? 0 : u) +
                    'deg) rotateY(' +
                    (this.isHorizontal() ? -u : 0) +
                    'deg)',
                );
              },
              setTransition: function (e) {
                var t = this.$el;
                this.slides
                  .transition(e)
                  .find(
                    '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
                  )
                  .transition(e),
                  this.params.cubeEffect.shadow &&
                    !this.isHorizontal() &&
                    t.find('.swiper-cube-shadow').transition(e);
              },
            };
            function ht() {
              return (ht =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var gt = {
              setTranslate: function () {
                for (
                  var e = this.slides, t = this.rtlTranslate, s = 0;
                  s < e.length;
                  s += 1
                ) {
                  var i = e.eq(s),
                    n = i[0].progress;
                  this.params.flipEffect.limitRotation &&
                    (n = Math.max(Math.min(i[0].progress, 1), -1));
                  var r = -180 * n,
                    a = 0,
                    o = -i[0].swiperSlideOffset,
                    l = 0;
                  if (
                    (this.isHorizontal()
                      ? t && (r = -r)
                      : ((l = o), (o = 0), (a = -r), (r = 0)),
                    (i[0].style.zIndex = -Math.abs(Math.round(n)) + e.length),
                    this.params.flipEffect.slideShadows)
                  ) {
                    var c = this.isHorizontal()
                        ? i.find('.swiper-slide-shadow-left')
                        : i.find('.swiper-slide-shadow-top'),
                      p = this.isHorizontal()
                        ? i.find('.swiper-slide-shadow-right')
                        : i.find('.swiper-slide-shadow-bottom');
                    0 === c.length &&
                      ((c = ce(
                        '<div class="swiper-slide-shadow-' +
                          (this.isHorizontal() ? 'left' : 'top') +
                          '"></div>',
                      )),
                      i.append(c)),
                      0 === p.length &&
                        ((p = ce(
                          '<div class="swiper-slide-shadow-' +
                            (this.isHorizontal() ? 'right' : 'bottom') +
                            '"></div>',
                        )),
                        i.append(p)),
                      c.length && (c[0].style.opacity = Math.max(-n, 0)),
                      p.length && (p[0].style.opacity = Math.max(n, 0));
                  }
                  i.transform(
                    'translate3d(' +
                      o +
                      'px, ' +
                      l +
                      'px, 0px) rotateX(' +
                      a +
                      'deg) rotateY(' +
                      r +
                      'deg)',
                  );
                }
              },
              setTransition: function (e) {
                var t = this,
                  s = t.slides,
                  i = t.activeIndex,
                  n = t.$wrapperEl;
                if (
                  (s
                    .transition(e)
                    .find(
                      '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
                    )
                    .transition(e),
                  t.params.virtualTranslate && 0 !== e)
                ) {
                  var r = !1;
                  s.eq(i).transitionEnd(function () {
                    if (!r && t && !t.destroyed) {
                      (r = !0), (t.animating = !1);
                      for (
                        var e = ['webkitTransitionEnd', 'transitionend'], s = 0;
                        s < e.length;
                        s += 1
                      )
                        n.trigger(e[s]);
                    }
                  });
                }
              },
            };
            function vt() {
              return (vt =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var wt = {
              setTranslate: function () {
                for (
                  var e = this.width,
                    t = this.height,
                    s = this.slides,
                    i = this.slidesSizesGrid,
                    n = this.params.coverflowEffect,
                    r = this.isHorizontal(),
                    a = this.translate,
                    o = r ? e / 2 - a : t / 2 - a,
                    l = r ? n.rotate : -n.rotate,
                    c = n.depth,
                    p = 0,
                    d = s.length;
                  p < d;
                  p += 1
                ) {
                  var u = s.eq(p),
                    $ = i[p],
                    f = ((o - u[0].swiperSlideOffset - $ / 2) / $) * n.modifier,
                    m = r ? l * f : 0,
                    h = r ? 0 : l * f,
                    g = -c * Math.abs(f),
                    v = n.stretch;
                  'string' == typeof v &&
                    -1 !== v.indexOf('%') &&
                    (v = (parseFloat(n.stretch) / 100) * $);
                  var w = r ? 0 : v * f,
                    S = r ? v * f : 0,
                    x = 1 - (1 - n.scale) * Math.abs(f);
                  Math.abs(S) < 0.001 && (S = 0),
                    Math.abs(w) < 0.001 && (w = 0),
                    Math.abs(g) < 0.001 && (g = 0),
                    Math.abs(m) < 0.001 && (m = 0),
                    Math.abs(h) < 0.001 && (h = 0),
                    Math.abs(x) < 0.001 && (x = 0);
                  var y =
                    'translate3d(' +
                    S +
                    'px,' +
                    w +
                    'px,' +
                    g +
                    'px)  rotateX(' +
                    h +
                    'deg) rotateY(' +
                    m +
                    'deg) scale(' +
                    x +
                    ')';
                  if (
                    (u.transform(y),
                    (u[0].style.zIndex = 1 - Math.abs(Math.round(f))),
                    n.slideShadows)
                  ) {
                    var b = r
                        ? u.find('.swiper-slide-shadow-left')
                        : u.find('.swiper-slide-shadow-top'),
                      E = r
                        ? u.find('.swiper-slide-shadow-right')
                        : u.find('.swiper-slide-shadow-bottom');
                    0 === b.length &&
                      ((b = ce(
                        '<div class="swiper-slide-shadow-' +
                          (r ? 'left' : 'top') +
                          '"></div>',
                      )),
                      u.append(b)),
                      0 === E.length &&
                        ((E = ce(
                          '<div class="swiper-slide-shadow-' +
                            (r ? 'right' : 'bottom') +
                            '"></div>',
                        )),
                        u.append(E)),
                      b.length && (b[0].style.opacity = f > 0 ? f : 0),
                      E.length && (E[0].style.opacity = -f > 0 ? -f : 0);
                  }
                }
              },
              setTransition: function (e) {
                this.slides
                  .transition(e)
                  .find(
                    '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
                  )
                  .transition(e);
              },
            };
            function St() {
              return (St =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }).apply(this, arguments);
            }
            var xt = {
                init: function () {
                  var e = this.params.thumbs;
                  if (this.thumbs.initialized) return !1;
                  this.thumbs.initialized = !0;
                  var t = this.constructor;
                  return (
                    e.swiper instanceof t
                      ? ((this.thumbs.swiper = e.swiper),
                        fe(this.thumbs.swiper.originalParams, {
                          watchSlidesProgress: !0,
                          slideToClickedSlide: !1,
                        }),
                        fe(this.thumbs.swiper.params, {
                          watchSlidesProgress: !0,
                          slideToClickedSlide: !1,
                        }))
                      : $e(e.swiper) &&
                        ((this.thumbs.swiper = new t(
                          fe({}, e.swiper, {
                            watchSlidesVisibility: !0,
                            watchSlidesProgress: !0,
                            slideToClickedSlide: !1,
                          }),
                        )),
                        (this.thumbs.swiperCreated = !0)),
                    this.thumbs.swiper.$el.addClass(
                      this.params.thumbs.thumbsContainerClass,
                    ),
                    this.thumbs.swiper.on('tap', this.thumbs.onThumbClick),
                    !0
                  );
                },
                onThumbClick: function () {
                  var e = this.thumbs.swiper;
                  if (e) {
                    var t = e.clickedIndex,
                      s = e.clickedSlide;
                    if (
                      !(
                        (s &&
                          ce(s).hasClass(
                            this.params.thumbs.slideThumbActiveClass,
                          )) ||
                        null == t
                      )
                    ) {
                      var i;
                      if (
                        ((i = e.params.loop
                          ? parseInt(
                              ce(e.clickedSlide).attr(
                                'data-swiper-slide-index',
                              ),
                              10,
                            )
                          : t),
                        this.params.loop)
                      ) {
                        var n = this.activeIndex;
                        this.slides
                          .eq(n)
                          .hasClass(this.params.slideDuplicateClass) &&
                          (this.loopFix(),
                          (this._clientLeft = this.$wrapperEl[0].clientLeft),
                          (n = this.activeIndex));
                        var r = this.slides
                            .eq(n)
                            .prevAll('[data-swiper-slide-index="' + i + '"]')
                            .eq(0)
                            .index(),
                          a = this.slides
                            .eq(n)
                            .nextAll('[data-swiper-slide-index="' + i + '"]')
                            .eq(0)
                            .index();
                        i =
                          void 0 === r
                            ? a
                            : void 0 === a
                            ? r
                            : a - n < n - r
                            ? a
                            : r;
                      }
                      this.slideTo(i);
                    }
                  }
                },
                update: function (e) {
                  var t = this.thumbs.swiper;
                  if (t) {
                    var s =
                        'auto' === t.params.slidesPerView
                          ? t.slidesPerViewDynamic()
                          : t.params.slidesPerView,
                      i = this.params.thumbs.autoScrollOffset,
                      n = i && !t.params.loop;
                    if (this.realIndex !== t.realIndex || n) {
                      var r,
                        a,
                        o = t.activeIndex;
                      if (t.params.loop) {
                        t.slides.eq(o).hasClass(t.params.slideDuplicateClass) &&
                          (t.loopFix(),
                          (t._clientLeft = t.$wrapperEl[0].clientLeft),
                          (o = t.activeIndex));
                        var l = t.slides
                            .eq(o)
                            .prevAll(
                              '[data-swiper-slide-index="' +
                                this.realIndex +
                                '"]',
                            )
                            .eq(0)
                            .index(),
                          c = t.slides
                            .eq(o)
                            .nextAll(
                              '[data-swiper-slide-index="' +
                                this.realIndex +
                                '"]',
                            )
                            .eq(0)
                            .index();
                        (r =
                          void 0 === l
                            ? c
                            : void 0 === c
                            ? l
                            : c - o == o - l
                            ? o
                            : c - o < o - l
                            ? c
                            : l),
                          (a =
                            this.activeIndex > this.previousIndex
                              ? 'next'
                              : 'prev');
                      } else
                        a =
                          (r = this.realIndex) > this.previousIndex
                            ? 'next'
                            : 'prev';
                      n && (r += 'next' === a ? i : -1 * i),
                        t.visibleSlidesIndexes &&
                          t.visibleSlidesIndexes.indexOf(r) < 0 &&
                          (t.params.centeredSlides
                            ? (r =
                                r > o
                                  ? r - Math.floor(s / 2) + 1
                                  : r + Math.floor(s / 2) - 1)
                            : r > o && (r = r - s + 1),
                          t.slideTo(r, e ? 0 : void 0));
                    }
                    var p = 1,
                      d = this.params.thumbs.slideThumbActiveClass;
                    if (
                      (this.params.slidesPerView > 1 &&
                        !this.params.centeredSlides &&
                        (p = this.params.slidesPerView),
                      this.params.thumbs.multipleActiveThumbs || (p = 1),
                      (p = Math.floor(p)),
                      t.slides.removeClass(d),
                      t.params.loop ||
                        (t.params.virtual && t.params.virtual.enabled))
                    )
                      for (var u = 0; u < p; u += 1)
                        t.$wrapperEl
                          .children(
                            '[data-swiper-slide-index="' +
                              (this.realIndex + u) +
                              '"]',
                          )
                          .addClass(d);
                    else
                      for (var $ = 0; $ < p; $ += 1)
                        t.slides.eq(this.realIndex + $).addClass(d);
                  }
                },
              },
              yt = [
                Ve,
                He,
                {
                  name: 'mousewheel',
                  params: {
                    mousewheel: {
                      enabled: !1,
                      releaseOnEdges: !1,
                      invert: !1,
                      forceToAxis: !1,
                      sensitivity: 1,
                      eventsTarget: 'container',
                      thresholdDelta: null,
                      thresholdTime: null,
                    },
                  },
                  create: function () {
                    me(this, {
                      mousewheel: {
                        enabled: !1,
                        lastScrollTime: de(),
                        lastEventBeforeSnap: void 0,
                        recentWheelEvents: [],
                        enable: _e.enable,
                        disable: _e.disable,
                        handle: _e.handle,
                        handleMouseEnter: _e.handleMouseEnter,
                        handleMouseLeave: _e.handleMouseLeave,
                        animateSlider: _e.animateSlider,
                        releaseScroll: _e.releaseScroll,
                      },
                    });
                  },
                  on: {
                    init: function (e) {
                      !e.params.mousewheel.enabled &&
                        e.params.cssMode &&
                        e.mousewheel.disable(),
                        e.params.mousewheel.enabled && e.mousewheel.enable();
                    },
                    destroy: function (e) {
                      e.params.cssMode && e.mousewheel.enable(),
                        e.mousewheel.enabled && e.mousewheel.disable();
                    },
                  },
                },
                {
                  name: 'navigation',
                  params: {
                    navigation: {
                      nextEl: null,
                      prevEl: null,
                      hideOnClick: !1,
                      disabledClass: 'swiper-button-disabled',
                      hiddenClass: 'swiper-button-hidden',
                      lockClass: 'swiper-button-lock',
                    },
                  },
                  create: function () {
                    me(this, { navigation: Fe({}, Xe) });
                  },
                  on: {
                    init: function (e) {
                      e.navigation.init(), e.navigation.update();
                    },
                    toEdge: function (e) {
                      e.navigation.update();
                    },
                    fromEdge: function (e) {
                      e.navigation.update();
                    },
                    destroy: function (e) {
                      e.navigation.destroy();
                    },
                    click: function (e, t) {
                      var s,
                        i = e.navigation,
                        n = i.$nextEl,
                        r = i.$prevEl;
                      !e.params.navigation.hideOnClick ||
                        ce(t.target).is(r) ||
                        ce(t.target).is(n) ||
                        (n
                          ? (s = n.hasClass(e.params.navigation.hiddenClass))
                          : r &&
                            (s = r.hasClass(e.params.navigation.hiddenClass)),
                        !0 === s
                          ? e.emit('navigationShow')
                          : e.emit('navigationHide'),
                        n && n.toggleClass(e.params.navigation.hiddenClass),
                        r && r.toggleClass(e.params.navigation.hiddenClass));
                    },
                  },
                },
                {
                  name: 'pagination',
                  params: {
                    pagination: {
                      el: null,
                      bulletElement: 'span',
                      clickable: !1,
                      hideOnClick: !1,
                      renderBullet: null,
                      renderProgressbar: null,
                      renderFraction: null,
                      renderCustom: null,
                      progressbarOpposite: !1,
                      type: 'bullets',
                      dynamicBullets: !1,
                      dynamicMainBullets: 1,
                      formatFractionCurrent: function (e) {
                        return e;
                      },
                      formatFractionTotal: function (e) {
                        return e;
                      },
                      bulletClass: 'swiper-pagination-bullet',
                      bulletActiveClass: 'swiper-pagination-bullet-active',
                      modifierClass: 'swiper-pagination-',
                      currentClass: 'swiper-pagination-current',
                      totalClass: 'swiper-pagination-total',
                      hiddenClass: 'swiper-pagination-hidden',
                      progressbarFillClass:
                        'swiper-pagination-progressbar-fill',
                      progressbarOppositeClass:
                        'swiper-pagination-progressbar-opposite',
                      clickableClass: 'swiper-pagination-clickable',
                      lockClass: 'swiper-pagination-lock',
                    },
                  },
                  create: function () {
                    me(this, { pagination: Ye({ dynamicBulletIndex: 0 }, Re) });
                  },
                  on: {
                    init: function (e) {
                      e.pagination.init(),
                        e.pagination.render(),
                        e.pagination.update();
                    },
                    activeIndexChange: function (e) {
                      (e.params.loop || void 0 === e.snapIndex) &&
                        e.pagination.update();
                    },
                    snapIndexChange: function (e) {
                      e.params.loop || e.pagination.update();
                    },
                    slidesLengthChange: function (e) {
                      e.params.loop &&
                        (e.pagination.render(), e.pagination.update());
                    },
                    snapGridLengthChange: function (e) {
                      e.params.loop ||
                        (e.pagination.render(), e.pagination.update());
                    },
                    destroy: function (e) {
                      e.pagination.destroy();
                    },
                    click: function (e, t) {
                      e.params.pagination.el &&
                        e.params.pagination.hideOnClick &&
                        e.pagination.$el.length > 0 &&
                        !ce(t.target).hasClass(
                          e.params.pagination.bulletClass,
                        ) &&
                        (!0 ===
                        e.pagination.$el.hasClass(
                          e.params.pagination.hiddenClass,
                        )
                          ? e.emit('paginationShow')
                          : e.emit('paginationHide'),
                        e.pagination.$el.toggleClass(
                          e.params.pagination.hiddenClass,
                        ));
                    },
                  },
                },
                {
                  name: 'scrollbar',
                  params: {
                    scrollbar: {
                      el: null,
                      dragSize: 'auto',
                      hide: !1,
                      draggable: !1,
                      snapOnRelease: !0,
                      lockClass: 'swiper-scrollbar-lock',
                      dragClass: 'swiper-scrollbar-drag',
                    },
                  },
                  create: function () {
                    me(this, {
                      scrollbar: We(
                        { isTouched: !1, timeout: null, dragTimeout: null },
                        Ue,
                      ),
                    });
                  },
                  on: {
                    init: function (e) {
                      e.scrollbar.init(),
                        e.scrollbar.updateSize(),
                        e.scrollbar.setTranslate();
                    },
                    update: function (e) {
                      e.scrollbar.updateSize();
                    },
                    resize: function (e) {
                      e.scrollbar.updateSize();
                    },
                    observerUpdate: function (e) {
                      e.scrollbar.updateSize();
                    },
                    setTranslate: function (e) {
                      e.scrollbar.setTranslate();
                    },
                    setTransition: function (e, t) {
                      e.scrollbar.setTransition(t);
                    },
                    destroy: function (e) {
                      e.scrollbar.destroy();
                    },
                  },
                },
                {
                  name: 'parallax',
                  params: { parallax: { enabled: !1 } },
                  create: function () {
                    me(this, { parallax: Ke({}, Qe) });
                  },
                  on: {
                    beforeInit: function (e) {
                      e.params.parallax.enabled &&
                        ((e.params.watchSlidesProgress = !0),
                        (e.originalParams.watchSlidesProgress = !0));
                    },
                    init: function (e) {
                      e.params.parallax.enabled && e.parallax.setTranslate();
                    },
                    setTranslate: function (e) {
                      e.params.parallax.enabled && e.parallax.setTranslate();
                    },
                    setTransition: function (e, t) {
                      e.params.parallax.enabled && e.parallax.setTransition(t);
                    },
                  },
                },
                {
                  name: 'zoom',
                  params: {
                    zoom: {
                      enabled: !1,
                      maxRatio: 3,
                      minRatio: 1,
                      toggle: !0,
                      containerClass: 'swiper-zoom-container',
                      zoomedSlideClass: 'swiper-slide-zoomed',
                    },
                  },
                  create: function () {
                    var e = this;
                    me(e, {
                      zoom: Ze(
                        {
                          enabled: !1,
                          scale: 1,
                          currentScale: 1,
                          isScaling: !1,
                          gesture: {
                            $slideEl: void 0,
                            slideWidth: void 0,
                            slideHeight: void 0,
                            $imageEl: void 0,
                            $imageWrapEl: void 0,
                            maxRatio: 3,
                          },
                          image: {
                            isTouched: void 0,
                            isMoved: void 0,
                            currentX: void 0,
                            currentY: void 0,
                            minX: void 0,
                            minY: void 0,
                            maxX: void 0,
                            maxY: void 0,
                            width: void 0,
                            height: void 0,
                            startX: void 0,
                            startY: void 0,
                            touchesStart: {},
                            touchesCurrent: {},
                          },
                          velocity: {
                            x: void 0,
                            y: void 0,
                            prevPositionX: void 0,
                            prevPositionY: void 0,
                            prevTime: void 0,
                          },
                        },
                        Je,
                      ),
                    });
                    var t = 1;
                    Object.defineProperty(e.zoom, 'scale', {
                      get: function () {
                        return t;
                      },
                      set: function (s) {
                        if (t !== s) {
                          var i = e.zoom.gesture.$imageEl
                              ? e.zoom.gesture.$imageEl[0]
                              : void 0,
                            n = e.zoom.gesture.$slideEl
                              ? e.zoom.gesture.$slideEl[0]
                              : void 0;
                          e.emit('zoomChange', s, i, n);
                        }
                        t = s;
                      },
                    });
                  },
                  on: {
                    init: function (e) {
                      e.params.zoom.enabled && e.zoom.enable();
                    },
                    destroy: function (e) {
                      e.zoom.disable();
                    },
                    touchStart: function (e, t) {
                      e.zoom.enabled && e.zoom.onTouchStart(t);
                    },
                    touchEnd: function (e, t) {
                      e.zoom.enabled && e.zoom.onTouchEnd(t);
                    },
                    doubleTap: function (e, t) {
                      e.params.zoom.enabled &&
                        e.zoom.enabled &&
                        e.params.zoom.toggle &&
                        e.zoom.toggle(t);
                    },
                    transitionEnd: function (e) {
                      e.zoom.enabled &&
                        e.params.zoom.enabled &&
                        e.zoom.onTransitionEnd();
                    },
                    slideChange: function (e) {
                      e.zoom.enabled &&
                        e.params.zoom.enabled &&
                        e.params.cssMode &&
                        e.zoom.onTransitionEnd();
                    },
                  },
                },
                {
                  name: 'lazy',
                  params: {
                    lazy: {
                      enabled: !1,
                      loadPrevNext: !1,
                      loadPrevNextAmount: 1,
                      loadOnTransitionStart: !1,
                      elementClass: 'swiper-lazy',
                      loadingClass: 'swiper-lazy-loading',
                      loadedClass: 'swiper-lazy-loaded',
                      preloaderClass: 'swiper-lazy-preloader',
                    },
                  },
                  create: function () {
                    me(this, { lazy: et({ initialImageLoaded: !1 }, tt) });
                  },
                  on: {
                    beforeInit: function (e) {
                      e.params.lazy.enabled &&
                        e.params.preloadImages &&
                        (e.params.preloadImages = !1);
                    },
                    init: function (e) {
                      e.params.lazy.enabled &&
                        !e.params.loop &&
                        0 === e.params.initialSlide &&
                        e.lazy.load();
                    },
                    scroll: function (e) {
                      e.params.freeMode &&
                        !e.params.freeModeSticky &&
                        e.lazy.load();
                    },
                    resize: function (e) {
                      e.params.lazy.enabled && e.lazy.load();
                    },
                    scrollbarDragMove: function (e) {
                      e.params.lazy.enabled && e.lazy.load();
                    },
                    transitionStart: function (e) {
                      e.params.lazy.enabled &&
                        (e.params.lazy.loadOnTransitionStart ||
                          (!e.params.lazy.loadOnTransitionStart &&
                            !e.lazy.initialImageLoaded)) &&
                        e.lazy.load();
                    },
                    transitionEnd: function (e) {
                      e.params.lazy.enabled &&
                        !e.params.lazy.loadOnTransitionStart &&
                        e.lazy.load();
                    },
                    slideChange: function (e) {
                      e.params.lazy.enabled &&
                        e.params.cssMode &&
                        e.lazy.load();
                    },
                  },
                },
                {
                  name: 'controller',
                  params: {
                    controller: { control: void 0, inverse: !1, by: 'slide' },
                  },
                  create: function () {
                    me(this, {
                      controller: st(
                        { control: this.params.controller.control },
                        it,
                      ),
                    });
                  },
                  on: {
                    update: function (e) {
                      e.controller.control &&
                        e.controller.spline &&
                        ((e.controller.spline = void 0),
                        delete e.controller.spline);
                    },
                    resize: function (e) {
                      e.controller.control &&
                        e.controller.spline &&
                        ((e.controller.spline = void 0),
                        delete e.controller.spline);
                    },
                    observerUpdate: function (e) {
                      e.controller.control &&
                        e.controller.spline &&
                        ((e.controller.spline = void 0),
                        delete e.controller.spline);
                    },
                    setTranslate: function (e, t, s) {
                      e.controller.control && e.controller.setTranslate(t, s);
                    },
                    setTransition: function (e, t, s) {
                      e.controller.control && e.controller.setTransition(t, s);
                    },
                  },
                },
                {
                  name: 'a11y',
                  params: {
                    a11y: {
                      enabled: !0,
                      notificationClass: 'swiper-notification',
                      prevSlideMessage: 'Previous slide',
                      nextSlideMessage: 'Next slide',
                      firstSlideMessage: 'This is the first slide',
                      lastSlideMessage: 'This is the last slide',
                      paginationBulletMessage: 'Go to slide {{index}}',
                    },
                  },
                  create: function () {
                    me(this, {
                      a11y: nt(
                        nt({}, rt),
                        {},
                        {
                          liveRegion: ce(
                            '<span class="' +
                              this.params.a11y.notificationClass +
                              '" aria-live="assertive" aria-atomic="true"></span>',
                          ),
                        },
                      ),
                    });
                  },
                  on: {
                    init: function (e) {
                      e.params.a11y.enabled &&
                        (e.a11y.init(), e.a11y.updateNavigation());
                    },
                    toEdge: function (e) {
                      e.params.a11y.enabled && e.a11y.updateNavigation();
                    },
                    fromEdge: function (e) {
                      e.params.a11y.enabled && e.a11y.updateNavigation();
                    },
                    paginationUpdate: function (e) {
                      e.params.a11y.enabled && e.a11y.updatePagination();
                    },
                    destroy: function (e) {
                      e.params.a11y.enabled && e.a11y.destroy();
                    },
                  },
                },
                {
                  name: 'history',
                  params: {
                    history: { enabled: !1, replaceState: !1, key: 'slides' },
                  },
                  create: function () {
                    me(this, { history: at({}, ot) });
                  },
                  on: {
                    init: function (e) {
                      e.params.history.enabled && e.history.init();
                    },
                    destroy: function (e) {
                      e.params.history.enabled && e.history.destroy();
                    },
                    transitionEnd: function (e) {
                      e.history.initialized &&
                        e.history.setHistory(
                          e.params.history.key,
                          e.activeIndex,
                        );
                    },
                    slideChange: function (e) {
                      e.history.initialized &&
                        e.params.cssMode &&
                        e.history.setHistory(
                          e.params.history.key,
                          e.activeIndex,
                        );
                    },
                  },
                },
                {
                  name: 'hash-navigation',
                  params: {
                    hashNavigation: {
                      enabled: !1,
                      replaceState: !1,
                      watchState: !1,
                    },
                  },
                  create: function () {
                    me(this, { hashNavigation: lt({ initialized: !1 }, ct) });
                  },
                  on: {
                    init: function (e) {
                      e.params.hashNavigation.enabled &&
                        e.hashNavigation.init();
                    },
                    destroy: function (e) {
                      e.params.hashNavigation.enabled &&
                        e.hashNavigation.destroy();
                    },
                    transitionEnd: function (e) {
                      e.hashNavigation.initialized &&
                        e.hashNavigation.setHash();
                    },
                    slideChange: function (e) {
                      e.hashNavigation.initialized &&
                        e.params.cssMode &&
                        e.hashNavigation.setHash();
                    },
                  },
                },
                {
                  name: 'autoplay',
                  params: {
                    autoplay: {
                      enabled: !1,
                      delay: 3e3,
                      waitForTransition: !0,
                      disableOnInteraction: !0,
                      stopOnLastSlide: !1,
                      reverseDirection: !1,
                    },
                  },
                  create: function () {
                    me(this, {
                      autoplay: pt(pt({}, dt), {}, { running: !1, paused: !1 }),
                    });
                  },
                  on: {
                    init: function (e) {
                      e.params.autoplay.enabled &&
                        (e.autoplay.start(),
                        X().addEventListener(
                          'visibilitychange',
                          e.autoplay.onVisibilityChange,
                        ));
                    },
                    beforeTransitionStart: function (e, t, s) {
                      e.autoplay.running &&
                        (s || !e.params.autoplay.disableOnInteraction
                          ? e.autoplay.pause(t)
                          : e.autoplay.stop());
                    },
                    sliderFirstMove: function (e) {
                      e.autoplay.running &&
                        (e.params.autoplay.disableOnInteraction
                          ? e.autoplay.stop()
                          : e.autoplay.pause());
                    },
                    touchEnd: function (e) {
                      e.params.cssMode &&
                        e.autoplay.paused &&
                        !e.params.autoplay.disableOnInteraction &&
                        e.autoplay.run();
                    },
                    destroy: function (e) {
                      e.autoplay.running && e.autoplay.stop(),
                        X().removeEventListener(
                          'visibilitychange',
                          e.autoplay.onVisibilityChange,
                        );
                    },
                  },
                },
                {
                  name: 'effect-fade',
                  params: { fadeEffect: { crossFade: !1 } },
                  create: function () {
                    me(this, { fadeEffect: ut({}, $t) });
                  },
                  on: {
                    beforeInit: function (e) {
                      if ('fade' === e.params.effect) {
                        e.classNames.push(
                          e.params.containerModifierClass + 'fade',
                        );
                        var t = {
                          slidesPerView: 1,
                          slidesPerColumn: 1,
                          slidesPerGroup: 1,
                          watchSlidesProgress: !0,
                          spaceBetween: 0,
                          virtualTranslate: !0,
                        };
                        fe(e.params, t), fe(e.originalParams, t);
                      }
                    },
                    setTranslate: function (e) {
                      'fade' === e.params.effect && e.fadeEffect.setTranslate();
                    },
                    setTransition: function (e, t) {
                      'fade' === e.params.effect &&
                        e.fadeEffect.setTransition(t);
                    },
                  },
                },
                {
                  name: 'effect-cube',
                  params: {
                    cubeEffect: {
                      slideShadows: !0,
                      shadow: !0,
                      shadowOffset: 20,
                      shadowScale: 0.94,
                    },
                  },
                  create: function () {
                    me(this, { cubeEffect: ft({}, mt) });
                  },
                  on: {
                    beforeInit: function (e) {
                      if ('cube' === e.params.effect) {
                        e.classNames.push(
                          e.params.containerModifierClass + 'cube',
                        ),
                          e.classNames.push(
                            e.params.containerModifierClass + '3d',
                          );
                        var t = {
                          slidesPerView: 1,
                          slidesPerColumn: 1,
                          slidesPerGroup: 1,
                          watchSlidesProgress: !0,
                          resistanceRatio: 0,
                          spaceBetween: 0,
                          centeredSlides: !1,
                          virtualTranslate: !0,
                        };
                        fe(e.params, t), fe(e.originalParams, t);
                      }
                    },
                    setTranslate: function (e) {
                      'cube' === e.params.effect && e.cubeEffect.setTranslate();
                    },
                    setTransition: function (e, t) {
                      'cube' === e.params.effect &&
                        e.cubeEffect.setTransition(t);
                    },
                  },
                },
                {
                  name: 'effect-flip',
                  params: {
                    flipEffect: { slideShadows: !0, limitRotation: !0 },
                  },
                  create: function () {
                    me(this, { flipEffect: ht({}, gt) });
                  },
                  on: {
                    beforeInit: function (e) {
                      if ('flip' === e.params.effect) {
                        e.classNames.push(
                          e.params.containerModifierClass + 'flip',
                        ),
                          e.classNames.push(
                            e.params.containerModifierClass + '3d',
                          );
                        var t = {
                          slidesPerView: 1,
                          slidesPerColumn: 1,
                          slidesPerGroup: 1,
                          watchSlidesProgress: !0,
                          spaceBetween: 0,
                          virtualTranslate: !0,
                        };
                        fe(e.params, t), fe(e.originalParams, t);
                      }
                    },
                    setTranslate: function (e) {
                      'flip' === e.params.effect && e.flipEffect.setTranslate();
                    },
                    setTransition: function (e, t) {
                      'flip' === e.params.effect &&
                        e.flipEffect.setTransition(t);
                    },
                  },
                },
                {
                  name: 'effect-coverflow',
                  params: {
                    coverflowEffect: {
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      scale: 1,
                      modifier: 1,
                      slideShadows: !0,
                    },
                  },
                  create: function () {
                    me(this, { coverflowEffect: vt({}, wt) });
                  },
                  on: {
                    beforeInit: function (e) {
                      'coverflow' === e.params.effect &&
                        (e.classNames.push(
                          e.params.containerModifierClass + 'coverflow',
                        ),
                        e.classNames.push(
                          e.params.containerModifierClass + '3d',
                        ),
                        (e.params.watchSlidesProgress = !0),
                        (e.originalParams.watchSlidesProgress = !0));
                    },
                    setTranslate: function (e) {
                      'coverflow' === e.params.effect &&
                        e.coverflowEffect.setTranslate();
                    },
                    setTransition: function (e, t) {
                      'coverflow' === e.params.effect &&
                        e.coverflowEffect.setTransition(t);
                    },
                  },
                },
                {
                  name: 'thumbs',
                  params: {
                    thumbs: {
                      swiper: null,
                      multipleActiveThumbs: !0,
                      autoScrollOffset: 0,
                      slideThumbActiveClass: 'swiper-slide-thumb-active',
                      thumbsContainerClass: 'swiper-container-thumbs',
                    },
                  },
                  create: function () {
                    me(this, {
                      thumbs: St({ swiper: null, initialized: !1 }, xt),
                    });
                  },
                  on: {
                    beforeInit: function (e) {
                      var t = e.params.thumbs;
                      t && t.swiper && (e.thumbs.init(), e.thumbs.update(!0));
                    },
                    slideChange: function (e) {
                      e.thumbs.swiper && e.thumbs.update();
                    },
                    update: function (e) {
                      e.thumbs.swiper && e.thumbs.update();
                    },
                    resize: function (e) {
                      e.thumbs.swiper && e.thumbs.update();
                    },
                    observerUpdate: function (e) {
                      e.thumbs.swiper && e.thumbs.update();
                    },
                    setTransition: function (e, t) {
                      var s = e.thumbs.swiper;
                      s && s.setTransition(t);
                    },
                    beforeDestroy: function (e) {
                      var t = e.thumbs.swiper;
                      t && e.thumbs.swiperCreated && t && t.destroy();
                    },
                  },
                },
              ];
            De.use(yt);
            const bt = {};
            function Et(e) {
              return Object.entries(e)
                .reduce((e, [t, s]) => {
                  return `${e} ${
                    ((i = t),
                    i
                      .replace(/([a-z])([A-Z])/g, '$1-$2')
                      .replace(/\s+/g, '-')
                      .toLowerCase())
                  }: ${s};`;
                  var i;
                }, '')
                .trim();
            }
            const Ct = Object.freeze({
                containerClass: 'swiper-container',
                wrapperClass: 'swiper-wrapper',
                slideClass: 'swiper-slide',
              }),
              Tt = [
                'init',
                'beforeDestroy',
                'slideChange',
                'slideChangeTransitionStart',
                'slideChangeTransitionEnd',
                'slideNextTransitionStart',
                'slideNextTransitionEnd',
                'slidePrevTransitionStart',
                'slidePrevTransitionEnd',
                'transitionStart',
                'transitionEnd',
                'touchStart',
                'touchMove',
                'touchMoveOpposite',
                'sliderMove',
                'touchEnd',
                'click',
                'tap',
                'doubleTap',
                'imagesReady',
                'progress',
                'reachBeginning',
                'reachEnd',
                'fromEdge',
                'setTranslate',
                'setTransition',
                'resize',
                'observerUpdate',
                'beforeLoopFix',
                'loopFix',
                'breakpoint',
              ],
              kt = (e) => ({}),
              Mt = (e) => ({}),
              Pt = (e) => ({}),
              zt = (e) => ({}),
              jt = (e) => ({}),
              Lt = (e) => ({}),
              Ot = (e) => ({}),
              It = (e) => ({}),
              At = (e) => ({}),
              Dt = (e) => ({});
            function Nt(e) {
              let t, s, i, n, r, a, o, l, c;
              const d = e[15]['parallax-bg'],
                w = p(d, e, e[14], Dt),
                S = e[15].default,
                x = p(S, e, e[14], null),
                y = e[15]['button-next'],
                b = p(y, e, e[14], It),
                E = e[15]['button-prev'],
                C = p(E, e, e[14], Lt),
                T = e[15].pagination,
                k = p(T, e, e[14], zt),
                M = e[15].scrollbar,
                P = p(M, e, e[14], Mt);
              return {
                c() {
                  (t = h('div')),
                    w && w.c(),
                    (s = g()),
                    (i = h('div')),
                    x && x.c(),
                    (n = g()),
                    b && b.c(),
                    (r = g()),
                    C && C.c(),
                    (a = g()),
                    k && k.c(),
                    (o = g()),
                    P && P.c(),
                    v(i, 'class', e[4]),
                    v(t, 'class', e[2]),
                    v(t, 'style', (l = e[3] || null)),
                    v(t, 'dir', e[0]);
                },
                m(l, p) {
                  f(l, t, p),
                    w && w.m(t, null),
                    $(t, s),
                    $(t, i),
                    x && x.m(i, null),
                    $(t, n),
                    b && b.m(t, null),
                    $(t, r),
                    C && C.m(t, null),
                    $(t, a),
                    k && k.m(t, null),
                    $(t, o),
                    P && P.m(t, null),
                    e[16](t),
                    (c = !0);
                },
                p(e, [s]) {
                  w && w.p && 16384 & s && u(w, d, e, e[14], s, At, Dt),
                    x && x.p && 16384 & s && u(x, S, e, e[14], s, null, null),
                    b && b.p && 16384 & s && u(b, y, e, e[14], s, Ot, It),
                    C && C.p && 16384 & s && u(C, E, e, e[14], s, jt, Lt),
                    k && k.p && 16384 & s && u(k, T, e, e[14], s, Pt, zt),
                    P && P.p && 16384 & s && u(P, M, e, e[14], s, kt, Mt),
                    (!c || 4 & s) && v(t, 'class', e[2]),
                    (!c || (8 & s && l !== (l = e[3] || null))) &&
                      v(t, 'style', l),
                    (!c || 1 & s) && v(t, 'dir', e[0]);
                },
                i(e) {
                  c ||
                    (N(w, e),
                    N(x, e),
                    N(b, e),
                    N(C, e),
                    N(k, e),
                    N(P, e),
                    (c = !0));
                },
                o(e) {
                  B(w, e),
                    B(x, e),
                    B(b, e),
                    B(C, e),
                    B(k, e),
                    B(P, e),
                    (c = !1);
                },
                d(s) {
                  s && m(t),
                    w && w.d(s),
                    x && x.d(s),
                    b && b.d(s),
                    C && C.d(s),
                    k && k.d(s),
                    P && P.d(s),
                    e[16](null);
                },
              };
            }
            function Bt(e, t, s) {
              var i =
                (this && this.__awaiter) ||
                function (e, t, s, i) {
                  return new (s || (s = Promise))(function (n, r) {
                    function a(e) {
                      try {
                        l(i.next(e));
                      } catch (e) {
                        r(e);
                      }
                    }
                    function o(e) {
                      try {
                        l(i.throw(e));
                      } catch (e) {
                        r(e);
                      }
                    }
                    function l(e) {
                      var t;
                      e.done
                        ? n(e.value)
                        : ((t = e.value),
                          t instanceof s
                            ? t
                            : new s(function (e) {
                                e(t);
                              })).then(a, o);
                    }
                    l((i = i.apply(e, t || [])).next());
                  });
                };
              let { options: n = {} } = t,
                { swiper: r = null } = t,
                { className: a = '' } = t,
                { style: o = '' } = t,
                { dir: l = null } = t,
                { autoUpdate: c = !0 } = t,
                { autoDestroy: p = !0 } = t,
                { deleteInstanceOnDestroy: d = !0 } = t,
                { cleanupStylesOnDestroy: u = !0 } = t,
                { thumbs: $ = null } = t;
              const f = n.wrapperClass || Ct.wrapperClass,
                m = (function () {
                  const e = x();
                  return (t, s) => {
                    const i = e.$$.callbacks[t];
                    if (i) {
                      const n = (function (e, t) {
                        const s = document.createEvent('CustomEvent');
                        return s.initCustomEvent(e, !1, !1, t), s;
                      })(t, s);
                      i.slice().forEach((t) => {
                        t.call(e, n);
                      });
                    }
                  };
                })();
              let h, g, v;
              function w() {
                c &&
                  r &&
                  (r &&
                    n.loop &&
                    (r.loopDestroy && r.loopDestroy(),
                    r.loopCreate && r.loopCreate()),
                  r.update(),
                  r.navigation && r.navigation.update && r.navigation.update(),
                  r.pagination &&
                    (r.pagination.render && r.pagination.render(),
                    r.pagination.update && r.pagination.update()));
              }
              var S, b, C;
              (S = bt),
                (b = { options: n, autoUpdate: c, getSwiper: () => r }),
                x().$$.context.set(S, b),
                y(() => {
                  w();
                }),
                (C = () =>
                  i(void 0, void 0, void 0, function* () {
                    yield (P(), k),
                      s(5, (r = new De(h, n))),
                      (function () {
                        for (const e of Tt)
                          r.on(e, (...t) => {
                            m(e, t);
                          });
                      })();
                  })),
                x().$$.on_mount.push(C),
                x().$$.on_destroy.push(() => {
                  p && r && r.destroy && r.destroy(d, u);
                });
              let { $$slots: T = {}, $$scope: M } = t;
              return (
                (e.$$set = (e) => {
                  'options' in e && s(6, (n = e.options)),
                    'swiper' in e && s(5, (r = e.swiper)),
                    'className' in e && s(7, (a = e.className)),
                    'style' in e && s(8, (o = e.style)),
                    'dir' in e && s(0, (l = e.dir)),
                    'autoUpdate' in e && s(9, (c = e.autoUpdate)),
                    'autoDestroy' in e && s(10, (p = e.autoDestroy)),
                    'deleteInstanceOnDestroy' in e &&
                      s(11, (d = e.deleteInstanceOnDestroy)),
                    'cleanupStylesOnDestroy' in e &&
                      s(12, (u = e.cleanupStylesOnDestroy)),
                    'thumbs' in e && s(13, ($ = e.thumbs)),
                    '$$scope' in e && s(14, (M = e.$$scope));
                }),
                (e.$$.update = () => {
                  128 & e.$$.dirty &&
                    s(
                      2,
                      (g =
                        'string' == typeof a
                          ? [Ct.containerClass, a].join(' ').trim()
                          : [Ct.containerClass, ...a].join(' ').trim()),
                    ),
                    256 & e.$$.dirty &&
                      s(3, (v = 'string' == typeof o ? o : Et(o))),
                    8224 & e.$$.dirty &&
                      $ &&
                      r &&
                      r.thumbs &&
                      r.thumbs.swiper !== $ &&
                      (s(5, (r.thumbs.swiper = $), r), w());
                }),
                [
                  l,
                  h,
                  g,
                  v,
                  f,
                  r,
                  n,
                  a,
                  o,
                  c,
                  p,
                  d,
                  u,
                  $,
                  M,
                  T,
                  function (e) {
                    E[e ? 'unshift' : 'push'](() => {
                      (h = e), s(1, h);
                    });
                  },
                ]
              );
            }
            var Vt = class extends q {
              constructor(e) {
                super(),
                  G(this, e, Bt, Nt, l, {
                    options: 6,
                    swiper: 5,
                    className: 7,
                    style: 8,
                    dir: 0,
                    autoUpdate: 9,
                    autoDestroy: 10,
                    deleteInstanceOnDestroy: 11,
                    cleanupStylesOnDestroy: 12,
                    thumbs: 13,
                  });
              }
            };
            function Gt(e) {
              let t, s, i;
              const n = e[7].default,
                r = p(n, e, e[6], null);
              return {
                c() {
                  (t = h('div')),
                    r && r.c(),
                    v(t, 'class', e[2]),
                    v(t, 'style', (s = e[3] || null)),
                    v(t, 'data-hash', e[0]),
                    v(t, 'data-history', e[1]);
                },
                m(e, s) {
                  f(e, t, s), r && r.m(t, null), (i = !0);
                },
                p(e, [a]) {
                  r && r.p && 64 & a && u(r, n, e, e[6], a, null, null),
                    (!i || 4 & a) && v(t, 'class', e[2]),
                    (!i || (8 & a && s !== (s = e[3] || null))) &&
                      v(t, 'style', s),
                    (!i || 1 & a) && v(t, 'data-hash', e[0]),
                    (!i || 2 & a) && v(t, 'data-history', e[1]);
                },
                i(e) {
                  i || (N(r, e), (i = !0));
                },
                o(e) {
                  B(r, e), (i = !1);
                },
                d(e) {
                  e && m(t), r && r.d(e);
                },
              };
            }
            function qt(e, t, s) {
              let { className: i = '' } = t,
                { style: n = '' } = t,
                { hash: r = null } = t,
                { history: a = null } = t;
              const o = ((l = bt), x().$$.context.get(l));
              var l;
              const c = o.options.slideClass || Ct.slideClass;
              let p, d;
              y(() => {
                !(function () {
                  const e = o.getSwiper();
                  o.autoUpdate && e && e.update();
                })();
              });
              let { $$slots: u = {}, $$scope: $ } = t;
              return (
                (e.$$set = (e) => {
                  'className' in e && s(4, (i = e.className)),
                    'style' in e && s(5, (n = e.style)),
                    'hash' in e && s(0, (r = e.hash)),
                    'history' in e && s(1, (a = e.history)),
                    '$$scope' in e && s(6, ($ = e.$$scope));
                }),
                (e.$$.update = () => {
                  16 & e.$$.dirty &&
                    s(
                      2,
                      (p =
                        'string' == typeof i
                          ? [c, i].join(' ').trim()
                          : [c, ...i].join(' ').trim()),
                    ),
                    32 & e.$$.dirty &&
                      s(3, (d = 'string' == typeof n ? n : Et(n)));
                }),
                [r, a, p, d, i, n, $, u]
              );
            }
            var Ht = class extends q {
              constructor(e) {
                super(),
                  G(this, e, qt, Gt, l, {
                    className: 4,
                    style: 5,
                    hash: 0,
                    history: 1,
                  });
              }
            };
            t.default = { Swiper: Vt, SwiperSlide: Ht };
          },
        ]));
    }.call(this, s(2)));
  },
  function (e, t, s) {
    e.exports = s(25);
  },
  function (e, t) {
    var s;
    s = (function () {
      return this;
    })();
    try {
      s = s || new Function('return this')();
    } catch (e) {
      'object' == typeof window && (s = window);
    }
    e.exports = s;
  },
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {},
  function (e, t, s) {
    'use strict';
    function i() {}
    s.r(t);
    function n(e) {
      return e();
    }
    function r() {
      return Object.create(null);
    }
    function a(e) {
      e.forEach(n);
    }
    function o(e) {
      return 'function' == typeof e;
    }
    function l(e, t) {
      return e != e
        ? t == t
        : e !== t || (e && 'object' == typeof e) || 'function' == typeof e;
    }
    function c(e) {
      return 0 === Object.keys(e).length;
    }
    new Set();
    function p(e, t) {
      e.appendChild(t);
    }
    function d(e, t, s) {
      e.insertBefore(t, s || null);
    }
    function u(e) {
      e.parentNode.removeChild(e);
    }
    function $(e) {
      return document.createElement(e);
    }
    function f(e) {
      return document.createTextNode(e);
    }
    function m() {
      return f(' ');
    }
    function h() {
      return f('');
    }
    function g(e, t, s, i) {
      return e.addEventListener(t, s, i), () => e.removeEventListener(t, s, i);
    }
    function v(e, t, s) {
      null == s
        ? e.removeAttribute(t)
        : e.getAttribute(t) !== s && e.setAttribute(t, s);
    }
    new Set();
    let w;
    function S(e) {
      w = e;
    }
    const x = [],
      y = [],
      b = [],
      E = [],
      C = Promise.resolve();
    let T = !1;
    function k() {
      T || ((T = !0), C.then(L));
    }
    function M(e) {
      b.push(e);
    }
    function P(e) {
      E.push(e);
    }
    let z = !1;
    const j = new Set();
    function L() {
      if (!z) {
        z = !0;
        do {
          for (let e = 0; e < x.length; e += 1) {
            const t = x[e];
            S(t), O(t.$$);
          }
          for (x.length = 0; y.length; ) y.pop()();
          for (let e = 0; e < b.length; e += 1) {
            const t = b[e];
            j.has(t) || (j.add(t), t());
          }
          b.length = 0;
        } while (x.length);
        for (; E.length; ) E.pop()();
        (T = !1), (z = !1), j.clear();
      }
    }
    function O(e) {
      if (null !== e.fragment) {
        e.update(), a(e.before_update);
        const t = e.dirty;
        (e.dirty = [-1]),
          e.fragment && e.fragment.p(e.ctx, t),
          e.after_update.forEach(M);
      }
    }
    const I = new Set();
    let A;
    function D() {
      A = { r: 0, c: [], p: A };
    }
    function N() {
      A.r || a(A.c), (A = A.p);
    }
    function B(e, t) {
      e && e.i && (I.delete(e), e.i(t));
    }
    function V(e, t, s, i) {
      if (e && e.o) {
        if (I.has(e)) return;
        I.add(e),
          A.c.push(() => {
            I.delete(e), i && (s && e.d(1), i());
          }),
          e.o(t);
      }
    }
    'undefined' != typeof window
      ? window
      : 'undefined' != typeof globalThis
      ? globalThis
      : global;
    function G(e, t) {
      V(e, 1, 1, () => {
        t.delete(e.key);
      });
    }
    function q(e, t, s, i, n, r, a, o, l, c, p, d) {
      let u = e.length,
        $ = r.length,
        f = u;
      const m = {};
      for (; f--; ) m[e[f].key] = f;
      const h = [],
        g = new Map(),
        v = new Map();
      for (f = $; f--; ) {
        const e = d(n, r, f),
          o = s(e);
        let l = a.get(o);
        l ? i && l.p(e, t) : ((l = c(o, e)), l.c()),
          g.set(o, (h[f] = l)),
          o in m && v.set(o, Math.abs(f - m[o]));
      }
      const w = new Set(),
        S = new Set();
      function x(e) {
        B(e, 1), e.m(o, p), a.set(e.key, e), (p = e.first), $--;
      }
      for (; u && $; ) {
        const t = h[$ - 1],
          s = e[u - 1],
          i = t.key,
          n = s.key;
        t === s
          ? ((p = t.first), u--, $--)
          : g.has(n)
          ? !a.has(i) || w.has(i)
            ? x(t)
            : S.has(n)
            ? u--
            : v.get(i) > v.get(n)
            ? (S.add(i), x(t))
            : (w.add(n), u--)
          : (l(s, a), u--);
      }
      for (; u--; ) {
        const t = e[u];
        g.has(t.key) || l(t, a);
      }
      for (; $; ) x(h[$ - 1]);
      return h;
    }
    new Set([
      'allowfullscreen',
      'allowpaymentrequest',
      'async',
      'autofocus',
      'autoplay',
      'checked',
      'controls',
      'default',
      'defer',
      'disabled',
      'formnovalidate',
      'hidden',
      'ismap',
      'loop',
      'multiple',
      'muted',
      'nomodule',
      'novalidate',
      'open',
      'playsinline',
      'readonly',
      'required',
      'reversed',
      'selected',
    ]);
    let H;
    function _(e, t, s) {
      const i = e.$$.props[t];
      void 0 !== i && ((e.$$.bound[i] = s), s(e.$$.ctx[i]));
    }
    function F(e) {
      e && e.c();
    }
    function X(e, t, s) {
      const { fragment: i, on_mount: r, on_destroy: l, after_update: c } = e.$$;
      i && i.m(t, s),
        M(() => {
          const t = r.map(n).filter(o);
          l ? l.push(...t) : a(t), (e.$$.on_mount = []);
        }),
        c.forEach(M);
    }
    function Y(e, t) {
      const s = e.$$;
      null !== s.fragment &&
        (a(s.on_destroy),
        s.fragment && s.fragment.d(t),
        (s.on_destroy = s.fragment = null),
        (s.ctx = []));
    }
    function R(e, t, s, n, o, l, c = [-1]) {
      const p = w;
      S(e);
      const d = t.props || {},
        $ = (e.$$ = {
          fragment: null,
          ctx: null,
          props: l,
          update: i,
          not_equal: o,
          bound: r(),
          on_mount: [],
          on_destroy: [],
          before_update: [],
          after_update: [],
          context: new Map(p ? p.$$.context : []),
          callbacks: r(),
          dirty: c,
          skip_bound: !1,
        });
      let f = !1;
      if (
        (($.ctx = s
          ? s(e, d, (t, s, ...i) => {
              const n = i.length ? i[0] : s;
              return (
                $.ctx &&
                  o($.ctx[t], ($.ctx[t] = n)) &&
                  (!$.skip_bound && $.bound[t] && $.bound[t](n),
                  f &&
                    (function (e, t) {
                      -1 === e.$$.dirty[0] &&
                        (x.push(e), k(), e.$$.dirty.fill(0)),
                        (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
                    })(e, t)),
                s
              );
            })
          : []),
        $.update(),
        (f = !0),
        a($.before_update),
        ($.fragment = !!n && n($.ctx)),
        t.target)
      ) {
        if (t.hydrate) {
          const e = ((m = t.target), Array.from(m.childNodes));
          $.fragment && $.fragment.l(e), e.forEach(u);
        } else $.fragment && $.fragment.c();
        t.intro && B(e.$$.fragment), X(e, t.target, t.anchor), L();
      }
      var m;
      S(p);
    }
    'function' == typeof HTMLElement &&
      (H = class extends HTMLElement {
        constructor() {
          super(), this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
          for (const e in this.$$.slotted) this.appendChild(this.$$.slotted[e]);
        }
        attributeChangedCallback(e, t, s) {
          this[e] = s;
        }
        $destroy() {
          Y(this, 1), (this.$destroy = i);
        }
        $on(e, t) {
          const s = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
          return (
            s.push(t),
            () => {
              const e = s.indexOf(t);
              -1 !== e && s.splice(e, 1);
            }
          );
        }
        $set(e) {
          this.$$set &&
            !c(e) &&
            ((this.$$.skip_bound = !0),
            this.$$set(e),
            (this.$$.skip_bound = !1));
        }
      });
    class W {
      $destroy() {
        Y(this, 1), (this.$destroy = i);
      }
      $on(e, t) {
        const s = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
        return (
          s.push(t),
          () => {
            const e = s.indexOf(t);
            -1 !== e && s.splice(e, 1);
          }
        );
      }
      $set(e) {
        this.$$set &&
          !c(e) &&
          ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
      }
    }
    var U = s(0);
    function K(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Q(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Z(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function J(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ee(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function te(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function se(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ie(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ne(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function re(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ae(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [K] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Q] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [Z] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [J] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [ee] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [te] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [se] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [ie] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [ne] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [re] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment);
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              (b = !0);
          },
          p(e, s) {
            const n = {};
            1 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            1 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            1 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            1 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            1 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            1 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            1 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            1 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            1 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            1 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            b ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (b = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (b = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e);
          },
        }
      );
    }
    function oe(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: { $$slots: { default: [ae] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            1 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    var le = class extends W {
      constructor(e) {
        super(), R(this, e, null, oe, l, {});
      }
    };
    function ce(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function pe(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function de(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ue(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function $e(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function fe(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function me(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function he(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ge(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ve(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function we(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Se(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function xe(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [ce] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [pe] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [de] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [ue] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [$e] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [fe] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [me] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [he] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [ge] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [ve] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              (C = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            C ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (C = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (C = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E);
          },
        }
      );
    }
    function ye(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: {
              default: [xe],
              'button-prev': [Se],
              'button-next': [we],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function be(e) {
      return [
        {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var Ee = class extends W {
      constructor(e) {
        super(), R(this, e, be, ye, l, {});
      }
    };
    function Ce(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Te(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ke(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Me(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Pe(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ze(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function je(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Le(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Oe(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ie(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ae(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function De(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Ce] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Te] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [ke] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Me] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Pe] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [ze] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [je] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Le] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Oe] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Ie] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function Ne(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [De], pagination: [Ae] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Be(e) {
      return [{ pagination: { el: '.swiper-pagination' } }];
    }
    var Ve = class extends W {
      constructor(e) {
        super(), R(this, e, Be, Ne, l, {});
      }
    };
    function Ge(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function qe(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function He(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function _e(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Fe(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Xe(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ye(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Re(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function We(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ue(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ke(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Qe(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Ge] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [qe] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [He] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [_e] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Fe] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Xe] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Ye] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Re] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [We] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Ue] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function Ze(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [Qe], pagination: [Ke] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Je(e) {
      return [{ pagination: { el: '.swiper-pagination', dynamicBullets: !0 } }];
    }
    var et = class extends W {
      constructor(e) {
        super(), R(this, e, Je, Ze, l, {});
      }
    };
    function tt(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function st(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function it(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function nt(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function rt(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function at(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ot(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function lt(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ct(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function pt(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function dt(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ut(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function $t(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ft(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [tt] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [st] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [it] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [nt] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [rt] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [at] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [ot] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [lt] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [ct] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [pt] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m()),
              (C = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              d(e, C, u),
              (T = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function mt(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: {
              default: [ft],
              'button-prev': [$t],
              'button-next': [ut],
              pagination: [dt],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function ht(e) {
      return [
        {
          pagination: { el: '.swiper-pagination', type: 'progressbar' },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var gt = class extends W {
      constructor(e) {
        super(), R(this, e, ht, mt, l, {});
      }
    };
    function vt(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function wt(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function St(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function xt(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function yt(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function bt(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Et(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ct(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Tt(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function kt(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Mt(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Pt(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function zt(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function jt(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [vt] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [wt] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [St] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [xt] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [yt] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [bt] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Et] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Ct] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Tt] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [kt] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m()),
              (C = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              d(e, C, u),
              (T = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function Lt(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: {
              default: [jt],
              'button-prev': [zt],
              'button-next': [Pt],
              pagination: [Mt],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Ot(e) {
      return [
        {
          pagination: { el: '.swiper-pagination', type: 'fraction' },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var It = class extends W {
      constructor(e) {
        super(), R(this, e, Ot, Lt, l, {});
      }
    };
    s(3);
    function At(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Dt(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Nt(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Bt(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Vt(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Gt(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function qt(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ht(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function _t(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ft(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Xt(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Yt(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [At] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Dt] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [Nt] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Bt] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Vt] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Gt] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [qt] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Ht] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [_t] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Ft] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function Rt(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'pagination-custom',
            options: e[0],
            $$slots: { default: [Yt], pagination: [Xt] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Wt(e) {
      return [
        {
          pagination: {
            el: '.swiper-pagination',
            clickable: !0,
            renderBullet: (e, t) =>
              '<span class="' + t + '">' + (e + 1) + '</span>',
          },
        },
      ];
    }
    var Ut = class extends W {
      constructor(e) {
        super(), R(this, e, Wt, Rt, l, {});
      }
    };
    function Kt(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Qt(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Zt(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Jt(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function es(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ts(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ss(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function is(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ns(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function rs(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function as(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-scrollbar'),
            v(t, 'slot', 'scrollbar');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function os(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Kt] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Qt] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [Zt] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Jt] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [es] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [ts] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [ss] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [is] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [ns] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [rs] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function ls(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [os], scrollbar: [as] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function cs(e) {
      return [{ scrollbar: { el: '.swiper-scrollbar', hide: !0 } }];
    }
    var ps = class extends W {
      constructor(e) {
        super(), R(this, e, cs, ls, l, {});
      }
    };
    function ds(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function us(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function $s(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function fs(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ms(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function hs(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function gs(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function vs(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ws(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ss(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function xs(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ys(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [ds] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [us] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [$s] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [fs] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [ms] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [hs] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [gs] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [vs] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [ws] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Ss] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function bs(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [ys], pagination: [xs] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Es(e) {
      return [
        {
          direction: 'vertical',
          pagination: { el: '.swiper-pagination', clickable: !0 },
        },
      ];
    }
    var Cs = class extends W {
      constructor(e) {
        super(), R(this, e, Es, bs, l, {});
      }
    };
    function Ts(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ks(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ms(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ps(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function zs(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function js(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ls(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Os(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Is(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function As(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ds(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ns(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Ts] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [ks] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [Ms] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Ps] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [zs] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [js] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Ls] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Os] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Is] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [As] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function Bs(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [Ns], pagination: [Ds] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Vs(e) {
      return [
        {
          spaceBetween: 30,
          pagination: { el: '.swiper-pagination', clickable: !0 },
        },
      ];
    }
    var Gs = class extends W {
      constructor(e) {
        super(), R(this, e, Vs, Bs, l, {});
      }
    };
    function qs(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Hs(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function _s(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Fs(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Xs(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ys(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Rs(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ws(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Us(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ks(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Qs(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Zs(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [qs] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Hs] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [_s] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Fs] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Xs] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Ys] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Rs] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Ws] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Us] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Ks] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function Js(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [Zs], pagination: [Qs] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function ei(e) {
      return [
        {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: { el: '.swiper-pagination', clickable: !0 },
        },
      ];
    }
    var ti = class extends W {
      constructor(e) {
        super(), R(this, e, ei, Js, l, {});
      }
    };
    s(4);
    function si(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ii(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ni(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ri(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ai(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function oi(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function li(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ci(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function pi(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function di(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ui(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function $i(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [si] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [ii] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [ni] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [ri] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [ai] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [oi] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [li] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [ci] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [pi] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [di] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function fi(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'slide-per-view-auto',
            options: e[0],
            $$slots: { default: [$i], pagination: [ui] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function mi(e) {
      return [
        {
          slidesPerView: 'auto',
          spaceBetween: 30,
          pagination: { el: '.swiper-pagination', clickable: !0 },
        },
      ];
    }
    var hi = class extends W {
      constructor(e) {
        super(), R(this, e, mi, fi, l, {});
      }
    };
    function gi(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function vi(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function wi(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Si(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function xi(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function yi(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function bi(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ei(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ci(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ti(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ki(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Mi(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [gi] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [vi] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [wi] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Si] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [xi] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [yi] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [bi] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Ei] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Ci] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Ti] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function Pi(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [Mi], pagination: [ki] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function zi(e) {
      return [
        {
          slidesPerView: 4,
          spaceBetween: 30,
          centeredSlides: !0,
          pagination: { el: '.swiper-pagination', clickable: !0 },
        },
      ];
    }
    var ji = class extends W {
      constructor(e) {
        super(), R(this, e, zi, Pi, l, {});
      }
    };
    s(5);
    function Li(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Oi(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ii(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ai(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Di(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ni(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Bi(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Vi(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Gi(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function qi(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Hi(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function _i(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Li] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Oi] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [Ii] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Ai] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Di] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Ni] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Bi] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Vi] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Gi] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [qi] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function Fi(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'centered-auto',
            options: e[0],
            $$slots: { default: [_i], pagination: [Hi] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Xi(e) {
      return [
        {
          slidesPerView: 'auto',
          centeredSlides: !0,
          spaceBetween: 30,
          pagination: { el: '.swiper-pagination', clickable: !0 },
        },
      ];
    }
    var Yi = class extends W {
      constructor(e) {
        super(), R(this, e, Xi, Fi, l, {});
      }
    };
    function Ri(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Wi(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ui(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ki(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Qi(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Zi(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ji(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function en(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function tn(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function sn(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function nn(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function rn(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function an(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function on(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Ri] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Wi] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [Ui] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Ki] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Qi] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Zi] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Ji] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [en] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [tn] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [sn] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m()),
              (C = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              d(e, C, u),
              (T = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function ln(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: {
              default: [on],
              pagination: [an],
              'button-prev': [rn],
              'button-next': [nn],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function cn(e) {
      return [
        {
          cssMode: !0,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: { el: '.swiper-pagination' },
          mousewheel: !0,
          keyboard: !0,
        },
      ];
    }
    var pn = class extends W {
      constructor(e) {
        super(), R(this, e, cn, ln, l, {});
      }
    };
    function dn(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function un(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function $n(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function fn(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function mn(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function hn(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function gn(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function vn(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function wn(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Sn(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function xn(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function yn(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [dn] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [un] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [$n] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [fn] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [mn] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [hn] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [gn] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [vn] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [wn] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Sn] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function bn(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [yn], pagination: [xn] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function En(e) {
      return [
        {
          slidesPerView: 3,
          spaceBetween: 30,
          freeMode: !0,
          pagination: { el: '.swiper-pagination', clickable: !0 },
        },
      ];
    }
    var Cn = class extends W {
      constructor(e) {
        super(), R(this, e, En, bn, l, {});
      }
    };
    s(6);
    function Tn(e) {
      let t, s, i, n, r, a, o, l, c, p, f, h, g, v, w, S, x, y, b, E, C;
      return {
        c() {
          (t = $('h4')),
            (t.textContent = 'Scroll Container'),
            (s = m()),
            (i = $('p')),
            (i.textContent =
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, ex eu sagittis faucibus, ligula ipsum sagittis magna, et imperdiet dolor lectus eu libero. Vestibulum venenatis eget turpis sed faucibus. Maecenas in ullamcorper orci, eu ullamcorper sem. Etiam elit ante, luctus non ante sit amet, sodales vulputate odio. Aenean tristique nisl tellus, sit amet fringilla nisl volutpat cursus. Quisque dignissim lectus ac nunc consectetur mattis. Proin vel hendrerit ipsum, et lobortis dolor. Vestibulum convallis, nibh et tincidunt tristique, nisl risus facilisis lectus, ut interdum orci nisl ac nunc. Cras et aliquam felis. Quisque vel ipsum at elit sodales posuere eget non est. Fusce convallis vestibulum dolor non volutpat. Vivamus vestibulum quam ut ultricies pretium.'),
            (n = m()),
            (r = $('p')),
            (r.textContent =
              'Suspendisse rhoncus fringilla nisl. Mauris eget lorem ac urna consectetur convallis non vel mi. Donec libero dolor, volutpat ut urna sit amet, aliquet molestie purus. Phasellus faucibus, leo vel scelerisque lobortis, ipsum leo sollicitudin metus, eget sagittis ante orci eu ipsum. Nulla ac mauris eu risus sagittis scelerisque iaculis bibendum mauris. Cras ut egestas orci. Cras odio risus, sagittis ut nunc vitae, aliquam consectetur purus. Vivamus ornare nunc vel tellus facilisis, quis dictum elit tincidunt. Donec accumsan nisi at laoreet sodales. Cras at ullamcorper massa. Maecenas at facilisis ex. Nam mollis dignissim purus id efficitur.'),
            (a = m()),
            (o = $('p')),
            (o.textContent =
              'Curabitur eget aliquam erat. Curabitur a neque vitae purus volutpat elementum. Vivamus quis vestibulum leo, efficitur ullamcorper velit. Integer tincidunt finibus metus vel porta. Mauris sed mauris congue, pretium est nec, malesuada purus. Nulla hendrerit consectetur arcu et lacinia. Suspendisse augue justo, convallis eget arcu in, pretium tempor ligula. Nullam vulputate tincidunt est ut ullamcorper.'),
            (l = m()),
            (c = $('p')),
            (c.textContent =
              'Curabitur sed sodales leo. Nulla facilisi. Etiam condimentum, nisi id tempor vulputate, nisi justo cursus justo, pellentesque condimentum diam arcu sit amet leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In placerat tellus a posuere vehicula. Donec diam massa, efficitur vitae mattis et, pretium in augue. Fusce iaculis mi quis ante venenatis, sit amet pellentesque orci aliquam. Vestibulum elementum posuere vehicula.'),
            (p = m()),
            (f = $('p')),
            (f.textContent =
              'Sed tincidunt diam a massa pharetra faucibus. Praesent condimentum id arcu nec fringilla. Maecenas faucibus, ante et venenatis interdum, erat mi eleifend dui, at convallis nisl est nec arcu. Duis vitae arcu rhoncus, faucibus magna ut, tempus metus. Cras in nibh sed ipsum consequat rhoncus. Proin fringilla nulla ut augue tempor fermentum. Nunc hendrerit non nisi vitae finibus. Donec eget ornare libero. Aliquam auctor erat enim, a semper risus semper at. In ut dui in metus tincidunt euismod eget et lacus. Aenean et dictum urna, sed rhoncus lorem. Duis pharetra sagittis odio. Etiam a libero ut nisi feugiat tincidunt vel vitae turpis. Maecenas vel orci sit amet lorem hendrerit venenatis sollicitudin ut dui. Quisque rhoncus nibh in massa pretium scelerisque.'),
            (h = m()),
            (g = $('p')),
            (g.textContent =
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, ex eu sagittis faucibus, ligula ipsum sagittis magna, et imperdiet dolor lectus eu libero. Vestibulum venenatis eget turpis sed faucibus. Maecenas in ullamcorper orci, eu ullamcorper sem. Etiam elit ante, luctus non ante sit amet, sodales vulputate odio. Aenean tristique nisl tellus, sit amet fringilla nisl volutpat cursus. Quisque dignissim lectus ac nunc consectetur mattis. Proin vel hendrerit ipsum, et lobortis dolor. Vestibulum convallis, nibh et tincidunt tristique, nisl risus facilisis lectus, ut interdum orci nisl ac nunc. Cras et aliquam felis. Quisque vel ipsum at elit sodales posuere eget non est. Fusce convallis vestibulum dolor non volutpat. Vivamus vestibulum quam ut ultricies pretium.'),
            (v = m()),
            (w = $('p')),
            (w.textContent =
              'Suspendisse rhoncus fringilla nisl. Mauris eget lorem ac urna consectetur convallis non vel mi. Donec libero dolor, volutpat ut urna sit amet, aliquet molestie purus. Phasellus faucibus, leo vel scelerisque lobortis, ipsum leo sollicitudin metus, eget sagittis ante orci eu ipsum. Nulla ac mauris eu risus sagittis scelerisque iaculis bibendum mauris. Cras ut egestas orci. Cras odio risus, sagittis ut nunc vitae, aliquam consectetur purus. Vivamus ornare nunc vel tellus facilisis, quis dictum elit tincidunt. Donec accumsan nisi at laoreet sodales. Cras at ullamcorper massa. Maecenas at facilisis ex. Nam mollis dignissim purus id efficitur.'),
            (S = m()),
            (x = $('p')),
            (x.textContent =
              'Curabitur eget aliquam erat. Curabitur a neque vitae purus volutpat elementum. Vivamus quis vestibulum leo, efficitur ullamcorper velit. Integer tincidunt finibus metus vel porta. Mauris sed mauris congue, pretium est nec, malesuada purus. Nulla hendrerit consectetur arcu et lacinia. Suspendisse augue justo, convallis eget arcu in, pretium tempor ligula. Nullam vulputate tincidunt est ut ullamcorper.'),
            (y = m()),
            (b = $('p')),
            (b.textContent =
              'Curabitur sed sodales leo. Nulla facilisi. Etiam condimentum, nisi id tempor vulputate, nisi justo cursus justo, pellentesque condimentum diam arcu sit amet leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In placerat tellus a posuere vehicula. Donec diam massa, efficitur vitae mattis et, pretium in augue. Fusce iaculis mi quis ante venenatis, sit amet pellentesque orci aliquam. Vestibulum elementum posuere vehicula.'),
            (E = m()),
            (C = $('p')),
            (C.textContent =
              'Sed tincidunt diam a massa pharetra faucibus. Praesent condimentum id arcu nec fringilla. Maecenas faucibus, ante et venenatis interdum, erat mi eleifend dui, at convallis nisl est nec arcu. Duis vitae arcu rhoncus, faucibus magna ut, tempus metus. Cras in nibh sed ipsum consequat rhoncus. Proin fringilla nulla ut augue tempor fermentum. Nunc hendrerit non nisi vitae finibus. Donec eget ornare libero. Aliquam auctor erat enim, a semper risus semper at. In ut dui in metus tincidunt euismod eget et lacus. Aenean et dictum urna, sed rhoncus lorem. Duis pharetra sagittis odio. Etiam a libero ut nisi feugiat tincidunt vel vitae turpis. Maecenas vel orci sit amet lorem hendrerit venenatis sollicitudin ut dui. Quisque rhoncus nibh in massa pretium scelerisque.');
        },
        m(e, u) {
          d(e, t, u),
            d(e, s, u),
            d(e, i, u),
            d(e, n, u),
            d(e, r, u),
            d(e, a, u),
            d(e, o, u),
            d(e, l, u),
            d(e, c, u),
            d(e, p, u),
            d(e, f, u),
            d(e, h, u),
            d(e, g, u),
            d(e, v, u),
            d(e, w, u),
            d(e, S, u),
            d(e, x, u),
            d(e, y, u),
            d(e, b, u),
            d(e, E, u),
            d(e, C, u);
        },
        d(e) {
          e && u(t),
            e && u(s),
            e && u(i),
            e && u(n),
            e && u(r),
            e && u(a),
            e && u(o),
            e && u(l),
            e && u(c),
            e && u(p),
            e && u(f),
            e && u(h),
            e && u(g),
            e && u(v),
            e && u(w),
            e && u(S),
            e && u(x),
            e && u(y),
            e && u(b),
            e && u(E),
            e && u(C);
        },
      };
    }
    function kn(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-scrollbar'),
            v(t, 'slot', 'scrollbar');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Mn(e) {
      let t, s, i;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Tn] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment), (s = m());
          },
          m(e, n) {
            X(t, e, n), d(e, s, n), (i = !0);
          },
          p(e, s) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            i || (B(t.$$.fragment, e), (i = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (i = !1);
          },
          d(e) {
            Y(t, e), e && u(s);
          },
        }
      );
    }
    function Pn(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'scroll-container',
            options: e[0],
            $$slots: { default: [Mn], scrollbar: [kn] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function zn(e) {
      return [
        {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: !0,
          scrollbar: { el: '.swiper-scrollbar' },
          mousewheel: !0,
        },
      ];
    }
    var jn = class extends W {
      constructor(e) {
        super(), R(this, e, zn, Pn, l, {});
      }
    };
    s(7);
    function Ln(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function On(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function In(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function An(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Dn(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Nn(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Bn(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Vn(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Gn(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function qn(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Hn(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function _n(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Ln] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [On] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [In] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [An] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Dn] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Nn] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Bn] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Vn] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Gn] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [qn] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function Fn(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'slides-per-column',
            options: e[0],
            $$slots: { default: [_n], pagination: [Hn] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Xn(e) {
      return [
        {
          slidesPerView: 3,
          slidesPerColumn: 2,
          spaceBetween: 30,
          pagination: { el: '.swiper-pagination', clickable: !0 },
        },
      ];
    }
    var Yn = class extends W {
      constructor(e) {
        super(), R(this, e, Xn, Fn, l, {});
      }
    };
    s(8);
    function Rn(e) {
      let t;
      return {
        c() {
          t = f('Horizontal Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Wn(e) {
      let t;
      return {
        c() {
          t = f('Vertical Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Un(e) {
      let t;
      return {
        c() {
          t = f('Vertical Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Kn(e) {
      let t;
      return {
        c() {
          t = f('Vertical Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Qn(e) {
      let t;
      return {
        c() {
          t = f('Vertical Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Zn(e) {
      let t;
      return {
        c() {
          t = f('Vertical Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Jn(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination swiper-pagination-v'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function er(e) {
      let t, s, i, n, r, a, o, l, c, p, $;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Wn] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Un] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [Kn] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Qn] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Zn] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              ($ = !0);
          },
          p(e, s) {
            const n = {};
            4 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            4 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            4 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            4 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            4 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
          },
          i(e) {
            $ ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              ($ = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              ($ = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p);
          },
        }
      );
    }
    function tr(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'swiper-container-v',
            options: e[1],
            $$slots: { default: [er], pagination: [Jn] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, s) {
            const i = {};
            4 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function sr(e) {
      let t;
      return {
        c() {
          t = f('Horizontal Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ir(e) {
      let t;
      return {
        c() {
          t = f('Horizontal Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function nr(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination swiper-pagination-h'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function rr(e) {
      let t, s, i, n, r, a, o, l, c;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Rn] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [tr] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [sr] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [ir] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m());
          },
          m(e, p) {
            X(t, e, p),
              d(e, s, p),
              X(i, e, p),
              d(e, n, p),
              X(r, e, p),
              d(e, a, p),
              X(o, e, p),
              d(e, l, p),
              (c = !0);
          },
          p(e, s) {
            const n = {};
            4 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            4 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            4 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const c = {};
            4 & s && (c.$$scope = { dirty: s, ctx: e }), o.$set(c);
          },
          i(e) {
            c ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              (c = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              (c = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l);
          },
        }
      );
    }
    function ar(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'swiper-container-h',
            options: e[0],
            $$slots: { default: [rr], pagination: [nr] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            4 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function or(e) {
      return [
        {
          spaceBetween: 50,
          pagination: { el: '.swiper-pagination-h', clickable: !0 },
        },
        {
          direction: 'vertical',
          spaceBetween: 50,
          pagination: { el: '.swiper-pagination-v', clickable: !0 },
        },
      ];
    }
    var lr = class extends W {
      constructor(e) {
        super(), R(this, e, or, ar, l, {});
      }
    };
    function cr(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function pr(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function dr(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ur(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function $r(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function fr(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function mr(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function hr(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function gr(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function vr(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function wr(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Sr(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [cr] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [pr] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [dr] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [ur] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [$r] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [fr] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [mr] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [hr] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [gr] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [vr] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function xr(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [Sr], pagination: [wr] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function yr(e) {
      return [
        {
          slidesPerView: 4,
          centeredSlides: !0,
          spaceBetween: 30,
          grabCursor: !0,
          pagination: { el: '.swiper-pagination', clickable: !0 },
        },
      ];
    }
    var br = class extends W {
      constructor(e) {
        super(), R(this, e, yr, xr, l, {});
      }
    };
    function Er(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Cr(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Tr(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function kr(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Mr(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Pr(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function zr(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function jr(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Lr(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Or(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ir(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ar(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Dr(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Nr(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Er] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Cr] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [Tr] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [kr] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Mr] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Pr] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [zr] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [jr] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Lr] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Or] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m()),
              (C = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              d(e, C, u),
              (T = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function Br(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: {
              default: [Nr],
              'button-prev': [Dr],
              'button-next': [Ar],
              pagination: [Ir],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Vr(e) {
      return [
        {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: !0,
          pagination: { el: '.swiper-pagination', clickable: !0 },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var Gr = class extends W {
      constructor(e) {
        super(), R(this, e, Vr, Br, l, {});
      }
    };
    function qr(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Hr(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function _r(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Fr(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Xr(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Yr(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Rr(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Wr(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ur(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Kr(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Qr(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Zr(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Jr(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ea(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [qr] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Hr] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [_r] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Fr] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Xr] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Yr] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Rr] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Wr] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Ur] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Kr] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m()),
              (C = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              d(e, C, u),
              (T = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function ta(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: {
              default: [ea],
              'button-prev': [Jr],
              'button-next': [Zr],
              pagination: [Qr],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function sa(e) {
      return [
        {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 3,
          loop: !0,
          loopFillGroupWithBlank: !0,
          pagination: { el: '.swiper-pagination', clickable: !0 },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var ia = class extends W {
      constructor(e) {
        super(), R(this, e, sa, ta, l, {});
      }
    };
    s(9);
    function na(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination swiper-pagination-white'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ra(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next swiper-button-white'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function aa(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev swiper-button-white'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function oa(e) {
      let t, s, n, r, a, o, l, c, p, $, f, h, g;
      return (
        (t = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-1.jpg)',
          },
        })),
        (n = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-2.jpg)',
          },
        })),
        (a = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-3.jpg)',
          },
        })),
        (l = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-4.jpg)',
          },
        })),
        (p = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-5.jpg)',
          },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(n.$$.fragment),
              (r = m()),
              F(a.$$.fragment),
              (o = m()),
              F(l.$$.fragment),
              (c = m()),
              F(p.$$.fragment),
              ($ = m()),
              (f = m()),
              (h = m());
          },
          m(e, i) {
            X(t, e, i),
              d(e, s, i),
              X(n, e, i),
              d(e, r, i),
              X(a, e, i),
              d(e, o, i),
              X(l, e, i),
              d(e, c, i),
              X(p, e, i),
              d(e, $, i),
              d(e, f, i),
              d(e, h, i),
              (g = !0);
          },
          p: i,
          i(e) {
            g ||
              (B(t.$$.fragment, e),
              B(n.$$.fragment, e),
              B(a.$$.fragment, e),
              B(l.$$.fragment, e),
              B(p.$$.fragment, e),
              (g = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(n.$$.fragment, e),
              V(a.$$.fragment, e),
              V(l.$$.fragment, e),
              V(p.$$.fragment, e),
              (g = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(n, e),
              e && u(r),
              Y(a, e),
              e && u(o),
              Y(l, e),
              e && u(c),
              Y(p, e),
              e && u($),
              e && u(f),
              e && u(h);
          },
        }
      );
    }
    function la(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'effect-fade',
            options: e[0],
            $$slots: {
              default: [oa],
              'button-prev': [aa],
              'button-next': [ra],
              pagination: [na],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function ca(e) {
      return [
        {
          spaceBetween: 30,
          effect: 'fade',
          pagination: { el: '.swiper-pagination', clickable: !0 },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var pa = class extends W {
      constructor(e) {
        super(), R(this, e, ca, la, l, {});
      }
    };
    s(10);
    function da(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ua(e) {
      let t, s, n, r, a, o, l, c, p, $, f;
      return (
        (t = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-1.jpg)',
          },
        })),
        (n = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-2.jpg)',
          },
        })),
        (a = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-3.jpg)',
          },
        })),
        (l = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-4.jpg)',
          },
        })),
        (p = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-5.jpg)',
          },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(n.$$.fragment),
              (r = m()),
              F(a.$$.fragment),
              (o = m()),
              F(l.$$.fragment),
              (c = m()),
              F(p.$$.fragment),
              ($ = m());
          },
          m(e, i) {
            X(t, e, i),
              d(e, s, i),
              X(n, e, i),
              d(e, r, i),
              X(a, e, i),
              d(e, o, i),
              X(l, e, i),
              d(e, c, i),
              X(p, e, i),
              d(e, $, i),
              (f = !0);
          },
          p: i,
          i(e) {
            f ||
              (B(t.$$.fragment, e),
              B(n.$$.fragment, e),
              B(a.$$.fragment, e),
              B(l.$$.fragment, e),
              B(p.$$.fragment, e),
              (f = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(n.$$.fragment, e),
              V(a.$$.fragment, e),
              V(l.$$.fragment, e),
              V(p.$$.fragment, e),
              (f = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(n, e),
              e && u(r),
              Y(a, e),
              e && u(o),
              Y(l, e),
              e && u(c),
              Y(p, e),
              e && u($);
          },
        }
      );
    }
    function $a(e) {
      let t, s, i;
      return (
        (s = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [ua], pagination: [da] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            (t = $('div')), F(s.$$.fragment), v(t, 'class', 'effect-cube');
          },
          m(e, n) {
            d(e, t, n), X(s, t, null), (i = !0);
          },
          p(e, [t]) {
            const i = {};
            2 & t && (i.$$scope = { dirty: t, ctx: e }), s.$set(i);
          },
          i(e) {
            i || (B(s.$$.fragment, e), (i = !0));
          },
          o(e) {
            V(s.$$.fragment, e), (i = !1);
          },
          d(e) {
            e && u(t), Y(s);
          },
        }
      );
    }
    function fa(e) {
      return [
        {
          effect: 'cube',
          grabCursor: !0,
          cubeEffect: {
            shadow: !0,
            slideShadows: !0,
            shadowOffset: 20,
            shadowScale: 0.94,
          },
          pagination: { el: '.swiper-pagination' },
        },
      ];
    }
    var ma = class extends W {
      constructor(e) {
        super(), R(this, e, fa, $a, l, {});
      }
    };
    s(11);
    function ha(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ga(e) {
      let t, s, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C;
      return (
        (t = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-1.jpg)',
          },
        })),
        (n = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-2.jpg)',
          },
        })),
        (a = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-3.jpg)',
          },
        })),
        (l = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-4.jpg)',
          },
        })),
        (p = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-5.jpg)',
          },
        })),
        (f = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-6.jpg)',
          },
        })),
        (g = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-7.jpg)',
          },
        })),
        (w = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-8.jpg)',
          },
        })),
        (x = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-9.jpg)',
          },
        })),
        (b = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-10.jpg)',
          },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(n.$$.fragment),
              (r = m()),
              F(a.$$.fragment),
              (o = m()),
              F(l.$$.fragment),
              (c = m()),
              F(p.$$.fragment),
              ($ = m()),
              F(f.$$.fragment),
              (h = m()),
              F(g.$$.fragment),
              (v = m()),
              F(w.$$.fragment),
              (S = m()),
              F(x.$$.fragment),
              (y = m()),
              F(b.$$.fragment),
              (E = m());
          },
          m(e, i) {
            X(t, e, i),
              d(e, s, i),
              X(n, e, i),
              d(e, r, i),
              X(a, e, i),
              d(e, o, i),
              X(l, e, i),
              d(e, c, i),
              X(p, e, i),
              d(e, $, i),
              X(f, e, i),
              d(e, h, i),
              X(g, e, i),
              d(e, v, i),
              X(w, e, i),
              d(e, S, i),
              X(x, e, i),
              d(e, y, i),
              X(b, e, i),
              d(e, E, i),
              (C = !0);
          },
          p: i,
          i(e) {
            C ||
              (B(t.$$.fragment, e),
              B(n.$$.fragment, e),
              B(a.$$.fragment, e),
              B(l.$$.fragment, e),
              B(p.$$.fragment, e),
              B(f.$$.fragment, e),
              B(g.$$.fragment, e),
              B(w.$$.fragment, e),
              B(x.$$.fragment, e),
              B(b.$$.fragment, e),
              (C = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(n.$$.fragment, e),
              V(a.$$.fragment, e),
              V(l.$$.fragment, e),
              V(p.$$.fragment, e),
              V(f.$$.fragment, e),
              V(g.$$.fragment, e),
              V(w.$$.fragment, e),
              V(x.$$.fragment, e),
              V(b.$$.fragment, e),
              (C = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(n, e),
              e && u(r),
              Y(a, e),
              e && u(o),
              Y(l, e),
              e && u(c),
              Y(p, e),
              e && u($),
              Y(f, e),
              e && u(h),
              Y(g, e),
              e && u(v),
              Y(w, e),
              e && u(S),
              Y(x, e),
              e && u(y),
              Y(b, e),
              e && u(E);
          },
        }
      );
    }
    function va(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'effect-coverflow',
            options: e[0],
            $$slots: { default: [ga], pagination: [ha] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function wa(e) {
      return [
        {
          effect: 'coverflow',
          grabCursor: !0,
          centeredSlides: !0,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0,
          },
          pagination: { el: '.swiper-pagination' },
        },
      ];
    }
    var Sa = class extends W {
      constructor(e) {
        super(), R(this, e, wa, va, l, {});
      }
    };
    s(12);
    function xa(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ya(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ba(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ea(e) {
      let t, s, n, r, a, o, l, c, p, $, f, h, g, v, w;
      return (
        (t = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-1.jpg)',
          },
        })),
        (n = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-2.jpg)',
          },
        })),
        (a = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-3.jpg)',
          },
        })),
        (l = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-4.jpg)',
          },
        })),
        (p = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-5.jpg)',
          },
        })),
        (f = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-6.jpg)',
          },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(n.$$.fragment),
              (r = m()),
              F(a.$$.fragment),
              (o = m()),
              F(l.$$.fragment),
              (c = m()),
              F(p.$$.fragment),
              ($ = m()),
              F(f.$$.fragment),
              (h = m()),
              (g = m()),
              (v = m());
          },
          m(e, i) {
            X(t, e, i),
              d(e, s, i),
              X(n, e, i),
              d(e, r, i),
              X(a, e, i),
              d(e, o, i),
              X(l, e, i),
              d(e, c, i),
              X(p, e, i),
              d(e, $, i),
              X(f, e, i),
              d(e, h, i),
              d(e, g, i),
              d(e, v, i),
              (w = !0);
          },
          p: i,
          i(e) {
            w ||
              (B(t.$$.fragment, e),
              B(n.$$.fragment, e),
              B(a.$$.fragment, e),
              B(l.$$.fragment, e),
              B(p.$$.fragment, e),
              B(f.$$.fragment, e),
              (w = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(n.$$.fragment, e),
              V(a.$$.fragment, e),
              V(l.$$.fragment, e),
              V(p.$$.fragment, e),
              V(f.$$.fragment, e),
              (w = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(n, e),
              e && u(r),
              Y(a, e),
              e && u(o),
              Y(l, e),
              e && u(c),
              Y(p, e),
              e && u($),
              Y(f, e),
              e && u(h),
              e && u(g),
              e && u(v);
          },
        }
      );
    }
    function Ca(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'effect-flip',
            options: e[0],
            $$slots: {
              default: [Ea],
              'button-next': [ba],
              'button-prev': [ya],
              pagination: [xa],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Ta(e) {
      return [
        {
          effect: 'flip',
          grabCursor: !0,
          pagination: { el: '.swiper-pagination' },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var ka = class extends W {
      constructor(e) {
        super(), R(this, e, Ta, Ca, l, {});
      }
    };
    function Ma(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Pa(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function za(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ja(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function La(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Oa(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ia(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Aa(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Da(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Na(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ba(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Va(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ga(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function qa(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Ma] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Pa] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [za] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [ja] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [La] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Oa] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Ia] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Aa] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Da] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Na] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m()),
              (C = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              d(e, C, u),
              (T = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function Ha(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: {
              default: [qa],
              'button-prev': [Ga],
              'button-next': [Va],
              pagination: [Ba],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function _a(e) {
      return [
        {
          slidesPerView: 1,
          spaceBetween: 30,
          keyboard: { enabled: !0 },
          pagination: { el: '.swiper-pagination', clickable: !0 },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var Fa = class extends W {
      constructor(e) {
        super(), R(this, e, _a, Ha, l, {});
      }
    };
    function Xa(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ya(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ra(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Wa(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ua(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ka(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Qa(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Za(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ja(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function eo(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function to(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function so(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Xa] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Ya] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [Ra] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Wa] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Ua] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Ka] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Qa] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Za] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Ja] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [eo] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function io(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [so], pagination: [to] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function no(e) {
      return [
        {
          direction: 'vertical',
          slidesPerView: 1,
          spaceBetween: 30,
          mousewheel: !0,
          pagination: { el: '.swiper-pagination', clickable: !0 },
        },
      ];
    }
    var ro = class extends W {
      constructor(e) {
        super(), R(this, e, no, io, l, {});
      }
    };
    function ao(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function oo(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function lo(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function co(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function po(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function uo(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function $o(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function fo(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function mo(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ho(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function go(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function vo(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function wo(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function So(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [ao] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [oo] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [lo] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [co] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [po] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [uo] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [$o] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [fo] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [mo] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [ho] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m()),
              (C = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              d(e, C, u),
              (T = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function xo(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: {
              default: [So],
              'button-prev': [wo],
              'button-next': [vo],
              pagination: [go],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function yo(e) {
      return [
        {
          spaceBetween: 30,
          centeredSlides: !0,
          autoplay: { delay: 2500, disableOnInteraction: !1 },
          pagination: { el: '.swiper-pagination', clickable: !0 },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var bo = class extends W {
      constructor(e) {
        super(), R(this, e, yo, xo, l, {});
      }
    };
    s(13);
    function Eo(e, t, s) {
      const i = e.slice();
      return (i[6] = t[s]), i;
    }
    function Co(e) {
      let t,
        s,
        i = e[6] + '';
      return {
        c() {
          (t = f('Slide ')), (s = f(i));
        },
        m(e, i) {
          d(e, t, i), d(e, s, i);
        },
        p(e, t) {
          var n, r;
          1 & t &&
            i !== (i = e[6] + '') &&
            ((r = '' + (r = i)), (n = s).wholeText !== r && (n.data = r));
        },
        d(e) {
          e && u(t), e && u(s);
        },
      };
    }
    function To(e, t) {
      let s, i, n;
      return (
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Co] }, $$scope: { ctx: t } },
        })),
        {
          key: e,
          first: null,
          c() {
            (s = h()), F(i.$$.fragment), (this.first = s);
          },
          m(e, t) {
            d(e, s, t), X(i, e, t), (n = !0);
          },
          p(e, t) {
            const s = {};
            513 & t && (s.$$scope = { dirty: t, ctx: e }), i.$set(s);
          },
          i(e) {
            n || (B(i.$$.fragment, e), (n = !0));
          },
          o(e) {
            V(i.$$.fragment, e), (n = !1);
          },
          d(e) {
            e && u(s), Y(i, e);
          },
        }
      );
    }
    function ko(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Mo(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Po(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function zo(e) {
      let t,
        s,
        i,
        n,
        r = [],
        a = new Map(),
        o = e[0];
      const l = (e) => e[6];
      for (let t = 0; t < o.length; t += 1) {
        let s = Eo(e, o, t),
          i = l(s);
        a.set(i, (r[t] = To(i, s)));
      }
      return {
        c() {
          for (let e = 0; e < r.length; e += 1) r[e].c();
          (t = m()), (s = m()), (i = m());
        },
        m(e, a) {
          for (let t = 0; t < r.length; t += 1) r[t].m(e, a);
          d(e, t, a), d(e, s, a), d(e, i, a), (n = !0);
        },
        p(e, s) {
          if (1 & s) {
            const i = e[0];
            D(), (r = q(r, s, l, 1, e, i, a, t.parentNode, G, To, t, Eo)), N();
          }
        },
        i(e) {
          if (!n) {
            for (let e = 0; e < o.length; e += 1) B(r[e]);
            n = !0;
          }
        },
        o(e) {
          for (let e = 0; e < r.length; e += 1) V(r[e]);
          n = !1;
        },
        d(e) {
          for (let t = 0; t < r.length; t += 1) r[t].d(e);
          e && u(t), e && u(s), e && u(i);
        },
      };
    }
    function jo(e) {
      let t, s, i, n, r, o, l, c, f, h, w, S, x, y;
      return (
        (w = new U.Swiper({
          props: {
            options: e[5],
            $$slots: {
              default: [zo],
              'button-prev': [Po],
              'button-next': [Mo],
              pagination: [ko],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            (t = $('div')),
              (s = $('div')),
              (i = $('button')),
              (i.textContent = 'Prepend slide'),
              (n = m()),
              (r = $('button')),
              (r.textContent = 'Append slide'),
              (o = m()),
              (l = $('button')),
              (l.textContent = 'Pop slide'),
              (c = m()),
              (f = $('button')),
              (f.textContent = 'Shift slide'),
              (h = m()),
              F(w.$$.fragment),
              v(i, 'class', 'svelte-1q8hjek'),
              v(r, 'class', 'svelte-1q8hjek'),
              v(l, 'class', 'svelte-1q8hjek'),
              v(f, 'class', 'svelte-1q8hjek'),
              v(s, 'class', 'toolbar svelte-1q8hjek'),
              v(t, 'class', 'toolbar-box svelte-1q8hjek');
          },
          m(a, u) {
            d(a, t, u),
              p(t, s),
              p(s, i),
              p(s, n),
              p(s, r),
              p(s, o),
              p(s, l),
              p(s, c),
              p(s, f),
              d(a, h, u),
              X(w, a, u),
              (S = !0),
              x ||
                ((y = [
                  g(i, 'click', e[2]),
                  g(r, 'click', e[1]),
                  g(l, 'click', e[3]),
                  g(f, 'click', e[4]),
                ]),
                (x = !0));
          },
          p(e, [t]) {
            const s = {};
            513 & t && (s.$$scope = { dirty: t, ctx: e }), w.$set(s);
          },
          i(e) {
            S || (B(w.$$.fragment, e), (S = !0));
          },
          o(e) {
            V(w.$$.fragment, e), (S = !1);
          },
          d(e) {
            e && u(t), e && u(h), Y(w, e), (x = !1), a(y);
          },
        }
      );
    }
    function Lo(e, t, s) {
      let i = [1, 2, 3, 4, 5];
      return [
        i,
        function () {
          i.push(i.length + 1), s(0, i);
        },
        function () {
          i.unshift(i[0] - 1), s(0, i);
        },
        function () {
          i.pop(), s(0, i);
        },
        function () {
          i.shift(), s(0, i);
        },
        {
          slidesPerView: 3,
          centeredSlides: !0,
          spaceBetween: 30,
          pagination: { el: '.swiper-pagination', clickable: !0 },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var Oo = class extends W {
      constructor(e) {
        super(), R(this, e, Lo, jo, l, {});
      }
    };
    s(14);
    function Io(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next swiper-button-white'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ao(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev swiper-button-white'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Do(e) {
      let t, s, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-1.jpg)',
          },
        })),
        (n = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-2.jpg)',
          },
        })),
        (a = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-3.jpg)',
          },
        })),
        (l = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-4.jpg)',
          },
        })),
        (p = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-5.jpg)',
          },
        })),
        (f = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-6.jpg)',
          },
        })),
        (g = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-7.jpg)',
          },
        })),
        (w = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-8.jpg)',
          },
        })),
        (x = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-9.jpg)',
          },
        })),
        (b = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-10.jpg)',
          },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(n.$$.fragment),
              (r = m()),
              F(a.$$.fragment),
              (o = m()),
              F(l.$$.fragment),
              (c = m()),
              F(p.$$.fragment),
              ($ = m()),
              F(f.$$.fragment),
              (h = m()),
              F(g.$$.fragment),
              (v = m()),
              F(w.$$.fragment),
              (S = m()),
              F(x.$$.fragment),
              (y = m()),
              F(b.$$.fragment),
              (E = m()),
              (C = m());
          },
          m(e, i) {
            X(t, e, i),
              d(e, s, i),
              X(n, e, i),
              d(e, r, i),
              X(a, e, i),
              d(e, o, i),
              X(l, e, i),
              d(e, c, i),
              X(p, e, i),
              d(e, $, i),
              X(f, e, i),
              d(e, h, i),
              X(g, e, i),
              d(e, v, i),
              X(w, e, i),
              d(e, S, i),
              X(x, e, i),
              d(e, y, i),
              X(b, e, i),
              d(e, E, i),
              d(e, C, i),
              (T = !0);
          },
          p: i,
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(n.$$.fragment, e),
              B(a.$$.fragment, e),
              B(l.$$.fragment, e),
              B(p.$$.fragment, e),
              B(f.$$.fragment, e),
              B(g.$$.fragment, e),
              B(w.$$.fragment, e),
              B(x.$$.fragment, e),
              B(b.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(n.$$.fragment, e),
              V(a.$$.fragment, e),
              V(l.$$.fragment, e),
              V(p.$$.fragment, e),
              V(f.$$.fragment, e),
              V(g.$$.fragment, e),
              V(w.$$.fragment, e),
              V(x.$$.fragment, e),
              V(b.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(n, e),
              e && u(r),
              Y(a, e),
              e && u(o),
              Y(l, e),
              e && u(c),
              Y(p, e),
              e && u($),
              Y(f, e),
              e && u(h),
              Y(g, e),
              e && u(v),
              Y(w, e),
              e && u(S),
              Y(x, e),
              e && u(y),
              Y(b, e),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function No(e) {
      let t, s, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-1.jpg)',
          },
        })),
        (n = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-2.jpg)',
          },
        })),
        (a = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-3.jpg)',
          },
        })),
        (l = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-4.jpg)',
          },
        })),
        (p = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-5.jpg)',
          },
        })),
        (f = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-6.jpg)',
          },
        })),
        (g = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-7.jpg)',
          },
        })),
        (w = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-8.jpg)',
          },
        })),
        (x = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-9.jpg)',
          },
        })),
        (b = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-10.jpg)',
          },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(n.$$.fragment),
              (r = m()),
              F(a.$$.fragment),
              (o = m()),
              F(l.$$.fragment),
              (c = m()),
              F(p.$$.fragment),
              ($ = m()),
              F(f.$$.fragment),
              (h = m()),
              F(g.$$.fragment),
              (v = m()),
              F(w.$$.fragment),
              (S = m()),
              F(x.$$.fragment),
              (y = m()),
              F(b.$$.fragment);
          },
          m(e, i) {
            X(t, e, i),
              d(e, s, i),
              X(n, e, i),
              d(e, r, i),
              X(a, e, i),
              d(e, o, i),
              X(l, e, i),
              d(e, c, i),
              X(p, e, i),
              d(e, $, i),
              X(f, e, i),
              d(e, h, i),
              X(g, e, i),
              d(e, v, i),
              X(w, e, i),
              d(e, S, i),
              X(x, e, i),
              d(e, y, i),
              X(b, e, i),
              (E = !0);
          },
          p: i,
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(n.$$.fragment, e),
              B(a.$$.fragment, e),
              B(l.$$.fragment, e),
              B(p.$$.fragment, e),
              B(f.$$.fragment, e),
              B(g.$$.fragment, e),
              B(w.$$.fragment, e),
              B(x.$$.fragment, e),
              B(b.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(n.$$.fragment, e),
              V(a.$$.fragment, e),
              V(l.$$.fragment, e),
              V(p.$$.fragment, e),
              V(f.$$.fragment, e),
              V(g.$$.fragment, e),
              V(w.$$.fragment, e),
              V(x.$$.fragment, e),
              V(b.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(n, e),
              e && u(r),
              Y(a, e),
              e && u(o),
              Y(l, e),
              e && u(c),
              Y(p, e),
              e && u($),
              Y(f, e),
              e && u(h),
              Y(g, e),
              e && u(v),
              Y(w, e),
              e && u(S),
              Y(x, e),
              e && u(y),
              Y(b, e);
          },
        }
      );
    }
    function Bo(e) {
      let t, s, i, n, r, a, o;
      function l(t) {
        e[4].call(null, t);
      }
      let c = {
        className: 'gallery-top',
        options: e[2],
        thumbs: e[1],
        $$slots: { default: [Do], 'button-prev': [Ao], 'button-next': [Io] },
        $$scope: { ctx: e },
      };
      function f(t) {
        e[5].call(null, t);
      }
      void 0 !== e[0] && (c.swiper = e[0]),
        (s = new U.Swiper({ props: c })),
        y.push(() => _(s, 'swiper', l));
      let h = {
        className: 'gallery-thumbs',
        options: e[3],
        $$slots: { default: [No] },
        $$scope: { ctx: e },
      };
      return (
        void 0 !== e[1] && (h.swiper = e[1]),
        (r = new U.Swiper({ props: h })),
        y.push(() => _(r, 'swiper', f)),
        {
          c() {
            (t = $('div')),
              F(s.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              v(t, 'class', 'thumbs-gallery');
          },
          m(e, i) {
            d(e, t, i), X(s, t, null), p(t, n), X(r, t, null), (o = !0);
          },
          p(e, [t]) {
            const n = {};
            2 & t && (n.thumbs = e[1]),
              64 & t && (n.$$scope = { dirty: t, ctx: e }),
              !i && 1 & t && ((i = !0), (n.swiper = e[0]), P(() => (i = !1))),
              s.$set(n);
            const o = {};
            64 & t && (o.$$scope = { dirty: t, ctx: e }),
              !a && 2 & t && ((a = !0), (o.swiper = e[1]), P(() => (a = !1))),
              r.$set(o);
          },
          i(e) {
            o || (B(s.$$.fragment, e), B(r.$$.fragment, e), (o = !0));
          },
          o(e) {
            V(s.$$.fragment, e), V(r.$$.fragment, e), (o = !1);
          },
          d(e) {
            e && u(t), Y(s), Y(r);
          },
        }
      );
    }
    function Vo(e, t, s) {
      let i, n;
      return [
        i,
        n,
        {
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
        {
          spaceBetween: 10,
          slidesPerView: 4,
          freeMode: !0,
          watchSlidesVisibility: !0,
          watchSlidesProgress: !0,
        },
        function (e) {
          (i = e), s(0, i);
        },
        function (e) {
          (n = e), s(1, n);
        },
      ];
    }
    var Go = class extends W {
      constructor(e) {
        super(), R(this, e, Vo, Bo, l, {});
      }
    };
    s(15);
    function qo(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next swiper-button-white'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ho(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev swiper-button-white'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function _o(e) {
      let t, s, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-1.jpg)',
          },
        })),
        (n = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-2.jpg)',
          },
        })),
        (a = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-3.jpg)',
          },
        })),
        (l = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-4.jpg)',
          },
        })),
        (p = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-5.jpg)',
          },
        })),
        (f = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-6.jpg)',
          },
        })),
        (g = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-7.jpg)',
          },
        })),
        (w = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-8.jpg)',
          },
        })),
        (x = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-9.jpg)',
          },
        })),
        (b = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-10.jpg)',
          },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(n.$$.fragment),
              (r = m()),
              F(a.$$.fragment),
              (o = m()),
              F(l.$$.fragment),
              (c = m()),
              F(p.$$.fragment),
              ($ = m()),
              F(f.$$.fragment),
              (h = m()),
              F(g.$$.fragment),
              (v = m()),
              F(w.$$.fragment),
              (S = m()),
              F(x.$$.fragment),
              (y = m()),
              F(b.$$.fragment),
              (E = m()),
              (C = m());
          },
          m(e, i) {
            X(t, e, i),
              d(e, s, i),
              X(n, e, i),
              d(e, r, i),
              X(a, e, i),
              d(e, o, i),
              X(l, e, i),
              d(e, c, i),
              X(p, e, i),
              d(e, $, i),
              X(f, e, i),
              d(e, h, i),
              X(g, e, i),
              d(e, v, i),
              X(w, e, i),
              d(e, S, i),
              X(x, e, i),
              d(e, y, i),
              X(b, e, i),
              d(e, E, i),
              d(e, C, i),
              (T = !0);
          },
          p: i,
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(n.$$.fragment, e),
              B(a.$$.fragment, e),
              B(l.$$.fragment, e),
              B(p.$$.fragment, e),
              B(f.$$.fragment, e),
              B(g.$$.fragment, e),
              B(w.$$.fragment, e),
              B(x.$$.fragment, e),
              B(b.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(n.$$.fragment, e),
              V(a.$$.fragment, e),
              V(l.$$.fragment, e),
              V(p.$$.fragment, e),
              V(f.$$.fragment, e),
              V(g.$$.fragment, e),
              V(w.$$.fragment, e),
              V(x.$$.fragment, e),
              V(b.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(n, e),
              e && u(r),
              Y(a, e),
              e && u(o),
              Y(l, e),
              e && u(c),
              Y(p, e),
              e && u($),
              Y(f, e),
              e && u(h),
              Y(g, e),
              e && u(v),
              Y(w, e),
              e && u(S),
              Y(x, e),
              e && u(y),
              Y(b, e),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function Fo(e) {
      let t, s, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-1.jpg)',
          },
        })),
        (n = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-2.jpg)',
          },
        })),
        (a = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-3.jpg)',
          },
        })),
        (l = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-4.jpg)',
          },
        })),
        (p = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-5.jpg)',
          },
        })),
        (f = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-6.jpg)',
          },
        })),
        (g = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-7.jpg)',
          },
        })),
        (w = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-8.jpg)',
          },
        })),
        (x = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-9.jpg)',
          },
        })),
        (b = new U.SwiperSlide({
          props: {
            style:
              'background-image:url(https://swiperjs.com/demos/images/nature-10.jpg)',
          },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(n.$$.fragment),
              (r = m()),
              F(a.$$.fragment),
              (o = m()),
              F(l.$$.fragment),
              (c = m()),
              F(p.$$.fragment),
              ($ = m()),
              F(f.$$.fragment),
              (h = m()),
              F(g.$$.fragment),
              (v = m()),
              F(w.$$.fragment),
              (S = m()),
              F(x.$$.fragment),
              (y = m()),
              F(b.$$.fragment);
          },
          m(e, i) {
            X(t, e, i),
              d(e, s, i),
              X(n, e, i),
              d(e, r, i),
              X(a, e, i),
              d(e, o, i),
              X(l, e, i),
              d(e, c, i),
              X(p, e, i),
              d(e, $, i),
              X(f, e, i),
              d(e, h, i),
              X(g, e, i),
              d(e, v, i),
              X(w, e, i),
              d(e, S, i),
              X(x, e, i),
              d(e, y, i),
              X(b, e, i),
              (E = !0);
          },
          p: i,
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(n.$$.fragment, e),
              B(a.$$.fragment, e),
              B(l.$$.fragment, e),
              B(p.$$.fragment, e),
              B(f.$$.fragment, e),
              B(g.$$.fragment, e),
              B(w.$$.fragment, e),
              B(x.$$.fragment, e),
              B(b.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(n.$$.fragment, e),
              V(a.$$.fragment, e),
              V(l.$$.fragment, e),
              V(p.$$.fragment, e),
              V(f.$$.fragment, e),
              V(g.$$.fragment, e),
              V(w.$$.fragment, e),
              V(x.$$.fragment, e),
              V(b.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(n, e),
              e && u(r),
              Y(a, e),
              e && u(o),
              Y(l, e),
              e && u(c),
              Y(p, e),
              e && u($),
              Y(f, e),
              e && u(h),
              Y(g, e),
              e && u(v),
              Y(w, e),
              e && u(S),
              Y(x, e),
              e && u(y),
              Y(b, e);
          },
        }
      );
    }
    function Xo(e) {
      let t, s, i, n, r, a, o;
      function l(t) {
        e[4].call(null, t);
      }
      let c = {
        className: 'gallery-top',
        options: e[2],
        thumbs: e[1],
        $$slots: { default: [_o], 'button-prev': [Ho], 'button-next': [qo] },
        $$scope: { ctx: e },
      };
      function f(t) {
        e[5].call(null, t);
      }
      void 0 !== e[0] && (c.swiper = e[0]),
        (s = new U.Swiper({ props: c })),
        y.push(() => _(s, 'swiper', l));
      let h = {
        className: 'gallery-thumbs',
        options: e[3],
        $$slots: { default: [Fo] },
        $$scope: { ctx: e },
      };
      return (
        void 0 !== e[1] && (h.swiper = e[1]),
        (r = new U.Swiper({ props: h })),
        y.push(() => _(r, 'swiper', f)),
        {
          c() {
            (t = $('div')),
              F(s.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              v(t, 'class', 'thumbs-gallery');
          },
          m(e, i) {
            d(e, t, i), X(s, t, null), p(t, n), X(r, t, null), (o = !0);
          },
          p(e, [t]) {
            const n = {};
            2 & t && (n.thumbs = e[1]),
              64 & t && (n.$$scope = { dirty: t, ctx: e }),
              !i && 1 & t && ((i = !0), (n.swiper = e[0]), P(() => (i = !1))),
              s.$set(n);
            const o = {};
            64 & t && (o.$$scope = { dirty: t, ctx: e }),
              !a && 2 & t && ((a = !0), (o.swiper = e[1]), P(() => (a = !1))),
              r.$set(o);
          },
          i(e) {
            o || (B(s.$$.fragment, e), B(r.$$.fragment, e), (o = !0));
          },
          o(e) {
            V(s.$$.fragment, e), V(r.$$.fragment, e), (o = !1);
          },
          d(e) {
            e && u(t), Y(s), Y(r);
          },
        }
      );
    }
    function Yo(e, t, s) {
      let i, n;
      return [
        i,
        n,
        {
          spaceBetween: 10,
          loop: !0,
          loopedSlides: 5,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
        {
          spaceBetween: 10,
          slidesPerView: 4,
          loop: !0,
          freeMode: !0,
          loopedSlides: 5,
          watchSlidesVisibility: !0,
          watchSlidesProgress: !0,
        },
        function (e) {
          (i = e), s(0, i);
        },
        function (e) {
          (n = e), s(1, n);
        },
      ];
    }
    var Ro = class extends W {
      constructor(e) {
        super(), R(this, e, Yo, Xo, l, {});
      }
    };
    function Wo(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Uo(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ko(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Qo(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Zo(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Jo(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function el(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function tl(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function sl(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function il(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function nl(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function rl(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function al(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ol(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: {
            hash: 'slide1',
            $$slots: { default: [Wo] },
            $$scope: { ctx: e },
          },
        })),
        (i = new U.SwiperSlide({
          props: {
            hash: 'slide2',
            $$slots: { default: [Uo] },
            $$scope: { ctx: e },
          },
        })),
        (r = new U.SwiperSlide({
          props: {
            hash: 'slide3',
            $$slots: { default: [Ko] },
            $$scope: { ctx: e },
          },
        })),
        (o = new U.SwiperSlide({
          props: {
            hash: 'slide4',
            $$slots: { default: [Qo] },
            $$scope: { ctx: e },
          },
        })),
        (c = new U.SwiperSlide({
          props: {
            hash: 'slide5',
            $$slots: { default: [Zo] },
            $$scope: { ctx: e },
          },
        })),
        ($ = new U.SwiperSlide({
          props: {
            hash: 'slide6',
            $$slots: { default: [Jo] },
            $$scope: { ctx: e },
          },
        })),
        (h = new U.SwiperSlide({
          props: {
            hash: 'slide7',
            $$slots: { default: [el] },
            $$scope: { ctx: e },
          },
        })),
        (v = new U.SwiperSlide({
          props: {
            hash: 'slide8',
            $$slots: { default: [tl] },
            $$scope: { ctx: e },
          },
        })),
        (S = new U.SwiperSlide({
          props: {
            hash: 'slide9',
            $$slots: { default: [sl] },
            $$scope: { ctx: e },
          },
        })),
        (y = new U.SwiperSlide({
          props: {
            hash: 'slide10',
            $$slots: { default: [il] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m()),
              (C = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              d(e, C, u),
              (T = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function ll(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: {
              default: [ol],
              'button-prev': [al],
              'button-next': [rl],
              pagination: [nl],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function cl(e) {
      return [
        {
          spaceBetween: 30,
          hashNavigation: { watchState: !0 },
          pagination: { el: '.swiper-pagination', clickable: !0 },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var pl = class extends W {
      constructor(e) {
        super(), R(this, e, cl, ll, l, {});
      }
    };
    function dl(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ul(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function $l(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function fl(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ml(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function hl(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function gl(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function vl(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function wl(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Sl(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function xl(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function yl(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function bl(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function El(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: {
            history: '1',
            $$slots: { default: [dl] },
            $$scope: { ctx: e },
          },
        })),
        (i = new U.SwiperSlide({
          props: {
            history: 'slide 2',
            $$slots: { default: [ul] },
            $$scope: { ctx: e },
          },
        })),
        (r = new U.SwiperSlide({
          props: {
            history: '3',
            $$slots: { default: [$l] },
            $$scope: { ctx: e },
          },
        })),
        (o = new U.SwiperSlide({
          props: {
            history: 'slide 4',
            $$slots: { default: [fl] },
            $$scope: { ctx: e },
          },
        })),
        (c = new U.SwiperSlide({
          props: {
            history: '5',
            $$slots: { default: [ml] },
            $$scope: { ctx: e },
          },
        })),
        ($ = new U.SwiperSlide({
          props: {
            history: 'slide 6',
            $$slots: { default: [hl] },
            $$scope: { ctx: e },
          },
        })),
        (h = new U.SwiperSlide({
          props: {
            history: '7',
            $$slots: { default: [gl] },
            $$scope: { ctx: e },
          },
        })),
        (v = new U.SwiperSlide({
          props: {
            history: 'slide 8',
            $$slots: { default: [vl] },
            $$scope: { ctx: e },
          },
        })),
        (S = new U.SwiperSlide({
          props: {
            history: '9',
            $$slots: { default: [wl] },
            $$scope: { ctx: e },
          },
        })),
        (y = new U.SwiperSlide({
          props: {
            history: 'slide 10',
            $$slots: { default: [Sl] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m()),
              (C = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              d(e, C, u),
              (T = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function Cl(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: {
              default: [El],
              'button-prev': [bl],
              'button-next': [yl],
              pagination: [xl],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Tl(e) {
      return [
        {
          spaceBetween: 50,
          slidesPerView: 1,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: { el: '.swiper-pagination' },
          history: { key: 'slide' },
        },
      ];
    }
    var kl = class extends W {
      constructor(e) {
        super(), R(this, e, Tl, Cl, l, {});
      }
    };
    function Ml(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Pl(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function zl(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function jl(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ll(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ol(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Il(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Al(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Dl(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Nl(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Bl(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Vl(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Gl(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ql(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Ml] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Pl] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [zl] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [jl] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Ll] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Ol] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Il] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Al] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Dl] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Nl] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m()),
              (C = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              d(e, C, u),
              (T = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function Hl(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            dir: 'rtl',
            $$slots: {
              default: [ql],
              'button-prev': [Gl],
              'button-next': [Vl],
              pagination: [Bl],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function _l(e) {
      return [
        {
          pagination: { el: '.swiper-pagination', clickable: !0 },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var Fl = class extends W {
      constructor(e) {
        super(), R(this, e, _l, Hl, l, {});
      }
    };
    s(16);
    function Xl(e) {
      let t;
      return {
        c() {
          var e, s, i;
          (t = $('div')),
            v(t, 'class', 'parallax-bg'),
            (e = 'background-image'),
            (s = 'url(https://swiperjs.com/demos/images/nature-1.jpg)'),
            t.style.setProperty(e, s, i ? 'important' : ''),
            v(t, 'data-swiper-parallax', '-23%'),
            v(t, 'slot', 'parallax-bg');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Yl(e) {
      let t, s, i, n, r;
      return {
        c() {
          (t = $('div')),
            (t.textContent = 'Slide 1'),
            (s = m()),
            (i = $('div')),
            (i.textContent = 'Subtitle'),
            (n = m()),
            (r = $('div')),
            (r.innerHTML =
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>'),
            v(t, 'class', 'title'),
            v(t, 'data-swiper-parallax', '-300'),
            v(i, 'class', 'subtitle'),
            v(i, 'data-swiper-parallax', '-200'),
            v(r, 'class', 'text'),
            v(r, 'data-swiper-parallax', '-100');
        },
        m(e, a) {
          d(e, t, a), d(e, s, a), d(e, i, a), d(e, n, a), d(e, r, a);
        },
        d(e) {
          e && u(t), e && u(s), e && u(i), e && u(n), e && u(r);
        },
      };
    }
    function Rl(e) {
      let t, s, i, n, r;
      return {
        c() {
          (t = $('div')),
            (t.textContent = 'Slide 2'),
            (s = m()),
            (i = $('div')),
            (i.textContent = 'Subtitle'),
            (n = m()),
            (r = $('div')),
            (r.innerHTML =
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>'),
            v(t, 'class', 'title'),
            v(t, 'data-swiper-parallax', '-300'),
            v(t, 'data-swiper-parallax-opacity', '0'),
            v(i, 'class', 'subtitle'),
            v(i, 'data-swiper-parallax', '-200'),
            v(r, 'class', 'text'),
            v(r, 'data-swiper-parallax', '-100');
        },
        m(e, a) {
          d(e, t, a), d(e, s, a), d(e, i, a), d(e, n, a), d(e, r, a);
        },
        d(e) {
          e && u(t), e && u(s), e && u(i), e && u(n), e && u(r);
        },
      };
    }
    function Wl(e) {
      let t, s, i, n, r;
      return {
        c() {
          (t = $('div')),
            (t.textContent = 'Slide 3'),
            (s = m()),
            (i = $('div')),
            (i.textContent = 'Subtitle'),
            (n = m()),
            (r = $('div')),
            (r.innerHTML =
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>'),
            v(t, 'class', 'title'),
            v(t, 'data-swiper-parallax', '-300'),
            v(i, 'class', 'subtitle'),
            v(i, 'data-swiper-parallax', '-200'),
            v(r, 'class', 'text'),
            v(r, 'data-swiper-parallax', '-100');
        },
        m(e, a) {
          d(e, t, a), d(e, s, a), d(e, i, a), d(e, n, a), d(e, r, a);
        },
        d(e) {
          e && u(t), e && u(s), e && u(i), e && u(n), e && u(r);
        },
      };
    }
    function Ul(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Kl(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ql(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Zl(e) {
      let t, s, i, n, r, a, o, l, c, p;
      return (
        (s = new U.SwiperSlide({
          props: { $$slots: { default: [Yl] }, $$scope: { ctx: e } },
        })),
        (n = new U.SwiperSlide({
          props: { $$slots: { default: [Rl] }, $$scope: { ctx: e } },
        })),
        (a = new U.SwiperSlide({
          props: { $$slots: { default: [Wl] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            (t = m()),
              F(s.$$.fragment),
              (i = m()),
              F(n.$$.fragment),
              (r = m()),
              F(a.$$.fragment),
              (o = m()),
              (l = m()),
              (c = m());
          },
          m(e, u) {
            d(e, t, u),
              X(s, e, u),
              d(e, i, u),
              X(n, e, u),
              d(e, r, u),
              X(a, e, u),
              d(e, o, u),
              d(e, l, u),
              d(e, c, u),
              (p = !0);
          },
          p(e, t) {
            const i = {};
            2 & t && (i.$$scope = { dirty: t, ctx: e }), s.$set(i);
            const r = {};
            2 & t && (r.$$scope = { dirty: t, ctx: e }), n.$set(r);
            const o = {};
            2 & t && (o.$$scope = { dirty: t, ctx: e }), a.$set(o);
          },
          i(e) {
            p ||
              (B(s.$$.fragment, e),
              B(n.$$.fragment, e),
              B(a.$$.fragment, e),
              (p = !0));
          },
          o(e) {
            V(s.$$.fragment, e),
              V(n.$$.fragment, e),
              V(a.$$.fragment, e),
              (p = !1);
          },
          d(e) {
            e && u(t),
              Y(s, e),
              e && u(i),
              Y(n, e),
              e && u(r),
              Y(a, e),
              e && u(o),
              e && u(l),
              e && u(c);
          },
        }
      );
    }
    function Jl(e) {
      let t, s, i;
      return (
        (s = new U.Swiper({
          props: {
            options: e[0],
            $$slots: {
              default: [Zl],
              'button-prev': [Ql],
              'button-next': [Kl],
              pagination: [Ul],
              'parallax-bg': [Xl],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            (t = $('div')), F(s.$$.fragment), v(t, 'class', 'parallax');
          },
          m(e, n) {
            d(e, t, n), X(s, t, null), (i = !0);
          },
          p(e, [t]) {
            const i = {};
            2 & t && (i.$$scope = { dirty: t, ctx: e }), s.$set(i);
          },
          i(e) {
            i || (B(s.$$.fragment, e), (i = !0));
          },
          o(e) {
            V(s.$$.fragment, e), (i = !1);
          },
          d(e) {
            e && u(t), Y(s);
          },
        }
      );
    }
    function ec(e) {
      return [
        {
          speed: 600,
          parallax: !0,
          pagination: { el: '.swiper-pagination', clickable: !0 },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var tc = class extends W {
      constructor(e) {
        super(), R(this, e, ec, Jl, l, {});
      }
    };
    s(17);
    function sc(e) {
      let t, s, i;
      return {
        c() {
          (t = $('img')),
            (s = m()),
            (i = $('div')),
            v(t, 'data-src', 'https://swiperjs.com/demos/images/nature-1.jpg'),
            v(t, 'class', 'swiper-lazy'),
            v(t, 'alt', ''),
            v(i, 'class', 'swiper-lazy-preloader swiper-lazy-preloader-white');
        },
        m(e, n) {
          d(e, t, n), d(e, s, n), d(e, i, n);
        },
        d(e) {
          e && u(t), e && u(s), e && u(i);
        },
      };
    }
    function ic(e) {
      let t, s, i;
      return {
        c() {
          (t = $('img')),
            (s = m()),
            (i = $('div')),
            v(t, 'data-src', 'https://swiperjs.com/demos/images/nature-2.jpg'),
            v(t, 'class', 'swiper-lazy'),
            v(t, 'alt', ''),
            v(i, 'class', 'swiper-lazy-preloader swiper-lazy-preloader-white');
        },
        m(e, n) {
          d(e, t, n), d(e, s, n), d(e, i, n);
        },
        d(e) {
          e && u(t), e && u(s), e && u(i);
        },
      };
    }
    function nc(e) {
      let t, s, i;
      return {
        c() {
          (t = $('img')),
            (s = m()),
            (i = $('div')),
            v(t, 'data-src', 'https://swiperjs.com/demos/images/nature-3.jpg'),
            v(t, 'class', 'swiper-lazy'),
            v(t, 'alt', ''),
            v(i, 'class', 'swiper-lazy-preloader swiper-lazy-preloader-white');
        },
        m(e, n) {
          d(e, t, n), d(e, s, n), d(e, i, n);
        },
        d(e) {
          e && u(t), e && u(s), e && u(i);
        },
      };
    }
    function rc(e) {
      let t, s, i;
      return {
        c() {
          (t = $('img')),
            (s = m()),
            (i = $('div')),
            v(t, 'data-src', 'https://swiperjs.com/demos/images/nature-4.jpg'),
            v(t, 'class', 'swiper-lazy'),
            v(t, 'alt', ''),
            v(i, 'class', 'swiper-lazy-preloader swiper-lazy-preloader-white');
        },
        m(e, n) {
          d(e, t, n), d(e, s, n), d(e, i, n);
        },
        d(e) {
          e && u(t), e && u(s), e && u(i);
        },
      };
    }
    function ac(e) {
      let t, s, i;
      return {
        c() {
          (t = $('img')),
            (s = m()),
            (i = $('div')),
            v(t, 'data-src', 'https://swiperjs.com/demos/images/nature-5.jpg'),
            v(t, 'class', 'swiper-lazy'),
            v(t, 'alt', ''),
            v(i, 'class', 'swiper-lazy-preloader swiper-lazy-preloader-white');
        },
        m(e, n) {
          d(e, t, n), d(e, s, n), d(e, i, n);
        },
        d(e) {
          e && u(t), e && u(s), e && u(i);
        },
      };
    }
    function oc(e) {
      let t, s, i;
      return {
        c() {
          (t = $('img')),
            (s = m()),
            (i = $('div')),
            v(t, 'data-src', 'https://swiperjs.com/demos/images/nature-6.jpg'),
            v(t, 'class', 'swiper-lazy'),
            v(t, 'alt', ''),
            v(i, 'class', 'swiper-lazy-preloader swiper-lazy-preloader-white');
        },
        m(e, n) {
          d(e, t, n), d(e, s, n), d(e, i, n);
        },
        d(e) {
          e && u(t), e && u(s), e && u(i);
        },
      };
    }
    function lc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function cc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function pc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function dc(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [sc] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [ic] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [nc] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [rc] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [ac] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [oc] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              (h = m()),
              (g = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              d(e, h, u),
              d(e, g, u),
              (v = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
          },
          i(e) {
            v ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              (v = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              (v = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              e && u(h),
              e && u(g);
          },
        }
      );
    }
    function uc(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'lazy-load-images',
            options: e[0],
            $$slots: {
              default: [dc],
              'button-prev': [pc],
              'button-next': [cc],
              pagination: [lc],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function $c(e) {
      return [
        {
          lazy: !0,
          pagination: { el: '.swiper-pagination', clickable: !0 },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var fc = class extends W {
      constructor(e) {
        super(), R(this, e, $c, uc, l, {});
      }
    };
    function mc(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function hc(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function gc(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function vc(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function wc(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Sc(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function xc(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function yc(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function bc(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ec(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Cc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Tc(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [mc] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [hc] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [gc] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [vc] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [wc] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Sc] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [xc] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [yc] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [bc] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Ec] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function kc(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [Tc], pagination: [Cc] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Mc(e) {
      return [
        {
          slidesPerView: 1,
          spaceBetween: 10,
          pagination: { el: '.swiper-pagination', clickable: !0 },
          breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 },
          },
        },
      ];
    }
    var Pc = class extends W {
      constructor(e) {
        super(), R(this, e, Mc, kc, l, {});
      }
    };
    s(18);
    function zc(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function jc(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Lc(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Oc(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ic(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ac(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Dc(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Nc(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Bc(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Vc(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Gc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function qc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Hc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function _c(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C, T;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [zc] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [jc] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [Lc] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Oc] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Ic] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Ac] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Dc] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Nc] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Bc] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Vc] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m()),
              (C = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              d(e, C, u),
              (T = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            T ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (T = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (T = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E),
              e && u(C);
          },
        }
      );
    }
    function Fc(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'auto-height',
            options: e[0],
            $$slots: {
              default: [_c],
              'button-prev': [Hc],
              'button-next': [qc],
              pagination: [Gc],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Xc(e) {
      return [
        {
          autoHeight: !0,
          spaceBetween: 20,
          pagination: { el: '.swiper-pagination', clickable: !0 },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var Yc = class extends W {
      constructor(e) {
        super(), R(this, e, Xc, Fc, l, {});
      }
    };
    s(19);
    function Rc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            (t.innerHTML =
              '<img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="">'),
            v(t, 'class', 'swiper-zoom-container');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Wc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            (t.innerHTML =
              '<img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="">'),
            v(t, 'class', 'swiper-zoom-container');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Uc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            (t.innerHTML =
              '<img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="">'),
            v(t, 'class', 'swiper-zoom-container');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Kc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Qc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Zc(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Jc(e) {
      let t, s, i, n, r, a, o, l, c;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [Rc] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Wc] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [Uc] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              (o = m()),
              (l = m());
          },
          m(e, p) {
            X(t, e, p),
              d(e, s, p),
              X(i, e, p),
              d(e, n, p),
              X(r, e, p),
              d(e, a, p),
              d(e, o, p),
              d(e, l, p),
              (c = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const o = {};
            2 & s && (o.$$scope = { dirty: s, ctx: e }), r.$set(o);
          },
          i(e) {
            c ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              (c = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              (c = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              e && u(o),
              e && u(l);
          },
        }
      );
    }
    function ep(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            className: 'zoom',
            options: e[0],
            $$slots: {
              default: [Jc],
              'button-prev': [Zc],
              'button-next': [Qc],
              pagination: [Kc],
            },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function tp(e) {
      return [
        {
          zoom: !0,
          pagination: { el: '.swiper-pagination' },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      ];
    }
    var sp = class extends W {
      constructor(e) {
        super(), R(this, e, tp, ep, l, {});
      }
    };
    s(20);
    function ip(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function np(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function rp(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function ap(e) {
      let t, s;
      return {
        c() {
          (t = m()), (s = m());
        },
        m(e, i) {
          d(e, t, i), d(e, s, i);
        },
        p: i,
        d(e) {
          e && u(t), e && u(s);
        },
      };
    }
    function op(e) {
      let t, s, i, n, r, o, l, c, f, h, w, S, x, b, E, C, T;
      function k(t) {
        e[7].call(null, t);
      }
      let M = {
        options: e[6],
        $$slots: {
          default: [ap],
          'button-prev': [rp],
          'button-next': [np],
          pagination: [ip],
        },
        $$scope: { ctx: e },
      };
      return (
        void 0 !== e[0] && (M.swiper = e[0]),
        (x = new U.Swiper({ props: M })),
        y.push(() => _(x, 'swiper', k)),
        {
          c() {
            (t = $('div')),
              (s = $('div')),
              (i = $('button')),
              (i.textContent = 'Prepend 2 Slides'),
              (n = m()),
              (r = $('button')),
              (r.textContent = 'Slide 1'),
              (o = m()),
              (l = $('button')),
              (l.textContent = 'Slide 250'),
              (c = m()),
              (f = $('button')),
              (f.textContent = 'Slide 500'),
              (h = m()),
              (w = $('button')),
              (w.textContent = 'Append Slide'),
              (S = m()),
              F(x.$$.fragment),
              v(i, 'class', 'svelte-1q8hjek'),
              v(r, 'class', 'svelte-1q8hjek'),
              v(l, 'class', 'svelte-1q8hjek'),
              v(f, 'class', 'svelte-1q8hjek'),
              v(w, 'class', 'svelte-1q8hjek'),
              v(s, 'class', 'toolbar svelte-1q8hjek'),
              v(t, 'class', 'toolbar-box svelte-1q8hjek');
          },
          m(a, u) {
            d(a, t, u),
              p(t, s),
              p(s, i),
              p(s, n),
              p(s, r),
              p(s, o),
              p(s, l),
              p(s, c),
              p(s, f),
              p(s, h),
              p(s, w),
              d(a, S, u),
              X(x, a, u),
              (E = !0),
              C ||
                ((T = [
                  g(i, 'click', e[1]),
                  g(r, 'click', e[2]),
                  g(l, 'click', e[3]),
                  g(f, 'click', e[4]),
                  g(w, 'click', e[5]),
                ]),
                (C = !0));
          },
          p(e, [t]) {
            const s = {};
            1024 & t && (s.$$scope = { dirty: t, ctx: e }),
              !b && 1 & t && ((b = !0), (s.swiper = e[0]), P(() => (b = !1))),
              x.$set(s);
          },
          i(e) {
            E || (B(x.$$.fragment, e), (E = !0));
          },
          o(e) {
            V(x.$$.fragment, e), (E = !1);
          },
          d(e) {
            e && u(t), e && u(S), Y(x, e), (C = !1), a(T);
          },
        }
      );
    }
    function lp(e, t, s) {
      let i,
        n = 600,
        r = 1;
      const a = {
        slidesPerView: 3,
        centeredSlides: !0,
        spaceBetween: 30,
        pagination: { el: '.swiper-pagination', type: 'fraction' },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        virtual: {
          slides: (function () {
            for (var e = [], t = 0; t < 600; t += 1) e.push('Slide ' + (t + 1));
            return e;
          })(),
        },
      };
      return [
        i,
        function () {
          i.virtual.prependSlide(['Slide ' + --r, 'Slide ' + --r]);
        },
        function () {
          i.slideTo(0, 0);
        },
        function () {
          i.slideTo(249, 0);
        },
        function () {
          i.slideTo(499, 0);
        },
        function () {
          i.virtual.appendSlide('Slide ' + ++n);
        },
        a,
        function (e) {
          (i = e), s(0, i);
        },
      ];
    }
    var cp = class extends W {
      constructor(e) {
        super(), R(this, e, lp, op, l, {});
      }
    };
    s(21);
    function pp(e) {
      let t;
      return {
        c() {
          t = f('Menu slide');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function dp(e) {
      let t, s;
      return {
        c() {
          (t = $('div')),
            (t.innerHTML =
              '<div class="bar"></div> \n      <div class="bar"></div> \n      <div class="bar"></div>'),
            (s = f('\n    Content slide')),
            v(t, 'class', 'menu-button');
        },
        m(i, n) {
          d(i, t, n), e[5](t), d(i, s, n);
        },
        p: i,
        d(i) {
          i && u(t), e[5](null), i && u(s);
        },
      };
    }
    function up(e) {
      let t, s, i, n;
      return (
        (t = new U.SwiperSlide({
          props: {
            className: 'menu',
            $$slots: { default: [pp] },
            $$scope: { ctx: e },
          },
        })),
        (i = new U.SwiperSlide({
          props: {
            className: 'content',
            $$slots: { default: [dp] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment), (s = m()), F(i.$$.fragment);
          },
          m(e, r) {
            X(t, e, r), d(e, s, r), X(i, e, r), (n = !0);
          },
          p(e, s) {
            const n = {};
            256 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const r = {};
            258 & s && (r.$$scope = { dirty: s, ctx: e }), i.$set(r);
          },
          i(e) {
            n || (B(t.$$.fragment, e), B(i.$$.fragment, e), (n = !0));
          },
          o(e) {
            V(t.$$.fragment, e), V(i.$$.fragment, e), (n = !1);
          },
          d(e) {
            Y(t, e), e && u(s), Y(i, e);
          },
        }
      );
    }
    function $p(e) {
      let t, s, i;
      function n(t) {
        e[6].call(null, t);
      }
      let r = {
        className: 'slideable-menu',
        options: e[2],
        $$slots: { default: [up] },
        $$scope: { ctx: e },
      };
      return (
        void 0 !== e[0] && (r.swiper = e[0]),
        (t = new U.Swiper({ props: r })),
        y.push(() => _(t, 'swiper', n)),
        t.$on('slideChangeTransitionStart', e[3]),
        t.$on('slideChangeTransitionEnd', e[4]),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, s) {
            X(t, e, s), (i = !0);
          },
          p(e, [i]) {
            const n = {};
            258 & i && (n.$$scope = { dirty: i, ctx: e }),
              !s && 1 & i && ((s = !0), (n.swiper = e[0]), P(() => (s = !1))),
              t.$set(n);
          },
          i(e) {
            i || (B(t.$$.fragment, e), (i = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (i = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function fp(e, t, s) {
      let i, n;
      function r() {
        i.slidePrev();
      }
      return [
        i,
        n,
        {
          slidesPerView: 'auto',
          initialSlide: 1,
          resistanceRatio: 0,
          slideToClickedSlide: !0,
        },
        function () {
          0 === this.activeIndex
            ? (n.classList.add('cross'), n.removeEventListener('click', r, !0))
            : n.classList.remove('cross');
        },
        function () {
          1 === this.activeIndex && n.addEventListener('click', r, !0);
        },
        function (e) {
          y[e ? 'unshift' : 'push'](() => {
            (n = e), s(1, n);
          });
        },
        function (e) {
          (i = e), s(0, i);
        },
      ];
    }
    var mp = class extends W {
      constructor(e) {
        super(), R(this, e, fp, $p, l, {});
      }
    };
    function hp(e) {
      let t;
      return {
        c() {
          t = f('Slide 1');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function gp(e) {
      let t;
      return {
        c() {
          t = f('Slide 2');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function vp(e) {
      let t;
      return {
        c() {
          t = f('Slide 3');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function wp(e) {
      let t;
      return {
        c() {
          t = f('Slide 4');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Sp(e) {
      let t;
      return {
        c() {
          t = f('Slide 5');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function xp(e) {
      let t;
      return {
        c() {
          t = f('Slide 6');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function yp(e) {
      let t;
      return {
        c() {
          t = f('Slide 7');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function bp(e) {
      let t;
      return {
        c() {
          t = f('Slide 8');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ep(e) {
      let t;
      return {
        c() {
          t = f('Slide 9');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Cp(e) {
      let t;
      return {
        c() {
          t = f('Slide 10');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Tp(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-pagination'),
            v(t, 'slot', 'pagination');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function kp(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [hp] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [gp] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [vp] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [wp] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Sp] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [xp] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [yp] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [bp] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Ep] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Cp] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              (E = !0);
          },
          p(e, s) {
            const n = {};
            2 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            2 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            2 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            2 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            2 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            2 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            2 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            2 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            2 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            2 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            E ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (E = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (E = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b);
          },
        }
      );
    }
    function Mp(e) {
      let t, s;
      return (
        (t = new U.Swiper({
          props: {
            options: e[0],
            $$slots: { default: [kp], pagination: [Tp] },
            $$scope: { ctx: e },
          },
        })),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, i) {
            X(t, e, i), (s = !0);
          },
          p(e, [s]) {
            const i = {};
            2 & s && (i.$$scope = { dirty: s, ctx: e }), t.$set(i);
          },
          i(e) {
            s || (B(t.$$.fragment, e), (s = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (s = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Pp(e) {
      return [
        {
          slidesPerView: 1,
          spaceBetween: 10,
          pagination: { el: '.swiper-pagination', clickable: !0 },
          breakpoints: {
            '@0.00': { slidesPerView: 1, spaceBetween: 10 },
            '@0.75': { slidesPerView: 2, spaceBetween: 20 },
            '@1.00': { slidesPerView: 3, spaceBetween: 40 },
            '@1.50': { slidesPerView: 4, spaceBetween: 50 },
          },
        },
      ];
    }
    var zp = class extends W {
      constructor(e) {
        super(), R(this, e, Pp, Mp, l, {});
      }
    };
    s(22);
    function jp(e) {
      let t;
      return {
        c() {
          t = f('Resize me!');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Lp(e) {
      let t;
      return {
        c() {
          t = f('Resize me!');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Op(e) {
      let t;
      return {
        c() {
          t = f('Resize me!');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ip(e) {
      let t;
      return {
        c() {
          t = f('Resize me!');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Ap(e) {
      let t;
      return {
        c() {
          t = f('Resize me!');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Dp(e) {
      let t;
      return {
        c() {
          t = f('Resize me!');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Np(e) {
      let t;
      return {
        c() {
          t = f('Resize me!');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Bp(e) {
      let t;
      return {
        c() {
          t = f('Resize me!');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Vp(e) {
      let t;
      return {
        c() {
          t = f('Resize me!');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Gp(e) {
      let t;
      return {
        c() {
          t = f('Resize me!');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function qp(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-next'),
            v(t, 'slot', 'button-next');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function Hp(e) {
      let t;
      return {
        c() {
          (t = $('div')),
            v(t, 'class', 'swiper-button-prev'),
            v(t, 'slot', 'button-prev');
        },
        m(e, s) {
          d(e, t, s);
        },
        d(e) {
          e && u(t);
        },
      };
    }
    function _p(e) {
      let t, s, i, n, r, a, o, l, c, p, $, f, h, g, v, w, S, x, y, b, E, C;
      return (
        (t = new U.SwiperSlide({
          props: { $$slots: { default: [jp] }, $$scope: { ctx: e } },
        })),
        (i = new U.SwiperSlide({
          props: { $$slots: { default: [Lp] }, $$scope: { ctx: e } },
        })),
        (r = new U.SwiperSlide({
          props: { $$slots: { default: [Op] }, $$scope: { ctx: e } },
        })),
        (o = new U.SwiperSlide({
          props: { $$slots: { default: [Ip] }, $$scope: { ctx: e } },
        })),
        (c = new U.SwiperSlide({
          props: { $$slots: { default: [Ap] }, $$scope: { ctx: e } },
        })),
        ($ = new U.SwiperSlide({
          props: { $$slots: { default: [Dp] }, $$scope: { ctx: e } },
        })),
        (h = new U.SwiperSlide({
          props: { $$slots: { default: [Np] }, $$scope: { ctx: e } },
        })),
        (v = new U.SwiperSlide({
          props: { $$slots: { default: [Bp] }, $$scope: { ctx: e } },
        })),
        (S = new U.SwiperSlide({
          props: { $$slots: { default: [Vp] }, $$scope: { ctx: e } },
        })),
        (y = new U.SwiperSlide({
          props: { $$slots: { default: [Gp] }, $$scope: { ctx: e } },
        })),
        {
          c() {
            F(t.$$.fragment),
              (s = m()),
              F(i.$$.fragment),
              (n = m()),
              F(r.$$.fragment),
              (a = m()),
              F(o.$$.fragment),
              (l = m()),
              F(c.$$.fragment),
              (p = m()),
              F($.$$.fragment),
              (f = m()),
              F(h.$$.fragment),
              (g = m()),
              F(v.$$.fragment),
              (w = m()),
              F(S.$$.fragment),
              (x = m()),
              F(y.$$.fragment),
              (b = m()),
              (E = m());
          },
          m(e, u) {
            X(t, e, u),
              d(e, s, u),
              X(i, e, u),
              d(e, n, u),
              X(r, e, u),
              d(e, a, u),
              X(o, e, u),
              d(e, l, u),
              X(c, e, u),
              d(e, p, u),
              X($, e, u),
              d(e, f, u),
              X(h, e, u),
              d(e, g, u),
              X(v, e, u),
              d(e, w, u),
              X(S, e, u),
              d(e, x, u),
              X(y, e, u),
              d(e, b, u),
              d(e, E, u),
              (C = !0);
          },
          p(e, s) {
            const n = {};
            16 & s && (n.$$scope = { dirty: s, ctx: e }), t.$set(n);
            const a = {};
            16 & s && (a.$$scope = { dirty: s, ctx: e }), i.$set(a);
            const l = {};
            16 & s && (l.$$scope = { dirty: s, ctx: e }), r.$set(l);
            const p = {};
            16 & s && (p.$$scope = { dirty: s, ctx: e }), o.$set(p);
            const d = {};
            16 & s && (d.$$scope = { dirty: s, ctx: e }), c.$set(d);
            const u = {};
            16 & s && (u.$$scope = { dirty: s, ctx: e }), $.$set(u);
            const f = {};
            16 & s && (f.$$scope = { dirty: s, ctx: e }), h.$set(f);
            const m = {};
            16 & s && (m.$$scope = { dirty: s, ctx: e }), v.$set(m);
            const g = {};
            16 & s && (g.$$scope = { dirty: s, ctx: e }), S.$set(g);
            const w = {};
            16 & s && (w.$$scope = { dirty: s, ctx: e }), y.$set(w);
          },
          i(e) {
            C ||
              (B(t.$$.fragment, e),
              B(i.$$.fragment, e),
              B(r.$$.fragment, e),
              B(o.$$.fragment, e),
              B(c.$$.fragment, e),
              B($.$$.fragment, e),
              B(h.$$.fragment, e),
              B(v.$$.fragment, e),
              B(S.$$.fragment, e),
              B(y.$$.fragment, e),
              (C = !0));
          },
          o(e) {
            V(t.$$.fragment, e),
              V(i.$$.fragment, e),
              V(r.$$.fragment, e),
              V(o.$$.fragment, e),
              V(c.$$.fragment, e),
              V($.$$.fragment, e),
              V(h.$$.fragment, e),
              V(v.$$.fragment, e),
              V(S.$$.fragment, e),
              V(y.$$.fragment, e),
              (C = !1);
          },
          d(e) {
            Y(t, e),
              e && u(s),
              Y(i, e),
              e && u(n),
              Y(r, e),
              e && u(a),
              Y(o, e),
              e && u(l),
              Y(c, e),
              e && u(p),
              Y($, e),
              e && u(f),
              Y(h, e),
              e && u(g),
              Y(v, e),
              e && u(w),
              Y(S, e),
              e && u(x),
              Y(y, e),
              e && u(b),
              e && u(E);
          },
        }
      );
    }
    function Fp(e) {
      let t, s, i;
      function n(t) {
        e[2].call(null, t);
      }
      let r = {
        className: 'change-direction',
        options: e[1],
        $$slots: { default: [_p], 'button-prev': [Hp], 'button-next': [qp] },
        $$scope: { ctx: e },
      };
      return (
        void 0 !== e[0] && (r.swiper = e[0]),
        (t = new U.Swiper({ props: r })),
        y.push(() => _(t, 'swiper', n)),
        t.$on('resize', e[3]),
        {
          c() {
            F(t.$$.fragment);
          },
          m(e, s) {
            X(t, e, s), (i = !0);
          },
          p(e, [i]) {
            const n = {};
            16 & i && (n.$$scope = { dirty: i, ctx: e }),
              !s && 1 & i && ((s = !0), (n.swiper = e[0]), P(() => (s = !1))),
              t.$set(n);
          },
          i(e) {
            i || (B(t.$$.fragment, e), (i = !0));
          },
          o(e) {
            V(t.$$.fragment, e), (i = !1);
          },
          d(e) {
            Y(t, e);
          },
        }
      );
    }
    function Xp() {
      return window.innerWidth <= 760 ? 'vertical' : 'horizontal';
    }
    function Yp(e, t, s) {
      let i;
      const n = {
        slidesPerView: 3,
        direction: Xp(),
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
      return [
        i,
        n,
        function (e) {
          (i = e), s(0, i);
        },
        () => i.changeDirection(Xp()),
      ];
    }
    var Rp = class extends W {
      constructor(e) {
        super(), R(this, e, Yp, Fp, l, {});
      }
    };
    s(23);
    function Wp(e, t, s) {
      const i = e.slice();
      return (i[1] = t[s].comp), (i[2] = t[s].link), (i[3] = t[s].title), i;
    }
    function Up(e, t) {
      let s,
        i,
        n,
        r,
        a,
        o,
        l,
        c,
        h,
        g,
        w,
        S,
        x = t[3] + '';
      var y = t[1];
      return (
        y && (g = new y({})),
        {
          key: e,
          first: null,
          c() {
            (s = $('div')),
              (i = $('h1')),
              (n = f(x)),
              (r = m()),
              (a = $('a')),
              (o = f('Souce code')),
              (c = m()),
              (h = $('div')),
              g && F(g.$$.fragment),
              (w = m()),
              v(
                a,
                'href',
                (l = `https://github.com/beomy/svelte-swiper/blob/master/docs/components/${t[2]}.svelte`),
              ),
              v(a, 'target', '_blank'),
              v(h, 'class', 'example'),
              v(s, 'class', 'example-conatiner'),
              (this.first = s);
          },
          m(e, t) {
            d(e, s, t),
              p(s, i),
              p(i, n),
              p(s, r),
              p(s, a),
              p(a, o),
              p(s, c),
              p(s, h),
              g && X(g, h, null),
              p(s, w),
              (S = !0);
          },
          p(e, t) {
            if (y !== (y = e[1])) {
              if (g) {
                D();
                const e = g;
                V(e.$$.fragment, 1, 0, () => {
                  Y(e, 1);
                }),
                  N();
              }
              y
                ? ((g = new y({})),
                  F(g.$$.fragment),
                  B(g.$$.fragment, 1),
                  X(g, h, null))
                : (g = null);
            }
          },
          i(e) {
            S || (g && B(g.$$.fragment, e), (S = !0));
          },
          o(e) {
            g && V(g.$$.fragment, e), (S = !1);
          },
          d(e) {
            e && u(s), g && Y(g);
          },
        }
      );
    }
    function Kp(e) {
      let t,
        s,
        i = [],
        n = new Map(),
        r = e[0];
      const a = (e) => e[1].name;
      for (let t = 0; t < r.length; t += 1) {
        let s = Wp(e, r, t),
          o = a(s);
        n.set(o, (i[t] = Up(o, s)));
      }
      return {
        c() {
          for (let e = 0; e < i.length; e += 1) i[e].c();
          t = h();
        },
        m(e, n) {
          for (let t = 0; t < i.length; t += 1) i[t].m(e, n);
          d(e, t, n), (s = !0);
        },
        p(e, [s]) {
          if (1 & s) {
            const r = e[0];
            D(), (i = q(i, s, a, 1, e, r, n, t.parentNode, G, Up, t, Wp)), N();
          }
        },
        i(e) {
          if (!s) {
            for (let e = 0; e < r.length; e += 1) B(i[e]);
            s = !0;
          }
        },
        o(e) {
          for (let e = 0; e < i.length; e += 1) V(i[e]);
          s = !1;
        },
        d(e) {
          for (let t = 0; t < i.length; t += 1) i[t].d(e);
          e && u(t);
        },
      };
    }
    function Qp(e) {
      return [
        [
          { comp: le, link: 'Default', title: 'Default Setup' },
          { comp: Ee, link: 'Navigation', title: 'Navigation' },
          { comp: Ve, link: 'Pagination', title: 'Pagination' },
          {
            comp: et,
            link: 'PaginationDynamic',
            title: 'Pagination / Dynamic Bullets',
          },
          {
            comp: gt,
            link: 'PaginationProgress',
            title: 'Progress Pagination',
          },
          {
            comp: It,
            link: 'PaginationFraction',
            title: 'Fraction Pagination',
          },
          { comp: Ut, link: 'PaginationCustom', title: 'Pagination Custom' },
          { comp: ps, link: 'Scrollbar', title: 'Scrollbar' },
          { comp: Cs, link: 'Vertical', title: 'Vertical Slider' },
          { comp: Gs, link: 'SpaceBetween', title: 'Space Between Slides' },
          { comp: ti, link: 'SlidePerView', title: 'Multiple Slides Per View' },
          {
            comp: hi,
            link: 'SlidePerViewAuto',
            title: 'Auto Slides Per View / Carousel Mode',
          },
          { comp: ji, link: 'Centered', title: 'Centered Slides' },
          {
            comp: Yi,
            link: 'CenteredAuto',
            title: 'Centered Slides + Auto Slides Per View',
          },
          { comp: pn, link: 'CssMode', title: 'CSS Scroll Snap (CSS Mode)' },
          {
            comp: Cn,
            link: 'FreeMode',
            title: 'Free Mode / No Fixed Positions',
          },
          { comp: jn, link: 'ScrollContainer', title: 'Scroll Container' },
          {
            comp: Yn,
            link: 'SlidesPerColumn',
            title: 'Multi Row Slides Layout',
          },
          { comp: lr, link: 'Nested', title: 'Nested Swipers' },
          { comp: br, link: 'GrabCursor', title: 'Grab Cursor' },
          {
            comp: Gr,
            link: 'InfiniteLoop',
            title: 'Loop Mode / Infinite Loop',
          },
          {
            comp: ia,
            link: 'InfiniteLoopWithSlidesPerGroup',
            title: 'Loop Mode with Multiple Slides Per Group',
          },
          { comp: pa, link: 'EffectFade', title: 'Fade Effect' },
          { comp: ma, link: 'EffectCube', title: '3D Cube Effect' },
          { comp: Sa, link: 'EffectCoverflow', title: '3D Coverflow Effect' },
          { comp: ka, link: 'EffectFilp', title: '3D Flip Effect' },
          { comp: Fa, link: 'KeyboardControl', title: 'Keyboard Control' },
          { comp: ro, link: 'MousewheelControl', title: 'Mousewheel Control' },
          { comp: bo, link: 'Autoplay', title: 'Autoplay' },
          { comp: Oo, link: 'DynamicSlides', title: 'Dynamic Slides' },
          { comp: Go, link: 'ThumbsGallery', title: 'Thumbs Gallery' },
          {
            comp: Ro,
            link: 'ThumbsGalleryLoop',
            title: 'Thumbs Gallery With Loop Mode',
          },
          { comp: pl, link: 'HashNavigation', title: 'Hash Navigation' },
          { comp: kl, link: 'History', title: 'History API' },
          { comp: Fl, link: 'RTL', title: 'RTL Layout' },
          { comp: tc, link: 'Parallax', title: 'Parallax' },
          { comp: fc, link: 'LazyLoadImages', title: 'Lazy Loading Images' },
          {
            comp: Pc,
            link: 'ResponsiveBreakpoints',
            title: 'Responsive Breakpoints',
          },
          { comp: Yc, link: 'AutoHeight', title: 'Auto Height' },
          { comp: sp, link: 'Zoom', title: 'Zoom' },
          { comp: cp, link: 'VirtualSlides', title: 'Virtual Slides' },
          {
            comp: mp,
            link: 'SlideableMenu',
            title: 'Slideable Navigation Drawer',
          },
          { comp: zp, link: 'RatioBreakpoints', title: 'Ratio breakpoints' },
          { comp: Rp, link: 'ChangeDirection', title: 'Change direction' },
        ],
      ];
    }
    var Zp = class extends W {
      constructor(e) {
        super(), R(this, e, Qp, Kp, l, {});
      }
    };
    s(24);
    const Jp = new Zp({ target: document.body });
    t.default = Jp;
  },
]);
