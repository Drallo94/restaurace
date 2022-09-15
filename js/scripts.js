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

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsic3JjL3NjcmlwdHMvbW9kdWxlcy9IZWxsb1dvcmxkLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9BbmltYXRlLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9Ub2dnbGVCb2R5Q2xhc3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEhlbGxvV29ybGRcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogLSBleGFtcGxlIGpzIG1vZHVsZVxyXG4gKi9cclxuXHJcbmNvbnN0IE1FU1NBR0UgPSBcIkhlbGxvIFdvcmxkISBGcm9tIEhlbGxvV29ybGQuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCB0aGlzLmxvYWRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBsb2FkSGFuZGxlciA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKE1FU1NBR0UpO1xyXG4gIH07XHJcbn1cclxuXHJcbm5ldyBIZWxsb1dvcmxkKCk7XHJcbiIsIi8qKlxyXG4gKiBBbmltYXRlXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIC0gYWRkIGNsYXNzIHRvIGVsZW1lbnQgaW4gdmlld3BvcnRcclxuICogLSBpZiB5b3Ugd2FudCBkaXNhYmxlIGFuaW1hdGUgZGVsYXkgb24gbW9iaWxlIHVzZSBbYW5pbWF0ZS1kZWxheS1kZXNrdG9wXVxyXG4gKiAtIHNldCBhbmltYXRpb24gZGVsYXkgdmlhIFthbmltYXRlLWRlbGF5XSBodG1sIGF0dHJpYnV0ZVxyXG4gKiAtIHNldCB2aXNpYmxlIHRocmVzaG9sZCB2aWEgW2FuaW1hdGUtdGhyZXNob2xkXSBodG1sIGF0dHJpYnV0ZVxyXG4gKi9cclxuXHJcbiBjb25zdCBJU01PQklMRSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KVwiKS5tYXRjaGVzXHJcbiBjb25zdCBUSFJFU0hPTEQgPSBJU01PQklMRSA/ICcwLjQnIDogJzAuNidcclxuIGNvbnN0IExPQURfVEhSRVNIT0xEID0gJzAuMidcclxuIGNvbnN0IEVMRU1FTlRTID0gJy5hbmltYXRlJ1xyXG4gY29uc3QgVklTSUJMRV9DTEFTUyA9ICdhbmltYXRlLS12aXNpYmxlJ1xyXG5cclxuY2xhc3MgQW5pbWF0ZSB7XHJcbiAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRUxFTUVOVFMpXHJcbiAgICB0aGlzLlRIUkVTSE9MRCA9IFRIUkVTSE9MRFxyXG4gICAgdGhpcy5MT0FEX1RIUkVTSE9MRCA9IExPQURfVEhSRVNIT0xEXHJcblxyXG4gICAgICBpZignSW50ZXJzZWN0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdykge1xyXG4gICAgICAgIHRoaXMuc2VjdGlvbnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgY29uc3QgQm91bmRpbmdDbGllbnRSZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAgY29uc3QgdmlzaWJsZVJhdGlvID0gIEJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQgLyB3aW5kb3cuaW5uZXJIZWlnaHRcclxuXHJcbiAgICAgICAgIGlmKHZpc2libGVSYXRpbyA+IDAuOTUpe1xyXG4gICAgICAgICAgIHRoaXMuVEhSRVNIT0xEID0gIHdpbmRvdy5pbm5lckhlaWdodCAvIEJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQgLyAxMDAgKiAzMFxyXG4gICAgICAgICAgIHRoaXMuTE9BRF9USFJFU0hPTEQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyBCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IC8gMTAwICogMjBcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIG9ic2VydmUgb24gcGFnZSBsb2FkXHJcbiAgICAgICAgICBjb25zdCBsb2FkT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5vYnNlcnZlQ2FsbGJhY2ssIHtcclxuICAgICAgICAgICAgdGhyZXNob2xkOiB0aGlzLkxPQURfVEhSRVNIT0xEXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGxvYWRPYnNlcnZlci5vYnNlcnZlKGVsKTtcclxuXHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxvYWRPYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgIC8vIG9ic2VydmVcclxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyVGhyZXNob2xkID0gZWwuZ2V0QXR0cmlidXRlKCdhbmltYXRlLXRocmVzaG9sZCcpID8gZWwuZ2V0QXR0cmlidXRlKCdhbmltYXRlLXRocmVzaG9sZCcpIDogdGhpcy5USFJFU0hPTERcclxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMub2JzZXJ2ZUNhbGxiYWNrLCB7XHJcbiAgICAgICAgICAgIHRocmVzaG9sZDogb2JzZXJ2ZXJUaHJlc2hvbGRcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNlY3Rpb25zLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFZJU0lCTEVfQ0xBU1MpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICAgb2JzZXJ2ZUNhbGxiYWNrID0gKGVudHJpZXMpID0+IHtcclxuICAgICAgZW50cmllcy5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IGVudHJ5LnRhcmdldDtcclxuICAgICAgICBjb25zdCBkZWxheSA9IHRoaXMuZ2V0RGVsYXkoc2VjdGlvbilcclxuICAgICAgICBjb25zdCBzZWN0aW9uQm9keUNsYXNzID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtYm9keS1jbGFzcycpXHJcblxyXG4gICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgICAgaWYoSVNNT0JJTEUgJiYgc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtZGVsYXktZGVza3RvcCcpKXtcclxuICAgICAgICAgICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKFZJU0lCTEVfQ0xBU1MpXHJcblxyXG4gICAgICAgICAgICB0aGlzLmJvZHlDbGFzcyhzZWN0aW9uQm9keUNsYXNzLCAnYWRkJylcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZChWSVNJQkxFX0NMQVNTKVxyXG4gICAgICAgICAgICAgIHRoaXMuYm9keUNsYXNzKHNlY3Rpb25Cb2R5Q2xhc3MsICdhZGQnKVxyXG4gICAgICAgICAgICB9LCBkZWxheSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5ib2R5Q2xhc3Moc2VjdGlvbkJvZHlDbGFzcywgJ3JlbW92ZScpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgIGdldERlbGF5ID0gKHNlY3Rpb24pID0+IHtcclxuICAgdmFyIGRlbGF5ID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtZGVsYXknKVxyXG5cclxuICAgaWYoIUlTTU9CSUxFICYmIHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdhbmltYXRlLWRlbGF5LWRlc2t0b3AnKSl7XHJcbiAgICAgdmFyIGRlbGF5ID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtZGVsYXktZGVza3RvcCcpXHJcbiAgIH1cclxuXHJcbiAgIGlmIChkZWxheSA9PT0gbnVsbCkge1xyXG4gICAgIHJldHVybiAwXHJcbiAgIH0gZWxzZSBpZiAoZGVsYXkuaW5jbHVkZXMoJy4nKSkge1xyXG4gICAgIHJldHVybiBwYXJzZUludChkZWxheSAqIDEwMDApXHJcbiAgIH0gZWxzZSB7XHJcbiAgICAgcmV0dXJuIHBhcnNlSW50KGRlbGF5KVxyXG4gICB9XHJcbiAgIH1cclxuXHJcbiAgIGJvZHlDbGFzcyA9IChodG1sY2xhc3MsIHR5cGUpID0+IHtcclxuICAgICBpZighaHRtbGNsYXNzKXtcclxuICAgICAgIHJldHVyblxyXG4gICAgIH1cclxuXHJcbiAgICAgIGlmKHR5cGUgPT0gJ2FkZCcpe1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChodG1sY2xhc3MpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGh0bWxjbGFzcylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gfVxyXG5cclxuIG5ldyBBbmltYXRlKClcclxuIiwiLyoqXHJcbiAqIFRvZ2dsZUJvZHlDbGFzc1xyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAtIHRvZ2dsZSBjbGFzcyBvbiBib2R5XHJcbiAqIC0gbXVsdGlwbGUgY2xhc3NlcyBzdXBwb3J0ZWQgLSBcIkNMQVNTTkFNRSBDTEFTU05BTUUyIC4uLlwiXHJcbiAqIC0gYWRkIGNsYXNzIHRvIGh0bWwgYXR0ciBbZGF0YS10b2dnbGU9XCJDTEFTU05BTUVcIl1cclxuICogLSByZW1vdmUgY2xhc3Mgd2hlbiBhdHRyIFtkYXRhLXJlbW92ZT1cIkNMQVNTTkFNRVwiXVxyXG4gKi9cclxuXHJcbiBjb25zdCBFTEVNRU5UUyA9ICcuanMtVG9nZ2xlQm9keUNsYXNzJ1xyXG5cclxuIGNsYXNzIFRvZ2dsZUJvZHlDbGFzcyB7XHJcbiAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgIHRoaXMuZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKEVMRU1FTlRTKVxyXG5cclxuICAgICBpZiAoIXRoaXMuZWxlbWVudHMpIHtcclxuICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgIH1cclxuXHJcbiAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUsIGZhbHNlKVxyXG4gICAgIH0pXHJcbiAgIH1cclxuXHJcbiAgIHRvZ2dsZSA9IChlKSA9PiB7XHJcbiAgICAgY29uc3QgZWwgPSBlLmN1cnJlbnRUYXJnZXRcclxuICAgICBjb25zdCBjbGFzc2VzID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRvZ2dsZScpXHJcbiAgICAgY29uc3QgY2xhc3Nlc1JlbW92ZSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1yZW1vdmUnKVxyXG5cclxuICAgICBpZihjbGFzc2VzUmVtb3ZlKXtcclxuICAgICAgY2xhc3Nlc1JlbW92ZS5zcGxpdChcIiBcIikuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXHJcbiAgICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICBjbGFzc2VzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpXHJcbiAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgIH1cclxuIH1cclxuXHJcbiBuZXcgVG9nZ2xlQm9keUNsYXNzKClcclxuIl0sIm5hbWVzIjpbIk1FU1NBR0UiLCJIZWxsb1dvcmxkIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJsb2FkSGFuZGxlciIsIklTTU9CSUxFIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJUSFJFU0hPTEQiLCJMT0FEX1RIUkVTSE9MRCIsIkVMRU1FTlRTIiwiVklTSUJMRV9DTEFTUyIsIkFuaW1hdGUiLCJlbnRyaWVzIiwibWFwIiwiZW50cnkiLCJzZWN0aW9uIiwidGFyZ2V0IiwiZGVsYXkiLCJnZXREZWxheSIsInNlY3Rpb25Cb2R5Q2xhc3MiLCJnZXRBdHRyaWJ1dGUiLCJpc0ludGVyc2VjdGluZyIsImNsYXNzTGlzdCIsImFkZCIsImJvZHlDbGFzcyIsInNldFRpbWVvdXQiLCJpbmNsdWRlcyIsInBhcnNlSW50IiwiaHRtbGNsYXNzIiwidHlwZSIsImRvY3VtZW50IiwiYm9keSIsInJlbW92ZSIsInNlY3Rpb25zIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbCIsIkJvdW5kaW5nQ2xpZW50UmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInZpc2libGVSYXRpbyIsImhlaWdodCIsImlubmVySGVpZ2h0IiwibG9hZE9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlQ2FsbGJhY2siLCJ0aHJlc2hvbGQiLCJvYnNlcnZlIiwiZGlzY29ubmVjdCIsIm9ic2VydmVyVGhyZXNob2xkIiwib2JzZXJ2ZXIiLCJUb2dnbGVCb2R5Q2xhc3MiLCJlIiwiY3VycmVudFRhcmdldCIsImNsYXNzZXMiLCJjbGFzc2VzUmVtb3ZlIiwic3BsaXQiLCJjbGFzc05hbWUiLCJ0b2dnbGUiLCJlbGVtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFFQSxJQUFNQSxPQUFPLEdBQUcsaUNBQWhCO01BRWFDLFVBQWIsNkJBQ0Usc0JBQWM7SUFBQTs7SUFBQSxxQ0FJQSxZQUFNO01BQ2xCQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUgsT0FBWjtLQUxZOztJQUNaSSxNQUFNLENBQUNDLGdCQUFQLENBQXdC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
