(function () {
    var a = this, b = a._, c = {}, d = Array.prototype, e = Object.prototype, f = Function.prototype, g = d.push, h = d.slice, i = d.concat, j = e.toString, k = e.hasOwnProperty, l = d.forEach, m = d.map, n = d.reduce, o = d.reduceRight, p = d.filter, q = d.every, r = d.some, s = d.indexOf, t = d.lastIndexOf, u = Array.isArray, v = Object.keys, w = f.bind, x = function (a) {
        return a instanceof x ? a : this instanceof x ? void(this._wrapped = a) : new x(a)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), exports._ = x) : a._ = x, x.VERSION = "1.5.1";
    var y = x.each = x.forEach = function (a, b, d) {
        if (null != a)if (l && a.forEach === l)a.forEach(b, d); else if (a.length === +a.length) {
            for (var e = 0, f = a.length; f > e; e++)if (b.call(d, a[e], e, a) === c)return
        } else for (var g in a)if (x.has(a, g) && b.call(d, a[g], g, a) === c)return
    };
    x.map = x.collect = function (a, b, c) {
        var d = [];
        return null == a ? d : m && a.map === m ? a.map(b, c) : (y(a, function (a, e, f) {
            d.push(b.call(c, a, e, f))
        }), d)
    };
    var z = "Reduce of empty array with no initial value";
    x.reduce = x.foldl = x.inject = function (a, b, c, d) {
        var e = arguments.length > 2;
        if (null == a && (a = []), n && a.reduce === n)return d && (b = x.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
        if (y(a, function (a, f, g) {
                e ? c = b.call(d, c, a, f, g) : (c = a, e = !0)
            }), !e)throw new TypeError(z);
        return c
    }, x.reduceRight = x.foldr = function (a, b, c, d) {
        var e = arguments.length > 2;
        if (null == a && (a = []), o && a.reduceRight === o)return d && (b = x.bind(b, d)), e ? a.reduceRight(b, c) : a.reduceRight(b);
        var f = a.length;
        if (f !== +f) {
            var g = x.keys(a);
            f = g.length
        }
        if (y(a, function (h, i, j) {
                i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0)
            }), !e)throw new TypeError(z);
        return c
    }, x.find = x.detect = function (a, b, c) {
        var d;
        return A(a, function (a, e, f) {
            return b.call(c, a, e, f) ? (d = a, !0) : void 0
        }), d
    }, x.filter = x.select = function (a, b, c) {
        var d = [];
        return null == a ? d : p && a.filter === p ? a.filter(b, c) : (y(a, function (a, e, f) {
            b.call(c, a, e, f) && d.push(a)
        }), d)
    }, x.reject = function (a, b, c) {
        return x.filter(a, function (a, d, e) {
            return !b.call(c, a, d, e)
        }, c)
    }, x.every = x.all = function (a, b, d) {
        b || (b = x.identity);
        var e = !0;
        return null == a ? e : q && a.every === q ? a.every(b, d) : (y(a, function (a, f, g) {
            return (e = e && b.call(d, a, f, g)) ? void 0 : c
        }), !!e)
    };
    var A = x.some = x.any = function (a, b, d) {
        b || (b = x.identity);
        var e = !1;
        return null == a ? e : r && a.some === r ? a.some(b, d) : (y(a, function (a, f, g) {
            return e || (e = b.call(d, a, f, g)) ? c : void 0
        }), !!e)
    };
    x.contains = x.include = function (a, b) {
        return null == a ? !1 : s && a.indexOf === s ? -1 != a.indexOf(b) : A(a, function (a) {
            return a === b
        })
    }, x.invoke = function (a, b) {
        var c = h.call(arguments, 2), d = x.isFunction(b);
        return x.map(a, function (a) {
            return (d ? b : a[b]).apply(a, c)
        })
    }, x.pluck = function (a, b) {
        return x.map(a, function (a) {
            return a[b]
        })
    }, x.where = function (a, b, c) {
        return x.isEmpty(b) ? c ? void 0 : [] : x[c ? "find" : "filter"](a, function (a) {
            for (var c in b)if (b[c] !== a[c])return !1;
            return !0
        })
    }, x.findWhere = function (a, b) {
        return x.where(a, b, !0)
    }, x.max = function (a, b, c) {
        if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535)return Math.max.apply(Math, a);
        if (!b && x.isEmpty(a))return -1 / 0;
        var d = {computed: -1 / 0, value: -1 / 0};
        return y(a, function (a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g > d.computed && (d = {value: a, computed: g})
        }), d.value
    }, x.min = function (a, b, c) {
        if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535)return Math.min.apply(Math, a);
        if (!b && x.isEmpty(a))return 1 / 0;
        var d = {computed: 1 / 0, value: 1 / 0};
        return y(a, function (a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g < d.computed && (d = {value: a, computed: g})
        }), d.value
    }, x.shuffle = function (a) {
        var b, c = 0, d = [];
        return y(a, function (a) {
            b = x.random(c++), d[c - 1] = d[b], d[b] = a
        }), d
    };
    var B = function (a) {
        return x.isFunction(a) ? a : function (b) {
            return b[a]
        }
    };
    x.sortBy = function (a, b, c) {
        var d = B(b);
        return x.pluck(x.map(a, function (a, b, e) {
            return {value: a, index: b, criteria: d.call(c, a, b, e)}
        }).sort(function (a, b) {
            var c = a.criteria, d = b.criteria;
            if (c !== d) {
                if (c > d || void 0 === c)return 1;
                if (d > c || void 0 === d)return -1
            }
            return a.index < b.index ? -1 : 1
        }), "value")
    };
    var C = function (a, b, c, d) {
        var e = {}, f = B(null == b ? x.identity : b);
        return y(a, function (b, g) {
            var h = f.call(c, b, g, a);
            d(e, h, b)
        }), e
    };
    x.groupBy = function (a, b, c) {
        return C(a, b, c, function (a, b, c) {
            (x.has(a, b) ? a[b] : a[b] = []).push(c)
        })
    }, x.countBy = function (a, b, c) {
        return C(a, b, c, function (a, b) {
            x.has(a, b) || (a[b] = 0), a[b]++
        })
    }, x.sortedIndex = function (a, b, c, d) {
        c = null == c ? x.identity : B(c);
        for (var e = c.call(d, b), f = 0, g = a.length; g > f;) {
            var h = f + g >>> 1;
            c.call(d, a[h]) < e ? f = h + 1 : g = h
        }
        return f
    }, x.toArray = function (a) {
        return a ? x.isArray(a) ? h.call(a) : a.length === +a.length ? x.map(a, x.identity) : x.values(a) : []
    }, x.size = function (a) {
        return null == a ? 0 : a.length === +a.length ? a.length : x.keys(a).length
    }, x.first = x.head = x.take = function (a, b, c) {
        return null == a ? void 0 : null == b || c ? a[0] : h.call(a, 0, b)
    }, x.initial = function (a, b, c) {
        return h.call(a, 0, a.length - (null == b || c ? 1 : b))
    }, x.last = function (a, b, c) {
        return null == a ? void 0 : null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0))
    }, x.rest = x.tail = x.drop = function (a, b, c) {
        return h.call(a, null == b || c ? 1 : b)
    }, x.compact = function (a) {
        return x.filter(a, x.identity)
    };
    var D = function (a, b, c) {
        return b && x.every(a, x.isArray) ? i.apply(c, a) : (y(a, function (a) {
            x.isArray(a) || x.isArguments(a) ? b ? g.apply(c, a) : D(a, b, c) : c.push(a)
        }), c)
    };
    x.flatten = function (a, b) {
        return D(a, b, [])
    }, x.without = function (a) {
        return x.difference(a, h.call(arguments, 1))
    }, x.uniq = x.unique = function (a, b, c, d) {
        x.isFunction(b) && (d = c, c = b, b = !1);
        var e = c ? x.map(a, c, d) : a, f = [], g = [];
        return y(e, function (c, d) {
            (b ? d && g[g.length - 1] === c : x.contains(g, c)) || (g.push(c), f.push(a[d]))
        }), f
    }, x.union = function () {
        return x.uniq(x.flatten(arguments, !0))
    }, x.intersection = function (a) {
        var b = h.call(arguments, 1);
        return x.filter(x.uniq(a), function (a) {
            return x.every(b, function (b) {
                return x.indexOf(b, a) >= 0
            })
        })
    }, x.difference = function (a) {
        var b = i.apply(d, h.call(arguments, 1));
        return x.filter(a, function (a) {
            return !x.contains(b, a)
        })
    }, x.zip = function () {
        for (var a = x.max(x.pluck(arguments, "length").concat(0)), b = new Array(a), c = 0; a > c; c++)b[c] = x.pluck(arguments, "" + c);
        return b
    }, x.object = function (a, b) {
        if (null == a)return {};
        for (var c = {}, d = 0, e = a.length; e > d; d++)b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
        return c
    }, x.indexOf = function (a, b, c) {
        if (null == a)return -1;
        var d = 0, e = a.length;
        if (c) {
            if ("number" != typeof c)return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
            d = 0 > c ? Math.max(0, e + c) : c
        }
        if (s && a.indexOf === s)return a.indexOf(b, c);
        for (; e > d; d++)if (a[d] === b)return d;
        return -1
    }, x.lastIndexOf = function (a, b, c) {
        if (null == a)return -1;
        var d = null != c;
        if (t && a.lastIndexOf === t)return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
        for (var e = d ? c : a.length; e--;)if (a[e] === b)return e;
        return -1
    }, x.range = function (a, b, c) {
        arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
        for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;)f[e++] = a, a += c;
        return f
    };
    var E = function () {
    };
    x.bind = function (a, b) {
        var c, d;
        if (w && a.bind === w)return w.apply(a, h.call(arguments, 1));
        if (!x.isFunction(a))throw new TypeError;
        return c = h.call(arguments, 2), d = function () {
            if (!(this instanceof d))return a.apply(b, c.concat(h.call(arguments)));
            E.prototype = a.prototype;
            var e = new E;
            E.prototype = null;
            var f = a.apply(e, c.concat(h.call(arguments)));
            return Object(f) === f ? f : e
        }
    }, x.partial = function (a) {
        var b = h.call(arguments, 1);
        return function () {
            return a.apply(this, b.concat(h.call(arguments)))
        }
    }, x.bindAll = function (a) {
        var b = h.call(arguments, 1);
        if (0 === b.length)throw new Error("bindAll must be passed function names");
        return y(b, function (b) {
            a[b] = x.bind(a[b], a)
        }), a
    }, x.memoize = function (a, b) {
        var c = {};
        return b || (b = x.identity), function () {
            var d = b.apply(this, arguments);
            return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments)
        }
    }, x.delay = function (a, b) {
        var c = h.call(arguments, 2);
        return setTimeout(function () {
            return a.apply(null, c)
        }, b)
    }, x.defer = function (a) {
        return x.delay.apply(x, [a, 1].concat(h.call(arguments, 1)))
    }, x.throttle = function (a, b, c) {
        var d, e, f, g = null, h = 0;
        c || (c = {});
        var i = function () {
            h = c.leading === !1 ? 0 : new Date, g = null, f = a.apply(d, e)
        };
        return function () {
            var j = new Date;
            h || c.leading !== !1 || (h = j);
            var k = b - (j - h);
            return d = this, e = arguments, 0 >= k ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e)) : g || c.trailing === !1 || (g = setTimeout(i, k)), f
        }
    }, x.debounce = function (a, b, c) {
        var d, e = null;
        return function () {
            var f = this, g = arguments, h = function () {
                e = null, c || (d = a.apply(f, g))
            }, i = c && !e;
            return clearTimeout(e), e = setTimeout(h, b), i && (d = a.apply(f, g)), d
        }
    }, x.once = function (a) {
        var b, c = !1;
        return function () {
            return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b)
        }
    }, x.wrap = function (a, b) {
        return function () {
            var c = [a];
            return g.apply(c, arguments), b.apply(this, c)
        }
    }, x.compose = function () {
        var a = arguments;
        return function () {
            for (var b = arguments, c = a.length - 1; c >= 0; c--)b = [a[c].apply(this, b)];
            return b[0]
        }
    }, x.after = function (a, b) {
        return function () {
            return --a < 1 ? b.apply(this, arguments) : void 0
        }
    }, x.keys = v || function (a) {
            if (a !== Object(a))throw new TypeError("Invalid object");
            var b = [];
            for (var c in a)x.has(a, c) && b.push(c);
            return b
        }, x.values = function (a) {
        var b = [];
        for (var c in a)x.has(a, c) && b.push(a[c]);
        return b
    }, x.pairs = function (a) {
        var b = [];
        for (var c in a)x.has(a, c) && b.push([c, a[c]]);
        return b
    }, x.invert = function (a) {
        var b = {};
        for (var c in a)x.has(a, c) && (b[a[c]] = c);
        return b
    }, x.functions = x.methods = function (a) {
        var b = [];
        for (var c in a)x.isFunction(a[c]) && b.push(c);
        return b.sort()
    }, x.extend = function (a) {
        return y(h.call(arguments, 1), function (b) {
            if (b)for (var c in b)a[c] = b[c]
        }), a
    }, x.pick = function (a) {
        var b = {}, c = i.apply(d, h.call(arguments, 1));
        return y(c, function (c) {
            c in a && (b[c] = a[c])
        }), b
    }, x.omit = function (a) {
        var b = {}, c = i.apply(d, h.call(arguments, 1));
        for (var e in a)x.contains(c, e) || (b[e] = a[e]);
        return b
    }, x.defaults = function (a) {
        return y(h.call(arguments, 1), function (b) {
            if (b)for (var c in b)void 0 === a[c] && (a[c] = b[c])
        }), a
    }, x.clone = function (a) {
        return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a
    }, x.tap = function (a, b) {
        return b(a), a
    };
    var F = function (a, b, c, d) {
        if (a === b)return 0 !== a || 1 / a == 1 / b;
        if (null == a || null == b)return a === b;
        a instanceof x && (a = a._wrapped), b instanceof x && (b = b._wrapped);
        var e = j.call(a);
        if (e != j.call(b))return !1;
        switch (e) {
            case"[object String]":
                return a == String(b);
            case"[object Number]":
                return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
            case"[object Date]":
            case"[object Boolean]":
                return +a == +b;
            case"[object RegExp]":
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
        }
        if ("object" != typeof a || "object" != typeof b)return !1;
        for (var f = c.length; f--;)if (c[f] == a)return d[f] == b;
        var g = a.constructor, h = b.constructor;
        if (g !== h && !(x.isFunction(g) && g instanceof g && x.isFunction(h) && h instanceof h))return !1;
        c.push(a), d.push(b);
        var i = 0, k = !0;
        if ("[object Array]" == e) {
            if (i = a.length, k = i == b.length)for (; i-- && (k = F(a[i], b[i], c, d)););
        } else {
            for (var l in a)if (x.has(a, l) && (i++, !(k = x.has(b, l) && F(a[l], b[l], c, d))))break;
            if (k) {
                for (l in b)if (x.has(b, l) && !i--)break;
                k = !i
            }
        }
        return c.pop(), d.pop(), k
    };
    x.isEqual = function (a, b) {
        return F(a, b, [], [])
    }, x.isEmpty = function (a) {
        if (null == a)return !0;
        if (x.isArray(a) || x.isString(a))return 0 === a.length;
        for (var b in a)if (x.has(a, b))return !1;
        return !0
    }, x.isElement = function (a) {
        return !(!a || 1 !== a.nodeType)
    }, x.isArray = u || function (a) {
            return "[object Array]" == j.call(a)
        }, x.isObject = function (a) {
        return a === Object(a)
    }, y(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (a) {
        x["is" + a] = function (b) {
            return j.call(b) == "[object " + a + "]"
        }
    }), x.isArguments(arguments) || (x.isArguments = function (a) {
        return !(!a || !x.has(a, "callee"))
    }), "function" != typeof/./ && (x.isFunction = function (a) {
        return "function" == typeof a
    }), x.isFinite = function (a) {
        return isFinite(a) && !isNaN(parseFloat(a))
    }, x.isNaN = function (a) {
        return x.isNumber(a) && a != +a
    }, x.isBoolean = function (a) {
        return a === !0 || a === !1 || "[object Boolean]" == j.call(a)
    }, x.isNull = function (a) {
        return null === a
    }, x.isUndefined = function (a) {
        return void 0 === a
    }, x.has = function (a, b) {
        return k.call(a, b)
    }, x.noConflict = function () {
        return a._ = b, this
    }, x.identity = function (a) {
        return a
    }, x.times = function (a, b, c) {
        for (var d = Array(Math.max(0, a)), e = 0; a > e; e++)d[e] = b.call(c, e);
        return d
    }, x.random = function (a, b) {
        return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1))
    };
    var G = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;"}};
    G.unescape = x.invert(G.escape);
    var H = {
        escape: new RegExp("[" + x.keys(G.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + x.keys(G.unescape).join("|") + ")", "g")
    };
    x.each(["escape", "unescape"], function (a) {
        x[a] = function (b) {
            return null == b ? "" : ("" + b).replace(H[a], function (b) {
                return G[a][b]
            })
        }
    }), x.result = function (a, b) {
        if (null == a)return void 0;
        var c = a[b];
        return x.isFunction(c) ? c.call(a) : c
    }, x.mixin = function (a) {
        y(x.functions(a), function (b) {
            var c = x[b] = a[b];
            x.prototype[b] = function () {
                var a = [this._wrapped];
                return g.apply(a, arguments), M.call(this, c.apply(x, a))
            }
        })
    };
    var I = 0;
    x.uniqueId = function (a) {
        var b = ++I + "";
        return a ? a + b : b
    }, x.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var J = /(.)^/, K = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, L = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    x.template = function (a, b, c) {
        var d;
        c = x.defaults({}, c, x.templateSettings);
        var e = new RegExp([(c.escape || J).source, (c.interpolate || J).source, (c.evaluate || J).source].join("|") + "|$", "g"), f = 0, g = "__p+='";
        a.replace(e, function (b, c, d, e, h) {
            return g += a.slice(f, h).replace(L, function (a) {
                return "\\" + K[a]
            }), c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"), d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"), e && (g += "';\n" + e + "\n__p+='"), f = h + b.length, b
        }), g += "';\n", c.variable || (g = "with(obj||{}){\n" + g + "}\n"), g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
        try {
            d = new Function(c.variable || "obj", "_", g)
        } catch (h) {
            throw h.source = g, h
        }
        if (b)return d(b, x);
        var i = function (a) {
            return d.call(this, a, x)
        };
        return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}", i
    }, x.chain = function (a) {
        return x(a).chain()
    };
    var M = function (a) {
        return this._chain ? x(a).chain() : a
    };
    x.mixin(x), y(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (a) {
        var b = d[a];
        x.prototype[a] = function () {
            var c = this._wrapped;
            return b.apply(c, arguments), "shift" != a && "splice" != a || 0 !== c.length || delete c[0], M.call(this, c)
        }
    }), y(["concat", "join", "slice"], function (a) {
        var b = d[a];
        x.prototype[a] = function () {
            return M.call(this, b.apply(this._wrapped, arguments))
        }
    }), x.extend(x.prototype, {
        chain: function () {
            return this._chain = !0, this
        }, value: function () {
            return this._wrapped
        }
    })
}).call(this), function (a, b, c) {
    "use strict";
    function d(a) {
        return function () {
            var b, c = arguments[0], c = "[" + (a ? a + ":" : "") + c + "] http://errors.angularjs.org/1.2.26/" + (a ? a + "/" : "") + c;
            for (b = 1; b < arguments.length; b++)c = c + (1 == b ? "?" : "&") + "p" + (b - 1) + "=" + encodeURIComponent("function" == typeof arguments[b] ? arguments[b].toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof arguments[b] ? "undefined" : "string" != typeof arguments[b] ? JSON.stringify(arguments[b]) : arguments[b]);
            return Error(c)
        }
    }

    function e(a) {
        if (null == a || z(a))return !1;
        var b = a.length;
        return 1 === a.nodeType && b ? !0 : u(a) || dd(a) || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }

    function f(a, b, c) {
        var d;
        if (a)if (x(a))for (d in a)"prototype" == d || "length" == d || "name" == d || a.hasOwnProperty && !a.hasOwnProperty(d) || b.call(c, a[d], d); else if (dd(a) || e(a))for (d = 0; d < a.length; d++)b.call(c, a[d], d); else if (a.forEach && a.forEach !== f)a.forEach(b, c); else for (d in a)a.hasOwnProperty(d) && b.call(c, a[d], d);
        return a
    }

    function g(a) {
        var b, c = [];
        for (b in a)a.hasOwnProperty(b) && c.push(b);
        return c.sort()
    }

    function h(a, b, c) {
        for (var d = g(a), e = 0; e < d.length; e++)b.call(c, a[d[e]], d[e]);
        return d
    }

    function i(a) {
        return function (b, c) {
            a(c, b)
        }
    }

    function j() {
        for (var a, b = cd.length; b;) {
            if (b--, a = cd[b].charCodeAt(0), 57 == a)return cd[b] = "A", cd.join("");
            if (90 != a)return cd[b] = String.fromCharCode(a + 1), cd.join("");
            cd[b] = "0"
        }
        return cd.unshift("0"), cd.join("")
    }

    function k(a, b) {
        b ? a.$$hashKey = b : delete a.$$hashKey
    }

    function l(a) {
        var b = a.$$hashKey;
        return f(arguments, function (b) {
            b !== a && f(b, function (b, c) {
                a[c] = b
            })
        }), k(a, b), a
    }

    function m(a) {
        return parseInt(a, 10)
    }

    function n(a, b) {
        return l(new (l(function () {
        }, {prototype: a})), b)
    }

    function o() {
    }

    function p(a) {
        return a
    }

    function q(a) {
        return function () {
            return a
        }
    }

    function r(a) {
        return "undefined" == typeof a
    }

    function s(a) {
        return "undefined" != typeof a
    }

    function t(a) {
        return null != a && "object" == typeof a
    }

    function u(a) {
        return "string" == typeof a
    }

    function v(a) {
        return "number" == typeof a
    }

    function w(a) {
        return "[object Date]" === _c.call(a)
    }

    function x(a) {
        return "function" == typeof a
    }

    function y(a) {
        return "[object RegExp]" === _c.call(a)
    }

    function z(a) {
        return a && a.document && a.location && a.alert && a.setInterval
    }

    function A(a) {
        return !(!a || !(a.nodeName || a.prop && a.attr && a.find))
    }

    function B(a, b, c) {
        var d = [];
        return f(a, function (a, e, f) {
            d.push(b.call(c, a, e, f))
        }), d
    }

    function C(a, b) {
        if (a.indexOf)return a.indexOf(b);
        for (var c = 0; c < a.length; c++)if (b === a[c])return c;
        return -1
    }

    function D(a, b) {
        var c = C(a, b);
        return c >= 0 && a.splice(c, 1), b
    }

    function E(a, b, c, d) {
        if (z(a) || a && a.$evalAsync && a.$watch)throw ad("cpws");
        if (b) {
            if (a === b)throw ad("cpi");
            if (c = c || [], d = d || [], t(a)) {
                var e = C(c, a);
                if (-1 !== e)return d[e];
                c.push(a), d.push(b)
            }
            if (dd(a))for (var g = b.length = 0; g < a.length; g++)e = E(a[g], null, c, d), t(a[g]) && (c.push(a[g]), d.push(e)), b.push(e); else {
                var h = b.$$hashKey;
                dd(b) ? b.length = 0 : f(b, function (a, c) {
                    delete b[c]
                });
                for (g in a)e = E(a[g], null, c, d), t(a[g]) && (c.push(a[g]), d.push(e)), b[g] = e;
                k(b, h)
            }
        } else(b = a) && (dd(a) ? b = E(a, [], c, d) : w(a) ? b = new Date(a.getTime()) : y(a) ? (b = RegExp(a.source, a.toString().match(/[^\/]*$/)[0]), b.lastIndex = a.lastIndex) : t(a) && (b = E(a, {}, c, d)));
        return b
    }

    function F(a, b) {
        if (dd(a)) {
            b = b || [];
            for (var c = 0; c < a.length; c++)b[c] = a[c]
        } else if (t(a))for (c in b = b || {}, a)!Xc.call(a, c) || "$" === c.charAt(0) && "$" === c.charAt(1) || (b[c] = a[c]);
        return b || a
    }

    function G(a, b) {
        if (a === b)return !0;
        if (null === a || null === b)return !1;
        if (a !== a && b !== b)return !0;
        var d, e = typeof a;
        if (e == typeof b && "object" == e) {
            if (!dd(a)) {
                if (w(a))return w(b) ? isNaN(a.getTime()) && isNaN(b.getTime()) || a.getTime() === b.getTime() : !1;
                if (y(a) && y(b))return a.toString() == b.toString();
                if (a && a.$evalAsync && a.$watch || b && b.$evalAsync && b.$watch || z(a) || z(b) || dd(b))return !1;
                e = {};
                for (d in a)if ("$" !== d.charAt(0) && !x(a[d])) {
                    if (!G(a[d], b[d]))return !1;
                    e[d] = !0
                }
                for (d in b)if (!e.hasOwnProperty(d) && "$" !== d.charAt(0) && b[d] !== c && !x(b[d]))return !1;
                return !0
            }
            if (!dd(b))return !1;
            if ((e = a.length) == b.length) {
                for (d = 0; e > d; d++)if (!G(a[d], b[d]))return !1;
                return !0
            }
        }
        return !1
    }

    function H(a, b) {
        var c = 2 < arguments.length ? Zc.call(arguments, 2) : [];
        return !x(b) || b instanceof RegExp ? b : c.length ? function () {
            return arguments.length ? b.apply(a, c.concat(Zc.call(arguments, 0))) : b.apply(a, c)
        } : function () {
            return arguments.length ? b.apply(a, arguments) : b.call(a)
        }
    }

    function I(a, d) {
        var e = d;
        return "string" == typeof a && "$" === a.charAt(0) ? e = c : z(d) ? e = "$WINDOW" : d && b === d ? e = "$DOCUMENT" : d && d.$evalAsync && d.$watch && (e = "$SCOPE"), e
    }

    function J(a, b) {
        return "undefined" == typeof a ? c : JSON.stringify(a, I, b ? "  " : null)
    }

    function K(a) {
        return u(a) ? JSON.parse(a) : a
    }

    function L(a) {
        return "function" == typeof a ? a = !0 : a && 0 !== a.length ? (a = Wc("" + a), a = !("f" == a || "0" == a || "false" == a || "no" == a || "n" == a || "[]" == a)) : a = !1, a
    }

    function M(a) {
        a = Rc(a).clone();
        try {
            a.empty()
        } catch (b) {
        }
        var c = Rc("<div>").append(a).html();
        try {
            return 3 === a[0].nodeType ? Wc(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (a, b) {
                return "<" + Wc(b)
            })
        } catch (d) {
            return Wc(c)
        }
    }

    function N(a) {
        try {
            return decodeURIComponent(a)
        } catch (b) {
        }
    }

    function O(a) {
        var b, c, d = {};
        return f((a || "").split("&"), function (a) {
            a && (b = a.replace(/\+/g, "%20").split("="), c = N(b[0]), s(c) && (a = s(b[1]) ? N(b[1]) : !0, Xc.call(d, c) ? dd(d[c]) ? d[c].push(a) : d[c] = [d[c], a] : d[c] = a))
        }), d
    }

    function P(a) {
        var b = [];
        return f(a, function (a, c) {
            dd(a) ? f(a, function (a) {
                b.push(R(c, !0) + (!0 === a ? "" : "=" + R(a, !0)))
            }) : b.push(R(c, !0) + (!0 === a ? "" : "=" + R(a, !0)))
        }), b.length ? b.join("&") : ""
    }

    function Q(a) {
        return R(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function R(a, b) {
        return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, b ? "%20" : "+")
    }

    function S(a, c) {
        function d(a) {
            a && h.push(a)
        }

        var e, g, h = [a], i = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"], j = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        f(i, function (c) {
            i[c] = !0, d(b.getElementById(c)), c = c.replace(":", "\\:"), a.querySelectorAll && (f(a.querySelectorAll("." + c), d), f(a.querySelectorAll("." + c + "\\:"), d), f(a.querySelectorAll("[" + c + "]"), d))
        }), f(h, function (a) {
            if (!e) {
                var b = j.exec(" " + a.className + " ");
                b ? (e = a, g = (b[2] || "").replace(/\s+/g, ",")) : f(a.attributes, function (b) {
                    !e && i[b.name] && (e = a, g = b.value)
                })
            }
        }), e && c(e, g ? [g] : [])
    }

    function T(c, d) {
        var e = function () {
            if (c = Rc(c), c.injector()) {
                var a = c[0] === b ? "document" : M(c);
                throw ad("btstrpd", a.replace(/</, "&lt;").replace(/>/, "&gt;"))
            }
            return d = d || [], d.unshift(["$provide", function (a) {
                a.value("$rootElement", c)
            }]), d.unshift("ng"), a = vb(d), a.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate", function (a, b, c, d) {
                a.$apply(function () {
                    b.data("$injector", d), c(b)(a)
                })
            }]), a
        }, g = /^NG_DEFER_BOOTSTRAP!/;
        return a && !g.test(a.name) ? e() : (a.name = a.name.replace(g, ""), void(bd.resumeBootstrap = function (a) {
            f(a, function (a) {
                d.push(a)
            }), e()
        }))
    }

    function U(a, b) {
        return b = b || "_", a.replace(gd, function (a, c) {
            return (c ? b : "") + a.toLowerCase()
        })
    }

    function V(a, b, c) {
        if (!a)throw ad("areq", b || "?", c || "required");
        return a
    }

    function W(a, b, c) {
        return c && dd(a) && (a = a[a.length - 1]), V(x(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)), a
    }

    function X(a, b) {
        if ("hasOwnProperty" === a)throw ad("badname", b)
    }

    function Y(a, b, c) {
        if (!b)return a;
        b = b.split(".");
        for (var d, e = a, f = b.length, g = 0; f > g; g++)d = b[g], a && (a = (e = a)[d]);
        return !c && x(a) ? H(e, a) : a
    }

    function Z(a) {
        var b = a[0];
        if (a = a[a.length - 1], b === a)return Rc(b);
        var c = [b];
        do {
            if (b = b.nextSibling, !b)break;
            c.push(b)
        } while (b !== a);
        return Rc(c)
    }

    function $(a) {
        var b = d("$injector"), c = d("ng");
        return a = a.angular || (a.angular = {}), a.$$minErr = a.$$minErr || d, a.module || (a.module = function () {
            var a = {};
            return function (d, e, f) {
                if ("hasOwnProperty" === d)throw c("badname", "module");
                return e && a.hasOwnProperty(d) && (a[d] = null), a[d] || (a[d] = function () {
                    function a(a, b, d) {
                        return function () {
                            return c[d || "push"]([a, b, arguments]), i
                        }
                    }

                    if (!e)throw b("nomod", d);
                    var c = [], g = [], h = a("$injector", "invoke"), i = {
                        _invokeQueue: c,
                        _runBlocks: g,
                        requires: e,
                        name: d,
                        provider: a("$provide", "provider"),
                        factory: a("$provide", "factory"),
                        service: a("$provide", "service"),
                        value: a("$provide", "value"),
                        constant: a("$provide", "constant", "unshift"),
                        animation: a("$animateProvider", "register"),
                        filter: a("$filterProvider", "register"),
                        controller: a("$controllerProvider", "register"),
                        directive: a("$compileProvider", "directive"),
                        config: h,
                        run: function (a) {
                            return g.push(a), this
                        }
                    };
                    return f && h(f), i
                }())
            }
        }())
    }

    function _(b) {
        l(b, {
            bootstrap: T,
            copy: E,
            extend: l,
            equals: G,
            element: Rc,
            forEach: f,
            injector: vb,
            noop: o,
            bind: H,
            toJson: J,
            fromJson: K,
            identity: p,
            isUndefined: r,
            isDefined: s,
            isString: u,
            isFunction: x,
            isObject: t,
            isNumber: v,
            isElement: A,
            isArray: dd,
            version: hd,
            isDate: w,
            lowercase: Wc,
            uppercase: Yc,
            callbacks: {counter: 0},
            $$minErr: d,
            $$csp: fd
        }), Tc = $(a);
        try {
            Tc("ngLocale")
        } catch (c) {
            Tc("ngLocale", []).provider("$locale", Rb)
        }
        Tc("ng", ["ngLocale"], ["$provide", function (a) {
            a.provider({$$sanitizeUri: nc}), a.provider("$compile", Cb).directive({
                a: de,
                input: oe,
                textarea: oe,
                form: he,
                script: Ye,
                select: _e,
                style: bf,
                option: af,
                ngBind: Ae,
                ngBindHtml: Ce,
                ngBindTemplate: Be,
                ngClass: De,
                ngClassEven: Fe,
                ngClassOdd: Ee,
                ngCloak: Ge,
                ngController: He,
                ngForm: ie,
                ngHide: Se,
                ngIf: Ke,
                ngInclude: Le,
                ngInit: Ne,
                ngNonBindable: Oe,
                ngPluralize: Pe,
                ngRepeat: Qe,
                ngShow: Re,
                ngStyle: Te,
                ngSwitch: Ue,
                ngSwitchWhen: Ve,
                ngSwitchDefault: We,
                ngOptions: $e,
                ngTransclude: Xe,
                ngModel: ue,
                ngList: xe,
                ngChange: ve,
                required: we,
                ngRequired: we,
                ngValue: ze
            }).directive({ngInclude: Me}).directive(ee).directive(Ie), a.provider({
                $anchorScroll: wb,
                $animate: Dd,
                $browser: zb,
                $cacheFactory: Ab,
                $controller: Fb,
                $document: Gb,
                $exceptionHandler: Hb,
                $filter: xc,
                $interpolate: Pb,
                $interval: Qb,
                $http: Lb,
                $httpBackend: Nb,
                $location: bc,
                $log: cc,
                $parse: ic,
                $rootScope: mc,
                $q: jc,
                $sce: rc,
                $sceDelegate: qc,
                $sniffer: sc,
                $templateCache: Bb,
                $timeout: tc,
                $window: wc,
                $$rAF: lc,
                $$asyncCallback: xb
            })
        }])
    }

    function ab(a) {
        return a.replace(md, function (a, b, c, d) {
            return d ? c.toUpperCase() : c
        }).replace(nd, "Moz$1")
    }

    function bb(a, b, c, d) {
        function e(a) {
            var e, g, h, i, j, k, l = c && a ? [this.filter(a)] : [this], m = b;
            if (!d || null != a)for (; l.length;)for (e = l.shift(), g = 0, h = e.length; h > g; g++)for (i = Rc(e[g]), m ? i.triggerHandler("$destroy") : m = !m, j = 0, i = (k = i.children()).length; i > j; j++)l.push(Sc(k[j]));
            return f.apply(this, arguments)
        }

        var f = Sc.fn[a], f = f.$original || f;
        e.$original = f, Sc.fn[a] = e
    }

    function cb(a) {
        if (a instanceof cb)return a;
        if (u(a) && (a = ed(a)), !(this instanceof cb)) {
            if (u(a) && "<" != a.charAt(0))throw od("nosel");
            return new cb(a)
        }
        if (u(a)) {
            var c = a;
            a = b;
            var d;
            if (d = pd.exec(c))a = [a.createElement(d[1])]; else {
                var e, f = a;
                if (a = f.createDocumentFragment(), d = [], qd.test(c)) {
                    for (f = a.appendChild(f.createElement("div")), e = (rd.exec(c) || ["", ""])[1].toLowerCase(), e = td[e] || td._default, f.innerHTML = "<div>&#160;</div>" + e[1] + c.replace(sd, "<$1></$2>") + e[2], f.removeChild(f.firstChild), c = e[0]; c--;)f = f.lastChild;
                    for (c = 0, e = f.childNodes.length; e > c; ++c)d.push(f.childNodes[c]);
                    f = a.firstChild, f.textContent = ""
                } else d.push(f.createTextNode(c));
                a.textContent = "", a.innerHTML = "", a = d
            }
            mb(this, a), Rc(b.createDocumentFragment()).append(this)
        } else mb(this, a)
    }

    function db(a) {
        return a.cloneNode(!0)
    }

    function eb(a) {
        gb(a);
        var b = 0;
        for (a = a.childNodes || []; b < a.length; b++)eb(a[b])
    }

    function fb(a, b, c, d) {
        if (s(d))throw od("offargs");
        var e = hb(a, "events");
        hb(a, "handle") && (r(b) ? f(e, function (b, c) {
            ld(a, c, b), delete e[c]
        }) : f(b.split(" "), function (b) {
            r(c) ? (ld(a, b, e[b]), delete e[b]) : D(e[b] || [], c)
        }))
    }

    function gb(a, b) {
        var d = a.ng339, e = id[d];
        e && (b ? delete id[d].data[b] : (e.handle && (e.events.$destroy && e.handle({}, "$destroy"), fb(a)), delete id[d], a.ng339 = c))
    }

    function hb(a, b, c) {
        var d = a.ng339, d = id[d || -1];
        return s(c) ? (d || (a.ng339 = d = ++jd, d = id[d] = {}), void(d[b] = c)) : d && d[b]
    }

    function ib(a, b, c) {
        var d = hb(a, "data"), e = s(c), f = !e && s(b), g = f && !t(b);
        if (d || g || hb(a, "data", d = {}), e)d[b] = c; else {
            if (!f)return d;
            if (g)return d && d[b];
            l(d, b)
        }
    }

    function jb(a, b) {
        return a.getAttribute ? -1 < (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") : !1
    }

    function kb(a, b) {
        b && a.setAttribute && f(b.split(" "), function (b) {
            a.setAttribute("class", ed((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + ed(b) + " ", " ")))
        })
    }

    function lb(a, b) {
        if (b && a.setAttribute) {
            var c = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            f(b.split(" "), function (a) {
                a = ed(a), -1 === c.indexOf(" " + a + " ") && (c += a + " ")
            }), a.setAttribute("class", ed(c))
        }
    }

    function mb(a, b) {
        if (b) {
            b = b.nodeName || !s(b.length) || z(b) ? [b] : b;
            for (var c = 0; c < b.length; c++)a.push(b[c])
        }
    }

    function nb(a, b) {
        return ob(a, "$" + (b || "ngController") + "Controller")
    }

    function ob(a, b, d) {
        for (9 == a.nodeType && (a = a.documentElement), b = dd(b) ? b : [b]; a;) {
            for (var e = 0, f = b.length; f > e; e++)if ((d = Rc.data(a, b[e])) !== c)return d;
            a = a.parentNode || 11 === a.nodeType && a.host
        }
    }

    function pb(a) {
        for (var b = 0, c = a.childNodes; b < c.length; b++)eb(c[b]);
        for (; a.firstChild;)a.removeChild(a.firstChild)
    }

    function qb(a, b) {
        var c = vd[b.toLowerCase()];
        return c && wd[a.nodeName] && c
    }

    function rb(a, c) {
        var d = function (d, e) {
            if (d.preventDefault || (d.preventDefault = function () {
                    d.returnValue = !1
                }), d.stopPropagation || (d.stopPropagation = function () {
                    d.cancelBubble = !0
                }), d.target || (d.target = d.srcElement || b), r(d.defaultPrevented)) {
                var g = d.preventDefault;
                d.preventDefault = function () {
                    d.defaultPrevented = !0, g.call(d)
                }, d.defaultPrevented = !1
            }
            d.isDefaultPrevented = function () {
                return d.defaultPrevented || !1 === d.returnValue
            };
            var h = F(c[e || d.type] || []);
            f(h, function (b) {
                b.call(a, d)
            }), 8 >= Qc ? (d.preventDefault = null, d.stopPropagation = null, d.isDefaultPrevented = null) : (delete d.preventDefault, delete d.stopPropagation, delete d.isDefaultPrevented)
        };
        return d.elem = a, d
    }

    function sb(a, b) {
        var d, e = typeof a;
        return "function" == e || "object" == e && null !== a ? "function" == typeof(d = a.$$hashKey) ? d = a.$$hashKey() : d === c && (d = a.$$hashKey = (b || j)()) : d = a, e + ":" + d
    }

    function tb(a, b) {
        if (b) {
            var c = 0;
            this.nextUid = function () {
                return ++c
            }
        }
        f(a, this.put, this)
    }

    function ub(a) {
        var b, c;
        return "function" == typeof a ? (b = a.$inject) || (b = [], a.length && (c = a.toString().replace(Ad, ""), c = c.match(xd), f(c[1].split(yd), function (a) {
            a.replace(zd, function (a, c, d) {
                b.push(d)
            })
        })), a.$inject = b) : dd(a) ? (c = a.length - 1, W(a[c], "fn"), b = a.slice(0, c)) : W(a, "fn", !0), b
    }

    function vb(a) {
        function b(a) {
            return function (b, c) {
                return t(b) ? void f(b, i(a)) : a(b, c)
            }
        }

        function c(a, b) {
            if (X(a, "service"), (x(b) || dd(b)) && (b = n.instantiate(b)), !b.$get)throw Bd("pget", a);
            return m[a + j] = b
        }

        function d(a, b) {
            return c(a, {$get: b})
        }

        function e(a) {
            var b, c, d, g, h = [];
            return f(a, function (a) {
                if (!l.get(a)) {
                    l.put(a, !0);
                    try {
                        if (u(a))for (b = Tc(a), h = h.concat(e(b.requires)).concat(b._runBlocks), c = b._invokeQueue, d = 0, g = c.length; g > d; d++) {
                            var f = c[d], i = n.get(f[0]);
                            i[f[1]].apply(i, f[2])
                        } else x(a) ? h.push(n.invoke(a)) : dd(a) ? h.push(n.invoke(a)) : W(a, "module")
                    } catch (j) {
                        throw dd(a) && (a = a[a.length - 1]), j.message && j.stack && -1 == j.stack.indexOf(j.message) && (j = j.message + "\n" + j.stack), Bd("modulerr", a, j.stack || j.message || j)
                    }
                }
            }), h
        }

        function g(a, b) {
            function c(c) {
                if (a.hasOwnProperty(c)) {
                    if (a[c] === h)throw Bd("cdep", c + " <- " + k.join(" <- "));
                    return a[c]
                }
                try {
                    return k.unshift(c), a[c] = h, a[c] = b(c)
                } catch (d) {
                    throw a[c] === h && delete a[c], d
                } finally {
                    k.shift()
                }
            }

            function d(a, b, d) {
                var e, f, g, h = [], i = ub(a);
                for (f = 0, e = i.length; e > f; f++) {
                    if (g = i[f], "string" != typeof g)throw Bd("itkn", g);
                    h.push(d && d.hasOwnProperty(g) ? d[g] : c(g))
                }
                return dd(a) && (a = a[e]), a.apply(b, h)
            }

            return {
                invoke: d, instantiate: function (a, b) {
                    var c, e = function () {
                    };
                    return e.prototype = (dd(a) ? a[a.length - 1] : a).prototype, e = new e, c = d(a, e, b), t(c) || x(c) ? c : e
                }, get: c, annotate: ub, has: function (b) {
                    return m.hasOwnProperty(b + j) || a.hasOwnProperty(b)
                }
            }
        }

        var h = {}, j = "Provider", k = [], l = new tb([], !0), m = {
            $provide: {
                provider: b(c),
                factory: b(d),
                service: b(function (a, b) {
                    return d(a, ["$injector", function (a) {
                        return a.instantiate(b)
                    }])
                }),
                value: b(function (a, b) {
                    return d(a, q(b))
                }),
                constant: b(function (a, b) {
                    X(a, "constant"), m[a] = b, p[a] = b
                }),
                decorator: function (a, b) {
                    var c = n.get(a + j), d = c.$get;
                    c.$get = function () {
                        var a = r.invoke(d, c);
                        return r.invoke(b, null, {$delegate: a})
                    }
                }
            }
        }, n = m.$injector = g(m, function () {
            throw Bd("unpr", k.join(" <- "))
        }), p = {}, r = p.$injector = g(p, function (a) {
            return a = n.get(a + j), r.invoke(a.$get, a)
        });
        return f(e(a), function (a) {
            r.invoke(a || o)
        }), r
    }

    function wb() {
        var a = !0;
        this.disableAutoScrolling = function () {
            a = !1
        }, this.$get = ["$window", "$location", "$rootScope", function (b, c, d) {
            function e(a) {
                var b = null;
                return f(a, function (a) {
                    b || "a" !== Wc(a.nodeName) || (b = a)
                }), b
            }

            function g() {
                var a, d = c.hash();
                d ? (a = h.getElementById(d)) ? a.scrollIntoView() : (a = e(h.getElementsByName(d))) ? a.scrollIntoView() : "top" === d && b.scrollTo(0, 0) : b.scrollTo(0, 0)
            }

            var h = b.document;
            return a && d.$watch(function () {
                return c.hash()
            }, function () {
                d.$evalAsync(g)
            }), g
        }]
    }

    function xb() {
        this.$get = ["$$rAF", "$timeout", function (a, b) {
            return a.supported ? function (b) {
                return a(b)
            } : function (a) {
                return b(a, 0, !1)
            }
        }]
    }

    function yb(a, b, d, e) {
        function g(a) {
            try {
                a.apply(null, Zc.call(arguments, 1))
            } finally {
                if (s--, 0 === s)for (; t.length;)try {
                    t.pop()()
                } catch (b) {
                    d.error(b)
                }
            }
        }

        function h(a, b) {
            !function c() {
                f(w, function (a) {
                    a()
                }), v = b(c, a)
            }()
        }

        function i() {
            z = null, x != j.url() && (x = j.url(), f(A, function (a) {
                a(j.url())
            }))
        }

        var j = this, k = b[0], l = a.location, m = a.history, n = a.setTimeout, p = a.clearTimeout, q = {};
        j.isMock = !1;
        var s = 0, t = [];
        j.$$completeOutstandingRequest = g, j.$$incOutstandingRequestCount = function () {
            s++
        }, j.notifyWhenNoOutstandingRequests = function (a) {
            f(w, function (a) {
                a()
            }), 0 === s ? a() : t.push(a)
        };
        var v, w = [];
        j.addPollFn = function (a) {
            return r(v) && h(100, n), w.push(a), a
        };
        var x = l.href, y = b.find("base"), z = null;
        j.url = function (b, c) {
            return l !== a.location && (l = a.location), m !== a.history && (m = a.history), b ? x != b ? (x = b, e.history ? c ? m.replaceState(null, "", b) : (m.pushState(null, "", b), y.attr("href", y.attr("href"))) : (z = b, c ? l.replace(b) : l.href = b), j) : void 0 : z || l.href.replace(/%27/g, "'")
        };
        var A = [], B = !1;
        j.onUrlChange = function (b) {
            return B || (e.history && Rc(a).on("popstate", i), e.hashchange ? Rc(a).on("hashchange", i) : j.addPollFn(i), B = !0), A.push(b), b
        }, j.$$checkUrlChange = i, j.baseHref = function () {
            var a = y.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
        };
        var C = {}, D = "", E = j.baseHref();
        j.cookies = function (a, b) {
            var e, f, g, h;
            if (!a) {
                if (k.cookie !== D)for (D = k.cookie, e = D.split("; "), C = {}, g = 0; g < e.length; g++)f = e[g], h = f.indexOf("="), h > 0 && (a = unescape(f.substring(0, h)), C[a] === c && (C[a] = unescape(f.substring(h + 1))));
                return C
            }
            b === c ? k.cookie = escape(a) + "=;path=" + E + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : u(b) && (e = (k.cookie = escape(a) + "=" + escape(b) + ";path=" + E).length + 1, e > 4096 && d.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + e + " > 4096 bytes)!"))
        }, j.defer = function (a, b) {
            var c;
            return s++, c = n(function () {
                delete q[c], g(a)
            }, b || 0), q[c] = !0, c
        }, j.defer.cancel = function (a) {
            return q[a] ? (delete q[a], p(a), g(o), !0) : !1
        }
    }

    function zb() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function (a, b, c, d) {
            return new yb(a, d, b, c)
        }]
    }

    function Ab() {
        this.$get = function () {
            function a(a, c) {
                function e(a) {
                    a != m && (n ? n == a && (n = a.n) : n = a, f(a.n, a.p), f(a, m), m = a, m.n = null)
                }

                function f(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a))
                }

                if (a in b)throw d("$cacheFactory")("iid", a);
                var g = 0, h = l({}, c, {id: a}), i = {}, j = c && c.capacity || Number.MAX_VALUE, k = {}, m = null, n = null;
                return b[a] = {
                    put: function (a, b) {
                        if (j < Number.MAX_VALUE) {
                            var c = k[a] || (k[a] = {key: a});
                            e(c)
                        }
                        return r(b) ? void 0 : (a in i || g++, i[a] = b, g > j && this.remove(n.key), b)
                    }, get: function (a) {
                        if (j < Number.MAX_VALUE) {
                            var b = k[a];
                            if (!b)return;
                            e(b)
                        }
                        return i[a]
                    }, remove: function (a) {
                        if (j < Number.MAX_VALUE) {
                            var b = k[a];
                            if (!b)return;
                            b == m && (m = b.p), b == n && (n = b.n), f(b.n, b.p), delete k[a]
                        }
                        delete i[a], g--
                    }, removeAll: function () {
                        i = {}, g = 0, k = {}, m = n = null
                    }, destroy: function () {
                        k = h = i = null, delete b[a]
                    }, info: function () {
                        return l({}, h, {size: g})
                    }
                }
            }

            var b = {};
            return a.info = function () {
                var a = {};
                return f(b, function (b, c) {
                    a[c] = b.info()
                }), a
            }, a.get = function (a) {
                return b[a]
            }, a
        }
    }

    function Bb() {
        this.$get = ["$cacheFactory", function (a) {
            return a("templates")
        }]
    }

    function Cb(a, d) {
        var e = {}, g = "Directive", h = /^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/, j = /(([\d\w_\-]+)(?:\:([^;]+))?;?)/, k = /^(on[a-z]+|formaction)$/;
        this.directive = function m(b, c) {
            return X(b, "directive"), u(b) ? (V(c, "directiveFactory"), e.hasOwnProperty(b) || (e[b] = [], a.factory(b + g, ["$injector", "$exceptionHandler", function (a, c) {
                var d = [];
                return f(e[b], function (e, f) {
                    try {
                        var g = a.invoke(e);
                        x(g) ? g = {compile: q(g)} : !g.compile && g.link && (g.compile = q(g.link)), g.priority = g.priority || 0, g.index = f, g.name = g.name || b, g.require = g.require || g.controller && g.name, g.restrict = g.restrict || "A", d.push(g)
                    } catch (h) {
                        c(h)
                    }
                }), d
            }])), e[b].push(c)) : f(b, i(m)), this
        }, this.aHrefSanitizationWhitelist = function (a) {
            return s(a) ? (d.aHrefSanitizationWhitelist(a), this) : d.aHrefSanitizationWhitelist()
        }, this.imgSrcSanitizationWhitelist = function (a) {
            return s(a) ? (d.imgSrcSanitizationWhitelist(a), this) : d.imgSrcSanitizationWhitelist()
        }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function (a, d, i, m, o, q, r, s, v, w, y, z) {
            function A(a, b, c, d, e) {
                a instanceof Rc || (a = Rc(a)), f(a, function (b, c) {
                    3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = Rc(b).wrap("<span></span>").parent()[0])
                });
                var g = C(a, b, a, c, d, e);
                return B(a, "ng-scope"), function (b, c, d, e) {
                    V(b, "scope");
                    var h = c ? ud.clone.call(a) : a;
                    f(d, function (a, b) {
                        h.data("$" + b + "Controller", a)
                    }), d = 0;
                    for (var i = h.length; i > d; d++) {
                        var j = h[d].nodeType;
                        1 !== j && 9 !== j || h.eq(d).data("$scope", b)
                    }
                    return c && c(h, b), g && g(b, h, h, e), h
                }
            }

            function B(a, b) {
                try {
                    a.addClass(b)
                } catch (c) {
                }
            }

            function C(a, b, d, e, f, g) {
                function h(a, d, e, f) {
                    var g, h, i, j, k, l, n;
                    g = d.length;
                    var o = Array(g);
                    for (j = 0; g > j; j++)o[j] = d[j];
                    for (l = j = 0, k = m.length; k > j; l++)h = o[l], d = m[j++], g = m[j++], d ? (d.scope ? (i = a.$new(), Rc.data(h, "$scope", i)) : i = a, n = d.transcludeOnThisElement ? D(a, d.transclude, f) : !d.templateOnThisElement && f ? f : !f && b ? D(a, b) : null, d(g, i, h, e, n)) : g && g(a, h.childNodes, c, f)
                }

                for (var i, j, k, l, m = [], n = 0; n < a.length; n++)i = new Y, j = E(a[n], [], i, 0 === n ? e : c, f), (g = j.length ? J(j, a[n], i, b, d, null, [], [], g) : null) && g.scope && B(i.$$element, "ng-scope"), i = g && g.terminal || !(k = a[n].childNodes) || !k.length ? null : C(k, g ? (g.transcludeOnThisElement || !g.templateOnThisElement) && g.transclude : b), m.push(g, i), l = l || g || i, g = null;
                return l ? h : null
            }

            function D(a, b, c) {
                return function (d, e, f) {
                    var g = !1;
                    return d || (d = a.$new(), g = d.$$transcluded = !0), e = b(d, e, f, c), g && e.on("$destroy", function () {
                        d.$destroy()
                    }), e
                }
            }

            function E(a, b, c, d, e) {
                var f, g = c.$attr;
                switch (a.nodeType) {
                    case 1:
                        L(b, Db(Uc(a).toLowerCase()), "E", d, e);
                        for (var i, k, l, m = a.attributes, n = 0, o = m && m.length; o > n; n++) {
                            var p = !1, q = !1;
                            if (i = m[n], !Qc || Qc >= 8 || i.specified) {
                                f = i.name, k = ed(i.value), i = Db(f), (l = ab.test(i)) && (f = U(i.substr(6), "-"));
                                var r = i.replace(/(Start|End)$/, "");
                                i === r + "Start" && (p = f, q = f.substr(0, f.length - 5) + "end", f = f.substr(0, f.length - 6)), i = Db(f.toLowerCase()), g[i] = f, (l || !c.hasOwnProperty(i)) && (c[i] = k, qb(a, i) && (c[i] = !0)), T(a, b, k, i), L(b, i, "A", d, e, p, q)
                            }
                        }
                        if (a = a.className, u(a) && "" !== a)for (; f = j.exec(a);)i = Db(f[2]), L(b, i, "C", d, e) && (c[i] = ed(f[3])), a = a.substr(f.index + f[0].length);
                        break;
                    case 3:
                        R(b, a.nodeValue);
                        break;
                    case 8:
                        try {
                            (f = h.exec(a.nodeValue)) && (i = Db(f[1]), L(b, i, "M", d, e) && (c[i] = ed(f[2])))
                        } catch (s) {
                        }
                }
                return b.sort(P), b
            }

            function H(a, b, c) {
                var d = [], e = 0;
                if (b && a.hasAttribute && a.hasAttribute(b)) {
                    do {
                        if (!a)throw Ed("uterdir", b, c);
                        1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--), d.push(a), a = a.nextSibling
                    } while (e > 0)
                } else d.push(a);
                return Rc(d)
            }

            function I(a, b, c) {
                return function (d, e, f, g, h) {
                    return e = H(e[0], b, c), a(d, e, f, g, h)
                }
            }

            function J(a, e, g, h, j, k, l, m, n) {
                function o(a, b, c, d) {
                    a && (c && (a = I(a, c, d)), a.require = w.require, a.directiveName = y, (L === w || w.$$isolateScope) && (a = X(a, {isolateScope: !0})), l.push(a)), b && (c && (b = I(b, c, d)), b.require = w.require, b.directiveName = y, (L === w || w.$$isolateScope) && (b = X(b, {isolateScope: !0})), m.push(b))
                }

                function p(a, b, c, d) {
                    var e, g = "data", h = !1;
                    if (u(b)) {
                        for (; "^" == (e = b.charAt(0)) || "?" == e;)b = b.substr(1), "^" == e && (g = "inheritedData"), h = h || "?" == e;
                        if (e = null, d && "data" === g && (e = d[b]), e = e || c[g]("$" + b + "Controller"), !e && !h)throw Ed("ctreq", b, a)
                    } else dd(b) && (e = [], f(b, function (b) {
                        e.push(p(a, b, c, d))
                    }));
                    return e
                }

                function s(a, b, h, j, k) {
                    function n(a, b) {
                        var d;
                        return 2 > arguments.length && (b = a, a = c), U && (d = y), k(a, b, d)
                    }

                    var o, s, t, u, v, w, x, y = {};
                    if (o = e === h ? g : F(g, new Y(Rc(h), g.$attr)), s = o.$$element, L) {
                        var z = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
                        w = b.$new(!0), !P || P !== L && P !== L.$$originalDirective ? s.data("$isolateScopeNoTemplate", w) : s.data("$isolateScope", w), B(s, "ng-isolate-scope"), f(L.scope, function (a, c) {
                            var e, f, g, h, i = a.match(z) || [], j = i[3] || c, k = "?" == i[2], i = i[1];
                            switch (w.$$isolateBindings[c] = i + j, i) {
                                case"@":
                                    o.$observe(j, function (a) {
                                        w[c] = a
                                    }), o.$$observers[j].$$scope = b, o[j] && (w[c] = d(o[j])(b));
                                    break;
                                case"=":
                                    if (k && !o[j])break;
                                    f = q(o[j]), h = f.literal ? G : function (a, b) {
                                        return a === b || a !== a && b !== b
                                    }, g = f.assign || function () {
                                            throw e = w[c] = f(b), Ed("nonassign", o[j], L.name)
                                        }, e = w[c] = f(b), w.$watch(function () {
                                        var a = f(b);
                                        return h(a, w[c]) || (h(a, e) ? g(b, a = w[c]) : w[c] = a), e = a
                                    }, null, f.literal);
                                    break;
                                case"&":
                                    f = q(o[j]), w[c] = function (a) {
                                        return f(b, a)
                                    };
                                    break;
                                default:
                                    throw Ed("iscp", L.name, c, a)
                            }
                        })
                    }
                    for (x = k && n, J && f(J, function (a) {
                        var c, d = {
                            $scope: a === L || a.$$isolateScope ? w : b,
                            $element: s,
                            $attrs: o,
                            $transclude: x
                        };
                        v = a.controller, "@" == v && (v = o[a.name]), c = r(v, d), y[a.name] = c, U || s.data("$" + a.name + "Controller", c), a.controllerAs && (d.$scope[a.controllerAs] = c)
                    }), j = 0, t = l.length; t > j; j++)try {
                        (u = l[j])(u.isolateScope ? w : b, s, o, u.require && p(u.directiveName, u.require, s, y), x)
                    } catch (A) {
                        i(A, M(s))
                    }
                    for (j = b, L && (L.template || null === L.templateUrl) && (j = w), a && a(j, h.childNodes, c, k), j = m.length - 1; j >= 0; j--)try {
                        (u = m[j])(u.isolateScope ? w : b, s, o, u.require && p(u.directiveName, u.require, s, y), x)
                    } catch (C) {
                        i(C, M(s))
                    }
                }

                n = n || {};
                for (var v, w, y, z, C, D = -Number.MAX_VALUE, J = n.controllerDirectives, L = n.newIsolateScopeDirective, P = n.templateDirective, R = n.nonTlbTranscludeDirective, S = !1, T = !1, U = n.hasElementTranscludeDirective, V = g.$$element = Rc(e), Z = h, $ = 0, ab = a.length; ab > $; $++) {
                    w = a[$];
                    var bb = w.$$start, cb = w.$$end;
                    if (bb && (V = H(e, bb, cb)), z = c, D > w.priority)break;
                    if ((z = w.scope) && (v = v || w, w.templateUrl || (Q("new/isolated scope", L, w, V), t(z) && (L = w))), y = w.name, !w.templateUrl && w.controller && (z = w.controller, J = J || {}, Q("'" + y + "' controller", J[y], w, V), J[y] = w), (z = w.transclude) && (S = !0, w.$$tlb || (Q("transclusion", R, w, V), R = w), "element" == z ? (U = !0, D = w.priority, z = V, V = g.$$element = Rc(b.createComment(" " + y + ": " + g[y] + " ")), e = V[0], W(j, Zc.call(z, 0), e), Z = A(z, h, D, k && k.name, {nonTlbTranscludeDirective: R})) : (z = Rc(db(e)).contents(), V.empty(), Z = A(z, h))), w.template)if (T = !0, Q("template", P, w, V), P = w, z = x(w.template) ? w.template(V, g) : w.template, z = _(z), w.replace) {
                        if (k = w, z = qd.test(z) ? Rc(ed(z)) : [], e = z[0], 1 != z.length || 1 !== e.nodeType)throw Ed("tplrt", y, "");
                        W(j, V, e), ab = {$attr: {}}, z = E(e, [], ab);
                        var eb = a.splice($ + 1, a.length - ($ + 1));
                        L && K(z), a = a.concat(z).concat(eb), N(g, ab), ab = a.length
                    } else V.html(z);
                    if (w.templateUrl)T = !0, Q("template", P, w, V), P = w, w.replace && (k = w), s = O(a.splice($, a.length - $), V, g, j, S && Z, l, m, {
                        controllerDirectives: J,
                        newIsolateScopeDirective: L,
                        templateDirective: P,
                        nonTlbTranscludeDirective: R
                    }), ab = a.length; else if (w.compile)try {
                        C = w.compile(V, g, Z), x(C) ? o(null, C, bb, cb) : C && o(C.pre, C.post, bb, cb)
                    } catch (fb) {
                        i(fb, M(V))
                    }
                    w.terminal && (s.terminal = !0, D = Math.max(D, w.priority))
                }
                return s.scope = v && !0 === v.scope, s.transcludeOnThisElement = S, s.templateOnThisElement = T, s.transclude = Z, n.hasElementTranscludeDirective = U, s
            }

            function K(a) {
                for (var b = 0, c = a.length; c > b; b++)a[b] = n(a[b], {$$isolateScope: !0})
            }

            function L(b, d, f, h, j, k, l) {
                if (d === j)return null;
                if (j = null, e.hasOwnProperty(d)) {
                    var m;
                    d = a.get(d + g);
                    for (var o = 0, p = d.length; p > o; o++)try {
                        m = d[o], (h === c || h > m.priority) && -1 != m.restrict.indexOf(f) && (k && (m = n(m, {
                            $$start: k,
                            $$end: l
                        })), b.push(m), j = m)
                    } catch (q) {
                        i(q)
                    }
                }
                return j
            }

            function N(a, b) {
                var c = b.$attr, d = a.$attr, e = a.$$element;
                f(a, function (d, e) {
                    "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]))
                }), f(b, function (b, f) {
                    "class" == f ? (B(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
                })
            }

            function O(a, b, c, d, e, g, h, i) {
                var j, k, n = [], p = b[0], q = a.shift(), r = l({}, q, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: q
                }), s = x(q.templateUrl) ? q.templateUrl(b, c) : q.templateUrl;
                return b.empty(), m.get(w.getTrustedResourceUrl(s), {cache: o}).success(function (l) {
                    var m, o;
                    if (l = _(l), q.replace) {
                        if (l = qd.test(l) ? Rc(ed(l)) : [], m = l[0], 1 != l.length || 1 !== m.nodeType)throw Ed("tplrt", q.name, s);
                        l = {$attr: {}}, W(d, b, m);
                        var u = E(m, [], l);
                        t(q.scope) && K(u), a = u.concat(a), N(c, l)
                    } else m = p, b.html(l);
                    for (a.unshift(r), j = J(a, m, c, e, b, q, g, h, i), f(d, function (a, c) {
                        a == m && (d[c] = b[0])
                    }), k = C(b[0].childNodes, e); n.length;) {
                        l = n.shift(), o = n.shift();
                        var v = n.shift(), w = n.shift(), u = b[0];
                        if (o !== p) {
                            var x = o.className;
                            i.hasElementTranscludeDirective && q.replace || (u = db(m)), W(v, Rc(o), u), B(Rc(u), x)
                        }
                        o = j.transcludeOnThisElement ? D(l, j.transclude, w) : w, j(k, l, u, d, o)
                    }
                    n = null
                }).error(function (a, b, c, d) {
                    throw Ed("tpload", d.url)
                }), function (a, b, c, d, e) {
                    a = e, n ? (n.push(b), n.push(c), n.push(d), n.push(a)) : (j.transcludeOnThisElement && (a = D(b, j.transclude, e)), j(k, b, c, d, a))
                }
            }

            function P(a, b) {
                var c = b.priority - a.priority;
                return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
            }

            function Q(a, b, c, d) {
                if (b)throw Ed("multidir", b.name, c.name, a, M(d))
            }

            function R(a, b) {
                var c = d(b, !0);
                c && a.push({
                    priority: 0, compile: function (a) {
                        var b = a.parent().length;
                        return b && B(a.parent(), "ng-binding"), function (a, d) {
                            var e = d.parent(), f = e.data("$binding") || [];
                            f.push(c), e.data("$binding", f), b || B(e, "ng-binding"), a.$watch(c, function (a) {
                                d[0].nodeValue = a
                            })
                        }
                    }
                })
            }

            function S(a, b) {
                if ("srcdoc" == b)return w.HTML;
                var c = Uc(a);
                return "xlinkHref" == b || "FORM" == c && "action" == b || "IMG" != c && ("src" == b || "ngSrc" == b) ? w.RESOURCE_URL : void 0
            }

            function T(a, b, c, e) {
                var f = d(c, !0);
                if (f) {
                    if ("multiple" === e && "SELECT" === Uc(a))throw Ed("selmulti", M(a));
                    b.push({
                        priority: 100, compile: function () {
                            return {
                                pre: function (b, c, g) {
                                    if (c = g.$$observers || (g.$$observers = {}), k.test(e))throw Ed("nodomevents");
                                    (f = d(g[e], !0, S(a, e))) && (g[e] = f(b), (c[e] || (c[e] = [])).$$inter = !0, (g.$$observers && g.$$observers[e].$$scope || b).$watch(f, function (a, b) {
                                        "class" === e && a != b ? g.$updateClass(a, b) : g.$set(e, a)
                                    }))
                                }
                            }
                        }
                    })
                }
            }

            function W(a, c, d) {
                var e, f, g = c[0], h = c.length, i = g.parentNode;
                if (a)for (e = 0, f = a.length; f > e; e++)if (a[e] == g) {
                    a[e++] = d, f = e + h - 1;
                    for (var j = a.length; j > e; e++, f++)j > f ? a[e] = a[f] : delete a[e];
                    a.length -= h - 1;
                    break
                }
                for (i && i.replaceChild(d, g), a = b.createDocumentFragment(), a.appendChild(g), d[Rc.expando] = g[Rc.expando], g = 1, h = c.length; h > g; g++)i = c[g], Rc(i).remove(), a.appendChild(i), delete c[g];
                c[0] = d, c.length = 1
            }

            function X(a, b) {
                return l(function () {
                    return a.apply(null, arguments)
                }, a, b)
            }

            var Y = function (a, b) {
                this.$$element = a, this.$attr = b || {}
            };
            Y.prototype = {
                $normalize: Db, $addClass: function (a) {
                    a && 0 < a.length && y.addClass(this.$$element, a)
                }, $removeClass: function (a) {
                    a && 0 < a.length && y.removeClass(this.$$element, a)
                }, $updateClass: function (a, b) {
                    var c = Eb(a, b), d = Eb(b, a);
                    0 === c.length ? y.removeClass(this.$$element, d) : 0 === d.length ? y.addClass(this.$$element, c) : y.setClass(this.$$element, c, d)
                }, $set: function (a, b, d, e) {
                    var g = qb(this.$$element[0], a);
                    g && (this.$$element.prop(a, b), e = g), this[a] = b, e ? this.$attr[a] = e : (e = this.$attr[a]) || (this.$attr[a] = e = U(a, "-")), g = Uc(this.$$element), ("A" === g && "href" === a || "IMG" === g && "src" === a) && (this[a] = b = z(b, "src" === a)), !1 !== d && (null === b || b === c ? this.$$element.removeAttr(e) : this.$$element.attr(e, b)), (d = this.$$observers) && f(d[a], function (a) {
                        try {
                            a(b)
                        } catch (c) {
                            i(c)
                        }
                    })
                }, $observe: function (a, b) {
                    var c = this, d = c.$$observers || (c.$$observers = {}), e = d[a] || (d[a] = []);
                    return e.push(b), s.$evalAsync(function () {
                        e.$$inter || b(c[a])
                    }), b
                }
            };
            var Z = d.startSymbol(), $ = d.endSymbol(), _ = "{{" == Z || "}}" == $ ? p : function (a) {
                return a.replace(/\{\{/g, Z).replace(/}}/g, $)
            }, ab = /^ngAttr[A-Z]/;
            return A
        }]
    }

    function Db(a) {
        return ab(a.replace(Fd, ""))
    }

    function Eb(a, b) {
        var c = "", d = a.split(/\s+/), e = b.split(/\s+/), f = 0;
        a:for (; f < d.length; f++) {
            for (var g = d[f], h = 0; h < e.length; h++)if (g == e[h])continue a;
            c += (0 < c.length ? " " : "") + g
        }
        return c
    }

    function Fb() {
        var a = {}, b = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function (b, c) {
            X(b, "controller"), t(b) ? l(a, b) : a[b] = c
        }, this.$get = ["$injector", "$window", function (c, e) {
            return function (f, g) {
                var h, i, j;
                if (u(f) && (h = f.match(b), i = h[1], j = h[3], f = a.hasOwnProperty(i) ? a[i] : Y(g.$scope, i, !0) || Y(e, i, !0), W(f, i, !0)), h = c.instantiate(f, g), j) {
                    if (!g || "object" != typeof g.$scope)throw d("$controller")("noscp", i || f.name, j);
                    g.$scope[j] = h
                }
                return h
            }
        }]
    }

    function Gb() {
        this.$get = ["$window", function (a) {
            return Rc(a.document)
        }]
    }

    function Hb() {
        this.$get = ["$log", function (a) {
            return function () {
                a.error.apply(a, arguments)
            }
        }]
    }

    function Ib(a) {
        var b, c, d, e = {};
        return a ? (f(a.split("\n"), function (a) {
            d = a.indexOf(":"), b = Wc(ed(a.substr(0, d))), c = ed(a.substr(d + 1)), b && (e[b] = e[b] ? e[b] + ", " + c : c)
        }), e) : e
    }

    function Jb(a) {
        var b = t(a) ? a : c;
        return function (c) {
            return b || (b = Ib(a)), c ? b[Wc(c)] || null : b
        }
    }

    function Kb(a, b, c) {
        return x(c) ? c(a, b) : (f(c, function (c) {
            a = c(a, b)
        }), a)
    }

    function Lb() {
        var a = /^\s*(\[|\{[^\{])/, b = /[\}\]]\s*$/, d = /^\)\]\}',?\n/, e = {"Content-Type": "application/json;charset=utf-8"}, g = this.defaults = {
            transformResponse: [function (c) {
                return u(c) && (c = c.replace(d, ""), a.test(c) && b.test(c) && (c = K(c))), c
            }],
            transformRequest: [function (a) {
                return t(a) && "[object File]" !== _c.call(a) && "[object Blob]" !== _c.call(a) ? J(a) : a
            }],
            headers: {common: {Accept: "application/json, text/plain, */*"}, post: F(e), put: F(e), patch: F(e)},
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
        }, i = this.interceptors = [], j = this.responseInterceptors = [];
        this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function (a, b, d, e, k, m) {
            function n(a) {
                function b(a) {
                    var b = l({}, a, {data: Kb(a.data, a.headers, d.transformResponse)});
                    return 200 <= a.status && 300 > a.status ? b : k.reject(b)
                }

                var d = {
                    method: "get",
                    transformRequest: g.transformRequest,
                    transformResponse: g.transformResponse
                }, e = function (a) {
                    var b, c, d = g.headers, e = l({}, a.headers), d = l({}, d.common, d[Wc(a.method)]);
                    a:for (b in d) {
                        a = Wc(b);
                        for (c in e)if (Wc(c) === a)continue a;
                        e[b] = d[b]
                    }
                    return function (a) {
                        var b;
                        f(a, function (c, d) {
                            x(c) && (b = c(), null != b ? a[d] = b : delete a[d])
                        })
                    }(e), e
                }(a);
                l(d, a), d.headers = e, d.method = Yc(d.method);
                var h = [function (a) {
                    e = a.headers;
                    var c = Kb(a.data, Jb(e), a.transformRequest);
                    return r(c) && f(e, function (a, b) {
                        "content-type" === Wc(b) && delete e[b]
                    }), r(a.withCredentials) && !r(g.withCredentials) && (a.withCredentials = g.withCredentials), o(a, c, e).then(b, b)
                }, c], i = k.when(d);
                for (f(v, function (a) {
                    (a.request || a.requestError) && h.unshift(a.request, a.requestError), (a.response || a.responseError) && h.push(a.response, a.responseError)
                }); h.length;) {
                    a = h.shift();
                    var j = h.shift(), i = i.then(a, j)
                }
                return i.success = function (a) {
                    return i.then(function (b) {
                        a(b.data, b.status, b.headers, d)
                    }), i
                }, i.error = function (a) {
                    return i.then(null, function (b) {
                        a(b.data, b.status, b.headers, d)
                    }), i
                }, i
            }

            function o(d, f, h) {
                function i(a, b, c, d) {
                    m && (a >= 200 && 300 > a ? m.put(w, [a, b, Ib(c), d]) : m.remove(w)), j(b, a, c, d), e.$$phase || e.$apply()
                }

                function j(a, b, c, e) {
                    b = Math.max(b, 0), (b >= 200 && 300 > b ? u.resolve : u.reject)({
                        data: a,
                        status: b,
                        headers: Jb(c),
                        config: d,
                        statusText: e
                    })
                }

                function l() {
                    var a = C(n.pendingRequests, d);
                    -1 !== a && n.pendingRequests.splice(a, 1)
                }

                var m, o, u = k.defer(), v = u.promise, w = p(d.url, d.params);
                if (n.pendingRequests.push(d), v.then(l, l), !d.cache && !g.cache || !1 === d.cache || "GET" !== d.method && "JSONP" !== d.method || (m = t(d.cache) ? d.cache : t(g.cache) ? g.cache : q), m)if (o = m.get(w), s(o)) {
                    if (o && x(o.then))return o.then(l, l), o;
                    dd(o) ? j(o[1], o[0], F(o[2]), o[3]) : j(o, 200, {}, "OK")
                } else m.put(w, v);
                return r(o) && ((o = vc(d.url) ? b.cookies()[d.xsrfCookieName || g.xsrfCookieName] : c) && (h[d.xsrfHeaderName || g.xsrfHeaderName] = o), a(d.method, w, f, i, h, d.timeout, d.withCredentials, d.responseType)), v
            }

            function p(a, b) {
                if (!b)return a;
                var c = [];
                return h(b, function (a, b) {
                    null === a || r(a) || (dd(a) || (a = [a]), f(a, function (a) {
                        t(a) && (a = w(a) ? a.toISOString() : J(a)), c.push(R(b) + "=" + R(a))
                    }))
                }), 0 < c.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&")), a
            }

            var q = d("$http"), v = [];
            return f(i, function (a) {
                v.unshift(u(a) ? m.get(a) : m.invoke(a))
            }), f(j, function (a, b) {
                var c = u(a) ? m.get(a) : m.invoke(a);
                v.splice(b, 0, {
                    response: function (a) {
                        return c(k.when(a))
                    }, responseError: function (a) {
                        return c(k.reject(a))
                    }
                })
            }), n.pendingRequests = [], function () {
                f(arguments, function (a) {
                    n[a] = function (b, c) {
                        return n(l(c || {}, {method: a, url: b}))
                    }
                })
            }("get", "delete", "head", "jsonp"), function () {
                f(arguments, function (a) {
                    n[a] = function (b, c, d) {
                        return n(l(d || {}, {method: a, url: b, data: c}))
                    }
                })
            }("post", "put"), n.defaults = g, n
        }]
    }

    function Mb(b) {
        if (8 >= Qc && (!b.match(/^(get|post|head|put|delete|options)$/i) || !a.XMLHttpRequest))return new a.ActiveXObject("Microsoft.XMLHTTP");
        if (a.XMLHttpRequest)return new a.XMLHttpRequest;
        throw d("$httpBackend")("noxhr")
    }

    function Nb() {
        this.$get = ["$browser", "$window", "$document", function (a, b, c) {
            return Ob(a, Mb, a.defer, b.angular.callbacks, c[0])
        }]
    }

    function Ob(a, b, c, d, e) {
        function g(a, b, c) {
            var f = e.createElement("script"), g = null;
            return f.type = "text/javascript", f.src = a, f.async = !0, g = function (a) {
                ld(f, "load", g), ld(f, "error", g), e.body.removeChild(f), f = null;
                var h = -1, i = "unknown";
                a && ("load" !== a.type || d[b].called || (a = {type: "error"}), i = a.type, h = "error" === a.type ? 404 : 200), c && c(h, i)
            }, kd(f, "load", g), kd(f, "error", g), 8 >= Qc && (f.onreadystatechange = function () {
                u(f.readyState) && /loaded|complete/.test(f.readyState) && (f.onreadystatechange = null, g({type: "load"}))
            }), e.body.appendChild(f), g
        }

        var h = -1;
        return function (e, i, j, k, l, m, n, p) {
            function q() {
                t = h, v && v(), w && w.abort()
            }

            function r(b, d, e, f, g) {
                z && c.cancel(z), v = w = null, 0 === d && (d = e ? 200 : "file" == uc(i).protocol ? 404 : 0), b(1223 === d ? 204 : d, e, f, g || ""), a.$$completeOutstandingRequest(o)
            }

            var t;
            if (a.$$incOutstandingRequestCount(), i = i || a.url(), "jsonp" == Wc(e)) {
                var u = "_" + (d.counter++).toString(36);
                d[u] = function (a) {
                    d[u].data = a, d[u].called = !0
                };
                var v = g(i.replace("JSON_CALLBACK", "angular.callbacks." + u), u, function (a, b) {
                    r(k, a, d[u].data, "", b), d[u] = o
                })
            } else {
                var w = b(e);
                if (w.open(e, i, !0), f(l, function (a, b) {
                        s(a) && w.setRequestHeader(b, a)
                    }), w.onreadystatechange = function () {
                        if (w && 4 == w.readyState) {
                            var a = null, b = null, c = "";
                            t !== h && (a = w.getAllResponseHeaders(), b = "response"in w ? w.response : w.responseText), t === h && 10 > Qc || (c = w.statusText), r(k, t || w.status, b, a, c)
                        }
                    }, n && (w.withCredentials = !0), p)try {
                    w.responseType = p
                } catch (y) {
                    if ("json" !== p)throw y
                }
                w.send(j || null)
            }
            if (m > 0)var z = c(q, m); else m && x(m.then) && m.then(q)
        }
    }

    function Pb() {
        var a = "{{", b = "}}";
        this.startSymbol = function (b) {
            return b ? (a = b, this) : a
        }, this.endSymbol = function (a) {
            return a ? (b = a, this) : b
        }, this.$get = ["$parse", "$exceptionHandler", "$sce", function (c, d, e) {
            function f(f, i, j) {
                for (var k, l, m = 0, n = [], o = f.length, p = !1, q = []; o > m;)-1 != (k = f.indexOf(a, m)) && -1 != (l = f.indexOf(b, k + g)) ? (m != k && n.push(f.substring(m, k)), n.push(m = c(p = f.substring(k + g, l))), m.exp = p, m = l + h, p = !0) : (m != o && n.push(f.substring(m)), m = o);
                if ((o = n.length) || (n.push(""), o = 1), j && 1 < n.length)throw Gd("noconcat", f);
                return !i || p ? (q.length = o, m = function (a) {
                    try {
                        for (var b, c = 0, g = o; g > c; c++) {
                            if ("function" == typeof(b = n[c]))if (b = b(a), b = j ? e.getTrusted(j, b) : e.valueOf(b), null == b)b = ""; else switch (typeof b) {
                                case"string":
                                    break;
                                case"number":
                                    b = "" + b;
                                    break;
                                default:
                                    b = J(b)
                            }
                            q[c] = b
                        }
                        return q.join("")
                    } catch (h) {
                        a = Gd("interr", f, h.toString()), d(a)
                    }
                }, m.exp = f, m.parts = n, m) : void 0
            }

            var g = a.length, h = b.length;
            return f.startSymbol = function () {
                return a
            }, f.endSymbol = function () {
                return b
            }, f
        }]
    }

    function Qb() {
        this.$get = ["$rootScope", "$window", "$q", function (a, b, c) {
            function d(d, f, g, h) {
                var i = b.setInterval, j = b.clearInterval, k = c.defer(), l = k.promise, m = 0, n = s(h) && !h;
                return g = s(g) ? g : 0, l.then(null, null, d), l.$$intervalId = i(function () {
                    k.notify(m++), g > 0 && m >= g && (k.resolve(m), j(l.$$intervalId), delete e[l.$$intervalId]), n || a.$apply()
                }, f), e[l.$$intervalId] = k, l
            }

            var e = {};
            return d.cancel = function (a) {
                return a && a.$$intervalId in e ? (e[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId), delete e[a.$$intervalId], !0) : !1
            }, d
        }]
    }

    function Rb() {
        this.$get = function () {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    }],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January February March April May June July August September October November December".split(" "),
                    SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                    AMPMS: ["AM", "PM"],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function (a) {
                    return 1 === a ? "one" : "other"
                }
            }
        }
    }

    function Sb(a) {
        a = a.split("/");
        for (var b = a.length; b--;)a[b] = Q(a[b]);
        return a.join("/")
    }

    function Tb(a, b, c) {
        a = uc(a, c), b.$$protocol = a.protocol, b.$$host = a.hostname, b.$$port = m(a.port) || Id[a.protocol] || null
    }

    function Ub(a, b, c) {
        var d = "/" !== a.charAt(0);
        d && (a = "/" + a), a = uc(a, c), b.$$path = decodeURIComponent(d && "/" === a.pathname.charAt(0) ? a.pathname.substring(1) : a.pathname), b.$$search = O(a.search), b.$$hash = decodeURIComponent(a.hash), b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path)
    }

    function Vb(a, b) {
        return 0 === b.indexOf(a) ? b.substr(a.length) : void 0
    }

    function Wb(a) {
        var b = a.indexOf("#");
        return -1 == b ? a : a.substr(0, b)
    }

    function Xb(a) {
        return a.substr(0, Wb(a).lastIndexOf("/") + 1)
    }

    function Yb(a, b) {
        this.$$html5 = !0, b = b || "";
        var d = Xb(a);
        Tb(a, this, a), this.$$parse = function (b) {
            var c = Vb(d, b);
            if (!u(c))throw Jd("ipthprfx", b, d);
            Ub(c, this, a), this.$$path || (this.$$path = "/"), this.$$compose()
        }, this.$$compose = function () {
            var a = P(this.$$search), b = this.$$hash ? "#" + Q(this.$$hash) : "";
            this.$$url = Sb(this.$$path) + (a ? "?" + a : "") + b, this.$$absUrl = d + this.$$url.substr(1)
        }, this.$$rewrite = function (e) {
            var f;
            return (f = Vb(a, e)) !== c ? (e = f, (f = Vb(b, f)) !== c ? d + (Vb("/", f) || f) : a + e) : (f = Vb(d, e)) !== c ? d + f : d == e + "/" ? d : void 0
        }
    }

    function Zb(a, b) {
        var c = Xb(a);
        Tb(a, this, a), this.$$parse = function (d) {
            var e = Vb(a, d) || Vb(c, d), e = "#" == e.charAt(0) ? Vb(b, e) : this.$$html5 ? e : "";
            if (!u(e))throw Jd("ihshprfx", d, b);
            Ub(e, this, a), d = this.$$path;
            var f = /^\/[A-Z]:(\/.*)/;
            0 === e.indexOf(a) && (e = e.replace(a, "")), f.exec(e) || (d = (e = f.exec(d)) ? e[1] : d), this.$$path = d, this.$$compose()
        }, this.$$compose = function () {
            var c = P(this.$$search), d = this.$$hash ? "#" + Q(this.$$hash) : "";
            this.$$url = Sb(this.$$path) + (c ? "?" + c : "") + d, this.$$absUrl = a + (this.$$url ? b + this.$$url : "")
        }, this.$$rewrite = function (b) {
            return Wb(a) == Wb(b) ? b : void 0
        }
    }

    function $b(a, b) {
        this.$$html5 = !0, Zb.apply(this, arguments);
        var c = Xb(a);
        this.$$rewrite = function (d) {
            var e;
            return a == Wb(d) ? d : (e = Vb(c, d)) ? a + b + e : c === d + "/" ? c : void 0
        }, this.$$compose = function () {
            var c = P(this.$$search), d = this.$$hash ? "#" + Q(this.$$hash) : "";
            this.$$url = Sb(this.$$path) + (c ? "?" + c : "") + d, this.$$absUrl = a + b + this.$$url
        }
    }

    function _b(a) {
        return function () {
            return this[a]
        }
    }

    function ac(a, b) {
        return function (c) {
            return r(c) ? this[a] : (this[a] = b(c), this.$$compose(), this)
        }
    }

    function bc() {
        var b = "", c = !1;
        this.hashPrefix = function (a) {
            return s(a) ? (b = a, this) : b
        }, this.html5Mode = function (a) {
            return s(a) ? (c = a, this) : c
        }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function (d, e, f, g) {
            function h(a) {
                d.$broadcast("$locationChangeSuccess", i.absUrl(), a)
            }

            var i, j, k, l = e.baseHref(), m = e.url();
            c ? (k = m.substring(0, m.indexOf("/", m.indexOf("//") + 2)) + (l || "/"), j = f.history ? Yb : $b) : (k = Wb(m), j = Zb), i = new j(k, "#" + b), i.$$parse(i.$$rewrite(m));
            var n = /^\s*(javascript|mailto):/i;
            g.on("click", function (c) {
                if (!c.ctrlKey && !c.metaKey && 2 != c.which) {
                    for (var f = Rc(c.target); "a" !== Wc(f[0].nodeName);)if (f[0] === g[0] || !(f = f.parent())[0])return;
                    var h = f.prop("href");
                    if (t(h) && "[object SVGAnimatedString]" === h.toString() && (h = uc(h.animVal).href), !n.test(h)) {
                        if (j === $b) {
                            var l = f.attr("href") || f.attr("xlink:href");
                            if (l && 0 > l.indexOf("://"))if (h = "#" + b, "/" == l[0])h = k + h + l; else if ("#" == l[0])h = k + h + (i.path() || "/") + l; else {
                                var m = i.path().split("/"), l = l.split("/");
                                2 !== m.length || m[1] || (m.length = 1);
                                for (var o = 0; o < l.length; o++)"." != l[o] && (".." == l[o] ? m.pop() : l[o].length && m.push(l[o]));
                                h = k + h + m.join("/")
                            }
                        }
                        m = i.$$rewrite(h), h && !f.attr("target") && m && !c.isDefaultPrevented() && (c.preventDefault(), m != e.url() && (i.$$parse(m), d.$apply(), a.angular["ff-684208-preventDefault"] = !0))
                    }
                }
            }), i.absUrl() != m && e.url(i.absUrl(), !0), e.onUrlChange(function (a) {
                i.absUrl() != a && (d.$evalAsync(function () {
                    var b = i.absUrl();
                    i.$$parse(a), d.$broadcast("$locationChangeStart", a, b).defaultPrevented ? (i.$$parse(b), e.url(b)) : h(b)
                }), d.$$phase || d.$digest())
            });
            var o = 0;
            return d.$watch(function () {
                var a = e.url(), b = i.$$replace;
                return o && a == i.absUrl() || (o++, d.$evalAsync(function () {
                    d.$broadcast("$locationChangeStart", i.absUrl(), a).defaultPrevented ? i.$$parse(a) : (e.url(i.absUrl(), b), h(a))
                })), i.$$replace = !1, o
            }), i
        }]
    }

    function cc() {
        var a = !0, b = this;
        this.debugEnabled = function (b) {
            return s(b) ? (a = b, this) : a
        }, this.$get = ["$window", function (c) {
            function d(a) {
                return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), a
            }

            function e(a) {
                var b = c.console || {}, e = b[a] || b.log || o;
                a = !1;
                try {
                    a = !!e.apply
                } catch (g) {
                }
                return a ? function () {
                    var a = [];
                    return f(arguments, function (b) {
                        a.push(d(b))
                    }), e.apply(b, a)
                } : function (a, b) {
                    e(a, null == b ? "" : b)
                }
            }

            return {
                log: e("log"), info: e("info"), warn: e("warn"), error: e("error"), debug: function () {
                    var c = e("debug");
                    return function () {
                        a && c.apply(b, arguments)
                    }
                }()
            }
        }]
    }

    function dc(a, b) {
        if ("__defineGetter__" === a || "__defineSetter__" === a || "__lookupGetter__" === a || "__lookupSetter__" === a || "__proto__" === a)throw Ld("isecfld", b);
        return a
    }

    function ec(a, b) {
        if (a) {
            if (a.constructor === a)throw Ld("isecfn", b);
            if (a.document && a.location && a.alert && a.setInterval)throw Ld("isecwindow", b);
            if (a.children && (a.nodeName || a.prop && a.attr && a.find))throw Ld("isecdom", b);
            if (a === Object)throw Ld("isecobj", b)
        }
        return a
    }

    function fc(a, b, d, e, f) {
        ec(a, e), f = f || {}, b = b.split(".");
        for (var g, h = 0; 1 < b.length; h++) {
            g = dc(b.shift(), e);
            var i = ec(a[g], e);
            i || (i = {}, a[g] = i), a = i, a.then && f.unwrapPromises && (Kd(e), "$$v"in a || function (a) {
                a.then(function (b) {
                    a.$$v = b
                })
            }(a), a.$$v === c && (a.$$v = {}), a = a.$$v)
        }
        return g = dc(b.shift(), e), ec(a[g], e), a[g] = d
    }

    function gc(a, b, d, e, f, g, h) {
        return dc(a, g), dc(b, g), dc(d, g), dc(e, g), dc(f, g), h.unwrapPromises ? function (h, i) {
            var j, k = i && i.hasOwnProperty(a) ? i : h;
            return null == k ? k : ((k = k[a]) && k.then && (Kd(g), "$$v"in k || (j = k, j.$$v = c, j.then(function (a) {
                j.$$v = a
            })), k = k.$$v), b ? null == k ? c : ((k = k[b]) && k.then && (Kd(g), "$$v"in k || (j = k, j.$$v = c, j.then(function (a) {
                j.$$v = a
            })), k = k.$$v), d ? null == k ? c : ((k = k[d]) && k.then && (Kd(g), "$$v"in k || (j = k, j.$$v = c, j.then(function (a) {
                j.$$v = a
            })), k = k.$$v), e ? null == k ? c : ((k = k[e]) && k.then && (Kd(g), "$$v"in k || (j = k, j.$$v = c, j.then(function (a) {
                j.$$v = a
            })), k = k.$$v), f ? null == k ? c : ((k = k[f]) && k.then && (Kd(g), "$$v"in k || (j = k, j.$$v = c, j.then(function (a) {
                j.$$v = a
            })), k = k.$$v), k) : k) : k) : k) : k)
        } : function (g, h) {
            var i = h && h.hasOwnProperty(a) ? h : g;
            return null == i ? i : (i = i[a], b ? null == i ? c : (i = i[b], d ? null == i ? c : (i = i[d], e ? null == i ? c : (i = i[e], f ? null == i ? c : i = i[f] : i) : i) : i) : i)
        }
    }

    function hc(a, b, d) {
        if (Ud.hasOwnProperty(a))return Ud[a];
        var e, g = a.split("."), h = g.length;
        if (b.csp)e = 6 > h ? gc(g[0], g[1], g[2], g[3], g[4], d, b) : function (a, e) {
            var f, i = 0;
            do f = gc(g[i++], g[i++], g[i++], g[i++], g[i++], d, b)(a, e), e = c, a = f; while (h > i);
            return f
        }; else {
            var i = "var p;\n";
            f(g, function (a, c) {
                dc(a, d), i += "if(s == null) return undefined;\ns=" + (c ? "s" : '((k&&k.hasOwnProperty("' + a + '"))?k:s)') + '["' + a + '"];\n' + (b.unwrapPromises ? 'if (s && s.then) {\n pw("' + d.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : "")
            });
            var i = i + "return s;", j = new Function("s", "k", "pw", i);
            j.toString = q(i), e = b.unwrapPromises ? function (a, b) {
                return j(a, b, Kd)
            } : j
        }
        return "hasOwnProperty" !== a && (Ud[a] = e), e
    }

    function ic() {
        var a = {}, b = {csp: !1, unwrapPromises: !1, logPromiseWarnings: !0};
        this.unwrapPromises = function (a) {
            return s(a) ? (b.unwrapPromises = !!a, this) : b.unwrapPromises
        }, this.logPromiseWarnings = function (a) {
            return s(a) ? (b.logPromiseWarnings = a, this) : b.logPromiseWarnings
        }, this.$get = ["$filter", "$sniffer", "$log", function (c, d, e) {
            return b.csp = d.csp, Kd = function (a) {
                b.logPromiseWarnings && !Md.hasOwnProperty(a) && (Md[a] = !0, e.warn("[$parse] Promise found in the expression `" + a + "`. Automatic unwrapping of promises in Angular expressions is deprecated."))
            }, function (d) {
                var e;
                switch (typeof d) {
                    case"string":
                        return a.hasOwnProperty(d) ? a[d] : (e = new Sd(b), e = new Td(e, c, b).parse(d), "hasOwnProperty" !== d && (a[d] = e), e);
                    case"function":
                        return d;
                    default:
                        return o
                }
            }
        }]
    }

    function jc() {
        this.$get = ["$rootScope", "$exceptionHandler", function (a, b) {
            return kc(function (b) {
                a.$evalAsync(b)
            }, b)
        }]
    }

    function kc(a, b) {
        function d(a) {
            return a
        }

        function e(a) {
            return i(a)
        }

        var g = function () {
            var f, i, k = [];
            return i = {
                resolve: function (b) {
                    if (k) {
                        var d = k;
                        k = c, f = h(b), d.length && a(function () {
                            for (var a, b = 0, c = d.length; c > b; b++)a = d[b], f.then(a[0], a[1], a[2])
                        })
                    }
                }, reject: function (a) {
                    i.resolve(j(a))
                }, notify: function (b) {
                    if (k) {
                        var c = k;
                        k.length && a(function () {
                            for (var a, d = 0, e = c.length; e > d; d++)a = c[d], a[2](b)
                        })
                    }
                }, promise: {
                    then: function (a, c, h) {
                        var i = g(), j = function (c) {
                            try {
                                i.resolve((x(a) ? a : d)(c))
                            } catch (e) {
                                i.reject(e), b(e)
                            }
                        }, l = function (a) {
                            try {
                                i.resolve((x(c) ? c : e)(a))
                            } catch (d) {
                                i.reject(d), b(d)
                            }
                        }, m = function (a) {
                            try {
                                i.notify((x(h) ? h : d)(a))
                            } catch (c) {
                                b(c)
                            }
                        };
                        return k ? k.push([j, l, m]) : f.then(j, l, m), i.promise
                    }, "catch": function (a) {
                        return this.then(null, a)
                    }, "finally": function (a) {
                        function b(a, b) {
                            var c = g();
                            return b ? c.resolve(a) : c.reject(a), c.promise
                        }

                        function c(c, e) {
                            var f = null;
                            try {
                                f = (a || d)()
                            } catch (g) {
                                return b(g, !1)
                            }
                            return f && x(f.then) ? f.then(function () {
                                return b(c, e)
                            }, function (a) {
                                return b(a, !1)
                            }) : b(c, e)
                        }

                        return this.then(function (a) {
                            return c(a, !0)
                        }, function (a) {
                            return c(a, !1)
                        })
                    }
                }
            }
        }, h = function (b) {
            return b && x(b.then) ? b : {
                then: function (c) {
                    var d = g();
                    return a(function () {
                        d.resolve(c(b))
                    }), d.promise
                }
            }
        }, i = function (a) {
            var b = g();
            return b.reject(a), b.promise
        }, j = function (c) {
            return {
                then: function (d, f) {
                    var h = g();
                    return a(function () {
                        try {
                            h.resolve((x(f) ? f : e)(c))
                        } catch (a) {
                            h.reject(a), b(a)
                        }
                    }), h.promise
                }
            }
        };
        return {
            defer: g, reject: i, when: function (c, f, j, k) {
                var l, m = g(), n = function (a) {
                    try {
                        return (x(f) ? f : d)(a)
                    } catch (c) {
                        return b(c), i(c)
                    }
                }, o = function (a) {
                    try {
                        return (x(j) ? j : e)(a)
                    } catch (c) {
                        return b(c), i(c)
                    }
                }, p = function (a) {
                    try {
                        return (x(k) ? k : d)(a)
                    } catch (c) {
                        b(c)
                    }
                };
                return a(function () {
                    h(c).then(function (a) {
                        l || (l = !0, m.resolve(h(a).then(n, o, p)))
                    }, function (a) {
                        l || (l = !0, m.resolve(o(a)))
                    }, function (a) {
                        l || m.notify(p(a))
                    })
                }), m.promise
            }, all: function (a) {
                var b = g(), c = 0, d = dd(a) ? [] : {};
                return f(a, function (a, e) {
                    c++, h(a).then(function (a) {
                        d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d))
                    }, function (a) {
                        d.hasOwnProperty(e) || b.reject(a)
                    })
                }), 0 === c && b.resolve(d), b.promise
            }
        }
    }

    function lc() {
        this.$get = ["$window", "$timeout", function (a, b) {
            var c = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame, d = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.webkitCancelRequestAnimationFrame, e = !!c, f = e ? function (a) {
                var b = c(a);
                return function () {
                    d(b)
                }
            } : function (a) {
                var c = b(a, 16.66, !1);
                return function () {
                    b.cancel(c)
                }
            };
            return f.supported = e, f
        }]
    }

    function mc() {
        var a = 10, b = d("$rootScope"), c = null;
        this.digestTtl = function (b) {
            return arguments.length && (a = b), a
        }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function (d, g, h, i) {
            function k() {
                this.$id = j(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this["this"] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$postDigestQueue = [], this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = {}
            }

            function l(a) {
                if (q.$$phase)throw b("inprog", q.$$phase);
                q.$$phase = a
            }

            function m(a, b) {
                var c = h(a);
                return W(c, b), c
            }

            function n(a, b, c) {
                do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c];
                while (a = a.$parent)
            }

            function p() {
            }

            k.prototype = {
                constructor: k, $new: function (a) {
                    return a ? (a = new k, a.$root = this.$root, a.$$asyncQueue = this.$$asyncQueue, a.$$postDigestQueue = this.$$postDigestQueue) : (this.$$childScopeClass || (this.$$childScopeClass = function () {
                        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$id = j(), this.$$childScopeClass = null
                    }, this.$$childScopeClass.prototype = this), a = new this.$$childScopeClass), a["this"] = a, a.$parent = this, a.$$prevSibling = this.$$childTail, this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = a : this.$$childHead = this.$$childTail = a, a
                }, $watch: function (a, b, d) {
                    var e = m(a, "watch"), f = this.$$watchers, g = {fn: b, last: p, get: e, exp: a, eq: !!d};
                    if (c = null, !x(b)) {
                        var h = m(b || o, "listener");
                        g.fn = function (a, b, c) {
                            h(c)
                        }
                    }
                    if ("string" == typeof a && e.constant) {
                        var i = g.fn;
                        g.fn = function (a, b, c) {
                            i.call(this, a, b, c), D(f, g)
                        }
                    }
                    return f || (f = this.$$watchers = []), f.unshift(g), function () {
                        D(f, g), c = null
                    }
                }, $watchCollection: function (a, b) {
                    var c, d, f, g = this, i = 1 < b.length, j = 0, k = h(a), l = [], m = {}, n = !0, o = 0;
                    return this.$watch(function () {
                        c = k(g);
                        var a, b, f;
                        if (t(c))if (e(c))for (d !== l && (d = l, o = d.length = 0, j++), a = c.length, o !== a && (j++, d.length = o = a), b = 0; a > b; b++)f = d[b] !== d[b] && c[b] !== c[b], f || d[b] === c[b] || (j++, d[b] = c[b]); else {
                            d !== m && (d = m = {}, o = 0, j++), a = 0;
                            for (b in c)c.hasOwnProperty(b) && (a++, d.hasOwnProperty(b) ? (f = d[b] !== d[b] && c[b] !== c[b], f || d[b] === c[b] || (j++, d[b] = c[b])) : (o++, d[b] = c[b], j++));
                            if (o > a)for (b in j++, d)d.hasOwnProperty(b) && !c.hasOwnProperty(b) && (o--, delete d[b])
                        } else d !== c && (d = c, j++);
                        return j
                    }, function () {
                        if (n ? (n = !1, b(c, c, g)) : b(c, f, g), i)if (t(c))if (e(c)) {
                            f = Array(c.length);
                            for (var a = 0; a < c.length; a++)f[a] = c[a]
                        } else for (a in f = {}, c)Xc.call(c, a) && (f[a] = c[a]); else f = c
                    })
                }, $digest: function () {
                    var d, e, f, h, j, k, m, n, o, r, s = this.$$asyncQueue, t = this.$$postDigestQueue, u = a, v = [];
                    l("$digest"), i.$$checkUrlChange(), c = null;
                    do {
                        for (k = !1, m = this; s.length;) {
                            try {
                                r = s.shift(), r.scope.$eval(r.expression)
                            } catch (w) {
                                q.$$phase = null, g(w)
                            }
                            c = null
                        }
                        a:do {
                            if (h = m.$$watchers)for (j = h.length; j--;)try {
                                if (d = h[j])if ((e = d.get(m)) === (f = d.last) || (d.eq ? G(e, f) : "number" == typeof e && "number" == typeof f && isNaN(e) && isNaN(f))) {
                                    if (d === c) {
                                        k = !1;
                                        break a
                                    }
                                } else k = !0, c = d, d.last = d.eq ? E(e, null) : e, d.fn(e, f === p ? e : f, m), 5 > u && (n = 4 - u, v[n] || (v[n] = []), o = x(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp, o += "; newVal: " + J(e) + "; oldVal: " + J(f), v[n].push(o))
                            } catch (y) {
                                q.$$phase = null, g(y)
                            }
                            if (!(h = m.$$childHead || m !== this && m.$$nextSibling))for (; m !== this && !(h = m.$$nextSibling);)m = m.$parent
                        } while (m = h);
                        if ((k || s.length) && !u--)throw q.$$phase = null, b("infdig", a, J(v))
                    } while (k || s.length);
                    for (q.$$phase = null; t.length;)try {
                        t.shift()()
                    } catch (z) {
                        g(z)
                    }
                }, $destroy: function () {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        this.$broadcast("$destroy"), this.$$destroyed = !0, this !== q && (f(this.$$listenerCount, H(null, n, this)), a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], this.$destroy = this.$digest = this.$apply = o, this.$on = this.$watch = function () {
                            return o
                        })
                    }
                }, $eval: function (a, b) {
                    return h(a)(this, b)
                }, $evalAsync: function (a) {
                    q.$$phase || q.$$asyncQueue.length || i.defer(function () {
                        q.$$asyncQueue.length && q.$digest()
                    }), this.$$asyncQueue.push({scope: this, expression: a})
                }, $$postDigest: function (a) {
                    this.$$postDigestQueue.push(a)
                }, $apply: function (a) {
                    try {
                        return l("$apply"), this.$eval(a)
                    } catch (b) {
                        g(b)
                    } finally {
                        q.$$phase = null;
                        try {
                            q.$digest()
                        } catch (c) {
                            throw g(c), c
                        }
                    }
                }, $on: function (a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []), c.push(b);
                    var d = this;
                    do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
                    var e = this;
                    return function () {
                        c[C(c, b)] = null, n(e, 1, a)
                    }
                }, $emit: function (a) {
                    var b, c, d, e = [], f = this, h = !1, i = {
                        name: a, targetScope: f, stopPropagation: function () {
                            h = !0
                        }, preventDefault: function () {
                            i.defaultPrevented = !0
                        }, defaultPrevented: !1
                    }, j = [i].concat(Zc.call(arguments, 1));
                    do {
                        for (b = f.$$listeners[a] || e, i.currentScope = f, c = 0, d = b.length; d > c; c++)if (b[c])try {
                            b[c].apply(null, j)
                        } catch (k) {
                            g(k)
                        } else b.splice(c, 1), c--, d--;
                        if (h)break;
                        f = f.$parent
                    } while (f);
                    return i
                }, $broadcast: function (a) {
                    for (var b, c, d = this, e = this, f = {
                        name: a, targetScope: this, preventDefault: function () {
                            f.defaultPrevented = !0
                        }, defaultPrevented: !1
                    }, h = [f].concat(Zc.call(arguments, 1)); d = e;) {
                        for (f.currentScope = d, e = d.$$listeners[a] || [], b = 0, c = e.length; c > b; b++)if (e[b])try {
                            e[b].apply(null, h)
                        } catch (i) {
                            g(i)
                        } else e.splice(b, 1), b--, c--;
                        if (!(e = d.$$listenerCount[a] && d.$$childHead || d !== this && d.$$nextSibling))for (; d !== this && !(e = d.$$nextSibling);)d = d.$parent
                    }
                    return f
                }
            };
            var q = new k;
            return q
        }]
    }

    function nc() {
        var a = /^\s*(https?|ftp|mailto|tel|file):/, b = /^\s*((https?|ftp|file):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function (b) {
            return s(b) ? (a = b, this) : a
        }, this.imgSrcSanitizationWhitelist = function (a) {
            return s(a) ? (b = a, this) : b
        }, this.$get = function () {
            return function (c, d) {
                var e, f = d ? b : a;
                return Qc && !(Qc >= 8) || (e = uc(c).href, "" === e || e.match(f)) ? c : "unsafe:" + e
            }
        }
    }

    function oc(a) {
        if ("self" === a)return a;
        if (u(a)) {
            if (-1 < a.indexOf("***"))throw Vd("iwcard", a);
            return a = a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08").replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), RegExp("^" + a + "$")
        }
        if (y(a))return RegExp("^" + a.source + "$");
        throw Vd("imatcher")
    }

    function pc(a) {
        var b = [];
        return s(a) && f(a, function (a) {
            b.push(oc(a))
        }), b
    }

    function qc() {
        this.SCE_CONTEXTS = Wd;
        var a = ["self"], b = [];
        this.resourceUrlWhitelist = function (b) {
            return arguments.length && (a = pc(b)), a
        }, this.resourceUrlBlacklist = function (a) {
            return arguments.length && (b = pc(a)), b
        }, this.$get = ["$injector", function (d) {
            function e(a) {
                var b = function (a) {
                    this.$$unwrapTrustedValue = function () {
                        return a
                    }
                };
                return a && (b.prototype = new a), b.prototype.valueOf = function () {
                    return this.$$unwrapTrustedValue()
                }, b.prototype.toString = function () {
                    return this.$$unwrapTrustedValue().toString()
                }, b
            }

            var f = function () {
                throw Vd("unsafe")
            };
            d.has("$sanitize") && (f = d.get("$sanitize"));
            var g = e(), h = {};
            return h[Wd.HTML] = e(g), h[Wd.CSS] = e(g), h[Wd.URL] = e(g), h[Wd.JS] = e(g), h[Wd.RESOURCE_URL] = e(h[Wd.URL]), {
                trustAs: function (a, b) {
                    var d = h.hasOwnProperty(a) ? h[a] : null;
                    if (!d)throw Vd("icontext", a, b);
                    if (null === b || b === c || "" === b)return b;
                    if ("string" != typeof b)throw Vd("itype", a);
                    return new d(b)
                }, getTrusted: function (d, e) {
                    if (null === e || e === c || "" === e)return e;
                    var g = h.hasOwnProperty(d) ? h[d] : null;
                    if (g && e instanceof g)return e.$$unwrapTrustedValue();
                    if (d === Wd.RESOURCE_URL) {
                        var i, j, g = uc(e.toString()), k = !1;
                        for (i = 0, j = a.length; j > i; i++)if ("self" === a[i] ? vc(g) : a[i].exec(g.href)) {
                            k = !0;
                            break
                        }
                        if (k)for (i = 0, j = b.length; j > i; i++)if ("self" === b[i] ? vc(g) : b[i].exec(g.href)) {
                            k = !1;
                            break
                        }
                        if (k)return e;
                        throw Vd("insecurl", e.toString())
                    }
                    if (d === Wd.HTML)return f(e);
                    throw Vd("unsafe")
                }, valueOf: function (a) {
                    return a instanceof g ? a.$$unwrapTrustedValue() : a
                }
            }
        }]
    }

    function rc() {
        var a = !0;
        this.enabled = function (b) {
            return arguments.length && (a = !!b), a
        }, this.$get = ["$parse", "$sniffer", "$sceDelegate", function (b, c, d) {
            if (a && c.msie && 8 > c.msieDocumentMode)throw Vd("iequirks");
            var e = F(Wd);
            e.isEnabled = function () {
                return a
            }, e.trustAs = d.trustAs, e.getTrusted = d.getTrusted, e.valueOf = d.valueOf, a || (e.trustAs = e.getTrusted = function (a, b) {
                return b
            }, e.valueOf = p), e.parseAs = function (a, c) {
                var d = b(c);
                return d.literal && d.constant ? d : function (b, c) {
                    return e.getTrusted(a, d(b, c))
                }
            };
            var g = e.parseAs, h = e.getTrusted, i = e.trustAs;
            return f(Wd, function (a, b) {
                var c = Wc(b);
                e[ab("parse_as_" + c)] = function (b) {
                    return g(a, b)
                }, e[ab("get_trusted_" + c)] = function (b) {
                    return h(a, b)
                }, e[ab("trust_as_" + c)] = function (b) {
                    return i(a, b)
                }
            }), e
        }]
    }

    function sc() {
        this.$get = ["$window", "$document", function (a, b) {
            var c, d = {}, e = m((/android (\d+)/.exec(Wc((a.navigator || {}).userAgent)) || [])[1]), f = /Boxee/i.test((a.navigator || {}).userAgent), g = b[0] || {}, h = g.documentMode, i = /^(Moz|webkit|O|ms)(?=[A-Z])/, j = g.body && g.body.style, k = !1, l = !1;
            if (j) {
                for (var n in j)if (k = i.exec(n)) {
                    c = k[0], c = c.substr(0, 1).toUpperCase() + c.substr(1);
                    break
                }
                c || (c = "WebkitOpacity"in j && "webkit"), k = !!("transition"in j || c + "Transition"in j), l = !!("animation"in j || c + "Animation"in j), !e || k && l || (k = u(g.body.style.webkitTransition), l = u(g.body.style.webkitAnimation))
            }
            return {
                history: !(!a.history || !a.history.pushState || 4 > e || f),
                hashchange: "onhashchange"in a && (!h || h > 7),
                hasEvent: function (a) {
                    if ("input" == a && 9 == Qc)return !1;
                    if (r(d[a])) {
                        var b = g.createElement("div");
                        d[a] = "on" + a in b
                    }
                    return d[a]
                },
                csp: fd(),
                vendorPrefix: c,
                transitions: k,
                animations: l,
                android: e,
                msie: Qc,
                msieDocumentMode: h
            }
        }]
    }

    function tc() {
        this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function (a, b, c, d) {
            function e(e, g, h) {
                var i = c.defer(), j = i.promise, k = s(h) && !h;
                return g = b.defer(function () {
                    try {
                        i.resolve(e())
                    } catch (b) {
                        i.reject(b), d(b)
                    } finally {
                        delete f[j.$$timeoutId]
                    }
                    k || a.$apply()
                }, g), j.$$timeoutId = g, f[g] = i, j
            }

            var f = {};
            return e.cancel = function (a) {
                return a && a.$$timeoutId in f ? (f[a.$$timeoutId].reject("canceled"), delete f[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1
            }, e
        }]
    }

    function uc(a) {
        var b = a;
        return Qc && (Xd.setAttribute("href", b), b = Xd.href), Xd.setAttribute("href", b), {
            href: Xd.href,
            protocol: Xd.protocol ? Xd.protocol.replace(/:$/, "") : "",
            host: Xd.host,
            search: Xd.search ? Xd.search.replace(/^\?/, "") : "",
            hash: Xd.hash ? Xd.hash.replace(/^#/, "") : "",
            hostname: Xd.hostname,
            port: Xd.port,
            pathname: "/" === Xd.pathname.charAt(0) ? Xd.pathname : "/" + Xd.pathname
        }
    }

    function vc(a) {
        return a = u(a) ? uc(a) : a, a.protocol === Yd.protocol && a.host === Yd.host
    }

    function wc() {
        this.$get = q(a)
    }

    function xc(a) {
        function b(d, e) {
            if (t(d)) {
                var g = {};
                return f(d, function (a, c) {
                    g[c] = b(c, a)
                }), g
            }
            return a.factory(d + c, e)
        }

        var c = "Filter";
        this.register = b, this.$get = ["$injector", function (a) {
            return function (b) {
                return a.get(b + c)
            }
        }], b("currency", zc), b("date", Fc), b("filter", yc), b("json", Gc), b("limitTo", Hc), b("lowercase", be), b("number", Ac), b("orderBy", Ic), b("uppercase", ce)
    }

    function yc() {
        return function (a, b, c) {
            if (!dd(a))return a;
            var d = typeof c, e = [];
            e.check = function (a) {
                for (var b = 0; b < e.length; b++)if (!e[b](a))return !1;
                return !0
            }, "function" !== d && (c = "boolean" === d && c ? function (a, b) {
                return bd.equals(a, b)
            } : function (a, b) {
                if (a && b && "object" == typeof a && "object" == typeof b) {
                    for (var d in a)if ("$" !== d.charAt(0) && Xc.call(a, d) && c(a[d], b[d]))return !0;
                    return !1
                }
                return b = ("" + b).toLowerCase(), -1 < ("" + a).toLowerCase().indexOf(b)
            });
            var f = function (a, b) {
                if ("string" == typeof b && "!" === b.charAt(0))return !f(a, b.substr(1));
                switch (typeof a) {
                    case"boolean":
                    case"number":
                    case"string":
                        return c(a, b);
                    case"object":
                        switch (typeof b) {
                            case"object":
                                return c(a, b);
                            default:
                                for (var d in a)if ("$" !== d.charAt(0) && f(a[d], b))return !0
                        }
                        return !1;
                    case"array":
                        for (d = 0; d < a.length; d++)if (f(a[d], b))return !0;
                        return !1;
                    default:
                        return !1
                }
            };
            switch (typeof b) {
                case"boolean":
                case"number":
                case"string":
                    b = {$: b};
                case"object":
                    for (var g in b)(function (a) {
                        "undefined" != typeof b[a] && e.push(function (c) {
                            return f("$" == a ? c : c && c[a], b[a])
                        })
                    })(g);
                    break;
                case"function":
                    e.push(b);
                    break;
                default:
                    return a
            }
            for (d = [], g = 0; g < a.length; g++) {
                var h = a[g];
                e.check(h) && d.push(h)
            }
            return d
        }
    }

    function zc(a) {
        var b = a.NUMBER_FORMATS;
        return function (a, c) {
            return r(c) && (c = b.CURRENCY_SYM), Bc(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, 2).replace(/\u00A4/g, c)
        }
    }

    function Ac(a) {
        var b = a.NUMBER_FORMATS;
        return function (a, c) {
            return Bc(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c)
        }
    }

    function Bc(a, b, c, d, e) {
        if (null == a || !isFinite(a) || t(a))return "";
        var f = 0 > a;
        a = Math.abs(a);
        var g = a + "", h = "", i = [], j = !1;
        if (-1 !== g.indexOf("e")) {
            var k = g.match(/([\d\.]+)e(-?)(\d+)/);
            k && "-" == k[2] && k[3] > e + 1 ? (g = "0", a = 0) : (h = g, j = !0)
        }
        if (j)e > 0 && a > -1 && 1 > a && (h = a.toFixed(e)); else {
            g = (g.split(Zd)[1] || "").length, r(e) && (e = Math.min(Math.max(b.minFrac, g), b.maxFrac)), a = +(Math.round(+(a.toString() + "e" + e)).toString() + "e" + -e), 0 === a && (f = !1), a = ("" + a).split(Zd), g = a[0], a = a[1] || "";
            var k = 0, l = b.lgSize, m = b.gSize;
            if (g.length >= l + m)for (k = g.length - l, j = 0; k > j; j++)0 === (k - j) % m && 0 !== j && (h += c), h += g.charAt(j);
            for (j = k; j < g.length; j++)0 === (g.length - j) % l && 0 !== j && (h += c), h += g.charAt(j);
            for (; a.length < e;)a += "0";
            e && "0" !== e && (h += d + a.substr(0, e))
        }
        return i.push(f ? b.negPre : b.posPre), i.push(h), i.push(f ? b.negSuf : b.posSuf), i.join("")
    }

    function Cc(a, b, c) {
        var d = "";
        for (0 > a && (d = "-", a = -a), a = "" + a; a.length < b;)a = "0" + a;
        return c && (a = a.substr(a.length - b)), d + a
    }

    function Dc(a, b, c, d) {
        return c = c || 0, function (e) {
            return e = e["get" + a](), (c > 0 || e > -c) && (e += c), 0 === e && -12 == c && (e = 12), Cc(e, b, d)
        }
    }

    function Ec(a, b) {
        return function (c, d) {
            var e = c["get" + a](), f = Yc(b ? "SHORT" + a : a);
            return d[f][e]
        }
    }

    function Fc(a) {
        function b(a) {
            var b;
            if (b = a.match(c)) {
                a = new Date(0);
                var d = 0, e = 0, f = b[8] ? a.setUTCFullYear : a.setFullYear, g = b[8] ? a.setUTCHours : a.setHours;
                b[9] && (d = m(b[9] + b[10]), e = m(b[9] + b[11])), f.call(a, m(b[1]), m(b[2]) - 1, m(b[3])), d = m(b[4] || 0) - d, e = m(b[5] || 0) - e, f = m(b[6] || 0), b = Math.round(1e3 * parseFloat("0." + (b[7] || 0))), g.call(a, d, e, f, b)
            }
            return a
        }

        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function (c, d) {
            var e, g, h = "", i = [];
            if (d = d || "mediumDate", d = a.DATETIME_FORMATS[d] || d, u(c) && (c = ae.test(c) ? m(c) : b(c)), v(c) && (c = new Date(c)), !w(c))return c;
            for (; d;)(g = _d.exec(d)) ? (i = i.concat(Zc.call(g, 1)), d = i.pop()) : (i.push(d), d = null);
            return f(i, function (b) {
                e = $d[b], h += e ? e(c, a.DATETIME_FORMATS) : b.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), h
        }
    }

    function Gc() {
        return function (a) {
            return J(a, !0)
        }
    }

    function Hc() {
        return function (a, b) {
            if (!dd(a) && !u(a))return a;
            if (b = 1 / 0 === Math.abs(Number(b)) ? Number(b) : m(b), u(a))return b ? b >= 0 ? a.slice(0, b) : a.slice(b, a.length) : "";
            var c, d, e = [];
            for (b > a.length ? b = a.length : b < -a.length && (b = -a.length), b > 0 ? (c = 0, d = b) : (c = a.length + b, d = a.length); d > c; c++)e.push(a[c]);
            return e
        }
    }

    function Ic(a) {
        return function (b, c, d) {
            function f(a, b) {
                return L(b) ? function (b, c) {
                    return a(c, b)
                } : a
            }

            function g(a, b) {
                var c = typeof a, d = typeof b;
                return c == d ? (w(a) && w(b) && (a = a.valueOf(), b = b.valueOf()), "string" == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : b > a ? -1 : 1) : d > c ? -1 : 1
            }

            if (!e(b) || !c)return b;
            c = dd(c) ? c : [c], c = B(c, function (b) {
                var c = !1, d = b || p;
                if (u(b) && (("+" == b.charAt(0) || "-" == b.charAt(0)) && (c = "-" == b.charAt(0), b = b.substring(1)), d = a(b), d.constant)) {
                    var e = d();
                    return f(function (a, b) {
                        return g(a[e], b[e])
                    }, c)
                }
                return f(function (a, b) {
                    return g(d(a), d(b))
                }, c)
            });
            for (var h = [], i = 0; i < b.length; i++)h.push(b[i]);
            return h.sort(f(function (a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e)return e
                }
                return 0
            }, d))
        }
    }

    function Jc(a) {
        return x(a) && (a = {link: a}), a.restrict = a.restrict || "AC", q(a)
    }

    function Kc(a, b, c, d) {
        function e(b, c) {
            c = c ? "-" + U(c, "-") : "", d.setClass(a, (b ? pe : qe) + c, (b ? qe : pe) + c)
        }

        var g = this, h = a.parent().controller("form") || fe, i = 0, j = g.$error = {}, k = [];
        g.$name = b.name || b.ngForm, g.$dirty = !1, g.$pristine = !0, g.$valid = !0, g.$invalid = !1, h.$addControl(g), a.addClass(re), e(!0), g.$addControl = function (a) {
            X(a.$name, "input"), k.push(a), a.$name && (g[a.$name] = a)
        }, g.$removeControl = function (a) {
            a.$name && g[a.$name] === a && delete g[a.$name], f(j, function (b, c) {
                g.$setValidity(c, !0, a)
            }), D(k, a)
        }, g.$setValidity = function (a, b, c) {
            var d = j[a];
            if (b)d && (D(d, c), d.length || (i--, i || (e(b), g.$valid = !0, g.$invalid = !1), j[a] = !1, e(!0, a), h.$setValidity(a, !0, g))); else {
                if (i || e(b), d) {
                    if (-1 != C(d, c))return
                } else j[a] = d = [], i++, e(!1, a), h.$setValidity(a, !1, g);
                d.push(c), g.$valid = !1, g.$invalid = !0
            }
        }, g.$setDirty = function () {
            d.removeClass(a, re), d.addClass(a, se), g.$dirty = !0, g.$pristine = !1, h.$setDirty()
        }, g.$setPristine = function () {
            d.removeClass(a, se), d.addClass(a, re), g.$dirty = !1, g.$pristine = !0, f(k, function (a) {
                a.$setPristine()
            })
        }
    }

    function Lc(a, b, d, e) {
        return a.$setValidity(b, d), d ? e : c
    }

    function Mc(a, b) {
        var c, d;
        if (b)for (c = 0; c < b.length; ++c)if (d = b[c], a[d])return !0;
        return !1
    }

    function Nc(a, b, c, d, e) {
        t(e) && (a.$$hasNativeValidators = !0, a.$parsers.push(function (f) {
            return a.$error[b] || Mc(e, d) || !Mc(e, c) ? f : void a.$setValidity(b, !1)
        }))
    }

    function Oc(a, b, c, e, f, g) {
        var h = b.prop(Vc), i = b[0].placeholder, j = {}, k = Wc(b[0].type);
        if (e.$$validityState = h, !f.android) {
            var l = !1;
            b.on("compositionstart", function () {
                l = !0
            }), b.on("compositionend", function () {
                l = !1, n()
            })
        }
        var n = function (d) {
            if (!l) {
                var f = b.val();
                Qc && "input" === (d || j).type && b[0].placeholder !== i ? i = b[0].placeholder : ("password" !== k && L(c.ngTrim || "T") && (f = ed(f)), d = h && e.$$hasNativeValidators, (e.$viewValue !== f || "" === f && d) && (a.$root.$$phase ? e.$setViewValue(f) : a.$apply(function () {
                    e.$setViewValue(f)
                })))
            }
        };
        if (f.hasEvent("input"))b.on("input", n); else {
            var o, p = function () {
                o || (o = g.defer(function () {
                    n(), o = null
                }))
            };
            b.on("keydown", function (a) {
                a = a.keyCode, 91 === a || a > 15 && 19 > a || a >= 37 && 40 >= a || p()
            }), f.hasEvent("paste") && b.on("paste cut", p)
        }
        b.on("change", n), e.$render = function () {
            b.val(e.$isEmpty(e.$viewValue) ? "" : e.$viewValue)
        };
        var q = c.ngPattern;
        if (q && ((f = q.match(/^\/(.*)\/([gim]*)$/)) ? (q = RegExp(f[1], f[2]), f = function (a) {
                return Lc(e, "pattern", e.$isEmpty(a) || q.test(a), a)
            }) : f = function (c) {
                var f = a.$eval(q);
                if (!f || !f.test)throw d("ngPattern")("noregexp", q, f, M(b));
                return Lc(e, "pattern", e.$isEmpty(c) || f.test(c), c)
            }, e.$formatters.push(f), e.$parsers.push(f)), c.ngMinlength) {
            var r = m(c.ngMinlength);
            f = function (a) {
                return Lc(e, "minlength", e.$isEmpty(a) || a.length >= r, a)
            }, e.$parsers.push(f), e.$formatters.push(f)
        }
        if (c.ngMaxlength) {
            var s = m(c.ngMaxlength);
            f = function (a) {
                return Lc(e, "maxlength", e.$isEmpty(a) || a.length <= s, a)
            }, e.$parsers.push(f), e.$formatters.push(f)
        }
    }

    function Pc(a, b) {
        return a = "ngClass" + a, ["$animate", function (c) {
            function d(a, b) {
                var c = [], d = 0;
                a:for (; d < a.length; d++) {
                    for (var e = a[d], f = 0; f < b.length; f++)if (e == b[f])continue a;
                    c.push(e)
                }
                return c
            }

            function e(a) {
                if (!dd(a)) {
                    if (u(a))return a.split(" ");
                    if (t(a)) {
                        var b = [];
                        return f(a, function (a, c) {
                            a && (b = b.concat(c.split(" ")))
                        }), b
                    }
                }
                return a
            }

            return {
                restrict: "AC", link: function (g, h, i) {
                    function j(a, b) {
                        var c = h.data("$classCounts") || {}, d = [];
                        return f(a, function (a) {
                            (b > 0 || c[a]) && (c[a] = (c[a] || 0) + b, c[a] === +(b > 0) && d.push(a))
                        }), h.data("$classCounts", c), d.join(" ")
                    }

                    function k(a) {
                        if (!0 === b || g.$index % 2 === b) {
                            var f = e(a || []);
                            if (l) {
                                if (!G(a, l)) {
                                    var k = e(l), m = d(f, k), f = d(k, f), f = j(f, -1), m = j(m, 1);
                                    0 === m.length ? c.removeClass(h, f) : 0 === f.length ? c.addClass(h, m) : c.setClass(h, m, f)
                                }
                            } else {
                                var m = j(f, 1);
                                i.$addClass(m)
                            }
                        }
                        l = F(a)
                    }

                    var l;
                    g.$watch(i[a], k, !0), i.$observe("class", function () {
                        k(g.$eval(i[a]))
                    }), "ngClass" !== a && g.$watch("$index", function (c, d) {
                        var f = 1 & c;
                        if (f !== (1 & d)) {
                            var h = e(g.$eval(i[a]));
                            f === b ? (f = j(h, 1), i.$addClass(f)) : (f = j(h, -1), i.$removeClass(f))
                        }
                    })
                }
            }
        }]
    }

    var Qc, Rc, Sc, Tc, Uc, Vc = "validity", Wc = function (a) {
        return u(a) ? a.toLowerCase() : a
    }, Xc = Object.prototype.hasOwnProperty, Yc = function (a) {
        return u(a) ? a.toUpperCase() : a
    }, Zc = [].slice, $c = [].push, _c = Object.prototype.toString, ad = d("ng"), bd = a.angular || (a.angular = {}), cd = ["0", "0", "0"];
    Qc = m((/msie (\d+)/.exec(Wc(navigator.userAgent)) || [])[1]), isNaN(Qc) && (Qc = m((/trident\/.*; rv:(\d+)/.exec(Wc(navigator.userAgent)) || [])[1])), o.$inject = [], p.$inject = [];
    var dd = function () {
        return x(Array.isArray) ? Array.isArray : function (a) {
            return "[object Array]" === _c.call(a)
        }
    }(), ed = function () {
        return String.prototype.trim ? function (a) {
            return u(a) ? a.trim() : a
        } : function (a) {
            return u(a) ? a.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : a
        }
    }();
    Uc = 9 > Qc ? function (a) {
        return a = a.nodeName ? a : a[0], a.scopeName && "HTML" != a.scopeName ? Yc(a.scopeName + ":" + a.nodeName) : a.nodeName
    } : function (a) {
        return a.nodeName ? a.nodeName : a[0].nodeName
    };
    var fd = function () {
        if (s(fd.isActive_))return fd.isActive_;
        var a = !(!b.querySelector("[ng-csp]") && !b.querySelector("[data-ng-csp]"));
        if (!a)try {
            new Function("")
        } catch (c) {
            a = !0
        }
        return fd.isActive_ = a
    }, gd = /[A-Z]/g, hd = {full: "1.2.26", major: 1, minor: 2, dot: 26, codeName: "captivating-disinterest"};
    cb.expando = "ng339";
    var id = cb.cache = {}, jd = 1, kd = a.document.addEventListener ? function (a, b, c) {
        a.addEventListener(b, c, !1)
    } : function (a, b, c) {
        a.attachEvent("on" + b, c)
    }, ld = a.document.removeEventListener ? function (a, b, c) {
        a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent("on" + b, c)
    };
    cb._data = function (a) {
        return this.cache[a[this.expando]] || {}
    };
    var md = /([\:\-\_]+(.))/g, nd = /^moz([A-Z])/, od = d("jqLite"), pd = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, qd = /<|&#?\w+;/, rd = /<([\w:]+)/, sd = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, td = {
        option: [1, '<select multiple="multiple">', "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    td.optgroup = td.option, td.tbody = td.tfoot = td.colgroup = td.caption = td.thead, td.th = td.td;
    var ud = cb.prototype = {
        ready: function (c) {
            function d() {
                e || (e = !0, c())
            }

            var e = !1;
            "complete" === b.readyState ? setTimeout(d) : (this.on("DOMContentLoaded", d), cb(a).on("load", d))
        }, toString: function () {
            var a = [];
            return f(this, function (b) {
                a.push("" + b)
            }), "[" + a.join(", ") + "]"
        }, eq: function (a) {
            return Rc(a >= 0 ? this[a] : this[this.length + a])
        }, length: 0, push: $c, sort: [].sort, splice: [].splice
    }, vd = {};
    f("multiple selected checked disabled readOnly required open".split(" "), function (a) {
        vd[Wc(a)] = a
    });
    var wd = {};
    f("input select option textarea button form details".split(" "), function (a) {
        wd[Yc(a)] = !0
    }), f({data: ib, removeData: gb}, function (a, b) {
        cb[b] = a
    }), f({
        data: ib, inheritedData: ob, scope: function (a) {
            return Rc.data(a, "$scope") || ob(a.parentNode || a, ["$isolateScope", "$scope"])
        }, isolateScope: function (a) {
            return Rc.data(a, "$isolateScope") || Rc.data(a, "$isolateScopeNoTemplate")
        }, controller: nb, injector: function (a) {
            return ob(a, "$injector")
        }, removeAttr: function (a, b) {
            a.removeAttribute(b)
        }, hasClass: jb, css: function (a, b, d) {
            if (b = ab(b), !s(d)) {
                var e;
                return 8 >= Qc && (e = a.currentStyle && a.currentStyle[b], "" === e && (e = "auto")), e = e || a.style[b], 8 >= Qc && (e = "" === e ? c : e), e
            }
            a.style[b] = d
        }, attr: function (a, b, d) {
            var e = Wc(b);
            if (vd[e]) {
                if (!s(d))return a[b] || (a.attributes.getNamedItem(b) || o).specified ? e : c;
                d ? (a[b] = !0, a.setAttribute(b, e)) : (a[b] = !1, a.removeAttribute(e))
            } else if (s(d))a.setAttribute(b, d); else if (a.getAttribute)return a = a.getAttribute(b, 2), null === a ? c : a
        }, prop: function (a, b, c) {
            return s(c) ? void(a[b] = c) : a[b]
        }, text: function () {
            function a(a, c) {
                var d = b[a.nodeType];
                return r(c) ? d ? a[d] : "" : void(a[d] = c)
            }

            var b = [];
            return 9 > Qc ? (b[1] = "innerText", b[3] = "nodeValue") : b[1] = b[3] = "textContent", a.$dv = "", a
        }(), val: function (a, b) {
            if (r(b)) {
                if ("SELECT" === Uc(a) && a.multiple) {
                    var c = [];
                    return f(a.options, function (a) {
                        a.selected && c.push(a.value || a.text)
                    }), 0 === c.length ? null : c
                }
                return a.value
            }
            a.value = b
        }, html: function (a, b) {
            if (r(b))return a.innerHTML;
            for (var c = 0, d = a.childNodes; c < d.length; c++)eb(d[c]);
            a.innerHTML = b
        }, empty: pb
    }, function (a, b) {
        cb.prototype[b] = function (b, d) {
            var e, f, g = this.length;
            if (a !== pb && (2 == a.length && a !== jb && a !== nb ? b : d) === c) {
                if (t(b)) {
                    for (e = 0; g > e; e++)if (a === ib)a(this[e], b); else for (f in b)a(this[e], f, b[f]);
                    return this
                }
                for (e = a.$dv, g = e === c ? Math.min(g, 1) : g, f = 0; g > f; f++) {
                    var h = a(this[f], b, d);
                    e = e ? e + h : h
                }
                return e
            }
            for (e = 0; g > e; e++)a(this[e], b, d);
            return this
        }
    }), f({
        removeData: gb, dealoc: eb, on: function cf(a, c, d, e) {
            if (s(e))throw od("onargs");
            var g = hb(a, "events"), h = hb(a, "handle");
            g || hb(a, "events", g = {}), h || hb(a, "handle", h = rb(a, g)), f(c.split(" "), function (c) {
                var e = g[c];
                if (!e) {
                    if ("mouseenter" == c || "mouseleave" == c) {
                        var f = b.body.contains || b.body.compareDocumentPosition ? function (a, b) {
                            var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                            return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                        } : function (a, b) {
                            if (b)for (; b = b.parentNode;)if (b === a)return !0;
                            return !1
                        };
                        g[c] = [], cf(a, {mouseleave: "mouseout", mouseenter: "mouseover"}[c], function (a) {
                            var b = a.relatedTarget;
                            b && (b === this || f(this, b)) || h(a, c)
                        })
                    } else kd(a, c, h), g[c] = [];
                    e = g[c]
                }
                e.push(d)
            })
        }, off: fb, one: function (a, b, c) {
            a = Rc(a), a.on(b, function d() {
                a.off(b, c), a.off(b, d)
            }), a.on(b, c)
        }, replaceWith: function (a, b) {
            var c, d = a.parentNode;
            eb(a), f(new cb(b), function (b) {
                c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a), c = b
            })
        }, children: function (a) {
            var b = [];
            return f(a.childNodes, function (a) {
                1 === a.nodeType && b.push(a)
            }), b
        }, contents: function (a) {
            return a.contentDocument || a.childNodes || []
        }, append: function (a, b) {
            f(new cb(b), function (b) {
                1 !== a.nodeType && 11 !== a.nodeType || a.appendChild(b)
            })
        }, prepend: function (a, b) {
            if (1 === a.nodeType) {
                var c = a.firstChild;
                f(new cb(b), function (b) {
                    a.insertBefore(b, c)
                })
            }
        }, wrap: function (a, b) {
            b = Rc(b)[0];
            var c = a.parentNode;
            c && c.replaceChild(b, a), b.appendChild(a)
        }, remove: function (a) {
            eb(a);
            var b = a.parentNode;
            b && b.removeChild(a)
        }, after: function (a, b) {
            var c = a, d = a.parentNode;
            f(new cb(b), function (a) {
                d.insertBefore(a, c.nextSibling), c = a
            })
        }, addClass: lb, removeClass: kb, toggleClass: function (a, b, c) {
            b && f(b.split(" "), function (b) {
                var d = c;
                r(d) && (d = !jb(a, b)), (d ? lb : kb)(a, b)
            })
        }, parent: function (a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null
        }, next: function (a) {
            if (a.nextElementSibling)return a.nextElementSibling;
            for (a = a.nextSibling; null != a && 1 !== a.nodeType;)a = a.nextSibling;
            return a
        }, find: function (a, b) {
            return a.getElementsByTagName ? a.getElementsByTagName(b) : []
        }, clone: db, triggerHandler: function (a, b, c) {
            var d, e;
            d = b.type || b;
            var g = (hb(a, "events") || {})[d];
            g && (d = {
                preventDefault: function () {
                    this.defaultPrevented = !0
                }, isDefaultPrevented: function () {
                    return !0 === this.defaultPrevented
                }, stopPropagation: o, type: d, target: a
            }, b.type && (d = l(d, b)), b = F(g), e = c ? [d].concat(c) : [d], f(b, function (b) {
                b.apply(a, e)
            }))
        }
    }, function (a, b) {
        cb.prototype[b] = function (b, c, d) {
            for (var e, f = 0; f < this.length; f++)r(e) ? (e = a(this[f], b, c, d), s(e) && (e = Rc(e))) : mb(e, a(this[f], b, c, d));
            return s(e) ? e : this
        }, cb.prototype.bind = cb.prototype.on, cb.prototype.unbind = cb.prototype.off
    }), tb.prototype = {
        put: function (a, b) {
            this[sb(a, this.nextUid)] = b
        }, get: function (a) {
            return this[sb(a, this.nextUid)]
        }, remove: function (a) {
            var b = this[a = sb(a, this.nextUid)];
            return delete this[a], b
        }
    };
    var xd = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, yd = /,/, zd = /^\s*(_?)(\S+?)\1\s*$/, Ad = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Bd = d("$injector"), Cd = d("$animate"), Dd = ["$provide", function (a) {
        this.$$selectors = {}, this.register = function (b, c) {
            var d = b + "-animation";
            if (b && "." != b.charAt(0))throw Cd("notcsel", b);
            this.$$selectors[b.substr(1)] = d, a.factory(d, c)
        }, this.classNameFilter = function (a) {
            return 1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null), this.$$classNameFilter
        }, this.$get = ["$timeout", "$$asyncCallback", function (a, b) {
            return {
                enter: function (a, c, d, e) {
                    d ? d.after(a) : (c && c[0] || (c = d.parent()), c.append(a)), e && b(e)
                }, leave: function (a, c) {
                    a.remove(), c && b(c)
                }, move: function (a, b, c, d) {
                    this.enter(a, b, c, d)
                }, addClass: function (a, c, d) {
                    c = u(c) ? c : dd(c) ? c.join(" ") : "", f(a, function (a) {
                        lb(a, c)
                    }), d && b(d)
                }, removeClass: function (a, c, d) {
                    c = u(c) ? c : dd(c) ? c.join(" ") : "", f(a, function (a) {
                        kb(a, c)
                    }), d && b(d)
                }, setClass: function (a, c, d, e) {
                    f(a, function (a) {
                        lb(a, c), kb(a, d)
                    }), e && b(e)
                }, enabled: o
            }
        }]
    }], Ed = d("$compile");
    Cb.$inject = ["$provide", "$$sanitizeUriProvider"];
    var Fd = /^(x[\:\-_]|data[\:\-_])/i, Gd = d("$interpolate"), Hd = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, Id = {
        http: 80,
        https: 443,
        ftp: 21
    }, Jd = d("$location");
    $b.prototype = Zb.prototype = Yb.prototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: _b("$$absUrl"),
        url: function (a) {
            return r(a) ? this.$$url : (a = Hd.exec(a), a[1] && this.path(decodeURIComponent(a[1])), (a[2] || a[1]) && this.search(a[3] || ""), this.hash(a[5] || ""), this)
        },
        protocol: _b("$$protocol"),
        host: _b("$$host"),
        port: _b("$$port"),
        path: ac("$$path", function (a) {
            return a = a ? a.toString() : "", "/" == a.charAt(0) ? a : "/" + a
        }),
        search: function (a, b) {
            switch (arguments.length) {
                case 0:
                    return this.$$search;
                case 1:
                    if (u(a) || v(a))a = a.toString(), this.$$search = O(a); else {
                        if (!t(a))throw Jd("isrcharg");
                        f(a, function (b, c) {
                            null == b && delete a[c]
                        }), this.$$search = a
                    }
                    break;
                default:
                    r(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b
            }
            return this.$$compose(), this
        },
        hash: ac("$$hash", function (a) {
            return a ? a.toString() : ""
        }),
        replace: function () {
            return this.$$replace = !0, this
        }
    };
    var Kd, Ld = d("$parse"), Md = {}, Nd = Function.prototype.call, Od = Function.prototype.apply, Pd = Function.prototype.bind, Qd = {
        "null": function () {
            return null
        }, "true": function () {
            return !0
        }, "false": function () {
            return !1
        }, undefined: o, "+": function (a, b, d, e) {
            return d = d(a, b), e = e(a, b), s(d) ? s(e) ? d + e : d : s(e) ? e : c
        }, "-": function (a, b, c, d) {
            return c = c(a, b), d = d(a, b), (s(c) ? c : 0) - (s(d) ? d : 0)
        }, "*": function (a, b, c, d) {
            return c(a, b) * d(a, b)
        }, "/": function (a, b, c, d) {
            return c(a, b) / d(a, b)
        }, "%": function (a, b, c, d) {
            return c(a, b) % d(a, b)
        }, "^": function (a, b, c, d) {
            return c(a, b) ^ d(a, b)
        }, "=": o, "===": function (a, b, c, d) {
            return c(a, b) === d(a, b)
        }, "!==": function (a, b, c, d) {
            return c(a, b) !== d(a, b)
        }, "==": function (a, b, c, d) {
            return c(a, b) == d(a, b)
        }, "!=": function (a, b, c, d) {
            return c(a, b) != d(a, b)
        }, "<": function (a, b, c, d) {
            return c(a, b) < d(a, b)
        }, ">": function (a, b, c, d) {
            return c(a, b) > d(a, b)
        }, "<=": function (a, b, c, d) {
            return c(a, b) <= d(a, b)
        }, ">=": function (a, b, c, d) {
            return c(a, b) >= d(a, b)
        }, "&&": function (a, b, c, d) {
            return c(a, b) && d(a, b)
        }, "||": function (a, b, c, d) {
            return c(a, b) || d(a, b)
        }, "&": function (a, b, c, d) {
            return c(a, b) & d(a, b)
        }, "|": function (a, b, c, d) {
            return d(a, b)(a, b, c(a, b))
        }, "!": function (a, b, c) {
            return !c(a, b)
        }
    }, Rd = {n: "\n", f: "\f", r: "\r", t: "	", v: "", "'": "'", '"': '"'}, Sd = function (a) {
        this.options = a
    };
    Sd.prototype = {
        constructor: Sd, lex: function (a) {
            for (this.text = a, this.index = 0, this.ch = c, this.lastCh = ":", this.tokens = []; this.index < this.text.length;) {
                if (this.ch = this.text.charAt(this.index), this.is("\"'"))this.readString(this.ch); else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek()))this.readNumber(); else if (this.isIdent(this.ch))this.readIdent(); else if (this.is("(){}[].,;:?"))this.tokens.push({
                    index: this.index,
                    text: this.ch
                }), this.index++; else {
                    if (this.isWhitespace(this.ch)) {
                        this.index++;
                        continue
                    }
                    a = this.ch + this.peek();
                    var b = a + this.peek(2), d = Qd[this.ch], e = Qd[a], f = Qd[b];
                    f ? (this.tokens.push({
                        index: this.index,
                        text: b,
                        fn: f
                    }), this.index += 3) : e ? (this.tokens.push({
                        index: this.index,
                        text: a,
                        fn: e
                    }), this.index += 2) : d ? (this.tokens.push({
                        index: this.index,
                        text: this.ch,
                        fn: d
                    }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
                this.lastCh = this.ch
            }
            return this.tokens
        }, is: function (a) {
            return -1 !== a.indexOf(this.ch)
        }, was: function (a) {
            return -1 !== a.indexOf(this.lastCh)
        }, peek: function (a) {
            return a = a || 1, this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1
        }, isNumber: function (a) {
            return a >= "0" && "9" >= a
        }, isWhitespace: function (a) {
            return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a
        }, isIdent: function (a) {
            return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a
        }, isExpOperator: function (a) {
            return "-" === a || "+" === a || this.isNumber(a)
        }, throwError: function (a, b, c) {
            throw c = c || this.index, b = s(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, c) + "]" : " " + c, Ld("lexerr", a, b, this.text)
        }, readNumber: function () {
            for (var a = "", b = this.index; this.index < this.text.length;) {
                var c = Wc(this.text.charAt(this.index));
                if ("." == c || this.isNumber(c))a += c; else {
                    var d = this.peek();
                    if ("e" == c && this.isExpOperator(d))a += c; else if (this.isExpOperator(c) && d && this.isNumber(d) && "e" == a.charAt(a.length - 1))a += c; else {
                        if (!this.isExpOperator(c) || d && this.isNumber(d) || "e" != a.charAt(a.length - 1))break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            a *= 1, this.tokens.push({
                index: b, text: a, literal: !0, constant: !0, fn: function () {
                    return a
                }
            })
        }, readIdent: function () {
            for (var a, b, c, d, e = this, f = "", g = this.index; this.index < this.text.length && (d = this.text.charAt(this.index), "." === d || this.isIdent(d) || this.isNumber(d));)"." === d && (a = this.index), f += d, this.index++;
            if (a)for (b = this.index; b < this.text.length;) {
                if (d = this.text.charAt(b), "(" === d) {
                    c = f.substr(a - g + 1), f = f.substr(0, a - g), this.index = b;
                    break
                }
                if (!this.isWhitespace(d))break;
                b++
            }
            if (g = {index: g, text: f}, Qd.hasOwnProperty(f))g.fn = Qd[f], g.literal = !0, g.constant = !0; else {
                var h = hc(f, this.options, this.text);
                g.fn = l(function (a, b) {
                    return h(a, b)
                }, {
                    assign: function (a, b) {
                        return fc(a, f, b, e.text, e.options)
                    }
                })
            }
            this.tokens.push(g), c && (this.tokens.push({index: a, text: "."}), this.tokens.push({
                index: a + 1,
                text: c
            }))
        }, readString: function (a) {
            var b = this.index;
            this.index++;
            for (var c = "", d = a, e = !1; this.index < this.text.length;) {
                var f = this.text.charAt(this.index), d = d + f;
                if (e)"u" === f ? (e = this.text.substring(this.index + 1, this.index + 5), e.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + e + "]"), this.index += 4, c += String.fromCharCode(parseInt(e, 16))) : c += Rd[f] || f, e = !1; else if ("\\" === f)e = !0; else {
                    if (f === a)return this.index++, void this.tokens.push({
                        index: b,
                        text: d,
                        string: c,
                        literal: !0,
                        constant: !0,
                        fn: function () {
                            return c
                        }
                    });
                    c += f
                }
                this.index++
            }
            this.throwError("Unterminated quote", b)
        }
    };
    var Td = function (a, b, c) {
        this.lexer = a, this.$filter = b, this.options = c
    };
    Td.ZERO = l(function () {
        return 0
    }, {constant: !0}), Td.prototype = {
        constructor: Td, parse: function (a) {
            return this.text = a, this.tokens = this.lexer.lex(a), a = this.statements(), 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), a.literal = !!a.literal, a.constant = !!a.constant, a
        }, primary: function () {
            var a;
            if (this.expect("("))a = this.filterChain(), this.consume(")"); else if (this.expect("["))a = this.arrayDeclaration(); else if (this.expect("{"))a = this.object(); else {
                var b = this.expect();
                (a = b.fn) || this.throwError("not a primary expression", b), a.literal = !!b.literal, a.constant = !!b.constant
            }
            for (var c; b = this.expect("(", "[", ".");)"(" === b.text ? (a = this.functionCall(a, c), c = null) : "[" === b.text ? (c = a, a = this.objectIndex(a)) : "." === b.text ? (c = a, a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
            return a
        }, throwError: function (a, b) {
            throw Ld("syntax", b.text, a, b.index + 1, this.text, this.text.substring(b.index))
        }, peekToken: function () {
            if (0 === this.tokens.length)throw Ld("ueoe", this.text);
            return this.tokens[0]
        }, peek: function (a, b, c, d) {
            if (0 < this.tokens.length) {
                var e = this.tokens[0], f = e.text;
                if (f === a || f === b || f === c || f === d || !(a || b || c || d))return e
            }
            return !1
        }, expect: function (a, b, c, d) {
            return (a = this.peek(a, b, c, d)) ? (this.tokens.shift(), a) : !1
        }, consume: function (a) {
            this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek())
        }, unaryFn: function (a, b) {
            return l(function (c, d) {
                return a(c, d, b)
            }, {constant: b.constant})
        }, ternaryFn: function (a, b, c) {
            return l(function (d, e) {
                return a(d, e) ? b(d, e) : c(d, e)
            }, {constant: a.constant && b.constant && c.constant})
        }, binaryFn: function (a, b, c) {
            return l(function (d, e) {
                return b(d, e, a, c)
            }, {constant: a.constant && c.constant})
        }, statements: function () {
            for (var a = []; ;)if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), !this.expect(";"))return 1 === a.length ? a[0] : function (b, c) {
                for (var d, e = 0; e < a.length; e++) {
                    var f = a[e];
                    f && (d = f(b, c))
                }
                return d
            }
        }, filterChain: function () {
            for (var a, b = this.expression(); ;) {
                if (!(a = this.expect("|")))return b;
                b = this.binaryFn(b, a.fn, this.filter())
            }
        }, filter: function () {
            for (var a = this.expect(), b = this.$filter(a.text), c = []; ;) {
                if (!(a = this.expect(":"))) {
                    var d = function (a, d, e) {
                        e = [e];
                        for (var f = 0; f < c.length; f++)e.push(c[f](a, d));
                        return b.apply(a, e)
                    };
                    return function () {
                        return d
                    }
                }
                c.push(this.expression())
            }
        }, expression: function () {
            return this.assignment()
        }, assignment: function () {
            var a, b, c = this.ternary();
            return (b = this.expect("=")) ? (c.assign || this.throwError("implies assignment but [" + this.text.substring(0, b.index) + "] can not be assigned to", b), a = this.ternary(), function (b, d) {
                return c.assign(b, a(b, d), d)
            }) : c
        }, ternary: function () {
            var a, b, c = this.logicalOR();
            return this.expect("?") ? (a = this.assignment(), (b = this.expect(":")) ? this.ternaryFn(c, a, this.assignment()) : void this.throwError("expected :", b)) : c
        }, logicalOR: function () {
            for (var a, b = this.logicalAND(); ;) {
                if (!(a = this.expect("||")))return b;
                b = this.binaryFn(b, a.fn, this.logicalAND())
            }
        }, logicalAND: function () {
            var a, b = this.equality();
            return (a = this.expect("&&")) && (b = this.binaryFn(b, a.fn, this.logicalAND())), b
        }, equality: function () {
            var a, b = this.relational();
            return (a = this.expect("==", "!=", "===", "!==")) && (b = this.binaryFn(b, a.fn, this.equality())), b
        }, relational: function () {
            var a, b = this.additive();
            return (a = this.expect("<", ">", "<=", ">=")) && (b = this.binaryFn(b, a.fn, this.relational())), b
        }, additive: function () {
            for (var a, b = this.multiplicative(); a = this.expect("+", "-");)b = this.binaryFn(b, a.fn, this.multiplicative());
            return b
        }, multiplicative: function () {
            for (var a, b = this.unary(); a = this.expect("*", "http://sritechapp.com/", "%");)b = this.binaryFn(b, a.fn, this.unary());
            return b
        }, unary: function () {
            var a;
            return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(Td.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary()
        }, fieldAccess: function (a) {
            var b = this, c = this.expect().text, d = hc(c, this.options, this.text);
            return l(function (b, c, e) {
                return d(e || a(b, c))
            }, {
                assign: function (d, e, f) {
                    return (f = a(d, f)) || a.assign(d, f = {}), fc(f, c, e, b.text, b.options)
                }
            })
        }, objectIndex: function (a) {
            var b = this, d = this.expression();
            return this.consume("]"), l(function (e, f) {
                var g, h = a(e, f), i = d(e, f);
                return dc(i, b.text), h ? ((h = ec(h[i], b.text)) && h.then && b.options.unwrapPromises && (g = h, "$$v"in h || (g.$$v = c, g.then(function (a) {
                    g.$$v = a
                })), h = h.$$v), h) : c
            }, {
                assign: function (c, e, f) {
                    var g = dc(d(c, f), b.text);
                    return (f = ec(a(c, f), b.text)) || a.assign(c, f = {}), f[g] = e
                }
            })
        }, functionCall: function (a, b) {
            var c = [];
            if (")" !== this.peekToken().text)do c.push(this.expression()); while (this.expect(","));
            this.consume(")");
            var d = this;
            return function (e, f) {
                for (var g = [], h = b ? b(e, f) : e, i = 0; i < c.length; i++)g.push(ec(c[i](e, f), d.text));
                i = a(e, f, h) || o, ec(h, d.text);
                var j = d.text;
                if (i) {
                    if (i.constructor === i)throw Ld("isecfn", j);
                    if (i === Nd || i === Od || Pd && i === Pd)throw Ld("isecff", j)
                }
                return g = i.apply ? i.apply(h, g) : i(g[0], g[1], g[2], g[3], g[4]), ec(g, d.text)
            }
        }, arrayDeclaration: function () {
            var a = [], b = !0;
            if ("]" !== this.peekToken().text)do {
                if (this.peek("]"))break;
                var c = this.expression();
                a.push(c), c.constant || (b = !1)
            } while (this.expect(","));
            return this.consume("]"), l(function (b, c) {
                for (var d = [], e = 0; e < a.length; e++)d.push(a[e](b, c));
                return d
            }, {literal: !0, constant: b})
        }, object: function () {
            var a = [], b = !0;
            if ("}" !== this.peekToken().text)do {
                if (this.peek("}"))break;
                var c = this.expect(), c = c.string || c.text;
                this.consume(":");
                var d = this.expression();
                a.push({key: c, value: d}), d.constant || (b = !1)
            } while (this.expect(","));
            return this.consume("}"), l(function (b, c) {
                for (var d = {}, e = 0; e < a.length; e++) {
                    var f = a[e];
                    d[f.key] = f.value(b, c)
                }
                return d
            }, {literal: !0, constant: b})
        }
    };
    var Ud = {}, Vd = d("$sce"), Wd = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, Xd = b.createElement("a"), Yd = uc(a.location.href, !0);
    xc.$inject = ["$provide"], zc.$inject = ["$locale"], Ac.$inject = ["$locale"];
    var Zd = ".", $d = {
        yyyy: Dc("FullYear", 4),
        yy: Dc("FullYear", 2, 0, !0),
        y: Dc("FullYear", 1),
        MMMM: Ec("Month"),
        MMM: Ec("Month", !0),
        MM: Dc("Month", 2, 1),
        M: Dc("Month", 1, 1),
        dd: Dc("Date", 2),
        d: Dc("Date", 1),
        HH: Dc("Hours", 2),
        H: Dc("Hours", 1),
        hh: Dc("Hours", 2, -12),
        h: Dc("Hours", 1, -12),
        mm: Dc("Minutes", 2),
        m: Dc("Minutes", 1),
        ss: Dc("Seconds", 2),
        s: Dc("Seconds", 1),
        sss: Dc("Milliseconds", 3),
        EEEE: Ec("Day"),
        EEE: Ec("Day", !0),
        a: function (a, b) {
            return 12 > a.getHours() ? b.AMPMS[0] : b.AMPMS[1]
        },
        Z: function (a) {
            return a = -1 * a.getTimezoneOffset(), a = (a >= 0 ? "+" : "") + (Cc(Math[a > 0 ? "floor" : "ceil"](a / 60), 2) + Cc(Math.abs(a % 60), 2))
        }
    }, _d = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, ae = /^\-?\d+$/;
    Fc.$inject = ["$locale"];
    var be = q(Wc), ce = q(Yc);
    Ic.$inject = ["$parse"];
    var de = q({
        restrict: "E", compile: function (a, c) {
            return 8 >= Qc && (c.href || c.name || c.$set("href", ""), a.append(b.createComment("IE fix"))), c.href || c.xlinkHref || c.name ? void 0 : function (a, b) {
                var c = "[object SVGAnimatedString]" === _c.call(b.prop("href")) ? "xlink:href" : "href";
                b.on("click", function (a) {
                    b.attr(c) || a.preventDefault()
                })
            }
        }
    }), ee = {};
    f(vd, function (a, b) {
        if ("multiple" != a) {
            var c = Db("ng-" + b);
            ee[c] = function () {
                return {
                    priority: 100, link: function (a, d, e) {
                        a.$watch(e[c], function (a) {
                            e.$set(b, !!a)
                        })
                    }
                }
            }
        }
    }), f(["src", "srcset", "href"], function (a) {
        var b = Db("ng-" + a);
        ee[b] = function () {
            return {
                priority: 99, link: function (c, d, e) {
                    var f = a, g = a;
                    "href" === a && "[object SVGAnimatedString]" === _c.call(d.prop("href")) && (g = "xlinkHref", e.$attr[g] = "xlink:href", f = null), e.$observe(b, function (b) {
                        b ? (e.$set(g, b), Qc && f && d.prop(f, e[g])) : "href" === a && e.$set(g, null)
                    })
                }
            }
        }
    });
    var fe = {$addControl: o, $removeControl: o, $setValidity: o, $setDirty: o, $setPristine: o};
    Kc.$inject = ["$element", "$attrs", "$scope", "$animate"];
    var ge = function (a) {
        return ["$timeout", function (b) {
            return {
                name: "form", restrict: a ? "EAC" : "E", controller: Kc, compile: function () {
                    return {
                        pre: function (a, d, e, f) {
                            if (!e.action) {
                                var g = function (a) {
                                    a.preventDefault ? a.preventDefault() : a.returnValue = !1
                                };
                                kd(d[0], "submit", g), d.on("$destroy", function () {
                                    b(function () {
                                        ld(d[0], "submit", g)
                                    }, 0, !1)
                                })
                            }
                            var h = d.parent().controller("form"), i = e.name || e.ngForm;
                            i && fc(a, i, f, i), h && d.on("$destroy", function () {
                                h.$removeControl(f), i && fc(a, i, c, i), l(f, fe)
                            })
                        }
                    }
                }
            }
        }]
    }, he = ge(), ie = ge(!0), je = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, ke = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, le = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, me = {
        text: Oc,
        number: function (a, b, d, e, f, g) {
            Oc(a, b, d, e, f, g), e.$parsers.push(function (a) {
                var b = e.$isEmpty(a);
                return b || le.test(a) ? (e.$setValidity("number", !0), "" === a ? null : b ? a : parseFloat(a)) : (e.$setValidity("number", !1), c)
            }), Nc(e, "number", ne, null, e.$$validityState), e.$formatters.push(function (a) {
                return e.$isEmpty(a) ? "" : "" + a
            }), d.min && (a = function (a) {
                var b = parseFloat(d.min);
                return Lc(e, "min", e.$isEmpty(a) || a >= b, a)
            }, e.$parsers.push(a), e.$formatters.push(a)), d.max && (a = function (a) {
                var b = parseFloat(d.max);
                return Lc(e, "max", e.$isEmpty(a) || b >= a, a)
            }, e.$parsers.push(a), e.$formatters.push(a)), e.$formatters.push(function (a) {
                return Lc(e, "number", e.$isEmpty(a) || v(a), a)
            })
        },
        url: function (a, b, c, d, e, f) {
            Oc(a, b, c, d, e, f), a = function (a) {
                return Lc(d, "url", d.$isEmpty(a) || je.test(a), a)
            }, d.$formatters.push(a), d.$parsers.push(a)
        },
        email: function (a, b, c, d, e, f) {
            Oc(a, b, c, d, e, f), a = function (a) {
                return Lc(d, "email", d.$isEmpty(a) || ke.test(a), a)
            }, d.$formatters.push(a), d.$parsers.push(a)
        },
        radio: function (a, b, c, d) {
            r(c.name) && b.attr("name", j()), b.on("click", function () {
                b[0].checked && a.$apply(function () {
                    d.$setViewValue(c.value)
                })
            }), d.$render = function () {
                b[0].checked = c.value == d.$viewValue
            }, c.$observe("value", d.$render)
        },
        checkbox: function (a, b, c, d) {
            var e = c.ngTrueValue, f = c.ngFalseValue;
            u(e) || (e = !0), u(f) || (f = !1), b.on("click", function () {
                a.$apply(function () {
                    d.$setViewValue(b[0].checked)
                })
            }), d.$render = function () {
                b[0].checked = d.$viewValue
            }, d.$isEmpty = function (a) {
                return a !== e
            }, d.$formatters.push(function (a) {
                return a === e
            }), d.$parsers.push(function (a) {
                return a ? e : f
            })
        },
        hidden: o,
        button: o,
        submit: o,
        reset: o,
        file: o
    }, ne = ["badInput"], oe = ["$browser", "$sniffer", function (a, b) {
        return {
            restrict: "E", require: "?ngModel", link: function (c, d, e, f) {
                f && (me[Wc(e.type)] || me.text)(c, d, e, f, b, a)
            }
        }
    }], pe = "ng-valid", qe = "ng-invalid", re = "ng-pristine", se = "ng-dirty", te = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", function (a, b, c, e, g, h) {
        function i(a, b) {
            b = b ? "-" + U(b, "-") : "", h.removeClass(e, (a ? qe : pe) + b), h.addClass(e, (a ? pe : qe) + b)
        }

        this.$modelValue = this.$viewValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = c.name;
        var j = g(c.ngModel), k = j.assign;
        if (!k)throw d("ngModel")("nonassign", c.ngModel, M(e));
        this.$render = o, this.$isEmpty = function (a) {
            return r(a) || "" === a || null === a || a !== a
        };
        var l = e.inheritedData("$formController") || fe, m = 0, n = this.$error = {};
        e.addClass(re), i(!0), this.$setValidity = function (a, b) {
            n[a] !== !b && (b ? (n[a] && m--, m || (i(!0), this.$valid = !0, this.$invalid = !1)) : (i(!1), this.$invalid = !0, this.$valid = !1, m++), n[a] = !b, i(b, a), l.$setValidity(a, b, this))
        }, this.$setPristine = function () {
            this.$dirty = !1, this.$pristine = !0, h.removeClass(e, se), h.addClass(e, re)
        }, this.$setViewValue = function (c) {
            this.$viewValue = c, this.$pristine && (this.$dirty = !0, this.$pristine = !1, h.removeClass(e, re), h.addClass(e, se), l.$setDirty()), f(this.$parsers, function (a) {
                c = a(c)
            }), this.$modelValue !== c && (this.$modelValue = c, k(a, c), f(this.$viewChangeListeners, function (a) {
                try {
                    a()
                } catch (c) {
                    b(c)
                }
            }))
        };
        var p = this;
        a.$watch(function () {
            var b = j(a);
            if (p.$modelValue !== b) {
                var c = p.$formatters, d = c.length;
                for (p.$modelValue = b; d--;)b = c[d](b);
                p.$viewValue !== b && (p.$viewValue = b, p.$render())
            }
            return b
        })
    }], ue = function () {
        return {
            require: ["ngModel", "^?form"], controller: te, link: function (a, b, c, d) {
                var e = d[0], f = d[1] || fe;
                f.$addControl(e), a.$on("$destroy", function () {
                    f.$removeControl(e)
                })
            }
        }
    }, ve = q({
        require: "ngModel", link: function (a, b, c, d) {
            d.$viewChangeListeners.push(function () {
                a.$eval(c.ngChange)
            })
        }
    }), we = function () {
        return {
            require: "?ngModel", link: function (a, b, c, d) {
                if (d) {
                    c.required = !0;
                    var e = function (a) {
                        return c.required && d.$isEmpty(a) ? void d.$setValidity("required", !1) : (d.$setValidity("required", !0), a)
                    };
                    d.$formatters.push(e), d.$parsers.unshift(e), c.$observe("required", function () {
                        e(d.$viewValue)
                    })
                }
            }
        }
    }, xe = function () {
        return {
            require: "ngModel", link: function (a, b, d, e) {
                var g = (a = /\/(.*)\//.exec(d.ngList)) && RegExp(a[1]) || d.ngList || ",";
                e.$parsers.push(function (a) {
                    if (!r(a)) {
                        var b = [];
                        return a && f(a.split(g), function (a) {
                            a && b.push(ed(a))
                        }), b
                    }
                }), e.$formatters.push(function (a) {
                    return dd(a) ? a.join(", ") : c
                }), e.$isEmpty = function (a) {
                    return !a || !a.length
                }
            }
        }
    }, ye = /^(true|false|\d+)$/, ze = function () {
        return {
            priority: 100, compile: function (a, b) {
                return ye.test(b.ngValue) ? function (a, b, c) {
                    c.$set("value", a.$eval(c.ngValue))
                } : function (a, b, c) {
                    a.$watch(c.ngValue, function (a) {
                        c.$set("value", a)
                    })
                }
            }
        }
    }, Ae = Jc({
        compile: function (a) {
            return a.addClass("ng-binding"), function (a, b, d) {
                b.data("$binding", d.ngBind), a.$watch(d.ngBind, function (a) {
                    b.text(a == c ? "" : a)
                })
            }
        }
    }), Be = ["$interpolate", function (a) {
        return function (b, c, d) {
            b = a(c.attr(d.$attr.ngBindTemplate)), c.addClass("ng-binding").data("$binding", b), d.$observe("ngBindTemplate", function (a) {
                c.text(a)
            })
        }
    }], Ce = ["$sce", "$parse", function (a, b) {
        return {
            compile: function (c) {
                return c.addClass("ng-binding"), function (c, d, e) {
                    d.data("$binding", e.ngBindHtml);
                    var f = b(e.ngBindHtml);
                    c.$watch(function () {
                        return (f(c) || "").toString()
                    }, function () {
                        d.html(a.getTrustedHtml(f(c)) || "")
                    })
                }
            }
        }
    }], De = Pc("", !0), Ee = Pc("Odd", 0), Fe = Pc("Even", 1), Ge = Jc({
        compile: function (a, b) {
            b.$set("ngCloak", c), a.removeClass("ng-cloak")
        }
    }), He = [function () {
        return {scope: !0, controller: "@", priority: 500}
    }], Ie = {}, Je = {blur: !0, focus: !0};
    f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (a) {
        var b = Db("ng-" + a);
        Ie[b] = ["$parse", "$rootScope", function (c, d) {
            return {
                compile: function (e, f) {
                    var g = c(f[b]);
                    return function (b, c) {
                        c.on(a, function (c) {
                            var e = function () {
                                g(b, {$event: c})
                            };
                            Je[a] && d.$$phase ? b.$evalAsync(e) : b.$apply(e)
                        })
                    }
                }
            }
        }]
    });
    var Ke = ["$animate", function (a) {
        return {
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function (c, d, e, f, g) {
                var h, i, j;
                c.$watch(e.ngIf, function (f) {
                    L(f) ? i || (i = c.$new(), g(i, function (c) {
                        c[c.length++] = b.createComment(" end ngIf: " + e.ngIf + " "), h = {clone: c}, a.enter(c, d.parent(), d)
                    })) : (j && (j.remove(), j = null), i && (i.$destroy(), i = null), h && (j = Z(h.clone), a.leave(j, function () {
                        j = null
                    }), h = null))
                })
            }
        }
    }], Le = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function (a, b, c, d, e) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: bd.noop,
            compile: function (f, g) {
                var h = g.ngInclude || g.src, i = g.onload || "", j = g.autoscroll;
                return function (f, g, k, l, m) {
                    var n, o, p, q = 0, r = function () {
                        o && (o.remove(), o = null), n && (n.$destroy(), n = null), p && (d.leave(p, function () {
                            o = null
                        }), o = p, p = null)
                    };
                    f.$watch(e.parseAsResourceUrl(h), function (e) {
                        var h = function () {
                            !s(j) || j && !f.$eval(j) || c()
                        }, k = ++q;
                        e ? (a.get(e, {cache: b}).success(function (a) {
                            if (k === q) {
                                var b = f.$new();
                                l.template = a, a = m(b, function (a) {
                                    r(), d.enter(a, null, g, h)
                                }), n = b, p = a, n.$emit("$includeContentLoaded"), f.$eval(i)
                            }
                        }).error(function () {
                            k === q && r()
                        }), f.$emit("$includeContentRequested")) : (r(), l.template = null)
                    })
                }
            }
        }
    }], Me = ["$compile", function (a) {
        return {
            restrict: "ECA", priority: -400, require: "ngInclude", link: function (b, c, d, e) {
                c.html(e.template), a(c.contents())(b)
            }
        }
    }], Ne = Jc({
        priority: 450, compile: function () {
            return {
                pre: function (a, b, c) {
                    a.$eval(c.ngInit)
                }
            }
        }
    }), Oe = Jc({terminal: !0, priority: 1e3}), Pe = ["$locale", "$interpolate", function (a, b) {
        var c = /{}/g;
        return {
            restrict: "EA", link: function (d, e, g) {
                var h = g.count, i = g.$attr.when && e.attr(g.$attr.when), j = g.offset || 0, k = d.$eval(i) || {}, l = {}, m = b.startSymbol(), n = b.endSymbol(), o = /^when(Minus)?(.+)$/;
                f(g, function (a, b) {
                    o.test(b) && (k[Wc(b.replace("when", "").replace("Minus", "-"))] = e.attr(g.$attr[b]))
                }), f(k, function (a, d) {
                    l[d] = b(a.replace(c, m + h + "-" + j + n))
                }), d.$watch(function () {
                    var b = parseFloat(d.$eval(h));
                    return isNaN(b) ? "" : (b in k || (b = a.pluralCat(b - j)), l[b](d, e, !0))
                }, function (a) {
                    e.text(a)
                })
            }
        }
    }], Qe = ["$parse", "$animate", function (a, c) {
        var g = d("ngRepeat");
        return {
            transclude: "element", priority: 1e3, terminal: !0, $$tlb: !0, link: function (d, h, i, j, k) {
                var l, m, n, o, p, q, r = i.ngRepeat, s = r.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), t = {$id: sb};
                if (!s)throw g("iexp", r);
                if (i = s[1], j = s[2], (s = s[3]) ? (l = a(s), m = function (a, b, c) {
                        return q && (t[q] = a), t[p] = b, t.$index = c, l(d, t)
                    }) : (n = function (a, b) {
                        return sb(b)
                    }, o = function (a) {
                        return a
                    }), s = i.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !s)throw g("iidexp", i);
                p = s[3] || s[1], q = s[2];
                var u = {};
                d.$watchCollection(j, function (a) {
                    var i, j, l, s, t, v, w, x, y, z, A = h[0], B = {}, C = [];
                    if (e(a))y = a, x = m || n; else {
                        x = m || o, y = [];
                        for (v in a)a.hasOwnProperty(v) && "$" != v.charAt(0) && y.push(v);
                        y.sort()
                    }
                    for (s = y.length, j = C.length = y.length, i = 0; j > i; i++)if (v = a === y ? i : y[i], w = a[v], l = x(v, w, i), X(l, "`track by` id"), u.hasOwnProperty(l))z = u[l], delete u[l], B[l] = z, C[i] = z; else {
                        if (B.hasOwnProperty(l))throw f(C, function (a) {
                            a && a.scope && (u[a.id] = a)
                        }), g("dupes", r, l, J(w));
                        C[i] = {id: l}, B[l] = !1
                    }
                    for (v in u)u.hasOwnProperty(v) && (z = u[v], i = Z(z.clone), c.leave(i), f(i, function (a) {
                        a.$$NG_REMOVED = !0
                    }), z.scope.$destroy());
                    for (i = 0, j = y.length; j > i; i++) {
                        if (v = a === y ? i : y[i], w = a[v], z = C[i], C[i - 1] && (A = C[i - 1].clone[C[i - 1].clone.length - 1]), z.scope) {
                            t = z.scope, l = A;
                            do l = l.nextSibling; while (l && l.$$NG_REMOVED);
                            z.clone[0] != l && c.move(Z(z.clone), null, Rc(A)), A = z.clone[z.clone.length - 1]
                        } else t = d.$new();
                        t[p] = w, q && (t[q] = v), t.$index = i, t.$first = 0 === i, t.$last = i === s - 1, t.$middle = !(t.$first || t.$last), t.$odd = !(t.$even = 0 === (1 & i)), z.scope || k(t, function (a) {
                            a[a.length++] = b.createComment(" end ngRepeat: " + r + " "), c.enter(a, null, Rc(A)), A = a, z.scope = t, z.clone = a, B[z.id] = z
                        })
                    }
                    u = B
                })
            }
        }
    }], Re = ["$animate", function (a) {
        return function (b, c, d) {
            b.$watch(d.ngShow, function (b) {
                a[L(b) ? "removeClass" : "addClass"](c, "ng-hide")
            })
        }
    }], Se = ["$animate", function (a) {
        return function (b, c, d) {
            b.$watch(d.ngHide, function (b) {
                a[L(b) ? "addClass" : "removeClass"](c, "ng-hide")
            })
        }
    }], Te = Jc(function (a, b, c) {
        a.$watch(c.ngStyle, function (a, c) {
            c && a !== c && f(c, function (a, c) {
                b.css(c, "")
            }), a && b.css(a)
        }, !0)
    }), Ue = ["$animate", function (a) {
        return {
            restrict: "EA", require: "ngSwitch", controller: ["$scope", function () {
                this.cases = {}
            }], link: function (b, c, d, e) {
                var g = [], h = [], i = [], j = [];
                b.$watch(d.ngSwitch || d.on, function (c) {
                    var k, l;
                    for (k = 0, l = i.length; l > k; ++k)i[k].remove();
                    for (k = i.length = 0, l = j.length; l > k; ++k) {
                        var m = h[k];
                        j[k].$destroy(), i[k] = m, a.leave(m, function () {
                            i.splice(k, 1)
                        })
                    }
                    h.length = 0, j.length = 0, (g = e.cases["!" + c] || e.cases["?"]) && (b.$eval(d.change), f(g, function (c) {
                        var d = b.$new();
                        j.push(d), c.transclude(d, function (b) {
                            var d = c.element;
                            h.push(b), a.enter(b, d.parent(), d)
                        })
                    }))
                })
            }
        }
    }], Ve = Jc({
        transclude: "element", priority: 800, require: "^ngSwitch", link: function (a, b, c, d, e) {
            d.cases["!" + c.ngSwitchWhen] = d.cases["!" + c.ngSwitchWhen] || [], d.cases["!" + c.ngSwitchWhen].push({
                transclude: e,
                element: b
            })
        }
    }), We = Jc({
        transclude: "element", priority: 800, require: "^ngSwitch", link: function (a, b, c, d, e) {
            d.cases["?"] = d.cases["?"] || [], d.cases["?"].push({transclude: e, element: b})
        }
    }), Xe = Jc({
        link: function (a, b, c, e, f) {
            if (!f)throw d("ngTransclude")("orphan", M(b));
            f(function (a) {
                b.empty(), b.append(a)
            })
        }
    }), Ye = ["$templateCache", function (a) {
        return {
            restrict: "E", terminal: !0, compile: function (b, c) {
                "text/ng-template" == c.type && a.put(c.id, b[0].text)
            }
        }
    }], Ze = d("ngOptions"), $e = q({terminal: !0}), _e = ["$compile", "$parse", function (a, d) {
        var e = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, h = {$setViewValue: o};
        return {
            restrict: "E",
            require: ["select", "?ngModel"],
            controller: ["$element", "$scope", "$attrs", function (a, b, c) {
                var d, e = this, f = {}, g = h;
                e.databound = c.ngModel, e.init = function (a, b, c) {
                    g = a, d = c
                }, e.addOption = function (b) {
                    X(b, '"option value"'), f[b] = !0, g.$viewValue == b && (a.val(b), d.parent() && d.remove())
                }, e.removeOption = function (a) {
                    this.hasOption(a) && (delete f[a], g.$viewValue == a && this.renderUnknownOption(a))
                }, e.renderUnknownOption = function (b) {
                    b = "? " + sb(b) + " ?", d.val(b), a.prepend(d), a.val(b), d.prop("selected", !0)
                }, e.hasOption = function (a) {
                    return f.hasOwnProperty(a)
                }, b.$on("$destroy", function () {
                    e.renderUnknownOption = o
                })
            }],
            link: function (h, i, j, k) {
                function l(a, b, c, d) {
                    c.$render = function () {
                        var a = c.$viewValue;
                        d.hasOption(a) ? (x.parent() && x.remove(), b.val(a), "" === a && p.prop("selected", !0)) : r(a) && p ? b.val("") : d.renderUnknownOption(a)
                    }, b.on("change", function () {
                        a.$apply(function () {
                            x.parent() && x.remove(), c.$setViewValue(b.val())
                        })
                    })
                }

                function m(a, b, c) {
                    var d;
                    c.$render = function () {
                        var a = new tb(c.$viewValue);
                        f(b.find("option"), function (b) {
                            b.selected = s(a.get(b.value))
                        })
                    }, a.$watch(function () {
                        G(d, c.$viewValue) || (d = F(c.$viewValue), c.$render())
                    }), b.on("change", function () {
                        a.$apply(function () {
                            var a = [];
                            f(b.find("option"), function (b) {
                                b.selected && a.push(b.value)
                            }), c.$setViewValue(a)
                        })
                    })
                }

                function n(b, f, h) {
                    function i() {
                        var a, c, d, e, i, j = {"": []}, t = [""];
                        d = h.$modelValue, e = r(b) || [];
                        var z, A, B, C = m ? g(e) : e;
                        if (A = {}, B = !1, q)if (c = h.$modelValue, x && dd(c))for (B = new tb([]), a = {}, i = 0; i < c.length; i++)a[l] = c[i], B.put(x(b, a), c[i]); else B = new tb(c);
                        i = B;
                        var D, E;
                        for (B = 0; z = C.length, z > B; B++) {
                            if (c = B, m) {
                                if (c = C[B], "$" === c.charAt(0))continue;
                                A[m] = c
                            }
                            A[l] = e[c], a = n(b, A) || "", (c = j[a]) || (c = j[a] = [], t.push(a)), q ? a = s(i.remove(x ? x(b, A) : p(b, A))) : (x ? (a = {}, a[l] = d, a = x(b, a) === x(b, A)) : a = d === p(b, A), i = i || a), D = k(b, A), D = s(D) ? D : "", c.push({
                                id: x ? x(b, A) : m ? C[B] : B,
                                label: D,
                                selected: a
                            })
                        }
                        for (q || (u || null === d ? j[""].unshift({
                            id: "",
                            label: "",
                            selected: !i
                        }) : i || j[""].unshift({id: "?", label: "", selected: !0})), A = 0, C = t.length; C > A; A++) {
                            for (a = t[A], c = j[a], y.length <= A ? (d = {
                                element: w.clone().attr("label", a),
                                label: c.label
                            }, e = [d], y.push(e), f.append(d.element)) : (e = y[A], d = e[0], d.label != a && d.element.attr("label", d.label = a)), D = null, B = 0, z = c.length; z > B; B++)a = c[B], (i = e[B + 1]) ? (D = i.element, i.label !== a.label && D.text(i.label = a.label), i.id !== a.id && D.val(i.id = a.id), D[0].selected !== a.selected && (D.prop("selected", i.selected = a.selected), Qc && D.prop("selected", i.selected))) : ("" === a.id && u ? E = u : (E = v.clone()).val(a.id).prop("selected", a.selected).attr("selected", a.selected).text(a.label), e.push({
                                element: E,
                                label: a.label,
                                id: a.id,
                                selected: a.selected
                            }), o.addOption(a.label, E), D ? D.after(E) : d.element.append(E), D = E);
                            for (B++; e.length > B;)a = e.pop(), o.removeOption(a.label), a.element.remove()
                        }
                        for (; y.length > A;)y.pop()[0].element.remove()
                    }

                    var j;
                    if (!(j = t.match(e)))throw Ze("iexp", t, M(f));
                    var k = d(j[2] || j[1]), l = j[4] || j[6], m = j[5], n = d(j[3] || ""), p = d(j[2] ? j[1] : l), r = d(j[7]), x = j[8] ? d(j[8]) : null, y = [[{
                        element: f,
                        label: ""
                    }]];
                    u && (a(u)(b), u.removeClass("ng-scope"), u.remove()), f.empty(), f.on("change", function () {
                        b.$apply(function () {
                            var a, d, e, g, j, k, n, o, s = r(b) || [], t = {};
                            if (q) {
                                for (e = [], j = 0, n = y.length; n > j; j++)for (a = y[j], g = 1, k = a.length; k > g; g++)if ((d = a[g].element)[0].selected) {
                                    if (d = d.val(), m && (t[m] = d), x)for (o = 0; o < s.length && (t[l] = s[o], x(b, t) != d); o++); else t[l] = s[d];
                                    e.push(p(b, t))
                                }
                            } else if (d = f.val(), "?" == d)e = c; else if ("" === d)e = null; else if (x) {
                                for (o = 0; o < s.length; o++)if (t[l] = s[o], x(b, t) == d) {
                                    e = p(b, t);
                                    break
                                }
                            } else t[l] = s[d], m && (t[m] = d), e = p(b, t);
                            h.$setViewValue(e), i()
                        })
                    }), h.$render = i, b.$watchCollection(r, i), b.$watchCollection(function () {
                        var a = {}, c = r(b);
                        if (c) {
                            for (var d = Array(c.length), e = 0, f = c.length; f > e; e++)a[l] = c[e], d[e] = k(b, a);
                            return d
                        }
                    }, i), q && b.$watchCollection(function () {
                        return h.$modelValue
                    }, i)
                }

                if (k[1]) {
                    var o = k[0];
                    k = k[1];
                    var p, q = j.multiple, t = j.ngOptions, u = !1, v = Rc(b.createElement("option")), w = Rc(b.createElement("optgroup")), x = v.clone();
                    j = 0;
                    for (var y = i.children(), z = y.length; z > j; j++)if ("" === y[j].value) {
                        p = u = y.eq(j);
                        break
                    }
                    o.init(k, u, x), q && (k.$isEmpty = function (a) {
                        return !a || 0 === a.length
                    }), t ? n(h, i, k) : q ? m(h, i, k) : l(h, i, k, o)
                }
            }
        }
    }], af = ["$interpolate", function (a) {
        var b = {addOption: o, removeOption: o};
        return {
            restrict: "E", priority: 100, compile: function (c, d) {
                if (r(d.value)) {
                    var e = a(c.text(), !0);
                    e || d.$set("value", c.text())
                }
                return function (a, c, d) {
                    var f = c.parent(), g = f.data("$selectController") || f.parent().data("$selectController");
                    g && g.databound ? c.prop("selected", !1) : g = b, e ? a.$watch(e, function (a, b) {
                        d.$set("value", a), a !== b && g.removeOption(b), g.addOption(a)
                    }) : g.addOption(d.value), c.on("$destroy", function () {
                        g.removeOption(d.value)
                    })
                }
            }
        }
    }], bf = q({restrict: "E", terminal: !0});
    a.angular.bootstrap ? console.log("WARNING: Tried to load angular more than once.") : ((Sc = a.jQuery) && Sc.fn.on ? (Rc = Sc, l(Sc.fn, {
        scope: ud.scope,
        isolateScope: ud.isolateScope,
        controller: ud.controller,
        injector: ud.injector,
        inheritedData: ud.inheritedData
    }), bb("remove", !0, !0, !1), bb("empty", !1, !1, !1), bb("html", !1, !1, !0)) : Rc = cb, bd.element = Rc, _(bd), Rc(b).ready(function () {
        S(b, T)
    }))
}(window, document), !window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>'), function (a, b) {
    "use strict";
    function c() {
        this.$get = ["$$sanitizeUri", function (a) {
            return function (b) {
                var c = [];
                return f(b, i(c, function (b, c) {
                    return !/^unsafe/.test(a(b, c))
                })), c.join("")
            }
        }]
    }

    function d(a) {
        var c = [], d = i(c, b.noop);
        return d.chars(a), c.join("")
    }

    function e(a) {
        var b, c = {}, d = a.split(",");
        for (b = 0; b < d.length; b++)c[d[b]] = !0;
        return c
    }

    function f(a, c) {
        function d(a, d, f, h) {
            if (d = b.lowercase(d), y[d])for (; s.last() && z[s.last()];)e("", s.last());
            x[d] && s.last() == d && e("", d), h = u[d] || !!h, h || s.push(d);
            var i = {};
            f.replace(m, function (a, b, c, d, e) {
                var f = c || d || e || "";
                i[b] = g(f)
            }), c.start && c.start(d, i, h)
        }

        function e(a, d) {
            var e, f = 0;
            if (d = b.lowercase(d))for (f = s.length - 1; f >= 0 && s[f] != d; f--);
            if (f >= 0) {
                for (e = s.length - 1; e >= f; e--)c.end && c.end(s[e]);
                s.length = f
            }
        }

        var f, h, i, s = [], t = a;
        for (s.last = function () {
            return s[s.length - 1]
        }; a;) {
            if (h = !0, s.last() && A[s.last()])a = a.replace(new RegExp("(.*)<\\s*\\/\\s*" + s.last() + "[^>]*>", "i"), function (a, b) {
                return b = b.replace(p, "$1").replace(r, "$1"), c.chars && c.chars(g(b)), ""
            }), e("", s.last()); else if (0 === a.indexOf("<!--") ? (f = a.indexOf("--", 4), f >= 0 && a.lastIndexOf("-->", f) === f && (c.comment && c.comment(a.substring(4, f)), a = a.substring(f + 3), h = !1)) : q.test(a) ? (i = a.match(q), i && (a = a.replace(i[0], ""), h = !1)) : o.test(a) ? (i = a.match(l), i && (a = a.substring(i[0].length), i[0].replace(l, e), h = !1)) : n.test(a) && (i = a.match(k), i && (a = a.substring(i[0].length), i[0].replace(k, d), h = !1)), h) {
                f = a.indexOf("<");
                var v = 0 > f ? a : a.substring(0, f);
                a = 0 > f ? "" : a.substring(f), c.chars && c.chars(g(v))
            }
            if (a == t)throw j("badparse", "The sanitizer was unable to parse the following block of html: {0}", a);
            t = a
        }
        e()
    }

    function g(a) {
        if (!a)return "";
        var b = F.exec(a), c = b[1], d = b[3], e = b[2];
        return e && (E.innerHTML = e.replace(/</g, "&lt;"), e = "textContent"in E ? E.textContent : E.innerText), c + e + d
    }

    function h(a) {
        return a.replace(/&/g, "&amp;").replace(s, function (a) {
            var b = a.charCodeAt(0), c = a.charCodeAt(1);
            return "&#" + (1024 * (b - 55296) + (c - 56320) + 65536) + ";"
        }).replace(t, function (a) {
            return "&#" + a.charCodeAt(0) + ";"
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    function i(a, c) {
        var d = !1, e = b.bind(a, a.push);
        return {
            start: function (a, f, g) {
                a = b.lowercase(a), !d && A[a] && (d = a), d || B[a] !== !0 || (e("<"), e(a), b.forEach(f, function (d, f) {
                    var g = b.lowercase(f), i = "img" === a && "src" === g || "background" === g;
                    D[g] !== !0 || C[g] === !0 && !c(d, i) || (e(" "), e(f), e('="'), e(h(d)), e('"'))
                }), e(g ? "/>" : ">"))
            }, end: function (a) {
                a = b.lowercase(a), d || B[a] !== !0 || (e("</"), e(a), e(">")), a == d && (d = !1)
            }, chars: function (a) {
                d || e(h(a))
            }
        }
    }

    var j = b.$$minErr("$sanitize"), k = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, l = /^<\s*\/\s*([\w:-]+)[^>]*>/, m = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, n = /^</, o = /^<\s*\//, p = /<!--(.*?)-->/g, q = /<!DOCTYPE([^>]*?)>/i, r = /<!\[CDATA\[(.*?)]]>/g, s = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, t = /([^\#-~| |!])/g, u = e("area,br,col,hr,img,wbr"), v = e("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), w = e("rp,rt"), x = b.extend({}, w, v), y = b.extend({}, v, e("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")), z = b.extend({}, w, e("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")), A = e("script,style"), B = b.extend({}, u, y, z, x), C = e("background,cite,href,longdesc,src,usemap"), D = b.extend({}, C, e("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")), E = document.createElement("pre"), F = /^(\s*)([\s\S]*?)(\s*)$/;
    b.module("ngSanitize", []).provider("$sanitize", c), b.module("ngSanitize").filter("linky", ["$sanitize", function (a) {
        var c = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/, e = /^mailto:/;
        return function (f, g) {
            function h(a) {
                a && n.push(d(a))
            }

            function i(a, c) {
                n.push("<a "), b.isDefined(g) && (n.push('target="'), n.push(g), n.push('" ')), n.push('href="'), n.push(a), n.push('">'), h(c), n.push("</a>")
            }

            if (!f)return f;
            for (var j, k, l, m = f, n = []; j = m.match(c);)k = j[0], j[2] == j[3] && (k = "mailto:" + k), l = j.index, h(m.substr(0, l)), i(k, j[0].replace(e, "")), m = m.substring(l + j[0].length);
            return h(m), a(n.join(""))
        }
    }])
}(window, window.angular), function (a, b, c) {
    "use strict";
    b.module("ngAnimate", ["ng"]).factory("$$animateReflow", ["$$rAF", "$document", function (a, b) {
        var c = b[0].body;
        return function (b) {
            return a(function () {
                c.offsetWidth + 1;
                b()
            })
        }
    }]).config(["$provide", "$animateProvider", function (d, e) {
        function f(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                if (c.nodeType == m)return c
            }
        }

        function g(a) {
            return a && b.element(a)
        }

        function h(a) {
            return b.element(f(a))
        }

        function i(a, b) {
            return f(a) == f(b)
        }

        var j = b.noop, k = b.forEach, l = e.$$selectors, m = 1, n = "$$ngAnimateState", o = "ng-animate", p = {running: !0};
        d.decorator("$animate", ["$delegate", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", function (a, c, d, m, q, r) {
            function s(a) {
                if (a) {
                    var b = [], e = {}, f = a.substr(1).split(".");
                    (d.transitions || d.animations) && b.push(c.get(l[""]));
                    for (var g = 0; g < f.length; g++) {
                        var h = f[g], i = l[h];
                        i && !e[h] && (b.push(c.get(i)), e[h] = !0)
                    }
                    return b
                }
            }

            function t(a, c, d) {
                function e(a, b) {
                    var c = a[b], d = a["before" + b.charAt(0).toUpperCase() + b.substr(1)];
                    return c || d ? ("leave" == b && (d = c, c = null), v.push({event: b, fn: c}), r.push({
                        event: b,
                        fn: d
                    }), !0) : void 0
                }

                function f(b, c, e) {
                    function f(a) {
                        if (c) {
                            if ((c[a] || j)(), ++l < g.length)return;
                            c = null
                        }
                        e()
                    }

                    var g = [];
                    k(b, function (a) {
                        a.fn && g.push(a)
                    });
                    var l = 0;
                    k(g, function (b, e) {
                        var g = function () {
                            f(e)
                        };
                        switch (b.event) {
                            case"setClass":
                                c.push(b.fn(a, h, i, g));
                                break;
                            case"addClass":
                                c.push(b.fn(a, h || d, g));
                                break;
                            case"removeClass":
                                c.push(b.fn(a, i || d, g));
                                break;
                            default:
                                c.push(b.fn(a, g))
                        }
                    }), c && 0 === c.length && e()
                }

                var g = a[0];
                if (g) {
                    var h, i, l = "setClass" == c, m = l || "addClass" == c || "removeClass" == c;
                    b.isArray(d) && (h = d[0], i = d[1], d = h + " " + i);
                    var n = a.attr("class"), o = n + " " + d;
                    if (A(o)) {
                        var p = j, q = [], r = [], t = j, u = [], v = [], w = (" " + o).replace(/\s+/g, ".");
                        return k(s(w), function (a) {
                            var b = e(a, c);
                            !b && l && (e(a, "addClass"), e(a, "removeClass"))
                        }), {
                            node: g,
                            event: c,
                            className: d,
                            isClassBased: m,
                            isSetClassOperation: l,
                            before: function (a) {
                                p = a, f(r, q, function () {
                                    p = j, a()
                                })
                            },
                            after: function (a) {
                                t = a, f(v, u, function () {
                                    t = j, a()
                                })
                            },
                            cancel: function () {
                                q && (k(q, function (a) {
                                    (a || j)(!0)
                                }), p(!0)), u && (k(u, function (a) {
                                    (a || j)(!0)
                                }), t(!0))
                            }
                        }
                    }
                }
            }

            function u(a, c, d, e, f, g, h) {
                function i(b) {
                    var e = "$animate:" + b;
                    u && u[e] && u[e].length > 0 && q(function () {
                        d.triggerHandler(e, {event: a, className: c})
                    })
                }

                function j() {
                    i("before")
                }

                function l() {
                    i("after")
                }

                function m() {
                    i("close"), h && q(function () {
                        h()
                    })
                }

                function p() {
                    p.hasBeenRun || (p.hasBeenRun = !0, g())
                }

                function r() {
                    if (!r.hasBeenRun) {
                        r.hasBeenRun = !0;
                        var b = d.data(n);
                        b && (s && s.isClassBased ? w(d, c) : (q(function () {
                            var b = d.data(n) || {};
                            H == b.index && w(d, c, a)
                        }), d.data(n, b))), m()
                    }
                }

                var s = t(d, a, c);
                if (!s)return p(), j(), l(), void r();
                c = s.className;
                var u = b.element._data(s.node);
                u = u && u.events, e || (e = f ? f.parent() : d.parent());
                var v = d.data(n) || {}, z = v.active || {}, A = v.totalActive || 0, B = v.last, C = s.isClassBased ? v.disabled || B && !B.isClassBased : !1;
                if (C || x(d, e))return p(), j(), l(), void r();
                var D = !1;
                if (A > 0) {
                    var E = [];
                    if (s.isClassBased) {
                        if ("setClass" == B.event)E.push(B), w(d, c); else if (z[c]) {
                            var F = z[c];
                            F.event == a ? D = !0 : (E.push(F), w(d, c))
                        }
                    } else if ("leave" == a && z["ng-leave"])D = !0; else {
                        for (var G in z)E.push(z[G]), w(d, G);
                        z = {}, A = 0
                    }
                    E.length > 0 && k(E, function (a) {
                        a.cancel()
                    })
                }
                if (!s.isClassBased || s.isSetClassOperation || D || (D = "addClass" == a == d.hasClass(c)), D)return p(), j(), l(), void m();
                "leave" == a && d.one("$destroy", function () {
                    var a = b.element(this), c = a.data(n);
                    if (c) {
                        var d = c.active["ng-leave"];
                        d && (d.cancel(), w(a, "ng-leave"))
                    }
                }), d.addClass(o);
                var H = y++;
                A++, z[c] = s, d.data(n, {last: s, active: z, index: H, totalActive: A}), j(), s.before(function (b) {
                    var e = d.data(n);
                    b = b || !e || !e.active[c] || s.isClassBased && e.active[c].event != a, p(), b === !0 ? r() : (l(), s.after(r))
                })
            }

            function v(a) {
                var c = f(a);
                if (c) {
                    var d = b.isFunction(c.getElementsByClassName) ? c.getElementsByClassName(o) : c.querySelectorAll("." + o);
                    k(d, function (a) {
                        a = b.element(a);
                        var c = a.data(n);
                        c && c.active && k(c.active, function (a) {
                            a.cancel()
                        })
                    })
                }
            }

            function w(a, b) {
                if (i(a, m))p.disabled || (p.running = !1, p.structural = !1); else if (b) {
                    var c = a.data(n) || {}, d = b === !0;
                    !d && c.active && c.active[b] && (c.totalActive--, delete c.active[b]), (d || !c.totalActive) && (a.removeClass(o), a.removeData(n))
                }
            }

            function x(a, b) {
                if (p.disabled)return !0;
                if (i(a, m))return p.disabled || p.running;
                do {
                    if (0 === b.length)break;
                    var c = i(b, m), d = c ? p : b.data(n) || {}, e = d.disabled || d.running ? !0 : d.last && !d.last.isClassBased;
                    if (c || e)return e;
                    if (c)return !0
                } while (b = b.parent());
                return !0
            }

            var y = 0;
            m.data(n, p), r.$$postDigest(function () {
                r.$$postDigest(function () {
                    p.running = !1
                })
            });
            var z = e.classNameFilter(), A = z ? function (a) {
                return z.test(a)
            } : function () {
                return !0
            };
            return {
                enter: function (c, d, e, f) {
                    c = b.element(c), d = g(d), e = g(e), this.enabled(!1, c), a.enter(c, d, e), r.$$postDigest(function () {
                        c = h(c), u("enter", "ng-enter", c, d, e, j, f)
                    })
                }, leave: function (c, d) {
                    c = b.element(c), v(c), this.enabled(!1, c), r.$$postDigest(function () {
                        u("leave", "ng-leave", h(c), null, null, function () {
                            a.leave(c)
                        }, d)
                    })
                }, move: function (c, d, e, f) {
                    c = b.element(c), d = g(d), e = g(e), v(c), this.enabled(!1, c), a.move(c, d, e), r.$$postDigest(function () {
                        c = h(c), u("move", "ng-move", c, d, e, j, f)
                    })
                }, addClass: function (c, d, e) {
                    c = b.element(c), c = h(c), u("addClass", d, c, null, null, function () {
                        a.addClass(c, d)
                    }, e)
                }, removeClass: function (c, d, e) {
                    c = b.element(c), c = h(c), u("removeClass", d, c, null, null, function () {
                        a.removeClass(c, d)
                    }, e)
                }, setClass: function (c, d, e, f) {
                    c = b.element(c), c = h(c), u("setClass", [d, e], c, null, null, function () {
                        a.setClass(c, d, e)
                    }, f)
                }, enabled: function (a, b) {
                    switch (arguments.length) {
                        case 2:
                            if (a)w(b); else {
                                var c = b.data(n) || {};
                                c.disabled = !0, b.data(n, c)
                            }
                            break;
                        case 1:
                            p.disabled = !a;
                            break;
                        default:
                            a = !p.disabled
                    }
                    return !!a
                }
            }
        }]), e.register("", ["$window", "$sniffer", "$timeout", "$$animateReflow", function (d, e, g, h) {
            function i(a, b) {
                E && E(), Q.push(b), E = h(function () {
                    k(Q, function (a) {
                        a()
                    }), Q = [], E = null, O = {}
                })
            }

            function l(a, c) {
                var d = f(a);
                a = b.element(d), T.push(a);
                var e = Date.now() + c;
                S >= e || (g.cancel(R), S = e, R = g(function () {
                    n(T), T = []
                }, c, !1))
            }

            function n(a) {
                k(a, function (a) {
                    var b = a.data(K);
                    b && (b.closeAnimationFn || j)()
                })
            }

            function o(a, b) {
                var c = b ? O[b] : null;
                if (!c) {
                    var e, f, g, h, i = 0, j = 0, l = 0, n = 0;
                    k(a, function (a) {
                        if (a.nodeType == m) {
                            var b = d.getComputedStyle(a) || {};
                            g = b[z + F], i = Math.max(p(g), i), h = b[z + G], e = b[z + H], j = Math.max(p(e), j), f = b[B + H], n = Math.max(p(f), n);
                            var c = p(b[B + F]);
                            c > 0 && (c *= parseInt(b[B + I], 10) || 1), l = Math.max(c, l)
                        }
                    }), c = {
                        total: 0,
                        transitionPropertyStyle: h,
                        transitionDurationStyle: g,
                        transitionDelayStyle: e,
                        transitionDelay: j,
                        transitionDuration: i,
                        animationDelayStyle: f,
                        animationDelay: n,
                        animationDuration: l
                    }, b && (O[b] = c)
                }
                return c
            }

            function p(a) {
                var c = 0, d = b.isString(a) ? a.split(/\s*,\s*/) : [];
                return k(d, function (a) {
                    c = Math.max(parseFloat(a) || 0, c)
                }), c
            }

            function q(a) {
                var b = a.parent(), c = b.data(J);
                return c || (b.data(J, ++P), c = P), c + "-" + f(a).getAttribute("class")
            }

            function r(a, b, c) {
                var d = ["ng-enter", "ng-leave", "ng-move"].indexOf(c) >= 0, e = q(b), g = e + " " + c, h = O[g] ? ++O[g].total : 0, i = {};
                if (h > 0) {
                    var k = c + "-stagger", l = e + " " + k, m = !O[l];
                    m && b.addClass(k), i = o(b, l), m && b.removeClass(k)
                }
                b.addClass(c);
                var n = b.data(K) || {}, p = o(b, g), r = p.transitionDuration, s = p.animationDuration;
                if (d && 0 === r && 0 === s)return b.removeClass(c), !1;
                var t = d && r > 0, u = s > 0 && i.animationDelay > 0 && 0 === i.animationDuration;
                b.data(K, {
                    stagger: i,
                    cacheKey: g,
                    running: n.running || 0,
                    itemIndex: h,
                    blockTransition: t,
                    blockAnimation: u,
                    closeAnimationFn: j
                });
                var v = f(b);
                return t && (v.style[z + G] = "none"), u && (v.style[B] = "none 0s"), !0
            }

            function s(a, b, c, d) {
                function e() {
                    b.off(I, g), b.removeClass(j), x(b, c);
                    var a = f(b);
                    for (var d in w)a.style.removeProperty(w[d])
                }

                function g(a) {
                    a.stopPropagation();
                    var b = a.originalEvent || a, c = b.$manualTimeStamp || b.timeStamp || Date.now(), e = parseFloat(b.elapsedTime.toFixed(L));
                    Math.max(c - H, 0) >= u && e >= p && d()
                }

                var h = f(b), i = b.data(K);
                if (-1 == h.getAttribute("class").indexOf(c) || !i)return void d();
                i.blockTransition && (h.style[z + G] = ""), i.blockAnimation && (h.style[B] = "");
                var j = "";
                k(c.split(" "), function (a, b) {
                    j += (b > 0 ? " " : "") + a + "-active"
                }), b.addClass(j);
                var m = i.cacheKey + " " + j, n = o(b, m), p = Math.max(n.transitionDuration, n.animationDuration);
                if (0 === p)return b.removeClass(j), x(b, c), void d();
                var q = Math.max(n.transitionDelay, n.animationDelay), r = i.stagger, s = i.itemIndex, u = q * N, v = "", w = [];
                if (n.transitionDuration > 0) {
                    var y = n.transitionPropertyStyle;
                    -1 == y.indexOf("all") && (v += D + "transition-property: " + y + ";", v += D + "transition-duration: " + n.transitionDurationStyle + ";", w.push(D + "transition-property"), w.push(D + "transition-duration"))
                }
                if (s > 0) {
                    if (r.transitionDelay > 0 && 0 === r.transitionDuration) {
                        var E = n.transitionDelayStyle;
                        v += D + "transition-delay: " + t(E, r.transitionDelay, s) + "; ", w.push(D + "transition-delay")
                    }
                    r.animationDelay > 0 && 0 === r.animationDuration && (v += D + "animation-delay: " + t(n.animationDelayStyle, r.animationDelay, s) + "; ", w.push(D + "animation-delay"))
                }
                if (w.length > 0) {
                    var F = h.getAttribute("style") || "";
                    h.setAttribute("style", F + "; " + v)
                }
                var H = Date.now(), I = C + " " + A;
                b.on(I, g), i.closeAnimationFn = function () {
                    e(), d()
                };
                var J = s * (Math.max(r.animationDelay, r.transitionDelay) || 0), O = (q + p) * M, P = (J + O) * N;
                return i.running++, l(b, P), e
            }

            function t(a, b, c) {
                var d = "";
                return k(a.split(","), function (a, e) {
                    d += (e > 0 ? "," : "") + (c * b + parseInt(a, 10)) + "s"
                }), d
            }

            function u(a, b, c, d) {
                return r(a, b, c, d) ? function (a) {
                    a && x(b, c)
                } : void 0
            }

            function v(a, b, c, d) {
                return b.data(K) ? s(a, b, c, d) : (x(b, c), void d())
            }

            function w(a, b, c, d) {
                var e = u(a, b, c);
                if (!e)return void d();
                var f = e;
                return i(b, function () {
                    f = v(a, b, c, d)
                }), function (a) {
                    (f || j)(a)
                }
            }

            function x(a, b) {
                a.removeClass(b);
                var c = a.data(K);
                c && (c.running && c.running--, c.running && 0 !== c.running || a.removeData(K))
            }

            function y(a, c) {
                var d = "";
                return a = b.isArray(a) ? a : a.split(/\s+/), k(a, function (a, b) {
                    a && a.length > 0 && (d += (b > 0 ? " " : "") + a + c)
                }), d
            }

            var z, A, B, C, D = "";
            a.ontransitionend === c && a.onwebkittransitionend !== c ? (D = "-webkit-", z = "WebkitTransition", A = "webkitTransitionEnd transitionend") : (z = "transition", A = "transitionend"), a.onanimationend === c && a.onwebkitanimationend !== c ? (D = "-webkit-", B = "WebkitAnimation", C = "webkitAnimationEnd animationend") : (B = "animation", C = "animationend");
            var E, F = "Duration", G = "Property", H = "Delay", I = "IterationCount", J = "$$ngAnimateKey", K = "$$ngAnimateCSS3Data", L = 3, M = 1.5, N = 1e3, O = {}, P = 0, Q = [], R = null, S = 0, T = [];
            return {
                enter: function (a, b) {
                    return w("enter", a, "ng-enter", b)
                }, leave: function (a, b) {
                    return w("leave", a, "ng-leave", b)
                }, move: function (a, b) {
                    return w("move", a, "ng-move", b)
                }, beforeSetClass: function (a, b, c, d) {
                    var e = y(c, "-remove") + " " + y(b, "-add"), f = u("setClass", a, e);
                    return f ? (i(a, d), f) : void d()
                }, beforeAddClass: function (a, b, c) {
                    var d = u("addClass", a, y(b, "-add"));
                    return d ? (i(a, c), d) : void c()
                }, beforeRemoveClass: function (a, b, c) {
                    var d = u("removeClass", a, y(b, "-remove"));
                    return d ? (i(a, c), d) : void c()
                }, setClass: function (a, b, c, d) {
                    c = y(c, "-remove"), b = y(b, "-add");
                    var e = c + " " + b;
                    return v("setClass", a, e, d)
                }, addClass: function (a, b, c) {
                    return v("addClass", a, y(b, "-add"), c)
                }, removeClass: function (a, b, c) {
                    return v("removeClass", a, y(b, "-remove"), c)
                }
            }
        }])
    }])
}(window, window.angular), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"), function (a, b, c) {
    "use strict";
    function d(a, b) {
        return I(new (I(function () {
        }, {prototype: a})), b)
    }

    function e(a) {
        return H(arguments, function (b) {
            b !== a && H(b, function (b, c) {
                a.hasOwnProperty(c) || (a[c] = b)
            })
        }), a
    }

    function f(a, b) {
        var c = [];
        for (var d in a.path) {
            if (a.path[d] !== b.path[d])break;
            c.push(a.path[d])
        }
        return c
    }

    function g(a) {
        if (Object.keys)return Object.keys(a);
        var c = [];
        return b.forEach(a, function (a, b) {
            c.push(b)
        }), c
    }

    function h(a, b) {
        if (Array.prototype.indexOf)return a.indexOf(b, Number(arguments[2]) || 0);
        var c = a.length >>> 0, d = Number(arguments[2]) || 0;
        for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++)if (d in a && a[d] === b)return d;
        return -1
    }

    function i(a, b, c, d) {
        var e, i = f(c, d), j = {}, k = [];
        for (var l in i)if (i[l].params && (e = g(i[l].params), e.length))for (var m in e)h(k, e[m]) >= 0 || (k.push(e[m]), j[e[m]] = a[e[m]]);
        return I({}, j, b)
    }

    function j(a, b, c) {
        if (!c) {
            c = [];
            for (var d in a)c.push(d)
        }
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            if (a[f] != b[f])return !1
        }
        return !0
    }

    function k(a, b) {
        var c = {};
        return H(a, function (a) {
            c[a] = b[a]
        }), c
    }

    function l(a, b) {
        var d = 1, f = 2, g = {}, h = [], i = g, j = I(a.when(g), {$$promises: g, $$values: g});
        this.study = function (g) {
            function k(a, c) {
                if (o[c] !== f) {
                    if (n.push(c), o[c] === d)throw n.splice(0, n.indexOf(c)), new Error("Cyclic dependency: " + n.join(" -> "));
                    if (o[c] = d, E(a))m.push(c, [function () {
                        return b.get(a)
                    }], h); else {
                        var e = b.annotate(a);
                        H(e, function (a) {
                            a !== c && g.hasOwnProperty(a) && k(g[a], a)
                        }), m.push(c, a, e)
                    }
                    n.pop(), o[c] = f
                }
            }

            function l(a) {
                return F(a) && a.then && a.$$promises
            }

            if (!F(g))throw new Error("'invocables' must be an object");
            var m = [], n = [], o = {};
            return H(g, k), g = n = o = null, function (d, f, g) {
                function h() {
                    --s || (t || e(r, f.$$values), p.$$values = r, p.$$promises = !0, o.resolve(r))
                }

                function k(a) {
                    p.$$failure = a, o.reject(a)
                }

                function n(c, e, f) {
                    function i(a) {
                        l.reject(a), k(a)
                    }

                    function j() {
                        C(p.$$failure) || (l.resolve(b.invoke(e, g, r)), l.promise.then(function (a) {
                            r[c] = a, h()
                        }, i))
                    }

                    var l = a.defer(), m = 0;
                    H(f, function (a) {
                        q.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, q[a].then(function (b) {
                            r[a] = b, --m || j()
                        }, i))
                    }), m || j(), q[c] = l.promise
                }

                if (l(d) && g === c && (g = f, f = d, d = null), d) {
                    if (!F(d))throw new Error("'locals' must be an object")
                } else d = i;
                if (f) {
                    if (!l(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                } else f = j;
                var o = a.defer(), p = o.promise, q = p.$$promises = {}, r = I({}, d), s = 1 + m.length / 3, t = !1;
                if (C(f.$$failure))return k(f.$$failure), p;
                f.$$values ? (t = e(r, f.$$values), h()) : (I(q, f.$$promises), f.then(h, k));
                for (var u = 0, v = m.length; v > u; u += 3)d.hasOwnProperty(m[u]) ? h() : n(m[u], m[u + 1], m[u + 2]);
                return p
            }
        }, this.resolve = function (a, b, c, d) {
            return this.study(a)(b, c, d)
        }
    }

    function m(a, b, c) {
        this.fromConfig = function (a, b, c) {
            return C(a.template) ? this.fromString(a.template, b) : C(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : C(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null
        }, this.fromString = function (a, b) {
            return D(a) ? a(b) : a
        }, this.fromUrl = function (c, d) {
            return D(c) && (c = c(d)), null == c ? null : a.get(c, {cache: b}).then(function (a) {
                return a.data
            })
        }, this.fromProvider = function (a, b, d) {
            return c.invoke(a, null, d || {params: b})
        }
    }

    function n(a, d) {
        function e(a) {
            return C(a) ? this.type.decode(a) : p.$$getDefaultValue(this)
        }

        function f(b, c, d) {
            if (!/^\w+(-+\w+)*$/.test(b))throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");
            if (n[b])throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");
            n[b] = I({type: c || new o, $value: e}, d)
        }

        function g(a, b, c) {
            var d = a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
            if (!b)return d;
            var e = c ? "?" : "";
            return d + e + "(" + b + ")" + e
        }

        function h(a) {
            if (!d.params || !d.params[a])return {};
            var b = d.params[a];
            return F(b) ? b : {value: b}
        }

        d = b.isObject(d) ? d : {};
        var i, j = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, k = "^", l = 0, m = this.segments = [], n = this.params = {};
        this.source = a;
        for (var q, r, s, t, u; (i = j.exec(a)) && (q = i[2] || i[3], r = i[4] || ("*" == i[1] ? ".*" : "[^/]*"), s = a.substring(l, i.index), t = this.$types[r] || new o({pattern: new RegExp(r)}), u = h(q), !(s.indexOf("?") >= 0));)k += g(s, t.$subPattern(), C(u.value)), f(q, t, u), m.push(s), l = j.lastIndex;
        s = a.substring(l);
        var v = s.indexOf("?");
        if (v >= 0) {
            var w = this.sourceSearch = s.substring(v);
            s = s.substring(0, v), this.sourcePath = a.substring(0, l + v), H(w.substring(1).split(/[&?]/), function (a) {
                f(a, null, h(a))
            })
        } else this.sourcePath = a, this.sourceSearch = "";
        k += g(s) + (d.strict === !1 ? "/?" : "") + "$", m.push(s), this.regexp = new RegExp(k, d.caseInsensitive ? "i" : c), this.prefix = m[0]
    }

    function o(a) {
        I(this, a)
    }

    function p() {
        function a() {
            return {strict: f, caseInsensitive: e}
        }

        function b(a) {
            return D(a) || G(a) && D(a[a.length - 1])
        }

        function c() {
            H(h, function (a) {
                if (n.prototype.$types[a.name])throw new Error("A type named '" + a.name + "' has already been defined.");
                var c = new o(b(a.def) ? d.invoke(a.def) : a.def);
                n.prototype.$types[a.name] = c
            })
        }

        var d, e = !1, f = !0, g = !0, h = [], i = {
            "int": {
                decode: function (a) {
                    return parseInt(a, 10)
                }, is: function (a) {
                    return C(a) ? this.decode(a.toString()) === a : !1
                }, pattern: /\d+/
            }, bool: {
                encode: function (a) {
                    return a ? 1 : 0
                }, decode: function (a) {
                    return 0 === parseInt(a, 10) ? !1 : !0
                }, is: function (a) {
                    return a === !0 || a === !1
                }, pattern: /0|1/
            }, string: {pattern: /[^\/]*/}, date: {
                equals: function (a, b) {
                    return a.toISOString() === b.toISOString()
                }, decode: function (a) {
                    return new Date(a)
                }, encode: function (a) {
                    return [a.getFullYear(), ("0" + (a.getMonth() + 1)).slice(-2), ("0" + a.getDate()).slice(-2)].join("-")
                }, pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/
            }
        };
        p.$$getDefaultValue = function (a) {
            if (!b(a.value))return a.value;
            if (!d)throw new Error("Injectable functions cannot be called at configuration time");
            return d.invoke(a.value)
        }, this.caseInsensitive = function (a) {
            e = a
        }, this.strictMode = function (a) {
            f = a
        }, this.compile = function (b, c) {
            return new n(b, I(a(), c))
        }, this.isMatcher = function (a) {
            if (!F(a))return !1;
            var b = !0;
            return H(n.prototype, function (c, d) {
                D(c) && (b = b && C(a[d]) && D(a[d]))
            }), b
        }, this.type = function (a, b) {
            return C(b) ? (h.push({name: a, def: b}), g || c(), this) : n.prototype.$types[a]
        }, this.$get = ["$injector", function (a) {
            return d = a, g = !1, n.prototype.$types = {}, c(), H(i, function (a, b) {
                n.prototype.$types[b] || (n.prototype.$types[b] = new o(a))
            }), this
        }]
    }

    function q(a, b) {
        function d(a) {
            var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
            return null != b ? b[1].replace(/\\(.)/g, "$1") : ""
        }

        function e(a, b) {
            return a.replace(/\$(\$|\d{1,2})/, function (a, c) {
                return b["$" === c ? 0 : Number(c)]
            })
        }

        function f(a, b, c) {
            if (!c)return !1;
            var d = a.invoke(b, b, {$match: c});
            return C(d) ? d : !0
        }

        function g(b, c, d, e) {
            function f(a, b, c) {
                return "/" === m ? a : b ? m.slice(0, -1) + a : c ? m.slice(1) + a : a
            }

            function g(a) {
                function c(a) {
                    var c = a(d, b);
                    return c ? (E(c) && b.replace().url(c.html), !0) : !1
                }

                if (!a || !a.defaultPrevented) {
                    var e, f = i.length;
                    for (e = 0; f > e; e++)if (c(i[e]))return;
                    j && c(j)
                }
            }

            function l() {
                return h = h || c.$on("$locationChangeSuccess", g)
            }

            var m = e.baseHref(), n = b.url();
            return k || l(), {
                sync: function () {
                    g()
                }, listen: function () {
                    return l()
                }, update: function (a) {
                    return a ? void(n = b.url()) : void(b.url() !== n && (b.url(n.html), b.replace()))
                }, push: function (a, c, d) {
                    b.url(a.html)
                    ),
                    d && d.replace && b.replace()
                }, href: function (c, d, e) {
                    if (!c.validates(d))return null;
                    var g = a.html5Mode(), h = c.format(d);
                    if (e = e || {}, !g && h && (h = "#" + a.hashPrefix() + h), h = f(h, g, e.absolute), !e.absolute || !h)return h;
                    var i = !g && h ? "/" : "", j = b.port();
                    return j = 80 === j || 443 === j ? "" : ":" + j, [b.protocol(), "://", b.host(), j, i, h].join("")
                }
            }
        }

        var h, i = [], j = null, k = !1;
        this.rule = function (a) {
            if (!D(a))throw new Error("'rule' must be a function");
            return i.push(a), this
        }, this.otherwise = function (a) {
            if (E(a)) {
                var b = a;
                a = function () {
                    return b
                }
            } else if (!D(a))throw new Error("'rule' must be a function");
            return j = a, this
        }, this.when = function (a, c) {
            var g, h = E(c);
            if (E(a) && (a = b.compile(a)), !h && !D(c) && !G(c))throw new Error("invalid 'handler' in when()");
            var i = {
                matcher: function (a, c) {
                    return h && (g = b.compile(c), c = ["$match", function (a) {
                        return g.format(a)
                    }]), I(function (b, d) {
                        return f(b, c, a.exec(d.path(), d.search()))
                    }, {prefix: E(a.prefix) ? a.prefix : ""})
                }, regex: function (a, b) {
                    if (a.global || a.sticky)throw new Error("when() RegExp must not be global or sticky");
                    return h && (g = b, b = ["$match", function (a) {
                        return e(g, a)
                    }]), I(function (c, d) {
                        return f(c, b, a.exec(d.path()))
                    }, {prefix: d(a)})
                }
            }, j = {matcher: b.isMatcher(a), regex: a instanceof RegExp};
            for (var k in j)if (j[k])return this.rule(i[k](a, c));
            throw new Error("invalid 'what' in when()")
        }, this.deferIntercept = function (a) {
            a === c && (a = !0), k = a
        }, this.$get = g, g.$inject = ["$location", "$rootScope", "$injector", "$browser"]
    }

    function r(a, e) {
        function f(a) {
            return 0 === a.indexOf(".") || 0 === a.indexOf("^")
        }

        function h(a, b) {
            if (!a)return c;
            var d = E(a), e = d ? a : a.name, g = f(e);
            if (g) {
                if (!b)throw new Error("No reference point given for path '" + e + "'");
                for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++)if ("" !== h[i] || 0 !== i) {
                    if ("^" !== h[i])break;
                    if (!k.parent)throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");
                    k = k.parent
                } else k = b;
                h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h
            }
            var l = v[e];
            return !l || !d && (d || l !== a && l.self !== a) ? c : l
        }

        function l(a, b) {
            w[a] || (w[a] = []), w[a].push(b)
        }

        function m(b) {
            b = d(b, {
                self: b, resolve: b.resolve || {}, toString: function () {
                    return this.name
                }
            });
            var c = b.name;
            if (!E(c) || c.indexOf("@") >= 0)throw new Error("State must have a valid name");
            if (v.hasOwnProperty(c))throw new Error("State '" + c + "'' is already defined");
            var e = -1 !== c.indexOf(".") ? c.substring(0, c.lastIndexOf(".")) : E(b.parent) ? b.parent : "";
            if (e && !v[e])return l(e, b.self);
            for (var f in y)D(y[f]) && (b[f] = y[f](b, y.$delegates[f]));
            if (v[c] = b, !b[x] && b.url && a.when(b.url, ["$match", "$stateParams", function (a, c) {
                    u.$current.navigable == b && j(a, c) || u.transitionTo(b, a, {location: !1})
                }]), w[c])for (var g = 0; g < w[c].length; g++)m(w[c][g]);
            return b
        }

        function n(a) {
            return a.indexOf("*") > -1
        }

        function o(a) {
            var b = a.split("."), c = u.$current.name.split(".");
            if ("**" === b[0] && (c = c.slice(c.indexOf(b[1])), c.unshift("**")), "**" === b[b.length - 1] && (c.splice(c.indexOf(b[b.length - 2]) + 1, Number.MAX_VALUE), c.push("**")), b.length != c.length)return !1;
            for (var d = 0, e = b.length; e > d; d++)"*" === b[d] && (c[d] = "*");
            return c.join("") === b.join("")
        }

        function p(a, b) {
            return E(a) && !C(b) ? y[a] : D(b) && E(a) ? (y[a] && !y.$delegates[a] && (y.$delegates[a] = y[a]), y[a] = b, this) : this
        }

        function q(a, b) {
            return F(a) ? b = a : b.name = a, m(b), this
        }

        function r(a, e, f, l, m, p, q) {
            function r(b, c, d, f) {
                var g = a.$broadcast("$stateNotFound", b, c, d);
                if (g.defaultPrevented)return q.update(), A;
                if (!g.retry)return null;
                if (f.$retry)return q.update(), B;
                var h = u.transition = e.when(g.retry);
                return h.then(function () {
                    return h !== u.transition ? y : (b.options.$retry = !0, u.transitionTo(b.to, b.toParams, b.options))
                }, function () {
                    return A
                }), q.update(), h
            }

            function w(a, c, d, h, i) {
                var j = d ? c : k(g(a.params), c), n = {$stateParams: j};
                i.resolve = m.resolve(a.resolve, n, i.resolve, a);
                var o = [i.resolve.then(function (a) {
                    i.globals = a
                })];
                return h && o.push(h), H(a.views, function (c, d) {
                    var e = c.resolve && c.resolve !== a.resolve ? c.resolve : {};
                    e.$template = [function () {
                        return f.load(d, {view: c, locals: n, params: j}) || ""
                    }], o.push(m.resolve(e, n, i.resolve, a).then(function (f) {
                        if (D(c.controllerProvider) || G(c.controllerProvider)) {
                            var g = b.extend({}, e, n);
                            f.$$controller = l.invoke(c.controllerProvider, null, g)
                        } else f.$$controller = c.controller;
                        f.$$state = a, f.$$controllerAs = c.controllerAs, i[d] = f
                    }))
                }), e.all(o).then(function () {
                    return i
                })
            }

            var y = e.reject(new Error("transition superseded")), z = e.reject(new Error("transition prevented")), A = e.reject(new Error("transition aborted")), B = e.reject(new Error("transition failed"));
            return t.locals = {resolve: null, globals: {$stateParams: {}}}, u = {
                params: {},
                current: t.self,
                $current: t,
                transition: null
            }, u.reload = function () {
                u.transitionTo(u.current, p, {reload: !0, inherit: !1, notify: !1})
            }, u.go = function (a, b, c) {
                return this.transitionTo(a, b, I({inherit: !0, relative: u.$current}, c))
            }, u.transitionTo = function (b, c, f) {
                c = c || {}, f = I({
                    location: !0,
                    inherit: !1,
                    relative: null,
                    notify: !0,
                    reload: !1,
                    $retry: !1
                }, f || {});
                var m, n = u.$current, o = u.params, v = n.path, A = h(b, f.relative);
                if (!C(A)) {
                    var B = {to: b, toParams: c, options: f}, D = r(B, n.self, o, f);
                    if (D)return D;
                    if (b = B.to, c = B.toParams, f = B.options, A = h(b, f.relative), !C(A)) {
                        if (!f.relative)throw new Error("No such state '" + b + "'");
                        throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'")
                    }
                }
                if (A[x])throw new Error("Cannot transition to abstract state '" + b + "'");
                f.inherit && (c = i(p, c || {}, u.$current, A)), b = A;
                var E = b.path, F = 0, G = E[F], H = t.locals, K = [];
                if (!f.reload)for (; G && G === v[F] && j(c, o, G.ownParams);)H = K[F] = G.locals, F++, G = E[F];
                if (s(b, n, H, f))return b.self.reloadOnSearch !== !1 && q.update(), u.transition = null, e.when(u.current);
                if (c = k(g(b.params), c || {}), f.notify && a.$broadcast("$stateChangeStart", b.self, c, n.self, o).defaultPrevented)return q.update(), z;
                for (var L = e.when(H), M = F; M < E.length; M++, G = E[M])H = K[M] = d(H), L = w(G, c, G === b, L, H);
                var N = u.transition = L.then(function () {
                    var d, e, g;
                    if (u.transition !== N)return y;
                    for (d = v.length - 1; d >= F; d--)g = v[d], g.self.onExit && l.invoke(g.self.onExit, g.self, g.locals.globals), g.locals = null;
                    for (d = F; d < E.length; d++)e = E[d], e.locals = K[d], e.self.onEnter && l.invoke(e.self.onEnter, e.self, e.locals.globals);
                    return u.transition !== N ? y : (u.$current = b, u.current = b.self, u.params = c, J(u.params, p), u.transition = null, f.location && b.navigable && q.push(b.navigable.url, b.navigable.locals.globals.$stateParams, {replace: "replace" === f.location}), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, n.self, o), q.update(!0), u.current)
                }, function (d) {
                    return u.transition !== N ? y : (u.transition = null, m = a.$broadcast("$stateChangeError", b.self, c, n.self, o, d), m.defaultPrevented || q.update(), e.reject(d))
                });
                return N
            }, u.is = function (a, d) {
                var e = h(a);
                return C(e) ? u.$current !== e ? !1 : C(d) && null !== d ? b.equals(p, d) : !0 : c
            }, u.includes = function (a, b) {
                if (E(a) && n(a)) {
                    if (!o(a))return !1;
                    a = u.$current.name
                }
                var d = h(a);
                return C(d) ? C(u.$current.includes[d.name]) ? j(b, p) : !1 : c
            }, u.href = function (a, b, c) {
                c = I({lossy: !0, inherit: !1, absolute: !1, relative: u.$current}, c || {});
                var d = h(a, c.relative);
                if (!C(d))return null;
                c.inherit && (b = i(p, b || {}, u.$current, d));
                var e = d && c.lossy ? d.navigable : d;
                return e && e.url ? q.href(e.url, k(g(d.params), b || {}), {absolute: c.absolute}) : null
            }, u.get = function (a, b) {
                if (0 === arguments.length) {
                    var c = [];
                    return H(v, function (a) {
                        c.push(a.self)
                    }), c
                }
                var d = h(a, b);
                return d && d.self ? d.self : null
            }, u
        }

        function s(a, b, c, d) {
            return a !== b || (c !== b.locals || d.reload) && a.self.reloadOnSearch !== !1 ? void 0 : !0
        }

        var t, u, v = {}, w = {}, x = "abstract", y = {
            parent: function (a) {
                if (C(a.parent) && a.parent)return h(a.parent);
                var b = /^(.+)\.[^.]+$/.exec(a.name);
                return b ? h(b[1]) : t
            }, data: function (a) {
                return a.parent && a.parent.data && (a.data = a.self.data = I({}, a.parent.data, a.data)), a.data
            }, url: function (a) {
                var b = a.url, c = {params: a.params || {}};
                if (E(b))return "^" == b.charAt(0) ? e.compile(b.substring(1), c) : (a.parent.navigable || t).url.concat(b, c);
                if (!b || e.isMatcher(b))return b;
                throw new Error("Invalid url '" + b + "' in state '" + a + "'")
            }, navigable: function (a) {
                return a.url ? a : a.parent ? a.parent.navigable : null
            }, params: function (a) {
                return a.params ? a.params : a.url ? a.url.params : a.parent.params
            }, views: function (a) {
                var b = {};
                return H(C(a.views) ? a.views : {"": a}, function (c, d) {
                    d.indexOf("@") < 0 && (d += "@" + a.parent.name), b[d] = c
                }), b
            }, ownParams: function (a) {
                if (a.params = a.params || {}, !a.parent)return g(a.params);
                var b = {};
                H(a.params, function (a, c) {
                    b[c] = !0
                }), H(a.parent.params, function (c, d) {
                    if (!b[d])throw new Error("Missing required parameter '" + d + "' in state '" + a.name + "'");
                    b[d] = !1
                });
                var c = [];
                return H(b, function (a, b) {
                    a && c.push(b)
                }), c
            }, path: function (a) {
                return a.parent ? a.parent.path.concat(a) : []
            }, includes: function (a) {
                var b = a.parent ? I({}, a.parent.includes) : {};
                return b[a.name] = !0, b
            }, $delegates: {}
        };
        t = m({
            name: "",
            url: "^",
            views: null,
            "abstract": !0
        }), t.navigable = null, this.decorator = p, this.state = q, this.$get = r, r.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter"]
    }

    function s() {
        function a(a, b) {
            return {
                load: function (c, d) {
                    var e, f = {
                        template: null,
                        controller: null,
                        view: null,
                        locals: null,
                        notify: !0,
                        async: !0,
                        params: {}
                    };
                    return d = I(f, d), d.view && (e = b.fromConfig(d.view, d.params, d.locals)), e && d.notify && a.$broadcast("$viewContentLoading", d), e
                }
            }
        }

        this.$get = a, a.$inject = ["$rootScope", "$templateFactory"]
    }

    function t() {
        var a = !1;
        this.useAnchorScroll = function () {
            a = !0
        }, this.$get = ["$anchorScroll", "$timeout", function (b, c) {
            return a ? b : function (a) {
                c(function () {
                    a[0].scrollIntoView()
                }, 0, !1)
            }
        }]
    }

    function u(a, c, d) {
        function e() {
            return c.has ? function (a) {
                return c.has(a) ? c.get(a) : null
            } : function (a) {
                return c.get(a)
            }
        }

        function f(a, b) {
            var c = function () {
                return {
                    enter: function (a, b, c) {
                        b.after(a), c()
                    }, leave: function (a, b) {
                        a.remove(), b()
                    }
                }
            };
            if (i)return {
                enter: function (a, b, c) {
                    i.enter(a, null, b, c)
                }, leave: function (a, b) {
                    i.leave(a, b)
                }
            };
            if (h) {
                var d = h && h(b, a);
                return {
                    enter: function (a, b, c) {
                        d.enter(a, null, b), c()
                    }, leave: function (a, b) {
                        d.leave(a), b()
                    }
                }
            }
            return c()
        }

        var g = e(), h = g("$animator"), i = g("$animate"), j = {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            compile: function (c, e, g) {
                return function (c, e, h) {
                    function i() {
                        k && (k.remove(), k = null), m && (m.$destroy(), m = null), l && (q.leave(l, function () {
                            k = null
                        }), k = l, l = null)
                    }

                    function j(f) {
                        var h = c.$new(), j = l && l.data("$uiViewName"), k = j && a.$current && a.$current.locals[j];
                        if (f || k !== n) {
                            var r = g(h, function (a) {
                                q.enter(a, e, function () {
                                    (b.isDefined(p) && !p || c.$eval(p)) && d(a)
                                }), i()
                            });
                            n = a.$current.locals[r.data("$uiViewName")], l = r, m = h, m.$emit("$viewContentLoaded"), m.$eval(o)
                        }
                    }

                    var k, l, m, n, o = h.onload || "", p = h.autoscroll, q = f(h, c);
                    c.$on("$stateChangeSuccess", function () {
                        j(!1)
                    }), c.$on("$viewContentLoading", function () {
                        j(!1)
                    }), j(!0)
                }
            }
        };
        return j
    }

    function v(a, b, c) {
        return {
            restrict: "ECA", priority: -400, compile: function (d) {
                var e = d.html();
                return function (d, f, g) {
                    var h = g.uiView || g.name || "", i = f.inheritedData("$uiView");
                    h.indexOf("@") < 0 && (h = h + "@" + (i ? i.state.name : "")), f.data("$uiViewName", h);
                    var j = c.$current, k = j && j.locals[h];
                    if (k) {
                        f.data("$uiView", {name: h, state: k.$$state}), f.html(k.$template ? k.$template : e);
                        var l = a(f.contents());
                        if (k.$$controller) {
                            k.$scope = d;
                            var m = b(k.$$controller, k);
                            k.$$controllerAs && (d[k.$$controllerAs] = m), f.data("$ngControllerController", m), f.children().data("$ngControllerController", m)
                        }
                        l(d)
                    }
                }
            }
        }
    }

    function w(a, b) {
        var c, d = a.match(/^\s*({[^}]*})\s*$/);
        if (d && (a = b + "(" + d[1] + ")"), c = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !c || 4 !== c.length)throw new Error("Invalid state ref '" + a + "'");
        return {state: c[1], paramExpr: c[3] || null}
    }

    function x(a) {
        var b = a.parent().inheritedData("$uiView");
        return b && b.state && b.state.name ? b.state : void 0
    }

    function y(a, c) {
        var d = ["location", "inherit", "reload"];
        return {
            restrict: "A", require: ["?^uiSrefActive", "?^uiSrefActiveEq"], link: function (e, f, g, h) {
                var i = w(g.uiSref, a.current.name), j = null, k = x(f) || a.$current, l = "FORM" === f[0].nodeName, m = l ? "action" : "href", n = !0, o = {
                    relative: k,
                    inherit: !0
                }, p = e.$eval(g.uiSrefOpts) || {};
                b.forEach(d, function (a) {
                    a in p && (o[a] = p[a])
                });
                var q = function (b) {
                    if (b && (j = b), n) {
                        var c = a.href(i.state, j, o), d = h[1] || h[0];
                        return d && d.$$setStateInfo(i.state, j), c ? void(f[0][m] = c) : (n = !1, !1)
                    }
                };
                i.paramExpr && (e.$watch(i.paramExpr, function (a) {
                    a !== j && q(a)
                }, !0), j = e.$eval(i.paramExpr)), q(), l || f.bind("click", function (b) {
                    var d = b.which || b.button;
                    if (!(d > 1 || b.ctrlKey || b.metaKey || b.shiftKey || f.attr("target"))) {
                        var e = c(function () {
                            a.go(i.state, j, o)
                        });
                        b.preventDefault(), b.preventDefault = function () {
                            c.cancel(e)
                        }
                    }
                })
            }
        }
    }

    function z(a, b, c) {
        return {
            restrict: "A", controller: ["$scope", "$element", "$attrs", function (d, e, f) {
                function g() {
                    h() ? e.addClass(m) : e.removeClass(m)
                }

                function h() {
                    return "undefined" != typeof f.uiSrefActiveEq ? a.$current.self === k && i() : a.includes(k.name) && i()
                }

                function i() {
                    return !l || j(l, b)
                }

                var k, l, m;
                m = c(f.uiSrefActiveEq || f.uiSrefActive || "", !1)(d), this.$$setStateInfo = function (b, c) {
                    k = a.get(b, x(e)), l = c, g()
                }, d.$on("$stateChangeSuccess", g)
            }]
        }
    }

    function A(a) {
        return function (b) {
            return a.is(b)
        }
    }

    function B(a) {
        return function (b) {
            return a.includes(b)
        }
    }

    var C = b.isDefined, D = b.isFunction, E = b.isString, F = b.isObject, G = b.isArray, H = b.forEach, I = b.extend, J = b.copy;
    b.module("ui.router.util", ["ng"]), b.module("ui.router.router", ["ui.router.util"]), b.module("ui.router.state", ["ui.router.router", "ui.router.util"]), b.module("ui.router", ["ui.router.state"]), b.module("ui.router.compat", ["ui.router"]), l.$inject = ["$q", "$injector"], b.module("ui.router.util").service("$resolve", l), m.$inject = ["$http", "$templateCache", "$injector"], b.module("ui.router.util").service("$templateFactory", m), n.prototype.concat = function (a, b) {
        return new n(this.sourcePath + a + this.sourceSearch, b)
    }, n.prototype.toString = function () {
        return this.source
    }, n.prototype.exec = function (a, b) {
        var c = this.regexp.exec(a);
        if (!c)return null;
        b = b || {};
        var d, e, f, g = this.parameters(), h = g.length, i = this.segments.length - 1, j = {};
        if (i !== c.length - 1)throw new Error("Unbalanced capture group in route '" + this.source + "'");
        for (d = 0; i > d; d++)f = g[d], e = this.params[f], j[f] = e.$value(c[d + 1]);
        for (; h > d; d++)f = g[d], e = this.params[f], j[f] = e.$value(b[f]);
        return j
    }, n.prototype.parameters = function (a) {
        return C(a) ? this.params[a] || null : g(this.params)
    }, n.prototype.validates = function (a) {
        var b, c, d = !0, e = this;
        return H(a, function (a, f) {
            e.params[f] && (c = e.params[f], b = !a && C(c.value), d = d && (b || c.type.is(a)))
        }), d
    }, n.prototype.format = function (a) {
        var b = this.segments, c = this.parameters();
        if (!a)return b.join("").replace("//", "http://sritechapp.com/");
        var d, e, f, g, h, i, j = b.length - 1, k = c.length, l = b[0];
        if (!this.validates(a))return null;
        for (d = 0; j > d; d++)g = c[d], f = a[g], h = this.params[g], (C(f) || "/" !== b[d] && "/" !== b[d + 1]) && (null != f && (l += encodeURIComponent(h.type.encode(f))), l += b[d + 1]);
        for (; k > d; d++)g = c[d], f = a[g], null != f && (i = G(f), i && (f = f.map(encodeURIComponent).join("&" + g + "=")), l += (e ? "&" : "?") + g + "=" + (i ? f : encodeURIComponent(f)), e = !0);
        return l
    }, n.prototype.$types = {}, o.prototype.is = function () {
        return !0
    }, o.prototype.encode = function (a) {
        return a
    }, o.prototype.decode = function (a) {
        return a
    }, o.prototype.equals = function (a, b) {
        return a == b
    }, o.prototype.$subPattern = function () {
        var a = this.pattern.toString();
        return a.substr(1, a.length - 2)
    }, o.prototype.pattern = /.*/, b.module("ui.router.util").provider("$urlMatcherFactory", p), q.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.router").provider("$urlRouter", q), r.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.state").value("$stateParams", {}).provider("$state", r), s.$inject = [], b.module("ui.router.state").provider("$view", s), b.module("ui.router.state").provider("$uiViewScroll", t), u.$inject = ["$state", "$injector", "$uiViewScroll"], v.$inject = ["$compile", "$controller", "$state"], b.module("ui.router.state").directive("uiView", u), b.module("ui.router.state").directive("uiView", v), y.$inject = ["$state", "$timeout"], z.$inject = ["$state", "$stateParams", "$interpolate"], b.module("ui.router.state").directive("uiSref", y).directive("uiSrefActive", z).directive("uiSrefActiveEq", z), A.$inject = ["$state"], B.$inject = ["$state"], b.module("ui.router.state").filter("isState", A).filter("includedByState", B)
}(window, window.angular), function (a, b, c) {
    function d(a, b) {
        var c = [];
        for (var d in a.path) {
            if (a.path[d] !== b.path[d])break;
            c.push(a.path[d])
        }
        return c
    }

    function e(a) {
        if (Object.keys)return Object.keys(a);
        var c = [];
        return b.forEach(a, function (a, b) {
            c.push(b)
        }), c
    }

    function f(a, b) {
        if (Array.prototype.indexOf)return a.indexOf(b, Number(arguments[2]) || 0);
        var c = a.length >>> 0, d = Number(arguments[2]) || 0;
        for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++)if (d in a && a[d] === b)return d;
        return -1
    }

    function g(a, b, c, g) {
        var h, i = d(c, g), j = {}, k = [];
        for (var l in i)if (i[l].params && (h = q(i[l].params) ? i[l].params : e(i[l].params), h.length))for (var m in h)f(k, h[m]) >= 0 || (k.push(h[m]), j[h[m]] = a[h[m]]);
        return p({}, j, b)
    }

    function h() {
        m = c
    }

    function i() {
        var a = {}, c = {};
        this.registerStickyState = function (a) {
            c[a.name] = a
        }, this.enableDebug = function (a) {
            n = a
        }, this.$get = ["$rootScope", "$state", "$stateParams", "$injector", "$log", function (c, d, e, f, h) {
            function i() {
                var c = {};
                return b.forEach(a, function (a) {
                    for (var b = j(a), d = 0; d < b.length; d++) {
                        var e = b[d].parent;
                        c[e.name] = c[e.name] || [], c[e.name].push(a)
                    }
                    c[""] && (c.__inactives = c[""])
                }), c
            }

            function j(a) {
                var b = [];
                if (!a)return b;
                do a.sticky && b.push(a), a = a.parent; while (a);
                return b.reverse(), b
            }

            function k(a, b, c) {
                if (a[c] === b[c])return {from: !1, to: !1};
                var d = c < a.length && a[c].self.sticky, e = c < b.length && b[c].self.sticky;
                return {from: d, to: e}
            }

            function l(b, c, d) {
                if (d)return "updateStateParams";
                var e = a[b.self.name];
                if (!e)return "enter";
                var f = n(c, e.locals.globals.$stateParams, b.ownParams);
                return f ? "reactivate" : "updateStateParams"
            }

            function m(b, c) {
                var d = a[b.name];
                if (!d)return null;
                if (!c)return d;
                var e = n(c, d.locals.globals.$stateParams, b.ownParams);
                return e ? d : null
            }

            function n(a, b, c) {
                if (!c) {
                    c = [];
                    for (var d in a)c.push(d)
                }
                for (var e = 0; e < c.length; e++) {
                    var f = c[e];
                    if (a[f] != b[f])return !1
                }
                return !0
            }

            var o = {
                getInactiveStates: function () {
                    var c = [];
                    return b.forEach(a, function (a) {
                        c.push(a)
                    }), c
                }, getInactiveStatesByParent: function () {
                    return i()
                }, processTransition: function (a) {
                    var c = {
                        inactives: [],
                        enter: [],
                        exit: [],
                        keep: 0
                    }, f = a.fromState.path, h = a.fromParams, j = a.toState.path, m = a.toParams, o = a.options, p = 0, q = j[p];
                    for (o.inherit && (m = g(e, m || {}, d.$current, a.toState)); q && q === f[p] && n(m, h, q.ownParams);)q = j[++p];
                    c.keep = p;
                    var s, t, u, v = {}, w = k(f, j, p), x = !1;
                    for (s = p; s < j.length; s++) {
                        var y = w.to ? l(j[s], a.toParams, x) : "enter";
                        x = x || "updateStateParams" == y, c.enter[s] = y, "reactivate" == y && (u = v[j[s].name] = j[s]), "updateStateParams" == y && (t = j[s])
                    }
                    u = u ? u.self.name + "." : "", t = t ? t.self.name + "." : "";
                    var z = i(), A = [""].concat(r(f.slice(0, p), function (a) {
                        return a.self.name
                    }));
                    for (b.forEach(A, function (a) {
                        for (var b = z[a], d = 0; b && d < b.length; d++) {
                            var e = b[d];
                            v[e.name] || u && 0 === e.self.name.indexOf(u) || t && 0 === e.self.name.indexOf(t) || c.inactives.push(e)
                        }
                    }), s = p; s < f.length; s++) {
                        var B = "exit";
                        w.from && (c.inactives.push(f[s]), B = "inactivate"), c.exit[s] = B
                    }
                    return c
                }, stateInactivated: function (b) {
                    a[b.self.name] = b, b.self.status = "inactive", b.self.onInactivate && f.invoke(b.self.onInactivate, b.self, b.locals.globals)
                }, stateReactivated: function (b) {
                    a[b.self.name] && delete a[b.self.name], b.self.status = "entered", b.self.onReactivate && f.invoke(b.self.onReactivate, b.self, b.locals.globals)
                }, stateExiting: function (c, d, e) {
                    var g = c.self.name + ".", h = {};
                    b.forEach(d, function (a) {
                        h[a.self.name] = !0
                    }), b.forEach(a, function (b, c) {
                        h[c] || 0 !== c.indexOf(g) || (b.self.onExit && f.invoke(b.self.onExit, b.self, b.locals.globals), b.locals = null, b.self.status = "exited", delete a[c])
                    }), e && f.invoke(e, c.self, c.locals.globals), c.locals = null, c.self.status = "exited", delete a[c.self.name]
                }, stateEntering: function (a, b, c) {
                    var d = m(a);
                    if (d && !m(a, b)) {
                        var e = a.locals;
                        this.stateExiting(d), a.locals = e
                    }
                    a.self.status = "entered", c && f.invoke(c, a.self, a.locals.globals)
                }
            };
            return o
        }]
    }

    function j(a) {
        return {
            resolve: {},
            locals: {globals: v && v.locals && v.locals.globals},
            views: {},
            self: {},
            params: {},
            ownParams: [],
            surrogateType: a
        }
    }

    function k(a, c, d) {
        function e(a, b, c) {
            return a[b] ? a[b].toUpperCase() + ": " + c.self.name : "(" + c.self.name + ")"
        }

        r(d.inactives, function (a) {
            return a.self.name
        }), r(c.toState.path, function (a, b) {
            return e(d.enter, b, a)
        }), r(c.fromState.path, function (a, b) {
            return e(d.exit, b, a)
        }), c.fromState.self.name + ": " + b.toJson(c.fromParams) + ":  -> " + c.toState.self.name + ": " + b.toJson(c.toParams)
    }

    function l(a, b, c) {
        for (var d = function (a, b) {
            return "'" + b + "' (" + a.$$state.name + ")"
        }, e = function (a, b) {
            return "globals" != b && "resolve" != b
        }, f = function (a) {
            var b = r(s(a.locals, e), d).join(", ");
            return "(" + (a.self.name ? a.self.name : "root") + ".locals" + (b.length ? ": " + b : "") + ")"
        }, g = f(b), h = b.parent; h && h !== b;)"" === h.self.name && (g = f(c.$current.path[0]) + " / " + g), g = f(h) + " / " + g, b = h, h = b.parent
    }

    b.module("ct.ui.router.extras", ["ui.router"]);
    var m, n = !1, o = b.forEach, p = b.extend, q = b.isArray, r = function (a, b) {
        "use strict";
        var c = [];
        return o(a, function (a, d) {
            c.push(b(a, d))
        }), c
    }, s = function (a, b) {
        "use strict";
        var c = {};
        return o(a, function (a, d) {
            b(a, d) && (c[d] = a)
        }), c
    }, t = b.module("ct.ui.router.extras");
    t.config(["$provide", function (a) {
        var b;
        a.decorator("$state", ["$delegate", "$q", function (a, c) {
            return b = a.transitionTo, a.transitionTo = function (d, e, f) {
                return f.ignoreDsr && (m = f.ignoreDsr), b.apply(a, arguments).then(function (a) {
                    return h(), a
                }, function (a) {
                    return h(), c.reject(a)
                })
            }, a
        }])
    }]), t.service("$deepStateRedirect", ["$rootScope", "$state", function (a, d) {
        function e(a) {
            var b = a.name;
            return i.hasOwnProperty(b) ? i[b] : void f(b)
        }

        function f(a) {
            var b = d.get(a);
            b && b.deepStateRedirect === !0 && (i[a] = j, g[a] === c && (g[a] = a));
            var e = a.lastIndexOf(".");
            if (-1 != e) {
                var h = f(a.substr(0, e));
                h && i[a] === c && (i[a] = k)
            }
            return i[a] || !1
        }

        var g = {}, h = {}, i = {}, j = "Redirect", k = "AncestorRedirect";
        return a.$on("$stateChangeStart", function (a, b) {
            function c() {
                var a = e(b), c = g[b.name];
                return !m && a === j && c && c != b.name ? !0 : !1
            }

            c() && (a.preventDefault(), d.go(g[b.name], h[b.name]))
        }), a.$on("$stateChangeSuccess", function (a, c, d) {
            var f = e(c);
            if (f) {
                var i = c.name;
                b.forEach(g, function (a, c) {
                    (i == c || -1 != i.indexOf(c + ".")) && (g[c] = i, h[c] = b.copy(d))
                })
            }
        }), {}
    }]), t.run(["$deepStateRedirect", function () {
    }]), i.$inject = ["$stateProvider"], b.module("ct.ui.router.extras").provider("$stickyState", i);
    var u, v, w, x, y = {}, z = [];
    b.module("ct.ui.router.extras").run(["$stickyState", function (a) {
        u = a
    }]), b.module("ct.ui.router.extras").config(["$provide", "$stateProvider", "$stickyStateProvider", function (a, d, e) {
        x = b.extend(new j("__inactives"), {self: {name: "__inactives"}}), v = w = c, z = [], d.decorator("parent", function (a, b) {
            return v === c && (v = b({}), v.parent = x, x.parent = c, x.locals = c), y[a.self.name] = a, a.self.$$state = function () {
                return y[a.self.name]
            }, a.self.sticky === !0 && e.registerStickyState(a.self), b(a)
        });
        var f;
        a.decorator("$state", ["$delegate", "$log", "$q", function (a, c, d) {
            return f = a.transitionTo, a.transitionTo = function (e, g, h) {
                function i(a) {
                    var c = b.extend(new j("reactivate_phase1"), {locals: a.locals});
                    return c.self = b.extend({}, a.self), c
                }

                function m(a) {
                    var c = b.extend(new j("reactivate_phase2"), a), d = c.self.onEnter;
                    return c.resolve = {}, c.views = {}, c.self.onEnter = function () {
                        c.locals = a.locals, u.stateReactivated(a)
                    }, K.addRestoreFunction(function () {
                        a.self.onEnter = d
                    }), c
                }

                function o(a) {
                    var b = new j("inactivate");
                    b.self = a.self;
                    var c = a.self.onExit;
                    return b.self.onExit = function () {
                        u.stateInactivated(a)
                    }, K.addRestoreFunction(function () {
                        a.self.onExit = c
                    }), b
                }

                function p(a, b) {
                    var c = a.self.onEnter;
                    return a.self.onEnter = function () {
                        u.stateEntering(a, b, c)
                    }, K.addRestoreFunction(function () {
                        a.self.onEnter = c
                    }), a
                }

                function q(a) {
                    var b = a.self.onExit;
                    return a.self.onExit = function () {
                        u.stateExiting(a, I, b)
                    }, K.addRestoreFunction(function () {
                        a.self.onExit = b
                    }), a
                }

                x.locals || (x.locals = v.locals);
                var s = z.length;
                w && w();
                var t, A, B, C, D = a.$current, E = a.params, F = h && h.relative || a.$current, G = a.get(e, F), H = [], I = [], J = function () {
                }, K = function () {
                    t && (L.path = t, t = null), A && (D.path = A, A = null), b.forEach(K.restoreFunctions, function (a) {
                        a()
                    }), K = J, w = null, z.splice(s, 1)
                };
                if (K.restoreFunctions = [], K.addRestoreFunction = function (a) {
                        this.restoreFunctions.push(a)
                    }, G) {
                    var L = y[G.name];
                    if (L) {
                        t = L.path, A = D.path;
                        var M = {toState: L, toParams: g || {}, fromState: D, fromParams: E || {}, options: h};
                        z.push(M), w = K, B = u.processTransition(M), n && k(c, M, B);
                        var N = L.path.slice(0, B.keep), O = D.path.slice(0, B.keep);
                        b.forEach(x.locals, function (a, b) {
                            delete x.locals[b]
                        });
                        for (var P = 0; P < B.inactives.length; P++) {
                            var Q = B.inactives[P].locals;
                            b.forEach(Q, function (a, b) {
                                Q.hasOwnProperty(b) && -1 != b.indexOf("@") && (x.locals[b] = a)
                            })
                        }
                        if (b.forEach(B.enter, function (a, b) {
                                var c;
                                "reactivate" === a ? (c = i(L.path[b]), N.push(c), O.push(c), H.push(m(L.path[b])), C = c) : "updateStateParams" === a ? (c = p(L.path[b]), N.push(c), C = c) : "enter" === a && N.push(p(L.path[b]))
                            }), b.forEach(B.exit, function (a, b) {
                                var c = D.path[b];
                                "inactivate" === a ? (O.push(o(c)), I.push(c)) : "exit" === a && (O.push(q(c)), I.push(c))
                            }), H.length && b.forEach(H, function (a) {
                                N.push(a)
                            }), C) {
                            var R = C.self.name + ".", S = u.getInactiveStates(), T = [];
                            S.forEach(function (a) {
                                0 === a.self.name.indexOf(R) && T.push(a)
                            }), T.sort(), T.reverse(), O = O.concat(r(T, function (a) {
                                return q(a)
                            })), I = I.concat(T)
                        }
                        L.path = N, D.path = O
                    }
                }
                var U = f.apply(a, arguments);
                return U.then(function (b) {
                    return K(), n && l(c, y[b.name], a), b.status = "active", b
                }, function (a) {
                    return K(), n && "transition prevented" !== a.message && "transition aborted" !== a.message && "transition superseded" !== a.message && console.log(a.stack), d.when(a)
                })
            }, a
        }])
    }]), b.module("ct.ui.router.extras").provider("$futureState", ["$stateProvider", "$urlRouterProvider", function (a, c) {
        function d(a, b) {
            if (b.name)for (var c = b.name.split(/\./); c.length;) {
                var d = c.join(".");
                if (a.get(d))return null;
                if (i[d])return i[d];
                c.pop()
            }
            if (b.url)for (var e = b.url.split(/\//); e.length;) {
                var f = e.join("/");
                if (j[f])return j[f];
                e.pop()
            }
        }

        function e(a, b) {
            if (!b) {
                var c = $q.defer();
                return c.reject("No lazyState passed in " + b), c.promise
            }
            var d = b.type, e = h[d];
            if (!e)throw Error("No state factory for futureState.type: " + (b && b.type));
            return a.invoke(e, e, {futureState: b})
        }

        function f(b, c) {
            var f = !1, h = (b.get("$log"), function () {
                c.url("/")
            }), i = function (i, j, l) {
                if (!m)return g().then(function () {
                    f = !0, j.sync(), f = !1
                }), void(m = !0);
                var n = d(l, {url: c.path()});
                return n ? (k = !0, void e(b, n).then(function (b) {
                    b && !l.get(b) && a.state(b), f = !0, j.sync(), f = !1, k = !1
                }, function () {
                    k = !1, l.go("top")
                })) : b.invoke(h)
            };
            if (!k) {
                var j = f ? h : i;
                return b.invoke(j)
            }
        }

        var g, h = {}, i = {}, j = {}, k = !1, l = [], m = !1, n = this;
        this.addResolve = function (a) {
            l.push(a)
        }, this.stateFactory = function (a, b) {
            h[a] = b
        }, this.futureState = function (a) {
            i[a.stateName] = a, j[a.urlPrefix] = a
        }, this.get = function () {
            return b.extend({}, i)
        }, c.otherwise(f);
        var o = {
            getResolvePromise: function () {
                return g()
            }
        };
        this.$get = ["$injector", "$state", "$q", "$rootScope", "$urlRouter", "$timeout", "$log", function (c, f, h, i, j, m, p) {
            function q() {
                if (i.$on("$stateNotFound", function (b, g, h, i) {
                        if (!k) {
                            var j = d(f, {name: g.to});
                            if (j) {
                                b.preventDefault(), k = !0;
                                var l = e(c, j);
                                l.then(function (b) {
                                    b && a.state(b), f.go(g.to, g.toParams), k = !1
                                }, function (a) {
                                    console.log("failed to lazy load state ", a), f.go(h, i), k = !1
                                })
                            }
                        }
                    }), !g) {
                    var n = [];
                    b.forEach(l, function (a) {
                        n.push(c.invoke(a))
                    }), g = function () {
                        return h.all(n)
                    }
                }
                g().then(function () {
                    m(function () {
                        f.transition ? f.transition.then(j.sync, j.sync) : j.sync()
                    })
                })
            }

            return q(), o.state = a.state, o.futureState = n.futureState, o.get = n.get, o
        }]
    }]), b.module("ct.ui.router.extras").run(["$futureState", function () {
    }]), b.module("ct.ui.router.extras").service("$previousState", ["$rootScope", "$state", function (a, b) {
        var c = null, d = {}, e = null;
        a.$on("$stateChangeStart", function (a, b, d, f, g) {
            e = c, c = {state: f, params: g}
        }), a.$on("$stateChangeError", function () {
            c = e, e = null
        }), a.$on("$stateChangeSuccess", function () {
            e = null
        });
        var f = {
            get: function (a) {
                return a ? d[a] : c
            }, go: function (a, c) {
                var d = f.get(a);
                return b.go(d.state, d.params, c)
            }, memo: function (a) {
                d[a] = c
            }, forget: function (a) {
                delete d[a]
            }
        };
        return f
    }]), b.module("ct.ui.router.extras").run(["$previousState", function () {
    }])
}(window, window.angular), function (a, b) {
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.returnExports = b()
}(this, function () {
    function a() {
    }

    function b(a) {
        return a = +a, a !== a ? a = 0 : 0 !== a && a !== 1 / 0 && a !== -(1 / 0) && (a = (a > 0 || -1) * Math.floor(Math.abs(a))), a
    }

    function c(a) {
        var b = typeof a;
        return null === a || "undefined" === b || "boolean" === b || "number" === b || "string" === b
    }

    function d(a) {
        var b, d, e;
        if (c(a))return a;
        if (d = a.valueOf, "function" == typeof d && (b = d.call(a), c(b)))return b;
        if (e = a.toString, "function" == typeof e && (b = e.call(a), c(b)))return b;
        throw new TypeError
    }

    Function.prototype.bind || (Function.prototype.bind = function (b) {
        var c = this;
        if ("function" != typeof c)throw new TypeError("Function.prototype.bind called on incompatible " + c);
        for (var d = m.call(arguments, 1), e = function () {
            if (this instanceof i) {
                var a = c.apply(this, d.concat(m.call(arguments)));
                return Object(a) === a ? a : this
            }
            return c.apply(b, d.concat(m.call(arguments)))
        }, f = Math.max(0, c.length - d.length), g = [], h = 0; f > h; h++)g.push("$" + h);
        var i = Function("binder", "return function(" + g.join(",") + "){return binder.apply(this,arguments)}")(e);
        return c.prototype && (a.prototype = c.prototype, i.prototype = new a, a.prototype = null), i
    });
    var e, f, g, h, i, j = Function.prototype.call, k = Array.prototype, l = Object.prototype, m = k.slice, n = j.bind(l.toString), o = j.bind(l.hasOwnProperty);
    if ((i = o(l, "__defineGetter__")) && (e = j.bind(l.__defineGetter__), f = j.bind(l.__defineSetter__), g = j.bind(l.__lookupGetter__), h = j.bind(l.__lookupSetter__)), 2 != [1, 2].splice(0).length) {
        var p = Array.prototype.splice, q = Array.prototype.push, r = Array.prototype.unshift;
        Array.prototype.splice = function () {
            function a(a) {
                for (var b = []; a--;)b.unshift(a);
                return b
            }

            var b, c = [];
            return c.splice.bind(c, 0, 0).apply(null, a(20)), c.splice.bind(c, 0, 0).apply(null, a(26)), b = c.length, c.splice(5, 0, "XXX"), b + 1 == c.length ? !0 : void 0
        }() ? function (a, b) {
            return arguments.length ? p.apply(this, [void 0 === a ? 0 : a, void 0 === b ? this.length - a : b].concat(m.call(arguments, 2))) : []
        } : function (a, b) {
            var c, d = m.call(arguments, 2), e = d.length;
            if (!arguments.length)return [];
            if (void 0 === a && (a = 0), void 0 === b && (b = this.length - a), e > 0) {
                if (0 >= b) {
                    if (a == this.length)return q.apply(this, d), [];
                    if (0 == a)return r.apply(this, d), []
                }
                return c = m.call(this, a, a + b), d.push.apply(d, m.call(this, a + b, this.length)), d.unshift.apply(d, m.call(this, 0, a)), d.unshift(0, this.length), p.apply(this, d), c
            }
            return p.call(this, a, b)
        }
    }
    if (1 != [].unshift(0)) {
        var r = Array.prototype.unshift;
        Array.prototype.unshift = function () {
            return r.apply(this, arguments), this.length
        }
    }
    Array.isArray || (Array.isArray = function (a) {
        return "[object Array]" == n(a)
    });
    var s = Object("a"), t = "a" != s[0] || !(0 in s), u = function (a) {
        var b = !0;
        return a && a.call("foo", function (a, c, d) {
            "object" != typeof d && (b = !1)
        }), !!a && b
    };
    if (Array.prototype.forEach && u(Array.prototype.forEach) || (Array.prototype.forEach = function (a) {
            var b = J(this), c = t && "[object String]" == n(this) ? this.split("") : b, d = arguments[1], e = -1, f = c.length >>> 0;
            if ("[object Function]" != n(a))throw new TypeError;
            for (; ++e < f;)e in c && a.call(d, c[e], e, b)
        }), Array.prototype.map && u(Array.prototype.map) || (Array.prototype.map = function (a) {
            var b = J(this), c = t && "[object String]" == n(this) ? this.split("") : b, d = c.length >>> 0, e = Array(d), f = arguments[1];
            if ("[object Function]" != n(a))throw new TypeError(a + " is not a function");
            for (var g = 0; d > g; g++)g in c && (e[g] = a.call(f, c[g], g, b));
            return e
        }), Array.prototype.filter && u(Array.prototype.filter) || (Array.prototype.filter = function (a) {
            var b, c = J(this), d = t && "[object String]" == n(this) ? this.split("") : c, e = d.length >>> 0, f = [], g = arguments[1];
            if ("[object Function]" != n(a))throw new TypeError(a + " is not a function");
            for (var h = 0; e > h; h++)h in d && (b = d[h], a.call(g, b, h, c) && f.push(b));
            return f
        }), Array.prototype.every && u(Array.prototype.every) || (Array.prototype.every = function (a) {
            var b = J(this), c = t && "[object String]" == n(this) ? this.split("") : b, d = c.length >>> 0, e = arguments[1];
            if ("[object Function]" != n(a))throw new TypeError(a + " is not a function");
            for (var f = 0; d > f; f++)if (f in c && !a.call(e, c[f], f, b))return !1;
            return !0
        }), Array.prototype.some && u(Array.prototype.some) || (Array.prototype.some = function (a) {
            var b = J(this), c = t && "[object String]" == n(this) ? this.split("") : b, d = c.length >>> 0, e = arguments[1];
            if ("[object Function]" != n(a))throw new TypeError(a + " is not a function");
            for (var f = 0; d > f; f++)if (f in c && a.call(e, c[f], f, b))return !0;
            return !1
        }), Array.prototype.reduce || (Array.prototype.reduce = function (a) {
            var b = J(this), c = t && "[object String]" == n(this) ? this.split("") : b, d = c.length >>> 0;
            if ("[object Function]" != n(a))throw new TypeError(a + " is not a function");
            if (!d && 1 == arguments.length)throw new TypeError("reduce of empty array with no initial value");
            var e, f = 0;
            if (arguments.length >= 2)e = arguments[1]; else for (; ;) {
                if (f in c) {
                    e = c[f++];
                    break
                }
                if (++f >= d)throw new TypeError("reduce of empty array with no initial value")
            }
            for (; d > f; f++)f in c && (e = a.call(void 0, e, c[f], f, b));
            return e
        }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function (a) {
            var b = J(this), c = t && "[object String]" == n(this) ? this.split("") : b, d = c.length >>> 0;
            if ("[object Function]" != n(a))throw new TypeError(a + " is not a function");
            if (!d && 1 == arguments.length)throw new TypeError("reduceRight of empty array with no initial value");
            var e, f = d - 1;
            if (arguments.length >= 2)e = arguments[1]; else for (; ;) {
                if (f in c) {
                    e = c[f--];
                    break
                }
                if (--f < 0)throw new TypeError("reduceRight of empty array with no initial value")
            }
            if (0 > f)return e;
            do f in this && (e = a.call(void 0, e, c[f], f, b)); while (f--);
            return e
        }), Array.prototype.indexOf && -1 == [0, 1].indexOf(1, 2) || (Array.prototype.indexOf = function (a) {
            var c = t && "[object String]" == n(this) ? this.split("") : J(this), d = c.length >>> 0;
            if (!d)return -1;
            var e = 0;
            for (arguments.length > 1 && (e = b(arguments[1])), e = e >= 0 ? e : Math.max(0, d + e); d > e; e++)if (e in c && c[e] === a)return e;
            return -1
        }), Array.prototype.lastIndexOf && -1 == [0, 1].lastIndexOf(0, -3) || (Array.prototype.lastIndexOf = function (a) {
            var c = t && "[object String]" == n(this) ? this.split("") : J(this), d = c.length >>> 0;
            if (!d)return -1;
            var e = d - 1;
            for (arguments.length > 1 && (e = Math.min(e, b(arguments[1]))), e = e >= 0 ? e : d - Math.abs(e); e >= 0; e--)if (e in c && a === c[e])return e;
            return -1
        }), !Object.keys) {
        var v = !0, w = function () {
        }.propertyIsEnumerable("prototype"), x = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], y = x.length;
        for (var z in{toString: null})v = !1;
        Object.keys = function K(a) {
            var b = "[object Function]" === n(a), c = null !== a && "object" == typeof a;
            if (!c && !b)throw new TypeError("Object.keys called on a non-object");
            var K = [], d = w && b;
            for (var e in a)d && "prototype" === e || !o(a, e) || K.push(e);
            if (v)for (var f = a.constructor, g = f && f.prototype === a, h = 0; y > h; h++) {
                var i = x[h];
                g && "constructor" === i || !o(a, i) || K.push(i)
            }
            return K
        }
    }
    var A = -621987552e5, B = "-000001";
    Date.prototype.toISOString && -1 !== new Date(A).toISOString().indexOf(B) || (Date.prototype.toISOString = function () {
        var a, b, c, d, e;
        if (!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");
        for (d = this.getUTCFullYear(), e = this.getUTCMonth(), d += Math.floor(e / 12), e = (e % 12 + 12) % 12, a = [e + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()], d = (0 > d ? "-" : d > 9999 ? "+" : "") + ("00000" + Math.abs(d)).slice(d >= 0 && 9999 >= d ? -4 : -6), b = a.length; b--;)c = a[b], 10 > c && (a[b] = "0" + c);
        return d + "-" + a.slice(0, 2).join("-") + "T" + a.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
    });
    var C = !1;
    try {
        C = Date.prototype.toJSON && null === new Date(0 / 0).toJSON() && -1 !== new Date(A).toJSON().indexOf(B) && Date.prototype.toJSON.call({
                toISOString: function () {
                    return !0
                }
            })
    } catch (D) {
    }
    C || (Date.prototype.toJSON = function () {
        var a, b = Object(this), c = d(b);
        if ("number" == typeof c && !isFinite(c))return null;
        if (a = b.toISOString, "function" != typeof a)throw new TypeError("toISOString property is not callable");
        return a.call(b)
    }), (!Date.parse || isNaN(Date.parse("2000-01-01T00:00:00.000Z"))) && (Date = function (a) {
        function b(c, d, e, f, g, h, i) {
            var j = arguments.length;
            if (this instanceof a) {
                var k = 1 == j && String(c) === c ? new a(b.parse(c)) : j >= 7 ? new a(c, d, e, f, g, h, i) : j >= 6 ? new a(c, d, e, f, g, h) : j >= 5 ? new a(c, d, e, f, g) : j >= 4 ? new a(c, d, e, f) : j >= 3 ? new a(c, d, e) : j >= 2 ? new a(c, d) : j >= 1 ? new a(c) : new a;
                return k.constructor = b, k
            }
            return a.apply(this, arguments)
        }

        function c(a, b) {
            var c = b > 1 ? 1 : 0;
            return f[b] + Math.floor((a - 1969 + c) / 4) - Math.floor((a - 1901 + c) / 100) + Math.floor((a - 1601 + c) / 400) + 365 * (a - 1970)
        }

        function d(b) {
            return Number(new a(1970, 0, 1, 0, 0, 0, b))
        }

        var e = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"), f = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
        for (var g in a)b[g] = a[g];
        return b.now = a.now, b.UTC = a.UTC, b.prototype = a.prototype, b.prototype.constructor = b, b.parse = function (b) {
            var f = e.exec(b);
            if (f) {
                var g, h = Number(f[1]), i = Number(f[2] || 1) - 1, j = Number(f[3] || 1) - 1, k = Number(f[4] || 0), l = Number(f[5] || 0), m = Number(f[6] || 0), n = Math.floor(1e3 * Number(f[7] || 0)), o = Boolean(f[4] && !f[8]), p = "-" === f[9] ? 1 : -1, q = Number(f[10] || 0), r = Number(f[11] || 0);
                return (l > 0 || m > 0 || n > 0 ? 24 : 25) > k && 60 > l && 60 > m && 1e3 > n && i > -1 && 12 > i && 24 > q && 60 > r && j > -1 && j < c(h, i + 1) - c(h, i) && (g = 60 * (24 * (c(h, i) + j) + k + q * p), g = 1e3 * (60 * (g + l + r * p) + m) + n, o && (g = d(g)), g >= -864e13 && 864e13 >= g) ? g : 0 / 0
            }
            return a.parse.apply(this, arguments)
        }, b
    }(Date)), Date.now || (Date.now = function () {
        return (new Date).getTime()
    }), Number.prototype.toFixed && "0.000" === 8e-5.toFixed(3) && "0" !== .9.toFixed(0) && "1.25" === 1.255.toFixed(2) && "1000000000000000128" === 0xde0b6b3a7640080.toFixed(0) || !function () {
        function a(a, b) {
            for (var c = -1; ++c < g;)b += a * h[c], h[c] = b % f, b = Math.floor(b / f)
        }

        function b(a) {
            for (var b = g, c = 0; --b >= 0;)c += h[b], h[b] = Math.floor(c / a), c = c % a * f
        }

        function c() {
            for (var a = g, b = ""; --a >= 0;)if ("" !== b || 0 === a || 0 !== h[a]) {
                var c = String(h[a]);
                "" === b ? b = c : b += "0000000".slice(0, 7 - c.length) + c
            }
            return b
        }

        function d(a, b, c) {
            return 0 === b ? c : b % 2 === 1 ? d(a, b - 1, c * a) : d(a * a, b / 2, c)
        }

        function e(a) {
            for (var b = 0; a >= 4096;)b += 12, a /= 4096;
            for (; a >= 2;)b += 1, a /= 2;
            return b
        }

        var f, g, h;
        f = 1e7, g = 6, h = [0, 0, 0, 0, 0, 0], Number.prototype.toFixed = function (f) {
            var g, h, i, j, k, l, m, n;
            if (g = Number(f), g = g !== g ? 0 : Math.floor(g), 0 > g || g > 20)throw new RangeError("Number.toFixed called with invalid number of decimals");
            if (h = Number(this), h !== h)return "NaN";
            if (-1e21 >= h || h >= 1e21)return String(h);
            if (i = "", 0 > h && (i = "-", h = -h), j = "0", h > 1e-21)if (k = e(h * d(2, 69, 1)) - 69, l = 0 > k ? h * d(2, -k, 1) : h / d(2, k, 1), l *= 4503599627370496, k = 52 - k, k > 0) {
                for (a(0, l), m = g; m >= 7;)a(1e7, 0), m -= 7;
                for (a(d(10, m, 1), 0), m = k - 1; m >= 23;)b(1 << 23), m -= 23;
                b(1 << m), a(1, 1), b(2), j = c()
            } else a(0, l), a(1 << -k, 0), j = c() + "0.00000000000000000000".slice(2, 2 + g);
            return g > 0 ? (n = j.length, j = g >= n ? i + "0.0000000000000000000".slice(0, g - n + 2) + j : i + j.slice(0, n - g) + "." + j.slice(n - g)) : j = i + j, j
        }
    }();
    var E = String.prototype.split;
    if (2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || "".split(/.?/).length || ".".split(/()()/).length > 1 ? !function () {
            var a = void 0 === /()??/.exec("")[1];
            String.prototype.split = function (b, c) {
                var d = this;
                if (void 0 === b && 0 === c)return [];
                if ("[object RegExp]" !== Object.prototype.toString.call(b))return E.apply(this, arguments);
                var e, f, g, h, i = [], j = (b.ignoreCase ? "i" : "") + (b.multiline ? "m" : "") + (b.extended ? "x" : "") + (b.sticky ? "y" : ""), k = 0, b = new RegExp(b.source, j + "g");
                for (d += "", a || (e = new RegExp("^" + b.source + "$(?!\\s)", j)), c = void 0 === c ? -1 >>> 0 : c >>> 0; (f = b.exec(d)) && (g = f.index + f[0].length, !(g > k && (i.push(d.slice(k, f.index)), !a && f.length > 1 && f[0].replace(e, function () {
                    for (var a = 1; a < arguments.length - 2; a++)void 0 === arguments[a] && (f[a] = void 0)
                }), f.length > 1 && f.index < d.length && Array.prototype.push.apply(i, f.slice(1)), h = f[0].length, k = g, i.length >= c)));)b.lastIndex === f.index && b.lastIndex++;
                return k === d.length ? (h || !b.test("")) && i.push("") : i.push(d.slice(k)), i.length > c ? i.slice(0, c) : i
            }
        }() : "0".split(void 0, 0).length && (String.prototype.split = function (a, b) {
            return void 0 === a && 0 === b ? [] : E.apply(this, arguments)
        }), "".substr && "b" !== "0b".substr(-1)) {
        var F = String.prototype.substr;
        String.prototype.substr = function (a, b) {
            return F.call(this, 0 > a && (a = this.length + a) < 0 ? 0 : a, b)
        }
    }
    var G = "	\n\f\r   ᠎             　\u2028\u2029﻿";
    if (!String.prototype.trim || G.trim()) {
        G = "[" + G + "]";
        var H = new RegExp("^" + G + G + "*"), I = new RegExp(G + G + "*$");
        String.prototype.trim = function () {
            if (void 0 === this || null === this)throw new TypeError("can't convert " + this + " to object");
            return String(this).replace(H, "").replace(I, "")
        }
    }
    (8 !== parseInt(G + "08") || 22 !== parseInt(G + "0x16")) && (parseInt = function (a) {
        var b = /^0[xX]/;
        return function (c, d) {
            return c = String(c).trim(), +d || (d = b.test(c) ? 16 : 10), a(c, d)
        }
    }(parseInt));
    var J = function (a) {
        if (null == a)throw new TypeError("can't convert " + a + " to object");
        return Object(a)
    }
}), angular.module("app.templates", []).run(["$templateCache", function (a) {
    "use strict";
    a.put("app/CachedTemplates/HomeLoginContainer.html", '<div class="login-modal"><div ui-view="homeLoginContent"></div></div>'), a.put("app/CachedTemplates/Login.html", '<div class="fixed-modal-outer-container"><div class="fixed-modal-container"><div class="fixed-modal modal"><div ui-view="loginWindowContent"></div></div></div></div>'), a.put("app/CachedTemplates/LoginButton.html", '<a href="" class="login-button" ng-click="LoginButtonCtrl.login(); dropVisible.visible = false;">login</a><div ui-view="homeLogin" class="login-modal-animation"></div>'), a.put("app/CachedTemplates/LoginFailed.html", '<div class="fixed-modal-outer-container"><div class="fixed-modal-container"><div class="fixed-modal modal"><button class="modal__close home-icon--close" ng-click="LoginFailedCtrl.cancel()"></button><h3>Login Failed</h3><p>The details which you entered were incorrect</p><div class="buttons-right"><a ng-click="LoginFailedCtrl.forgottenPassword()" class="forgotten-password">Forgotten password?</a> <button class="button button--l button--attr" ng-click="LoginFailedCtrl.cancel()">Cancel</button> <button class="button button--prim button--l" ng-click="LoginFailedCtrl.tryAgain()">Try Again</button></div></div></div></div>'), a.put("app/CachedTemplates/LoginWindowContent.html", '<button class="modal__close home-icon--close" ng-click="LoginCtrl.cancel()"></button><h3>Login</h3><form name="loginForm" novalidate class="home-form" ng-submit="LoginCtrl.login(loginForm.$valid)"><label for="email">Username / Email Address</label><input type="text" name="email" id="email" class="home-form__input" ng-model="LoginCtrl.state.logins.email" required ng-class="{\r\n                        \'home-icon--field-invalid\': LoginCtrl.state.showInvalid && loginForm.email.$invalid\r\n                   }"> Password <input type="password" name="password" id="password" class="home-form__input" ng-model="LoginCtrl.state.logins.password" required ng-class="{\r\n                        \'home-icon--field-invalid\': LoginCtrl.state.showInvalid && loginForm.password.$invalid\r\n                   }"><div class="form-notifications form-notifications--invalid" ng-if="loginForm.$invalid && LoginCtrl.state.showInvalid">Please check the information you have entered.<ul class="form-notifications__list"><li ng-if="loginForm.email.$invalid">You have not entered a username / email address.</li><li ng-if="loginForm.password.$invalid">You have not entered a password.</li></ul></div><div class="form-notifications form-notifications--valid" ng-if="loginForm.$valid && LoginCtrl.state.showInvalid">All sorted :)</div><div class="buttons-right"><a ng-click="LoginCtrl.forgottenPassword()" class="forgotten-password">Forgotten password?</a> <button class="button button--l button--attr" ng-click="LoginCtrl.cancel()" type="button">Cancel</button> <button class="button button--l button--prim home-icon--next-arrow-after" type="submit">Login</button></div></form>'), a.put("app/CachedTemplates/Message.html", '<div class="fixed-modal-outer-container"><div class="fixed-modal-container"><div class="fixed-modal modal"><button class="modal__close home-icon--close" ng-click="LoginFailedCtrl.cancel()"></button><p ng-bind-html="$stateParams[\'serverMessage\']"></p><div class="buttons-right"><button class="button button--attr button--l" ng-click="LoginFailedCtrl.cancel()">Cancel</button> <button class="button button--prim button--l" ng-click="LoginFailedCtrl.tryAgain()">Try Again</button></div></div></div></div>'), a.put("app/CachedTemplates/ModalMask.html", '<div class="modal-mask"></div>'), a.put("app/CachedTemplates/PleaseWait.html", '<div class="fixed-modal-outer-container" ng-if="true"><div class="fixed-modal-container"><div class="fixed-modal--please-wait"><div class="home-icon--loading-white"></div><span class="please-wait-text">Please Wait!</span></div></div></div>'), a.put("app/CachedTemplates/Register.html", '<div class="fixed-modal-outer-container" ng-if="true"><div class="fixed-modal-container"><div class="fixed-modal modal"><button class="modal__close home-icon--close" ng-click="RegisterCtrl.cancel()"></button><h3 ng-if="RegisterCtrl.newProject">Register to save your work and continue</h3><h3 ng-if="!RegisterCtrl.newProject">Create an account</h3><form name="registerForm" novalidate class="home-form" ng-submit="RegisterCtrl.register(registerForm.$valid)"><label for="email">Email Address</label><input type="email" name="email" id="email" class="home-form__input" ng-model="RegisterCtrl.state.registrationInfo.email" required ng-class="{\r\n                            \'home-icon--field-valid\': registerForm.email.$dirty && registerForm.email.$valid,\r\n                            \'home-icon--field-invalid\': RegisterCtrl.registerState.showInvalid && registerForm.email.$invalid\r\n                       }"><label for="name">Full Name</label><input type="text" name="name" id="name" class="home-form__input" ng-model="RegisterCtrl.state.registrationInfo.name" required ng-class="{\r\n                            \'home-icon--field-valid\': registerForm.name.$dirty && registerForm.name.$valid,\r\n                            \'home-icon--field-invalid\': RegisterCtrl.registerState.showInvalid && registerForm.name.$invalid\r\n                       }"><label for="password">Password</label><input type="password" name="password" id="password" class="home-form__input" ng-pattern="/.{8,16}/" ng-model="RegisterCtrl.state.registrationInfo.password" required ng-class="{\r\n                            \'home-icon--field-valid\': registerForm.password.$dirty && registerForm.password.$valid,\r\n                            \'home-icon--field-invalid\': RegisterCtrl.registerState.showInvalid && registerForm.password.$invalid\r\n                       }"><label for="position">Position</label><select id="position" class="home-form__input" ng-model="RegisterCtrl.state.registrationInfo.position" ng-options="position.id as position.position for position in RegisterCtrl.positions"><option value="">Please select your position</option></select><div class="form-notifications form-notifications--invalid" ng-if="registerForm.$invalid && RegisterCtrl.registerState.showInvalid">Some of the information you\'ve entered is invalid.<ul class="form-notifications__list"><li ng-if="registerForm.email.$invalid">You must provide a valid email address</li><li ng-if="registerForm.name.$invalid">Enter your full name</li><li ng-if="registerForm.password.$invalid">Choose a password 8-16 characters long</li></ul></div><div class="form-notifications form-notifications--valid" ng-if="registerForm.$valid && RegisterCtrl.registerState.showInvalid">All sorted :)</div><div class="buttons-right"><a ng-click="RegisterCtrl.login()" class="forgotten-password">I\'ve got an account</a> <button class="button button--l button--attr" type="button" ng-click="RegisterCtrl.cancel()">Cancel</button> <button class="button button--l button--prim home-icon--next-arrow-after" type="submit">Register</button></div></form></div></div></div>'), a.put("app/CachedTemplates/ScrollViewTooltip.html", '<div class="pointer-tooltip-wrapper" ng-if="showTip"><div class="pointer-tooltip">{{ tooltipText }}</div></div>'), a.put("app/CachedTemplates/Switch.html", '<label class="sh-switch-label mail-sidebar-elements"><span ng-if="leftText" class="sh-switch-text" ng-class="{\r\n            \'sh-switch-text--highlighted\': !ngModel\r\n          }">{{ leftText }}</span> <input type="checkbox" class="sh-switch-input" ng-model="ngModel"> <span class="sh-switch"></span> <span ng-if="rightText" class="sh-switch-text" ng-class="{\r\n            \'sh-switch-text--highlighted\': ngModel\r\n          }">{{ rightText }}</span></label>'), a.put("app/CachedTemplates/newProject.html", '<div class="page-content-container"><div ng-if="NewProjectCtrl.state.showNewProject" class="home-app"><div class="page-content-head site-centering"><h1 class="home-step-heading">Step 1: Choose a project to create</h1></div><ul class="site-centering create-new-options grid"><li class="grid__item one-quarter"><button class="create-new-options__option" ui-sref="app.project({ projectType: \'Survey\' })" ui-sref-active="create-new-options__option--selected"><div class="create-new-icon home-icon--survey"></div><span>Survey</span></button></li><!--\n\n            --><li class="grid__item one-quarter"><button class="create-new-options__option" ui-sref="app.project({ projectType: \'Quiz\' })" ui-sref-active="create-new-options__option--selected"><div class="create-new-icon home-icon--quiz"></div><span>Quiz</span></button></li><!--\n\n            --><li class="grid__item one-quarter"><button class="create-new-options__option" ui-sref="app.project({ projectType: \'Form\' })" ui-sref-active="create-new-options__option--selected"><div class="create-new-icon home-icon--form"></div><span>Form</span></button></li><!--\n\n            --><li class="grid__item one-quarter"><button class="create-new-options__option" ui-sref="app.project({ projectType: \'Poll\' })" ui-sref-active="create-new-options__option--selected"><div class="create-new-icon home-icon--poll"></div><span>Poll</span></button></li></ul><div class="create-new-body-container"><div class="create-new-body site-centering" ui-view="nameProject"></div><div ng-if="NewProjectCtrl.state.namingComplete" sh-auto-scroll="-20" scroll-time="600" class="home-icon--tick create-new-complete"></div></div><div class="theme-chooser-view" ui-view="themeChooser"></div></div><div class="modal-mask-container"><div ui-view="modalMask" class="modal-mask-view"></div></div><div ui-view="register" class="fixed-modal-view"></div></div>'), a.put("app/CachedTemplates/newSurvey.html", '<div class="grid"><div class="create-new-body__column grid__item one-half lap--one-whole palm--one-whole"><h2 class="create-new-body__title">Building a survey</h2><div class="create-new-body__text"><p>Create a full page survey with multiple questions, question types and pages. Advanced features like question branching/skip-logic, file uploading and more.</p><ul class="create-new-body__feature-list"><li>Various question formats<sh-helper>A wide range of question types including, but not limited to: Multiple choice choose one or many answers from a list, drop down lists, open ended text questions or comments / essay boxes, star rating widgets, drag to order list ranking, and matrix / table grids (likert scales.) Image selections can be added to most question types.</sh-helper></li><li>Question Logic<sh-helper>Skip users to different questions depending on their previous answers.</sh-helper></li><li>Multiple questions and Pages<sh-helper>Create pages with multiple questions. Multiple pages allows you to divide up your survey into sections.</sh-helper></li><li>Complete brand control<sh-helper>Customize almost every part of your survey to match your own branding. Colors, sizes, borders, fonts, margins and shading can all be changed by just point and clicking. All of our themes allow you to upload and replace our logo.</sh-helper></li><li>Custom reports<sh-helper>Create reports with charts, graphs, tables and text responses from questions of your choice. You can also use the filters to drill down and find useful patterns in your data. Reports can be printed / exported as PDF.</sh-helper></li><li>Data Export<sh-helper>All responses can be exported as Excel spreadsheets and other formats (.xls, .csv, .ssv, .tsv). Reports with charts and graphs can also be exported as PDF.</sh-helper></li></ul><form class="create-new-form" ng-submit="NewProjectCtrl.saveNewProject()"><div class="create-new-form__input" ng-if="!NewProjectCtrl.newProjectConfig.copyExisting"><label class="new-project-label" for="newProjectTitle">Name your survey</label><input class="new-project-input" type="text" required name="newProjectTitle" id="newProjectTitle" ng-model="NewProjectCtrl.newProjectConfig.projectTitle"><sh-scroll-view-tooltip tooltip-text="\'Give your project a name!\'" display-offset="-100" tip-visible="!NewProjectCtrl.state.namingComplete"></sh-scroll-view-tooltip></div><div class="create-new--next-step-holder"><button ng-if="!NewProjectCtrl.state.namingComplete" class="button button--xl button--prim home-icon--next-arrow-after create-new--next-step" type="submit">Next Step</button></div></form></div></div><div class="create-new-body__column create-new-image-column grid__item one-half lap--one-whole palm--one-whole"><sh-display-on-scroll display-offset="-200"><div class="create-new-image-container"><img class="create-new-image" src="/frontend/ts/fe-images/create-new--survey-screenshot.png"><div class="create-new-bubble"><img src="/frontend/ts/fe-images/create-new--survey-bubble.png"></div></div></sh-display-on-scroll></div></div>'), a.put("app/CachedTemplates/themeChooser.html", '<div class="theme-chooser-app"><div class="site-centering"><div class="page-content-container"><div class="page-content-head grid"><div class="grid__item three-fifths"><div class="highlighter home-icon--highlighter"></div><h3 class="home-step-heading">Step 2: Choose how you would like your survey to look</h3></div><!--\n\n                    --><div class="theme-buttons-holder grid__item two-fifths"><div class="theme-buttons"><button ng-if="1===2" ng-disabled="!ThemeChooserCtrl.themesActions.selectedTheme.customisable" ng-click="ThemeChooserCtrl.themesActions.customiseTheme()" class="button button--xl button--attr">{{ (ThemeChooserCtrl.themesActions.selectedTheme.customisable) ? \'Customize theme\' : \'Not customizable\' }}</button> <button ng-click="ThemeChooserCtrl.register()" class="button button--xl button--prim home-icon--next-arrow-after">Next Step</button></div></div></div><div class="page-content-white"><div class="theme-chooser-radios"><sh-switch ng-model="ThemeChooserCtrl.themesActions.embed" left-text="\'Full page themes\'" right-text="\'Embedded themes\'"></sh-switch></div><div class="theme-list-container" scroll-controller scroll-speed="300" scroll-amount="600" scroll-initial="ThemeChooserCtrl.themesActions.currentProject.themeID"><ul class="theme-list force-scrollbar" scroll-area scroll-horizontally><li scroll-if="ThemeChooserCtrl.themesActions.selectedTheme.themeID === themeItem.themeID" ng-click="ThemeChooserCtrl.themesActions.selectTheme(themeItem)" class="theme-list__item" ng-repeat="themeItem in ThemeChooserCtrl.themeDataStore.themeStore | filter: { embed: ThemeChooserCtrl.themesActions.embed } | orderBy:[\'+pos\',\'-customisable\'] "><span class="theme-list__item__holder" ng-class="{ \'theme-list__item__holder--selected\': ThemeChooserCtrl.themesActions.selectedTheme.themeID === themeItem.themeID }"><span class="theme-list__active-theme" ng-if="ThemeChooserCtrl.themesActions.currentProject.themeID === themeItem.themeID ">Active theme</span> <img ng-src="{{ themeItem.thumb }}" title="{{themeItem.themeTitle}}"></span></li></ul><button class="theme-list-button theme-list-button--left home-icon--scroller-left nrm-btn" ng-class="{ \'theme-list-button--left--hidden\': scroller.left }" scroll-button="left"></button> <button class="theme-list-button theme-list-button--right home-icon--scroller-right nrm-btn" ng-class="{ \'theme-list-button--right--hidden\': scroller.right }" scroll-button="right"></button></div><div class="theme-preview"><div class="page-content-head"><h1 class="theme-chooser__preview-heading">Preview: {{ ThemeChooserCtrl.themesActions.selectedTheme.themeTitle }}</h1></div><img class="theme-chooser__preview" sh-class-on-src-change="change" ng-src="{{ ThemeChooserCtrl.themesActions.selectedTheme.preview }}"></div></div><div class="theme-buttons"><button ng-click="ThemeChooserCtrl.register()" class="button button--xl button--prim home-icon--next-arrow-after">Next Step</button></div></div><div ui-view=""></div></div></div>')
}]);
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b(a) {
                var b = {
                    restrict: "A", link: function (b, c, d) {
                        var e = parseInt(d.shAutoScroll), f = parseInt(d.scrollTime || 400);
                        $(a[0].body).animate({scrollTop: c.offset().top + e}, {duration: f})
                    }
                };
                return b
            }

            b.$inject = ["$document"], a.autoScroll = b
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b(a) {
                var b = {
                    restrict: "A", link: function (c, d, e) {
                        var f = e[b.name] || "";
                        e.$observe("src", function (b) {
                            b && a.addClass(d, f, function () {
                                a.removeClass(d, f)
                            })
                        })
                    }
                };
                return b
            }

            b.$inject = ["$animate"], a.classOnSrcChange = b
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b() {
                var a = {
                    restrict: "A", link: function (b, c, d) {
                        var e = a.name, f = d[e], g = d[e + "Disabled"];
                        f && c.on("contextmenu", function (a) {
                            b.$apply(function () {
                                b.$eval(f)
                            }), (angular.isUndefined(g) || b.$eval(g)) && a.preventDefault()
                        })
                    }
                };
                return a
            }

            b.$inject = [], a.contextMenuTrigger = b
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b() {
                var a = {
                    restrict: "A", controller: ["$element", function (a) {
                        this.$element = a
                    }]
                };
                return a
            }

            function c() {
                var a = {
                    restrict: "A", require: "?^shGrowHeightTarget", link: function (a, b, c, d) {
                        function e(a) {
                            f.css("height", a ? a + "px" : "")
                        }

                        var f;
                        d && (f = d.$element, a.$watch(function () {
                            return b.outerHeight(!0)
                        }, function (a, c) {
                            var d, g, h, i;
                            a !== c && (f.height(""), d = b.offset().top, g = d + a, h = f.offset().top, i = h + f.outerHeight(!0), g > i && e(f.height() + (g - i)))
                        }), a.$on("$destroy", function () {
                            e()
                        }))
                    }
                };
                return a
            }

            b.$inject = [], a.growHeightTarget = b, c.$inject = [], a.growHeightDirective = c
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b() {
                var a = {
                    restrict: "E", controller: ["$element", function (a) {
                        this.$element = a
                    }]
                };
                return a
            }

            b.$inject = [], a.labelDirective = b
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b(a) {
                var b = {
                    restrict: "A", terminal: !0, link: function (c, d, e) {
                        function f() {
                            $(document).off(h)
                        }

                        var g = e[b.name], h = _.uniqueId("click." + b.name + ".");
                        g && ($(document).on(h, function (b) {
                            $.contains(d[0], b.target) || (a(function () {
                                c.$eval(g)
                            }), f())
                        }), c.$on("$destroy", f))
                    }
                };
                return b
            }

            b.$inject = ["$timeout"], a.onElementBlurDirective = b
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b(a) {
                var b = function (a, b, c, d, e) {
                    angular.forEach(c.find("option"), function (c, f) {
                        var g = angular.element(c);
                        if ("" != g.val()) {
                            var h = {};
                            h[b] = d[f], g.attr("disabled", e(a, h))
                        }
                    })
                }, c = {
                    restrict: "A", priority: 0, require: "ngModel", link: function (c, d, e) {
                        var f = e.optionsDisabled.match(/^\s*(.+)\s+for\s+(.+)\s+in\s+(.+)?\s*/), g = f[3], h = a(f[1]);
                        c.$watch(g, function (a) {
                            a && b(c, f[2], d, a, h)
                        }, !0), c.$watch(e.ngModel, function (e) {
                            var i = a(g)(c);
                            e && b(c, f[2], d, i, h)
                        })
                    }
                };
                return c
            }

            b.$inject = ["$parse"], a.optionsDisabled = b
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b() {
                return {
                    restrict: "A", controller: ["$scope", function (a) {
                        function b() {
                            var b = $(c.element), d = c.element[0].scrollWidth - c.element[0].clientWidth, e = c.element[0].scrollHeight - c.element[0].clientHeight;
                            c.hideElements.top = !(b.scrollTop() > 0), c.hideElements.left = !(b.scrollLeft() > 0), c.hideElements.right = b.scrollLeft() >= d, c.hideElements.bottom = b.scrollTop() >= e, a.$apply()
                        }

                        var c = {
                            element: null,
                            amount: 0,
                            speed: null,
                            hideElements: {left: !0, top: !0, right: !1, bottom: !1}
                        };
                        return a.scroller = c.hideElements, {checkPosition: b, scrollSettings: c}
                    }], link: function (a, b, c, d) {
                        d.scrollSettings.speed = c.scrollSpeed, d.scrollSettings.amount = c.scrollAmount
                    }
                }
            }

            function c() {
                return {
                    restrict: "A", require: "^scrollController", link: function (a, b, c, d) {
                        d.scrollSettings.element = b, b.bind("scroll", function () {
                            d.checkPosition()
                        })
                    }
                }
            }

            function d() {
                return {
                    restrict: "A", require: "^scrollController", link: function (a, b, c, d) {
                        var e = {duration: d.scrollSettings.speed || 600, queing: !1, complete: d.checkPosition};
                        a.$watch(c.scrollIf, function (a) {
                            a && $(d.scrollSettings.element).animate({scrollLeft: b[0].offsetLeft - 400}, e)
                        })
                    }
                }
            }

            function e() {
                return {
                    restrict: "A", require: "^scrollController", link: function (a, b, c, d) {
                        var e = d.scrollSettings;
                        b.bind("mousedown", function () {
                            var a, b;
                            switch (a = {
                                duration: e.speed || 400,
                                queue: !1,
                                complete: d.checkPosition
                            }, c.scrollButton) {
                                case"right":
                                    b = {scrollLeft: "+=" + e.amount + "px"};
                                    break;
                                case"left":
                                    b = {scrollLeft: "-=" + e.amount + "px"};
                                    break;
                                case"up":
                                    b = {scrollTop: "-=" + e.amount + "px"};
                                    break;
                                case"down":
                                    b = {scrollTop: "+=" + e.amount + "px"}
                            }
                            $(e.element).animate(b, a)
                        })
                    }
                }
            }

            function f(a) {
                return {
                    restrict: "A", link: function (b, c) {
                        function d(a) {
                            var b = a || window.event;
                            f && (b.preventDefault(), c[0].doScroll ? c[0].doScroll(b.wheelDelta > 0 ? "left" : "right") : (b.wheelDelta || b.detail) > 0 ? c.animate({scrollLeft: "-=200px"}, e) : c.animate({scrollLeft: "+=200px"}, e))
                        }

                        var e, f, g;
                        e = {duration: 50, queue: !1, easing: "linear"}, c.on("mouseenter", function () {
                            "onmousewheel"in document.body ? c[0].onmousewheel = d : c.on("DOMMouseScroll", d), g = a(function () {
                                f = !0
                            }, 200)
                        }), c.on("mouseleave", function () {
                            a.cancel(g), f = !1
                        })
                    }
                }
            }

            a.scrollController = b, a.scrollArea = c, a.scrollIf = d, a.scrollButton = e, f.$inject = ["$timeout"], a.scrollHorizontally = f
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b(a) {
                var b = {
                    restrict: "EA", link: function (b, c, d) {
                        var e = parseFloat(d.clickScrollToSpeed) || 300, f = parseFloat(d.clickScrollToOffset) || 0, g = $(d.shScrollToElement), h = d.clickScrollToCondition.toString(), i = g.offset().top + f;
                        c.on("click", function () {
                            function b() {
                                $(a[0].body).animate({scrollTop: i}, {duration: e})
                            }

                            switch (h) {
                                case"above":
                                    a[0].body.scrollTop < i && b();
                                    break;
                                case"below":
                                    a[0].body.scrollTop > i && b();
                                    break;
                                default:
                                    b()
                            }
                        })
                    }
                };
                return b
            }

            b.$inject = ["$document"], a.scrollToElement = b
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b() {
                var a = {
                    restrict: "A", link: function (a, b) {
                        b.on("focus", function () {
                            b.select()
                        }), b.on("mouseup", function (a) {
                            a.preventDefault()
                        })
                    }
                };
                return a
            }

            b.$inject = [], a.selectText = b
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b() {
                var a = {
                    restrict: "A", controller: ["$element", function (a) {
                        this.$element = a
                    }]
                };
                return a
            }

            function c(a) {
                var b = {
                    require: "?^shStickyHolder", link: function (b, c, d, e) {
                        function f(a) {
                            "undefined" == typeof a && (a = c.outerHeight(!0));
                            var b, d, e, f;
                            b = i.scrollTop(), d = i.height(), e = k.offset().top + k.height(), h = j > b || a > d, f = a + b >= e, h ? g && (g.remove(), g = null) : g || (g = $("<div/>").css({
                                width: c.width(),
                                height: a
                            }), c.before(g)), c.css({
                                position: h ? "" : "absolute",
                                top: h || f ? "" : b - j + "px",
                                bottom: h || !f ? "" : "0"
                            })
                        }

                        var g, h, i = angular.element(window), j = c.offset().top, k = e ? e.$element : c.parent();
                        a(function () {
                            b.$watch(function () {
                                return c.outerHeight(!0)
                            }, function (a, b) {
                                a !== b && f(a)
                            }, !0), i.scroll(function () {
                                f()
                            }), i.resize(function () {
                                f()
                            })
                        })
                    }
                };
                return b
            }

            b.$inject = [], a.stickyHolder = b, c.$inject = ["$timeout"], a.stickyDirective = c
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b() {
                var a = {
                    restrict: "EA",
                    require: "ngModel",
                    templateUrl: "app/CachedTemplates/Switch.html",
                    scope: {ngModel: "=", leftText: "=", rightText: "="},
                    replace: !0,
                    link: function () {
                    }
                };
                return a
            }

            b.$inject = [], a.shSwitch = b
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b(a, b) {
                var c = {
                    restrict: "EA",
                    templateUrl: "app/CachedTemplates/ScrollViewTooltip.html",
                    link: function (c, d, e) {
                        function f() {
                            if (!h) {
                                var a = g.scrollTop(), f = g.height(), i = d.offset().top;
                                i < a + f + c.$eval(e.displayOffset) && c.$eval(e.tipVisible) && b(function () {
                                    c.showTip = !0, c.$apply()
                                }, 500, !1)
                            }
                        }

                        var g = angular.element(a), h = !1;
                        c.showTip = !1;
                        g.bind("scroll", c.$apply.bind(c, f));
                        b(function () {
                            f()
                        }, 1200, !1), c.$watch(e.tooltipText, function (a) {
                            c.tooltipText = a
                        }), c.$watch(e.tipVisible, function (a) {
                            a === !1 && (c.showTip = !1)
                        }), d.bind("click", function () {
                            c.showTip = !1, h = !0, c.$apply()
                        })
                    }
                };
                return c
            }

            b.$inject = ["$window", "$timeout"], a.scrollViewTooltip = b
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b(a) {
                var b = {
                    restrict: "E",
                    scope: !0,
                    transclude: !0,
                    template: '<span class="helper"><span class="helper__icon home-icon--helper-icon"></span><span class="helper__tip" ng-if="tipVisible"><div ng-transclude></div></span></span>',
                    link: function (b, c) {
                        b.tipVisible = !1;
                        var d, e = !1;
                        c.bind("mouseenter", function () {
                            a.cancel(d), b.$apply(function () {
                                b.tipVisible = !0
                            })
                        }), c.bind("mouseleave", function () {
                            d = a(function () {
                                b.$apply(function () {
                                    b.tipVisible = !1
                                })
                            }, 200)
                        }), c.bind("click", function () {
                            b.$apply(function () {
                                b.tipVisible = e = !e
                            })
                        })
                    }
                };
                return b
            }

            b.$inject = ["$timeout"], a.helper = b
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            function b(a) {
                var b = {
                    restrict: "EA",
                    scope: !0,
                    transclude: !0,
                    template: '<div ng-if="show"><div ng-transclude></div></div>',
                    link: function (b, c, d) {
                        function e() {
                            var a = f.scrollTop(), e = f.height(), g = c.offset().top;
                            g < a + e + b.$eval(d.displayOffset) && setTimeout(function () {
                                b.show = !0, b.$apply()
                            }, 500, !1)
                        }

                        var f = angular.element(a);
                        b.show = !1;
                        f.bind("scroll", b.$apply.bind(b, e));
                        e()
                    }
                };
                return b
            }

            b.$inject = ["$window", "$timeout"], a.displayOnScroll = b
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            angular.module("app.common.directives", []).directive("label", a.labelDirective).directive("shSelectText", a.selectText).directive("shContextMenu", a.contextMenuTrigger).directive("shOnElementBlur", a.onElementBlurDirective).directive("shSticky", a.stickyDirective).directive("shStickyHolder", a.stickyHolder).directive("shGrowHeight", a.growHeightDirective).directive("shGrowHeightTarget", a.growHeightTarget).directive("scrollController", a.scrollController).directive("scrollArea", a.scrollArea).directive("scrollIf", a.scrollIf).directive("scrollButton", a.scrollButton).directive("scrollHorizontally", a.scrollHorizontally).directive("shScrollToElement", a.scrollToElement).directive("shOptionsDisabled", a.optionsDisabled).directive("shSwitch", a.shSwitch).directive("shAutoScroll", a.autoScroll).directive("shScrollViewTooltip", a.scrollViewTooltip).directive("shHelper", a.helper).directive("shDisplayOnScroll", a.displayOnScroll)
        }(a.directives || (a.directives = {}));
        a.directives
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    a.appStateConfig = {
        name: "app",
        "abstract": !0,
        sticky: !0,
        views: {
            loginButton: {
                templateUrl: "app/CachedTemplates/LoginButton.html",
                controller: "LoginButtonCtrl as LoginButtonCtrl"
            },
            homeApp: {
                templateUrl: "app/CachedTemplates/newProject.html",
                controller: "NewProjectCtrl as NewProjectCtrl"
            }
        },
        onEnter: ["newProjectState", function (a) {
            a.projectConfig = {projectType: null, projectTitle: null, themeID: null}
        }]
    }
}(shout || (shout = {}));
var shout;
!function (a) {
    a.appRoot = "http://sritechapp.com/frontend/ts/", angular.element(document).ready(function () {
        angular.module("app", ["ngAnimate", "ct.ui.router.extras", "app.register", "app.project.theme", "app.common.directives", "app.templates", "ngSanitize"]).controller("NewProjectCtrl", a.newProject.NewProjectCtrl).value("newProjectState", a.newProject.newProjectState).config(["$stateProvider", "$urlRouterProvider", function (b, c) {
            b.state(a.appStateConfig).state(a.newProject.newProjectStateConfig), c.otherwise("http://sritechapp.com/")
        }]).run(["$rootScope", "$state", "$stateParams", function (a, b, c) {
            a.$state = b, a.$stateParams = c
        }]), angular.bootstrap(document, ["app"])
    })
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            !function (a) {
                a[a.All = -1] = "All", a[a.Survey = 1] = "Survey", a[a.Quiz = 2] = "Quiz", a[a.Poll = 3] = "Poll", a[a.None = 4] = "None", a[a.TimeRelease = 5] = "TimeRelease", a[a.Form = 6] = "Form"
            }(a.SurveyType || (a.SurveyType = {}));
            a.SurveyType
        }(a.enums || (a.enums = {}));
        a.enums
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (b) {
        var c = function () {
            function c(a, c, d) {
                this.state = a, this._$state = c, this._registerState = d, this.newProjectConfig = b.newProjectState.projectConfig
            }

            return c.prototype.saveNewProject = function () {
                this.state.namingComplete = !0, this._$state.go(a.project.theme.themeChooserStateConfig.name)
            }, c.prototype.createPoll = function () {
                this._$state.go(a.register.registerStateConfig.name, {projectType: "poll"})
            }, c.$inject = ["newProjectState", "$state", "registerState"], c
        }();
        b.NewProjectCtrl = c
    }(a.newProject || (a.newProject = {}));
    a.newProject
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        a.newProjectState = {projectConfig: null, namingComplete: !1, registrationInfo: null, showNewProject: !0}
    }(a.newProject || (a.newProject = {}));
    a.newProject
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (b) {
        var c = "app/NewProject/Views/index.html";
        b.newProjectStateConfig = {
            name: a.appStateConfig.name + ".project",
            sticky: !0,
            url: "/",
            params: {projectType: {}},
            views: {
                nameProject: {
                    templateProvider: ["$http", "$stateParams", "$templateCache", function (b, d, e) {
                        var f, g = d.projectType || appSettings.initial;
                        switch (d.projectType = g, d.projectType) {
                            case"Quiz":
                                f = "newQuiz";
                                break;
                            case"Form":
                                f = "newForm";
                                break;
                            case"Poll":
                                f = "newPoll";
                                break;
                            default:
                                f = "newSurvey"
                        }
                        var h = "newSurvey" === f ? "app/CachedTemplates/" : a.appRoot + c;
                        return b.get(h + f + ".html", {cache: e}).then(function (a) {
                            return a.data
                        })
                    }], controller: "NewProjectCtrl as NewProjectCtrl"
                }
            },
            onEnter: ["newProjectState", "$stateParams", function (b, c) {
                c.projectType || (c.projectType = "Survey"), b.namingComplete = !1, b.projectConfig.projectType = a.common.enums.SurveyType[c.projectType], b.showNewProject = appSettings.showNewProject
            }]
        }
    }(a.newProject || (a.newProject = {}));
    a.newProject
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (b) {
        !function (b) {
            var c = "app/Theme/Views/index.html";
            b.themeChooserStateConfig = {
                name: a.newProject.newProjectStateConfig.name + ".theme",
                views: {
                    "themeChooser@app": {
                        templateUrl: "app/CachedTemplates/themeChooser.html",
                        controller: "ThemeChooserCtrl as ThemeChooserCtrl"
                    }
                },
                resolve: {
                    getThemes: ["themeChooserOperations", function (a) {
                        return a.getThemesData()
                    }]
                },
                onEnter: ["$stateParams", "themeChooserActions", "themeChooserDataStore", function (a, b, c) {
                    b.selectedTheme = _.findWhere(c.themeStore, {themeID: 8200})
                }]
            }, b.themeChooserPreviewAlert = {
                name: b.themeChooserStateConfig.name + ".previewAlert",
                templateUrl: a.appRoot + c + "previewAlert.html"
            }
        }(b.theme || (b.theme = {}));
        b.theme
    }(a.project || (a.project = {}));
    a.project
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (b) {
        !function (b) {
            var c = function () {
                function b(a, b, c) {
                    this.themeDataStore = a, this.themesActions = b, this._$state = c
                }

                return b.prototype.register = function () {
                    this._$state.go(a.register.registerStateConfig.name, {projectType: "survey"})
                }, b.$inject = ["themeChooserDataStore", "themeChooserActions", "$state"], b
            }();
            b.ThemeChooserCtrl = c
        }(b.theme || (b.theme = {}));
        b.theme
    }(a.project || (a.project = {}));
    a.project
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            var b = function () {
                function a(a) {
                    this._newProjectState = a, this.selectedTheme = null, this.embed = !1
                }

                return a.prototype.selectTheme = function (a) {
                    this.selectedTheme = a, this._newProjectState.projectConfig.themeID = a.themeID
                }, a.$inject = ["newProjectState"], a
            }();
            a.ThemeChooserActions = b
        }(a.theme || (a.theme = {}));
        a.theme
    }(a.project || (a.project = {}));
    a.project
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            !function (a) {
                var b = function () {
                    function a() {
                        this.themeStore = []
                    }

                    return a.$inject = [], a
                }();
                a.DataStore = b
            }(a.data || (a.data = {}));
            a.data
        }(a.theme || (a.theme = {}));
        a.theme
    }(a.project || (a.project = {}));
    a.project
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            var b = function () {
                function a(a, b, c, d, e) {
                    this._$state = a, this._$q = b, this._themesDataStore = c, this._requests = d, this._themeChooserActions = e, this._themesDataReceived = !1
                }

                return a.prototype.getThemesData = function () {
                    var a = this;
                    return this._$q.when(this._themesDataReceived ? this._themesDataStore.themeStore : this._requests.getThemesData().then(function (b) {
                        return a._themesDataReceived = !0, Array.prototype.push.apply(a._themesDataStore.themeStore, b.data), a._themesDataStore
                    }))
                }, a.$inject = ["$state", "$q", "themeChooserDataStore", "themeChooserRequests", "themeChooserActions"], a
            }();
            a.ThemeChooserOperations = b
        }(a.theme || (a.theme = {}));
        a.theme
    }(a.project || (a.project = {}));
    a.project
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            !function (a) {
                var b = function () {
                    function a(a) {
                        this._$http = a
                    }

                    return a.prototype.getThemesData = function () {
                        return this._$http.get("http://sritechapp.com/app/homeAjax/getThemes.asp", {cache: !0})
                    }, a.$inject = ["$http"], a
                }();
                a.ThemeChooserRequests = b
            }(a.requests || (a.requests = {}));
            a.requests
        }(a.theme || (a.theme = {}));
        a.theme
    }(a.project || (a.project = {}));
    a.project
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            angular.module("app.project.theme", []).service("themeChooserDataStore", a.data.DataStore).service("themeChooserOperations", a.ThemeChooserOperations).service("themeChooserRequests", a.requests.ThemeChooserRequests).service("themeChooserActions", a.ThemeChooserActions).controller("ThemeChooserCtrl", a.ThemeChooserCtrl).config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function (b) {
                b.state(a.themeChooserStateConfig).state(a.themeChooserPreviewAlert)
            }])
        }(a.theme || (a.theme = {}));
        a.theme
    }(a.project || (a.project = {}));
    a.project
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            var b = function () {
                function b(a) {
                    this._$state = a
                }

                return b.prototype.login = function () {
                    this._$state.go(a.mainLoginState.name, {projectType: ""})
                }, b.$inject = ["$state"], b
            }();
            a.LoginButtonCtrl = b
        }(a.login || (a.login = {}));
        a.login
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            a.registrationInfo = {email: "", name: "", password: "", position: null}
        }(a.data || (a.data = {}));
        a.data
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        var b = function () {
            function a(a) {
                this._$http = a
            }

            return a.prototype.register = function (a) {
                return this._$http({
                    method: "post",
                    url: "/app/homeAjax/register.asp",
                    data: a,
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(function (a) {
                    return a.data
                })
            }, a.$inject = ["$http"], a
        }();
        a.RegisterRequests = b
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        a.RegisterState = {showInvalid: !1}
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (b) {
        b.loginRegisterStateConfig = {
            name: a.appStateConfig.name + ".loginRegister",
            "abstract": !0,
            params: {projectType: {}},
            onEnter: ["$previousState", function (a) {
                a.memo("mainPage")
            }]
        }
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (b) {
        b.registerStateConfig = {
            name: b.loginRegisterStateConfig.name + ".register",
            params: {projectType: {}},
            views: {
                "register@app": {
                    templateUrl: "app/CachedTemplates/Register.html",
                    controller: "RegisterCtrl as RegisterCtrl"
                }, "modalMask@app": {templateUrl: "app/CachedTemplates/ModalMask.html"}
            },
            onEnter: ["newProjectState", "registerState", function (a, c) {
                c.showInvalid = !1, a.registrationInfo || (a.registrationInfo = angular.copy(b.data.registrationInfo))
            }]
        }, b.registerPleaseWaitStateConfig = {
            name: b.loginRegisterStateConfig.name + ".registerPleaseWait",
            params: {projectType: {}},
            views: {
                "register@app": {templateUrl: "app/CachedTemplates/PleaseWait.html"},
                "modalMask@app": {templateUrl: "app/CachedTemplates/ModalMask.html"}
            }
        }, b.emailAddressTakenStateConfig = {
            name: b.loginRegisterStateConfig.name + ".emailTaken",
            params: {projectType: {}},
            views: {
                "register@app": {
                    templateUrl: a.appRoot + "app/Register/Views/EmailAddressTaken.html",
                    controller: "EmailTakenCtrl as EmailTakenCtrl"
                }, "modalMask@app": {templateUrl: "app/CachedTemplates/ModalMask.html"}
            }
        }, b.registerServerMessageStateConfig = {
            name: b.loginRegisterStateConfig.name + ".registerServerMessage",
            params: {projectType: {}, serverMessage: {}},
            views: {
                "register@app": {
                    templateUrl: a.appRoot + "app/Register/Views/Message.html",
                    controller: "EmailTakenCtrl as EmailTakenCtrl"
                }, "modalMask@app": {templateUrl: "app/CachedTemplates/ModalMask.html"}
            }
        }
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        var b = function () {
            function b(a, b, c, d, e) {
                this._$state = a, this.state = b, this.registerState = c, this._registerRequests = d, this._$previousState = e, this.positions = [{
                    id: 1,
                    position: "Personal/Student"
                }, {id: 2, position: "School/College"}, {id: 3, position: "Small Business"}, {
                    id: 4,
                    position: "Larger Businesses or Government Departments"
                }]
            }

            return b.prototype.register = function (b) {
                var c = this;
                if (b) {
                    this._$state.go(a.registerPleaseWaitStateConfig.name);
                    var d = _.omit(this.state, "namingComplete");
                    this.state.namingComplete && 3 !== this.state.projectConfig.projectType || (d = _.omit(d, "projectConfig")), this._registerRequests.register(d).then(function (b) {
                        if (b.success)window.location.href = b.surveyId ? "/app/build.asp#/" + b.surveyId + "/" : c.state.namingComplete && 3 === c.state.projectConfig.projectType ? "/app/createsurvey.asp?type=3" : "/app/create-options.asp?newuser=1"; else switch (b.errorCode) {
                            case"emailTaken":
                                c._$state.go(a.emailAddressTakenStateConfig.name);
                                break;
                            case"message":
                                c._$state.go(a.registerServerMessageStateConfig.name, {serverMessage: b.errorMsg});
                                break;
                            default:
                                c._$state.go(a.registerServerMessageStateConfig.name, {serverMessage: "Something went wrong, please try again"})
                        }
                    })
                } else this.registerState.showInvalid = !0
            }, b.prototype.login = function () {
                this._$state.go(a.login.loginStateConfig.name, {email: this.state.registrationInfo.email})
            }, b.prototype.cancel = function () {
                this._$previousState.go("mainPage")
            }, b.$inject = ["$state", "newProjectState", "registerState", "registerRequests", "$previousState"], b
        }();
        a.RegisterCtrl = b
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        var b = function () {
            function b(a, b, c) {
                this._$state = a, this.newProjectState = b, this._$previousState = c
            }

            return b.prototype.tryAgain = function () {
                this._$state.go(a.registerStateConfig.name)
            }, b.prototype.login = function () {
                this._$state.go(a.login.loginStateConfig.name, {email: this.newProjectState.registrationInfo.email})
            }, b.prototype.cancel = function () {
                this._$previousState.go("mainPage")
            }, b.$inject = ["$state", "newProjectState", "$previousState"], b
        }();
        a.EmailTakenCtrl = b
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (b) {
            var c = function () {
                function c(a, b, c, d, e) {
                    this._$state = a, this.state = b, this._loginRequests = c, this._$previousState = d, this._newProjectState = e
                }

                return c.prototype.login = function (c) {
                    var d = this;
                    if (c) {
                        var e = {logins: this.state.logins};
                        this._newProjectState.namingComplete && 3 !== this._newProjectState.projectConfig.projectType && (e.projectConfig = this._newProjectState.projectConfig), this._$state.go(a.registerPleaseWaitStateConfig.name), this._loginRequests.login(e).then(function (a) {
                            if (a.success)window.location.href = a.surveyId ? "/app/build.asp#/" + a.surveyId + "/" : d._newProjectState.namingComplete && 3 === d._newProjectState.projectConfig.projectType ? "/app/createsurvey.asp?type=3" : "/app/dashboard.asp"; else switch (console.log("errcode", a.errorCode), a.errorCode) {
                                case"incorrect":
                                    d._$state.go(b.loginFailedStateConfig.name);
                                    break;
                                case"message":
                                    d._$state.go(b.loginServerMessageStateConfig.name, {serverMessage: a.errorMsg});
                                    break;
                                default:
                                    console.log("something went wrong"), d._$state.go(b.loginServerMessageStateConfig.name, {serverMessage: "Something went wrong"})
                            }
                        })
                    } else this.state.showInvalid = !0
                }, c.prototype.forgottenPassword = function () {
                    this._$state.go(a.forgottenPassword.forgottenPasswordStateConfig.name, {email: this.state.logins.email})
                }, c.prototype.cancel = function () {
                    this._$previousState.go("mainPage")
                }, c.$inject = ["$state", "loginState", "loginRequestsService", "$previousState", "newProjectState"], c
            }();
            b.LoginCtrl = c
        }(a.login || (a.login = {}));
        a.login
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (b) {
            var c = function () {
                function c(a, b, c) {
                    this._$state = a, this.loginState = b, this._$previousState = c
                }

                return c.prototype.tryAgain = function () {
                    this._$state.go(b.loginStateConfig.name)
                }, c.prototype.forgottenPassword = function () {
                    this._$state.go(a.forgottenPassword.forgottenPasswordStateConfig.name, {email: this.loginState.logins.email})
                }, c.prototype.cancel = function () {
                    this._$previousState.go("mainPage")
                }, c.$inject = ["$state", "loginState", "$previousState"], c
            }();
            b.LoginFailedCtrl = c
        }(a.login || (a.login = {}));
        a.login
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            var b = function () {
                function a(a) {
                    this._$http = a
                }

                return a.prototype.login = function (a) {
                    return this._$http({
                        method: "post",
                        url: "/app/homeAjax/login.asp",
                        data: a,
                        headers: {"Content-Type": "application/x-www-form-urlencoded"}
                    }).then(function (a) {
                        return a.data
                    })
                }, a.$inject = ["$http"], a
            }();
            a.LoginRequestsService = b
        }(a.login || (a.login = {}));
        a.login
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            a.LoginState = {showInvalid: !1, logins: {email: "", password: ""}}
        }(a.login || (a.login = {}));
        a.login
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (b) {
        !function (c) {
            c.loginStateConfig = {
                name: b.loginRegisterStateConfig.name + ".login",
                params: {email: "", projectType: {}},
                views: {
                    "register@app": {
                        templateUrl: "app/CachedTemplates/Login.html",
                        controller: "LoginCtrl as LoginCtrl"
                    },
                    "loginWindowContent@app.loginRegister.login": {templateUrl: "app/CachedTemplates/LoginWindowContent.html"},
                    "modalMask@app": {templateUrl: "app/CachedTemplates/ModalMask.html"}
                },
                onEnter: ["$stateParams", "loginState", function (a, b) {
                    "" !== a.email && (b.logins.email = a.email)
                }],
                onExit: ["loginState", function (a) {
                    a.logins.password = "", a.showInvalid = !1
                }]
            }, c.loginFailedStateConfig = {
                name: b.loginRegisterStateConfig.name + ".loginFailed",
                params: {projectType: {}},
                views: {
                    "register@app": {
                        templateUrl: a.appRoot + "app/Register/Login/Views/LoginFailed.html",
                        controller: "LoginFailedCtrl as LoginFailedCtrl"
                    }, "modalMask@app": {templateUrl: "app/CachedTemplates/ModalMask.html"}
                }
            }, c.mainLoginState = {
                name: b.loginRegisterStateConfig.name + ".mainLogin",
                params: {mainLogin: !0, projectType: {}},
                views: {
                    "homeLogin@app": {
                        templateUrl: "app/CachedTemplates/HomeLoginContainer.html",
                        controller: "LoginCtrl as LoginCtrl"
                    },
                    "homeLoginContent@app.loginRegister.mainLogin": {templateUrl: "app/CachedTemplates/LoginWindowContent.html"}
                },
                onExit: ["loginState", function (a) {
                    a.logins.password = "", a.showInvalid = !1
                }]
            }, c.loginServerMessageStateConfig = {
                name: b.loginRegisterStateConfig.name + ".loginServerMessage",
                params: {projectType: {}, serverMessage: {}},
                views: {
                    "register@app": {
                        templateUrl: "app/CachedTemplates/Message.html",
                        controller: "LoginFailedCtrl as LoginFailedCtrl"
                    }, "modalMask@app": {templateUrl: "app/CachedTemplates/ModalMask.html"}
                }
            }
        }(b.login || (b.login = {}));
        b.login
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            var b = function () {
                function b(a, b, c, d) {
                    this._$state = a, this.state = b, this._requests = c, this._$previousState = d
                }

                return b.prototype.remember = function (b) {
                    var c = this;
                    b ? this._requests.remember(this.state.email).then(function (b) {
                        if (b.success)c._$state.go(a.forgottenPasswordSentStateConfig.name); else switch (b.errorCode) {
                            case"notFound":
                                c._$state.go(a.forgottenPasswordNotFoundStateConfig.name);
                                break;
                            case"message":
                                c._$state.go(a.forgottenPasswordServerMessageStateConfig.name, {serverMessage: b.errorMsg})
                        }
                    }) : this.state.showInvalid = !0
                }, b.prototype.tryAgain = function () {
                    this._$state.go(a.forgottenPasswordStateConfig.name)
                }, b.prototype.cancel = function () {
                    this._$previousState.go("mainPage")
                }, b.$inject = ["$state", "forgottenPasswordState", "forgottenPasswordRequestsService", "$previousState"], b
            }();
            a.ForgottenPasswordCtrl = b
        }(a.forgottenPassword || (a.forgottenPassword = {}));
        a.forgottenPassword
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            var b = function () {
                function a(a) {
                    this._$http = a
                }

                return a.prototype.remember = function (a) {
                    var b = {email: a};
                    return this._$http({
                        method: "post",
                        url: "/app/homeAjax/forgotPassword.asp",
                        data: b,
                        headers: {"Content-Type": "application/x-www-form-urlencoded"}
                    }).then(function (a) {
                        return a.data
                    })
                }, a.$inject = ["$http"], a
            }();
            a.ForgottenPasswordRequestsService = b
        }(a.forgottenPassword || (a.forgottenPassword = {}));
        a.forgottenPassword
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            a.forgottenPasswordState = {showInvalid: !1, email: ""}
        }(a.forgottenPassword || (a.forgottenPassword = {}));
        a.forgottenPassword
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (b) {
        !function (c) {
            c.forgottenPasswordStateConfig = {
                name: b.loginRegisterStateConfig.name + ".forgottenPassword",
                params: {email: "", projectType: {}},
                views: {
                    "register@app": {
                        templateUrl: a.appRoot + "app/Register/ForgottenPassword/Views/ForgottenPassword.html",
                        controller: "ForgottenPasswordCtrl as ForgottenPasswordCtrl"
                    }, "modalMask@app": {templateUrl: "app/CachedTemplates/ModalMask.html"}
                },
                onEnter: ["forgottenPasswordState", "$stateParams", function (a, b) {
                    a.showInvalid = !1, "" !== b.email && (a.email = b.email)
                }]
            }, c.forgottenPasswordSentStateConfig = {
                name: b.loginRegisterStateConfig.name + ".passwordSent",
                params: {projectType: {}},
                views: {
                    "register@app": {
                        templateUrl: a.appRoot + "app/Register/ForgottenPassword/Views/EmailSent.html",
                        controller: "ForgottenPasswordCtrl as ForgottenPasswordCtrl"
                    }, "modalMask@app": {templateUrl: "app/CachedTemplates/ModalMask.html"}
                }
            }, c.forgottenPasswordNotFoundStateConfig = {
                name: b.loginRegisterStateConfig.name + ".passwordNotFound",
                params: {projectType: {}},
                views: {
                    "register@app": {
                        templateUrl: a.appRoot + "app/Register/ForgottenPassword/Views/NotFound.html",
                        controller: "ForgottenPasswordCtrl as ForgottenPasswordCtrl"
                    }, "modalMask@app": {templateUrl: "app/CachedTemplates/ModalMask.html"}
                }
            }, c.forgottenPasswordServerMessageStateConfig = {
                name: b.loginRegisterStateConfig.name + ".serverMessage",
                params: {projectType: {}, serverMessage: {}},
                views: {
                    "register@app": {
                        templateUrl: a.appRoot + "app/Register/ForgottenPassword/Views/Message.html",
                        controller: "ForgottenPasswordCtrl as ForgottenPasswordCtrl"
                    }, "modalMask@app": {templateUrl: "app/CachedTemplates/ModalMask.html"}
                }
            }
        }(b.forgottenPassword || (b.forgottenPassword = {}));
        b.forgottenPassword
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        angular.module("app.register", []).controller("RegisterCtrl", a.RegisterCtrl).controller("EmailTakenCtrl", a.EmailTakenCtrl).controller("LoginCtrl", a.login.LoginCtrl).controller("LoginFailedCtrl", a.login.LoginFailedCtrl).controller("ForgottenPasswordCtrl", a.forgottenPassword.ForgottenPasswordCtrl).controller("LoginButtonCtrl", a.login.LoginButtonCtrl).service("loginRequestsService", a.login.LoginRequestsService).service("registerRequests", a.RegisterRequests).service("forgottenPasswordRequestsService", a.forgottenPassword.ForgottenPasswordRequestsService).value("registerState", a.RegisterState).value("loginState", a.login.LoginState).value("forgottenPasswordState", a.forgottenPassword.forgottenPasswordState).config(["$stateProvider", function (b) {
            b.state(a.login.mainLoginState).state(a.loginRegisterStateConfig).state(a.registerStateConfig).state(a.registerPleaseWaitStateConfig).state(a.emailAddressTakenStateConfig).state(a.registerServerMessageStateConfig).state(a.login.loginStateConfig).state(a.login.loginFailedStateConfig).state(a.login.loginServerMessageStateConfig).state(a.forgottenPassword.forgottenPasswordStateConfig).state(a.forgottenPassword.forgottenPasswordNotFoundStateConfig).state(a.forgottenPassword.forgottenPasswordSentStateConfig).state(a.forgottenPassword.forgottenPasswordServerMessageStateConfig)
        }])
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            !function (a) {
                a[a.Large = 0] = "Large", a[a.SmallLeft = 1] = "SmallLeft", a[a.SmallRight = 2] = "SmallRight"
            }(a.ElementSize || (a.ElementSize = {}));
            a.ElementSize
        }(a.enums || (a.enums = {}));
        a.enums
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            angular.module("app.common.enums", []).constant("QuestionType", a.QuestionType)
        }(a.enums || (a.enums = {}));
        a.enums
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            !function (a) {
                a[a.QuestionPage = 1] = "QuestionPage", a[a.ExitPage = 2] = "ExitPage"
            }(a.PageType || (a.PageType = {}));
            a.PageType
        }(a.enums || (a.enums = {}));
        a.enums
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            !function (a) {
                a[a.ChooseOne = 1] = "ChooseOne", a[a.ChooseAny = 2] = "ChooseAny", a[a.TrueOrFalse = 3] = "TrueOrFalse", a[a.Textbox = 4] = "Textbox", a[a.Matrix = 6] = "Matrix", a[a.YesOrNo = 7] = "YesOrNo", a[a.MultipleTextbox = 8] = "MultipleTextbox", a[a.Ranking = 9] = "Ranking", a[a.FileUpload = 12] = "FileUpload"
            }(a.QuestionType || (a.QuestionType = {}));
            a.QuestionType
        }(a.enums || (a.enums = {}));
        a.enums
    }(a.common || (a.common = {}));
    a.common
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        !function (a) {
            a.newProjectConfig = {projectType: null, projectTitle: null, themeID: null}
        }(a.models || (a.models = {}));
        a.models
    }(a.newProject || (a.newProject = {}));
    a.newProject
}(shout || (shout = {}));
var shout;
!function (a) {
    !function (a) {
        var b = function () {
            function b(a) {
                this._$state = a
            }

            return b.prototype.register = function () {
                this._$state.go(a.registerStateConfig.name)
            }, b.$inject = ["$state"], b
        }();
        a.RegisterButtonCtrl = b
    }(a.register || (a.register = {}));
    a.register
}(shout || (shout = {}));