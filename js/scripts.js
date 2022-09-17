(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  /**
   * HelloWorld
   * ======================================
   * - example js module
   */
  var MESSAGE = "Hello World! From HelloWorld.js";
  var HelloWorld = /*#__PURE__*/_createClass(function HelloWorld() {
    _classCallCheck(this, HelloWorld);

    _defineProperty(this, "loadHandler", function () {
      console.log(MESSAGE);
    });

    window.addEventListener("load", this.loadHandler, false);
  });
  new HelloWorld();

  /**
   * Animate
   * ======================================
   * - add class to element in viewport
   * - if you want disable animate delay on mobile use [animate-delay-desktop]
   * - set animation delay via [animate-delay] html attribute
   * - set visible threshold via [animate-threshold] html attribute
   */
  var ISMOBILE = window.matchMedia("only screen and (max-width: 768px)").matches;
  var THRESHOLD = ISMOBILE ? '0.4' : '0.6';
  var LOAD_THRESHOLD = '0.2';
  var ELEMENTS = '.animate';
  var VISIBLE_CLASS = 'animate--visible';

  var Animate = /*#__PURE__*/_createClass(function Animate() {
    var _this = this;

    _classCallCheck(this, Animate);

    _defineProperty(this, "observeCallback", function (entries) {
      entries.map(function (entry) {
        var section = entry.target;

        var delay = _this.getDelay(section);

        var sectionBodyClass = section.getAttribute('animate-body-class');

        if (entry.isIntersecting) {
          if (ISMOBILE && section.getAttribute('animate-delay-desktop')) {
            section.classList.add(VISIBLE_CLASS);

            _this.bodyClass(sectionBodyClass, 'add');
          } else {
            setTimeout(function () {
              section.classList.add(VISIBLE_CLASS);

              _this.bodyClass(sectionBodyClass, 'add');
            }, delay);
          }
        } else {
          _this.bodyClass(sectionBodyClass, 'remove');
        }
      });
    });

    _defineProperty(this, "getDelay", function (section) {
      var delay = section.getAttribute('animate-delay');

      if (!ISMOBILE && section.getAttribute('animate-delay-desktop')) {
        var delay = section.getAttribute('animate-delay-desktop');
      }

      if (delay === null) {
        return 0;
      } else if (delay.includes('.')) {
        return parseInt(delay * 1000);
      } else {
        return parseInt(delay);
      }
    });

    _defineProperty(this, "bodyClass", function (htmlclass, type) {
      if (!htmlclass) {
        return;
      }

      if (type == 'add') {
        document.body.classList.add(htmlclass);
      } else {
        document.body.classList.remove(htmlclass);
      }
    });

    this.sections = document.querySelectorAll(ELEMENTS);
    this.THRESHOLD = THRESHOLD;
    this.LOAD_THRESHOLD = LOAD_THRESHOLD;

    if ('IntersectionObserver' in window) {
      this.sections.forEach(function (el) {
        var BoundingClientRect = el.getBoundingClientRect();
        var visibleRatio = BoundingClientRect.height / window.innerHeight;

        if (visibleRatio > 0.95) {
          _this.THRESHOLD = window.innerHeight / BoundingClientRect.height / 100 * 30;
          _this.LOAD_THRESHOLD = window.innerHeight / BoundingClientRect.height / 100 * 20;
        } // observe on page load


        var loadObserver = new IntersectionObserver(_this.observeCallback, {
          threshold: _this.LOAD_THRESHOLD
        });
        loadObserver.observe(el);
        setTimeout(function () {
          loadObserver.disconnect();
        }, 100); // observe

        var observerThreshold = el.getAttribute('animate-threshold') ? el.getAttribute('animate-threshold') : _this.THRESHOLD;
        var observer = new IntersectionObserver(_this.observeCallback, {
          threshold: observerThreshold
        });
        observer.observe(el);
      });
    } else {
      this.sections.forEach(function (el) {
        el.classList.add(VISIBLE_CLASS);
      });
    }
  });

  new Animate();

  /*
    @ Add body class if:
    - scroll started
    - scrolled to bottom
  */
  var START_OFFSET = 10;
  var START_CLASS = "is-scrolled";
  var BOTTOM_OFFSET = 10;
  var BOTTOM_CLASS = "is-scrolled-bottom";

  var ScrollClass = /*#__PURE__*/_createClass(function ScrollClass() {
    var _this = this;

    _classCallCheck(this, ScrollClass);

    _defineProperty(this, "scrollHandler", function () {
      var top = document.documentElement.scrollTop;
      document.body.classList.toggle(START_CLASS, top >= START_OFFSET);
      document.body.classList.toggle(BOTTOM_CLASS, window.innerHeight + top >= document.body.offsetHeight - BOTTOM_OFFSET);

      _this.oldScroll = top;
    });

    document.addEventListener("scroll", this.scrollHandler, {
      passive: true
    });
  });

  new ScrollClass();

  /**
   * ToggleBodyClass
   * ======================================
   * - toggle class on body
   * - multiple classes supported - "CLASSNAME CLASSNAME2 ..."
   * - add class to html attr [data-toggle="CLASSNAME"]
   * - remove class when attr [data-remove="CLASSNAME"]
   */
  var ELEMENTS$1 = '.js-ToggleBodyClass';

  var ToggleBodyClass = /*#__PURE__*/_createClass(function ToggleBodyClass() {
    var _this = this;

    _classCallCheck(this, ToggleBodyClass);

    _defineProperty(this, "toggle", function (e) {
      var el = e.currentTarget;
      var classes = el.getAttribute('data-toggle');
      var classesRemove = el.getAttribute('data-remove');

      if (classesRemove) {
        classesRemove.split(" ").forEach(function (className) {
          document.body.classList.remove(className);
        });
      } else {
        classes.split(" ").forEach(function (className) {
          document.body.classList.toggle(className);
        });
      }
    });

    this.elements = document.querySelectorAll(ELEMENTS$1);

    if (!this.elements) {
      return false;
    }

    this.elements.forEach(function (el) {
      el.addEventListener('click', _this.toggle, false);
    });
  });

  new ToggleBodyClass();

  /**
   * Toggle Nav
   * ======================================
   * - toggle class on body
   */
  var ELEMENTS$2 = '.togglenav__button';
  var TOGGLE_CLASS = 'nav-is-open';

  var ToggleNav = /*#__PURE__*/function () {
    function ToggleNav() {
      var _this = this;

      _classCallCheck(this, ToggleNav);

      this.elements = document.querySelectorAll(ELEMENTS$2);

      if (!this.elements) {
        return false;
      }

      this.elements.forEach(function (el) {
        el.addEventListener('click', _this.toggleNav, false);
      });
    }

    _createClass(ToggleNav, [{
      key: "toggleNav",
      value: function toggleNav(e) {
        document.body.classList.toggle(TOGGLE_CLASS);
        document.body.classList.toggle('lock');
        e.preventDefault();
      }
    }]);

    return ToggleNav;
  }();

  new ToggleNav();

  function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  /*!
   * Splide.js
   * Version  : 4.0.17
   * License  : MIT
   * Copyright: 2022 Naotoshi Fujita
   */
  var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
  var CREATED = 1;
  var MOUNTED = 2;
  var IDLE = 3;
  var MOVING = 4;
  var SCROLLING = 5;
  var DRAGGING = 6;
  var DESTROYED = 7;
  var STATES = {
    CREATED: CREATED,
    MOUNTED: MOUNTED,
    IDLE: IDLE,
    MOVING: MOVING,
    SCROLLING: SCROLLING,
    DRAGGING: DRAGGING,
    DESTROYED: DESTROYED
  };

  function empty(array) {
    array.length = 0;
  }

  function slice(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }

  function apply(func) {
    return func.bind.apply(func, [null].concat(slice(arguments, 1)));
  }

  var nextTick = setTimeout;

  var noop = function noop() {};

  function raf(func) {
    return requestAnimationFrame(func);
  }

  function typeOf(type, subject) {
    return typeof subject === type;
  }

  function isObject(subject) {
    return !isNull(subject) && typeOf("object", subject);
  }

  var isArray = Array.isArray;
  var isFunction = apply(typeOf, "function");
  var isString = apply(typeOf, "string");
  var isUndefined = apply(typeOf, "undefined");

  function isNull(subject) {
    return subject === null;
  }

  function isHTMLElement(subject) {
    return subject instanceof HTMLElement;
  }

  function toArray(value) {
    return isArray(value) ? value : [value];
  }

  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }

  function includes(array, value) {
    return array.indexOf(value) > -1;
  }

  function push(array, items) {
    array.push.apply(array, toArray(items));
    return array;
  }

  function toggleClass(elm, classes, add) {
    if (elm) {
      forEach(classes, function (name) {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }

  function addClass(elm, classes) {
    toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
  }

  function append(parent, children) {
    forEach(children, parent.appendChild.bind(parent));
  }

  function before(nodes, ref) {
    forEach(nodes, function (node) {
      var parent = (ref || node).parentNode;

      if (parent) {
        parent.insertBefore(node, ref);
      }
    });
  }

  function matches(elm, selector) {
    return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
  }

  function children(parent, selector) {
    var children2 = parent ? slice(parent.children) : [];
    return selector ? children2.filter(function (child) {
      return matches(child, selector);
    }) : children2;
  }

  function child(parent, selector) {
    return selector ? children(parent, selector)[0] : parent.firstElementChild;
  }

  var ownKeys = Object.keys;

  function forOwn(object, iteratee, right) {
    if (object) {
      var keys = ownKeys(object);
      keys = right ? keys.reverse() : keys;

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== "__proto__") {
          if (iteratee(object[key], key) === false) {
            break;
          }
        }
      }
    }

    return object;
  }

  function assign(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  function merge(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        if (isArray(value)) {
          object[key] = value.slice();
        } else if (isObject(value)) {
          object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
        } else {
          object[key] = value;
        }
      });
    });
    return object;
  }

  function omit(object, keys) {
    toArray(keys || ownKeys(object)).forEach(function (key) {
      delete object[key];
    });
  }

  function removeAttribute(elms, attrs) {
    forEach(elms, function (elm) {
      forEach(attrs, function (attr) {
        elm && elm.removeAttribute(attr);
      });
    });
  }

  function setAttribute(elms, attrs, value) {
    if (isObject(attrs)) {
      forOwn(attrs, function (value2, name) {
        setAttribute(elms, name, value2);
      });
    } else {
      forEach(elms, function (elm) {
        isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
      });
    }
  }

  function create(tag, attrs, parent) {
    var elm = document.createElement(tag);

    if (attrs) {
      isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
    }

    parent && append(parent, elm);
    return elm;
  }

  function style(elm, prop, value) {
    if (isUndefined(value)) {
      return getComputedStyle(elm)[prop];
    }

    if (!isNull(value)) {
      elm.style[prop] = "" + value;
    }
  }

  function display(elm, display2) {
    style(elm, "display", display2);
  }

  function focus(elm) {
    elm["setActive"] && elm["setActive"]() || elm.focus({
      preventScroll: true
    });
  }

  function getAttribute(elm, attr) {
    return elm.getAttribute(attr);
  }

  function hasClass(elm, className) {
    return elm && elm.classList.contains(className);
  }

  function rect(target) {
    return target.getBoundingClientRect();
  }

  function remove(nodes) {
    forEach(nodes, function (node) {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
  }

  function parseHtml(html) {
    return child(new DOMParser().parseFromString(html, "text/html").body);
  }

  function prevent(e, stopPropagation) {
    e.preventDefault();

    if (stopPropagation) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }

  function query(parent, selector) {
    return parent && parent.querySelector(selector);
  }

  function queryAll(parent, selector) {
    return selector ? slice(parent.querySelectorAll(selector)) : [];
  }

  function removeClass(elm, classes) {
    toggleClass(elm, classes, false);
  }

  function timeOf(e) {
    return e.timeStamp;
  }

  function unit(value) {
    return isString(value) ? value : value ? value + "px" : "";
  }

  var PROJECT_CODE = "splide";
  var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;

  function assert(condition, message) {
    if (!condition) {
      throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
    }
  }

  var min = Math.min,
      max = Math.max,
      floor = Math.floor,
      ceil = Math.ceil,
      abs = Math.abs;

  function approximatelyEqual(x, y, epsilon) {
    return abs(x - y) < epsilon;
  }

  function between(number, minOrMax, maxOrMin, exclusive) {
    var minimum = min(minOrMax, maxOrMin);
    var maximum = max(minOrMax, maxOrMin);
    return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
  }

  function clamp(number, x, y) {
    var minimum = min(x, y);
    var maximum = max(x, y);
    return min(max(minimum, number), maximum);
  }

  function sign(x) {
    return +(x > 0) - +(x < 0);
  }

  function format(string, replacements) {
    forEach(replacements, function (replacement) {
      string = string.replace("%s", "" + replacement);
    });
    return string;
  }

  function pad(number) {
    return number < 10 ? "0" + number : "" + number;
  }

  var ids = {};

  function uniqueId(prefix) {
    return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
  }

  function EventBinder() {
    var listeners = [];

    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function (target, event, namespace) {
        var isEventTarget = ("addEventListener" in target);
        var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
        isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
        listeners.push([target, event, namespace, callback, remover]);
      });
    }

    function unbind(targets, events, callback) {
      forEachEvent(targets, events, function (target, event, namespace) {
        listeners = listeners.filter(function (listener) {
          if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
            listener[4]();
            return false;
          }

          return true;
        });
      });
    }

    function dispatch(target, type, detail) {
      var e;
      var bubbles = true;

      if (typeof CustomEvent === "function") {
        e = new CustomEvent(type, {
          bubbles: bubbles,
          detail: detail
        });
      } else {
        e = document.createEvent("CustomEvent");
        e.initCustomEvent(type, bubbles, false, detail);
      }

      target.dispatchEvent(e);
      return e;
    }

    function forEachEvent(targets, events, iteratee) {
      forEach(targets, function (target) {
        target && forEach(events, function (events2) {
          events2.split(" ").forEach(function (eventNS) {
            var fragment = eventNS.split(".");
            iteratee(target, fragment[0], fragment[1]);
          });
        });
      });
    }

    function destroy() {
      listeners.forEach(function (data) {
        data[4]();
      });
      empty(listeners);
    }

    return {
      bind: bind,
      unbind: unbind,
      dispatch: dispatch,
      destroy: destroy
    };
  }

  var EVENT_MOUNTED = "mounted";
  var EVENT_READY = "ready";
  var EVENT_MOVE = "move";
  var EVENT_MOVED = "moved";
  var EVENT_SHIFTED = "shifted";
  var EVENT_CLICK = "click";
  var EVENT_ACTIVE = "active";
  var EVENT_INACTIVE = "inactive";
  var EVENT_VISIBLE = "visible";
  var EVENT_HIDDEN = "hidden";
  var EVENT_SLIDE_KEYDOWN = "slide:keydown";
  var EVENT_REFRESH = "refresh";
  var EVENT_UPDATED = "updated";
  var EVENT_RESIZE = "resize";
  var EVENT_RESIZED = "resized";
  var EVENT_DRAG = "drag";
  var EVENT_DRAGGING = "dragging";
  var EVENT_DRAGGED = "dragged";
  var EVENT_SCROLL = "scroll";
  var EVENT_SCROLLED = "scrolled";
  var EVENT_DESTROY = "destroy";
  var EVENT_ARROWS_MOUNTED = "arrows:mounted";
  var EVENT_ARROWS_UPDATED = "arrows:updated";
  var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
  var EVENT_PAGINATION_UPDATED = "pagination:updated";
  var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
  var EVENT_AUTOPLAY_PLAY = "autoplay:play";
  var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
  var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
  var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";

  function EventInterface(Splide2) {
    var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
    var binder = EventBinder();

    function on(events, callback) {
      binder.bind(bus, toArray(events).join(" "), function (e) {
        callback.apply(callback, isArray(e.detail) ? e.detail : []);
      });
    }

    function emit(event) {
      binder.dispatch(bus, event, slice(arguments, 1));
    }

    if (Splide2) {
      Splide2.event.on(EVENT_DESTROY, binder.destroy);
    }

    return assign(binder, {
      bus: bus,
      on: on,
      off: apply(binder.unbind, bus),
      emit: emit
    });
  }

  function RequestInterval(interval, onInterval, onUpdate, limit) {
    var now = Date.now;
    var startTime;
    var rate = 0;
    var id;
    var paused = true;
    var count = 0;

    function update() {
      if (!paused) {
        rate = interval ? min((now() - startTime) / interval, 1) : 1;
        onUpdate && onUpdate(rate);

        if (rate >= 1) {
          onInterval();
          startTime = now();

          if (limit && ++count >= limit) {
            return pause();
          }
        }

        raf(update);
      }
    }

    function start(resume) {
      !resume && cancel();
      startTime = now() - (resume ? rate * interval : 0);
      paused = false;
      raf(update);
    }

    function pause() {
      paused = true;
    }

    function rewind() {
      startTime = now();
      rate = 0;

      if (onUpdate) {
        onUpdate(rate);
      }
    }

    function cancel() {
      id && cancelAnimationFrame(id);
      rate = 0;
      id = 0;
      paused = true;
    }

    function set(time) {
      interval = time;
    }

    function isPaused() {
      return paused;
    }

    return {
      start: start,
      rewind: rewind,
      pause: pause,
      cancel: cancel,
      set: set,
      isPaused: isPaused
    };
  }

  function State(initialState) {
    var state = initialState;

    function set(value) {
      state = value;
    }

    function is(states) {
      return includes(toArray(states), state);
    }

    return {
      set: set,
      is: is
    };
  }

  function Throttle(func, duration) {
    var interval;

    function throttled() {
      if (!interval) {
        interval = RequestInterval(duration || 0, function () {
          func();
          interval = null;
        }, null, 1);
        interval.start();
      }
    }

    return throttled;
  }

  function Media(Splide2, Components2, options) {
    var state = Splide2.state;
    var breakpoints = options.breakpoints || {};
    var reducedMotion = options.reducedMotion || {};
    var binder = EventBinder();
    var queries = [];

    function setup() {
      var isMin = options.mediaQuery === "min";
      ownKeys(breakpoints).sort(function (n, m) {
        return isMin ? +n - +m : +m - +n;
      }).forEach(function (key) {
        register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
      });
      register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
      update();
    }

    function destroy(completely) {
      if (completely) {
        binder.destroy();
      }
    }

    function register(options2, query) {
      var queryList = matchMedia(query);
      binder.bind(queryList, "change", update);
      queries.push([options2, queryList]);
    }

    function update() {
      var destroyed = state.is(DESTROYED);
      var direction = options.direction;
      var merged = queries.reduce(function (merged2, entry) {
        return merge(merged2, entry[1].matches ? entry[0] : {});
      }, {});
      omit(options);
      set(merged);

      if (options.destroy) {
        Splide2.destroy(options.destroy === "completely");
      } else if (destroyed) {
        destroy(true);
        Splide2.mount();
      } else {
        direction !== options.direction && Splide2.refresh();
      }
    }

    function reduce(enable) {
      if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
        enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
      }
    }

    function set(opts, user) {
      merge(options, opts);
      user && merge(Object.getPrototypeOf(options), opts);

      if (!state.is(CREATED)) {
        Splide2.emit(EVENT_UPDATED, options);
      }
    }

    return {
      setup: setup,
      destroy: destroy,
      reduce: reduce,
      set: set
    };
  }

  var ARROW = "Arrow";
  var ARROW_LEFT = ARROW + "Left";
  var ARROW_RIGHT = ARROW + "Right";
  var ARROW_UP = ARROW + "Up";
  var ARROW_DOWN = ARROW + "Down";
  var RTL = "rtl";
  var TTB = "ttb";
  var ORIENTATION_MAP = {
    width: ["height"],
    left: ["top", "right"],
    right: ["bottom", "left"],
    x: ["y"],
    X: ["Y"],
    Y: ["X"],
    ArrowLeft: [ARROW_UP, ARROW_RIGHT],
    ArrowRight: [ARROW_DOWN, ARROW_LEFT]
  };

  function Direction(Splide2, Components2, options) {
    function resolve(prop, axisOnly, direction) {
      direction = direction || options.direction;
      var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
      return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function (match, offset) {
        var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
        return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
      });
    }

    function orient(value) {
      return value * (options.direction === RTL ? 1 : -1);
    }

    return {
      resolve: resolve,
      orient: orient
    };
  }

  var ROLE = "role";
  var TAB_INDEX = "tabindex";
  var DISABLED = "disabled";
  var ARIA_PREFIX = "aria-";
  var ARIA_CONTROLS = ARIA_PREFIX + "controls";
  var ARIA_CURRENT = ARIA_PREFIX + "current";
  var ARIA_SELECTED = ARIA_PREFIX + "selected";
  var ARIA_LABEL = ARIA_PREFIX + "label";
  var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
  var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
  var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
  var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
  var ARIA_LIVE = ARIA_PREFIX + "live";
  var ARIA_BUSY = ARIA_PREFIX + "busy";
  var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
  var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
  var CLASS_ROOT = PROJECT_CODE;
  var CLASS_TRACK = PROJECT_CODE + "__track";
  var CLASS_LIST = PROJECT_CODE + "__list";
  var CLASS_SLIDE = PROJECT_CODE + "__slide";
  var CLASS_CLONE = CLASS_SLIDE + "--clone";
  var CLASS_CONTAINER = CLASS_SLIDE + "__container";
  var CLASS_ARROWS = PROJECT_CODE + "__arrows";
  var CLASS_ARROW = PROJECT_CODE + "__arrow";
  var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
  var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
  var CLASS_PAGINATION = PROJECT_CODE + "__pagination";
  var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
  var CLASS_PROGRESS = PROJECT_CODE + "__progress";
  var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
  var CLASS_TOGGLE = PROJECT_CODE + "__toggle";
  var CLASS_SPINNER = PROJECT_CODE + "__spinner";
  var CLASS_SR = PROJECT_CODE + "__sr";
  var CLASS_INITIALIZED = "is-initialized";
  var CLASS_ACTIVE = "is-active";
  var CLASS_PREV = "is-prev";
  var CLASS_NEXT = "is-next";
  var CLASS_VISIBLE = "is-visible";
  var CLASS_LOADING = "is-loading";
  var CLASS_FOCUS_IN = "is-focus-in";
  var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN];
  var CLASSES = {
    slide: CLASS_SLIDE,
    clone: CLASS_CLONE,
    arrows: CLASS_ARROWS,
    arrow: CLASS_ARROW,
    prev: CLASS_ARROW_PREV,
    next: CLASS_ARROW_NEXT,
    pagination: CLASS_PAGINATION,
    page: CLASS_PAGINATION_PAGE,
    spinner: CLASS_SPINNER
  };

  function closest(from, selector) {
    if (isFunction(from.closest)) {
      return from.closest(selector);
    }

    var elm = from;

    while (elm && elm.nodeType === 1) {
      if (matches(elm, selector)) {
        break;
      }

      elm = elm.parentElement;
    }

    return elm;
  }

  var FRICTION = 5;
  var LOG_INTERVAL = 200;
  var POINTER_DOWN_EVENTS = "touchstart mousedown";
  var POINTER_MOVE_EVENTS = "touchmove mousemove";
  var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";

  function Elements(Splide2, Components2, options) {
    var _EventInterface = EventInterface(Splide2),
        on = _EventInterface.on,
        bind = _EventInterface.bind;

    var root = Splide2.root;
    var i18n = options.i18n;
    var elements = {};
    var slides = [];
    var rootClasses = [];
    var trackClasses = [];
    var track;
    var list;
    var isUsingKey;

    function setup() {
      collect();
      init();
      update();
    }

    function mount() {
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, setup);
      on(EVENT_UPDATED, update);
      bind(document, POINTER_DOWN_EVENTS + " keydown", function (e) {
        isUsingKey = e.type === "keydown";
      }, {
        capture: true
      });
      bind(root, "focusin", function () {
        toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
      });
    }

    function destroy(completely) {
      var attrs = ALL_ATTRIBUTES.concat("style");
      empty(slides);
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      removeAttribute([track, list], attrs);
      removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
    }

    function update() {
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      rootClasses = getClasses(CLASS_ROOT);
      trackClasses = getClasses(CLASS_TRACK);
      addClass(root, rootClasses);
      addClass(track, trackClasses);
      setAttribute(root, ARIA_LABEL, options.label);
      setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
    }

    function collect() {
      track = find("." + CLASS_TRACK);
      list = child(track, "." + CLASS_LIST);
      assert(track && list, "A track/list element is missing.");
      push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
      forOwn({
        arrows: CLASS_ARROWS,
        pagination: CLASS_PAGINATION,
        prev: CLASS_ARROW_PREV,
        next: CLASS_ARROW_NEXT,
        bar: CLASS_PROGRESS_BAR,
        toggle: CLASS_TOGGLE
      }, function (className, key) {
        elements[key] = find("." + className);
      });
      assign(elements, {
        root: root,
        track: track,
        list: list,
        slides: slides
      });
    }

    function init() {
      var id = root.id || uniqueId(PROJECT_CODE);
      var role = options.role;
      root.id = id;
      track.id = track.id || id + "-track";
      list.id = list.id || id + "-list";

      if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
        setAttribute(root, ROLE, role);
      }

      setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
      setAttribute(list, ROLE, "presentation");
    }

    function find(selector) {
      var elm = query(root, selector);
      return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
    }

    function getClasses(base) {
      return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE];
    }

    return assign(elements, {
      setup: setup,
      mount: mount,
      destroy: destroy
    });
  }

  var SLIDE = "slide";
  var LOOP = "loop";
  var FADE = "fade";

  function Slide$1(Splide2, index, slideIndex, slide) {
    var event = EventInterface(Splide2);
    var on = event.on,
        emit = event.emit,
        bind = event.bind;
    var Components = Splide2.Components,
        root = Splide2.root,
        options = Splide2.options;
    var isNavigation = options.isNavigation,
        updateOnMove = options.updateOnMove,
        i18n = options.i18n,
        pagination = options.pagination,
        slideFocus = options.slideFocus;
    var resolve = Components.Direction.resolve;
    var styles = getAttribute(slide, "style");
    var label = getAttribute(slide, ARIA_LABEL);
    var isClone = slideIndex > -1;
    var container = child(slide, "." + CLASS_CONTAINER);
    var destroyed;

    function mount() {
      if (!isClone) {
        slide.id = root.id + "-slide" + pad(index + 1);
        setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
        setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
        setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
      }

      listen();
    }

    function listen() {
      bind(slide, "click", apply(emit, EVENT_CLICK, self));
      bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
      on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
      on(EVENT_NAVIGATION_MOUNTED, initNavigation);

      if (updateOnMove) {
        on(EVENT_MOVE, onMove);
      }
    }

    function destroy() {
      destroyed = true;
      event.destroy();
      removeClass(slide, STATUS_CLASSES);
      removeAttribute(slide, ALL_ATTRIBUTES);
      setAttribute(slide, "style", styles);
      setAttribute(slide, ARIA_LABEL, label || "");
    }

    function initNavigation() {
      var controls = Splide2.splides.map(function (target) {
        var Slide2 = target.splide.Components.Slides.getAt(index);
        return Slide2 ? Slide2.slide.id : "";
      }).join(" ");
      setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
      setAttribute(slide, ARIA_CONTROLS, controls);
      setAttribute(slide, ROLE, slideFocus ? "button" : "");
      slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
    }

    function onMove() {
      if (!destroyed) {
        update();
      }
    }

    function update() {
      if (!destroyed) {
        var curr = Splide2.index;
        updateActivity();
        updateVisibility();
        toggleClass(slide, CLASS_PREV, index === curr - 1);
        toggleClass(slide, CLASS_NEXT, index === curr + 1);
      }
    }

    function updateActivity() {
      var active = isActive();

      if (active !== hasClass(slide, CLASS_ACTIVE)) {
        toggleClass(slide, CLASS_ACTIVE, active);
        setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
        emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
      }
    }

    function updateVisibility() {
      var visible = isVisible();
      var hidden = !visible && (!isActive() || isClone);

      if (!Splide2.state.is([MOVING, SCROLLING])) {
        setAttribute(slide, ARIA_HIDDEN, hidden || "");
      }

      setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");

      if (slideFocus) {
        setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
      }

      if (visible !== hasClass(slide, CLASS_VISIBLE)) {
        toggleClass(slide, CLASS_VISIBLE, visible);
        emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
      }

      if (!visible && document.activeElement === slide) {
        var Slide2 = Components.Slides.getAt(Splide2.index);
        Slide2 && focus(Slide2.slide);
      }
    }

    function style$1(prop, value, useContainer) {
      style(useContainer && container || slide, prop, value);
    }

    function isActive() {
      var curr = Splide2.index;
      return curr === index || options.cloneStatus && curr === slideIndex;
    }

    function isVisible() {
      if (Splide2.is(FADE)) {
        return isActive();
      }

      var trackRect = rect(Components.Elements.track);
      var slideRect = rect(slide);
      var left = resolve("left", true);
      var right = resolve("right", true);
      return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
    }

    function isWithin(from, distance) {
      var diff = abs(from - index);

      if (!isClone && (options.rewind || Splide2.is(LOOP))) {
        diff = min(diff, Splide2.length - diff);
      }

      return diff <= distance;
    }

    var self = {
      index: index,
      slideIndex: slideIndex,
      slide: slide,
      container: container,
      isClone: isClone,
      mount: mount,
      destroy: destroy,
      update: update,
      style: style$1,
      isWithin: isWithin
    };
    return self;
  }

  function Slides(Splide2, Components2, options) {
    var _EventInterface2 = EventInterface(Splide2),
        on = _EventInterface2.on,
        emit = _EventInterface2.emit,
        bind = _EventInterface2.bind;

    var _Components2$Elements = Components2.Elements,
        slides = _Components2$Elements.slides,
        list = _Components2$Elements.list;
    var Slides2 = [];

    function mount() {
      init();
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, init);
    }

    function init() {
      slides.forEach(function (slide, index) {
        register(slide, index, -1);
      });
    }

    function destroy() {
      forEach$1(function (Slide2) {
        Slide2.destroy();
      });
      empty(Slides2);
    }

    function update() {
      forEach$1(function (Slide2) {
        Slide2.update();
      });
    }

    function register(slide, index, slideIndex) {
      var object = Slide$1(Splide2, index, slideIndex, slide);
      object.mount();
      Slides2.push(object);
      Slides2.sort(function (Slide1, Slide2) {
        return Slide1.index - Slide2.index;
      });
    }

    function get(excludeClones) {
      return excludeClones ? filter(function (Slide2) {
        return !Slide2.isClone;
      }) : Slides2;
    }

    function getIn(page) {
      var Controller = Components2.Controller;
      var index = Controller.toIndex(page);
      var max = Controller.hasFocus() ? 1 : options.perPage;
      return filter(function (Slide2) {
        return between(Slide2.index, index, index + max - 1);
      });
    }

    function getAt(index) {
      return filter(index)[0];
    }

    function add(items, index) {
      forEach(items, function (slide) {
        if (isString(slide)) {
          slide = parseHtml(slide);
        }

        if (isHTMLElement(slide)) {
          var ref = slides[index];
          ref ? before(slide, ref) : append(list, slide);
          addClass(slide, options.classes.slide);
          observeImages(slide, apply(emit, EVENT_RESIZE));
        }
      });
      emit(EVENT_REFRESH);
    }

    function remove$1(matcher) {
      remove(filter(matcher).map(function (Slide2) {
        return Slide2.slide;
      }));
      emit(EVENT_REFRESH);
    }

    function forEach$1(iteratee, excludeClones) {
      get(excludeClones).forEach(iteratee);
    }

    function filter(matcher) {
      return Slides2.filter(isFunction(matcher) ? matcher : function (Slide2) {
        return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
      });
    }

    function style(prop, value, useContainer) {
      forEach$1(function (Slide2) {
        Slide2.style(prop, value, useContainer);
      });
    }

    function observeImages(elm, callback) {
      var images = queryAll(elm, "img");
      var length = images.length;

      if (length) {
        images.forEach(function (img) {
          bind(img, "load error", function () {
            if (! --length) {
              callback();
            }
          });
        });
      } else {
        callback();
      }
    }

    function getLength(excludeClones) {
      return excludeClones ? slides.length : Slides2.length;
    }

    function isEnough() {
      return Slides2.length > options.perPage;
    }

    return {
      mount: mount,
      destroy: destroy,
      update: update,
      register: register,
      get: get,
      getIn: getIn,
      getAt: getAt,
      add: add,
      remove: remove$1,
      forEach: forEach$1,
      filter: filter,
      style: style,
      getLength: getLength,
      isEnough: isEnough
    };
  }

  function Layout(Splide2, Components2, options) {
    var _EventInterface3 = EventInterface(Splide2),
        on = _EventInterface3.on,
        bind = _EventInterface3.bind,
        emit = _EventInterface3.emit;

    var Slides = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var _Components2$Elements2 = Components2.Elements,
        root = _Components2$Elements2.root,
        track = _Components2$Elements2.track,
        list = _Components2$Elements2.list;
    var getAt = Slides.getAt,
        styleSlides = Slides.style;
    var vertical;
    var rootRect;

    function mount() {
      init();
      bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
      on([EVENT_UPDATED, EVENT_REFRESH], init);
      on(EVENT_RESIZE, resize);
    }

    function init() {
      rootRect = null;
      vertical = options.direction === TTB;
      style(root, "maxWidth", unit(options.width));
      style(track, resolve("paddingLeft"), cssPadding(false));
      style(track, resolve("paddingRight"), cssPadding(true));
      resize();
    }

    function resize() {
      var newRect = rect(root);

      if (!rootRect || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
        style(track, "height", cssTrackHeight());
        styleSlides(resolve("marginRight"), unit(options.gap));
        styleSlides("width", cssSlideWidth());
        styleSlides("height", cssSlideHeight(), true);
        rootRect = newRect;
        emit(EVENT_RESIZED);
      }
    }

    function cssPadding(right) {
      var padding = options.padding;
      var prop = resolve(right ? "right" : "left");
      return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
    }

    function cssTrackHeight() {
      var height = "";

      if (vertical) {
        height = cssHeight();
        assert(height, "height or heightRatio is missing.");
        height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
      }

      return height;
    }

    function cssHeight() {
      return unit(options.height || rect(list).width * options.heightRatio);
    }

    function cssSlideWidth() {
      return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
    }

    function cssSlideHeight() {
      return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
    }

    function cssSlideSize() {
      var gap = unit(options.gap);
      return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
    }

    function listSize() {
      return rect(list)[resolve("width")];
    }

    function slideSize(index, withoutGap) {
      var Slide = getAt(index || 0);
      return Slide ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
    }

    function totalSize(index, withoutGap) {
      var Slide = getAt(index);

      if (Slide) {
        var right = rect(Slide.slide)[resolve("right")];
        var left = rect(list)[resolve("left")];
        return abs(right - left) + (withoutGap ? 0 : getGap());
      }

      return 0;
    }

    function sliderSize() {
      return totalSize(Splide2.length - 1, true) - totalSize(-1, true);
    }

    function getGap() {
      var Slide = getAt(0);
      return Slide && parseFloat(style(Slide.slide, resolve("marginRight"))) || 0;
    }

    function getPadding(right) {
      return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
    }

    return {
      mount: mount,
      listSize: listSize,
      slideSize: slideSize,
      sliderSize: sliderSize,
      totalSize: totalSize,
      getPadding: getPadding
    };
  }

  var MULTIPLIER = 2;

  function Clones(Splide2, Components2, options) {
    var _EventInterface4 = EventInterface(Splide2),
        on = _EventInterface4.on,
        emit = _EventInterface4.emit;

    var Elements = Components2.Elements,
        Slides = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var clones = [];
    var cloneCount;

    function mount() {
      init();
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, init);
      on([EVENT_UPDATED, EVENT_RESIZE], observe);
    }

    function init() {
      if (cloneCount = computeCloneCount()) {
        generate(cloneCount);
        emit(EVENT_RESIZE);
      }
    }

    function destroy() {
      remove(clones);
      empty(clones);
    }

    function observe() {
      if (cloneCount < computeCloneCount()) {
        emit(EVENT_REFRESH);
      }
    }

    function generate(count) {
      var slides = Slides.get().slice();
      var length = slides.length;

      if (length) {
        while (slides.length < count) {
          push(slides, slides);
        }

        push(slides.slice(-count), slides.slice(0, count)).forEach(function (Slide, index) {
          var isHead = index < count;
          var clone = cloneDeep(Slide.slide, index);
          isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
          push(clones, clone);
          Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
        });
      }
    }

    function cloneDeep(elm, index) {
      var clone = elm.cloneNode(true);
      addClass(clone, options.classes.clone);
      clone.id = Splide2.root.id + "-clone" + pad(index + 1);
      return clone;
    }

    function computeCloneCount() {
      var clones2 = options.clones;

      if (!Splide2.is(LOOP)) {
        clones2 = 0;
      } else if (!clones2) {
        var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
        var fixedCount = fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
        clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
      }

      return clones2;
    }

    return {
      mount: mount,
      destroy: destroy
    };
  }

  function Move(Splide2, Components2, options) {
    var _EventInterface5 = EventInterface(Splide2),
        on = _EventInterface5.on,
        emit = _EventInterface5.emit;

    var set = Splide2.state.set;
    var _Components2$Layout = Components2.Layout,
        slideSize = _Components2$Layout.slideSize,
        getPadding = _Components2$Layout.getPadding,
        totalSize = _Components2$Layout.totalSize,
        listSize = _Components2$Layout.listSize,
        sliderSize = _Components2$Layout.sliderSize;
    var _Components2$Directio = Components2.Direction,
        resolve = _Components2$Directio.resolve,
        orient = _Components2$Directio.orient;
    var _Components2$Elements3 = Components2.Elements,
        list = _Components2$Elements3.list,
        track = _Components2$Elements3.track;
    var Transition;

    function mount() {
      Transition = Components2.Transition;
      on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
    }

    function reposition() {
      if (!Components2.Controller.isBusy()) {
        Components2.Scroll.cancel();
        jump(Splide2.index);
        Components2.Slides.update();
      }
    }

    function move(dest, index, prev, callback) {
      if (dest !== index && canShift(dest > prev)) {
        cancel();
        translate(shift(getPosition(), dest > prev), true);
      }

      set(MOVING);
      emit(EVENT_MOVE, index, prev, dest);
      Transition.start(index, function () {
        set(IDLE);
        emit(EVENT_MOVED, index, prev, dest);
        callback && callback();
      });
    }

    function jump(index) {
      translate(toPosition(index, true));
    }

    function translate(position, preventLoop) {
      if (!Splide2.is(FADE)) {
        var destination = preventLoop ? position : loop(position);
        style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
        position !== destination && emit(EVENT_SHIFTED);
      }
    }

    function loop(position) {
      if (Splide2.is(LOOP)) {
        var index = toIndex(position);
        var exceededMax = index > Components2.Controller.getEnd();
        var exceededMin = index < 0;

        if (exceededMin || exceededMax) {
          position = shift(position, exceededMax);
        }
      }

      return position;
    }

    function shift(position, backwards) {
      var excess = position - getLimit(backwards);
      var size = sliderSize();
      position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
      return position;
    }

    function cancel() {
      translate(getPosition());
      Transition.cancel();
    }

    function toIndex(position) {
      var Slides = Components2.Slides.get();
      var index = 0;
      var minDistance = Infinity;

      for (var i = 0; i < Slides.length; i++) {
        var slideIndex = Slides[i].index;
        var distance = abs(toPosition(slideIndex, true) - position);

        if (distance <= minDistance) {
          minDistance = distance;
          index = slideIndex;
        } else {
          break;
        }
      }

      return index;
    }

    function toPosition(index, trimming) {
      var position = orient(totalSize(index - 1) - offset(index));
      return trimming ? trim(position) : position;
    }

    function getPosition() {
      var left = resolve("left");
      return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
    }

    function trim(position) {
      if (options.trimSpace && Splide2.is(SLIDE)) {
        position = clamp(position, 0, orient(sliderSize() - listSize()));
      }

      return position;
    }

    function offset(index) {
      var focus = options.focus;
      return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
    }

    function getLimit(max) {
      return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
    }

    function canShift(backwards) {
      var shifted = orient(shift(getPosition(), backwards));
      return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
    }

    function exceededLimit(max, position) {
      position = isUndefined(position) ? getPosition() : position;
      var exceededMin = max !== true && orient(position) < orient(getLimit(false));
      var exceededMax = max !== false && orient(position) > orient(getLimit(true));
      return exceededMin || exceededMax;
    }

    return {
      mount: mount,
      move: move,
      jump: jump,
      translate: translate,
      shift: shift,
      cancel: cancel,
      toIndex: toIndex,
      toPosition: toPosition,
      getPosition: getPosition,
      getLimit: getLimit,
      exceededLimit: exceededLimit,
      reposition: reposition
    };
  }

  function Controller(Splide2, Components2, options) {
    var _EventInterface6 = EventInterface(Splide2),
        on = _EventInterface6.on;

    var Move = Components2.Move;
    var getPosition = Move.getPosition,
        getLimit = Move.getLimit,
        toPosition = Move.toPosition;
    var _Components2$Slides = Components2.Slides,
        isEnough = _Components2$Slides.isEnough,
        getLength = _Components2$Slides.getLength;
    var isLoop = Splide2.is(LOOP);
    var isSlide = Splide2.is(SLIDE);
    var getNext = apply(getAdjacent, false);
    var getPrev = apply(getAdjacent, true);
    var currIndex = options.start || 0;
    var prevIndex = currIndex;
    var slideCount;
    var perMove;
    var perPage;

    function mount() {
      init();
      on([EVENT_UPDATED, EVENT_REFRESH], init);
    }

    function init() {
      slideCount = getLength(true);
      perMove = options.perMove;
      perPage = options.perPage;
      var index = clamp(currIndex, 0, slideCount - 1);

      if (index !== currIndex) {
        currIndex = index;
        Move.reposition();
      }
    }

    function go(control, allowSameIndex, callback) {
      if (!isBusy()) {
        var dest = parse(control);
        var index = loop(dest);

        if (index > -1 && (allowSameIndex || index !== currIndex)) {
          setIndex(index);
          Move.move(dest, index, prevIndex, callback);
        }
      }
    }

    function scroll(destination, duration, snap, callback) {
      Components2.Scroll.scroll(destination, duration, snap, function () {
        setIndex(loop(Move.toIndex(getPosition())));
        callback && callback();
      });
    }

    function parse(control) {
      var index = currIndex;

      if (isString(control)) {
        var _ref = control.match(/([+\-<>])(\d+)?/) || [],
            indicator = _ref[1],
            number = _ref[2];

        if (indicator === "+" || indicator === "-") {
          index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
        } else if (indicator === ">") {
          index = number ? toIndex(+number) : getNext(true);
        } else if (indicator === "<") {
          index = getPrev(true);
        }
      } else {
        index = isLoop ? control : clamp(control, 0, getEnd());
      }

      return index;
    }

    function getAdjacent(prev, destination) {
      var number = perMove || (hasFocus() ? 1 : perPage);
      var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));

      if (dest === -1 && isSlide) {
        if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
          return prev ? 0 : getEnd();
        }
      }

      return destination ? dest : loop(dest);
    }

    function computeDestIndex(dest, from, snapPage) {
      if (isEnough() || hasFocus()) {
        var end = getEnd();
        var index = computeMovableDestIndex(dest);

        if (index !== dest) {
          from = dest;
          dest = index;
          snapPage = false;
        }

        if (dest < 0 || dest > end) {
          if (!perMove && (between(0, dest, from, true) || between(end, from, dest, true))) {
            dest = toIndex(toPage(dest));
          } else {
            if (isLoop) {
              dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
            } else if (options.rewind) {
              dest = dest < 0 ? end : 0;
            } else {
              dest = -1;
            }
          }
        } else {
          if (snapPage && dest !== from) {
            dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
          }
        }
      } else {
        dest = -1;
      }

      return dest;
    }

    function computeMovableDestIndex(dest) {
      if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
        var position = getPosition();

        while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
          dest < currIndex ? --dest : ++dest;
        }
      }

      return dest;
    }

    function loop(index) {
      return isLoop ? (index + slideCount) % slideCount || 0 : index;
    }

    function getEnd() {
      return max(slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage), 0);
    }

    function toIndex(page) {
      return clamp(hasFocus() ? page : perPage * page, 0, getEnd());
    }

    function toPage(index) {
      return hasFocus() ? index : floor((index >= getEnd() ? slideCount - 1 : index) / perPage);
    }

    function toDest(destination) {
      var closest = Move.toIndex(destination);
      return isSlide ? clamp(closest, 0, getEnd()) : closest;
    }

    function setIndex(index) {
      if (index !== currIndex) {
        prevIndex = currIndex;
        currIndex = index;
      }
    }

    function getIndex(prev) {
      return prev ? prevIndex : currIndex;
    }

    function hasFocus() {
      return !isUndefined(options.focus) || options.isNavigation;
    }

    function isBusy() {
      return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
    }

    return {
      mount: mount,
      go: go,
      scroll: scroll,
      getNext: getNext,
      getPrev: getPrev,
      getAdjacent: getAdjacent,
      getEnd: getEnd,
      setIndex: setIndex,
      getIndex: getIndex,
      toIndex: toIndex,
      toPage: toPage,
      toDest: toDest,
      hasFocus: hasFocus,
      isBusy: isBusy
    };
  }

  var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
  var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
  var SIZE = 40;

  function Arrows(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on,
        bind = event.bind,
        emit = event.emit;
    var classes = options.classes,
        i18n = options.i18n;
    var Elements = Components2.Elements,
        Controller = Components2.Controller;
    var placeholder = Elements.arrows,
        track = Elements.track;
    var wrapper = placeholder;
    var prev = Elements.prev;
    var next = Elements.next;
    var created;
    var wrapperClasses;
    var arrows = {};

    function mount() {
      init();
      on(EVENT_UPDATED, remount);
    }

    function remount() {
      destroy();
      mount();
    }

    function init() {
      var enabled = options.arrows;

      if (enabled && !(prev && next)) {
        createArrows();
      }

      if (prev && next) {
        assign(arrows, {
          prev: prev,
          next: next
        });
        display(wrapper, enabled ? "" : "none");
        addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);

        if (enabled) {
          listen();
          update();
          setAttribute([prev, next], ARIA_CONTROLS, track.id);
          emit(EVENT_ARROWS_MOUNTED, prev, next);
        }
      }
    }

    function destroy() {
      event.destroy();
      removeClass(wrapper, wrapperClasses);

      if (created) {
        remove(placeholder ? [prev, next] : wrapper);
        prev = next = null;
      } else {
        removeAttribute([prev, next], ALL_ATTRIBUTES);
      }
    }

    function listen() {
      on([EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED], update);
      bind(next, "click", apply(go, ">"));
      bind(prev, "click", apply(go, "<"));
    }

    function go(control) {
      Controller.go(control, true);
    }

    function createArrows() {
      wrapper = placeholder || create("div", classes.arrows);
      prev = createArrow(true);
      next = createArrow(false);
      created = true;
      append(wrapper, [prev, next]);
      !placeholder && before(wrapper, track);
    }

    function createArrow(prev2) {
      var arrow = "<button class=\"" + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + "\" type=\"button\"><svg xmlns=\"" + XML_NAME_SPACE + "\" viewBox=\"0 0 " + SIZE + " " + SIZE + "\" width=\"" + SIZE + "\" height=\"" + SIZE + "\" focusable=\"false\"><path d=\"" + (options.arrowPath || PATH) + "\" />";
      return parseHtml(arrow);
    }

    function update() {
      var index = Splide2.index;
      var prevIndex = Controller.getPrev();
      var nextIndex = Controller.getNext();
      var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
      var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
      prev.disabled = prevIndex < 0;
      next.disabled = nextIndex < 0;
      setAttribute(prev, ARIA_LABEL, prevLabel);
      setAttribute(next, ARIA_LABEL, nextLabel);
      emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
    }

    return {
      arrows: arrows,
      mount: mount,
      destroy: destroy,
      update: update
    };
  }

  var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";

  function Autoplay(Splide2, Components2, options) {
    var _EventInterface7 = EventInterface(Splide2),
        on = _EventInterface7.on,
        bind = _EventInterface7.bind,
        emit = _EventInterface7.emit;

    var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
    var isPaused = interval.isPaused;
    var Elements = Components2.Elements,
        _Components2$Elements4 = Components2.Elements,
        root = _Components2$Elements4.root,
        toggle = _Components2$Elements4.toggle;
    var autoplay = options.autoplay;
    var hovered;
    var focused;
    var stopped = autoplay === "pause";

    function mount() {
      if (autoplay) {
        listen();
        toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
        stopped || play();
        update();
      }
    }

    function listen() {
      if (options.pauseOnHover) {
        bind(root, "mouseenter mouseleave", function (e) {
          hovered = e.type === "mouseenter";
          autoToggle();
        });
      }

      if (options.pauseOnFocus) {
        bind(root, "focusin focusout", function (e) {
          focused = e.type === "focusin";
          autoToggle();
        });
      }

      if (toggle) {
        bind(toggle, "click", function () {
          stopped ? play() : pause(true);
        });
      }

      on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
      on(EVENT_MOVE, onMove);
    }

    function play() {
      if (isPaused() && Components2.Slides.isEnough()) {
        interval.start(!options.resetProgress);
        focused = hovered = stopped = false;
        update();
        emit(EVENT_AUTOPLAY_PLAY);
      }
    }

    function pause(stop) {
      if (stop === void 0) {
        stop = true;
      }

      stopped = !!stop;
      update();

      if (!isPaused()) {
        interval.pause();
        emit(EVENT_AUTOPLAY_PAUSE);
      }
    }

    function autoToggle() {
      if (!stopped) {
        hovered || focused ? pause(false) : play();
      }
    }

    function update() {
      if (toggle) {
        toggleClass(toggle, CLASS_ACTIVE, !stopped);
        setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
      }
    }

    function onAnimationFrame(rate) {
      var bar = Elements.bar;
      bar && style(bar, "width", rate * 100 + "%");
      emit(EVENT_AUTOPLAY_PLAYING, rate);
    }

    function onMove(index) {
      var Slide = Components2.Slides.getAt(index);
      interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
    }

    return {
      mount: mount,
      destroy: interval.cancel,
      play: play,
      pause: pause,
      isPaused: isPaused
    };
  }

  function Cover(Splide2, Components2, options) {
    var _EventInterface8 = EventInterface(Splide2),
        on = _EventInterface8.on;

    function mount() {
      if (options.cover) {
        on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
        on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
      }
    }

    function cover(cover2) {
      Components2.Slides.forEach(function (Slide) {
        var img = child(Slide.container || Slide.slide, "img");

        if (img && img.src) {
          toggle(cover2, img, Slide);
        }
      });
    }

    function toggle(cover2, img, Slide) {
      Slide.style("background", cover2 ? "center/cover no-repeat url(\"" + img.src + "\")" : "", true);
      display(img, cover2 ? "none" : "");
    }

    return {
      mount: mount,
      destroy: apply(cover, false)
    };
  }

  var BOUNCE_DIFF_THRESHOLD = 10;
  var BOUNCE_DURATION = 600;
  var FRICTION_FACTOR = 0.6;
  var BASE_VELOCITY = 1.5;
  var MIN_DURATION = 800;

  function Scroll(Splide2, Components2, options) {
    var _EventInterface9 = EventInterface(Splide2),
        on = _EventInterface9.on,
        emit = _EventInterface9.emit;

    var set = Splide2.state.set;
    var Move = Components2.Move;
    var getPosition = Move.getPosition,
        getLimit = Move.getLimit,
        exceededLimit = Move.exceededLimit,
        translate = Move.translate;
    var isSlide = Splide2.is(SLIDE);
    var interval;
    var callback;
    var friction = 1;

    function mount() {
      on(EVENT_MOVE, clear);
      on([EVENT_UPDATED, EVENT_REFRESH], cancel);
    }

    function scroll(destination, duration, snap, onScrolled, noConstrain) {
      var from = getPosition();
      clear();

      if (snap && (!isSlide || !exceededLimit())) {
        var size = Components2.Layout.sliderSize();
        var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
        destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
      }

      var noDistance = approximatelyEqual(from, destination, 1);
      friction = 1;
      duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
      callback = onScrolled;
      interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
      set(SCROLLING);
      emit(EVENT_SCROLL);
      interval.start();
    }

    function onEnd() {
      set(IDLE);
      callback && callback();
      emit(EVENT_SCROLLED);
    }

    function update(from, to, noConstrain, rate) {
      var position = getPosition();
      var target = from + (to - from) * easing(rate);
      var diff = (target - position) * friction;
      translate(position + diff);

      if (isSlide && !noConstrain && exceededLimit()) {
        friction *= FRICTION_FACTOR;

        if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
          scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
        }
      }
    }

    function clear() {
      if (interval) {
        interval.cancel();
      }
    }

    function cancel() {
      if (interval && !interval.isPaused()) {
        clear();
        onEnd();
      }
    }

    function easing(t) {
      var easingFunc = options.easingFunc;
      return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
    }

    return {
      mount: mount,
      destroy: clear,
      scroll: scroll,
      cancel: cancel
    };
  }

  var SCROLL_LISTENER_OPTIONS = {
    passive: false,
    capture: true
  };

  function Drag(Splide2, Components2, options) {
    var _EventInterface10 = EventInterface(Splide2),
        on = _EventInterface10.on,
        emit = _EventInterface10.emit,
        bind = _EventInterface10.bind,
        unbind = _EventInterface10.unbind;

    var state = Splide2.state;
    var Move = Components2.Move,
        Scroll = Components2.Scroll,
        Controller = Components2.Controller,
        track = Components2.Elements.track,
        reduce = Components2.Media.reduce;
    var _Components2$Directio2 = Components2.Direction,
        resolve = _Components2$Directio2.resolve,
        orient = _Components2$Directio2.orient;
    var getPosition = Move.getPosition,
        exceededLimit = Move.exceededLimit;
    var basePosition;
    var baseEvent;
    var prevBaseEvent;
    var isFree;
    var dragging;
    var exceeded = false;
    var clickPrevented;
    var disabled;
    var target;

    function mount() {
      bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
      bind(track, "click", onClick, {
        capture: true
      });
      bind(track, "dragstart", prevent);
      on([EVENT_MOUNTED, EVENT_UPDATED], init);
    }

    function init() {
      var drag = options.drag;
      disable(!drag);
      isFree = drag === "free";
    }

    function onPointerDown(e) {
      clickPrevented = false;

      if (!disabled) {
        var isTouch = isTouchEvent(e);

        if (isDraggable(e.target) && (isTouch || !e.button)) {
          if (!Controller.isBusy()) {
            target = isTouch ? track : window;
            dragging = state.is([MOVING, SCROLLING]);
            prevBaseEvent = null;
            bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
            bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
            Move.cancel();
            Scroll.cancel();
            save(e);
          } else {
            prevent(e, true);
          }
        }
      }
    }

    function onPointerMove(e) {
      if (!state.is(DRAGGING)) {
        state.set(DRAGGING);
        emit(EVENT_DRAG);
      }

      if (e.cancelable) {
        if (dragging) {
          Move.translate(basePosition + constrain(diffCoord(e)));
          var expired = diffTime(e) > LOG_INTERVAL;
          var hasExceeded = exceeded !== (exceeded = exceededLimit());

          if (expired || hasExceeded) {
            save(e);
          }

          clickPrevented = true;
          emit(EVENT_DRAGGING);
          prevent(e);
        } else if (isSliderDirection(e)) {
          dragging = shouldStart(e);
          prevent(e);
        }
      }
    }

    function onPointerUp(e) {
      if (state.is(DRAGGING)) {
        state.set(IDLE);
        emit(EVENT_DRAGGED);
      }

      if (dragging) {
        move(e);
        prevent(e);
      }

      unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
      unbind(target, POINTER_UP_EVENTS, onPointerUp);
      dragging = false;
    }

    function onClick(e) {
      if (!disabled && clickPrevented) {
        prevent(e, true);
      }
    }

    function save(e) {
      prevBaseEvent = baseEvent;
      baseEvent = e;
      basePosition = getPosition();
    }

    function move(e) {
      var velocity = computeVelocity(e);
      var destination = computeDestination(velocity);
      var rewind = options.rewind && options.rewindByDrag;
      reduce(false);

      if (isFree) {
        Controller.scroll(destination, 0, options.snap);
      } else if (Splide2.is(FADE)) {
        Controller.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
      } else if (Splide2.is(SLIDE) && exceeded && rewind) {
        Controller.go(exceededLimit(true) ? ">" : "<");
      } else {
        Controller.go(Controller.toDest(destination), true);
      }

      reduce(true);
    }

    function shouldStart(e) {
      var thresholds = options.dragMinThreshold;
      var isObj = isObject(thresholds);
      var mouse = isObj && thresholds.mouse || 0;
      var touch = (isObj ? thresholds.touch : +thresholds) || 10;
      return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
    }

    function isSliderDirection(e) {
      return abs(diffCoord(e)) > abs(diffCoord(e, true));
    }

    function computeVelocity(e) {
      if (Splide2.is(LOOP) || !exceeded) {
        var time = diffTime(e);

        if (time && time < LOG_INTERVAL) {
          return diffCoord(e) / time;
        }
      }

      return 0;
    }

    function computeDestination(velocity) {
      return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
    }

    function diffCoord(e, orthogonal) {
      return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
    }

    function diffTime(e) {
      return timeOf(e) - timeOf(getBaseEvent(e));
    }

    function getBaseEvent(e) {
      return baseEvent === e && prevBaseEvent || baseEvent;
    }

    function coordOf(e, orthogonal) {
      return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
    }

    function constrain(diff) {
      return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
    }

    function isDraggable(target2) {
      var noDrag = options.noDrag;
      return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
    }

    function isTouchEvent(e) {
      return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
    }

    function isDragging() {
      return dragging;
    }

    function disable(value) {
      disabled = value;
    }

    return {
      mount: mount,
      disable: disable,
      isDragging: isDragging
    };
  }

  var NORMALIZATION_MAP = {
    Spacebar: " ",
    Right: ARROW_RIGHT,
    Left: ARROW_LEFT,
    Up: ARROW_UP,
    Down: ARROW_DOWN
  };

  function normalizeKey(key) {
    key = isString(key) ? key : key.key;
    return NORMALIZATION_MAP[key] || key;
  }

  var KEYBOARD_EVENT = "keydown";

  function Keyboard(Splide2, Components2, options) {
    var _EventInterface11 = EventInterface(Splide2),
        on = _EventInterface11.on,
        bind = _EventInterface11.bind,
        unbind = _EventInterface11.unbind;

    var root = Splide2.root;
    var resolve = Components2.Direction.resolve;
    var target;
    var disabled;

    function mount() {
      init();
      on(EVENT_UPDATED, destroy);
      on(EVENT_UPDATED, init);
      on(EVENT_MOVE, onMove);
    }

    function init() {
      var keyboard = options.keyboard;

      if (keyboard) {
        target = keyboard === "global" ? window : root;
        bind(target, KEYBOARD_EVENT, onKeydown);
      }
    }

    function destroy() {
      unbind(target, KEYBOARD_EVENT);
    }

    function disable(value) {
      disabled = value;
    }

    function onMove() {
      var _disabled = disabled;
      disabled = true;
      nextTick(function () {
        disabled = _disabled;
      });
    }

    function onKeydown(e) {
      if (!disabled) {
        var key = normalizeKey(e);

        if (key === resolve(ARROW_LEFT)) {
          Splide2.go("<");
        } else if (key === resolve(ARROW_RIGHT)) {
          Splide2.go(">");
        }
      }
    }

    return {
      mount: mount,
      destroy: destroy,
      disable: disable
    };
  }

  var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
  var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
  var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";

  function LazyLoad(Splide2, Components2, options) {
    var _EventInterface12 = EventInterface(Splide2),
        on = _EventInterface12.on,
        off = _EventInterface12.off,
        bind = _EventInterface12.bind,
        emit = _EventInterface12.emit;

    var isSequential = options.lazyLoad === "sequential";
    var events = [EVENT_MOVED, EVENT_SCROLLED];
    var entries = [];

    function mount() {
      if (options.lazyLoad) {
        init();
        on(EVENT_REFRESH, init);
      }
    }

    function init() {
      empty(entries);
      register();

      if (isSequential) {
        loadNext();
      } else {
        off(events);
        on(events, check);
        check();
      }
    }

    function register() {
      Components2.Slides.forEach(function (Slide) {
        queryAll(Slide.slide, IMAGE_SELECTOR).forEach(function (img) {
          var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
          var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);

          if (src !== img.src || srcset !== img.srcset) {
            var className = options.classes.spinner;
            var parent = img.parentElement;
            var spinner = child(parent, "." + className) || create("span", className, parent);
            entries.push([img, Slide, spinner]);
            img.src || display(img, "none");
          }
        });
      });
    }

    function check() {
      entries = entries.filter(function (data) {
        var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
        return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
      });
      entries.length || off(events);
    }

    function load(data) {
      var img = data[0];
      addClass(data[1].slide, CLASS_LOADING);
      bind(img, "load error", apply(onLoad, data));
      setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
      setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
      removeAttribute(img, SRC_DATA_ATTRIBUTE);
      removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
    }

    function onLoad(data, e) {
      var img = data[0],
          Slide = data[1];
      removeClass(Slide.slide, CLASS_LOADING);

      if (e.type !== "error") {
        remove(data[2]);
        display(img, "");
        emit(EVENT_LAZYLOAD_LOADED, img, Slide);
        emit(EVENT_RESIZE);
      }

      isSequential && loadNext();
    }

    function loadNext() {
      entries.length && load(entries.shift());
    }

    return {
      mount: mount,
      destroy: apply(empty, entries),
      check: check
    };
  }

  function Pagination(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on,
        emit = event.emit,
        bind = event.bind;
    var Slides = Components2.Slides,
        Elements = Components2.Elements,
        Controller = Components2.Controller;
    var hasFocus = Controller.hasFocus,
        getIndex = Controller.getIndex,
        go = Controller.go;
    var resolve = Components2.Direction.resolve;
    var placeholder = Elements.pagination;
    var items = [];
    var list;
    var paginationClasses;

    function mount() {
      destroy();
      on([EVENT_UPDATED, EVENT_REFRESH], mount);
      var enabled = options.pagination && Slides.isEnough();
      placeholder && display(placeholder, enabled ? "" : "none");

      if (enabled) {
        on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
        createPagination();
        update();
        emit(EVENT_PAGINATION_MOUNTED, {
          list: list,
          items: items
        }, getAt(Splide2.index));
      }
    }

    function destroy() {
      if (list) {
        remove(placeholder ? slice(list.children) : list);
        removeClass(list, paginationClasses);
        empty(items);
        list = null;
      }

      event.destroy();
    }

    function createPagination() {
      var length = Splide2.length;
      var classes = options.classes,
          i18n = options.i18n,
          perPage = options.perPage;
      var max = hasFocus() ? length : ceil(length / perPage);
      list = placeholder || create("ul", classes.pagination, Elements.track.parentElement);
      addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
      setAttribute(list, ROLE, "tablist");
      setAttribute(list, ARIA_LABEL, i18n.select);
      setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");

      for (var i = 0; i < max; i++) {
        var li = create("li", null, list);
        var button = create("button", {
          class: classes.page,
          type: "button"
        }, li);
        var controls = Slides.getIn(i).map(function (Slide) {
          return Slide.slide.id;
        });
        var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
        bind(button, "click", apply(onClick, i));

        if (options.paginationKeyboard) {
          bind(button, "keydown", apply(onKeydown, i));
        }

        setAttribute(li, ROLE, "presentation");
        setAttribute(button, ROLE, "tab");
        setAttribute(button, ARIA_CONTROLS, controls.join(" "));
        setAttribute(button, ARIA_LABEL, format(text, i + 1));
        setAttribute(button, TAB_INDEX, -1);
        items.push({
          li: li,
          button: button,
          page: i
        });
      }
    }

    function onClick(page) {
      go(">" + page, true);
    }

    function onKeydown(page, e) {
      var length = items.length;
      var key = normalizeKey(e);
      var dir = getDirection();
      var nextPage = -1;

      if (key === resolve(ARROW_RIGHT, false, dir)) {
        nextPage = ++page % length;
      } else if (key === resolve(ARROW_LEFT, false, dir)) {
        nextPage = (--page + length) % length;
      } else if (key === "Home") {
        nextPage = 0;
      } else if (key === "End") {
        nextPage = length - 1;
      }

      var item = items[nextPage];

      if (item) {
        focus(item.button);
        go(">" + nextPage);
        prevent(e, true);
      }
    }

    function getDirection() {
      return options.paginationDirection || options.direction;
    }

    function getAt(index) {
      return items[Controller.toPage(index)];
    }

    function update() {
      var prev = getAt(getIndex(true));
      var curr = getAt(getIndex());

      if (prev) {
        var button = prev.button;
        removeClass(button, CLASS_ACTIVE);
        removeAttribute(button, ARIA_SELECTED);
        setAttribute(button, TAB_INDEX, -1);
      }

      if (curr) {
        var _button = curr.button;
        addClass(_button, CLASS_ACTIVE);
        setAttribute(_button, ARIA_SELECTED, true);
        setAttribute(_button, TAB_INDEX, "");
      }

      emit(EVENT_PAGINATION_UPDATED, {
        list: list,
        items: items
      }, prev, curr);
    }

    return {
      items: items,
      mount: mount,
      destroy: destroy,
      getAt: getAt,
      update: update
    };
  }

  var TRIGGER_KEYS = [" ", "Enter"];

  function Sync(Splide2, Components2, options) {
    var isNavigation = options.isNavigation,
        slideFocus = options.slideFocus;
    var events = [];

    function setup() {
      Splide2.options = {
        slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
      };
    }

    function mount() {
      Splide2.splides.forEach(function (target) {
        if (!target.isParent) {
          sync(Splide2, target.splide);
          sync(target.splide, Splide2);
        }
      });

      if (isNavigation) {
        navigate();
      }
    }

    function destroy() {
      events.forEach(function (event) {
        event.destroy();
      });
      empty(events);
    }

    function remount() {
      destroy();
      mount();
    }

    function sync(splide, target) {
      var event = EventInterface(splide);
      event.on(EVENT_MOVE, function (index, prev, dest) {
        target.go(target.is(LOOP) ? dest : index);
      });
      events.push(event);
    }

    function navigate() {
      var event = EventInterface(Splide2);
      var on = event.on;
      on(EVENT_CLICK, onClick);
      on(EVENT_SLIDE_KEYDOWN, onKeydown);
      on([EVENT_MOUNTED, EVENT_UPDATED], update);
      events.push(event);
      event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
    }

    function update() {
      setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
    }

    function onClick(Slide) {
      Splide2.go(Slide.index);
    }

    function onKeydown(Slide, e) {
      if (includes(TRIGGER_KEYS, normalizeKey(e))) {
        onClick(Slide);
        prevent(e);
      }
    }

    return {
      setup: setup,
      mount: mount,
      destroy: destroy,
      remount: remount
    };
  }

  function Wheel(Splide2, Components2, options) {
    var _EventInterface13 = EventInterface(Splide2),
        bind = _EventInterface13.bind;

    var lastTime = 0;

    function mount() {
      if (options.wheel) {
        bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
      }
    }

    function onWheel(e) {
      if (e.cancelable) {
        var deltaY = e.deltaY;
        var backwards = deltaY < 0;
        var timeStamp = timeOf(e);

        var _min = options.wheelMinThreshold || 0;

        var sleep = options.wheelSleep || 0;

        if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
          Splide2.go(backwards ? "<" : ">");
          lastTime = timeStamp;
        }

        shouldPrevent(backwards) && prevent(e);
      }
    }

    function shouldPrevent(backwards) {
      return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
    }

    return {
      mount: mount
    };
  }

  var SR_REMOVAL_DELAY = 90;

  function Live(Splide2, Components2, options) {
    var _EventInterface14 = EventInterface(Splide2),
        on = _EventInterface14.on;

    var track = Components2.Elements.track;
    var enabled = options.live && !options.isNavigation;
    var sr = create("span", CLASS_SR);
    var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));

    function mount() {
      if (enabled) {
        disable(!Components2.Autoplay.isPaused());
        setAttribute(track, ARIA_ATOMIC, true);
        sr.textContent = "\u2026";
        on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
        on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
        on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
      }
    }

    function toggle(active) {
      setAttribute(track, ARIA_BUSY, active);

      if (active) {
        append(track, sr);
        interval.start();
      } else {
        remove(sr);
      }
    }

    function destroy() {
      removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
      remove(sr);
    }

    function disable(disabled) {
      if (enabled) {
        setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
      }
    }

    return {
      mount: mount,
      disable: disable,
      destroy: destroy
    };
  }

  var ComponentConstructors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Media: Media,
    Direction: Direction,
    Elements: Elements,
    Slides: Slides,
    Layout: Layout,
    Clones: Clones,
    Move: Move,
    Controller: Controller,
    Arrows: Arrows,
    Autoplay: Autoplay,
    Cover: Cover,
    Scroll: Scroll,
    Drag: Drag,
    Keyboard: Keyboard,
    LazyLoad: LazyLoad,
    Pagination: Pagination,
    Sync: Sync,
    Wheel: Wheel,
    Live: Live
  });
  var I18N = {
    prev: "Previous slide",
    next: "Next slide",
    first: "Go to first slide",
    last: "Go to last slide",
    slideX: "Go to slide %s",
    pageX: "Go to page %s",
    play: "Start autoplay",
    pause: "Pause autoplay",
    carousel: "carousel",
    slide: "slide",
    select: "Select a slide to show",
    slideLabel: "%s of %s"
  };
  var DEFAULTS = {
    type: "slide",
    role: "region",
    speed: 400,
    perPage: 1,
    cloneStatus: true,
    arrows: true,
    pagination: true,
    paginationKeyboard: true,
    interval: 5e3,
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: true,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    drag: true,
    direction: "ltr",
    trimSpace: true,
    focusableNodes: "a, button, textarea, input, select, iframe",
    live: true,
    classes: CLASSES,
    i18n: I18N,
    reducedMotion: {
      speed: 0,
      rewindSpeed: 0,
      autoplay: "pause"
    }
  };

  function Fade(Splide2, Components2, options) {
    var _EventInterface15 = EventInterface(Splide2),
        on = _EventInterface15.on;

    function mount() {
      on([EVENT_MOUNTED, EVENT_REFRESH], function () {
        nextTick(function () {
          Components2.Slides.style("transition", "opacity " + options.speed + "ms " + options.easing);
        });
      });
    }

    function start(index, done) {
      var track = Components2.Elements.track;
      style(track, "height", unit(rect(track).height));
      nextTick(function () {
        done();
        style(track, "height", "");
      });
    }

    return {
      mount: mount,
      start: start,
      cancel: noop
    };
  }

  function Slide(Splide2, Components2, options) {
    var _EventInterface16 = EventInterface(Splide2),
        bind = _EventInterface16.bind;

    var Move = Components2.Move,
        Controller = Components2.Controller,
        Scroll = Components2.Scroll;
    var list = Components2.Elements.list;
    var transition = apply(style, list, "transition");
    var endCallback;

    function mount() {
      bind(list, "transitionend", function (e) {
        if (e.target === list && endCallback) {
          cancel();
          endCallback();
        }
      });
    }

    function start(index, done) {
      var destination = Move.toPosition(index, true);
      var position = Move.getPosition();
      var speed = getSpeed(index);

      if (abs(destination - position) >= 1 && speed >= 1) {
        if (options.useScroll) {
          Scroll.scroll(destination, speed, false, done);
        } else {
          transition("transform " + speed + "ms " + options.easing);
          Move.translate(destination, true);
          endCallback = done;
        }
      } else {
        Move.jump(index);
        done();
      }
    }

    function cancel() {
      transition("");
      Scroll.cancel();
    }

    function getSpeed(index) {
      var rewindSpeed = options.rewindSpeed;

      if (Splide2.is(SLIDE) && rewindSpeed) {
        var prev = Controller.getIndex(true);
        var end = Controller.getEnd();

        if (prev === 0 && index >= end || prev >= end && index === 0) {
          return rewindSpeed;
        }
      }

      return options.speed;
    }

    return {
      mount: mount,
      start: start,
      cancel: cancel
    };
  }

  var _Splide = /*#__PURE__*/function () {
    function _Splide(target, options) {
      this.event = EventInterface();
      this.Components = {};
      this.state = State(CREATED);
      this.splides = [];
      this._o = {};
      this._E = {};
      var root = isString(target) ? query(document, target) : target;
      assert(root, root + " is invalid.");
      this.root = root;
      options = merge({
        label: getAttribute(root, ARIA_LABEL) || "",
        labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
      }, DEFAULTS, _Splide.defaults, options || {});

      try {
        merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
      } catch (e) {
        assert(false, "Invalid JSON");
      }

      this._o = Object.create(merge({}, options));
    }

    var _proto = _Splide.prototype;

    _proto.mount = function mount(Extensions, Transition) {
      var _this = this;

      var state = this.state,
          Components2 = this.Components;
      assert(state.is([CREATED, DESTROYED]), "Already mounted!");
      state.set(CREATED);
      this._C = Components2;
      this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
      this._E = Extensions || this._E;
      var Constructors = assign({}, ComponentConstructors, this._E, {
        Transition: this._T
      });
      forOwn(Constructors, function (Component, key) {
        var component = Component(_this, Components2, _this._o);
        Components2[key] = component;
        component.setup && component.setup();
      });
      forOwn(Components2, function (component) {
        component.mount && component.mount();
      });
      this.emit(EVENT_MOUNTED);
      addClass(this.root, CLASS_INITIALIZED);
      state.set(IDLE);
      this.emit(EVENT_READY);
      return this;
    };

    _proto.sync = function sync(splide) {
      this.splides.push({
        splide: splide
      });
      splide.splides.push({
        splide: this,
        isParent: true
      });

      if (this.state.is(IDLE)) {
        this._C.Sync.remount();

        splide.Components.Sync.remount();
      }

      return this;
    };

    _proto.go = function go(control) {
      this._C.Controller.go(control);

      return this;
    };

    _proto.on = function on(events, callback) {
      this.event.on(events, callback);
      return this;
    };

    _proto.off = function off(events) {
      this.event.off(events);
      return this;
    };

    _proto.emit = function emit(event) {
      var _this$event;

      (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));

      return this;
    };

    _proto.add = function add(slides, index) {
      this._C.Slides.add(slides, index);

      return this;
    };

    _proto.remove = function remove(matcher) {
      this._C.Slides.remove(matcher);

      return this;
    };

    _proto.is = function is(type) {
      return this._o.type === type;
    };

    _proto.refresh = function refresh() {
      this.emit(EVENT_REFRESH);
      return this;
    };

    _proto.destroy = function destroy(completely) {
      if (completely === void 0) {
        completely = true;
      }

      var event = this.event,
          state = this.state;

      if (state.is(CREATED)) {
        EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
      } else {
        forOwn(this._C, function (component) {
          component.destroy && component.destroy(completely);
        }, true);
        event.emit(EVENT_DESTROY);
        event.destroy();
        completely && empty(this.splides);
        state.set(DESTROYED);
      }

      return this;
    };

    _createClass$1(_Splide, [{
      key: "options",
      get: function get() {
        return this._o;
      },
      set: function set(options) {
        this._C.Media.set(options, true);
      }
    }, {
      key: "length",
      get: function get() {
        return this._C.Slides.getLength(true);
      }
    }, {
      key: "index",
      get: function get() {
        return this._C.Controller.getIndex();
      }
    }]);

    return _Splide;
  }();

  var Splide = _Splide;
  Splide.defaults = {};
  Splide.STATES = STATES;

  var EL = '.js-show';

  if (document.querySelector(EL)) {
    var slider = new Splide(EL, {
      type: 'fade',
      rewind: true,
      perPage: 1,
      pagination: true,
      arrows: true,
      autoplay: true,
      interval: 9000,
      speed: 1000,
      pauseOnFocus: false,
      pauseOnHover: false
    }).mount();
  }

  if (document.querySelector('.js-thumbnails')) {
    new Splide('.js-thumbnails', {
      fixedWidth: 'calc(25% - 23px)',
      rewind: true,
      pagination: false,
      isNavigation: true,
      arrows: false,
      perPage: 4,
      breakpoints: {
        767: {
          perPage: 2,
          fixedWidth: 'calc(50% - 7px)'
        }
      }
    }).mount();
    new Splide('.js-main', {
      type: 'fade',
      rewind: true,
      pagination: false,
      arrows: false,
      perPage: 1
    }).mount();
    var main = new Splide('.js-main', {
      type: 'fade',
      rewind: true,
      pagination: false,
      arrows: false,
      perPage: 1
    });
    var thumbnails = new Splide('.js-thumbnails', {
      fixedWidth: 'calc(25% - 23px)',
      rewind: true,
      pagination: false,
      arrows: false,
      isNavigation: true,
      perPage: 4,
      breakpoints: {
        767: {
          perPage: 2,
          pagination: false,
          fixedWidth: 'calc(50% - 7px)'
        }
      }
    });
    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
  }

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsic3JjL3NjcmlwdHMvbW9kdWxlcy9IZWxsb1dvcmxkLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9BbmltYXRlLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9TY3JvbGxDbGFzcy5qcyIsInNyYy9zY3JpcHRzL21vZHVsZXMvVG9nZ2xlQm9keUNsYXNzLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9Ub2dnbGVOYXYuanMiLCJub2RlX21vZHVsZXMvQHNwbGlkZWpzL3NwbGlkZS9kaXN0L2pzL3NwbGlkZS5lc20uanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL1Nob3cuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEhlbGxvV29ybGRcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogLSBleGFtcGxlIGpzIG1vZHVsZVxyXG4gKi9cclxuXHJcbmNvbnN0IE1FU1NBR0UgPSBcIkhlbGxvIFdvcmxkISBGcm9tIEhlbGxvV29ybGQuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCB0aGlzLmxvYWRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBsb2FkSGFuZGxlciA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKE1FU1NBR0UpO1xyXG4gIH07XHJcbn1cclxuXHJcbm5ldyBIZWxsb1dvcmxkKCk7XHJcbiIsIi8qKlxyXG4gKiBBbmltYXRlXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIC0gYWRkIGNsYXNzIHRvIGVsZW1lbnQgaW4gdmlld3BvcnRcclxuICogLSBpZiB5b3Ugd2FudCBkaXNhYmxlIGFuaW1hdGUgZGVsYXkgb24gbW9iaWxlIHVzZSBbYW5pbWF0ZS1kZWxheS1kZXNrdG9wXVxyXG4gKiAtIHNldCBhbmltYXRpb24gZGVsYXkgdmlhIFthbmltYXRlLWRlbGF5XSBodG1sIGF0dHJpYnV0ZVxyXG4gKiAtIHNldCB2aXNpYmxlIHRocmVzaG9sZCB2aWEgW2FuaW1hdGUtdGhyZXNob2xkXSBodG1sIGF0dHJpYnV0ZVxyXG4gKi9cclxuXHJcbiBjb25zdCBJU01PQklMRSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KVwiKS5tYXRjaGVzXHJcbiBjb25zdCBUSFJFU0hPTEQgPSBJU01PQklMRSA/ICcwLjQnIDogJzAuNidcclxuIGNvbnN0IExPQURfVEhSRVNIT0xEID0gJzAuMidcclxuIGNvbnN0IEVMRU1FTlRTID0gJy5hbmltYXRlJ1xyXG4gY29uc3QgVklTSUJMRV9DTEFTUyA9ICdhbmltYXRlLS12aXNpYmxlJ1xyXG5cclxuY2xhc3MgQW5pbWF0ZSB7XHJcbiAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRUxFTUVOVFMpXHJcbiAgICB0aGlzLlRIUkVTSE9MRCA9IFRIUkVTSE9MRFxyXG4gICAgdGhpcy5MT0FEX1RIUkVTSE9MRCA9IExPQURfVEhSRVNIT0xEXHJcblxyXG4gICAgICBpZignSW50ZXJzZWN0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdykge1xyXG4gICAgICAgIHRoaXMuc2VjdGlvbnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgY29uc3QgQm91bmRpbmdDbGllbnRSZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAgY29uc3QgdmlzaWJsZVJhdGlvID0gIEJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQgLyB3aW5kb3cuaW5uZXJIZWlnaHRcclxuXHJcbiAgICAgICAgIGlmKHZpc2libGVSYXRpbyA+IDAuOTUpe1xyXG4gICAgICAgICAgIHRoaXMuVEhSRVNIT0xEID0gIHdpbmRvdy5pbm5lckhlaWdodCAvIEJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQgLyAxMDAgKiAzMFxyXG4gICAgICAgICAgIHRoaXMuTE9BRF9USFJFU0hPTEQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyBCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IC8gMTAwICogMjBcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIG9ic2VydmUgb24gcGFnZSBsb2FkXHJcbiAgICAgICAgICBjb25zdCBsb2FkT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5vYnNlcnZlQ2FsbGJhY2ssIHtcclxuICAgICAgICAgICAgdGhyZXNob2xkOiB0aGlzLkxPQURfVEhSRVNIT0xEXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGxvYWRPYnNlcnZlci5vYnNlcnZlKGVsKTtcclxuXHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxvYWRPYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgIC8vIG9ic2VydmVcclxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyVGhyZXNob2xkID0gZWwuZ2V0QXR0cmlidXRlKCdhbmltYXRlLXRocmVzaG9sZCcpID8gZWwuZ2V0QXR0cmlidXRlKCdhbmltYXRlLXRocmVzaG9sZCcpIDogdGhpcy5USFJFU0hPTERcclxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMub2JzZXJ2ZUNhbGxiYWNrLCB7XHJcbiAgICAgICAgICAgIHRocmVzaG9sZDogb2JzZXJ2ZXJUaHJlc2hvbGRcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNlY3Rpb25zLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFZJU0lCTEVfQ0xBU1MpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICAgb2JzZXJ2ZUNhbGxiYWNrID0gKGVudHJpZXMpID0+IHtcclxuICAgICAgZW50cmllcy5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IGVudHJ5LnRhcmdldDtcclxuICAgICAgICBjb25zdCBkZWxheSA9IHRoaXMuZ2V0RGVsYXkoc2VjdGlvbilcclxuICAgICAgICBjb25zdCBzZWN0aW9uQm9keUNsYXNzID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtYm9keS1jbGFzcycpXHJcblxyXG4gICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgICAgaWYoSVNNT0JJTEUgJiYgc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtZGVsYXktZGVza3RvcCcpKXtcclxuICAgICAgICAgICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKFZJU0lCTEVfQ0xBU1MpXHJcblxyXG4gICAgICAgICAgICB0aGlzLmJvZHlDbGFzcyhzZWN0aW9uQm9keUNsYXNzLCAnYWRkJylcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZChWSVNJQkxFX0NMQVNTKVxyXG4gICAgICAgICAgICAgIHRoaXMuYm9keUNsYXNzKHNlY3Rpb25Cb2R5Q2xhc3MsICdhZGQnKVxyXG4gICAgICAgICAgICB9LCBkZWxheSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5ib2R5Q2xhc3Moc2VjdGlvbkJvZHlDbGFzcywgJ3JlbW92ZScpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgIGdldERlbGF5ID0gKHNlY3Rpb24pID0+IHtcclxuICAgdmFyIGRlbGF5ID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtZGVsYXknKVxyXG5cclxuICAgaWYoIUlTTU9CSUxFICYmIHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdhbmltYXRlLWRlbGF5LWRlc2t0b3AnKSl7XHJcbiAgICAgdmFyIGRlbGF5ID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtZGVsYXktZGVza3RvcCcpXHJcbiAgIH1cclxuXHJcbiAgIGlmIChkZWxheSA9PT0gbnVsbCkge1xyXG4gICAgIHJldHVybiAwXHJcbiAgIH0gZWxzZSBpZiAoZGVsYXkuaW5jbHVkZXMoJy4nKSkge1xyXG4gICAgIHJldHVybiBwYXJzZUludChkZWxheSAqIDEwMDApXHJcbiAgIH0gZWxzZSB7XHJcbiAgICAgcmV0dXJuIHBhcnNlSW50KGRlbGF5KVxyXG4gICB9XHJcbiAgIH1cclxuXHJcbiAgIGJvZHlDbGFzcyA9IChodG1sY2xhc3MsIHR5cGUpID0+IHtcclxuICAgICBpZighaHRtbGNsYXNzKXtcclxuICAgICAgIHJldHVyblxyXG4gICAgIH1cclxuXHJcbiAgICAgIGlmKHR5cGUgPT0gJ2FkZCcpe1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChodG1sY2xhc3MpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGh0bWxjbGFzcylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gfVxyXG5cclxuIG5ldyBBbmltYXRlKClcclxuIiwiLypcclxuICBAIEFkZCBib2R5IGNsYXNzIGlmOlxyXG4gIC0gc2Nyb2xsIHN0YXJ0ZWRcclxuICAtIHNjcm9sbGVkIHRvIGJvdHRvbVxyXG4qL1xyXG5cclxuY29uc3QgU1RBUlRfT0ZGU0VUID0gMTA7XHJcbmNvbnN0IFNUQVJUX0NMQVNTID0gXCJpcy1zY3JvbGxlZFwiO1xyXG5jb25zdCBCT1RUT01fT0ZGU0VUID0gMTA7XHJcbmNvbnN0IEJPVFRPTV9DTEFTUyA9IFwiaXMtc2Nyb2xsZWQtYm90dG9tXCI7XHJcblxyXG5jb25zdCBVUF9ET1dOX0NMQVNTRVMgPSBmYWxzZTtcclxuY29uc3QgVVBfQ0xBU1MgPSBcInNjcm9sbGluZy11cFwiO1xyXG5jb25zdCBET1dOX0NMQVNTID0gXCJzY3JvbGxpbmctZG93blwiO1xyXG5cclxuY2xhc3MgU2Nyb2xsQ2xhc3Mge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLnNjcm9sbEhhbmRsZXIsIHtwYXNzaXZlOiB0cnVlfSk7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoU1RBUlRfQ0xBU1MsIHRvcCA+PSBTVEFSVF9PRkZTRVQpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFxyXG4gICAgICBCT1RUT01fQ0xBU1MsXHJcbiAgICAgIHdpbmRvdy5pbm5lckhlaWdodCArIHRvcCA+PSBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIEJPVFRPTV9PRkZTRVRcclxuICAgICk7XHJcblxyXG4gICAgaWYgKFVQX0RPV05fQ0xBU1NFUykge1xyXG4gICAgICBpZih0aGlzLm9sZFNjcm9sbCA+IHRvcCl7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFVQX0NMQVNTKVxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShET1dOX0NMQVNTKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoRE9XTl9DTEFTUylcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoVVBfQ0xBU1MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbGRTY3JvbGwgPSB0b3A7XHJcblxyXG4gIH07XHJcbn1cclxuXHJcbm5ldyBTY3JvbGxDbGFzcygpO1xyXG4iLCIvKipcclxuICogVG9nZ2xlQm9keUNsYXNzXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIC0gdG9nZ2xlIGNsYXNzIG9uIGJvZHlcclxuICogLSBtdWx0aXBsZSBjbGFzc2VzIHN1cHBvcnRlZCAtIFwiQ0xBU1NOQU1FIENMQVNTTkFNRTIgLi4uXCJcclxuICogLSBhZGQgY2xhc3MgdG8gaHRtbCBhdHRyIFtkYXRhLXRvZ2dsZT1cIkNMQVNTTkFNRVwiXVxyXG4gKiAtIHJlbW92ZSBjbGFzcyB3aGVuIGF0dHIgW2RhdGEtcmVtb3ZlPVwiQ0xBU1NOQU1FXCJdXHJcbiAqL1xyXG5cclxuIGNvbnN0IEVMRU1FTlRTID0gJy5qcy1Ub2dnbGVCb2R5Q2xhc3MnXHJcblxyXG4gY2xhc3MgVG9nZ2xlQm9keUNsYXNzIHtcclxuICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgdGhpcy5lbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRUxFTUVOVFMpXHJcblxyXG4gICAgIGlmICghdGhpcy5lbGVtZW50cykge1xyXG4gICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgfVxyXG5cclxuICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZSwgZmFsc2UpXHJcbiAgICAgfSlcclxuICAgfVxyXG5cclxuICAgdG9nZ2xlID0gKGUpID0+IHtcclxuICAgICBjb25zdCBlbCA9IGUuY3VycmVudFRhcmdldFxyXG4gICAgIGNvbnN0IGNsYXNzZXMgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9nZ2xlJylcclxuICAgICBjb25zdCBjbGFzc2VzUmVtb3ZlID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXJlbW92ZScpXHJcblxyXG4gICAgIGlmKGNsYXNzZXNSZW1vdmUpe1xyXG4gICAgICBjbGFzc2VzUmVtb3ZlLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSlcclxuICAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgIGNsYXNzZXMuc3BsaXQoXCIgXCIpLmZvckVhY2goY2xhc3NOYW1lID0+IHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSlcclxuICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgfVxyXG4gfVxyXG5cclxuIG5ldyBUb2dnbGVCb2R5Q2xhc3MoKVxyXG4iLCIvKipcclxuICogVG9nZ2xlIE5hdlxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAtIHRvZ2dsZSBjbGFzcyBvbiBib2R5XHJcbiAqL1xyXG5cclxuY29uc3QgRUxFTUVOVFMgPSAnLnRvZ2dsZW5hdl9fYnV0dG9uJ1xyXG5jb25zdCBUT0dHTEVfQ0xBU1MgPSAnbmF2LWlzLW9wZW4nXHJcblxyXG5jbGFzcyBUb2dnbGVOYXYge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5lbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRUxFTUVOVFMpXHJcblxyXG4gICAgaWYgKCF0aGlzLmVsZW1lbnRzKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU5hdiwgZmFsc2UpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTmF2KGUpIHtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShUT0dHTEVfQ0xBU1MpXHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2xvY2snKVxyXG5cclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gIH1cclxufVxyXG5cclxubmV3IFRvZ2dsZU5hdigpXHJcbiIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6IGZhbHNlIH0pOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuLyohXG4gKiBTcGxpZGUuanNcbiAqIFZlcnNpb24gIDogNC4wLjE3XG4gKiBMaWNlbnNlICA6IE1JVFxuICogQ29weXJpZ2h0OiAyMDIyIE5hb3Rvc2hpIEZ1aml0YVxuICovXG52YXIgTUVESUFfUFJFRkVSU19SRURVQ0VEX01PVElPTiA9IFwiKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlcIjtcbnZhciBDUkVBVEVEID0gMTtcbnZhciBNT1VOVEVEID0gMjtcbnZhciBJRExFID0gMztcbnZhciBNT1ZJTkcgPSA0O1xudmFyIFNDUk9MTElORyA9IDU7XG52YXIgRFJBR0dJTkcgPSA2O1xudmFyIERFU1RST1lFRCA9IDc7XG52YXIgU1RBVEVTID0ge1xuICBDUkVBVEVEOiBDUkVBVEVELFxuICBNT1VOVEVEOiBNT1VOVEVELFxuICBJRExFOiBJRExFLFxuICBNT1ZJTkc6IE1PVklORyxcbiAgU0NST0xMSU5HOiBTQ1JPTExJTkcsXG4gIERSQUdHSU5HOiBEUkFHR0lORyxcbiAgREVTVFJPWUVEOiBERVNUUk9ZRURcbn07XG5cbmZ1bmN0aW9uIGVtcHR5KGFycmF5KSB7XG4gIGFycmF5Lmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIHNsaWNlKGFycmF5TGlrZSwgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyYXlMaWtlLCBzdGFydCwgZW5kKTtcbn1cblxuZnVuY3Rpb24gYXBwbHkoZnVuYykge1xuICByZXR1cm4gZnVuYy5iaW5kLmFwcGx5KGZ1bmMsIFtudWxsXS5jb25jYXQoc2xpY2UoYXJndW1lbnRzLCAxKSkpO1xufVxuXG52YXIgbmV4dFRpY2sgPSBzZXRUaW1lb3V0O1xuXG52YXIgbm9vcCA9IGZ1bmN0aW9uIG5vb3AoKSB7fTtcblxuZnVuY3Rpb24gcmFmKGZ1bmMpIHtcbiAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jKTtcbn1cblxuZnVuY3Rpb24gdHlwZU9mKHR5cGUsIHN1YmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBzdWJqZWN0ID09PSB0eXBlO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChzdWJqZWN0KSB7XG4gIHJldHVybiAhaXNOdWxsKHN1YmplY3QpICYmIHR5cGVPZihcIm9iamVjdFwiLCBzdWJqZWN0KTtcbn1cblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGlzRnVuY3Rpb24gPSBhcHBseSh0eXBlT2YsIFwiZnVuY3Rpb25cIik7XG52YXIgaXNTdHJpbmcgPSBhcHBseSh0eXBlT2YsIFwic3RyaW5nXCIpO1xudmFyIGlzVW5kZWZpbmVkID0gYXBwbHkodHlwZU9mLCBcInVuZGVmaW5lZFwiKTtcblxuZnVuY3Rpb24gaXNOdWxsKHN1YmplY3QpIHtcbiAgcmV0dXJuIHN1YmplY3QgPT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzSFRNTEVsZW1lbnQoc3ViamVjdCkge1xuICByZXR1cm4gc3ViamVjdCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xufVxuXG5mdW5jdGlvbiB0b0FycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaCh2YWx1ZXMsIGl0ZXJhdGVlKSB7XG4gIHRvQXJyYXkodmFsdWVzKS5mb3JFYWNoKGl0ZXJhdGVlKTtcbn1cblxuZnVuY3Rpb24gaW5jbHVkZXMoYXJyYXksIHZhbHVlKSB7XG4gIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlKSA+IC0xO1xufVxuXG5mdW5jdGlvbiBwdXNoKGFycmF5LCBpdGVtcykge1xuICBhcnJheS5wdXNoLmFwcGx5KGFycmF5LCB0b0FycmF5KGl0ZW1zKSk7XG4gIHJldHVybiBhcnJheTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWxtLCBjbGFzc2VzLCBhZGQpIHtcbiAgaWYgKGVsbSkge1xuICAgIGZvckVhY2goY2xhc3NlcywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgIGVsbS5jbGFzc0xpc3RbYWRkID8gXCJhZGRcIiA6IFwicmVtb3ZlXCJdKG5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzKGVsbSwgY2xhc3Nlcykge1xuICB0b2dnbGVDbGFzcyhlbG0sIGlzU3RyaW5nKGNsYXNzZXMpID8gY2xhc3Nlcy5zcGxpdChcIiBcIikgOiBjbGFzc2VzLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kKHBhcmVudCwgY2hpbGRyZW4pIHtcbiAgZm9yRWFjaChjaGlsZHJlbiwgcGFyZW50LmFwcGVuZENoaWxkLmJpbmQocGFyZW50KSk7XG59XG5cbmZ1bmN0aW9uIGJlZm9yZShub2RlcywgcmVmKSB7XG4gIGZvckVhY2gobm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIHBhcmVudCA9IChyZWYgfHwgbm9kZSkucGFyZW50Tm9kZTtcblxuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgcmVmKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVzKGVsbSwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGlzSFRNTEVsZW1lbnQoZWxtKSAmJiAoZWxtW1wibXNNYXRjaGVzU2VsZWN0b3JcIl0gfHwgZWxtLm1hdGNoZXMpLmNhbGwoZWxtLCBzZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIGNoaWxkcmVuKHBhcmVudCwgc2VsZWN0b3IpIHtcbiAgdmFyIGNoaWxkcmVuMiA9IHBhcmVudCA/IHNsaWNlKHBhcmVudC5jaGlsZHJlbikgOiBbXTtcbiAgcmV0dXJuIHNlbGVjdG9yID8gY2hpbGRyZW4yLmZpbHRlcihmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICByZXR1cm4gbWF0Y2hlcyhjaGlsZCwgc2VsZWN0b3IpO1xuICB9KSA6IGNoaWxkcmVuMjtcbn1cblxuZnVuY3Rpb24gY2hpbGQocGFyZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gc2VsZWN0b3IgPyBjaGlsZHJlbihwYXJlbnQsIHNlbGVjdG9yKVswXSA6IHBhcmVudC5maXJzdEVsZW1lbnRDaGlsZDtcbn1cblxudmFyIG93bktleXMgPSBPYmplY3Qua2V5cztcblxuZnVuY3Rpb24gZm9yT3duKG9iamVjdCwgaXRlcmF0ZWUsIHJpZ2h0KSB7XG4gIGlmIChvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IG93bktleXMob2JqZWN0KTtcbiAgICBrZXlzID0gcmlnaHQgPyBrZXlzLnJldmVyc2UoKSA6IGtleXM7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICBpZiAoa2V5ICE9PSBcIl9fcHJvdG9fX1wiKSB7XG4gICAgICAgIGlmIChpdGVyYXRlZShvYmplY3Rba2V5XSwga2V5KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59XG5cbmZ1bmN0aW9uIGFzc2lnbihvYmplY3QpIHtcbiAgc2xpY2UoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICBmb3JPd24oc291cmNlLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgb2JqZWN0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbmZ1bmN0aW9uIG1lcmdlKG9iamVjdCkge1xuICBzbGljZShhcmd1bWVudHMsIDEpLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgIGZvck93bihzb3VyY2UsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZS5zbGljZSgpO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSBtZXJnZSh7fSwgaXNPYmplY3Qob2JqZWN0W2tleV0pID8gb2JqZWN0W2tleV0gOiB7fSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbmZ1bmN0aW9uIG9taXQob2JqZWN0LCBrZXlzKSB7XG4gIHRvQXJyYXkoa2V5cyB8fCBvd25LZXlzKG9iamVjdCkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUF0dHJpYnV0ZShlbG1zLCBhdHRycykge1xuICBmb3JFYWNoKGVsbXMsIGZ1bmN0aW9uIChlbG0pIHtcbiAgICBmb3JFYWNoKGF0dHJzLCBmdW5jdGlvbiAoYXR0cikge1xuICAgICAgZWxtICYmIGVsbS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGUoZWxtcywgYXR0cnMsIHZhbHVlKSB7XG4gIGlmIChpc09iamVjdChhdHRycykpIHtcbiAgICBmb3JPd24oYXR0cnMsIGZ1bmN0aW9uICh2YWx1ZTIsIG5hbWUpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShlbG1zLCBuYW1lLCB2YWx1ZTIpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGZvckVhY2goZWxtcywgZnVuY3Rpb24gKGVsbSkge1xuICAgICAgaXNOdWxsKHZhbHVlKSB8fCB2YWx1ZSA9PT0gXCJcIiA/IHJlbW92ZUF0dHJpYnV0ZShlbG0sIGF0dHJzKSA6IGVsbS5zZXRBdHRyaWJ1dGUoYXR0cnMsIFN0cmluZyh2YWx1ZSkpO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSh0YWcsIGF0dHJzLCBwYXJlbnQpIHtcbiAgdmFyIGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuICBpZiAoYXR0cnMpIHtcbiAgICBpc1N0cmluZyhhdHRycykgPyBhZGRDbGFzcyhlbG0sIGF0dHJzKSA6IHNldEF0dHJpYnV0ZShlbG0sIGF0dHJzKTtcbiAgfVxuXG4gIHBhcmVudCAmJiBhcHBlbmQocGFyZW50LCBlbG0pO1xuICByZXR1cm4gZWxtO1xufVxuXG5mdW5jdGlvbiBzdHlsZShlbG0sIHByb3AsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShlbG0pW3Byb3BdO1xuICB9XG5cbiAgaWYgKCFpc051bGwodmFsdWUpKSB7XG4gICAgZWxtLnN0eWxlW3Byb3BdID0gXCJcIiArIHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXkoZWxtLCBkaXNwbGF5Mikge1xuICBzdHlsZShlbG0sIFwiZGlzcGxheVwiLCBkaXNwbGF5Mik7XG59XG5cbmZ1bmN0aW9uIGZvY3VzKGVsbSkge1xuICBlbG1bXCJzZXRBY3RpdmVcIl0gJiYgZWxtW1wic2V0QWN0aXZlXCJdKCkgfHwgZWxtLmZvY3VzKHtcbiAgICBwcmV2ZW50U2Nyb2xsOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGUoZWxtLCBhdHRyKSB7XG4gIHJldHVybiBlbG0uZ2V0QXR0cmlidXRlKGF0dHIpO1xufVxuXG5mdW5jdGlvbiBoYXNDbGFzcyhlbG0sIGNsYXNzTmFtZSkge1xuICByZXR1cm4gZWxtICYmIGVsbS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbn1cblxuZnVuY3Rpb24gcmVjdCh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKG5vZGVzKSB7XG4gIGZvckVhY2gobm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKG5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VIdG1sKGh0bWwpIHtcbiAgcmV0dXJuIGNoaWxkKG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIikuYm9keSk7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnQoZSwgc3RvcFByb3BhZ2F0aW9uKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBpZiAoc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5KHBhcmVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHBhcmVudCAmJiBwYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsKHBhcmVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID8gc2xpY2UocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSA6IFtdO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhlbG0sIGNsYXNzZXMpIHtcbiAgdG9nZ2xlQ2xhc3MoZWxtLCBjbGFzc2VzLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHRpbWVPZihlKSB7XG4gIHJldHVybiBlLnRpbWVTdGFtcDtcbn1cblxuZnVuY3Rpb24gdW5pdCh2YWx1ZSkge1xuICByZXR1cm4gaXNTdHJpbmcodmFsdWUpID8gdmFsdWUgOiB2YWx1ZSA/IHZhbHVlICsgXCJweFwiIDogXCJcIjtcbn1cblxudmFyIFBST0pFQ1RfQ09ERSA9IFwic3BsaWRlXCI7XG52YXIgREFUQV9BVFRSSUJVVEUgPSBcImRhdGEtXCIgKyBQUk9KRUNUX0NPREU7XG5cbmZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJbXCIgKyBQUk9KRUNUX0NPREUgKyBcIl0gXCIgKyAobWVzc2FnZSB8fCBcIlwiKSk7XG4gIH1cbn1cblxudmFyIG1pbiA9IE1hdGgubWluLFxuICAgIG1heCA9IE1hdGgubWF4LFxuICAgIGZsb29yID0gTWF0aC5mbG9vcixcbiAgICBjZWlsID0gTWF0aC5jZWlsLFxuICAgIGFicyA9IE1hdGguYWJzO1xuXG5mdW5jdGlvbiBhcHByb3hpbWF0ZWx5RXF1YWwoeCwgeSwgZXBzaWxvbikge1xuICByZXR1cm4gYWJzKHggLSB5KSA8IGVwc2lsb247XG59XG5cbmZ1bmN0aW9uIGJldHdlZW4obnVtYmVyLCBtaW5Pck1heCwgbWF4T3JNaW4sIGV4Y2x1c2l2ZSkge1xuICB2YXIgbWluaW11bSA9IG1pbihtaW5Pck1heCwgbWF4T3JNaW4pO1xuICB2YXIgbWF4aW11bSA9IG1heChtaW5Pck1heCwgbWF4T3JNaW4pO1xuICByZXR1cm4gZXhjbHVzaXZlID8gbWluaW11bSA8IG51bWJlciAmJiBudW1iZXIgPCBtYXhpbXVtIDogbWluaW11bSA8PSBudW1iZXIgJiYgbnVtYmVyIDw9IG1heGltdW07XG59XG5cbmZ1bmN0aW9uIGNsYW1wKG51bWJlciwgeCwgeSkge1xuICB2YXIgbWluaW11bSA9IG1pbih4LCB5KTtcbiAgdmFyIG1heGltdW0gPSBtYXgoeCwgeSk7XG4gIHJldHVybiBtaW4obWF4KG1pbmltdW0sIG51bWJlciksIG1heGltdW0pO1xufVxuXG5mdW5jdGlvbiBzaWduKHgpIHtcbiAgcmV0dXJuICsoeCA+IDApIC0gKyh4IDwgMCk7XG59XG5cbmZ1bmN0aW9uIGNhbWVsVG9LZWJhYihzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2EtejAtOV0pKFtBLVpdKS9nLCBcIiQxLSQyXCIpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdChzdHJpbmcsIHJlcGxhY2VtZW50cykge1xuICBmb3JFYWNoKHJlcGxhY2VtZW50cywgZnVuY3Rpb24gKHJlcGxhY2VtZW50KSB7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoXCIlc1wiLCBcIlwiICsgcmVwbGFjZW1lbnQpO1xuICB9KTtcbiAgcmV0dXJuIHN0cmluZztcbn1cblxuZnVuY3Rpb24gcGFkKG51bWJlcikge1xuICByZXR1cm4gbnVtYmVyIDwgMTAgPyBcIjBcIiArIG51bWJlciA6IFwiXCIgKyBudW1iZXI7XG59XG5cbnZhciBpZHMgPSB7fTtcblxuZnVuY3Rpb24gdW5pcXVlSWQocHJlZml4KSB7XG4gIHJldHVybiBcIlwiICsgcHJlZml4ICsgcGFkKGlkc1twcmVmaXhdID0gKGlkc1twcmVmaXhdIHx8IDApICsgMSk7XG59XG5cbmZ1bmN0aW9uIEV2ZW50QmluZGVyKCkge1xuICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgZnVuY3Rpb24gYmluZCh0YXJnZXRzLCBldmVudHMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgZm9yRWFjaEV2ZW50KHRhcmdldHMsIGV2ZW50cywgZnVuY3Rpb24gKHRhcmdldCwgZXZlbnQsIG5hbWVzcGFjZSkge1xuICAgICAgdmFyIGlzRXZlbnRUYXJnZXQgPSAoXCJhZGRFdmVudExpc3RlbmVyXCIgaW4gdGFyZ2V0KTtcbiAgICAgIHZhciByZW1vdmVyID0gaXNFdmVudFRhcmdldCA/IHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyLmJpbmQodGFyZ2V0LCBldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMpIDogdGFyZ2V0W1wicmVtb3ZlTGlzdGVuZXJcIl0uYmluZCh0YXJnZXQsIGNhbGxiYWNrKTtcbiAgICAgIGlzRXZlbnRUYXJnZXQgPyB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMpIDogdGFyZ2V0W1wiYWRkTGlzdGVuZXJcIl0oY2FsbGJhY2spO1xuICAgICAgbGlzdGVuZXJzLnB1c2goW3RhcmdldCwgZXZlbnQsIG5hbWVzcGFjZSwgY2FsbGJhY2ssIHJlbW92ZXJdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuYmluZCh0YXJnZXRzLCBldmVudHMsIGNhbGxiYWNrKSB7XG4gICAgZm9yRWFjaEV2ZW50KHRhcmdldHMsIGV2ZW50cywgZnVuY3Rpb24gKHRhcmdldCwgZXZlbnQsIG5hbWVzcGFjZSkge1xuICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyWzBdID09PSB0YXJnZXQgJiYgbGlzdGVuZXJbMV0gPT09IGV2ZW50ICYmIGxpc3RlbmVyWzJdID09PSBuYW1lc3BhY2UgJiYgKCFjYWxsYmFjayB8fCBsaXN0ZW5lclszXSA9PT0gY2FsbGJhY2spKSB7XG4gICAgICAgICAgbGlzdGVuZXJbNF0oKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGF0Y2godGFyZ2V0LCB0eXBlLCBkZXRhaWwpIHtcbiAgICB2YXIgZTtcbiAgICB2YXIgYnViYmxlcyA9IHRydWU7XG5cbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGUgPSBuZXcgQ3VzdG9tRXZlbnQodHlwZSwge1xuICAgICAgICBidWJibGVzOiBidWJibGVzLFxuICAgICAgICBkZXRhaWw6IGRldGFpbFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgYnViYmxlcywgZmFsc2UsIGRldGFpbCk7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgcmV0dXJuIGU7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JFYWNoRXZlbnQodGFyZ2V0cywgZXZlbnRzLCBpdGVyYXRlZSkge1xuICAgIGZvckVhY2godGFyZ2V0cywgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgdGFyZ2V0ICYmIGZvckVhY2goZXZlbnRzLCBmdW5jdGlvbiAoZXZlbnRzMikge1xuICAgICAgICBldmVudHMyLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5TKSB7XG4gICAgICAgICAgdmFyIGZyYWdtZW50ID0gZXZlbnROUy5zcGxpdChcIi5cIik7XG4gICAgICAgICAgaXRlcmF0ZWUodGFyZ2V0LCBmcmFnbWVudFswXSwgZnJhZ21lbnRbMV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgZGF0YVs0XSgpO1xuICAgIH0pO1xuICAgIGVtcHR5KGxpc3RlbmVycyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJpbmQ6IGJpbmQsXG4gICAgdW5iaW5kOiB1bmJpbmQsXG4gICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfTtcbn1cblxudmFyIEVWRU5UX01PVU5URUQgPSBcIm1vdW50ZWRcIjtcbnZhciBFVkVOVF9SRUFEWSA9IFwicmVhZHlcIjtcbnZhciBFVkVOVF9NT1ZFID0gXCJtb3ZlXCI7XG52YXIgRVZFTlRfTU9WRUQgPSBcIm1vdmVkXCI7XG52YXIgRVZFTlRfU0hJRlRFRCA9IFwic2hpZnRlZFwiO1xudmFyIEVWRU5UX0NMSUNLID0gXCJjbGlja1wiO1xudmFyIEVWRU5UX0FDVElWRSA9IFwiYWN0aXZlXCI7XG52YXIgRVZFTlRfSU5BQ1RJVkUgPSBcImluYWN0aXZlXCI7XG52YXIgRVZFTlRfVklTSUJMRSA9IFwidmlzaWJsZVwiO1xudmFyIEVWRU5UX0hJRERFTiA9IFwiaGlkZGVuXCI7XG52YXIgRVZFTlRfU0xJREVfS0VZRE9XTiA9IFwic2xpZGU6a2V5ZG93blwiO1xudmFyIEVWRU5UX1JFRlJFU0ggPSBcInJlZnJlc2hcIjtcbnZhciBFVkVOVF9VUERBVEVEID0gXCJ1cGRhdGVkXCI7XG52YXIgRVZFTlRfUkVTSVpFID0gXCJyZXNpemVcIjtcbnZhciBFVkVOVF9SRVNJWkVEID0gXCJyZXNpemVkXCI7XG52YXIgRVZFTlRfRFJBRyA9IFwiZHJhZ1wiO1xudmFyIEVWRU5UX0RSQUdHSU5HID0gXCJkcmFnZ2luZ1wiO1xudmFyIEVWRU5UX0RSQUdHRUQgPSBcImRyYWdnZWRcIjtcbnZhciBFVkVOVF9TQ1JPTEwgPSBcInNjcm9sbFwiO1xudmFyIEVWRU5UX1NDUk9MTEVEID0gXCJzY3JvbGxlZFwiO1xudmFyIEVWRU5UX0RFU1RST1kgPSBcImRlc3Ryb3lcIjtcbnZhciBFVkVOVF9BUlJPV1NfTU9VTlRFRCA9IFwiYXJyb3dzOm1vdW50ZWRcIjtcbnZhciBFVkVOVF9BUlJPV1NfVVBEQVRFRCA9IFwiYXJyb3dzOnVwZGF0ZWRcIjtcbnZhciBFVkVOVF9QQUdJTkFUSU9OX01PVU5URUQgPSBcInBhZ2luYXRpb246bW91bnRlZFwiO1xudmFyIEVWRU5UX1BBR0lOQVRJT05fVVBEQVRFRCA9IFwicGFnaW5hdGlvbjp1cGRhdGVkXCI7XG52YXIgRVZFTlRfTkFWSUdBVElPTl9NT1VOVEVEID0gXCJuYXZpZ2F0aW9uOm1vdW50ZWRcIjtcbnZhciBFVkVOVF9BVVRPUExBWV9QTEFZID0gXCJhdXRvcGxheTpwbGF5XCI7XG52YXIgRVZFTlRfQVVUT1BMQVlfUExBWUlORyA9IFwiYXV0b3BsYXk6cGxheWluZ1wiO1xudmFyIEVWRU5UX0FVVE9QTEFZX1BBVVNFID0gXCJhdXRvcGxheTpwYXVzZVwiO1xudmFyIEVWRU5UX0xBWllMT0FEX0xPQURFRCA9IFwibGF6eWxvYWQ6bG9hZGVkXCI7XG5cbmZ1bmN0aW9uIEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpIHtcbiAgdmFyIGJ1cyA9IFNwbGlkZTIgPyBTcGxpZGUyLmV2ZW50LmJ1cyA6IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgdmFyIGJpbmRlciA9IEV2ZW50QmluZGVyKCk7XG5cbiAgZnVuY3Rpb24gb24oZXZlbnRzLCBjYWxsYmFjaykge1xuICAgIGJpbmRlci5iaW5kKGJ1cywgdG9BcnJheShldmVudHMpLmpvaW4oXCIgXCIpLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY2FsbGJhY2suYXBwbHkoY2FsbGJhY2ssIGlzQXJyYXkoZS5kZXRhaWwpID8gZS5kZXRhaWwgOiBbXSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KGV2ZW50KSB7XG4gICAgYmluZGVyLmRpc3BhdGNoKGJ1cywgZXZlbnQsIHNsaWNlKGFyZ3VtZW50cywgMSkpO1xuICB9XG5cbiAgaWYgKFNwbGlkZTIpIHtcbiAgICBTcGxpZGUyLmV2ZW50Lm9uKEVWRU5UX0RFU1RST1ksIGJpbmRlci5kZXN0cm95KTtcbiAgfVxuXG4gIHJldHVybiBhc3NpZ24oYmluZGVyLCB7XG4gICAgYnVzOiBidXMsXG4gICAgb246IG9uLFxuICAgIG9mZjogYXBwbHkoYmluZGVyLnVuYmluZCwgYnVzKSxcbiAgICBlbWl0OiBlbWl0XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBSZXF1ZXN0SW50ZXJ2YWwoaW50ZXJ2YWwsIG9uSW50ZXJ2YWwsIG9uVXBkYXRlLCBsaW1pdCkge1xuICB2YXIgbm93ID0gRGF0ZS5ub3c7XG4gIHZhciBzdGFydFRpbWU7XG4gIHZhciByYXRlID0gMDtcbiAgdmFyIGlkO1xuICB2YXIgcGF1c2VkID0gdHJ1ZTtcbiAgdmFyIGNvdW50ID0gMDtcblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgaWYgKCFwYXVzZWQpIHtcbiAgICAgIHJhdGUgPSBpbnRlcnZhbCA/IG1pbigobm93KCkgLSBzdGFydFRpbWUpIC8gaW50ZXJ2YWwsIDEpIDogMTtcbiAgICAgIG9uVXBkYXRlICYmIG9uVXBkYXRlKHJhdGUpO1xuXG4gICAgICBpZiAocmF0ZSA+PSAxKSB7XG4gICAgICAgIG9uSW50ZXJ2YWwoKTtcbiAgICAgICAgc3RhcnRUaW1lID0gbm93KCk7XG5cbiAgICAgICAgaWYgKGxpbWl0ICYmICsrY291bnQgPj0gbGltaXQpIHtcbiAgICAgICAgICByZXR1cm4gcGF1c2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByYWYodXBkYXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydChyZXN1bWUpIHtcbiAgICAhcmVzdW1lICYmIGNhbmNlbCgpO1xuICAgIHN0YXJ0VGltZSA9IG5vdygpIC0gKHJlc3VtZSA/IHJhdGUgKiBpbnRlcnZhbCA6IDApO1xuICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgIHJhZih1cGRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgcGF1c2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJld2luZCgpIHtcbiAgICBzdGFydFRpbWUgPSBub3coKTtcbiAgICByYXRlID0gMDtcblxuICAgIGlmIChvblVwZGF0ZSkge1xuICAgICAgb25VcGRhdGUocmF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlkICYmIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKTtcbiAgICByYXRlID0gMDtcbiAgICBpZCA9IDA7XG4gICAgcGF1c2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldCh0aW1lKSB7XG4gICAgaW50ZXJ2YWwgPSB0aW1lO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNQYXVzZWQoKSB7XG4gICAgcmV0dXJuIHBhdXNlZDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IHN0YXJ0LFxuICAgIHJld2luZDogcmV3aW5kLFxuICAgIHBhdXNlOiBwYXVzZSxcbiAgICBjYW5jZWw6IGNhbmNlbCxcbiAgICBzZXQ6IHNldCxcbiAgICBpc1BhdXNlZDogaXNQYXVzZWRcbiAgfTtcbn1cblxuZnVuY3Rpb24gU3RhdGUoaW5pdGlhbFN0YXRlKSB7XG4gIHZhciBzdGF0ZSA9IGluaXRpYWxTdGF0ZTtcblxuICBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICBzdGF0ZSA9IHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gaXMoc3RhdGVzKSB7XG4gICAgcmV0dXJuIGluY2x1ZGVzKHRvQXJyYXkoc3RhdGVzKSwgc3RhdGUpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZXQ6IHNldCxcbiAgICBpczogaXNcbiAgfTtcbn1cblxuZnVuY3Rpb24gVGhyb3R0bGUoZnVuYywgZHVyYXRpb24pIHtcbiAgdmFyIGludGVydmFsO1xuXG4gIGZ1bmN0aW9uIHRocm90dGxlZCgpIHtcbiAgICBpZiAoIWludGVydmFsKSB7XG4gICAgICBpbnRlcnZhbCA9IFJlcXVlc3RJbnRlcnZhbChkdXJhdGlvbiB8fCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmMoKTtcbiAgICAgICAgaW50ZXJ2YWwgPSBudWxsO1xuICAgICAgfSwgbnVsbCwgMSk7XG4gICAgICBpbnRlcnZhbC5zdGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aHJvdHRsZWQ7XG59XG5cbmZ1bmN0aW9uIE1lZGlhKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBzdGF0ZSA9IFNwbGlkZTIuc3RhdGU7XG4gIHZhciBicmVha3BvaW50cyA9IG9wdGlvbnMuYnJlYWtwb2ludHMgfHwge307XG4gIHZhciByZWR1Y2VkTW90aW9uID0gb3B0aW9ucy5yZWR1Y2VkTW90aW9uIHx8IHt9O1xuICB2YXIgYmluZGVyID0gRXZlbnRCaW5kZXIoKTtcbiAgdmFyIHF1ZXJpZXMgPSBbXTtcblxuICBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICB2YXIgaXNNaW4gPSBvcHRpb25zLm1lZGlhUXVlcnkgPT09IFwibWluXCI7XG4gICAgb3duS2V5cyhicmVha3BvaW50cykuc29ydChmdW5jdGlvbiAobiwgbSkge1xuICAgICAgcmV0dXJuIGlzTWluID8gK24gLSArbSA6ICttIC0gK247XG4gICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZWdpc3RlcihicmVha3BvaW50c1trZXldLCBcIihcIiArIChpc01pbiA/IFwibWluXCIgOiBcIm1heFwiKSArIFwiLXdpZHRoOlwiICsga2V5ICsgXCJweClcIik7XG4gICAgfSk7XG4gICAgcmVnaXN0ZXIocmVkdWNlZE1vdGlvbiwgTUVESUFfUFJFRkVSU19SRURVQ0VEX01PVElPTik7XG4gICAgdXBkYXRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KGNvbXBsZXRlbHkpIHtcbiAgICBpZiAoY29tcGxldGVseSkge1xuICAgICAgYmluZGVyLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlcihvcHRpb25zMiwgcXVlcnkpIHtcbiAgICB2YXIgcXVlcnlMaXN0ID0gbWF0Y2hNZWRpYShxdWVyeSk7XG4gICAgYmluZGVyLmJpbmQocXVlcnlMaXN0LCBcImNoYW5nZVwiLCB1cGRhdGUpO1xuICAgIHF1ZXJpZXMucHVzaChbb3B0aW9uczIsIHF1ZXJ5TGlzdF0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHZhciBkZXN0cm95ZWQgPSBzdGF0ZS5pcyhERVNUUk9ZRUQpO1xuICAgIHZhciBkaXJlY3Rpb24gPSBvcHRpb25zLmRpcmVjdGlvbjtcbiAgICB2YXIgbWVyZ2VkID0gcXVlcmllcy5yZWR1Y2UoZnVuY3Rpb24gKG1lcmdlZDIsIGVudHJ5KSB7XG4gICAgICByZXR1cm4gbWVyZ2UobWVyZ2VkMiwgZW50cnlbMV0ubWF0Y2hlcyA/IGVudHJ5WzBdIDoge30pO1xuICAgIH0sIHt9KTtcbiAgICBvbWl0KG9wdGlvbnMpO1xuICAgIHNldChtZXJnZWQpO1xuXG4gICAgaWYgKG9wdGlvbnMuZGVzdHJveSkge1xuICAgICAgU3BsaWRlMi5kZXN0cm95KG9wdGlvbnMuZGVzdHJveSA9PT0gXCJjb21wbGV0ZWx5XCIpO1xuICAgIH0gZWxzZSBpZiAoZGVzdHJveWVkKSB7XG4gICAgICBkZXN0cm95KHRydWUpO1xuICAgICAgU3BsaWRlMi5tb3VudCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3Rpb24gIT09IG9wdGlvbnMuZGlyZWN0aW9uICYmIFNwbGlkZTIucmVmcmVzaCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZHVjZShlbmFibGUpIHtcbiAgICBpZiAobWF0Y2hNZWRpYShNRURJQV9QUkVGRVJTX1JFRFVDRURfTU9USU9OKS5tYXRjaGVzKSB7XG4gICAgICBlbmFibGUgPyBtZXJnZShvcHRpb25zLCByZWR1Y2VkTW90aW9uKSA6IG9taXQob3B0aW9ucywgb3duS2V5cyhyZWR1Y2VkTW90aW9uKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0KG9wdHMsIHVzZXIpIHtcbiAgICBtZXJnZShvcHRpb25zLCBvcHRzKTtcbiAgICB1c2VyICYmIG1lcmdlKE9iamVjdC5nZXRQcm90b3R5cGVPZihvcHRpb25zKSwgb3B0cyk7XG5cbiAgICBpZiAoIXN0YXRlLmlzKENSRUFURUQpKSB7XG4gICAgICBTcGxpZGUyLmVtaXQoRVZFTlRfVVBEQVRFRCwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZXR1cDogc2V0dXAsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICByZWR1Y2U6IHJlZHVjZSxcbiAgICBzZXQ6IHNldFxuICB9O1xufVxuXG52YXIgQVJST1cgPSBcIkFycm93XCI7XG52YXIgQVJST1dfTEVGVCA9IEFSUk9XICsgXCJMZWZ0XCI7XG52YXIgQVJST1dfUklHSFQgPSBBUlJPVyArIFwiUmlnaHRcIjtcbnZhciBBUlJPV19VUCA9IEFSUk9XICsgXCJVcFwiO1xudmFyIEFSUk9XX0RPV04gPSBBUlJPVyArIFwiRG93blwiO1xudmFyIExUUiA9IFwibHRyXCI7XG52YXIgUlRMID0gXCJydGxcIjtcbnZhciBUVEIgPSBcInR0YlwiO1xudmFyIE9SSUVOVEFUSU9OX01BUCA9IHtcbiAgd2lkdGg6IFtcImhlaWdodFwiXSxcbiAgbGVmdDogW1widG9wXCIsIFwicmlnaHRcIl0sXG4gIHJpZ2h0OiBbXCJib3R0b21cIiwgXCJsZWZ0XCJdLFxuICB4OiBbXCJ5XCJdLFxuICBYOiBbXCJZXCJdLFxuICBZOiBbXCJYXCJdLFxuICBBcnJvd0xlZnQ6IFtBUlJPV19VUCwgQVJST1dfUklHSFRdLFxuICBBcnJvd1JpZ2h0OiBbQVJST1dfRE9XTiwgQVJST1dfTEVGVF1cbn07XG5cbmZ1bmN0aW9uIERpcmVjdGlvbihTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICBmdW5jdGlvbiByZXNvbHZlKHByb3AsIGF4aXNPbmx5LCBkaXJlY3Rpb24pIHtcbiAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gfHwgb3B0aW9ucy5kaXJlY3Rpb247XG4gICAgdmFyIGluZGV4ID0gZGlyZWN0aW9uID09PSBSVEwgJiYgIWF4aXNPbmx5ID8gMSA6IGRpcmVjdGlvbiA9PT0gVFRCID8gMCA6IC0xO1xuICAgIHJldHVybiBPUklFTlRBVElPTl9NQVBbcHJvcF0gJiYgT1JJRU5UQVRJT05fTUFQW3Byb3BdW2luZGV4XSB8fCBwcm9wLnJlcGxhY2UoL3dpZHRofGxlZnR8cmlnaHQvaSwgZnVuY3Rpb24gKG1hdGNoLCBvZmZzZXQpIHtcbiAgICAgIHZhciByZXBsYWNlbWVudCA9IE9SSUVOVEFUSU9OX01BUFttYXRjaC50b0xvd2VyQ2FzZSgpXVtpbmRleF0gfHwgbWF0Y2g7XG4gICAgICByZXR1cm4gb2Zmc2V0ID4gMCA/IHJlcGxhY2VtZW50LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmVwbGFjZW1lbnQuc2xpY2UoMSkgOiByZXBsYWNlbWVudDtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9yaWVudCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAqIChvcHRpb25zLmRpcmVjdGlvbiA9PT0gUlRMID8gMSA6IC0xKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICBvcmllbnQ6IG9yaWVudFxuICB9O1xufVxuXG52YXIgUk9MRSA9IFwicm9sZVwiO1xudmFyIFRBQl9JTkRFWCA9IFwidGFiaW5kZXhcIjtcbnZhciBESVNBQkxFRCA9IFwiZGlzYWJsZWRcIjtcbnZhciBBUklBX1BSRUZJWCA9IFwiYXJpYS1cIjtcbnZhciBBUklBX0NPTlRST0xTID0gQVJJQV9QUkVGSVggKyBcImNvbnRyb2xzXCI7XG52YXIgQVJJQV9DVVJSRU5UID0gQVJJQV9QUkVGSVggKyBcImN1cnJlbnRcIjtcbnZhciBBUklBX1NFTEVDVEVEID0gQVJJQV9QUkVGSVggKyBcInNlbGVjdGVkXCI7XG52YXIgQVJJQV9MQUJFTCA9IEFSSUFfUFJFRklYICsgXCJsYWJlbFwiO1xudmFyIEFSSUFfTEFCRUxMRURCWSA9IEFSSUFfUFJFRklYICsgXCJsYWJlbGxlZGJ5XCI7XG52YXIgQVJJQV9ISURERU4gPSBBUklBX1BSRUZJWCArIFwiaGlkZGVuXCI7XG52YXIgQVJJQV9PUklFTlRBVElPTiA9IEFSSUFfUFJFRklYICsgXCJvcmllbnRhdGlvblwiO1xudmFyIEFSSUFfUk9MRURFU0NSSVBUSU9OID0gQVJJQV9QUkVGSVggKyBcInJvbGVkZXNjcmlwdGlvblwiO1xudmFyIEFSSUFfTElWRSA9IEFSSUFfUFJFRklYICsgXCJsaXZlXCI7XG52YXIgQVJJQV9CVVNZID0gQVJJQV9QUkVGSVggKyBcImJ1c3lcIjtcbnZhciBBUklBX0FUT01JQyA9IEFSSUFfUFJFRklYICsgXCJhdG9taWNcIjtcbnZhciBBTExfQVRUUklCVVRFUyA9IFtST0xFLCBUQUJfSU5ERVgsIERJU0FCTEVELCBBUklBX0NPTlRST0xTLCBBUklBX0NVUlJFTlQsIEFSSUFfTEFCRUwsIEFSSUFfTEFCRUxMRURCWSwgQVJJQV9ISURERU4sIEFSSUFfT1JJRU5UQVRJT04sIEFSSUFfUk9MRURFU0NSSVBUSU9OXTtcbnZhciBDTEFTU19ST09UID0gUFJPSkVDVF9DT0RFO1xudmFyIENMQVNTX1RSQUNLID0gUFJPSkVDVF9DT0RFICsgXCJfX3RyYWNrXCI7XG52YXIgQ0xBU1NfTElTVCA9IFBST0pFQ1RfQ09ERSArIFwiX19saXN0XCI7XG52YXIgQ0xBU1NfU0xJREUgPSBQUk9KRUNUX0NPREUgKyBcIl9fc2xpZGVcIjtcbnZhciBDTEFTU19DTE9ORSA9IENMQVNTX1NMSURFICsgXCItLWNsb25lXCI7XG52YXIgQ0xBU1NfQ09OVEFJTkVSID0gQ0xBU1NfU0xJREUgKyBcIl9fY29udGFpbmVyXCI7XG52YXIgQ0xBU1NfQVJST1dTID0gUFJPSkVDVF9DT0RFICsgXCJfX2Fycm93c1wiO1xudmFyIENMQVNTX0FSUk9XID0gUFJPSkVDVF9DT0RFICsgXCJfX2Fycm93XCI7XG52YXIgQ0xBU1NfQVJST1dfUFJFViA9IENMQVNTX0FSUk9XICsgXCItLXByZXZcIjtcbnZhciBDTEFTU19BUlJPV19ORVhUID0gQ0xBU1NfQVJST1cgKyBcIi0tbmV4dFwiO1xudmFyIENMQVNTX1BBR0lOQVRJT04gPSBQUk9KRUNUX0NPREUgKyBcIl9fcGFnaW5hdGlvblwiO1xudmFyIENMQVNTX1BBR0lOQVRJT05fUEFHRSA9IENMQVNTX1BBR0lOQVRJT04gKyBcIl9fcGFnZVwiO1xudmFyIENMQVNTX1BST0dSRVNTID0gUFJPSkVDVF9DT0RFICsgXCJfX3Byb2dyZXNzXCI7XG52YXIgQ0xBU1NfUFJPR1JFU1NfQkFSID0gQ0xBU1NfUFJPR1JFU1MgKyBcIl9fYmFyXCI7XG52YXIgQ0xBU1NfVE9HR0xFID0gUFJPSkVDVF9DT0RFICsgXCJfX3RvZ2dsZVwiO1xudmFyIENMQVNTX1RPR0dMRV9QTEFZID0gQ0xBU1NfVE9HR0xFICsgXCJfX3BsYXlcIjtcbnZhciBDTEFTU19UT0dHTEVfUEFVU0UgPSBDTEFTU19UT0dHTEUgKyBcIl9fcGF1c2VcIjtcbnZhciBDTEFTU19TUElOTkVSID0gUFJPSkVDVF9DT0RFICsgXCJfX3NwaW5uZXJcIjtcbnZhciBDTEFTU19TUiA9IFBST0pFQ1RfQ09ERSArIFwiX19zclwiO1xudmFyIENMQVNTX0lOSVRJQUxJWkVEID0gXCJpcy1pbml0aWFsaXplZFwiO1xudmFyIENMQVNTX0FDVElWRSA9IFwiaXMtYWN0aXZlXCI7XG52YXIgQ0xBU1NfUFJFViA9IFwiaXMtcHJldlwiO1xudmFyIENMQVNTX05FWFQgPSBcImlzLW5leHRcIjtcbnZhciBDTEFTU19WSVNJQkxFID0gXCJpcy12aXNpYmxlXCI7XG52YXIgQ0xBU1NfTE9BRElORyA9IFwiaXMtbG9hZGluZ1wiO1xudmFyIENMQVNTX0ZPQ1VTX0lOID0gXCJpcy1mb2N1cy1pblwiO1xudmFyIFNUQVRVU19DTEFTU0VTID0gW0NMQVNTX0FDVElWRSwgQ0xBU1NfVklTSUJMRSwgQ0xBU1NfUFJFViwgQ0xBU1NfTkVYVCwgQ0xBU1NfTE9BRElORywgQ0xBU1NfRk9DVVNfSU5dO1xudmFyIENMQVNTRVMgPSB7XG4gIHNsaWRlOiBDTEFTU19TTElERSxcbiAgY2xvbmU6IENMQVNTX0NMT05FLFxuICBhcnJvd3M6IENMQVNTX0FSUk9XUyxcbiAgYXJyb3c6IENMQVNTX0FSUk9XLFxuICBwcmV2OiBDTEFTU19BUlJPV19QUkVWLFxuICBuZXh0OiBDTEFTU19BUlJPV19ORVhULFxuICBwYWdpbmF0aW9uOiBDTEFTU19QQUdJTkFUSU9OLFxuICBwYWdlOiBDTEFTU19QQUdJTkFUSU9OX1BBR0UsXG4gIHNwaW5uZXI6IENMQVNTX1NQSU5ORVJcbn07XG5cbmZ1bmN0aW9uIGNsb3Nlc3QoZnJvbSwgc2VsZWN0b3IpIHtcbiAgaWYgKGlzRnVuY3Rpb24oZnJvbS5jbG9zZXN0KSkge1xuICAgIHJldHVybiBmcm9tLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICB9XG5cbiAgdmFyIGVsbSA9IGZyb207XG5cbiAgd2hpbGUgKGVsbSAmJiBlbG0ubm9kZVR5cGUgPT09IDEpIHtcbiAgICBpZiAobWF0Y2hlcyhlbG0sIHNlbGVjdG9yKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZWxtID0gZWxtLnBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gZWxtO1xufVxuXG52YXIgRlJJQ1RJT04gPSA1O1xudmFyIExPR19JTlRFUlZBTCA9IDIwMDtcbnZhciBQT0lOVEVSX0RPV05fRVZFTlRTID0gXCJ0b3VjaHN0YXJ0IG1vdXNlZG93blwiO1xudmFyIFBPSU5URVJfTU9WRV9FVkVOVFMgPSBcInRvdWNobW92ZSBtb3VzZW1vdmVcIjtcbnZhciBQT0lOVEVSX1VQX0VWRU5UUyA9IFwidG91Y2hlbmQgdG91Y2hjYW5jZWwgbW91c2V1cCBjbGlja1wiO1xuXG5mdW5jdGlvbiBFbGVtZW50cyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZS5vbixcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UuYmluZDtcblxuICB2YXIgcm9vdCA9IFNwbGlkZTIucm9vdDtcbiAgdmFyIGkxOG4gPSBvcHRpb25zLmkxOG47XG4gIHZhciBlbGVtZW50cyA9IHt9O1xuICB2YXIgc2xpZGVzID0gW107XG4gIHZhciByb290Q2xhc3NlcyA9IFtdO1xuICB2YXIgdHJhY2tDbGFzc2VzID0gW107XG4gIHZhciB0cmFjaztcbiAgdmFyIGxpc3Q7XG4gIHZhciBpc1VzaW5nS2V5O1xuXG4gIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgIGNvbGxlY3QoKTtcbiAgICBpbml0KCk7XG4gICAgdXBkYXRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBvbihFVkVOVF9SRUZSRVNILCBkZXN0cm95KTtcbiAgICBvbihFVkVOVF9SRUZSRVNILCBzZXR1cCk7XG4gICAgb24oRVZFTlRfVVBEQVRFRCwgdXBkYXRlKTtcbiAgICBiaW5kKGRvY3VtZW50LCBQT0lOVEVSX0RPV05fRVZFTlRTICsgXCIga2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaXNVc2luZ0tleSA9IGUudHlwZSA9PT0gXCJrZXlkb3duXCI7XG4gICAgfSwge1xuICAgICAgY2FwdHVyZTogdHJ1ZVxuICAgIH0pO1xuICAgIGJpbmQocm9vdCwgXCJmb2N1c2luXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRvZ2dsZUNsYXNzKHJvb3QsIENMQVNTX0ZPQ1VTX0lOLCAhIWlzVXNpbmdLZXkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveShjb21wbGV0ZWx5KSB7XG4gICAgdmFyIGF0dHJzID0gQUxMX0FUVFJJQlVURVMuY29uY2F0KFwic3R5bGVcIik7XG4gICAgZW1wdHkoc2xpZGVzKTtcbiAgICByZW1vdmVDbGFzcyhyb290LCByb290Q2xhc3Nlcyk7XG4gICAgcmVtb3ZlQ2xhc3ModHJhY2ssIHRyYWNrQ2xhc3Nlcyk7XG4gICAgcmVtb3ZlQXR0cmlidXRlKFt0cmFjaywgbGlzdF0sIGF0dHJzKTtcbiAgICByZW1vdmVBdHRyaWJ1dGUocm9vdCwgY29tcGxldGVseSA/IGF0dHJzIDogW1wic3R5bGVcIiwgQVJJQV9ST0xFREVTQ1JJUFRJT05dKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICByZW1vdmVDbGFzcyhyb290LCByb290Q2xhc3Nlcyk7XG4gICAgcmVtb3ZlQ2xhc3ModHJhY2ssIHRyYWNrQ2xhc3Nlcyk7XG4gICAgcm9vdENsYXNzZXMgPSBnZXRDbGFzc2VzKENMQVNTX1JPT1QpO1xuICAgIHRyYWNrQ2xhc3NlcyA9IGdldENsYXNzZXMoQ0xBU1NfVFJBQ0spO1xuICAgIGFkZENsYXNzKHJvb3QsIHJvb3RDbGFzc2VzKTtcbiAgICBhZGRDbGFzcyh0cmFjaywgdHJhY2tDbGFzc2VzKTtcbiAgICBzZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9MQUJFTCwgb3B0aW9ucy5sYWJlbCk7XG4gICAgc2V0QXR0cmlidXRlKHJvb3QsIEFSSUFfTEFCRUxMRURCWSwgb3B0aW9ucy5sYWJlbGxlZGJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbGxlY3QoKSB7XG4gICAgdHJhY2sgPSBmaW5kKFwiLlwiICsgQ0xBU1NfVFJBQ0spO1xuICAgIGxpc3QgPSBjaGlsZCh0cmFjaywgXCIuXCIgKyBDTEFTU19MSVNUKTtcbiAgICBhc3NlcnQodHJhY2sgJiYgbGlzdCwgXCJBIHRyYWNrL2xpc3QgZWxlbWVudCBpcyBtaXNzaW5nLlwiKTtcbiAgICBwdXNoKHNsaWRlcywgY2hpbGRyZW4obGlzdCwgXCIuXCIgKyBDTEFTU19TTElERSArIFwiOm5vdCguXCIgKyBDTEFTU19DTE9ORSArIFwiKVwiKSk7XG4gICAgZm9yT3duKHtcbiAgICAgIGFycm93czogQ0xBU1NfQVJST1dTLFxuICAgICAgcGFnaW5hdGlvbjogQ0xBU1NfUEFHSU5BVElPTixcbiAgICAgIHByZXY6IENMQVNTX0FSUk9XX1BSRVYsXG4gICAgICBuZXh0OiBDTEFTU19BUlJPV19ORVhULFxuICAgICAgYmFyOiBDTEFTU19QUk9HUkVTU19CQVIsXG4gICAgICB0b2dnbGU6IENMQVNTX1RPR0dMRVxuICAgIH0sIGZ1bmN0aW9uIChjbGFzc05hbWUsIGtleSkge1xuICAgICAgZWxlbWVudHNba2V5XSA9IGZpbmQoXCIuXCIgKyBjbGFzc05hbWUpO1xuICAgIH0pO1xuICAgIGFzc2lnbihlbGVtZW50cywge1xuICAgICAgcm9vdDogcm9vdCxcbiAgICAgIHRyYWNrOiB0cmFjayxcbiAgICAgIGxpc3Q6IGxpc3QsXG4gICAgICBzbGlkZXM6IHNsaWRlc1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgaWQgPSByb290LmlkIHx8IHVuaXF1ZUlkKFBST0pFQ1RfQ09ERSk7XG4gICAgdmFyIHJvbGUgPSBvcHRpb25zLnJvbGU7XG4gICAgcm9vdC5pZCA9IGlkO1xuICAgIHRyYWNrLmlkID0gdHJhY2suaWQgfHwgaWQgKyBcIi10cmFja1wiO1xuICAgIGxpc3QuaWQgPSBsaXN0LmlkIHx8IGlkICsgXCItbGlzdFwiO1xuXG4gICAgaWYgKCFnZXRBdHRyaWJ1dGUocm9vdCwgUk9MRSkgJiYgcm9vdC50YWdOYW1lICE9PSBcIlNFQ1RJT05cIiAmJiByb2xlKSB7XG4gICAgICBzZXRBdHRyaWJ1dGUocm9vdCwgUk9MRSwgcm9sZSk7XG4gICAgfVxuXG4gICAgc2V0QXR0cmlidXRlKHJvb3QsIEFSSUFfUk9MRURFU0NSSVBUSU9OLCBpMThuLmNhcm91c2VsKTtcbiAgICBzZXRBdHRyaWJ1dGUobGlzdCwgUk9MRSwgXCJwcmVzZW50YXRpb25cIik7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kKHNlbGVjdG9yKSB7XG4gICAgdmFyIGVsbSA9IHF1ZXJ5KHJvb3QsIHNlbGVjdG9yKTtcbiAgICByZXR1cm4gZWxtICYmIGNsb3Nlc3QoZWxtLCBcIi5cIiArIENMQVNTX1JPT1QpID09PSByb290ID8gZWxtIDogdm9pZCAwO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NlcyhiYXNlKSB7XG4gICAgcmV0dXJuIFtiYXNlICsgXCItLVwiICsgb3B0aW9ucy50eXBlLCBiYXNlICsgXCItLVwiICsgb3B0aW9ucy5kaXJlY3Rpb24sIG9wdGlvbnMuZHJhZyAmJiBiYXNlICsgXCItLWRyYWdnYWJsZVwiLCBvcHRpb25zLmlzTmF2aWdhdGlvbiAmJiBiYXNlICsgXCItLW5hdlwiLCBiYXNlID09PSBDTEFTU19ST09UICYmIENMQVNTX0FDVElWRV07XG4gIH1cblxuICByZXR1cm4gYXNzaWduKGVsZW1lbnRzLCB7XG4gICAgc2V0dXA6IHNldHVwLFxuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95XG4gIH0pO1xufVxuXG52YXIgU0xJREUgPSBcInNsaWRlXCI7XG52YXIgTE9PUCA9IFwibG9vcFwiO1xudmFyIEZBREUgPSBcImZhZGVcIjtcblxuZnVuY3Rpb24gU2xpZGUkMShTcGxpZGUyLCBpbmRleCwgc2xpZGVJbmRleCwgc2xpZGUpIHtcbiAgdmFyIGV2ZW50ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMik7XG4gIHZhciBvbiA9IGV2ZW50Lm9uLFxuICAgICAgZW1pdCA9IGV2ZW50LmVtaXQsXG4gICAgICBiaW5kID0gZXZlbnQuYmluZDtcbiAgdmFyIENvbXBvbmVudHMgPSBTcGxpZGUyLkNvbXBvbmVudHMsXG4gICAgICByb290ID0gU3BsaWRlMi5yb290LFxuICAgICAgb3B0aW9ucyA9IFNwbGlkZTIub3B0aW9ucztcbiAgdmFyIGlzTmF2aWdhdGlvbiA9IG9wdGlvbnMuaXNOYXZpZ2F0aW9uLFxuICAgICAgdXBkYXRlT25Nb3ZlID0gb3B0aW9ucy51cGRhdGVPbk1vdmUsXG4gICAgICBpMThuID0gb3B0aW9ucy5pMThuLFxuICAgICAgcGFnaW5hdGlvbiA9IG9wdGlvbnMucGFnaW5hdGlvbixcbiAgICAgIHNsaWRlRm9jdXMgPSBvcHRpb25zLnNsaWRlRm9jdXM7XG4gIHZhciByZXNvbHZlID0gQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZTtcbiAgdmFyIHN0eWxlcyA9IGdldEF0dHJpYnV0ZShzbGlkZSwgXCJzdHlsZVwiKTtcbiAgdmFyIGxhYmVsID0gZ2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0xBQkVMKTtcbiAgdmFyIGlzQ2xvbmUgPSBzbGlkZUluZGV4ID4gLTE7XG4gIHZhciBjb250YWluZXIgPSBjaGlsZChzbGlkZSwgXCIuXCIgKyBDTEFTU19DT05UQUlORVIpO1xuICB2YXIgZGVzdHJveWVkO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmICghaXNDbG9uZSkge1xuICAgICAgc2xpZGUuaWQgPSByb290LmlkICsgXCItc2xpZGVcIiArIHBhZChpbmRleCArIDEpO1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBST0xFLCBwYWdpbmF0aW9uID8gXCJ0YWJwYW5lbFwiIDogXCJncm91cFwiKTtcbiAgICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9ST0xFREVTQ1JJUFRJT04sIGkxOG4uc2xpZGUpO1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0xBQkVMLCBsYWJlbCB8fCBmb3JtYXQoaTE4bi5zbGlkZUxhYmVsLCBbaW5kZXggKyAxLCBTcGxpZGUyLmxlbmd0aF0pKTtcbiAgICB9XG5cbiAgICBsaXN0ZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbigpIHtcbiAgICBiaW5kKHNsaWRlLCBcImNsaWNrXCIsIGFwcGx5KGVtaXQsIEVWRU5UX0NMSUNLLCBzZWxmKSk7XG4gICAgYmluZChzbGlkZSwgXCJrZXlkb3duXCIsIGFwcGx5KGVtaXQsIEVWRU5UX1NMSURFX0tFWURPV04sIHNlbGYpKTtcbiAgICBvbihbRVZFTlRfTU9WRUQsIEVWRU5UX1NISUZURUQsIEVWRU5UX1NDUk9MTEVEXSwgdXBkYXRlKTtcbiAgICBvbihFVkVOVF9OQVZJR0FUSU9OX01PVU5URUQsIGluaXROYXZpZ2F0aW9uKTtcblxuICAgIGlmICh1cGRhdGVPbk1vdmUpIHtcbiAgICAgIG9uKEVWRU5UX01PVkUsIG9uTW92ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBkZXN0cm95ZWQgPSB0cnVlO1xuICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgICByZW1vdmVDbGFzcyhzbGlkZSwgU1RBVFVTX0NMQVNTRVMpO1xuICAgIHJlbW92ZUF0dHJpYnV0ZShzbGlkZSwgQUxMX0FUVFJJQlVURVMpO1xuICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgXCJzdHlsZVwiLCBzdHlsZXMpO1xuICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9MQUJFTCwgbGFiZWwgfHwgXCJcIik7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0TmF2aWdhdGlvbigpIHtcbiAgICB2YXIgY29udHJvbHMgPSBTcGxpZGUyLnNwbGlkZXMubWFwKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIHZhciBTbGlkZTIgPSB0YXJnZXQuc3BsaWRlLkNvbXBvbmVudHMuU2xpZGVzLmdldEF0KGluZGV4KTtcbiAgICAgIHJldHVybiBTbGlkZTIgPyBTbGlkZTIuc2xpZGUuaWQgOiBcIlwiO1xuICAgIH0pLmpvaW4oXCIgXCIpO1xuICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9MQUJFTCwgZm9ybWF0KGkxOG4uc2xpZGVYLCAoaXNDbG9uZSA/IHNsaWRlSW5kZXggOiBpbmRleCkgKyAxKSk7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0NPTlRST0xTLCBjb250cm9scyk7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBST0xFLCBzbGlkZUZvY3VzID8gXCJidXR0b25cIiA6IFwiXCIpO1xuICAgIHNsaWRlRm9jdXMgJiYgcmVtb3ZlQXR0cmlidXRlKHNsaWRlLCBBUklBX1JPTEVERVNDUklQVElPTik7XG4gIH1cblxuICBmdW5jdGlvbiBvbk1vdmUoKSB7XG4gICAgaWYgKCFkZXN0cm95ZWQpIHtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAoIWRlc3Ryb3llZCkge1xuICAgICAgdmFyIGN1cnIgPSBTcGxpZGUyLmluZGV4O1xuICAgICAgdXBkYXRlQWN0aXZpdHkoKTtcbiAgICAgIHVwZGF0ZVZpc2liaWxpdHkoKTtcbiAgICAgIHRvZ2dsZUNsYXNzKHNsaWRlLCBDTEFTU19QUkVWLCBpbmRleCA9PT0gY3VyciAtIDEpO1xuICAgICAgdG9nZ2xlQ2xhc3Moc2xpZGUsIENMQVNTX05FWFQsIGluZGV4ID09PSBjdXJyICsgMSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQWN0aXZpdHkoKSB7XG4gICAgdmFyIGFjdGl2ZSA9IGlzQWN0aXZlKCk7XG5cbiAgICBpZiAoYWN0aXZlICE9PSBoYXNDbGFzcyhzbGlkZSwgQ0xBU1NfQUNUSVZFKSkge1xuICAgICAgdG9nZ2xlQ2xhc3Moc2xpZGUsIENMQVNTX0FDVElWRSwgYWN0aXZlKTtcbiAgICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9DVVJSRU5ULCBpc05hdmlnYXRpb24gJiYgYWN0aXZlIHx8IFwiXCIpO1xuICAgICAgZW1pdChhY3RpdmUgPyBFVkVOVF9BQ1RJVkUgOiBFVkVOVF9JTkFDVElWRSwgc2VsZik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlVmlzaWJpbGl0eSgpIHtcbiAgICB2YXIgdmlzaWJsZSA9IGlzVmlzaWJsZSgpO1xuICAgIHZhciBoaWRkZW4gPSAhdmlzaWJsZSAmJiAoIWlzQWN0aXZlKCkgfHwgaXNDbG9uZSk7XG5cbiAgICBpZiAoIVNwbGlkZTIuc3RhdGUuaXMoW01PVklORywgU0NST0xMSU5HXSkpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9ISURERU4sIGhpZGRlbiB8fCBcIlwiKTtcbiAgICB9XG5cbiAgICBzZXRBdHRyaWJ1dGUocXVlcnlBbGwoc2xpZGUsIG9wdGlvbnMuZm9jdXNhYmxlTm9kZXMgfHwgXCJcIiksIFRBQl9JTkRFWCwgaGlkZGVuID8gLTEgOiBcIlwiKTtcblxuICAgIGlmIChzbGlkZUZvY3VzKSB7XG4gICAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIFRBQl9JTkRFWCwgaGlkZGVuID8gLTEgOiAwKTtcbiAgICB9XG5cbiAgICBpZiAodmlzaWJsZSAhPT0gaGFzQ2xhc3Moc2xpZGUsIENMQVNTX1ZJU0lCTEUpKSB7XG4gICAgICB0b2dnbGVDbGFzcyhzbGlkZSwgQ0xBU1NfVklTSUJMRSwgdmlzaWJsZSk7XG4gICAgICBlbWl0KHZpc2libGUgPyBFVkVOVF9WSVNJQkxFIDogRVZFTlRfSElEREVOLCBzZWxmKTtcbiAgICB9XG5cbiAgICBpZiAoIXZpc2libGUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gc2xpZGUpIHtcbiAgICAgIHZhciBTbGlkZTIgPSBDb21wb25lbnRzLlNsaWRlcy5nZXRBdChTcGxpZGUyLmluZGV4KTtcbiAgICAgIFNsaWRlMiAmJiBmb2N1cyhTbGlkZTIuc2xpZGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0eWxlJDEocHJvcCwgdmFsdWUsIHVzZUNvbnRhaW5lcikge1xuICAgIHN0eWxlKHVzZUNvbnRhaW5lciAmJiBjb250YWluZXIgfHwgc2xpZGUsIHByb3AsIHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHZhciBjdXJyID0gU3BsaWRlMi5pbmRleDtcbiAgICByZXR1cm4gY3VyciA9PT0gaW5kZXggfHwgb3B0aW9ucy5jbG9uZVN0YXR1cyAmJiBjdXJyID09PSBzbGlkZUluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNWaXNpYmxlKCkge1xuICAgIGlmIChTcGxpZGUyLmlzKEZBREUpKSB7XG4gICAgICByZXR1cm4gaXNBY3RpdmUoKTtcbiAgICB9XG5cbiAgICB2YXIgdHJhY2tSZWN0ID0gcmVjdChDb21wb25lbnRzLkVsZW1lbnRzLnRyYWNrKTtcbiAgICB2YXIgc2xpZGVSZWN0ID0gcmVjdChzbGlkZSk7XG4gICAgdmFyIGxlZnQgPSByZXNvbHZlKFwibGVmdFwiLCB0cnVlKTtcbiAgICB2YXIgcmlnaHQgPSByZXNvbHZlKFwicmlnaHRcIiwgdHJ1ZSk7XG4gICAgcmV0dXJuIGZsb29yKHRyYWNrUmVjdFtsZWZ0XSkgPD0gY2VpbChzbGlkZVJlY3RbbGVmdF0pICYmIGZsb29yKHNsaWRlUmVjdFtyaWdodF0pIDw9IGNlaWwodHJhY2tSZWN0W3JpZ2h0XSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1dpdGhpbihmcm9tLCBkaXN0YW5jZSkge1xuICAgIHZhciBkaWZmID0gYWJzKGZyb20gLSBpbmRleCk7XG5cbiAgICBpZiAoIWlzQ2xvbmUgJiYgKG9wdGlvbnMucmV3aW5kIHx8IFNwbGlkZTIuaXMoTE9PUCkpKSB7XG4gICAgICBkaWZmID0gbWluKGRpZmYsIFNwbGlkZTIubGVuZ3RoIC0gZGlmZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpZmYgPD0gZGlzdGFuY2U7XG4gIH1cblxuICB2YXIgc2VsZiA9IHtcbiAgICBpbmRleDogaW5kZXgsXG4gICAgc2xpZGVJbmRleDogc2xpZGVJbmRleCxcbiAgICBzbGlkZTogc2xpZGUsXG4gICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgaXNDbG9uZTogaXNDbG9uZSxcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICB1cGRhdGU6IHVwZGF0ZSxcbiAgICBzdHlsZTogc3R5bGUkMSxcbiAgICBpc1dpdGhpbjogaXNXaXRoaW5cbiAgfTtcbiAgcmV0dXJuIHNlbGY7XG59XG5cbmZ1bmN0aW9uIFNsaWRlcyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMiA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2UyLm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTIuZW1pdCxcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UyLmJpbmQ7XG5cbiAgdmFyIF9Db21wb25lbnRzMiRFbGVtZW50cyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgc2xpZGVzID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzLnNsaWRlcyxcbiAgICAgIGxpc3QgPSBfQ29tcG9uZW50czIkRWxlbWVudHMubGlzdDtcbiAgdmFyIFNsaWRlczIgPSBbXTtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpbml0KCk7XG4gICAgb24oRVZFTlRfUkVGUkVTSCwgZGVzdHJveSk7XG4gICAgb24oRVZFTlRfUkVGUkVTSCwgaW5pdCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzbGlkZSwgaW5kZXgpIHtcbiAgICAgIHJlZ2lzdGVyKHNsaWRlLCBpbmRleCwgLTEpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBmb3JFYWNoJDEoZnVuY3Rpb24gKFNsaWRlMikge1xuICAgICAgU2xpZGUyLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgICBlbXB0eShTbGlkZXMyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBmb3JFYWNoJDEoZnVuY3Rpb24gKFNsaWRlMikge1xuICAgICAgU2xpZGUyLnVwZGF0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXIoc2xpZGUsIGluZGV4LCBzbGlkZUluZGV4KSB7XG4gICAgdmFyIG9iamVjdCA9IFNsaWRlJDEoU3BsaWRlMiwgaW5kZXgsIHNsaWRlSW5kZXgsIHNsaWRlKTtcbiAgICBvYmplY3QubW91bnQoKTtcbiAgICBTbGlkZXMyLnB1c2gob2JqZWN0KTtcbiAgICBTbGlkZXMyLnNvcnQoZnVuY3Rpb24gKFNsaWRlMSwgU2xpZGUyKSB7XG4gICAgICByZXR1cm4gU2xpZGUxLmluZGV4IC0gU2xpZGUyLmluZGV4O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0KGV4Y2x1ZGVDbG9uZXMpIHtcbiAgICByZXR1cm4gZXhjbHVkZUNsb25lcyA/IGZpbHRlcihmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICByZXR1cm4gIVNsaWRlMi5pc0Nsb25lO1xuICAgIH0pIDogU2xpZGVzMjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEluKHBhZ2UpIHtcbiAgICB2YXIgQ29udHJvbGxlciA9IENvbXBvbmVudHMyLkNvbnRyb2xsZXI7XG4gICAgdmFyIGluZGV4ID0gQ29udHJvbGxlci50b0luZGV4KHBhZ2UpO1xuICAgIHZhciBtYXggPSBDb250cm9sbGVyLmhhc0ZvY3VzKCkgPyAxIDogb3B0aW9ucy5wZXJQYWdlO1xuICAgIHJldHVybiBmaWx0ZXIoZnVuY3Rpb24gKFNsaWRlMikge1xuICAgICAgcmV0dXJuIGJldHdlZW4oU2xpZGUyLmluZGV4LCBpbmRleCwgaW5kZXggKyBtYXggLSAxKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEF0KGluZGV4KSB7XG4gICAgcmV0dXJuIGZpbHRlcihpbmRleClbMF07XG4gIH1cblxuICBmdW5jdGlvbiBhZGQoaXRlbXMsIGluZGV4KSB7XG4gICAgZm9yRWFjaChpdGVtcywgZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICBpZiAoaXNTdHJpbmcoc2xpZGUpKSB7XG4gICAgICAgIHNsaWRlID0gcGFyc2VIdG1sKHNsaWRlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzSFRNTEVsZW1lbnQoc2xpZGUpKSB7XG4gICAgICAgIHZhciByZWYgPSBzbGlkZXNbaW5kZXhdO1xuICAgICAgICByZWYgPyBiZWZvcmUoc2xpZGUsIHJlZikgOiBhcHBlbmQobGlzdCwgc2xpZGUpO1xuICAgICAgICBhZGRDbGFzcyhzbGlkZSwgb3B0aW9ucy5jbGFzc2VzLnNsaWRlKTtcbiAgICAgICAgb2JzZXJ2ZUltYWdlcyhzbGlkZSwgYXBwbHkoZW1pdCwgRVZFTlRfUkVTSVpFKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZW1pdChFVkVOVF9SRUZSRVNIKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZSQxKG1hdGNoZXIpIHtcbiAgICByZW1vdmUoZmlsdGVyKG1hdGNoZXIpLm1hcChmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICByZXR1cm4gU2xpZGUyLnNsaWRlO1xuICAgIH0pKTtcbiAgICBlbWl0KEVWRU5UX1JFRlJFU0gpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9yRWFjaCQxKGl0ZXJhdGVlLCBleGNsdWRlQ2xvbmVzKSB7XG4gICAgZ2V0KGV4Y2x1ZGVDbG9uZXMpLmZvckVhY2goaXRlcmF0ZWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyKG1hdGNoZXIpIHtcbiAgICByZXR1cm4gU2xpZGVzMi5maWx0ZXIoaXNGdW5jdGlvbihtYXRjaGVyKSA/IG1hdGNoZXIgOiBmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICByZXR1cm4gaXNTdHJpbmcobWF0Y2hlcikgPyBtYXRjaGVzKFNsaWRlMi5zbGlkZSwgbWF0Y2hlcikgOiBpbmNsdWRlcyh0b0FycmF5KG1hdGNoZXIpLCBTbGlkZTIuaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3R5bGUocHJvcCwgdmFsdWUsIHVzZUNvbnRhaW5lcikge1xuICAgIGZvckVhY2gkMShmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICBTbGlkZTIuc3R5bGUocHJvcCwgdmFsdWUsIHVzZUNvbnRhaW5lcik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBvYnNlcnZlSW1hZ2VzKGVsbSwgY2FsbGJhY2spIHtcbiAgICB2YXIgaW1hZ2VzID0gcXVlcnlBbGwoZWxtLCBcImltZ1wiKTtcbiAgICB2YXIgbGVuZ3RoID0gaW1hZ2VzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgYmluZChpbWcsIFwibG9hZCBlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCEgLS1sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExlbmd0aChleGNsdWRlQ2xvbmVzKSB7XG4gICAgcmV0dXJuIGV4Y2x1ZGVDbG9uZXMgPyBzbGlkZXMubGVuZ3RoIDogU2xpZGVzMi5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBpc0Vub3VnaCgpIHtcbiAgICByZXR1cm4gU2xpZGVzMi5sZW5ndGggPiBvcHRpb25zLnBlclBhZ2U7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHVwZGF0ZTogdXBkYXRlLFxuICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICBnZXQ6IGdldCxcbiAgICBnZXRJbjogZ2V0SW4sXG4gICAgZ2V0QXQ6IGdldEF0LFxuICAgIGFkZDogYWRkLFxuICAgIHJlbW92ZTogcmVtb3ZlJDEsXG4gICAgZm9yRWFjaDogZm9yRWFjaCQxLFxuICAgIGZpbHRlcjogZmlsdGVyLFxuICAgIHN0eWxlOiBzdHlsZSxcbiAgICBnZXRMZW5ndGg6IGdldExlbmd0aCxcbiAgICBpc0Vub3VnaDogaXNFbm91Z2hcbiAgfTtcbn1cblxuZnVuY3Rpb24gTGF5b3V0KFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UzID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTMub24sXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlMy5iaW5kLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTMuZW1pdDtcblxuICB2YXIgU2xpZGVzID0gQ29tcG9uZW50czIuU2xpZGVzO1xuICB2YXIgcmVzb2x2ZSA9IENvbXBvbmVudHMyLkRpcmVjdGlvbi5yZXNvbHZlO1xuICB2YXIgX0NvbXBvbmVudHMyJEVsZW1lbnRzMiA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgcm9vdCA9IF9Db21wb25lbnRzMiRFbGVtZW50czIucm9vdCxcbiAgICAgIHRyYWNrID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzMi50cmFjayxcbiAgICAgIGxpc3QgPSBfQ29tcG9uZW50czIkRWxlbWVudHMyLmxpc3Q7XG4gIHZhciBnZXRBdCA9IFNsaWRlcy5nZXRBdCxcbiAgICAgIHN0eWxlU2xpZGVzID0gU2xpZGVzLnN0eWxlO1xuICB2YXIgdmVydGljYWw7XG4gIHZhciByb290UmVjdDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpbml0KCk7XG4gICAgYmluZCh3aW5kb3csIFwicmVzaXplIGxvYWRcIiwgVGhyb3R0bGUoYXBwbHkoZW1pdCwgRVZFTlRfUkVTSVpFKSkpO1xuICAgIG9uKFtFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNIXSwgaW5pdCk7XG4gICAgb24oRVZFTlRfUkVTSVpFLCByZXNpemUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICByb290UmVjdCA9IG51bGw7XG4gICAgdmVydGljYWwgPSBvcHRpb25zLmRpcmVjdGlvbiA9PT0gVFRCO1xuICAgIHN0eWxlKHJvb3QsIFwibWF4V2lkdGhcIiwgdW5pdChvcHRpb25zLndpZHRoKSk7XG4gICAgc3R5bGUodHJhY2ssIHJlc29sdmUoXCJwYWRkaW5nTGVmdFwiKSwgY3NzUGFkZGluZyhmYWxzZSkpO1xuICAgIHN0eWxlKHRyYWNrLCByZXNvbHZlKFwicGFkZGluZ1JpZ2h0XCIpLCBjc3NQYWRkaW5nKHRydWUpKTtcbiAgICByZXNpemUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICB2YXIgbmV3UmVjdCA9IHJlY3Qocm9vdCk7XG5cbiAgICBpZiAoIXJvb3RSZWN0IHx8IHJvb3RSZWN0LndpZHRoICE9PSBuZXdSZWN0LndpZHRoIHx8IHJvb3RSZWN0LmhlaWdodCAhPT0gbmV3UmVjdC5oZWlnaHQpIHtcbiAgICAgIHN0eWxlKHRyYWNrLCBcImhlaWdodFwiLCBjc3NUcmFja0hlaWdodCgpKTtcbiAgICAgIHN0eWxlU2xpZGVzKHJlc29sdmUoXCJtYXJnaW5SaWdodFwiKSwgdW5pdChvcHRpb25zLmdhcCkpO1xuICAgICAgc3R5bGVTbGlkZXMoXCJ3aWR0aFwiLCBjc3NTbGlkZVdpZHRoKCkpO1xuICAgICAgc3R5bGVTbGlkZXMoXCJoZWlnaHRcIiwgY3NzU2xpZGVIZWlnaHQoKSwgdHJ1ZSk7XG4gICAgICByb290UmVjdCA9IG5ld1JlY3Q7XG4gICAgICBlbWl0KEVWRU5UX1JFU0laRUQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNzc1BhZGRpbmcocmlnaHQpIHtcbiAgICB2YXIgcGFkZGluZyA9IG9wdGlvbnMucGFkZGluZztcbiAgICB2YXIgcHJvcCA9IHJlc29sdmUocmlnaHQgPyBcInJpZ2h0XCIgOiBcImxlZnRcIik7XG4gICAgcmV0dXJuIHBhZGRpbmcgJiYgdW5pdChwYWRkaW5nW3Byb3BdIHx8IChpc09iamVjdChwYWRkaW5nKSA/IDAgOiBwYWRkaW5nKSkgfHwgXCIwcHhcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNzc1RyYWNrSGVpZ2h0KCkge1xuICAgIHZhciBoZWlnaHQgPSBcIlwiO1xuXG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBoZWlnaHQgPSBjc3NIZWlnaHQoKTtcbiAgICAgIGFzc2VydChoZWlnaHQsIFwiaGVpZ2h0IG9yIGhlaWdodFJhdGlvIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgaGVpZ2h0ID0gXCJjYWxjKFwiICsgaGVpZ2h0ICsgXCIgLSBcIiArIGNzc1BhZGRpbmcoZmFsc2UpICsgXCIgLSBcIiArIGNzc1BhZGRpbmcodHJ1ZSkgKyBcIilcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzSGVpZ2h0KCkge1xuICAgIHJldHVybiB1bml0KG9wdGlvbnMuaGVpZ2h0IHx8IHJlY3QobGlzdCkud2lkdGggKiBvcHRpb25zLmhlaWdodFJhdGlvKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNzc1NsaWRlV2lkdGgoKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuYXV0b1dpZHRoID8gbnVsbCA6IHVuaXQob3B0aW9ucy5maXhlZFdpZHRoKSB8fCAodmVydGljYWwgPyBcIlwiIDogY3NzU2xpZGVTaXplKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzU2xpZGVIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHVuaXQob3B0aW9ucy5maXhlZEhlaWdodCkgfHwgKHZlcnRpY2FsID8gb3B0aW9ucy5hdXRvSGVpZ2h0ID8gbnVsbCA6IGNzc1NsaWRlU2l6ZSgpIDogY3NzSGVpZ2h0KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzU2xpZGVTaXplKCkge1xuICAgIHZhciBnYXAgPSB1bml0KG9wdGlvbnMuZ2FwKTtcbiAgICByZXR1cm4gXCJjYWxjKCgxMDAlXCIgKyAoZ2FwICYmIFwiICsgXCIgKyBnYXApICsgXCIpL1wiICsgKG9wdGlvbnMucGVyUGFnZSB8fCAxKSArIChnYXAgJiYgXCIgLSBcIiArIGdhcCkgKyBcIilcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RTaXplKCkge1xuICAgIHJldHVybiByZWN0KGxpc3QpW3Jlc29sdmUoXCJ3aWR0aFwiKV07XG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZVNpemUoaW5kZXgsIHdpdGhvdXRHYXApIHtcbiAgICB2YXIgU2xpZGUgPSBnZXRBdChpbmRleCB8fCAwKTtcbiAgICByZXR1cm4gU2xpZGUgPyByZWN0KFNsaWRlLnNsaWRlKVtyZXNvbHZlKFwid2lkdGhcIildICsgKHdpdGhvdXRHYXAgPyAwIDogZ2V0R2FwKCkpIDogMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvdGFsU2l6ZShpbmRleCwgd2l0aG91dEdhcCkge1xuICAgIHZhciBTbGlkZSA9IGdldEF0KGluZGV4KTtcblxuICAgIGlmIChTbGlkZSkge1xuICAgICAgdmFyIHJpZ2h0ID0gcmVjdChTbGlkZS5zbGlkZSlbcmVzb2x2ZShcInJpZ2h0XCIpXTtcbiAgICAgIHZhciBsZWZ0ID0gcmVjdChsaXN0KVtyZXNvbHZlKFwibGVmdFwiKV07XG4gICAgICByZXR1cm4gYWJzKHJpZ2h0IC0gbGVmdCkgKyAod2l0aG91dEdhcCA/IDAgOiBnZXRHYXAoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZXJTaXplKCkge1xuICAgIHJldHVybiB0b3RhbFNpemUoU3BsaWRlMi5sZW5ndGggLSAxLCB0cnVlKSAtIHRvdGFsU2l6ZSgtMSwgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRHYXAoKSB7XG4gICAgdmFyIFNsaWRlID0gZ2V0QXQoMCk7XG4gICAgcmV0dXJuIFNsaWRlICYmIHBhcnNlRmxvYXQoc3R5bGUoU2xpZGUuc2xpZGUsIHJlc29sdmUoXCJtYXJnaW5SaWdodFwiKSkpIHx8IDA7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYWRkaW5nKHJpZ2h0KSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGUodHJhY2ssIHJlc29sdmUoXCJwYWRkaW5nXCIgKyAocmlnaHQgPyBcIlJpZ2h0XCIgOiBcIkxlZnRcIikpKSkgfHwgMDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGxpc3RTaXplOiBsaXN0U2l6ZSxcbiAgICBzbGlkZVNpemU6IHNsaWRlU2l6ZSxcbiAgICBzbGlkZXJTaXplOiBzbGlkZXJTaXplLFxuICAgIHRvdGFsU2l6ZTogdG90YWxTaXplLFxuICAgIGdldFBhZGRpbmc6IGdldFBhZGRpbmdcbiAgfTtcbn1cblxudmFyIE1VTFRJUExJRVIgPSAyO1xuXG5mdW5jdGlvbiBDbG9uZXMoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlNC5vbixcbiAgICAgIGVtaXQgPSBfRXZlbnRJbnRlcmZhY2U0LmVtaXQ7XG5cbiAgdmFyIEVsZW1lbnRzID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICBTbGlkZXMgPSBDb21wb25lbnRzMi5TbGlkZXM7XG4gIHZhciByZXNvbHZlID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLnJlc29sdmU7XG4gIHZhciBjbG9uZXMgPSBbXTtcbiAgdmFyIGNsb25lQ291bnQ7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaW5pdCgpO1xuICAgIG9uKEVWRU5UX1JFRlJFU0gsIGRlc3Ryb3kpO1xuICAgIG9uKEVWRU5UX1JFRlJFU0gsIGluaXQpO1xuICAgIG9uKFtFVkVOVF9VUERBVEVELCBFVkVOVF9SRVNJWkVdLCBvYnNlcnZlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaWYgKGNsb25lQ291bnQgPSBjb21wdXRlQ2xvbmVDb3VudCgpKSB7XG4gICAgICBnZW5lcmF0ZShjbG9uZUNvdW50KTtcbiAgICAgIGVtaXQoRVZFTlRfUkVTSVpFKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHJlbW92ZShjbG9uZXMpO1xuICAgIGVtcHR5KGNsb25lcyk7XG4gIH1cblxuICBmdW5jdGlvbiBvYnNlcnZlKCkge1xuICAgIGlmIChjbG9uZUNvdW50IDwgY29tcHV0ZUNsb25lQ291bnQoKSkge1xuICAgICAgZW1pdChFVkVOVF9SRUZSRVNIKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZShjb3VudCkge1xuICAgIHZhciBzbGlkZXMgPSBTbGlkZXMuZ2V0KCkuc2xpY2UoKTtcbiAgICB2YXIgbGVuZ3RoID0gc2xpZGVzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgIHdoaWxlIChzbGlkZXMubGVuZ3RoIDwgY291bnQpIHtcbiAgICAgICAgcHVzaChzbGlkZXMsIHNsaWRlcyk7XG4gICAgICB9XG5cbiAgICAgIHB1c2goc2xpZGVzLnNsaWNlKC1jb3VudCksIHNsaWRlcy5zbGljZSgwLCBjb3VudCkpLmZvckVhY2goZnVuY3Rpb24gKFNsaWRlLCBpbmRleCkge1xuICAgICAgICB2YXIgaXNIZWFkID0gaW5kZXggPCBjb3VudDtcbiAgICAgICAgdmFyIGNsb25lID0gY2xvbmVEZWVwKFNsaWRlLnNsaWRlLCBpbmRleCk7XG4gICAgICAgIGlzSGVhZCA/IGJlZm9yZShjbG9uZSwgc2xpZGVzWzBdLnNsaWRlKSA6IGFwcGVuZChFbGVtZW50cy5saXN0LCBjbG9uZSk7XG4gICAgICAgIHB1c2goY2xvbmVzLCBjbG9uZSk7XG4gICAgICAgIFNsaWRlcy5yZWdpc3RlcihjbG9uZSwgaW5kZXggLSBjb3VudCArIChpc0hlYWQgPyAwIDogbGVuZ3RoKSwgU2xpZGUuaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvbmVEZWVwKGVsbSwgaW5kZXgpIHtcbiAgICB2YXIgY2xvbmUgPSBlbG0uY2xvbmVOb2RlKHRydWUpO1xuICAgIGFkZENsYXNzKGNsb25lLCBvcHRpb25zLmNsYXNzZXMuY2xvbmUpO1xuICAgIGNsb25lLmlkID0gU3BsaWRlMi5yb290LmlkICsgXCItY2xvbmVcIiArIHBhZChpbmRleCArIDEpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVDbG9uZUNvdW50KCkge1xuICAgIHZhciBjbG9uZXMyID0gb3B0aW9ucy5jbG9uZXM7XG5cbiAgICBpZiAoIVNwbGlkZTIuaXMoTE9PUCkpIHtcbiAgICAgIGNsb25lczIgPSAwO1xuICAgIH0gZWxzZSBpZiAoIWNsb25lczIpIHtcbiAgICAgIHZhciBmaXhlZFNpemUgPSBvcHRpb25zW3Jlc29sdmUoXCJmaXhlZFdpZHRoXCIpXSAmJiBDb21wb25lbnRzMi5MYXlvdXQuc2xpZGVTaXplKDApO1xuICAgICAgdmFyIGZpeGVkQ291bnQgPSBmaXhlZFNpemUgJiYgY2VpbChyZWN0KEVsZW1lbnRzLnRyYWNrKVtyZXNvbHZlKFwid2lkdGhcIildIC8gZml4ZWRTaXplKTtcbiAgICAgIGNsb25lczIgPSBmaXhlZENvdW50IHx8IG9wdGlvbnNbcmVzb2x2ZShcImF1dG9XaWR0aFwiKV0gJiYgU3BsaWRlMi5sZW5ndGggfHwgb3B0aW9ucy5wZXJQYWdlICogTVVMVElQTElFUjtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmVzMjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfTtcbn1cblxuZnVuY3Rpb24gTW92ZShTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlNSA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U1Lm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTUuZW1pdDtcblxuICB2YXIgc2V0ID0gU3BsaWRlMi5zdGF0ZS5zZXQ7XG4gIHZhciBfQ29tcG9uZW50czIkTGF5b3V0ID0gQ29tcG9uZW50czIuTGF5b3V0LFxuICAgICAgc2xpZGVTaXplID0gX0NvbXBvbmVudHMyJExheW91dC5zbGlkZVNpemUsXG4gICAgICBnZXRQYWRkaW5nID0gX0NvbXBvbmVudHMyJExheW91dC5nZXRQYWRkaW5nLFxuICAgICAgdG90YWxTaXplID0gX0NvbXBvbmVudHMyJExheW91dC50b3RhbFNpemUsXG4gICAgICBsaXN0U2l6ZSA9IF9Db21wb25lbnRzMiRMYXlvdXQubGlzdFNpemUsXG4gICAgICBzbGlkZXJTaXplID0gX0NvbXBvbmVudHMyJExheW91dC5zbGlkZXJTaXplO1xuICB2YXIgX0NvbXBvbmVudHMyJERpcmVjdGlvID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLFxuICAgICAgcmVzb2x2ZSA9IF9Db21wb25lbnRzMiREaXJlY3Rpby5yZXNvbHZlLFxuICAgICAgb3JpZW50ID0gX0NvbXBvbmVudHMyJERpcmVjdGlvLm9yaWVudDtcbiAgdmFyIF9Db21wb25lbnRzMiRFbGVtZW50czMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIGxpc3QgPSBfQ29tcG9uZW50czIkRWxlbWVudHMzLmxpc3QsXG4gICAgICB0cmFjayA9IF9Db21wb25lbnRzMiRFbGVtZW50czMudHJhY2s7XG4gIHZhciBUcmFuc2l0aW9uO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIFRyYW5zaXRpb24gPSBDb21wb25lbnRzMi5UcmFuc2l0aW9uO1xuICAgIG9uKFtFVkVOVF9NT1VOVEVELCBFVkVOVF9SRVNJWkVELCBFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNIXSwgcmVwb3NpdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiByZXBvc2l0aW9uKCkge1xuICAgIGlmICghQ29tcG9uZW50czIuQ29udHJvbGxlci5pc0J1c3koKSkge1xuICAgICAgQ29tcG9uZW50czIuU2Nyb2xsLmNhbmNlbCgpO1xuICAgICAganVtcChTcGxpZGUyLmluZGV4KTtcbiAgICAgIENvbXBvbmVudHMyLlNsaWRlcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKGRlc3QsIGluZGV4LCBwcmV2LCBjYWxsYmFjaykge1xuICAgIGlmIChkZXN0ICE9PSBpbmRleCAmJiBjYW5TaGlmdChkZXN0ID4gcHJldikpIHtcbiAgICAgIGNhbmNlbCgpO1xuICAgICAgdHJhbnNsYXRlKHNoaWZ0KGdldFBvc2l0aW9uKCksIGRlc3QgPiBwcmV2KSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2V0KE1PVklORyk7XG4gICAgZW1pdChFVkVOVF9NT1ZFLCBpbmRleCwgcHJldiwgZGVzdCk7XG4gICAgVHJhbnNpdGlvbi5zdGFydChpbmRleCwgZnVuY3Rpb24gKCkge1xuICAgICAgc2V0KElETEUpO1xuICAgICAgZW1pdChFVkVOVF9NT1ZFRCwgaW5kZXgsIHByZXYsIGRlc3QpO1xuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGp1bXAoaW5kZXgpIHtcbiAgICB0cmFuc2xhdGUodG9Qb3NpdGlvbihpbmRleCwgdHJ1ZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKHBvc2l0aW9uLCBwcmV2ZW50TG9vcCkge1xuICAgIGlmICghU3BsaWRlMi5pcyhGQURFKSkge1xuICAgICAgdmFyIGRlc3RpbmF0aW9uID0gcHJldmVudExvb3AgPyBwb3NpdGlvbiA6IGxvb3AocG9zaXRpb24pO1xuICAgICAgc3R5bGUobGlzdCwgXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVcIiArIHJlc29sdmUoXCJYXCIpICsgXCIoXCIgKyBkZXN0aW5hdGlvbiArIFwicHgpXCIpO1xuICAgICAgcG9zaXRpb24gIT09IGRlc3RpbmF0aW9uICYmIGVtaXQoRVZFTlRfU0hJRlRFRCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbG9vcChwb3NpdGlvbikge1xuICAgIGlmIChTcGxpZGUyLmlzKExPT1ApKSB7XG4gICAgICB2YXIgaW5kZXggPSB0b0luZGV4KHBvc2l0aW9uKTtcbiAgICAgIHZhciBleGNlZWRlZE1heCA9IGluZGV4ID4gQ29tcG9uZW50czIuQ29udHJvbGxlci5nZXRFbmQoKTtcbiAgICAgIHZhciBleGNlZWRlZE1pbiA9IGluZGV4IDwgMDtcblxuICAgICAgaWYgKGV4Y2VlZGVkTWluIHx8IGV4Y2VlZGVkTWF4KSB7XG4gICAgICAgIHBvc2l0aW9uID0gc2hpZnQocG9zaXRpb24sIGV4Y2VlZGVkTWF4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBmdW5jdGlvbiBzaGlmdChwb3NpdGlvbiwgYmFja3dhcmRzKSB7XG4gICAgdmFyIGV4Y2VzcyA9IHBvc2l0aW9uIC0gZ2V0TGltaXQoYmFja3dhcmRzKTtcbiAgICB2YXIgc2l6ZSA9IHNsaWRlclNpemUoKTtcbiAgICBwb3NpdGlvbiAtPSBvcmllbnQoc2l6ZSAqIChjZWlsKGFicyhleGNlc3MpIC8gc2l6ZSkgfHwgMSkpICogKGJhY2t3YXJkcyA/IDEgOiAtMSk7XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIHRyYW5zbGF0ZShnZXRQb3NpdGlvbigpKTtcbiAgICBUcmFuc2l0aW9uLmNhbmNlbCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9JbmRleChwb3NpdGlvbikge1xuICAgIHZhciBTbGlkZXMgPSBDb21wb25lbnRzMi5TbGlkZXMuZ2V0KCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgbWluRGlzdGFuY2UgPSBJbmZpbml0eTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgU2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc2xpZGVJbmRleCA9IFNsaWRlc1tpXS5pbmRleDtcbiAgICAgIHZhciBkaXN0YW5jZSA9IGFicyh0b1Bvc2l0aW9uKHNsaWRlSW5kZXgsIHRydWUpIC0gcG9zaXRpb24pO1xuXG4gICAgICBpZiAoZGlzdGFuY2UgPD0gbWluRGlzdGFuY2UpIHtcbiAgICAgICAgbWluRGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgaW5kZXggPSBzbGlkZUluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gdG9Qb3NpdGlvbihpbmRleCwgdHJpbW1pbmcpIHtcbiAgICB2YXIgcG9zaXRpb24gPSBvcmllbnQodG90YWxTaXplKGluZGV4IC0gMSkgLSBvZmZzZXQoaW5kZXgpKTtcbiAgICByZXR1cm4gdHJpbW1pbmcgPyB0cmltKHBvc2l0aW9uKSA6IHBvc2l0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UG9zaXRpb24oKSB7XG4gICAgdmFyIGxlZnQgPSByZXNvbHZlKFwibGVmdFwiKTtcbiAgICByZXR1cm4gcmVjdChsaXN0KVtsZWZ0XSAtIHJlY3QodHJhY2spW2xlZnRdICsgb3JpZW50KGdldFBhZGRpbmcoZmFsc2UpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyaW0ocG9zaXRpb24pIHtcbiAgICBpZiAob3B0aW9ucy50cmltU3BhY2UgJiYgU3BsaWRlMi5pcyhTTElERSkpIHtcbiAgICAgIHBvc2l0aW9uID0gY2xhbXAocG9zaXRpb24sIDAsIG9yaWVudChzbGlkZXJTaXplKCkgLSBsaXN0U2l6ZSgpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gb2Zmc2V0KGluZGV4KSB7XG4gICAgdmFyIGZvY3VzID0gb3B0aW9ucy5mb2N1cztcbiAgICByZXR1cm4gZm9jdXMgPT09IFwiY2VudGVyXCIgPyAobGlzdFNpemUoKSAtIHNsaWRlU2l6ZShpbmRleCwgdHJ1ZSkpIC8gMiA6ICtmb2N1cyAqIHNsaWRlU2l6ZShpbmRleCkgfHwgMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExpbWl0KG1heCkge1xuICAgIHJldHVybiB0b1Bvc2l0aW9uKG1heCA/IENvbXBvbmVudHMyLkNvbnRyb2xsZXIuZ2V0RW5kKCkgOiAwLCAhIW9wdGlvbnMudHJpbVNwYWNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhblNoaWZ0KGJhY2t3YXJkcykge1xuICAgIHZhciBzaGlmdGVkID0gb3JpZW50KHNoaWZ0KGdldFBvc2l0aW9uKCksIGJhY2t3YXJkcykpO1xuICAgIHJldHVybiBiYWNrd2FyZHMgPyBzaGlmdGVkID49IDAgOiBzaGlmdGVkIDw9IGxpc3RbcmVzb2x2ZShcInNjcm9sbFdpZHRoXCIpXSAtIHJlY3QodHJhY2spW3Jlc29sdmUoXCJ3aWR0aFwiKV07XG4gIH1cblxuICBmdW5jdGlvbiBleGNlZWRlZExpbWl0KG1heCwgcG9zaXRpb24pIHtcbiAgICBwb3NpdGlvbiA9IGlzVW5kZWZpbmVkKHBvc2l0aW9uKSA/IGdldFBvc2l0aW9uKCkgOiBwb3NpdGlvbjtcbiAgICB2YXIgZXhjZWVkZWRNaW4gPSBtYXggIT09IHRydWUgJiYgb3JpZW50KHBvc2l0aW9uKSA8IG9yaWVudChnZXRMaW1pdChmYWxzZSkpO1xuICAgIHZhciBleGNlZWRlZE1heCA9IG1heCAhPT0gZmFsc2UgJiYgb3JpZW50KHBvc2l0aW9uKSA+IG9yaWVudChnZXRMaW1pdCh0cnVlKSk7XG4gICAgcmV0dXJuIGV4Y2VlZGVkTWluIHx8IGV4Y2VlZGVkTWF4O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgbW92ZTogbW92ZSxcbiAgICBqdW1wOiBqdW1wLFxuICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlLFxuICAgIHNoaWZ0OiBzaGlmdCxcbiAgICBjYW5jZWw6IGNhbmNlbCxcbiAgICB0b0luZGV4OiB0b0luZGV4LFxuICAgIHRvUG9zaXRpb246IHRvUG9zaXRpb24sXG4gICAgZ2V0UG9zaXRpb246IGdldFBvc2l0aW9uLFxuICAgIGdldExpbWl0OiBnZXRMaW1pdCxcbiAgICBleGNlZWRlZExpbWl0OiBleGNlZWRlZExpbWl0LFxuICAgIHJlcG9zaXRpb246IHJlcG9zaXRpb25cbiAgfTtcbn1cblxuZnVuY3Rpb24gQ29udHJvbGxlcihTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlNiA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U2Lm9uO1xuXG4gIHZhciBNb3ZlID0gQ29tcG9uZW50czIuTW92ZTtcbiAgdmFyIGdldFBvc2l0aW9uID0gTW92ZS5nZXRQb3NpdGlvbixcbiAgICAgIGdldExpbWl0ID0gTW92ZS5nZXRMaW1pdCxcbiAgICAgIHRvUG9zaXRpb24gPSBNb3ZlLnRvUG9zaXRpb247XG4gIHZhciBfQ29tcG9uZW50czIkU2xpZGVzID0gQ29tcG9uZW50czIuU2xpZGVzLFxuICAgICAgaXNFbm91Z2ggPSBfQ29tcG9uZW50czIkU2xpZGVzLmlzRW5vdWdoLFxuICAgICAgZ2V0TGVuZ3RoID0gX0NvbXBvbmVudHMyJFNsaWRlcy5nZXRMZW5ndGg7XG4gIHZhciBpc0xvb3AgPSBTcGxpZGUyLmlzKExPT1ApO1xuICB2YXIgaXNTbGlkZSA9IFNwbGlkZTIuaXMoU0xJREUpO1xuICB2YXIgZ2V0TmV4dCA9IGFwcGx5KGdldEFkamFjZW50LCBmYWxzZSk7XG4gIHZhciBnZXRQcmV2ID0gYXBwbHkoZ2V0QWRqYWNlbnQsIHRydWUpO1xuICB2YXIgY3VyckluZGV4ID0gb3B0aW9ucy5zdGFydCB8fCAwO1xuICB2YXIgcHJldkluZGV4ID0gY3VyckluZGV4O1xuICB2YXIgc2xpZGVDb3VudDtcbiAgdmFyIHBlck1vdmU7XG4gIHZhciBwZXJQYWdlO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGluaXQoKTtcbiAgICBvbihbRVZFTlRfVVBEQVRFRCwgRVZFTlRfUkVGUkVTSF0sIGluaXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBzbGlkZUNvdW50ID0gZ2V0TGVuZ3RoKHRydWUpO1xuICAgIHBlck1vdmUgPSBvcHRpb25zLnBlck1vdmU7XG4gICAgcGVyUGFnZSA9IG9wdGlvbnMucGVyUGFnZTtcbiAgICB2YXIgaW5kZXggPSBjbGFtcChjdXJySW5kZXgsIDAsIHNsaWRlQ291bnQgLSAxKTtcblxuICAgIGlmIChpbmRleCAhPT0gY3VyckluZGV4KSB7XG4gICAgICBjdXJySW5kZXggPSBpbmRleDtcbiAgICAgIE1vdmUucmVwb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKGNvbnRyb2wsIGFsbG93U2FtZUluZGV4LCBjYWxsYmFjaykge1xuICAgIGlmICghaXNCdXN5KCkpIHtcbiAgICAgIHZhciBkZXN0ID0gcGFyc2UoY29udHJvbCk7XG4gICAgICB2YXIgaW5kZXggPSBsb29wKGRlc3QpO1xuXG4gICAgICBpZiAoaW5kZXggPiAtMSAmJiAoYWxsb3dTYW1lSW5kZXggfHwgaW5kZXggIT09IGN1cnJJbmRleCkpIHtcbiAgICAgICAgc2V0SW5kZXgoaW5kZXgpO1xuICAgICAgICBNb3ZlLm1vdmUoZGVzdCwgaW5kZXgsIHByZXZJbmRleCwgY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbChkZXN0aW5hdGlvbiwgZHVyYXRpb24sIHNuYXAsIGNhbGxiYWNrKSB7XG4gICAgQ29tcG9uZW50czIuU2Nyb2xsLnNjcm9sbChkZXN0aW5hdGlvbiwgZHVyYXRpb24sIHNuYXAsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldEluZGV4KGxvb3AoTW92ZS50b0luZGV4KGdldFBvc2l0aW9uKCkpKSk7XG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2UoY29udHJvbCkge1xuICAgIHZhciBpbmRleCA9IGN1cnJJbmRleDtcblxuICAgIGlmIChpc1N0cmluZyhjb250cm9sKSkge1xuICAgICAgdmFyIF9yZWYgPSBjb250cm9sLm1hdGNoKC8oWytcXC08Pl0pKFxcZCspPy8pIHx8IFtdLFxuICAgICAgICAgIGluZGljYXRvciA9IF9yZWZbMV0sXG4gICAgICAgICAgbnVtYmVyID0gX3JlZlsyXTtcblxuICAgICAgaWYgKGluZGljYXRvciA9PT0gXCIrXCIgfHwgaW5kaWNhdG9yID09PSBcIi1cIikge1xuICAgICAgICBpbmRleCA9IGNvbXB1dGVEZXN0SW5kZXgoY3VyckluZGV4ICsgKyhcIlwiICsgaW5kaWNhdG9yICsgKCtudW1iZXIgfHwgMSkpLCBjdXJySW5kZXgpO1xuICAgICAgfSBlbHNlIGlmIChpbmRpY2F0b3IgPT09IFwiPlwiKSB7XG4gICAgICAgIGluZGV4ID0gbnVtYmVyID8gdG9JbmRleCgrbnVtYmVyKSA6IGdldE5leHQodHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGluZGljYXRvciA9PT0gXCI8XCIpIHtcbiAgICAgICAgaW5kZXggPSBnZXRQcmV2KHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCA9IGlzTG9vcCA/IGNvbnRyb2wgOiBjbGFtcChjb250cm9sLCAwLCBnZXRFbmQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QWRqYWNlbnQocHJldiwgZGVzdGluYXRpb24pIHtcbiAgICB2YXIgbnVtYmVyID0gcGVyTW92ZSB8fCAoaGFzRm9jdXMoKSA/IDEgOiBwZXJQYWdlKTtcbiAgICB2YXIgZGVzdCA9IGNvbXB1dGVEZXN0SW5kZXgoY3VyckluZGV4ICsgbnVtYmVyICogKHByZXYgPyAtMSA6IDEpLCBjdXJySW5kZXgsICEocGVyTW92ZSB8fCBoYXNGb2N1cygpKSk7XG5cbiAgICBpZiAoZGVzdCA9PT0gLTEgJiYgaXNTbGlkZSkge1xuICAgICAgaWYgKCFhcHByb3hpbWF0ZWx5RXF1YWwoZ2V0UG9zaXRpb24oKSwgZ2V0TGltaXQoIXByZXYpLCAxKSkge1xuICAgICAgICByZXR1cm4gcHJldiA/IDAgOiBnZXRFbmQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVzdGluYXRpb24gPyBkZXN0IDogbG9vcChkZXN0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVEZXN0SW5kZXgoZGVzdCwgZnJvbSwgc25hcFBhZ2UpIHtcbiAgICBpZiAoaXNFbm91Z2goKSB8fCBoYXNGb2N1cygpKSB7XG4gICAgICB2YXIgZW5kID0gZ2V0RW5kKCk7XG4gICAgICB2YXIgaW5kZXggPSBjb21wdXRlTW92YWJsZURlc3RJbmRleChkZXN0KTtcblxuICAgICAgaWYgKGluZGV4ICE9PSBkZXN0KSB7XG4gICAgICAgIGZyb20gPSBkZXN0O1xuICAgICAgICBkZXN0ID0gaW5kZXg7XG4gICAgICAgIHNuYXBQYWdlID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZXN0IDwgMCB8fCBkZXN0ID4gZW5kKSB7XG4gICAgICAgIGlmICghcGVyTW92ZSAmJiAoYmV0d2VlbigwLCBkZXN0LCBmcm9tLCB0cnVlKSB8fCBiZXR3ZWVuKGVuZCwgZnJvbSwgZGVzdCwgdHJ1ZSkpKSB7XG4gICAgICAgICAgZGVzdCA9IHRvSW5kZXgodG9QYWdlKGRlc3QpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaXNMb29wKSB7XG4gICAgICAgICAgICBkZXN0ID0gc25hcFBhZ2UgPyBkZXN0IDwgMCA/IC0oc2xpZGVDb3VudCAlIHBlclBhZ2UgfHwgcGVyUGFnZSkgOiBzbGlkZUNvdW50IDogZGVzdDtcbiAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMucmV3aW5kKSB7XG4gICAgICAgICAgICBkZXN0ID0gZGVzdCA8IDAgPyBlbmQgOiAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXN0ID0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc25hcFBhZ2UgJiYgZGVzdCAhPT0gZnJvbSkge1xuICAgICAgICAgIGRlc3QgPSB0b0luZGV4KHRvUGFnZShmcm9tKSArIChkZXN0IDwgZnJvbSA/IC0xIDogMSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3QgPSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVzdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVNb3ZhYmxlRGVzdEluZGV4KGRlc3QpIHtcbiAgICBpZiAoaXNTbGlkZSAmJiBvcHRpb25zLnRyaW1TcGFjZSA9PT0gXCJtb3ZlXCIgJiYgZGVzdCAhPT0gY3VyckluZGV4KSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSBnZXRQb3NpdGlvbigpO1xuXG4gICAgICB3aGlsZSAocG9zaXRpb24gPT09IHRvUG9zaXRpb24oZGVzdCwgdHJ1ZSkgJiYgYmV0d2VlbihkZXN0LCAwLCBTcGxpZGUyLmxlbmd0aCAtIDEsICFvcHRpb25zLnJld2luZCkpIHtcbiAgICAgICAgZGVzdCA8IGN1cnJJbmRleCA/IC0tZGVzdCA6ICsrZGVzdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVzdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvb3AoaW5kZXgpIHtcbiAgICByZXR1cm4gaXNMb29wID8gKGluZGV4ICsgc2xpZGVDb3VudCkgJSBzbGlkZUNvdW50IHx8IDAgOiBpbmRleDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVuZCgpIHtcbiAgICByZXR1cm4gbWF4KHNsaWRlQ291bnQgLSAoaGFzRm9jdXMoKSB8fCBpc0xvb3AgJiYgcGVyTW92ZSA/IDEgOiBwZXJQYWdlKSwgMCk7XG4gIH1cblxuICBmdW5jdGlvbiB0b0luZGV4KHBhZ2UpIHtcbiAgICByZXR1cm4gY2xhbXAoaGFzRm9jdXMoKSA/IHBhZ2UgOiBwZXJQYWdlICogcGFnZSwgMCwgZ2V0RW5kKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9QYWdlKGluZGV4KSB7XG4gICAgcmV0dXJuIGhhc0ZvY3VzKCkgPyBpbmRleCA6IGZsb29yKChpbmRleCA+PSBnZXRFbmQoKSA/IHNsaWRlQ291bnQgLSAxIDogaW5kZXgpIC8gcGVyUGFnZSk7XG4gIH1cblxuICBmdW5jdGlvbiB0b0Rlc3QoZGVzdGluYXRpb24pIHtcbiAgICB2YXIgY2xvc2VzdCA9IE1vdmUudG9JbmRleChkZXN0aW5hdGlvbik7XG4gICAgcmV0dXJuIGlzU2xpZGUgPyBjbGFtcChjbG9zZXN0LCAwLCBnZXRFbmQoKSkgOiBjbG9zZXN0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0SW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggIT09IGN1cnJJbmRleCkge1xuICAgICAgcHJldkluZGV4ID0gY3VyckluZGV4O1xuICAgICAgY3VyckluZGV4ID0gaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW5kZXgocHJldikge1xuICAgIHJldHVybiBwcmV2ID8gcHJldkluZGV4IDogY3VyckluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFzRm9jdXMoKSB7XG4gICAgcmV0dXJuICFpc1VuZGVmaW5lZChvcHRpb25zLmZvY3VzKSB8fCBvcHRpb25zLmlzTmF2aWdhdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQnVzeSgpIHtcbiAgICByZXR1cm4gU3BsaWRlMi5zdGF0ZS5pcyhbTU9WSU5HLCBTQ1JPTExJTkddKSAmJiAhIW9wdGlvbnMud2FpdEZvclRyYW5zaXRpb247XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBnbzogZ28sXG4gICAgc2Nyb2xsOiBzY3JvbGwsXG4gICAgZ2V0TmV4dDogZ2V0TmV4dCxcbiAgICBnZXRQcmV2OiBnZXRQcmV2LFxuICAgIGdldEFkamFjZW50OiBnZXRBZGphY2VudCxcbiAgICBnZXRFbmQ6IGdldEVuZCxcbiAgICBzZXRJbmRleDogc2V0SW5kZXgsXG4gICAgZ2V0SW5kZXg6IGdldEluZGV4LFxuICAgIHRvSW5kZXg6IHRvSW5kZXgsXG4gICAgdG9QYWdlOiB0b1BhZ2UsXG4gICAgdG9EZXN0OiB0b0Rlc3QsXG4gICAgaGFzRm9jdXM6IGhhc0ZvY3VzLFxuICAgIGlzQnVzeTogaXNCdXN5XG4gIH07XG59XG5cbnZhciBYTUxfTkFNRV9TUEFDRSA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcbnZhciBQQVRIID0gXCJtMTUuNSAwLjkzMi00LjMgNC4zOCAxNC41IDE0LjYtMTQuNSAxNC41IDQuMyA0LjQgMTQuNi0xNC42IDQuNC00LjMtNC40LTQuNC0xNC42LTE0LjZ6XCI7XG52YXIgU0laRSA9IDQwO1xuXG5mdW5jdGlvbiBBcnJvd3MoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIGV2ZW50ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMik7XG4gIHZhciBvbiA9IGV2ZW50Lm9uLFxuICAgICAgYmluZCA9IGV2ZW50LmJpbmQsXG4gICAgICBlbWl0ID0gZXZlbnQuZW1pdDtcbiAgdmFyIGNsYXNzZXMgPSBvcHRpb25zLmNsYXNzZXMsXG4gICAgICBpMThuID0gb3B0aW9ucy5pMThuO1xuICB2YXIgRWxlbWVudHMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIENvbnRyb2xsZXIgPSBDb21wb25lbnRzMi5Db250cm9sbGVyO1xuICB2YXIgcGxhY2Vob2xkZXIgPSBFbGVtZW50cy5hcnJvd3MsXG4gICAgICB0cmFjayA9IEVsZW1lbnRzLnRyYWNrO1xuICB2YXIgd3JhcHBlciA9IHBsYWNlaG9sZGVyO1xuICB2YXIgcHJldiA9IEVsZW1lbnRzLnByZXY7XG4gIHZhciBuZXh0ID0gRWxlbWVudHMubmV4dDtcbiAgdmFyIGNyZWF0ZWQ7XG4gIHZhciB3cmFwcGVyQ2xhc3NlcztcbiAgdmFyIGFycm93cyA9IHt9O1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGluaXQoKTtcbiAgICBvbihFVkVOVF9VUERBVEVELCByZW1vdW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW91bnQoKSB7XG4gICAgZGVzdHJveSgpO1xuICAgIG1vdW50KCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBlbmFibGVkID0gb3B0aW9ucy5hcnJvd3M7XG5cbiAgICBpZiAoZW5hYmxlZCAmJiAhKHByZXYgJiYgbmV4dCkpIHtcbiAgICAgIGNyZWF0ZUFycm93cygpO1xuICAgIH1cblxuICAgIGlmIChwcmV2ICYmIG5leHQpIHtcbiAgICAgIGFzc2lnbihhcnJvd3MsIHtcbiAgICAgICAgcHJldjogcHJldixcbiAgICAgICAgbmV4dDogbmV4dFxuICAgICAgfSk7XG4gICAgICBkaXNwbGF5KHdyYXBwZXIsIGVuYWJsZWQgPyBcIlwiIDogXCJub25lXCIpO1xuICAgICAgYWRkQ2xhc3Mod3JhcHBlciwgd3JhcHBlckNsYXNzZXMgPSBDTEFTU19BUlJPV1MgKyBcIi0tXCIgKyBvcHRpb25zLmRpcmVjdGlvbik7XG5cbiAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgIGxpc3RlbigpO1xuICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgc2V0QXR0cmlidXRlKFtwcmV2LCBuZXh0XSwgQVJJQV9DT05UUk9MUywgdHJhY2suaWQpO1xuICAgICAgICBlbWl0KEVWRU5UX0FSUk9XU19NT1VOVEVELCBwcmV2LCBuZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgICByZW1vdmVDbGFzcyh3cmFwcGVyLCB3cmFwcGVyQ2xhc3Nlcyk7XG5cbiAgICBpZiAoY3JlYXRlZCkge1xuICAgICAgcmVtb3ZlKHBsYWNlaG9sZGVyID8gW3ByZXYsIG5leHRdIDogd3JhcHBlcik7XG4gICAgICBwcmV2ID0gbmV4dCA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZUF0dHJpYnV0ZShbcHJldiwgbmV4dF0sIEFMTF9BVFRSSUJVVEVTKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4oKSB7XG4gICAgb24oW0VWRU5UX01PVkVELCBFVkVOVF9SRUZSRVNILCBFVkVOVF9TQ1JPTExFRF0sIHVwZGF0ZSk7XG4gICAgYmluZChuZXh0LCBcImNsaWNrXCIsIGFwcGx5KGdvLCBcIj5cIikpO1xuICAgIGJpbmQocHJldiwgXCJjbGlja1wiLCBhcHBseShnbywgXCI8XCIpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKGNvbnRyb2wpIHtcbiAgICBDb250cm9sbGVyLmdvKGNvbnRyb2wsIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyb3dzKCkge1xuICAgIHdyYXBwZXIgPSBwbGFjZWhvbGRlciB8fCBjcmVhdGUoXCJkaXZcIiwgY2xhc3Nlcy5hcnJvd3MpO1xuICAgIHByZXYgPSBjcmVhdGVBcnJvdyh0cnVlKTtcbiAgICBuZXh0ID0gY3JlYXRlQXJyb3coZmFsc2UpO1xuICAgIGNyZWF0ZWQgPSB0cnVlO1xuICAgIGFwcGVuZCh3cmFwcGVyLCBbcHJldiwgbmV4dF0pO1xuICAgICFwbGFjZWhvbGRlciAmJiBiZWZvcmUod3JhcHBlciwgdHJhY2spO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyb3cocHJldjIpIHtcbiAgICB2YXIgYXJyb3cgPSBcIjxidXR0b24gY2xhc3M9XFxcIlwiICsgY2xhc3Nlcy5hcnJvdyArIFwiIFwiICsgKHByZXYyID8gY2xhc3Nlcy5wcmV2IDogY2xhc3Nlcy5uZXh0KSArIFwiXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPjxzdmcgeG1sbnM9XFxcIlwiICsgWE1MX05BTUVfU1BBQ0UgKyBcIlxcXCIgdmlld0JveD1cXFwiMCAwIFwiICsgU0laRSArIFwiIFwiICsgU0laRSArIFwiXFxcIiB3aWR0aD1cXFwiXCIgKyBTSVpFICsgXCJcXFwiIGhlaWdodD1cXFwiXCIgKyBTSVpFICsgXCJcXFwiIGZvY3VzYWJsZT1cXFwiZmFsc2VcXFwiPjxwYXRoIGQ9XFxcIlwiICsgKG9wdGlvbnMuYXJyb3dQYXRoIHx8IFBBVEgpICsgXCJcXFwiIC8+XCI7XG4gICAgcmV0dXJuIHBhcnNlSHRtbChhcnJvdyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIGluZGV4ID0gU3BsaWRlMi5pbmRleDtcbiAgICB2YXIgcHJldkluZGV4ID0gQ29udHJvbGxlci5nZXRQcmV2KCk7XG4gICAgdmFyIG5leHRJbmRleCA9IENvbnRyb2xsZXIuZ2V0TmV4dCgpO1xuICAgIHZhciBwcmV2TGFiZWwgPSBwcmV2SW5kZXggPiAtMSAmJiBpbmRleCA8IHByZXZJbmRleCA/IGkxOG4ubGFzdCA6IGkxOG4ucHJldjtcbiAgICB2YXIgbmV4dExhYmVsID0gbmV4dEluZGV4ID4gLTEgJiYgaW5kZXggPiBuZXh0SW5kZXggPyBpMThuLmZpcnN0IDogaTE4bi5uZXh0O1xuICAgIHByZXYuZGlzYWJsZWQgPSBwcmV2SW5kZXggPCAwO1xuICAgIG5leHQuZGlzYWJsZWQgPSBuZXh0SW5kZXggPCAwO1xuICAgIHNldEF0dHJpYnV0ZShwcmV2LCBBUklBX0xBQkVMLCBwcmV2TGFiZWwpO1xuICAgIHNldEF0dHJpYnV0ZShuZXh0LCBBUklBX0xBQkVMLCBuZXh0TGFiZWwpO1xuICAgIGVtaXQoRVZFTlRfQVJST1dTX1VQREFURUQsIHByZXYsIG5leHQsIHByZXZJbmRleCwgbmV4dEluZGV4KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXJyb3dzOiBhcnJvd3MsXG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgdXBkYXRlOiB1cGRhdGVcbiAgfTtcbn1cblxudmFyIElOVEVSVkFMX0RBVEFfQVRUUklCVVRFID0gREFUQV9BVFRSSUJVVEUgKyBcIi1pbnRlcnZhbFwiO1xuXG5mdW5jdGlvbiBBdXRvcGxheShTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlNyA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U3Lm9uLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTcuYmluZCxcbiAgICAgIGVtaXQgPSBfRXZlbnRJbnRlcmZhY2U3LmVtaXQ7XG5cbiAgdmFyIGludGVydmFsID0gUmVxdWVzdEludGVydmFsKG9wdGlvbnMuaW50ZXJ2YWwsIFNwbGlkZTIuZ28uYmluZChTcGxpZGUyLCBcIj5cIiksIG9uQW5pbWF0aW9uRnJhbWUpO1xuICB2YXIgaXNQYXVzZWQgPSBpbnRlcnZhbC5pc1BhdXNlZDtcbiAgdmFyIEVsZW1lbnRzID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICBfQ29tcG9uZW50czIkRWxlbWVudHM0ID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICByb290ID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzNC5yb290LFxuICAgICAgdG9nZ2xlID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzNC50b2dnbGU7XG4gIHZhciBhdXRvcGxheSA9IG9wdGlvbnMuYXV0b3BsYXk7XG4gIHZhciBob3ZlcmVkO1xuICB2YXIgZm9jdXNlZDtcbiAgdmFyIHN0b3BwZWQgPSBhdXRvcGxheSA9PT0gXCJwYXVzZVwiO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgbGlzdGVuKCk7XG4gICAgICB0b2dnbGUgJiYgc2V0QXR0cmlidXRlKHRvZ2dsZSwgQVJJQV9DT05UUk9MUywgRWxlbWVudHMudHJhY2suaWQpO1xuICAgICAgc3RvcHBlZCB8fCBwbGF5KCk7XG4gICAgICB1cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4oKSB7XG4gICAgaWYgKG9wdGlvbnMucGF1c2VPbkhvdmVyKSB7XG4gICAgICBiaW5kKHJvb3QsIFwibW91c2VlbnRlciBtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGhvdmVyZWQgPSBlLnR5cGUgPT09IFwibW91c2VlbnRlclwiO1xuICAgICAgICBhdXRvVG9nZ2xlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wYXVzZU9uRm9jdXMpIHtcbiAgICAgIGJpbmQocm9vdCwgXCJmb2N1c2luIGZvY3Vzb3V0XCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGZvY3VzZWQgPSBlLnR5cGUgPT09IFwiZm9jdXNpblwiO1xuICAgICAgICBhdXRvVG9nZ2xlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodG9nZ2xlKSB7XG4gICAgICBiaW5kKHRvZ2dsZSwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0b3BwZWQgPyBwbGF5KCkgOiBwYXVzZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uKFtFVkVOVF9NT1ZFLCBFVkVOVF9TQ1JPTEwsIEVWRU5UX1JFRlJFU0hdLCBpbnRlcnZhbC5yZXdpbmQpO1xuICAgIG9uKEVWRU5UX01PVkUsIG9uTW92ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBwbGF5KCkge1xuICAgIGlmIChpc1BhdXNlZCgpICYmIENvbXBvbmVudHMyLlNsaWRlcy5pc0Vub3VnaCgpKSB7XG4gICAgICBpbnRlcnZhbC5zdGFydCghb3B0aW9ucy5yZXNldFByb2dyZXNzKTtcbiAgICAgIGZvY3VzZWQgPSBob3ZlcmVkID0gc3RvcHBlZCA9IGZhbHNlO1xuICAgICAgdXBkYXRlKCk7XG4gICAgICBlbWl0KEVWRU5UX0FVVE9QTEFZX1BMQVkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhdXNlKHN0b3ApIHtcbiAgICBpZiAoc3RvcCA9PT0gdm9pZCAwKSB7XG4gICAgICBzdG9wID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdG9wcGVkID0gISFzdG9wO1xuICAgIHVwZGF0ZSgpO1xuXG4gICAgaWYgKCFpc1BhdXNlZCgpKSB7XG4gICAgICBpbnRlcnZhbC5wYXVzZSgpO1xuICAgICAgZW1pdChFVkVOVF9BVVRPUExBWV9QQVVTRSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYXV0b1RvZ2dsZSgpIHtcbiAgICBpZiAoIXN0b3BwZWQpIHtcbiAgICAgIGhvdmVyZWQgfHwgZm9jdXNlZCA/IHBhdXNlKGZhbHNlKSA6IHBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgaWYgKHRvZ2dsZSkge1xuICAgICAgdG9nZ2xlQ2xhc3ModG9nZ2xlLCBDTEFTU19BQ1RJVkUsICFzdG9wcGVkKTtcbiAgICAgIHNldEF0dHJpYnV0ZSh0b2dnbGUsIEFSSUFfTEFCRUwsIG9wdGlvbnMuaTE4bltzdG9wcGVkID8gXCJwbGF5XCIgOiBcInBhdXNlXCJdKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkFuaW1hdGlvbkZyYW1lKHJhdGUpIHtcbiAgICB2YXIgYmFyID0gRWxlbWVudHMuYmFyO1xuICAgIGJhciAmJiBzdHlsZShiYXIsIFwid2lkdGhcIiwgcmF0ZSAqIDEwMCArIFwiJVwiKTtcbiAgICBlbWl0KEVWRU5UX0FVVE9QTEFZX1BMQVlJTkcsIHJhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Nb3ZlKGluZGV4KSB7XG4gICAgdmFyIFNsaWRlID0gQ29tcG9uZW50czIuU2xpZGVzLmdldEF0KGluZGV4KTtcbiAgICBpbnRlcnZhbC5zZXQoU2xpZGUgJiYgK2dldEF0dHJpYnV0ZShTbGlkZS5zbGlkZSwgSU5URVJWQUxfREFUQV9BVFRSSUJVVEUpIHx8IG9wdGlvbnMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogaW50ZXJ2YWwuY2FuY2VsLFxuICAgIHBsYXk6IHBsYXksXG4gICAgcGF1c2U6IHBhdXNlLFxuICAgIGlzUGF1c2VkOiBpc1BhdXNlZFxuICB9O1xufVxuXG5mdW5jdGlvbiBDb3ZlcihTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlOCA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U4Lm9uO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmIChvcHRpb25zLmNvdmVyKSB7XG4gICAgICBvbihFVkVOVF9MQVpZTE9BRF9MT0FERUQsIGFwcGx5KHRvZ2dsZSwgdHJ1ZSkpO1xuICAgICAgb24oW0VWRU5UX01PVU5URUQsIEVWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCBhcHBseShjb3ZlciwgdHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNvdmVyKGNvdmVyMikge1xuICAgIENvbXBvbmVudHMyLlNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChTbGlkZSkge1xuICAgICAgdmFyIGltZyA9IGNoaWxkKFNsaWRlLmNvbnRhaW5lciB8fCBTbGlkZS5zbGlkZSwgXCJpbWdcIik7XG5cbiAgICAgIGlmIChpbWcgJiYgaW1nLnNyYykge1xuICAgICAgICB0b2dnbGUoY292ZXIyLCBpbWcsIFNsaWRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZShjb3ZlcjIsIGltZywgU2xpZGUpIHtcbiAgICBTbGlkZS5zdHlsZShcImJhY2tncm91bmRcIiwgY292ZXIyID8gXCJjZW50ZXIvY292ZXIgbm8tcmVwZWF0IHVybChcXFwiXCIgKyBpbWcuc3JjICsgXCJcXFwiKVwiIDogXCJcIiwgdHJ1ZSk7XG4gICAgZGlzcGxheShpbWcsIGNvdmVyMiA/IFwibm9uZVwiIDogXCJcIik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBhcHBseShjb3ZlciwgZmFsc2UpXG4gIH07XG59XG5cbnZhciBCT1VOQ0VfRElGRl9USFJFU0hPTEQgPSAxMDtcbnZhciBCT1VOQ0VfRFVSQVRJT04gPSA2MDA7XG52YXIgRlJJQ1RJT05fRkFDVE9SID0gMC42O1xudmFyIEJBU0VfVkVMT0NJVFkgPSAxLjU7XG52YXIgTUlOX0RVUkFUSU9OID0gODAwO1xuXG5mdW5jdGlvbiBTY3JvbGwoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTkgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlOS5vbixcbiAgICAgIGVtaXQgPSBfRXZlbnRJbnRlcmZhY2U5LmVtaXQ7XG5cbiAgdmFyIHNldCA9IFNwbGlkZTIuc3RhdGUuc2V0O1xuICB2YXIgTW92ZSA9IENvbXBvbmVudHMyLk1vdmU7XG4gIHZhciBnZXRQb3NpdGlvbiA9IE1vdmUuZ2V0UG9zaXRpb24sXG4gICAgICBnZXRMaW1pdCA9IE1vdmUuZ2V0TGltaXQsXG4gICAgICBleGNlZWRlZExpbWl0ID0gTW92ZS5leGNlZWRlZExpbWl0LFxuICAgICAgdHJhbnNsYXRlID0gTW92ZS50cmFuc2xhdGU7XG4gIHZhciBpc1NsaWRlID0gU3BsaWRlMi5pcyhTTElERSk7XG4gIHZhciBpbnRlcnZhbDtcbiAgdmFyIGNhbGxiYWNrO1xuICB2YXIgZnJpY3Rpb24gPSAxO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIG9uKEVWRU5UX01PVkUsIGNsZWFyKTtcbiAgICBvbihbRVZFTlRfVVBEQVRFRCwgRVZFTlRfUkVGUkVTSF0sIGNhbmNlbCk7XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGwoZGVzdGluYXRpb24sIGR1cmF0aW9uLCBzbmFwLCBvblNjcm9sbGVkLCBub0NvbnN0cmFpbikge1xuICAgIHZhciBmcm9tID0gZ2V0UG9zaXRpb24oKTtcbiAgICBjbGVhcigpO1xuXG4gICAgaWYgKHNuYXAgJiYgKCFpc1NsaWRlIHx8ICFleGNlZWRlZExpbWl0KCkpKSB7XG4gICAgICB2YXIgc2l6ZSA9IENvbXBvbmVudHMyLkxheW91dC5zbGlkZXJTaXplKCk7XG4gICAgICB2YXIgb2Zmc2V0ID0gc2lnbihkZXN0aW5hdGlvbikgKiBzaXplICogZmxvb3IoYWJzKGRlc3RpbmF0aW9uKSAvIHNpemUpIHx8IDA7XG4gICAgICBkZXN0aW5hdGlvbiA9IE1vdmUudG9Qb3NpdGlvbihDb21wb25lbnRzMi5Db250cm9sbGVyLnRvRGVzdChkZXN0aW5hdGlvbiAlIHNpemUpKSArIG9mZnNldDtcbiAgICB9XG5cbiAgICB2YXIgbm9EaXN0YW5jZSA9IGFwcHJveGltYXRlbHlFcXVhbChmcm9tLCBkZXN0aW5hdGlvbiwgMSk7XG4gICAgZnJpY3Rpb24gPSAxO1xuICAgIGR1cmF0aW9uID0gbm9EaXN0YW5jZSA/IDAgOiBkdXJhdGlvbiB8fCBtYXgoYWJzKGRlc3RpbmF0aW9uIC0gZnJvbSkgLyBCQVNFX1ZFTE9DSVRZLCBNSU5fRFVSQVRJT04pO1xuICAgIGNhbGxiYWNrID0gb25TY3JvbGxlZDtcbiAgICBpbnRlcnZhbCA9IFJlcXVlc3RJbnRlcnZhbChkdXJhdGlvbiwgb25FbmQsIGFwcGx5KHVwZGF0ZSwgZnJvbSwgZGVzdGluYXRpb24sIG5vQ29uc3RyYWluKSwgMSk7XG4gICAgc2V0KFNDUk9MTElORyk7XG4gICAgZW1pdChFVkVOVF9TQ1JPTEwpO1xuICAgIGludGVydmFsLnN0YXJ0KCk7XG4gIH1cblxuICBmdW5jdGlvbiBvbkVuZCgpIHtcbiAgICBzZXQoSURMRSk7XG4gICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICBlbWl0KEVWRU5UX1NDUk9MTEVEKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShmcm9tLCB0bywgbm9Db25zdHJhaW4sIHJhdGUpIHtcbiAgICB2YXIgcG9zaXRpb24gPSBnZXRQb3NpdGlvbigpO1xuICAgIHZhciB0YXJnZXQgPSBmcm9tICsgKHRvIC0gZnJvbSkgKiBlYXNpbmcocmF0ZSk7XG4gICAgdmFyIGRpZmYgPSAodGFyZ2V0IC0gcG9zaXRpb24pICogZnJpY3Rpb247XG4gICAgdHJhbnNsYXRlKHBvc2l0aW9uICsgZGlmZik7XG5cbiAgICBpZiAoaXNTbGlkZSAmJiAhbm9Db25zdHJhaW4gJiYgZXhjZWVkZWRMaW1pdCgpKSB7XG4gICAgICBmcmljdGlvbiAqPSBGUklDVElPTl9GQUNUT1I7XG5cbiAgICAgIGlmIChhYnMoZGlmZikgPCBCT1VOQ0VfRElGRl9USFJFU0hPTEQpIHtcbiAgICAgICAgc2Nyb2xsKGdldExpbWl0KGV4Y2VlZGVkTGltaXQodHJ1ZSkpLCBCT1VOQ0VfRFVSQVRJT04sIGZhbHNlLCBjYWxsYmFjaywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgaWYgKGludGVydmFsKSB7XG4gICAgICBpbnRlcnZhbC5jYW5jZWwoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKGludGVydmFsICYmICFpbnRlcnZhbC5pc1BhdXNlZCgpKSB7XG4gICAgICBjbGVhcigpO1xuICAgICAgb25FbmQoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlYXNpbmcodCkge1xuICAgIHZhciBlYXNpbmdGdW5jID0gb3B0aW9ucy5lYXNpbmdGdW5jO1xuICAgIHJldHVybiBlYXNpbmdGdW5jID8gZWFzaW5nRnVuYyh0KSA6IDEgLSBNYXRoLnBvdygxIC0gdCwgNCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBjbGVhcixcbiAgICBzY3JvbGw6IHNjcm9sbCxcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufVxuXG52YXIgU0NST0xMX0xJU1RFTkVSX09QVElPTlMgPSB7XG4gIHBhc3NpdmU6IGZhbHNlLFxuICBjYXB0dXJlOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBEcmFnKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UxMCA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2UxMC5vbixcbiAgICAgIGVtaXQgPSBfRXZlbnRJbnRlcmZhY2UxMC5lbWl0LFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTEwLmJpbmQsXG4gICAgICB1bmJpbmQgPSBfRXZlbnRJbnRlcmZhY2UxMC51bmJpbmQ7XG5cbiAgdmFyIHN0YXRlID0gU3BsaWRlMi5zdGF0ZTtcbiAgdmFyIE1vdmUgPSBDb21wb25lbnRzMi5Nb3ZlLFxuICAgICAgU2Nyb2xsID0gQ29tcG9uZW50czIuU2Nyb2xsLFxuICAgICAgQ29udHJvbGxlciA9IENvbXBvbmVudHMyLkNvbnRyb2xsZXIsXG4gICAgICB0cmFjayA9IENvbXBvbmVudHMyLkVsZW1lbnRzLnRyYWNrLFxuICAgICAgcmVkdWNlID0gQ29tcG9uZW50czIuTWVkaWEucmVkdWNlO1xuICB2YXIgX0NvbXBvbmVudHMyJERpcmVjdGlvMiA9IENvbXBvbmVudHMyLkRpcmVjdGlvbixcbiAgICAgIHJlc29sdmUgPSBfQ29tcG9uZW50czIkRGlyZWN0aW8yLnJlc29sdmUsXG4gICAgICBvcmllbnQgPSBfQ29tcG9uZW50czIkRGlyZWN0aW8yLm9yaWVudDtcbiAgdmFyIGdldFBvc2l0aW9uID0gTW92ZS5nZXRQb3NpdGlvbixcbiAgICAgIGV4Y2VlZGVkTGltaXQgPSBNb3ZlLmV4Y2VlZGVkTGltaXQ7XG4gIHZhciBiYXNlUG9zaXRpb247XG4gIHZhciBiYXNlRXZlbnQ7XG4gIHZhciBwcmV2QmFzZUV2ZW50O1xuICB2YXIgaXNGcmVlO1xuICB2YXIgZHJhZ2dpbmc7XG4gIHZhciBleGNlZWRlZCA9IGZhbHNlO1xuICB2YXIgY2xpY2tQcmV2ZW50ZWQ7XG4gIHZhciBkaXNhYmxlZDtcbiAgdmFyIHRhcmdldDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBiaW5kKHRyYWNrLCBQT0lOVEVSX01PVkVfRVZFTlRTLCBub29wLCBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyk7XG4gICAgYmluZCh0cmFjaywgUE9JTlRFUl9VUF9FVkVOVFMsIG5vb3AsIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TKTtcbiAgICBiaW5kKHRyYWNrLCBQT0lOVEVSX0RPV05fRVZFTlRTLCBvblBvaW50ZXJEb3duLCBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyk7XG4gICAgYmluZCh0cmFjaywgXCJjbGlja1wiLCBvbkNsaWNrLCB7XG4gICAgICBjYXB0dXJlOiB0cnVlXG4gICAgfSk7XG4gICAgYmluZCh0cmFjaywgXCJkcmFnc3RhcnRcIiwgcHJldmVudCk7XG4gICAgb24oW0VWRU5UX01PVU5URUQsIEVWRU5UX1VQREFURURdLCBpbml0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIGRyYWcgPSBvcHRpb25zLmRyYWc7XG4gICAgZGlzYWJsZSghZHJhZyk7XG4gICAgaXNGcmVlID0gZHJhZyA9PT0gXCJmcmVlXCI7XG4gIH1cblxuICBmdW5jdGlvbiBvblBvaW50ZXJEb3duKGUpIHtcbiAgICBjbGlja1ByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgdmFyIGlzVG91Y2ggPSBpc1RvdWNoRXZlbnQoZSk7XG5cbiAgICAgIGlmIChpc0RyYWdnYWJsZShlLnRhcmdldCkgJiYgKGlzVG91Y2ggfHwgIWUuYnV0dG9uKSkge1xuICAgICAgICBpZiAoIUNvbnRyb2xsZXIuaXNCdXN5KCkpIHtcbiAgICAgICAgICB0YXJnZXQgPSBpc1RvdWNoID8gdHJhY2sgOiB3aW5kb3c7XG4gICAgICAgICAgZHJhZ2dpbmcgPSBzdGF0ZS5pcyhbTU9WSU5HLCBTQ1JPTExJTkddKTtcbiAgICAgICAgICBwcmV2QmFzZUV2ZW50ID0gbnVsbDtcbiAgICAgICAgICBiaW5kKHRhcmdldCwgUE9JTlRFUl9NT1ZFX0VWRU5UUywgb25Qb2ludGVyTW92ZSwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgICAgICAgIGJpbmQodGFyZ2V0LCBQT0lOVEVSX1VQX0VWRU5UUywgb25Qb2ludGVyVXAsIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TKTtcbiAgICAgICAgICBNb3ZlLmNhbmNlbCgpO1xuICAgICAgICAgIFNjcm9sbC5jYW5jZWwoKTtcbiAgICAgICAgICBzYXZlKGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByZXZlbnQoZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblBvaW50ZXJNb3ZlKGUpIHtcbiAgICBpZiAoIXN0YXRlLmlzKERSQUdHSU5HKSkge1xuICAgICAgc3RhdGUuc2V0KERSQUdHSU5HKTtcbiAgICAgIGVtaXQoRVZFTlRfRFJBRyk7XG4gICAgfVxuXG4gICAgaWYgKGUuY2FuY2VsYWJsZSkge1xuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIE1vdmUudHJhbnNsYXRlKGJhc2VQb3NpdGlvbiArIGNvbnN0cmFpbihkaWZmQ29vcmQoZSkpKTtcbiAgICAgICAgdmFyIGV4cGlyZWQgPSBkaWZmVGltZShlKSA+IExPR19JTlRFUlZBTDtcbiAgICAgICAgdmFyIGhhc0V4Y2VlZGVkID0gZXhjZWVkZWQgIT09IChleGNlZWRlZCA9IGV4Y2VlZGVkTGltaXQoKSk7XG5cbiAgICAgICAgaWYgKGV4cGlyZWQgfHwgaGFzRXhjZWVkZWQpIHtcbiAgICAgICAgICBzYXZlKGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xpY2tQcmV2ZW50ZWQgPSB0cnVlO1xuICAgICAgICBlbWl0KEVWRU5UX0RSQUdHSU5HKTtcbiAgICAgICAgcHJldmVudChlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNTbGlkZXJEaXJlY3Rpb24oZSkpIHtcbiAgICAgICAgZHJhZ2dpbmcgPSBzaG91bGRTdGFydChlKTtcbiAgICAgICAgcHJldmVudChlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblBvaW50ZXJVcChlKSB7XG4gICAgaWYgKHN0YXRlLmlzKERSQUdHSU5HKSkge1xuICAgICAgc3RhdGUuc2V0KElETEUpO1xuICAgICAgZW1pdChFVkVOVF9EUkFHR0VEKTtcbiAgICB9XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIG1vdmUoZSk7XG4gICAgICBwcmV2ZW50KGUpO1xuICAgIH1cblxuICAgIHVuYmluZCh0YXJnZXQsIFBPSU5URVJfTU9WRV9FVkVOVFMsIG9uUG9pbnRlck1vdmUpO1xuICAgIHVuYmluZCh0YXJnZXQsIFBPSU5URVJfVVBfRVZFTlRTLCBvblBvaW50ZXJVcCk7XG4gICAgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICAgIGlmICghZGlzYWJsZWQgJiYgY2xpY2tQcmV2ZW50ZWQpIHtcbiAgICAgIHByZXZlbnQoZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZShlKSB7XG4gICAgcHJldkJhc2VFdmVudCA9IGJhc2VFdmVudDtcbiAgICBiYXNlRXZlbnQgPSBlO1xuICAgIGJhc2VQb3NpdGlvbiA9IGdldFBvc2l0aW9uKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKGUpIHtcbiAgICB2YXIgdmVsb2NpdHkgPSBjb21wdXRlVmVsb2NpdHkoZSk7XG4gICAgdmFyIGRlc3RpbmF0aW9uID0gY29tcHV0ZURlc3RpbmF0aW9uKHZlbG9jaXR5KTtcbiAgICB2YXIgcmV3aW5kID0gb3B0aW9ucy5yZXdpbmQgJiYgb3B0aW9ucy5yZXdpbmRCeURyYWc7XG4gICAgcmVkdWNlKGZhbHNlKTtcblxuICAgIGlmIChpc0ZyZWUpIHtcbiAgICAgIENvbnRyb2xsZXIuc2Nyb2xsKGRlc3RpbmF0aW9uLCAwLCBvcHRpb25zLnNuYXApO1xuICAgIH0gZWxzZSBpZiAoU3BsaWRlMi5pcyhGQURFKSkge1xuICAgICAgQ29udHJvbGxlci5nbyhvcmllbnQoc2lnbih2ZWxvY2l0eSkpIDwgMCA/IHJld2luZCA/IFwiPFwiIDogXCItXCIgOiByZXdpbmQgPyBcIj5cIiA6IFwiK1wiKTtcbiAgICB9IGVsc2UgaWYgKFNwbGlkZTIuaXMoU0xJREUpICYmIGV4Y2VlZGVkICYmIHJld2luZCkge1xuICAgICAgQ29udHJvbGxlci5nbyhleGNlZWRlZExpbWl0KHRydWUpID8gXCI+XCIgOiBcIjxcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIENvbnRyb2xsZXIuZ28oQ29udHJvbGxlci50b0Rlc3QoZGVzdGluYXRpb24pLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZWR1Y2UodHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRTdGFydChlKSB7XG4gICAgdmFyIHRocmVzaG9sZHMgPSBvcHRpb25zLmRyYWdNaW5UaHJlc2hvbGQ7XG4gICAgdmFyIGlzT2JqID0gaXNPYmplY3QodGhyZXNob2xkcyk7XG4gICAgdmFyIG1vdXNlID0gaXNPYmogJiYgdGhyZXNob2xkcy5tb3VzZSB8fCAwO1xuICAgIHZhciB0b3VjaCA9IChpc09iaiA/IHRocmVzaG9sZHMudG91Y2ggOiArdGhyZXNob2xkcykgfHwgMTA7XG4gICAgcmV0dXJuIGFicyhkaWZmQ29vcmQoZSkpID4gKGlzVG91Y2hFdmVudChlKSA/IHRvdWNoIDogbW91c2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTbGlkZXJEaXJlY3Rpb24oZSkge1xuICAgIHJldHVybiBhYnMoZGlmZkNvb3JkKGUpKSA+IGFicyhkaWZmQ29vcmQoZSwgdHJ1ZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZVZlbG9jaXR5KGUpIHtcbiAgICBpZiAoU3BsaWRlMi5pcyhMT09QKSB8fCAhZXhjZWVkZWQpIHtcbiAgICAgIHZhciB0aW1lID0gZGlmZlRpbWUoZSk7XG5cbiAgICAgIGlmICh0aW1lICYmIHRpbWUgPCBMT0dfSU5URVJWQUwpIHtcbiAgICAgICAgcmV0dXJuIGRpZmZDb29yZChlKSAvIHRpbWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBmdW5jdGlvbiBjb21wdXRlRGVzdGluYXRpb24odmVsb2NpdHkpIHtcbiAgICByZXR1cm4gZ2V0UG9zaXRpb24oKSArIHNpZ24odmVsb2NpdHkpICogbWluKGFicyh2ZWxvY2l0eSkgKiAob3B0aW9ucy5mbGlja1Bvd2VyIHx8IDYwMCksIGlzRnJlZSA/IEluZmluaXR5IDogQ29tcG9uZW50czIuTGF5b3V0Lmxpc3RTaXplKCkgKiAob3B0aW9ucy5mbGlja01heFBhZ2VzIHx8IDEpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpZmZDb29yZChlLCBvcnRob2dvbmFsKSB7XG4gICAgcmV0dXJuIGNvb3JkT2YoZSwgb3J0aG9nb25hbCkgLSBjb29yZE9mKGdldEJhc2VFdmVudChlKSwgb3J0aG9nb25hbCk7XG4gIH1cblxuICBmdW5jdGlvbiBkaWZmVGltZShlKSB7XG4gICAgcmV0dXJuIHRpbWVPZihlKSAtIHRpbWVPZihnZXRCYXNlRXZlbnQoZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QmFzZUV2ZW50KGUpIHtcbiAgICByZXR1cm4gYmFzZUV2ZW50ID09PSBlICYmIHByZXZCYXNlRXZlbnQgfHwgYmFzZUV2ZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gY29vcmRPZihlLCBvcnRob2dvbmFsKSB7XG4gICAgcmV0dXJuIChpc1RvdWNoRXZlbnQoZSkgPyBlLmNoYW5nZWRUb3VjaGVzWzBdIDogZSlbXCJwYWdlXCIgKyByZXNvbHZlKG9ydGhvZ29uYWwgPyBcIllcIiA6IFwiWFwiKV07XG4gIH1cblxuICBmdW5jdGlvbiBjb25zdHJhaW4oZGlmZikge1xuICAgIHJldHVybiBkaWZmIC8gKGV4Y2VlZGVkICYmIFNwbGlkZTIuaXMoU0xJREUpID8gRlJJQ1RJT04gOiAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRHJhZ2dhYmxlKHRhcmdldDIpIHtcbiAgICB2YXIgbm9EcmFnID0gb3B0aW9ucy5ub0RyYWc7XG4gICAgcmV0dXJuICFtYXRjaGVzKHRhcmdldDIsIFwiLlwiICsgQ0xBU1NfUEFHSU5BVElPTl9QQUdFICsgXCIsIC5cIiArIENMQVNTX0FSUk9XKSAmJiAoIW5vRHJhZyB8fCAhbWF0Y2hlcyh0YXJnZXQyLCBub0RyYWcpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVG91Y2hFdmVudChlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBUb3VjaEV2ZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNEcmFnZ2luZygpIHtcbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNhYmxlKHZhbHVlKSB7XG4gICAgZGlzYWJsZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRpc2FibGU6IGRpc2FibGUsXG4gICAgaXNEcmFnZ2luZzogaXNEcmFnZ2luZ1xuICB9O1xufVxuXG52YXIgTk9STUFMSVpBVElPTl9NQVAgPSB7XG4gIFNwYWNlYmFyOiBcIiBcIixcbiAgUmlnaHQ6IEFSUk9XX1JJR0hULFxuICBMZWZ0OiBBUlJPV19MRUZULFxuICBVcDogQVJST1dfVVAsXG4gIERvd246IEFSUk9XX0RPV05cbn07XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUtleShrZXkpIHtcbiAga2V5ID0gaXNTdHJpbmcoa2V5KSA/IGtleSA6IGtleS5rZXk7XG4gIHJldHVybiBOT1JNQUxJWkFUSU9OX01BUFtrZXldIHx8IGtleTtcbn1cblxudmFyIEtFWUJPQVJEX0VWRU5UID0gXCJrZXlkb3duXCI7XG5cbmZ1bmN0aW9uIEtleWJvYXJkKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UxMSA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2UxMS5vbixcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UxMS5iaW5kLFxuICAgICAgdW5iaW5kID0gX0V2ZW50SW50ZXJmYWNlMTEudW5iaW5kO1xuXG4gIHZhciByb290ID0gU3BsaWRlMi5yb290O1xuICB2YXIgcmVzb2x2ZSA9IENvbXBvbmVudHMyLkRpcmVjdGlvbi5yZXNvbHZlO1xuICB2YXIgdGFyZ2V0O1xuICB2YXIgZGlzYWJsZWQ7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaW5pdCgpO1xuICAgIG9uKEVWRU5UX1VQREFURUQsIGRlc3Ryb3kpO1xuICAgIG9uKEVWRU5UX1VQREFURUQsIGluaXQpO1xuICAgIG9uKEVWRU5UX01PVkUsIG9uTW92ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBrZXlib2FyZCA9IG9wdGlvbnMua2V5Ym9hcmQ7XG5cbiAgICBpZiAoa2V5Ym9hcmQpIHtcbiAgICAgIHRhcmdldCA9IGtleWJvYXJkID09PSBcImdsb2JhbFwiID8gd2luZG93IDogcm9vdDtcbiAgICAgIGJpbmQodGFyZ2V0LCBLRVlCT0FSRF9FVkVOVCwgb25LZXlkb3duKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHVuYmluZCh0YXJnZXQsIEtFWUJPQVJEX0VWRU5UKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc2FibGUodmFsdWUpIHtcbiAgICBkaXNhYmxlZCA9IHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Nb3ZlKCkge1xuICAgIHZhciBfZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgZGlzYWJsZWQgPSBfZGlzYWJsZWQ7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBvbktleWRvd24oZSkge1xuICAgIGlmICghZGlzYWJsZWQpIHtcbiAgICAgIHZhciBrZXkgPSBub3JtYWxpemVLZXkoZSk7XG5cbiAgICAgIGlmIChrZXkgPT09IHJlc29sdmUoQVJST1dfTEVGVCkpIHtcbiAgICAgICAgU3BsaWRlMi5nbyhcIjxcIik7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gcmVzb2x2ZShBUlJPV19SSUdIVCkpIHtcbiAgICAgICAgU3BsaWRlMi5nbyhcIj5cIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBkaXNhYmxlOiBkaXNhYmxlXG4gIH07XG59XG5cbnZhciBTUkNfREFUQV9BVFRSSUJVVEUgPSBEQVRBX0FUVFJJQlVURSArIFwiLWxhenlcIjtcbnZhciBTUkNTRVRfREFUQV9BVFRSSUJVVEUgPSBTUkNfREFUQV9BVFRSSUJVVEUgKyBcIi1zcmNzZXRcIjtcbnZhciBJTUFHRV9TRUxFQ1RPUiA9IFwiW1wiICsgU1JDX0RBVEFfQVRUUklCVVRFICsgXCJdLCBbXCIgKyBTUkNTRVRfREFUQV9BVFRSSUJVVEUgKyBcIl1cIjtcblxuZnVuY3Rpb24gTGF6eUxvYWQoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTEyID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTEyLm9uLFxuICAgICAgb2ZmID0gX0V2ZW50SW50ZXJmYWNlMTIub2ZmLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTEyLmJpbmQsXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlMTIuZW1pdDtcblxuICB2YXIgaXNTZXF1ZW50aWFsID0gb3B0aW9ucy5sYXp5TG9hZCA9PT0gXCJzZXF1ZW50aWFsXCI7XG4gIHZhciBldmVudHMgPSBbRVZFTlRfTU9WRUQsIEVWRU5UX1NDUk9MTEVEXTtcbiAgdmFyIGVudHJpZXMgPSBbXTtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpZiAob3B0aW9ucy5sYXp5TG9hZCkge1xuICAgICAgaW5pdCgpO1xuICAgICAgb24oRVZFTlRfUkVGUkVTSCwgaW5pdCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBlbXB0eShlbnRyaWVzKTtcbiAgICByZWdpc3RlcigpO1xuXG4gICAgaWYgKGlzU2VxdWVudGlhbCkge1xuICAgICAgbG9hZE5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2ZmKGV2ZW50cyk7XG4gICAgICBvbihldmVudHMsIGNoZWNrKTtcbiAgICAgIGNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XG4gICAgQ29tcG9uZW50czIuU2xpZGVzLmZvckVhY2goZnVuY3Rpb24gKFNsaWRlKSB7XG4gICAgICBxdWVyeUFsbChTbGlkZS5zbGlkZSwgSU1BR0VfU0VMRUNUT1IpLmZvckVhY2goZnVuY3Rpb24gKGltZykge1xuICAgICAgICB2YXIgc3JjID0gZ2V0QXR0cmlidXRlKGltZywgU1JDX0RBVEFfQVRUUklCVVRFKTtcbiAgICAgICAgdmFyIHNyY3NldCA9IGdldEF0dHJpYnV0ZShpbWcsIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSk7XG5cbiAgICAgICAgaWYgKHNyYyAhPT0gaW1nLnNyYyB8fCBzcmNzZXQgIT09IGltZy5zcmNzZXQpIHtcbiAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gb3B0aW9ucy5jbGFzc2VzLnNwaW5uZXI7XG4gICAgICAgICAgdmFyIHBhcmVudCA9IGltZy5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgIHZhciBzcGlubmVyID0gY2hpbGQocGFyZW50LCBcIi5cIiArIGNsYXNzTmFtZSkgfHwgY3JlYXRlKFwic3BhblwiLCBjbGFzc05hbWUsIHBhcmVudCk7XG4gICAgICAgICAgZW50cmllcy5wdXNoKFtpbWcsIFNsaWRlLCBzcGlubmVyXSk7XG4gICAgICAgICAgaW1nLnNyYyB8fCBkaXNwbGF5KGltZywgXCJub25lXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrKCkge1xuICAgIGVudHJpZXMgPSBlbnRyaWVzLmZpbHRlcihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIGRpc3RhbmNlID0gb3B0aW9ucy5wZXJQYWdlICogKChvcHRpb25zLnByZWxvYWRQYWdlcyB8fCAxKSArIDEpIC0gMTtcbiAgICAgIHJldHVybiBkYXRhWzFdLmlzV2l0aGluKFNwbGlkZTIuaW5kZXgsIGRpc3RhbmNlKSA/IGxvYWQoZGF0YSkgOiB0cnVlO1xuICAgIH0pO1xuICAgIGVudHJpZXMubGVuZ3RoIHx8IG9mZihldmVudHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZChkYXRhKSB7XG4gICAgdmFyIGltZyA9IGRhdGFbMF07XG4gICAgYWRkQ2xhc3MoZGF0YVsxXS5zbGlkZSwgQ0xBU1NfTE9BRElORyk7XG4gICAgYmluZChpbWcsIFwibG9hZCBlcnJvclwiLCBhcHBseShvbkxvYWQsIGRhdGEpKTtcbiAgICBzZXRBdHRyaWJ1dGUoaW1nLCBcInNyY1wiLCBnZXRBdHRyaWJ1dGUoaW1nLCBTUkNfREFUQV9BVFRSSUJVVEUpKTtcbiAgICBzZXRBdHRyaWJ1dGUoaW1nLCBcInNyY3NldFwiLCBnZXRBdHRyaWJ1dGUoaW1nLCBTUkNTRVRfREFUQV9BVFRSSUJVVEUpKTtcbiAgICByZW1vdmVBdHRyaWJ1dGUoaW1nLCBTUkNfREFUQV9BVFRSSUJVVEUpO1xuICAgIHJlbW92ZUF0dHJpYnV0ZShpbWcsIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSk7XG4gIH1cblxuICBmdW5jdGlvbiBvbkxvYWQoZGF0YSwgZSkge1xuICAgIHZhciBpbWcgPSBkYXRhWzBdLFxuICAgICAgICBTbGlkZSA9IGRhdGFbMV07XG4gICAgcmVtb3ZlQ2xhc3MoU2xpZGUuc2xpZGUsIENMQVNTX0xPQURJTkcpO1xuXG4gICAgaWYgKGUudHlwZSAhPT0gXCJlcnJvclwiKSB7XG4gICAgICByZW1vdmUoZGF0YVsyXSk7XG4gICAgICBkaXNwbGF5KGltZywgXCJcIik7XG4gICAgICBlbWl0KEVWRU5UX0xBWllMT0FEX0xPQURFRCwgaW1nLCBTbGlkZSk7XG4gICAgICBlbWl0KEVWRU5UX1JFU0laRSk7XG4gICAgfVxuXG4gICAgaXNTZXF1ZW50aWFsICYmIGxvYWROZXh0KCk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkTmV4dCgpIHtcbiAgICBlbnRyaWVzLmxlbmd0aCAmJiBsb2FkKGVudHJpZXMuc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBhcHBseShlbXB0eSwgZW50cmllcyksXG4gICAgY2hlY2s6IGNoZWNrXG4gIH07XG59XG5cbmZ1bmN0aW9uIFBhZ2luYXRpb24oU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIGV2ZW50ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMik7XG4gIHZhciBvbiA9IGV2ZW50Lm9uLFxuICAgICAgZW1pdCA9IGV2ZW50LmVtaXQsXG4gICAgICBiaW5kID0gZXZlbnQuYmluZDtcbiAgdmFyIFNsaWRlcyA9IENvbXBvbmVudHMyLlNsaWRlcyxcbiAgICAgIEVsZW1lbnRzID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICBDb250cm9sbGVyID0gQ29tcG9uZW50czIuQ29udHJvbGxlcjtcbiAgdmFyIGhhc0ZvY3VzID0gQ29udHJvbGxlci5oYXNGb2N1cyxcbiAgICAgIGdldEluZGV4ID0gQ29udHJvbGxlci5nZXRJbmRleCxcbiAgICAgIGdvID0gQ29udHJvbGxlci5nbztcbiAgdmFyIHJlc29sdmUgPSBDb21wb25lbnRzMi5EaXJlY3Rpb24ucmVzb2x2ZTtcbiAgdmFyIHBsYWNlaG9sZGVyID0gRWxlbWVudHMucGFnaW5hdGlvbjtcbiAgdmFyIGl0ZW1zID0gW107XG4gIHZhciBsaXN0O1xuICB2YXIgcGFnaW5hdGlvbkNsYXNzZXM7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgZGVzdHJveSgpO1xuICAgIG9uKFtFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNIXSwgbW91bnQpO1xuICAgIHZhciBlbmFibGVkID0gb3B0aW9ucy5wYWdpbmF0aW9uICYmIFNsaWRlcy5pc0Vub3VnaCgpO1xuICAgIHBsYWNlaG9sZGVyICYmIGRpc3BsYXkocGxhY2Vob2xkZXIsIGVuYWJsZWQgPyBcIlwiIDogXCJub25lXCIpO1xuXG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIG9uKFtFVkVOVF9NT1ZFLCBFVkVOVF9TQ1JPTEwsIEVWRU5UX1NDUk9MTEVEXSwgdXBkYXRlKTtcbiAgICAgIGNyZWF0ZVBhZ2luYXRpb24oKTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgICAgZW1pdChFVkVOVF9QQUdJTkFUSU9OX01PVU5URUQsIHtcbiAgICAgICAgbGlzdDogbGlzdCxcbiAgICAgICAgaXRlbXM6IGl0ZW1zXG4gICAgICB9LCBnZXRBdChTcGxpZGUyLmluZGV4KSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBpZiAobGlzdCkge1xuICAgICAgcmVtb3ZlKHBsYWNlaG9sZGVyID8gc2xpY2UobGlzdC5jaGlsZHJlbikgOiBsaXN0KTtcbiAgICAgIHJlbW92ZUNsYXNzKGxpc3QsIHBhZ2luYXRpb25DbGFzc2VzKTtcbiAgICAgIGVtcHR5KGl0ZW1zKTtcbiAgICAgIGxpc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVBhZ2luYXRpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IFNwbGlkZTIubGVuZ3RoO1xuICAgIHZhciBjbGFzc2VzID0gb3B0aW9ucy5jbGFzc2VzLFxuICAgICAgICBpMThuID0gb3B0aW9ucy5pMThuLFxuICAgICAgICBwZXJQYWdlID0gb3B0aW9ucy5wZXJQYWdlO1xuICAgIHZhciBtYXggPSBoYXNGb2N1cygpID8gbGVuZ3RoIDogY2VpbChsZW5ndGggLyBwZXJQYWdlKTtcbiAgICBsaXN0ID0gcGxhY2Vob2xkZXIgfHwgY3JlYXRlKFwidWxcIiwgY2xhc3Nlcy5wYWdpbmF0aW9uLCBFbGVtZW50cy50cmFjay5wYXJlbnRFbGVtZW50KTtcbiAgICBhZGRDbGFzcyhsaXN0LCBwYWdpbmF0aW9uQ2xhc3NlcyA9IENMQVNTX1BBR0lOQVRJT04gKyBcIi0tXCIgKyBnZXREaXJlY3Rpb24oKSk7XG4gICAgc2V0QXR0cmlidXRlKGxpc3QsIFJPTEUsIFwidGFibGlzdFwiKTtcbiAgICBzZXRBdHRyaWJ1dGUobGlzdCwgQVJJQV9MQUJFTCwgaTE4bi5zZWxlY3QpO1xuICAgIHNldEF0dHJpYnV0ZShsaXN0LCBBUklBX09SSUVOVEFUSU9OLCBnZXREaXJlY3Rpb24oKSA9PT0gVFRCID8gXCJ2ZXJ0aWNhbFwiIDogXCJcIik7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICB2YXIgbGkgPSBjcmVhdGUoXCJsaVwiLCBudWxsLCBsaXN0KTtcbiAgICAgIHZhciBidXR0b24gPSBjcmVhdGUoXCJidXR0b25cIiwge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy5wYWdlLFxuICAgICAgICB0eXBlOiBcImJ1dHRvblwiXG4gICAgICB9LCBsaSk7XG4gICAgICB2YXIgY29udHJvbHMgPSBTbGlkZXMuZ2V0SW4oaSkubWFwKGZ1bmN0aW9uIChTbGlkZSkge1xuICAgICAgICByZXR1cm4gU2xpZGUuc2xpZGUuaWQ7XG4gICAgICB9KTtcbiAgICAgIHZhciB0ZXh0ID0gIWhhc0ZvY3VzKCkgJiYgcGVyUGFnZSA+IDEgPyBpMThuLnBhZ2VYIDogaTE4bi5zbGlkZVg7XG4gICAgICBiaW5kKGJ1dHRvbiwgXCJjbGlja1wiLCBhcHBseShvbkNsaWNrLCBpKSk7XG5cbiAgICAgIGlmIChvcHRpb25zLnBhZ2luYXRpb25LZXlib2FyZCkge1xuICAgICAgICBiaW5kKGJ1dHRvbiwgXCJrZXlkb3duXCIsIGFwcGx5KG9uS2V5ZG93biwgaSkpO1xuICAgICAgfVxuXG4gICAgICBzZXRBdHRyaWJ1dGUobGksIFJPTEUsIFwicHJlc2VudGF0aW9uXCIpO1xuICAgICAgc2V0QXR0cmlidXRlKGJ1dHRvbiwgUk9MRSwgXCJ0YWJcIik7XG4gICAgICBzZXRBdHRyaWJ1dGUoYnV0dG9uLCBBUklBX0NPTlRST0xTLCBjb250cm9scy5qb2luKFwiIFwiKSk7XG4gICAgICBzZXRBdHRyaWJ1dGUoYnV0dG9uLCBBUklBX0xBQkVMLCBmb3JtYXQodGV4dCwgaSArIDEpKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIFRBQl9JTkRFWCwgLTEpO1xuICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgIGxpOiBsaSxcbiAgICAgICAgYnV0dG9uOiBidXR0b24sXG4gICAgICAgIHBhZ2U6IGlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ2xpY2socGFnZSkge1xuICAgIGdvKFwiPlwiICsgcGFnZSwgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBvbktleWRvd24ocGFnZSwgZSkge1xuICAgIHZhciBsZW5ndGggPSBpdGVtcy5sZW5ndGg7XG4gICAgdmFyIGtleSA9IG5vcm1hbGl6ZUtleShlKTtcbiAgICB2YXIgZGlyID0gZ2V0RGlyZWN0aW9uKCk7XG4gICAgdmFyIG5leHRQYWdlID0gLTE7XG5cbiAgICBpZiAoa2V5ID09PSByZXNvbHZlKEFSUk9XX1JJR0hULCBmYWxzZSwgZGlyKSkge1xuICAgICAgbmV4dFBhZ2UgPSArK3BhZ2UgJSBsZW5ndGg7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09IHJlc29sdmUoQVJST1dfTEVGVCwgZmFsc2UsIGRpcikpIHtcbiAgICAgIG5leHRQYWdlID0gKC0tcGFnZSArIGxlbmd0aCkgJSBsZW5ndGg7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwiSG9tZVwiKSB7XG4gICAgICBuZXh0UGFnZSA9IDA7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwiRW5kXCIpIHtcbiAgICAgIG5leHRQYWdlID0gbGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICB2YXIgaXRlbSA9IGl0ZW1zW25leHRQYWdlXTtcblxuICAgIGlmIChpdGVtKSB7XG4gICAgICBmb2N1cyhpdGVtLmJ1dHRvbik7XG4gICAgICBnbyhcIj5cIiArIG5leHRQYWdlKTtcbiAgICAgIHByZXZlbnQoZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGlyZWN0aW9uKCkge1xuICAgIHJldHVybiBvcHRpb25zLnBhZ2luYXRpb25EaXJlY3Rpb24gfHwgb3B0aW9ucy5kaXJlY3Rpb247XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBdChpbmRleCkge1xuICAgIHJldHVybiBpdGVtc1tDb250cm9sbGVyLnRvUGFnZShpbmRleCldO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHZhciBwcmV2ID0gZ2V0QXQoZ2V0SW5kZXgodHJ1ZSkpO1xuICAgIHZhciBjdXJyID0gZ2V0QXQoZ2V0SW5kZXgoKSk7XG5cbiAgICBpZiAocHJldikge1xuICAgICAgdmFyIGJ1dHRvbiA9IHByZXYuYnV0dG9uO1xuICAgICAgcmVtb3ZlQ2xhc3MoYnV0dG9uLCBDTEFTU19BQ1RJVkUpO1xuICAgICAgcmVtb3ZlQXR0cmlidXRlKGJ1dHRvbiwgQVJJQV9TRUxFQ1RFRCk7XG4gICAgICBzZXRBdHRyaWJ1dGUoYnV0dG9uLCBUQUJfSU5ERVgsIC0xKTtcbiAgICB9XG5cbiAgICBpZiAoY3Vycikge1xuICAgICAgdmFyIF9idXR0b24gPSBjdXJyLmJ1dHRvbjtcbiAgICAgIGFkZENsYXNzKF9idXR0b24sIENMQVNTX0FDVElWRSk7XG4gICAgICBzZXRBdHRyaWJ1dGUoX2J1dHRvbiwgQVJJQV9TRUxFQ1RFRCwgdHJ1ZSk7XG4gICAgICBzZXRBdHRyaWJ1dGUoX2J1dHRvbiwgVEFCX0lOREVYLCBcIlwiKTtcbiAgICB9XG5cbiAgICBlbWl0KEVWRU5UX1BBR0lOQVRJT05fVVBEQVRFRCwge1xuICAgICAgbGlzdDogbGlzdCxcbiAgICAgIGl0ZW1zOiBpdGVtc1xuICAgIH0sIHByZXYsIGN1cnIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpdGVtczogaXRlbXMsXG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgZ2V0QXQ6IGdldEF0LFxuICAgIHVwZGF0ZTogdXBkYXRlXG4gIH07XG59XG5cbnZhciBUUklHR0VSX0tFWVMgPSBbXCIgXCIsIFwiRW50ZXJcIl07XG5cbmZ1bmN0aW9uIFN5bmMoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIGlzTmF2aWdhdGlvbiA9IG9wdGlvbnMuaXNOYXZpZ2F0aW9uLFxuICAgICAgc2xpZGVGb2N1cyA9IG9wdGlvbnMuc2xpZGVGb2N1cztcbiAgdmFyIGV2ZW50cyA9IFtdO1xuXG4gIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgIFNwbGlkZTIub3B0aW9ucyA9IHtcbiAgICAgIHNsaWRlRm9jdXM6IGlzVW5kZWZpbmVkKHNsaWRlRm9jdXMpID8gaXNOYXZpZ2F0aW9uIDogc2xpZGVGb2N1c1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBTcGxpZGUyLnNwbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICBpZiAoIXRhcmdldC5pc1BhcmVudCkge1xuICAgICAgICBzeW5jKFNwbGlkZTIsIHRhcmdldC5zcGxpZGUpO1xuICAgICAgICBzeW5jKHRhcmdldC5zcGxpZGUsIFNwbGlkZTIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGlzTmF2aWdhdGlvbikge1xuICAgICAgbmF2aWdhdGUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQuZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIGVtcHR5KGV2ZW50cyk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdW50KCkge1xuICAgIGRlc3Ryb3koKTtcbiAgICBtb3VudCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3luYyhzcGxpZGUsIHRhcmdldCkge1xuICAgIHZhciBldmVudCA9IEV2ZW50SW50ZXJmYWNlKHNwbGlkZSk7XG4gICAgZXZlbnQub24oRVZFTlRfTU9WRSwgZnVuY3Rpb24gKGluZGV4LCBwcmV2LCBkZXN0KSB7XG4gICAgICB0YXJnZXQuZ28odGFyZ2V0LmlzKExPT1ApID8gZGVzdCA6IGluZGV4KTtcbiAgICB9KTtcbiAgICBldmVudHMucHVzaChldmVudCk7XG4gIH1cblxuICBmdW5jdGlvbiBuYXZpZ2F0ZSgpIHtcbiAgICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgICB2YXIgb24gPSBldmVudC5vbjtcbiAgICBvbihFVkVOVF9DTElDSywgb25DbGljayk7XG4gICAgb24oRVZFTlRfU0xJREVfS0VZRE9XTiwgb25LZXlkb3duKTtcbiAgICBvbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfVVBEQVRFRF0sIHVwZGF0ZSk7XG4gICAgZXZlbnRzLnB1c2goZXZlbnQpO1xuICAgIGV2ZW50LmVtaXQoRVZFTlRfTkFWSUdBVElPTl9NT1VOVEVELCBTcGxpZGUyLnNwbGlkZXMpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHNldEF0dHJpYnV0ZShDb21wb25lbnRzMi5FbGVtZW50cy5saXN0LCBBUklBX09SSUVOVEFUSU9OLCBvcHRpb25zLmRpcmVjdGlvbiA9PT0gVFRCID8gXCJ2ZXJ0aWNhbFwiIDogXCJcIik7XG4gIH1cblxuICBmdW5jdGlvbiBvbkNsaWNrKFNsaWRlKSB7XG4gICAgU3BsaWRlMi5nbyhTbGlkZS5pbmRleCk7XG4gIH1cblxuICBmdW5jdGlvbiBvbktleWRvd24oU2xpZGUsIGUpIHtcbiAgICBpZiAoaW5jbHVkZXMoVFJJR0dFUl9LRVlTLCBub3JtYWxpemVLZXkoZSkpKSB7XG4gICAgICBvbkNsaWNrKFNsaWRlKTtcbiAgICAgIHByZXZlbnQoZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZXR1cDogc2V0dXAsXG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgcmVtb3VudDogcmVtb3VudFxuICB9O1xufVxuXG5mdW5jdGlvbiBXaGVlbChTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMTMgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UxMy5iaW5kO1xuXG4gIHZhciBsYXN0VGltZSA9IDA7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKG9wdGlvbnMud2hlZWwpIHtcbiAgICAgIGJpbmQoQ29tcG9uZW50czIuRWxlbWVudHMudHJhY2ssIFwid2hlZWxcIiwgb25XaGVlbCwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uV2hlZWwoZSkge1xuICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgIHZhciBkZWx0YVkgPSBlLmRlbHRhWTtcbiAgICAgIHZhciBiYWNrd2FyZHMgPSBkZWx0YVkgPCAwO1xuICAgICAgdmFyIHRpbWVTdGFtcCA9IHRpbWVPZihlKTtcblxuICAgICAgdmFyIF9taW4gPSBvcHRpb25zLndoZWVsTWluVGhyZXNob2xkIHx8IDA7XG5cbiAgICAgIHZhciBzbGVlcCA9IG9wdGlvbnMud2hlZWxTbGVlcCB8fCAwO1xuXG4gICAgICBpZiAoYWJzKGRlbHRhWSkgPiBfbWluICYmIHRpbWVTdGFtcCAtIGxhc3RUaW1lID4gc2xlZXApIHtcbiAgICAgICAgU3BsaWRlMi5nbyhiYWNrd2FyZHMgPyBcIjxcIiA6IFwiPlwiKTtcbiAgICAgICAgbGFzdFRpbWUgPSB0aW1lU3RhbXA7XG4gICAgICB9XG5cbiAgICAgIHNob3VsZFByZXZlbnQoYmFja3dhcmRzKSAmJiBwcmV2ZW50KGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZFByZXZlbnQoYmFja3dhcmRzKSB7XG4gICAgcmV0dXJuICFvcHRpb25zLnJlbGVhc2VXaGVlbCB8fCBTcGxpZGUyLnN0YXRlLmlzKE1PVklORykgfHwgQ29tcG9uZW50czIuQ29udHJvbGxlci5nZXRBZGphY2VudChiYWNrd2FyZHMpICE9PSAtMTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50XG4gIH07XG59XG5cbnZhciBTUl9SRU1PVkFMX0RFTEFZID0gOTA7XG5cbmZ1bmN0aW9uIExpdmUoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTE0ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTE0Lm9uO1xuXG4gIHZhciB0cmFjayA9IENvbXBvbmVudHMyLkVsZW1lbnRzLnRyYWNrO1xuICB2YXIgZW5hYmxlZCA9IG9wdGlvbnMubGl2ZSAmJiAhb3B0aW9ucy5pc05hdmlnYXRpb247XG4gIHZhciBzciA9IGNyZWF0ZShcInNwYW5cIiwgQ0xBU1NfU1IpO1xuICB2YXIgaW50ZXJ2YWwgPSBSZXF1ZXN0SW50ZXJ2YWwoU1JfUkVNT1ZBTF9ERUxBWSwgYXBwbHkodG9nZ2xlLCBmYWxzZSkpO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICBkaXNhYmxlKCFDb21wb25lbnRzMi5BdXRvcGxheS5pc1BhdXNlZCgpKTtcbiAgICAgIHNldEF0dHJpYnV0ZSh0cmFjaywgQVJJQV9BVE9NSUMsIHRydWUpO1xuICAgICAgc3IudGV4dENvbnRlbnQgPSBcIlxcdTIwMjZcIjtcbiAgICAgIG9uKEVWRU5UX0FVVE9QTEFZX1BMQVksIGFwcGx5KGRpc2FibGUsIHRydWUpKTtcbiAgICAgIG9uKEVWRU5UX0FVVE9QTEFZX1BBVVNFLCBhcHBseShkaXNhYmxlLCBmYWxzZSkpO1xuICAgICAgb24oW0VWRU5UX01PVkVELCBFVkVOVF9TQ1JPTExFRF0sIGFwcGx5KHRvZ2dsZSwgdHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZShhY3RpdmUpIHtcbiAgICBzZXRBdHRyaWJ1dGUodHJhY2ssIEFSSUFfQlVTWSwgYWN0aXZlKTtcblxuICAgIGlmIChhY3RpdmUpIHtcbiAgICAgIGFwcGVuZCh0cmFjaywgc3IpO1xuICAgICAgaW50ZXJ2YWwuc3RhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKHNyKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHJlbW92ZUF0dHJpYnV0ZSh0cmFjaywgW0FSSUFfTElWRSwgQVJJQV9BVE9NSUMsIEFSSUFfQlVTWV0pO1xuICAgIHJlbW92ZShzcik7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNhYmxlKGRpc2FibGVkKSB7XG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIHNldEF0dHJpYnV0ZSh0cmFjaywgQVJJQV9MSVZFLCBkaXNhYmxlZCA/IFwib2ZmXCIgOiBcInBvbGl0ZVwiKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkaXNhYmxlOiBkaXNhYmxlLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfTtcbn1cblxudmFyIENvbXBvbmVudENvbnN0cnVjdG9ycyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgX19wcm90b19fOiBudWxsLFxuICBNZWRpYTogTWVkaWEsXG4gIERpcmVjdGlvbjogRGlyZWN0aW9uLFxuICBFbGVtZW50czogRWxlbWVudHMsXG4gIFNsaWRlczogU2xpZGVzLFxuICBMYXlvdXQ6IExheW91dCxcbiAgQ2xvbmVzOiBDbG9uZXMsXG4gIE1vdmU6IE1vdmUsXG4gIENvbnRyb2xsZXI6IENvbnRyb2xsZXIsXG4gIEFycm93czogQXJyb3dzLFxuICBBdXRvcGxheTogQXV0b3BsYXksXG4gIENvdmVyOiBDb3ZlcixcbiAgU2Nyb2xsOiBTY3JvbGwsXG4gIERyYWc6IERyYWcsXG4gIEtleWJvYXJkOiBLZXlib2FyZCxcbiAgTGF6eUxvYWQ6IExhenlMb2FkLFxuICBQYWdpbmF0aW9uOiBQYWdpbmF0aW9uLFxuICBTeW5jOiBTeW5jLFxuICBXaGVlbDogV2hlZWwsXG4gIExpdmU6IExpdmVcbn0pO1xudmFyIEkxOE4gPSB7XG4gIHByZXY6IFwiUHJldmlvdXMgc2xpZGVcIixcbiAgbmV4dDogXCJOZXh0IHNsaWRlXCIsXG4gIGZpcnN0OiBcIkdvIHRvIGZpcnN0IHNsaWRlXCIsXG4gIGxhc3Q6IFwiR28gdG8gbGFzdCBzbGlkZVwiLFxuICBzbGlkZVg6IFwiR28gdG8gc2xpZGUgJXNcIixcbiAgcGFnZVg6IFwiR28gdG8gcGFnZSAlc1wiLFxuICBwbGF5OiBcIlN0YXJ0IGF1dG9wbGF5XCIsXG4gIHBhdXNlOiBcIlBhdXNlIGF1dG9wbGF5XCIsXG4gIGNhcm91c2VsOiBcImNhcm91c2VsXCIsXG4gIHNsaWRlOiBcInNsaWRlXCIsXG4gIHNlbGVjdDogXCJTZWxlY3QgYSBzbGlkZSB0byBzaG93XCIsXG4gIHNsaWRlTGFiZWw6IFwiJXMgb2YgJXNcIlxufTtcbnZhciBERUZBVUxUUyA9IHtcbiAgdHlwZTogXCJzbGlkZVwiLFxuICByb2xlOiBcInJlZ2lvblwiLFxuICBzcGVlZDogNDAwLFxuICBwZXJQYWdlOiAxLFxuICBjbG9uZVN0YXR1czogdHJ1ZSxcbiAgYXJyb3dzOiB0cnVlLFxuICBwYWdpbmF0aW9uOiB0cnVlLFxuICBwYWdpbmF0aW9uS2V5Ym9hcmQ6IHRydWUsXG4gIGludGVydmFsOiA1ZTMsXG4gIHBhdXNlT25Ib3ZlcjogdHJ1ZSxcbiAgcGF1c2VPbkZvY3VzOiB0cnVlLFxuICByZXNldFByb2dyZXNzOiB0cnVlLFxuICBlYXNpbmc6IFwiY3ViaWMtYmV6aWVyKDAuMjUsIDEsIDAuNSwgMSlcIixcbiAgZHJhZzogdHJ1ZSxcbiAgZGlyZWN0aW9uOiBcImx0clwiLFxuICB0cmltU3BhY2U6IHRydWUsXG4gIGZvY3VzYWJsZU5vZGVzOiBcImEsIGJ1dHRvbiwgdGV4dGFyZWEsIGlucHV0LCBzZWxlY3QsIGlmcmFtZVwiLFxuICBsaXZlOiB0cnVlLFxuICBjbGFzc2VzOiBDTEFTU0VTLFxuICBpMThuOiBJMThOLFxuICByZWR1Y2VkTW90aW9uOiB7XG4gICAgc3BlZWQ6IDAsXG4gICAgcmV3aW5kU3BlZWQ6IDAsXG4gICAgYXV0b3BsYXk6IFwicGF1c2VcIlxuICB9XG59O1xuXG5mdW5jdGlvbiBGYWRlKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UxNSA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2UxNS5vbjtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBvbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfUkVGUkVTSF0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgQ29tcG9uZW50czIuU2xpZGVzLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgXCIgKyBvcHRpb25zLnNwZWVkICsgXCJtcyBcIiArIG9wdGlvbnMuZWFzaW5nKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQoaW5kZXgsIGRvbmUpIHtcbiAgICB2YXIgdHJhY2sgPSBDb21wb25lbnRzMi5FbGVtZW50cy50cmFjaztcbiAgICBzdHlsZSh0cmFjaywgXCJoZWlnaHRcIiwgdW5pdChyZWN0KHRyYWNrKS5oZWlnaHQpKTtcbiAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBkb25lKCk7XG4gICAgICBzdHlsZSh0cmFjaywgXCJoZWlnaHRcIiwgXCJcIik7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBzdGFydDogc3RhcnQsXG4gICAgY2FuY2VsOiBub29wXG4gIH07XG59XG5cbmZ1bmN0aW9uIFNsaWRlKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UxNiA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTE2LmJpbmQ7XG5cbiAgdmFyIE1vdmUgPSBDb21wb25lbnRzMi5Nb3ZlLFxuICAgICAgQ29udHJvbGxlciA9IENvbXBvbmVudHMyLkNvbnRyb2xsZXIsXG4gICAgICBTY3JvbGwgPSBDb21wb25lbnRzMi5TY3JvbGw7XG4gIHZhciBsaXN0ID0gQ29tcG9uZW50czIuRWxlbWVudHMubGlzdDtcbiAgdmFyIHRyYW5zaXRpb24gPSBhcHBseShzdHlsZSwgbGlzdCwgXCJ0cmFuc2l0aW9uXCIpO1xuICB2YXIgZW5kQ2FsbGJhY2s7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgYmluZChsaXN0LCBcInRyYW5zaXRpb25lbmRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnRhcmdldCA9PT0gbGlzdCAmJiBlbmRDYWxsYmFjaykge1xuICAgICAgICBjYW5jZWwoKTtcbiAgICAgICAgZW5kQ2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KGluZGV4LCBkb25lKSB7XG4gICAgdmFyIGRlc3RpbmF0aW9uID0gTW92ZS50b1Bvc2l0aW9uKGluZGV4LCB0cnVlKTtcbiAgICB2YXIgcG9zaXRpb24gPSBNb3ZlLmdldFBvc2l0aW9uKCk7XG4gICAgdmFyIHNwZWVkID0gZ2V0U3BlZWQoaW5kZXgpO1xuXG4gICAgaWYgKGFicyhkZXN0aW5hdGlvbiAtIHBvc2l0aW9uKSA+PSAxICYmIHNwZWVkID49IDEpIHtcbiAgICAgIGlmIChvcHRpb25zLnVzZVNjcm9sbCkge1xuICAgICAgICBTY3JvbGwuc2Nyb2xsKGRlc3RpbmF0aW9uLCBzcGVlZCwgZmFsc2UsIGRvbmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNpdGlvbihcInRyYW5zZm9ybSBcIiArIHNwZWVkICsgXCJtcyBcIiArIG9wdGlvbnMuZWFzaW5nKTtcbiAgICAgICAgTW92ZS50cmFuc2xhdGUoZGVzdGluYXRpb24sIHRydWUpO1xuICAgICAgICBlbmRDYWxsYmFjayA9IGRvbmU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIE1vdmUuanVtcChpbmRleCk7XG4gICAgICBkb25lKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIHRyYW5zaXRpb24oXCJcIik7XG4gICAgU2Nyb2xsLmNhbmNlbCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3BlZWQoaW5kZXgpIHtcbiAgICB2YXIgcmV3aW5kU3BlZWQgPSBvcHRpb25zLnJld2luZFNwZWVkO1xuXG4gICAgaWYgKFNwbGlkZTIuaXMoU0xJREUpICYmIHJld2luZFNwZWVkKSB7XG4gICAgICB2YXIgcHJldiA9IENvbnRyb2xsZXIuZ2V0SW5kZXgodHJ1ZSk7XG4gICAgICB2YXIgZW5kID0gQ29udHJvbGxlci5nZXRFbmQoKTtcblxuICAgICAgaWYgKHByZXYgPT09IDAgJiYgaW5kZXggPj0gZW5kIHx8IHByZXYgPj0gZW5kICYmIGluZGV4ID09PSAwKSB7XG4gICAgICAgIHJldHVybiByZXdpbmRTcGVlZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucy5zcGVlZDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIHN0YXJ0OiBzdGFydCxcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufVxuXG52YXIgX1NwbGlkZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIF9TcGxpZGUodGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgdGhpcy5ldmVudCA9IEV2ZW50SW50ZXJmYWNlKCk7XG4gICAgdGhpcy5Db21wb25lbnRzID0ge307XG4gICAgdGhpcy5zdGF0ZSA9IFN0YXRlKENSRUFURUQpO1xuICAgIHRoaXMuc3BsaWRlcyA9IFtdO1xuICAgIHRoaXMuX28gPSB7fTtcbiAgICB0aGlzLl9FID0ge307XG4gICAgdmFyIHJvb3QgPSBpc1N0cmluZyh0YXJnZXQpID8gcXVlcnkoZG9jdW1lbnQsIHRhcmdldCkgOiB0YXJnZXQ7XG4gICAgYXNzZXJ0KHJvb3QsIHJvb3QgKyBcIiBpcyBpbnZhbGlkLlwiKTtcbiAgICB0aGlzLnJvb3QgPSByb290O1xuICAgIG9wdGlvbnMgPSBtZXJnZSh7XG4gICAgICBsYWJlbDogZ2V0QXR0cmlidXRlKHJvb3QsIEFSSUFfTEFCRUwpIHx8IFwiXCIsXG4gICAgICBsYWJlbGxlZGJ5OiBnZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9MQUJFTExFREJZKSB8fCBcIlwiXG4gICAgfSwgREVGQVVMVFMsIF9TcGxpZGUuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG4gICAgdHJ5IHtcbiAgICAgIG1lcmdlKG9wdGlvbnMsIEpTT04ucGFyc2UoZ2V0QXR0cmlidXRlKHJvb3QsIERBVEFfQVRUUklCVVRFKSkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGFzc2VydChmYWxzZSwgXCJJbnZhbGlkIEpTT05cIik7XG4gICAgfVxuXG4gICAgdGhpcy5fbyA9IE9iamVjdC5jcmVhdGUobWVyZ2Uoe30sIG9wdGlvbnMpKTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBfU3BsaWRlLnByb3RvdHlwZTtcblxuICBfcHJvdG8ubW91bnQgPSBmdW5jdGlvbiBtb3VudChFeHRlbnNpb25zLCBUcmFuc2l0aW9uKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGUsXG4gICAgICAgIENvbXBvbmVudHMyID0gdGhpcy5Db21wb25lbnRzO1xuICAgIGFzc2VydChzdGF0ZS5pcyhbQ1JFQVRFRCwgREVTVFJPWUVEXSksIFwiQWxyZWFkeSBtb3VudGVkIVwiKTtcbiAgICBzdGF0ZS5zZXQoQ1JFQVRFRCk7XG4gICAgdGhpcy5fQyA9IENvbXBvbmVudHMyO1xuICAgIHRoaXMuX1QgPSBUcmFuc2l0aW9uIHx8IHRoaXMuX1QgfHwgKHRoaXMuaXMoRkFERSkgPyBGYWRlIDogU2xpZGUpO1xuICAgIHRoaXMuX0UgPSBFeHRlbnNpb25zIHx8IHRoaXMuX0U7XG4gICAgdmFyIENvbnN0cnVjdG9ycyA9IGFzc2lnbih7fSwgQ29tcG9uZW50Q29uc3RydWN0b3JzLCB0aGlzLl9FLCB7XG4gICAgICBUcmFuc2l0aW9uOiB0aGlzLl9UXG4gICAgfSk7XG4gICAgZm9yT3duKENvbnN0cnVjdG9ycywgZnVuY3Rpb24gKENvbXBvbmVudCwga2V5KSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gQ29tcG9uZW50KF90aGlzLCBDb21wb25lbnRzMiwgX3RoaXMuX28pO1xuICAgICAgQ29tcG9uZW50czJba2V5XSA9IGNvbXBvbmVudDtcbiAgICAgIGNvbXBvbmVudC5zZXR1cCAmJiBjb21wb25lbnQuc2V0dXAoKTtcbiAgICB9KTtcbiAgICBmb3JPd24oQ29tcG9uZW50czIsIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgIGNvbXBvbmVudC5tb3VudCAmJiBjb21wb25lbnQubW91bnQoKTtcbiAgICB9KTtcbiAgICB0aGlzLmVtaXQoRVZFTlRfTU9VTlRFRCk7XG4gICAgYWRkQ2xhc3ModGhpcy5yb290LCBDTEFTU19JTklUSUFMSVpFRCk7XG4gICAgc3RhdGUuc2V0KElETEUpO1xuICAgIHRoaXMuZW1pdChFVkVOVF9SRUFEWSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLnN5bmMgPSBmdW5jdGlvbiBzeW5jKHNwbGlkZSkge1xuICAgIHRoaXMuc3BsaWRlcy5wdXNoKHtcbiAgICAgIHNwbGlkZTogc3BsaWRlXG4gICAgfSk7XG4gICAgc3BsaWRlLnNwbGlkZXMucHVzaCh7XG4gICAgICBzcGxpZGU6IHRoaXMsXG4gICAgICBpc1BhcmVudDogdHJ1ZVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuaXMoSURMRSkpIHtcbiAgICAgIHRoaXMuX0MuU3luYy5yZW1vdW50KCk7XG5cbiAgICAgIHNwbGlkZS5Db21wb25lbnRzLlN5bmMucmVtb3VudCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5nbyA9IGZ1bmN0aW9uIGdvKGNvbnRyb2wpIHtcbiAgICB0aGlzLl9DLkNvbnRyb2xsZXIuZ28oY29udHJvbCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8ub24gPSBmdW5jdGlvbiBvbihldmVudHMsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5ldmVudC5vbihldmVudHMsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8ub2ZmID0gZnVuY3Rpb24gb2ZmKGV2ZW50cykge1xuICAgIHRoaXMuZXZlbnQub2ZmKGV2ZW50cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2ZW50KSB7XG4gICAgdmFyIF90aGlzJGV2ZW50O1xuXG4gICAgKF90aGlzJGV2ZW50ID0gdGhpcy5ldmVudCkuZW1pdC5hcHBseShfdGhpcyRldmVudCwgW2V2ZW50XS5jb25jYXQoc2xpY2UoYXJndW1lbnRzLCAxKSkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmFkZCA9IGZ1bmN0aW9uIGFkZChzbGlkZXMsIGluZGV4KSB7XG4gICAgdGhpcy5fQy5TbGlkZXMuYWRkKHNsaWRlcywgaW5kZXgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShtYXRjaGVyKSB7XG4gICAgdGhpcy5fQy5TbGlkZXMucmVtb3ZlKG1hdGNoZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmlzID0gZnVuY3Rpb24gaXModHlwZSkge1xuICAgIHJldHVybiB0aGlzLl9vLnR5cGUgPT09IHR5cGU7XG4gIH07XG5cbiAgX3Byb3RvLnJlZnJlc2ggPSBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgIHRoaXMuZW1pdChFVkVOVF9SRUZSRVNIKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3koY29tcGxldGVseSkge1xuICAgIGlmIChjb21wbGV0ZWx5ID09PSB2b2lkIDApIHtcbiAgICAgIGNvbXBsZXRlbHkgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBldmVudCA9IHRoaXMuZXZlbnQsXG4gICAgICAgIHN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmIChzdGF0ZS5pcyhDUkVBVEVEKSkge1xuICAgICAgRXZlbnRJbnRlcmZhY2UodGhpcykub24oRVZFTlRfUkVBRFksIHRoaXMuZGVzdHJveS5iaW5kKHRoaXMsIGNvbXBsZXRlbHkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yT3duKHRoaXMuX0MsIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgY29tcG9uZW50LmRlc3Ryb3kgJiYgY29tcG9uZW50LmRlc3Ryb3koY29tcGxldGVseSk7XG4gICAgICB9LCB0cnVlKTtcbiAgICAgIGV2ZW50LmVtaXQoRVZFTlRfREVTVFJPWSk7XG4gICAgICBldmVudC5kZXN0cm95KCk7XG4gICAgICBjb21wbGV0ZWx5ICYmIGVtcHR5KHRoaXMuc3BsaWRlcyk7XG4gICAgICBzdGF0ZS5zZXQoREVTVFJPWUVEKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfY3JlYXRlQ2xhc3MoX1NwbGlkZSwgW3tcbiAgICBrZXk6IFwib3B0aW9uc1wiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX287XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChvcHRpb25zKSB7XG4gICAgICB0aGlzLl9DLk1lZGlhLnNldChvcHRpb25zLCB0cnVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibGVuZ3RoXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fQy5TbGlkZXMuZ2V0TGVuZ3RoKHRydWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbmRleFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX0MuQ29udHJvbGxlci5nZXRJbmRleCgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBfU3BsaWRlO1xufSgpO1xuXG52YXIgU3BsaWRlID0gX1NwbGlkZTtcblNwbGlkZS5kZWZhdWx0cyA9IHt9O1xuU3BsaWRlLlNUQVRFUyA9IFNUQVRFUztcbnZhciBDTEFTU19SRU5ERVJFRCA9IFwiaXMtcmVuZGVyZWRcIjtcbnZhciBSRU5ERVJFUl9ERUZBVUxUX0NPTkZJRyA9IHtcbiAgbGlzdFRhZzogXCJ1bFwiLFxuICBzbGlkZVRhZzogXCJsaVwiXG59O1xuXG52YXIgU3R5bGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdHlsZShpZCwgb3B0aW9ucykge1xuICAgIHRoaXMuc3R5bGVzID0ge307XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICB2YXIgX3Byb3RvMiA9IFN0eWxlLnByb3RvdHlwZTtcblxuICBfcHJvdG8yLnJ1bGUgPSBmdW5jdGlvbiBydWxlKHNlbGVjdG9yLCBwcm9wLCB2YWx1ZSwgYnJlYWtwb2ludCkge1xuICAgIGJyZWFrcG9pbnQgPSBicmVha3BvaW50IHx8IFwiZGVmYXVsdFwiO1xuICAgIHZhciBzZWxlY3RvcnMgPSB0aGlzLnN0eWxlc1ticmVha3BvaW50XSA9IHRoaXMuc3R5bGVzW2JyZWFrcG9pbnRdIHx8IHt9O1xuICAgIHZhciBzdHlsZXMgPSBzZWxlY3RvcnNbc2VsZWN0b3JdID0gc2VsZWN0b3JzW3NlbGVjdG9yXSB8fCB7fTtcbiAgICBzdHlsZXNbcHJvcF0gPSB2YWx1ZTtcbiAgfTtcblxuICBfcHJvdG8yLmJ1aWxkID0gZnVuY3Rpb24gYnVpbGQoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgY3NzID0gXCJcIjtcblxuICAgIGlmICh0aGlzLnN0eWxlcy5kZWZhdWx0KSB7XG4gICAgICBjc3MgKz0gdGhpcy5idWlsZFNlbGVjdG9ycyh0aGlzLnN0eWxlcy5kZWZhdWx0KTtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLnN0eWxlcykuc29ydChmdW5jdGlvbiAobiwgbSkge1xuICAgICAgcmV0dXJuIF90aGlzMi5vcHRpb25zLm1lZGlhUXVlcnkgPT09IFwibWluXCIgPyArbiAtICttIDogK20gLSArbjtcbiAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChicmVha3BvaW50KSB7XG4gICAgICBpZiAoYnJlYWtwb2ludCAhPT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgICAgY3NzICs9IFwiQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogXCIgKyBicmVha3BvaW50ICsgXCJweCkge1wiO1xuICAgICAgICBjc3MgKz0gX3RoaXMyLmJ1aWxkU2VsZWN0b3JzKF90aGlzMi5zdHlsZXNbYnJlYWtwb2ludF0pO1xuICAgICAgICBjc3MgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNzcztcbiAgfTtcblxuICBfcHJvdG8yLmJ1aWxkU2VsZWN0b3JzID0gZnVuY3Rpb24gYnVpbGRTZWxlY3RvcnMoc2VsZWN0b3JzKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICB2YXIgY3NzID0gXCJcIjtcbiAgICBmb3JPd24oc2VsZWN0b3JzLCBmdW5jdGlvbiAoc3R5bGVzLCBzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAoXCIjXCIgKyBfdGhpczMuaWQgKyBcIiBcIiArIHNlbGVjdG9yKS50cmltKCk7XG4gICAgICBjc3MgKz0gc2VsZWN0b3IgKyBcIiB7XCI7XG4gICAgICBmb3JPd24oc3R5bGVzLCBmdW5jdGlvbiAodmFsdWUsIHByb3ApIHtcbiAgICAgICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwKSB7XG4gICAgICAgICAgY3NzICs9IHByb3AgKyBcIjogXCIgKyB2YWx1ZSArIFwiO1wiO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNzcyArPSBcIn1cIjtcbiAgICB9KTtcbiAgICByZXR1cm4gY3NzO1xuICB9O1xuXG4gIHJldHVybiBTdHlsZTtcbn0oKTtcblxudmFyIFNwbGlkZVJlbmRlcmVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3BsaWRlUmVuZGVyZXIoY29udGVudHMsIG9wdGlvbnMsIGNvbmZpZywgZGVmYXVsdHMpIHtcbiAgICB0aGlzLnNsaWRlcyA9IFtdO1xuICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgIHRoaXMuYnJlYWtwb2ludHMgPSBbXTtcbiAgICBtZXJnZShERUZBVUxUUywgZGVmYXVsdHMgfHwge30pO1xuICAgIG1lcmdlKG1lcmdlKHRoaXMub3B0aW9ucywgREVGQVVMVFMpLCBvcHRpb25zIHx8IHt9KTtcbiAgICB0aGlzLmNvbnRlbnRzID0gY29udGVudHM7XG4gICAgdGhpcy5jb25maWcgPSBhc3NpZ24oe30sIFJFTkRFUkVSX0RFRkFVTFRfQ09ORklHLCBjb25maWcgfHwge30pO1xuICAgIHRoaXMuaWQgPSB0aGlzLmNvbmZpZy5pZCB8fCB1bmlxdWVJZChcInNwbGlkZVwiKTtcbiAgICB0aGlzLlN0eWxlID0gbmV3IFN0eWxlKHRoaXMuaWQsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5EaXJlY3Rpb24gPSBEaXJlY3Rpb24obnVsbCwgbnVsbCwgdGhpcy5vcHRpb25zKTtcbiAgICBhc3NlcnQodGhpcy5jb250ZW50cy5sZW5ndGgsIFwiUHJvdmlkZSBhdCBsZWFzdCAxIGNvbnRlbnQuXCIpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgU3BsaWRlUmVuZGVyZXIuY2xlYW4gPSBmdW5jdGlvbiBjbGVhbihzcGxpZGUpIHtcbiAgICB2YXIgX0V2ZW50SW50ZXJmYWNlMTcgPSBFdmVudEludGVyZmFjZShzcGxpZGUpLFxuICAgICAgICBvbiA9IF9FdmVudEludGVyZmFjZTE3Lm9uO1xuXG4gICAgdmFyIHJvb3QgPSBzcGxpZGUucm9vdDtcbiAgICB2YXIgY2xvbmVzID0gcXVlcnlBbGwocm9vdCwgXCIuXCIgKyBDTEFTU19DTE9ORSk7XG4gICAgb24oRVZFTlRfTU9VTlRFRCwgZnVuY3Rpb24gKCkge1xuICAgICAgcmVtb3ZlKGNoaWxkKHJvb3QsIFwic3R5bGVcIikpO1xuICAgIH0pO1xuICAgIHJlbW92ZShjbG9uZXMpO1xuICB9O1xuXG4gIHZhciBfcHJvdG8zID0gU3BsaWRlUmVuZGVyZXIucHJvdG90eXBlO1xuXG4gIF9wcm90bzMuaW5pdCA9IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdGhpcy5wYXJzZUJyZWFrcG9pbnRzKCk7XG4gICAgdGhpcy5pbml0U2xpZGVzKCk7XG4gICAgdGhpcy5yZWdpc3RlclJvb3RTdHlsZXMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyVHJhY2tTdHlsZXMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyU2xpZGVTdHlsZXMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyTGlzdFN0eWxlcygpO1xuICB9O1xuXG4gIF9wcm90bzMuaW5pdFNsaWRlcyA9IGZ1bmN0aW9uIGluaXRTbGlkZXMoKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICBwdXNoKHRoaXMuc2xpZGVzLCB0aGlzLmNvbnRlbnRzLm1hcChmdW5jdGlvbiAoY29udGVudCwgaW5kZXgpIHtcbiAgICAgIGNvbnRlbnQgPSBpc1N0cmluZyhjb250ZW50KSA/IHtcbiAgICAgICAgaHRtbDogY29udGVudFxuICAgICAgfSA6IGNvbnRlbnQ7XG4gICAgICBjb250ZW50LnN0eWxlcyA9IGNvbnRlbnQuc3R5bGVzIHx8IHt9O1xuICAgICAgY29udGVudC5hdHRycyA9IGNvbnRlbnQuYXR0cnMgfHwge307XG5cbiAgICAgIF90aGlzNC5jb3Zlcihjb250ZW50KTtcblxuICAgICAgdmFyIGNsYXNzZXMgPSBfdGhpczQub3B0aW9ucy5jbGFzc2VzLnNsaWRlICsgXCIgXCIgKyAoaW5kZXggPT09IDAgPyBDTEFTU19BQ1RJVkUgOiBcIlwiKTtcbiAgICAgIGFzc2lnbihjb250ZW50LmF0dHJzLCB7XG4gICAgICAgIGNsYXNzOiAoY2xhc3NlcyArIFwiIFwiICsgKGNvbnRlbnQuYXR0cnMuY2xhc3MgfHwgXCJcIikpLnRyaW0oKSxcbiAgICAgICAgc3R5bGU6IF90aGlzNC5idWlsZFN0eWxlcyhjb250ZW50LnN0eWxlcylcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkpO1xuXG4gICAgaWYgKHRoaXMuaXNMb29wKCkpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVDbG9uZXModGhpcy5zbGlkZXMpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8zLnJlZ2lzdGVyUm9vdFN0eWxlcyA9IGZ1bmN0aW9uIHJlZ2lzdGVyUm9vdFN0eWxlcygpIHtcbiAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgIHRoaXMuYnJlYWtwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWYyWzBdLFxuICAgICAgICAgIG9wdGlvbnMgPSBfcmVmMlsxXTtcblxuICAgICAgX3RoaXM1LlN0eWxlLnJ1bGUoXCIgXCIsIFwibWF4LXdpZHRoXCIsIHVuaXQob3B0aW9ucy53aWR0aCksIHdpZHRoKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8zLnJlZ2lzdGVyVHJhY2tTdHlsZXMgPSBmdW5jdGlvbiByZWdpc3RlclRyYWNrU3R5bGVzKCkge1xuICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgdmFyIFN0eWxlMiA9IHRoaXMuU3R5bGU7XG4gICAgdmFyIHNlbGVjdG9yID0gXCIuXCIgKyBDTEFTU19UUkFDSztcbiAgICB0aGlzLmJyZWFrcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICB2YXIgd2lkdGggPSBfcmVmM1swXSxcbiAgICAgICAgICBvcHRpb25zID0gX3JlZjNbMV07XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgX3RoaXM2LnJlc29sdmUoXCJwYWRkaW5nTGVmdFwiKSwgX3RoaXM2LmNzc1BhZGRpbmcob3B0aW9ucywgZmFsc2UpLCB3aWR0aCk7XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgX3RoaXM2LnJlc29sdmUoXCJwYWRkaW5nUmlnaHRcIiksIF90aGlzNi5jc3NQYWRkaW5nKG9wdGlvbnMsIHRydWUpLCB3aWR0aCk7XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgXCJoZWlnaHRcIiwgX3RoaXM2LmNzc1RyYWNrSGVpZ2h0KG9wdGlvbnMpLCB3aWR0aCk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMy5yZWdpc3Rlckxpc3RTdHlsZXMgPSBmdW5jdGlvbiByZWdpc3Rlckxpc3RTdHlsZXMoKSB7XG4gICAgdmFyIF90aGlzNyA9IHRoaXM7XG5cbiAgICB2YXIgU3R5bGUyID0gdGhpcy5TdHlsZTtcbiAgICB2YXIgc2VsZWN0b3IgPSBcIi5cIiArIENMQVNTX0xJU1Q7XG4gICAgdGhpcy5icmVha3BvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmNCkge1xuICAgICAgdmFyIHdpZHRoID0gX3JlZjRbMF0sXG4gICAgICAgICAgb3B0aW9ucyA9IF9yZWY0WzFdO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIFwidHJhbnNmb3JtXCIsIF90aGlzNy5idWlsZFRyYW5zbGF0ZShvcHRpb25zKSwgd2lkdGgpO1xuXG4gICAgICBpZiAoIV90aGlzNy5jc3NTbGlkZUhlaWdodChvcHRpb25zKSkge1xuICAgICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgXCJhc3BlY3QtcmF0aW9cIiwgX3RoaXM3LmNzc0FzcGVjdFJhdGlvKG9wdGlvbnMpLCB3aWR0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMy5yZWdpc3RlclNsaWRlU3R5bGVzID0gZnVuY3Rpb24gcmVnaXN0ZXJTbGlkZVN0eWxlcygpIHtcbiAgICB2YXIgX3RoaXM4ID0gdGhpcztcblxuICAgIHZhciBTdHlsZTIgPSB0aGlzLlN0eWxlO1xuICAgIHZhciBzZWxlY3RvciA9IFwiLlwiICsgQ0xBU1NfU0xJREU7XG4gICAgdGhpcy5icmVha3BvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmNSkge1xuICAgICAgdmFyIHdpZHRoID0gX3JlZjVbMF0sXG4gICAgICAgICAgb3B0aW9ucyA9IF9yZWY1WzFdO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIFwid2lkdGhcIiwgX3RoaXM4LmNzc1NsaWRlV2lkdGgob3B0aW9ucyksIHdpZHRoKTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBcImhlaWdodFwiLCBfdGhpczguY3NzU2xpZGVIZWlnaHQob3B0aW9ucykgfHwgXCIxMDAlXCIsIHdpZHRoKTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBfdGhpczgucmVzb2x2ZShcIm1hcmdpblJpZ2h0XCIpLCB1bml0KG9wdGlvbnMuZ2FwKSB8fCBcIjBweFwiLCB3aWR0aCk7XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciArIFwiID4gaW1nXCIsIFwiZGlzcGxheVwiLCBvcHRpb25zLmNvdmVyID8gXCJub25lXCIgOiBcImlubGluZVwiLCB3aWR0aCk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMy5idWlsZFRyYW5zbGF0ZSA9IGZ1bmN0aW9uIGJ1aWxkVHJhbnNsYXRlKG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMkRGlyZWN0aW9uID0gdGhpcy5EaXJlY3Rpb24sXG4gICAgICAgIHJlc29sdmUgPSBfdGhpcyREaXJlY3Rpb24ucmVzb2x2ZSxcbiAgICAgICAgb3JpZW50ID0gX3RoaXMkRGlyZWN0aW9uLm9yaWVudDtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgdmFsdWVzLnB1c2godGhpcy5jc3NPZmZzZXRDbG9uZXMob3B0aW9ucykpO1xuICAgIHZhbHVlcy5wdXNoKHRoaXMuY3NzT2Zmc2V0R2FwcyhvcHRpb25zKSk7XG5cbiAgICBpZiAodGhpcy5pc0NlbnRlcihvcHRpb25zKSkge1xuICAgICAgdmFsdWVzLnB1c2godGhpcy5idWlsZENzc1ZhbHVlKG9yaWVudCgtNTApLCBcIiVcIikpO1xuICAgICAgdmFsdWVzLnB1c2guYXBwbHkodmFsdWVzLCB0aGlzLmNzc09mZnNldENlbnRlcihvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcy5maWx0ZXIoQm9vbGVhbikubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFwidHJhbnNsYXRlXCIgKyByZXNvbHZlKFwiWFwiKSArIFwiKFwiICsgdmFsdWUgKyBcIilcIjtcbiAgICB9KS5qb2luKFwiIFwiKTtcbiAgfTtcblxuICBfcHJvdG8zLmNzc09mZnNldENsb25lcyA9IGZ1bmN0aW9uIGNzc09mZnNldENsb25lcyhvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzJERpcmVjdGlvbjIgPSB0aGlzLkRpcmVjdGlvbixcbiAgICAgICAgcmVzb2x2ZSA9IF90aGlzJERpcmVjdGlvbjIucmVzb2x2ZSxcbiAgICAgICAgb3JpZW50ID0gX3RoaXMkRGlyZWN0aW9uMi5vcmllbnQ7XG4gICAgdmFyIGNsb25lQ291bnQgPSB0aGlzLmdldENsb25lQ291bnQoKTtcblxuICAgIGlmICh0aGlzLmlzRml4ZWRXaWR0aChvcHRpb25zKSkge1xuICAgICAgdmFyIF90aGlzJHBhcnNlQ3NzVmFsdWUgPSB0aGlzLnBhcnNlQ3NzVmFsdWUob3B0aW9uc1tyZXNvbHZlKFwiZml4ZWRXaWR0aFwiKV0pLFxuICAgICAgICAgIHZhbHVlID0gX3RoaXMkcGFyc2VDc3NWYWx1ZS52YWx1ZSxcbiAgICAgICAgICB1bml0MiA9IF90aGlzJHBhcnNlQ3NzVmFsdWUudW5pdDtcblxuICAgICAgcmV0dXJuIHRoaXMuYnVpbGRDc3NWYWx1ZShvcmllbnQodmFsdWUpICogY2xvbmVDb3VudCwgdW5pdDIpO1xuICAgIH1cblxuICAgIHZhciBwZXJjZW50ID0gMTAwICogY2xvbmVDb3VudCAvIG9wdGlvbnMucGVyUGFnZTtcbiAgICByZXR1cm4gb3JpZW50KHBlcmNlbnQpICsgXCIlXCI7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NPZmZzZXRDZW50ZXIgPSBmdW5jdGlvbiBjc3NPZmZzZXRDZW50ZXIob3B0aW9ucykge1xuICAgIHZhciBfdGhpcyREaXJlY3Rpb24zID0gdGhpcy5EaXJlY3Rpb24sXG4gICAgICAgIHJlc29sdmUgPSBfdGhpcyREaXJlY3Rpb24zLnJlc29sdmUsXG4gICAgICAgIG9yaWVudCA9IF90aGlzJERpcmVjdGlvbjMub3JpZW50O1xuXG4gICAgaWYgKHRoaXMuaXNGaXhlZFdpZHRoKG9wdGlvbnMpKSB7XG4gICAgICB2YXIgX3RoaXMkcGFyc2VDc3NWYWx1ZTIgPSB0aGlzLnBhcnNlQ3NzVmFsdWUob3B0aW9uc1tyZXNvbHZlKFwiZml4ZWRXaWR0aFwiKV0pLFxuICAgICAgICAgIHZhbHVlID0gX3RoaXMkcGFyc2VDc3NWYWx1ZTIudmFsdWUsXG4gICAgICAgICAgdW5pdDIgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlMi51bml0O1xuXG4gICAgICByZXR1cm4gW3RoaXMuYnVpbGRDc3NWYWx1ZShvcmllbnQodmFsdWUgLyAyKSwgdW5pdDIpXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgdmFyIHBlclBhZ2UgPSBvcHRpb25zLnBlclBhZ2UsXG4gICAgICAgIGdhcCA9IG9wdGlvbnMuZ2FwO1xuICAgIHZhbHVlcy5wdXNoKG9yaWVudCg1MCAvIHBlclBhZ2UpICsgXCIlXCIpO1xuXG4gICAgaWYgKGdhcCkge1xuICAgICAgdmFyIF90aGlzJHBhcnNlQ3NzVmFsdWUzID0gdGhpcy5wYXJzZUNzc1ZhbHVlKGdhcCksXG4gICAgICAgICAgX3ZhbHVlID0gX3RoaXMkcGFyc2VDc3NWYWx1ZTMudmFsdWUsXG4gICAgICAgICAgX3VuaXQgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlMy51bml0O1xuXG4gICAgICB2YXIgZ2FwT2Zmc2V0ID0gKF92YWx1ZSAvIHBlclBhZ2UgLSBfdmFsdWUpIC8gMjtcbiAgICAgIHZhbHVlcy5wdXNoKHRoaXMuYnVpbGRDc3NWYWx1ZShvcmllbnQoZ2FwT2Zmc2V0KSwgX3VuaXQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzT2Zmc2V0R2FwcyA9IGZ1bmN0aW9uIGNzc09mZnNldEdhcHMob3B0aW9ucykge1xuICAgIHZhciBjbG9uZUNvdW50ID0gdGhpcy5nZXRDbG9uZUNvdW50KCk7XG5cbiAgICBpZiAoY2xvbmVDb3VudCAmJiBvcHRpb25zLmdhcCkge1xuICAgICAgdmFyIG9yaWVudCA9IHRoaXMuRGlyZWN0aW9uLm9yaWVudDtcblxuICAgICAgdmFyIF90aGlzJHBhcnNlQ3NzVmFsdWU0ID0gdGhpcy5wYXJzZUNzc1ZhbHVlKG9wdGlvbnMuZ2FwKSxcbiAgICAgICAgICB2YWx1ZSA9IF90aGlzJHBhcnNlQ3NzVmFsdWU0LnZhbHVlLFxuICAgICAgICAgIHVuaXQyID0gX3RoaXMkcGFyc2VDc3NWYWx1ZTQudW5pdDtcblxuICAgICAgaWYgKHRoaXMuaXNGaXhlZFdpZHRoKG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQ3NzVmFsdWUob3JpZW50KHZhbHVlICogY2xvbmVDb3VudCksIHVuaXQyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHBlclBhZ2UgPSBvcHRpb25zLnBlclBhZ2U7XG4gICAgICB2YXIgZ2FwcyA9IGNsb25lQ291bnQgLyBwZXJQYWdlO1xuICAgICAgcmV0dXJuIHRoaXMuYnVpbGRDc3NWYWx1ZShvcmllbnQoZ2FwcyAqIHZhbHVlKSwgdW5pdDIpO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiO1xuICB9O1xuXG4gIF9wcm90bzMucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUocHJvcCkge1xuICAgIHJldHVybiBjYW1lbFRvS2ViYWIodGhpcy5EaXJlY3Rpb24ucmVzb2x2ZShwcm9wKSk7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NQYWRkaW5nID0gZnVuY3Rpb24gY3NzUGFkZGluZyhvcHRpb25zLCByaWdodCkge1xuICAgIHZhciBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nO1xuICAgIHZhciBwcm9wID0gdGhpcy5EaXJlY3Rpb24ucmVzb2x2ZShyaWdodCA/IFwicmlnaHRcIiA6IFwibGVmdFwiLCB0cnVlKTtcbiAgICByZXR1cm4gcGFkZGluZyAmJiB1bml0KHBhZGRpbmdbcHJvcF0gfHwgKGlzT2JqZWN0KHBhZGRpbmcpID8gMCA6IHBhZGRpbmcpKSB8fCBcIjBweFwiO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzVHJhY2tIZWlnaHQgPSBmdW5jdGlvbiBjc3NUcmFja0hlaWdodChvcHRpb25zKSB7XG4gICAgdmFyIGhlaWdodCA9IFwiXCI7XG5cbiAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgIGhlaWdodCA9IHRoaXMuY3NzSGVpZ2h0KG9wdGlvbnMpO1xuICAgICAgYXNzZXJ0KGhlaWdodCwgJ1wiaGVpZ2h0XCIgaXMgbWlzc2luZy4nKTtcbiAgICAgIGhlaWdodCA9IFwiY2FsYyhcIiArIGhlaWdodCArIFwiIC0gXCIgKyB0aGlzLmNzc1BhZGRpbmcob3B0aW9ucywgZmFsc2UpICsgXCIgLSBcIiArIHRoaXMuY3NzUGFkZGluZyhvcHRpb25zLCB0cnVlKSArIFwiKVwiO1xuICAgIH1cblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NIZWlnaHQgPSBmdW5jdGlvbiBjc3NIZWlnaHQob3B0aW9ucykge1xuICAgIHJldHVybiB1bml0KG9wdGlvbnMuaGVpZ2h0KTtcbiAgfTtcblxuICBfcHJvdG8zLmNzc1NsaWRlV2lkdGggPSBmdW5jdGlvbiBjc3NTbGlkZVdpZHRoKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5hdXRvV2lkdGggPyBcIlwiIDogdW5pdChvcHRpb25zLmZpeGVkV2lkdGgpIHx8ICh0aGlzLmlzVmVydGljYWwoKSA/IFwiXCIgOiB0aGlzLmNzc1NsaWRlU2l6ZShvcHRpb25zKSk7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NTbGlkZUhlaWdodCA9IGZ1bmN0aW9uIGNzc1NsaWRlSGVpZ2h0KG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdW5pdChvcHRpb25zLmZpeGVkSGVpZ2h0KSB8fCAodGhpcy5pc1ZlcnRpY2FsKCkgPyBvcHRpb25zLmF1dG9IZWlnaHQgPyBcIlwiIDogdGhpcy5jc3NTbGlkZVNpemUob3B0aW9ucykgOiB0aGlzLmNzc0hlaWdodChvcHRpb25zKSk7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NTbGlkZVNpemUgPSBmdW5jdGlvbiBjc3NTbGlkZVNpemUob3B0aW9ucykge1xuICAgIHZhciBnYXAgPSB1bml0KG9wdGlvbnMuZ2FwKTtcbiAgICByZXR1cm4gXCJjYWxjKCgxMDAlXCIgKyAoZ2FwICYmIFwiICsgXCIgKyBnYXApICsgXCIpL1wiICsgKG9wdGlvbnMucGVyUGFnZSB8fCAxKSArIChnYXAgJiYgXCIgLSBcIiArIGdhcCkgKyBcIilcIjtcbiAgfTtcblxuICBfcHJvdG8zLmNzc0FzcGVjdFJhdGlvID0gZnVuY3Rpb24gY3NzQXNwZWN0UmF0aW8ob3B0aW9ucykge1xuICAgIHZhciBoZWlnaHRSYXRpbyA9IG9wdGlvbnMuaGVpZ2h0UmF0aW87XG4gICAgcmV0dXJuIGhlaWdodFJhdGlvID8gXCJcIiArIDEgLyBoZWlnaHRSYXRpbyA6IFwiXCI7XG4gIH07XG5cbiAgX3Byb3RvMy5idWlsZENzc1ZhbHVlID0gZnVuY3Rpb24gYnVpbGRDc3NWYWx1ZSh2YWx1ZSwgdW5pdDIpIHtcbiAgICByZXR1cm4gXCJcIiArIHZhbHVlICsgdW5pdDI7XG4gIH07XG5cbiAgX3Byb3RvMy5wYXJzZUNzc1ZhbHVlID0gZnVuY3Rpb24gcGFyc2VDc3NWYWx1ZSh2YWx1ZSkge1xuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIHZhciBudW1iZXIgPSBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwO1xuICAgICAgdmFyIHVuaXQyID0gdmFsdWUucmVwbGFjZSgvXFxkKihcXC5cXGQqKT8vLCBcIlwiKSB8fCBcInB4XCI7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogbnVtYmVyLFxuICAgICAgICB1bml0OiB1bml0MlxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgdW5pdDogXCJweFwiXG4gICAgfTtcbiAgfTtcblxuICBfcHJvdG8zLnBhcnNlQnJlYWtwb2ludHMgPSBmdW5jdGlvbiBwYXJzZUJyZWFrcG9pbnRzKCkge1xuICAgIHZhciBfdGhpczkgPSB0aGlzO1xuXG4gICAgdmFyIGJyZWFrcG9pbnRzID0gdGhpcy5vcHRpb25zLmJyZWFrcG9pbnRzO1xuICAgIHRoaXMuYnJlYWtwb2ludHMucHVzaChbXCJkZWZhdWx0XCIsIHRoaXMub3B0aW9uc10pO1xuXG4gICAgaWYgKGJyZWFrcG9pbnRzKSB7XG4gICAgICBmb3JPd24oYnJlYWtwb2ludHMsIGZ1bmN0aW9uIChvcHRpb25zLCB3aWR0aCkge1xuICAgICAgICBfdGhpczkuYnJlYWtwb2ludHMucHVzaChbd2lkdGgsIG1lcmdlKG1lcmdlKHt9LCBfdGhpczkub3B0aW9ucyksIG9wdGlvbnMpXSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMy5pc0ZpeGVkV2lkdGggPSBmdW5jdGlvbiBpc0ZpeGVkV2lkdGgob3B0aW9ucykge1xuICAgIHJldHVybiAhIW9wdGlvbnNbdGhpcy5EaXJlY3Rpb24ucmVzb2x2ZShcImZpeGVkV2lkdGhcIildO1xuICB9O1xuXG4gIF9wcm90bzMuaXNMb29wID0gZnVuY3Rpb24gaXNMb29wKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudHlwZSA9PT0gTE9PUDtcbiAgfTtcblxuICBfcHJvdG8zLmlzQ2VudGVyID0gZnVuY3Rpb24gaXNDZW50ZXIob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmZvY3VzID09PSBcImNlbnRlclwiKSB7XG4gICAgICBpZiAodGhpcy5pc0xvb3AoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy50eXBlID09PSBTTElERSkge1xuICAgICAgICByZXR1cm4gIXRoaXMub3B0aW9ucy50cmltU3BhY2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIF9wcm90bzMuaXNWZXJ0aWNhbCA9IGZ1bmN0aW9uIGlzVmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFRUQjtcbiAgfTtcblxuICBfcHJvdG8zLmJ1aWxkQ2xhc3NlcyA9IGZ1bmN0aW9uIGJ1aWxkQ2xhc3NlcygpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICByZXR1cm4gW0NMQVNTX1JPT1QsIENMQVNTX1JPT1QgKyBcIi0tXCIgKyBvcHRpb25zLnR5cGUsIENMQVNTX1JPT1QgKyBcIi0tXCIgKyBvcHRpb25zLmRpcmVjdGlvbiwgb3B0aW9ucy5kcmFnICYmIENMQVNTX1JPT1QgKyBcIi0tZHJhZ2dhYmxlXCIsIG9wdGlvbnMuaXNOYXZpZ2F0aW9uICYmIENMQVNTX1JPT1QgKyBcIi0tbmF2XCIsIENMQVNTX0FDVElWRSwgIXRoaXMuY29uZmlnLmhpZGRlbiAmJiBDTEFTU19SRU5ERVJFRF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuICB9O1xuXG4gIF9wcm90bzMuYnVpbGRBdHRycyA9IGZ1bmN0aW9uIGJ1aWxkQXR0cnMoYXR0cnMpIHtcbiAgICB2YXIgYXR0ciA9IFwiXCI7XG4gICAgZm9yT3duKGF0dHJzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgYXR0ciArPSB2YWx1ZSA/IFwiIFwiICsgY2FtZWxUb0tlYmFiKGtleSkgKyBcIj1cXFwiXCIgKyB2YWx1ZSArIFwiXFxcIlwiIDogXCJcIjtcbiAgICB9KTtcbiAgICByZXR1cm4gYXR0ci50cmltKCk7XG4gIH07XG5cbiAgX3Byb3RvMy5idWlsZFN0eWxlcyA9IGZ1bmN0aW9uIGJ1aWxkU3R5bGVzKHN0eWxlcykge1xuICAgIHZhciBzdHlsZSA9IFwiXCI7XG4gICAgZm9yT3duKHN0eWxlcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIHN0eWxlICs9IFwiIFwiICsgY2FtZWxUb0tlYmFiKGtleSkgKyBcIjpcIiArIHZhbHVlICsgXCI7XCI7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0eWxlLnRyaW0oKTtcbiAgfTtcblxuICBfcHJvdG8zLnJlbmRlclNsaWRlcyA9IGZ1bmN0aW9uIHJlbmRlclNsaWRlcygpIHtcbiAgICB2YXIgX3RoaXMxMCA9IHRoaXM7XG5cbiAgICB2YXIgdGFnID0gdGhpcy5jb25maWcuc2xpZGVUYWc7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLm1hcChmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgcmV0dXJuIFwiPFwiICsgdGFnICsgXCIgXCIgKyBfdGhpczEwLmJ1aWxkQXR0cnMoY29udGVudC5hdHRycykgKyBcIj5cIiArIChjb250ZW50Lmh0bWwgfHwgXCJcIikgKyBcIjwvXCIgKyB0YWcgKyBcIj5cIjtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIF9wcm90bzMuY292ZXIgPSBmdW5jdGlvbiBjb3Zlcihjb250ZW50KSB7XG4gICAgdmFyIHN0eWxlcyA9IGNvbnRlbnQuc3R5bGVzLFxuICAgICAgICBfY29udGVudCRodG1sID0gY29udGVudC5odG1sLFxuICAgICAgICBodG1sID0gX2NvbnRlbnQkaHRtbCA9PT0gdm9pZCAwID8gXCJcIiA6IF9jb250ZW50JGh0bWw7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvdmVyICYmICF0aGlzLm9wdGlvbnMubGF6eUxvYWQpIHtcbiAgICAgIHZhciBzcmMgPSBodG1sLm1hdGNoKC88aW1nLio/c3JjXFxzKj1cXHMqKFsnXCJdKSguKz8pXFwxLio/Pi8pO1xuXG4gICAgICBpZiAoc3JjICYmIHNyY1syXSkge1xuICAgICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IFwiY2VudGVyL2NvdmVyIG5vLXJlcGVhdCB1cmwoJ1wiICsgc3JjWzJdICsgXCInKVwiO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfcHJvdG8zLmdlbmVyYXRlQ2xvbmVzID0gZnVuY3Rpb24gZ2VuZXJhdGVDbG9uZXMoY29udGVudHMpIHtcbiAgICB2YXIgY2xhc3NlcyA9IHRoaXMub3B0aW9ucy5jbGFzc2VzO1xuICAgIHZhciBjb3VudCA9IHRoaXMuZ2V0Q2xvbmVDb3VudCgpO1xuICAgIHZhciBzbGlkZXMgPSBjb250ZW50cy5zbGljZSgpO1xuXG4gICAgd2hpbGUgKHNsaWRlcy5sZW5ndGggPCBjb3VudCkge1xuICAgICAgcHVzaChzbGlkZXMsIHNsaWRlcyk7XG4gICAgfVxuXG4gICAgcHVzaChzbGlkZXMuc2xpY2UoLWNvdW50KS5yZXZlcnNlKCksIHNsaWRlcy5zbGljZSgwLCBjb3VudCkpLmZvckVhY2goZnVuY3Rpb24gKGNvbnRlbnQsIGluZGV4KSB7XG4gICAgICB2YXIgYXR0cnMgPSBhc3NpZ24oe30sIGNvbnRlbnQuYXR0cnMsIHtcbiAgICAgICAgY2xhc3M6IGNvbnRlbnQuYXR0cnMuY2xhc3MgKyBcIiBcIiArIGNsYXNzZXMuY2xvbmVcbiAgICAgIH0pO1xuICAgICAgdmFyIGNsb25lID0gYXNzaWduKHt9LCBjb250ZW50LCB7XG4gICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgfSk7XG4gICAgICBpbmRleCA8IGNvdW50ID8gY29udGVudHMudW5zaGlmdChjbG9uZSkgOiBjb250ZW50cy5wdXNoKGNsb25lKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8zLmdldENsb25lQ291bnQgPSBmdW5jdGlvbiBnZXRDbG9uZUNvdW50KCkge1xuICAgIGlmICh0aGlzLmlzTG9vcCgpKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICAgICAgaWYgKG9wdGlvbnMuY2xvbmVzKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmNsb25lcztcbiAgICAgIH1cblxuICAgICAgdmFyIHBlclBhZ2UgPSBtYXguYXBwbHkodm9pZCAwLCB0aGlzLmJyZWFrcG9pbnRzLm1hcChmdW5jdGlvbiAoX3JlZjYpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMyID0gX3JlZjZbMV07XG4gICAgICAgIHJldHVybiBvcHRpb25zMi5wZXJQYWdlO1xuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIHBlclBhZ2UgKiAoKG9wdGlvbnMuZmxpY2tNYXhQYWdlcyB8fCAxKSArIDEpO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9O1xuXG4gIF9wcm90bzMucmVuZGVyQXJyb3dzID0gZnVuY3Rpb24gcmVuZGVyQXJyb3dzKCkge1xuICAgIHZhciBodG1sID0gXCJcIjtcbiAgICBodG1sICs9IFwiPGRpdiBjbGFzcz1cXFwiXCIgKyB0aGlzLm9wdGlvbnMuY2xhc3Nlcy5hcnJvd3MgKyBcIlxcXCI+XCI7XG4gICAgaHRtbCArPSB0aGlzLnJlbmRlckFycm93KHRydWUpO1xuICAgIGh0bWwgKz0gdGhpcy5yZW5kZXJBcnJvdyhmYWxzZSk7XG4gICAgaHRtbCArPSBcIjwvZGl2PlwiO1xuICAgIHJldHVybiBodG1sO1xuICB9O1xuXG4gIF9wcm90bzMucmVuZGVyQXJyb3cgPSBmdW5jdGlvbiByZW5kZXJBcnJvdyhwcmV2KSB7XG4gICAgdmFyIF90aGlzJG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgIGNsYXNzZXMgPSBfdGhpcyRvcHRpb25zLmNsYXNzZXMsXG4gICAgICAgIGkxOG4gPSBfdGhpcyRvcHRpb25zLmkxOG47XG4gICAgdmFyIGF0dHJzID0ge1xuICAgICAgY2xhc3M6IGNsYXNzZXMuYXJyb3cgKyBcIiBcIiArIChwcmV2ID8gY2xhc3Nlcy5wcmV2IDogY2xhc3Nlcy5uZXh0KSxcbiAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICBhcmlhTGFiZWw6IHByZXYgPyBpMThuLnByZXYgOiBpMThuLm5leHRcbiAgICB9O1xuICAgIHJldHVybiBcIjxidXR0b24gXCIgKyB0aGlzLmJ1aWxkQXR0cnMoYXR0cnMpICsgXCI+PHN2ZyB4bWxucz1cXFwiXCIgKyBYTUxfTkFNRV9TUEFDRSArIFwiXFxcIiB2aWV3Qm94PVxcXCIwIDAgXCIgKyBTSVpFICsgXCIgXCIgKyBTSVpFICsgXCJcXFwiIHdpZHRoPVxcXCJcIiArIFNJWkUgKyBcIlxcXCIgaGVpZ2h0PVxcXCJcIiArIFNJWkUgKyBcIlxcXCI+PHBhdGggZD1cXFwiXCIgKyAodGhpcy5vcHRpb25zLmFycm93UGF0aCB8fCBQQVRIKSArIFwiXFxcIiAvPjwvc3ZnPjwvYnV0dG9uPlwiO1xuICB9O1xuXG4gIF9wcm90bzMuaHRtbCA9IGZ1bmN0aW9uIGh0bWwoKSB7XG4gICAgdmFyIF90aGlzJGNvbmZpZyA9IHRoaXMuY29uZmlnLFxuICAgICAgICByb290Q2xhc3MgPSBfdGhpcyRjb25maWcucm9vdENsYXNzLFxuICAgICAgICBsaXN0VGFnID0gX3RoaXMkY29uZmlnLmxpc3RUYWcsXG4gICAgICAgIGFycm93cyA9IF90aGlzJGNvbmZpZy5hcnJvd3MsXG4gICAgICAgIGJlZm9yZVRyYWNrID0gX3RoaXMkY29uZmlnLmJlZm9yZVRyYWNrLFxuICAgICAgICBhZnRlclRyYWNrID0gX3RoaXMkY29uZmlnLmFmdGVyVHJhY2ssXG4gICAgICAgIHNsaWRlciA9IF90aGlzJGNvbmZpZy5zbGlkZXIsXG4gICAgICAgIGJlZm9yZVNsaWRlciA9IF90aGlzJGNvbmZpZy5iZWZvcmVTbGlkZXIsXG4gICAgICAgIGFmdGVyU2xpZGVyID0gX3RoaXMkY29uZmlnLmFmdGVyU2xpZGVyO1xuICAgIHZhciBodG1sID0gXCJcIjtcbiAgICBodG1sICs9IFwiPGRpdiBpZD1cXFwiXCIgKyB0aGlzLmlkICsgXCJcXFwiIGNsYXNzPVxcXCJcIiArIHRoaXMuYnVpbGRDbGFzc2VzKCkgKyBcIiBcIiArIChyb290Q2xhc3MgfHwgXCJcIikgKyBcIlxcXCI+XCI7XG4gICAgaHRtbCArPSBcIjxzdHlsZT5cIiArIHRoaXMuU3R5bGUuYnVpbGQoKSArIFwiPC9zdHlsZT5cIjtcblxuICAgIGlmIChzbGlkZXIpIHtcbiAgICAgIGh0bWwgKz0gYmVmb3JlU2xpZGVyIHx8IFwiXCI7XG4gICAgICBodG1sICs9IFwiPGRpdiBjbGFzcz1cXFwic3BsaWRlX19zbGlkZXJcXFwiPlwiO1xuICAgIH1cblxuICAgIGh0bWwgKz0gYmVmb3JlVHJhY2sgfHwgXCJcIjtcblxuICAgIGlmIChhcnJvd3MpIHtcbiAgICAgIGh0bWwgKz0gdGhpcy5yZW5kZXJBcnJvd3MoKTtcbiAgICB9XG5cbiAgICBodG1sICs9IFwiPGRpdiBjbGFzcz1cXFwic3BsaWRlX190cmFja1xcXCI+XCI7XG4gICAgaHRtbCArPSBcIjxcIiArIGxpc3RUYWcgKyBcIiBjbGFzcz1cXFwic3BsaWRlX19saXN0XFxcIj5cIjtcbiAgICBodG1sICs9IHRoaXMucmVuZGVyU2xpZGVzKCk7XG4gICAgaHRtbCArPSBcIjwvXCIgKyBsaXN0VGFnICsgXCI+XCI7XG4gICAgaHRtbCArPSBcIjwvZGl2PlwiO1xuICAgIGh0bWwgKz0gYWZ0ZXJUcmFjayB8fCBcIlwiO1xuXG4gICAgaWYgKHNsaWRlcikge1xuICAgICAgaHRtbCArPSBcIjwvZGl2PlwiO1xuICAgICAgaHRtbCArPSBhZnRlclNsaWRlciB8fCBcIlwiO1xuICAgIH1cblxuICAgIGh0bWwgKz0gXCI8L2Rpdj5cIjtcbiAgICByZXR1cm4gaHRtbDtcbiAgfTtcblxuICByZXR1cm4gU3BsaWRlUmVuZGVyZXI7XG59KCk7XG5cbmV4cG9ydCB7IENMQVNTRVMsIENMQVNTX0FDVElWRSwgQ0xBU1NfQVJST1csIENMQVNTX0FSUk9XUywgQ0xBU1NfQVJST1dfTkVYVCwgQ0xBU1NfQVJST1dfUFJFViwgQ0xBU1NfQ0xPTkUsIENMQVNTX0NPTlRBSU5FUiwgQ0xBU1NfRk9DVVNfSU4sIENMQVNTX0lOSVRJQUxJWkVELCBDTEFTU19MSVNULCBDTEFTU19MT0FESU5HLCBDTEFTU19ORVhULCBDTEFTU19QQUdJTkFUSU9OLCBDTEFTU19QQUdJTkFUSU9OX1BBR0UsIENMQVNTX1BSRVYsIENMQVNTX1BST0dSRVNTLCBDTEFTU19QUk9HUkVTU19CQVIsIENMQVNTX1JPT1QsIENMQVNTX1NMSURFLCBDTEFTU19TUElOTkVSLCBDTEFTU19TUiwgQ0xBU1NfVE9HR0xFLCBDTEFTU19UT0dHTEVfUEFVU0UsIENMQVNTX1RPR0dMRV9QTEFZLCBDTEFTU19UUkFDSywgQ0xBU1NfVklTSUJMRSwgREVGQVVMVFMsIEVWRU5UX0FDVElWRSwgRVZFTlRfQVJST1dTX01PVU5URUQsIEVWRU5UX0FSUk9XU19VUERBVEVELCBFVkVOVF9BVVRPUExBWV9QQVVTRSwgRVZFTlRfQVVUT1BMQVlfUExBWSwgRVZFTlRfQVVUT1BMQVlfUExBWUlORywgRVZFTlRfQ0xJQ0ssIEVWRU5UX0RFU1RST1ksIEVWRU5UX0RSQUcsIEVWRU5UX0RSQUdHRUQsIEVWRU5UX0RSQUdHSU5HLCBFVkVOVF9ISURERU4sIEVWRU5UX0lOQUNUSVZFLCBFVkVOVF9MQVpZTE9BRF9MT0FERUQsIEVWRU5UX01PVU5URUQsIEVWRU5UX01PVkUsIEVWRU5UX01PVkVELCBFVkVOVF9OQVZJR0FUSU9OX01PVU5URUQsIEVWRU5UX1BBR0lOQVRJT05fTU9VTlRFRCwgRVZFTlRfUEFHSU5BVElPTl9VUERBVEVELCBFVkVOVF9SRUFEWSwgRVZFTlRfUkVGUkVTSCwgRVZFTlRfUkVTSVpFLCBFVkVOVF9SRVNJWkVELCBFVkVOVF9TQ1JPTEwsIEVWRU5UX1NDUk9MTEVELCBFVkVOVF9TSElGVEVELCBFVkVOVF9TTElERV9LRVlET1dOLCBFVkVOVF9VUERBVEVELCBFVkVOVF9WSVNJQkxFLCBFdmVudEJpbmRlciwgRXZlbnRJbnRlcmZhY2UsIEZBREUsIExPT1AsIExUUiwgUlRMLCBSZXF1ZXN0SW50ZXJ2YWwsIFNMSURFLCBTVEFUVVNfQ0xBU1NFUywgU3BsaWRlLCBTcGxpZGVSZW5kZXJlciwgU3RhdGUsIFRUQiwgVGhyb3R0bGUsIFNwbGlkZSBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgU3BsaWRlIGZyb20gJ0BzcGxpZGVqcy9zcGxpZGUnO1xyXG5cclxuY29uc3QgRUwgPSAnLmpzLXNob3cnXHJcbmNvbnN0IEFDVElWRV9DTEFTUyA9ICdpcy1hY3RpdmUnXHJcblxyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihFTCkpIHtcclxuICBjb25zdCBzbGlkZXIgPSBuZXcgU3BsaWRlKCBFTCwge1xyXG4gICAgdHlwZTogJ2ZhZGUnLFxyXG4gICAgcmV3aW5kOiB0cnVlLFxyXG4gICAgcGVyUGFnZTogMSxcclxuICAgIHBhZ2luYXRpb246IHRydWUsXHJcbiAgICBhcnJvd3M6IHRydWUsXHJcbiAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgIGludGVydmFsOiA5MDAwLFxyXG4gICAgc3BlZWQ6IDEwMDAsXHJcbiAgICBwYXVzZU9uRm9jdXM6IGZhbHNlLFxyXG4gICAgcGF1c2VPbkhvdmVyOiBmYWxzZSxcclxuICB9ICkubW91bnQoKTtcclxufVxyXG5cclxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10aHVtYm5haWxzJykpIHtcclxuICBuZXcgU3BsaWRlKCAnLmpzLXRodW1ibmFpbHMnLCB7XHJcbiAgICBmaXhlZFdpZHRoIDogJ2NhbGMoMjUlIC0gMjNweCknLFxyXG5cdFx0cmV3aW5kICAgICA6IHRydWUsXHJcblx0XHRwYWdpbmF0aW9uIDogZmFsc2UsXHJcbiAgICBpc05hdmlnYXRpb246IHRydWUsXHJcbiAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgcGVyUGFnZSAgICAgOiA0LFxyXG4gICAgYnJlYWtwb2ludHM6IHtcclxuICBcdFx0NzY3OiB7XHJcbiAgXHRcdFx0cGVyUGFnZToyLFxyXG4gICAgICAgIGZpeGVkV2lkdGggOiAnY2FsYyg1MCUgLSA3cHgpJyxcclxuICBcdFx0fSxcclxuICAgIH1cclxuICB9ICkubW91bnQoKTtcclxuXHJcbiAgbmV3IFNwbGlkZSggJy5qcy1tYWluJywge1xyXG4gICAgdHlwZSAgICAgIDogJ2ZhZGUnLFxyXG4gICAgcmV3aW5kICAgIDogdHJ1ZSxcclxuICAgIHBhZ2luYXRpb246IGZhbHNlLFxyXG4gICAgYXJyb3dzICAgIDogZmFsc2UsXHJcbiAgICBwZXJQYWdlOiAxLFxyXG4gIH0gKS5tb3VudCgpO1xyXG5cclxuICB2YXIgbWFpbiAgICAgICA9IG5ldyBTcGxpZGUoICcuanMtbWFpbicsIHsgdHlwZTogJ2ZhZGUnLCByZXdpbmQ6IHRydWUsIHBhZ2luYXRpb246IGZhbHNlLCBhcnJvd3M6IGZhbHNlLCBwZXJQYWdlOiAxLCB9ICk7XHJcbiAgdmFyIHRodW1ibmFpbHMgPSBuZXcgU3BsaWRlKCAnLmpzLXRodW1ibmFpbHMnLCB7Zml4ZWRXaWR0aCA6ICdjYWxjKDI1JSAtIDIzcHgpJyxyZXdpbmQ6IHRydWUsIHBhZ2luYXRpb246IGZhbHNlLCBhcnJvd3M6IGZhbHNlLCBpc05hdmlnYXRpb246IHRydWUsIHBlclBhZ2U6IDQsYnJlYWtwb2ludHM6IHsgNzY3OiB7IHBlclBhZ2U6MiwgcGFnaW5hdGlvbjogZmFsc2UsZml4ZWRXaWR0aCA6ICdjYWxjKDUwJSAtIDdweCknLCB9LCB9IH0gKTtcclxuXHJcbiAgbWFpbi5zeW5jKCB0aHVtYm5haWxzICk7XHJcbiAgbWFpbi5tb3VudCgpO1xyXG4gIHRodW1ibmFpbHMubW91bnQoKTtcclxufVxyXG4iXSwibmFtZXMiOlsiTUVTU0FHRSIsIkhlbGxvV29ybGQiLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImxvYWRIYW5kbGVyIiwiSVNNT0JJTEUiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIlRIUkVTSE9MRCIsIkxPQURfVEhSRVNIT0xEIiwiRUxFTUVOVFMiLCJWSVNJQkxFX0NMQVNTIiwiQW5pbWF0ZSIsImVudHJpZXMiLCJtYXAiLCJlbnRyeSIsInNlY3Rpb24iLCJ0YXJnZXQiLCJkZWxheSIsImdldERlbGF5Iiwic2VjdGlvbkJvZHlDbGFzcyIsImdldEF0dHJpYnV0ZSIsImlzSW50ZXJzZWN0aW5nIiwiY2xhc3NMaXN0IiwiYWRkIiwiYm9keUNsYXNzIiwic2V0VGltZW91dCIsImluY2x1ZGVzIiwicGFyc2VJbnQiLCJodG1sY2xhc3MiLCJ0eXBlIiwiZG9jdW1lbnQiLCJib2R5IiwicmVtb3ZlIiwic2VjdGlvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsIiwiQm91bmRpbmdDbGllbnRSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidmlzaWJsZVJhdGlvIiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJsb2FkT2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmVDYWxsYmFjayIsInRocmVzaG9sZCIsIm9ic2VydmUiLCJkaXNjb25uZWN0Iiwib2JzZXJ2ZXJUaHJlc2hvbGQiLCJvYnNlcnZlciIsIlNUQVJUX09GRlNFVCIsIlNUQVJUX0NMQVNTIiwiQk9UVE9NX09GRlNFVCIsIkJPVFRPTV9DTEFTUyIsIlNjcm9sbENsYXNzIiwidG9wIiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsVG9wIiwidG9nZ2xlIiwib2Zmc2V0SGVpZ2h0Iiwib2xkU2Nyb2xsIiwic2Nyb2xsSGFuZGxlciIsInBhc3NpdmUiLCJUb2dnbGVCb2R5Q2xhc3MiLCJlIiwiY3VycmVudFRhcmdldCIsImNsYXNzZXMiLCJjbGFzc2VzUmVtb3ZlIiwic3BsaXQiLCJjbGFzc05hbWUiLCJlbGVtZW50cyIsIlRPR0dMRV9DTEFTUyIsIlRvZ2dsZU5hdiIsInRvZ2dsZU5hdiIsInByZXZlbnREZWZhdWx0IiwiX2RlZmluZVByb3BlcnRpZXMiLCJfY3JlYXRlQ2xhc3MiLCJFTCIsInF1ZXJ5U2VsZWN0b3IiLCJzbGlkZXIiLCJTcGxpZGUiLCJyZXdpbmQiLCJwZXJQYWdlIiwicGFnaW5hdGlvbiIsImFycm93cyIsImF1dG9wbGF5IiwiaW50ZXJ2YWwiLCJzcGVlZCIsInBhdXNlT25Gb2N1cyIsInBhdXNlT25Ib3ZlciIsIm1vdW50IiwiZml4ZWRXaWR0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VyxFQUFFO0VBQy9CLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEtBQUssRUFBRTtFQUNsRCxVQUFVLE1BQU07RUFDaEIsU0FBUztFQUNULE9BQU87RUFDUCxLQUFLO0VBQ0wsR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLE1BQU0sQ0FBQztFQUNoQixDQUFDO0FBQ0Q7RUFDQSxTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUU7RUFDeEIsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLE1BQU0sRUFBRTtFQUNoRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBVSxLQUFLLEVBQUUsR0FBRyxFQUFFO0VBQ3pDLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNoQyxLQUFLLENBQUMsQ0FBQztFQUNQLEdBQUcsQ0FBQyxDQUFDO0VBQ0wsRUFBRSxPQUFPLE1BQU0sQ0FBQztFQUNoQixDQUFDO0FBQ0Q7RUFDQSxTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUU7RUFDdkIsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLE1BQU0sRUFBRTtFQUNoRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBVSxLQUFLLEVBQUUsR0FBRyxFQUFFO0VBQ3pDLE1BQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7RUFDMUIsUUFBUSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0VBQ3BDLE9BQU8sTUFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtFQUNsQyxRQUFRLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FB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
