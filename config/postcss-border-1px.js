'use strict'
const e = require('postcss'),
  t = /non/,
  o = /^(input|select|img)/,
  r = /border(?:-top|-bottom|-left|-right|-image|-color|-style)?(?:-width)?$/,
  n = /border-radius/,
  s = /([1-9\.]+)(rem|px|%)/,
  p = /([\d\.]+)(rem|px|%)/,
  l = /after|before/,
  i = (e = '') => r.test(e)
module.exports = e.plugin(
  '@lcs/postcss-border-1px',
  () =>
    function (r) {
      let c
      const a = []
      r.walkRules(function (e) {
        let d = e.selector
        o.test(e.selector) ||
          (-1 === d.indexOf('::') &&
            -1 === d.indexOf(':') &&
            ((c = {
              hasPosition: !0,
              pseudoType: 'after',
              borderRadius: [],
              borderDecl: [],
              el: { root: r, rule: e, selector: d },
            }),
            e.walkDecls((e) => {
              if (i(e.prop) && ((o = e.value), s.test(o))) {
                const o = e.next(),
                  r = o && 'comment' === o.type,
                  n = o && o.text
                if (o && r && t.test(n)) return

                o && r && l.test(n) && (c.pseudoType = n)
                const s = e.clone()
                c.borderDecl.push(s),
                  'border-width' === e.prop
                    ? (e.value = 0)
                    : 'border' === e.prop &&
                      (e.value = 'none /*1px转换 本元素border设置为none*/')
              } else if (i(e.prop) && e.value.indexOf('0') < 0) {
                const o = e.next(),
                  r = o && 'comment' === o.type,
                  n = o && o.text
                if (o && r && t.test(n)) return
                c.borderDecl.push(e.clone())
              } else if (n.test(e.prop)) {
                if (
                  ((e) => {
                    const o = e.next()
                    return o && 'comment' === o.type && t.test(o.text.trim())
                  })(e)
                )
                  return
                if (((e) => p.test(e))(e.value)) {
                  const t = e.value.replace(
                      p,
                      (e, t, o) => `${2 * parseFloat(t)}${o}`
                    ),
                    o = e.clone({ value: t })
                  c.borderRadius.push(o)
                }
              }
              var o
              'position' === e.prop && 'static' !== e.value
                ? (c.hasPosition = !0)
                : (c.hasPosition = !1)
            }),
            c.borderDecl.length > 0 &&
              (a.push(c),
              c.hasPosition ||
                ((e) => {
                  e.append('\nposition:relative;/*1px转换添加的position*/')
                })(e))))
      }),
        a.forEach((t) => {
          const { selector: o } = t.el,
            n = e.rule({ selector: `${o}::${t.pseudoType}` })
          t.borderDecl.length > 0 &&
            t.borderDecl.forEach((e) => {
              var str = e.value.replace('px', 'Px')
              e.value = str
              n.append(e)
            }),
            t.borderRadius.length > 0 &&
              t.borderRadius.forEach((e) => {
                n.append(e)
              }),
            n.append(
              "\ncontent: '';\nposition: absolute;\ntop: -50%;\nbottom: -50%;\nleft: -50%;\nright: -50%;\n-webkit-transform: scale(0.5);\ntransform: scale(0.5);\npointer-events: none;"
            ),
            r.append(n)
        })
    }
)
