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
      speed: 1500
    }).mount();
  }

  if (document.querySelector('.js-thumbnails')) {
    new Splide('.js-thumbnails', {
      fixedWidth: 'calc(25% - 23px)',
      rewind: true,
      pagination: false,
      isNavigation: true,
      perPage: 4
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
      perPage: 4
    });
    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
  }

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsic3JjL3NjcmlwdHMvbW9kdWxlcy9IZWxsb1dvcmxkLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9BbmltYXRlLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9TY3JvbGxDbGFzcy5qcyIsInNyYy9zY3JpcHRzL21vZHVsZXMvVG9nZ2xlQm9keUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BzcGxpZGVqcy9zcGxpZGUvZGlzdC9qcy9zcGxpZGUuZXNtLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9TaG93LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBIZWxsb1dvcmxkXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIC0gZXhhbXBsZSBqcyBtb2R1bGVcclxuICovXHJcblxyXG5jb25zdCBNRVNTQUdFID0gXCJIZWxsbyBXb3JsZCEgRnJvbSBIZWxsb1dvcmxkLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgdGhpcy5sb2FkSGFuZGxlciwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgbG9hZEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhNRVNTQUdFKTtcclxuICB9O1xyXG59XHJcblxyXG5uZXcgSGVsbG9Xb3JsZCgpO1xyXG4iLCIvKipcclxuICogQW5pbWF0ZVxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAtIGFkZCBjbGFzcyB0byBlbGVtZW50IGluIHZpZXdwb3J0XHJcbiAqIC0gaWYgeW91IHdhbnQgZGlzYWJsZSBhbmltYXRlIGRlbGF5IG9uIG1vYmlsZSB1c2UgW2FuaW1hdGUtZGVsYXktZGVza3RvcF1cclxuICogLSBzZXQgYW5pbWF0aW9uIGRlbGF5IHZpYSBbYW5pbWF0ZS1kZWxheV0gaHRtbCBhdHRyaWJ1dGVcclxuICogLSBzZXQgdmlzaWJsZSB0aHJlc2hvbGQgdmlhIFthbmltYXRlLXRocmVzaG9sZF0gaHRtbCBhdHRyaWJ1dGVcclxuICovXHJcblxyXG4gY29uc3QgSVNNT0JJTEUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweClcIikubWF0Y2hlc1xyXG4gY29uc3QgVEhSRVNIT0xEID0gSVNNT0JJTEUgPyAnMC40JyA6ICcwLjYnXHJcbiBjb25zdCBMT0FEX1RIUkVTSE9MRCA9ICcwLjInXHJcbiBjb25zdCBFTEVNRU5UUyA9ICcuYW5pbWF0ZSdcclxuIGNvbnN0IFZJU0lCTEVfQ0xBU1MgPSAnYW5pbWF0ZS0tdmlzaWJsZSdcclxuXHJcbmNsYXNzIEFuaW1hdGUge1xyXG4gICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKEVMRU1FTlRTKVxyXG4gICAgdGhpcy5USFJFU0hPTEQgPSBUSFJFU0hPTERcclxuICAgIHRoaXMuTE9BRF9USFJFU0hPTEQgPSBMT0FEX1RIUkVTSE9MRFxyXG5cclxuICAgICAgaWYoJ0ludGVyc2VjdGlvbk9ic2VydmVyJyBpbiB3aW5kb3cpIHtcclxuICAgICAgICB0aGlzLnNlY3Rpb25zLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgIGNvbnN0IEJvdW5kaW5nQ2xpZW50UmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgIGNvbnN0IHZpc2libGVSYXRpbyA9ICBCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IC8gd2luZG93LmlubmVySGVpZ2h0XHJcblxyXG4gICAgICAgICBpZih2aXNpYmxlUmF0aW8gPiAwLjk1KXtcclxuICAgICAgICAgICB0aGlzLlRIUkVTSE9MRCA9ICB3aW5kb3cuaW5uZXJIZWlnaHQgLyBCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IC8gMTAwICogMzBcclxuICAgICAgICAgICB0aGlzLkxPQURfVEhSRVNIT0xEID0gd2luZG93LmlubmVySGVpZ2h0IC8gQm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCAvIDEwMCAqIDIwXHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBvYnNlcnZlIG9uIHBhZ2UgbG9hZFxyXG4gICAgICAgICAgY29uc3QgbG9hZE9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMub2JzZXJ2ZUNhbGxiYWNrLCB7XHJcbiAgICAgICAgICAgIHRocmVzaG9sZDogdGhpcy5MT0FEX1RIUkVTSE9MRFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBsb2FkT2JzZXJ2ZXIub2JzZXJ2ZShlbCk7XHJcblxyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAvLyBvYnNlcnZlXHJcbiAgICAgICAgICBjb25zdCBvYnNlcnZlclRocmVzaG9sZCA9IGVsLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS10aHJlc2hvbGQnKSA/IGVsLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS10aHJlc2hvbGQnKSA6IHRoaXMuVEhSRVNIT0xEXHJcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih0aGlzLm9ic2VydmVDYWxsYmFjaywge1xyXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IG9ic2VydmVyVGhyZXNob2xkXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZWwpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZWN0aW9ucy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChWSVNJQkxFX0NMQVNTKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgIG9ic2VydmVDYWxsYmFjayA9IChlbnRyaWVzKSA9PiB7XHJcbiAgICAgIGVudHJpZXMubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSBlbnRyeS50YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgZGVsYXkgPSB0aGlzLmdldERlbGF5KHNlY3Rpb24pXHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbkJvZHlDbGFzcyA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdhbmltYXRlLWJvZHktY2xhc3MnKVxyXG5cclxuICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAgIGlmKElTTU9CSUxFICYmIHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdhbmltYXRlLWRlbGF5LWRlc2t0b3AnKSl7XHJcbiAgICAgICAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZChWSVNJQkxFX0NMQVNTKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5ib2R5Q2xhc3Moc2VjdGlvbkJvZHlDbGFzcywgJ2FkZCcpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoVklTSUJMRV9DTEFTUylcclxuICAgICAgICAgICAgICB0aGlzLmJvZHlDbGFzcyhzZWN0aW9uQm9keUNsYXNzLCAnYWRkJylcclxuICAgICAgICAgICAgfSwgZGVsYXkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYm9keUNsYXNzKHNlY3Rpb25Cb2R5Q2xhc3MsICdyZW1vdmUnKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICBnZXREZWxheSA9IChzZWN0aW9uKSA9PiB7XHJcbiAgIHZhciBkZWxheSA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdhbmltYXRlLWRlbGF5JylcclxuXHJcbiAgIGlmKCFJU01PQklMRSAmJiBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS1kZWxheS1kZXNrdG9wJykpe1xyXG4gICAgIHZhciBkZWxheSA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdhbmltYXRlLWRlbGF5LWRlc2t0b3AnKVxyXG4gICB9XHJcblxyXG4gICBpZiAoZGVsYXkgPT09IG51bGwpIHtcclxuICAgICByZXR1cm4gMFxyXG4gICB9IGVsc2UgaWYgKGRlbGF5LmluY2x1ZGVzKCcuJykpIHtcclxuICAgICByZXR1cm4gcGFyc2VJbnQoZGVsYXkgKiAxMDAwKVxyXG4gICB9IGVsc2Uge1xyXG4gICAgIHJldHVybiBwYXJzZUludChkZWxheSlcclxuICAgfVxyXG4gICB9XHJcblxyXG4gICBib2R5Q2xhc3MgPSAoaHRtbGNsYXNzLCB0eXBlKSA9PiB7XHJcbiAgICAgaWYoIWh0bWxjbGFzcyl7XHJcbiAgICAgICByZXR1cm5cclxuICAgICB9XHJcblxyXG4gICAgICBpZih0eXBlID09ICdhZGQnKXtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoaHRtbGNsYXNzKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShodG1sY2xhc3MpXHJcbiAgICAgIH1cclxuICAgIH1cclxuIH1cclxuXHJcbiBuZXcgQW5pbWF0ZSgpXHJcbiIsIi8qXHJcbiAgQCBBZGQgYm9keSBjbGFzcyBpZjpcclxuICAtIHNjcm9sbCBzdGFydGVkXHJcbiAgLSBzY3JvbGxlZCB0byBib3R0b21cclxuKi9cclxuXHJcbmNvbnN0IFNUQVJUX09GRlNFVCA9IDEwO1xyXG5jb25zdCBTVEFSVF9DTEFTUyA9IFwiaXMtc2Nyb2xsZWRcIjtcclxuY29uc3QgQk9UVE9NX09GRlNFVCA9IDEwO1xyXG5jb25zdCBCT1RUT01fQ0xBU1MgPSBcImlzLXNjcm9sbGVkLWJvdHRvbVwiO1xyXG5cclxuY29uc3QgVVBfRE9XTl9DTEFTU0VTID0gZmFsc2U7XHJcbmNvbnN0IFVQX0NMQVNTID0gXCJzY3JvbGxpbmctdXBcIjtcclxuY29uc3QgRE9XTl9DTEFTUyA9IFwic2Nyb2xsaW5nLWRvd25cIjtcclxuXHJcbmNsYXNzIFNjcm9sbENsYXNzIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5zY3JvbGxIYW5kbGVyLCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsSGFuZGxlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFNUQVJUX0NMQVNTLCB0b3AgPj0gU1RBUlRfT0ZGU0VUKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcclxuICAgICAgQk9UVE9NX0NMQVNTLFxyXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgKyB0b3AgPj0gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSBCT1RUT01fT0ZGU0VUXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChVUF9ET1dOX0NMQVNTRVMpIHtcclxuICAgICAgaWYodGhpcy5vbGRTY3JvbGwgPiB0b3Ape1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChVUF9DTEFTUylcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoRE9XTl9DTEFTUyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKERPV05fQ0xBU1MpXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFVQX0NMQVNTKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2xkU2Nyb2xsID0gdG9wO1xyXG5cclxuICB9O1xyXG59XHJcblxyXG5uZXcgU2Nyb2xsQ2xhc3MoKTtcclxuIiwiLyoqXHJcbiAqIFRvZ2dsZUJvZHlDbGFzc1xyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAtIHRvZ2dsZSBjbGFzcyBvbiBib2R5XHJcbiAqIC0gbXVsdGlwbGUgY2xhc3NlcyBzdXBwb3J0ZWQgLSBcIkNMQVNTTkFNRSBDTEFTU05BTUUyIC4uLlwiXHJcbiAqIC0gYWRkIGNsYXNzIHRvIGh0bWwgYXR0ciBbZGF0YS10b2dnbGU9XCJDTEFTU05BTUVcIl1cclxuICogLSByZW1vdmUgY2xhc3Mgd2hlbiBhdHRyIFtkYXRhLXJlbW92ZT1cIkNMQVNTTkFNRVwiXVxyXG4gKi9cclxuXHJcbiBjb25zdCBFTEVNRU5UUyA9ICcuanMtVG9nZ2xlQm9keUNsYXNzJ1xyXG5cclxuIGNsYXNzIFRvZ2dsZUJvZHlDbGFzcyB7XHJcbiAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgIHRoaXMuZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKEVMRU1FTlRTKVxyXG5cclxuICAgICBpZiAoIXRoaXMuZWxlbWVudHMpIHtcclxuICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgIH1cclxuXHJcbiAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUsIGZhbHNlKVxyXG4gICAgIH0pXHJcbiAgIH1cclxuXHJcbiAgIHRvZ2dsZSA9IChlKSA9PiB7XHJcbiAgICAgY29uc3QgZWwgPSBlLmN1cnJlbnRUYXJnZXRcclxuICAgICBjb25zdCBjbGFzc2VzID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRvZ2dsZScpXHJcbiAgICAgY29uc3QgY2xhc3Nlc1JlbW92ZSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1yZW1vdmUnKVxyXG5cclxuICAgICBpZihjbGFzc2VzUmVtb3ZlKXtcclxuICAgICAgY2xhc3Nlc1JlbW92ZS5zcGxpdChcIiBcIikuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXHJcbiAgICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICBjbGFzc2VzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpXHJcbiAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgIH1cclxuIH1cclxuXHJcbiBuZXcgVG9nZ2xlQm9keUNsYXNzKClcclxuIiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG4vKiFcbiAqIFNwbGlkZS5qc1xuICogVmVyc2lvbiAgOiA0LjAuMTdcbiAqIExpY2Vuc2UgIDogTUlUXG4gKiBDb3B5cmlnaHQ6IDIwMjIgTmFvdG9zaGkgRnVqaXRhXG4gKi9cbnZhciBNRURJQV9QUkVGRVJTX1JFRFVDRURfTU9USU9OID0gXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiO1xudmFyIENSRUFURUQgPSAxO1xudmFyIE1PVU5URUQgPSAyO1xudmFyIElETEUgPSAzO1xudmFyIE1PVklORyA9IDQ7XG52YXIgU0NST0xMSU5HID0gNTtcbnZhciBEUkFHR0lORyA9IDY7XG52YXIgREVTVFJPWUVEID0gNztcbnZhciBTVEFURVMgPSB7XG4gIENSRUFURUQ6IENSRUFURUQsXG4gIE1PVU5URUQ6IE1PVU5URUQsXG4gIElETEU6IElETEUsXG4gIE1PVklORzogTU9WSU5HLFxuICBTQ1JPTExJTkc6IFNDUk9MTElORyxcbiAgRFJBR0dJTkc6IERSQUdHSU5HLFxuICBERVNUUk9ZRUQ6IERFU1RST1lFRFxufTtcblxuZnVuY3Rpb24gZW1wdHkoYXJyYXkpIHtcbiAgYXJyYXkubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gc2xpY2UoYXJyYXlMaWtlLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnJheUxpa2UsIHN0YXJ0LCBlbmQpO1xufVxuXG5mdW5jdGlvbiBhcHBseShmdW5jKSB7XG4gIHJldHVybiBmdW5jLmJpbmQuYXBwbHkoZnVuYywgW251bGxdLmNvbmNhdChzbGljZShhcmd1bWVudHMsIDEpKSk7XG59XG5cbnZhciBuZXh0VGljayA9IHNldFRpbWVvdXQ7XG5cbnZhciBub29wID0gZnVuY3Rpb24gbm9vcCgpIHt9O1xuXG5mdW5jdGlvbiByYWYoZnVuYykge1xuICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmMpO1xufVxuXG5mdW5jdGlvbiB0eXBlT2YodHlwZSwgc3ViamVjdCkge1xuICByZXR1cm4gdHlwZW9mIHN1YmplY3QgPT09IHR5cGU7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHN1YmplY3QpIHtcbiAgcmV0dXJuICFpc051bGwoc3ViamVjdCkgJiYgdHlwZU9mKFwib2JqZWN0XCIsIHN1YmplY3QpO1xufVxuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgaXNGdW5jdGlvbiA9IGFwcGx5KHR5cGVPZiwgXCJmdW5jdGlvblwiKTtcbnZhciBpc1N0cmluZyA9IGFwcGx5KHR5cGVPZiwgXCJzdHJpbmdcIik7XG52YXIgaXNVbmRlZmluZWQgPSBhcHBseSh0eXBlT2YsIFwidW5kZWZpbmVkXCIpO1xuXG5mdW5jdGlvbiBpc051bGwoc3ViamVjdCkge1xuICByZXR1cm4gc3ViamVjdCA9PT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNIVE1MRWxlbWVudChzdWJqZWN0KSB7XG4gIHJldHVybiBzdWJqZWN0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIHRvQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoKHZhbHVlcywgaXRlcmF0ZWUpIHtcbiAgdG9BcnJheSh2YWx1ZXMpLmZvckVhY2goaXRlcmF0ZWUpO1xufVxuXG5mdW5jdGlvbiBpbmNsdWRlcyhhcnJheSwgdmFsdWUpIHtcbiAgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUpID4gLTE7XG59XG5cbmZ1bmN0aW9uIHB1c2goYXJyYXksIGl0ZW1zKSB7XG4gIGFycmF5LnB1c2guYXBwbHkoYXJyYXksIHRvQXJyYXkoaXRlbXMpKTtcbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhlbG0sIGNsYXNzZXMsIGFkZCkge1xuICBpZiAoZWxtKSB7XG4gICAgZm9yRWFjaChjbGFzc2VzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgZWxtLmNsYXNzTGlzdFthZGQgPyBcImFkZFwiIDogXCJyZW1vdmVcIl0obmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkQ2xhc3MoZWxtLCBjbGFzc2VzKSB7XG4gIHRvZ2dsZUNsYXNzKGVsbSwgaXNTdHJpbmcoY2xhc3NlcykgPyBjbGFzc2VzLnNwbGl0KFwiIFwiKSA6IGNsYXNzZXMsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBhcHBlbmQocGFyZW50LCBjaGlsZHJlbikge1xuICBmb3JFYWNoKGNoaWxkcmVuLCBwYXJlbnQuYXBwZW5kQ2hpbGQuYmluZChwYXJlbnQpKTtcbn1cblxuZnVuY3Rpb24gYmVmb3JlKG5vZGVzLCByZWYpIHtcbiAgZm9yRWFjaChub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgcGFyZW50ID0gKHJlZiB8fCBub2RlKS5wYXJlbnROb2RlO1xuXG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCByZWYpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMoZWxtLCBzZWxlY3Rvcikge1xuICByZXR1cm4gaXNIVE1MRWxlbWVudChlbG0pICYmIChlbG1bXCJtc01hdGNoZXNTZWxlY3RvclwiXSB8fCBlbG0ubWF0Y2hlcykuY2FsbChlbG0sIHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gY2hpbGRyZW4ocGFyZW50LCBzZWxlY3Rvcikge1xuICB2YXIgY2hpbGRyZW4yID0gcGFyZW50ID8gc2xpY2UocGFyZW50LmNoaWxkcmVuKSA6IFtdO1xuICByZXR1cm4gc2VsZWN0b3IgPyBjaGlsZHJlbjIuZmlsdGVyKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgIHJldHVybiBtYXRjaGVzKGNoaWxkLCBzZWxlY3Rvcik7XG4gIH0pIDogY2hpbGRyZW4yO1xufVxuXG5mdW5jdGlvbiBjaGlsZChwYXJlbnQsIHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3RvciA/IGNoaWxkcmVuKHBhcmVudCwgc2VsZWN0b3IpWzBdIDogcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xufVxuXG52YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzO1xuXG5mdW5jdGlvbiBmb3JPd24ob2JqZWN0LCBpdGVyYXRlZSwgcmlnaHQpIHtcbiAgaWYgKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gb3duS2V5cyhvYmplY3QpO1xuICAgIGtleXMgPSByaWdodCA/IGtleXMucmV2ZXJzZSgpIDoga2V5cztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG5cbiAgICAgIGlmIChrZXkgIT09IFwiX19wcm90b19fXCIpIHtcbiAgICAgICAgaWYgKGl0ZXJhdGVlKG9iamVjdFtrZXldLCBrZXkpID09PSBmYWxzZSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gYXNzaWduKG9iamVjdCkge1xuICBzbGljZShhcmd1bWVudHMsIDEpLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgIGZvck93bihzb3VyY2UsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gbWVyZ2Uob2JqZWN0KSB7XG4gIHNsaWNlKGFyZ3VtZW50cywgMSkuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgZm9yT3duKHNvdXJjZSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlLnNsaWNlKCk7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBvYmplY3Rba2V5XSA9IG1lcmdlKHt9LCBpc09iamVjdChvYmplY3Rba2V5XSkgPyBvYmplY3Rba2V5XSA6IHt9LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gb21pdChvYmplY3QsIGtleXMpIHtcbiAgdG9BcnJheShrZXlzIHx8IG93bktleXMob2JqZWN0KSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgZGVsZXRlIG9iamVjdFtrZXldO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlKGVsbXMsIGF0dHJzKSB7XG4gIGZvckVhY2goZWxtcywgZnVuY3Rpb24gKGVsbSkge1xuICAgIGZvckVhY2goYXR0cnMsIGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICBlbG0gJiYgZWxtLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZShlbG1zLCBhdHRycywgdmFsdWUpIHtcbiAgaWYgKGlzT2JqZWN0KGF0dHJzKSkge1xuICAgIGZvck93bihhdHRycywgZnVuY3Rpb24gKHZhbHVlMiwgbmFtZSkge1xuICAgICAgc2V0QXR0cmlidXRlKGVsbXMsIG5hbWUsIHZhbHVlMik7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZm9yRWFjaChlbG1zLCBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICBpc051bGwodmFsdWUpIHx8IHZhbHVlID09PSBcIlwiID8gcmVtb3ZlQXR0cmlidXRlKGVsbSwgYXR0cnMpIDogZWxtLnNldEF0dHJpYnV0ZShhdHRycywgU3RyaW5nKHZhbHVlKSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlKHRhZywgYXR0cnMsIHBhcmVudCkge1xuICB2YXIgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuXG4gIGlmIChhdHRycykge1xuICAgIGlzU3RyaW5nKGF0dHJzKSA/IGFkZENsYXNzKGVsbSwgYXR0cnMpIDogc2V0QXR0cmlidXRlKGVsbSwgYXR0cnMpO1xuICB9XG5cbiAgcGFyZW50ICYmIGFwcGVuZChwYXJlbnQsIGVsbSk7XG4gIHJldHVybiBlbG07XG59XG5cbmZ1bmN0aW9uIHN0eWxlKGVsbSwgcHJvcCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKGVsbSlbcHJvcF07XG4gIH1cblxuICBpZiAoIWlzTnVsbCh2YWx1ZSkpIHtcbiAgICBlbG0uc3R5bGVbcHJvcF0gPSBcIlwiICsgdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheShlbG0sIGRpc3BsYXkyKSB7XG4gIHN0eWxlKGVsbSwgXCJkaXNwbGF5XCIsIGRpc3BsYXkyKTtcbn1cblxuZnVuY3Rpb24gZm9jdXMoZWxtKSB7XG4gIGVsbVtcInNldEFjdGl2ZVwiXSAmJiBlbG1bXCJzZXRBY3RpdmVcIl0oKSB8fCBlbG0uZm9jdXMoe1xuICAgIHByZXZlbnRTY3JvbGw6IHRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZShlbG0sIGF0dHIpIHtcbiAgcmV0dXJuIGVsbS5nZXRBdHRyaWJ1dGUoYXR0cik7XG59XG5cbmZ1bmN0aW9uIGhhc0NsYXNzKGVsbSwgY2xhc3NOYW1lKSB7XG4gIHJldHVybiBlbG0gJiYgZWxtLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xufVxuXG5mdW5jdGlvbiByZWN0KHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xufVxuXG5mdW5jdGlvbiByZW1vdmUobm9kZXMpIHtcbiAgZm9yRWFjaChub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBpZiAobm9kZSAmJiBub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwYXJzZUh0bWwoaHRtbCkge1xuICByZXR1cm4gY2hpbGQobmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCBcInRleHQvaHRtbFwiKS5ib2R5KTtcbn1cblxuZnVuY3Rpb24gcHJldmVudChlLCBzdG9wUHJvcGFnYXRpb24pIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGlmIChzdG9wUHJvcGFnYXRpb24pIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcXVlcnkocGFyZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gcGFyZW50ICYmIHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gcXVlcnlBbGwocGFyZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gc2VsZWN0b3IgPyBzbGljZShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpIDogW107XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsbSwgY2xhc3Nlcykge1xuICB0b2dnbGVDbGFzcyhlbG0sIGNsYXNzZXMsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gdGltZU9mKGUpIHtcbiAgcmV0dXJuIGUudGltZVN0YW1wO1xufVxuXG5mdW5jdGlvbiB1bml0KHZhbHVlKSB7XG4gIHJldHVybiBpc1N0cmluZyh2YWx1ZSkgPyB2YWx1ZSA6IHZhbHVlID8gdmFsdWUgKyBcInB4XCIgOiBcIlwiO1xufVxuXG52YXIgUFJPSkVDVF9DT0RFID0gXCJzcGxpZGVcIjtcbnZhciBEQVRBX0FUVFJJQlVURSA9IFwiZGF0YS1cIiArIFBST0pFQ1RfQ09ERTtcblxuZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIltcIiArIFBST0pFQ1RfQ09ERSArIFwiXSBcIiArIChtZXNzYWdlIHx8IFwiXCIpKTtcbiAgfVxufVxuXG52YXIgbWluID0gTWF0aC5taW4sXG4gICAgbWF4ID0gTWF0aC5tYXgsXG4gICAgZmxvb3IgPSBNYXRoLmZsb29yLFxuICAgIGNlaWwgPSBNYXRoLmNlaWwsXG4gICAgYWJzID0gTWF0aC5hYnM7XG5cbmZ1bmN0aW9uIGFwcHJveGltYXRlbHlFcXVhbCh4LCB5LCBlcHNpbG9uKSB7XG4gIHJldHVybiBhYnMoeCAtIHkpIDwgZXBzaWxvbjtcbn1cblxuZnVuY3Rpb24gYmV0d2VlbihudW1iZXIsIG1pbk9yTWF4LCBtYXhPck1pbiwgZXhjbHVzaXZlKSB7XG4gIHZhciBtaW5pbXVtID0gbWluKG1pbk9yTWF4LCBtYXhPck1pbik7XG4gIHZhciBtYXhpbXVtID0gbWF4KG1pbk9yTWF4LCBtYXhPck1pbik7XG4gIHJldHVybiBleGNsdXNpdmUgPyBtaW5pbXVtIDwgbnVtYmVyICYmIG51bWJlciA8IG1heGltdW0gOiBtaW5pbXVtIDw9IG51bWJlciAmJiBudW1iZXIgPD0gbWF4aW11bTtcbn1cblxuZnVuY3Rpb24gY2xhbXAobnVtYmVyLCB4LCB5KSB7XG4gIHZhciBtaW5pbXVtID0gbWluKHgsIHkpO1xuICB2YXIgbWF4aW11bSA9IG1heCh4LCB5KTtcbiAgcmV0dXJuIG1pbihtYXgobWluaW11bSwgbnVtYmVyKSwgbWF4aW11bSk7XG59XG5cbmZ1bmN0aW9uIHNpZ24oeCkge1xuICByZXR1cm4gKyh4ID4gMCkgLSArKHggPCAwKTtcbn1cblxuZnVuY3Rpb24gY2FtZWxUb0tlYmFiKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbYS16MC05XSkoW0EtWl0pL2csIFwiJDEtJDJcIikudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0KHN0cmluZywgcmVwbGFjZW1lbnRzKSB7XG4gIGZvckVhY2gocmVwbGFjZW1lbnRzLCBmdW5jdGlvbiAocmVwbGFjZW1lbnQpIHtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShcIiVzXCIsIFwiXCIgKyByZXBsYWNlbWVudCk7XG4gIH0pO1xuICByZXR1cm4gc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBwYWQobnVtYmVyKSB7XG4gIHJldHVybiBudW1iZXIgPCAxMCA/IFwiMFwiICsgbnVtYmVyIDogXCJcIiArIG51bWJlcjtcbn1cblxudmFyIGlkcyA9IHt9O1xuXG5mdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcbiAgcmV0dXJuIFwiXCIgKyBwcmVmaXggKyBwYWQoaWRzW3ByZWZpeF0gPSAoaWRzW3ByZWZpeF0gfHwgMCkgKyAxKTtcbn1cblxuZnVuY3Rpb24gRXZlbnRCaW5kZXIoKSB7XG4gIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICBmdW5jdGlvbiBiaW5kKHRhcmdldHMsIGV2ZW50cywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICBmb3JFYWNoRXZlbnQodGFyZ2V0cywgZXZlbnRzLCBmdW5jdGlvbiAodGFyZ2V0LCBldmVudCwgbmFtZXNwYWNlKSB7XG4gICAgICB2YXIgaXNFdmVudFRhcmdldCA9IChcImFkZEV2ZW50TGlzdGVuZXJcIiBpbiB0YXJnZXQpO1xuICAgICAgdmFyIHJlbW92ZXIgPSBpc0V2ZW50VGFyZ2V0ID8gdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIuYmluZCh0YXJnZXQsIGV2ZW50LCBjYWxsYmFjaywgb3B0aW9ucykgOiB0YXJnZXRbXCJyZW1vdmVMaXN0ZW5lclwiXS5iaW5kKHRhcmdldCwgY2FsbGJhY2spO1xuICAgICAgaXNFdmVudFRhcmdldCA/IHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaywgb3B0aW9ucykgOiB0YXJnZXRbXCJhZGRMaXN0ZW5lclwiXShjYWxsYmFjayk7XG4gICAgICBsaXN0ZW5lcnMucHVzaChbdGFyZ2V0LCBldmVudCwgbmFtZXNwYWNlLCBjYWxsYmFjaywgcmVtb3Zlcl0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5iaW5kKHRhcmdldHMsIGV2ZW50cywgY2FsbGJhY2spIHtcbiAgICBmb3JFYWNoRXZlbnQodGFyZ2V0cywgZXZlbnRzLCBmdW5jdGlvbiAodGFyZ2V0LCBldmVudCwgbmFtZXNwYWNlKSB7XG4gICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICBpZiAobGlzdGVuZXJbMF0gPT09IHRhcmdldCAmJiBsaXN0ZW5lclsxXSA9PT0gZXZlbnQgJiYgbGlzdGVuZXJbMl0gPT09IG5hbWVzcGFjZSAmJiAoIWNhbGxiYWNrIHx8IGxpc3RlbmVyWzNdID09PSBjYWxsYmFjaykpIHtcbiAgICAgICAgICBsaXN0ZW5lcls0XSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwYXRjaCh0YXJnZXQsIHR5cGUsIGRldGFpbCkge1xuICAgIHZhciBlO1xuICAgIHZhciBidWJibGVzID0gdHJ1ZTtcblxuICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZSA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7XG4gICAgICAgIGJ1YmJsZXM6IGJ1YmJsZXMsXG4gICAgICAgIGRldGFpbDogZGV0YWlsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBidWJibGVzLCBmYWxzZSwgZGV0YWlsKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICByZXR1cm4gZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvckVhY2hFdmVudCh0YXJnZXRzLCBldmVudHMsIGl0ZXJhdGVlKSB7XG4gICAgZm9yRWFjaCh0YXJnZXRzLCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgJiYgZm9yRWFjaChldmVudHMsIGZ1bmN0aW9uIChldmVudHMyKSB7XG4gICAgICAgIGV2ZW50czIuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TlMpIHtcbiAgICAgICAgICB2YXIgZnJhZ21lbnQgPSBldmVudE5TLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICBpdGVyYXRlZSh0YXJnZXQsIGZyYWdtZW50WzBdLCBmcmFnbWVudFsxXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBkYXRhWzRdKCk7XG4gICAgfSk7XG4gICAgZW1wdHkobGlzdGVuZXJzKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYmluZDogYmluZCxcbiAgICB1bmJpbmQ6IHVuYmluZCxcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xufVxuXG52YXIgRVZFTlRfTU9VTlRFRCA9IFwibW91bnRlZFwiO1xudmFyIEVWRU5UX1JFQURZID0gXCJyZWFkeVwiO1xudmFyIEVWRU5UX01PVkUgPSBcIm1vdmVcIjtcbnZhciBFVkVOVF9NT1ZFRCA9IFwibW92ZWRcIjtcbnZhciBFVkVOVF9TSElGVEVEID0gXCJzaGlmdGVkXCI7XG52YXIgRVZFTlRfQ0xJQ0sgPSBcImNsaWNrXCI7XG52YXIgRVZFTlRfQUNUSVZFID0gXCJhY3RpdmVcIjtcbnZhciBFVkVOVF9JTkFDVElWRSA9IFwiaW5hY3RpdmVcIjtcbnZhciBFVkVOVF9WSVNJQkxFID0gXCJ2aXNpYmxlXCI7XG52YXIgRVZFTlRfSElEREVOID0gXCJoaWRkZW5cIjtcbnZhciBFVkVOVF9TTElERV9LRVlET1dOID0gXCJzbGlkZTprZXlkb3duXCI7XG52YXIgRVZFTlRfUkVGUkVTSCA9IFwicmVmcmVzaFwiO1xudmFyIEVWRU5UX1VQREFURUQgPSBcInVwZGF0ZWRcIjtcbnZhciBFVkVOVF9SRVNJWkUgPSBcInJlc2l6ZVwiO1xudmFyIEVWRU5UX1JFU0laRUQgPSBcInJlc2l6ZWRcIjtcbnZhciBFVkVOVF9EUkFHID0gXCJkcmFnXCI7XG52YXIgRVZFTlRfRFJBR0dJTkcgPSBcImRyYWdnaW5nXCI7XG52YXIgRVZFTlRfRFJBR0dFRCA9IFwiZHJhZ2dlZFwiO1xudmFyIEVWRU5UX1NDUk9MTCA9IFwic2Nyb2xsXCI7XG52YXIgRVZFTlRfU0NST0xMRUQgPSBcInNjcm9sbGVkXCI7XG52YXIgRVZFTlRfREVTVFJPWSA9IFwiZGVzdHJveVwiO1xudmFyIEVWRU5UX0FSUk9XU19NT1VOVEVEID0gXCJhcnJvd3M6bW91bnRlZFwiO1xudmFyIEVWRU5UX0FSUk9XU19VUERBVEVEID0gXCJhcnJvd3M6dXBkYXRlZFwiO1xudmFyIEVWRU5UX1BBR0lOQVRJT05fTU9VTlRFRCA9IFwicGFnaW5hdGlvbjptb3VudGVkXCI7XG52YXIgRVZFTlRfUEFHSU5BVElPTl9VUERBVEVEID0gXCJwYWdpbmF0aW9uOnVwZGF0ZWRcIjtcbnZhciBFVkVOVF9OQVZJR0FUSU9OX01PVU5URUQgPSBcIm5hdmlnYXRpb246bW91bnRlZFwiO1xudmFyIEVWRU5UX0FVVE9QTEFZX1BMQVkgPSBcImF1dG9wbGF5OnBsYXlcIjtcbnZhciBFVkVOVF9BVVRPUExBWV9QTEFZSU5HID0gXCJhdXRvcGxheTpwbGF5aW5nXCI7XG52YXIgRVZFTlRfQVVUT1BMQVlfUEFVU0UgPSBcImF1dG9wbGF5OnBhdXNlXCI7XG52YXIgRVZFTlRfTEFaWUxPQURfTE9BREVEID0gXCJsYXp5bG9hZDpsb2FkZWRcIjtcblxuZnVuY3Rpb24gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMikge1xuICB2YXIgYnVzID0gU3BsaWRlMiA/IFNwbGlkZTIuZXZlbnQuYnVzIDogZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICB2YXIgYmluZGVyID0gRXZlbnRCaW5kZXIoKTtcblxuICBmdW5jdGlvbiBvbihldmVudHMsIGNhbGxiYWNrKSB7XG4gICAgYmluZGVyLmJpbmQoYnVzLCB0b0FycmF5KGV2ZW50cykuam9pbihcIiBcIiksIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjYWxsYmFjay5hcHBseShjYWxsYmFjaywgaXNBcnJheShlLmRldGFpbCkgPyBlLmRldGFpbCA6IFtdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICBiaW5kZXIuZGlzcGF0Y2goYnVzLCBldmVudCwgc2xpY2UoYXJndW1lbnRzLCAxKSk7XG4gIH1cblxuICBpZiAoU3BsaWRlMikge1xuICAgIFNwbGlkZTIuZXZlbnQub24oRVZFTlRfREVTVFJPWSwgYmluZGVyLmRlc3Ryb3kpO1xuICB9XG5cbiAgcmV0dXJuIGFzc2lnbihiaW5kZXIsIHtcbiAgICBidXM6IGJ1cyxcbiAgICBvbjogb24sXG4gICAgb2ZmOiBhcHBseShiaW5kZXIudW5iaW5kLCBidXMpLFxuICAgIGVtaXQ6IGVtaXRcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIFJlcXVlc3RJbnRlcnZhbChpbnRlcnZhbCwgb25JbnRlcnZhbCwgb25VcGRhdGUsIGxpbWl0KSB7XG4gIHZhciBub3cgPSBEYXRlLm5vdztcbiAgdmFyIHN0YXJ0VGltZTtcbiAgdmFyIHJhdGUgPSAwO1xuICB2YXIgaWQ7XG4gIHZhciBwYXVzZWQgPSB0cnVlO1xuICB2YXIgY291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAoIXBhdXNlZCkge1xuICAgICAgcmF0ZSA9IGludGVydmFsID8gbWluKChub3coKSAtIHN0YXJ0VGltZSkgLyBpbnRlcnZhbCwgMSkgOiAxO1xuICAgICAgb25VcGRhdGUgJiYgb25VcGRhdGUocmF0ZSk7XG5cbiAgICAgIGlmIChyYXRlID49IDEpIHtcbiAgICAgICAgb25JbnRlcnZhbCgpO1xuICAgICAgICBzdGFydFRpbWUgPSBub3coKTtcblxuICAgICAgICBpZiAobGltaXQgJiYgKytjb3VudCA+PSBsaW1pdCkge1xuICAgICAgICAgIHJldHVybiBwYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJhZih1cGRhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KHJlc3VtZSkge1xuICAgICFyZXN1bWUgJiYgY2FuY2VsKCk7XG4gICAgc3RhcnRUaW1lID0gbm93KCkgLSAocmVzdW1lID8gcmF0ZSAqIGludGVydmFsIDogMCk7XG4gICAgcGF1c2VkID0gZmFsc2U7XG4gICAgcmFmKHVwZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICBwYXVzZWQgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmV3aW5kKCkge1xuICAgIHN0YXJ0VGltZSA9IG5vdygpO1xuICAgIHJhdGUgPSAwO1xuXG4gICAgaWYgKG9uVXBkYXRlKSB7XG4gICAgICBvblVwZGF0ZShyYXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWQgJiYgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgIHJhdGUgPSAwO1xuICAgIGlkID0gMDtcbiAgICBwYXVzZWQgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0KHRpbWUpIHtcbiAgICBpbnRlcnZhbCA9IHRpbWU7XG4gIH1cblxuICBmdW5jdGlvbiBpc1BhdXNlZCgpIHtcbiAgICByZXR1cm4gcGF1c2VkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydDogc3RhcnQsXG4gICAgcmV3aW5kOiByZXdpbmQsXG4gICAgcGF1c2U6IHBhdXNlLFxuICAgIGNhbmNlbDogY2FuY2VsLFxuICAgIHNldDogc2V0LFxuICAgIGlzUGF1c2VkOiBpc1BhdXNlZFxuICB9O1xufVxuXG5mdW5jdGlvbiBTdGF0ZShpbml0aWFsU3RhdGUpIHtcbiAgdmFyIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuXG4gIGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgIHN0YXRlID0gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBpcyhzdGF0ZXMpIHtcbiAgICByZXR1cm4gaW5jbHVkZXModG9BcnJheShzdGF0ZXMpLCBzdGF0ZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldDogc2V0LFxuICAgIGlzOiBpc1xuICB9O1xufVxuXG5mdW5jdGlvbiBUaHJvdHRsZShmdW5jLCBkdXJhdGlvbikge1xuICB2YXIgaW50ZXJ2YWw7XG5cbiAgZnVuY3Rpb24gdGhyb3R0bGVkKCkge1xuICAgIGlmICghaW50ZXJ2YWwpIHtcbiAgICAgIGludGVydmFsID0gUmVxdWVzdEludGVydmFsKGR1cmF0aW9uIHx8IDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuYygpO1xuICAgICAgICBpbnRlcnZhbCA9IG51bGw7XG4gICAgICB9LCBudWxsLCAxKTtcbiAgICAgIGludGVydmFsLnN0YXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRocm90dGxlZDtcbn1cblxuZnVuY3Rpb24gTWVkaWEoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIHN0YXRlID0gU3BsaWRlMi5zdGF0ZTtcbiAgdmFyIGJyZWFrcG9pbnRzID0gb3B0aW9ucy5icmVha3BvaW50cyB8fCB7fTtcbiAgdmFyIHJlZHVjZWRNb3Rpb24gPSBvcHRpb25zLnJlZHVjZWRNb3Rpb24gfHwge307XG4gIHZhciBiaW5kZXIgPSBFdmVudEJpbmRlcigpO1xuICB2YXIgcXVlcmllcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgIHZhciBpc01pbiA9IG9wdGlvbnMubWVkaWFRdWVyeSA9PT0gXCJtaW5cIjtcbiAgICBvd25LZXlzKGJyZWFrcG9pbnRzKS5zb3J0KGZ1bmN0aW9uIChuLCBtKSB7XG4gICAgICByZXR1cm4gaXNNaW4gPyArbiAtICttIDogK20gLSArbjtcbiAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJlZ2lzdGVyKGJyZWFrcG9pbnRzW2tleV0sIFwiKFwiICsgKGlzTWluID8gXCJtaW5cIiA6IFwibWF4XCIpICsgXCItd2lkdGg6XCIgKyBrZXkgKyBcInB4KVwiKTtcbiAgICB9KTtcbiAgICByZWdpc3RlcihyZWR1Y2VkTW90aW9uLCBNRURJQV9QUkVGRVJTX1JFRFVDRURfTU9USU9OKTtcbiAgICB1cGRhdGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koY29tcGxldGVseSkge1xuICAgIGlmIChjb21wbGV0ZWx5KSB7XG4gICAgICBiaW5kZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyKG9wdGlvbnMyLCBxdWVyeSkge1xuICAgIHZhciBxdWVyeUxpc3QgPSBtYXRjaE1lZGlhKHF1ZXJ5KTtcbiAgICBiaW5kZXIuYmluZChxdWVyeUxpc3QsIFwiY2hhbmdlXCIsIHVwZGF0ZSk7XG4gICAgcXVlcmllcy5wdXNoKFtvcHRpb25zMiwgcXVlcnlMaXN0XSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIGRlc3Ryb3llZCA9IHN0YXRlLmlzKERFU1RST1lFRCk7XG4gICAgdmFyIGRpcmVjdGlvbiA9IG9wdGlvbnMuZGlyZWN0aW9uO1xuICAgIHZhciBtZXJnZWQgPSBxdWVyaWVzLnJlZHVjZShmdW5jdGlvbiAobWVyZ2VkMiwgZW50cnkpIHtcbiAgICAgIHJldHVybiBtZXJnZShtZXJnZWQyLCBlbnRyeVsxXS5tYXRjaGVzID8gZW50cnlbMF0gOiB7fSk7XG4gICAgfSwge30pO1xuICAgIG9taXQob3B0aW9ucyk7XG4gICAgc2V0KG1lcmdlZCk7XG5cbiAgICBpZiAob3B0aW9ucy5kZXN0cm95KSB7XG4gICAgICBTcGxpZGUyLmRlc3Ryb3kob3B0aW9ucy5kZXN0cm95ID09PSBcImNvbXBsZXRlbHlcIik7XG4gICAgfSBlbHNlIGlmIChkZXN0cm95ZWQpIHtcbiAgICAgIGRlc3Ryb3kodHJ1ZSk7XG4gICAgICBTcGxpZGUyLm1vdW50KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdGlvbiAhPT0gb3B0aW9ucy5kaXJlY3Rpb24gJiYgU3BsaWRlMi5yZWZyZXNoKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVkdWNlKGVuYWJsZSkge1xuICAgIGlmIChtYXRjaE1lZGlhKE1FRElBX1BSRUZFUlNfUkVEVUNFRF9NT1RJT04pLm1hdGNoZXMpIHtcbiAgICAgIGVuYWJsZSA/IG1lcmdlKG9wdGlvbnMsIHJlZHVjZWRNb3Rpb24pIDogb21pdChvcHRpb25zLCBvd25LZXlzKHJlZHVjZWRNb3Rpb24pKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXQob3B0cywgdXNlcikge1xuICAgIG1lcmdlKG9wdGlvbnMsIG9wdHMpO1xuICAgIHVzZXIgJiYgbWVyZ2UoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9wdGlvbnMpLCBvcHRzKTtcblxuICAgIGlmICghc3RhdGUuaXMoQ1JFQVRFRCkpIHtcbiAgICAgIFNwbGlkZTIuZW1pdChFVkVOVF9VUERBVEVELCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldHVwOiBzZXR1cCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHJlZHVjZTogcmVkdWNlLFxuICAgIHNldDogc2V0XG4gIH07XG59XG5cbnZhciBBUlJPVyA9IFwiQXJyb3dcIjtcbnZhciBBUlJPV19MRUZUID0gQVJST1cgKyBcIkxlZnRcIjtcbnZhciBBUlJPV19SSUdIVCA9IEFSUk9XICsgXCJSaWdodFwiO1xudmFyIEFSUk9XX1VQID0gQVJST1cgKyBcIlVwXCI7XG52YXIgQVJST1dfRE9XTiA9IEFSUk9XICsgXCJEb3duXCI7XG52YXIgTFRSID0gXCJsdHJcIjtcbnZhciBSVEwgPSBcInJ0bFwiO1xudmFyIFRUQiA9IFwidHRiXCI7XG52YXIgT1JJRU5UQVRJT05fTUFQID0ge1xuICB3aWR0aDogW1wiaGVpZ2h0XCJdLFxuICBsZWZ0OiBbXCJ0b3BcIiwgXCJyaWdodFwiXSxcbiAgcmlnaHQ6IFtcImJvdHRvbVwiLCBcImxlZnRcIl0sXG4gIHg6IFtcInlcIl0sXG4gIFg6IFtcIllcIl0sXG4gIFk6IFtcIlhcIl0sXG4gIEFycm93TGVmdDogW0FSUk9XX1VQLCBBUlJPV19SSUdIVF0sXG4gIEFycm93UmlnaHQ6IFtBUlJPV19ET1dOLCBBUlJPV19MRUZUXVxufTtcblxuZnVuY3Rpb24gRGlyZWN0aW9uKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIGZ1bmN0aW9uIHJlc29sdmUocHJvcCwgYXhpc09ubHksIGRpcmVjdGlvbikge1xuICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiB8fCBvcHRpb25zLmRpcmVjdGlvbjtcbiAgICB2YXIgaW5kZXggPSBkaXJlY3Rpb24gPT09IFJUTCAmJiAhYXhpc09ubHkgPyAxIDogZGlyZWN0aW9uID09PSBUVEIgPyAwIDogLTE7XG4gICAgcmV0dXJuIE9SSUVOVEFUSU9OX01BUFtwcm9wXSAmJiBPUklFTlRBVElPTl9NQVBbcHJvcF1baW5kZXhdIHx8IHByb3AucmVwbGFjZSgvd2lkdGh8bGVmdHxyaWdodC9pLCBmdW5jdGlvbiAobWF0Y2gsIG9mZnNldCkge1xuICAgICAgdmFyIHJlcGxhY2VtZW50ID0gT1JJRU5UQVRJT05fTUFQW21hdGNoLnRvTG93ZXJDYXNlKCldW2luZGV4XSB8fCBtYXRjaDtcbiAgICAgIHJldHVybiBvZmZzZXQgPiAwID8gcmVwbGFjZW1lbnQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyByZXBsYWNlbWVudC5zbGljZSgxKSA6IHJlcGxhY2VtZW50O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gb3JpZW50KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICogKG9wdGlvbnMuZGlyZWN0aW9uID09PSBSVEwgPyAxIDogLTEpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNvbHZlOiByZXNvbHZlLFxuICAgIG9yaWVudDogb3JpZW50XG4gIH07XG59XG5cbnZhciBST0xFID0gXCJyb2xlXCI7XG52YXIgVEFCX0lOREVYID0gXCJ0YWJpbmRleFwiO1xudmFyIERJU0FCTEVEID0gXCJkaXNhYmxlZFwiO1xudmFyIEFSSUFfUFJFRklYID0gXCJhcmlhLVwiO1xudmFyIEFSSUFfQ09OVFJPTFMgPSBBUklBX1BSRUZJWCArIFwiY29udHJvbHNcIjtcbnZhciBBUklBX0NVUlJFTlQgPSBBUklBX1BSRUZJWCArIFwiY3VycmVudFwiO1xudmFyIEFSSUFfU0VMRUNURUQgPSBBUklBX1BSRUZJWCArIFwic2VsZWN0ZWRcIjtcbnZhciBBUklBX0xBQkVMID0gQVJJQV9QUkVGSVggKyBcImxhYmVsXCI7XG52YXIgQVJJQV9MQUJFTExFREJZID0gQVJJQV9QUkVGSVggKyBcImxhYmVsbGVkYnlcIjtcbnZhciBBUklBX0hJRERFTiA9IEFSSUFfUFJFRklYICsgXCJoaWRkZW5cIjtcbnZhciBBUklBX09SSUVOVEFUSU9OID0gQVJJQV9QUkVGSVggKyBcIm9yaWVudGF0aW9uXCI7XG52YXIgQVJJQV9ST0xFREVTQ1JJUFRJT04gPSBBUklBX1BSRUZJWCArIFwicm9sZWRlc2NyaXB0aW9uXCI7XG52YXIgQVJJQV9MSVZFID0gQVJJQV9QUkVGSVggKyBcImxpdmVcIjtcbnZhciBBUklBX0JVU1kgPSBBUklBX1BSRUZJWCArIFwiYnVzeVwiO1xudmFyIEFSSUFfQVRPTUlDID0gQVJJQV9QUkVGSVggKyBcImF0b21pY1wiO1xudmFyIEFMTF9BVFRSSUJVVEVTID0gW1JPTEUsIFRBQl9JTkRFWCwgRElTQUJMRUQsIEFSSUFfQ09OVFJPTFMsIEFSSUFfQ1VSUkVOVCwgQVJJQV9MQUJFTCwgQVJJQV9MQUJFTExFREJZLCBBUklBX0hJRERFTiwgQVJJQV9PUklFTlRBVElPTiwgQVJJQV9ST0xFREVTQ1JJUFRJT05dO1xudmFyIENMQVNTX1JPT1QgPSBQUk9KRUNUX0NPREU7XG52YXIgQ0xBU1NfVFJBQ0sgPSBQUk9KRUNUX0NPREUgKyBcIl9fdHJhY2tcIjtcbnZhciBDTEFTU19MSVNUID0gUFJPSkVDVF9DT0RFICsgXCJfX2xpc3RcIjtcbnZhciBDTEFTU19TTElERSA9IFBST0pFQ1RfQ09ERSArIFwiX19zbGlkZVwiO1xudmFyIENMQVNTX0NMT05FID0gQ0xBU1NfU0xJREUgKyBcIi0tY2xvbmVcIjtcbnZhciBDTEFTU19DT05UQUlORVIgPSBDTEFTU19TTElERSArIFwiX19jb250YWluZXJcIjtcbnZhciBDTEFTU19BUlJPV1MgPSBQUk9KRUNUX0NPREUgKyBcIl9fYXJyb3dzXCI7XG52YXIgQ0xBU1NfQVJST1cgPSBQUk9KRUNUX0NPREUgKyBcIl9fYXJyb3dcIjtcbnZhciBDTEFTU19BUlJPV19QUkVWID0gQ0xBU1NfQVJST1cgKyBcIi0tcHJldlwiO1xudmFyIENMQVNTX0FSUk9XX05FWFQgPSBDTEFTU19BUlJPVyArIFwiLS1uZXh0XCI7XG52YXIgQ0xBU1NfUEFHSU5BVElPTiA9IFBST0pFQ1RfQ09ERSArIFwiX19wYWdpbmF0aW9uXCI7XG52YXIgQ0xBU1NfUEFHSU5BVElPTl9QQUdFID0gQ0xBU1NfUEFHSU5BVElPTiArIFwiX19wYWdlXCI7XG52YXIgQ0xBU1NfUFJPR1JFU1MgPSBQUk9KRUNUX0NPREUgKyBcIl9fcHJvZ3Jlc3NcIjtcbnZhciBDTEFTU19QUk9HUkVTU19CQVIgPSBDTEFTU19QUk9HUkVTUyArIFwiX19iYXJcIjtcbnZhciBDTEFTU19UT0dHTEUgPSBQUk9KRUNUX0NPREUgKyBcIl9fdG9nZ2xlXCI7XG52YXIgQ0xBU1NfVE9HR0xFX1BMQVkgPSBDTEFTU19UT0dHTEUgKyBcIl9fcGxheVwiO1xudmFyIENMQVNTX1RPR0dMRV9QQVVTRSA9IENMQVNTX1RPR0dMRSArIFwiX19wYXVzZVwiO1xudmFyIENMQVNTX1NQSU5ORVIgPSBQUk9KRUNUX0NPREUgKyBcIl9fc3Bpbm5lclwiO1xudmFyIENMQVNTX1NSID0gUFJPSkVDVF9DT0RFICsgXCJfX3NyXCI7XG52YXIgQ0xBU1NfSU5JVElBTElaRUQgPSBcImlzLWluaXRpYWxpemVkXCI7XG52YXIgQ0xBU1NfQUNUSVZFID0gXCJpcy1hY3RpdmVcIjtcbnZhciBDTEFTU19QUkVWID0gXCJpcy1wcmV2XCI7XG52YXIgQ0xBU1NfTkVYVCA9IFwiaXMtbmV4dFwiO1xudmFyIENMQVNTX1ZJU0lCTEUgPSBcImlzLXZpc2libGVcIjtcbnZhciBDTEFTU19MT0FESU5HID0gXCJpcy1sb2FkaW5nXCI7XG52YXIgQ0xBU1NfRk9DVVNfSU4gPSBcImlzLWZvY3VzLWluXCI7XG52YXIgU1RBVFVTX0NMQVNTRVMgPSBbQ0xBU1NfQUNUSVZFLCBDTEFTU19WSVNJQkxFLCBDTEFTU19QUkVWLCBDTEFTU19ORVhULCBDTEFTU19MT0FESU5HLCBDTEFTU19GT0NVU19JTl07XG52YXIgQ0xBU1NFUyA9IHtcbiAgc2xpZGU6IENMQVNTX1NMSURFLFxuICBjbG9uZTogQ0xBU1NfQ0xPTkUsXG4gIGFycm93czogQ0xBU1NfQVJST1dTLFxuICBhcnJvdzogQ0xBU1NfQVJST1csXG4gIHByZXY6IENMQVNTX0FSUk9XX1BSRVYsXG4gIG5leHQ6IENMQVNTX0FSUk9XX05FWFQsXG4gIHBhZ2luYXRpb246IENMQVNTX1BBR0lOQVRJT04sXG4gIHBhZ2U6IENMQVNTX1BBR0lOQVRJT05fUEFHRSxcbiAgc3Bpbm5lcjogQ0xBU1NfU1BJTk5FUlxufTtcblxuZnVuY3Rpb24gY2xvc2VzdChmcm9tLCBzZWxlY3Rvcikge1xuICBpZiAoaXNGdW5jdGlvbihmcm9tLmNsb3Nlc3QpKSB7XG4gICAgcmV0dXJuIGZyb20uY2xvc2VzdChzZWxlY3Rvcik7XG4gIH1cblxuICB2YXIgZWxtID0gZnJvbTtcblxuICB3aGlsZSAoZWxtICYmIGVsbS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGlmIChtYXRjaGVzKGVsbSwgc2VsZWN0b3IpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBlbG0gPSBlbG0ucGFyZW50RWxlbWVudDtcbiAgfVxuXG4gIHJldHVybiBlbG07XG59XG5cbnZhciBGUklDVElPTiA9IDU7XG52YXIgTE9HX0lOVEVSVkFMID0gMjAwO1xudmFyIFBPSU5URVJfRE9XTl9FVkVOVFMgPSBcInRvdWNoc3RhcnQgbW91c2Vkb3duXCI7XG52YXIgUE9JTlRFUl9NT1ZFX0VWRU5UUyA9IFwidG91Y2htb3ZlIG1vdXNlbW92ZVwiO1xudmFyIFBPSU5URVJfVVBfRVZFTlRTID0gXCJ0b3VjaGVuZCB0b3VjaGNhbmNlbCBtb3VzZXVwIGNsaWNrXCI7XG5cbmZ1bmN0aW9uIEVsZW1lbnRzKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlLm9uLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZS5iaW5kO1xuXG4gIHZhciByb290ID0gU3BsaWRlMi5yb290O1xuICB2YXIgaTE4biA9IG9wdGlvbnMuaTE4bjtcbiAgdmFyIGVsZW1lbnRzID0ge307XG4gIHZhciBzbGlkZXMgPSBbXTtcbiAgdmFyIHJvb3RDbGFzc2VzID0gW107XG4gIHZhciB0cmFja0NsYXNzZXMgPSBbXTtcbiAgdmFyIHRyYWNrO1xuICB2YXIgbGlzdDtcbiAgdmFyIGlzVXNpbmdLZXk7XG5cbiAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgY29sbGVjdCgpO1xuICAgIGluaXQoKTtcbiAgICB1cGRhdGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIG9uKEVWRU5UX1JFRlJFU0gsIGRlc3Ryb3kpO1xuICAgIG9uKEVWRU5UX1JFRlJFU0gsIHNldHVwKTtcbiAgICBvbihFVkVOVF9VUERBVEVELCB1cGRhdGUpO1xuICAgIGJpbmQoZG9jdW1lbnQsIFBPSU5URVJfRE9XTl9FVkVOVFMgKyBcIiBrZXlkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpc1VzaW5nS2V5ID0gZS50eXBlID09PSBcImtleWRvd25cIjtcbiAgICB9LCB7XG4gICAgICBjYXB0dXJlOiB0cnVlXG4gICAgfSk7XG4gICAgYmluZChyb290LCBcImZvY3VzaW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdG9nZ2xlQ2xhc3Mocm9vdCwgQ0xBU1NfRk9DVVNfSU4sICEhaXNVc2luZ0tleSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KGNvbXBsZXRlbHkpIHtcbiAgICB2YXIgYXR0cnMgPSBBTExfQVRUUklCVVRFUy5jb25jYXQoXCJzdHlsZVwiKTtcbiAgICBlbXB0eShzbGlkZXMpO1xuICAgIHJlbW92ZUNsYXNzKHJvb3QsIHJvb3RDbGFzc2VzKTtcbiAgICByZW1vdmVDbGFzcyh0cmFjaywgdHJhY2tDbGFzc2VzKTtcbiAgICByZW1vdmVBdHRyaWJ1dGUoW3RyYWNrLCBsaXN0XSwgYXR0cnMpO1xuICAgIHJlbW92ZUF0dHJpYnV0ZShyb290LCBjb21wbGV0ZWx5ID8gYXR0cnMgOiBbXCJzdHlsZVwiLCBBUklBX1JPTEVERVNDUklQVElPTl0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHJlbW92ZUNsYXNzKHJvb3QsIHJvb3RDbGFzc2VzKTtcbiAgICByZW1vdmVDbGFzcyh0cmFjaywgdHJhY2tDbGFzc2VzKTtcbiAgICByb290Q2xhc3NlcyA9IGdldENsYXNzZXMoQ0xBU1NfUk9PVCk7XG4gICAgdHJhY2tDbGFzc2VzID0gZ2V0Q2xhc3NlcyhDTEFTU19UUkFDSyk7XG4gICAgYWRkQ2xhc3Mocm9vdCwgcm9vdENsYXNzZXMpO1xuICAgIGFkZENsYXNzKHRyYWNrLCB0cmFja0NsYXNzZXMpO1xuICAgIHNldEF0dHJpYnV0ZShyb290LCBBUklBX0xBQkVMLCBvcHRpb25zLmxhYmVsKTtcbiAgICBzZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9MQUJFTExFREJZLCBvcHRpb25zLmxhYmVsbGVkYnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29sbGVjdCgpIHtcbiAgICB0cmFjayA9IGZpbmQoXCIuXCIgKyBDTEFTU19UUkFDSyk7XG4gICAgbGlzdCA9IGNoaWxkKHRyYWNrLCBcIi5cIiArIENMQVNTX0xJU1QpO1xuICAgIGFzc2VydCh0cmFjayAmJiBsaXN0LCBcIkEgdHJhY2svbGlzdCBlbGVtZW50IGlzIG1pc3NpbmcuXCIpO1xuICAgIHB1c2goc2xpZGVzLCBjaGlsZHJlbihsaXN0LCBcIi5cIiArIENMQVNTX1NMSURFICsgXCI6bm90KC5cIiArIENMQVNTX0NMT05FICsgXCIpXCIpKTtcbiAgICBmb3JPd24oe1xuICAgICAgYXJyb3dzOiBDTEFTU19BUlJPV1MsXG4gICAgICBwYWdpbmF0aW9uOiBDTEFTU19QQUdJTkFUSU9OLFxuICAgICAgcHJldjogQ0xBU1NfQVJST1dfUFJFVixcbiAgICAgIG5leHQ6IENMQVNTX0FSUk9XX05FWFQsXG4gICAgICBiYXI6IENMQVNTX1BST0dSRVNTX0JBUixcbiAgICAgIHRvZ2dsZTogQ0xBU1NfVE9HR0xFXG4gICAgfSwgZnVuY3Rpb24gKGNsYXNzTmFtZSwga2V5KSB7XG4gICAgICBlbGVtZW50c1trZXldID0gZmluZChcIi5cIiArIGNsYXNzTmFtZSk7XG4gICAgfSk7XG4gICAgYXNzaWduKGVsZW1lbnRzLCB7XG4gICAgICByb290OiByb290LFxuICAgICAgdHJhY2s6IHRyYWNrLFxuICAgICAgbGlzdDogbGlzdCxcbiAgICAgIHNsaWRlczogc2xpZGVzXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBpZCA9IHJvb3QuaWQgfHwgdW5pcXVlSWQoUFJPSkVDVF9DT0RFKTtcbiAgICB2YXIgcm9sZSA9IG9wdGlvbnMucm9sZTtcbiAgICByb290LmlkID0gaWQ7XG4gICAgdHJhY2suaWQgPSB0cmFjay5pZCB8fCBpZCArIFwiLXRyYWNrXCI7XG4gICAgbGlzdC5pZCA9IGxpc3QuaWQgfHwgaWQgKyBcIi1saXN0XCI7XG5cbiAgICBpZiAoIWdldEF0dHJpYnV0ZShyb290LCBST0xFKSAmJiByb290LnRhZ05hbWUgIT09IFwiU0VDVElPTlwiICYmIHJvbGUpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShyb290LCBST0xFLCByb2xlKTtcbiAgICB9XG5cbiAgICBzZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9ST0xFREVTQ1JJUFRJT04sIGkxOG4uY2Fyb3VzZWwpO1xuICAgIHNldEF0dHJpYnV0ZShsaXN0LCBST0xFLCBcInByZXNlbnRhdGlvblwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IpIHtcbiAgICB2YXIgZWxtID0gcXVlcnkocm9vdCwgc2VsZWN0b3IpO1xuICAgIHJldHVybiBlbG0gJiYgY2xvc2VzdChlbG0sIFwiLlwiICsgQ0xBU1NfUk9PVCkgPT09IHJvb3QgPyBlbG0gOiB2b2lkIDA7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDbGFzc2VzKGJhc2UpIHtcbiAgICByZXR1cm4gW2Jhc2UgKyBcIi0tXCIgKyBvcHRpb25zLnR5cGUsIGJhc2UgKyBcIi0tXCIgKyBvcHRpb25zLmRpcmVjdGlvbiwgb3B0aW9ucy5kcmFnICYmIGJhc2UgKyBcIi0tZHJhZ2dhYmxlXCIsIG9wdGlvbnMuaXNOYXZpZ2F0aW9uICYmIGJhc2UgKyBcIi0tbmF2XCIsIGJhc2UgPT09IENMQVNTX1JPT1QgJiYgQ0xBU1NfQUNUSVZFXTtcbiAgfVxuXG4gIHJldHVybiBhc3NpZ24oZWxlbWVudHMsIHtcbiAgICBzZXR1cDogc2V0dXAsXG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfSk7XG59XG5cbnZhciBTTElERSA9IFwic2xpZGVcIjtcbnZhciBMT09QID0gXCJsb29wXCI7XG52YXIgRkFERSA9IFwiZmFkZVwiO1xuXG5mdW5jdGlvbiBTbGlkZSQxKFNwbGlkZTIsIGluZGV4LCBzbGlkZUluZGV4LCBzbGlkZSkge1xuICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgdmFyIG9uID0gZXZlbnQub24sXG4gICAgICBlbWl0ID0gZXZlbnQuZW1pdCxcbiAgICAgIGJpbmQgPSBldmVudC5iaW5kO1xuICB2YXIgQ29tcG9uZW50cyA9IFNwbGlkZTIuQ29tcG9uZW50cyxcbiAgICAgIHJvb3QgPSBTcGxpZGUyLnJvb3QsXG4gICAgICBvcHRpb25zID0gU3BsaWRlMi5vcHRpb25zO1xuICB2YXIgaXNOYXZpZ2F0aW9uID0gb3B0aW9ucy5pc05hdmlnYXRpb24sXG4gICAgICB1cGRhdGVPbk1vdmUgPSBvcHRpb25zLnVwZGF0ZU9uTW92ZSxcbiAgICAgIGkxOG4gPSBvcHRpb25zLmkxOG4sXG4gICAgICBwYWdpbmF0aW9uID0gb3B0aW9ucy5wYWdpbmF0aW9uLFxuICAgICAgc2xpZGVGb2N1cyA9IG9wdGlvbnMuc2xpZGVGb2N1cztcbiAgdmFyIHJlc29sdmUgPSBDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlO1xuICB2YXIgc3R5bGVzID0gZ2V0QXR0cmlidXRlKHNsaWRlLCBcInN0eWxlXCIpO1xuICB2YXIgbGFiZWwgPSBnZXRBdHRyaWJ1dGUoc2xpZGUsIEFSSUFfTEFCRUwpO1xuICB2YXIgaXNDbG9uZSA9IHNsaWRlSW5kZXggPiAtMTtcbiAgdmFyIGNvbnRhaW5lciA9IGNoaWxkKHNsaWRlLCBcIi5cIiArIENMQVNTX0NPTlRBSU5FUik7XG4gIHZhciBkZXN0cm95ZWQ7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKCFpc0Nsb25lKSB7XG4gICAgICBzbGlkZS5pZCA9IHJvb3QuaWQgKyBcIi1zbGlkZVwiICsgcGFkKGluZGV4ICsgMSk7XG4gICAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIFJPTEUsIHBhZ2luYXRpb24gPyBcInRhYnBhbmVsXCIgOiBcImdyb3VwXCIpO1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX1JPTEVERVNDUklQVElPTiwgaTE4bi5zbGlkZSk7XG4gICAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIEFSSUFfTEFCRUwsIGxhYmVsIHx8IGZvcm1hdChpMThuLnNsaWRlTGFiZWwsIFtpbmRleCArIDEsIFNwbGlkZTIubGVuZ3RoXSkpO1xuICAgIH1cblxuICAgIGxpc3RlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKCkge1xuICAgIGJpbmQoc2xpZGUsIFwiY2xpY2tcIiwgYXBwbHkoZW1pdCwgRVZFTlRfQ0xJQ0ssIHNlbGYpKTtcbiAgICBiaW5kKHNsaWRlLCBcImtleWRvd25cIiwgYXBwbHkoZW1pdCwgRVZFTlRfU0xJREVfS0VZRE9XTiwgc2VsZikpO1xuICAgIG9uKFtFVkVOVF9NT1ZFRCwgRVZFTlRfU0hJRlRFRCwgRVZFTlRfU0NST0xMRURdLCB1cGRhdGUpO1xuICAgIG9uKEVWRU5UX05BVklHQVRJT05fTU9VTlRFRCwgaW5pdE5hdmlnYXRpb24pO1xuXG4gICAgaWYgKHVwZGF0ZU9uTW92ZSkge1xuICAgICAgb24oRVZFTlRfTU9WRSwgb25Nb3ZlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGRlc3Ryb3llZCA9IHRydWU7XG4gICAgZXZlbnQuZGVzdHJveSgpO1xuICAgIHJlbW92ZUNsYXNzKHNsaWRlLCBTVEFUVVNfQ0xBU1NFUyk7XG4gICAgcmVtb3ZlQXR0cmlidXRlKHNsaWRlLCBBTExfQVRUUklCVVRFUyk7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBcInN0eWxlXCIsIHN0eWxlcyk7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0xBQkVMLCBsYWJlbCB8fCBcIlwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXROYXZpZ2F0aW9uKCkge1xuICAgIHZhciBjb250cm9scyA9IFNwbGlkZTIuc3BsaWRlcy5tYXAoZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgdmFyIFNsaWRlMiA9IHRhcmdldC5zcGxpZGUuQ29tcG9uZW50cy5TbGlkZXMuZ2V0QXQoaW5kZXgpO1xuICAgICAgcmV0dXJuIFNsaWRlMiA/IFNsaWRlMi5zbGlkZS5pZCA6IFwiXCI7XG4gICAgfSkuam9pbihcIiBcIik7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0xBQkVMLCBmb3JtYXQoaTE4bi5zbGlkZVgsIChpc0Nsb25lID8gc2xpZGVJbmRleCA6IGluZGV4KSArIDEpKTtcbiAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIEFSSUFfQ09OVFJPTFMsIGNvbnRyb2xzKTtcbiAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIFJPTEUsIHNsaWRlRm9jdXMgPyBcImJ1dHRvblwiIDogXCJcIik7XG4gICAgc2xpZGVGb2N1cyAmJiByZW1vdmVBdHRyaWJ1dGUoc2xpZGUsIEFSSUFfUk9MRURFU0NSSVBUSU9OKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTW92ZSgpIHtcbiAgICBpZiAoIWRlc3Ryb3llZCkge1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGlmICghZGVzdHJveWVkKSB7XG4gICAgICB2YXIgY3VyciA9IFNwbGlkZTIuaW5kZXg7XG4gICAgICB1cGRhdGVBY3Rpdml0eSgpO1xuICAgICAgdXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgICAgdG9nZ2xlQ2xhc3Moc2xpZGUsIENMQVNTX1BSRVYsIGluZGV4ID09PSBjdXJyIC0gMSk7XG4gICAgICB0b2dnbGVDbGFzcyhzbGlkZSwgQ0xBU1NfTkVYVCwgaW5kZXggPT09IGN1cnIgKyAxKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVBY3Rpdml0eSgpIHtcbiAgICB2YXIgYWN0aXZlID0gaXNBY3RpdmUoKTtcblxuICAgIGlmIChhY3RpdmUgIT09IGhhc0NsYXNzKHNsaWRlLCBDTEFTU19BQ1RJVkUpKSB7XG4gICAgICB0b2dnbGVDbGFzcyhzbGlkZSwgQ0xBU1NfQUNUSVZFLCBhY3RpdmUpO1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0NVUlJFTlQsIGlzTmF2aWdhdGlvbiAmJiBhY3RpdmUgfHwgXCJcIik7XG4gICAgICBlbWl0KGFjdGl2ZSA/IEVWRU5UX0FDVElWRSA6IEVWRU5UX0lOQUNUSVZFLCBzZWxmKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVWaXNpYmlsaXR5KCkge1xuICAgIHZhciB2aXNpYmxlID0gaXNWaXNpYmxlKCk7XG4gICAgdmFyIGhpZGRlbiA9ICF2aXNpYmxlICYmICghaXNBY3RpdmUoKSB8fCBpc0Nsb25lKTtcblxuICAgIGlmICghU3BsaWRlMi5zdGF0ZS5pcyhbTU9WSU5HLCBTQ1JPTExJTkddKSkge1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0hJRERFTiwgaGlkZGVuIHx8IFwiXCIpO1xuICAgIH1cblxuICAgIHNldEF0dHJpYnV0ZShxdWVyeUFsbChzbGlkZSwgb3B0aW9ucy5mb2N1c2FibGVOb2RlcyB8fCBcIlwiKSwgVEFCX0lOREVYLCBoaWRkZW4gPyAtMSA6IFwiXCIpO1xuXG4gICAgaWYgKHNsaWRlRm9jdXMpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgVEFCX0lOREVYLCBoaWRkZW4gPyAtMSA6IDApO1xuICAgIH1cblxuICAgIGlmICh2aXNpYmxlICE9PSBoYXNDbGFzcyhzbGlkZSwgQ0xBU1NfVklTSUJMRSkpIHtcbiAgICAgIHRvZ2dsZUNsYXNzKHNsaWRlLCBDTEFTU19WSVNJQkxFLCB2aXNpYmxlKTtcbiAgICAgIGVtaXQodmlzaWJsZSA/IEVWRU5UX1ZJU0lCTEUgOiBFVkVOVF9ISURERU4sIHNlbGYpO1xuICAgIH1cblxuICAgIGlmICghdmlzaWJsZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBzbGlkZSkge1xuICAgICAgdmFyIFNsaWRlMiA9IENvbXBvbmVudHMuU2xpZGVzLmdldEF0KFNwbGlkZTIuaW5kZXgpO1xuICAgICAgU2xpZGUyICYmIGZvY3VzKFNsaWRlMi5zbGlkZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3R5bGUkMShwcm9wLCB2YWx1ZSwgdXNlQ29udGFpbmVyKSB7XG4gICAgc3R5bGUodXNlQ29udGFpbmVyICYmIGNvbnRhaW5lciB8fCBzbGlkZSwgcHJvcCwgdmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgdmFyIGN1cnIgPSBTcGxpZGUyLmluZGV4O1xuICAgIHJldHVybiBjdXJyID09PSBpbmRleCB8fCBvcHRpb25zLmNsb25lU3RhdHVzICYmIGN1cnIgPT09IHNsaWRlSW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiBpc1Zpc2libGUoKSB7XG4gICAgaWYgKFNwbGlkZTIuaXMoRkFERSkpIHtcbiAgICAgIHJldHVybiBpc0FjdGl2ZSgpO1xuICAgIH1cblxuICAgIHZhciB0cmFja1JlY3QgPSByZWN0KENvbXBvbmVudHMuRWxlbWVudHMudHJhY2spO1xuICAgIHZhciBzbGlkZVJlY3QgPSByZWN0KHNsaWRlKTtcbiAgICB2YXIgbGVmdCA9IHJlc29sdmUoXCJsZWZ0XCIsIHRydWUpO1xuICAgIHZhciByaWdodCA9IHJlc29sdmUoXCJyaWdodFwiLCB0cnVlKTtcbiAgICByZXR1cm4gZmxvb3IodHJhY2tSZWN0W2xlZnRdKSA8PSBjZWlsKHNsaWRlUmVjdFtsZWZ0XSkgJiYgZmxvb3Ioc2xpZGVSZWN0W3JpZ2h0XSkgPD0gY2VpbCh0cmFja1JlY3RbcmlnaHRdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzV2l0aGluKGZyb20sIGRpc3RhbmNlKSB7XG4gICAgdmFyIGRpZmYgPSBhYnMoZnJvbSAtIGluZGV4KTtcblxuICAgIGlmICghaXNDbG9uZSAmJiAob3B0aW9ucy5yZXdpbmQgfHwgU3BsaWRlMi5pcyhMT09QKSkpIHtcbiAgICAgIGRpZmYgPSBtaW4oZGlmZiwgU3BsaWRlMi5sZW5ndGggLSBkaWZmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlmZiA8PSBkaXN0YW5jZTtcbiAgfVxuXG4gIHZhciBzZWxmID0ge1xuICAgIGluZGV4OiBpbmRleCxcbiAgICBzbGlkZUluZGV4OiBzbGlkZUluZGV4LFxuICAgIHNsaWRlOiBzbGlkZSxcbiAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICBpc0Nsb25lOiBpc0Nsb25lLFxuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHVwZGF0ZTogdXBkYXRlLFxuICAgIHN0eWxlOiBzdHlsZSQxLFxuICAgIGlzV2l0aGluOiBpc1dpdGhpblxuICB9O1xuICByZXR1cm4gc2VsZjtcbn1cblxuZnVuY3Rpb24gU2xpZGVzKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UyID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTIub24sXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlMi5lbWl0LFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTIuYmluZDtcblxuICB2YXIgX0NvbXBvbmVudHMyJEVsZW1lbnRzID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICBzbGlkZXMgPSBfQ29tcG9uZW50czIkRWxlbWVudHMuc2xpZGVzLFxuICAgICAgbGlzdCA9IF9Db21wb25lbnRzMiRFbGVtZW50cy5saXN0O1xuICB2YXIgU2xpZGVzMiA9IFtdO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGluaXQoKTtcbiAgICBvbihFVkVOVF9SRUZSRVNILCBkZXN0cm95KTtcbiAgICBvbihFVkVOVF9SRUZSRVNILCBpbml0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgc2xpZGVzLmZvckVhY2goZnVuY3Rpb24gKHNsaWRlLCBpbmRleCkge1xuICAgICAgcmVnaXN0ZXIoc2xpZGUsIGluZGV4LCAtMSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGZvckVhY2gkMShmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICBTbGlkZTIuZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIGVtcHR5KFNsaWRlczIpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGZvckVhY2gkMShmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICBTbGlkZTIudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlcihzbGlkZSwgaW5kZXgsIHNsaWRlSW5kZXgpIHtcbiAgICB2YXIgb2JqZWN0ID0gU2xpZGUkMShTcGxpZGUyLCBpbmRleCwgc2xpZGVJbmRleCwgc2xpZGUpO1xuICAgIG9iamVjdC5tb3VudCgpO1xuICAgIFNsaWRlczIucHVzaChvYmplY3QpO1xuICAgIFNsaWRlczIuc29ydChmdW5jdGlvbiAoU2xpZGUxLCBTbGlkZTIpIHtcbiAgICAgIHJldHVybiBTbGlkZTEuaW5kZXggLSBTbGlkZTIuaW5kZXg7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXQoZXhjbHVkZUNsb25lcykge1xuICAgIHJldHVybiBleGNsdWRlQ2xvbmVzID8gZmlsdGVyKGZ1bmN0aW9uIChTbGlkZTIpIHtcbiAgICAgIHJldHVybiAhU2xpZGUyLmlzQ2xvbmU7XG4gICAgfSkgOiBTbGlkZXMyO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW4ocGFnZSkge1xuICAgIHZhciBDb250cm9sbGVyID0gQ29tcG9uZW50czIuQ29udHJvbGxlcjtcbiAgICB2YXIgaW5kZXggPSBDb250cm9sbGVyLnRvSW5kZXgocGFnZSk7XG4gICAgdmFyIG1heCA9IENvbnRyb2xsZXIuaGFzRm9jdXMoKSA/IDEgOiBvcHRpb25zLnBlclBhZ2U7XG4gICAgcmV0dXJuIGZpbHRlcihmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICByZXR1cm4gYmV0d2VlbihTbGlkZTIuaW5kZXgsIGluZGV4LCBpbmRleCArIG1heCAtIDEpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QXQoaW5kZXgpIHtcbiAgICByZXR1cm4gZmlsdGVyKGluZGV4KVswXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZChpdGVtcywgaW5kZXgpIHtcbiAgICBmb3JFYWNoKGl0ZW1zLCBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgIGlmIChpc1N0cmluZyhzbGlkZSkpIHtcbiAgICAgICAgc2xpZGUgPSBwYXJzZUh0bWwoc2xpZGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNIVE1MRWxlbWVudChzbGlkZSkpIHtcbiAgICAgICAgdmFyIHJlZiA9IHNsaWRlc1tpbmRleF07XG4gICAgICAgIHJlZiA/IGJlZm9yZShzbGlkZSwgcmVmKSA6IGFwcGVuZChsaXN0LCBzbGlkZSk7XG4gICAgICAgIGFkZENsYXNzKHNsaWRlLCBvcHRpb25zLmNsYXNzZXMuc2xpZGUpO1xuICAgICAgICBvYnNlcnZlSW1hZ2VzKHNsaWRlLCBhcHBseShlbWl0LCBFVkVOVF9SRVNJWkUpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBlbWl0KEVWRU5UX1JFRlJFU0gpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlJDEobWF0Y2hlcikge1xuICAgIHJlbW92ZShmaWx0ZXIobWF0Y2hlcikubWFwKGZ1bmN0aW9uIChTbGlkZTIpIHtcbiAgICAgIHJldHVybiBTbGlkZTIuc2xpZGU7XG4gICAgfSkpO1xuICAgIGVtaXQoRVZFTlRfUkVGUkVTSCk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JFYWNoJDEoaXRlcmF0ZWUsIGV4Y2x1ZGVDbG9uZXMpIHtcbiAgICBnZXQoZXhjbHVkZUNsb25lcykuZm9yRWFjaChpdGVyYXRlZSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXIobWF0Y2hlcikge1xuICAgIHJldHVybiBTbGlkZXMyLmZpbHRlcihpc0Z1bmN0aW9uKG1hdGNoZXIpID8gbWF0Y2hlciA6IGZ1bmN0aW9uIChTbGlkZTIpIHtcbiAgICAgIHJldHVybiBpc1N0cmluZyhtYXRjaGVyKSA/IG1hdGNoZXMoU2xpZGUyLnNsaWRlLCBtYXRjaGVyKSA6IGluY2x1ZGVzKHRvQXJyYXkobWF0Y2hlciksIFNsaWRlMi5pbmRleCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdHlsZShwcm9wLCB2YWx1ZSwgdXNlQ29udGFpbmVyKSB7XG4gICAgZm9yRWFjaCQxKGZ1bmN0aW9uIChTbGlkZTIpIHtcbiAgICAgIFNsaWRlMi5zdHlsZShwcm9wLCB2YWx1ZSwgdXNlQ29udGFpbmVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9ic2VydmVJbWFnZXMoZWxtLCBjYWxsYmFjaykge1xuICAgIHZhciBpbWFnZXMgPSBxdWVyeUFsbChlbG0sIFwiaW1nXCIpO1xuICAgIHZhciBsZW5ndGggPSBpbWFnZXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCkge1xuICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGltZykge1xuICAgICAgICBiaW5kKGltZywgXCJsb2FkIGVycm9yXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoISAtLWxlbmd0aCkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGVuZ3RoKGV4Y2x1ZGVDbG9uZXMpIHtcbiAgICByZXR1cm4gZXhjbHVkZUNsb25lcyA/IHNsaWRlcy5sZW5ndGggOiBTbGlkZXMyLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRW5vdWdoKCkge1xuICAgIHJldHVybiBTbGlkZXMyLmxlbmd0aCA+IG9wdGlvbnMucGVyUGFnZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgdXBkYXRlOiB1cGRhdGUsXG4gICAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxuICAgIGdldDogZ2V0LFxuICAgIGdldEluOiBnZXRJbixcbiAgICBnZXRBdDogZ2V0QXQsXG4gICAgYWRkOiBhZGQsXG4gICAgcmVtb3ZlOiByZW1vdmUkMSxcbiAgICBmb3JFYWNoOiBmb3JFYWNoJDEsXG4gICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgc3R5bGU6IHN0eWxlLFxuICAgIGdldExlbmd0aDogZ2V0TGVuZ3RoLFxuICAgIGlzRW5vdWdoOiBpc0Vub3VnaFxuICB9O1xufVxuXG5mdW5jdGlvbiBMYXlvdXQoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTMgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMy5vbixcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UzLmJpbmQsXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlMy5lbWl0O1xuXG4gIHZhciBTbGlkZXMgPSBDb21wb25lbnRzMi5TbGlkZXM7XG4gIHZhciByZXNvbHZlID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLnJlc29sdmU7XG4gIHZhciBfQ29tcG9uZW50czIkRWxlbWVudHMyID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICByb290ID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzMi5yb290LFxuICAgICAgdHJhY2sgPSBfQ29tcG9uZW50czIkRWxlbWVudHMyLnRyYWNrLFxuICAgICAgbGlzdCA9IF9Db21wb25lbnRzMiRFbGVtZW50czIubGlzdDtcbiAgdmFyIGdldEF0ID0gU2xpZGVzLmdldEF0LFxuICAgICAgc3R5bGVTbGlkZXMgPSBTbGlkZXMuc3R5bGU7XG4gIHZhciB2ZXJ0aWNhbDtcbiAgdmFyIHJvb3RSZWN0O1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGluaXQoKTtcbiAgICBiaW5kKHdpbmRvdywgXCJyZXNpemUgbG9hZFwiLCBUaHJvdHRsZShhcHBseShlbWl0LCBFVkVOVF9SRVNJWkUpKSk7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCBpbml0KTtcbiAgICBvbihFVkVOVF9SRVNJWkUsIHJlc2l6ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHJvb3RSZWN0ID0gbnVsbDtcbiAgICB2ZXJ0aWNhbCA9IG9wdGlvbnMuZGlyZWN0aW9uID09PSBUVEI7XG4gICAgc3R5bGUocm9vdCwgXCJtYXhXaWR0aFwiLCB1bml0KG9wdGlvbnMud2lkdGgpKTtcbiAgICBzdHlsZSh0cmFjaywgcmVzb2x2ZShcInBhZGRpbmdMZWZ0XCIpLCBjc3NQYWRkaW5nKGZhbHNlKSk7XG4gICAgc3R5bGUodHJhY2ssIHJlc29sdmUoXCJwYWRkaW5nUmlnaHRcIiksIGNzc1BhZGRpbmcodHJ1ZSkpO1xuICAgIHJlc2l6ZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgIHZhciBuZXdSZWN0ID0gcmVjdChyb290KTtcblxuICAgIGlmICghcm9vdFJlY3QgfHwgcm9vdFJlY3Qud2lkdGggIT09IG5ld1JlY3Qud2lkdGggfHwgcm9vdFJlY3QuaGVpZ2h0ICE9PSBuZXdSZWN0LmhlaWdodCkge1xuICAgICAgc3R5bGUodHJhY2ssIFwiaGVpZ2h0XCIsIGNzc1RyYWNrSGVpZ2h0KCkpO1xuICAgICAgc3R5bGVTbGlkZXMocmVzb2x2ZShcIm1hcmdpblJpZ2h0XCIpLCB1bml0KG9wdGlvbnMuZ2FwKSk7XG4gICAgICBzdHlsZVNsaWRlcyhcIndpZHRoXCIsIGNzc1NsaWRlV2lkdGgoKSk7XG4gICAgICBzdHlsZVNsaWRlcyhcImhlaWdodFwiLCBjc3NTbGlkZUhlaWdodCgpLCB0cnVlKTtcbiAgICAgIHJvb3RSZWN0ID0gbmV3UmVjdDtcbiAgICAgIGVtaXQoRVZFTlRfUkVTSVpFRCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3NzUGFkZGluZyhyaWdodCkge1xuICAgIHZhciBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nO1xuICAgIHZhciBwcm9wID0gcmVzb2x2ZShyaWdodCA/IFwicmlnaHRcIiA6IFwibGVmdFwiKTtcbiAgICByZXR1cm4gcGFkZGluZyAmJiB1bml0KHBhZGRpbmdbcHJvcF0gfHwgKGlzT2JqZWN0KHBhZGRpbmcpID8gMCA6IHBhZGRpbmcpKSB8fCBcIjBweFwiO1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzVHJhY2tIZWlnaHQoKSB7XG4gICAgdmFyIGhlaWdodCA9IFwiXCI7XG5cbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIGhlaWdodCA9IGNzc0hlaWdodCgpO1xuICAgICAgYXNzZXJ0KGhlaWdodCwgXCJoZWlnaHQgb3IgaGVpZ2h0UmF0aW8gaXMgbWlzc2luZy5cIik7XG4gICAgICBoZWlnaHQgPSBcImNhbGMoXCIgKyBoZWlnaHQgKyBcIiAtIFwiICsgY3NzUGFkZGluZyhmYWxzZSkgKyBcIiAtIFwiICsgY3NzUGFkZGluZyh0cnVlKSArIFwiKVwiO1xuICAgIH1cblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjc3NIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHVuaXQob3B0aW9ucy5oZWlnaHQgfHwgcmVjdChsaXN0KS53aWR0aCAqIG9wdGlvbnMuaGVpZ2h0UmF0aW8pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzU2xpZGVXaWR0aCgpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5hdXRvV2lkdGggPyBudWxsIDogdW5pdChvcHRpb25zLmZpeGVkV2lkdGgpIHx8ICh2ZXJ0aWNhbCA/IFwiXCIgOiBjc3NTbGlkZVNpemUoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjc3NTbGlkZUhlaWdodCgpIHtcbiAgICByZXR1cm4gdW5pdChvcHRpb25zLmZpeGVkSGVpZ2h0KSB8fCAodmVydGljYWwgPyBvcHRpb25zLmF1dG9IZWlnaHQgPyBudWxsIDogY3NzU2xpZGVTaXplKCkgOiBjc3NIZWlnaHQoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjc3NTbGlkZVNpemUoKSB7XG4gICAgdmFyIGdhcCA9IHVuaXQob3B0aW9ucy5nYXApO1xuICAgIHJldHVybiBcImNhbGMoKDEwMCVcIiArIChnYXAgJiYgXCIgKyBcIiArIGdhcCkgKyBcIikvXCIgKyAob3B0aW9ucy5wZXJQYWdlIHx8IDEpICsgKGdhcCAmJiBcIiAtIFwiICsgZ2FwKSArIFwiKVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdFNpemUoKSB7XG4gICAgcmV0dXJuIHJlY3QobGlzdClbcmVzb2x2ZShcIndpZHRoXCIpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlU2l6ZShpbmRleCwgd2l0aG91dEdhcCkge1xuICAgIHZhciBTbGlkZSA9IGdldEF0KGluZGV4IHx8IDApO1xuICAgIHJldHVybiBTbGlkZSA/IHJlY3QoU2xpZGUuc2xpZGUpW3Jlc29sdmUoXCJ3aWR0aFwiKV0gKyAod2l0aG91dEdhcCA/IDAgOiBnZXRHYXAoKSkgOiAwO1xuICB9XG5cbiAgZnVuY3Rpb24gdG90YWxTaXplKGluZGV4LCB3aXRob3V0R2FwKSB7XG4gICAgdmFyIFNsaWRlID0gZ2V0QXQoaW5kZXgpO1xuXG4gICAgaWYgKFNsaWRlKSB7XG4gICAgICB2YXIgcmlnaHQgPSByZWN0KFNsaWRlLnNsaWRlKVtyZXNvbHZlKFwicmlnaHRcIildO1xuICAgICAgdmFyIGxlZnQgPSByZWN0KGxpc3QpW3Jlc29sdmUoXCJsZWZ0XCIpXTtcbiAgICAgIHJldHVybiBhYnMocmlnaHQgLSBsZWZ0KSArICh3aXRob3V0R2FwID8gMCA6IGdldEdhcCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlclNpemUoKSB7XG4gICAgcmV0dXJuIHRvdGFsU2l6ZShTcGxpZGUyLmxlbmd0aCAtIDEsIHRydWUpIC0gdG90YWxTaXplKC0xLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEdhcCgpIHtcbiAgICB2YXIgU2xpZGUgPSBnZXRBdCgwKTtcbiAgICByZXR1cm4gU2xpZGUgJiYgcGFyc2VGbG9hdChzdHlsZShTbGlkZS5zbGlkZSwgcmVzb2x2ZShcIm1hcmdpblJpZ2h0XCIpKSkgfHwgMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhZGRpbmcocmlnaHQpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZSh0cmFjaywgcmVzb2x2ZShcInBhZGRpbmdcIiArIChyaWdodCA/IFwiUmlnaHRcIiA6IFwiTGVmdFwiKSkpKSB8fCAwO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgbGlzdFNpemU6IGxpc3RTaXplLFxuICAgIHNsaWRlU2l6ZTogc2xpZGVTaXplLFxuICAgIHNsaWRlclNpemU6IHNsaWRlclNpemUsXG4gICAgdG90YWxTaXplOiB0b3RhbFNpemUsXG4gICAgZ2V0UGFkZGluZzogZ2V0UGFkZGluZ1xuICB9O1xufVxuXG52YXIgTVVMVElQTElFUiA9IDI7XG5cbmZ1bmN0aW9uIENsb25lcyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlNCA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U0Lm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTQuZW1pdDtcblxuICB2YXIgRWxlbWVudHMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIFNsaWRlcyA9IENvbXBvbmVudHMyLlNsaWRlcztcbiAgdmFyIHJlc29sdmUgPSBDb21wb25lbnRzMi5EaXJlY3Rpb24ucmVzb2x2ZTtcbiAgdmFyIGNsb25lcyA9IFtdO1xuICB2YXIgY2xvbmVDb3VudDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpbml0KCk7XG4gICAgb24oRVZFTlRfUkVGUkVTSCwgZGVzdHJveSk7XG4gICAgb24oRVZFTlRfUkVGUkVTSCwgaW5pdCk7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFU0laRV0sIG9ic2VydmUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBpZiAoY2xvbmVDb3VudCA9IGNvbXB1dGVDbG9uZUNvdW50KCkpIHtcbiAgICAgIGdlbmVyYXRlKGNsb25lQ291bnQpO1xuICAgICAgZW1pdChFVkVOVF9SRVNJWkUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgcmVtb3ZlKGNsb25lcyk7XG4gICAgZW1wdHkoY2xvbmVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9ic2VydmUoKSB7XG4gICAgaWYgKGNsb25lQ291bnQgPCBjb21wdXRlQ2xvbmVDb3VudCgpKSB7XG4gICAgICBlbWl0KEVWRU5UX1JFRlJFU0gpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlKGNvdW50KSB7XG4gICAgdmFyIHNsaWRlcyA9IFNsaWRlcy5nZXQoKS5zbGljZSgpO1xuICAgIHZhciBsZW5ndGggPSBzbGlkZXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCkge1xuICAgICAgd2hpbGUgKHNsaWRlcy5sZW5ndGggPCBjb3VudCkge1xuICAgICAgICBwdXNoKHNsaWRlcywgc2xpZGVzKTtcbiAgICAgIH1cblxuICAgICAgcHVzaChzbGlkZXMuc2xpY2UoLWNvdW50KSwgc2xpZGVzLnNsaWNlKDAsIGNvdW50KSkuZm9yRWFjaChmdW5jdGlvbiAoU2xpZGUsIGluZGV4KSB7XG4gICAgICAgIHZhciBpc0hlYWQgPSBpbmRleCA8IGNvdW50O1xuICAgICAgICB2YXIgY2xvbmUgPSBjbG9uZURlZXAoU2xpZGUuc2xpZGUsIGluZGV4KTtcbiAgICAgICAgaXNIZWFkID8gYmVmb3JlKGNsb25lLCBzbGlkZXNbMF0uc2xpZGUpIDogYXBwZW5kKEVsZW1lbnRzLmxpc3QsIGNsb25lKTtcbiAgICAgICAgcHVzaChjbG9uZXMsIGNsb25lKTtcbiAgICAgICAgU2xpZGVzLnJlZ2lzdGVyKGNsb25lLCBpbmRleCAtIGNvdW50ICsgKGlzSGVhZCA/IDAgOiBsZW5ndGgpLCBTbGlkZS5pbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9uZURlZXAoZWxtLCBpbmRleCkge1xuICAgIHZhciBjbG9uZSA9IGVsbS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgYWRkQ2xhc3MoY2xvbmUsIG9wdGlvbnMuY2xhc3Nlcy5jbG9uZSk7XG4gICAgY2xvbmUuaWQgPSBTcGxpZGUyLnJvb3QuaWQgKyBcIi1jbG9uZVwiICsgcGFkKGluZGV4ICsgMSk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZUNsb25lQ291bnQoKSB7XG4gICAgdmFyIGNsb25lczIgPSBvcHRpb25zLmNsb25lcztcblxuICAgIGlmICghU3BsaWRlMi5pcyhMT09QKSkge1xuICAgICAgY2xvbmVzMiA9IDA7XG4gICAgfSBlbHNlIGlmICghY2xvbmVzMikge1xuICAgICAgdmFyIGZpeGVkU2l6ZSA9IG9wdGlvbnNbcmVzb2x2ZShcImZpeGVkV2lkdGhcIildICYmIENvbXBvbmVudHMyLkxheW91dC5zbGlkZVNpemUoMCk7XG4gICAgICB2YXIgZml4ZWRDb3VudCA9IGZpeGVkU2l6ZSAmJiBjZWlsKHJlY3QoRWxlbWVudHMudHJhY2spW3Jlc29sdmUoXCJ3aWR0aFwiKV0gLyBmaXhlZFNpemUpO1xuICAgICAgY2xvbmVzMiA9IGZpeGVkQ291bnQgfHwgb3B0aW9uc1tyZXNvbHZlKFwiYXV0b1dpZHRoXCIpXSAmJiBTcGxpZGUyLmxlbmd0aCB8fCBvcHRpb25zLnBlclBhZ2UgKiBNVUxUSVBMSUVSO1xuICAgIH1cblxuICAgIHJldHVybiBjbG9uZXMyO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xufVxuXG5mdW5jdGlvbiBNb3ZlKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2U1ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTUub24sXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlNS5lbWl0O1xuXG4gIHZhciBzZXQgPSBTcGxpZGUyLnN0YXRlLnNldDtcbiAgdmFyIF9Db21wb25lbnRzMiRMYXlvdXQgPSBDb21wb25lbnRzMi5MYXlvdXQsXG4gICAgICBzbGlkZVNpemUgPSBfQ29tcG9uZW50czIkTGF5b3V0LnNsaWRlU2l6ZSxcbiAgICAgIGdldFBhZGRpbmcgPSBfQ29tcG9uZW50czIkTGF5b3V0LmdldFBhZGRpbmcsXG4gICAgICB0b3RhbFNpemUgPSBfQ29tcG9uZW50czIkTGF5b3V0LnRvdGFsU2l6ZSxcbiAgICAgIGxpc3RTaXplID0gX0NvbXBvbmVudHMyJExheW91dC5saXN0U2l6ZSxcbiAgICAgIHNsaWRlclNpemUgPSBfQ29tcG9uZW50czIkTGF5b3V0LnNsaWRlclNpemU7XG4gIHZhciBfQ29tcG9uZW50czIkRGlyZWN0aW8gPSBDb21wb25lbnRzMi5EaXJlY3Rpb24sXG4gICAgICByZXNvbHZlID0gX0NvbXBvbmVudHMyJERpcmVjdGlvLnJlc29sdmUsXG4gICAgICBvcmllbnQgPSBfQ29tcG9uZW50czIkRGlyZWN0aW8ub3JpZW50O1xuICB2YXIgX0NvbXBvbmVudHMyJEVsZW1lbnRzMyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgbGlzdCA9IF9Db21wb25lbnRzMiRFbGVtZW50czMubGlzdCxcbiAgICAgIHRyYWNrID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzMy50cmFjaztcbiAgdmFyIFRyYW5zaXRpb247XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgVHJhbnNpdGlvbiA9IENvbXBvbmVudHMyLlRyYW5zaXRpb247XG4gICAgb24oW0VWRU5UX01PVU5URUQsIEVWRU5UX1JFU0laRUQsIEVWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCByZXBvc2l0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcG9zaXRpb24oKSB7XG4gICAgaWYgKCFDb21wb25lbnRzMi5Db250cm9sbGVyLmlzQnVzeSgpKSB7XG4gICAgICBDb21wb25lbnRzMi5TY3JvbGwuY2FuY2VsKCk7XG4gICAgICBqdW1wKFNwbGlkZTIuaW5kZXgpO1xuICAgICAgQ29tcG9uZW50czIuU2xpZGVzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUoZGVzdCwgaW5kZXgsIHByZXYsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGRlc3QgIT09IGluZGV4ICYmIGNhblNoaWZ0KGRlc3QgPiBwcmV2KSkge1xuICAgICAgY2FuY2VsKCk7XG4gICAgICB0cmFuc2xhdGUoc2hpZnQoZ2V0UG9zaXRpb24oKSwgZGVzdCA+IHByZXYpLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzZXQoTU9WSU5HKTtcbiAgICBlbWl0KEVWRU5UX01PVkUsIGluZGV4LCBwcmV2LCBkZXN0KTtcbiAgICBUcmFuc2l0aW9uLnN0YXJ0KGluZGV4LCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXQoSURMRSk7XG4gICAgICBlbWl0KEVWRU5UX01PVkVELCBpbmRleCwgcHJldiwgZGVzdCk7XG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24ganVtcChpbmRleCkge1xuICAgIHRyYW5zbGF0ZSh0b1Bvc2l0aW9uKGluZGV4LCB0cnVlKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2xhdGUocG9zaXRpb24sIHByZXZlbnRMb29wKSB7XG4gICAgaWYgKCFTcGxpZGUyLmlzKEZBREUpKSB7XG4gICAgICB2YXIgZGVzdGluYXRpb24gPSBwcmV2ZW50TG9vcCA/IHBvc2l0aW9uIDogbG9vcChwb3NpdGlvbik7XG4gICAgICBzdHlsZShsaXN0LCBcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVwiICsgcmVzb2x2ZShcIlhcIikgKyBcIihcIiArIGRlc3RpbmF0aW9uICsgXCJweClcIik7XG4gICAgICBwb3NpdGlvbiAhPT0gZGVzdGluYXRpb24gJiYgZW1pdChFVkVOVF9TSElGVEVEKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsb29wKHBvc2l0aW9uKSB7XG4gICAgaWYgKFNwbGlkZTIuaXMoTE9PUCkpIHtcbiAgICAgIHZhciBpbmRleCA9IHRvSW5kZXgocG9zaXRpb24pO1xuICAgICAgdmFyIGV4Y2VlZGVkTWF4ID0gaW5kZXggPiBDb21wb25lbnRzMi5Db250cm9sbGVyLmdldEVuZCgpO1xuICAgICAgdmFyIGV4Y2VlZGVkTWluID0gaW5kZXggPCAwO1xuXG4gICAgICBpZiAoZXhjZWVkZWRNaW4gfHwgZXhjZWVkZWRNYXgpIHtcbiAgICAgICAgcG9zaXRpb24gPSBzaGlmdChwb3NpdGlvbiwgZXhjZWVkZWRNYXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNoaWZ0KHBvc2l0aW9uLCBiYWNrd2FyZHMpIHtcbiAgICB2YXIgZXhjZXNzID0gcG9zaXRpb24gLSBnZXRMaW1pdChiYWNrd2FyZHMpO1xuICAgIHZhciBzaXplID0gc2xpZGVyU2l6ZSgpO1xuICAgIHBvc2l0aW9uIC09IG9yaWVudChzaXplICogKGNlaWwoYWJzKGV4Y2VzcykgLyBzaXplKSB8fCAxKSkgKiAoYmFja3dhcmRzID8gMSA6IC0xKTtcbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgdHJhbnNsYXRlKGdldFBvc2l0aW9uKCkpO1xuICAgIFRyYW5zaXRpb24uY2FuY2VsKCk7XG4gIH1cblxuICBmdW5jdGlvbiB0b0luZGV4KHBvc2l0aW9uKSB7XG4gICAgdmFyIFNsaWRlcyA9IENvbXBvbmVudHMyLlNsaWRlcy5nZXQoKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBtaW5EaXN0YW5jZSA9IEluZmluaXR5O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBTbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzbGlkZUluZGV4ID0gU2xpZGVzW2ldLmluZGV4O1xuICAgICAgdmFyIGRpc3RhbmNlID0gYWJzKHRvUG9zaXRpb24oc2xpZGVJbmRleCwgdHJ1ZSkgLSBwb3NpdGlvbik7XG5cbiAgICAgIGlmIChkaXN0YW5jZSA8PSBtaW5EaXN0YW5jZSkge1xuICAgICAgICBtaW5EaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICBpbmRleCA9IHNsaWRlSW5kZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiB0b1Bvc2l0aW9uKGluZGV4LCB0cmltbWluZykge1xuICAgIHZhciBwb3NpdGlvbiA9IG9yaWVudCh0b3RhbFNpemUoaW5kZXggLSAxKSAtIG9mZnNldChpbmRleCkpO1xuICAgIHJldHVybiB0cmltbWluZyA/IHRyaW0ocG9zaXRpb24pIDogcG9zaXRpb247XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQb3NpdGlvbigpIHtcbiAgICB2YXIgbGVmdCA9IHJlc29sdmUoXCJsZWZ0XCIpO1xuICAgIHJldHVybiByZWN0KGxpc3QpW2xlZnRdIC0gcmVjdCh0cmFjaylbbGVmdF0gKyBvcmllbnQoZ2V0UGFkZGluZyhmYWxzZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJpbShwb3NpdGlvbikge1xuICAgIGlmIChvcHRpb25zLnRyaW1TcGFjZSAmJiBTcGxpZGUyLmlzKFNMSURFKSkge1xuICAgICAgcG9zaXRpb24gPSBjbGFtcChwb3NpdGlvbiwgMCwgb3JpZW50KHNsaWRlclNpemUoKSAtIGxpc3RTaXplKCkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBmdW5jdGlvbiBvZmZzZXQoaW5kZXgpIHtcbiAgICB2YXIgZm9jdXMgPSBvcHRpb25zLmZvY3VzO1xuICAgIHJldHVybiBmb2N1cyA9PT0gXCJjZW50ZXJcIiA/IChsaXN0U2l6ZSgpIC0gc2xpZGVTaXplKGluZGV4LCB0cnVlKSkgLyAyIDogK2ZvY3VzICogc2xpZGVTaXplKGluZGV4KSB8fCAwO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGltaXQobWF4KSB7XG4gICAgcmV0dXJuIHRvUG9zaXRpb24obWF4ID8gQ29tcG9uZW50czIuQ29udHJvbGxlci5nZXRFbmQoKSA6IDAsICEhb3B0aW9ucy50cmltU3BhY2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuU2hpZnQoYmFja3dhcmRzKSB7XG4gICAgdmFyIHNoaWZ0ZWQgPSBvcmllbnQoc2hpZnQoZ2V0UG9zaXRpb24oKSwgYmFja3dhcmRzKSk7XG4gICAgcmV0dXJuIGJhY2t3YXJkcyA/IHNoaWZ0ZWQgPj0gMCA6IHNoaWZ0ZWQgPD0gbGlzdFtyZXNvbHZlKFwic2Nyb2xsV2lkdGhcIildIC0gcmVjdCh0cmFjaylbcmVzb2x2ZShcIndpZHRoXCIpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4Y2VlZGVkTGltaXQobWF4LCBwb3NpdGlvbikge1xuICAgIHBvc2l0aW9uID0gaXNVbmRlZmluZWQocG9zaXRpb24pID8gZ2V0UG9zaXRpb24oKSA6IHBvc2l0aW9uO1xuICAgIHZhciBleGNlZWRlZE1pbiA9IG1heCAhPT0gdHJ1ZSAmJiBvcmllbnQocG9zaXRpb24pIDwgb3JpZW50KGdldExpbWl0KGZhbHNlKSk7XG4gICAgdmFyIGV4Y2VlZGVkTWF4ID0gbWF4ICE9PSBmYWxzZSAmJiBvcmllbnQocG9zaXRpb24pID4gb3JpZW50KGdldExpbWl0KHRydWUpKTtcbiAgICByZXR1cm4gZXhjZWVkZWRNaW4gfHwgZXhjZWVkZWRNYXg7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBtb3ZlOiBtb3ZlLFxuICAgIGp1bXA6IGp1bXAsXG4gICAgdHJhbnNsYXRlOiB0cmFuc2xhdGUsXG4gICAgc2hpZnQ6IHNoaWZ0LFxuICAgIGNhbmNlbDogY2FuY2VsLFxuICAgIHRvSW5kZXg6IHRvSW5kZXgsXG4gICAgdG9Qb3NpdGlvbjogdG9Qb3NpdGlvbixcbiAgICBnZXRQb3NpdGlvbjogZ2V0UG9zaXRpb24sXG4gICAgZ2V0TGltaXQ6IGdldExpbWl0LFxuICAgIGV4Y2VlZGVkTGltaXQ6IGV4Y2VlZGVkTGltaXQsXG4gICAgcmVwb3NpdGlvbjogcmVwb3NpdGlvblxuICB9O1xufVxuXG5mdW5jdGlvbiBDb250cm9sbGVyKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2U2ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTYub247XG5cbiAgdmFyIE1vdmUgPSBDb21wb25lbnRzMi5Nb3ZlO1xuICB2YXIgZ2V0UG9zaXRpb24gPSBNb3ZlLmdldFBvc2l0aW9uLFxuICAgICAgZ2V0TGltaXQgPSBNb3ZlLmdldExpbWl0LFxuICAgICAgdG9Qb3NpdGlvbiA9IE1vdmUudG9Qb3NpdGlvbjtcbiAgdmFyIF9Db21wb25lbnRzMiRTbGlkZXMgPSBDb21wb25lbnRzMi5TbGlkZXMsXG4gICAgICBpc0Vub3VnaCA9IF9Db21wb25lbnRzMiRTbGlkZXMuaXNFbm91Z2gsXG4gICAgICBnZXRMZW5ndGggPSBfQ29tcG9uZW50czIkU2xpZGVzLmdldExlbmd0aDtcbiAgdmFyIGlzTG9vcCA9IFNwbGlkZTIuaXMoTE9PUCk7XG4gIHZhciBpc1NsaWRlID0gU3BsaWRlMi5pcyhTTElERSk7XG4gIHZhciBnZXROZXh0ID0gYXBwbHkoZ2V0QWRqYWNlbnQsIGZhbHNlKTtcbiAgdmFyIGdldFByZXYgPSBhcHBseShnZXRBZGphY2VudCwgdHJ1ZSk7XG4gIHZhciBjdXJySW5kZXggPSBvcHRpb25zLnN0YXJ0IHx8IDA7XG4gIHZhciBwcmV2SW5kZXggPSBjdXJySW5kZXg7XG4gIHZhciBzbGlkZUNvdW50O1xuICB2YXIgcGVyTW92ZTtcbiAgdmFyIHBlclBhZ2U7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaW5pdCgpO1xuICAgIG9uKFtFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNIXSwgaW5pdCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHNsaWRlQ291bnQgPSBnZXRMZW5ndGgodHJ1ZSk7XG4gICAgcGVyTW92ZSA9IG9wdGlvbnMucGVyTW92ZTtcbiAgICBwZXJQYWdlID0gb3B0aW9ucy5wZXJQYWdlO1xuICAgIHZhciBpbmRleCA9IGNsYW1wKGN1cnJJbmRleCwgMCwgc2xpZGVDb3VudCAtIDEpO1xuXG4gICAgaWYgKGluZGV4ICE9PSBjdXJySW5kZXgpIHtcbiAgICAgIGN1cnJJbmRleCA9IGluZGV4O1xuICAgICAgTW92ZS5yZXBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ28oY29udHJvbCwgYWxsb3dTYW1lSW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFpc0J1c3koKSkge1xuICAgICAgdmFyIGRlc3QgPSBwYXJzZShjb250cm9sKTtcbiAgICAgIHZhciBpbmRleCA9IGxvb3AoZGVzdCk7XG5cbiAgICAgIGlmIChpbmRleCA+IC0xICYmIChhbGxvd1NhbWVJbmRleCB8fCBpbmRleCAhPT0gY3VyckluZGV4KSkge1xuICAgICAgICBzZXRJbmRleChpbmRleCk7XG4gICAgICAgIE1vdmUubW92ZShkZXN0LCBpbmRleCwgcHJldkluZGV4LCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsKGRlc3RpbmF0aW9uLCBkdXJhdGlvbiwgc25hcCwgY2FsbGJhY2spIHtcbiAgICBDb21wb25lbnRzMi5TY3JvbGwuc2Nyb2xsKGRlc3RpbmF0aW9uLCBkdXJhdGlvbiwgc25hcCwgZnVuY3Rpb24gKCkge1xuICAgICAgc2V0SW5kZXgobG9vcChNb3ZlLnRvSW5kZXgoZ2V0UG9zaXRpb24oKSkpKTtcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZShjb250cm9sKSB7XG4gICAgdmFyIGluZGV4ID0gY3VyckluZGV4O1xuXG4gICAgaWYgKGlzU3RyaW5nKGNvbnRyb2wpKSB7XG4gICAgICB2YXIgX3JlZiA9IGNvbnRyb2wubWF0Y2goLyhbK1xcLTw+XSkoXFxkKyk/LykgfHwgW10sXG4gICAgICAgICAgaW5kaWNhdG9yID0gX3JlZlsxXSxcbiAgICAgICAgICBudW1iZXIgPSBfcmVmWzJdO1xuXG4gICAgICBpZiAoaW5kaWNhdG9yID09PSBcIitcIiB8fCBpbmRpY2F0b3IgPT09IFwiLVwiKSB7XG4gICAgICAgIGluZGV4ID0gY29tcHV0ZURlc3RJbmRleChjdXJySW5kZXggKyArKFwiXCIgKyBpbmRpY2F0b3IgKyAoK251bWJlciB8fCAxKSksIGN1cnJJbmRleCk7XG4gICAgICB9IGVsc2UgaWYgKGluZGljYXRvciA9PT0gXCI+XCIpIHtcbiAgICAgICAgaW5kZXggPSBudW1iZXIgPyB0b0luZGV4KCtudW1iZXIpIDogZ2V0TmV4dCh0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kaWNhdG9yID09PSBcIjxcIikge1xuICAgICAgICBpbmRleCA9IGdldFByZXYodHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ID0gaXNMb29wID8gY29udHJvbCA6IGNsYW1wKGNvbnRyb2wsIDAsIGdldEVuZCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBZGphY2VudChwcmV2LCBkZXN0aW5hdGlvbikge1xuICAgIHZhciBudW1iZXIgPSBwZXJNb3ZlIHx8IChoYXNGb2N1cygpID8gMSA6IHBlclBhZ2UpO1xuICAgIHZhciBkZXN0ID0gY29tcHV0ZURlc3RJbmRleChjdXJySW5kZXggKyBudW1iZXIgKiAocHJldiA/IC0xIDogMSksIGN1cnJJbmRleCwgIShwZXJNb3ZlIHx8IGhhc0ZvY3VzKCkpKTtcblxuICAgIGlmIChkZXN0ID09PSAtMSAmJiBpc1NsaWRlKSB7XG4gICAgICBpZiAoIWFwcHJveGltYXRlbHlFcXVhbChnZXRQb3NpdGlvbigpLCBnZXRMaW1pdCghcHJldiksIDEpKSB7XG4gICAgICAgIHJldHVybiBwcmV2ID8gMCA6IGdldEVuZCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZXN0aW5hdGlvbiA/IGRlc3QgOiBsb29wKGRlc3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZURlc3RJbmRleChkZXN0LCBmcm9tLCBzbmFwUGFnZSkge1xuICAgIGlmIChpc0Vub3VnaCgpIHx8IGhhc0ZvY3VzKCkpIHtcbiAgICAgIHZhciBlbmQgPSBnZXRFbmQoKTtcbiAgICAgIHZhciBpbmRleCA9IGNvbXB1dGVNb3ZhYmxlRGVzdEluZGV4KGRlc3QpO1xuXG4gICAgICBpZiAoaW5kZXggIT09IGRlc3QpIHtcbiAgICAgICAgZnJvbSA9IGRlc3Q7XG4gICAgICAgIGRlc3QgPSBpbmRleDtcbiAgICAgICAgc25hcFBhZ2UgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRlc3QgPCAwIHx8IGRlc3QgPiBlbmQpIHtcbiAgICAgICAgaWYgKCFwZXJNb3ZlICYmIChiZXR3ZWVuKDAsIGRlc3QsIGZyb20sIHRydWUpIHx8IGJldHdlZW4oZW5kLCBmcm9tLCBkZXN0LCB0cnVlKSkpIHtcbiAgICAgICAgICBkZXN0ID0gdG9JbmRleCh0b1BhZ2UoZGVzdCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc0xvb3ApIHtcbiAgICAgICAgICAgIGRlc3QgPSBzbmFwUGFnZSA/IGRlc3QgPCAwID8gLShzbGlkZUNvdW50ICUgcGVyUGFnZSB8fCBwZXJQYWdlKSA6IHNsaWRlQ291bnQgOiBkZXN0O1xuICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5yZXdpbmQpIHtcbiAgICAgICAgICAgIGRlc3QgPSBkZXN0IDwgMCA/IGVuZCA6IDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlc3QgPSAtMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzbmFwUGFnZSAmJiBkZXN0ICE9PSBmcm9tKSB7XG4gICAgICAgICAgZGVzdCA9IHRvSW5kZXgodG9QYWdlKGZyb20pICsgKGRlc3QgPCBmcm9tID8gLTEgOiAxKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdCA9IC0xO1xuICAgIH1cblxuICAgIHJldHVybiBkZXN0O1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZU1vdmFibGVEZXN0SW5kZXgoZGVzdCkge1xuICAgIGlmIChpc1NsaWRlICYmIG9wdGlvbnMudHJpbVNwYWNlID09PSBcIm1vdmVcIiAmJiBkZXN0ICE9PSBjdXJySW5kZXgpIHtcbiAgICAgIHZhciBwb3NpdGlvbiA9IGdldFBvc2l0aW9uKCk7XG5cbiAgICAgIHdoaWxlIChwb3NpdGlvbiA9PT0gdG9Qb3NpdGlvbihkZXN0LCB0cnVlKSAmJiBiZXR3ZWVuKGRlc3QsIDAsIFNwbGlkZTIubGVuZ3RoIC0gMSwgIW9wdGlvbnMucmV3aW5kKSkge1xuICAgICAgICBkZXN0IDwgY3VyckluZGV4ID8gLS1kZXN0IDogKytkZXN0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZXN0O1xuICB9XG5cbiAgZnVuY3Rpb24gbG9vcChpbmRleCkge1xuICAgIHJldHVybiBpc0xvb3AgPyAoaW5kZXggKyBzbGlkZUNvdW50KSAlIHNsaWRlQ291bnQgfHwgMCA6IGluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RW5kKCkge1xuICAgIHJldHVybiBtYXgoc2xpZGVDb3VudCAtIChoYXNGb2N1cygpIHx8IGlzTG9vcCAmJiBwZXJNb3ZlID8gMSA6IHBlclBhZ2UpLCAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvSW5kZXgocGFnZSkge1xuICAgIHJldHVybiBjbGFtcChoYXNGb2N1cygpID8gcGFnZSA6IHBlclBhZ2UgKiBwYWdlLCAwLCBnZXRFbmQoKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0b1BhZ2UoaW5kZXgpIHtcbiAgICByZXR1cm4gaGFzRm9jdXMoKSA/IGluZGV4IDogZmxvb3IoKGluZGV4ID49IGdldEVuZCgpID8gc2xpZGVDb3VudCAtIDEgOiBpbmRleCkgLyBwZXJQYWdlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvRGVzdChkZXN0aW5hdGlvbikge1xuICAgIHZhciBjbG9zZXN0ID0gTW92ZS50b0luZGV4KGRlc3RpbmF0aW9uKTtcbiAgICByZXR1cm4gaXNTbGlkZSA/IGNsYW1wKGNsb3Nlc3QsIDAsIGdldEVuZCgpKSA6IGNsb3Nlc3Q7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRJbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCAhPT0gY3VyckluZGV4KSB7XG4gICAgICBwcmV2SW5kZXggPSBjdXJySW5kZXg7XG4gICAgICBjdXJySW5kZXggPSBpbmRleDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbmRleChwcmV2KSB7XG4gICAgcmV0dXJuIHByZXYgPyBwcmV2SW5kZXggOiBjdXJySW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiBoYXNGb2N1cygpIHtcbiAgICByZXR1cm4gIWlzVW5kZWZpbmVkKG9wdGlvbnMuZm9jdXMpIHx8IG9wdGlvbnMuaXNOYXZpZ2F0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNCdXN5KCkge1xuICAgIHJldHVybiBTcGxpZGUyLnN0YXRlLmlzKFtNT1ZJTkcsIFNDUk9MTElOR10pICYmICEhb3B0aW9ucy53YWl0Rm9yVHJhbnNpdGlvbjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGdvOiBnbyxcbiAgICBzY3JvbGw6IHNjcm9sbCxcbiAgICBnZXROZXh0OiBnZXROZXh0LFxuICAgIGdldFByZXY6IGdldFByZXYsXG4gICAgZ2V0QWRqYWNlbnQ6IGdldEFkamFjZW50LFxuICAgIGdldEVuZDogZ2V0RW5kLFxuICAgIHNldEluZGV4OiBzZXRJbmRleCxcbiAgICBnZXRJbmRleDogZ2V0SW5kZXgsXG4gICAgdG9JbmRleDogdG9JbmRleCxcbiAgICB0b1BhZ2U6IHRvUGFnZSxcbiAgICB0b0Rlc3Q6IHRvRGVzdCxcbiAgICBoYXNGb2N1czogaGFzRm9jdXMsXG4gICAgaXNCdXN5OiBpc0J1c3lcbiAgfTtcbn1cblxudmFyIFhNTF9OQU1FX1NQQUNFID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xudmFyIFBBVEggPSBcIm0xNS41IDAuOTMyLTQuMyA0LjM4IDE0LjUgMTQuNi0xNC41IDE0LjUgNC4zIDQuNCAxNC42LTE0LjYgNC40LTQuMy00LjQtNC40LTE0LjYtMTQuNnpcIjtcbnZhciBTSVpFID0gNDA7XG5cbmZ1bmN0aW9uIEFycm93cyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgdmFyIG9uID0gZXZlbnQub24sXG4gICAgICBiaW5kID0gZXZlbnQuYmluZCxcbiAgICAgIGVtaXQgPSBldmVudC5lbWl0O1xuICB2YXIgY2xhc3NlcyA9IG9wdGlvbnMuY2xhc3NlcyxcbiAgICAgIGkxOG4gPSBvcHRpb25zLmkxOG47XG4gIHZhciBFbGVtZW50cyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgQ29udHJvbGxlciA9IENvbXBvbmVudHMyLkNvbnRyb2xsZXI7XG4gIHZhciBwbGFjZWhvbGRlciA9IEVsZW1lbnRzLmFycm93cyxcbiAgICAgIHRyYWNrID0gRWxlbWVudHMudHJhY2s7XG4gIHZhciB3cmFwcGVyID0gcGxhY2Vob2xkZXI7XG4gIHZhciBwcmV2ID0gRWxlbWVudHMucHJldjtcbiAgdmFyIG5leHQgPSBFbGVtZW50cy5uZXh0O1xuICB2YXIgY3JlYXRlZDtcbiAgdmFyIHdyYXBwZXJDbGFzc2VzO1xuICB2YXIgYXJyb3dzID0ge307XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaW5pdCgpO1xuICAgIG9uKEVWRU5UX1VQREFURUQsIHJlbW91bnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3VudCgpIHtcbiAgICBkZXN0cm95KCk7XG4gICAgbW91bnQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIGVuYWJsZWQgPSBvcHRpb25zLmFycm93cztcblxuICAgIGlmIChlbmFibGVkICYmICEocHJldiAmJiBuZXh0KSkge1xuICAgICAgY3JlYXRlQXJyb3dzKCk7XG4gICAgfVxuXG4gICAgaWYgKHByZXYgJiYgbmV4dCkge1xuICAgICAgYXNzaWduKGFycm93cywge1xuICAgICAgICBwcmV2OiBwcmV2LFxuICAgICAgICBuZXh0OiBuZXh0XG4gICAgICB9KTtcbiAgICAgIGRpc3BsYXkod3JhcHBlciwgZW5hYmxlZCA/IFwiXCIgOiBcIm5vbmVcIik7XG4gICAgICBhZGRDbGFzcyh3cmFwcGVyLCB3cmFwcGVyQ2xhc3NlcyA9IENMQVNTX0FSUk9XUyArIFwiLS1cIiArIG9wdGlvbnMuZGlyZWN0aW9uKTtcblxuICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgbGlzdGVuKCk7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICBzZXRBdHRyaWJ1dGUoW3ByZXYsIG5leHRdLCBBUklBX0NPTlRST0xTLCB0cmFjay5pZCk7XG4gICAgICAgIGVtaXQoRVZFTlRfQVJST1dTX01PVU5URUQsIHByZXYsIG5leHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgZXZlbnQuZGVzdHJveSgpO1xuICAgIHJlbW92ZUNsYXNzKHdyYXBwZXIsIHdyYXBwZXJDbGFzc2VzKTtcblxuICAgIGlmIChjcmVhdGVkKSB7XG4gICAgICByZW1vdmUocGxhY2Vob2xkZXIgPyBbcHJldiwgbmV4dF0gOiB3cmFwcGVyKTtcbiAgICAgIHByZXYgPSBuZXh0ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlQXR0cmlidXRlKFtwcmV2LCBuZXh0XSwgQUxMX0FUVFJJQlVURVMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbigpIHtcbiAgICBvbihbRVZFTlRfTU9WRUQsIEVWRU5UX1JFRlJFU0gsIEVWRU5UX1NDUk9MTEVEXSwgdXBkYXRlKTtcbiAgICBiaW5kKG5leHQsIFwiY2xpY2tcIiwgYXBwbHkoZ28sIFwiPlwiKSk7XG4gICAgYmluZChwcmV2LCBcImNsaWNrXCIsIGFwcGx5KGdvLCBcIjxcIikpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28oY29udHJvbCkge1xuICAgIENvbnRyb2xsZXIuZ28oY29udHJvbCwgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJvd3MoKSB7XG4gICAgd3JhcHBlciA9IHBsYWNlaG9sZGVyIHx8IGNyZWF0ZShcImRpdlwiLCBjbGFzc2VzLmFycm93cyk7XG4gICAgcHJldiA9IGNyZWF0ZUFycm93KHRydWUpO1xuICAgIG5leHQgPSBjcmVhdGVBcnJvdyhmYWxzZSk7XG4gICAgY3JlYXRlZCA9IHRydWU7XG4gICAgYXBwZW5kKHdyYXBwZXIsIFtwcmV2LCBuZXh0XSk7XG4gICAgIXBsYWNlaG9sZGVyICYmIGJlZm9yZSh3cmFwcGVyLCB0cmFjayk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJvdyhwcmV2Mikge1xuICAgIHZhciBhcnJvdyA9IFwiPGJ1dHRvbiBjbGFzcz1cXFwiXCIgKyBjbGFzc2VzLmFycm93ICsgXCIgXCIgKyAocHJldjIgPyBjbGFzc2VzLnByZXYgOiBjbGFzc2VzLm5leHQpICsgXCJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+PHN2ZyB4bWxucz1cXFwiXCIgKyBYTUxfTkFNRV9TUEFDRSArIFwiXFxcIiB2aWV3Qm94PVxcXCIwIDAgXCIgKyBTSVpFICsgXCIgXCIgKyBTSVpFICsgXCJcXFwiIHdpZHRoPVxcXCJcIiArIFNJWkUgKyBcIlxcXCIgaGVpZ2h0PVxcXCJcIiArIFNJWkUgKyBcIlxcXCIgZm9jdXNhYmxlPVxcXCJmYWxzZVxcXCI+PHBhdGggZD1cXFwiXCIgKyAob3B0aW9ucy5hcnJvd1BhdGggfHwgUEFUSCkgKyBcIlxcXCIgLz5cIjtcbiAgICByZXR1cm4gcGFyc2VIdG1sKGFycm93KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgaW5kZXggPSBTcGxpZGUyLmluZGV4O1xuICAgIHZhciBwcmV2SW5kZXggPSBDb250cm9sbGVyLmdldFByZXYoKTtcbiAgICB2YXIgbmV4dEluZGV4ID0gQ29udHJvbGxlci5nZXROZXh0KCk7XG4gICAgdmFyIHByZXZMYWJlbCA9IHByZXZJbmRleCA+IC0xICYmIGluZGV4IDwgcHJldkluZGV4ID8gaTE4bi5sYXN0IDogaTE4bi5wcmV2O1xuICAgIHZhciBuZXh0TGFiZWwgPSBuZXh0SW5kZXggPiAtMSAmJiBpbmRleCA+IG5leHRJbmRleCA/IGkxOG4uZmlyc3QgOiBpMThuLm5leHQ7XG4gICAgcHJldi5kaXNhYmxlZCA9IHByZXZJbmRleCA8IDA7XG4gICAgbmV4dC5kaXNhYmxlZCA9IG5leHRJbmRleCA8IDA7XG4gICAgc2V0QXR0cmlidXRlKHByZXYsIEFSSUFfTEFCRUwsIHByZXZMYWJlbCk7XG4gICAgc2V0QXR0cmlidXRlKG5leHQsIEFSSUFfTEFCRUwsIG5leHRMYWJlbCk7XG4gICAgZW1pdChFVkVOVF9BUlJPV1NfVVBEQVRFRCwgcHJldiwgbmV4dCwgcHJldkluZGV4LCBuZXh0SW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhcnJvd3M6IGFycm93cyxcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICB1cGRhdGU6IHVwZGF0ZVxuICB9O1xufVxuXG52YXIgSU5URVJWQUxfREFUQV9BVFRSSUJVVEUgPSBEQVRBX0FUVFJJQlVURSArIFwiLWludGVydmFsXCI7XG5cbmZ1bmN0aW9uIEF1dG9wbGF5KFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2U3ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTcub24sXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlNy5iaW5kLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTcuZW1pdDtcblxuICB2YXIgaW50ZXJ2YWwgPSBSZXF1ZXN0SW50ZXJ2YWwob3B0aW9ucy5pbnRlcnZhbCwgU3BsaWRlMi5nby5iaW5kKFNwbGlkZTIsIFwiPlwiKSwgb25BbmltYXRpb25GcmFtZSk7XG4gIHZhciBpc1BhdXNlZCA9IGludGVydmFsLmlzUGF1c2VkO1xuICB2YXIgRWxlbWVudHMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIF9Db21wb25lbnRzMiRFbGVtZW50czQgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIHJvb3QgPSBfQ29tcG9uZW50czIkRWxlbWVudHM0LnJvb3QsXG4gICAgICB0b2dnbGUgPSBfQ29tcG9uZW50czIkRWxlbWVudHM0LnRvZ2dsZTtcbiAgdmFyIGF1dG9wbGF5ID0gb3B0aW9ucy5hdXRvcGxheTtcbiAgdmFyIGhvdmVyZWQ7XG4gIHZhciBmb2N1c2VkO1xuICB2YXIgc3RvcHBlZCA9IGF1dG9wbGF5ID09PSBcInBhdXNlXCI7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICBsaXN0ZW4oKTtcbiAgICAgIHRvZ2dsZSAmJiBzZXRBdHRyaWJ1dGUodG9nZ2xlLCBBUklBX0NPTlRST0xTLCBFbGVtZW50cy50cmFjay5pZCk7XG4gICAgICBzdG9wcGVkIHx8IHBsYXkoKTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbigpIHtcbiAgICBpZiAob3B0aW9ucy5wYXVzZU9uSG92ZXIpIHtcbiAgICAgIGJpbmQocm9vdCwgXCJtb3VzZWVudGVyIG1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaG92ZXJlZCA9IGUudHlwZSA9PT0gXCJtb3VzZWVudGVyXCI7XG4gICAgICAgIGF1dG9Ub2dnbGUoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBhdXNlT25Gb2N1cykge1xuICAgICAgYmluZChyb290LCBcImZvY3VzaW4gZm9jdXNvdXRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZm9jdXNlZCA9IGUudHlwZSA9PT0gXCJmb2N1c2luXCI7XG4gICAgICAgIGF1dG9Ub2dnbGUoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgIGJpbmQodG9nZ2xlLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RvcHBlZCA/IHBsYXkoKSA6IHBhdXNlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgb24oW0VWRU5UX01PVkUsIEVWRU5UX1NDUk9MTCwgRVZFTlRfUkVGUkVTSF0sIGludGVydmFsLnJld2luZCk7XG4gICAgb24oRVZFTlRfTU9WRSwgb25Nb3ZlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgaWYgKGlzUGF1c2VkKCkgJiYgQ29tcG9uZW50czIuU2xpZGVzLmlzRW5vdWdoKCkpIHtcbiAgICAgIGludGVydmFsLnN0YXJ0KCFvcHRpb25zLnJlc2V0UHJvZ3Jlc3MpO1xuICAgICAgZm9jdXNlZCA9IGhvdmVyZWQgPSBzdG9wcGVkID0gZmFsc2U7XG4gICAgICB1cGRhdGUoKTtcbiAgICAgIGVtaXQoRVZFTlRfQVVUT1BMQVlfUExBWSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGF1c2Uoc3RvcCkge1xuICAgIGlmIChzdG9wID09PSB2b2lkIDApIHtcbiAgICAgIHN0b3AgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0b3BwZWQgPSAhIXN0b3A7XG4gICAgdXBkYXRlKCk7XG5cbiAgICBpZiAoIWlzUGF1c2VkKCkpIHtcbiAgICAgIGludGVydmFsLnBhdXNlKCk7XG4gICAgICBlbWl0KEVWRU5UX0FVVE9QTEFZX1BBVVNFKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhdXRvVG9nZ2xlKCkge1xuICAgIGlmICghc3RvcHBlZCkge1xuICAgICAgaG92ZXJlZCB8fCBmb2N1c2VkID8gcGF1c2UoZmFsc2UpIDogcGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAodG9nZ2xlKSB7XG4gICAgICB0b2dnbGVDbGFzcyh0b2dnbGUsIENMQVNTX0FDVElWRSwgIXN0b3BwZWQpO1xuICAgICAgc2V0QXR0cmlidXRlKHRvZ2dsZSwgQVJJQV9MQUJFTCwgb3B0aW9ucy5pMThuW3N0b3BwZWQgPyBcInBsYXlcIiA6IFwicGF1c2VcIl0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQW5pbWF0aW9uRnJhbWUocmF0ZSkge1xuICAgIHZhciBiYXIgPSBFbGVtZW50cy5iYXI7XG4gICAgYmFyICYmIHN0eWxlKGJhciwgXCJ3aWR0aFwiLCByYXRlICogMTAwICsgXCIlXCIpO1xuICAgIGVtaXQoRVZFTlRfQVVUT1BMQVlfUExBWUlORywgcmF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBvbk1vdmUoaW5kZXgpIHtcbiAgICB2YXIgU2xpZGUgPSBDb21wb25lbnRzMi5TbGlkZXMuZ2V0QXQoaW5kZXgpO1xuICAgIGludGVydmFsLnNldChTbGlkZSAmJiArZ2V0QXR0cmlidXRlKFNsaWRlLnNsaWRlLCBJTlRFUlZBTF9EQVRBX0FUVFJJQlVURSkgfHwgb3B0aW9ucy5pbnRlcnZhbCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBpbnRlcnZhbC5jYW5jZWwsXG4gICAgcGxheTogcGxheSxcbiAgICBwYXVzZTogcGF1c2UsXG4gICAgaXNQYXVzZWQ6IGlzUGF1c2VkXG4gIH07XG59XG5cbmZ1bmN0aW9uIENvdmVyKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2U4ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTgub247XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKG9wdGlvbnMuY292ZXIpIHtcbiAgICAgIG9uKEVWRU5UX0xBWllMT0FEX0xPQURFRCwgYXBwbHkodG9nZ2xlLCB0cnVlKSk7XG4gICAgICBvbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfVVBEQVRFRCwgRVZFTlRfUkVGUkVTSF0sIGFwcGx5KGNvdmVyLCB0cnVlKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY292ZXIoY292ZXIyKSB7XG4gICAgQ29tcG9uZW50czIuU2xpZGVzLmZvckVhY2goZnVuY3Rpb24gKFNsaWRlKSB7XG4gICAgICB2YXIgaW1nID0gY2hpbGQoU2xpZGUuY29udGFpbmVyIHx8IFNsaWRlLnNsaWRlLCBcImltZ1wiKTtcblxuICAgICAgaWYgKGltZyAmJiBpbWcuc3JjKSB7XG4gICAgICAgIHRvZ2dsZShjb3ZlcjIsIGltZywgU2xpZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlKGNvdmVyMiwgaW1nLCBTbGlkZSkge1xuICAgIFNsaWRlLnN0eWxlKFwiYmFja2dyb3VuZFwiLCBjb3ZlcjIgPyBcImNlbnRlci9jb3ZlciBuby1yZXBlYXQgdXJsKFxcXCJcIiArIGltZy5zcmMgKyBcIlxcXCIpXCIgOiBcIlwiLCB0cnVlKTtcbiAgICBkaXNwbGF5KGltZywgY292ZXIyID8gXCJub25lXCIgOiBcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGFwcGx5KGNvdmVyLCBmYWxzZSlcbiAgfTtcbn1cblxudmFyIEJPVU5DRV9ESUZGX1RIUkVTSE9MRCA9IDEwO1xudmFyIEJPVU5DRV9EVVJBVElPTiA9IDYwMDtcbnZhciBGUklDVElPTl9GQUNUT1IgPSAwLjY7XG52YXIgQkFTRV9WRUxPQ0lUWSA9IDEuNTtcbnZhciBNSU5fRFVSQVRJT04gPSA4MDA7XG5cbmZ1bmN0aW9uIFNjcm9sbChTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlOSA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U5Lm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTkuZW1pdDtcblxuICB2YXIgc2V0ID0gU3BsaWRlMi5zdGF0ZS5zZXQ7XG4gIHZhciBNb3ZlID0gQ29tcG9uZW50czIuTW92ZTtcbiAgdmFyIGdldFBvc2l0aW9uID0gTW92ZS5nZXRQb3NpdGlvbixcbiAgICAgIGdldExpbWl0ID0gTW92ZS5nZXRMaW1pdCxcbiAgICAgIGV4Y2VlZGVkTGltaXQgPSBNb3ZlLmV4Y2VlZGVkTGltaXQsXG4gICAgICB0cmFuc2xhdGUgPSBNb3ZlLnRyYW5zbGF0ZTtcbiAgdmFyIGlzU2xpZGUgPSBTcGxpZGUyLmlzKFNMSURFKTtcbiAgdmFyIGludGVydmFsO1xuICB2YXIgY2FsbGJhY2s7XG4gIHZhciBmcmljdGlvbiA9IDE7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgb24oRVZFTlRfTU9WRSwgY2xlYXIpO1xuICAgIG9uKFtFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNIXSwgY2FuY2VsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbChkZXN0aW5hdGlvbiwgZHVyYXRpb24sIHNuYXAsIG9uU2Nyb2xsZWQsIG5vQ29uc3RyYWluKSB7XG4gICAgdmFyIGZyb20gPSBnZXRQb3NpdGlvbigpO1xuICAgIGNsZWFyKCk7XG5cbiAgICBpZiAoc25hcCAmJiAoIWlzU2xpZGUgfHwgIWV4Y2VlZGVkTGltaXQoKSkpIHtcbiAgICAgIHZhciBzaXplID0gQ29tcG9uZW50czIuTGF5b3V0LnNsaWRlclNpemUoKTtcbiAgICAgIHZhciBvZmZzZXQgPSBzaWduKGRlc3RpbmF0aW9uKSAqIHNpemUgKiBmbG9vcihhYnMoZGVzdGluYXRpb24pIC8gc2l6ZSkgfHwgMDtcbiAgICAgIGRlc3RpbmF0aW9uID0gTW92ZS50b1Bvc2l0aW9uKENvbXBvbmVudHMyLkNvbnRyb2xsZXIudG9EZXN0KGRlc3RpbmF0aW9uICUgc2l6ZSkpICsgb2Zmc2V0O1xuICAgIH1cblxuICAgIHZhciBub0Rpc3RhbmNlID0gYXBwcm94aW1hdGVseUVxdWFsKGZyb20sIGRlc3RpbmF0aW9uLCAxKTtcbiAgICBmcmljdGlvbiA9IDE7XG4gICAgZHVyYXRpb24gPSBub0Rpc3RhbmNlID8gMCA6IGR1cmF0aW9uIHx8IG1heChhYnMoZGVzdGluYXRpb24gLSBmcm9tKSAvIEJBU0VfVkVMT0NJVFksIE1JTl9EVVJBVElPTik7XG4gICAgY2FsbGJhY2sgPSBvblNjcm9sbGVkO1xuICAgIGludGVydmFsID0gUmVxdWVzdEludGVydmFsKGR1cmF0aW9uLCBvbkVuZCwgYXBwbHkodXBkYXRlLCBmcm9tLCBkZXN0aW5hdGlvbiwgbm9Db25zdHJhaW4pLCAxKTtcbiAgICBzZXQoU0NST0xMSU5HKTtcbiAgICBlbWl0KEVWRU5UX1NDUk9MTCk7XG4gICAgaW50ZXJ2YWwuc3RhcnQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRW5kKCkge1xuICAgIHNldChJRExFKTtcbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIGVtaXQoRVZFTlRfU0NST0xMRUQpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKGZyb20sIHRvLCBub0NvbnN0cmFpbiwgcmF0ZSkge1xuICAgIHZhciBwb3NpdGlvbiA9IGdldFBvc2l0aW9uKCk7XG4gICAgdmFyIHRhcmdldCA9IGZyb20gKyAodG8gLSBmcm9tKSAqIGVhc2luZyhyYXRlKTtcbiAgICB2YXIgZGlmZiA9ICh0YXJnZXQgLSBwb3NpdGlvbikgKiBmcmljdGlvbjtcbiAgICB0cmFuc2xhdGUocG9zaXRpb24gKyBkaWZmKTtcblxuICAgIGlmIChpc1NsaWRlICYmICFub0NvbnN0cmFpbiAmJiBleGNlZWRlZExpbWl0KCkpIHtcbiAgICAgIGZyaWN0aW9uICo9IEZSSUNUSU9OX0ZBQ1RPUjtcblxuICAgICAgaWYgKGFicyhkaWZmKSA8IEJPVU5DRV9ESUZGX1RIUkVTSE9MRCkge1xuICAgICAgICBzY3JvbGwoZ2V0TGltaXQoZXhjZWVkZWRMaW1pdCh0cnVlKSksIEJPVU5DRV9EVVJBVElPTiwgZmFsc2UsIGNhbGxiYWNrLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICBpZiAoaW50ZXJ2YWwpIHtcbiAgICAgIGludGVydmFsLmNhbmNlbCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAoaW50ZXJ2YWwgJiYgIWludGVydmFsLmlzUGF1c2VkKCkpIHtcbiAgICAgIGNsZWFyKCk7XG4gICAgICBvbkVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVhc2luZyh0KSB7XG4gICAgdmFyIGVhc2luZ0Z1bmMgPSBvcHRpb25zLmVhc2luZ0Z1bmM7XG4gICAgcmV0dXJuIGVhc2luZ0Z1bmMgPyBlYXNpbmdGdW5jKHQpIDogMSAtIE1hdGgucG93KDEgLSB0LCA0KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGNsZWFyLFxuICAgIHNjcm9sbDogc2Nyb2xsLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59XG5cbnZhciBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyA9IHtcbiAgcGFzc2l2ZTogZmFsc2UsXG4gIGNhcHR1cmU6IHRydWVcbn07XG5cbmZ1bmN0aW9uIERyYWcoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTEwID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTEwLm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTEwLmVtaXQsXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlMTAuYmluZCxcbiAgICAgIHVuYmluZCA9IF9FdmVudEludGVyZmFjZTEwLnVuYmluZDtcblxuICB2YXIgc3RhdGUgPSBTcGxpZGUyLnN0YXRlO1xuICB2YXIgTW92ZSA9IENvbXBvbmVudHMyLk1vdmUsXG4gICAgICBTY3JvbGwgPSBDb21wb25lbnRzMi5TY3JvbGwsXG4gICAgICBDb250cm9sbGVyID0gQ29tcG9uZW50czIuQ29udHJvbGxlcixcbiAgICAgIHRyYWNrID0gQ29tcG9uZW50czIuRWxlbWVudHMudHJhY2ssXG4gICAgICByZWR1Y2UgPSBDb21wb25lbnRzMi5NZWRpYS5yZWR1Y2U7XG4gIHZhciBfQ29tcG9uZW50czIkRGlyZWN0aW8yID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLFxuICAgICAgcmVzb2x2ZSA9IF9Db21wb25lbnRzMiREaXJlY3RpbzIucmVzb2x2ZSxcbiAgICAgIG9yaWVudCA9IF9Db21wb25lbnRzMiREaXJlY3RpbzIub3JpZW50O1xuICB2YXIgZ2V0UG9zaXRpb24gPSBNb3ZlLmdldFBvc2l0aW9uLFxuICAgICAgZXhjZWVkZWRMaW1pdCA9IE1vdmUuZXhjZWVkZWRMaW1pdDtcbiAgdmFyIGJhc2VQb3NpdGlvbjtcbiAgdmFyIGJhc2VFdmVudDtcbiAgdmFyIHByZXZCYXNlRXZlbnQ7XG4gIHZhciBpc0ZyZWU7XG4gIHZhciBkcmFnZ2luZztcbiAgdmFyIGV4Y2VlZGVkID0gZmFsc2U7XG4gIHZhciBjbGlja1ByZXZlbnRlZDtcbiAgdmFyIGRpc2FibGVkO1xuICB2YXIgdGFyZ2V0O1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGJpbmQodHJhY2ssIFBPSU5URVJfTU9WRV9FVkVOVFMsIG5vb3AsIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TKTtcbiAgICBiaW5kKHRyYWNrLCBQT0lOVEVSX1VQX0VWRU5UUywgbm9vcCwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgIGJpbmQodHJhY2ssIFBPSU5URVJfRE9XTl9FVkVOVFMsIG9uUG9pbnRlckRvd24sIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TKTtcbiAgICBiaW5kKHRyYWNrLCBcImNsaWNrXCIsIG9uQ2xpY2ssIHtcbiAgICAgIGNhcHR1cmU6IHRydWVcbiAgICB9KTtcbiAgICBiaW5kKHRyYWNrLCBcImRyYWdzdGFydFwiLCBwcmV2ZW50KTtcbiAgICBvbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfVVBEQVRFRF0sIGluaXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgZHJhZyA9IG9wdGlvbnMuZHJhZztcbiAgICBkaXNhYmxlKCFkcmFnKTtcbiAgICBpc0ZyZWUgPSBkcmFnID09PSBcImZyZWVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUG9pbnRlckRvd24oZSkge1xuICAgIGNsaWNrUHJldmVudGVkID0gZmFsc2U7XG5cbiAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICB2YXIgaXNUb3VjaCA9IGlzVG91Y2hFdmVudChlKTtcblxuICAgICAgaWYgKGlzRHJhZ2dhYmxlKGUudGFyZ2V0KSAmJiAoaXNUb3VjaCB8fCAhZS5idXR0b24pKSB7XG4gICAgICAgIGlmICghQ29udHJvbGxlci5pc0J1c3koKSkge1xuICAgICAgICAgIHRhcmdldCA9IGlzVG91Y2ggPyB0cmFjayA6IHdpbmRvdztcbiAgICAgICAgICBkcmFnZ2luZyA9IHN0YXRlLmlzKFtNT1ZJTkcsIFNDUk9MTElOR10pO1xuICAgICAgICAgIHByZXZCYXNlRXZlbnQgPSBudWxsO1xuICAgICAgICAgIGJpbmQodGFyZ2V0LCBQT0lOVEVSX01PVkVfRVZFTlRTLCBvblBvaW50ZXJNb3ZlLCBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyk7XG4gICAgICAgICAgYmluZCh0YXJnZXQsIFBPSU5URVJfVVBfRVZFTlRTLCBvblBvaW50ZXJVcCwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgICAgICAgIE1vdmUuY2FuY2VsKCk7XG4gICAgICAgICAgU2Nyb2xsLmNhbmNlbCgpO1xuICAgICAgICAgIHNhdmUoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJldmVudChlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUG9pbnRlck1vdmUoZSkge1xuICAgIGlmICghc3RhdGUuaXMoRFJBR0dJTkcpKSB7XG4gICAgICBzdGF0ZS5zZXQoRFJBR0dJTkcpO1xuICAgICAgZW1pdChFVkVOVF9EUkFHKTtcbiAgICB9XG5cbiAgICBpZiAoZS5jYW5jZWxhYmxlKSB7XG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgTW92ZS50cmFuc2xhdGUoYmFzZVBvc2l0aW9uICsgY29uc3RyYWluKGRpZmZDb29yZChlKSkpO1xuICAgICAgICB2YXIgZXhwaXJlZCA9IGRpZmZUaW1lKGUpID4gTE9HX0lOVEVSVkFMO1xuICAgICAgICB2YXIgaGFzRXhjZWVkZWQgPSBleGNlZWRlZCAhPT0gKGV4Y2VlZGVkID0gZXhjZWVkZWRMaW1pdCgpKTtcblxuICAgICAgICBpZiAoZXhwaXJlZCB8fCBoYXNFeGNlZWRlZCkge1xuICAgICAgICAgIHNhdmUoZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGlja1ByZXZlbnRlZCA9IHRydWU7XG4gICAgICAgIGVtaXQoRVZFTlRfRFJBR0dJTkcpO1xuICAgICAgICBwcmV2ZW50KGUpO1xuICAgICAgfSBlbHNlIGlmIChpc1NsaWRlckRpcmVjdGlvbihlKSkge1xuICAgICAgICBkcmFnZ2luZyA9IHNob3VsZFN0YXJ0KGUpO1xuICAgICAgICBwcmV2ZW50KGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUG9pbnRlclVwKGUpIHtcbiAgICBpZiAoc3RhdGUuaXMoRFJBR0dJTkcpKSB7XG4gICAgICBzdGF0ZS5zZXQoSURMRSk7XG4gICAgICBlbWl0KEVWRU5UX0RSQUdHRUQpO1xuICAgIH1cblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgbW92ZShlKTtcbiAgICAgIHByZXZlbnQoZSk7XG4gICAgfVxuXG4gICAgdW5iaW5kKHRhcmdldCwgUE9JTlRFUl9NT1ZFX0VWRU5UUywgb25Qb2ludGVyTW92ZSk7XG4gICAgdW5iaW5kKHRhcmdldCwgUE9JTlRFUl9VUF9FVkVOVFMsIG9uUG9pbnRlclVwKTtcbiAgICBkcmFnZ2luZyA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgaWYgKCFkaXNhYmxlZCAmJiBjbGlja1ByZXZlbnRlZCkge1xuICAgICAgcHJldmVudChlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlKGUpIHtcbiAgICBwcmV2QmFzZUV2ZW50ID0gYmFzZUV2ZW50O1xuICAgIGJhc2VFdmVudCA9IGU7XG4gICAgYmFzZVBvc2l0aW9uID0gZ2V0UG9zaXRpb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUoZSkge1xuICAgIHZhciB2ZWxvY2l0eSA9IGNvbXB1dGVWZWxvY2l0eShlKTtcbiAgICB2YXIgZGVzdGluYXRpb24gPSBjb21wdXRlRGVzdGluYXRpb24odmVsb2NpdHkpO1xuICAgIHZhciByZXdpbmQgPSBvcHRpb25zLnJld2luZCAmJiBvcHRpb25zLnJld2luZEJ5RHJhZztcbiAgICByZWR1Y2UoZmFsc2UpO1xuXG4gICAgaWYgKGlzRnJlZSkge1xuICAgICAgQ29udHJvbGxlci5zY3JvbGwoZGVzdGluYXRpb24sIDAsIG9wdGlvbnMuc25hcCk7XG4gICAgfSBlbHNlIGlmIChTcGxpZGUyLmlzKEZBREUpKSB7XG4gICAgICBDb250cm9sbGVyLmdvKG9yaWVudChzaWduKHZlbG9jaXR5KSkgPCAwID8gcmV3aW5kID8gXCI8XCIgOiBcIi1cIiA6IHJld2luZCA/IFwiPlwiIDogXCIrXCIpO1xuICAgIH0gZWxzZSBpZiAoU3BsaWRlMi5pcyhTTElERSkgJiYgZXhjZWVkZWQgJiYgcmV3aW5kKSB7XG4gICAgICBDb250cm9sbGVyLmdvKGV4Y2VlZGVkTGltaXQodHJ1ZSkgPyBcIj5cIiA6IFwiPFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ29udHJvbGxlci5nbyhDb250cm9sbGVyLnRvRGVzdChkZXN0aW5hdGlvbiksIHRydWUpO1xuICAgIH1cblxuICAgIHJlZHVjZSh0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZFN0YXJ0KGUpIHtcbiAgICB2YXIgdGhyZXNob2xkcyA9IG9wdGlvbnMuZHJhZ01pblRocmVzaG9sZDtcbiAgICB2YXIgaXNPYmogPSBpc09iamVjdCh0aHJlc2hvbGRzKTtcbiAgICB2YXIgbW91c2UgPSBpc09iaiAmJiB0aHJlc2hvbGRzLm1vdXNlIHx8IDA7XG4gICAgdmFyIHRvdWNoID0gKGlzT2JqID8gdGhyZXNob2xkcy50b3VjaCA6ICt0aHJlc2hvbGRzKSB8fCAxMDtcbiAgICByZXR1cm4gYWJzKGRpZmZDb29yZChlKSkgPiAoaXNUb3VjaEV2ZW50KGUpID8gdG91Y2ggOiBtb3VzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1NsaWRlckRpcmVjdGlvbihlKSB7XG4gICAgcmV0dXJuIGFicyhkaWZmQ29vcmQoZSkpID4gYWJzKGRpZmZDb29yZChlLCB0cnVlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb21wdXRlVmVsb2NpdHkoZSkge1xuICAgIGlmIChTcGxpZGUyLmlzKExPT1ApIHx8ICFleGNlZWRlZCkge1xuICAgICAgdmFyIHRpbWUgPSBkaWZmVGltZShlKTtcblxuICAgICAgaWYgKHRpbWUgJiYgdGltZSA8IExPR19JTlRFUlZBTCkge1xuICAgICAgICByZXR1cm4gZGlmZkNvb3JkKGUpIC8gdGltZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVEZXN0aW5hdGlvbih2ZWxvY2l0eSkge1xuICAgIHJldHVybiBnZXRQb3NpdGlvbigpICsgc2lnbih2ZWxvY2l0eSkgKiBtaW4oYWJzKHZlbG9jaXR5KSAqIChvcHRpb25zLmZsaWNrUG93ZXIgfHwgNjAwKSwgaXNGcmVlID8gSW5maW5pdHkgOiBDb21wb25lbnRzMi5MYXlvdXQubGlzdFNpemUoKSAqIChvcHRpb25zLmZsaWNrTWF4UGFnZXMgfHwgMSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlmZkNvb3JkKGUsIG9ydGhvZ29uYWwpIHtcbiAgICByZXR1cm4gY29vcmRPZihlLCBvcnRob2dvbmFsKSAtIGNvb3JkT2YoZ2V0QmFzZUV2ZW50KGUpLCBvcnRob2dvbmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpZmZUaW1lKGUpIHtcbiAgICByZXR1cm4gdGltZU9mKGUpIC0gdGltZU9mKGdldEJhc2VFdmVudChlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCYXNlRXZlbnQoZSkge1xuICAgIHJldHVybiBiYXNlRXZlbnQgPT09IGUgJiYgcHJldkJhc2VFdmVudCB8fCBiYXNlRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZE9mKGUsIG9ydGhvZ29uYWwpIHtcbiAgICByZXR1cm4gKGlzVG91Y2hFdmVudChlKSA/IGUuY2hhbmdlZFRvdWNoZXNbMF0gOiBlKVtcInBhZ2VcIiArIHJlc29sdmUob3J0aG9nb25hbCA/IFwiWVwiIDogXCJYXCIpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cmFpbihkaWZmKSB7XG4gICAgcmV0dXJuIGRpZmYgLyAoZXhjZWVkZWQgJiYgU3BsaWRlMi5pcyhTTElERSkgPyBGUklDVElPTiA6IDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNEcmFnZ2FibGUodGFyZ2V0Mikge1xuICAgIHZhciBub0RyYWcgPSBvcHRpb25zLm5vRHJhZztcbiAgICByZXR1cm4gIW1hdGNoZXModGFyZ2V0MiwgXCIuXCIgKyBDTEFTU19QQUdJTkFUSU9OX1BBR0UgKyBcIiwgLlwiICsgQ0xBU1NfQVJST1cpICYmICghbm9EcmFnIHx8ICFtYXRjaGVzKHRhcmdldDIsIG5vRHJhZykpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNUb3VjaEV2ZW50KGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIFRvdWNoRXZlbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBpc0RyYWdnaW5nKCkge1xuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc2FibGUodmFsdWUpIHtcbiAgICBkaXNhYmxlZCA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGlzYWJsZTogZGlzYWJsZSxcbiAgICBpc0RyYWdnaW5nOiBpc0RyYWdnaW5nXG4gIH07XG59XG5cbnZhciBOT1JNQUxJWkFUSU9OX01BUCA9IHtcbiAgU3BhY2ViYXI6IFwiIFwiLFxuICBSaWdodDogQVJST1dfUklHSFQsXG4gIExlZnQ6IEFSUk9XX0xFRlQsXG4gIFVwOiBBUlJPV19VUCxcbiAgRG93bjogQVJST1dfRE9XTlxufTtcblxuZnVuY3Rpb24gbm9ybWFsaXplS2V5KGtleSkge1xuICBrZXkgPSBpc1N0cmluZyhrZXkpID8ga2V5IDoga2V5LmtleTtcbiAgcmV0dXJuIE5PUk1BTElaQVRJT05fTUFQW2tleV0gfHwga2V5O1xufVxuXG52YXIgS0VZQk9BUkRfRVZFTlQgPSBcImtleWRvd25cIjtcblxuZnVuY3Rpb24gS2V5Ym9hcmQoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTExID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTExLm9uLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTExLmJpbmQsXG4gICAgICB1bmJpbmQgPSBfRXZlbnRJbnRlcmZhY2UxMS51bmJpbmQ7XG5cbiAgdmFyIHJvb3QgPSBTcGxpZGUyLnJvb3Q7XG4gIHZhciByZXNvbHZlID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLnJlc29sdmU7XG4gIHZhciB0YXJnZXQ7XG4gIHZhciBkaXNhYmxlZDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpbml0KCk7XG4gICAgb24oRVZFTlRfVVBEQVRFRCwgZGVzdHJveSk7XG4gICAgb24oRVZFTlRfVVBEQVRFRCwgaW5pdCk7XG4gICAgb24oRVZFTlRfTU9WRSwgb25Nb3ZlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIGtleWJvYXJkID0gb3B0aW9ucy5rZXlib2FyZDtcblxuICAgIGlmIChrZXlib2FyZCkge1xuICAgICAgdGFyZ2V0ID0ga2V5Ym9hcmQgPT09IFwiZ2xvYmFsXCIgPyB3aW5kb3cgOiByb290O1xuICAgICAgYmluZCh0YXJnZXQsIEtFWUJPQVJEX0VWRU5ULCBvbktleWRvd24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdW5iaW5kKHRhcmdldCwgS0VZQk9BUkRfRVZFTlQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzYWJsZSh2YWx1ZSkge1xuICAgIGRpc2FibGVkID0gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBvbk1vdmUoKSB7XG4gICAgdmFyIF9kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBkaXNhYmxlZCA9IF9kaXNhYmxlZDtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93bihlKSB7XG4gICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgdmFyIGtleSA9IG5vcm1hbGl6ZUtleShlKTtcblxuICAgICAgaWYgKGtleSA9PT0gcmVzb2x2ZShBUlJPV19MRUZUKSkge1xuICAgICAgICBTcGxpZGUyLmdvKFwiPFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSByZXNvbHZlKEFSUk9XX1JJR0hUKSkge1xuICAgICAgICBTcGxpZGUyLmdvKFwiPlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIGRpc2FibGU6IGRpc2FibGVcbiAgfTtcbn1cblxudmFyIFNSQ19EQVRBX0FUVFJJQlVURSA9IERBVEFfQVRUUklCVVRFICsgXCItbGF6eVwiO1xudmFyIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSA9IFNSQ19EQVRBX0FUVFJJQlVURSArIFwiLXNyY3NldFwiO1xudmFyIElNQUdFX1NFTEVDVE9SID0gXCJbXCIgKyBTUkNfREFUQV9BVFRSSUJVVEUgKyBcIl0sIFtcIiArIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSArIFwiXVwiO1xuXG5mdW5jdGlvbiBMYXp5TG9hZChTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMTIgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMTIub24sXG4gICAgICBvZmYgPSBfRXZlbnRJbnRlcmZhY2UxMi5vZmYsXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlMTIuYmluZCxcbiAgICAgIGVtaXQgPSBfRXZlbnRJbnRlcmZhY2UxMi5lbWl0O1xuXG4gIHZhciBpc1NlcXVlbnRpYWwgPSBvcHRpb25zLmxhenlMb2FkID09PSBcInNlcXVlbnRpYWxcIjtcbiAgdmFyIGV2ZW50cyA9IFtFVkVOVF9NT1ZFRCwgRVZFTlRfU0NST0xMRURdO1xuICB2YXIgZW50cmllcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmIChvcHRpb25zLmxhenlMb2FkKSB7XG4gICAgICBpbml0KCk7XG4gICAgICBvbihFVkVOVF9SRUZSRVNILCBpbml0KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGVtcHR5KGVudHJpZXMpO1xuICAgIHJlZ2lzdGVyKCk7XG5cbiAgICBpZiAoaXNTZXF1ZW50aWFsKSB7XG4gICAgICBsb2FkTmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmYoZXZlbnRzKTtcbiAgICAgIG9uKGV2ZW50cywgY2hlY2spO1xuICAgICAgY2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlcigpIHtcbiAgICBDb21wb25lbnRzMi5TbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoU2xpZGUpIHtcbiAgICAgIHF1ZXJ5QWxsKFNsaWRlLnNsaWRlLCBJTUFHRV9TRUxFQ1RPUikuZm9yRWFjaChmdW5jdGlvbiAoaW1nKSB7XG4gICAgICAgIHZhciBzcmMgPSBnZXRBdHRyaWJ1dGUoaW1nLCBTUkNfREFUQV9BVFRSSUJVVEUpO1xuICAgICAgICB2YXIgc3Jjc2V0ID0gZ2V0QXR0cmlidXRlKGltZywgU1JDU0VUX0RBVEFfQVRUUklCVVRFKTtcblxuICAgICAgICBpZiAoc3JjICE9PSBpbWcuc3JjIHx8IHNyY3NldCAhPT0gaW1nLnNyY3NldCkge1xuICAgICAgICAgIHZhciBjbGFzc05hbWUgPSBvcHRpb25zLmNsYXNzZXMuc3Bpbm5lcjtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gaW1nLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgdmFyIHNwaW5uZXIgPSBjaGlsZChwYXJlbnQsIFwiLlwiICsgY2xhc3NOYW1lKSB8fCBjcmVhdGUoXCJzcGFuXCIsIGNsYXNzTmFtZSwgcGFyZW50KTtcbiAgICAgICAgICBlbnRyaWVzLnB1c2goW2ltZywgU2xpZGUsIHNwaW5uZXJdKTtcbiAgICAgICAgICBpbWcuc3JjIHx8IGRpc3BsYXkoaW1nLCBcIm5vbmVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2soKSB7XG4gICAgZW50cmllcyA9IGVudHJpZXMuZmlsdGVyKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgZGlzdGFuY2UgPSBvcHRpb25zLnBlclBhZ2UgKiAoKG9wdGlvbnMucHJlbG9hZFBhZ2VzIHx8IDEpICsgMSkgLSAxO1xuICAgICAgcmV0dXJuIGRhdGFbMV0uaXNXaXRoaW4oU3BsaWRlMi5pbmRleCwgZGlzdGFuY2UpID8gbG9hZChkYXRhKSA6IHRydWU7XG4gICAgfSk7XG4gICAgZW50cmllcy5sZW5ndGggfHwgb2ZmKGV2ZW50cyk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkKGRhdGEpIHtcbiAgICB2YXIgaW1nID0gZGF0YVswXTtcbiAgICBhZGRDbGFzcyhkYXRhWzFdLnNsaWRlLCBDTEFTU19MT0FESU5HKTtcbiAgICBiaW5kKGltZywgXCJsb2FkIGVycm9yXCIsIGFwcGx5KG9uTG9hZCwgZGF0YSkpO1xuICAgIHNldEF0dHJpYnV0ZShpbWcsIFwic3JjXCIsIGdldEF0dHJpYnV0ZShpbWcsIFNSQ19EQVRBX0FUVFJJQlVURSkpO1xuICAgIHNldEF0dHJpYnV0ZShpbWcsIFwic3Jjc2V0XCIsIGdldEF0dHJpYnV0ZShpbWcsIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSkpO1xuICAgIHJlbW92ZUF0dHJpYnV0ZShpbWcsIFNSQ19EQVRBX0FUVFJJQlVURSk7XG4gICAgcmVtb3ZlQXR0cmlidXRlKGltZywgU1JDU0VUX0RBVEFfQVRUUklCVVRFKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTG9hZChkYXRhLCBlKSB7XG4gICAgdmFyIGltZyA9IGRhdGFbMF0sXG4gICAgICAgIFNsaWRlID0gZGF0YVsxXTtcbiAgICByZW1vdmVDbGFzcyhTbGlkZS5zbGlkZSwgQ0xBU1NfTE9BRElORyk7XG5cbiAgICBpZiAoZS50eXBlICE9PSBcImVycm9yXCIpIHtcbiAgICAgIHJlbW92ZShkYXRhWzJdKTtcbiAgICAgIGRpc3BsYXkoaW1nLCBcIlwiKTtcbiAgICAgIGVtaXQoRVZFTlRfTEFaWUxPQURfTE9BREVELCBpbWcsIFNsaWRlKTtcbiAgICAgIGVtaXQoRVZFTlRfUkVTSVpFKTtcbiAgICB9XG5cbiAgICBpc1NlcXVlbnRpYWwgJiYgbG9hZE5leHQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWROZXh0KCkge1xuICAgIGVudHJpZXMubGVuZ3RoICYmIGxvYWQoZW50cmllcy5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGFwcGx5KGVtcHR5LCBlbnRyaWVzKSxcbiAgICBjaGVjazogY2hlY2tcbiAgfTtcbn1cblxuZnVuY3Rpb24gUGFnaW5hdGlvbihTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgdmFyIG9uID0gZXZlbnQub24sXG4gICAgICBlbWl0ID0gZXZlbnQuZW1pdCxcbiAgICAgIGJpbmQgPSBldmVudC5iaW5kO1xuICB2YXIgU2xpZGVzID0gQ29tcG9uZW50czIuU2xpZGVzLFxuICAgICAgRWxlbWVudHMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIENvbnRyb2xsZXIgPSBDb21wb25lbnRzMi5Db250cm9sbGVyO1xuICB2YXIgaGFzRm9jdXMgPSBDb250cm9sbGVyLmhhc0ZvY3VzLFxuICAgICAgZ2V0SW5kZXggPSBDb250cm9sbGVyLmdldEluZGV4LFxuICAgICAgZ28gPSBDb250cm9sbGVyLmdvO1xuICB2YXIgcmVzb2x2ZSA9IENvbXBvbmVudHMyLkRpcmVjdGlvbi5yZXNvbHZlO1xuICB2YXIgcGxhY2Vob2xkZXIgPSBFbGVtZW50cy5wYWdpbmF0aW9uO1xuICB2YXIgaXRlbXMgPSBbXTtcbiAgdmFyIGxpc3Q7XG4gIHZhciBwYWdpbmF0aW9uQ2xhc3NlcztcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBkZXN0cm95KCk7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCBtb3VudCk7XG4gICAgdmFyIGVuYWJsZWQgPSBvcHRpb25zLnBhZ2luYXRpb24gJiYgU2xpZGVzLmlzRW5vdWdoKCk7XG4gICAgcGxhY2Vob2xkZXIgJiYgZGlzcGxheShwbGFjZWhvbGRlciwgZW5hYmxlZCA/IFwiXCIgOiBcIm5vbmVcIik7XG5cbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgb24oW0VWRU5UX01PVkUsIEVWRU5UX1NDUk9MTCwgRVZFTlRfU0NST0xMRURdLCB1cGRhdGUpO1xuICAgICAgY3JlYXRlUGFnaW5hdGlvbigpO1xuICAgICAgdXBkYXRlKCk7XG4gICAgICBlbWl0KEVWRU5UX1BBR0lOQVRJT05fTU9VTlRFRCwge1xuICAgICAgICBsaXN0OiBsaXN0LFxuICAgICAgICBpdGVtczogaXRlbXNcbiAgICAgIH0sIGdldEF0KFNwbGlkZTIuaW5kZXgpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGlmIChsaXN0KSB7XG4gICAgICByZW1vdmUocGxhY2Vob2xkZXIgPyBzbGljZShsaXN0LmNoaWxkcmVuKSA6IGxpc3QpO1xuICAgICAgcmVtb3ZlQ2xhc3MobGlzdCwgcGFnaW5hdGlvbkNsYXNzZXMpO1xuICAgICAgZW1wdHkoaXRlbXMpO1xuICAgICAgbGlzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgZXZlbnQuZGVzdHJveSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUGFnaW5hdGlvbigpIHtcbiAgICB2YXIgbGVuZ3RoID0gU3BsaWRlMi5sZW5ndGg7XG4gICAgdmFyIGNsYXNzZXMgPSBvcHRpb25zLmNsYXNzZXMsXG4gICAgICAgIGkxOG4gPSBvcHRpb25zLmkxOG4sXG4gICAgICAgIHBlclBhZ2UgPSBvcHRpb25zLnBlclBhZ2U7XG4gICAgdmFyIG1heCA9IGhhc0ZvY3VzKCkgPyBsZW5ndGggOiBjZWlsKGxlbmd0aCAvIHBlclBhZ2UpO1xuICAgIGxpc3QgPSBwbGFjZWhvbGRlciB8fCBjcmVhdGUoXCJ1bFwiLCBjbGFzc2VzLnBhZ2luYXRpb24sIEVsZW1lbnRzLnRyYWNrLnBhcmVudEVsZW1lbnQpO1xuICAgIGFkZENsYXNzKGxpc3QsIHBhZ2luYXRpb25DbGFzc2VzID0gQ0xBU1NfUEFHSU5BVElPTiArIFwiLS1cIiArIGdldERpcmVjdGlvbigpKTtcbiAgICBzZXRBdHRyaWJ1dGUobGlzdCwgUk9MRSwgXCJ0YWJsaXN0XCIpO1xuICAgIHNldEF0dHJpYnV0ZShsaXN0LCBBUklBX0xBQkVMLCBpMThuLnNlbGVjdCk7XG4gICAgc2V0QXR0cmlidXRlKGxpc3QsIEFSSUFfT1JJRU5UQVRJT04sIGdldERpcmVjdGlvbigpID09PSBUVEIgPyBcInZlcnRpY2FsXCIgOiBcIlwiKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIHZhciBsaSA9IGNyZWF0ZShcImxpXCIsIG51bGwsIGxpc3QpO1xuICAgICAgdmFyIGJ1dHRvbiA9IGNyZWF0ZShcImJ1dHRvblwiLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnBhZ2UsXG4gICAgICAgIHR5cGU6IFwiYnV0dG9uXCJcbiAgICAgIH0sIGxpKTtcbiAgICAgIHZhciBjb250cm9scyA9IFNsaWRlcy5nZXRJbihpKS5tYXAoZnVuY3Rpb24gKFNsaWRlKSB7XG4gICAgICAgIHJldHVybiBTbGlkZS5zbGlkZS5pZDtcbiAgICAgIH0pO1xuICAgICAgdmFyIHRleHQgPSAhaGFzRm9jdXMoKSAmJiBwZXJQYWdlID4gMSA/IGkxOG4ucGFnZVggOiBpMThuLnNsaWRlWDtcbiAgICAgIGJpbmQoYnV0dG9uLCBcImNsaWNrXCIsIGFwcGx5KG9uQ2xpY2ssIGkpKTtcblxuICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbktleWJvYXJkKSB7XG4gICAgICAgIGJpbmQoYnV0dG9uLCBcImtleWRvd25cIiwgYXBwbHkob25LZXlkb3duLCBpKSk7XG4gICAgICB9XG5cbiAgICAgIHNldEF0dHJpYnV0ZShsaSwgUk9MRSwgXCJwcmVzZW50YXRpb25cIik7XG4gICAgICBzZXRBdHRyaWJ1dGUoYnV0dG9uLCBST0xFLCBcInRhYlwiKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIEFSSUFfQ09OVFJPTFMsIGNvbnRyb2xzLmpvaW4oXCIgXCIpKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIEFSSUFfTEFCRUwsIGZvcm1hdCh0ZXh0LCBpICsgMSkpO1xuICAgICAgc2V0QXR0cmlidXRlKGJ1dHRvbiwgVEFCX0lOREVYLCAtMSk7XG4gICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgbGk6IGxpLFxuICAgICAgICBidXR0b246IGJ1dHRvbixcbiAgICAgICAgcGFnZTogaVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25DbGljayhwYWdlKSB7XG4gICAgZ28oXCI+XCIgKyBwYWdlLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93bihwYWdlLCBlKSB7XG4gICAgdmFyIGxlbmd0aCA9IGl0ZW1zLmxlbmd0aDtcbiAgICB2YXIga2V5ID0gbm9ybWFsaXplS2V5KGUpO1xuICAgIHZhciBkaXIgPSBnZXREaXJlY3Rpb24oKTtcbiAgICB2YXIgbmV4dFBhZ2UgPSAtMTtcblxuICAgIGlmIChrZXkgPT09IHJlc29sdmUoQVJST1dfUklHSFQsIGZhbHNlLCBkaXIpKSB7XG4gICAgICBuZXh0UGFnZSA9ICsrcGFnZSAlIGxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gcmVzb2x2ZShBUlJPV19MRUZULCBmYWxzZSwgZGlyKSkge1xuICAgICAgbmV4dFBhZ2UgPSAoLS1wYWdlICsgbGVuZ3RoKSAlIGxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJIb21lXCIpIHtcbiAgICAgIG5leHRQYWdlID0gMDtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJFbmRcIikge1xuICAgICAgbmV4dFBhZ2UgPSBsZW5ndGggLSAxO1xuICAgIH1cblxuICAgIHZhciBpdGVtID0gaXRlbXNbbmV4dFBhZ2VdO1xuXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGZvY3VzKGl0ZW0uYnV0dG9uKTtcbiAgICAgIGdvKFwiPlwiICsgbmV4dFBhZ2UpO1xuICAgICAgcHJldmVudChlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXREaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMucGFnaW5hdGlvbkRpcmVjdGlvbiB8fCBvcHRpb25zLmRpcmVjdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEF0KGluZGV4KSB7XG4gICAgcmV0dXJuIGl0ZW1zW0NvbnRyb2xsZXIudG9QYWdlKGluZGV4KV07XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIHByZXYgPSBnZXRBdChnZXRJbmRleCh0cnVlKSk7XG4gICAgdmFyIGN1cnIgPSBnZXRBdChnZXRJbmRleCgpKTtcblxuICAgIGlmIChwcmV2KSB7XG4gICAgICB2YXIgYnV0dG9uID0gcHJldi5idXR0b247XG4gICAgICByZW1vdmVDbGFzcyhidXR0b24sIENMQVNTX0FDVElWRSk7XG4gICAgICByZW1vdmVBdHRyaWJ1dGUoYnV0dG9uLCBBUklBX1NFTEVDVEVEKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIFRBQl9JTkRFWCwgLTEpO1xuICAgIH1cblxuICAgIGlmIChjdXJyKSB7XG4gICAgICB2YXIgX2J1dHRvbiA9IGN1cnIuYnV0dG9uO1xuICAgICAgYWRkQ2xhc3MoX2J1dHRvbiwgQ0xBU1NfQUNUSVZFKTtcbiAgICAgIHNldEF0dHJpYnV0ZShfYnV0dG9uLCBBUklBX1NFTEVDVEVELCB0cnVlKTtcbiAgICAgIHNldEF0dHJpYnV0ZShfYnV0dG9uLCBUQUJfSU5ERVgsIFwiXCIpO1xuICAgIH1cblxuICAgIGVtaXQoRVZFTlRfUEFHSU5BVElPTl9VUERBVEVELCB7XG4gICAgICBsaXN0OiBsaXN0LFxuICAgICAgaXRlbXM6IGl0ZW1zXG4gICAgfSwgcHJldiwgY3Vycik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGl0ZW1zOiBpdGVtcyxcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBnZXRBdDogZ2V0QXQsXG4gICAgdXBkYXRlOiB1cGRhdGVcbiAgfTtcbn1cblxudmFyIFRSSUdHRVJfS0VZUyA9IFtcIiBcIiwgXCJFbnRlclwiXTtcblxuZnVuY3Rpb24gU3luYyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgaXNOYXZpZ2F0aW9uID0gb3B0aW9ucy5pc05hdmlnYXRpb24sXG4gICAgICBzbGlkZUZvY3VzID0gb3B0aW9ucy5zbGlkZUZvY3VzO1xuICB2YXIgZXZlbnRzID0gW107XG5cbiAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgU3BsaWRlMi5vcHRpb25zID0ge1xuICAgICAgc2xpZGVGb2N1czogaXNVbmRlZmluZWQoc2xpZGVGb2N1cykgPyBpc05hdmlnYXRpb24gOiBzbGlkZUZvY3VzXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIFNwbGlkZTIuc3BsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIGlmICghdGFyZ2V0LmlzUGFyZW50KSB7XG4gICAgICAgIHN5bmMoU3BsaWRlMiwgdGFyZ2V0LnNwbGlkZSk7XG4gICAgICAgIHN5bmModGFyZ2V0LnNwbGlkZSwgU3BsaWRlMik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaXNOYXZpZ2F0aW9uKSB7XG4gICAgICBuYXZpZ2F0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5kZXN0cm95KCk7XG4gICAgfSk7XG4gICAgZW1wdHkoZXZlbnRzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW91bnQoKSB7XG4gICAgZGVzdHJveSgpO1xuICAgIG1vdW50KCk7XG4gIH1cblxuICBmdW5jdGlvbiBzeW5jKHNwbGlkZSwgdGFyZ2V0KSB7XG4gICAgdmFyIGV2ZW50ID0gRXZlbnRJbnRlcmZhY2Uoc3BsaWRlKTtcbiAgICBldmVudC5vbihFVkVOVF9NT1ZFLCBmdW5jdGlvbiAoaW5kZXgsIHByZXYsIGRlc3QpIHtcbiAgICAgIHRhcmdldC5nbyh0YXJnZXQuaXMoTE9PUCkgPyBkZXN0IDogaW5kZXgpO1xuICAgIH0pO1xuICAgIGV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5hdmlnYXRlKCkge1xuICAgIHZhciBldmVudCA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpO1xuICAgIHZhciBvbiA9IGV2ZW50Lm9uO1xuICAgIG9uKEVWRU5UX0NMSUNLLCBvbkNsaWNrKTtcbiAgICBvbihFVkVOVF9TTElERV9LRVlET1dOLCBvbktleWRvd24pO1xuICAgIG9uKFtFVkVOVF9NT1VOVEVELCBFVkVOVF9VUERBVEVEXSwgdXBkYXRlKTtcbiAgICBldmVudHMucHVzaChldmVudCk7XG4gICAgZXZlbnQuZW1pdChFVkVOVF9OQVZJR0FUSU9OX01PVU5URUQsIFNwbGlkZTIuc3BsaWRlcyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgc2V0QXR0cmlidXRlKENvbXBvbmVudHMyLkVsZW1lbnRzLmxpc3QsIEFSSUFfT1JJRU5UQVRJT04sIG9wdGlvbnMuZGlyZWN0aW9uID09PSBUVEIgPyBcInZlcnRpY2FsXCIgOiBcIlwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ2xpY2soU2xpZGUpIHtcbiAgICBTcGxpZGUyLmdvKFNsaWRlLmluZGV4KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93bihTbGlkZSwgZSkge1xuICAgIGlmIChpbmNsdWRlcyhUUklHR0VSX0tFWVMsIG5vcm1hbGl6ZUtleShlKSkpIHtcbiAgICAgIG9uQ2xpY2soU2xpZGUpO1xuICAgICAgcHJldmVudChlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldHVwOiBzZXR1cCxcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICByZW1vdW50OiByZW1vdW50XG4gIH07XG59XG5cbmZ1bmN0aW9uIFdoZWVsKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UxMyA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTEzLmJpbmQ7XG5cbiAgdmFyIGxhc3RUaW1lID0gMDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpZiAob3B0aW9ucy53aGVlbCkge1xuICAgICAgYmluZChDb21wb25lbnRzMi5FbGVtZW50cy50cmFjaywgXCJ3aGVlbFwiLCBvbldoZWVsLCBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25XaGVlbChlKSB7XG4gICAgaWYgKGUuY2FuY2VsYWJsZSkge1xuICAgICAgdmFyIGRlbHRhWSA9IGUuZGVsdGFZO1xuICAgICAgdmFyIGJhY2t3YXJkcyA9IGRlbHRhWSA8IDA7XG4gICAgICB2YXIgdGltZVN0YW1wID0gdGltZU9mKGUpO1xuXG4gICAgICB2YXIgX21pbiA9IG9wdGlvbnMud2hlZWxNaW5UaHJlc2hvbGQgfHwgMDtcblxuICAgICAgdmFyIHNsZWVwID0gb3B0aW9ucy53aGVlbFNsZWVwIHx8IDA7XG5cbiAgICAgIGlmIChhYnMoZGVsdGFZKSA+IF9taW4gJiYgdGltZVN0YW1wIC0gbGFzdFRpbWUgPiBzbGVlcCkge1xuICAgICAgICBTcGxpZGUyLmdvKGJhY2t3YXJkcyA/IFwiPFwiIDogXCI+XCIpO1xuICAgICAgICBsYXN0VGltZSA9IHRpbWVTdGFtcDtcbiAgICAgIH1cblxuICAgICAgc2hvdWxkUHJldmVudChiYWNrd2FyZHMpICYmIHByZXZlbnQoZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkUHJldmVudChiYWNrd2FyZHMpIHtcbiAgICByZXR1cm4gIW9wdGlvbnMucmVsZWFzZVdoZWVsIHx8IFNwbGlkZTIuc3RhdGUuaXMoTU9WSU5HKSB8fCBDb21wb25lbnRzMi5Db250cm9sbGVyLmdldEFkamFjZW50KGJhY2t3YXJkcykgIT09IC0xO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnRcbiAgfTtcbn1cblxudmFyIFNSX1JFTU9WQUxfREVMQVkgPSA5MDtcblxuZnVuY3Rpb24gTGl2ZShTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMTQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMTQub247XG5cbiAgdmFyIHRyYWNrID0gQ29tcG9uZW50czIuRWxlbWVudHMudHJhY2s7XG4gIHZhciBlbmFibGVkID0gb3B0aW9ucy5saXZlICYmICFvcHRpb25zLmlzTmF2aWdhdGlvbjtcbiAgdmFyIHNyID0gY3JlYXRlKFwic3BhblwiLCBDTEFTU19TUik7XG4gIHZhciBpbnRlcnZhbCA9IFJlcXVlc3RJbnRlcnZhbChTUl9SRU1PVkFMX0RFTEFZLCBhcHBseSh0b2dnbGUsIGZhbHNlKSk7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIGRpc2FibGUoIUNvbXBvbmVudHMyLkF1dG9wbGF5LmlzUGF1c2VkKCkpO1xuICAgICAgc2V0QXR0cmlidXRlKHRyYWNrLCBBUklBX0FUT01JQywgdHJ1ZSk7XG4gICAgICBzci50ZXh0Q29udGVudCA9IFwiXFx1MjAyNlwiO1xuICAgICAgb24oRVZFTlRfQVVUT1BMQVlfUExBWSwgYXBwbHkoZGlzYWJsZSwgdHJ1ZSkpO1xuICAgICAgb24oRVZFTlRfQVVUT1BMQVlfUEFVU0UsIGFwcGx5KGRpc2FibGUsIGZhbHNlKSk7XG4gICAgICBvbihbRVZFTlRfTU9WRUQsIEVWRU5UX1NDUk9MTEVEXSwgYXBwbHkodG9nZ2xlLCB0cnVlKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlKGFjdGl2ZSkge1xuICAgIHNldEF0dHJpYnV0ZSh0cmFjaywgQVJJQV9CVVNZLCBhY3RpdmUpO1xuXG4gICAgaWYgKGFjdGl2ZSkge1xuICAgICAgYXBwZW5kKHRyYWNrLCBzcik7XG4gICAgICBpbnRlcnZhbC5zdGFydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoc3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgcmVtb3ZlQXR0cmlidXRlKHRyYWNrLCBbQVJJQV9MSVZFLCBBUklBX0FUT01JQywgQVJJQV9CVVNZXSk7XG4gICAgcmVtb3ZlKHNyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc2FibGUoZGlzYWJsZWQpIHtcbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgc2V0QXR0cmlidXRlKHRyYWNrLCBBUklBX0xJVkUsIGRpc2FibGVkID8gXCJvZmZcIiA6IFwicG9saXRlXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRpc2FibGU6IGRpc2FibGUsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xufVxuXG52YXIgQ29tcG9uZW50Q29uc3RydWN0b3JzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICBfX3Byb3RvX186IG51bGwsXG4gIE1lZGlhOiBNZWRpYSxcbiAgRGlyZWN0aW9uOiBEaXJlY3Rpb24sXG4gIEVsZW1lbnRzOiBFbGVtZW50cyxcbiAgU2xpZGVzOiBTbGlkZXMsXG4gIExheW91dDogTGF5b3V0LFxuICBDbG9uZXM6IENsb25lcyxcbiAgTW92ZTogTW92ZSxcbiAgQ29udHJvbGxlcjogQ29udHJvbGxlcixcbiAgQXJyb3dzOiBBcnJvd3MsXG4gIEF1dG9wbGF5OiBBdXRvcGxheSxcbiAgQ292ZXI6IENvdmVyLFxuICBTY3JvbGw6IFNjcm9sbCxcbiAgRHJhZzogRHJhZyxcbiAgS2V5Ym9hcmQ6IEtleWJvYXJkLFxuICBMYXp5TG9hZDogTGF6eUxvYWQsXG4gIFBhZ2luYXRpb246IFBhZ2luYXRpb24sXG4gIFN5bmM6IFN5bmMsXG4gIFdoZWVsOiBXaGVlbCxcbiAgTGl2ZTogTGl2ZVxufSk7XG52YXIgSTE4TiA9IHtcbiAgcHJldjogXCJQcmV2aW91cyBzbGlkZVwiLFxuICBuZXh0OiBcIk5leHQgc2xpZGVcIixcbiAgZmlyc3Q6IFwiR28gdG8gZmlyc3Qgc2xpZGVcIixcbiAgbGFzdDogXCJHbyB0byBsYXN0IHNsaWRlXCIsXG4gIHNsaWRlWDogXCJHbyB0byBzbGlkZSAlc1wiLFxuICBwYWdlWDogXCJHbyB0byBwYWdlICVzXCIsXG4gIHBsYXk6IFwiU3RhcnQgYXV0b3BsYXlcIixcbiAgcGF1c2U6IFwiUGF1c2UgYXV0b3BsYXlcIixcbiAgY2Fyb3VzZWw6IFwiY2Fyb3VzZWxcIixcbiAgc2xpZGU6IFwic2xpZGVcIixcbiAgc2VsZWN0OiBcIlNlbGVjdCBhIHNsaWRlIHRvIHNob3dcIixcbiAgc2xpZGVMYWJlbDogXCIlcyBvZiAlc1wiXG59O1xudmFyIERFRkFVTFRTID0ge1xuICB0eXBlOiBcInNsaWRlXCIsXG4gIHJvbGU6IFwicmVnaW9uXCIsXG4gIHNwZWVkOiA0MDAsXG4gIHBlclBhZ2U6IDEsXG4gIGNsb25lU3RhdHVzOiB0cnVlLFxuICBhcnJvd3M6IHRydWUsXG4gIHBhZ2luYXRpb246IHRydWUsXG4gIHBhZ2luYXRpb25LZXlib2FyZDogdHJ1ZSxcbiAgaW50ZXJ2YWw6IDVlMyxcbiAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICBwYXVzZU9uRm9jdXM6IHRydWUsXG4gIHJlc2V0UHJvZ3Jlc3M6IHRydWUsXG4gIGVhc2luZzogXCJjdWJpYy1iZXppZXIoMC4yNSwgMSwgMC41LCAxKVwiLFxuICBkcmFnOiB0cnVlLFxuICBkaXJlY3Rpb246IFwibHRyXCIsXG4gIHRyaW1TcGFjZTogdHJ1ZSxcbiAgZm9jdXNhYmxlTm9kZXM6IFwiYSwgYnV0dG9uLCB0ZXh0YXJlYSwgaW5wdXQsIHNlbGVjdCwgaWZyYW1lXCIsXG4gIGxpdmU6IHRydWUsXG4gIGNsYXNzZXM6IENMQVNTRVMsXG4gIGkxOG46IEkxOE4sXG4gIHJlZHVjZWRNb3Rpb246IHtcbiAgICBzcGVlZDogMCxcbiAgICByZXdpbmRTcGVlZDogMCxcbiAgICBhdXRvcGxheTogXCJwYXVzZVwiXG4gIH1cbn07XG5cbmZ1bmN0aW9uIEZhZGUoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTE1ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTE1Lm9uO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIG9uKFtFVkVOVF9NT1VOVEVELCBFVkVOVF9SRUZSRVNIXSwgZnVuY3Rpb24gKCkge1xuICAgICAgbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBDb21wb25lbnRzMi5TbGlkZXMuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwib3BhY2l0eSBcIiArIG9wdGlvbnMuc3BlZWQgKyBcIm1zIFwiICsgb3B0aW9ucy5lYXNpbmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydChpbmRleCwgZG9uZSkge1xuICAgIHZhciB0cmFjayA9IENvbXBvbmVudHMyLkVsZW1lbnRzLnRyYWNrO1xuICAgIHN0eWxlKHRyYWNrLCBcImhlaWdodFwiLCB1bml0KHJlY3QodHJhY2spLmhlaWdodCkpO1xuICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvbmUoKTtcbiAgICAgIHN0eWxlKHRyYWNrLCBcImhlaWdodFwiLCBcIlwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIHN0YXJ0OiBzdGFydCxcbiAgICBjYW5jZWw6IG5vb3BcbiAgfTtcbn1cblxuZnVuY3Rpb24gU2xpZGUoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTE2ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlMTYuYmluZDtcblxuICB2YXIgTW92ZSA9IENvbXBvbmVudHMyLk1vdmUsXG4gICAgICBDb250cm9sbGVyID0gQ29tcG9uZW50czIuQ29udHJvbGxlcixcbiAgICAgIFNjcm9sbCA9IENvbXBvbmVudHMyLlNjcm9sbDtcbiAgdmFyIGxpc3QgPSBDb21wb25lbnRzMi5FbGVtZW50cy5saXN0O1xuICB2YXIgdHJhbnNpdGlvbiA9IGFwcGx5KHN0eWxlLCBsaXN0LCBcInRyYW5zaXRpb25cIik7XG4gIHZhciBlbmRDYWxsYmFjaztcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBiaW5kKGxpc3QsIFwidHJhbnNpdGlvbmVuZFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUudGFyZ2V0ID09PSBsaXN0ICYmIGVuZENhbGxiYWNrKSB7XG4gICAgICAgIGNhbmNlbCgpO1xuICAgICAgICBlbmRDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQoaW5kZXgsIGRvbmUpIHtcbiAgICB2YXIgZGVzdGluYXRpb24gPSBNb3ZlLnRvUG9zaXRpb24oaW5kZXgsIHRydWUpO1xuICAgIHZhciBwb3NpdGlvbiA9IE1vdmUuZ2V0UG9zaXRpb24oKTtcbiAgICB2YXIgc3BlZWQgPSBnZXRTcGVlZChpbmRleCk7XG5cbiAgICBpZiAoYWJzKGRlc3RpbmF0aW9uIC0gcG9zaXRpb24pID49IDEgJiYgc3BlZWQgPj0gMSkge1xuICAgICAgaWYgKG9wdGlvbnMudXNlU2Nyb2xsKSB7XG4gICAgICAgIFNjcm9sbC5zY3JvbGwoZGVzdGluYXRpb24sIHNwZWVkLCBmYWxzZSwgZG9uZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2l0aW9uKFwidHJhbnNmb3JtIFwiICsgc3BlZWQgKyBcIm1zIFwiICsgb3B0aW9ucy5lYXNpbmcpO1xuICAgICAgICBNb3ZlLnRyYW5zbGF0ZShkZXN0aW5hdGlvbiwgdHJ1ZSk7XG4gICAgICAgIGVuZENhbGxiYWNrID0gZG9uZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgTW92ZS5qdW1wKGluZGV4KTtcbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgdHJhbnNpdGlvbihcIlwiKTtcbiAgICBTY3JvbGwuY2FuY2VsKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTcGVlZChpbmRleCkge1xuICAgIHZhciByZXdpbmRTcGVlZCA9IG9wdGlvbnMucmV3aW5kU3BlZWQ7XG5cbiAgICBpZiAoU3BsaWRlMi5pcyhTTElERSkgJiYgcmV3aW5kU3BlZWQpIHtcbiAgICAgIHZhciBwcmV2ID0gQ29udHJvbGxlci5nZXRJbmRleCh0cnVlKTtcbiAgICAgIHZhciBlbmQgPSBDb250cm9sbGVyLmdldEVuZCgpO1xuXG4gICAgICBpZiAocHJldiA9PT0gMCAmJiBpbmRleCA+PSBlbmQgfHwgcHJldiA+PSBlbmQgJiYgaW5kZXggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHJld2luZFNwZWVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zLnNwZWVkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgc3RhcnQ6IHN0YXJ0LFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59XG5cbnZhciBfU3BsaWRlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gX1NwbGlkZSh0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmV2ZW50ID0gRXZlbnRJbnRlcmZhY2UoKTtcbiAgICB0aGlzLkNvbXBvbmVudHMgPSB7fTtcbiAgICB0aGlzLnN0YXRlID0gU3RhdGUoQ1JFQVRFRCk7XG4gICAgdGhpcy5zcGxpZGVzID0gW107XG4gICAgdGhpcy5fbyA9IHt9O1xuICAgIHRoaXMuX0UgPSB7fTtcbiAgICB2YXIgcm9vdCA9IGlzU3RyaW5nKHRhcmdldCkgPyBxdWVyeShkb2N1bWVudCwgdGFyZ2V0KSA6IHRhcmdldDtcbiAgICBhc3NlcnQocm9vdCwgcm9vdCArIFwiIGlzIGludmFsaWQuXCIpO1xuICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgb3B0aW9ucyA9IG1lcmdlKHtcbiAgICAgIGxhYmVsOiBnZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9MQUJFTCkgfHwgXCJcIixcbiAgICAgIGxhYmVsbGVkYnk6IGdldEF0dHJpYnV0ZShyb290LCBBUklBX0xBQkVMTEVEQlkpIHx8IFwiXCJcbiAgICB9LCBERUZBVUxUUywgX1NwbGlkZS5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICB0cnkge1xuICAgICAgbWVyZ2Uob3B0aW9ucywgSlNPTi5wYXJzZShnZXRBdHRyaWJ1dGUocm9vdCwgREFUQV9BVFRSSUJVVEUpKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgYXNzZXJ0KGZhbHNlLCBcIkludmFsaWQgSlNPTlwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vID0gT2JqZWN0LmNyZWF0ZShtZXJnZSh7fSwgb3B0aW9ucykpO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IF9TcGxpZGUucHJvdG90eXBlO1xuXG4gIF9wcm90by5tb3VudCA9IGZ1bmN0aW9uIG1vdW50KEV4dGVuc2lvbnMsIFRyYW5zaXRpb24pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgQ29tcG9uZW50czIgPSB0aGlzLkNvbXBvbmVudHM7XG4gICAgYXNzZXJ0KHN0YXRlLmlzKFtDUkVBVEVELCBERVNUUk9ZRURdKSwgXCJBbHJlYWR5IG1vdW50ZWQhXCIpO1xuICAgIHN0YXRlLnNldChDUkVBVEVEKTtcbiAgICB0aGlzLl9DID0gQ29tcG9uZW50czI7XG4gICAgdGhpcy5fVCA9IFRyYW5zaXRpb24gfHwgdGhpcy5fVCB8fCAodGhpcy5pcyhGQURFKSA/IEZhZGUgOiBTbGlkZSk7XG4gICAgdGhpcy5fRSA9IEV4dGVuc2lvbnMgfHwgdGhpcy5fRTtcbiAgICB2YXIgQ29uc3RydWN0b3JzID0gYXNzaWduKHt9LCBDb21wb25lbnRDb25zdHJ1Y3RvcnMsIHRoaXMuX0UsIHtcbiAgICAgIFRyYW5zaXRpb246IHRoaXMuX1RcbiAgICB9KTtcbiAgICBmb3JPd24oQ29uc3RydWN0b3JzLCBmdW5jdGlvbiAoQ29tcG9uZW50LCBrZXkpIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBDb21wb25lbnQoX3RoaXMsIENvbXBvbmVudHMyLCBfdGhpcy5fbyk7XG4gICAgICBDb21wb25lbnRzMltrZXldID0gY29tcG9uZW50O1xuICAgICAgY29tcG9uZW50LnNldHVwICYmIGNvbXBvbmVudC5zZXR1cCgpO1xuICAgIH0pO1xuICAgIGZvck93bihDb21wb25lbnRzMiwgZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgICAgY29tcG9uZW50Lm1vdW50ICYmIGNvbXBvbmVudC5tb3VudCgpO1xuICAgIH0pO1xuICAgIHRoaXMuZW1pdChFVkVOVF9NT1VOVEVEKTtcbiAgICBhZGRDbGFzcyh0aGlzLnJvb3QsIENMQVNTX0lOSVRJQUxJWkVEKTtcbiAgICBzdGF0ZS5zZXQoSURMRSk7XG4gICAgdGhpcy5lbWl0KEVWRU5UX1JFQURZKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uc3luYyA9IGZ1bmN0aW9uIHN5bmMoc3BsaWRlKSB7XG4gICAgdGhpcy5zcGxpZGVzLnB1c2goe1xuICAgICAgc3BsaWRlOiBzcGxpZGVcbiAgICB9KTtcbiAgICBzcGxpZGUuc3BsaWRlcy5wdXNoKHtcbiAgICAgIHNwbGlkZTogdGhpcyxcbiAgICAgIGlzUGFyZW50OiB0cnVlXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pcyhJRExFKSkge1xuICAgICAgdGhpcy5fQy5TeW5jLnJlbW91bnQoKTtcblxuICAgICAgc3BsaWRlLkNvbXBvbmVudHMuU3luYy5yZW1vdW50KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmdvID0gZnVuY3Rpb24gZ28oY29udHJvbCkge1xuICAgIHRoaXMuX0MuQ29udHJvbGxlci5nbyhjb250cm9sKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50cywgY2FsbGJhY2spIHtcbiAgICB0aGlzLmV2ZW50Lm9uKGV2ZW50cywgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5vZmYgPSBmdW5jdGlvbiBvZmYoZXZlbnRzKSB7XG4gICAgdGhpcy5ldmVudC5vZmYoZXZlbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICB2YXIgX3RoaXMkZXZlbnQ7XG5cbiAgICAoX3RoaXMkZXZlbnQgPSB0aGlzLmV2ZW50KS5lbWl0LmFwcGx5KF90aGlzJGV2ZW50LCBbZXZlbnRdLmNvbmNhdChzbGljZShhcmd1bWVudHMsIDEpKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uYWRkID0gZnVuY3Rpb24gYWRkKHNsaWRlcywgaW5kZXgpIHtcbiAgICB0aGlzLl9DLlNsaWRlcy5hZGQoc2xpZGVzLCBpbmRleCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKG1hdGNoZXIpIHtcbiAgICB0aGlzLl9DLlNsaWRlcy5yZW1vdmUobWF0Y2hlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uaXMgPSBmdW5jdGlvbiBpcyh0eXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuX28udHlwZSA9PT0gdHlwZTtcbiAgfTtcblxuICBfcHJvdG8ucmVmcmVzaCA9IGZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gICAgdGhpcy5lbWl0KEVWRU5UX1JFRlJFU0gpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveShjb21wbGV0ZWx5KSB7XG4gICAgaWYgKGNvbXBsZXRlbHkgPT09IHZvaWQgMCkge1xuICAgICAgY29tcGxldGVseSA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudCxcbiAgICAgICAgc3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKHN0YXRlLmlzKENSRUFURUQpKSB7XG4gICAgICBFdmVudEludGVyZmFjZSh0aGlzKS5vbihFVkVOVF9SRUFEWSwgdGhpcy5kZXN0cm95LmJpbmQodGhpcywgY29tcGxldGVseSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JPd24odGhpcy5fQywgZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgICAgICBjb21wb25lbnQuZGVzdHJveSAmJiBjb21wb25lbnQuZGVzdHJveShjb21wbGV0ZWx5KTtcbiAgICAgIH0sIHRydWUpO1xuICAgICAgZXZlbnQuZW1pdChFVkVOVF9ERVNUUk9ZKTtcbiAgICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgICAgIGNvbXBsZXRlbHkgJiYgZW1wdHkodGhpcy5zcGxpZGVzKTtcbiAgICAgIHN0YXRlLnNldChERVNUUk9ZRUQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9jcmVhdGVDbGFzcyhfU3BsaWRlLCBbe1xuICAgIGtleTogXCJvcHRpb25zXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbztcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX0MuTWVkaWEuc2V0KG9wdGlvbnMsIHRydWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJsZW5ndGhcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9DLlNsaWRlcy5nZXRMZW5ndGgodHJ1ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluZGV4XCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fQy5Db250cm9sbGVyLmdldEluZGV4KCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIF9TcGxpZGU7XG59KCk7XG5cbnZhciBTcGxpZGUgPSBfU3BsaWRlO1xuU3BsaWRlLmRlZmF1bHRzID0ge307XG5TcGxpZGUuU1RBVEVTID0gU1RBVEVTO1xudmFyIENMQVNTX1JFTkRFUkVEID0gXCJpcy1yZW5kZXJlZFwiO1xudmFyIFJFTkRFUkVSX0RFRkFVTFRfQ09ORklHID0ge1xuICBsaXN0VGFnOiBcInVsXCIsXG4gIHNsaWRlVGFnOiBcImxpXCJcbn07XG5cbnZhciBTdHlsZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0eWxlKGlkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5zdHlsZXMgPSB7fTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHZhciBfcHJvdG8yID0gU3R5bGUucHJvdG90eXBlO1xuXG4gIF9wcm90bzIucnVsZSA9IGZ1bmN0aW9uIHJ1bGUoc2VsZWN0b3IsIHByb3AsIHZhbHVlLCBicmVha3BvaW50KSB7XG4gICAgYnJlYWtwb2ludCA9IGJyZWFrcG9pbnQgfHwgXCJkZWZhdWx0XCI7XG4gICAgdmFyIHNlbGVjdG9ycyA9IHRoaXMuc3R5bGVzW2JyZWFrcG9pbnRdID0gdGhpcy5zdHlsZXNbYnJlYWtwb2ludF0gfHwge307XG4gICAgdmFyIHN0eWxlcyA9IHNlbGVjdG9yc1tzZWxlY3Rvcl0gPSBzZWxlY3RvcnNbc2VsZWN0b3JdIHx8IHt9O1xuICAgIHN0eWxlc1twcm9wXSA9IHZhbHVlO1xuICB9O1xuXG4gIF9wcm90bzIuYnVpbGQgPSBmdW5jdGlvbiBidWlsZCgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBjc3MgPSBcIlwiO1xuXG4gICAgaWYgKHRoaXMuc3R5bGVzLmRlZmF1bHQpIHtcbiAgICAgIGNzcyArPSB0aGlzLmJ1aWxkU2VsZWN0b3JzKHRoaXMuc3R5bGVzLmRlZmF1bHQpO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHRoaXMuc3R5bGVzKS5zb3J0KGZ1bmN0aW9uIChuLCBtKSB7XG4gICAgICByZXR1cm4gX3RoaXMyLm9wdGlvbnMubWVkaWFRdWVyeSA9PT0gXCJtaW5cIiA/ICtuIC0gK20gOiArbSAtICtuO1xuICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGJyZWFrcG9pbnQpIHtcbiAgICAgIGlmIChicmVha3BvaW50ICE9PSBcImRlZmF1bHRcIikge1xuICAgICAgICBjc3MgKz0gXCJAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiBcIiArIGJyZWFrcG9pbnQgKyBcInB4KSB7XCI7XG4gICAgICAgIGNzcyArPSBfdGhpczIuYnVpbGRTZWxlY3RvcnMoX3RoaXMyLnN0eWxlc1ticmVha3BvaW50XSk7XG4gICAgICAgIGNzcyArPSBcIn1cIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY3NzO1xuICB9O1xuXG4gIF9wcm90bzIuYnVpbGRTZWxlY3RvcnMgPSBmdW5jdGlvbiBidWlsZFNlbGVjdG9ycyhzZWxlY3RvcnMpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHZhciBjc3MgPSBcIlwiO1xuICAgIGZvck93bihzZWxlY3RvcnMsIGZ1bmN0aW9uIChzdHlsZXMsIHNlbGVjdG9yKSB7XG4gICAgICBzZWxlY3RvciA9IChcIiNcIiArIF90aGlzMy5pZCArIFwiIFwiICsgc2VsZWN0b3IpLnRyaW0oKTtcbiAgICAgIGNzcyArPSBzZWxlY3RvciArIFwiIHtcIjtcbiAgICAgIGZvck93bihzdHlsZXMsIGZ1bmN0aW9uICh2YWx1ZSwgcHJvcCkge1xuICAgICAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDApIHtcbiAgICAgICAgICBjc3MgKz0gcHJvcCArIFwiOiBcIiArIHZhbHVlICsgXCI7XCI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY3NzICs9IFwifVwiO1xuICAgIH0pO1xuICAgIHJldHVybiBjc3M7XG4gIH07XG5cbiAgcmV0dXJuIFN0eWxlO1xufSgpO1xuXG52YXIgU3BsaWRlUmVuZGVyZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTcGxpZGVSZW5kZXJlcihjb250ZW50cywgb3B0aW9ucywgY29uZmlnLCBkZWZhdWx0cykge1xuICAgIHRoaXMuc2xpZGVzID0gW107XG4gICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgdGhpcy5icmVha3BvaW50cyA9IFtdO1xuICAgIG1lcmdlKERFRkFVTFRTLCBkZWZhdWx0cyB8fCB7fSk7XG4gICAgbWVyZ2UobWVyZ2UodGhpcy5vcHRpb25zLCBERUZBVUxUUyksIG9wdGlvbnMgfHwge30pO1xuICAgIHRoaXMuY29udGVudHMgPSBjb250ZW50cztcbiAgICB0aGlzLmNvbmZpZyA9IGFzc2lnbih7fSwgUkVOREVSRVJfREVGQVVMVF9DT05GSUcsIGNvbmZpZyB8fCB7fSk7XG4gICAgdGhpcy5pZCA9IHRoaXMuY29uZmlnLmlkIHx8IHVuaXF1ZUlkKFwic3BsaWRlXCIpO1xuICAgIHRoaXMuU3R5bGUgPSBuZXcgU3R5bGUodGhpcy5pZCwgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLkRpcmVjdGlvbiA9IERpcmVjdGlvbihudWxsLCBudWxsLCB0aGlzLm9wdGlvbnMpO1xuICAgIGFzc2VydCh0aGlzLmNvbnRlbnRzLmxlbmd0aCwgXCJQcm92aWRlIGF0IGxlYXN0IDEgY29udGVudC5cIik7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBTcGxpZGVSZW5kZXJlci5jbGVhbiA9IGZ1bmN0aW9uIGNsZWFuKHNwbGlkZSkge1xuICAgIHZhciBfRXZlbnRJbnRlcmZhY2UxNyA9IEV2ZW50SW50ZXJmYWNlKHNwbGlkZSksXG4gICAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMTcub247XG5cbiAgICB2YXIgcm9vdCA9IHNwbGlkZS5yb290O1xuICAgIHZhciBjbG9uZXMgPSBxdWVyeUFsbChyb290LCBcIi5cIiArIENMQVNTX0NMT05FKTtcbiAgICBvbihFVkVOVF9NT1VOVEVELCBmdW5jdGlvbiAoKSB7XG4gICAgICByZW1vdmUoY2hpbGQocm9vdCwgXCJzdHlsZVwiKSk7XG4gICAgfSk7XG4gICAgcmVtb3ZlKGNsb25lcyk7XG4gIH07XG5cbiAgdmFyIF9wcm90bzMgPSBTcGxpZGVSZW5kZXJlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMy5pbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB0aGlzLnBhcnNlQnJlYWtwb2ludHMoKTtcbiAgICB0aGlzLmluaXRTbGlkZXMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyUm9vdFN0eWxlcygpO1xuICAgIHRoaXMucmVnaXN0ZXJUcmFja1N0eWxlcygpO1xuICAgIHRoaXMucmVnaXN0ZXJTbGlkZVN0eWxlcygpO1xuICAgIHRoaXMucmVnaXN0ZXJMaXN0U3R5bGVzKCk7XG4gIH07XG5cbiAgX3Byb3RvMy5pbml0U2xpZGVzID0gZnVuY3Rpb24gaW5pdFNsaWRlcygpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHB1c2godGhpcy5zbGlkZXMsIHRoaXMuY29udGVudHMubWFwKGZ1bmN0aW9uIChjb250ZW50LCBpbmRleCkge1xuICAgICAgY29udGVudCA9IGlzU3RyaW5nKGNvbnRlbnQpID8ge1xuICAgICAgICBodG1sOiBjb250ZW50XG4gICAgICB9IDogY29udGVudDtcbiAgICAgIGNvbnRlbnQuc3R5bGVzID0gY29udGVudC5zdHlsZXMgfHwge307XG4gICAgICBjb250ZW50LmF0dHJzID0gY29udGVudC5hdHRycyB8fCB7fTtcblxuICAgICAgX3RoaXM0LmNvdmVyKGNvbnRlbnQpO1xuXG4gICAgICB2YXIgY2xhc3NlcyA9IF90aGlzNC5vcHRpb25zLmNsYXNzZXMuc2xpZGUgKyBcIiBcIiArIChpbmRleCA9PT0gMCA/IENMQVNTX0FDVElWRSA6IFwiXCIpO1xuICAgICAgYXNzaWduKGNvbnRlbnQuYXR0cnMsIHtcbiAgICAgICAgY2xhc3M6IChjbGFzc2VzICsgXCIgXCIgKyAoY29udGVudC5hdHRycy5jbGFzcyB8fCBcIlwiKSkudHJpbSgpLFxuICAgICAgICBzdHlsZTogX3RoaXM0LmJ1aWxkU3R5bGVzKGNvbnRlbnQuc3R5bGVzKVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KSk7XG5cbiAgICBpZiAodGhpcy5pc0xvb3AoKSkge1xuICAgICAgdGhpcy5nZW5lcmF0ZUNsb25lcyh0aGlzLnNsaWRlcyk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90bzMucmVnaXN0ZXJSb290U3R5bGVzID0gZnVuY3Rpb24gcmVnaXN0ZXJSb290U3R5bGVzKCkge1xuICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgdGhpcy5icmVha3BvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgdmFyIHdpZHRoID0gX3JlZjJbMF0sXG4gICAgICAgICAgb3B0aW9ucyA9IF9yZWYyWzFdO1xuXG4gICAgICBfdGhpczUuU3R5bGUucnVsZShcIiBcIiwgXCJtYXgtd2lkdGhcIiwgdW5pdChvcHRpb25zLndpZHRoKSwgd2lkdGgpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90bzMucmVnaXN0ZXJUcmFja1N0eWxlcyA9IGZ1bmN0aW9uIHJlZ2lzdGVyVHJhY2tTdHlsZXMoKSB7XG4gICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICB2YXIgU3R5bGUyID0gdGhpcy5TdHlsZTtcbiAgICB2YXIgc2VsZWN0b3IgPSBcIi5cIiArIENMQVNTX1RSQUNLO1xuICAgIHRoaXMuYnJlYWtwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjMpIHtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWYzWzBdLFxuICAgICAgICAgIG9wdGlvbnMgPSBfcmVmM1sxXTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBfdGhpczYucmVzb2x2ZShcInBhZGRpbmdMZWZ0XCIpLCBfdGhpczYuY3NzUGFkZGluZyhvcHRpb25zLCBmYWxzZSksIHdpZHRoKTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBfdGhpczYucmVzb2x2ZShcInBhZGRpbmdSaWdodFwiKSwgX3RoaXM2LmNzc1BhZGRpbmcob3B0aW9ucywgdHJ1ZSksIHdpZHRoKTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBcImhlaWdodFwiLCBfdGhpczYuY3NzVHJhY2tIZWlnaHQob3B0aW9ucyksIHdpZHRoKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8zLnJlZ2lzdGVyTGlzdFN0eWxlcyA9IGZ1bmN0aW9uIHJlZ2lzdGVyTGlzdFN0eWxlcygpIHtcbiAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgIHZhciBTdHlsZTIgPSB0aGlzLlN0eWxlO1xuICAgIHZhciBzZWxlY3RvciA9IFwiLlwiICsgQ0xBU1NfTElTVDtcbiAgICB0aGlzLmJyZWFrcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKF9yZWY0KSB7XG4gICAgICB2YXIgd2lkdGggPSBfcmVmNFswXSxcbiAgICAgICAgICBvcHRpb25zID0gX3JlZjRbMV07XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgXCJ0cmFuc2Zvcm1cIiwgX3RoaXM3LmJ1aWxkVHJhbnNsYXRlKG9wdGlvbnMpLCB3aWR0aCk7XG5cbiAgICAgIGlmICghX3RoaXM3LmNzc1NsaWRlSGVpZ2h0KG9wdGlvbnMpKSB7XG4gICAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBcImFzcGVjdC1yYXRpb1wiLCBfdGhpczcuY3NzQXNwZWN0UmF0aW8ob3B0aW9ucyksIHdpZHRoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8zLnJlZ2lzdGVyU2xpZGVTdHlsZXMgPSBmdW5jdGlvbiByZWdpc3RlclNsaWRlU3R5bGVzKCkge1xuICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgdmFyIFN0eWxlMiA9IHRoaXMuU3R5bGU7XG4gICAgdmFyIHNlbGVjdG9yID0gXCIuXCIgKyBDTEFTU19TTElERTtcbiAgICB0aGlzLmJyZWFrcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKF9yZWY1KSB7XG4gICAgICB2YXIgd2lkdGggPSBfcmVmNVswXSxcbiAgICAgICAgICBvcHRpb25zID0gX3JlZjVbMV07XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgXCJ3aWR0aFwiLCBfdGhpczguY3NzU2xpZGVXaWR0aChvcHRpb25zKSwgd2lkdGgpO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIFwiaGVpZ2h0XCIsIF90aGlzOC5jc3NTbGlkZUhlaWdodChvcHRpb25zKSB8fCBcIjEwMCVcIiwgd2lkdGgpO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIF90aGlzOC5yZXNvbHZlKFwibWFyZ2luUmlnaHRcIiksIHVuaXQob3B0aW9ucy5nYXApIHx8IFwiMHB4XCIsIHdpZHRoKTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yICsgXCIgPiBpbWdcIiwgXCJkaXNwbGF5XCIsIG9wdGlvbnMuY292ZXIgPyBcIm5vbmVcIiA6IFwiaW5saW5lXCIsIHdpZHRoKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8zLmJ1aWxkVHJhbnNsYXRlID0gZnVuY3Rpb24gYnVpbGRUcmFuc2xhdGUob3B0aW9ucykge1xuICAgIHZhciBfdGhpcyREaXJlY3Rpb24gPSB0aGlzLkRpcmVjdGlvbixcbiAgICAgICAgcmVzb2x2ZSA9IF90aGlzJERpcmVjdGlvbi5yZXNvbHZlLFxuICAgICAgICBvcmllbnQgPSBfdGhpcyREaXJlY3Rpb24ub3JpZW50O1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICB2YWx1ZXMucHVzaCh0aGlzLmNzc09mZnNldENsb25lcyhvcHRpb25zKSk7XG4gICAgdmFsdWVzLnB1c2godGhpcy5jc3NPZmZzZXRHYXBzKG9wdGlvbnMpKTtcblxuICAgIGlmICh0aGlzLmlzQ2VudGVyKG9wdGlvbnMpKSB7XG4gICAgICB2YWx1ZXMucHVzaCh0aGlzLmJ1aWxkQ3NzVmFsdWUob3JpZW50KC01MCksIFwiJVwiKSk7XG4gICAgICB2YWx1ZXMucHVzaC5hcHBseSh2YWx1ZXMsIHRoaXMuY3NzT2Zmc2V0Q2VudGVyKG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzLmZpbHRlcihCb29sZWFuKS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gXCJ0cmFuc2xhdGVcIiArIHJlc29sdmUoXCJYXCIpICsgXCIoXCIgKyB2YWx1ZSArIFwiKVwiO1xuICAgIH0pLmpvaW4oXCIgXCIpO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzT2Zmc2V0Q2xvbmVzID0gZnVuY3Rpb24gY3NzT2Zmc2V0Q2xvbmVzKG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMkRGlyZWN0aW9uMiA9IHRoaXMuRGlyZWN0aW9uLFxuICAgICAgICByZXNvbHZlID0gX3RoaXMkRGlyZWN0aW9uMi5yZXNvbHZlLFxuICAgICAgICBvcmllbnQgPSBfdGhpcyREaXJlY3Rpb24yLm9yaWVudDtcbiAgICB2YXIgY2xvbmVDb3VudCA9IHRoaXMuZ2V0Q2xvbmVDb3VudCgpO1xuXG4gICAgaWYgKHRoaXMuaXNGaXhlZFdpZHRoKG9wdGlvbnMpKSB7XG4gICAgICB2YXIgX3RoaXMkcGFyc2VDc3NWYWx1ZSA9IHRoaXMucGFyc2VDc3NWYWx1ZShvcHRpb25zW3Jlc29sdmUoXCJmaXhlZFdpZHRoXCIpXSksXG4gICAgICAgICAgdmFsdWUgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlLnZhbHVlLFxuICAgICAgICAgIHVuaXQyID0gX3RoaXMkcGFyc2VDc3NWYWx1ZS51bml0O1xuXG4gICAgICByZXR1cm4gdGhpcy5idWlsZENzc1ZhbHVlKG9yaWVudCh2YWx1ZSkgKiBjbG9uZUNvdW50LCB1bml0Mik7XG4gICAgfVxuXG4gICAgdmFyIHBlcmNlbnQgPSAxMDAgKiBjbG9uZUNvdW50IC8gb3B0aW9ucy5wZXJQYWdlO1xuICAgIHJldHVybiBvcmllbnQocGVyY2VudCkgKyBcIiVcIjtcbiAgfTtcblxuICBfcHJvdG8zLmNzc09mZnNldENlbnRlciA9IGZ1bmN0aW9uIGNzc09mZnNldENlbnRlcihvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzJERpcmVjdGlvbjMgPSB0aGlzLkRpcmVjdGlvbixcbiAgICAgICAgcmVzb2x2ZSA9IF90aGlzJERpcmVjdGlvbjMucmVzb2x2ZSxcbiAgICAgICAgb3JpZW50ID0gX3RoaXMkRGlyZWN0aW9uMy5vcmllbnQ7XG5cbiAgICBpZiAodGhpcy5pc0ZpeGVkV2lkdGgob3B0aW9ucykpIHtcbiAgICAgIHZhciBfdGhpcyRwYXJzZUNzc1ZhbHVlMiA9IHRoaXMucGFyc2VDc3NWYWx1ZShvcHRpb25zW3Jlc29sdmUoXCJmaXhlZFdpZHRoXCIpXSksXG4gICAgICAgICAgdmFsdWUgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlMi52YWx1ZSxcbiAgICAgICAgICB1bml0MiA9IF90aGlzJHBhcnNlQ3NzVmFsdWUyLnVuaXQ7XG5cbiAgICAgIHJldHVybiBbdGhpcy5idWlsZENzc1ZhbHVlKG9yaWVudCh2YWx1ZSAvIDIpLCB1bml0MildO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICB2YXIgcGVyUGFnZSA9IG9wdGlvbnMucGVyUGFnZSxcbiAgICAgICAgZ2FwID0gb3B0aW9ucy5nYXA7XG4gICAgdmFsdWVzLnB1c2gob3JpZW50KDUwIC8gcGVyUGFnZSkgKyBcIiVcIik7XG5cbiAgICBpZiAoZ2FwKSB7XG4gICAgICB2YXIgX3RoaXMkcGFyc2VDc3NWYWx1ZTMgPSB0aGlzLnBhcnNlQ3NzVmFsdWUoZ2FwKSxcbiAgICAgICAgICBfdmFsdWUgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlMy52YWx1ZSxcbiAgICAgICAgICBfdW5pdCA9IF90aGlzJHBhcnNlQ3NzVmFsdWUzLnVuaXQ7XG5cbiAgICAgIHZhciBnYXBPZmZzZXQgPSAoX3ZhbHVlIC8gcGVyUGFnZSAtIF92YWx1ZSkgLyAyO1xuICAgICAgdmFsdWVzLnB1c2godGhpcy5idWlsZENzc1ZhbHVlKG9yaWVudChnYXBPZmZzZXQpLCBfdW5pdCkpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NPZmZzZXRHYXBzID0gZnVuY3Rpb24gY3NzT2Zmc2V0R2FwcyhvcHRpb25zKSB7XG4gICAgdmFyIGNsb25lQ291bnQgPSB0aGlzLmdldENsb25lQ291bnQoKTtcblxuICAgIGlmIChjbG9uZUNvdW50ICYmIG9wdGlvbnMuZ2FwKSB7XG4gICAgICB2YXIgb3JpZW50ID0gdGhpcy5EaXJlY3Rpb24ub3JpZW50O1xuXG4gICAgICB2YXIgX3RoaXMkcGFyc2VDc3NWYWx1ZTQgPSB0aGlzLnBhcnNlQ3NzVmFsdWUob3B0aW9ucy5nYXApLFxuICAgICAgICAgIHZhbHVlID0gX3RoaXMkcGFyc2VDc3NWYWx1ZTQudmFsdWUsXG4gICAgICAgICAgdW5pdDIgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlNC51bml0O1xuXG4gICAgICBpZiAodGhpcy5pc0ZpeGVkV2lkdGgob3B0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRDc3NWYWx1ZShvcmllbnQodmFsdWUgKiBjbG9uZUNvdW50KSwgdW5pdDIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGVyUGFnZSA9IG9wdGlvbnMucGVyUGFnZTtcbiAgICAgIHZhciBnYXBzID0gY2xvbmVDb3VudCAvIHBlclBhZ2U7XG4gICAgICByZXR1cm4gdGhpcy5idWlsZENzc1ZhbHVlKG9yaWVudChnYXBzICogdmFsdWUpLCB1bml0Mik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFwiXCI7XG4gIH07XG5cbiAgX3Byb3RvMy5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZShwcm9wKSB7XG4gICAgcmV0dXJuIGNhbWVsVG9LZWJhYih0aGlzLkRpcmVjdGlvbi5yZXNvbHZlKHByb3ApKTtcbiAgfTtcblxuICBfcHJvdG8zLmNzc1BhZGRpbmcgPSBmdW5jdGlvbiBjc3NQYWRkaW5nKG9wdGlvbnMsIHJpZ2h0KSB7XG4gICAgdmFyIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmc7XG4gICAgdmFyIHByb3AgPSB0aGlzLkRpcmVjdGlvbi5yZXNvbHZlKHJpZ2h0ID8gXCJyaWdodFwiIDogXCJsZWZ0XCIsIHRydWUpO1xuICAgIHJldHVybiBwYWRkaW5nICYmIHVuaXQocGFkZGluZ1twcm9wXSB8fCAoaXNPYmplY3QocGFkZGluZykgPyAwIDogcGFkZGluZykpIHx8IFwiMHB4XCI7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NUcmFja0hlaWdodCA9IGZ1bmN0aW9uIGNzc1RyYWNrSGVpZ2h0KG9wdGlvbnMpIHtcbiAgICB2YXIgaGVpZ2h0ID0gXCJcIjtcblxuICAgIGlmICh0aGlzLmlzVmVydGljYWwoKSkge1xuICAgICAgaGVpZ2h0ID0gdGhpcy5jc3NIZWlnaHQob3B0aW9ucyk7XG4gICAgICBhc3NlcnQoaGVpZ2h0LCAnXCJoZWlnaHRcIiBpcyBtaXNzaW5nLicpO1xuICAgICAgaGVpZ2h0ID0gXCJjYWxjKFwiICsgaGVpZ2h0ICsgXCIgLSBcIiArIHRoaXMuY3NzUGFkZGluZyhvcHRpb25zLCBmYWxzZSkgKyBcIiAtIFwiICsgdGhpcy5jc3NQYWRkaW5nKG9wdGlvbnMsIHRydWUpICsgXCIpXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfTtcblxuICBfcHJvdG8zLmNzc0hlaWdodCA9IGZ1bmN0aW9uIGNzc0hlaWdodChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHVuaXQob3B0aW9ucy5oZWlnaHQpO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzU2xpZGVXaWR0aCA9IGZ1bmN0aW9uIGNzc1NsaWRlV2lkdGgob3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmF1dG9XaWR0aCA/IFwiXCIgOiB1bml0KG9wdGlvbnMuZml4ZWRXaWR0aCkgfHwgKHRoaXMuaXNWZXJ0aWNhbCgpID8gXCJcIiA6IHRoaXMuY3NzU2xpZGVTaXplKG9wdGlvbnMpKTtcbiAgfTtcblxuICBfcHJvdG8zLmNzc1NsaWRlSGVpZ2h0ID0gZnVuY3Rpb24gY3NzU2xpZGVIZWlnaHQob3B0aW9ucykge1xuICAgIHJldHVybiB1bml0KG9wdGlvbnMuZml4ZWRIZWlnaHQpIHx8ICh0aGlzLmlzVmVydGljYWwoKSA/IG9wdGlvbnMuYXV0b0hlaWdodCA/IFwiXCIgOiB0aGlzLmNzc1NsaWRlU2l6ZShvcHRpb25zKSA6IHRoaXMuY3NzSGVpZ2h0KG9wdGlvbnMpKTtcbiAgfTtcblxuICBfcHJvdG8zLmNzc1NsaWRlU2l6ZSA9IGZ1bmN0aW9uIGNzc1NsaWRlU2l6ZShvcHRpb25zKSB7XG4gICAgdmFyIGdhcCA9IHVuaXQob3B0aW9ucy5nYXApO1xuICAgIHJldHVybiBcImNhbGMoKDEwMCVcIiArIChnYXAgJiYgXCIgKyBcIiArIGdhcCkgKyBcIikvXCIgKyAob3B0aW9ucy5wZXJQYWdlIHx8IDEpICsgKGdhcCAmJiBcIiAtIFwiICsgZ2FwKSArIFwiKVwiO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzQXNwZWN0UmF0aW8gPSBmdW5jdGlvbiBjc3NBc3BlY3RSYXRpbyhvcHRpb25zKSB7XG4gICAgdmFyIGhlaWdodFJhdGlvID0gb3B0aW9ucy5oZWlnaHRSYXRpbztcbiAgICByZXR1cm4gaGVpZ2h0UmF0aW8gPyBcIlwiICsgMSAvIGhlaWdodFJhdGlvIDogXCJcIjtcbiAgfTtcblxuICBfcHJvdG8zLmJ1aWxkQ3NzVmFsdWUgPSBmdW5jdGlvbiBidWlsZENzc1ZhbHVlKHZhbHVlLCB1bml0Mikge1xuICAgIHJldHVybiBcIlwiICsgdmFsdWUgKyB1bml0MjtcbiAgfTtcblxuICBfcHJvdG8zLnBhcnNlQ3NzVmFsdWUgPSBmdW5jdGlvbiBwYXJzZUNzc1ZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgdmFyIG51bWJlciA9IHBhcnNlRmxvYXQodmFsdWUpIHx8IDA7XG4gICAgICB2YXIgdW5pdDIgPSB2YWx1ZS5yZXBsYWNlKC9cXGQqKFxcLlxcZCopPy8sIFwiXCIpIHx8IFwicHhcIjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBudW1iZXIsXG4gICAgICAgIHVuaXQ6IHVuaXQyXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICB1bml0OiBcInB4XCJcbiAgICB9O1xuICB9O1xuXG4gIF9wcm90bzMucGFyc2VCcmVha3BvaW50cyA9IGZ1bmN0aW9uIHBhcnNlQnJlYWtwb2ludHMoKSB7XG4gICAgdmFyIF90aGlzOSA9IHRoaXM7XG5cbiAgICB2YXIgYnJlYWtwb2ludHMgPSB0aGlzLm9wdGlvbnMuYnJlYWtwb2ludHM7XG4gICAgdGhpcy5icmVha3BvaW50cy5wdXNoKFtcImRlZmF1bHRcIiwgdGhpcy5vcHRpb25zXSk7XG5cbiAgICBpZiAoYnJlYWtwb2ludHMpIHtcbiAgICAgIGZvck93bihicmVha3BvaW50cywgZnVuY3Rpb24gKG9wdGlvbnMsIHdpZHRoKSB7XG4gICAgICAgIF90aGlzOS5icmVha3BvaW50cy5wdXNoKFt3aWR0aCwgbWVyZ2UobWVyZ2Uoe30sIF90aGlzOS5vcHRpb25zKSwgb3B0aW9ucyldKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8zLmlzRml4ZWRXaWR0aCA9IGZ1bmN0aW9uIGlzRml4ZWRXaWR0aChvcHRpb25zKSB7XG4gICAgcmV0dXJuICEhb3B0aW9uc1t0aGlzLkRpcmVjdGlvbi5yZXNvbHZlKFwiZml4ZWRXaWR0aFwiKV07XG4gIH07XG5cbiAgX3Byb3RvMy5pc0xvb3AgPSBmdW5jdGlvbiBpc0xvb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50eXBlID09PSBMT09QO1xuICB9O1xuXG4gIF9wcm90bzMuaXNDZW50ZXIgPSBmdW5jdGlvbiBpc0NlbnRlcihvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuZm9jdXMgPT09IFwiY2VudGVyXCIpIHtcbiAgICAgIGlmICh0aGlzLmlzTG9vcCgpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnR5cGUgPT09IFNMSURFKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5vcHRpb25zLnRyaW1TcGFjZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgX3Byb3RvMy5pc1ZlcnRpY2FsID0gZnVuY3Rpb24gaXNWZXJ0aWNhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gVFRCO1xuICB9O1xuXG4gIF9wcm90bzMuYnVpbGRDbGFzc2VzID0gZnVuY3Rpb24gYnVpbGRDbGFzc2VzKCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHJldHVybiBbQ0xBU1NfUk9PVCwgQ0xBU1NfUk9PVCArIFwiLS1cIiArIG9wdGlvbnMudHlwZSwgQ0xBU1NfUk9PVCArIFwiLS1cIiArIG9wdGlvbnMuZGlyZWN0aW9uLCBvcHRpb25zLmRyYWcgJiYgQ0xBU1NfUk9PVCArIFwiLS1kcmFnZ2FibGVcIiwgb3B0aW9ucy5pc05hdmlnYXRpb24gJiYgQ0xBU1NfUk9PVCArIFwiLS1uYXZcIiwgQ0xBU1NfQUNUSVZFLCAhdGhpcy5jb25maWcuaGlkZGVuICYmIENMQVNTX1JFTkRFUkVEXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XG4gIH07XG5cbiAgX3Byb3RvMy5idWlsZEF0dHJzID0gZnVuY3Rpb24gYnVpbGRBdHRycyhhdHRycykge1xuICAgIHZhciBhdHRyID0gXCJcIjtcbiAgICBmb3JPd24oYXR0cnMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBhdHRyICs9IHZhbHVlID8gXCIgXCIgKyBjYW1lbFRvS2ViYWIoa2V5KSArIFwiPVxcXCJcIiArIHZhbHVlICsgXCJcXFwiXCIgOiBcIlwiO1xuICAgIH0pO1xuICAgIHJldHVybiBhdHRyLnRyaW0oKTtcbiAgfTtcblxuICBfcHJvdG8zLmJ1aWxkU3R5bGVzID0gZnVuY3Rpb24gYnVpbGRTdHlsZXMoc3R5bGVzKSB7XG4gICAgdmFyIHN0eWxlID0gXCJcIjtcbiAgICBmb3JPd24oc3R5bGVzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgc3R5bGUgKz0gXCIgXCIgKyBjYW1lbFRvS2ViYWIoa2V5KSArIFwiOlwiICsgdmFsdWUgKyBcIjtcIjtcbiAgICB9KTtcbiAgICByZXR1cm4gc3R5bGUudHJpbSgpO1xuICB9O1xuXG4gIF9wcm90bzMucmVuZGVyU2xpZGVzID0gZnVuY3Rpb24gcmVuZGVyU2xpZGVzKCkge1xuICAgIHZhciBfdGhpczEwID0gdGhpcztcblxuICAgIHZhciB0YWcgPSB0aGlzLmNvbmZpZy5zbGlkZVRhZztcbiAgICByZXR1cm4gdGhpcy5zbGlkZXMubWFwKGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICByZXR1cm4gXCI8XCIgKyB0YWcgKyBcIiBcIiArIF90aGlzMTAuYnVpbGRBdHRycyhjb250ZW50LmF0dHJzKSArIFwiPlwiICsgKGNvbnRlbnQuaHRtbCB8fCBcIlwiKSArIFwiPC9cIiArIHRhZyArIFwiPlwiO1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgX3Byb3RvMy5jb3ZlciA9IGZ1bmN0aW9uIGNvdmVyKGNvbnRlbnQpIHtcbiAgICB2YXIgc3R5bGVzID0gY29udGVudC5zdHlsZXMsXG4gICAgICAgIF9jb250ZW50JGh0bWwgPSBjb250ZW50Lmh0bWwsXG4gICAgICAgIGh0bWwgPSBfY29udGVudCRodG1sID09PSB2b2lkIDAgPyBcIlwiIDogX2NvbnRlbnQkaHRtbDtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY292ZXIgJiYgIXRoaXMub3B0aW9ucy5sYXp5TG9hZCkge1xuICAgICAgdmFyIHNyYyA9IGh0bWwubWF0Y2goLzxpbWcuKj9zcmNcXHMqPVxccyooWydcIl0pKC4rPylcXDEuKj8+Lyk7XG5cbiAgICAgIGlmIChzcmMgJiYgc3JjWzJdKSB7XG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gXCJjZW50ZXIvY292ZXIgbm8tcmVwZWF0IHVybCgnXCIgKyBzcmNbMl0gKyBcIicpXCI7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9wcm90bzMuZ2VuZXJhdGVDbG9uZXMgPSBmdW5jdGlvbiBnZW5lcmF0ZUNsb25lcyhjb250ZW50cykge1xuICAgIHZhciBjbGFzc2VzID0gdGhpcy5vcHRpb25zLmNsYXNzZXM7XG4gICAgdmFyIGNvdW50ID0gdGhpcy5nZXRDbG9uZUNvdW50KCk7XG4gICAgdmFyIHNsaWRlcyA9IGNvbnRlbnRzLnNsaWNlKCk7XG5cbiAgICB3aGlsZSAoc2xpZGVzLmxlbmd0aCA8IGNvdW50KSB7XG4gICAgICBwdXNoKHNsaWRlcywgc2xpZGVzKTtcbiAgICB9XG5cbiAgICBwdXNoKHNsaWRlcy5zbGljZSgtY291bnQpLnJldmVyc2UoKSwgc2xpZGVzLnNsaWNlKDAsIGNvdW50KSkuZm9yRWFjaChmdW5jdGlvbiAoY29udGVudCwgaW5kZXgpIHtcbiAgICAgIHZhciBhdHRycyA9IGFzc2lnbih7fSwgY29udGVudC5hdHRycywge1xuICAgICAgICBjbGFzczogY29udGVudC5hdHRycy5jbGFzcyArIFwiIFwiICsgY2xhc3Nlcy5jbG9uZVxuICAgICAgfSk7XG4gICAgICB2YXIgY2xvbmUgPSBhc3NpZ24oe30sIGNvbnRlbnQsIHtcbiAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICB9KTtcbiAgICAgIGluZGV4IDwgY291bnQgPyBjb250ZW50cy51bnNoaWZ0KGNsb25lKSA6IGNvbnRlbnRzLnB1c2goY2xvbmUpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90bzMuZ2V0Q2xvbmVDb3VudCA9IGZ1bmN0aW9uIGdldENsb25lQ291bnQoKSB7XG4gICAgaWYgKHRoaXMuaXNMb29wKCkpIHtcbiAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gICAgICBpZiAob3B0aW9ucy5jbG9uZXMpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuY2xvbmVzO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGVyUGFnZSA9IG1heC5hcHBseSh2b2lkIDAsIHRoaXMuYnJlYWtwb2ludHMubWFwKGZ1bmN0aW9uIChfcmVmNikge1xuICAgICAgICB2YXIgb3B0aW9uczIgPSBfcmVmNlsxXTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMyLnBlclBhZ2U7XG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gcGVyUGFnZSAqICgob3B0aW9ucy5mbGlja01heFBhZ2VzIHx8IDEpICsgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH07XG5cbiAgX3Byb3RvMy5yZW5kZXJBcnJvd3MgPSBmdW5jdGlvbiByZW5kZXJBcnJvd3MoKSB7XG4gICAgdmFyIGh0bWwgPSBcIlwiO1xuICAgIGh0bWwgKz0gXCI8ZGl2IGNsYXNzPVxcXCJcIiArIHRoaXMub3B0aW9ucy5jbGFzc2VzLmFycm93cyArIFwiXFxcIj5cIjtcbiAgICBodG1sICs9IHRoaXMucmVuZGVyQXJyb3codHJ1ZSk7XG4gICAgaHRtbCArPSB0aGlzLnJlbmRlckFycm93KGZhbHNlKTtcbiAgICBodG1sICs9IFwiPC9kaXY+XCI7XG4gICAgcmV0dXJuIGh0bWw7XG4gIH07XG5cbiAgX3Byb3RvMy5yZW5kZXJBcnJvdyA9IGZ1bmN0aW9uIHJlbmRlckFycm93KHByZXYpIHtcbiAgICB2YXIgX3RoaXMkb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgY2xhc3NlcyA9IF90aGlzJG9wdGlvbnMuY2xhc3NlcyxcbiAgICAgICAgaTE4biA9IF90aGlzJG9wdGlvbnMuaTE4bjtcbiAgICB2YXIgYXR0cnMgPSB7XG4gICAgICBjbGFzczogY2xhc3Nlcy5hcnJvdyArIFwiIFwiICsgKHByZXYgPyBjbGFzc2VzLnByZXYgOiBjbGFzc2VzLm5leHQpLFxuICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgIGFyaWFMYWJlbDogcHJldiA/IGkxOG4ucHJldiA6IGkxOG4ubmV4dFxuICAgIH07XG4gICAgcmV0dXJuIFwiPGJ1dHRvbiBcIiArIHRoaXMuYnVpbGRBdHRycyhhdHRycykgKyBcIj48c3ZnIHhtbG5zPVxcXCJcIiArIFhNTF9OQU1FX1NQQUNFICsgXCJcXFwiIHZpZXdCb3g9XFxcIjAgMCBcIiArIFNJWkUgKyBcIiBcIiArIFNJWkUgKyBcIlxcXCIgd2lkdGg9XFxcIlwiICsgU0laRSArIFwiXFxcIiBoZWlnaHQ9XFxcIlwiICsgU0laRSArIFwiXFxcIj48cGF0aCBkPVxcXCJcIiArICh0aGlzLm9wdGlvbnMuYXJyb3dQYXRoIHx8IFBBVEgpICsgXCJcXFwiIC8+PC9zdmc+PC9idXR0b24+XCI7XG4gIH07XG5cbiAgX3Byb3RvMy5odG1sID0gZnVuY3Rpb24gaHRtbCgpIHtcbiAgICB2YXIgX3RoaXMkY29uZmlnID0gdGhpcy5jb25maWcsXG4gICAgICAgIHJvb3RDbGFzcyA9IF90aGlzJGNvbmZpZy5yb290Q2xhc3MsXG4gICAgICAgIGxpc3RUYWcgPSBfdGhpcyRjb25maWcubGlzdFRhZyxcbiAgICAgICAgYXJyb3dzID0gX3RoaXMkY29uZmlnLmFycm93cyxcbiAgICAgICAgYmVmb3JlVHJhY2sgPSBfdGhpcyRjb25maWcuYmVmb3JlVHJhY2ssXG4gICAgICAgIGFmdGVyVHJhY2sgPSBfdGhpcyRjb25maWcuYWZ0ZXJUcmFjayxcbiAgICAgICAgc2xpZGVyID0gX3RoaXMkY29uZmlnLnNsaWRlcixcbiAgICAgICAgYmVmb3JlU2xpZGVyID0gX3RoaXMkY29uZmlnLmJlZm9yZVNsaWRlcixcbiAgICAgICAgYWZ0ZXJTbGlkZXIgPSBfdGhpcyRjb25maWcuYWZ0ZXJTbGlkZXI7XG4gICAgdmFyIGh0bWwgPSBcIlwiO1xuICAgIGh0bWwgKz0gXCI8ZGl2IGlkPVxcXCJcIiArIHRoaXMuaWQgKyBcIlxcXCIgY2xhc3M9XFxcIlwiICsgdGhpcy5idWlsZENsYXNzZXMoKSArIFwiIFwiICsgKHJvb3RDbGFzcyB8fCBcIlwiKSArIFwiXFxcIj5cIjtcbiAgICBodG1sICs9IFwiPHN0eWxlPlwiICsgdGhpcy5TdHlsZS5idWlsZCgpICsgXCI8L3N0eWxlPlwiO1xuXG4gICAgaWYgKHNsaWRlcikge1xuICAgICAgaHRtbCArPSBiZWZvcmVTbGlkZXIgfHwgXCJcIjtcbiAgICAgIGh0bWwgKz0gXCI8ZGl2IGNsYXNzPVxcXCJzcGxpZGVfX3NsaWRlclxcXCI+XCI7XG4gICAgfVxuXG4gICAgaHRtbCArPSBiZWZvcmVUcmFjayB8fCBcIlwiO1xuXG4gICAgaWYgKGFycm93cykge1xuICAgICAgaHRtbCArPSB0aGlzLnJlbmRlckFycm93cygpO1xuICAgIH1cblxuICAgIGh0bWwgKz0gXCI8ZGl2IGNsYXNzPVxcXCJzcGxpZGVfX3RyYWNrXFxcIj5cIjtcbiAgICBodG1sICs9IFwiPFwiICsgbGlzdFRhZyArIFwiIGNsYXNzPVxcXCJzcGxpZGVfX2xpc3RcXFwiPlwiO1xuICAgIGh0bWwgKz0gdGhpcy5yZW5kZXJTbGlkZXMoKTtcbiAgICBodG1sICs9IFwiPC9cIiArIGxpc3RUYWcgKyBcIj5cIjtcbiAgICBodG1sICs9IFwiPC9kaXY+XCI7XG4gICAgaHRtbCArPSBhZnRlclRyYWNrIHx8IFwiXCI7XG5cbiAgICBpZiAoc2xpZGVyKSB7XG4gICAgICBodG1sICs9IFwiPC9kaXY+XCI7XG4gICAgICBodG1sICs9IGFmdGVyU2xpZGVyIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgaHRtbCArPSBcIjwvZGl2PlwiO1xuICAgIHJldHVybiBodG1sO1xuICB9O1xuXG4gIHJldHVybiBTcGxpZGVSZW5kZXJlcjtcbn0oKTtcblxuZXhwb3J0IHsgQ0xBU1NFUywgQ0xBU1NfQUNUSVZFLCBDTEFTU19BUlJPVywgQ0xBU1NfQVJST1dTLCBDTEFTU19BUlJPV19ORVhULCBDTEFTU19BUlJPV19QUkVWLCBDTEFTU19DTE9ORSwgQ0xBU1NfQ09OVEFJTkVSLCBDTEFTU19GT0NVU19JTiwgQ0xBU1NfSU5JVElBTElaRUQsIENMQVNTX0xJU1QsIENMQVNTX0xPQURJTkcsIENMQVNTX05FWFQsIENMQVNTX1BBR0lOQVRJT04sIENMQVNTX1BBR0lOQVRJT05fUEFHRSwgQ0xBU1NfUFJFViwgQ0xBU1NfUFJPR1JFU1MsIENMQVNTX1BST0dSRVNTX0JBUiwgQ0xBU1NfUk9PVCwgQ0xBU1NfU0xJREUsIENMQVNTX1NQSU5ORVIsIENMQVNTX1NSLCBDTEFTU19UT0dHTEUsIENMQVNTX1RPR0dMRV9QQVVTRSwgQ0xBU1NfVE9HR0xFX1BMQVksIENMQVNTX1RSQUNLLCBDTEFTU19WSVNJQkxFLCBERUZBVUxUUywgRVZFTlRfQUNUSVZFLCBFVkVOVF9BUlJPV1NfTU9VTlRFRCwgRVZFTlRfQVJST1dTX1VQREFURUQsIEVWRU5UX0FVVE9QTEFZX1BBVVNFLCBFVkVOVF9BVVRPUExBWV9QTEFZLCBFVkVOVF9BVVRPUExBWV9QTEFZSU5HLCBFVkVOVF9DTElDSywgRVZFTlRfREVTVFJPWSwgRVZFTlRfRFJBRywgRVZFTlRfRFJBR0dFRCwgRVZFTlRfRFJBR0dJTkcsIEVWRU5UX0hJRERFTiwgRVZFTlRfSU5BQ1RJVkUsIEVWRU5UX0xBWllMT0FEX0xPQURFRCwgRVZFTlRfTU9VTlRFRCwgRVZFTlRfTU9WRSwgRVZFTlRfTU9WRUQsIEVWRU5UX05BVklHQVRJT05fTU9VTlRFRCwgRVZFTlRfUEFHSU5BVElPTl9NT1VOVEVELCBFVkVOVF9QQUdJTkFUSU9OX1VQREFURUQsIEVWRU5UX1JFQURZLCBFVkVOVF9SRUZSRVNILCBFVkVOVF9SRVNJWkUsIEVWRU5UX1JFU0laRUQsIEVWRU5UX1NDUk9MTCwgRVZFTlRfU0NST0xMRUQsIEVWRU5UX1NISUZURUQsIEVWRU5UX1NMSURFX0tFWURPV04sIEVWRU5UX1VQREFURUQsIEVWRU5UX1ZJU0lCTEUsIEV2ZW50QmluZGVyLCBFdmVudEludGVyZmFjZSwgRkFERSwgTE9PUCwgTFRSLCBSVEwsIFJlcXVlc3RJbnRlcnZhbCwgU0xJREUsIFNUQVRVU19DTEFTU0VTLCBTcGxpZGUsIFNwbGlkZVJlbmRlcmVyLCBTdGF0ZSwgVFRCLCBUaHJvdHRsZSwgU3BsaWRlIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBTcGxpZGUgZnJvbSAnQHNwbGlkZWpzL3NwbGlkZSc7XHJcblxyXG5jb25zdCBFTCA9ICcuanMtc2hvdydcclxuY29uc3QgQUNUSVZFX0NMQVNTID0gJ2lzLWFjdGl2ZSdcclxuXHJcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKEVMKSkge1xyXG4gIGNvbnN0IHNsaWRlciA9IG5ldyBTcGxpZGUoIEVMLCB7XHJcbiAgICB0eXBlOiAnZmFkZScsXHJcbiAgICByZXdpbmQ6IHRydWUsXHJcbiAgICBwZXJQYWdlOiAxLFxyXG4gICAgcGFnaW5hdGlvbjogdHJ1ZSxcclxuICAgIGFycm93czogdHJ1ZSxcclxuICAgIHNwZWVkOiAxNTAwLFxyXG4gIH0gKS5tb3VudCgpO1xyXG59XHJcblxyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRodW1ibmFpbHMnKSkge1xyXG4gIG5ldyBTcGxpZGUoICcuanMtdGh1bWJuYWlscycsIHtcclxuICAgIGZpeGVkV2lkdGggOiAnY2FsYygyNSUgLSAyM3B4KScsXHJcblx0XHRyZXdpbmQgICAgIDogdHJ1ZSxcclxuXHRcdHBhZ2luYXRpb24gOiBmYWxzZSxcclxuICAgIGlzTmF2aWdhdGlvbjogdHJ1ZSxcclxuICAgIHBlclBhZ2UgICAgIDogNCxcclxuICB9ICkubW91bnQoKTtcclxuXHJcbiAgbmV3IFNwbGlkZSggJy5qcy1tYWluJywge1xyXG4gICAgdHlwZSAgICAgIDogJ2ZhZGUnLFxyXG4gICAgcmV3aW5kICAgIDogdHJ1ZSxcclxuICAgIHBhZ2luYXRpb246IGZhbHNlLFxyXG4gICAgYXJyb3dzICAgIDogZmFsc2UsXHJcbiAgICBwZXJQYWdlOiAxLFxyXG4gIH0gKS5tb3VudCgpO1xyXG5cclxuICB2YXIgbWFpbiAgICAgICA9IG5ldyBTcGxpZGUoICcuanMtbWFpbicsIHsgdHlwZTogJ2ZhZGUnLCByZXdpbmQ6IHRydWUsIHBhZ2luYXRpb246IGZhbHNlLCBhcnJvd3M6IGZhbHNlLCBwZXJQYWdlOiAxLCB9ICk7XHJcbiAgdmFyIHRodW1ibmFpbHMgPSBuZXcgU3BsaWRlKCAnLmpzLXRodW1ibmFpbHMnLCB7Zml4ZWRXaWR0aCA6ICdjYWxjKDI1JSAtIDIzcHgpJyxyZXdpbmQ6IHRydWUsIHBhZ2luYXRpb246IGZhbHNlLCBhcnJvd3M6IGZhbHNlLCBpc05hdmlnYXRpb246IHRydWUsIHBlclBhZ2U6IDQsIH0gKTtcclxuXHJcbiAgbWFpbi5zeW5jKCB0aHVtYm5haWxzICk7XHJcbiAgbWFpbi5tb3VudCgpO1xyXG4gIHRodW1ibmFpbHMubW91bnQoKTtcclxufVxyXG4iXSwibmFtZXMiOlsiTUVTU0FHRSIsIkhlbGxvV29ybGQiLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImxvYWRIYW5kbGVyIiwiSVNNT0JJTEUiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIlRIUkVTSE9MRCIsIkxPQURfVEhSRVNIT0xEIiwiRUxFTUVOVFMiLCJWSVNJQkxFX0NMQVNTIiwiQW5pbWF0ZSIsImVudHJpZXMiLCJtYXAiLCJlbnRyeSIsInNlY3Rpb24iLCJ0YXJnZXQiLCJkZWxheSIsImdldERlbGF5Iiwic2VjdGlvbkJvZHlDbGFzcyIsImdldEF0dHJpYnV0ZSIsImlzSW50ZXJzZWN0aW5nIiwiY2xhc3NMaXN0IiwiYWRkIiwiYm9keUNsYXNzIiwic2V0VGltZW91dCIsImluY2x1ZGVzIiwicGFyc2VJbnQiLCJodG1sY2xhc3MiLCJ0eXBlIiwiZG9jdW1lbnQiLCJib2R5IiwicmVtb3ZlIiwic2VjdGlvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsIiwiQm91bmRpbmdDbGllbnRSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidmlzaWJsZVJhdGlvIiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJsb2FkT2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmVDYWxsYmFjayIsInRocmVzaG9sZCIsIm9ic2VydmUiLCJkaXNjb25uZWN0Iiwib2JzZXJ2ZXJUaHJlc2hvbGQiLCJvYnNlcnZlciIsIlNUQVJUX09GRlNFVCIsIlNUQVJUX0NMQVNTIiwiQk9UVE9NX09GRlNFVCIsIkJPVFRPTV9DTEFTUyIsIlNjcm9sbENsYXNzIiwidG9wIiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsVG9wIiwidG9nZ2xlIiwib2Zmc2V0SGVpZ2h0Iiwib2xkU2Nyb2xsIiwic2Nyb2xsSGFuZGxlciIsInBhc3NpdmUiLCJUb2dnbGVCb2R5Q2xhc3MiLCJlIiwiY3VycmVudFRhcmdldCIsImNsYXNzZXMiLCJjbGFzc2VzUmVtb3ZlIiwic3BsaXQiLCJjbGFzc05hbWUiLCJlbGVtZW50cyIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwiX2NyZWF0ZUNsYXNzIiwiRUwiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVyIiwiU3BsaWRlIiwicmV3aW5kIiwicGVyUGFnZSIsInBhZ2luYXRpb24iLCJhcnJvd3MiLCJzcGVlZCIsIm1vdW50IiwiZml4ZWRXaWR0aCIsImlzTmF2aWdhdGlvbiIsIm1haW4iLCJ0aHVtYm5haWxzIiwic3luYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFFQSxJQUFNQSxPQUFPLEdBQUcsaUNBQWhCO01BRWFDLFVBQWIsNkJBQ0Usc0JBQWM7SUFBQTs7SUFBQSxxQ0FJQSxZQUFNO01BQ2xCQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUgsT0FBWjtLQUxZOztJQUNaSSxN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LEtBQUssQ0FBQyxZQUFZLElBQUksU0FBUyxJQUFJLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7RUFDM0QsR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLFFBQVEsR0FBRztFQUN0QixJQUFJLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7RUFDN0IsSUFBSSxPQUFPLElBQUksS0FBSyxLQUFLLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLEtBQUssVUFBVSxDQUFDO0VBQ3hFLEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxTQUFTLEdBQUc7RUFDdkIsSUFBSSxJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDMUIsTUFBTSxPQUFPLFFBQVEsRUFBRSxDQUFDO0VBQ3hCLEtBQUs7QUFDTDtFQUNBLElBQUksSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDcEQsSUFBSSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDaEMsSUFBSSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQ3JDLElBQUksSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztFQUN2QyxJQUFJLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ2hILEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtFQUNwQyxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxD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
