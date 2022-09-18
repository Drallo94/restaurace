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

  /**
   * Accordion
   * ======================================
   * - slideup slidedown animation via css height transition
   */
  var ELEMENTS$3 = ".js-Accordion .js-Accordion-header";
  var TOGGLE_CLASS$1 = "is-open";
  var viewportWidth = window.innerWidth;

  if (viewportWidth < 767) {
    var Accordion = /*#__PURE__*/_createClass(function Accordion() {
      var _this = this;

      _classCallCheck(this, Accordion);

      _defineProperty(this, "toggle", function (e) {
        var el = e.currentTarget;
        var target = el.parentNode;
        var classes = target.classList;
        var sub = target.querySelector('.js-Accordion-sub');

        if (classes.contains(TOGGLE_CLASS$1)) {
          classes.remove(TOGGLE_CLASS$1);

          if (sub) {
            sub.style.height = 0;
          }
        } else {
          if (sub) {
            sub.style.height = sub.scrollHeight + 'px';
          }

          classes.add(TOGGLE_CLASS$1);
        }

        e.preventDefault();
      });

      this.elements = document.querySelectorAll(ELEMENTS$3);

      if (!this.elements) {
        return false;
      }

      this.elements.forEach(function (el) {
        el.addEventListener("click", _this.toggle);
      }); // window.addEventListener('resize', this.recalculate);
    } // recalculate = () => {
    //  const open = document.querySelectorAll('.js-Accordion .is-open');
    //  const sub = document.querySelectorAll('.js-Accordion .js-Accordion-sub');
    //
    //  open.forEach((el) => {
    //    el.classList.remove(TOGGLE_CLASS)
    //  })
    //
    //  sub.forEach((el) => {
    //    el.removeAttribute('style')
    //  })
    // }
    );

    new Accordion();
  }

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsic3JjL3NjcmlwdHMvbW9kdWxlcy9IZWxsb1dvcmxkLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9BbmltYXRlLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9TY3JvbGxDbGFzcy5qcyIsInNyYy9zY3JpcHRzL21vZHVsZXMvVG9nZ2xlQm9keUNsYXNzLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9Ub2dnbGVOYXYuanMiLCJub2RlX21vZHVsZXMvQHNwbGlkZWpzL3NwbGlkZS9kaXN0L2pzL3NwbGlkZS5lc20uanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL1Nob3cuanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL0FjY29yZGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogSGVsbG9Xb3JsZFxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAtIGV4YW1wbGUganMgbW9kdWxlXHJcbiAqL1xyXG5cclxuY29uc3QgTUVTU0FHRSA9IFwiSGVsbG8gV29ybGQhIEZyb20gSGVsbG9Xb3JsZC5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHRoaXMubG9hZEhhbmRsZXIsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGxvYWRIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coTUVTU0FHRSk7XHJcbiAgfTtcclxufVxyXG5cclxubmV3IEhlbGxvV29ybGQoKTtcclxuIiwiLyoqXHJcbiAqIEFuaW1hdGVcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogLSBhZGQgY2xhc3MgdG8gZWxlbWVudCBpbiB2aWV3cG9ydFxyXG4gKiAtIGlmIHlvdSB3YW50IGRpc2FibGUgYW5pbWF0ZSBkZWxheSBvbiBtb2JpbGUgdXNlIFthbmltYXRlLWRlbGF5LWRlc2t0b3BdXHJcbiAqIC0gc2V0IGFuaW1hdGlvbiBkZWxheSB2aWEgW2FuaW1hdGUtZGVsYXldIGh0bWwgYXR0cmlidXRlXHJcbiAqIC0gc2V0IHZpc2libGUgdGhyZXNob2xkIHZpYSBbYW5pbWF0ZS10aHJlc2hvbGRdIGh0bWwgYXR0cmlidXRlXHJcbiAqL1xyXG5cclxuIGNvbnN0IElTTU9CSUxFID0gd2luZG93Lm1hdGNoTWVkaWEoXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpXCIpLm1hdGNoZXNcclxuIGNvbnN0IFRIUkVTSE9MRCA9IElTTU9CSUxFID8gJzAuNCcgOiAnMC42J1xyXG4gY29uc3QgTE9BRF9USFJFU0hPTEQgPSAnMC4yJ1xyXG4gY29uc3QgRUxFTUVOVFMgPSAnLmFuaW1hdGUnXHJcbiBjb25zdCBWSVNJQkxFX0NMQVNTID0gJ2FuaW1hdGUtLXZpc2libGUnXHJcblxyXG5jbGFzcyBBbmltYXRlIHtcclxuICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNlY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChFTEVNRU5UUylcclxuICAgIHRoaXMuVEhSRVNIT0xEID0gVEhSRVNIT0xEXHJcbiAgICB0aGlzLkxPQURfVEhSRVNIT0xEID0gTE9BRF9USFJFU0hPTERcclxuXHJcbiAgICAgIGlmKCdJbnRlcnNlY3Rpb25PYnNlcnZlcicgaW4gd2luZG93KSB7XHJcbiAgICAgICAgdGhpcy5zZWN0aW9ucy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICBjb25zdCBCb3VuZGluZ0NsaWVudFJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICAgICBjb25zdCB2aXNpYmxlUmF0aW8gPSAgQm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCAvIHdpbmRvdy5pbm5lckhlaWdodFxyXG5cclxuICAgICAgICAgaWYodmlzaWJsZVJhdGlvID4gMC45NSl7XHJcbiAgICAgICAgICAgdGhpcy5USFJFU0hPTEQgPSAgd2luZG93LmlubmVySGVpZ2h0IC8gQm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCAvIDEwMCAqIDMwXHJcbiAgICAgICAgICAgdGhpcy5MT0FEX1RIUkVTSE9MRCA9IHdpbmRvdy5pbm5lckhlaWdodCAvIEJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQgLyAxMDAgKiAyMFxyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gb2JzZXJ2ZSBvbiBwYWdlIGxvYWRcclxuICAgICAgICAgIGNvbnN0IGxvYWRPYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih0aGlzLm9ic2VydmVDYWxsYmFjaywge1xyXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IHRoaXMuTE9BRF9USFJFU0hPTERcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgbG9hZE9ic2VydmVyLm9ic2VydmUoZWwpO1xyXG5cclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgbG9hZE9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgLy8gb2JzZXJ2ZVxyXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXJUaHJlc2hvbGQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtdGhyZXNob2xkJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtdGhyZXNob2xkJykgOiB0aGlzLlRIUkVTSE9MRFxyXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5vYnNlcnZlQ2FsbGJhY2ssIHtcclxuICAgICAgICAgICAgdGhyZXNob2xkOiBvYnNlcnZlclRocmVzaG9sZFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGVsKTtcclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VjdGlvbnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoVklTSUJMRV9DTEFTUylcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgICBvYnNlcnZlQ2FsbGJhY2sgPSAoZW50cmllcykgPT4ge1xyXG4gICAgICBlbnRyaWVzLm1hcCgoZW50cnkpID0+IHtcclxuICAgICAgICBjb25zdCBzZWN0aW9uID0gZW50cnkudGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5nZXREZWxheShzZWN0aW9uKVxyXG4gICAgICAgIGNvbnN0IHNlY3Rpb25Cb2R5Q2xhc3MgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS1ib2R5LWNsYXNzJylcclxuXHJcbiAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgICBpZihJU01PQklMRSAmJiBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS1kZWxheS1kZXNrdG9wJykpe1xyXG4gICAgICAgICAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoVklTSUJMRV9DTEFTUylcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYm9keUNsYXNzKHNlY3Rpb25Cb2R5Q2xhc3MsICdhZGQnKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKFZJU0lCTEVfQ0xBU1MpXHJcbiAgICAgICAgICAgICAgdGhpcy5ib2R5Q2xhc3Moc2VjdGlvbkJvZHlDbGFzcywgJ2FkZCcpXHJcbiAgICAgICAgICAgIH0sIGRlbGF5KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmJvZHlDbGFzcyhzZWN0aW9uQm9keUNsYXNzLCAncmVtb3ZlJylcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgZ2V0RGVsYXkgPSAoc2VjdGlvbikgPT4ge1xyXG4gICB2YXIgZGVsYXkgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS1kZWxheScpXHJcblxyXG4gICBpZighSVNNT0JJTEUgJiYgc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtZGVsYXktZGVza3RvcCcpKXtcclxuICAgICB2YXIgZGVsYXkgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS1kZWxheS1kZXNrdG9wJylcclxuICAgfVxyXG5cclxuICAgaWYgKGRlbGF5ID09PSBudWxsKSB7XHJcbiAgICAgcmV0dXJuIDBcclxuICAgfSBlbHNlIGlmIChkZWxheS5pbmNsdWRlcygnLicpKSB7XHJcbiAgICAgcmV0dXJuIHBhcnNlSW50KGRlbGF5ICogMTAwMClcclxuICAgfSBlbHNlIHtcclxuICAgICByZXR1cm4gcGFyc2VJbnQoZGVsYXkpXHJcbiAgIH1cclxuICAgfVxyXG5cclxuICAgYm9keUNsYXNzID0gKGh0bWxjbGFzcywgdHlwZSkgPT4ge1xyXG4gICAgIGlmKCFodG1sY2xhc3Mpe1xyXG4gICAgICAgcmV0dXJuXHJcbiAgICAgfVxyXG5cclxuICAgICAgaWYodHlwZSA9PSAnYWRkJyl7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKGh0bWxjbGFzcylcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoaHRtbGNsYXNzKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiB9XHJcblxyXG4gbmV3IEFuaW1hdGUoKVxyXG4iLCIvKlxyXG4gIEAgQWRkIGJvZHkgY2xhc3MgaWY6XHJcbiAgLSBzY3JvbGwgc3RhcnRlZFxyXG4gIC0gc2Nyb2xsZWQgdG8gYm90dG9tXHJcbiovXHJcblxyXG5jb25zdCBTVEFSVF9PRkZTRVQgPSAxMDtcclxuY29uc3QgU1RBUlRfQ0xBU1MgPSBcImlzLXNjcm9sbGVkXCI7XHJcbmNvbnN0IEJPVFRPTV9PRkZTRVQgPSAxMDtcclxuY29uc3QgQk9UVE9NX0NMQVNTID0gXCJpcy1zY3JvbGxlZC1ib3R0b21cIjtcclxuXHJcbmNvbnN0IFVQX0RPV05fQ0xBU1NFUyA9IGZhbHNlO1xyXG5jb25zdCBVUF9DTEFTUyA9IFwic2Nyb2xsaW5nLXVwXCI7XHJcbmNvbnN0IERPV05fQ0xBU1MgPSBcInNjcm9sbGluZy1kb3duXCI7XHJcblxyXG5jbGFzcyBTY3JvbGxDbGFzcyB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuc2Nyb2xsSGFuZGxlciwge3Bhc3NpdmU6IHRydWV9KTtcclxuICB9XHJcblxyXG4gIHNjcm9sbEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0b3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShTVEFSVF9DTEFTUywgdG9wID49IFNUQVJUX09GRlNFVCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXHJcbiAgICAgIEJPVFRPTV9DTEFTUyxcclxuICAgICAgd2luZG93LmlubmVySGVpZ2h0ICsgdG9wID49IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC0gQk9UVE9NX09GRlNFVFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoVVBfRE9XTl9DTEFTU0VTKSB7XHJcbiAgICAgIGlmKHRoaXMub2xkU2Nyb2xsID4gdG9wKXtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoVVBfQ0xBU1MpXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKERPV05fQ0xBU1MpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChET1dOX0NMQVNTKVxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShVUF9DTEFTUyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9sZFNjcm9sbCA9IHRvcDtcclxuXHJcbiAgfTtcclxufVxyXG5cclxubmV3IFNjcm9sbENsYXNzKCk7XHJcbiIsIi8qKlxyXG4gKiBUb2dnbGVCb2R5Q2xhc3NcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogLSB0b2dnbGUgY2xhc3Mgb24gYm9keVxyXG4gKiAtIG11bHRpcGxlIGNsYXNzZXMgc3VwcG9ydGVkIC0gXCJDTEFTU05BTUUgQ0xBU1NOQU1FMiAuLi5cIlxyXG4gKiAtIGFkZCBjbGFzcyB0byBodG1sIGF0dHIgW2RhdGEtdG9nZ2xlPVwiQ0xBU1NOQU1FXCJdXHJcbiAqIC0gcmVtb3ZlIGNsYXNzIHdoZW4gYXR0ciBbZGF0YS1yZW1vdmU9XCJDTEFTU05BTUVcIl1cclxuICovXHJcblxyXG4gY29uc3QgRUxFTUVOVFMgPSAnLmpzLVRvZ2dsZUJvZHlDbGFzcydcclxuXHJcbiBjbGFzcyBUb2dnbGVCb2R5Q2xhc3Mge1xyXG4gICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICB0aGlzLmVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChFTEVNRU5UUylcclxuXHJcbiAgICAgaWYgKCF0aGlzLmVsZW1lbnRzKSB7XHJcbiAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICB9XHJcblxyXG4gICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlLCBmYWxzZSlcclxuICAgICB9KVxyXG4gICB9XHJcblxyXG4gICB0b2dnbGUgPSAoZSkgPT4ge1xyXG4gICAgIGNvbnN0IGVsID0gZS5jdXJyZW50VGFyZ2V0XHJcbiAgICAgY29uc3QgY2xhc3NlcyA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10b2dnbGUnKVxyXG4gICAgIGNvbnN0IGNsYXNzZXNSZW1vdmUgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVtb3ZlJylcclxuXHJcbiAgICAgaWYoY2xhc3Nlc1JlbW92ZSl7XHJcbiAgICAgIGNsYXNzZXNSZW1vdmUuc3BsaXQoXCIgXCIpLmZvckVhY2goY2xhc3NOYW1lID0+IHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxyXG4gICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgY2xhc3Nlcy5zcGxpdChcIiBcIikuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKVxyXG4gICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICB9XHJcbiB9XHJcblxyXG4gbmV3IFRvZ2dsZUJvZHlDbGFzcygpXHJcbiIsIi8qKlxyXG4gKiBUb2dnbGUgTmF2XHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIC0gdG9nZ2xlIGNsYXNzIG9uIGJvZHlcclxuICovXHJcblxyXG5jb25zdCBFTEVNRU5UUyA9ICcudG9nZ2xlbmF2X19idXR0b24nXHJcbmNvbnN0IFRPR0dMRV9DTEFTUyA9ICduYXYtaXMtb3BlbidcclxuXHJcbmNsYXNzIFRvZ2dsZU5hdiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChFTEVNRU5UUylcclxuXHJcbiAgICBpZiAoIXRoaXMuZWxlbWVudHMpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTmF2LCBmYWxzZSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICB0b2dnbGVOYXYoZSkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFRPR0dMRV9DTEFTUylcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnbG9jaycpXHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgfVxyXG59XHJcblxyXG5uZXcgVG9nZ2xlTmF2KClcclxuIiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG4vKiFcbiAqIFNwbGlkZS5qc1xuICogVmVyc2lvbiAgOiA0LjAuMTdcbiAqIExpY2Vuc2UgIDogTUlUXG4gKiBDb3B5cmlnaHQ6IDIwMjIgTmFvdG9zaGkgRnVqaXRhXG4gKi9cbnZhciBNRURJQV9QUkVGRVJTX1JFRFVDRURfTU9USU9OID0gXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiO1xudmFyIENSRUFURUQgPSAxO1xudmFyIE1PVU5URUQgPSAyO1xudmFyIElETEUgPSAzO1xudmFyIE1PVklORyA9IDQ7XG52YXIgU0NST0xMSU5HID0gNTtcbnZhciBEUkFHR0lORyA9IDY7XG52YXIgREVTVFJPWUVEID0gNztcbnZhciBTVEFURVMgPSB7XG4gIENSRUFURUQ6IENSRUFURUQsXG4gIE1PVU5URUQ6IE1PVU5URUQsXG4gIElETEU6IElETEUsXG4gIE1PVklORzogTU9WSU5HLFxuICBTQ1JPTExJTkc6IFNDUk9MTElORyxcbiAgRFJBR0dJTkc6IERSQUdHSU5HLFxuICBERVNUUk9ZRUQ6IERFU1RST1lFRFxufTtcblxuZnVuY3Rpb24gZW1wdHkoYXJyYXkpIHtcbiAgYXJyYXkubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gc2xpY2UoYXJyYXlMaWtlLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnJheUxpa2UsIHN0YXJ0LCBlbmQpO1xufVxuXG5mdW5jdGlvbiBhcHBseShmdW5jKSB7XG4gIHJldHVybiBmdW5jLmJpbmQuYXBwbHkoZnVuYywgW251bGxdLmNvbmNhdChzbGljZShhcmd1bWVudHMsIDEpKSk7XG59XG5cbnZhciBuZXh0VGljayA9IHNldFRpbWVvdXQ7XG5cbnZhciBub29wID0gZnVuY3Rpb24gbm9vcCgpIHt9O1xuXG5mdW5jdGlvbiByYWYoZnVuYykge1xuICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmMpO1xufVxuXG5mdW5jdGlvbiB0eXBlT2YodHlwZSwgc3ViamVjdCkge1xuICByZXR1cm4gdHlwZW9mIHN1YmplY3QgPT09IHR5cGU7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHN1YmplY3QpIHtcbiAgcmV0dXJuICFpc051bGwoc3ViamVjdCkgJiYgdHlwZU9mKFwib2JqZWN0XCIsIHN1YmplY3QpO1xufVxuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgaXNGdW5jdGlvbiA9IGFwcGx5KHR5cGVPZiwgXCJmdW5jdGlvblwiKTtcbnZhciBpc1N0cmluZyA9IGFwcGx5KHR5cGVPZiwgXCJzdHJpbmdcIik7XG52YXIgaXNVbmRlZmluZWQgPSBhcHBseSh0eXBlT2YsIFwidW5kZWZpbmVkXCIpO1xuXG5mdW5jdGlvbiBpc051bGwoc3ViamVjdCkge1xuICByZXR1cm4gc3ViamVjdCA9PT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNIVE1MRWxlbWVudChzdWJqZWN0KSB7XG4gIHJldHVybiBzdWJqZWN0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIHRvQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoKHZhbHVlcywgaXRlcmF0ZWUpIHtcbiAgdG9BcnJheSh2YWx1ZXMpLmZvckVhY2goaXRlcmF0ZWUpO1xufVxuXG5mdW5jdGlvbiBpbmNsdWRlcyhhcnJheSwgdmFsdWUpIHtcbiAgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUpID4gLTE7XG59XG5cbmZ1bmN0aW9uIHB1c2goYXJyYXksIGl0ZW1zKSB7XG4gIGFycmF5LnB1c2guYXBwbHkoYXJyYXksIHRvQXJyYXkoaXRlbXMpKTtcbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhlbG0sIGNsYXNzZXMsIGFkZCkge1xuICBpZiAoZWxtKSB7XG4gICAgZm9yRWFjaChjbGFzc2VzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgZWxtLmNsYXNzTGlzdFthZGQgPyBcImFkZFwiIDogXCJyZW1vdmVcIl0obmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkQ2xhc3MoZWxtLCBjbGFzc2VzKSB7XG4gIHRvZ2dsZUNsYXNzKGVsbSwgaXNTdHJpbmcoY2xhc3NlcykgPyBjbGFzc2VzLnNwbGl0KFwiIFwiKSA6IGNsYXNzZXMsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBhcHBlbmQocGFyZW50LCBjaGlsZHJlbikge1xuICBmb3JFYWNoKGNoaWxkcmVuLCBwYXJlbnQuYXBwZW5kQ2hpbGQuYmluZChwYXJlbnQpKTtcbn1cblxuZnVuY3Rpb24gYmVmb3JlKG5vZGVzLCByZWYpIHtcbiAgZm9yRWFjaChub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgcGFyZW50ID0gKHJlZiB8fCBub2RlKS5wYXJlbnROb2RlO1xuXG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCByZWYpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMoZWxtLCBzZWxlY3Rvcikge1xuICByZXR1cm4gaXNIVE1MRWxlbWVudChlbG0pICYmIChlbG1bXCJtc01hdGNoZXNTZWxlY3RvclwiXSB8fCBlbG0ubWF0Y2hlcykuY2FsbChlbG0sIHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gY2hpbGRyZW4ocGFyZW50LCBzZWxlY3Rvcikge1xuICB2YXIgY2hpbGRyZW4yID0gcGFyZW50ID8gc2xpY2UocGFyZW50LmNoaWxkcmVuKSA6IFtdO1xuICByZXR1cm4gc2VsZWN0b3IgPyBjaGlsZHJlbjIuZmlsdGVyKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgIHJldHVybiBtYXRjaGVzKGNoaWxkLCBzZWxlY3Rvcik7XG4gIH0pIDogY2hpbGRyZW4yO1xufVxuXG5mdW5jdGlvbiBjaGlsZChwYXJlbnQsIHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3RvciA/IGNoaWxkcmVuKHBhcmVudCwgc2VsZWN0b3IpWzBdIDogcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xufVxuXG52YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzO1xuXG5mdW5jdGlvbiBmb3JPd24ob2JqZWN0LCBpdGVyYXRlZSwgcmlnaHQpIHtcbiAgaWYgKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gb3duS2V5cyhvYmplY3QpO1xuICAgIGtleXMgPSByaWdodCA/IGtleXMucmV2ZXJzZSgpIDoga2V5cztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG5cbiAgICAgIGlmIChrZXkgIT09IFwiX19wcm90b19fXCIpIHtcbiAgICAgICAgaWYgKGl0ZXJhdGVlKG9iamVjdFtrZXldLCBrZXkpID09PSBmYWxzZSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gYXNzaWduKG9iamVjdCkge1xuICBzbGljZShhcmd1bWVudHMsIDEpLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgIGZvck93bihzb3VyY2UsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gbWVyZ2Uob2JqZWN0KSB7XG4gIHNsaWNlKGFyZ3VtZW50cywgMSkuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgZm9yT3duKHNvdXJjZSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlLnNsaWNlKCk7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBvYmplY3Rba2V5XSA9IG1lcmdlKHt9LCBpc09iamVjdChvYmplY3Rba2V5XSkgPyBvYmplY3Rba2V5XSA6IHt9LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gb21pdChvYmplY3QsIGtleXMpIHtcbiAgdG9BcnJheShrZXlzIHx8IG93bktleXMob2JqZWN0KSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgZGVsZXRlIG9iamVjdFtrZXldO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlKGVsbXMsIGF0dHJzKSB7XG4gIGZvckVhY2goZWxtcywgZnVuY3Rpb24gKGVsbSkge1xuICAgIGZvckVhY2goYXR0cnMsIGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICBlbG0gJiYgZWxtLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZShlbG1zLCBhdHRycywgdmFsdWUpIHtcbiAgaWYgKGlzT2JqZWN0KGF0dHJzKSkge1xuICAgIGZvck93bihhdHRycywgZnVuY3Rpb24gKHZhbHVlMiwgbmFtZSkge1xuICAgICAgc2V0QXR0cmlidXRlKGVsbXMsIG5hbWUsIHZhbHVlMik7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZm9yRWFjaChlbG1zLCBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICBpc051bGwodmFsdWUpIHx8IHZhbHVlID09PSBcIlwiID8gcmVtb3ZlQXR0cmlidXRlKGVsbSwgYXR0cnMpIDogZWxtLnNldEF0dHJpYnV0ZShhdHRycywgU3RyaW5nKHZhbHVlKSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlKHRhZywgYXR0cnMsIHBhcmVudCkge1xuICB2YXIgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuXG4gIGlmIChhdHRycykge1xuICAgIGlzU3RyaW5nKGF0dHJzKSA/IGFkZENsYXNzKGVsbSwgYXR0cnMpIDogc2V0QXR0cmlidXRlKGVsbSwgYXR0cnMpO1xuICB9XG5cbiAgcGFyZW50ICYmIGFwcGVuZChwYXJlbnQsIGVsbSk7XG4gIHJldHVybiBlbG07XG59XG5cbmZ1bmN0aW9uIHN0eWxlKGVsbSwgcHJvcCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKGVsbSlbcHJvcF07XG4gIH1cblxuICBpZiAoIWlzTnVsbCh2YWx1ZSkpIHtcbiAgICBlbG0uc3R5bGVbcHJvcF0gPSBcIlwiICsgdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheShlbG0sIGRpc3BsYXkyKSB7XG4gIHN0eWxlKGVsbSwgXCJkaXNwbGF5XCIsIGRpc3BsYXkyKTtcbn1cblxuZnVuY3Rpb24gZm9jdXMoZWxtKSB7XG4gIGVsbVtcInNldEFjdGl2ZVwiXSAmJiBlbG1bXCJzZXRBY3RpdmVcIl0oKSB8fCBlbG0uZm9jdXMoe1xuICAgIHByZXZlbnRTY3JvbGw6IHRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZShlbG0sIGF0dHIpIHtcbiAgcmV0dXJuIGVsbS5nZXRBdHRyaWJ1dGUoYXR0cik7XG59XG5cbmZ1bmN0aW9uIGhhc0NsYXNzKGVsbSwgY2xhc3NOYW1lKSB7XG4gIHJldHVybiBlbG0gJiYgZWxtLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xufVxuXG5mdW5jdGlvbiByZWN0KHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xufVxuXG5mdW5jdGlvbiByZW1vdmUobm9kZXMpIHtcbiAgZm9yRWFjaChub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBpZiAobm9kZSAmJiBub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwYXJzZUh0bWwoaHRtbCkge1xuICByZXR1cm4gY2hpbGQobmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCBcInRleHQvaHRtbFwiKS5ib2R5KTtcbn1cblxuZnVuY3Rpb24gcHJldmVudChlLCBzdG9wUHJvcGFnYXRpb24pIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGlmIChzdG9wUHJvcGFnYXRpb24pIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcXVlcnkocGFyZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gcGFyZW50ICYmIHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gcXVlcnlBbGwocGFyZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gc2VsZWN0b3IgPyBzbGljZShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpIDogW107XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsbSwgY2xhc3Nlcykge1xuICB0b2dnbGVDbGFzcyhlbG0sIGNsYXNzZXMsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gdGltZU9mKGUpIHtcbiAgcmV0dXJuIGUudGltZVN0YW1wO1xufVxuXG5mdW5jdGlvbiB1bml0KHZhbHVlKSB7XG4gIHJldHVybiBpc1N0cmluZyh2YWx1ZSkgPyB2YWx1ZSA6IHZhbHVlID8gdmFsdWUgKyBcInB4XCIgOiBcIlwiO1xufVxuXG52YXIgUFJPSkVDVF9DT0RFID0gXCJzcGxpZGVcIjtcbnZhciBEQVRBX0FUVFJJQlVURSA9IFwiZGF0YS1cIiArIFBST0pFQ1RfQ09ERTtcblxuZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIltcIiArIFBST0pFQ1RfQ09ERSArIFwiXSBcIiArIChtZXNzYWdlIHx8IFwiXCIpKTtcbiAgfVxufVxuXG52YXIgbWluID0gTWF0aC5taW4sXG4gICAgbWF4ID0gTWF0aC5tYXgsXG4gICAgZmxvb3IgPSBNYXRoLmZsb29yLFxuICAgIGNlaWwgPSBNYXRoLmNlaWwsXG4gICAgYWJzID0gTWF0aC5hYnM7XG5cbmZ1bmN0aW9uIGFwcHJveGltYXRlbHlFcXVhbCh4LCB5LCBlcHNpbG9uKSB7XG4gIHJldHVybiBhYnMoeCAtIHkpIDwgZXBzaWxvbjtcbn1cblxuZnVuY3Rpb24gYmV0d2VlbihudW1iZXIsIG1pbk9yTWF4LCBtYXhPck1pbiwgZXhjbHVzaXZlKSB7XG4gIHZhciBtaW5pbXVtID0gbWluKG1pbk9yTWF4LCBtYXhPck1pbik7XG4gIHZhciBtYXhpbXVtID0gbWF4KG1pbk9yTWF4LCBtYXhPck1pbik7XG4gIHJldHVybiBleGNsdXNpdmUgPyBtaW5pbXVtIDwgbnVtYmVyICYmIG51bWJlciA8IG1heGltdW0gOiBtaW5pbXVtIDw9IG51bWJlciAmJiBudW1iZXIgPD0gbWF4aW11bTtcbn1cblxuZnVuY3Rpb24gY2xhbXAobnVtYmVyLCB4LCB5KSB7XG4gIHZhciBtaW5pbXVtID0gbWluKHgsIHkpO1xuICB2YXIgbWF4aW11bSA9IG1heCh4LCB5KTtcbiAgcmV0dXJuIG1pbihtYXgobWluaW11bSwgbnVtYmVyKSwgbWF4aW11bSk7XG59XG5cbmZ1bmN0aW9uIHNpZ24oeCkge1xuICByZXR1cm4gKyh4ID4gMCkgLSArKHggPCAwKTtcbn1cblxuZnVuY3Rpb24gY2FtZWxUb0tlYmFiKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbYS16MC05XSkoW0EtWl0pL2csIFwiJDEtJDJcIikudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0KHN0cmluZywgcmVwbGFjZW1lbnRzKSB7XG4gIGZvckVhY2gocmVwbGFjZW1lbnRzLCBmdW5jdGlvbiAocmVwbGFjZW1lbnQpIHtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShcIiVzXCIsIFwiXCIgKyByZXBsYWNlbWVudCk7XG4gIH0pO1xuICByZXR1cm4gc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBwYWQobnVtYmVyKSB7XG4gIHJldHVybiBudW1iZXIgPCAxMCA/IFwiMFwiICsgbnVtYmVyIDogXCJcIiArIG51bWJlcjtcbn1cblxudmFyIGlkcyA9IHt9O1xuXG5mdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcbiAgcmV0dXJuIFwiXCIgKyBwcmVmaXggKyBwYWQoaWRzW3ByZWZpeF0gPSAoaWRzW3ByZWZpeF0gfHwgMCkgKyAxKTtcbn1cblxuZnVuY3Rpb24gRXZlbnRCaW5kZXIoKSB7XG4gIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICBmdW5jdGlvbiBiaW5kKHRhcmdldHMsIGV2ZW50cywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICBmb3JFYWNoRXZlbnQodGFyZ2V0cywgZXZlbnRzLCBmdW5jdGlvbiAodGFyZ2V0LCBldmVudCwgbmFtZXNwYWNlKSB7XG4gICAgICB2YXIgaXNFdmVudFRhcmdldCA9IChcImFkZEV2ZW50TGlzdGVuZXJcIiBpbiB0YXJnZXQpO1xuICAgICAgdmFyIHJlbW92ZXIgPSBpc0V2ZW50VGFyZ2V0ID8gdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIuYmluZCh0YXJnZXQsIGV2ZW50LCBjYWxsYmFjaywgb3B0aW9ucykgOiB0YXJnZXRbXCJyZW1vdmVMaXN0ZW5lclwiXS5iaW5kKHRhcmdldCwgY2FsbGJhY2spO1xuICAgICAgaXNFdmVudFRhcmdldCA/IHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaywgb3B0aW9ucykgOiB0YXJnZXRbXCJhZGRMaXN0ZW5lclwiXShjYWxsYmFjayk7XG4gICAgICBsaXN0ZW5lcnMucHVzaChbdGFyZ2V0LCBldmVudCwgbmFtZXNwYWNlLCBjYWxsYmFjaywgcmVtb3Zlcl0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5iaW5kKHRhcmdldHMsIGV2ZW50cywgY2FsbGJhY2spIHtcbiAgICBmb3JFYWNoRXZlbnQodGFyZ2V0cywgZXZlbnRzLCBmdW5jdGlvbiAodGFyZ2V0LCBldmVudCwgbmFtZXNwYWNlKSB7XG4gICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICBpZiAobGlzdGVuZXJbMF0gPT09IHRhcmdldCAmJiBsaXN0ZW5lclsxXSA9PT0gZXZlbnQgJiYgbGlzdGVuZXJbMl0gPT09IG5hbWVzcGFjZSAmJiAoIWNhbGxiYWNrIHx8IGxpc3RlbmVyWzNdID09PSBjYWxsYmFjaykpIHtcbiAgICAgICAgICBsaXN0ZW5lcls0XSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwYXRjaCh0YXJnZXQsIHR5cGUsIGRldGFpbCkge1xuICAgIHZhciBlO1xuICAgIHZhciBidWJibGVzID0gdHJ1ZTtcblxuICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZSA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7XG4gICAgICAgIGJ1YmJsZXM6IGJ1YmJsZXMsXG4gICAgICAgIGRldGFpbDogZGV0YWlsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBidWJibGVzLCBmYWxzZSwgZGV0YWlsKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICByZXR1cm4gZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvckVhY2hFdmVudCh0YXJnZXRzLCBldmVudHMsIGl0ZXJhdGVlKSB7XG4gICAgZm9yRWFjaCh0YXJnZXRzLCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgJiYgZm9yRWFjaChldmVudHMsIGZ1bmN0aW9uIChldmVudHMyKSB7XG4gICAgICAgIGV2ZW50czIuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TlMpIHtcbiAgICAgICAgICB2YXIgZnJhZ21lbnQgPSBldmVudE5TLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICBpdGVyYXRlZSh0YXJnZXQsIGZyYWdtZW50WzBdLCBmcmFnbWVudFsxXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBkYXRhWzRdKCk7XG4gICAgfSk7XG4gICAgZW1wdHkobGlzdGVuZXJzKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYmluZDogYmluZCxcbiAgICB1bmJpbmQ6IHVuYmluZCxcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xufVxuXG52YXIgRVZFTlRfTU9VTlRFRCA9IFwibW91bnRlZFwiO1xudmFyIEVWRU5UX1JFQURZID0gXCJyZWFkeVwiO1xudmFyIEVWRU5UX01PVkUgPSBcIm1vdmVcIjtcbnZhciBFVkVOVF9NT1ZFRCA9IFwibW92ZWRcIjtcbnZhciBFVkVOVF9TSElGVEVEID0gXCJzaGlmdGVkXCI7XG52YXIgRVZFTlRfQ0xJQ0sgPSBcImNsaWNrXCI7XG52YXIgRVZFTlRfQUNUSVZFID0gXCJhY3RpdmVcIjtcbnZhciBFVkVOVF9JTkFDVElWRSA9IFwiaW5hY3RpdmVcIjtcbnZhciBFVkVOVF9WSVNJQkxFID0gXCJ2aXNpYmxlXCI7XG52YXIgRVZFTlRfSElEREVOID0gXCJoaWRkZW5cIjtcbnZhciBFVkVOVF9TTElERV9LRVlET1dOID0gXCJzbGlkZTprZXlkb3duXCI7XG52YXIgRVZFTlRfUkVGUkVTSCA9IFwicmVmcmVzaFwiO1xudmFyIEVWRU5UX1VQREFURUQgPSBcInVwZGF0ZWRcIjtcbnZhciBFVkVOVF9SRVNJWkUgPSBcInJlc2l6ZVwiO1xudmFyIEVWRU5UX1JFU0laRUQgPSBcInJlc2l6ZWRcIjtcbnZhciBFVkVOVF9EUkFHID0gXCJkcmFnXCI7XG52YXIgRVZFTlRfRFJBR0dJTkcgPSBcImRyYWdnaW5nXCI7XG52YXIgRVZFTlRfRFJBR0dFRCA9IFwiZHJhZ2dlZFwiO1xudmFyIEVWRU5UX1NDUk9MTCA9IFwic2Nyb2xsXCI7XG52YXIgRVZFTlRfU0NST0xMRUQgPSBcInNjcm9sbGVkXCI7XG52YXIgRVZFTlRfREVTVFJPWSA9IFwiZGVzdHJveVwiO1xudmFyIEVWRU5UX0FSUk9XU19NT1VOVEVEID0gXCJhcnJvd3M6bW91bnRlZFwiO1xudmFyIEVWRU5UX0FSUk9XU19VUERBVEVEID0gXCJhcnJvd3M6dXBkYXRlZFwiO1xudmFyIEVWRU5UX1BBR0lOQVRJT05fTU9VTlRFRCA9IFwicGFnaW5hdGlvbjptb3VudGVkXCI7XG52YXIgRVZFTlRfUEFHSU5BVElPTl9VUERBVEVEID0gXCJwYWdpbmF0aW9uOnVwZGF0ZWRcIjtcbnZhciBFVkVOVF9OQVZJR0FUSU9OX01PVU5URUQgPSBcIm5hdmlnYXRpb246bW91bnRlZFwiO1xudmFyIEVWRU5UX0FVVE9QTEFZX1BMQVkgPSBcImF1dG9wbGF5OnBsYXlcIjtcbnZhciBFVkVOVF9BVVRPUExBWV9QTEFZSU5HID0gXCJhdXRvcGxheTpwbGF5aW5nXCI7XG52YXIgRVZFTlRfQVVUT1BMQVlfUEFVU0UgPSBcImF1dG9wbGF5OnBhdXNlXCI7XG52YXIgRVZFTlRfTEFaWUxPQURfTE9BREVEID0gXCJsYXp5bG9hZDpsb2FkZWRcIjtcblxuZnVuY3Rpb24gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMikge1xuICB2YXIgYnVzID0gU3BsaWRlMiA/IFNwbGlkZTIuZXZlbnQuYnVzIDogZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICB2YXIgYmluZGVyID0gRXZlbnRCaW5kZXIoKTtcblxuICBmdW5jdGlvbiBvbihldmVudHMsIGNhbGxiYWNrKSB7XG4gICAgYmluZGVyLmJpbmQoYnVzLCB0b0FycmF5KGV2ZW50cykuam9pbihcIiBcIiksIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjYWxsYmFjay5hcHBseShjYWxsYmFjaywgaXNBcnJheShlLmRldGFpbCkgPyBlLmRldGFpbCA6IFtdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICBiaW5kZXIuZGlzcGF0Y2goYnVzLCBldmVudCwgc2xpY2UoYXJndW1lbnRzLCAxKSk7XG4gIH1cblxuICBpZiAoU3BsaWRlMikge1xuICAgIFNwbGlkZTIuZXZlbnQub24oRVZFTlRfREVTVFJPWSwgYmluZGVyLmRlc3Ryb3kpO1xuICB9XG5cbiAgcmV0dXJuIGFzc2lnbihiaW5kZXIsIHtcbiAgICBidXM6IGJ1cyxcbiAgICBvbjogb24sXG4gICAgb2ZmOiBhcHBseShiaW5kZXIudW5iaW5kLCBidXMpLFxuICAgIGVtaXQ6IGVtaXRcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIFJlcXVlc3RJbnRlcnZhbChpbnRlcnZhbCwgb25JbnRlcnZhbCwgb25VcGRhdGUsIGxpbWl0KSB7XG4gIHZhciBub3cgPSBEYXRlLm5vdztcbiAgdmFyIHN0YXJ0VGltZTtcbiAgdmFyIHJhdGUgPSAwO1xuICB2YXIgaWQ7XG4gIHZhciBwYXVzZWQgPSB0cnVlO1xuICB2YXIgY291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAoIXBhdXNlZCkge1xuICAgICAgcmF0ZSA9IGludGVydmFsID8gbWluKChub3coKSAtIHN0YXJ0VGltZSkgLyBpbnRlcnZhbCwgMSkgOiAxO1xuICAgICAgb25VcGRhdGUgJiYgb25VcGRhdGUocmF0ZSk7XG5cbiAgICAgIGlmIChyYXRlID49IDEpIHtcbiAgICAgICAgb25JbnRlcnZhbCgpO1xuICAgICAgICBzdGFydFRpbWUgPSBub3coKTtcblxuICAgICAgICBpZiAobGltaXQgJiYgKytjb3VudCA+PSBsaW1pdCkge1xuICAgICAgICAgIHJldHVybiBwYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJhZih1cGRhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KHJlc3VtZSkge1xuICAgICFyZXN1bWUgJiYgY2FuY2VsKCk7XG4gICAgc3RhcnRUaW1lID0gbm93KCkgLSAocmVzdW1lID8gcmF0ZSAqIGludGVydmFsIDogMCk7XG4gICAgcGF1c2VkID0gZmFsc2U7XG4gICAgcmFmKHVwZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICBwYXVzZWQgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmV3aW5kKCkge1xuICAgIHN0YXJ0VGltZSA9IG5vdygpO1xuICAgIHJhdGUgPSAwO1xuXG4gICAgaWYgKG9uVXBkYXRlKSB7XG4gICAgICBvblVwZGF0ZShyYXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWQgJiYgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgIHJhdGUgPSAwO1xuICAgIGlkID0gMDtcbiAgICBwYXVzZWQgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0KHRpbWUpIHtcbiAgICBpbnRlcnZhbCA9IHRpbWU7XG4gIH1cblxuICBmdW5jdGlvbiBpc1BhdXNlZCgpIHtcbiAgICByZXR1cm4gcGF1c2VkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydDogc3RhcnQsXG4gICAgcmV3aW5kOiByZXdpbmQsXG4gICAgcGF1c2U6IHBhdXNlLFxuICAgIGNhbmNlbDogY2FuY2VsLFxuICAgIHNldDogc2V0LFxuICAgIGlzUGF1c2VkOiBpc1BhdXNlZFxuICB9O1xufVxuXG5mdW5jdGlvbiBTdGF0ZShpbml0aWFsU3RhdGUpIHtcbiAgdmFyIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuXG4gIGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgIHN0YXRlID0gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBpcyhzdGF0ZXMpIHtcbiAgICByZXR1cm4gaW5jbHVkZXModG9BcnJheShzdGF0ZXMpLCBzdGF0ZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldDogc2V0LFxuICAgIGlzOiBpc1xuICB9O1xufVxuXG5mdW5jdGlvbiBUaHJvdHRsZShmdW5jLCBkdXJhdGlvbikge1xuICB2YXIgaW50ZXJ2YWw7XG5cbiAgZnVuY3Rpb24gdGhyb3R0bGVkKCkge1xuICAgIGlmICghaW50ZXJ2YWwpIHtcbiAgICAgIGludGVydmFsID0gUmVxdWVzdEludGVydmFsKGR1cmF0aW9uIHx8IDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuYygpO1xuICAgICAgICBpbnRlcnZhbCA9IG51bGw7XG4gICAgICB9LCBudWxsLCAxKTtcbiAgICAgIGludGVydmFsLnN0YXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRocm90dGxlZDtcbn1cblxuZnVuY3Rpb24gTWVkaWEoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIHN0YXRlID0gU3BsaWRlMi5zdGF0ZTtcbiAgdmFyIGJyZWFrcG9pbnRzID0gb3B0aW9ucy5icmVha3BvaW50cyB8fCB7fTtcbiAgdmFyIHJlZHVjZWRNb3Rpb24gPSBvcHRpb25zLnJlZHVjZWRNb3Rpb24gfHwge307XG4gIHZhciBiaW5kZXIgPSBFdmVudEJpbmRlcigpO1xuICB2YXIgcXVlcmllcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgIHZhciBpc01pbiA9IG9wdGlvbnMubWVkaWFRdWVyeSA9PT0gXCJtaW5cIjtcbiAgICBvd25LZXlzKGJyZWFrcG9pbnRzKS5zb3J0KGZ1bmN0aW9uIChuLCBtKSB7XG4gICAgICByZXR1cm4gaXNNaW4gPyArbiAtICttIDogK20gLSArbjtcbiAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJlZ2lzdGVyKGJyZWFrcG9pbnRzW2tleV0sIFwiKFwiICsgKGlzTWluID8gXCJtaW5cIiA6IFwibWF4XCIpICsgXCItd2lkdGg6XCIgKyBrZXkgKyBcInB4KVwiKTtcbiAgICB9KTtcbiAgICByZWdpc3RlcihyZWR1Y2VkTW90aW9uLCBNRURJQV9QUkVGRVJTX1JFRFVDRURfTU9USU9OKTtcbiAgICB1cGRhdGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koY29tcGxldGVseSkge1xuICAgIGlmIChjb21wbGV0ZWx5KSB7XG4gICAgICBiaW5kZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyKG9wdGlvbnMyLCBxdWVyeSkge1xuICAgIHZhciBxdWVyeUxpc3QgPSBtYXRjaE1lZGlhKHF1ZXJ5KTtcbiAgICBiaW5kZXIuYmluZChxdWVyeUxpc3QsIFwiY2hhbmdlXCIsIHVwZGF0ZSk7XG4gICAgcXVlcmllcy5wdXNoKFtvcHRpb25zMiwgcXVlcnlMaXN0XSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIGRlc3Ryb3llZCA9IHN0YXRlLmlzKERFU1RST1lFRCk7XG4gICAgdmFyIGRpcmVjdGlvbiA9IG9wdGlvbnMuZGlyZWN0aW9uO1xuICAgIHZhciBtZXJnZWQgPSBxdWVyaWVzLnJlZHVjZShmdW5jdGlvbiAobWVyZ2VkMiwgZW50cnkpIHtcbiAgICAgIHJldHVybiBtZXJnZShtZXJnZWQyLCBlbnRyeVsxXS5tYXRjaGVzID8gZW50cnlbMF0gOiB7fSk7XG4gICAgfSwge30pO1xuICAgIG9taXQob3B0aW9ucyk7XG4gICAgc2V0KG1lcmdlZCk7XG5cbiAgICBpZiAob3B0aW9ucy5kZXN0cm95KSB7XG4gICAgICBTcGxpZGUyLmRlc3Ryb3kob3B0aW9ucy5kZXN0cm95ID09PSBcImNvbXBsZXRlbHlcIik7XG4gICAgfSBlbHNlIGlmIChkZXN0cm95ZWQpIHtcbiAgICAgIGRlc3Ryb3kodHJ1ZSk7XG4gICAgICBTcGxpZGUyLm1vdW50KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdGlvbiAhPT0gb3B0aW9ucy5kaXJlY3Rpb24gJiYgU3BsaWRlMi5yZWZyZXNoKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVkdWNlKGVuYWJsZSkge1xuICAgIGlmIChtYXRjaE1lZGlhKE1FRElBX1BSRUZFUlNfUkVEVUNFRF9NT1RJT04pLm1hdGNoZXMpIHtcbiAgICAgIGVuYWJsZSA/IG1lcmdlKG9wdGlvbnMsIHJlZHVjZWRNb3Rpb24pIDogb21pdChvcHRpb25zLCBvd25LZXlzKHJlZHVjZWRNb3Rpb24pKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXQob3B0cywgdXNlcikge1xuICAgIG1lcmdlKG9wdGlvbnMsIG9wdHMpO1xuICAgIHVzZXIgJiYgbWVyZ2UoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9wdGlvbnMpLCBvcHRzKTtcblxuICAgIGlmICghc3RhdGUuaXMoQ1JFQVRFRCkpIHtcbiAgICAgIFNwbGlkZTIuZW1pdChFVkVOVF9VUERBVEVELCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldHVwOiBzZXR1cCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHJlZHVjZTogcmVkdWNlLFxuICAgIHNldDogc2V0XG4gIH07XG59XG5cbnZhciBBUlJPVyA9IFwiQXJyb3dcIjtcbnZhciBBUlJPV19MRUZUID0gQVJST1cgKyBcIkxlZnRcIjtcbnZhciBBUlJPV19SSUdIVCA9IEFSUk9XICsgXCJSaWdodFwiO1xudmFyIEFSUk9XX1VQID0gQVJST1cgKyBcIlVwXCI7XG52YXIgQVJST1dfRE9XTiA9IEFSUk9XICsgXCJEb3duXCI7XG52YXIgTFRSID0gXCJsdHJcIjtcbnZhciBSVEwgPSBcInJ0bFwiO1xudmFyIFRUQiA9IFwidHRiXCI7XG52YXIgT1JJRU5UQVRJT05fTUFQID0ge1xuICB3aWR0aDogW1wiaGVpZ2h0XCJdLFxuICBsZWZ0OiBbXCJ0b3BcIiwgXCJyaWdodFwiXSxcbiAgcmlnaHQ6IFtcImJvdHRvbVwiLCBcImxlZnRcIl0sXG4gIHg6IFtcInlcIl0sXG4gIFg6IFtcIllcIl0sXG4gIFk6IFtcIlhcIl0sXG4gIEFycm93TGVmdDogW0FSUk9XX1VQLCBBUlJPV19SSUdIVF0sXG4gIEFycm93UmlnaHQ6IFtBUlJPV19ET1dOLCBBUlJPV19MRUZUXVxufTtcblxuZnVuY3Rpb24gRGlyZWN0aW9uKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIGZ1bmN0aW9uIHJlc29sdmUocHJvcCwgYXhpc09ubHksIGRpcmVjdGlvbikge1xuICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiB8fCBvcHRpb25zLmRpcmVjdGlvbjtcbiAgICB2YXIgaW5kZXggPSBkaXJlY3Rpb24gPT09IFJUTCAmJiAhYXhpc09ubHkgPyAxIDogZGlyZWN0aW9uID09PSBUVEIgPyAwIDogLTE7XG4gICAgcmV0dXJuIE9SSUVOVEFUSU9OX01BUFtwcm9wXSAmJiBPUklFTlRBVElPTl9NQVBbcHJvcF1baW5kZXhdIHx8IHByb3AucmVwbGFjZSgvd2lkdGh8bGVmdHxyaWdodC9pLCBmdW5jdGlvbiAobWF0Y2gsIG9mZnNldCkge1xuICAgICAgdmFyIHJlcGxhY2VtZW50ID0gT1JJRU5UQVRJT05fTUFQW21hdGNoLnRvTG93ZXJDYXNlKCldW2luZGV4XSB8fCBtYXRjaDtcbiAgICAgIHJldHVybiBvZmZzZXQgPiAwID8gcmVwbGFjZW1lbnQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyByZXBsYWNlbWVudC5zbGljZSgxKSA6IHJlcGxhY2VtZW50O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gb3JpZW50KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICogKG9wdGlvbnMuZGlyZWN0aW9uID09PSBSVEwgPyAxIDogLTEpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNvbHZlOiByZXNvbHZlLFxuICAgIG9yaWVudDogb3JpZW50XG4gIH07XG59XG5cbnZhciBST0xFID0gXCJyb2xlXCI7XG52YXIgVEFCX0lOREVYID0gXCJ0YWJpbmRleFwiO1xudmFyIERJU0FCTEVEID0gXCJkaXNhYmxlZFwiO1xudmFyIEFSSUFfUFJFRklYID0gXCJhcmlhLVwiO1xudmFyIEFSSUFfQ09OVFJPTFMgPSBBUklBX1BSRUZJWCArIFwiY29udHJvbHNcIjtcbnZhciBBUklBX0NVUlJFTlQgPSBBUklBX1BSRUZJWCArIFwiY3VycmVudFwiO1xudmFyIEFSSUFfU0VMRUNURUQgPSBBUklBX1BSRUZJWCArIFwic2VsZWN0ZWRcIjtcbnZhciBBUklBX0xBQkVMID0gQVJJQV9QUkVGSVggKyBcImxhYmVsXCI7XG52YXIgQVJJQV9MQUJFTExFREJZID0gQVJJQV9QUkVGSVggKyBcImxhYmVsbGVkYnlcIjtcbnZhciBBUklBX0hJRERFTiA9IEFSSUFfUFJFRklYICsgXCJoaWRkZW5cIjtcbnZhciBBUklBX09SSUVOVEFUSU9OID0gQVJJQV9QUkVGSVggKyBcIm9yaWVudGF0aW9uXCI7XG52YXIgQVJJQV9ST0xFREVTQ1JJUFRJT04gPSBBUklBX1BSRUZJWCArIFwicm9sZWRlc2NyaXB0aW9uXCI7XG52YXIgQVJJQV9MSVZFID0gQVJJQV9QUkVGSVggKyBcImxpdmVcIjtcbnZhciBBUklBX0JVU1kgPSBBUklBX1BSRUZJWCArIFwiYnVzeVwiO1xudmFyIEFSSUFfQVRPTUlDID0gQVJJQV9QUkVGSVggKyBcImF0b21pY1wiO1xudmFyIEFMTF9BVFRSSUJVVEVTID0gW1JPTEUsIFRBQl9JTkRFWCwgRElTQUJMRUQsIEFSSUFfQ09OVFJPTFMsIEFSSUFfQ1VSUkVOVCwgQVJJQV9MQUJFTCwgQVJJQV9MQUJFTExFREJZLCBBUklBX0hJRERFTiwgQVJJQV9PUklFTlRBVElPTiwgQVJJQV9ST0xFREVTQ1JJUFRJT05dO1xudmFyIENMQVNTX1JPT1QgPSBQUk9KRUNUX0NPREU7XG52YXIgQ0xBU1NfVFJBQ0sgPSBQUk9KRUNUX0NPREUgKyBcIl9fdHJhY2tcIjtcbnZhciBDTEFTU19MSVNUID0gUFJPSkVDVF9DT0RFICsgXCJfX2xpc3RcIjtcbnZhciBDTEFTU19TTElERSA9IFBST0pFQ1RfQ09ERSArIFwiX19zbGlkZVwiO1xudmFyIENMQVNTX0NMT05FID0gQ0xBU1NfU0xJREUgKyBcIi0tY2xvbmVcIjtcbnZhciBDTEFTU19DT05UQUlORVIgPSBDTEFTU19TTElERSArIFwiX19jb250YWluZXJcIjtcbnZhciBDTEFTU19BUlJPV1MgPSBQUk9KRUNUX0NPREUgKyBcIl9fYXJyb3dzXCI7XG52YXIgQ0xBU1NfQVJST1cgPSBQUk9KRUNUX0NPREUgKyBcIl9fYXJyb3dcIjtcbnZhciBDTEFTU19BUlJPV19QUkVWID0gQ0xBU1NfQVJST1cgKyBcIi0tcHJldlwiO1xudmFyIENMQVNTX0FSUk9XX05FWFQgPSBDTEFTU19BUlJPVyArIFwiLS1uZXh0XCI7XG52YXIgQ0xBU1NfUEFHSU5BVElPTiA9IFBST0pFQ1RfQ09ERSArIFwiX19wYWdpbmF0aW9uXCI7XG52YXIgQ0xBU1NfUEFHSU5BVElPTl9QQUdFID0gQ0xBU1NfUEFHSU5BVElPTiArIFwiX19wYWdlXCI7XG52YXIgQ0xBU1NfUFJPR1JFU1MgPSBQUk9KRUNUX0NPREUgKyBcIl9fcHJvZ3Jlc3NcIjtcbnZhciBDTEFTU19QUk9HUkVTU19CQVIgPSBDTEFTU19QUk9HUkVTUyArIFwiX19iYXJcIjtcbnZhciBDTEFTU19UT0dHTEUgPSBQUk9KRUNUX0NPREUgKyBcIl9fdG9nZ2xlXCI7XG52YXIgQ0xBU1NfVE9HR0xFX1BMQVkgPSBDTEFTU19UT0dHTEUgKyBcIl9fcGxheVwiO1xudmFyIENMQVNTX1RPR0dMRV9QQVVTRSA9IENMQVNTX1RPR0dMRSArIFwiX19wYXVzZVwiO1xudmFyIENMQVNTX1NQSU5ORVIgPSBQUk9KRUNUX0NPREUgKyBcIl9fc3Bpbm5lclwiO1xudmFyIENMQVNTX1NSID0gUFJPSkVDVF9DT0RFICsgXCJfX3NyXCI7XG52YXIgQ0xBU1NfSU5JVElBTElaRUQgPSBcImlzLWluaXRpYWxpemVkXCI7XG52YXIgQ0xBU1NfQUNUSVZFID0gXCJpcy1hY3RpdmVcIjtcbnZhciBDTEFTU19QUkVWID0gXCJpcy1wcmV2XCI7XG52YXIgQ0xBU1NfTkVYVCA9IFwiaXMtbmV4dFwiO1xudmFyIENMQVNTX1ZJU0lCTEUgPSBcImlzLXZpc2libGVcIjtcbnZhciBDTEFTU19MT0FESU5HID0gXCJpcy1sb2FkaW5nXCI7XG52YXIgQ0xBU1NfRk9DVVNfSU4gPSBcImlzLWZvY3VzLWluXCI7XG52YXIgU1RBVFVTX0NMQVNTRVMgPSBbQ0xBU1NfQUNUSVZFLCBDTEFTU19WSVNJQkxFLCBDTEFTU19QUkVWLCBDTEFTU19ORVhULCBDTEFTU19MT0FESU5HLCBDTEFTU19GT0NVU19JTl07XG52YXIgQ0xBU1NFUyA9IHtcbiAgc2xpZGU6IENMQVNTX1NMSURFLFxuICBjbG9uZTogQ0xBU1NfQ0xPTkUsXG4gIGFycm93czogQ0xBU1NfQVJST1dTLFxuICBhcnJvdzogQ0xBU1NfQVJST1csXG4gIHByZXY6IENMQVNTX0FSUk9XX1BSRVYsXG4gIG5leHQ6IENMQVNTX0FSUk9XX05FWFQsXG4gIHBhZ2luYXRpb246IENMQVNTX1BBR0lOQVRJT04sXG4gIHBhZ2U6IENMQVNTX1BBR0lOQVRJT05fUEFHRSxcbiAgc3Bpbm5lcjogQ0xBU1NfU1BJTk5FUlxufTtcblxuZnVuY3Rpb24gY2xvc2VzdChmcm9tLCBzZWxlY3Rvcikge1xuICBpZiAoaXNGdW5jdGlvbihmcm9tLmNsb3Nlc3QpKSB7XG4gICAgcmV0dXJuIGZyb20uY2xvc2VzdChzZWxlY3Rvcik7XG4gIH1cblxuICB2YXIgZWxtID0gZnJvbTtcblxuICB3aGlsZSAoZWxtICYmIGVsbS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGlmIChtYXRjaGVzKGVsbSwgc2VsZWN0b3IpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBlbG0gPSBlbG0ucGFyZW50RWxlbWVudDtcbiAgfVxuXG4gIHJldHVybiBlbG07XG59XG5cbnZhciBGUklDVElPTiA9IDU7XG52YXIgTE9HX0lOVEVSVkFMID0gMjAwO1xudmFyIFBPSU5URVJfRE9XTl9FVkVOVFMgPSBcInRvdWNoc3RhcnQgbW91c2Vkb3duXCI7XG52YXIgUE9JTlRFUl9NT1ZFX0VWRU5UUyA9IFwidG91Y2htb3ZlIG1vdXNlbW92ZVwiO1xudmFyIFBPSU5URVJfVVBfRVZFTlRTID0gXCJ0b3VjaGVuZCB0b3VjaGNhbmNlbCBtb3VzZXVwIGNsaWNrXCI7XG5cbmZ1bmN0aW9uIEVsZW1lbnRzKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlLm9uLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZS5iaW5kO1xuXG4gIHZhciByb290ID0gU3BsaWRlMi5yb290O1xuICB2YXIgaTE4biA9IG9wdGlvbnMuaTE4bjtcbiAgdmFyIGVsZW1lbnRzID0ge307XG4gIHZhciBzbGlkZXMgPSBbXTtcbiAgdmFyIHJvb3RDbGFzc2VzID0gW107XG4gIHZhciB0cmFja0NsYXNzZXMgPSBbXTtcbiAgdmFyIHRyYWNrO1xuICB2YXIgbGlzdDtcbiAgdmFyIGlzVXNpbmdLZXk7XG5cbiAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgY29sbGVjdCgpO1xuICAgIGluaXQoKTtcbiAgICB1cGRhdGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIG9uKEVWRU5UX1JFRlJFU0gsIGRlc3Ryb3kpO1xuICAgIG9uKEVWRU5UX1JFRlJFU0gsIHNldHVwKTtcbiAgICBvbihFVkVOVF9VUERBVEVELCB1cGRhdGUpO1xuICAgIGJpbmQoZG9jdW1lbnQsIFBPSU5URVJfRE9XTl9FVkVOVFMgKyBcIiBrZXlkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpc1VzaW5nS2V5ID0gZS50eXBlID09PSBcImtleWRvd25cIjtcbiAgICB9LCB7XG4gICAgICBjYXB0dXJlOiB0cnVlXG4gICAgfSk7XG4gICAgYmluZChyb290LCBcImZvY3VzaW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdG9nZ2xlQ2xhc3Mocm9vdCwgQ0xBU1NfRk9DVVNfSU4sICEhaXNVc2luZ0tleSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KGNvbXBsZXRlbHkpIHtcbiAgICB2YXIgYXR0cnMgPSBBTExfQVRUUklCVVRFUy5jb25jYXQoXCJzdHlsZVwiKTtcbiAgICBlbXB0eShzbGlkZXMpO1xuICAgIHJlbW92ZUNsYXNzKHJvb3QsIHJvb3RDbGFzc2VzKTtcbiAgICByZW1vdmVDbGFzcyh0cmFjaywgdHJhY2tDbGFzc2VzKTtcbiAgICByZW1vdmVBdHRyaWJ1dGUoW3RyYWNrLCBsaXN0XSwgYXR0cnMpO1xuICAgIHJlbW92ZUF0dHJpYnV0ZShyb290LCBjb21wbGV0ZWx5ID8gYXR0cnMgOiBbXCJzdHlsZVwiLCBBUklBX1JPTEVERVNDUklQVElPTl0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHJlbW92ZUNsYXNzKHJvb3QsIHJvb3RDbGFzc2VzKTtcbiAgICByZW1vdmVDbGFzcyh0cmFjaywgdHJhY2tDbGFzc2VzKTtcbiAgICByb290Q2xhc3NlcyA9IGdldENsYXNzZXMoQ0xBU1NfUk9PVCk7XG4gICAgdHJhY2tDbGFzc2VzID0gZ2V0Q2xhc3NlcyhDTEFTU19UUkFDSyk7XG4gICAgYWRkQ2xhc3Mocm9vdCwgcm9vdENsYXNzZXMpO1xuICAgIGFkZENsYXNzKHRyYWNrLCB0cmFja0NsYXNzZXMpO1xuICAgIHNldEF0dHJpYnV0ZShyb290LCBBUklBX0xBQkVMLCBvcHRpb25zLmxhYmVsKTtcbiAgICBzZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9MQUJFTExFREJZLCBvcHRpb25zLmxhYmVsbGVkYnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29sbGVjdCgpIHtcbiAgICB0cmFjayA9IGZpbmQoXCIuXCIgKyBDTEFTU19UUkFDSyk7XG4gICAgbGlzdCA9IGNoaWxkKHRyYWNrLCBcIi5cIiArIENMQVNTX0xJU1QpO1xuICAgIGFzc2VydCh0cmFjayAmJiBsaXN0LCBcIkEgdHJhY2svbGlzdCBlbGVtZW50IGlzIG1pc3NpbmcuXCIpO1xuICAgIHB1c2goc2xpZGVzLCBjaGlsZHJlbihsaXN0LCBcIi5cIiArIENMQVNTX1NMSURFICsgXCI6bm90KC5cIiArIENMQVNTX0NMT05FICsgXCIpXCIpKTtcbiAgICBmb3JPd24oe1xuICAgICAgYXJyb3dzOiBDTEFTU19BUlJPV1MsXG4gICAgICBwYWdpbmF0aW9uOiBDTEFTU19QQUdJTkFUSU9OLFxuICAgICAgcHJldjogQ0xBU1NfQVJST1dfUFJFVixcbiAgICAgIG5leHQ6IENMQVNTX0FSUk9XX05FWFQsXG4gICAgICBiYXI6IENMQVNTX1BST0dSRVNTX0JBUixcbiAgICAgIHRvZ2dsZTogQ0xBU1NfVE9HR0xFXG4gICAgfSwgZnVuY3Rpb24gKGNsYXNzTmFtZSwga2V5KSB7XG4gICAgICBlbGVtZW50c1trZXldID0gZmluZChcIi5cIiArIGNsYXNzTmFtZSk7XG4gICAgfSk7XG4gICAgYXNzaWduKGVsZW1lbnRzLCB7XG4gICAgICByb290OiByb290LFxuICAgICAgdHJhY2s6IHRyYWNrLFxuICAgICAgbGlzdDogbGlzdCxcbiAgICAgIHNsaWRlczogc2xpZGVzXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBpZCA9IHJvb3QuaWQgfHwgdW5pcXVlSWQoUFJPSkVDVF9DT0RFKTtcbiAgICB2YXIgcm9sZSA9IG9wdGlvbnMucm9sZTtcbiAgICByb290LmlkID0gaWQ7XG4gICAgdHJhY2suaWQgPSB0cmFjay5pZCB8fCBpZCArIFwiLXRyYWNrXCI7XG4gICAgbGlzdC5pZCA9IGxpc3QuaWQgfHwgaWQgKyBcIi1saXN0XCI7XG5cbiAgICBpZiAoIWdldEF0dHJpYnV0ZShyb290LCBST0xFKSAmJiByb290LnRhZ05hbWUgIT09IFwiU0VDVElPTlwiICYmIHJvbGUpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShyb290LCBST0xFLCByb2xlKTtcbiAgICB9XG5cbiAgICBzZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9ST0xFREVTQ1JJUFRJT04sIGkxOG4uY2Fyb3VzZWwpO1xuICAgIHNldEF0dHJpYnV0ZShsaXN0LCBST0xFLCBcInByZXNlbnRhdGlvblwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IpIHtcbiAgICB2YXIgZWxtID0gcXVlcnkocm9vdCwgc2VsZWN0b3IpO1xuICAgIHJldHVybiBlbG0gJiYgY2xvc2VzdChlbG0sIFwiLlwiICsgQ0xBU1NfUk9PVCkgPT09IHJvb3QgPyBlbG0gOiB2b2lkIDA7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDbGFzc2VzKGJhc2UpIHtcbiAgICByZXR1cm4gW2Jhc2UgKyBcIi0tXCIgKyBvcHRpb25zLnR5cGUsIGJhc2UgKyBcIi0tXCIgKyBvcHRpb25zLmRpcmVjdGlvbiwgb3B0aW9ucy5kcmFnICYmIGJhc2UgKyBcIi0tZHJhZ2dhYmxlXCIsIG9wdGlvbnMuaXNOYXZpZ2F0aW9uICYmIGJhc2UgKyBcIi0tbmF2XCIsIGJhc2UgPT09IENMQVNTX1JPT1QgJiYgQ0xBU1NfQUNUSVZFXTtcbiAgfVxuXG4gIHJldHVybiBhc3NpZ24oZWxlbWVudHMsIHtcbiAgICBzZXR1cDogc2V0dXAsXG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfSk7XG59XG5cbnZhciBTTElERSA9IFwic2xpZGVcIjtcbnZhciBMT09QID0gXCJsb29wXCI7XG52YXIgRkFERSA9IFwiZmFkZVwiO1xuXG5mdW5jdGlvbiBTbGlkZSQxKFNwbGlkZTIsIGluZGV4LCBzbGlkZUluZGV4LCBzbGlkZSkge1xuICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgdmFyIG9uID0gZXZlbnQub24sXG4gICAgICBlbWl0ID0gZXZlbnQuZW1pdCxcbiAgICAgIGJpbmQgPSBldmVudC5iaW5kO1xuICB2YXIgQ29tcG9uZW50cyA9IFNwbGlkZTIuQ29tcG9uZW50cyxcbiAgICAgIHJvb3QgPSBTcGxpZGUyLnJvb3QsXG4gICAgICBvcHRpb25zID0gU3BsaWRlMi5vcHRpb25zO1xuICB2YXIgaXNOYXZpZ2F0aW9uID0gb3B0aW9ucy5pc05hdmlnYXRpb24sXG4gICAgICB1cGRhdGVPbk1vdmUgPSBvcHRpb25zLnVwZGF0ZU9uTW92ZSxcbiAgICAgIGkxOG4gPSBvcHRpb25zLmkxOG4sXG4gICAgICBwYWdpbmF0aW9uID0gb3B0aW9ucy5wYWdpbmF0aW9uLFxuICAgICAgc2xpZGVGb2N1cyA9IG9wdGlvbnMuc2xpZGVGb2N1cztcbiAgdmFyIHJlc29sdmUgPSBDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlO1xuICB2YXIgc3R5bGVzID0gZ2V0QXR0cmlidXRlKHNsaWRlLCBcInN0eWxlXCIpO1xuICB2YXIgbGFiZWwgPSBnZXRBdHRyaWJ1dGUoc2xpZGUsIEFSSUFfTEFCRUwpO1xuICB2YXIgaXNDbG9uZSA9IHNsaWRlSW5kZXggPiAtMTtcbiAgdmFyIGNvbnRhaW5lciA9IGNoaWxkKHNsaWRlLCBcIi5cIiArIENMQVNTX0NPTlRBSU5FUik7XG4gIHZhciBkZXN0cm95ZWQ7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKCFpc0Nsb25lKSB7XG4gICAgICBzbGlkZS5pZCA9IHJvb3QuaWQgKyBcIi1zbGlkZVwiICsgcGFkKGluZGV4ICsgMSk7XG4gICAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIFJPTEUsIHBhZ2luYXRpb24gPyBcInRhYnBhbmVsXCIgOiBcImdyb3VwXCIpO1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX1JPTEVERVNDUklQVElPTiwgaTE4bi5zbGlkZSk7XG4gICAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIEFSSUFfTEFCRUwsIGxhYmVsIHx8IGZvcm1hdChpMThuLnNsaWRlTGFiZWwsIFtpbmRleCArIDEsIFNwbGlkZTIubGVuZ3RoXSkpO1xuICAgIH1cblxuICAgIGxpc3RlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKCkge1xuICAgIGJpbmQoc2xpZGUsIFwiY2xpY2tcIiwgYXBwbHkoZW1pdCwgRVZFTlRfQ0xJQ0ssIHNlbGYpKTtcbiAgICBiaW5kKHNsaWRlLCBcImtleWRvd25cIiwgYXBwbHkoZW1pdCwgRVZFTlRfU0xJREVfS0VZRE9XTiwgc2VsZikpO1xuICAgIG9uKFtFVkVOVF9NT1ZFRCwgRVZFTlRfU0hJRlRFRCwgRVZFTlRfU0NST0xMRURdLCB1cGRhdGUpO1xuICAgIG9uKEVWRU5UX05BVklHQVRJT05fTU9VTlRFRCwgaW5pdE5hdmlnYXRpb24pO1xuXG4gICAgaWYgKHVwZGF0ZU9uTW92ZSkge1xuICAgICAgb24oRVZFTlRfTU9WRSwgb25Nb3ZlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGRlc3Ryb3llZCA9IHRydWU7XG4gICAgZXZlbnQuZGVzdHJveSgpO1xuICAgIHJlbW92ZUNsYXNzKHNsaWRlLCBTVEFUVVNfQ0xBU1NFUyk7XG4gICAgcmVtb3ZlQXR0cmlidXRlKHNsaWRlLCBBTExfQVRUUklCVVRFUyk7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBcInN0eWxlXCIsIHN0eWxlcyk7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0xBQkVMLCBsYWJlbCB8fCBcIlwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXROYXZpZ2F0aW9uKCkge1xuICAgIHZhciBjb250cm9scyA9IFNwbGlkZTIuc3BsaWRlcy5tYXAoZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgdmFyIFNsaWRlMiA9IHRhcmdldC5zcGxpZGUuQ29tcG9uZW50cy5TbGlkZXMuZ2V0QXQoaW5kZXgpO1xuICAgICAgcmV0dXJuIFNsaWRlMiA/IFNsaWRlMi5zbGlkZS5pZCA6IFwiXCI7XG4gICAgfSkuam9pbihcIiBcIik7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0xBQkVMLCBmb3JtYXQoaTE4bi5zbGlkZVgsIChpc0Nsb25lID8gc2xpZGVJbmRleCA6IGluZGV4KSArIDEpKTtcbiAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIEFSSUFfQ09OVFJPTFMsIGNvbnRyb2xzKTtcbiAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIFJPTEUsIHNsaWRlRm9jdXMgPyBcImJ1dHRvblwiIDogXCJcIik7XG4gICAgc2xpZGVGb2N1cyAmJiByZW1vdmVBdHRyaWJ1dGUoc2xpZGUsIEFSSUFfUk9MRURFU0NSSVBUSU9OKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTW92ZSgpIHtcbiAgICBpZiAoIWRlc3Ryb3llZCkge1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGlmICghZGVzdHJveWVkKSB7XG4gICAgICB2YXIgY3VyciA9IFNwbGlkZTIuaW5kZXg7XG4gICAgICB1cGRhdGVBY3Rpdml0eSgpO1xuICAgICAgdXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgICAgdG9nZ2xlQ2xhc3Moc2xpZGUsIENMQVNTX1BSRVYsIGluZGV4ID09PSBjdXJyIC0gMSk7XG4gICAgICB0b2dnbGVDbGFzcyhzbGlkZSwgQ0xBU1NfTkVYVCwgaW5kZXggPT09IGN1cnIgKyAxKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVBY3Rpdml0eSgpIHtcbiAgICB2YXIgYWN0aXZlID0gaXNBY3RpdmUoKTtcblxuICAgIGlmIChhY3RpdmUgIT09IGhhc0NsYXNzKHNsaWRlLCBDTEFTU19BQ1RJVkUpKSB7XG4gICAgICB0b2dnbGVDbGFzcyhzbGlkZSwgQ0xBU1NfQUNUSVZFLCBhY3RpdmUpO1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0NVUlJFTlQsIGlzTmF2aWdhdGlvbiAmJiBhY3RpdmUgfHwgXCJcIik7XG4gICAgICBlbWl0KGFjdGl2ZSA/IEVWRU5UX0FDVElWRSA6IEVWRU5UX0lOQUNUSVZFLCBzZWxmKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVWaXNpYmlsaXR5KCkge1xuICAgIHZhciB2aXNpYmxlID0gaXNWaXNpYmxlKCk7XG4gICAgdmFyIGhpZGRlbiA9ICF2aXNpYmxlICYmICghaXNBY3RpdmUoKSB8fCBpc0Nsb25lKTtcblxuICAgIGlmICghU3BsaWRlMi5zdGF0ZS5pcyhbTU9WSU5HLCBTQ1JPTExJTkddKSkge1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0hJRERFTiwgaGlkZGVuIHx8IFwiXCIpO1xuICAgIH1cblxuICAgIHNldEF0dHJpYnV0ZShxdWVyeUFsbChzbGlkZSwgb3B0aW9ucy5mb2N1c2FibGVOb2RlcyB8fCBcIlwiKSwgVEFCX0lOREVYLCBoaWRkZW4gPyAtMSA6IFwiXCIpO1xuXG4gICAgaWYgKHNsaWRlRm9jdXMpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgVEFCX0lOREVYLCBoaWRkZW4gPyAtMSA6IDApO1xuICAgIH1cblxuICAgIGlmICh2aXNpYmxlICE9PSBoYXNDbGFzcyhzbGlkZSwgQ0xBU1NfVklTSUJMRSkpIHtcbiAgICAgIHRvZ2dsZUNsYXNzKHNsaWRlLCBDTEFTU19WSVNJQkxFLCB2aXNpYmxlKTtcbiAgICAgIGVtaXQodmlzaWJsZSA/IEVWRU5UX1ZJU0lCTEUgOiBFVkVOVF9ISURERU4sIHNlbGYpO1xuICAgIH1cblxuICAgIGlmICghdmlzaWJsZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBzbGlkZSkge1xuICAgICAgdmFyIFNsaWRlMiA9IENvbXBvbmVudHMuU2xpZGVzLmdldEF0KFNwbGlkZTIuaW5kZXgpO1xuICAgICAgU2xpZGUyICYmIGZvY3VzKFNsaWRlMi5zbGlkZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3R5bGUkMShwcm9wLCB2YWx1ZSwgdXNlQ29udGFpbmVyKSB7XG4gICAgc3R5bGUodXNlQ29udGFpbmVyICYmIGNvbnRhaW5lciB8fCBzbGlkZSwgcHJvcCwgdmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgdmFyIGN1cnIgPSBTcGxpZGUyLmluZGV4O1xuICAgIHJldHVybiBjdXJyID09PSBpbmRleCB8fCBvcHRpb25zLmNsb25lU3RhdHVzICYmIGN1cnIgPT09IHNsaWRlSW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiBpc1Zpc2libGUoKSB7XG4gICAgaWYgKFNwbGlkZTIuaXMoRkFERSkpIHtcbiAgICAgIHJldHVybiBpc0FjdGl2ZSgpO1xuICAgIH1cblxuICAgIHZhciB0cmFja1JlY3QgPSByZWN0KENvbXBvbmVudHMuRWxlbWVudHMudHJhY2spO1xuICAgIHZhciBzbGlkZVJlY3QgPSByZWN0KHNsaWRlKTtcbiAgICB2YXIgbGVmdCA9IHJlc29sdmUoXCJsZWZ0XCIsIHRydWUpO1xuICAgIHZhciByaWdodCA9IHJlc29sdmUoXCJyaWdodFwiLCB0cnVlKTtcbiAgICByZXR1cm4gZmxvb3IodHJhY2tSZWN0W2xlZnRdKSA8PSBjZWlsKHNsaWRlUmVjdFtsZWZ0XSkgJiYgZmxvb3Ioc2xpZGVSZWN0W3JpZ2h0XSkgPD0gY2VpbCh0cmFja1JlY3RbcmlnaHRdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzV2l0aGluKGZyb20sIGRpc3RhbmNlKSB7XG4gICAgdmFyIGRpZmYgPSBhYnMoZnJvbSAtIGluZGV4KTtcblxuICAgIGlmICghaXNDbG9uZSAmJiAob3B0aW9ucy5yZXdpbmQgfHwgU3BsaWRlMi5pcyhMT09QKSkpIHtcbiAgICAgIGRpZmYgPSBtaW4oZGlmZiwgU3BsaWRlMi5sZW5ndGggLSBkaWZmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlmZiA8PSBkaXN0YW5jZTtcbiAgfVxuXG4gIHZhciBzZWxmID0ge1xuICAgIGluZGV4OiBpbmRleCxcbiAgICBzbGlkZUluZGV4OiBzbGlkZUluZGV4LFxuICAgIHNsaWRlOiBzbGlkZSxcbiAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICBpc0Nsb25lOiBpc0Nsb25lLFxuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHVwZGF0ZTogdXBkYXRlLFxuICAgIHN0eWxlOiBzdHlsZSQxLFxuICAgIGlzV2l0aGluOiBpc1dpdGhpblxuICB9O1xuICByZXR1cm4gc2VsZjtcbn1cblxuZnVuY3Rpb24gU2xpZGVzKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UyID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTIub24sXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlMi5lbWl0LFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTIuYmluZDtcblxuICB2YXIgX0NvbXBvbmVudHMyJEVsZW1lbnRzID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICBzbGlkZXMgPSBfQ29tcG9uZW50czIkRWxlbWVudHMuc2xpZGVzLFxuICAgICAgbGlzdCA9IF9Db21wb25lbnRzMiRFbGVtZW50cy5saXN0O1xuICB2YXIgU2xpZGVzMiA9IFtdO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGluaXQoKTtcbiAgICBvbihFVkVOVF9SRUZSRVNILCBkZXN0cm95KTtcbiAgICBvbihFVkVOVF9SRUZSRVNILCBpbml0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgc2xpZGVzLmZvckVhY2goZnVuY3Rpb24gKHNsaWRlLCBpbmRleCkge1xuICAgICAgcmVnaXN0ZXIoc2xpZGUsIGluZGV4LCAtMSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGZvckVhY2gkMShmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICBTbGlkZTIuZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIGVtcHR5KFNsaWRlczIpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGZvckVhY2gkMShmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICBTbGlkZTIudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlcihzbGlkZSwgaW5kZXgsIHNsaWRlSW5kZXgpIHtcbiAgICB2YXIgb2JqZWN0ID0gU2xpZGUkMShTcGxpZGUyLCBpbmRleCwgc2xpZGVJbmRleCwgc2xpZGUpO1xuICAgIG9iamVjdC5tb3VudCgpO1xuICAgIFNsaWRlczIucHVzaChvYmplY3QpO1xuICAgIFNsaWRlczIuc29ydChmdW5jdGlvbiAoU2xpZGUxLCBTbGlkZTIpIHtcbiAgICAgIHJldHVybiBTbGlkZTEuaW5kZXggLSBTbGlkZTIuaW5kZXg7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXQoZXhjbHVkZUNsb25lcykge1xuICAgIHJldHVybiBleGNsdWRlQ2xvbmVzID8gZmlsdGVyKGZ1bmN0aW9uIChTbGlkZTIpIHtcbiAgICAgIHJldHVybiAhU2xpZGUyLmlzQ2xvbmU7XG4gICAgfSkgOiBTbGlkZXMyO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW4ocGFnZSkge1xuICAgIHZhciBDb250cm9sbGVyID0gQ29tcG9uZW50czIuQ29udHJvbGxlcjtcbiAgICB2YXIgaW5kZXggPSBDb250cm9sbGVyLnRvSW5kZXgocGFnZSk7XG4gICAgdmFyIG1heCA9IENvbnRyb2xsZXIuaGFzRm9jdXMoKSA/IDEgOiBvcHRpb25zLnBlclBhZ2U7XG4gICAgcmV0dXJuIGZpbHRlcihmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICByZXR1cm4gYmV0d2VlbihTbGlkZTIuaW5kZXgsIGluZGV4LCBpbmRleCArIG1heCAtIDEpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QXQoaW5kZXgpIHtcbiAgICByZXR1cm4gZmlsdGVyKGluZGV4KVswXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZChpdGVtcywgaW5kZXgpIHtcbiAgICBmb3JFYWNoKGl0ZW1zLCBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgIGlmIChpc1N0cmluZyhzbGlkZSkpIHtcbiAgICAgICAgc2xpZGUgPSBwYXJzZUh0bWwoc2xpZGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNIVE1MRWxlbWVudChzbGlkZSkpIHtcbiAgICAgICAgdmFyIHJlZiA9IHNsaWRlc1tpbmRleF07XG4gICAgICAgIHJlZiA/IGJlZm9yZShzbGlkZSwgcmVmKSA6IGFwcGVuZChsaXN0LCBzbGlkZSk7XG4gICAgICAgIGFkZENsYXNzKHNsaWRlLCBvcHRpb25zLmNsYXNzZXMuc2xpZGUpO1xuICAgICAgICBvYnNlcnZlSW1hZ2VzKHNsaWRlLCBhcHBseShlbWl0LCBFVkVOVF9SRVNJWkUpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBlbWl0KEVWRU5UX1JFRlJFU0gpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlJDEobWF0Y2hlcikge1xuICAgIHJlbW92ZShmaWx0ZXIobWF0Y2hlcikubWFwKGZ1bmN0aW9uIChTbGlkZTIpIHtcbiAgICAgIHJldHVybiBTbGlkZTIuc2xpZGU7XG4gICAgfSkpO1xuICAgIGVtaXQoRVZFTlRfUkVGUkVTSCk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JFYWNoJDEoaXRlcmF0ZWUsIGV4Y2x1ZGVDbG9uZXMpIHtcbiAgICBnZXQoZXhjbHVkZUNsb25lcykuZm9yRWFjaChpdGVyYXRlZSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXIobWF0Y2hlcikge1xuICAgIHJldHVybiBTbGlkZXMyLmZpbHRlcihpc0Z1bmN0aW9uKG1hdGNoZXIpID8gbWF0Y2hlciA6IGZ1bmN0aW9uIChTbGlkZTIpIHtcbiAgICAgIHJldHVybiBpc1N0cmluZyhtYXRjaGVyKSA/IG1hdGNoZXMoU2xpZGUyLnNsaWRlLCBtYXRjaGVyKSA6IGluY2x1ZGVzKHRvQXJyYXkobWF0Y2hlciksIFNsaWRlMi5pbmRleCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdHlsZShwcm9wLCB2YWx1ZSwgdXNlQ29udGFpbmVyKSB7XG4gICAgZm9yRWFjaCQxKGZ1bmN0aW9uIChTbGlkZTIpIHtcbiAgICAgIFNsaWRlMi5zdHlsZShwcm9wLCB2YWx1ZSwgdXNlQ29udGFpbmVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9ic2VydmVJbWFnZXMoZWxtLCBjYWxsYmFjaykge1xuICAgIHZhciBpbWFnZXMgPSBxdWVyeUFsbChlbG0sIFwiaW1nXCIpO1xuICAgIHZhciBsZW5ndGggPSBpbWFnZXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCkge1xuICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGltZykge1xuICAgICAgICBiaW5kKGltZywgXCJsb2FkIGVycm9yXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoISAtLWxlbmd0aCkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGVuZ3RoKGV4Y2x1ZGVDbG9uZXMpIHtcbiAgICByZXR1cm4gZXhjbHVkZUNsb25lcyA/IHNsaWRlcy5sZW5ndGggOiBTbGlkZXMyLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRW5vdWdoKCkge1xuICAgIHJldHVybiBTbGlkZXMyLmxlbmd0aCA+IG9wdGlvbnMucGVyUGFnZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgdXBkYXRlOiB1cGRhdGUsXG4gICAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxuICAgIGdldDogZ2V0LFxuICAgIGdldEluOiBnZXRJbixcbiAgICBnZXRBdDogZ2V0QXQsXG4gICAgYWRkOiBhZGQsXG4gICAgcmVtb3ZlOiByZW1vdmUkMSxcbiAgICBmb3JFYWNoOiBmb3JFYWNoJDEsXG4gICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgc3R5bGU6IHN0eWxlLFxuICAgIGdldExlbmd0aDogZ2V0TGVuZ3RoLFxuICAgIGlzRW5vdWdoOiBpc0Vub3VnaFxuICB9O1xufVxuXG5mdW5jdGlvbiBMYXlvdXQoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTMgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMy5vbixcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UzLmJpbmQsXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlMy5lbWl0O1xuXG4gIHZhciBTbGlkZXMgPSBDb21wb25lbnRzMi5TbGlkZXM7XG4gIHZhciByZXNvbHZlID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLnJlc29sdmU7XG4gIHZhciBfQ29tcG9uZW50czIkRWxlbWVudHMyID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICByb290ID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzMi5yb290LFxuICAgICAgdHJhY2sgPSBfQ29tcG9uZW50czIkRWxlbWVudHMyLnRyYWNrLFxuICAgICAgbGlzdCA9IF9Db21wb25lbnRzMiRFbGVtZW50czIubGlzdDtcbiAgdmFyIGdldEF0ID0gU2xpZGVzLmdldEF0LFxuICAgICAgc3R5bGVTbGlkZXMgPSBTbGlkZXMuc3R5bGU7XG4gIHZhciB2ZXJ0aWNhbDtcbiAgdmFyIHJvb3RSZWN0O1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGluaXQoKTtcbiAgICBiaW5kKHdpbmRvdywgXCJyZXNpemUgbG9hZFwiLCBUaHJvdHRsZShhcHBseShlbWl0LCBFVkVOVF9SRVNJWkUpKSk7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCBpbml0KTtcbiAgICBvbihFVkVOVF9SRVNJWkUsIHJlc2l6ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHJvb3RSZWN0ID0gbnVsbDtcbiAgICB2ZXJ0aWNhbCA9IG9wdGlvbnMuZGlyZWN0aW9uID09PSBUVEI7XG4gICAgc3R5bGUocm9vdCwgXCJtYXhXaWR0aFwiLCB1bml0KG9wdGlvbnMud2lkdGgpKTtcbiAgICBzdHlsZSh0cmFjaywgcmVzb2x2ZShcInBhZGRpbmdMZWZ0XCIpLCBjc3NQYWRkaW5nKGZhbHNlKSk7XG4gICAgc3R5bGUodHJhY2ssIHJlc29sdmUoXCJwYWRkaW5nUmlnaHRcIiksIGNzc1BhZGRpbmcodHJ1ZSkpO1xuICAgIHJlc2l6ZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgIHZhciBuZXdSZWN0ID0gcmVjdChyb290KTtcblxuICAgIGlmICghcm9vdFJlY3QgfHwgcm9vdFJlY3Qud2lkdGggIT09IG5ld1JlY3Qud2lkdGggfHwgcm9vdFJlY3QuaGVpZ2h0ICE9PSBuZXdSZWN0LmhlaWdodCkge1xuICAgICAgc3R5bGUodHJhY2ssIFwiaGVpZ2h0XCIsIGNzc1RyYWNrSGVpZ2h0KCkpO1xuICAgICAgc3R5bGVTbGlkZXMocmVzb2x2ZShcIm1hcmdpblJpZ2h0XCIpLCB1bml0KG9wdGlvbnMuZ2FwKSk7XG4gICAgICBzdHlsZVNsaWRlcyhcIndpZHRoXCIsIGNzc1NsaWRlV2lkdGgoKSk7XG4gICAgICBzdHlsZVNsaWRlcyhcImhlaWdodFwiLCBjc3NTbGlkZUhlaWdodCgpLCB0cnVlKTtcbiAgICAgIHJvb3RSZWN0ID0gbmV3UmVjdDtcbiAgICAgIGVtaXQoRVZFTlRfUkVTSVpFRCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3NzUGFkZGluZyhyaWdodCkge1xuICAgIHZhciBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nO1xuICAgIHZhciBwcm9wID0gcmVzb2x2ZShyaWdodCA/IFwicmlnaHRcIiA6IFwibGVmdFwiKTtcbiAgICByZXR1cm4gcGFkZGluZyAmJiB1bml0KHBhZGRpbmdbcHJvcF0gfHwgKGlzT2JqZWN0KHBhZGRpbmcpID8gMCA6IHBhZGRpbmcpKSB8fCBcIjBweFwiO1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzVHJhY2tIZWlnaHQoKSB7XG4gICAgdmFyIGhlaWdodCA9IFwiXCI7XG5cbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIGhlaWdodCA9IGNzc0hlaWdodCgpO1xuICAgICAgYXNzZXJ0KGhlaWdodCwgXCJoZWlnaHQgb3IgaGVpZ2h0UmF0aW8gaXMgbWlzc2luZy5cIik7XG4gICAgICBoZWlnaHQgPSBcImNhbGMoXCIgKyBoZWlnaHQgKyBcIiAtIFwiICsgY3NzUGFkZGluZyhmYWxzZSkgKyBcIiAtIFwiICsgY3NzUGFkZGluZyh0cnVlKSArIFwiKVwiO1xuICAgIH1cblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjc3NIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHVuaXQob3B0aW9ucy5oZWlnaHQgfHwgcmVjdChsaXN0KS53aWR0aCAqIG9wdGlvbnMuaGVpZ2h0UmF0aW8pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzU2xpZGVXaWR0aCgpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5hdXRvV2lkdGggPyBudWxsIDogdW5pdChvcHRpb25zLmZpeGVkV2lkdGgpIHx8ICh2ZXJ0aWNhbCA/IFwiXCIgOiBjc3NTbGlkZVNpemUoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjc3NTbGlkZUhlaWdodCgpIHtcbiAgICByZXR1cm4gdW5pdChvcHRpb25zLmZpeGVkSGVpZ2h0KSB8fCAodmVydGljYWwgPyBvcHRpb25zLmF1dG9IZWlnaHQgPyBudWxsIDogY3NzU2xpZGVTaXplKCkgOiBjc3NIZWlnaHQoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjc3NTbGlkZVNpemUoKSB7XG4gICAgdmFyIGdhcCA9IHVuaXQob3B0aW9ucy5nYXApO1xuICAgIHJldHVybiBcImNhbGMoKDEwMCVcIiArIChnYXAgJiYgXCIgKyBcIiArIGdhcCkgKyBcIikvXCIgKyAob3B0aW9ucy5wZXJQYWdlIHx8IDEpICsgKGdhcCAmJiBcIiAtIFwiICsgZ2FwKSArIFwiKVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdFNpemUoKSB7XG4gICAgcmV0dXJuIHJlY3QobGlzdClbcmVzb2x2ZShcIndpZHRoXCIpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlU2l6ZShpbmRleCwgd2l0aG91dEdhcCkge1xuICAgIHZhciBTbGlkZSA9IGdldEF0KGluZGV4IHx8IDApO1xuICAgIHJldHVybiBTbGlkZSA/IHJlY3QoU2xpZGUuc2xpZGUpW3Jlc29sdmUoXCJ3aWR0aFwiKV0gKyAod2l0aG91dEdhcCA/IDAgOiBnZXRHYXAoKSkgOiAwO1xuICB9XG5cbiAgZnVuY3Rpb24gdG90YWxTaXplKGluZGV4LCB3aXRob3V0R2FwKSB7XG4gICAgdmFyIFNsaWRlID0gZ2V0QXQoaW5kZXgpO1xuXG4gICAgaWYgKFNsaWRlKSB7XG4gICAgICB2YXIgcmlnaHQgPSByZWN0KFNsaWRlLnNsaWRlKVtyZXNvbHZlKFwicmlnaHRcIildO1xuICAgICAgdmFyIGxlZnQgPSByZWN0KGxpc3QpW3Jlc29sdmUoXCJsZWZ0XCIpXTtcbiAgICAgIHJldHVybiBhYnMocmlnaHQgLSBsZWZ0KSArICh3aXRob3V0R2FwID8gMCA6IGdldEdhcCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlclNpemUoKSB7XG4gICAgcmV0dXJuIHRvdGFsU2l6ZShTcGxpZGUyLmxlbmd0aCAtIDEsIHRydWUpIC0gdG90YWxTaXplKC0xLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEdhcCgpIHtcbiAgICB2YXIgU2xpZGUgPSBnZXRBdCgwKTtcbiAgICByZXR1cm4gU2xpZGUgJiYgcGFyc2VGbG9hdChzdHlsZShTbGlkZS5zbGlkZSwgcmVzb2x2ZShcIm1hcmdpblJpZ2h0XCIpKSkgfHwgMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhZGRpbmcocmlnaHQpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZSh0cmFjaywgcmVzb2x2ZShcInBhZGRpbmdcIiArIChyaWdodCA/IFwiUmlnaHRcIiA6IFwiTGVmdFwiKSkpKSB8fCAwO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgbGlzdFNpemU6IGxpc3RTaXplLFxuICAgIHNsaWRlU2l6ZTogc2xpZGVTaXplLFxuICAgIHNsaWRlclNpemU6IHNsaWRlclNpemUsXG4gICAgdG90YWxTaXplOiB0b3RhbFNpemUsXG4gICAgZ2V0UGFkZGluZzogZ2V0UGFkZGluZ1xuICB9O1xufVxuXG52YXIgTVVMVElQTElFUiA9IDI7XG5cbmZ1bmN0aW9uIENsb25lcyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlNCA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U0Lm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTQuZW1pdDtcblxuICB2YXIgRWxlbWVudHMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIFNsaWRlcyA9IENvbXBvbmVudHMyLlNsaWRlcztcbiAgdmFyIHJlc29sdmUgPSBDb21wb25lbnRzMi5EaXJlY3Rpb24ucmVzb2x2ZTtcbiAgdmFyIGNsb25lcyA9IFtdO1xuICB2YXIgY2xvbmVDb3VudDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpbml0KCk7XG4gICAgb24oRVZFTlRfUkVGUkVTSCwgZGVzdHJveSk7XG4gICAgb24oRVZFTlRfUkVGUkVTSCwgaW5pdCk7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFU0laRV0sIG9ic2VydmUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBpZiAoY2xvbmVDb3VudCA9IGNvbXB1dGVDbG9uZUNvdW50KCkpIHtcbiAgICAgIGdlbmVyYXRlKGNsb25lQ291bnQpO1xuICAgICAgZW1pdChFVkVOVF9SRVNJWkUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgcmVtb3ZlKGNsb25lcyk7XG4gICAgZW1wdHkoY2xvbmVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9ic2VydmUoKSB7XG4gICAgaWYgKGNsb25lQ291bnQgPCBjb21wdXRlQ2xvbmVDb3VudCgpKSB7XG4gICAgICBlbWl0KEVWRU5UX1JFRlJFU0gpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlKGNvdW50KSB7XG4gICAgdmFyIHNsaWRlcyA9IFNsaWRlcy5nZXQoKS5zbGljZSgpO1xuICAgIHZhciBsZW5ndGggPSBzbGlkZXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCkge1xuICAgICAgd2hpbGUgKHNsaWRlcy5sZW5ndGggPCBjb3VudCkge1xuICAgICAgICBwdXNoKHNsaWRlcywgc2xpZGVzKTtcbiAgICAgIH1cblxuICAgICAgcHVzaChzbGlkZXMuc2xpY2UoLWNvdW50KSwgc2xpZGVzLnNsaWNlKDAsIGNvdW50KSkuZm9yRWFjaChmdW5jdGlvbiAoU2xpZGUsIGluZGV4KSB7XG4gICAgICAgIHZhciBpc0hlYWQgPSBpbmRleCA8IGNvdW50O1xuICAgICAgICB2YXIgY2xvbmUgPSBjbG9uZURlZXAoU2xpZGUuc2xpZGUsIGluZGV4KTtcbiAgICAgICAgaXNIZWFkID8gYmVmb3JlKGNsb25lLCBzbGlkZXNbMF0uc2xpZGUpIDogYXBwZW5kKEVsZW1lbnRzLmxpc3QsIGNsb25lKTtcbiAgICAgICAgcHVzaChjbG9uZXMsIGNsb25lKTtcbiAgICAgICAgU2xpZGVzLnJlZ2lzdGVyKGNsb25lLCBpbmRleCAtIGNvdW50ICsgKGlzSGVhZCA/IDAgOiBsZW5ndGgpLCBTbGlkZS5pbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9uZURlZXAoZWxtLCBpbmRleCkge1xuICAgIHZhciBjbG9uZSA9IGVsbS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgYWRkQ2xhc3MoY2xvbmUsIG9wdGlvbnMuY2xhc3Nlcy5jbG9uZSk7XG4gICAgY2xvbmUuaWQgPSBTcGxpZGUyLnJvb3QuaWQgKyBcIi1jbG9uZVwiICsgcGFkKGluZGV4ICsgMSk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZUNsb25lQ291bnQoKSB7XG4gICAgdmFyIGNsb25lczIgPSBvcHRpb25zLmNsb25lcztcblxuICAgIGlmICghU3BsaWRlMi5pcyhMT09QKSkge1xuICAgICAgY2xvbmVzMiA9IDA7XG4gICAgfSBlbHNlIGlmICghY2xvbmVzMikge1xuICAgICAgdmFyIGZpeGVkU2l6ZSA9IG9wdGlvbnNbcmVzb2x2ZShcImZpeGVkV2lkdGhcIildICYmIENvbXBvbmVudHMyLkxheW91dC5zbGlkZVNpemUoMCk7XG4gICAgICB2YXIgZml4ZWRDb3VudCA9IGZpeGVkU2l6ZSAmJiBjZWlsKHJlY3QoRWxlbWVudHMudHJhY2spW3Jlc29sdmUoXCJ3aWR0aFwiKV0gLyBmaXhlZFNpemUpO1xuICAgICAgY2xvbmVzMiA9IGZpeGVkQ291bnQgfHwgb3B0aW9uc1tyZXNvbHZlKFwiYXV0b1dpZHRoXCIpXSAmJiBTcGxpZGUyLmxlbmd0aCB8fCBvcHRpb25zLnBlclBhZ2UgKiBNVUxUSVBMSUVSO1xuICAgIH1cblxuICAgIHJldHVybiBjbG9uZXMyO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xufVxuXG5mdW5jdGlvbiBNb3ZlKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2U1ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTUub24sXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlNS5lbWl0O1xuXG4gIHZhciBzZXQgPSBTcGxpZGUyLnN0YXRlLnNldDtcbiAgdmFyIF9Db21wb25lbnRzMiRMYXlvdXQgPSBDb21wb25lbnRzMi5MYXlvdXQsXG4gICAgICBzbGlkZVNpemUgPSBfQ29tcG9uZW50czIkTGF5b3V0LnNsaWRlU2l6ZSxcbiAgICAgIGdldFBhZGRpbmcgPSBfQ29tcG9uZW50czIkTGF5b3V0LmdldFBhZGRpbmcsXG4gICAgICB0b3RhbFNpemUgPSBfQ29tcG9uZW50czIkTGF5b3V0LnRvdGFsU2l6ZSxcbiAgICAgIGxpc3RTaXplID0gX0NvbXBvbmVudHMyJExheW91dC5saXN0U2l6ZSxcbiAgICAgIHNsaWRlclNpemUgPSBfQ29tcG9uZW50czIkTGF5b3V0LnNsaWRlclNpemU7XG4gIHZhciBfQ29tcG9uZW50czIkRGlyZWN0aW8gPSBDb21wb25lbnRzMi5EaXJlY3Rpb24sXG4gICAgICByZXNvbHZlID0gX0NvbXBvbmVudHMyJERpcmVjdGlvLnJlc29sdmUsXG4gICAgICBvcmllbnQgPSBfQ29tcG9uZW50czIkRGlyZWN0aW8ub3JpZW50O1xuICB2YXIgX0NvbXBvbmVudHMyJEVsZW1lbnRzMyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgbGlzdCA9IF9Db21wb25lbnRzMiRFbGVtZW50czMubGlzdCxcbiAgICAgIHRyYWNrID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzMy50cmFjaztcbiAgdmFyIFRyYW5zaXRpb247XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgVHJhbnNpdGlvbiA9IENvbXBvbmVudHMyLlRyYW5zaXRpb247XG4gICAgb24oW0VWRU5UX01PVU5URUQsIEVWRU5UX1JFU0laRUQsIEVWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCByZXBvc2l0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcG9zaXRpb24oKSB7XG4gICAgaWYgKCFDb21wb25lbnRzMi5Db250cm9sbGVyLmlzQnVzeSgpKSB7XG4gICAgICBDb21wb25lbnRzMi5TY3JvbGwuY2FuY2VsKCk7XG4gICAgICBqdW1wKFNwbGlkZTIuaW5kZXgpO1xuICAgICAgQ29tcG9uZW50czIuU2xpZGVzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUoZGVzdCwgaW5kZXgsIHByZXYsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGRlc3QgIT09IGluZGV4ICYmIGNhblNoaWZ0KGRlc3QgPiBwcmV2KSkge1xuICAgICAgY2FuY2VsKCk7XG4gICAgICB0cmFuc2xhdGUoc2hpZnQoZ2V0UG9zaXRpb24oKSwgZGVzdCA+IHByZXYpLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzZXQoTU9WSU5HKTtcbiAgICBlbWl0KEVWRU5UX01PVkUsIGluZGV4LCBwcmV2LCBkZXN0KTtcbiAgICBUcmFuc2l0aW9uLnN0YXJ0KGluZGV4LCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXQoSURMRSk7XG4gICAgICBlbWl0KEVWRU5UX01PVkVELCBpbmRleCwgcHJldiwgZGVzdCk7XG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24ganVtcChpbmRleCkge1xuICAgIHRyYW5zbGF0ZSh0b1Bvc2l0aW9uKGluZGV4LCB0cnVlKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2xhdGUocG9zaXRpb24sIHByZXZlbnRMb29wKSB7XG4gICAgaWYgKCFTcGxpZGUyLmlzKEZBREUpKSB7XG4gICAgICB2YXIgZGVzdGluYXRpb24gPSBwcmV2ZW50TG9vcCA/IHBvc2l0aW9uIDogbG9vcChwb3NpdGlvbik7XG4gICAgICBzdHlsZShsaXN0LCBcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVwiICsgcmVzb2x2ZShcIlhcIikgKyBcIihcIiArIGRlc3RpbmF0aW9uICsgXCJweClcIik7XG4gICAgICBwb3NpdGlvbiAhPT0gZGVzdGluYXRpb24gJiYgZW1pdChFVkVOVF9TSElGVEVEKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsb29wKHBvc2l0aW9uKSB7XG4gICAgaWYgKFNwbGlkZTIuaXMoTE9PUCkpIHtcbiAgICAgIHZhciBpbmRleCA9IHRvSW5kZXgocG9zaXRpb24pO1xuICAgICAgdmFyIGV4Y2VlZGVkTWF4ID0gaW5kZXggPiBDb21wb25lbnRzMi5Db250cm9sbGVyLmdldEVuZCgpO1xuICAgICAgdmFyIGV4Y2VlZGVkTWluID0gaW5kZXggPCAwO1xuXG4gICAgICBpZiAoZXhjZWVkZWRNaW4gfHwgZXhjZWVkZWRNYXgpIHtcbiAgICAgICAgcG9zaXRpb24gPSBzaGlmdChwb3NpdGlvbiwgZXhjZWVkZWRNYXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNoaWZ0KHBvc2l0aW9uLCBiYWNrd2FyZHMpIHtcbiAgICB2YXIgZXhjZXNzID0gcG9zaXRpb24gLSBnZXRMaW1pdChiYWNrd2FyZHMpO1xuICAgIHZhciBzaXplID0gc2xpZGVyU2l6ZSgpO1xuICAgIHBvc2l0aW9uIC09IG9yaWVudChzaXplICogKGNlaWwoYWJzKGV4Y2VzcykgLyBzaXplKSB8fCAxKSkgKiAoYmFja3dhcmRzID8gMSA6IC0xKTtcbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgdHJhbnNsYXRlKGdldFBvc2l0aW9uKCkpO1xuICAgIFRyYW5zaXRpb24uY2FuY2VsKCk7XG4gIH1cblxuICBmdW5jdGlvbiB0b0luZGV4KHBvc2l0aW9uKSB7XG4gICAgdmFyIFNsaWRlcyA9IENvbXBvbmVudHMyLlNsaWRlcy5nZXQoKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBtaW5EaXN0YW5jZSA9IEluZmluaXR5O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBTbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzbGlkZUluZGV4ID0gU2xpZGVzW2ldLmluZGV4O1xuICAgICAgdmFyIGRpc3RhbmNlID0gYWJzKHRvUG9zaXRpb24oc2xpZGVJbmRleCwgdHJ1ZSkgLSBwb3NpdGlvbik7XG5cbiAgICAgIGlmIChkaXN0YW5jZSA8PSBtaW5EaXN0YW5jZSkge1xuICAgICAgICBtaW5EaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICBpbmRleCA9IHNsaWRlSW5kZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiB0b1Bvc2l0aW9uKGluZGV4LCB0cmltbWluZykge1xuICAgIHZhciBwb3NpdGlvbiA9IG9yaWVudCh0b3RhbFNpemUoaW5kZXggLSAxKSAtIG9mZnNldChpbmRleCkpO1xuICAgIHJldHVybiB0cmltbWluZyA/IHRyaW0ocG9zaXRpb24pIDogcG9zaXRpb247XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQb3NpdGlvbigpIHtcbiAgICB2YXIgbGVmdCA9IHJlc29sdmUoXCJsZWZ0XCIpO1xuICAgIHJldHVybiByZWN0KGxpc3QpW2xlZnRdIC0gcmVjdCh0cmFjaylbbGVmdF0gKyBvcmllbnQoZ2V0UGFkZGluZyhmYWxzZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJpbShwb3NpdGlvbikge1xuICAgIGlmIChvcHRpb25zLnRyaW1TcGFjZSAmJiBTcGxpZGUyLmlzKFNMSURFKSkge1xuICAgICAgcG9zaXRpb24gPSBjbGFtcChwb3NpdGlvbiwgMCwgb3JpZW50KHNsaWRlclNpemUoKSAtIGxpc3RTaXplKCkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBmdW5jdGlvbiBvZmZzZXQoaW5kZXgpIHtcbiAgICB2YXIgZm9jdXMgPSBvcHRpb25zLmZvY3VzO1xuICAgIHJldHVybiBmb2N1cyA9PT0gXCJjZW50ZXJcIiA/IChsaXN0U2l6ZSgpIC0gc2xpZGVTaXplKGluZGV4LCB0cnVlKSkgLyAyIDogK2ZvY3VzICogc2xpZGVTaXplKGluZGV4KSB8fCAwO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGltaXQobWF4KSB7XG4gICAgcmV0dXJuIHRvUG9zaXRpb24obWF4ID8gQ29tcG9uZW50czIuQ29udHJvbGxlci5nZXRFbmQoKSA6IDAsICEhb3B0aW9ucy50cmltU3BhY2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuU2hpZnQoYmFja3dhcmRzKSB7XG4gICAgdmFyIHNoaWZ0ZWQgPSBvcmllbnQoc2hpZnQoZ2V0UG9zaXRpb24oKSwgYmFja3dhcmRzKSk7XG4gICAgcmV0dXJuIGJhY2t3YXJkcyA/IHNoaWZ0ZWQgPj0gMCA6IHNoaWZ0ZWQgPD0gbGlzdFtyZXNvbHZlKFwic2Nyb2xsV2lkdGhcIildIC0gcmVjdCh0cmFjaylbcmVzb2x2ZShcIndpZHRoXCIpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4Y2VlZGVkTGltaXQobWF4LCBwb3NpdGlvbikge1xuICAgIHBvc2l0aW9uID0gaXNVbmRlZmluZWQocG9zaXRpb24pID8gZ2V0UG9zaXRpb24oKSA6IHBvc2l0aW9uO1xuICAgIHZhciBleGNlZWRlZE1pbiA9IG1heCAhPT0gdHJ1ZSAmJiBvcmllbnQocG9zaXRpb24pIDwgb3JpZW50KGdldExpbWl0KGZhbHNlKSk7XG4gICAgdmFyIGV4Y2VlZGVkTWF4ID0gbWF4ICE9PSBmYWxzZSAmJiBvcmllbnQocG9zaXRpb24pID4gb3JpZW50KGdldExpbWl0KHRydWUpKTtcbiAgICByZXR1cm4gZXhjZWVkZWRNaW4gfHwgZXhjZWVkZWRNYXg7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBtb3ZlOiBtb3ZlLFxuICAgIGp1bXA6IGp1bXAsXG4gICAgdHJhbnNsYXRlOiB0cmFuc2xhdGUsXG4gICAgc2hpZnQ6IHNoaWZ0LFxuICAgIGNhbmNlbDogY2FuY2VsLFxuICAgIHRvSW5kZXg6IHRvSW5kZXgsXG4gICAgdG9Qb3NpdGlvbjogdG9Qb3NpdGlvbixcbiAgICBnZXRQb3NpdGlvbjogZ2V0UG9zaXRpb24sXG4gICAgZ2V0TGltaXQ6IGdldExpbWl0LFxuICAgIGV4Y2VlZGVkTGltaXQ6IGV4Y2VlZGVkTGltaXQsXG4gICAgcmVwb3NpdGlvbjogcmVwb3NpdGlvblxuICB9O1xufVxuXG5mdW5jdGlvbiBDb250cm9sbGVyKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2U2ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTYub247XG5cbiAgdmFyIE1vdmUgPSBDb21wb25lbnRzMi5Nb3ZlO1xuICB2YXIgZ2V0UG9zaXRpb24gPSBNb3ZlLmdldFBvc2l0aW9uLFxuICAgICAgZ2V0TGltaXQgPSBNb3ZlLmdldExpbWl0LFxuICAgICAgdG9Qb3NpdGlvbiA9IE1vdmUudG9Qb3NpdGlvbjtcbiAgdmFyIF9Db21wb25lbnRzMiRTbGlkZXMgPSBDb21wb25lbnRzMi5TbGlkZXMsXG4gICAgICBpc0Vub3VnaCA9IF9Db21wb25lbnRzMiRTbGlkZXMuaXNFbm91Z2gsXG4gICAgICBnZXRMZW5ndGggPSBfQ29tcG9uZW50czIkU2xpZGVzLmdldExlbmd0aDtcbiAgdmFyIGlzTG9vcCA9IFNwbGlkZTIuaXMoTE9PUCk7XG4gIHZhciBpc1NsaWRlID0gU3BsaWRlMi5pcyhTTElERSk7XG4gIHZhciBnZXROZXh0ID0gYXBwbHkoZ2V0QWRqYWNlbnQsIGZhbHNlKTtcbiAgdmFyIGdldFByZXYgPSBhcHBseShnZXRBZGphY2VudCwgdHJ1ZSk7XG4gIHZhciBjdXJySW5kZXggPSBvcHRpb25zLnN0YXJ0IHx8IDA7XG4gIHZhciBwcmV2SW5kZXggPSBjdXJySW5kZXg7XG4gIHZhciBzbGlkZUNvdW50O1xuICB2YXIgcGVyTW92ZTtcbiAgdmFyIHBlclBhZ2U7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaW5pdCgpO1xuICAgIG9uKFtFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNIXSwgaW5pdCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHNsaWRlQ291bnQgPSBnZXRMZW5ndGgodHJ1ZSk7XG4gICAgcGVyTW92ZSA9IG9wdGlvbnMucGVyTW92ZTtcbiAgICBwZXJQYWdlID0gb3B0aW9ucy5wZXJQYWdlO1xuICAgIHZhciBpbmRleCA9IGNsYW1wKGN1cnJJbmRleCwgMCwgc2xpZGVDb3VudCAtIDEpO1xuXG4gICAgaWYgKGluZGV4ICE9PSBjdXJySW5kZXgpIHtcbiAgICAgIGN1cnJJbmRleCA9IGluZGV4O1xuICAgICAgTW92ZS5yZXBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ28oY29udHJvbCwgYWxsb3dTYW1lSW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFpc0J1c3koKSkge1xuICAgICAgdmFyIGRlc3QgPSBwYXJzZShjb250cm9sKTtcbiAgICAgIHZhciBpbmRleCA9IGxvb3AoZGVzdCk7XG5cbiAgICAgIGlmIChpbmRleCA+IC0xICYmIChhbGxvd1NhbWVJbmRleCB8fCBpbmRleCAhPT0gY3VyckluZGV4KSkge1xuICAgICAgICBzZXRJbmRleChpbmRleCk7XG4gICAgICAgIE1vdmUubW92ZShkZXN0LCBpbmRleCwgcHJldkluZGV4LCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsKGRlc3RpbmF0aW9uLCBkdXJhdGlvbiwgc25hcCwgY2FsbGJhY2spIHtcbiAgICBDb21wb25lbnRzMi5TY3JvbGwuc2Nyb2xsKGRlc3RpbmF0aW9uLCBkdXJhdGlvbiwgc25hcCwgZnVuY3Rpb24gKCkge1xuICAgICAgc2V0SW5kZXgobG9vcChNb3ZlLnRvSW5kZXgoZ2V0UG9zaXRpb24oKSkpKTtcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZShjb250cm9sKSB7XG4gICAgdmFyIGluZGV4ID0gY3VyckluZGV4O1xuXG4gICAgaWYgKGlzU3RyaW5nKGNvbnRyb2wpKSB7XG4gICAgICB2YXIgX3JlZiA9IGNvbnRyb2wubWF0Y2goLyhbK1xcLTw+XSkoXFxkKyk/LykgfHwgW10sXG4gICAgICAgICAgaW5kaWNhdG9yID0gX3JlZlsxXSxcbiAgICAgICAgICBudW1iZXIgPSBfcmVmWzJdO1xuXG4gICAgICBpZiAoaW5kaWNhdG9yID09PSBcIitcIiB8fCBpbmRpY2F0b3IgPT09IFwiLVwiKSB7XG4gICAgICAgIGluZGV4ID0gY29tcHV0ZURlc3RJbmRleChjdXJySW5kZXggKyArKFwiXCIgKyBpbmRpY2F0b3IgKyAoK251bWJlciB8fCAxKSksIGN1cnJJbmRleCk7XG4gICAgICB9IGVsc2UgaWYgKGluZGljYXRvciA9PT0gXCI+XCIpIHtcbiAgICAgICAgaW5kZXggPSBudW1iZXIgPyB0b0luZGV4KCtudW1iZXIpIDogZ2V0TmV4dCh0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kaWNhdG9yID09PSBcIjxcIikge1xuICAgICAgICBpbmRleCA9IGdldFByZXYodHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ID0gaXNMb29wID8gY29udHJvbCA6IGNsYW1wKGNvbnRyb2wsIDAsIGdldEVuZCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBZGphY2VudChwcmV2LCBkZXN0aW5hdGlvbikge1xuICAgIHZhciBudW1iZXIgPSBwZXJNb3ZlIHx8IChoYXNGb2N1cygpID8gMSA6IHBlclBhZ2UpO1xuICAgIHZhciBkZXN0ID0gY29tcHV0ZURlc3RJbmRleChjdXJySW5kZXggKyBudW1iZXIgKiAocHJldiA/IC0xIDogMSksIGN1cnJJbmRleCwgIShwZXJNb3ZlIHx8IGhhc0ZvY3VzKCkpKTtcblxuICAgIGlmIChkZXN0ID09PSAtMSAmJiBpc1NsaWRlKSB7XG4gICAgICBpZiAoIWFwcHJveGltYXRlbHlFcXVhbChnZXRQb3NpdGlvbigpLCBnZXRMaW1pdCghcHJldiksIDEpKSB7XG4gICAgICAgIHJldHVybiBwcmV2ID8gMCA6IGdldEVuZCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZXN0aW5hdGlvbiA/IGRlc3QgOiBsb29wKGRlc3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZURlc3RJbmRleChkZXN0LCBmcm9tLCBzbmFwUGFnZSkge1xuICAgIGlmIChpc0Vub3VnaCgpIHx8IGhhc0ZvY3VzKCkpIHtcbiAgICAgIHZhciBlbmQgPSBnZXRFbmQoKTtcbiAgICAgIHZhciBpbmRleCA9IGNvbXB1dGVNb3ZhYmxlRGVzdEluZGV4KGRlc3QpO1xuXG4gICAgICBpZiAoaW5kZXggIT09IGRlc3QpIHtcbiAgICAgICAgZnJvbSA9IGRlc3Q7XG4gICAgICAgIGRlc3QgPSBpbmRleDtcbiAgICAgICAgc25hcFBhZ2UgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRlc3QgPCAwIHx8IGRlc3QgPiBlbmQpIHtcbiAgICAgICAgaWYgKCFwZXJNb3ZlICYmIChiZXR3ZWVuKDAsIGRlc3QsIGZyb20sIHRydWUpIHx8IGJldHdlZW4oZW5kLCBmcm9tLCBkZXN0LCB0cnVlKSkpIHtcbiAgICAgICAgICBkZXN0ID0gdG9JbmRleCh0b1BhZ2UoZGVzdCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc0xvb3ApIHtcbiAgICAgICAgICAgIGRlc3QgPSBzbmFwUGFnZSA/IGRlc3QgPCAwID8gLShzbGlkZUNvdW50ICUgcGVyUGFnZSB8fCBwZXJQYWdlKSA6IHNsaWRlQ291bnQgOiBkZXN0O1xuICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5yZXdpbmQpIHtcbiAgICAgICAgICAgIGRlc3QgPSBkZXN0IDwgMCA/IGVuZCA6IDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlc3QgPSAtMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzbmFwUGFnZSAmJiBkZXN0ICE9PSBmcm9tKSB7XG4gICAgICAgICAgZGVzdCA9IHRvSW5kZXgodG9QYWdlKGZyb20pICsgKGRlc3QgPCBmcm9tID8gLTEgOiAxKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdCA9IC0xO1xuICAgIH1cblxuICAgIHJldHVybiBkZXN0O1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZU1vdmFibGVEZXN0SW5kZXgoZGVzdCkge1xuICAgIGlmIChpc1NsaWRlICYmIG9wdGlvbnMudHJpbVNwYWNlID09PSBcIm1vdmVcIiAmJiBkZXN0ICE9PSBjdXJySW5kZXgpIHtcbiAgICAgIHZhciBwb3NpdGlvbiA9IGdldFBvc2l0aW9uKCk7XG5cbiAgICAgIHdoaWxlIChwb3NpdGlvbiA9PT0gdG9Qb3NpdGlvbihkZXN0LCB0cnVlKSAmJiBiZXR3ZWVuKGRlc3QsIDAsIFNwbGlkZTIubGVuZ3RoIC0gMSwgIW9wdGlvbnMucmV3aW5kKSkge1xuICAgICAgICBkZXN0IDwgY3VyckluZGV4ID8gLS1kZXN0IDogKytkZXN0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZXN0O1xuICB9XG5cbiAgZnVuY3Rpb24gbG9vcChpbmRleCkge1xuICAgIHJldHVybiBpc0xvb3AgPyAoaW5kZXggKyBzbGlkZUNvdW50KSAlIHNsaWRlQ291bnQgfHwgMCA6IGluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RW5kKCkge1xuICAgIHJldHVybiBtYXgoc2xpZGVDb3VudCAtIChoYXNGb2N1cygpIHx8IGlzTG9vcCAmJiBwZXJNb3ZlID8gMSA6IHBlclBhZ2UpLCAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvSW5kZXgocGFnZSkge1xuICAgIHJldHVybiBjbGFtcChoYXNGb2N1cygpID8gcGFnZSA6IHBlclBhZ2UgKiBwYWdlLCAwLCBnZXRFbmQoKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0b1BhZ2UoaW5kZXgpIHtcbiAgICByZXR1cm4gaGFzRm9jdXMoKSA/IGluZGV4IDogZmxvb3IoKGluZGV4ID49IGdldEVuZCgpID8gc2xpZGVDb3VudCAtIDEgOiBpbmRleCkgLyBwZXJQYWdlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvRGVzdChkZXN0aW5hdGlvbikge1xuICAgIHZhciBjbG9zZXN0ID0gTW92ZS50b0luZGV4KGRlc3RpbmF0aW9uKTtcbiAgICByZXR1cm4gaXNTbGlkZSA/IGNsYW1wKGNsb3Nlc3QsIDAsIGdldEVuZCgpKSA6IGNsb3Nlc3Q7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRJbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCAhPT0gY3VyckluZGV4KSB7XG4gICAgICBwcmV2SW5kZXggPSBjdXJySW5kZXg7XG4gICAgICBjdXJySW5kZXggPSBpbmRleDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbmRleChwcmV2KSB7XG4gICAgcmV0dXJuIHByZXYgPyBwcmV2SW5kZXggOiBjdXJySW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiBoYXNGb2N1cygpIHtcbiAgICByZXR1cm4gIWlzVW5kZWZpbmVkKG9wdGlvbnMuZm9jdXMpIHx8IG9wdGlvbnMuaXNOYXZpZ2F0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNCdXN5KCkge1xuICAgIHJldHVybiBTcGxpZGUyLnN0YXRlLmlzKFtNT1ZJTkcsIFNDUk9MTElOR10pICYmICEhb3B0aW9ucy53YWl0Rm9yVHJhbnNpdGlvbjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGdvOiBnbyxcbiAgICBzY3JvbGw6IHNjcm9sbCxcbiAgICBnZXROZXh0OiBnZXROZXh0LFxuICAgIGdldFByZXY6IGdldFByZXYsXG4gICAgZ2V0QWRqYWNlbnQ6IGdldEFkamFjZW50LFxuICAgIGdldEVuZDogZ2V0RW5kLFxuICAgIHNldEluZGV4OiBzZXRJbmRleCxcbiAgICBnZXRJbmRleDogZ2V0SW5kZXgsXG4gICAgdG9JbmRleDogdG9JbmRleCxcbiAgICB0b1BhZ2U6IHRvUGFnZSxcbiAgICB0b0Rlc3Q6IHRvRGVzdCxcbiAgICBoYXNGb2N1czogaGFzRm9jdXMsXG4gICAgaXNCdXN5OiBpc0J1c3lcbiAgfTtcbn1cblxudmFyIFhNTF9OQU1FX1NQQUNFID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xudmFyIFBBVEggPSBcIm0xNS41IDAuOTMyLTQuMyA0LjM4IDE0LjUgMTQuNi0xNC41IDE0LjUgNC4zIDQuNCAxNC42LTE0LjYgNC40LTQuMy00LjQtNC40LTE0LjYtMTQuNnpcIjtcbnZhciBTSVpFID0gNDA7XG5cbmZ1bmN0aW9uIEFycm93cyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgdmFyIG9uID0gZXZlbnQub24sXG4gICAgICBiaW5kID0gZXZlbnQuYmluZCxcbiAgICAgIGVtaXQgPSBldmVudC5lbWl0O1xuICB2YXIgY2xhc3NlcyA9IG9wdGlvbnMuY2xhc3NlcyxcbiAgICAgIGkxOG4gPSBvcHRpb25zLmkxOG47XG4gIHZhciBFbGVtZW50cyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgQ29udHJvbGxlciA9IENvbXBvbmVudHMyLkNvbnRyb2xsZXI7XG4gIHZhciBwbGFjZWhvbGRlciA9IEVsZW1lbnRzLmFycm93cyxcbiAgICAgIHRyYWNrID0gRWxlbWVudHMudHJhY2s7XG4gIHZhciB3cmFwcGVyID0gcGxhY2Vob2xkZXI7XG4gIHZhciBwcmV2ID0gRWxlbWVudHMucHJldjtcbiAgdmFyIG5leHQgPSBFbGVtZW50cy5uZXh0O1xuICB2YXIgY3JlYXRlZDtcbiAgdmFyIHdyYXBwZXJDbGFzc2VzO1xuICB2YXIgYXJyb3dzID0ge307XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaW5pdCgpO1xuICAgIG9uKEVWRU5UX1VQREFURUQsIHJlbW91bnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3VudCgpIHtcbiAgICBkZXN0cm95KCk7XG4gICAgbW91bnQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIGVuYWJsZWQgPSBvcHRpb25zLmFycm93cztcblxuICAgIGlmIChlbmFibGVkICYmICEocHJldiAmJiBuZXh0KSkge1xuICAgICAgY3JlYXRlQXJyb3dzKCk7XG4gICAgfVxuXG4gICAgaWYgKHByZXYgJiYgbmV4dCkge1xuICAgICAgYXNzaWduKGFycm93cywge1xuICAgICAgICBwcmV2OiBwcmV2LFxuICAgICAgICBuZXh0OiBuZXh0XG4gICAgICB9KTtcbiAgICAgIGRpc3BsYXkod3JhcHBlciwgZW5hYmxlZCA/IFwiXCIgOiBcIm5vbmVcIik7XG4gICAgICBhZGRDbGFzcyh3cmFwcGVyLCB3cmFwcGVyQ2xhc3NlcyA9IENMQVNTX0FSUk9XUyArIFwiLS1cIiArIG9wdGlvbnMuZGlyZWN0aW9uKTtcblxuICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgbGlzdGVuKCk7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICBzZXRBdHRyaWJ1dGUoW3ByZXYsIG5leHRdLCBBUklBX0NPTlRST0xTLCB0cmFjay5pZCk7XG4gICAgICAgIGVtaXQoRVZFTlRfQVJST1dTX01PVU5URUQsIHByZXYsIG5leHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgZXZlbnQuZGVzdHJveSgpO1xuICAgIHJlbW92ZUNsYXNzKHdyYXBwZXIsIHdyYXBwZXJDbGFzc2VzKTtcblxuICAgIGlmIChjcmVhdGVkKSB7XG4gICAgICByZW1vdmUocGxhY2Vob2xkZXIgPyBbcHJldiwgbmV4dF0gOiB3cmFwcGVyKTtcbiAgICAgIHByZXYgPSBuZXh0ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlQXR0cmlidXRlKFtwcmV2LCBuZXh0XSwgQUxMX0FUVFJJQlVURVMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbigpIHtcbiAgICBvbihbRVZFTlRfTU9WRUQsIEVWRU5UX1JFRlJFU0gsIEVWRU5UX1NDUk9MTEVEXSwgdXBkYXRlKTtcbiAgICBiaW5kKG5leHQsIFwiY2xpY2tcIiwgYXBwbHkoZ28sIFwiPlwiKSk7XG4gICAgYmluZChwcmV2LCBcImNsaWNrXCIsIGFwcGx5KGdvLCBcIjxcIikpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28oY29udHJvbCkge1xuICAgIENvbnRyb2xsZXIuZ28oY29udHJvbCwgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJvd3MoKSB7XG4gICAgd3JhcHBlciA9IHBsYWNlaG9sZGVyIHx8IGNyZWF0ZShcImRpdlwiLCBjbGFzc2VzLmFycm93cyk7XG4gICAgcHJldiA9IGNyZWF0ZUFycm93KHRydWUpO1xuICAgIG5leHQgPSBjcmVhdGVBcnJvdyhmYWxzZSk7XG4gICAgY3JlYXRlZCA9IHRydWU7XG4gICAgYXBwZW5kKHdyYXBwZXIsIFtwcmV2LCBuZXh0XSk7XG4gICAgIXBsYWNlaG9sZGVyICYmIGJlZm9yZSh3cmFwcGVyLCB0cmFjayk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJvdyhwcmV2Mikge1xuICAgIHZhciBhcnJvdyA9IFwiPGJ1dHRvbiBjbGFzcz1cXFwiXCIgKyBjbGFzc2VzLmFycm93ICsgXCIgXCIgKyAocHJldjIgPyBjbGFzc2VzLnByZXYgOiBjbGFzc2VzLm5leHQpICsgXCJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+PHN2ZyB4bWxucz1cXFwiXCIgKyBYTUxfTkFNRV9TUEFDRSArIFwiXFxcIiB2aWV3Qm94PVxcXCIwIDAgXCIgKyBTSVpFICsgXCIgXCIgKyBTSVpFICsgXCJcXFwiIHdpZHRoPVxcXCJcIiArIFNJWkUgKyBcIlxcXCIgaGVpZ2h0PVxcXCJcIiArIFNJWkUgKyBcIlxcXCIgZm9jdXNhYmxlPVxcXCJmYWxzZVxcXCI+PHBhdGggZD1cXFwiXCIgKyAob3B0aW9ucy5hcnJvd1BhdGggfHwgUEFUSCkgKyBcIlxcXCIgLz5cIjtcbiAgICByZXR1cm4gcGFyc2VIdG1sKGFycm93KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgaW5kZXggPSBTcGxpZGUyLmluZGV4O1xuICAgIHZhciBwcmV2SW5kZXggPSBDb250cm9sbGVyLmdldFByZXYoKTtcbiAgICB2YXIgbmV4dEluZGV4ID0gQ29udHJvbGxlci5nZXROZXh0KCk7XG4gICAgdmFyIHByZXZMYWJlbCA9IHByZXZJbmRleCA+IC0xICYmIGluZGV4IDwgcHJldkluZGV4ID8gaTE4bi5sYXN0IDogaTE4bi5wcmV2O1xuICAgIHZhciBuZXh0TGFiZWwgPSBuZXh0SW5kZXggPiAtMSAmJiBpbmRleCA+IG5leHRJbmRleCA/IGkxOG4uZmlyc3QgOiBpMThuLm5leHQ7XG4gICAgcHJldi5kaXNhYmxlZCA9IHByZXZJbmRleCA8IDA7XG4gICAgbmV4dC5kaXNhYmxlZCA9IG5leHRJbmRleCA8IDA7XG4gICAgc2V0QXR0cmlidXRlKHByZXYsIEFSSUFfTEFCRUwsIHByZXZMYWJlbCk7XG4gICAgc2V0QXR0cmlidXRlKG5leHQsIEFSSUFfTEFCRUwsIG5leHRMYWJlbCk7XG4gICAgZW1pdChFVkVOVF9BUlJPV1NfVVBEQVRFRCwgcHJldiwgbmV4dCwgcHJldkluZGV4LCBuZXh0SW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhcnJvd3M6IGFycm93cyxcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICB1cGRhdGU6IHVwZGF0ZVxuICB9O1xufVxuXG52YXIgSU5URVJWQUxfREFUQV9BVFRSSUJVVEUgPSBEQVRBX0FUVFJJQlVURSArIFwiLWludGVydmFsXCI7XG5cbmZ1bmN0aW9uIEF1dG9wbGF5KFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2U3ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTcub24sXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlNy5iaW5kLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTcuZW1pdDtcblxuICB2YXIgaW50ZXJ2YWwgPSBSZXF1ZXN0SW50ZXJ2YWwob3B0aW9ucy5pbnRlcnZhbCwgU3BsaWRlMi5nby5iaW5kKFNwbGlkZTIsIFwiPlwiKSwgb25BbmltYXRpb25GcmFtZSk7XG4gIHZhciBpc1BhdXNlZCA9IGludGVydmFsLmlzUGF1c2VkO1xuICB2YXIgRWxlbWVudHMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIF9Db21wb25lbnRzMiRFbGVtZW50czQgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIHJvb3QgPSBfQ29tcG9uZW50czIkRWxlbWVudHM0LnJvb3QsXG4gICAgICB0b2dnbGUgPSBfQ29tcG9uZW50czIkRWxlbWVudHM0LnRvZ2dsZTtcbiAgdmFyIGF1dG9wbGF5ID0gb3B0aW9ucy5hdXRvcGxheTtcbiAgdmFyIGhvdmVyZWQ7XG4gIHZhciBmb2N1c2VkO1xuICB2YXIgc3RvcHBlZCA9IGF1dG9wbGF5ID09PSBcInBhdXNlXCI7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICBsaXN0ZW4oKTtcbiAgICAgIHRvZ2dsZSAmJiBzZXRBdHRyaWJ1dGUodG9nZ2xlLCBBUklBX0NPTlRST0xTLCBFbGVtZW50cy50cmFjay5pZCk7XG4gICAgICBzdG9wcGVkIHx8IHBsYXkoKTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbigpIHtcbiAgICBpZiAob3B0aW9ucy5wYXVzZU9uSG92ZXIpIHtcbiAgICAgIGJpbmQocm9vdCwgXCJtb3VzZWVudGVyIG1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaG92ZXJlZCA9IGUudHlwZSA9PT0gXCJtb3VzZWVudGVyXCI7XG4gICAgICAgIGF1dG9Ub2dnbGUoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBhdXNlT25Gb2N1cykge1xuICAgICAgYmluZChyb290LCBcImZvY3VzaW4gZm9jdXNvdXRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZm9jdXNlZCA9IGUudHlwZSA9PT0gXCJmb2N1c2luXCI7XG4gICAgICAgIGF1dG9Ub2dnbGUoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgIGJpbmQodG9nZ2xlLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RvcHBlZCA/IHBsYXkoKSA6IHBhdXNlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgb24oW0VWRU5UX01PVkUsIEVWRU5UX1NDUk9MTCwgRVZFTlRfUkVGUkVTSF0sIGludGVydmFsLnJld2luZCk7XG4gICAgb24oRVZFTlRfTU9WRSwgb25Nb3ZlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgaWYgKGlzUGF1c2VkKCkgJiYgQ29tcG9uZW50czIuU2xpZGVzLmlzRW5vdWdoKCkpIHtcbiAgICAgIGludGVydmFsLnN0YXJ0KCFvcHRpb25zLnJlc2V0UHJvZ3Jlc3MpO1xuICAgICAgZm9jdXNlZCA9IGhvdmVyZWQgPSBzdG9wcGVkID0gZmFsc2U7XG4gICAgICB1cGRhdGUoKTtcbiAgICAgIGVtaXQoRVZFTlRfQVVUT1BMQVlfUExBWSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGF1c2Uoc3RvcCkge1xuICAgIGlmIChzdG9wID09PSB2b2lkIDApIHtcbiAgICAgIHN0b3AgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0b3BwZWQgPSAhIXN0b3A7XG4gICAgdXBkYXRlKCk7XG5cbiAgICBpZiAoIWlzUGF1c2VkKCkpIHtcbiAgICAgIGludGVydmFsLnBhdXNlKCk7XG4gICAgICBlbWl0KEVWRU5UX0FVVE9QTEFZX1BBVVNFKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhdXRvVG9nZ2xlKCkge1xuICAgIGlmICghc3RvcHBlZCkge1xuICAgICAgaG92ZXJlZCB8fCBmb2N1c2VkID8gcGF1c2UoZmFsc2UpIDogcGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAodG9nZ2xlKSB7XG4gICAgICB0b2dnbGVDbGFzcyh0b2dnbGUsIENMQVNTX0FDVElWRSwgIXN0b3BwZWQpO1xuICAgICAgc2V0QXR0cmlidXRlKHRvZ2dsZSwgQVJJQV9MQUJFTCwgb3B0aW9ucy5pMThuW3N0b3BwZWQgPyBcInBsYXlcIiA6IFwicGF1c2VcIl0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQW5pbWF0aW9uRnJhbWUocmF0ZSkge1xuICAgIHZhciBiYXIgPSBFbGVtZW50cy5iYXI7XG4gICAgYmFyICYmIHN0eWxlKGJhciwgXCJ3aWR0aFwiLCByYXRlICogMTAwICsgXCIlXCIpO1xuICAgIGVtaXQoRVZFTlRfQVVUT1BMQVlfUExBWUlORywgcmF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBvbk1vdmUoaW5kZXgpIHtcbiAgICB2YXIgU2xpZGUgPSBDb21wb25lbnRzMi5TbGlkZXMuZ2V0QXQoaW5kZXgpO1xuICAgIGludGVydmFsLnNldChTbGlkZSAmJiArZ2V0QXR0cmlidXRlKFNsaWRlLnNsaWRlLCBJTlRFUlZBTF9EQVRBX0FUVFJJQlVURSkgfHwgb3B0aW9ucy5pbnRlcnZhbCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBpbnRlcnZhbC5jYW5jZWwsXG4gICAgcGxheTogcGxheSxcbiAgICBwYXVzZTogcGF1c2UsXG4gICAgaXNQYXVzZWQ6IGlzUGF1c2VkXG4gIH07XG59XG5cbmZ1bmN0aW9uIENvdmVyKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2U4ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTgub247XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKG9wdGlvbnMuY292ZXIpIHtcbiAgICAgIG9uKEVWRU5UX0xBWllMT0FEX0xPQURFRCwgYXBwbHkodG9nZ2xlLCB0cnVlKSk7XG4gICAgICBvbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfVVBEQVRFRCwgRVZFTlRfUkVGUkVTSF0sIGFwcGx5KGNvdmVyLCB0cnVlKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY292ZXIoY292ZXIyKSB7XG4gICAgQ29tcG9uZW50czIuU2xpZGVzLmZvckVhY2goZnVuY3Rpb24gKFNsaWRlKSB7XG4gICAgICB2YXIgaW1nID0gY2hpbGQoU2xpZGUuY29udGFpbmVyIHx8IFNsaWRlLnNsaWRlLCBcImltZ1wiKTtcblxuICAgICAgaWYgKGltZyAmJiBpbWcuc3JjKSB7XG4gICAgICAgIHRvZ2dsZShjb3ZlcjIsIGltZywgU2xpZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlKGNvdmVyMiwgaW1nLCBTbGlkZSkge1xuICAgIFNsaWRlLnN0eWxlKFwiYmFja2dyb3VuZFwiLCBjb3ZlcjIgPyBcImNlbnRlci9jb3ZlciBuby1yZXBlYXQgdXJsKFxcXCJcIiArIGltZy5zcmMgKyBcIlxcXCIpXCIgOiBcIlwiLCB0cnVlKTtcbiAgICBkaXNwbGF5KGltZywgY292ZXIyID8gXCJub25lXCIgOiBcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGFwcGx5KGNvdmVyLCBmYWxzZSlcbiAgfTtcbn1cblxudmFyIEJPVU5DRV9ESUZGX1RIUkVTSE9MRCA9IDEwO1xudmFyIEJPVU5DRV9EVVJBVElPTiA9IDYwMDtcbnZhciBGUklDVElPTl9GQUNUT1IgPSAwLjY7XG52YXIgQkFTRV9WRUxPQ0lUWSA9IDEuNTtcbnZhciBNSU5fRFVSQVRJT04gPSA4MDA7XG5cbmZ1bmN0aW9uIFNjcm9sbChTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlOSA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U5Lm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTkuZW1pdDtcblxuICB2YXIgc2V0ID0gU3BsaWRlMi5zdGF0ZS5zZXQ7XG4gIHZhciBNb3ZlID0gQ29tcG9uZW50czIuTW92ZTtcbiAgdmFyIGdldFBvc2l0aW9uID0gTW92ZS5nZXRQb3NpdGlvbixcbiAgICAgIGdldExpbWl0ID0gTW92ZS5nZXRMaW1pdCxcbiAgICAgIGV4Y2VlZGVkTGltaXQgPSBNb3ZlLmV4Y2VlZGVkTGltaXQsXG4gICAgICB0cmFuc2xhdGUgPSBNb3ZlLnRyYW5zbGF0ZTtcbiAgdmFyIGlzU2xpZGUgPSBTcGxpZGUyLmlzKFNMSURFKTtcbiAgdmFyIGludGVydmFsO1xuICB2YXIgY2FsbGJhY2s7XG4gIHZhciBmcmljdGlvbiA9IDE7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgb24oRVZFTlRfTU9WRSwgY2xlYXIpO1xuICAgIG9uKFtFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNIXSwgY2FuY2VsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbChkZXN0aW5hdGlvbiwgZHVyYXRpb24sIHNuYXAsIG9uU2Nyb2xsZWQsIG5vQ29uc3RyYWluKSB7XG4gICAgdmFyIGZyb20gPSBnZXRQb3NpdGlvbigpO1xuICAgIGNsZWFyKCk7XG5cbiAgICBpZiAoc25hcCAmJiAoIWlzU2xpZGUgfHwgIWV4Y2VlZGVkTGltaXQoKSkpIHtcbiAgICAgIHZhciBzaXplID0gQ29tcG9uZW50czIuTGF5b3V0LnNsaWRlclNpemUoKTtcbiAgICAgIHZhciBvZmZzZXQgPSBzaWduKGRlc3RpbmF0aW9uKSAqIHNpemUgKiBmbG9vcihhYnMoZGVzdGluYXRpb24pIC8gc2l6ZSkgfHwgMDtcbiAgICAgIGRlc3RpbmF0aW9uID0gTW92ZS50b1Bvc2l0aW9uKENvbXBvbmVudHMyLkNvbnRyb2xsZXIudG9EZXN0KGRlc3RpbmF0aW9uICUgc2l6ZSkpICsgb2Zmc2V0O1xuICAgIH1cblxuICAgIHZhciBub0Rpc3RhbmNlID0gYXBwcm94aW1hdGVseUVxdWFsKGZyb20sIGRlc3RpbmF0aW9uLCAxKTtcbiAgICBmcmljdGlvbiA9IDE7XG4gICAgZHVyYXRpb24gPSBub0Rpc3RhbmNlID8gMCA6IGR1cmF0aW9uIHx8IG1heChhYnMoZGVzdGluYXRpb24gLSBmcm9tKSAvIEJBU0VfVkVMT0NJVFksIE1JTl9EVVJBVElPTik7XG4gICAgY2FsbGJhY2sgPSBvblNjcm9sbGVkO1xuICAgIGludGVydmFsID0gUmVxdWVzdEludGVydmFsKGR1cmF0aW9uLCBvbkVuZCwgYXBwbHkodXBkYXRlLCBmcm9tLCBkZXN0aW5hdGlvbiwgbm9Db25zdHJhaW4pLCAxKTtcbiAgICBzZXQoU0NST0xMSU5HKTtcbiAgICBlbWl0KEVWRU5UX1NDUk9MTCk7XG4gICAgaW50ZXJ2YWwuc3RhcnQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRW5kKCkge1xuICAgIHNldChJRExFKTtcbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIGVtaXQoRVZFTlRfU0NST0xMRUQpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKGZyb20sIHRvLCBub0NvbnN0cmFpbiwgcmF0ZSkge1xuICAgIHZhciBwb3NpdGlvbiA9IGdldFBvc2l0aW9uKCk7XG4gICAgdmFyIHRhcmdldCA9IGZyb20gKyAodG8gLSBmcm9tKSAqIGVhc2luZyhyYXRlKTtcbiAgICB2YXIgZGlmZiA9ICh0YXJnZXQgLSBwb3NpdGlvbikgKiBmcmljdGlvbjtcbiAgICB0cmFuc2xhdGUocG9zaXRpb24gKyBkaWZmKTtcblxuICAgIGlmIChpc1NsaWRlICYmICFub0NvbnN0cmFpbiAmJiBleGNlZWRlZExpbWl0KCkpIHtcbiAgICAgIGZyaWN0aW9uICo9IEZSSUNUSU9OX0ZBQ1RPUjtcblxuICAgICAgaWYgKGFicyhkaWZmKSA8IEJPVU5DRV9ESUZGX1RIUkVTSE9MRCkge1xuICAgICAgICBzY3JvbGwoZ2V0TGltaXQoZXhjZWVkZWRMaW1pdCh0cnVlKSksIEJPVU5DRV9EVVJBVElPTiwgZmFsc2UsIGNhbGxiYWNrLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICBpZiAoaW50ZXJ2YWwpIHtcbiAgICAgIGludGVydmFsLmNhbmNlbCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAoaW50ZXJ2YWwgJiYgIWludGVydmFsLmlzUGF1c2VkKCkpIHtcbiAgICAgIGNsZWFyKCk7XG4gICAgICBvbkVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVhc2luZyh0KSB7XG4gICAgdmFyIGVhc2luZ0Z1bmMgPSBvcHRpb25zLmVhc2luZ0Z1bmM7XG4gICAgcmV0dXJuIGVhc2luZ0Z1bmMgPyBlYXNpbmdGdW5jKHQpIDogMSAtIE1hdGgucG93KDEgLSB0LCA0KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGNsZWFyLFxuICAgIHNjcm9sbDogc2Nyb2xsLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59XG5cbnZhciBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyA9IHtcbiAgcGFzc2l2ZTogZmFsc2UsXG4gIGNhcHR1cmU6IHRydWVcbn07XG5cbmZ1bmN0aW9uIERyYWcoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTEwID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTEwLm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTEwLmVtaXQsXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlMTAuYmluZCxcbiAgICAgIHVuYmluZCA9IF9FdmVudEludGVyZmFjZTEwLnVuYmluZDtcblxuICB2YXIgc3RhdGUgPSBTcGxpZGUyLnN0YXRlO1xuICB2YXIgTW92ZSA9IENvbXBvbmVudHMyLk1vdmUsXG4gICAgICBTY3JvbGwgPSBDb21wb25lbnRzMi5TY3JvbGwsXG4gICAgICBDb250cm9sbGVyID0gQ29tcG9uZW50czIuQ29udHJvbGxlcixcbiAgICAgIHRyYWNrID0gQ29tcG9uZW50czIuRWxlbWVudHMudHJhY2ssXG4gICAgICByZWR1Y2UgPSBDb21wb25lbnRzMi5NZWRpYS5yZWR1Y2U7XG4gIHZhciBfQ29tcG9uZW50czIkRGlyZWN0aW8yID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLFxuICAgICAgcmVzb2x2ZSA9IF9Db21wb25lbnRzMiREaXJlY3RpbzIucmVzb2x2ZSxcbiAgICAgIG9yaWVudCA9IF9Db21wb25lbnRzMiREaXJlY3RpbzIub3JpZW50O1xuICB2YXIgZ2V0UG9zaXRpb24gPSBNb3ZlLmdldFBvc2l0aW9uLFxuICAgICAgZXhjZWVkZWRMaW1pdCA9IE1vdmUuZXhjZWVkZWRMaW1pdDtcbiAgdmFyIGJhc2VQb3NpdGlvbjtcbiAgdmFyIGJhc2VFdmVudDtcbiAgdmFyIHByZXZCYXNlRXZlbnQ7XG4gIHZhciBpc0ZyZWU7XG4gIHZhciBkcmFnZ2luZztcbiAgdmFyIGV4Y2VlZGVkID0gZmFsc2U7XG4gIHZhciBjbGlja1ByZXZlbnRlZDtcbiAgdmFyIGRpc2FibGVkO1xuICB2YXIgdGFyZ2V0O1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGJpbmQodHJhY2ssIFBPSU5URVJfTU9WRV9FVkVOVFMsIG5vb3AsIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TKTtcbiAgICBiaW5kKHRyYWNrLCBQT0lOVEVSX1VQX0VWRU5UUywgbm9vcCwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgIGJpbmQodHJhY2ssIFBPSU5URVJfRE9XTl9FVkVOVFMsIG9uUG9pbnRlckRvd24sIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TKTtcbiAgICBiaW5kKHRyYWNrLCBcImNsaWNrXCIsIG9uQ2xpY2ssIHtcbiAgICAgIGNhcHR1cmU6IHRydWVcbiAgICB9KTtcbiAgICBiaW5kKHRyYWNrLCBcImRyYWdzdGFydFwiLCBwcmV2ZW50KTtcbiAgICBvbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfVVBEQVRFRF0sIGluaXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgZHJhZyA9IG9wdGlvbnMuZHJhZztcbiAgICBkaXNhYmxlKCFkcmFnKTtcbiAgICBpc0ZyZWUgPSBkcmFnID09PSBcImZyZWVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUG9pbnRlckRvd24oZSkge1xuICAgIGNsaWNrUHJldmVudGVkID0gZmFsc2U7XG5cbiAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICB2YXIgaXNUb3VjaCA9IGlzVG91Y2hFdmVudChlKTtcblxuICAgICAgaWYgKGlzRHJhZ2dhYmxlKGUudGFyZ2V0KSAmJiAoaXNUb3VjaCB8fCAhZS5idXR0b24pKSB7XG4gICAgICAgIGlmICghQ29udHJvbGxlci5pc0J1c3koKSkge1xuICAgICAgICAgIHRhcmdldCA9IGlzVG91Y2ggPyB0cmFjayA6IHdpbmRvdztcbiAgICAgICAgICBkcmFnZ2luZyA9IHN0YXRlLmlzKFtNT1ZJTkcsIFNDUk9MTElOR10pO1xuICAgICAgICAgIHByZXZCYXNlRXZlbnQgPSBudWxsO1xuICAgICAgICAgIGJpbmQodGFyZ2V0LCBQT0lOVEVSX01PVkVfRVZFTlRTLCBvblBvaW50ZXJNb3ZlLCBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyk7XG4gICAgICAgICAgYmluZCh0YXJnZXQsIFBPSU5URVJfVVBfRVZFTlRTLCBvblBvaW50ZXJVcCwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgICAgICAgIE1vdmUuY2FuY2VsKCk7XG4gICAgICAgICAgU2Nyb2xsLmNhbmNlbCgpO1xuICAgICAgICAgIHNhdmUoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJldmVudChlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUG9pbnRlck1vdmUoZSkge1xuICAgIGlmICghc3RhdGUuaXMoRFJBR0dJTkcpKSB7XG4gICAgICBzdGF0ZS5zZXQoRFJBR0dJTkcpO1xuICAgICAgZW1pdChFVkVOVF9EUkFHKTtcbiAgICB9XG5cbiAgICBpZiAoZS5jYW5jZWxhYmxlKSB7XG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgTW92ZS50cmFuc2xhdGUoYmFzZVBvc2l0aW9uICsgY29uc3RyYWluKGRpZmZDb29yZChlKSkpO1xuICAgICAgICB2YXIgZXhwaXJlZCA9IGRpZmZUaW1lKGUpID4gTE9HX0lOVEVSVkFMO1xuICAgICAgICB2YXIgaGFzRXhjZWVkZWQgPSBleGNlZWRlZCAhPT0gKGV4Y2VlZGVkID0gZXhjZWVkZWRMaW1pdCgpKTtcblxuICAgICAgICBpZiAoZXhwaXJlZCB8fCBoYXNFeGNlZWRlZCkge1xuICAgICAgICAgIHNhdmUoZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGlja1ByZXZlbnRlZCA9IHRydWU7XG4gICAgICAgIGVtaXQoRVZFTlRfRFJBR0dJTkcpO1xuICAgICAgICBwcmV2ZW50KGUpO1xuICAgICAgfSBlbHNlIGlmIChpc1NsaWRlckRpcmVjdGlvbihlKSkge1xuICAgICAgICBkcmFnZ2luZyA9IHNob3VsZFN0YXJ0KGUpO1xuICAgICAgICBwcmV2ZW50KGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUG9pbnRlclVwKGUpIHtcbiAgICBpZiAoc3RhdGUuaXMoRFJBR0dJTkcpKSB7XG4gICAgICBzdGF0ZS5zZXQoSURMRSk7XG4gICAgICBlbWl0KEVWRU5UX0RSQUdHRUQpO1xuICAgIH1cblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgbW92ZShlKTtcbiAgICAgIHByZXZlbnQoZSk7XG4gICAgfVxuXG4gICAgdW5iaW5kKHRhcmdldCwgUE9JTlRFUl9NT1ZFX0VWRU5UUywgb25Qb2ludGVyTW92ZSk7XG4gICAgdW5iaW5kKHRhcmdldCwgUE9JTlRFUl9VUF9FVkVOVFMsIG9uUG9pbnRlclVwKTtcbiAgICBkcmFnZ2luZyA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgaWYgKCFkaXNhYmxlZCAmJiBjbGlja1ByZXZlbnRlZCkge1xuICAgICAgcHJldmVudChlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlKGUpIHtcbiAgICBwcmV2QmFzZUV2ZW50ID0gYmFzZUV2ZW50O1xuICAgIGJhc2VFdmVudCA9IGU7XG4gICAgYmFzZVBvc2l0aW9uID0gZ2V0UG9zaXRpb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUoZSkge1xuICAgIHZhciB2ZWxvY2l0eSA9IGNvbXB1dGVWZWxvY2l0eShlKTtcbiAgICB2YXIgZGVzdGluYXRpb24gPSBjb21wdXRlRGVzdGluYXRpb24odmVsb2NpdHkpO1xuICAgIHZhciByZXdpbmQgPSBvcHRpb25zLnJld2luZCAmJiBvcHRpb25zLnJld2luZEJ5RHJhZztcbiAgICByZWR1Y2UoZmFsc2UpO1xuXG4gICAgaWYgKGlzRnJlZSkge1xuICAgICAgQ29udHJvbGxlci5zY3JvbGwoZGVzdGluYXRpb24sIDAsIG9wdGlvbnMuc25hcCk7XG4gICAgfSBlbHNlIGlmIChTcGxpZGUyLmlzKEZBREUpKSB7XG4gICAgICBDb250cm9sbGVyLmdvKG9yaWVudChzaWduKHZlbG9jaXR5KSkgPCAwID8gcmV3aW5kID8gXCI8XCIgOiBcIi1cIiA6IHJld2luZCA/IFwiPlwiIDogXCIrXCIpO1xuICAgIH0gZWxzZSBpZiAoU3BsaWRlMi5pcyhTTElERSkgJiYgZXhjZWVkZWQgJiYgcmV3aW5kKSB7XG4gICAgICBDb250cm9sbGVyLmdvKGV4Y2VlZGVkTGltaXQodHJ1ZSkgPyBcIj5cIiA6IFwiPFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ29udHJvbGxlci5nbyhDb250cm9sbGVyLnRvRGVzdChkZXN0aW5hdGlvbiksIHRydWUpO1xuICAgIH1cblxuICAgIHJlZHVjZSh0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZFN0YXJ0KGUpIHtcbiAgICB2YXIgdGhyZXNob2xkcyA9IG9wdGlvbnMuZHJhZ01pblRocmVzaG9sZDtcbiAgICB2YXIgaXNPYmogPSBpc09iamVjdCh0aHJlc2hvbGRzKTtcbiAgICB2YXIgbW91c2UgPSBpc09iaiAmJiB0aHJlc2hvbGRzLm1vdXNlIHx8IDA7XG4gICAgdmFyIHRvdWNoID0gKGlzT2JqID8gdGhyZXNob2xkcy50b3VjaCA6ICt0aHJlc2hvbGRzKSB8fCAxMDtcbiAgICByZXR1cm4gYWJzKGRpZmZDb29yZChlKSkgPiAoaXNUb3VjaEV2ZW50KGUpID8gdG91Y2ggOiBtb3VzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1NsaWRlckRpcmVjdGlvbihlKSB7XG4gICAgcmV0dXJuIGFicyhkaWZmQ29vcmQoZSkpID4gYWJzKGRpZmZDb29yZChlLCB0cnVlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb21wdXRlVmVsb2NpdHkoZSkge1xuICAgIGlmIChTcGxpZGUyLmlzKExPT1ApIHx8ICFleGNlZWRlZCkge1xuICAgICAgdmFyIHRpbWUgPSBkaWZmVGltZShlKTtcblxuICAgICAgaWYgKHRpbWUgJiYgdGltZSA8IExPR19JTlRFUlZBTCkge1xuICAgICAgICByZXR1cm4gZGlmZkNvb3JkKGUpIC8gdGltZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVEZXN0aW5hdGlvbih2ZWxvY2l0eSkge1xuICAgIHJldHVybiBnZXRQb3NpdGlvbigpICsgc2lnbih2ZWxvY2l0eSkgKiBtaW4oYWJzKHZlbG9jaXR5KSAqIChvcHRpb25zLmZsaWNrUG93ZXIgfHwgNjAwKSwgaXNGcmVlID8gSW5maW5pdHkgOiBDb21wb25lbnRzMi5MYXlvdXQubGlzdFNpemUoKSAqIChvcHRpb25zLmZsaWNrTWF4UGFnZXMgfHwgMSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlmZkNvb3JkKGUsIG9ydGhvZ29uYWwpIHtcbiAgICByZXR1cm4gY29vcmRPZihlLCBvcnRob2dvbmFsKSAtIGNvb3JkT2YoZ2V0QmFzZUV2ZW50KGUpLCBvcnRob2dvbmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpZmZUaW1lKGUpIHtcbiAgICByZXR1cm4gdGltZU9mKGUpIC0gdGltZU9mKGdldEJhc2VFdmVudChlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCYXNlRXZlbnQoZSkge1xuICAgIHJldHVybiBiYXNlRXZlbnQgPT09IGUgJiYgcHJldkJhc2VFdmVudCB8fCBiYXNlRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZE9mKGUsIG9ydGhvZ29uYWwpIHtcbiAgICByZXR1cm4gKGlzVG91Y2hFdmVudChlKSA/IGUuY2hhbmdlZFRvdWNoZXNbMF0gOiBlKVtcInBhZ2VcIiArIHJlc29sdmUob3J0aG9nb25hbCA/IFwiWVwiIDogXCJYXCIpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cmFpbihkaWZmKSB7XG4gICAgcmV0dXJuIGRpZmYgLyAoZXhjZWVkZWQgJiYgU3BsaWRlMi5pcyhTTElERSkgPyBGUklDVElPTiA6IDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNEcmFnZ2FibGUodGFyZ2V0Mikge1xuICAgIHZhciBub0RyYWcgPSBvcHRpb25zLm5vRHJhZztcbiAgICByZXR1cm4gIW1hdGNoZXModGFyZ2V0MiwgXCIuXCIgKyBDTEFTU19QQUdJTkFUSU9OX1BBR0UgKyBcIiwgLlwiICsgQ0xBU1NfQVJST1cpICYmICghbm9EcmFnIHx8ICFtYXRjaGVzKHRhcmdldDIsIG5vRHJhZykpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNUb3VjaEV2ZW50KGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIFRvdWNoRXZlbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBpc0RyYWdnaW5nKCkge1xuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc2FibGUodmFsdWUpIHtcbiAgICBkaXNhYmxlZCA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGlzYWJsZTogZGlzYWJsZSxcbiAgICBpc0RyYWdnaW5nOiBpc0RyYWdnaW5nXG4gIH07XG59XG5cbnZhciBOT1JNQUxJWkFUSU9OX01BUCA9IHtcbiAgU3BhY2ViYXI6IFwiIFwiLFxuICBSaWdodDogQVJST1dfUklHSFQsXG4gIExlZnQ6IEFSUk9XX0xFRlQsXG4gIFVwOiBBUlJPV19VUCxcbiAgRG93bjogQVJST1dfRE9XTlxufTtcblxuZnVuY3Rpb24gbm9ybWFsaXplS2V5KGtleSkge1xuICBrZXkgPSBpc1N0cmluZyhrZXkpID8ga2V5IDoga2V5LmtleTtcbiAgcmV0dXJuIE5PUk1BTElaQVRJT05fTUFQW2tleV0gfHwga2V5O1xufVxuXG52YXIgS0VZQk9BUkRfRVZFTlQgPSBcImtleWRvd25cIjtcblxuZnVuY3Rpb24gS2V5Ym9hcmQoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTExID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTExLm9uLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTExLmJpbmQsXG4gICAgICB1bmJpbmQgPSBfRXZlbnRJbnRlcmZhY2UxMS51bmJpbmQ7XG5cbiAgdmFyIHJvb3QgPSBTcGxpZGUyLnJvb3Q7XG4gIHZhciByZXNvbHZlID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLnJlc29sdmU7XG4gIHZhciB0YXJnZXQ7XG4gIHZhciBkaXNhYmxlZDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpbml0KCk7XG4gICAgb24oRVZFTlRfVVBEQVRFRCwgZGVzdHJveSk7XG4gICAgb24oRVZFTlRfVVBEQVRFRCwgaW5pdCk7XG4gICAgb24oRVZFTlRfTU9WRSwgb25Nb3ZlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIGtleWJvYXJkID0gb3B0aW9ucy5rZXlib2FyZDtcblxuICAgIGlmIChrZXlib2FyZCkge1xuICAgICAgdGFyZ2V0ID0ga2V5Ym9hcmQgPT09IFwiZ2xvYmFsXCIgPyB3aW5kb3cgOiByb290O1xuICAgICAgYmluZCh0YXJnZXQsIEtFWUJPQVJEX0VWRU5ULCBvbktleWRvd24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdW5iaW5kKHRhcmdldCwgS0VZQk9BUkRfRVZFTlQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzYWJsZSh2YWx1ZSkge1xuICAgIGRpc2FibGVkID0gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBvbk1vdmUoKSB7XG4gICAgdmFyIF9kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBkaXNhYmxlZCA9IF9kaXNhYmxlZDtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93bihlKSB7XG4gICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgdmFyIGtleSA9IG5vcm1hbGl6ZUtleShlKTtcblxuICAgICAgaWYgKGtleSA9PT0gcmVzb2x2ZShBUlJPV19MRUZUKSkge1xuICAgICAgICBTcGxpZGUyLmdvKFwiPFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSByZXNvbHZlKEFSUk9XX1JJR0hUKSkge1xuICAgICAgICBTcGxpZGUyLmdvKFwiPlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIGRpc2FibGU6IGRpc2FibGVcbiAgfTtcbn1cblxudmFyIFNSQ19EQVRBX0FUVFJJQlVURSA9IERBVEFfQVRUUklCVVRFICsgXCItbGF6eVwiO1xudmFyIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSA9IFNSQ19EQVRBX0FUVFJJQlVURSArIFwiLXNyY3NldFwiO1xudmFyIElNQUdFX1NFTEVDVE9SID0gXCJbXCIgKyBTUkNfREFUQV9BVFRSSUJVVEUgKyBcIl0sIFtcIiArIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSArIFwiXVwiO1xuXG5mdW5jdGlvbiBMYXp5TG9hZChTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMTIgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMTIub24sXG4gICAgICBvZmYgPSBfRXZlbnRJbnRlcmZhY2UxMi5vZmYsXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlMTIuYmluZCxcbiAgICAgIGVtaXQgPSBfRXZlbnRJbnRlcmZhY2UxMi5lbWl0O1xuXG4gIHZhciBpc1NlcXVlbnRpYWwgPSBvcHRpb25zLmxhenlMb2FkID09PSBcInNlcXVlbnRpYWxcIjtcbiAgdmFyIGV2ZW50cyA9IFtFVkVOVF9NT1ZFRCwgRVZFTlRfU0NST0xMRURdO1xuICB2YXIgZW50cmllcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmIChvcHRpb25zLmxhenlMb2FkKSB7XG4gICAgICBpbml0KCk7XG4gICAgICBvbihFVkVOVF9SRUZSRVNILCBpbml0KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGVtcHR5KGVudHJpZXMpO1xuICAgIHJlZ2lzdGVyKCk7XG5cbiAgICBpZiAoaXNTZXF1ZW50aWFsKSB7XG4gICAgICBsb2FkTmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmYoZXZlbnRzKTtcbiAgICAgIG9uKGV2ZW50cywgY2hlY2spO1xuICAgICAgY2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlcigpIHtcbiAgICBDb21wb25lbnRzMi5TbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoU2xpZGUpIHtcbiAgICAgIHF1ZXJ5QWxsKFNsaWRlLnNsaWRlLCBJTUFHRV9TRUxFQ1RPUikuZm9yRWFjaChmdW5jdGlvbiAoaW1nKSB7XG4gICAgICAgIHZhciBzcmMgPSBnZXRBdHRyaWJ1dGUoaW1nLCBTUkNfREFUQV9BVFRSSUJVVEUpO1xuICAgICAgICB2YXIgc3Jjc2V0ID0gZ2V0QXR0cmlidXRlKGltZywgU1JDU0VUX0RBVEFfQVRUUklCVVRFKTtcblxuICAgICAgICBpZiAoc3JjICE9PSBpbWcuc3JjIHx8IHNyY3NldCAhPT0gaW1nLnNyY3NldCkge1xuICAgICAgICAgIHZhciBjbGFzc05hbWUgPSBvcHRpb25zLmNsYXNzZXMuc3Bpbm5lcjtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gaW1nLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgdmFyIHNwaW5uZXIgPSBjaGlsZChwYXJlbnQsIFwiLlwiICsgY2xhc3NOYW1lKSB8fCBjcmVhdGUoXCJzcGFuXCIsIGNsYXNzTmFtZSwgcGFyZW50KTtcbiAgICAgICAgICBlbnRyaWVzLnB1c2goW2ltZywgU2xpZGUsIHNwaW5uZXJdKTtcbiAgICAgICAgICBpbWcuc3JjIHx8IGRpc3BsYXkoaW1nLCBcIm5vbmVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2soKSB7XG4gICAgZW50cmllcyA9IGVudHJpZXMuZmlsdGVyKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgZGlzdGFuY2UgPSBvcHRpb25zLnBlclBhZ2UgKiAoKG9wdGlvbnMucHJlbG9hZFBhZ2VzIHx8IDEpICsgMSkgLSAxO1xuICAgICAgcmV0dXJuIGRhdGFbMV0uaXNXaXRoaW4oU3BsaWRlMi5pbmRleCwgZGlzdGFuY2UpID8gbG9hZChkYXRhKSA6IHRydWU7XG4gICAgfSk7XG4gICAgZW50cmllcy5sZW5ndGggfHwgb2ZmKGV2ZW50cyk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkKGRhdGEpIHtcbiAgICB2YXIgaW1nID0gZGF0YVswXTtcbiAgICBhZGRDbGFzcyhkYXRhWzFdLnNsaWRlLCBDTEFTU19MT0FESU5HKTtcbiAgICBiaW5kKGltZywgXCJsb2FkIGVycm9yXCIsIGFwcGx5KG9uTG9hZCwgZGF0YSkpO1xuICAgIHNldEF0dHJpYnV0ZShpbWcsIFwic3JjXCIsIGdldEF0dHJpYnV0ZShpbWcsIFNSQ19EQVRBX0FUVFJJQlVURSkpO1xuICAgIHNldEF0dHJpYnV0ZShpbWcsIFwic3Jjc2V0XCIsIGdldEF0dHJpYnV0ZShpbWcsIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSkpO1xuICAgIHJlbW92ZUF0dHJpYnV0ZShpbWcsIFNSQ19EQVRBX0FUVFJJQlVURSk7XG4gICAgcmVtb3ZlQXR0cmlidXRlKGltZywgU1JDU0VUX0RBVEFfQVRUUklCVVRFKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTG9hZChkYXRhLCBlKSB7XG4gICAgdmFyIGltZyA9IGRhdGFbMF0sXG4gICAgICAgIFNsaWRlID0gZGF0YVsxXTtcbiAgICByZW1vdmVDbGFzcyhTbGlkZS5zbGlkZSwgQ0xBU1NfTE9BRElORyk7XG5cbiAgICBpZiAoZS50eXBlICE9PSBcImVycm9yXCIpIHtcbiAgICAgIHJlbW92ZShkYXRhWzJdKTtcbiAgICAgIGRpc3BsYXkoaW1nLCBcIlwiKTtcbiAgICAgIGVtaXQoRVZFTlRfTEFaWUxPQURfTE9BREVELCBpbWcsIFNsaWRlKTtcbiAgICAgIGVtaXQoRVZFTlRfUkVTSVpFKTtcbiAgICB9XG5cbiAgICBpc1NlcXVlbnRpYWwgJiYgbG9hZE5leHQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWROZXh0KCkge1xuICAgIGVudHJpZXMubGVuZ3RoICYmIGxvYWQoZW50cmllcy5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGFwcGx5KGVtcHR5LCBlbnRyaWVzKSxcbiAgICBjaGVjazogY2hlY2tcbiAgfTtcbn1cblxuZnVuY3Rpb24gUGFnaW5hdGlvbihTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgdmFyIG9uID0gZXZlbnQub24sXG4gICAgICBlbWl0ID0gZXZlbnQuZW1pdCxcbiAgICAgIGJpbmQgPSBldmVudC5iaW5kO1xuICB2YXIgU2xpZGVzID0gQ29tcG9uZW50czIuU2xpZGVzLFxuICAgICAgRWxlbWVudHMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIENvbnRyb2xsZXIgPSBDb21wb25lbnRzMi5Db250cm9sbGVyO1xuICB2YXIgaGFzRm9jdXMgPSBDb250cm9sbGVyLmhhc0ZvY3VzLFxuICAgICAgZ2V0SW5kZXggPSBDb250cm9sbGVyLmdldEluZGV4LFxuICAgICAgZ28gPSBDb250cm9sbGVyLmdvO1xuICB2YXIgcmVzb2x2ZSA9IENvbXBvbmVudHMyLkRpcmVjdGlvbi5yZXNvbHZlO1xuICB2YXIgcGxhY2Vob2xkZXIgPSBFbGVtZW50cy5wYWdpbmF0aW9uO1xuICB2YXIgaXRlbXMgPSBbXTtcbiAgdmFyIGxpc3Q7XG4gIHZhciBwYWdpbmF0aW9uQ2xhc3NlcztcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBkZXN0cm95KCk7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCBtb3VudCk7XG4gICAgdmFyIGVuYWJsZWQgPSBvcHRpb25zLnBhZ2luYXRpb24gJiYgU2xpZGVzLmlzRW5vdWdoKCk7XG4gICAgcGxhY2Vob2xkZXIgJiYgZGlzcGxheShwbGFjZWhvbGRlciwgZW5hYmxlZCA/IFwiXCIgOiBcIm5vbmVcIik7XG5cbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgb24oW0VWRU5UX01PVkUsIEVWRU5UX1NDUk9MTCwgRVZFTlRfU0NST0xMRURdLCB1cGRhdGUpO1xuICAgICAgY3JlYXRlUGFnaW5hdGlvbigpO1xuICAgICAgdXBkYXRlKCk7XG4gICAgICBlbWl0KEVWRU5UX1BBR0lOQVRJT05fTU9VTlRFRCwge1xuICAgICAgICBsaXN0OiBsaXN0LFxuICAgICAgICBpdGVtczogaXRlbXNcbiAgICAgIH0sIGdldEF0KFNwbGlkZTIuaW5kZXgpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGlmIChsaXN0KSB7XG4gICAgICByZW1vdmUocGxhY2Vob2xkZXIgPyBzbGljZShsaXN0LmNoaWxkcmVuKSA6IGxpc3QpO1xuICAgICAgcmVtb3ZlQ2xhc3MobGlzdCwgcGFnaW5hdGlvbkNsYXNzZXMpO1xuICAgICAgZW1wdHkoaXRlbXMpO1xuICAgICAgbGlzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgZXZlbnQuZGVzdHJveSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUGFnaW5hdGlvbigpIHtcbiAgICB2YXIgbGVuZ3RoID0gU3BsaWRlMi5sZW5ndGg7XG4gICAgdmFyIGNsYXNzZXMgPSBvcHRpb25zLmNsYXNzZXMsXG4gICAgICAgIGkxOG4gPSBvcHRpb25zLmkxOG4sXG4gICAgICAgIHBlclBhZ2UgPSBvcHRpb25zLnBlclBhZ2U7XG4gICAgdmFyIG1heCA9IGhhc0ZvY3VzKCkgPyBsZW5ndGggOiBjZWlsKGxlbmd0aCAvIHBlclBhZ2UpO1xuICAgIGxpc3QgPSBwbGFjZWhvbGRlciB8fCBjcmVhdGUoXCJ1bFwiLCBjbGFzc2VzLnBhZ2luYXRpb24sIEVsZW1lbnRzLnRyYWNrLnBhcmVudEVsZW1lbnQpO1xuICAgIGFkZENsYXNzKGxpc3QsIHBhZ2luYXRpb25DbGFzc2VzID0gQ0xBU1NfUEFHSU5BVElPTiArIFwiLS1cIiArIGdldERpcmVjdGlvbigpKTtcbiAgICBzZXRBdHRyaWJ1dGUobGlzdCwgUk9MRSwgXCJ0YWJsaXN0XCIpO1xuICAgIHNldEF0dHJpYnV0ZShsaXN0LCBBUklBX0xBQkVMLCBpMThuLnNlbGVjdCk7XG4gICAgc2V0QXR0cmlidXRlKGxpc3QsIEFSSUFfT1JJRU5UQVRJT04sIGdldERpcmVjdGlvbigpID09PSBUVEIgPyBcInZlcnRpY2FsXCIgOiBcIlwiKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIHZhciBsaSA9IGNyZWF0ZShcImxpXCIsIG51bGwsIGxpc3QpO1xuICAgICAgdmFyIGJ1dHRvbiA9IGNyZWF0ZShcImJ1dHRvblwiLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnBhZ2UsXG4gICAgICAgIHR5cGU6IFwiYnV0dG9uXCJcbiAgICAgIH0sIGxpKTtcbiAgICAgIHZhciBjb250cm9scyA9IFNsaWRlcy5nZXRJbihpKS5tYXAoZnVuY3Rpb24gKFNsaWRlKSB7XG4gICAgICAgIHJldHVybiBTbGlkZS5zbGlkZS5pZDtcbiAgICAgIH0pO1xuICAgICAgdmFyIHRleHQgPSAhaGFzRm9jdXMoKSAmJiBwZXJQYWdlID4gMSA/IGkxOG4ucGFnZVggOiBpMThuLnNsaWRlWDtcbiAgICAgIGJpbmQoYnV0dG9uLCBcImNsaWNrXCIsIGFwcGx5KG9uQ2xpY2ssIGkpKTtcblxuICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbktleWJvYXJkKSB7XG4gICAgICAgIGJpbmQoYnV0dG9uLCBcImtleWRvd25cIiwgYXBwbHkob25LZXlkb3duLCBpKSk7XG4gICAgICB9XG5cbiAgICAgIHNldEF0dHJpYnV0ZShsaSwgUk9MRSwgXCJwcmVzZW50YXRpb25cIik7XG4gICAgICBzZXRBdHRyaWJ1dGUoYnV0dG9uLCBST0xFLCBcInRhYlwiKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIEFSSUFfQ09OVFJPTFMsIGNvbnRyb2xzLmpvaW4oXCIgXCIpKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIEFSSUFfTEFCRUwsIGZvcm1hdCh0ZXh0LCBpICsgMSkpO1xuICAgICAgc2V0QXR0cmlidXRlKGJ1dHRvbiwgVEFCX0lOREVYLCAtMSk7XG4gICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgbGk6IGxpLFxuICAgICAgICBidXR0b246IGJ1dHRvbixcbiAgICAgICAgcGFnZTogaVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25DbGljayhwYWdlKSB7XG4gICAgZ28oXCI+XCIgKyBwYWdlLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93bihwYWdlLCBlKSB7XG4gICAgdmFyIGxlbmd0aCA9IGl0ZW1zLmxlbmd0aDtcbiAgICB2YXIga2V5ID0gbm9ybWFsaXplS2V5KGUpO1xuICAgIHZhciBkaXIgPSBnZXREaXJlY3Rpb24oKTtcbiAgICB2YXIgbmV4dFBhZ2UgPSAtMTtcblxuICAgIGlmIChrZXkgPT09IHJlc29sdmUoQVJST1dfUklHSFQsIGZhbHNlLCBkaXIpKSB7XG4gICAgICBuZXh0UGFnZSA9ICsrcGFnZSAlIGxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gcmVzb2x2ZShBUlJPV19MRUZULCBmYWxzZSwgZGlyKSkge1xuICAgICAgbmV4dFBhZ2UgPSAoLS1wYWdlICsgbGVuZ3RoKSAlIGxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJIb21lXCIpIHtcbiAgICAgIG5leHRQYWdlID0gMDtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJFbmRcIikge1xuICAgICAgbmV4dFBhZ2UgPSBsZW5ndGggLSAxO1xuICAgIH1cblxuICAgIHZhciBpdGVtID0gaXRlbXNbbmV4dFBhZ2VdO1xuXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGZvY3VzKGl0ZW0uYnV0dG9uKTtcbiAgICAgIGdvKFwiPlwiICsgbmV4dFBhZ2UpO1xuICAgICAgcHJldmVudChlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXREaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMucGFnaW5hdGlvbkRpcmVjdGlvbiB8fCBvcHRpb25zLmRpcmVjdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEF0KGluZGV4KSB7XG4gICAgcmV0dXJuIGl0ZW1zW0NvbnRyb2xsZXIudG9QYWdlKGluZGV4KV07XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIHByZXYgPSBnZXRBdChnZXRJbmRleCh0cnVlKSk7XG4gICAgdmFyIGN1cnIgPSBnZXRBdChnZXRJbmRleCgpKTtcblxuICAgIGlmIChwcmV2KSB7XG4gICAgICB2YXIgYnV0dG9uID0gcHJldi5idXR0b247XG4gICAgICByZW1vdmVDbGFzcyhidXR0b24sIENMQVNTX0FDVElWRSk7XG4gICAgICByZW1vdmVBdHRyaWJ1dGUoYnV0dG9uLCBBUklBX1NFTEVDVEVEKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIFRBQl9JTkRFWCwgLTEpO1xuICAgIH1cblxuICAgIGlmIChjdXJyKSB7XG4gICAgICB2YXIgX2J1dHRvbiA9IGN1cnIuYnV0dG9uO1xuICAgICAgYWRkQ2xhc3MoX2J1dHRvbiwgQ0xBU1NfQUNUSVZFKTtcbiAgICAgIHNldEF0dHJpYnV0ZShfYnV0dG9uLCBBUklBX1NFTEVDVEVELCB0cnVlKTtcbiAgICAgIHNldEF0dHJpYnV0ZShfYnV0dG9uLCBUQUJfSU5ERVgsIFwiXCIpO1xuICAgIH1cblxuICAgIGVtaXQoRVZFTlRfUEFHSU5BVElPTl9VUERBVEVELCB7XG4gICAgICBsaXN0OiBsaXN0LFxuICAgICAgaXRlbXM6IGl0ZW1zXG4gICAgfSwgcHJldiwgY3Vycik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGl0ZW1zOiBpdGVtcyxcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBnZXRBdDogZ2V0QXQsXG4gICAgdXBkYXRlOiB1cGRhdGVcbiAgfTtcbn1cblxudmFyIFRSSUdHRVJfS0VZUyA9IFtcIiBcIiwgXCJFbnRlclwiXTtcblxuZnVuY3Rpb24gU3luYyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgaXNOYXZpZ2F0aW9uID0gb3B0aW9ucy5pc05hdmlnYXRpb24sXG4gICAgICBzbGlkZUZvY3VzID0gb3B0aW9ucy5zbGlkZUZvY3VzO1xuICB2YXIgZXZlbnRzID0gW107XG5cbiAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgU3BsaWRlMi5vcHRpb25zID0ge1xuICAgICAgc2xpZGVGb2N1czogaXNVbmRlZmluZWQoc2xpZGVGb2N1cykgPyBpc05hdmlnYXRpb24gOiBzbGlkZUZvY3VzXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIFNwbGlkZTIuc3BsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIGlmICghdGFyZ2V0LmlzUGFyZW50KSB7XG4gICAgICAgIHN5bmMoU3BsaWRlMiwgdGFyZ2V0LnNwbGlkZSk7XG4gICAgICAgIHN5bmModGFyZ2V0LnNwbGlkZSwgU3BsaWRlMik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaXNOYXZpZ2F0aW9uKSB7XG4gICAgICBuYXZpZ2F0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5kZXN0cm95KCk7XG4gICAgfSk7XG4gICAgZW1wdHkoZXZlbnRzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW91bnQoKSB7XG4gICAgZGVzdHJveSgpO1xuICAgIG1vdW50KCk7XG4gIH1cblxuICBmdW5jdGlvbiBzeW5jKHNwbGlkZSwgdGFyZ2V0KSB7XG4gICAgdmFyIGV2ZW50ID0gRXZlbnRJbnRlcmZhY2Uoc3BsaWRlKTtcbiAgICBldmVudC5vbihFVkVOVF9NT1ZFLCBmdW5jdGlvbiAoaW5kZXgsIHByZXYsIGRlc3QpIHtcbiAgICAgIHRhcmdldC5nbyh0YXJnZXQuaXMoTE9PUCkgPyBkZXN0IDogaW5kZXgpO1xuICAgIH0pO1xuICAgIGV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5hdmlnYXRlKCkge1xuICAgIHZhciBldmVudCA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpO1xuICAgIHZhciBvbiA9IGV2ZW50Lm9uO1xuICAgIG9uKEVWRU5UX0NMSUNLLCBvbkNsaWNrKTtcbiAgICBvbihFVkVOVF9TTElERV9LRVlET1dOLCBvbktleWRvd24pO1xuICAgIG9uKFtFVkVOVF9NT1VOVEVELCBFVkVOVF9VUERBVEVEXSwgdXBkYXRlKTtcbiAgICBldmVudHMucHVzaChldmVudCk7XG4gICAgZXZlbnQuZW1pdChFVkVOVF9OQVZJR0FUSU9OX01PVU5URUQsIFNwbGlkZTIuc3BsaWRlcyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgc2V0QXR0cmlidXRlKENvbXBvbmVudHMyLkVsZW1lbnRzLmxpc3QsIEFSSUFfT1JJRU5UQVRJT04sIG9wdGlvbnMuZGlyZWN0aW9uID09PSBUVEIgPyBcInZlcnRpY2FsXCIgOiBcIlwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ2xpY2soU2xpZGUpIHtcbiAgICBTcGxpZGUyLmdvKFNsaWRlLmluZGV4KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93bihTbGlkZSwgZSkge1xuICAgIGlmIChpbmNsdWRlcyhUUklHR0VSX0tFWVMsIG5vcm1hbGl6ZUtleShlKSkpIHtcbiAgICAgIG9uQ2xpY2soU2xpZGUpO1xuICAgICAgcHJldmVudChlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldHVwOiBzZXR1cCxcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICByZW1vdW50OiByZW1vdW50XG4gIH07XG59XG5cbmZ1bmN0aW9uIFdoZWVsKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UxMyA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTEzLmJpbmQ7XG5cbiAgdmFyIGxhc3RUaW1lID0gMDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpZiAob3B0aW9ucy53aGVlbCkge1xuICAgICAgYmluZChDb21wb25lbnRzMi5FbGVtZW50cy50cmFjaywgXCJ3aGVlbFwiLCBvbldoZWVsLCBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25XaGVlbChlKSB7XG4gICAgaWYgKGUuY2FuY2VsYWJsZSkge1xuICAgICAgdmFyIGRlbHRhWSA9IGUuZGVsdGFZO1xuICAgICAgdmFyIGJhY2t3YXJkcyA9IGRlbHRhWSA8IDA7XG4gICAgICB2YXIgdGltZVN0YW1wID0gdGltZU9mKGUpO1xuXG4gICAgICB2YXIgX21pbiA9IG9wdGlvbnMud2hlZWxNaW5UaHJlc2hvbGQgfHwgMDtcblxuICAgICAgdmFyIHNsZWVwID0gb3B0aW9ucy53aGVlbFNsZWVwIHx8IDA7XG5cbiAgICAgIGlmIChhYnMoZGVsdGFZKSA+IF9taW4gJiYgdGltZVN0YW1wIC0gbGFzdFRpbWUgPiBzbGVlcCkge1xuICAgICAgICBTcGxpZGUyLmdvKGJhY2t3YXJkcyA/IFwiPFwiIDogXCI+XCIpO1xuICAgICAgICBsYXN0VGltZSA9IHRpbWVTdGFtcDtcbiAgICAgIH1cblxuICAgICAgc2hvdWxkUHJldmVudChiYWNrd2FyZHMpICYmIHByZXZlbnQoZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkUHJldmVudChiYWNrd2FyZHMpIHtcbiAgICByZXR1cm4gIW9wdGlvbnMucmVsZWFzZVdoZWVsIHx8IFNwbGlkZTIuc3RhdGUuaXMoTU9WSU5HKSB8fCBDb21wb25lbnRzMi5Db250cm9sbGVyLmdldEFkamFjZW50KGJhY2t3YXJkcykgIT09IC0xO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnRcbiAgfTtcbn1cblxudmFyIFNSX1JFTU9WQUxfREVMQVkgPSA5MDtcblxuZnVuY3Rpb24gTGl2ZShTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMTQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMTQub247XG5cbiAgdmFyIHRyYWNrID0gQ29tcG9uZW50czIuRWxlbWVudHMudHJhY2s7XG4gIHZhciBlbmFibGVkID0gb3B0aW9ucy5saXZlICYmICFvcHRpb25zLmlzTmF2aWdhdGlvbjtcbiAgdmFyIHNyID0gY3JlYXRlKFwic3BhblwiLCBDTEFTU19TUik7XG4gIHZhciBpbnRlcnZhbCA9IFJlcXVlc3RJbnRlcnZhbChTUl9SRU1PVkFMX0RFTEFZLCBhcHBseSh0b2dnbGUsIGZhbHNlKSk7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIGRpc2FibGUoIUNvbXBvbmVudHMyLkF1dG9wbGF5LmlzUGF1c2VkKCkpO1xuICAgICAgc2V0QXR0cmlidXRlKHRyYWNrLCBBUklBX0FUT01JQywgdHJ1ZSk7XG4gICAgICBzci50ZXh0Q29udGVudCA9IFwiXFx1MjAyNlwiO1xuICAgICAgb24oRVZFTlRfQVVUT1BMQVlfUExBWSwgYXBwbHkoZGlzYWJsZSwgdHJ1ZSkpO1xuICAgICAgb24oRVZFTlRfQVVUT1BMQVlfUEFVU0UsIGFwcGx5KGRpc2FibGUsIGZhbHNlKSk7XG4gICAgICBvbihbRVZFTlRfTU9WRUQsIEVWRU5UX1NDUk9MTEVEXSwgYXBwbHkodG9nZ2xlLCB0cnVlKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlKGFjdGl2ZSkge1xuICAgIHNldEF0dHJpYnV0ZSh0cmFjaywgQVJJQV9CVVNZLCBhY3RpdmUpO1xuXG4gICAgaWYgKGFjdGl2ZSkge1xuICAgICAgYXBwZW5kKHRyYWNrLCBzcik7XG4gICAgICBpbnRlcnZhbC5zdGFydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoc3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgcmVtb3ZlQXR0cmlidXRlKHRyYWNrLCBbQVJJQV9MSVZFLCBBUklBX0FUT01JQywgQVJJQV9CVVNZXSk7XG4gICAgcmVtb3ZlKHNyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc2FibGUoZGlzYWJsZWQpIHtcbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgc2V0QXR0cmlidXRlKHRyYWNrLCBBUklBX0xJVkUsIGRpc2FibGVkID8gXCJvZmZcIiA6IFwicG9saXRlXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRpc2FibGU6IGRpc2FibGUsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xufVxuXG52YXIgQ29tcG9uZW50Q29uc3RydWN0b3JzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICBfX3Byb3RvX186IG51bGwsXG4gIE1lZGlhOiBNZWRpYSxcbiAgRGlyZWN0aW9uOiBEaXJlY3Rpb24sXG4gIEVsZW1lbnRzOiBFbGVtZW50cyxcbiAgU2xpZGVzOiBTbGlkZXMsXG4gIExheW91dDogTGF5b3V0LFxuICBDbG9uZXM6IENsb25lcyxcbiAgTW92ZTogTW92ZSxcbiAgQ29udHJvbGxlcjogQ29udHJvbGxlcixcbiAgQXJyb3dzOiBBcnJvd3MsXG4gIEF1dG9wbGF5OiBBdXRvcGxheSxcbiAgQ292ZXI6IENvdmVyLFxuICBTY3JvbGw6IFNjcm9sbCxcbiAgRHJhZzogRHJhZyxcbiAgS2V5Ym9hcmQ6IEtleWJvYXJkLFxuICBMYXp5TG9hZDogTGF6eUxvYWQsXG4gIFBhZ2luYXRpb246IFBhZ2luYXRpb24sXG4gIFN5bmM6IFN5bmMsXG4gIFdoZWVsOiBXaGVlbCxcbiAgTGl2ZTogTGl2ZVxufSk7XG52YXIgSTE4TiA9IHtcbiAgcHJldjogXCJQcmV2aW91cyBzbGlkZVwiLFxuICBuZXh0OiBcIk5leHQgc2xpZGVcIixcbiAgZmlyc3Q6IFwiR28gdG8gZmlyc3Qgc2xpZGVcIixcbiAgbGFzdDogXCJHbyB0byBsYXN0IHNsaWRlXCIsXG4gIHNsaWRlWDogXCJHbyB0byBzbGlkZSAlc1wiLFxuICBwYWdlWDogXCJHbyB0byBwYWdlICVzXCIsXG4gIHBsYXk6IFwiU3RhcnQgYXV0b3BsYXlcIixcbiAgcGF1c2U6IFwiUGF1c2UgYXV0b3BsYXlcIixcbiAgY2Fyb3VzZWw6IFwiY2Fyb3VzZWxcIixcbiAgc2xpZGU6IFwic2xpZGVcIixcbiAgc2VsZWN0OiBcIlNlbGVjdCBhIHNsaWRlIHRvIHNob3dcIixcbiAgc2xpZGVMYWJlbDogXCIlcyBvZiAlc1wiXG59O1xudmFyIERFRkFVTFRTID0ge1xuICB0eXBlOiBcInNsaWRlXCIsXG4gIHJvbGU6IFwicmVnaW9uXCIsXG4gIHNwZWVkOiA0MDAsXG4gIHBlclBhZ2U6IDEsXG4gIGNsb25lU3RhdHVzOiB0cnVlLFxuICBhcnJvd3M6IHRydWUsXG4gIHBhZ2luYXRpb246IHRydWUsXG4gIHBhZ2luYXRpb25LZXlib2FyZDogdHJ1ZSxcbiAgaW50ZXJ2YWw6IDVlMyxcbiAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICBwYXVzZU9uRm9jdXM6IHRydWUsXG4gIHJlc2V0UHJvZ3Jlc3M6IHRydWUsXG4gIGVhc2luZzogXCJjdWJpYy1iZXppZXIoMC4yNSwgMSwgMC41LCAxKVwiLFxuICBkcmFnOiB0cnVlLFxuICBkaXJlY3Rpb246IFwibHRyXCIsXG4gIHRyaW1TcGFjZTogdHJ1ZSxcbiAgZm9jdXNhYmxlTm9kZXM6IFwiYSwgYnV0dG9uLCB0ZXh0YXJlYSwgaW5wdXQsIHNlbGVjdCwgaWZyYW1lXCIsXG4gIGxpdmU6IHRydWUsXG4gIGNsYXNzZXM6IENMQVNTRVMsXG4gIGkxOG46IEkxOE4sXG4gIHJlZHVjZWRNb3Rpb246IHtcbiAgICBzcGVlZDogMCxcbiAgICByZXdpbmRTcGVlZDogMCxcbiAgICBhdXRvcGxheTogXCJwYXVzZVwiXG4gIH1cbn07XG5cbmZ1bmN0aW9uIEZhZGUoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTE1ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTE1Lm9uO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIG9uKFtFVkVOVF9NT1VOVEVELCBFVkVOVF9SRUZSRVNIXSwgZnVuY3Rpb24gKCkge1xuICAgICAgbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBDb21wb25lbnRzMi5TbGlkZXMuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwib3BhY2l0eSBcIiArIG9wdGlvbnMuc3BlZWQgKyBcIm1zIFwiICsgb3B0aW9ucy5lYXNpbmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydChpbmRleCwgZG9uZSkge1xuICAgIHZhciB0cmFjayA9IENvbXBvbmVudHMyLkVsZW1lbnRzLnRyYWNrO1xuICAgIHN0eWxlKHRyYWNrLCBcImhlaWdodFwiLCB1bml0KHJlY3QodHJhY2spLmhlaWdodCkpO1xuICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvbmUoKTtcbiAgICAgIHN0eWxlKHRyYWNrLCBcImhlaWdodFwiLCBcIlwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIHN0YXJ0OiBzdGFydCxcbiAgICBjYW5jZWw6IG5vb3BcbiAgfTtcbn1cblxuZnVuY3Rpb24gU2xpZGUoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTE2ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlMTYuYmluZDtcblxuICB2YXIgTW92ZSA9IENvbXBvbmVudHMyLk1vdmUsXG4gICAgICBDb250cm9sbGVyID0gQ29tcG9uZW50czIuQ29udHJvbGxlcixcbiAgICAgIFNjcm9sbCA9IENvbXBvbmVudHMyLlNjcm9sbDtcbiAgdmFyIGxpc3QgPSBDb21wb25lbnRzMi5FbGVtZW50cy5saXN0O1xuICB2YXIgdHJhbnNpdGlvbiA9IGFwcGx5KHN0eWxlLCBsaXN0LCBcInRyYW5zaXRpb25cIik7XG4gIHZhciBlbmRDYWxsYmFjaztcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBiaW5kKGxpc3QsIFwidHJhbnNpdGlvbmVuZFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUudGFyZ2V0ID09PSBsaXN0ICYmIGVuZENhbGxiYWNrKSB7XG4gICAgICAgIGNhbmNlbCgpO1xuICAgICAgICBlbmRDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQoaW5kZXgsIGRvbmUpIHtcbiAgICB2YXIgZGVzdGluYXRpb24gPSBNb3ZlLnRvUG9zaXRpb24oaW5kZXgsIHRydWUpO1xuICAgIHZhciBwb3NpdGlvbiA9IE1vdmUuZ2V0UG9zaXRpb24oKTtcbiAgICB2YXIgc3BlZWQgPSBnZXRTcGVlZChpbmRleCk7XG5cbiAgICBpZiAoYWJzKGRlc3RpbmF0aW9uIC0gcG9zaXRpb24pID49IDEgJiYgc3BlZWQgPj0gMSkge1xuICAgICAgaWYgKG9wdGlvbnMudXNlU2Nyb2xsKSB7XG4gICAgICAgIFNjcm9sbC5zY3JvbGwoZGVzdGluYXRpb24sIHNwZWVkLCBmYWxzZSwgZG9uZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2l0aW9uKFwidHJhbnNmb3JtIFwiICsgc3BlZWQgKyBcIm1zIFwiICsgb3B0aW9ucy5lYXNpbmcpO1xuICAgICAgICBNb3ZlLnRyYW5zbGF0ZShkZXN0aW5hdGlvbiwgdHJ1ZSk7XG4gICAgICAgIGVuZENhbGxiYWNrID0gZG9uZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgTW92ZS5qdW1wKGluZGV4KTtcbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgdHJhbnNpdGlvbihcIlwiKTtcbiAgICBTY3JvbGwuY2FuY2VsKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTcGVlZChpbmRleCkge1xuICAgIHZhciByZXdpbmRTcGVlZCA9IG9wdGlvbnMucmV3aW5kU3BlZWQ7XG5cbiAgICBpZiAoU3BsaWRlMi5pcyhTTElERSkgJiYgcmV3aW5kU3BlZWQpIHtcbiAgICAgIHZhciBwcmV2ID0gQ29udHJvbGxlci5nZXRJbmRleCh0cnVlKTtcbiAgICAgIHZhciBlbmQgPSBDb250cm9sbGVyLmdldEVuZCgpO1xuXG4gICAgICBpZiAocHJldiA9PT0gMCAmJiBpbmRleCA+PSBlbmQgfHwgcHJldiA+PSBlbmQgJiYgaW5kZXggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHJld2luZFNwZWVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zLnNwZWVkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgc3RhcnQ6IHN0YXJ0LFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59XG5cbnZhciBfU3BsaWRlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gX1NwbGlkZSh0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmV2ZW50ID0gRXZlbnRJbnRlcmZhY2UoKTtcbiAgICB0aGlzLkNvbXBvbmVudHMgPSB7fTtcbiAgICB0aGlzLnN0YXRlID0gU3RhdGUoQ1JFQVRFRCk7XG4gICAgdGhpcy5zcGxpZGVzID0gW107XG4gICAgdGhpcy5fbyA9IHt9O1xuICAgIHRoaXMuX0UgPSB7fTtcbiAgICB2YXIgcm9vdCA9IGlzU3RyaW5nKHRhcmdldCkgPyBxdWVyeShkb2N1bWVudCwgdGFyZ2V0KSA6IHRhcmdldDtcbiAgICBhc3NlcnQocm9vdCwgcm9vdCArIFwiIGlzIGludmFsaWQuXCIpO1xuICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgb3B0aW9ucyA9IG1lcmdlKHtcbiAgICAgIGxhYmVsOiBnZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9MQUJFTCkgfHwgXCJcIixcbiAgICAgIGxhYmVsbGVkYnk6IGdldEF0dHJpYnV0ZShyb290LCBBUklBX0xBQkVMTEVEQlkpIHx8IFwiXCJcbiAgICB9LCBERUZBVUxUUywgX1NwbGlkZS5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICB0cnkge1xuICAgICAgbWVyZ2Uob3B0aW9ucywgSlNPTi5wYXJzZShnZXRBdHRyaWJ1dGUocm9vdCwgREFUQV9BVFRSSUJVVEUpKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgYXNzZXJ0KGZhbHNlLCBcIkludmFsaWQgSlNPTlwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vID0gT2JqZWN0LmNyZWF0ZShtZXJnZSh7fSwgb3B0aW9ucykpO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IF9TcGxpZGUucHJvdG90eXBlO1xuXG4gIF9wcm90by5tb3VudCA9IGZ1bmN0aW9uIG1vdW50KEV4dGVuc2lvbnMsIFRyYW5zaXRpb24pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgQ29tcG9uZW50czIgPSB0aGlzLkNvbXBvbmVudHM7XG4gICAgYXNzZXJ0KHN0YXRlLmlzKFtDUkVBVEVELCBERVNUUk9ZRURdKSwgXCJBbHJlYWR5IG1vdW50ZWQhXCIpO1xuICAgIHN0YXRlLnNldChDUkVBVEVEKTtcbiAgICB0aGlzLl9DID0gQ29tcG9uZW50czI7XG4gICAgdGhpcy5fVCA9IFRyYW5zaXRpb24gfHwgdGhpcy5fVCB8fCAodGhpcy5pcyhGQURFKSA/IEZhZGUgOiBTbGlkZSk7XG4gICAgdGhpcy5fRSA9IEV4dGVuc2lvbnMgfHwgdGhpcy5fRTtcbiAgICB2YXIgQ29uc3RydWN0b3JzID0gYXNzaWduKHt9LCBDb21wb25lbnRDb25zdHJ1Y3RvcnMsIHRoaXMuX0UsIHtcbiAgICAgIFRyYW5zaXRpb246IHRoaXMuX1RcbiAgICB9KTtcbiAgICBmb3JPd24oQ29uc3RydWN0b3JzLCBmdW5jdGlvbiAoQ29tcG9uZW50LCBrZXkpIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBDb21wb25lbnQoX3RoaXMsIENvbXBvbmVudHMyLCBfdGhpcy5fbyk7XG4gICAgICBDb21wb25lbnRzMltrZXldID0gY29tcG9uZW50O1xuICAgICAgY29tcG9uZW50LnNldHVwICYmIGNvbXBvbmVudC5zZXR1cCgpO1xuICAgIH0pO1xuICAgIGZvck93bihDb21wb25lbnRzMiwgZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgICAgY29tcG9uZW50Lm1vdW50ICYmIGNvbXBvbmVudC5tb3VudCgpO1xuICAgIH0pO1xuICAgIHRoaXMuZW1pdChFVkVOVF9NT1VOVEVEKTtcbiAgICBhZGRDbGFzcyh0aGlzLnJvb3QsIENMQVNTX0lOSVRJQUxJWkVEKTtcbiAgICBzdGF0ZS5zZXQoSURMRSk7XG4gICAgdGhpcy5lbWl0KEVWRU5UX1JFQURZKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uc3luYyA9IGZ1bmN0aW9uIHN5bmMoc3BsaWRlKSB7XG4gICAgdGhpcy5zcGxpZGVzLnB1c2goe1xuICAgICAgc3BsaWRlOiBzcGxpZGVcbiAgICB9KTtcbiAgICBzcGxpZGUuc3BsaWRlcy5wdXNoKHtcbiAgICAgIHNwbGlkZTogdGhpcyxcbiAgICAgIGlzUGFyZW50OiB0cnVlXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pcyhJRExFKSkge1xuICAgICAgdGhpcy5fQy5TeW5jLnJlbW91bnQoKTtcblxuICAgICAgc3BsaWRlLkNvbXBvbmVudHMuU3luYy5yZW1vdW50KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmdvID0gZnVuY3Rpb24gZ28oY29udHJvbCkge1xuICAgIHRoaXMuX0MuQ29udHJvbGxlci5nbyhjb250cm9sKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50cywgY2FsbGJhY2spIHtcbiAgICB0aGlzLmV2ZW50Lm9uKGV2ZW50cywgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5vZmYgPSBmdW5jdGlvbiBvZmYoZXZlbnRzKSB7XG4gICAgdGhpcy5ldmVudC5vZmYoZXZlbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICB2YXIgX3RoaXMkZXZlbnQ7XG5cbiAgICAoX3RoaXMkZXZlbnQgPSB0aGlzLmV2ZW50KS5lbWl0LmFwcGx5KF90aGlzJGV2ZW50LCBbZXZlbnRdLmNvbmNhdChzbGljZShhcmd1bWVudHMsIDEpKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uYWRkID0gZnVuY3Rpb24gYWRkKHNsaWRlcywgaW5kZXgpIHtcbiAgICB0aGlzLl9DLlNsaWRlcy5hZGQoc2xpZGVzLCBpbmRleCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKG1hdGNoZXIpIHtcbiAgICB0aGlzLl9DLlNsaWRlcy5yZW1vdmUobWF0Y2hlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uaXMgPSBmdW5jdGlvbiBpcyh0eXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuX28udHlwZSA9PT0gdHlwZTtcbiAgfTtcblxuICBfcHJvdG8ucmVmcmVzaCA9IGZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gICAgdGhpcy5lbWl0KEVWRU5UX1JFRlJFU0gpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveShjb21wbGV0ZWx5KSB7XG4gICAgaWYgKGNvbXBsZXRlbHkgPT09IHZvaWQgMCkge1xuICAgICAgY29tcGxldGVseSA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudCxcbiAgICAgICAgc3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKHN0YXRlLmlzKENSRUFURUQpKSB7XG4gICAgICBFdmVudEludGVyZmFjZSh0aGlzKS5vbihFVkVOVF9SRUFEWSwgdGhpcy5kZXN0cm95LmJpbmQodGhpcywgY29tcGxldGVseSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JPd24odGhpcy5fQywgZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgICAgICBjb21wb25lbnQuZGVzdHJveSAmJiBjb21wb25lbnQuZGVzdHJveShjb21wbGV0ZWx5KTtcbiAgICAgIH0sIHRydWUpO1xuICAgICAgZXZlbnQuZW1pdChFVkVOVF9ERVNUUk9ZKTtcbiAgICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgICAgIGNvbXBsZXRlbHkgJiYgZW1wdHkodGhpcy5zcGxpZGVzKTtcbiAgICAgIHN0YXRlLnNldChERVNUUk9ZRUQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9jcmVhdGVDbGFzcyhfU3BsaWRlLCBbe1xuICAgIGtleTogXCJvcHRpb25zXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbztcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX0MuTWVkaWEuc2V0KG9wdGlvbnMsIHRydWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJsZW5ndGhcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9DLlNsaWRlcy5nZXRMZW5ndGgodHJ1ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluZGV4XCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fQy5Db250cm9sbGVyLmdldEluZGV4KCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIF9TcGxpZGU7XG59KCk7XG5cbnZhciBTcGxpZGUgPSBfU3BsaWRlO1xuU3BsaWRlLmRlZmF1bHRzID0ge307XG5TcGxpZGUuU1RBVEVTID0gU1RBVEVTO1xudmFyIENMQVNTX1JFTkRFUkVEID0gXCJpcy1yZW5kZXJlZFwiO1xudmFyIFJFTkRFUkVSX0RFRkFVTFRfQ09ORklHID0ge1xuICBsaXN0VGFnOiBcInVsXCIsXG4gIHNsaWRlVGFnOiBcImxpXCJcbn07XG5cbnZhciBTdHlsZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0eWxlKGlkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5zdHlsZXMgPSB7fTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHZhciBfcHJvdG8yID0gU3R5bGUucHJvdG90eXBlO1xuXG4gIF9wcm90bzIucnVsZSA9IGZ1bmN0aW9uIHJ1bGUoc2VsZWN0b3IsIHByb3AsIHZhbHVlLCBicmVha3BvaW50KSB7XG4gICAgYnJlYWtwb2ludCA9IGJyZWFrcG9pbnQgfHwgXCJkZWZhdWx0XCI7XG4gICAgdmFyIHNlbGVjdG9ycyA9IHRoaXMuc3R5bGVzW2JyZWFrcG9pbnRdID0gdGhpcy5zdHlsZXNbYnJlYWtwb2ludF0gfHwge307XG4gICAgdmFyIHN0eWxlcyA9IHNlbGVjdG9yc1tzZWxlY3Rvcl0gPSBzZWxlY3RvcnNbc2VsZWN0b3JdIHx8IHt9O1xuICAgIHN0eWxlc1twcm9wXSA9IHZhbHVlO1xuICB9O1xuXG4gIF9wcm90bzIuYnVpbGQgPSBmdW5jdGlvbiBidWlsZCgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBjc3MgPSBcIlwiO1xuXG4gICAgaWYgKHRoaXMuc3R5bGVzLmRlZmF1bHQpIHtcbiAgICAgIGNzcyArPSB0aGlzLmJ1aWxkU2VsZWN0b3JzKHRoaXMuc3R5bGVzLmRlZmF1bHQpO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHRoaXMuc3R5bGVzKS5zb3J0KGZ1bmN0aW9uIChuLCBtKSB7XG4gICAgICByZXR1cm4gX3RoaXMyLm9wdGlvbnMubWVkaWFRdWVyeSA9PT0gXCJtaW5cIiA/ICtuIC0gK20gOiArbSAtICtuO1xuICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGJyZWFrcG9pbnQpIHtcbiAgICAgIGlmIChicmVha3BvaW50ICE9PSBcImRlZmF1bHRcIikge1xuICAgICAgICBjc3MgKz0gXCJAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiBcIiArIGJyZWFrcG9pbnQgKyBcInB4KSB7XCI7XG4gICAgICAgIGNzcyArPSBfdGhpczIuYnVpbGRTZWxlY3RvcnMoX3RoaXMyLnN0eWxlc1ticmVha3BvaW50XSk7XG4gICAgICAgIGNzcyArPSBcIn1cIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY3NzO1xuICB9O1xuXG4gIF9wcm90bzIuYnVpbGRTZWxlY3RvcnMgPSBmdW5jdGlvbiBidWlsZFNlbGVjdG9ycyhzZWxlY3RvcnMpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHZhciBjc3MgPSBcIlwiO1xuICAgIGZvck93bihzZWxlY3RvcnMsIGZ1bmN0aW9uIChzdHlsZXMsIHNlbGVjdG9yKSB7XG4gICAgICBzZWxlY3RvciA9IChcIiNcIiArIF90aGlzMy5pZCArIFwiIFwiICsgc2VsZWN0b3IpLnRyaW0oKTtcbiAgICAgIGNzcyArPSBzZWxlY3RvciArIFwiIHtcIjtcbiAgICAgIGZvck93bihzdHlsZXMsIGZ1bmN0aW9uICh2YWx1ZSwgcHJvcCkge1xuICAgICAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDApIHtcbiAgICAgICAgICBjc3MgKz0gcHJvcCArIFwiOiBcIiArIHZhbHVlICsgXCI7XCI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY3NzICs9IFwifVwiO1xuICAgIH0pO1xuICAgIHJldHVybiBjc3M7XG4gIH07XG5cbiAgcmV0dXJuIFN0eWxlO1xufSgpO1xuXG52YXIgU3BsaWRlUmVuZGVyZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTcGxpZGVSZW5kZXJlcihjb250ZW50cywgb3B0aW9ucywgY29uZmlnLCBkZWZhdWx0cykge1xuICAgIHRoaXMuc2xpZGVzID0gW107XG4gICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgdGhpcy5icmVha3BvaW50cyA9IFtdO1xuICAgIG1lcmdlKERFRkFVTFRTLCBkZWZhdWx0cyB8fCB7fSk7XG4gICAgbWVyZ2UobWVyZ2UodGhpcy5vcHRpb25zLCBERUZBVUxUUyksIG9wdGlvbnMgfHwge30pO1xuICAgIHRoaXMuY29udGVudHMgPSBjb250ZW50cztcbiAgICB0aGlzLmNvbmZpZyA9IGFzc2lnbih7fSwgUkVOREVSRVJfREVGQVVMVF9DT05GSUcsIGNvbmZpZyB8fCB7fSk7XG4gICAgdGhpcy5pZCA9IHRoaXMuY29uZmlnLmlkIHx8IHVuaXF1ZUlkKFwic3BsaWRlXCIpO1xuICAgIHRoaXMuU3R5bGUgPSBuZXcgU3R5bGUodGhpcy5pZCwgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLkRpcmVjdGlvbiA9IERpcmVjdGlvbihudWxsLCBudWxsLCB0aGlzLm9wdGlvbnMpO1xuICAgIGFzc2VydCh0aGlzLmNvbnRlbnRzLmxlbmd0aCwgXCJQcm92aWRlIGF0IGxlYXN0IDEgY29udGVudC5cIik7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBTcGxpZGVSZW5kZXJlci5jbGVhbiA9IGZ1bmN0aW9uIGNsZWFuKHNwbGlkZSkge1xuICAgIHZhciBfRXZlbnRJbnRlcmZhY2UxNyA9IEV2ZW50SW50ZXJmYWNlKHNwbGlkZSksXG4gICAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMTcub247XG5cbiAgICB2YXIgcm9vdCA9IHNwbGlkZS5yb290O1xuICAgIHZhciBjbG9uZXMgPSBxdWVyeUFsbChyb290LCBcIi5cIiArIENMQVNTX0NMT05FKTtcbiAgICBvbihFVkVOVF9NT1VOVEVELCBmdW5jdGlvbiAoKSB7XG4gICAgICByZW1vdmUoY2hpbGQocm9vdCwgXCJzdHlsZVwiKSk7XG4gICAgfSk7XG4gICAgcmVtb3ZlKGNsb25lcyk7XG4gIH07XG5cbiAgdmFyIF9wcm90bzMgPSBTcGxpZGVSZW5kZXJlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMy5pbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB0aGlzLnBhcnNlQnJlYWtwb2ludHMoKTtcbiAgICB0aGlzLmluaXRTbGlkZXMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyUm9vdFN0eWxlcygpO1xuICAgIHRoaXMucmVnaXN0ZXJUcmFja1N0eWxlcygpO1xuICAgIHRoaXMucmVnaXN0ZXJTbGlkZVN0eWxlcygpO1xuICAgIHRoaXMucmVnaXN0ZXJMaXN0U3R5bGVzKCk7XG4gIH07XG5cbiAgX3Byb3RvMy5pbml0U2xpZGVzID0gZnVuY3Rpb24gaW5pdFNsaWRlcygpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHB1c2godGhpcy5zbGlkZXMsIHRoaXMuY29udGVudHMubWFwKGZ1bmN0aW9uIChjb250ZW50LCBpbmRleCkge1xuICAgICAgY29udGVudCA9IGlzU3RyaW5nKGNvbnRlbnQpID8ge1xuICAgICAgICBodG1sOiBjb250ZW50XG4gICAgICB9IDogY29udGVudDtcbiAgICAgIGNvbnRlbnQuc3R5bGVzID0gY29udGVudC5zdHlsZXMgfHwge307XG4gICAgICBjb250ZW50LmF0dHJzID0gY29udGVudC5hdHRycyB8fCB7fTtcblxuICAgICAgX3RoaXM0LmNvdmVyKGNvbnRlbnQpO1xuXG4gICAgICB2YXIgY2xhc3NlcyA9IF90aGlzNC5vcHRpb25zLmNsYXNzZXMuc2xpZGUgKyBcIiBcIiArIChpbmRleCA9PT0gMCA/IENMQVNTX0FDVElWRSA6IFwiXCIpO1xuICAgICAgYXNzaWduKGNvbnRlbnQuYXR0cnMsIHtcbiAgICAgICAgY2xhc3M6IChjbGFzc2VzICsgXCIgXCIgKyAoY29udGVudC5hdHRycy5jbGFzcyB8fCBcIlwiKSkudHJpbSgpLFxuICAgICAgICBzdHlsZTogX3RoaXM0LmJ1aWxkU3R5bGVzKGNvbnRlbnQuc3R5bGVzKVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KSk7XG5cbiAgICBpZiAodGhpcy5pc0xvb3AoKSkge1xuICAgICAgdGhpcy5nZW5lcmF0ZUNsb25lcyh0aGlzLnNsaWRlcyk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90bzMucmVnaXN0ZXJSb290U3R5bGVzID0gZnVuY3Rpb24gcmVnaXN0ZXJSb290U3R5bGVzKCkge1xuICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgdGhpcy5icmVha3BvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgdmFyIHdpZHRoID0gX3JlZjJbMF0sXG4gICAgICAgICAgb3B0aW9ucyA9IF9yZWYyWzFdO1xuXG4gICAgICBfdGhpczUuU3R5bGUucnVsZShcIiBcIiwgXCJtYXgtd2lkdGhcIiwgdW5pdChvcHRpb25zLndpZHRoKSwgd2lkdGgpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90bzMucmVnaXN0ZXJUcmFja1N0eWxlcyA9IGZ1bmN0aW9uIHJlZ2lzdGVyVHJhY2tTdHlsZXMoKSB7XG4gICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICB2YXIgU3R5bGUyID0gdGhpcy5TdHlsZTtcbiAgICB2YXIgc2VsZWN0b3IgPSBcIi5cIiArIENMQVNTX1RSQUNLO1xuICAgIHRoaXMuYnJlYWtwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjMpIHtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWYzWzBdLFxuICAgICAgICAgIG9wdGlvbnMgPSBfcmVmM1sxXTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBfdGhpczYucmVzb2x2ZShcInBhZGRpbmdMZWZ0XCIpLCBfdGhpczYuY3NzUGFkZGluZyhvcHRpb25zLCBmYWxzZSksIHdpZHRoKTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBfdGhpczYucmVzb2x2ZShcInBhZGRpbmdSaWdodFwiKSwgX3RoaXM2LmNzc1BhZGRpbmcob3B0aW9ucywgdHJ1ZSksIHdpZHRoKTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBcImhlaWdodFwiLCBfdGhpczYuY3NzVHJhY2tIZWlnaHQob3B0aW9ucyksIHdpZHRoKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8zLnJlZ2lzdGVyTGlzdFN0eWxlcyA9IGZ1bmN0aW9uIHJlZ2lzdGVyTGlzdFN0eWxlcygpIHtcbiAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgIHZhciBTdHlsZTIgPSB0aGlzLlN0eWxlO1xuICAgIHZhciBzZWxlY3RvciA9IFwiLlwiICsgQ0xBU1NfTElTVDtcbiAgICB0aGlzLmJyZWFrcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKF9yZWY0KSB7XG4gICAgICB2YXIgd2lkdGggPSBfcmVmNFswXSxcbiAgICAgICAgICBvcHRpb25zID0gX3JlZjRbMV07XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgXCJ0cmFuc2Zvcm1cIiwgX3RoaXM3LmJ1aWxkVHJhbnNsYXRlKG9wdGlvbnMpLCB3aWR0aCk7XG5cbiAgICAgIGlmICghX3RoaXM3LmNzc1NsaWRlSGVpZ2h0KG9wdGlvbnMpKSB7XG4gICAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBcImFzcGVjdC1yYXRpb1wiLCBfdGhpczcuY3NzQXNwZWN0UmF0aW8ob3B0aW9ucyksIHdpZHRoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8zLnJlZ2lzdGVyU2xpZGVTdHlsZXMgPSBmdW5jdGlvbiByZWdpc3RlclNsaWRlU3R5bGVzKCkge1xuICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgdmFyIFN0eWxlMiA9IHRoaXMuU3R5bGU7XG4gICAgdmFyIHNlbGVjdG9yID0gXCIuXCIgKyBDTEFTU19TTElERTtcbiAgICB0aGlzLmJyZWFrcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKF9yZWY1KSB7XG4gICAgICB2YXIgd2lkdGggPSBfcmVmNVswXSxcbiAgICAgICAgICBvcHRpb25zID0gX3JlZjVbMV07XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgXCJ3aWR0aFwiLCBfdGhpczguY3NzU2xpZGVXaWR0aChvcHRpb25zKSwgd2lkdGgpO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIFwiaGVpZ2h0XCIsIF90aGlzOC5jc3NTbGlkZUhlaWdodChvcHRpb25zKSB8fCBcIjEwMCVcIiwgd2lkdGgpO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIF90aGlzOC5yZXNvbHZlKFwibWFyZ2luUmlnaHRcIiksIHVuaXQob3B0aW9ucy5nYXApIHx8IFwiMHB4XCIsIHdpZHRoKTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yICsgXCIgPiBpbWdcIiwgXCJkaXNwbGF5XCIsIG9wdGlvbnMuY292ZXIgPyBcIm5vbmVcIiA6IFwiaW5saW5lXCIsIHdpZHRoKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8zLmJ1aWxkVHJhbnNsYXRlID0gZnVuY3Rpb24gYnVpbGRUcmFuc2xhdGUob3B0aW9ucykge1xuICAgIHZhciBfdGhpcyREaXJlY3Rpb24gPSB0aGlzLkRpcmVjdGlvbixcbiAgICAgICAgcmVzb2x2ZSA9IF90aGlzJERpcmVjdGlvbi5yZXNvbHZlLFxuICAgICAgICBvcmllbnQgPSBfdGhpcyREaXJlY3Rpb24ub3JpZW50O1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICB2YWx1ZXMucHVzaCh0aGlzLmNzc09mZnNldENsb25lcyhvcHRpb25zKSk7XG4gICAgdmFsdWVzLnB1c2godGhpcy5jc3NPZmZzZXRHYXBzKG9wdGlvbnMpKTtcblxuICAgIGlmICh0aGlzLmlzQ2VudGVyKG9wdGlvbnMpKSB7XG4gICAgICB2YWx1ZXMucHVzaCh0aGlzLmJ1aWxkQ3NzVmFsdWUob3JpZW50KC01MCksIFwiJVwiKSk7XG4gICAgICB2YWx1ZXMucHVzaC5hcHBseSh2YWx1ZXMsIHRoaXMuY3NzT2Zmc2V0Q2VudGVyKG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzLmZpbHRlcihCb29sZWFuKS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gXCJ0cmFuc2xhdGVcIiArIHJlc29sdmUoXCJYXCIpICsgXCIoXCIgKyB2YWx1ZSArIFwiKVwiO1xuICAgIH0pLmpvaW4oXCIgXCIpO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzT2Zmc2V0Q2xvbmVzID0gZnVuY3Rpb24gY3NzT2Zmc2V0Q2xvbmVzKG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMkRGlyZWN0aW9uMiA9IHRoaXMuRGlyZWN0aW9uLFxuICAgICAgICByZXNvbHZlID0gX3RoaXMkRGlyZWN0aW9uMi5yZXNvbHZlLFxuICAgICAgICBvcmllbnQgPSBfdGhpcyREaXJlY3Rpb24yLm9yaWVudDtcbiAgICB2YXIgY2xvbmVDb3VudCA9IHRoaXMuZ2V0Q2xvbmVDb3VudCgpO1xuXG4gICAgaWYgKHRoaXMuaXNGaXhlZFdpZHRoKG9wdGlvbnMpKSB7XG4gICAgICB2YXIgX3RoaXMkcGFyc2VDc3NWYWx1ZSA9IHRoaXMucGFyc2VDc3NWYWx1ZShvcHRpb25zW3Jlc29sdmUoXCJmaXhlZFdpZHRoXCIpXSksXG4gICAgICAgICAgdmFsdWUgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlLnZhbHVlLFxuICAgICAgICAgIHVuaXQyID0gX3RoaXMkcGFyc2VDc3NWYWx1ZS51bml0O1xuXG4gICAgICByZXR1cm4gdGhpcy5idWlsZENzc1ZhbHVlKG9yaWVudCh2YWx1ZSkgKiBjbG9uZUNvdW50LCB1bml0Mik7XG4gICAgfVxuXG4gICAgdmFyIHBlcmNlbnQgPSAxMDAgKiBjbG9uZUNvdW50IC8gb3B0aW9ucy5wZXJQYWdlO1xuICAgIHJldHVybiBvcmllbnQocGVyY2VudCkgKyBcIiVcIjtcbiAgfTtcblxuICBfcHJvdG8zLmNzc09mZnNldENlbnRlciA9IGZ1bmN0aW9uIGNzc09mZnNldENlbnRlcihvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzJERpcmVjdGlvbjMgPSB0aGlzLkRpcmVjdGlvbixcbiAgICAgICAgcmVzb2x2ZSA9IF90aGlzJERpcmVjdGlvbjMucmVzb2x2ZSxcbiAgICAgICAgb3JpZW50ID0gX3RoaXMkRGlyZWN0aW9uMy5vcmllbnQ7XG5cbiAgICBpZiAodGhpcy5pc0ZpeGVkV2lkdGgob3B0aW9ucykpIHtcbiAgICAgIHZhciBfdGhpcyRwYXJzZUNzc1ZhbHVlMiA9IHRoaXMucGFyc2VDc3NWYWx1ZShvcHRpb25zW3Jlc29sdmUoXCJmaXhlZFdpZHRoXCIpXSksXG4gICAgICAgICAgdmFsdWUgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlMi52YWx1ZSxcbiAgICAgICAgICB1bml0MiA9IF90aGlzJHBhcnNlQ3NzVmFsdWUyLnVuaXQ7XG5cbiAgICAgIHJldHVybiBbdGhpcy5idWlsZENzc1ZhbHVlKG9yaWVudCh2YWx1ZSAvIDIpLCB1bml0MildO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICB2YXIgcGVyUGFnZSA9IG9wdGlvbnMucGVyUGFnZSxcbiAgICAgICAgZ2FwID0gb3B0aW9ucy5nYXA7XG4gICAgdmFsdWVzLnB1c2gob3JpZW50KDUwIC8gcGVyUGFnZSkgKyBcIiVcIik7XG5cbiAgICBpZiAoZ2FwKSB7XG4gICAgICB2YXIgX3RoaXMkcGFyc2VDc3NWYWx1ZTMgPSB0aGlzLnBhcnNlQ3NzVmFsdWUoZ2FwKSxcbiAgICAgICAgICBfdmFsdWUgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlMy52YWx1ZSxcbiAgICAgICAgICBfdW5pdCA9IF90aGlzJHBhcnNlQ3NzVmFsdWUzLnVuaXQ7XG5cbiAgICAgIHZhciBnYXBPZmZzZXQgPSAoX3ZhbHVlIC8gcGVyUGFnZSAtIF92YWx1ZSkgLyAyO1xuICAgICAgdmFsdWVzLnB1c2godGhpcy5idWlsZENzc1ZhbHVlKG9yaWVudChnYXBPZmZzZXQpLCBfdW5pdCkpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NPZmZzZXRHYXBzID0gZnVuY3Rpb24gY3NzT2Zmc2V0R2FwcyhvcHRpb25zKSB7XG4gICAgdmFyIGNsb25lQ291bnQgPSB0aGlzLmdldENsb25lQ291bnQoKTtcblxuICAgIGlmIChjbG9uZUNvdW50ICYmIG9wdGlvbnMuZ2FwKSB7XG4gICAgICB2YXIgb3JpZW50ID0gdGhpcy5EaXJlY3Rpb24ub3JpZW50O1xuXG4gICAgICB2YXIgX3RoaXMkcGFyc2VDc3NWYWx1ZTQgPSB0aGlzLnBhcnNlQ3NzVmFsdWUob3B0aW9ucy5nYXApLFxuICAgICAgICAgIHZhbHVlID0gX3RoaXMkcGFyc2VDc3NWYWx1ZTQudmFsdWUsXG4gICAgICAgICAgdW5pdDIgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlNC51bml0O1xuXG4gICAgICBpZiAodGhpcy5pc0ZpeGVkV2lkdGgob3B0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRDc3NWYWx1ZShvcmllbnQodmFsdWUgKiBjbG9uZUNvdW50KSwgdW5pdDIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGVyUGFnZSA9IG9wdGlvbnMucGVyUGFnZTtcbiAgICAgIHZhciBnYXBzID0gY2xvbmVDb3VudCAvIHBlclBhZ2U7XG4gICAgICByZXR1cm4gdGhpcy5idWlsZENzc1ZhbHVlKG9yaWVudChnYXBzICogdmFsdWUpLCB1bml0Mik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFwiXCI7XG4gIH07XG5cbiAgX3Byb3RvMy5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZShwcm9wKSB7XG4gICAgcmV0dXJuIGNhbWVsVG9LZWJhYih0aGlzLkRpcmVjdGlvbi5yZXNvbHZlKHByb3ApKTtcbiAgfTtcblxuICBfcHJvdG8zLmNzc1BhZGRpbmcgPSBmdW5jdGlvbiBjc3NQYWRkaW5nKG9wdGlvbnMsIHJpZ2h0KSB7XG4gICAgdmFyIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmc7XG4gICAgdmFyIHByb3AgPSB0aGlzLkRpcmVjdGlvbi5yZXNvbHZlKHJpZ2h0ID8gXCJyaWdodFwiIDogXCJsZWZ0XCIsIHRydWUpO1xuICAgIHJldHVybiBwYWRkaW5nICYmIHVuaXQocGFkZGluZ1twcm9wXSB8fCAoaXNPYmplY3QocGFkZGluZykgPyAwIDogcGFkZGluZykpIHx8IFwiMHB4XCI7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NUcmFja0hlaWdodCA9IGZ1bmN0aW9uIGNzc1RyYWNrSGVpZ2h0KG9wdGlvbnMpIHtcbiAgICB2YXIgaGVpZ2h0ID0gXCJcIjtcblxuICAgIGlmICh0aGlzLmlzVmVydGljYWwoKSkge1xuICAgICAgaGVpZ2h0ID0gdGhpcy5jc3NIZWlnaHQob3B0aW9ucyk7XG4gICAgICBhc3NlcnQoaGVpZ2h0LCAnXCJoZWlnaHRcIiBpcyBtaXNzaW5nLicpO1xuICAgICAgaGVpZ2h0ID0gXCJjYWxjKFwiICsgaGVpZ2h0ICsgXCIgLSBcIiArIHRoaXMuY3NzUGFkZGluZyhvcHRpb25zLCBmYWxzZSkgKyBcIiAtIFwiICsgdGhpcy5jc3NQYWRkaW5nKG9wdGlvbnMsIHRydWUpICsgXCIpXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfTtcblxuICBfcHJvdG8zLmNzc0hlaWdodCA9IGZ1bmN0aW9uIGNzc0hlaWdodChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHVuaXQob3B0aW9ucy5oZWlnaHQpO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzU2xpZGVXaWR0aCA9IGZ1bmN0aW9uIGNzc1NsaWRlV2lkdGgob3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmF1dG9XaWR0aCA/IFwiXCIgOiB1bml0KG9wdGlvbnMuZml4ZWRXaWR0aCkgfHwgKHRoaXMuaXNWZXJ0aWNhbCgpID8gXCJcIiA6IHRoaXMuY3NzU2xpZGVTaXplKG9wdGlvbnMpKTtcbiAgfTtcblxuICBfcHJvdG8zLmNzc1NsaWRlSGVpZ2h0ID0gZnVuY3Rpb24gY3NzU2xpZGVIZWlnaHQob3B0aW9ucykge1xuICAgIHJldHVybiB1bml0KG9wdGlvbnMuZml4ZWRIZWlnaHQpIHx8ICh0aGlzLmlzVmVydGljYWwoKSA/IG9wdGlvbnMuYXV0b0hlaWdodCA/IFwiXCIgOiB0aGlzLmNzc1NsaWRlU2l6ZShvcHRpb25zKSA6IHRoaXMuY3NzSGVpZ2h0KG9wdGlvbnMpKTtcbiAgfTtcblxuICBfcHJvdG8zLmNzc1NsaWRlU2l6ZSA9IGZ1bmN0aW9uIGNzc1NsaWRlU2l6ZShvcHRpb25zKSB7XG4gICAgdmFyIGdhcCA9IHVuaXQob3B0aW9ucy5nYXApO1xuICAgIHJldHVybiBcImNhbGMoKDEwMCVcIiArIChnYXAgJiYgXCIgKyBcIiArIGdhcCkgKyBcIikvXCIgKyAob3B0aW9ucy5wZXJQYWdlIHx8IDEpICsgKGdhcCAmJiBcIiAtIFwiICsgZ2FwKSArIFwiKVwiO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzQXNwZWN0UmF0aW8gPSBmdW5jdGlvbiBjc3NBc3BlY3RSYXRpbyhvcHRpb25zKSB7XG4gICAgdmFyIGhlaWdodFJhdGlvID0gb3B0aW9ucy5oZWlnaHRSYXRpbztcbiAgICByZXR1cm4gaGVpZ2h0UmF0aW8gPyBcIlwiICsgMSAvIGhlaWdodFJhdGlvIDogXCJcIjtcbiAgfTtcblxuICBfcHJvdG8zLmJ1aWxkQ3NzVmFsdWUgPSBmdW5jdGlvbiBidWlsZENzc1ZhbHVlKHZhbHVlLCB1bml0Mikge1xuICAgIHJldHVybiBcIlwiICsgdmFsdWUgKyB1bml0MjtcbiAgfTtcblxuICBfcHJvdG8zLnBhcnNlQ3NzVmFsdWUgPSBmdW5jdGlvbiBwYXJzZUNzc1ZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgdmFyIG51bWJlciA9IHBhcnNlRmxvYXQodmFsdWUpIHx8IDA7XG4gICAgICB2YXIgdW5pdDIgPSB2YWx1ZS5yZXBsYWNlKC9cXGQqKFxcLlxcZCopPy8sIFwiXCIpIHx8IFwicHhcIjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBudW1iZXIsXG4gICAgICAgIHVuaXQ6IHVuaXQyXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICB1bml0OiBcInB4XCJcbiAgICB9O1xuICB9O1xuXG4gIF9wcm90bzMucGFyc2VCcmVha3BvaW50cyA9IGZ1bmN0aW9uIHBhcnNlQnJlYWtwb2ludHMoKSB7XG4gICAgdmFyIF90aGlzOSA9IHRoaXM7XG5cbiAgICB2YXIgYnJlYWtwb2ludHMgPSB0aGlzLm9wdGlvbnMuYnJlYWtwb2ludHM7XG4gICAgdGhpcy5icmVha3BvaW50cy5wdXNoKFtcImRlZmF1bHRcIiwgdGhpcy5vcHRpb25zXSk7XG5cbiAgICBpZiAoYnJlYWtwb2ludHMpIHtcbiAgICAgIGZvck93bihicmVha3BvaW50cywgZnVuY3Rpb24gKG9wdGlvbnMsIHdpZHRoKSB7XG4gICAgICAgIF90aGlzOS5icmVha3BvaW50cy5wdXNoKFt3aWR0aCwgbWVyZ2UobWVyZ2Uoe30sIF90aGlzOS5vcHRpb25zKSwgb3B0aW9ucyldKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8zLmlzRml4ZWRXaWR0aCA9IGZ1bmN0aW9uIGlzRml4ZWRXaWR0aChvcHRpb25zKSB7XG4gICAgcmV0dXJuICEhb3B0aW9uc1t0aGlzLkRpcmVjdGlvbi5yZXNvbHZlKFwiZml4ZWRXaWR0aFwiKV07XG4gIH07XG5cbiAgX3Byb3RvMy5pc0xvb3AgPSBmdW5jdGlvbiBpc0xvb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50eXBlID09PSBMT09QO1xuICB9O1xuXG4gIF9wcm90bzMuaXNDZW50ZXIgPSBmdW5jdGlvbiBpc0NlbnRlcihvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuZm9jdXMgPT09IFwiY2VudGVyXCIpIHtcbiAgICAgIGlmICh0aGlzLmlzTG9vcCgpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnR5cGUgPT09IFNMSURFKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5vcHRpb25zLnRyaW1TcGFjZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgX3Byb3RvMy5pc1ZlcnRpY2FsID0gZnVuY3Rpb24gaXNWZXJ0aWNhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gVFRCO1xuICB9O1xuXG4gIF9wcm90bzMuYnVpbGRDbGFzc2VzID0gZnVuY3Rpb24gYnVpbGRDbGFzc2VzKCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHJldHVybiBbQ0xBU1NfUk9PVCwgQ0xBU1NfUk9PVCArIFwiLS1cIiArIG9wdGlvbnMudHlwZSwgQ0xBU1NfUk9PVCArIFwiLS1cIiArIG9wdGlvbnMuZGlyZWN0aW9uLCBvcHRpb25zLmRyYWcgJiYgQ0xBU1NfUk9PVCArIFwiLS1kcmFnZ2FibGVcIiwgb3B0aW9ucy5pc05hdmlnYXRpb24gJiYgQ0xBU1NfUk9PVCArIFwiLS1uYXZcIiwgQ0xBU1NfQUNUSVZFLCAhdGhpcy5jb25maWcuaGlkZGVuICYmIENMQVNTX1JFTkRFUkVEXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XG4gIH07XG5cbiAgX3Byb3RvMy5idWlsZEF0dHJzID0gZnVuY3Rpb24gYnVpbGRBdHRycyhhdHRycykge1xuICAgIHZhciBhdHRyID0gXCJcIjtcbiAgICBmb3JPd24oYXR0cnMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBhdHRyICs9IHZhbHVlID8gXCIgXCIgKyBjYW1lbFRvS2ViYWIoa2V5KSArIFwiPVxcXCJcIiArIHZhbHVlICsgXCJcXFwiXCIgOiBcIlwiO1xuICAgIH0pO1xuICAgIHJldHVybiBhdHRyLnRyaW0oKTtcbiAgfTtcblxuICBfcHJvdG8zLmJ1aWxkU3R5bGVzID0gZnVuY3Rpb24gYnVpbGRTdHlsZXMoc3R5bGVzKSB7XG4gICAgdmFyIHN0eWxlID0gXCJcIjtcbiAgICBmb3JPd24oc3R5bGVzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgc3R5bGUgKz0gXCIgXCIgKyBjYW1lbFRvS2ViYWIoa2V5KSArIFwiOlwiICsgdmFsdWUgKyBcIjtcIjtcbiAgICB9KTtcbiAgICByZXR1cm4gc3R5bGUudHJpbSgpO1xuICB9O1xuXG4gIF9wcm90bzMucmVuZGVyU2xpZGVzID0gZnVuY3Rpb24gcmVuZGVyU2xpZGVzKCkge1xuICAgIHZhciBfdGhpczEwID0gdGhpcztcblxuICAgIHZhciB0YWcgPSB0aGlzLmNvbmZpZy5zbGlkZVRhZztcbiAgICByZXR1cm4gdGhpcy5zbGlkZXMubWFwKGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICByZXR1cm4gXCI8XCIgKyB0YWcgKyBcIiBcIiArIF90aGlzMTAuYnVpbGRBdHRycyhjb250ZW50LmF0dHJzKSArIFwiPlwiICsgKGNvbnRlbnQuaHRtbCB8fCBcIlwiKSArIFwiPC9cIiArIHRhZyArIFwiPlwiO1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgX3Byb3RvMy5jb3ZlciA9IGZ1bmN0aW9uIGNvdmVyKGNvbnRlbnQpIHtcbiAgICB2YXIgc3R5bGVzID0gY29udGVudC5zdHlsZXMsXG4gICAgICAgIF9jb250ZW50JGh0bWwgPSBjb250ZW50Lmh0bWwsXG4gICAgICAgIGh0bWwgPSBfY29udGVudCRodG1sID09PSB2b2lkIDAgPyBcIlwiIDogX2NvbnRlbnQkaHRtbDtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY292ZXIgJiYgIXRoaXMub3B0aW9ucy5sYXp5TG9hZCkge1xuICAgICAgdmFyIHNyYyA9IGh0bWwubWF0Y2goLzxpbWcuKj9zcmNcXHMqPVxccyooWydcIl0pKC4rPylcXDEuKj8+Lyk7XG5cbiAgICAgIGlmIChzcmMgJiYgc3JjWzJdKSB7XG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gXCJjZW50ZXIvY292ZXIgbm8tcmVwZWF0IHVybCgnXCIgKyBzcmNbMl0gKyBcIicpXCI7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9wcm90bzMuZ2VuZXJhdGVDbG9uZXMgPSBmdW5jdGlvbiBnZW5lcmF0ZUNsb25lcyhjb250ZW50cykge1xuICAgIHZhciBjbGFzc2VzID0gdGhpcy5vcHRpb25zLmNsYXNzZXM7XG4gICAgdmFyIGNvdW50ID0gdGhpcy5nZXRDbG9uZUNvdW50KCk7XG4gICAgdmFyIHNsaWRlcyA9IGNvbnRlbnRzLnNsaWNlKCk7XG5cbiAgICB3aGlsZSAoc2xpZGVzLmxlbmd0aCA8IGNvdW50KSB7XG4gICAgICBwdXNoKHNsaWRlcywgc2xpZGVzKTtcbiAgICB9XG5cbiAgICBwdXNoKHNsaWRlcy5zbGljZSgtY291bnQpLnJldmVyc2UoKSwgc2xpZGVzLnNsaWNlKDAsIGNvdW50KSkuZm9yRWFjaChmdW5jdGlvbiAoY29udGVudCwgaW5kZXgpIHtcbiAgICAgIHZhciBhdHRycyA9IGFzc2lnbih7fSwgY29udGVudC5hdHRycywge1xuICAgICAgICBjbGFzczogY29udGVudC5hdHRycy5jbGFzcyArIFwiIFwiICsgY2xhc3Nlcy5jbG9uZVxuICAgICAgfSk7XG4gICAgICB2YXIgY2xvbmUgPSBhc3NpZ24oe30sIGNvbnRlbnQsIHtcbiAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICB9KTtcbiAgICAgIGluZGV4IDwgY291bnQgPyBjb250ZW50cy51bnNoaWZ0KGNsb25lKSA6IGNvbnRlbnRzLnB1c2goY2xvbmUpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90bzMuZ2V0Q2xvbmVDb3VudCA9IGZ1bmN0aW9uIGdldENsb25lQ291bnQoKSB7XG4gICAgaWYgKHRoaXMuaXNMb29wKCkpIHtcbiAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gICAgICBpZiAob3B0aW9ucy5jbG9uZXMpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuY2xvbmVzO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGVyUGFnZSA9IG1heC5hcHBseSh2b2lkIDAsIHRoaXMuYnJlYWtwb2ludHMubWFwKGZ1bmN0aW9uIChfcmVmNikge1xuICAgICAgICB2YXIgb3B0aW9uczIgPSBfcmVmNlsxXTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMyLnBlclBhZ2U7XG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gcGVyUGFnZSAqICgob3B0aW9ucy5mbGlja01heFBhZ2VzIHx8IDEpICsgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH07XG5cbiAgX3Byb3RvMy5yZW5kZXJBcnJvd3MgPSBmdW5jdGlvbiByZW5kZXJBcnJvd3MoKSB7XG4gICAgdmFyIGh0bWwgPSBcIlwiO1xuICAgIGh0bWwgKz0gXCI8ZGl2IGNsYXNzPVxcXCJcIiArIHRoaXMub3B0aW9ucy5jbGFzc2VzLmFycm93cyArIFwiXFxcIj5cIjtcbiAgICBodG1sICs9IHRoaXMucmVuZGVyQXJyb3codHJ1ZSk7XG4gICAgaHRtbCArPSB0aGlzLnJlbmRlckFycm93KGZhbHNlKTtcbiAgICBodG1sICs9IFwiPC9kaXY+XCI7XG4gICAgcmV0dXJuIGh0bWw7XG4gIH07XG5cbiAgX3Byb3RvMy5yZW5kZXJBcnJvdyA9IGZ1bmN0aW9uIHJlbmRlckFycm93KHByZXYpIHtcbiAgICB2YXIgX3RoaXMkb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgY2xhc3NlcyA9IF90aGlzJG9wdGlvbnMuY2xhc3NlcyxcbiAgICAgICAgaTE4biA9IF90aGlzJG9wdGlvbnMuaTE4bjtcbiAgICB2YXIgYXR0cnMgPSB7XG4gICAgICBjbGFzczogY2xhc3Nlcy5hcnJvdyArIFwiIFwiICsgKHByZXYgPyBjbGFzc2VzLnByZXYgOiBjbGFzc2VzLm5leHQpLFxuICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgIGFyaWFMYWJlbDogcHJldiA/IGkxOG4ucHJldiA6IGkxOG4ubmV4dFxuICAgIH07XG4gICAgcmV0dXJuIFwiPGJ1dHRvbiBcIiArIHRoaXMuYnVpbGRBdHRycyhhdHRycykgKyBcIj48c3ZnIHhtbG5zPVxcXCJcIiArIFhNTF9OQU1FX1NQQUNFICsgXCJcXFwiIHZpZXdCb3g9XFxcIjAgMCBcIiArIFNJWkUgKyBcIiBcIiArIFNJWkUgKyBcIlxcXCIgd2lkdGg9XFxcIlwiICsgU0laRSArIFwiXFxcIiBoZWlnaHQ9XFxcIlwiICsgU0laRSArIFwiXFxcIj48cGF0aCBkPVxcXCJcIiArICh0aGlzLm9wdGlvbnMuYXJyb3dQYXRoIHx8IFBBVEgpICsgXCJcXFwiIC8+PC9zdmc+PC9idXR0b24+XCI7XG4gIH07XG5cbiAgX3Byb3RvMy5odG1sID0gZnVuY3Rpb24gaHRtbCgpIHtcbiAgICB2YXIgX3RoaXMkY29uZmlnID0gdGhpcy5jb25maWcsXG4gICAgICAgIHJvb3RDbGFzcyA9IF90aGlzJGNvbmZpZy5yb290Q2xhc3MsXG4gICAgICAgIGxpc3RUYWcgPSBfdGhpcyRjb25maWcubGlzdFRhZyxcbiAgICAgICAgYXJyb3dzID0gX3RoaXMkY29uZmlnLmFycm93cyxcbiAgICAgICAgYmVmb3JlVHJhY2sgPSBfdGhpcyRjb25maWcuYmVmb3JlVHJhY2ssXG4gICAgICAgIGFmdGVyVHJhY2sgPSBfdGhpcyRjb25maWcuYWZ0ZXJUcmFjayxcbiAgICAgICAgc2xpZGVyID0gX3RoaXMkY29uZmlnLnNsaWRlcixcbiAgICAgICAgYmVmb3JlU2xpZGVyID0gX3RoaXMkY29uZmlnLmJlZm9yZVNsaWRlcixcbiAgICAgICAgYWZ0ZXJTbGlkZXIgPSBfdGhpcyRjb25maWcuYWZ0ZXJTbGlkZXI7XG4gICAgdmFyIGh0bWwgPSBcIlwiO1xuICAgIGh0bWwgKz0gXCI8ZGl2IGlkPVxcXCJcIiArIHRoaXMuaWQgKyBcIlxcXCIgY2xhc3M9XFxcIlwiICsgdGhpcy5idWlsZENsYXNzZXMoKSArIFwiIFwiICsgKHJvb3RDbGFzcyB8fCBcIlwiKSArIFwiXFxcIj5cIjtcbiAgICBodG1sICs9IFwiPHN0eWxlPlwiICsgdGhpcy5TdHlsZS5idWlsZCgpICsgXCI8L3N0eWxlPlwiO1xuXG4gICAgaWYgKHNsaWRlcikge1xuICAgICAgaHRtbCArPSBiZWZvcmVTbGlkZXIgfHwgXCJcIjtcbiAgICAgIGh0bWwgKz0gXCI8ZGl2IGNsYXNzPVxcXCJzcGxpZGVfX3NsaWRlclxcXCI+XCI7XG4gICAgfVxuXG4gICAgaHRtbCArPSBiZWZvcmVUcmFjayB8fCBcIlwiO1xuXG4gICAgaWYgKGFycm93cykge1xuICAgICAgaHRtbCArPSB0aGlzLnJlbmRlckFycm93cygpO1xuICAgIH1cblxuICAgIGh0bWwgKz0gXCI8ZGl2IGNsYXNzPVxcXCJzcGxpZGVfX3RyYWNrXFxcIj5cIjtcbiAgICBodG1sICs9IFwiPFwiICsgbGlzdFRhZyArIFwiIGNsYXNzPVxcXCJzcGxpZGVfX2xpc3RcXFwiPlwiO1xuICAgIGh0bWwgKz0gdGhpcy5yZW5kZXJTbGlkZXMoKTtcbiAgICBodG1sICs9IFwiPC9cIiArIGxpc3RUYWcgKyBcIj5cIjtcbiAgICBodG1sICs9IFwiPC9kaXY+XCI7XG4gICAgaHRtbCArPSBhZnRlclRyYWNrIHx8IFwiXCI7XG5cbiAgICBpZiAoc2xpZGVyKSB7XG4gICAgICBodG1sICs9IFwiPC9kaXY+XCI7XG4gICAgICBodG1sICs9IGFmdGVyU2xpZGVyIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgaHRtbCArPSBcIjwvZGl2PlwiO1xuICAgIHJldHVybiBodG1sO1xuICB9O1xuXG4gIHJldHVybiBTcGxpZGVSZW5kZXJlcjtcbn0oKTtcblxuZXhwb3J0IHsgQ0xBU1NFUywgQ0xBU1NfQUNUSVZFLCBDTEFTU19BUlJPVywgQ0xBU1NfQVJST1dTLCBDTEFTU19BUlJPV19ORVhULCBDTEFTU19BUlJPV19QUkVWLCBDTEFTU19DTE9ORSwgQ0xBU1NfQ09OVEFJTkVSLCBDTEFTU19GT0NVU19JTiwgQ0xBU1NfSU5JVElBTElaRUQsIENMQVNTX0xJU1QsIENMQVNTX0xPQURJTkcsIENMQVNTX05FWFQsIENMQVNTX1BBR0lOQVRJT04sIENMQVNTX1BBR0lOQVRJT05fUEFHRSwgQ0xBU1NfUFJFViwgQ0xBU1NfUFJPR1JFU1MsIENMQVNTX1BST0dSRVNTX0JBUiwgQ0xBU1NfUk9PVCwgQ0xBU1NfU0xJREUsIENMQVNTX1NQSU5ORVIsIENMQVNTX1NSLCBDTEFTU19UT0dHTEUsIENMQVNTX1RPR0dMRV9QQVVTRSwgQ0xBU1NfVE9HR0xFX1BMQVksIENMQVNTX1RSQUNLLCBDTEFTU19WSVNJQkxFLCBERUZBVUxUUywgRVZFTlRfQUNUSVZFLCBFVkVOVF9BUlJPV1NfTU9VTlRFRCwgRVZFTlRfQVJST1dTX1VQREFURUQsIEVWRU5UX0FVVE9QTEFZX1BBVVNFLCBFVkVOVF9BVVRPUExBWV9QTEFZLCBFVkVOVF9BVVRPUExBWV9QTEFZSU5HLCBFVkVOVF9DTElDSywgRVZFTlRfREVTVFJPWSwgRVZFTlRfRFJBRywgRVZFTlRfRFJBR0dFRCwgRVZFTlRfRFJBR0dJTkcsIEVWRU5UX0hJRERFTiwgRVZFTlRfSU5BQ1RJVkUsIEVWRU5UX0xBWllMT0FEX0xPQURFRCwgRVZFTlRfTU9VTlRFRCwgRVZFTlRfTU9WRSwgRVZFTlRfTU9WRUQsIEVWRU5UX05BVklHQVRJT05fTU9VTlRFRCwgRVZFTlRfUEFHSU5BVElPTl9NT1VOVEVELCBFVkVOVF9QQUdJTkFUSU9OX1VQREFURUQsIEVWRU5UX1JFQURZLCBFVkVOVF9SRUZSRVNILCBFVkVOVF9SRVNJWkUsIEVWRU5UX1JFU0laRUQsIEVWRU5UX1NDUk9MTCwgRVZFTlRfU0NST0xMRUQsIEVWRU5UX1NISUZURUQsIEVWRU5UX1NMSURFX0tFWURPV04sIEVWRU5UX1VQREFURUQsIEVWRU5UX1ZJU0lCTEUsIEV2ZW50QmluZGVyLCBFdmVudEludGVyZmFjZSwgRkFERSwgTE9PUCwgTFRSLCBSVEwsIFJlcXVlc3RJbnRlcnZhbCwgU0xJREUsIFNUQVRVU19DTEFTU0VTLCBTcGxpZGUsIFNwbGlkZVJlbmRlcmVyLCBTdGF0ZSwgVFRCLCBUaHJvdHRsZSwgU3BsaWRlIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBTcGxpZGUgZnJvbSAnQHNwbGlkZWpzL3NwbGlkZSc7XHJcblxyXG5jb25zdCBFTCA9ICcuanMtc2hvdydcclxuY29uc3QgQUNUSVZFX0NMQVNTID0gJ2lzLWFjdGl2ZSdcclxuXHJcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKEVMKSkge1xyXG4gIGNvbnN0IHNsaWRlciA9IG5ldyBTcGxpZGUoIEVMLCB7XHJcbiAgICB0eXBlOiAnZmFkZScsXHJcbiAgICByZXdpbmQ6IHRydWUsXHJcbiAgICBwZXJQYWdlOiAxLFxyXG4gICAgcGFnaW5hdGlvbjogdHJ1ZSxcclxuICAgIGFycm93czogdHJ1ZSxcclxuICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgaW50ZXJ2YWw6IDkwMDAsXHJcbiAgICBzcGVlZDogMTAwMCxcclxuICAgIHBhdXNlT25Gb2N1czogZmFsc2UsXHJcbiAgICBwYXVzZU9uSG92ZXI6IGZhbHNlLFxyXG4gIH0gKS5tb3VudCgpO1xyXG59XHJcblxyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRodW1ibmFpbHMnKSkge1xyXG4gIG5ldyBTcGxpZGUoICcuanMtdGh1bWJuYWlscycsIHtcclxuICAgIGZpeGVkV2lkdGggOiAnY2FsYygyNSUgLSAyM3B4KScsXHJcblx0XHRyZXdpbmQgICAgIDogdHJ1ZSxcclxuXHRcdHBhZ2luYXRpb24gOiBmYWxzZSxcclxuICAgIGlzTmF2aWdhdGlvbjogdHJ1ZSxcclxuICAgIGFycm93czogZmFsc2UsXHJcbiAgICBwZXJQYWdlICAgICA6IDQsXHJcbiAgICBicmVha3BvaW50czoge1xyXG4gIFx0XHQ3Njc6IHtcclxuICBcdFx0XHRwZXJQYWdlOjIsXHJcbiAgICAgICAgZml4ZWRXaWR0aCA6ICdjYWxjKDUwJSAtIDdweCknLFxyXG4gIFx0XHR9LFxyXG4gICAgfVxyXG4gIH0gKS5tb3VudCgpO1xyXG5cclxuICBuZXcgU3BsaWRlKCAnLmpzLW1haW4nLCB7XHJcbiAgICB0eXBlICAgICAgOiAnZmFkZScsXHJcbiAgICByZXdpbmQgICAgOiB0cnVlLFxyXG4gICAgcGFnaW5hdGlvbjogZmFsc2UsXHJcbiAgICBhcnJvd3MgICAgOiBmYWxzZSxcclxuICAgIHBlclBhZ2U6IDEsXHJcbiAgfSApLm1vdW50KCk7XHJcblxyXG4gIHZhciBtYWluICAgICAgID0gbmV3IFNwbGlkZSggJy5qcy1tYWluJywgeyB0eXBlOiAnZmFkZScsIHJld2luZDogdHJ1ZSwgcGFnaW5hdGlvbjogZmFsc2UsIGFycm93czogZmFsc2UsIHBlclBhZ2U6IDEsIH0gKTtcclxuICB2YXIgdGh1bWJuYWlscyA9IG5ldyBTcGxpZGUoICcuanMtdGh1bWJuYWlscycsIHtmaXhlZFdpZHRoIDogJ2NhbGMoMjUlIC0gMjNweCknLHJld2luZDogdHJ1ZSwgcGFnaW5hdGlvbjogZmFsc2UsIGFycm93czogZmFsc2UsIGlzTmF2aWdhdGlvbjogdHJ1ZSwgcGVyUGFnZTogNCxicmVha3BvaW50czogeyA3Njc6IHsgcGVyUGFnZToyLCBwYWdpbmF0aW9uOiBmYWxzZSxmaXhlZFdpZHRoIDogJ2NhbGMoNTAlIC0gN3B4KScsIH0sIH0gfSApO1xyXG5cclxuICBtYWluLnN5bmMoIHRodW1ibmFpbHMgKTtcclxuICBtYWluLm1vdW50KCk7XHJcbiAgdGh1bWJuYWlscy5tb3VudCgpO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBBY2NvcmRpb25cclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogLSBzbGlkZXVwIHNsaWRlZG93biBhbmltYXRpb24gdmlhIGNzcyBoZWlnaHQgdHJhbnNpdGlvblxyXG4gKi9cclxuXHJcbiBjb25zdCBFTEVNRU5UUyA9IFwiLmpzLUFjY29yZGlvbiAuanMtQWNjb3JkaW9uLWhlYWRlclwiO1xyXG4gY29uc3QgVE9HR0xFX0NMQVNTID0gXCJpcy1vcGVuXCI7XHJcblxyXG4gbGV0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiBpZiAodmlld3BvcnRXaWR0aCA8IDc2Nykge1xyXG4gICBjbGFzcyBBY2NvcmRpb24ge1xyXG4gICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgdGhpcy5lbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRUxFTUVOVFMpO1xyXG5cclxuICAgICAgIGlmICghdGhpcy5lbGVtZW50cykge1xyXG4gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy50b2dnbGUpO1xyXG4gICAgICAgfSk7XHJcblxyXG4gICAgICAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVjYWxjdWxhdGUpO1xyXG4gICAgIH1cclxuXHJcbiAgICAgLy8gcmVjYWxjdWxhdGUgPSAoKSA9PiB7XHJcbiAgICAgLy8gIGNvbnN0IG9wZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtQWNjb3JkaW9uIC5pcy1vcGVuJyk7XHJcbiAgICAgLy8gIGNvbnN0IHN1YiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1BY2NvcmRpb24gLmpzLUFjY29yZGlvbi1zdWInKTtcclxuICAgICAvL1xyXG4gICAgIC8vICBvcGVuLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgLy8gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShUT0dHTEVfQ0xBU1MpXHJcbiAgICAgLy8gIH0pXHJcbiAgICAgLy9cclxuICAgICAvLyAgc3ViLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgLy8gICAgZWwucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXHJcbiAgICAgLy8gIH0pXHJcbiAgICAgLy8gfVxyXG5cclxuICAgICB0b2dnbGUgPSAoZSkgPT4ge1xyXG4gICAgICAgY29uc3QgZWwgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICBjb25zdCB0YXJnZXQgPSBlbC5wYXJlbnROb2RlO1xyXG4gICAgICAgY29uc3QgY2xhc3NlcyA9IHRhcmdldC5jbGFzc0xpc3RcclxuICAgICAgIGNvbnN0IHN1YiA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuanMtQWNjb3JkaW9uLXN1YicpXHJcblxyXG4gICAgICAgaWYoY2xhc3Nlcy5jb250YWlucyhUT0dHTEVfQ0xBU1MpKXtcclxuICAgICAgICBjbGFzc2VzLnJlbW92ZShUT0dHTEVfQ0xBU1MpO1xyXG5cclxuICAgICAgICBpZihzdWIpe1xyXG4gICAgICAgICAgc3ViLnN0eWxlLmhlaWdodCA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmKHN1Yil7XHJcbiAgICAgICAgICBzdWIuc3R5bGUuaGVpZ2h0ID0gc3ViLnNjcm9sbEhlaWdodCsncHgnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGFzc2VzLmFkZChUT0dHTEVfQ0xBU1MpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICB9O1xyXG4gICB9XHJcblxyXG4gICBuZXcgQWNjb3JkaW9uKCk7XHJcbiB9XHJcbiJdLCJuYW1lcyI6WyJNRVNTQUdFIiwiSGVsbG9Xb3JsZCIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibG9hZEhhbmRsZXIiLCJJU01PQklMRSIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiVEhSRVNIT0xEIiwiTE9BRF9USFJFU0hPTEQiLCJFTEVNRU5UUyIsIlZJU0lCTEVfQ0xBU1MiLCJBbmltYXRlIiwiZW50cmllcyIsIm1hcCIsImVudHJ5Iiwic2VjdGlvbiIsInRhcmdldCIsImRlbGF5IiwiZ2V0RGVsYXkiLCJzZWN0aW9uQm9keUNsYXNzIiwiZ2V0QXR0cmlidXRlIiwiaXNJbnRlcnNlY3RpbmciLCJjbGFzc0xpc3QiLCJhZGQiLCJib2R5Q2xhc3MiLCJzZXRUaW1lb3V0IiwiaW5jbHVkZXMiLCJwYXJzZUludCIsImh0bWxjbGFzcyIsInR5cGUiLCJkb2N1bWVudCIsImJvZHkiLCJyZW1vdmUiLCJzZWN0aW9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWwiLCJCb3VuZGluZ0NsaWVudFJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ2aXNpYmxlUmF0aW8iLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImxvYWRPYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib2JzZXJ2ZUNhbGxiYWNrIiwidGhyZXNob2xkIiwib2JzZXJ2ZSIsImRpc2Nvbm5lY3QiLCJvYnNlcnZlclRocmVzaG9sZCIsIm9ic2VydmVyIiwiU1RBUlRfT0ZGU0VUIiwiU1RBUlRfQ0xBU1MiLCJCT1RUT01fT0ZGU0VUIiwiQk9UVE9NX0NMQVNTIiwiU2Nyb2xsQ2xhc3MiLCJ0b3AiLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxUb3AiLCJ0b2dnbGUiLCJvZmZzZXRIZWlnaHQiLCJvbGRTY3JvbGwiLCJzY3JvbGxIYW5kbGVyIiwicGFzc2l2ZSIsIlRvZ2dsZUJvZHlDbGFzcyIsImUiLCJjdXJyZW50VGFyZ2V0IiwiY2xhc3NlcyIsImNsYXNzZXNSZW1vdmUiLCJzcGxpdCIsImNsYXNzTmFtZSIsImVsZW1lbnRzIiwiVE9HR0xFX0NMQVNTIiwiVG9nZ2xlTmF2IiwidG9nZ2xlTmF2IiwicHJldmVudERlZmF1bHQiLCJfZGVmaW5lUHJvcGVydGllcyIsIl9jcmVhdGVDbGFzcyIsIkVMIiwicXVlcnlTZWxlY3RvciIsInNsaWRlciIsIlNwbGlkZSIsInJld2luZCIsInBlclBhZ2UiLCJwYWdpbmF0aW9uIiwiYXJyb3dzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsInNwZWVkIiwicGF1c2VPbkZvY3VzIiwicGF1c2VPbkhvdmVyIiwibW91bnQiLCJmaXhlZFdpZHRoIiwiaXNOYXZpZ2F0aW9uIiwiYnJlYWtwb2ludHMiLCJtYWluIiwidGh1bWJuYWlscyIsInN5bmMiLCJ2aWV3cG9ydFdpZHRoIiwiaW5uZXJXaWR0aCIsIkFjY29yZGlvbiIsInBhcmVudE5vZGUiLCJzdWIiLCJjb250YWlucyIsInN0eWxlIiwic2Nyb2xsSGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUVBLElBQU1BLE9BQU8sR0FBRyxpQ0FBaEI7TUFFYUMsVUFBYiw2QkFDRSxzQkFBYztJQUFBOztJQUFBLHFDQUlBLFlBQU07TUFDbEJDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSCxPQUFaO0tBTFk7O0lBQ1pJLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsS0FBS0MsV0FBckMsRUFBa0QsS0FBbEQ7RUFDRCxDQUhIO0VBVUEsSUFBSUwsVUFBSjs7RUNsQkE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUVDLElBQU1NLFFBQVEsR0FBR0gsTUFBTSxDQUFDSSxVQUFQLENBQWtCLG9DQUFsQixFQUF3REMsT0FBekU7RUFDQSxJQUFNQyxTQUFTLEdBQUdILFFBQVEsR0FBRyxLQUFILEdBQVcsS0FBckM7RUFDQSxJQUFNSSxjQUFjLEdBQUcsS0FBdkI7RUFDQSxJQUFNQyxRQUFRLEdBQUcsVUFBakI7RUFDQSxJQUFNQyxhQUFhLEdBQUcsa0JBQXRCOztNQUVLQyxvQ0FDSCxtQkFBYztJQUFBOztJQUFBOztJQUFBLHlDQXdDSyxVQUFDQyxPQUFELEVBQWE7TUFDN0JBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQUNDLEtBQUQsRUFBVztRQUNyQixJQUFNQyxPQUFPLEdBQUdELEtBQUssQ0FBQ0UsTUFBdEI7O1FBQ0EsSUFBTUMsS0FBSyxHQUFHLEtBQUksQ0FBQ0MsUUFBTCxDQUFjSCxPQUFkLENBQWQ7O1FBQ0EsSUFBTUksZ0JBQWdCLEdBQUdKLE9BQU8sQ0FBQ0ssWUFB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
