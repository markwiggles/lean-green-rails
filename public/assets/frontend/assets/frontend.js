"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('frontend/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'frontend/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _frontendConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _frontendConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _frontendConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _frontendConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('frontend/blueprints/ember-youtube', ['exports', 'ember-youtube/blueprints/ember-youtube'], function (exports, _emberYoutubeBlueprintsEmberYoutube) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberYoutubeBlueprintsEmberYoutube['default'];
    }
  });
});
define('frontend/components/app-modal', ['exports', 'ember-modal-dialog/components/modal-dialog', 'frontend/templates/components/custom-modal'], function (exports, _emberModalDialogComponentsModalDialog, _frontendTemplatesComponentsCustomModal) {
	exports['default'] = _emberModalDialogComponentsModalDialog['default'].extend({
		containerClassNames: "app-modal",
		targetAttachment: "none",
		layout: _frontendTemplatesComponentsCustomModal['default'],
		isShowingBody: true, // allow the modal to be created (offscreen)
		actions: {
			toggleBody: function toggleBody() {
				//toggles whether the modal is seen
				this.toggleProperty('isShowingBody');
			}
		},
		didInsertElement: function didInsertElement() {
			setTimeout(function () {
				// after a time, animate the modal onto screen
				$('.app-modal').css({
					'right': '2%'
				});
			}, 2000);
		}
	});
});
define('frontend/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'frontend/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _frontendConfigEnvironment) {

  var name = _frontendConfigEnvironment['default'].APP.name;
  var version = _frontendConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('frontend/components/ember-modal-dialog-positioned-container', ['exports', 'ember-modal-dialog/components/positioned-container'], function (exports, _emberModalDialogComponentsPositionedContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsPositionedContainer['default'];
    }
  });
});
define('frontend/components/ember-tether', ['exports', 'ember-tether/components/ember-tether'], function (exports, _emberTetherComponentsEmberTether) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTetherComponentsEmberTether['default'];
    }
  });
});
define('frontend/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('frontend/components/ember-youtube', ['exports', 'ember', 'ember-youtube/components/ember-youtube'], function (exports, _ember, _emberYoutubeComponentsEmberYoutube) {
  exports['default'] = _emberYoutubeComponentsEmberYoutube['default'];
});
define("frontend/components/lf-outlet", ["exports", "liquid-fire/ember-internals"], function (exports, _liquidFireEmberInternals) {
  exports["default"] = _liquidFireEmberInternals.StaticOutlet;
});
define('frontend/components/lf-overlay', ['exports', 'ember'], function (exports, _ember) {
  var COUNTER = '__lf-modal-open-counter';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'span',
    classNames: ['lf-overlay'],

    didInsertElement: function didInsertElement() {
      var body = _ember['default'].$('body');
      var counter = body.data(COUNTER) || 0;
      body.addClass('lf-modal-open');
      body.data(COUNTER, counter + 1);
    },

    willDestroy: function willDestroy() {
      var body = _ember['default'].$('body');
      var counter = body.data(COUNTER) || 0;
      body.data(COUNTER, counter - 1);
      if (counter < 2) {
        body.removeClass('lf-modal-open lf-modal-closing');
      }
    }
  });
});
define('frontend/components/liquid-append', ['exports', 'liquid-tether/components/liquid-append'], function (exports, _liquidTetherComponentsLiquidAppend) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidTetherComponentsLiquidAppend['default'];
    }
  });
});
define('frontend/components/liquid-bind', ['exports', 'ember'], function (exports, _ember) {

  var LiquidBind = _ember['default'].Component.extend({
    tagName: '',
    positionalParams: ['value'] // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
  });

  LiquidBind.reopenClass({
    positionalParams: ['value']
  });

  exports['default'] = LiquidBind;
});
define('frontend/components/liquid-child', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['liquid-child'],

    didInsertElement: function didInsertElement() {
      var $container = this.$();
      if ($container) {
        $container.css('visibility', 'hidden');
      }
      this.sendAction('liquidChildDidRender', this);
    }

  });
});
define("frontend/components/liquid-container", ["exports", "ember", "liquid-fire/growable", "frontend/components/liquid-measured"], function (exports, _ember, _liquidFireGrowable, _frontendComponentsLiquidMeasured) {
  exports["default"] = _ember["default"].Component.extend(_liquidFireGrowable["default"], {
    classNames: ['liquid-container'],

    lockSize: function lockSize(elt, want) {
      elt.outerWidth(want.width);
      elt.outerHeight(want.height);
    },

    unlockSize: function unlockSize() {
      var _this = this;

      var doUnlock = function doUnlock() {
        _this.updateAnimatingClass(false);
        var elt = _this.$();
        if (elt) {
          elt.css({ width: '', height: '' });
        }
      };
      if (this._scaling) {
        this._scaling.then(doUnlock);
      } else {
        doUnlock();
      }
    },

    // We're doing this manually instead of via classNameBindings
    // because it depends on upward-data-flow, which generates warnings
    // under Glimmer.
    updateAnimatingClass: function updateAnimatingClass(on) {
      if (this.isDestroyed || !this._wasInserted) {
        return;
      }
      if (arguments.length === 0) {
        on = this.get('liquidAnimating');
      } else {
        this.set('liquidAnimating', on);
      }
      if (on) {
        this.$().addClass('liquid-animating');
      } else {
        this.$().removeClass('liquid-animating');
      }
    },

    startMonitoringSize: _ember["default"].on('didInsertElement', function () {
      this._wasInserted = true;
      this.updateAnimatingClass();
    }),

    actions: {

      willTransition: function willTransition(versions) {
        if (!this._wasInserted) {
          return;
        }

        // Remember our own size before anything changes
        var elt = this.$();
        this._cachedSize = (0, _frontendComponentsLiquidMeasured.measure)(elt);

        // And make any children absolutely positioned with fixed sizes.
        for (var i = 0; i < versions.length; i++) {
          goAbsolute(versions[i]);
        }

        // Apply '.liquid-animating' to liquid-container allowing
        // any customizable CSS control while an animating is occuring
        this.updateAnimatingClass(true);
      },

      afterChildInsertion: function afterChildInsertion(versions) {
        var elt = this.$();
        var enableGrowth = this.get('enableGrowth') !== false;

        // Measure  children
        var sizes = [];
        for (var i = 0; i < versions.length; i++) {
          if (versions[i].view) {
            sizes[i] = (0, _frontendComponentsLiquidMeasured.measure)(versions[i].view.$());
          }
        }

        // Measure ourself again to see how big the new children make
        // us.
        var want = (0, _frontendComponentsLiquidMeasured.measure)(elt);
        var have = this._cachedSize || want;

        // Make ourself absolute
        if (enableGrowth) {
          this.lockSize(elt, have);
        } else {
          this.lockSize(elt, {
            height: Math.max(want.height, have.height),
            width: Math.max(want.width, have.width)
          });
        }

        // Make the children absolute and fixed size.
        for (i = 0; i < versions.length; i++) {
          goAbsolute(versions[i], sizes[i]);
        }

        // Kick off our growth animation
        if (enableGrowth) {
          this._scaling = this.animateGrowth(elt, have, want);
        }
      },

      afterTransition: function afterTransition(versions) {
        for (var i = 0; i < versions.length; i++) {
          goStatic(versions[i]);
        }
        this.unlockSize();
      }
    }
  });

  function goAbsolute(version, size) {
    if (!version.view) {
      return;
    }
    var elt = version.view.$();
    var pos = elt.position();
    if (!size) {
      size = (0, _frontendComponentsLiquidMeasured.measure)(elt);
    }
    elt.outerWidth(size.width);
    elt.outerHeight(size.height);
    elt.css({
      position: 'absolute',
      top: pos.top,
      left: pos.left
    });
  }

  function goStatic(version) {
    if (version.view && !version.view.isDestroyed) {
      version.view.$().css({ width: '', height: '', position: '' });
    }
  }
});
define('frontend/components/liquid-if', ['exports', 'ember', 'liquid-fire/ember-internals'], function (exports, _ember, _liquidFireEmberInternals) {

  var LiquidIf = _ember['default'].Component.extend({
    positionalParams: ['predicate'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
    tagName: '',
    helperName: 'liquid-if',
    didReceiveAttrs: function didReceiveAttrs() {
      this._super();
      var predicate = (0, _liquidFireEmberInternals.shouldDisplay)(this.getAttr('predicate'));
      this.set('showFirstBlock', this.inverted ? !predicate : predicate);
    }
  });

  LiquidIf.reopenClass({
    positionalParams: ['predicate']
  });

  exports['default'] = LiquidIf;
});
define("frontend/components/liquid-measured", ["exports", "liquid-fire/components/liquid-measured"], function (exports, _liquidFireComponentsLiquidMeasured) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidMeasured["default"];
    }
  });
  Object.defineProperty(exports, "measure", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidMeasured.measure;
    }
  });
});
define('frontend/components/liquid-modal', ['exports', 'ember', 'ember-getowner-polyfill'], function (exports, _ember, _emberGetownerPolyfill) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['liquid-modal'],
    currentContext: _ember['default'].computed('owner.modalContexts.lastObject', function () {
      var context = this.get('owner.modalContexts.lastObject');
      if (context) {
        context.view = this.innerView(context);
      }
      return context;
    }),

    owner: _ember['default'].inject.service('liquid-fire-modals'),

    innerView: function innerView(current) {
      var self = this,
          name = current.get('name'),
          owner = (0, _emberGetownerPolyfill['default'])(this),
          component = owner.lookup('component-lookup:main').lookupFactory(name);
      _ember['default'].assert("Tried to render a modal using component '" + name + "', but couldn't find it.", !!component);

      var args = _ember['default'].copy(current.get('params'));

      args.registerMyself = _ember['default'].on('init', function () {
        self.set('innerViewInstance', this);
      });

      // set source so we can bind other params to it
      args._source = _ember['default'].computed(function () {
        return current.get("source");
      });

      var otherParams = current.get("options.otherParams");
      var from, to;
      for (from in otherParams) {
        to = otherParams[from];
        args[to] = _ember['default'].computed.alias("_source." + from);
      }

      var actions = current.get("options.actions") || {};

      // Override sendAction in the modal component so we can intercept and
      // dynamically dispatch to the controller as expected
      args.sendAction = function (name) {
        var actionName = actions[name];
        if (!actionName) {
          this._super.apply(this, Array.prototype.slice.call(arguments));
          return;
        }

        var controller = current.get("source");
        var args = Array.prototype.slice.call(arguments, 1);
        args.unshift(actionName);
        controller.send.apply(controller, args);
      };

      return component.extend(args);
    },

    actions: {
      outsideClick: function outsideClick() {
        if (this.get('currentContext.options.dismissWithOutsideClick')) {
          this.send('dismiss');
        } else {
          proxyToInnerInstance(this, 'outsideClick');
        }
      },
      escape: function escape() {
        if (this.get('currentContext.options.dismissWithEscape')) {
          this.send('dismiss');
        } else {
          proxyToInnerInstance(this, 'escape');
        }
      },
      dismiss: function dismiss() {
        _ember['default'].$('body').addClass('lf-modal-closing');
        var source = this.get('currentContext.source'),
            proto = source.constructor.proto(),
            params = this.get('currentContext.options.withParams'),
            clearThem = {};

        for (var key in params) {
          if (proto[key] instanceof _ember['default'].ComputedProperty) {
            clearThem[key] = undefined;
          } else {
            clearThem[key] = proto[key];
          }
        }
        source.setProperties(clearThem);
      }
    }
  });

  function proxyToInnerInstance(self, message) {
    var vi = self.get('innerViewInstance');
    if (vi) {
      vi.send(message);
    }
  }
});
define('frontend/components/liquid-outlet', ['exports', 'ember'], function (exports, _ember) {

  var LiquidOutlet = _ember['default'].Component.extend({
    positionalParams: ['inputOutletName'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
    tagName: '',
    didReceiveAttrs: function didReceiveAttrs() {
      this._super();
      this.set('outletName', this.attrs.inputOutletName || 'main');
    }
  });

  LiquidOutlet.reopenClass({
    positionalParams: ['inputOutletName']
  });

  exports['default'] = LiquidOutlet;
});
define("frontend/components/liquid-spacer", ["exports", "liquid-fire/components/liquid-spacer"], function (exports, _liquidFireComponentsLiquidSpacer) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidSpacer["default"];
    }
  });
});
define('frontend/components/liquid-target-container', ['exports', 'liquid-tether/components/liquid-target-container'], function (exports, _liquidTetherComponentsLiquidTargetContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidTetherComponentsLiquidTargetContainer['default'];
    }
  });
});
define('frontend/components/liquid-target', ['exports', 'liquid-tether/components/liquid-target'], function (exports, _liquidTetherComponentsLiquidTarget) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidTetherComponentsLiquidTarget['default'];
    }
  });
});
define('frontend/components/liquid-tether', ['exports', 'liquid-tether/components/liquid-tether'], function (exports, _liquidTetherComponentsLiquidTether) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidTetherComponentsLiquidTether['default'];
    }
  });
});
define('frontend/components/liquid-unless', ['exports', 'frontend/components/liquid-if'], function (exports, _frontendComponentsLiquidIf) {
  exports['default'] = _frontendComponentsLiquidIf['default'].extend({
    helperName: 'liquid-unless',
    layoutName: 'components/liquid-if',
    inverted: true
  });
});
define("frontend/components/liquid-versions", ["exports", "ember", "liquid-fire/ember-internals"], function (exports, _ember, _liquidFireEmberInternals) {

  var get = _ember["default"].get;
  var set = _ember["default"].set;

  exports["default"] = _ember["default"].Component.extend({
    tagName: "",
    name: 'liquid-versions',

    transitionMap: _ember["default"].inject.service('liquid-fire-transitions'),

    didReceiveAttrs: function didReceiveAttrs() {
      this._super();
      if (!this.versions || this._lastVersion !== this.getAttr('value')) {
        this.appendVersion();
        this._lastVersion = this.getAttr('value');
      }
    },

    appendVersion: function appendVersion() {
      var versions = this.versions;
      var firstTime = false;
      var newValue = this.getAttr('value');
      var oldValue;

      if (!versions) {
        firstTime = true;
        versions = _ember["default"].A();
      } else {
        oldValue = versions[0];
      }

      // TODO: may need to extend the comparison to do the same kind of
      // key-based diffing that htmlbars is doing.
      if (!firstTime && (!oldValue && !newValue || oldValue === newValue)) {
        return;
      }

      this.notifyContainer('willTransition', versions);
      var newVersion = {
        value: newValue,
        shouldRender: newValue || get(this, 'renderWhenFalse')
      };
      versions.unshiftObject(newVersion);

      this.firstTime = firstTime;
      if (firstTime) {
        set(this, 'versions', versions);
      }

      if (!newVersion.shouldRender && !firstTime) {
        this._transition();
      }
    },

    _transition: function _transition() {
      var _this = this;

      var versions = get(this, 'versions');
      var transition;
      var firstTime = this.firstTime;
      this.firstTime = false;

      this.notifyContainer('afterChildInsertion', versions);

      transition = get(this, 'transitionMap').transitionFor({
        versions: versions,
        parentElement: _ember["default"].$((0, _liquidFireEmberInternals.containingElement)(this)),
        use: get(this, 'use'),
        // Using strings instead of booleans here is an
        // optimization. The constraint system can match them more
        // efficiently, since it treats boolean constraints as generic
        // "match anything truthy/falsy" predicates, whereas string
        // checks are a direct object property lookup.
        firstTime: firstTime ? 'yes' : 'no',
        helperName: get(this, 'name'),
        outletName: get(this, 'outletName')
      });

      if (this._runningTransition) {
        this._runningTransition.interrupt();
      }
      this._runningTransition = transition;

      transition.run().then(function (wasInterrupted) {
        // if we were interrupted, we don't handle the cleanup because
        // another transition has already taken over.
        if (!wasInterrupted) {
          _this.finalizeVersions(versions);
          _this.notifyContainer("afterTransition", versions);
        }
      }, function (err) {
        _this.finalizeVersions(versions);
        _this.notifyContainer("afterTransition", versions);
        throw err;
      });
    },

    finalizeVersions: function finalizeVersions(versions) {
      versions.replace(1, versions.length - 1);
    },

    notifyContainer: function notifyContainer(method, versions) {
      var target = get(this, 'notify');
      if (target) {
        target.send(method, versions);
      }
    },

    actions: {
      childDidRender: function childDidRender(child) {
        var version = get(child, 'version');
        set(version, 'view', child);
        this._transition();
      }
    }

  });
});
define('frontend/components/liquid-with', ['exports', 'ember'], function (exports, _ember) {

  var LiquidWith = _ember['default'].Component.extend({
    name: 'liquid-with',
    positionalParams: ['value'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
    tagName: '',
    iAmDeprecated: _ember['default'].on('init', function () {
      _ember['default'].deprecate("liquid-with is deprecated, use liquid-bind instead -- it accepts a block now.");
    })
  });

  LiquidWith.reopenClass({
    positionalParams: ['value']
  });

  exports['default'] = LiquidWith;
});
define('frontend/components/liquid-wormhole', ['exports', 'liquid-tether/components/liquid-wormhole'], function (exports, _liquidTetherComponentsLiquidWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidTetherComponentsLiquidWormhole['default'];
    }
  });
});
define("frontend/components/lm-container", ["exports", "ember", "liquid-fire/tabbable", "liquid-fire/is-browser"], function (exports, _ember, _liquidFireTabbable, _liquidFireIsBrowser) {

  /**
   * If you do something to move focus outside of the browser (like
   * command+l to go to the address bar) and then tab back into the
   * window, capture it and focus the first tabbable element in an active
   * modal.
   */
  var lastOpenedModal = null;

  if ((0, _liquidFireIsBrowser["default"])()) {
    _ember["default"].$(document).on('focusin', handleTabIntoBrowser);
  }

  function handleTabIntoBrowser() {
    if (lastOpenedModal) {
      lastOpenedModal.focus();
    }
  }

  exports["default"] = _ember["default"].Component.extend({
    classNames: ['lm-container'],
    attributeBindings: ['tabindex'],
    tabindex: 0,

    keyUp: function keyUp(event) {
      // Escape key
      if (event.keyCode === 27) {
        this.sendAction();
      }
    },

    keyDown: function keyDown(event) {
      // Tab key
      if (event.keyCode === 9) {
        this.constrainTabNavigation(event);
      }
    },

    didInsertElement: function didInsertElement() {
      this.focus();
      lastOpenedModal = this;
    },

    willDestroy: function willDestroy() {
      lastOpenedModal = null;
    },

    focus: function focus() {
      if (this.get('element').contains(document.activeElement)) {
        // just let it be if we already contain the activeElement
        return;
      }
      var target = this.$('[autofocus]');
      if (!target.length) {
        target = this.$(':tabbable');
      }

      if (!target.length) {
        target = this.$();
      }

      target[0].focus();
    },

    constrainTabNavigation: function constrainTabNavigation(event) {
      var tabbable = this.$(':tabbable');
      var finalTabbable = tabbable[event.shiftKey ? 'first' : 'last']()[0];
      var leavingFinalTabbable = finalTabbable === document.activeElement ||
      // handle immediate shift+tab after opening with mouse
      this.get('element') === document.activeElement;
      if (!leavingFinalTabbable) {
        return;
      }
      event.preventDefault();
      tabbable[event.shiftKey ? 'last' : 'first']()[0].focus();
    },

    click: function click(event) {
      if (event.target === this.get('element')) {
        this.sendAction('clickAway');
      }
    }
  });
});
/*
   Parts of this file were adapted from ic-modal

   https://github.com/instructure/ic-modal
   Released under The MIT License (MIT)
   Copyright (c) 2014 Instructure, Inc.
*/
define("frontend/components/main-navbar", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Component.extend({

		didInsertElement: function didInsertElement() {
			// close menu when collapsed (after selection)
			$(".navbar-nav li a").click(function (event) {
				// check if window is small enough so dropdown is created
				var toggle = $(".navbar-toggle").is(":visible");
				if (toggle) {
					$(".navbar-collapse").removeClass('in');
				}
			});
		},
		fetch_cart: (function () {
			//get the cart contents from Spree
			$.ajax({
				url: Spree.pathFor("cart_link"),
				success: function success(data) {
					return $('#link-to-cart').html(data);
				}
			});
		}).property()

	});
});
define('frontend/components/modal-dialog-overlay', ['exports', 'ember-modal-dialog/components/modal-dialog-overlay'], function (exports, _emberModalDialogComponentsModalDialogOverlay) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsModalDialogOverlay['default'];
    }
  });
});
define('frontend/components/modal-dialog', ['exports', 'ember-modal-dialog/components/modal-dialog'], function (exports, _emberModalDialogComponentsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsModalDialog['default'];
    }
  });
});
define('frontend/components/shop-modal', ['exports', 'ember-modal-dialog/components/modal-dialog', 'frontend/templates/components/custom-modal'], function (exports, _emberModalDialogComponentsModalDialog, _frontendTemplatesComponentsCustomModal) {
	exports['default'] = _emberModalDialogComponentsModalDialog['default'].extend({
		containerClassNames: "shop-modal",
		targetAttachment: "none",
		layout: _frontendTemplatesComponentsCustomModal['default'],
		isShowingBody: true, // allow the modal to be created (offscreen)
		actions: {
			toggleBody: function toggleBody() {
				//toggles whether the modal is seen
				this.toggleProperty('isShowingBody');
			}
		},
		didInsertElement: function didInsertElement() {
			setTimeout(function () {
				// after a time, animate the modal onto screen
				$('.shop-modal').css({
					'right': '2%'
				});
			}, 2000);
		}
	});
});
define('frontend/components/slick-carousel', ['exports', 'ember-cli-slick-carousel/components/slick-carousel'], function (exports, _emberCliSlickCarouselComponentsSlickCarousel) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSlickCarouselComponentsSlickCarousel['default'];
    }
  });
});
define('frontend/components/tether-dialog', ['exports', 'ember-modal-dialog/components/tether-dialog'], function (exports, _emberModalDialogComponentsTetherDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsTetherDialog['default'];
    }
  });
});
define('frontend/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('frontend/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('frontend/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('frontend/initializers/add-modals-container', ['exports', 'ember-modal-dialog/initializers/add-modals-container'], function (exports, _emberModalDialogInitializersAddModalsContainer) {
  exports['default'] = {
    name: 'add-modals-container',
    initialize: _emberModalDialogInitializersAddModalsContainer['default']
  };
});
define('frontend/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'frontend/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _frontendConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_frontendConfigEnvironment['default'].APP.name, _frontendConfigEnvironment['default'].APP.version)
  };
});
define('frontend/initializers/ember-cli-rails-addon-csrf', ['exports', 'ember'], function (exports, _ember) {
  var $ = _ember['default'].$;
  exports['default'] = {
    name: 'ember-cli-rails-addon-csrf',

    initialize: function initialize() {
      $.ajaxPrefilter(function (options, originalOptions, xhr) {
        var token = $('meta[name="csrf-token"]').attr('content');
        xhr.setRequestHeader('X-CSRF-Token', token);
      });
    }
  };
});
define('frontend/initializers/export-application-global', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_frontendConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _frontendConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_frontendConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define("frontend/initializers/liquid-fire", ["exports", "liquid-fire/router-dsl-ext", "liquid-fire/ember-internals"], function (exports, _liquidFireRouterDslExt, _liquidFireEmberInternals) {
  (0, _liquidFireEmberInternals.registerKeywords)();

  exports["default"] = {
    name: 'liquid-fire',
    initialize: function initialize() {}
  };
});
// This initializer exists only to make sure that the following
// imports happen before the app boots.
define('frontend/instance-initializers/liquid-target-container', ['exports', 'liquid-tether/instance-initializers/liquid-target-container'], function (exports, _liquidTetherInstanceInitializersLiquidTargetContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidTetherInstanceInitializersLiquidTargetContainer['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _liquidTetherInstanceInitializersLiquidTargetContainer.initialize;
    }
  });
});
define('frontend/mixins/reset-scroll', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Mixin.create({
    activate: function activate() {
      this._super();
      window.scrollTo(0, 0);
    }
  });
});
define('frontend/router', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {

	var Router = _ember['default'].Router.extend({
		location: _frontendConfigEnvironment['default'].locationType
	});

	Router.map(function () {
		this.route('index', {
			path: '/'
		});
		this.route('why');
		this.route('training', function () {
			this.route('video', { path: '/' });
		});
		this.route('vegucated');
		this.route('team');
	});

	exports['default'] = Router;
});
define('frontend/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('frontend/routes/index', ['exports', 'ember', 'frontend/mixins/reset-scroll'], function (exports, _ember, _frontendMixinsResetScroll) {
  exports['default'] = _ember['default'].Route.extend(_frontendMixinsResetScroll['default'], {});
});
define('frontend/routes/team', ['exports', 'ember', 'frontend/mixins/reset-scroll'], function (exports, _ember, _frontendMixinsResetScroll) {
  exports['default'] = _ember['default'].Route.extend(_frontendMixinsResetScroll['default'], {});
});
define('frontend/routes/training/video', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      // simulate slow moving data
      // return new Ember.RSVP.Promise(function(resolve){
      //     setTimeout(function(){
      //         var model =  'stuff here';
      //         resolve(model);
      //     }, 3000); // 3 second delay
      // });
    }
  });
});
define('frontend/routes/training', ['exports', 'ember', 'frontend/mixins/reset-scroll'], function (exports, _ember, _frontendMixinsResetScroll) {
  exports['default'] = _ember['default'].Route.extend(_frontendMixinsResetScroll['default'], {});
});
define('frontend/routes/vegucated', ['exports', 'ember', 'frontend/mixins/reset-scroll'], function (exports, _ember, _frontendMixinsResetScroll) {
  exports['default'] = _ember['default'].Route.extend(_frontendMixinsResetScroll['default'], {});
});
define('frontend/routes/why', ['exports', 'ember', 'frontend/mixins/reset-scroll'], function (exports, _ember, _frontendMixinsResetScroll) {
  exports['default'] = _ember['default'].Route.extend(_frontendMixinsResetScroll['default'], {});
});
define("frontend/services/liquid-fire-modals", ["exports", "liquid-fire/modals"], function (exports, _liquidFireModals) {
  exports["default"] = _liquidFireModals["default"];
});
define("frontend/services/liquid-fire-transitions", ["exports", "liquid-fire/transition-map"], function (exports, _liquidFireTransitionMap) {
  exports["default"] = _liquidFireTransitionMap["default"];
});
define('frontend/services/liquid-target', ['exports', 'liquid-tether/services/liquid-target'], function (exports, _liquidTetherServicesLiquidTarget) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidTetherServicesLiquidTarget['default'];
    }
  });
});
define('frontend/services/modal-dialog', ['exports', 'ember-modal-dialog/services/modal-dialog'], function (exports, _emberModalDialogServicesModalDialog) {
  exports['default'] = _emberModalDialogServicesModalDialog['default'];
});
define("frontend/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 32
          }
        },
        "moduleName": "frontend/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "main-navbar", ["loc", [null, [1, 0], [1, 15]]]], ["content", "liquid-outlet", ["loc", [null, [1, 15], [1, 32]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/components/custom-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@1.13.11",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 5,
                    "column": 4
                  },
                  "end": {
                    "line": 12,
                    "column": 4
                  }
                },
                "moduleName": "frontend/templates/components/custom-modal.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("					");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("button");
                dom.setAttribute(el1, "class", "close");
                dom.setAttribute(el1, "type", "button");
                var el2 = dom.createTextNode("\n						");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("a");
                var el3 = dom.createTextNode("\n							");
                dom.appendChild(el2, el3);
                var el3 = dom.createElement("i");
                dom.setAttribute(el3, "class", "remove glyphicon glyphicon-remove-sign");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n						");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n					");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n					");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element0 = dom.childAt(fragment, [1]);
                var morphs = new Array(2);
                morphs[0] = dom.createElementMorph(element0);
                morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
                return morphs;
              },
              statements: [["element", "action", ["toggleBody"], [], ["loc", [null, [6, 41], [6, 64]]]], ["content", "yield", ["loc", [null, [11, 5], [11, 14]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@1.13.11",
              "loc": {
                "source": null,
                "start": {
                  "line": 4,
                  "column": 3
                },
                "end": {
                  "line": 13,
                  "column": 3
                }
              },
              "moduleName": "frontend/templates/components/custom-modal.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "ember-modal-dialog-positioned-container", [], ["targetAttachment", ["subexpr", "@mut", [["get", "targetAttachment", ["loc", [null, [5, 148], [5, 164]]]]], [], []], "target", ["subexpr", "@mut", [["get", "target", ["loc", [null, [5, 172], [5, 178]]]]], [], []], "class", ["subexpr", "concat", [["subexpr", "if", [["get", "containerClassNamesString", []], ["subexpr", "-normalize-class", ["containerClassNamesString", ["get", "containerClassNamesString", []]], [], []]], [], []], " ", ["subexpr", "if", [["get", "targetAttachmentClass", []], ["subexpr", "-normalize-class", ["targetAttachmentClass", ["get", "targetAttachmentClass", []]], [], []]], [], []], " ", ["subexpr", "if", [["get", "container-class", []], ["subexpr", "-normalize-class", ["container-class", ["get", "container-class", []]], [], []]], [], []], " "], [], []]], 0, null, ["loc", [null, [5, 4], [12, 48]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 1
              },
              "end": {
                "line": 15,
                "column": 1
              }
            },
            "moduleName": "frontend/templates/components/custom-modal.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("		");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element1, 'class');
            morphs[1] = dom.createMorphAt(element1, 1, 1);
            return morphs;
          },
          statements: [["attribute", "class", ["concat", [["get", "wrapperClassNamesString", ["loc", [null, [3, 16], [3, 39]]]], " ", ["get", "wrapper-class", ["loc", [null, [3, 44], [3, 57]]]]]]], ["block", "modal-dialog-overlay", [], ["action", "close", "class", ["subexpr", "concat", [["subexpr", "if", [["get", "overlayClassNamesString", []], ["subexpr", "-normalize-class", ["overlayClassNamesString", ["get", "overlayClassNamesString", []]], [], []]], [], []], " ", ["subexpr", "if", [["get", "translucentOverlay", []], "translucent"], [], []], " ", ["subexpr", "if", [["get", "overlay-class", []], ["subexpr", "-normalize-class", ["overlay-class", ["get", "overlay-class", []]], [], []]], [], []], " "], [], []]], 0, null, ["loc", [null, [4, 3], [13, 28]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 16,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/custom-modal.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "ember-wormhole", [], ["to", ["subexpr", "@mut", [["get", "destinationElementId", ["loc", [null, [2, 22], [2, 42]]]]], [], []], "renderInPlace", ["subexpr", "@mut", [["get", "renderInPlace", ["loc", [null, [2, 57], [2, 70]]]]], [], []]], 0, null, ["loc", [null, [2, 1], [15, 20]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/custom-modal.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "isShowingBody", ["loc", [null, [1, 6], [1, 19]]]]], [], 0, null, ["loc", [null, [1, 0], [16, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/components/ember-youtube", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 34
              },
              "end": {
                "line": 7,
                "column": 56
              }
            },
            "moduleName": "frontend/templates/components/ember-youtube.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Pause");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 56
              },
              "end": {
                "line": 7,
                "column": 68
              }
            },
            "moduleName": "frontend/templates/components/ember-youtube.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Play");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 36
              },
              "end": {
                "line": 8,
                "column": 57
              }
            },
            "moduleName": "frontend/templates/components/ember-youtube.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Unmute");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child3 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 57
              },
              "end": {
                "line": 8,
                "column": 69
              }
            },
            "moduleName": "frontend/templates/components/ember-youtube.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Mute");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 1
            },
            "end": {
              "line": 10,
              "column": 1
            }
          },
          "moduleName": "frontend/templates/components/ember-youtube.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("menu");
          dom.setAttribute(el1, "class", "EmberYoutube-controls");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var element4 = dom.childAt(element3, [1]);
          var element5 = dom.childAt(element3, [3]);
          var morphs = new Array(4);
          morphs[0] = dom.createElementMorph(element4);
          morphs[1] = dom.createMorphAt(element4, 0, 0);
          morphs[2] = dom.createElementMorph(element5);
          morphs[3] = dom.createMorphAt(element5, 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["togglePlay"], [], ["loc", [null, [7, 10], [7, 33]]]], ["block", "if", [["get", "isPlaying", ["loc", [null, [7, 40], [7, 49]]]]], [], 0, 1, ["loc", [null, [7, 34], [7, 75]]]], ["element", "action", ["toggleVolume"], [], ["loc", [null, [8, 10], [8, 35]]]], ["block", "if", [["get", "isMuted", ["loc", [null, [8, 42], [8, 49]]]]], [], 2, 3, ["loc", [null, [8, 36], [8, 76]]]]],
        locals: [],
        templates: [child0, child1, child2, child3]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 1
            },
            "end": {
              "line": 16,
              "column": 1
            }
          },
          "moduleName": "frontend/templates/components/ember-youtube.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          dom.setAttribute(el1, "class", "EmberYoutube-time");
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("/");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element2, 1, 1);
          morphs[1] = dom.createMorphAt(element2, 3, 3);
          return morphs;
        },
        statements: [["content", "currentTimeFormatted", ["loc", [null, [14, 3], [14, 27]]]], ["content", "durationFormatted", ["loc", [null, [14, 28], [14, 49]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 1
            },
            "end": {
              "line": 22,
              "column": 1
            }
          },
          "moduleName": "frontend/templates/components/ember-youtube.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          dom.setAttribute(el1, "class", "EmberYoutube-progress");
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("progress");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element1, 'value');
          morphs[1] = dom.createAttrMorph(element1, 'max');
          return morphs;
        },
        statements: [["attribute", "value", ["get", "currentTimeValue", ["loc", [null, [20, 21], [20, 37]]]]], ["attribute", "max", ["get", "durationValue", ["loc", [null, [20, 46], [20, 59]]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 1
            },
            "end": {
              "line": 33,
              "column": 1
            }
          },
          "moduleName": "frontend/templates/components/ember-youtube.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          dom.setAttribute(el1, "class", "EmberYoutube-debug");
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("code");
          var el3 = dom.createTextNode("\n				ytid: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				playerState: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				isMuted: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				isPlaying: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("br");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n			");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(element0, 1, 1);
          morphs[1] = dom.createMorphAt(element0, 4, 4);
          morphs[2] = dom.createMorphAt(element0, 7, 7);
          morphs[3] = dom.createMorphAt(element0, 10, 10);
          return morphs;
        },
        statements: [["content", "ytid", ["loc", [null, [27, 10], [27, 18]]]], ["content", "playerState", ["loc", [null, [28, 17], [28, 32]]]], ["content", "isMuted", ["loc", [null, [29, 13], [29, 24]]]], ["content", "isPlaying", ["loc", [null, [30, 15], [30, 28]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 39,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/ember-youtube.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "EmberYoutube-player");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "EmberYoutube-controls");
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "EmberYoutube-yield");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element6 = dom.childAt(fragment, [2]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(element6, 1, 1);
        morphs[1] = dom.createMorphAt(element6, 3, 3);
        morphs[2] = dom.createMorphAt(element6, 5, 5);
        morphs[3] = dom.createMorphAt(element6, 7, 7);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        return morphs;
      },
      statements: [["block", "if", [["get", "showControls", ["loc", [null, [5, 7], [5, 19]]]]], [], 0, null, ["loc", [null, [5, 1], [10, 8]]]], ["block", "if", [["get", "showTime", ["loc", [null, [12, 7], [12, 15]]]]], [], 1, null, ["loc", [null, [12, 1], [16, 8]]]], ["block", "if", [["get", "showProgress", ["loc", [null, [18, 7], [18, 19]]]]], [], 2, null, ["loc", [null, [18, 1], [22, 8]]]], ["block", "if", [["get", "showDebug", ["loc", [null, [24, 7], [24, 16]]]]], [], 3, null, ["loc", [null, [24, 1], [33, 8]]]], ["content", "yield", ["loc", [null, [37, 1], [37, 10]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("frontend/templates/components/liquid-bind", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.11",
              "loc": {
                "source": null,
                "start": {
                  "line": 5,
                  "column": 4
                },
                "end": {
                  "line": 7,
                  "column": 4
                }
              },
              "moduleName": "frontend/templates/components/liquid-bind.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["inline", "yield", [["get", "version", ["loc", [null, [6, 15], [6, 22]]]]], [], ["loc", [null, [6, 6], [6, 26]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.11",
              "loc": {
                "source": null,
                "start": {
                  "line": 7,
                  "column": 4
                },
                "end": {
                  "line": 9,
                  "column": 4
                }
              },
              "moduleName": "frontend/templates/components/liquid-bind.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["content", "version", ["loc", [null, [8, 6], [8, 20]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 11,
                "column": 0
              }
            },
            "moduleName": "frontend/templates/components/liquid-bind.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [5, 11], [5, 19]]]]], [], 0, 1, ["loc", [null, [5, 4], [9, 12]]]]],
          locals: ["version"],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/liquid-bind.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "liquid-versions", [], ["value", ["subexpr", "@mut", [["get", "attrs.value", ["loc", [null, [2, 28], [2, 39]]]]], [], []], "use", ["subexpr", "@mut", [["get", "use", ["loc", [null, [2, 44], [2, 47]]]]], [], []], "outletName", ["subexpr", "@mut", [["get", "attrs.outletName", ["loc", [null, [3, 32], [3, 48]]]]], [], []], "name", "liquid-bind", "renderWhenFalse", true, "class", ["subexpr", "@mut", [["get", "class", ["loc", [null, [4, 67], [4, 72]]]]], [], []]], 0, null, ["loc", [null, [2, 2], [11, 22]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@1.13.11",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 25,
                    "column": 6
                  },
                  "end": {
                    "line": 27,
                    "column": 6
                  }
                },
                "moduleName": "frontend/templates/components/liquid-bind.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                dom.insertBoundary(fragment, 0);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [["inline", "yield", [["get", "version", ["loc", [null, [26, 17], [26, 24]]]]], [], ["loc", [null, [26, 8], [26, 28]]]]],
              locals: [],
              templates: []
            };
          })();
          var child1 = (function () {
            return {
              meta: {
                "revision": "Ember@1.13.11",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 27,
                    "column": 6
                  },
                  "end": {
                    "line": 29,
                    "column": 6
                  }
                },
                "moduleName": "frontend/templates/components/liquid-bind.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                dom.insertBoundary(fragment, 0);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [["content", "version", ["loc", [null, [28, 8], [28, 22]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@1.13.11",
              "loc": {
                "source": null,
                "start": {
                  "line": 21,
                  "column": 4
                },
                "end": {
                  "line": 31,
                  "column": 4
                }
              },
              "moduleName": "frontend/templates/components/liquid-bind.hbs"
            },
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [25, 13], [25, 21]]]]], [], 0, 1, ["loc", [null, [25, 6], [29, 14]]]]],
            locals: ["version"],
            templates: [child0, child1]
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 2
              },
              "end": {
                "line": 32,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/liquid-bind.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "liquid-versions", [], ["value", ["subexpr", "@mut", [["get", "attrs.value", ["loc", [null, [21, 30], [21, 41]]]]], [], []], "notify", ["subexpr", "@mut", [["get", "container", ["loc", [null, [21, 49], [21, 58]]]]], [], []], "use", ["subexpr", "@mut", [["get", "use", ["loc", [null, [21, 63], [21, 66]]]]], [], []], "outletName", ["subexpr", "@mut", [["get", "attrs.outletName", ["loc", [null, [22, 34], [22, 50]]]]], [], []], "name", "liquid-bind", "renderWhenFalse", true], 0, null, ["loc", [null, [21, 4], [31, 26]]]]],
          locals: ["container"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 0
            },
            "end": {
              "line": 33,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/liquid-bind.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "liquid-container", [], ["id", ["subexpr", "@mut", [["get", "id", ["loc", [null, [14, 9], [14, 11]]]]], [], []], "class", ["subexpr", "@mut", [["get", "class", ["loc", [null, [15, 12], [15, 17]]]]], [], []], "growDuration", ["subexpr", "@mut", [["get", "growDuration", ["loc", [null, [16, 19], [16, 31]]]]], [], []], "growPixelsPerSecond", ["subexpr", "@mut", [["get", "growPixelsPerSecond", ["loc", [null, [17, 26], [17, 45]]]]], [], []], "growEasing", ["subexpr", "@mut", [["get", "growEasing", ["loc", [null, [18, 17], [18, 27]]]]], [], []], "enableGrowth", ["subexpr", "@mut", [["get", "enableGrowth", ["loc", [null, [19, 19], [19, 31]]]]], [], []]], 0, null, ["loc", [null, [13, 2], [32, 25]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 34,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/liquid-bind.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "containerless", ["loc", [null, [1, 6], [1, 19]]]]], [], 0, 1, ["loc", [null, [1, 0], [33, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("frontend/templates/components/liquid-container", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 14
          }
        },
        "moduleName": "frontend/templates/components/liquid-container.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["get", "this", ["loc", [null, [1, 8], [1, 12]]]]], [], ["loc", [null, [1, 0], [1, 14]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/components/liquid-if", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.11",
              "loc": {
                "source": null,
                "start": {
                  "line": 4,
                  "column": 4
                },
                "end": {
                  "line": 6,
                  "column": 4
                }
              },
              "moduleName": "frontend/templates/components/liquid-if.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["content", "yield", ["loc", [null, [5, 6], [5, 15]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.11",
              "loc": {
                "source": null,
                "start": {
                  "line": 6,
                  "column": 4
                },
                "end": {
                  "line": 8,
                  "column": 4
                }
              },
              "moduleName": "frontend/templates/components/liquid-if.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "yield", [], ["to", "inverse"], ["loc", [null, [7, 6], [7, 28]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 9,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/liquid-if.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "valueVersion", ["loc", [null, [4, 10], [4, 22]]]]], [], 0, 1, ["loc", [null, [4, 4], [8, 11]]]]],
          locals: ["valueVersion"],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/liquid-if.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "liquid-versions", [], ["value", ["subexpr", "@mut", [["get", "showFirstBlock", ["loc", [null, [2, 27], [2, 41]]]]], [], []], "name", ["subexpr", "@mut", [["get", "helperName", ["loc", [null, [2, 47], [2, 57]]]]], [], []], "use", ["subexpr", "@mut", [["get", "use", ["loc", [null, [3, 27], [3, 30]]]]], [], []], "renderWhenFalse", ["subexpr", "hasBlock", ["inverse"], [], ["loc", [null, [3, 47], [3, 67]]]], "class", ["subexpr", "@mut", [["get", "class", ["loc", [null, [3, 74], [3, 79]]]]], [], []]], 0, null, ["loc", [null, [2, 2], [9, 22]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@1.13.11",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 21,
                    "column": 6
                  },
                  "end": {
                    "line": 23,
                    "column": 6
                  }
                },
                "moduleName": "frontend/templates/components/liquid-if.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("        ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                return morphs;
              },
              statements: [["content", "yield", ["loc", [null, [22, 8], [22, 17]]]]],
              locals: [],
              templates: []
            };
          })();
          var child1 = (function () {
            return {
              meta: {
                "revision": "Ember@1.13.11",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 23,
                    "column": 6
                  },
                  "end": {
                    "line": 25,
                    "column": 6
                  }
                },
                "moduleName": "frontend/templates/components/liquid-if.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("        ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                return morphs;
              },
              statements: [["inline", "yield", [], ["to", "inverse"], ["loc", [null, [24, 8], [24, 30]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@1.13.11",
              "loc": {
                "source": null,
                "start": {
                  "line": 19,
                  "column": 4
                },
                "end": {
                  "line": 26,
                  "column": 4
                }
              },
              "moduleName": "frontend/templates/components/liquid-if.hbs"
            },
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "if", [["get", "valueVersion", ["loc", [null, [21, 12], [21, 24]]]]], [], 0, 1, ["loc", [null, [21, 6], [25, 13]]]]],
            locals: ["valueVersion"],
            templates: [child0, child1]
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 2
              },
              "end": {
                "line": 27,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/liquid-if.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "liquid-versions", [], ["value", ["subexpr", "@mut", [["get", "showFirstBlock", ["loc", [null, [19, 29], [19, 43]]]]], [], []], "notify", ["subexpr", "@mut", [["get", "container", ["loc", [null, [19, 51], [19, 60]]]]], [], []], "name", ["subexpr", "@mut", [["get", "helperName", ["loc", [null, [19, 66], [19, 76]]]]], [], []], "use", ["subexpr", "@mut", [["get", "use", ["loc", [null, [20, 8], [20, 11]]]]], [], []], "renderWhenFalse", ["subexpr", "hasBlock", ["inverse"], [], ["loc", [null, [20, 28], [20, 48]]]]], 0, null, ["loc", [null, [19, 4], [26, 24]]]]],
          locals: ["container"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 28,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/liquid-if.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "liquid-container", [], ["id", ["subexpr", "@mut", [["get", "id", ["loc", [null, [12, 9], [12, 11]]]]], [], []], "class", ["subexpr", "@mut", [["get", "class", ["loc", [null, [13, 12], [13, 17]]]]], [], []], "growDuration", ["subexpr", "@mut", [["get", "growDuration", ["loc", [null, [14, 19], [14, 31]]]]], [], []], "growPixelsPerSecond", ["subexpr", "@mut", [["get", "growPixelsPerSecond", ["loc", [null, [15, 26], [15, 45]]]]], [], []], "growEasing", ["subexpr", "@mut", [["get", "growEasing", ["loc", [null, [16, 17], [16, 27]]]]], [], []], "enableGrowth", ["subexpr", "@mut", [["get", "enableGrowth", ["loc", [null, [17, 19], [17, 31]]]]], [], []]], 0, null, ["loc", [null, [11, 2], [27, 23]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 29,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/liquid-if.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "containerless", ["loc", [null, [1, 6], [1, 19]]]]], [], 0, 1, ["loc", [null, [1, 0], [28, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("frontend/templates/components/liquid-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/liquid-modal.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "role", "dialog");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(4);
            morphs[0] = dom.createAttrMorph(element0, 'class');
            morphs[1] = dom.createAttrMorph(element0, 'aria-labelledby');
            morphs[2] = dom.createAttrMorph(element0, 'aria-label');
            morphs[3] = dom.createMorphAt(element0, 1, 1);
            return morphs;
          },
          statements: [["attribute", "class", ["concat", ["lf-dialog ", ["get", "cc.options.dialogClass", ["loc", [null, [3, 28], [3, 50]]]]]]], ["attribute", "aria-labelledby", ["get", "cc.options.ariaLabelledBy", ["loc", [null, [3, 86], [3, 111]]]]], ["attribute", "aria-label", ["get", "cc.options.ariaLabel", ["loc", [null, [3, 127], [3, 147]]]]], ["inline", "lf-vue", [["get", "cc.view", ["loc", [null, [4, 15], [4, 22]]]]], ["dismiss", "dismiss"], ["loc", [null, [4, 6], [4, 42]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/liquid-modal.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [["block", "lm-container", [], ["action", "escape", "clickAway", "outsideClick"], 0, null, ["loc", [null, [2, 2], [6, 19]]]], ["content", "lf-overlay", ["loc", [null, [7, 2], [7, 16]]]]],
        locals: ["cc"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/liquid-modal.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "liquid-versions", [], ["name", "liquid-modal", "value", ["subexpr", "@mut", [["get", "currentContext", ["loc", [null, [1, 45], [1, 59]]]]], [], []], "renderWhenFalse", false], 0, null, ["loc", [null, [1, 0], [8, 20]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/components/liquid-outlet", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.11",
              "loc": {
                "source": null,
                "start": {
                  "line": 15,
                  "column": 6
                },
                "end": {
                  "line": 17,
                  "column": 6
                }
              },
              "moduleName": "frontend/templates/components/liquid-outlet.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["inline", "outlet", [["get", "outletName", ["loc", [null, [16, 17], [16, 27]]]]], [], ["loc", [null, [16, 8], [16, 29]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 19,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/liquid-outlet.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "set-outlet-state", [["get", "outletName", ["loc", [null, [15, 26], [15, 36]]]], ["get", "version.outletState", ["loc", [null, [15, 37], [15, 56]]]]], [], 0, null, ["loc", [null, [15, 6], [17, 28]]]]],
          locals: ["version"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 20,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/liquid-outlet.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "liquid-bind", [["get", "outletState", ["loc", [null, [2, 17], [2, 28]]]]], ["id", ["subexpr", "@mut", [["get", "id", ["loc", [null, [3, 9], [3, 11]]]]], [], []], "class", ["subexpr", "@mut", [["get", "class", ["loc", [null, [4, 12], [4, 17]]]]], [], []], "use", ["subexpr", "@mut", [["get", "use", ["loc", [null, [5, 10], [5, 13]]]]], [], []], "name", "liquid-outlet", "outletName", ["subexpr", "@mut", [["get", "outletName", ["loc", [null, [7, 17], [7, 27]]]]], [], []], "containerless", ["subexpr", "@mut", [["get", "containerless", ["loc", [null, [8, 20], [8, 33]]]]], [], []], "growDuration", ["subexpr", "@mut", [["get", "growDuration", ["loc", [null, [9, 19], [9, 31]]]]], [], []], "growPixelsPerSecond", ["subexpr", "@mut", [["get", "growPixelsPerSecond", ["loc", [null, [10, 26], [10, 45]]]]], [], []], "growEasing", ["subexpr", "@mut", [["get", "growEasing", ["loc", [null, [11, 17], [11, 27]]]]], [], []], "enableGrowth", ["subexpr", "@mut", [["get", "enableGrowth", ["loc", [null, [12, 19], [12, 31]]]]], [], []]], 0, null, ["loc", [null, [2, 2], [19, 20]]]]],
        locals: ["outletState"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/liquid-outlet.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "get-outlet-state", [["get", "outletName", ["loc", [null, [1, 21], [1, 31]]]]], [], 0, null, ["loc", [null, [1, 0], [20, 21]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/components/liquid-versions", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.11",
              "loc": {
                "source": null,
                "start": {
                  "line": 3,
                  "column": 4
                },
                "end": {
                  "line": 5,
                  "column": 4
                }
              },
              "moduleName": "frontend/templates/components/liquid-versions.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["inline", "yield", [["get", "version.value", ["loc", [null, [4, 14], [4, 27]]]]], [], ["loc", [null, [4, 6], [4, 31]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/liquid-versions.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "liquid-child", [], ["version", ["subexpr", "@mut", [["get", "version", ["loc", [null, [3, 28], [3, 35]]]]], [], []], "liquidChildDidRender", "childDidRender", "class", ["subexpr", "@mut", [["get", "class", ["loc", [null, [3, 80], [3, 85]]]]], [], []]], 0, null, ["loc", [null, [3, 4], [5, 21]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/liquid-versions.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "version.shouldRender", ["loc", [null, [2, 8], [2, 28]]]]], [], 0, null, ["loc", [null, [2, 2], [6, 9]]]]],
        locals: ["version"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/liquid-versions.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "versions", ["loc", [null, [1, 8], [1, 16]]]]], ["key", "@identity"], 0, null, ["loc", [null, [1, 0], [7, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/components/liquid-with", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/liquid-with.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "version", ["loc", [null, [3, 13], [3, 20]]]]], [], ["loc", [null, [3, 4], [3, 24]]]]],
          locals: ["version"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/liquid-with.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "liquid-versions", [], ["value", ["subexpr", "@mut", [["get", "attrs.value", ["loc", [null, [2, 28], [2, 39]]]]], [], []], "use", ["subexpr", "@mut", [["get", "use", ["loc", [null, [2, 44], [2, 47]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [2, 53], [2, 57]]]]], [], []], "class", ["subexpr", "@mut", [["get", "class", ["loc", [null, [2, 64], [2, 69]]]]], [], []]], 0, null, ["loc", [null, [2, 2], [4, 23]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.11",
              "loc": {
                "source": null,
                "start": {
                  "line": 14,
                  "column": 4
                },
                "end": {
                  "line": 16,
                  "column": 4
                }
              },
              "moduleName": "frontend/templates/components/liquid-with.hbs"
            },
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["inline", "yield", [["get", "version", ["loc", [null, [15, 15], [15, 22]]]]], [], ["loc", [null, [15, 6], [15, 26]]]]],
            locals: ["version"],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 2
              },
              "end": {
                "line": 17,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/liquid-with.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "liquid-versions", [], ["value", ["subexpr", "@mut", [["get", "attrs.value", ["loc", [null, [14, 30], [14, 41]]]]], [], []], "notify", ["subexpr", "@mut", [["get", "container", ["loc", [null, [14, 49], [14, 58]]]]], [], []], "use", ["subexpr", "@mut", [["get", "use", ["loc", [null, [14, 63], [14, 66]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [14, 72], [14, 76]]]]], [], []]], 0, null, ["loc", [null, [14, 4], [16, 25]]]]],
          locals: ["container"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 18,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/liquid-with.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "liquid-container", [], ["id", ["subexpr", "@mut", [["get", "id", ["loc", [null, [7, 9], [7, 11]]]]], [], []], "class", ["subexpr", "@mut", [["get", "class", ["loc", [null, [8, 12], [8, 17]]]]], [], []], "growDuration", ["subexpr", "@mut", [["get", "growDuration", ["loc", [null, [9, 19], [9, 31]]]]], [], []], "growPixelsPerSecond", ["subexpr", "@mut", [["get", "growPixelsPerSecond", ["loc", [null, [10, 26], [10, 45]]]]], [], []], "growEasing", ["subexpr", "@mut", [["get", "growEasing", ["loc", [null, [11, 17], [11, 27]]]]], [], []], "enableGrowth", ["subexpr", "@mut", [["get", "enableGrowth", ["loc", [null, [12, 19], [12, 31]]]]], [], []]], 0, null, ["loc", [null, [6, 2], [17, 23]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/liquid-with.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "containerless", ["loc", [null, [1, 6], [1, 19]]]]], [], 0, 1, ["loc", [null, [1, 0], [18, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("frontend/templates/components/main-navbar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 749
          }
        },
        "moduleName": "frontend/templates/components/main-navbar.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "navigation-wrapper col-md-12 col-xs-12");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container");
        var el3 = dom.createElement("nav");
        dom.setAttribute(el3, "style", "height:50px;z-index:30000");
        dom.setAttribute(el3, "class", "col-md-12");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "id", "navigation-menu");
        dom.setAttribute(el4, "class", "navbar collapse navbar-collapse col-md-11 pull-left");
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5, "data-hook", "");
        dom.setAttribute(el5, "class", "nav navbar-nav col-md-8 col-sm-8 col-xs-12");
        var el6 = dom.createElement("li");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5, "class", "nav navbar-nav navbar-right col-md-4 col-sm-8 col-xs-12");
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "id", "home-link");
        dom.setAttribute(el6, "data-hook", "");
        var el7 = dom.createElement("a");
        dom.setAttribute(el7, "href", "/shop");
        var el8 = dom.createTextNode("L&G Shop");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "id", "link-to-cart");
        dom.setAttribute(el6, "data-hook", "");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 0, 0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [0]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(element0, 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [0]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [1]), 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [2]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [3]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element2, [4]), 0, 0);
        morphs[6] = dom.createMorphAt(dom.childAt(element1, [1, 1]), 0, 0);
        return morphs;
      },
      statements: [["inline", "partial", ["partials/menu-button"], [], ["loc", [null, [1, 132], [1, 166]]]], ["inline", "link-to", ["Home", "index"], [], ["loc", [null, [1, 324], [1, 350]]]], ["inline", "link-to", ["Why L&G", "why"], [], ["loc", [null, [1, 359], [1, 386]]]], ["inline", "link-to", ["Get Training", "training"], [], ["loc", [null, [1, 395], [1, 432]]]], ["inline", "link-to", ["Get Vegucated", "vegucated"], [], ["loc", [null, [1, 441], [1, 480]]]], ["inline", "link-to", ["Join Our Team", "team"], [], ["loc", [null, [1, 489], [1, 523]]]], ["content", "fetch_cart", ["loc", [null, [1, 701], [1, 715]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/components/modal-dialog", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 485
          }
        },
        "moduleName": "frontend/templates/components/modal-dialog.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "type", "button");
        dom.setAttribute(el1, "class", "close");
        var el2 = dom.createElement("a");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "remove glyphicon glyphicon-remove-sign");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modal-header");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-title");
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3, "class", "text-center text-success");
        var el4 = dom.createTextNode("Download Our App");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("img");
        dom.setAttribute(el1, "style", "margin:auto;");
        dom.setAttribute(el1, "src", "http://lg.jolart.com/assets/frontend/images/iphone6.png");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modal-footer");
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "src", "http://lg.jolart.com/assets/frontend/images/app-store-icon.png");
        dom.setAttribute(el2, "class", "opaque-hover");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "src", "http://lg.jolart.com/assets/frontend/images/google-play-icon.png");
        dom.setAttribute(el2, "class", "opaque-hover");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["element", "action", ["toggleModal"], ["on", "click"], ["loc", [null, [1, 22], [1, 57]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('frontend/templates/components/tether-dialog', ['exports', 'ember-modal-dialog/templates/components/tether-dialog'], function (exports, _emberModalDialogTemplatesComponentsTetherDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogTemplatesComponentsTetherDialog['default'];
    }
  });
});
define("frontend/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 66
            },
            "end": {
              "line": 1,
              "column": 141
            }
          },
          "moduleName": "frontend/templates/index.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["inline", "partial", ["partials/app-modalbody"], [], ["loc", [null, [1, 105], [1, 141]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 486
          }
        },
        "moduleName": "frontend/templates/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("main");
        dom.setAttribute(el1, "class", "cd-main-content navigation-content liquid-container");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-fixed-bg cd-bg-3");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-scrolling-bg cd-color-1");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "cd-container");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-fixed-bg cd-bg-6");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(element0, 0, 0);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createMorphAt(element0, 2, 2);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [4, 0]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element0, [5]), 0, 0);
        return morphs;
      },
      statements: [["block", "app-modal", [], ["translucentOverlay", false], 0, null, ["loc", [null, [1, 66], [1, 155]]]], ["inline", "partial", ["partials/fixed-bg-1"], [], ["loc", [null, [1, 155], [1, 188]]]], ["inline", "partial", ["partials/scrolling-bg-1"], [], ["loc", [null, [1, 188], [1, 225]]]], ["inline", "partial", ["partials/goals-form"], [], ["loc", [null, [1, 258], [1, 291]]]], ["inline", "partial", ["partials/goals"], [], ["loc", [null, [1, 363], [1, 391]]]], ["inline", "partial", ["partials/call-to-action"], [], ["loc", [null, [1, 436], [1, 473]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/partials/-about", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 5124
          }
        },
        "moduleName": "frontend/templates/partials/-about.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("My Journey Down The Rabbit-hole");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("i");
        var el3 = dom.createTextNode("by Jarrod L'Estrange - Founder of Lean & Green");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("img");
        dom.setAttribute(el1, "src", "http://lg.jolart.com/assets/frontend/images/posing.jpg");
        dom.setAttribute(el1, "class", "img-thumbnail pull-left");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("It has been said that when the student is ready, the teacher will appear. Well my teacher came to me in the form of a gym friend, passionate cancer survivor and reformed meat eater by the name of Collette Jeffs.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Collette started talking to me about why I made the food choices that I did. She lent me the DVD ‘Forks Over Knives’ and sent me the YouTube link to watch ‘Earthlings’. Watching these opened my eyes and began my ‘Journey Down The Rabbit Hole’ as I like to call it. They made me question the impact on my health, the environment and the animals of continuing to eat what I was. And I decided right there and then not to climb out of the big gaping hole that had opened up around me and go back to my ‘normal’ way of eating. I decided to follow the white rabbit (Alice In Wonderland reference) and expose myself to a new world of compassionate choices.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        dom.setAttribute(el1, "class", "heading");
        var el2 = dom.createTextNode("A Brave New World");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("My decision to stop eating animals shocked a lot of people around me. And replacing meat, whey protein powders and eggs with other alternatives and choosing non-animal products for my daily living felt quite daunting.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("img");
        dom.setAttribute(el1, "src", "http://lg.jolart.com/assets/frontend/images/trophy-shot.jpg");
        dom.setAttribute(el1, "class", "img-thumbnail pull-right");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("As a natural bodybuilder these foods had been especially important in my previous nutrition plans to drop bodyfat and maintain/build muscle for my competitions. And my brain went to mush just trying to sort through all the information before me and work out if I could still achieve what I wanted to in bodybuilding. You see, I had made up my mind that 2013 was the year I was going to give my all to win my first overall natural bodybuilding title after 4 years of competing. I had won many of my divisions before but never an overall title. So changing my nutrition strategy so dramatically felt like a really big deal!");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        dom.setAttribute(el1, "class", "heading");
        var el2 = dom.createTextNode("Transformation");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("What I suggest is visiting ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "style", "display:inline-block;");
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "style", "display:inline;text-decoration: none;");
        dom.setAttribute(el3, "href", "http://www.greatveganathletes.com");
        dom.setAttribute(el3, "target", "blank");
        var el4 = dom.createTextNode("www.greatveganathletes.com.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "style", "display:inline-block;");
        var el2 = dom.createTextNode("I'm sure these people had the same thoughts, and yet they overcame them to experience greatness in their chosen sport because what happened next put all my concerns to rest. Within just a few weeks of testing and then implementing my own plant powered nutrition plan, I found that my strength actually went up, my body fat levels came down, and my energy and recovery skyrocketed. I felt lighter inside and was enjoying being an advocate for these changes also.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("So by conquering my fears of muscle loss and worries of reduced performance, I actually began to achieve new personal bests in the gym using these healthier and ethically better nutrition choices.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("And then it happened! After many months of commitment, on the 15th September, 2013 I won my first overall natural bodybuilding title the biggest and best I’ve ever looked on stage. Seriously, who would have thought hey?! Definitely not me!");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        dom.setAttribute(el1, "class", "heading");
        var el2 = dom.createTextNode("Standing Up For Yourself");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("The truth is we have all grown up with a food industry and government that promote the health benefits of consuming a lot of meat and dairy. The majority of people who renounce eating animals and their by-products were once consuming a lot of them. I myself thought it was impossible to get good results as a natural bodybuilder and to stay healthy in general without consuming these foods. It makes you realize just how important it is to question the things we are led to believe are healthy by the big corporations that monopolize our T.V screens, magazines and billboards, and a processed food addicted, emotionally disconnected society.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Now for anyone reading this who hasn't already begun their plant-based journey, know that it is a choice that has its challenges. You will be bucking a system of animal use and abuse that has been ingrained in our society for way too long. You will suddenly make people feel uncomfortable about what's on their plate when they see and hear why it's not on yours.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        dom.setAttribute(el1, "class", "heading");
        var el2 = dom.createTextNode("Courage Of Conviction");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("There are already over 400,000,000 vegetarians and vegans in the world today. But our world needs more people who are willing to stand out from the crowd and help others to grow in compassion. Our world needs more people who will speak up for the voiceless, the animals. Our world needs more people who will offer non-judgmental encouragement and help others along their plant-based journey, just as I try my best to do.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("So if you are ready to open your eyes (if you haven't already), here are my words of encouragement. Get Vegucated! And once you are, stay strong in your conviction. Because I know that you too will find that eating a plant powered diet is the healthiest and best decision you will ever make for your body, the animals, our environment, Our World!");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-app-modalbody", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 343
          }
        },
        "moduleName": "frontend/templates/partials/-app-modalbody.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modal-header");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-title");
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3, "class", "text-center text-success");
        var el4 = dom.createTextNode("Download Our App");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("img");
        dom.setAttribute(el1, "style", "margin:auto;");
        dom.setAttribute(el1, "src", "http://lg.jolart.com/assets/frontend/images/iphone6.png");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modal-footer");
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "src", "http://lg.jolart.com/assets/frontend/images/app-store-icon.png");
        dom.setAttribute(el2, "class", "opaque-hover");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "src", "http://lg.jolart.com/assets/frontend/images/google-play-icon.png");
        dom.setAttribute(el2, "class", "opaque-hover");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-call-to-action", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 442
          }
        },
        "moduleName": "frontend/templates/partials/-call-to-action.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "call-to-action");
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "style", "margin-top:0;line-height:1.1em");
        var el3 = dom.createTextNode("So let's stop you procrastinating");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "style", "font-size:3em;padding:1em;line-height:1.1em");
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("Start achieving and succeeding");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "style", "margin-bottom:10px");
        dom.setAttribute(el2, "class", "jumbo");
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("For a no obligation chat about where you are on your journey");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Contact Jarrod today");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("address");
        var el4 = dom.createTextNode("Phone: 0400 792 594");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("Email: jarrod@leangreen.com.au");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-cart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/partials/-cart.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createUnsafeMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "fetch_cart", ["loc", [null, [1, 0], [1, 16]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-fixed-bg-1", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 275
          }
        },
        "moduleName": "frontend/templates/partials/-fixed-bg-1.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "cd-fixed-bg cd-bg-1");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "container");
        var el4 = dom.createElement("h1");
        dom.setAttribute(el4, "style", "font-weight:bold;margin-top:0;padding-top:1em;line-height:1.4em");
        dom.setAttribute(el4, "class", "text-center");
        var el5 = dom.createTextNode("	Let's Get You Fitter and Healthier Sooner!");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0, 0]), 1, 1);
        return morphs;
      },
      statements: [["inline", "partial", ["partials/shopping-carousel"], [], ["loc", [null, [1, 217], [1, 257]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-goals-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 1436
          }
        },
        "moduleName": "frontend/templates/partials/-goals-form.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        dom.setAttribute(el1, "id", "goals-form");
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "class", "form-heading");
        var el3 = dom.createTextNode("What Would You Like To Improve?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("table");
        var el3 = dom.createElement("tr");
        var el4 = dom.createElement("td");
        dom.setAttribute(el4, "class", "checkbox-q");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "checkboxFive");
        var el6 = dom.createElement("input");
        dom.setAttribute(el6, "id", "checkboxFiveInput-goals-1");
        dom.setAttribute(el6, "name", "1");
        dom.setAttribute(el6, "type", "checkbox");
        dom.setAttribute(el6, "value", "1");
        dom.setAttribute(el6, "checked", "checked");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "checkboxFiveInput-goals-1");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4, "class", "checkbox-text");
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("General Health");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createElement("td");
        dom.setAttribute(el4, "class", "checkbox-q");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "checkboxFive");
        var el6 = dom.createElement("input");
        dom.setAttribute(el6, "id", "checkboxFiveInput-goals-2");
        dom.setAttribute(el6, "name", "2");
        dom.setAttribute(el6, "type", "checkbox");
        dom.setAttribute(el6, "value", "1");
        dom.setAttribute(el6, "checked", "checked");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "checkboxFiveInput-goals-2");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4, "class", "checkbox-text");
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Strength");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createElement("td");
        dom.setAttribute(el4, "class", "checkbox-q");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "checkboxFive");
        var el6 = dom.createElement("input");
        dom.setAttribute(el6, "id", "checkboxFiveInput-goals-3");
        dom.setAttribute(el6, "name", "3");
        dom.setAttribute(el6, "type", "checkbox");
        dom.setAttribute(el6, "value", "1");
        dom.setAttribute(el6, "checked", "checked");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "checkboxFiveInput-goals-3");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4, "class", "checkbox-text");
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Fitness and Stamina");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createElement("td");
        dom.setAttribute(el4, "class", "checkbox-q");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "checkboxFive");
        var el6 = dom.createElement("input");
        dom.setAttribute(el6, "id", "checkboxFiveInput-goals-4");
        dom.setAttribute(el6, "name", "4");
        dom.setAttribute(el6, "type", "checkbox");
        dom.setAttribute(el6, "value", "1");
        dom.setAttribute(el6, "checked", "checked");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "checkboxFiveInput-goals-4");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4, "class", "checkbox-text");
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Flexibility");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createElement("td");
        dom.setAttribute(el4, "class", "checkbox-q");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "checkboxFive");
        var el6 = dom.createElement("input");
        dom.setAttribute(el6, "id", "checkboxFiveInput-goals-5");
        dom.setAttribute(el6, "name", "5");
        dom.setAttribute(el6, "type", "checkbox");
        dom.setAttribute(el6, "value", "1");
        dom.setAttribute(el6, "checked", "checked");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "checkboxFiveInput-goals-5");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4, "class", "checkbox-text");
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Weight Control");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-goals", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 978
          }
        },
        "moduleName": "frontend/templates/partials/-goals.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "goals");
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode("well then...");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode("Let's work towards achieving some ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("Big, Fun & Specific goals together!");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "style", "display:block;margin:auto");
        dom.setAttribute(el2, "src", "http://lg.jolart.com/assets/frontend/images/jarrod-spot.jpg");
        dom.setAttribute(el2, "class", "img-thumbnail");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Achieve better health, strength, fitness and flexibility for the rest of your life.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Keep you accountable and consistent in creating sustainable exercise and nutrition habits.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Enhance your confidence and self-esteem and help you love who you are and what you see in the mirror.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Make you look great naked, no matter what your age.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Have more FUN and meet new friends. Learn to waterski, rockclimb, surf, run 5k without stopping, compete in an obstacle race, etc, etc.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Seriously, the goals our team are working and supporting each other towards are endless! And you can be a part of our LEAN & GREEN Team online via our community app or in person. The choice is yours and the options are endless!");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-jarrod", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 518
          }
        },
        "moduleName": "frontend/templates/partials/-jarrod.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-container");
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "src", "http://lg.jolart.com/assets/frontend/images/family-pic.jpg");
        dom.setAttribute(el3, "class", "img-thumbnail pull-left");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Jarrod is a devoted husband and father of three young girls, and an accomplished sportsperson having won titles in several different disciplines. With over 13 years experience coaching clients to achieve their greatest ambitions, Jarrod established LEAN & GREEN to provide everything his clients need to create a happier, healthier, better looking (and feeling) version of themselves.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-main-navbar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 729
          }
        },
        "moduleName": "frontend/templates/partials/-main-navbar.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "navigation-wrapper col-md-12 col-xs-12");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container");
        var el3 = dom.createElement("nav");
        dom.setAttribute(el3, "style", "height:50px;z-index:30000");
        dom.setAttribute(el3, "class", "col-md-12");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "id", "navigation-menu");
        dom.setAttribute(el4, "class", "navbar collapse navbar-collapse");
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5, "data-hook", "");
        dom.setAttribute(el5, "class", "nav navbar-nav col-md-8 col-sm-8 col-xs-12");
        var el6 = dom.createElement("li");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5, "class", "nav navbar-nav navbar-right col-md-4 col-sm-8 col-xs-12");
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "id", "home-link");
        dom.setAttribute(el6, "data-hook", "");
        var el7 = dom.createElement("a");
        dom.setAttribute(el7, "href", "/shop");
        var el8 = dom.createTextNode("L&G Shop");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "id", "link-to-cart");
        dom.setAttribute(el6, "data-hook", "");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 0, 0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [0]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(element0, 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [0]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [1]), 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [2]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [3]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element2, [4]), 0, 0);
        morphs[6] = dom.createMorphAt(dom.childAt(element1, [1, 1]), 0, 0);
        return morphs;
      },
      statements: [["inline", "partial", ["partials/menu-button"], [], ["loc", [null, [1, 132], [1, 166]]]], ["inline", "link-to", ["Home", "index"], [], ["loc", [null, [1, 304], [1, 330]]]], ["inline", "link-to", ["Why L&G", "why"], [], ["loc", [null, [1, 339], [1, 366]]]], ["inline", "link-to", ["Get Training", "training"], [], ["loc", [null, [1, 375], [1, 412]]]], ["inline", "link-to", ["Get Vegucated", "vegucated"], [], ["loc", [null, [1, 421], [1, 460]]]], ["inline", "link-to", ["Join Our Team", "team"], [], ["loc", [null, [1, 469], [1, 503]]]], ["content", "fetch_cart", ["loc", [null, [1, 681], [1, 695]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-menu-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 227
          }
        },
        "moduleName": "frontend/templates/partials/-menu-button.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "data-target", "#navigation-menu");
        dom.setAttribute(el1, "data-toggle", "collapse");
        dom.setAttribute(el1, "type", "button");
        dom.setAttribute(el1, "class", "navbar-toggle text-center col-xs-1 col-md-1");
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "class", "icon-bar");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "class", "icon-bar");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "class", "icon-bar");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-popular-products", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/partials/-popular-products.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-qualifications", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 410
          }
        },
        "moduleName": "frontend/templates/partials/-qualifications.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "cd-scrolling-bg cd-color-1");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-container");
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3, "class", "text-center");
        var el4 = dom.createTextNode("Trainer Qualifications");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("C.H.E.K Institute:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("C.H.E.K Practitioner Level III");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("CHEK Holistic Lifestyle Coach Level I");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("Other Training:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("BA(Hons) Sports Science & History Personal Fitness Trainer");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Postgraduate Certificate in Business Management");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-scrolling-bg-1", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 849
          }
        },
        "moduleName": "frontend/templates/partials/-scrolling-bg-1.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "cd-scrolling-bg cd-color-1");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-container");
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Want To Look Better?");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "src", "http://lg.jolart.com/assets/frontend/images/home-jump.png");
        dom.setAttribute(el3, "class", "img-thumbnail pull-right");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Lose weight, shed bodyfat, reshape your body, enhance your physique, gain weight, build muscle, compete in body sculpting, improve your posture, improve your movement grace.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Feel Better?");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Relieve stress, increase energy, enhance relaxation, rehabilitate injuries, achieve vibrant health, gain vitality, like what you see in the mirror, feel great naked.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Function Better?");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Run faster, jump higher, perform at your peak in sport, maximise your strength, improve your work performance, go home feeling alive, dance up a storm, improve your digestion, improve your nutrition and eating habits, enhance your libido and sexual performance.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-shop-modalbody", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 313
          }
        },
        "moduleName": "frontend/templates/partials/-shop-modalbody.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modal-header");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-title");
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3, "style", "font-weight:bold");
        dom.setAttribute(el3, "class", "text-center text-success");
        var el4 = dom.createTextNode("Shop L&G Products");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "style", "color:red;font-weight:bold");
        var el3 = dom.createTextNode("$10 OFF");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("your next purchase");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        dom.setAttribute(el2, "class", "text-success");
        var el3 = dom.createTextNode("use coupon code");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("GREENTEAM");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modal-footer");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-shopping-carousel", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 26,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/partials/-shopping-carousel.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("img");
          dom.setAttribute(el2, "class", "img-responsive");
          dom.setAttribute(el2, "src", "http://lg.jolart.com/assets/frontend/images/home-slide1.jpg");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("img");
          dom.setAttribute(el2, "class", "img-responsive");
          dom.setAttribute(el2, "src", "http://lg.jolart.com/assets/frontend/images/home-slide2.jpg");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("img");
          dom.setAttribute(el2, "class", "img-responsive");
          dom.setAttribute(el2, "src", "http://lg.jolart.com/assets/frontend/images/home-slide3.jpg");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("img");
          dom.setAttribute(el2, "class", "img-responsive");
          dom.setAttribute(el2, "src", "http://lg.jolart.com/assets/frontend/images/home-slide4.jpg");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 27,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/partials/-shopping-carousel.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "slick-carousel", [], ["class", "ember-carousel", "autoplay", true, "autoplaySpeed", 6000, "slidesToShow", 1, "slidesToScroll", 1, "infinite", true, "dots", false, "swipeToSlide", true, "touchMove", true, "initialSlide", 0, "speed", 500], 0, null, ["loc", [null, [2, 0], [26, 19]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/partials/-team", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 998
          }
        },
        "moduleName": "frontend/templates/partials/-team.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "team");
        var el2 = dom.createElement("h3");
        dom.setAttribute(el2, "class", "heading");
        var el3 = dom.createTextNode("Join Us");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "src", "http://lg.jolart.com/assets/frontend/images/team.jpg");
        dom.setAttribute(el2, "class", "img-thumbnail pull-right");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Join the LEAN & GREEN Team and gain access to fortnightly healthy habits coaching and accountability check-ins; online cooking demonstrations and nutrition education sessions; and exercise videos and complete workout programs to improve your shape, strength, fitness, flexibility and agility. You will also be sent a link to the best meditation digital recordings.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        dom.setAttribute(el2, "class", "heading");
        var el3 = dom.createTextNode("Something For Everyone");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "src", "http://lg.jolart.com/assets/frontend/images/lake-workout.jpg");
        dom.setAttribute(el2, "class", "img-thumbnail pull-left");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("If you live in the Brisbane area, make sure you come along to the club for private training sessions; sports massages; small group exersize sessions; and our weekend active adventures.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("LEAN & GREEN is changing the world one person at a time by providing the education, training, nutrition and support each individual needs to make healthy lifestyle improvements that stick.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-testworm", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/partials/-testworm.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  Hello world!\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/partials/-testworm.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "ember-wormhole", [], ["to", "destination"], 0, null, ["loc", [null, [1, 0], [3, 19]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/partials/-training", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 1973
          }
        },
        "moduleName": "frontend/templates/partials/-training.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Over the past 13 years working in the Health & Fitness Industry, I have seen (and still see) way too many personal trainers and gym members who think they are doing the right thing lying on benches, pushing out leg presses, and sitting curling dumbbells to isolate just a few muscles every weights workout. Whether they want to become one or not, they’ve simply fallen into the trap of training like a competitive bodybuilder. But even bodybuilders, like me, need to remain open to evolving their training methods for better results.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("What took me more than 10 years and countless courses to learn is that there is a more effective and time-efficient way to train that facilitates bigger changes to our physique in a much more FUNctional way.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        dom.setAttribute(el1, "class", "heading");
        var el2 = dom.createTextNode("Faster Results");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("The EVOLVED Training Method has the ability to improve your performance and body composition faster than traditional training methods. It does this by using predominantly multi‐joint, multi-plane, multi-tempo exercises that require:");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("The use of upper body, lower body and core at the same time increasing the demands on your cardiovascular system");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Better co-ordination, control and core stability to perform");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Improvements in your motor control and proprioception");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Subtle and active adjustments during the movements, therefore recruiting more stabilisers and muscle fibres");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        dom.setAttribute(el1, "class", "heading");
        var el2 = dom.createTextNode("Exercise Creativity");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("You could call it brain gym because your mental focus and awareness when performing these exercise is increased greatly. And because there is a greater level of difficulty, mastery and creativity involved, it keeps you more interested and consistent as well. Personally, I just find this style of training a lot more FUN and I think you will too.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("My aim is simple - I want to help you to EVOLVE your training by educating, demonstrating and empowering you to think outside the box with your workout programs.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/-vege", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 2135
          }
        },
        "moduleName": "frontend/templates/partials/-vege.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "cd-fixed-bg cd-bg-7");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-fixed-bg-content");
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3, "style", "margin-top:6em;");
        var el4 = dom.createTextNode("It’s time our community got");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("VEGUCATED");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" LEAN & GREEN style!");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "cd-scrolling-bg cd-color-1");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-container");
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3, "class", "heading");
        var el4 = dom.createTextNode("Evolved Nutrition");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "src", "http://lg.jolart.com/assets/frontend/images/fork-road.jpg");
        dom.setAttribute(el3, "class", "img-thumbnail pull-left");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("When most people think of the word diet, they think of something people go on for a short period of time to lose weight. However the actual meaning of the word diet would be better described as the kinds of foods a person or community habitually eat.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3, "class", "heading");
        var el4 = dom.createTextNode("What Are We Doing To Ourselves?");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("The Standard  Australian Diet (what most people in our community consider normal eating) is unfortunately far from optimal for long-term health and wellness. Our food courts and supermarkets are filled with overweight adults and kids. Our lunch boxes are full of white bread, processed ham, antibiotic and hormone-riddled meat, and packaged goods not even fit enough for an ant to eat.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "cd-fixed-bg cd-bg-5");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-fixed-bg-content");
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3, "style", "margin-top:6em;");
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("Cutting Edge Science");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("based on");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("Plant-Based Nutrition");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "cd-scrolling-bg cd-color-1");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-container");
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "src", "http://lg.jolart.com/assets/frontend/images/green-man.jpg");
        dom.setAttribute(el3, "class", "img-thumbnail pull-right");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("The LEAN & GREEN Nutrition Program will educate you on the most cutting edge science and research available on plant-based nutrition.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3, "class", "heading");
        var el4 = dom.createTextNode("Recipes For Healthy Meals");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("The L&G program will open you up to a new world of healthy, cruelty-free meal choices. It will help you to bring to life this new knowledge by providing you with the recipes, cooking classes and support you need to make this a sustainable healthy lifestyle choice, not just a diet!");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("This is a way of eating that aims to provide you with optimal health for life and control over your eating habits for good and you can be sure LEAN & GREEN will support you every step of the way!");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [3, 0, 0]);
        var morphs = new Array(1);
        morphs[0] = dom.createAttrMorph(element0, 'height');
        return morphs;
      },
      statements: [["attribute", "height", 300]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/team", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 157
          }
        },
        "moduleName": "frontend/templates/team.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "training");
        dom.setAttribute(el1, "class", "navigation-content");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-scrolling-bg cd-color-1");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "cd-container");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0, 0]), 0, 0);
        return morphs;
      },
      statements: [["inline", "partial", ["partials/team"], [], ["loc", [null, [1, 112], [1, 139]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/training/video", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 56
          }
        },
        "moduleName": "frontend/templates/training/video.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "ember-youtube", [], ["ytid", "cVfgLRjhkhc", "show-controls", false], ["loc", [null, [1, 0], [1, 56]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/training", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 327
          }
        },
        "moduleName": "frontend/templates/training.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "training");
        dom.setAttribute(el1, "class", "navigation-content");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-scrolling-bg cd-color-1");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "style", "margin-top:-35px;");
        dom.setAttribute(el3, "class", "cd-container");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "row");
        var el5 = dom.createElement("img");
        dom.setAttribute(el5, "src", "http://lg.jolart.com/assets/frontend/images/evolution_large.png");
        dom.setAttribute(el5, "class", "img-thumbnail img-center");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "videowrapper");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 0, 0, 0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [2]), 0, 0);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 256], [1, 266]]]], ["inline", "partial", ["partials/training"], [], ["loc", [null, [1, 272], [1, 303]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/vegucated", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 32
            },
            "end": {
              "line": 1,
              "column": 84
            }
          },
          "moduleName": "frontend/templates/vegucated.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["inline", "partial", ["partials/shop-modalbody"], [], ["loc", [null, [1, 47], [1, 84]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 132
          }
        },
        "moduleName": "frontend/templates/vegucated.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "navigation-content");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 0, 0);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        return morphs;
      },
      statements: [["block", "shop-modal", [], [], 0, null, ["loc", [null, [1, 32], [1, 99]]]], ["inline", "partial", ["partials/vege"], [], ["loc", [null, [1, 99], [1, 126]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/why", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 194
          }
        },
        "moduleName": "frontend/templates/why.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "navigation-content liquid-container");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "cd-scrolling-bg cd-color-1");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "cd-container");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("hr");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 0, 0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 0, 0);
        morphs[1] = dom.createMorphAt(element0, 2, 2);
        return morphs;
      },
      statements: [["inline", "partial", ["partials/about"], [], ["loc", [null, [1, 115], [1, 143]]]], ["inline", "partial", ["partials/jarrod"], [], ["loc", [null, [1, 147], [1, 176]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/transitions/cross-fade", ["exports", "liquid-fire"], function (exports, _liquidFire) {
  exports["default"] = crossFade;

  function crossFade() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    (0, _liquidFire.stop)(this.oldElement);
    return _liquidFire.Promise.all([(0, _liquidFire.animate)(this.oldElement, { opacity: 0 }, opts), (0, _liquidFire.animate)(this.newElement, { opacity: [opts.maxOpacity || 1, 0] }, opts)]);
  }

  // END-SNIPPET
});
// BEGIN-SNIPPET cross-fade-definition
define("frontend/transitions/default", ["exports", "liquid-fire"], function (exports, _liquidFire) {
  exports["default"] = defaultTransition;

  // This is what we run when no animation is asked for. It just sets
  // the newly-added element to visible (because we always start them
  // out invisible so that transitions can control their initial
  // appearance).

  function defaultTransition() {
    if (this.newElement) {
      this.newElement.css({ visibility: '' });
    }
    return _liquidFire.Promise.resolve();
  }
});
define("frontend/transitions/explode", ["exports", "ember", "liquid-fire"], function (exports, _ember, _liquidFire) {
  exports["default"] = explode;

  // Explode is not, by itself, an animation. It exists to pull apart
  // other elements so that each of the pieces can be targeted by
  // animations.

  function explode() {
    var _this = this;

    var seenElements = {};
    var sawBackgroundPiece = false;

    for (var _len = arguments.length, pieces = Array(_len), _key = 0; _key < _len; _key++) {
      pieces[_key] = arguments[_key];
    }

    var promises = pieces.map(function (piece) {
      if (piece.matchBy) {
        return matchAndExplode(_this, piece, seenElements);
      } else if (piece.pick || piece.pickOld || piece.pickNew) {
        return explodePiece(_this, piece, seenElements);
      } else {
        sawBackgroundPiece = true;
        return runAnimation(_this, piece);
      }
    });
    if (!sawBackgroundPiece) {
      if (this.newElement) {
        this.newElement.css({ visibility: '' });
      }
      if (this.oldElement) {
        this.oldElement.css({ visibility: 'hidden' });
      }
    }
    return _liquidFire.Promise.all(promises);
  }

  function explodePiece(context, piece, seen) {
    var childContext = _ember["default"].copy(context);
    var selectors = [piece.pickOld || piece.pick, piece.pickNew || piece.pick];
    var cleanupOld, cleanupNew;

    if (selectors[0] || selectors[1]) {
      cleanupOld = _explodePart(context, 'oldElement', childContext, selectors[0], seen);
      cleanupNew = _explodePart(context, 'newElement', childContext, selectors[1], seen);
      if (!cleanupOld && !cleanupNew) {
        return _liquidFire.Promise.resolve();
      }
    }

    return runAnimation(childContext, piece)["finally"](function () {
      if (cleanupOld) {
        cleanupOld();
      }
      if (cleanupNew) {
        cleanupNew();
      }
    });
  }

  function _explodePart(context, field, childContext, selector, seen) {
    var child, childOffset, width, height, newChild;
    var elt = context[field];

    childContext[field] = null;
    if (elt && selector) {
      child = elt.find(selector).filter(function () {
        var guid = _ember["default"].guidFor(this);
        if (!seen[guid]) {
          seen[guid] = true;
          return true;
        }
      });
      if (child.length > 0) {
        childOffset = child.offset();
        width = child.outerWidth();
        height = child.outerHeight();
        newChild = child.clone();

        // Hide the original element
        child.css({ visibility: 'hidden' });

        // If the original element's parent was hidden, hide our clone
        // too.
        if (elt.css('visibility') === 'hidden') {
          newChild.css({ visibility: 'hidden' });
        }
        newChild.appendTo(elt.parent());
        newChild.outerWidth(width);
        newChild.outerHeight(height);
        var newParentOffset = newChild.offsetParent().offset();
        newChild.css({
          position: 'absolute',
          top: childOffset.top - newParentOffset.top,
          left: childOffset.left - newParentOffset.left,
          margin: 0
        });

        // Pass the clone to the next animation
        childContext[field] = newChild;
        return function cleanup() {
          newChild.remove();
          child.css({ visibility: '' });
        };
      }
    }
  }

  function animationFor(context, piece) {
    var name, args, func;
    if (!piece.use) {
      throw new Error("every argument to the 'explode' animation must include a followup animation to 'use'");
    }
    if (_ember["default"].isArray(piece.use)) {
      name = piece.use[0];
      args = piece.use.slice(1);
    } else {
      name = piece.use;
      args = [];
    }
    if (typeof name === 'function') {
      func = name;
    } else {
      func = context.lookup(name);
    }
    return function () {
      return _liquidFire.Promise.resolve(func.apply(this, args));
    };
  }

  function runAnimation(context, piece) {
    return new _liquidFire.Promise(function (resolve, reject) {
      animationFor(context, piece).apply(context).then(resolve, reject);
    });
  }

  function matchAndExplode(context, piece, seen) {
    if (!context.oldElement || !context.newElement) {
      return _liquidFire.Promise.resolve();
    }

    // reduce the matchBy scope
    if (piece.pick) {
      context.oldElement = context.oldElement.find(piece.pick);
      context.newElement = context.newElement.find(piece.pick);
    }

    if (piece.pickOld) {
      context.oldElement = context.oldElement.find(piece.pickOld);
    }

    if (piece.pickNew) {
      context.newElement = context.newElement.find(piece.pickNew);
    }

    // use the fastest selector available
    var selector;

    if (piece.matchBy === 'id') {
      selector = function (attrValue) {
        return "#" + attrValue;
      };
    } else if (piece.matchBy === 'class') {
      selector = function (attrValue) {
        return "." + attrValue;
      };
    } else {
      selector = function (attrValue) {
        var escapedAttrValue = attrValue.replace(/'/g, "\\'");
        return "[" + piece.matchBy + "='" + escapedAttrValue + "']";
      };
    }

    var hits = _ember["default"].A(context.oldElement.find("[" + piece.matchBy + "]").toArray());
    return _liquidFire.Promise.all(hits.map(function (elt) {
      var attrValue = _ember["default"].$(elt).attr(piece.matchBy);

      // if there is no match for a particular item just skip it
      if (attrValue === "" || context.newElement.find(selector(attrValue)).length === 0) {
        return _liquidFire.Promise.resolve();
      }

      return explodePiece(context, {
        pick: selector(attrValue),
        use: piece.use
      }, seen);
    }));
  }
});
define('frontend/transitions/fade-direction', ['exports', 'liquid-fire'], function (exports, _liquidFire) {
  exports['default'] = fade;

  function fade(dimension, direction, opts) {
    var _this = this;

    var offset = arguments.length <= 3 || arguments[3] === undefined ? 20 : arguments[3];

    var oldParams = { opacity: 0 },
        newParams = { opacity: [opts.maxOpacity || 1, 0] },
        fadingElement = findFadingElement(this);

    var outOpts = opts,
        firstStep = undefined;

    if (dimension.toLowerCase() === 'x') {
      oldParams.translateX = direction * offset + 'px';
      newParams.translateX = ['0px', direction * offset + 'px'];
    } else {
      oldParams.translateY = direction * offset + 'px';
      newParams.translateY = ['0px', direction * offset + 'px'];
    }

    if (fadingElement) {
      // We still have some older version that is in the process of
      // fading out, so out first step is waiting for it to finish.
      firstStep = (0, _liquidFire.finish)(fadingElement, 'fade-out');
    } else {
      if ((0, _liquidFire.isAnimating)(this.oldElement, 'fade-in')) {
        // if the previous view is partially faded in, scale its
        // fade-out duration appropriately.
        outOpts = { duration: (0, _liquidFire.timeSpent)(this.oldElement, 'fade-in') };
      }
      (0, _liquidFire.stop)(this.oldElement);
      firstStep = (0, _liquidFire.animate)(this.oldElement, oldParams, outOpts, 'fade-out');
    }
    return firstStep.then(function () {
      return (0, _liquidFire.animate)(_this.newElement, newParams, opts, 'fade-in');
    });
  }

  function findFadingElement(context) {
    for (var i = 0; i < context.older.length; i++) {
      var entry = context.older[i];
      if ((0, _liquidFire.isAnimating)(entry.element, 'fade-out')) {
        return entry.element;
      }
    }
    if ((0, _liquidFire.isAnimating)(context.oldElement, 'fade-out')) {
      return context.oldElement;
    }
  }
});
define("frontend/transitions/fade-down", ["exports", "frontend/transitions/fade-direction"], function (exports, _frontendTransitionsFadeDirection) {
  exports["default"] = function () {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return _frontendTransitionsFadeDirection["default"].call(this, 'y', -1, opts, opts.offset);
  };
});
define("frontend/transitions/fade-left", ["exports", "frontend/transitions/fade-direction"], function (exports, _frontendTransitionsFadeDirection) {
  exports["default"] = function () {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return _frontendTransitionsFadeDirection["default"].call(this, 'x', -1, opts, opts.offset);
  };
});
define("frontend/transitions/fade-right", ["exports", "frontend/transitions/fade-direction"], function (exports, _frontendTransitionsFadeDirection) {
  exports["default"] = function () {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return _frontendTransitionsFadeDirection["default"].call(this, 'x', 1, opts, opts.offset);
  };
});
define("frontend/transitions/fade-up", ["exports", "frontend/transitions/fade-direction"], function (exports, _frontendTransitionsFadeDirection) {
  exports["default"] = function () {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return _frontendTransitionsFadeDirection["default"].call(this, 'y', 1, opts, opts.offset);
  };
});
define('frontend/transitions/fade', ['exports', 'liquid-fire'], function (exports, _liquidFire) {
  exports['default'] = fade;

  function fade() {
    var _this = this;

    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var firstStep;
    var outOpts = opts;
    var fadingElement = findFadingElement(this);

    if (fadingElement) {
      // We still have some older version that is in the process of
      // fading out, so out first step is waiting for it to finish.
      firstStep = (0, _liquidFire.finish)(fadingElement, 'fade-out');
    } else {
      if ((0, _liquidFire.isAnimating)(this.oldElement, 'fade-in')) {
        // if the previous view is partially faded in, scale its
        // fade-out duration appropriately.
        outOpts = { duration: (0, _liquidFire.timeSpent)(this.oldElement, 'fade-in') };
      }
      (0, _liquidFire.stop)(this.oldElement);
      firstStep = (0, _liquidFire.animate)(this.oldElement, { opacity: 0 }, outOpts, 'fade-out');
    }
    return firstStep.then(function () {
      return (0, _liquidFire.animate)(_this.newElement, { opacity: [opts.maxOpacity || 1, 0] }, opts, 'fade-in');
    });
  }

  function findFadingElement(context) {
    for (var i = 0; i < context.older.length; i++) {
      var entry = context.older[i];
      if ((0, _liquidFire.isAnimating)(entry.element, 'fade-out')) {
        return entry.element;
      }
    }
    if ((0, _liquidFire.isAnimating)(context.oldElement, 'fade-out')) {
      return context.oldElement;
    }
  }
  // END-SNIPPET
});
// BEGIN-SNIPPET fade-definition
define('frontend/transitions/flex-grow', ['exports', 'liquid-fire'], function (exports, _liquidFire) {
  exports['default'] = flexGrow;

  function flexGrow(opts) {
    (0, _liquidFire.stop)(this.oldElement);
    return _liquidFire.Promise.all([(0, _liquidFire.animate)(this.oldElement, { 'flex-grow': 0 }, opts), (0, _liquidFire.animate)(this.newElement, { 'flex-grow': [1, 0] }, opts)]);
  }
});
define('frontend/transitions/fly-to', ['exports', 'liquid-fire'], function (exports, _liquidFire) {
  exports['default'] = flyTo;

  function flyTo() {
    var _this = this;

    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (!this.newElement) {
      return _liquidFire.Promise.resolve();
    } else if (!this.oldElement) {
      this.newElement.css({ visibility: '' });
      return _liquidFire.Promise.resolve();
    }

    var oldOffset = this.oldElement.offset();
    var newOffset = this.newElement.offset();

    if (opts.movingSide === 'new') {
      var motion = {
        translateX: [0, oldOffset.left - newOffset.left],
        translateY: [0, oldOffset.top - newOffset.top],
        outerWidth: [this.newElement.outerWidth(), this.oldElement.outerWidth()],
        outerHeight: [this.newElement.outerHeight(), this.oldElement.outerHeight()]
      };
      this.oldElement.css({ visibility: 'hidden' });
      return (0, _liquidFire.animate)(this.newElement, motion, opts);
    } else {
      var motion = {
        translateX: newOffset.left - oldOffset.left,
        translateY: newOffset.top - oldOffset.top,
        outerWidth: this.newElement.outerWidth(),
        outerHeight: this.newElement.outerHeight()
      };
      this.newElement.css({ visibility: 'hidden' });
      return (0, _liquidFire.animate)(this.oldElement, motion, opts).then(function () {
        _this.newElement.css({ visibility: '' });
      });
    }
  }
});
define('frontend/transitions/move-over', ['exports', 'liquid-fire'], function (exports, _liquidFire) {
  exports['default'] = moveOver;

  function moveOver(dimension, direction, opts) {
    var _this = this;

    var oldParams = {},
        newParams = {},
        firstStep,
        property,
        measure;

    if (dimension.toLowerCase() === 'x') {
      property = 'translateX';
      measure = 'width';
    } else {
      property = 'translateY';
      measure = 'height';
    }

    if ((0, _liquidFire.isAnimating)(this.oldElement, 'moving-in')) {
      firstStep = (0, _liquidFire.finish)(this.oldElement, 'moving-in');
    } else {
      (0, _liquidFire.stop)(this.oldElement);
      firstStep = _liquidFire.Promise.resolve();
    }

    return firstStep.then(function () {
      var bigger = biggestSize(_this, measure);
      oldParams[property] = bigger * direction + 'px';
      newParams[property] = ["0px", -1 * bigger * direction + 'px'];

      return _liquidFire.Promise.all([(0, _liquidFire.animate)(_this.oldElement, oldParams, opts), (0, _liquidFire.animate)(_this.newElement, newParams, opts, 'moving-in')]);
    });
  }

  function biggestSize(context, dimension) {
    var sizes = [],
        maxSize = undefined,
        minSize = undefined,
        isInTarget = undefined;

    if (context.newElement) {
      sizes.push(parseInt(context.newElement.css(dimension), 10));
      sizes.push(parseInt(context.newElement.parent().css(dimension), 10));
    }
    if (context.oldElement) {
      sizes.push(parseInt(context.oldElement.css(dimension), 10));
      sizes.push(parseInt(context.oldElement.parent().css(dimension), 10));
    }

    maxSize = Math.max.apply(null, sizes);

    minSize = Math.min.apply(null, sizes);
    isInTarget = context.newElement && context.newElement.closest('.liquid-target').length || context.oldElement && context.oldElement.closest('.liquid-target').length;

    if (maxSize === 0 || isInTarget && minSize === 0) {
      if (dimension === 'height') {
        maxSize = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      } else {
        maxSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      }
    }
    return maxSize;
  }
});
define("frontend/transitions/scale", ["exports", "liquid-fire"], function (exports, _liquidFire) {
  exports["default"] = scale;

  function scale() {
    var _this = this;

    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _liquidFire.animate)(this.oldElement, { scale: [0.2, 1] }, opts).then(function () {
      return (0, _liquidFire.animate)(_this.newElement, { scale: [1, 0.2] }, opts);
    });
  }
});
define("frontend/transitions/scroll-then", ["exports", "ember", "liquid-fire/is-browser"], function (exports, _ember, _liquidFireIsBrowser) {
  exports["default"] = function (nextTransitionName, options) {
    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    var _this = this;

    if ((0, _liquidFireIsBrowser["default"])()) {
      _ember["default"].assert("You must provide a transition name as the first argument to scrollThen. Example: this.use('scrollThen', 'toLeft')", 'string' === typeof nextTransitionName);

      var el = document.getElementsByTagName('html');
      var nextTransition = this.lookup(nextTransitionName);
      if (!options) {
        options = {};
      }

      _ember["default"].assert("The second argument to scrollThen is passed to Velocity's scroll function and must be an object", 'object' === typeof options);

      // set scroll options via: this.use('scrollThen', 'ToLeft', {easing: 'spring'})
      options = _ember["default"].merge({ duration: 500, offset: 0 }, options);

      // additional args can be passed through after the scroll options object
      // like so: this.use('scrollThen', 'moveOver', {duration: 100}, 'x', -1);

      return window.$.Velocity(el, 'scroll', options).then(function () {
        nextTransition.apply(_this, rest);
      });
    }
  };
});
define('frontend/transitions/tether', ['exports', 'frontend/transitions/explode'], function (exports, _frontendTransitionsExplode) {
  exports['default'] = tether;

  function tether(tetherUse, overlayUse) {
    var transitions = [];
    transitions.push({
      pick: '.liquid-tether > :first-child',
      use: tetherUse
    });

    if (overlayUse) {
      transitions.unshift({
        pick: '.liquid-tether-overlay',
        use: overlayUse
      });
    }

    return _frontendTransitionsExplode['default'].apply(this, transitions);
  }
});
define("frontend/transitions/to-down", ["exports", "frontend/transitions/move-over"], function (exports, _frontendTransitionsMoveOver) {
  exports["default"] = function (opts) {
    return _frontendTransitionsMoveOver["default"].call(this, 'y', 1, opts);
  };
});
define("frontend/transitions/to-left", ["exports", "frontend/transitions/move-over"], function (exports, _frontendTransitionsMoveOver) {
  exports["default"] = function (opts) {
    return _frontendTransitionsMoveOver["default"].call(this, 'x', -1, opts);
  };
});
define("frontend/transitions/to-right", ["exports", "frontend/transitions/move-over"], function (exports, _frontendTransitionsMoveOver) {
  exports["default"] = function (opts) {
    return _frontendTransitionsMoveOver["default"].call(this, 'x', 1, opts);
  };
});
define("frontend/transitions/to-up", ["exports", "frontend/transitions/move-over"], function (exports, _frontendTransitionsMoveOver) {
  exports["default"] = function (opts) {
    return _frontendTransitionsMoveOver["default"].call(this, 'y', -1, opts);
  };
});
define('frontend/transitions', ['exports'], function (exports) {
	exports['default'] = function () {

		var durationTime = 500;

		this.transition(this.toRoute(['index', 'why', 'training', 'vegucated', 'team']), this.use('crossFade', { duration: durationTime }));
	};
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('frontend/config/environment', ['ember'], function(Ember) {
  return { 'default': {"modulePrefix":"frontend","environment":"development","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"name":"frontend","version":"0.0.0+446329e4"},"contentSecurityPolicyHeader":"Content-Security-Policy-Report-Only","contentSecurityPolicy":{"default-src":"'none'","script-src":"'self' 'unsafe-eval'","font-src":"'self'","connect-src":"'self'","img-src":"'self'","style-src":"'self'","media-src":"'self'"},"exportApplicationGlobal":true}};
});

if (!runningTests) {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+446329e4"});
}

/* jshint ignore:end */
//# sourceMappingURL=http://lg.jolart.com/assets/frontend/assets/frontend.map
