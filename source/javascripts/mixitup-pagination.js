! function(a) {
    "use strict";
    var b = function(a) {
        var c = a.h;
        if (!a.CORE_VERSION || !c.compareVersions(b.REQUIRE_CORE_VERSION, a.CORE_VERSION)) throw new Error("[MixItUp Pagination] MixItUp Pagination " + b.EXTENSION_VERSION + " requires at least MixItUp " + b.REQUIRE_CORE_VERSION);
        a.ConfigClassNames.registerAction("afterConstruct", "pagination", function() {
            this.elementPager = "control", this.elementPageList = "page-list", this.elementPageStats = "page-stats", this.modifierFirst = "first", this.modifierLast = "last", this.modifierPrev = "prev", this.modifierNext = "next", this.modifierTruncationMarker = "truncation-marker"
        }), a.ConfigLoad.registerAction("afterConstruct", "pagination", function() {
            this.page = 1
        }), a.ConfigPagination = function() {
            this.generatePageList = !0, this.generatePageStats = !0, this.maintainActivePage = !0, this.loop = !1, this.hidePageListIfSinglePage = !1, this.hidePageStatsIfSinglePage = !1, this.limit = -1, this.maxPagers = 5, c.seal(this)
        }, a.ConfigRender.registerAction("afterConstruct", "pagination", function() {
            this.pager = null, this.pageStats = null
        }), a.ConfigSelectors.registerAction("afterConstruct", "pagination", function() {
            this.pageList = ".mixitup-page-list", this.pageStats = ".mixitup-page-stats"
        }), a.ConfigTemplates.registerAction("afterConstruct", "pagination", function() {
            this.pager = '<button type="button" class="${classNames}" data-page="${pageNumber}">${pageNumber}</button>', this.pagerPrev = '<button type="button" class="${classNames}" data-page="prev">&laquo;</button>', this.pagerNext = '<button type="button" class="${classNames}" data-page="next">&raquo;</button>', this.pagerTruncationMarker = '<span class="${classNames}">&hellip;</span>', this.pageStats = "${startPageAt} to ${endPageAt} of ${totalTargets}", this.pageStatsSingle = "${startPageAt} of ${totalTargets}", this.pageStatsFail = "None found"
        }), a.Config.registerAction("beforeConstruct", "pagination", function() {
            this.pagination = new a.ConfigPagination
        }), a.ModelPager = function() {
            this.pageNumber = -1, this.classNames = "", this.classList = [], this.isDisabled = !1, this.isPrev = !1, this.isNext = !1, this.isPageLink = !1, this.isTruncationMarker = !1, c.seal(this)
        }, a.ModelPageStats = function() {
            this.startPageAt = -1, this.endPageAt = -1, this.totalTargets = -1, c.seal(this)
        }, a.UiClassNames.registerAction("afterConstruct", "pagination", function() {
            this.first = "", this.last = "", this.prev = "", this.next = "", this.first = "", this.last = "", this.truncated = "", this.truncationMarker = ""
        }), a.controlDefinitions.push(new a.ControlDefinition("pager", "[data-page]", !0, "pageList")), a.Control.registerFilter("commandsHandleClick", "pagination", function(a, b) {
            var d = this,
                e = {},
                f = "",
                g = -1,
                h = null,
                i = null,
                j = -1;
            if (!d.selector || "[data-page]" !== d.selector) return a;
            for (i = c.closestParent(b.target, d.selector, !0, d.bound[0].dom.document), j = 0; h = d.bound[j]; j++) e = a[j], !h.config.pagination || h.config.pagination.limit < 0 || h.config.pagination.limit === 1 / 0 ? a[j] = null : !i || c.hasClass(i, h.classNamesPager.active) || c.hasClass(i, h.classNamesPager.disabled) ? a[j] = null : (f = i.getAttribute("data-page"), "prev" === f ? e.paginate = "prev" : "next" === f ? e.paginate = "next" : g && (e.paginate = parseInt(f)), h.lastClicked && (h.lastClicked = i));
            return a
        }), a.CommandMultimix.registerAction("afterConstruct", "pagination", function() {
            this.paginate = null
        }), a.CommandPaginate = function() {
            this.page = -1, this.limit = -1, this.action = "", this.anchor = null, c.seal(this)
        }, a.Operation.registerAction("afterConstruct", "pagination", function() {
            this.startPagination = null, this.newPagination = null, this.startTotalPages = -1, this.newTotalPages = -1
        }), a.State.registerAction("afterConstruct", "pagination", function() {
            this.activePagination = null, this.totalPages = -1
        }), a.MixerDom.registerAction("afterConstruct", "pagination", function() {
            this.pageList = null, this.pageStats = null
        }), a.Mixer.registerAction("afterConstruct", "pagination", function() {
            this.classNamesPager = new a.UiClassNames, this.classNamesPageList = new a.UiClassNames, this.classNamesPageStats = new a.UiClassNames
        }), a.Mixer.registerAction("afterAttach", "pagination", function() {
            var a = this;
            a.config.pagination.limit < 0 || (a.classNamesPager.base = c.getClassname(a.config.classNames, "pager"), a.classNamesPager.active = c.getClassname(a.config.classNames, "pager", a.config.classNames.modifierActive), a.classNamesPager.disabled = c.getClassname(a.config.classNames, "pager", a.config.classNames.modifierDisabled), a.classNamesPager.first = c.getClassname(a.config.classNames, "pager", a.config.classNames.modifierFirst), a.classNamesPager.last = c.getClassname(a.config.classNames, "pager", a.config.classNames.modifierLast), a.classNamesPager.prev = c.getClassname(a.config.classNames, "pager", a.config.classNames.modifierPrev), a.classNamesPager.next = c.getClassname(a.config.classNames, "pager", a.config.classNames.modifierNext), a.classNamesPager.truncationMarker = c.getClassname(a.config.classNames, "pager", a.config.classNames.modifierTruncationMarker), a.classNamesPageList.base = c.getClassname(a.config.classNames, "page-list"), a.classNamesPageList.disabled = c.getClassname(a.config.classNames, "page-list", a.config.classNames.modifierDisabled), a.classNamesPageStats.base = c.getClassname(a.config.classNames, "page-stats"), a.classNamesPageStats.disabled = c.getClassname(a.config.classNames, "page-stats", a.config.classNames.modifierDisabled), a.config.pagination.generatePageList && a.dom.pageList && a.renderPageList(a.lastOperation), a.config.pagination.generatePageStats && a.dom.pageStats && a.renderPageStats(a.lastOperation))
        }), a.Mixer.registerFilter("operationGetInitialState", "pagination", function(a, b) {
            var c = this;
            return c.config.pagination.limit < 0 ? a : (a.newPagination = b.activePagination, a)
        }), a.Mixer.registerFilter("stateGetInitialState", "pagination", function(b) {
            var c = this;
            return c.config.pagination.limit < 0 ? b : (b.activePagination = new a.CommandPaginate, b.activePagination.page = c.config.load.page, b.activePagination.limit = c.config.pagination.limit, b)
        }), a.Mixer.registerAction("afterGetFinalMixData", "pagination", function() {
            var a = this;
            a.config.pagination.limit < 0 || "number" == typeof a.config.pagination.maxPagers && (a.config.pagination.maxPagers = Math.max(5, a.config.pagination.maxPagers))
        }), a.Mixer.registerAction("afterCacheDom", "pagination", function() {
            var b = this,
                c = null;
            if (!(b.config.pagination.limit < 0) && b.config.pagination.generatePageList) {
                switch (b.config.controls.scope) {
                    case "local":
                        c = b.dom.container;
                        break;
                    case "global":
                        c = b.dom.document;
                        break;
                    default:
                        throw new Error(a.messages.ERROR_CONFIG_INVALID_CONTROLS_SCOPE)
                }
                b.dom.pageList = c.querySelector(b.config.selectors.pageList), b.dom.pageStats = c.querySelector(b.config.selectors.pageStats)
            }
        }), a.Mixer.registerFilter("stateBuildState", "pagination", function(a, b) {
            var c = this;
            return c.config.pagination.limit < 0 ? a : (a.activePagination = b.newPagination, a.totalPages = b.newTotalPages, a)
        }), a.Mixer.registerFilter("instructionParseMultimixArgs", "pagination", function(b) {
            var c = this;
            return c.config.pagination.limit < 0 ? b : (!b.command.paginate || b.command.paginate instanceof a.CommandPaginate || (b.command.paginate = c.parsePaginateArgs([b.command.paginate]).command), b)
        }), a.Mixer.registerAction("afterFilterOperation", "pagination", function(a) {
            var b = this,
                c = -1,
                d = -1,
                e = [],
                f = [],
                g = null,
                h = -1,
                i = -1;
            if (!(b.config.pagination.limit < 0)) {
                if (a.newTotalPages = a.newPagination.limit ? Math.max(Math.ceil(a.matching.length / a.newPagination.limit), 1) : 1, b.config.pagination.maintainActivePage && (a.newPagination.page = a.newPagination.page > a.newTotalPages ? a.newTotalPages : a.newPagination.page), b.config.pagination.limit = a.newPagination.limit, a.newPagination.anchor) {
                    for (i = 0;
                        (g = a.matching[i]) && g.dom.el !== a.newPagination.anchor; i++);
                    c = i, d = i + a.newPagination.limit - 1
                } else c = a.newPagination.limit * (a.newPagination.page - 1), d = a.newPagination.limit * a.newPagination.page - 1, isNaN(c) && (c = 0);
                if (!(a.newPagination.limit < 0)) {
                    for (i = 0; g = a.show[i]; i++) i >= c && i <= d ? e.push(g) : f.push(g);
                    for (a.show = e, i = 0; g = a.toHide[i]; i++) g.isShown || (a.toHide.splice(i, 1), g.isShown = !1, i--);
                    for (i = 0; g = f[i]; i++) a.hide.push(g), (h = a.toShow.indexOf(g)) > -1 && a.toShow.splice(h, 1), g.isShown && a.toHide.push(g)
                }
            }
        }), a.Mixer.registerFilter("operationUnmappedGetOperation", "pagination", function(b, d) {
            var e = this;
            return e.config.pagination.limit < 0 ? b : (b.startState = e.state, b.startPagination = e.state.activePagination, b.startTotalPages = e.state.totalPages, b.newPagination = new a.CommandPaginate, b.newPagination.limit = b.startPagination.limit, b.newPagination.page = b.startPagination.page, d.paginate ? e.parsePaginateCommand(d.paginate, b) : (d.filter || d.sort) && (c.extend(b.newPagination, b.startPagination), e.config.pagination.maintainActivePage ? b.newPagination.page = e.state.activePagination.page : b.newPagination.page = 1), b)
        }), a.Mixer.registerFilter("operationMappedGetOperation", "pagination", function(a, b, c) {
            var d = this;
            return d.config.pagination.limit < 0 ? a : c ? a : (d.config.pagination.generatePageList && d.dom.pageList && d.renderPageList(a), d.config.pagination.generatePageStats && d.dom.pageStats && d.renderPageStats(a), a)
        }), a.Mixer.extend({
            parsePaginateCommand: function(b, c) {
                var d = this;
                if (b.page > -1) {
                    if (0 === b.page) throw new Error(a.messages.ERROR_PAGINATE_INDEX_RANGE);
                    c.newPagination.page = Math.max(1, Math.min(1 / 0, b.page))
                } else "next" === b.action ? c.newPagination.page = d.getNextPage() : "prev" === b.action ? c.newPagination.page = d.getPrevPage() : b.anchor && (c.newPagination.anchor = b.anchor);
                b.limit > -1 && (c.newPagination.limit = b.limit), c.newPagination.limit !== c.startPagination.limit && (c.newTotalPages = c.newPagination.limit ? Math.max(Math.ceil(c.startState.matching.length / c.newPagination.limit), 1) : 1), (c.newPagination.limit <= 0 || c.newPagination.limit === 1 / 0) && (c.newPagination.page = 1)
            },
            getNextPage: function() {
                var a = this,
                    b = -1;
                return b = a.state.activePagination.page + 1, b > a.state.totalPages && (b = a.config.pagination.loop ? 1 : a.state.activePagination.page), b
            },
            getPrevPage: function() {
                var a = this,
                    b = -1;
                return b = a.state.activePagination.page - 1, b < 1 && (b = a.config.pagination.loop ? a.state.totalPages : a.state.activePagination.page), b
            },
            renderPageList: function(b) {
                var d = this,
                    e = -1,
                    f = "",
                    g = [],
                    h = null,
                    i = null,
                    j = [],
                    k = !1,
                    l = !1,
                    m = null,
                    n = null,
                    o = "",
                    p = -1;
                if (b.newPagination.limit < 0 || b.newPagination.limit === 1 / 0 || b.newTotalPages < 2 && d.config.pagination.hidePageListIfSinglePage) return d.dom.pageList.innerHTML = "", void c.addClass(d.dom.pageList, d.classNamesPageList.disabled);
                for (e = b.newPagination.page - 1, i = "function" == typeof(i = d.config.render.pager) ? i : null, d.config.pagination.maxPagers < 1 / 0 && b.newTotalPages > d.config.pagination.maxPagers && (j = d.getAllowedIndices(b)), h = new a.ModelPager, h.isPrev = !0, h.classList.push(d.classNamesPager.base, d.classNamesPager.prev), 1 !== b.newPagination.page || d.config.pagination.loop || (h.classList.push(d.classNamesPager.disabled), h.isDisabled = !0), h.classNames = h.classList.join(" "), f = i ? i(h) : c.template(d.config.templates.pagerPrev)(h), g.push(f), p = 0; p < b.newTotalPages; p++) f = d.renderPager(p, b, j), f || p < e && k || p > e && l ? f && g.push(f) : (h = new a.ModelPager, h.isTruncationMarker = !0, h.classList.push(d.classNamesPager.base, d.classNamesPager.truncationMarker), h.classNames = h.classList.join(" "), f = i ? i(h) : c.template(d.config.templates.pagerTruncationMarker)(h), g.push(f), p < e && (k = !0), p > e && (l = !0));
                for (h = new a.ModelPager, h.isNext = !0, h.classList.push(d.classNamesPager.base, d.classNamesPager.next), b.newPagination.page !== b.newTotalPages || d.config.pagination.loop || h.classList.push(d.classNamesPager.disabled), h.classNames = h.classList.join(" "), f = i ? i(h) : c.template(d.config.templates.pagerNext)(h), g.push(f), o = g.join(" "), d.dom.pageList.innerHTML = o, m = d.dom.pageList.querySelectorAll("." + d.classNamesPager.disabled), p = 0; n = m[p]; p++) "boolean" == typeof n.disabled && (n.disabled = !0);
                k || l ? c.addClass(d.dom.pageList, d.classNamesPageList.truncated) : c.removeClass(d.dom.pageList, d.classNamesPageList.truncated), b.newTotalPages > 1 ? c.removeClass(d.dom.pageList, d.classNamesPageList.disabled) : c.addClass(d.dom.pageList, d.classNamesPageList.disabled)
            },
            getAllowedIndices: function(a) {
                var b = this,
                    c = a.newPagination.page - 1,
                    d = a.newTotalPages - 1,
                    e = [],
                    f = -1,
                    g = -1,
                    h = -1,
                    i = -1,
                    j = -1,
                    k = -1,
                    l = -1;
                for (e.push(0), f = b.config.pagination.maxPagers - 2, g = Math.ceil((f - 1) / 2), h = Math.floor((f - 1) / 2), i = c - g, j = c + h, k = 0, i < 1 && (k = 1 - i), j > d - 1 && (k = d - 1 - j), l = i + k; f;) e.push(l), l++, f--;
                return e.push(d), e
            },
            renderPager: function(b, d, e) {
                var f = this,
                    g = null,
                    h = d.newPagination.page - 1,
                    i = new a.ModelPager,
                    j = "";
                return f.config.pagination.maxPagers < 1 / 0 && e.length && e.indexOf(b) < 0 ? "" : (g = "function" == typeof(g = f.config.render.pager) ? g : null, i.isPageLink = !0, i.classList.push(f.classNamesPager.base), 0 === b && i.classList.push(f.classNamesPager.first), b === d.newTotalPages - 1 && i.classList.push(f.classNamesPager.last), b === h && i.classList.push(f.classNamesPager.active), i.classNames = i.classList.join(" "), i.pageNumber = b + 1, j = g ? g(i) : c.template(f.config.templates.pager)(i))
            },
            renderPageStats: function(b) {
                var d = this,
                    e = new a.ModelPageStats,
                    f = null,
                    g = "",
                    h = "";
                return b.newPagination.limit < 0 || b.newPagination.limit === 1 / 0 || b.newTotalPages < 2 && d.config.pagination.hidePageStatsIfSinglePage ? (d.dom.pageStats.innerHTML = "", void c.addClass(d.dom.pageStats, d.classNamesPageStats.disabled)) : (f = "function" == typeof(f = d.config.render.pageStats) ? f : null, e.totalTargets = b.matching.length, h = e.totalTargets ? 1 === b.newPagination.limit ? d.config.templates.pageStatsSingle : d.config.templates.pageStats : d.config.templates.pageStatsFail, e.totalTargets && b.newPagination.limit > 0 ? (e.startPageAt = (b.newPagination.page - 1) * b.newPagination.limit + 1, e.endPageAt = Math.min(e.startPageAt + b.newPagination.limit - 1, e.totalTargets)) : e.startPageAt = e.endPageAt = 0, g = f ? f(e) : c.template(h)(e), d.dom.pageStats.innerHTML = g, void(e.totalTargets ? c.removeClass(d.dom.pageStats, d.classNamesPageStats.disabled) : c.addClass(d.dom.pageStats, d.classNamesPageStats.disabled)))
            },
            parsePaginateArgs: function(b) {
                var d = this,
                    e = new a.UserInstruction,
                    f = null,
                    g = -1;
                for (e.animate = d.config.animation.enable, e.command = new a.CommandPaginate, g = 0; g < b.length; g++) f = b[g], null !== f && ("object" == typeof f && c.isElement(f, d.dom.document) ? e.command.anchor = f : f instanceof a.CommandPaginate || "object" == typeof f ? c.extend(e.command, f) : "number" == typeof f ? e.command.page = f : "string" != typeof f || isNaN(parseInt(f)) ? "string" == typeof f ? e.command.action = f : "boolean" == typeof f ? e.animate = f : "function" == typeof f && (e.callback = f) : e.command.page = parseInt(f));
                return c.freeze(e), e
            },
            paginate: function() {
                var a = this,
                    b = a.parsePaginateArgs(arguments);
                return a.multimix({
                    paginate: b.command
                }, b.animate, b.callback)
            },
            nextPage: function() {
                var a = this,
                    b = a.parsePaginateArgs(arguments);
                return a.multimix({
                    paginate: {
                        action: "next"
                    }
                }, b.animate, b.callback)
            },
            prevPage: function() {
                var a = this,
                    b = a.parsePaginateArgs(arguments);
                return a.multimix({
                    paginate: {
                        action: "prev"
                    }
                }, b.animate, b.callback)
            }
        }), a.Facade.registerAction("afterConstruct", "pagination", function(a) {
            this.paginate = a.paginate.bind(a), this.nextPage = a.nextPage.bind(a), this.prevPage = a.prevPage.bind(a)
        })
    };
    if (b.TYPE = "mixitup-extension", b.NAME = "mixitup-pagination", b.EXTENSION_VERSION = "3.1.0", b.REQUIRE_CORE_VERSION = "^3.1.2", "object" == typeof exports && "object" == typeof module) module.exports = b;
    else if ("function" == typeof define && define.amd) define(function() {
        return b
    });
    else {
        if (!a.mixitup || "function" != typeof a.mixitup) throw new Error("[MixItUp Pagination] MixItUp core not found");
        b(a.mixitup)
    }
}(window);
