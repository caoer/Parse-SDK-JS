(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	import decode from './decode';
	import encode from './encode';
	import CoreManager from './CoreManager';
	import InstallationController from './InstallationController';
	import * as ParseOp from './ParseOp';
	import RESTController from './RESTController';

	/**
	 * Contains all Parse API classes and functions.
	 * @class Parse
	 * @static
	 */
	var Parse = {
	  /**
	   * Call this method first to set up your authentication tokens for Parse.
	   * You can get your keys from the Data Browser on parse.com.
	   * @method initialize
	   * @param {String} applicationId Your Parse Application ID.
	   * @param {String} javaScriptKey (optional) Your Parse JavaScript Key (Not needed for parse-server)
	   * @param {String} masterKey (optional) Your Parse Master Key. (Node.js only!)
	   * @static
	   */
	  initialize(applicationId, javaScriptKey) {
	    Parse._initialize(applicationId, javaScriptKey);
	  },

	  _initialize(applicationId, javaScriptKey, masterKey) {
	    CoreManager.set('APPLICATION_ID', applicationId);
	    CoreManager.set('JAVASCRIPT_KEY', javaScriptKey);
	    CoreManager.set('MASTER_KEY', masterKey);
	    CoreManager.set('USE_MASTER_KEY', false);
	  }
	};

	/** These legacy setters may eventually be deprecated **/
	Object.defineProperty(Parse, 'applicationId', {
	  get() {
	    return CoreManager.get('APPLICATION_ID');
	  },
	  set(value) {
	    CoreManager.set('APPLICATION_ID', value);
	  }
	});
	Object.defineProperty(Parse, 'javaScriptKey', {
	  get() {
	    return CoreManager.get('JAVASCRIPT_KEY');
	  },
	  set(value) {
	    CoreManager.set('JAVASCRIPT_KEY', value);
	  }
	});
	Object.defineProperty(Parse, 'masterKey', {
	  get() {
	    return CoreManager.get('MASTER_KEY');
	  },
	  set(value) {
	    CoreManager.set('MASTER_KEY', value);
	  }
	});
	Object.defineProperty(Parse, 'serverURL', {
	  get() {
	    return CoreManager.get('SERVER_URL');
	  },
	  set(value) {
	    CoreManager.set('SERVER_URL', value);
	  }
	});
	Object.defineProperty(Parse, 'liveQueryServerURL', {
	  get() {
	    return CoreManager.get('LIVEQUERY_SERVER_URL');
	  },
	  set(value) {
	    CoreManager.set('LIVEQUERY_SERVER_URL', value);
	  }
	});
	/** End setters **/

	Parse.ACL = __webpack_require__(1).default;
	Parse.Analytics = __webpack_require__(2);
	Parse.Cloud = __webpack_require__(3);
	Parse.CoreManager = __webpack_require__(4);
	Parse.Config = __webpack_require__(6).default;
	Parse.Error = __webpack_require__(7).default;
	Parse.FacebookUtils = __webpack_require__(8).default;
	Parse.File = __webpack_require__(9).default;
	Parse.GeoPoint = __webpack_require__(10).default;
	Parse.Installation = __webpack_require__(11).default;
	Parse.Object = __webpack_require__(12).default;
	Parse.Op = {
	  Set: ParseOp.SetOp,
	  Unset: ParseOp.UnsetOp,
	  Increment: ParseOp.IncrementOp,
	  Add: ParseOp.AddOp,
	  Remove: ParseOp.RemoveOp,
	  AddUnique: ParseOp.AddUniqueOp,
	  Relation: ParseOp.RelationOp
	};
	Parse.Promise = __webpack_require__(13).default;
	Parse.Push = __webpack_require__(14);
	Parse.Query = __webpack_require__(15).default;
	Parse.Relation = __webpack_require__(16).default;
	Parse.Role = __webpack_require__(17).default;
	Parse.Session = __webpack_require__(18).default;
	Parse.Storage = __webpack_require__(19);
	Parse.User = __webpack_require__(21).default;
	Parse.LiveQuery = __webpack_require__(22).default;
	Parse.LiveQueryClient = __webpack_require__(23).default;

	Parse._request = function (...args) {
	  return CoreManager.getRESTController().request.apply(null, args);
	};
	Parse._ajax = function (...args) {
	  return CoreManager.getRESTController().ajax.apply(null, args);
	};
	// We attempt to match the signatures of the legacy versions of these methods
	Parse._decode = function (_, value) {
	  return decode(value);
	};
	Parse._encode = function (value, _, disallowObjects) {
	  return encode(value, disallowObjects);
	};
	Parse._getInstallationId = function () {
	  return CoreManager.getInstallationController().currentInstallationId();
	};

	CoreManager.setInstallationController(InstallationController);
	CoreManager.setRESTController(RESTController);

	// For legacy requires, of the form `var Parse = require('parse').Parse`
	Parse.Parse = Parse;

	module.exports = Parse;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import ParseRole from './ParseRole';
	import ParseUser from './ParseUser';

	var PUBLIC_KEY = '*';

	/**
	 * Creates a new ACL.
	 * If no argument is given, the ACL has no permissions for anyone.
	 * If the argument is a Parse.User, the ACL will have read and write
	 *   permission for only that user.
	 * If the argument is any other JSON object, that object will be interpretted
	 *   as a serialized ACL created with toJSON().
	 * @class Parse.ACL
	 * @constructor
	 *
	 * <p>An ACL, or Access Control List can be added to any
	 * <code>Parse.Object</code> to restrict access to only a subset of users
	 * of your application.</p>
	 */
	export default class ParseACL {

	  constructor(arg1) {
	    this.permissionsById = {};
	    if (arg1 && typeof arg1 === 'object') {
	      if (arg1 instanceof ParseUser) {
	        this.setReadAccess(arg1, true);
	        this.setWriteAccess(arg1, true);
	      } else {
	        for (var userId in arg1) {
	          var accessList = arg1[userId];
	          if (typeof userId !== 'string') {
	            throw new TypeError('Tried to create an ACL with an invalid user id.');
	          }
	          this.permissionsById[userId] = {};
	          for (var permission in accessList) {
	            var allowed = accessList[permission];
	            if (permission !== 'read' && permission !== 'write') {
	              throw new TypeError('Tried to create an ACL with an invalid permission type.');
	            }
	            if (typeof allowed !== 'boolean') {
	              throw new TypeError('Tried to create an ACL with an invalid permission value.');
	            }
	            this.permissionsById[userId][permission] = allowed;
	          }
	        }
	      }
	    } else if (typeof arg1 === 'function') {
	      throw new TypeError('ParseACL constructed with a function. Did you forget ()?');
	    }
	  }

	  /**
	   * Returns a JSON-encoded version of the ACL.
	   * @method toJSON
	   * @return {Object}
	   */
	  toJSON() {
	    var permissions = {};
	    for (var p in this.permissionsById) {
	      permissions[p] = this.permissionsById[p];
	    }
	    return permissions;
	  }

	  /**
	   * Returns whether this ACL is equal to another object
	   * @method equals
	   * @param other The other object to compare to
	   * @return {Boolean}
	   */
	  equals(other) {
	    if (!(other instanceof ParseACL)) {
	      return false;
	    }
	    var users = Object.keys(this.permissionsById);
	    var otherUsers = Object.keys(other.permissionsById);
	    if (users.length !== otherUsers.length) {
	      return false;
	    }
	    for (var u in this.permissionsById) {
	      if (!other.permissionsById[u]) {
	        return false;
	      }
	      if (this.permissionsById[u].read !== other.permissionsById[u].read) {
	        return false;
	      }
	      if (this.permissionsById[u].write !== other.permissionsById[u].write) {
	        return false;
	      }
	    }
	    return true;
	  }

	  _setAccess(accessType, userId, allowed) {
	    if (userId instanceof ParseUser) {
	      userId = userId.id;
	    } else if (userId instanceof ParseRole) {
	      const name = userId.getName();
	      if (!name) {
	        throw new TypeError('Role must have a name');
	      }
	      userId = 'role:' + name;
	    }
	    if (typeof userId !== 'string') {
	      throw new TypeError('userId must be a string.');
	    }
	    if (typeof allowed !== 'boolean') {
	      throw new TypeError('allowed must be either true or false.');
	    }
	    var permissions = this.permissionsById[userId];
	    if (!permissions) {
	      if (!allowed) {
	        // The user already doesn't have this permission, so no action is needed
	        return;
	      } else {
	        permissions = {};
	        this.permissionsById[userId] = permissions;
	      }
	    }

	    if (allowed) {
	      this.permissionsById[userId][accessType] = true;
	    } else {
	      delete permissions[accessType];
	      if (Object.keys(permissions).length === 0) {
	        delete this.permissionsById[userId];
	      }
	    }
	  }

	  _getAccess(accessType, userId) {
	    if (userId instanceof ParseUser) {
	      userId = userId.id;
	      if (!userId) {
	        throw new Error('Cannot get access for a ParseUser without an ID');
	      }
	    } else if (userId instanceof ParseRole) {
	      const name = userId.getName();
	      if (!name) {
	        throw new TypeError('Role must have a name');
	      }
	      userId = 'role:' + name;
	    }
	    var permissions = this.permissionsById[userId];
	    if (!permissions) {
	      return false;
	    }
	    return !!permissions[accessType];
	  }

	  /**
	   * Sets whether the given user is allowed to read this object.
	   * @method setReadAccess
	   * @param userId An instance of Parse.User or its objectId.
	   * @param {Boolean} allowed Whether that user should have read access.
	   */
	  setReadAccess(userId, allowed) {
	    this._setAccess('read', userId, allowed);
	  }

	  /**
	   * Get whether the given user id is *explicitly* allowed to read this object.
	   * Even if this returns false, the user may still be able to access it if
	   * getPublicReadAccess returns true or a role that the user belongs to has
	   * write access.
	   * @method getReadAccess
	   * @param userId An instance of Parse.User or its objectId, or a Parse.Role.
	   * @return {Boolean}
	   */
	  getReadAccess(userId) {
	    return this._getAccess('read', userId);
	  }

	  /**
	   * Sets whether the given user id is allowed to write this object.
	   * @method setWriteAccess
	   * @param userId An instance of Parse.User or its objectId, or a Parse.Role..
	   * @param {Boolean} allowed Whether that user should have write access.
	   */
	  setWriteAccess(userId, allowed) {
	    this._setAccess('write', userId, allowed);
	  }

	  /**
	   * Gets whether the given user id is *explicitly* allowed to write this object.
	   * Even if this returns false, the user may still be able to write it if
	   * getPublicWriteAccess returns true or a role that the user belongs to has
	   * write access.
	   * @method getWriteAccess
	   * @param userId An instance of Parse.User or its objectId, or a Parse.Role.
	   * @return {Boolean}
	   */
	  getWriteAccess(userId) {
	    return this._getAccess('write', userId);
	  }

	  /**
	   * Sets whether the public is allowed to read this object.
	   * @method setPublicReadAccess
	   * @param {Boolean} allowed
	   */
	  setPublicReadAccess(allowed) {
	    this.setReadAccess(PUBLIC_KEY, allowed);
	  }

	  /**
	   * Gets whether the public is allowed to read this object.
	   * @method getPublicReadAccess
	   * @return {Boolean}
	   */
	  getPublicReadAccess() {
	    return this.getReadAccess(PUBLIC_KEY);
	  }

	  /**
	   * Sets whether the public is allowed to write this object.
	   * @method setPublicWriteAccess
	   * @param {Boolean} allowed
	   */
	  setPublicWriteAccess(allowed) {
	    this.setWriteAccess(PUBLIC_KEY, allowed);
	  }

	  /**
	   * Gets whether the public is allowed to write this object.
	   * @method getPublicWriteAccess
	   * @return {Boolean}
	   */
	  getPublicWriteAccess() {
	    return this.getWriteAccess(PUBLIC_KEY);
	  }

	  /**
	   * Gets whether users belonging to the given role are allowed
	   * to read this object. Even if this returns false, the role may
	   * still be able to write it if a parent role has read access.
	   *
	   * @method getRoleReadAccess
	   * @param role The name of the role, or a Parse.Role object.
	   * @return {Boolean} true if the role has read access. false otherwise.
	   * @throws {TypeError} If role is neither a Parse.Role nor a String.
	   */
	  getRoleReadAccess(role) {
	    if (role instanceof ParseRole) {
	      // Normalize to the String name
	      role = role.getName();
	    }
	    if (typeof role !== 'string') {
	      throw new TypeError('role must be a ParseRole or a String');
	    }
	    return this.getReadAccess('role:' + role);
	  }

	  /**
	   * Gets whether users belonging to the given role are allowed
	   * to write this object. Even if this returns false, the role may
	   * still be able to write it if a parent role has write access.
	   *
	   * @method getRoleWriteAccess
	   * @param role The name of the role, or a Parse.Role object.
	   * @return {Boolean} true if the role has write access. false otherwise.
	   * @throws {TypeError} If role is neither a Parse.Role nor a String.
	   */
	  getRoleWriteAccess(role) {
	    if (role instanceof ParseRole) {
	      // Normalize to the String name
	      role = role.getName();
	    }
	    if (typeof role !== 'string') {
	      throw new TypeError('role must be a ParseRole or a String');
	    }
	    return this.getWriteAccess('role:' + role);
	  }

	  /**
	   * Sets whether users belonging to the given role are allowed
	   * to read this object.
	   *
	   * @method setRoleReadAccess
	   * @param role The name of the role, or a Parse.Role object.
	   * @param {Boolean} allowed Whether the given role can read this object.
	   * @throws {TypeError} If role is neither a Parse.Role nor a String.
	   */
	  setRoleReadAccess(role, allowed) {
	    if (role instanceof ParseRole) {
	      // Normalize to the String name
	      role = role.getName();
	    }
	    if (typeof role !== 'string') {
	      throw new TypeError('role must be a ParseRole or a String');
	    }
	    this.setReadAccess('role:' + role, allowed);
	  }

	  /**
	   * Sets whether users belonging to the given role are allowed
	   * to write this object.
	   *
	   * @method setRoleWriteAccess
	   * @param role The name of the role, or a Parse.Role object.
	   * @param {Boolean} allowed Whether the given role can write this object.
	   * @throws {TypeError} If role is neither a Parse.Role nor a String.
	   */
	  setRoleWriteAccess(role, allowed) {
	    if (role instanceof ParseRole) {
	      // Normalize to the String name
	      role = role.getName();
	    }
	    if (typeof role !== 'string') {
	      throw new TypeError('role must be a ParseRole or a String');
	    }
	    this.setWriteAccess('role:' + role, allowed);
	  }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import CoreManager from './CoreManager';

	/**
	 * Parse.Analytics provides an interface to Parse's logging and analytics
	 * backend.
	 *
	 * @class Parse.Analytics
	 * @static
	 */

	/**
	 * Tracks the occurrence of a custom event with additional dimensions.
	 * Parse will store a data point at the time of invocation with the given
	 * event name.
	 *
	 * Dimensions will allow segmentation of the occurrences of this custom
	 * event. Keys and values should be {@code String}s, and will throw
	 * otherwise.
	 *
	 * To track a user signup along with additional metadata, consider the
	 * following:
	 * <pre>
	 * var dimensions = {
	 *  gender: 'm',
	 *  source: 'web',
	 *  dayType: 'weekend'
	 * };
	 * Parse.Analytics.track('signup', dimensions);
	 * </pre>
	 *
	 * There is a default limit of 8 dimensions per event tracked.
	 *
	 * @method track
	 * @param {String} name The name of the custom event to report to Parse as
	 * having happened.
	 * @param {Object} dimensions The dictionary of information by which to
	 * segment this event.
	 * @param {Object} options A Backbone-style callback object.
	 * @return {Parse.Promise} A promise that is resolved when the round-trip
	 * to the server completes.
	 */
	export function track(name, dimensions, options) {
	  name = name || '';
	  name = name.replace(/^\s*/, '');
	  name = name.replace(/\s*$/, '');
	  if (name.length === 0) {
	    throw new TypeError('A name for the custom event must be provided');
	  }

	  for (var key in dimensions) {
	    if (typeof key !== 'string' || typeof dimensions[key] !== 'string') {
	      throw new TypeError('track() dimensions expects keys and values of type "string".');
	    }
	  }

	  options = options || {};
	  return CoreManager.getAnalyticsController().track(name, dimensions)._thenRunCallbacks(options);
	}

	var DefaultController = {
	  track(name, dimensions) {
	    var RESTController = CoreManager.getRESTController();
	    return RESTController.request('POST', 'events/' + name, { dimensions: dimensions });
	  }
	};

	CoreManager.setAnalyticsController(DefaultController);

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import CoreManager from './CoreManager';
	import decode from './decode';
	import encode from './encode';
	import ParseError from './ParseError';
	import ParsePromise from './ParsePromise';

	/**
	 * Contains functions for calling and declaring
	 * <a href="/docs/cloud_code_guide#functions">cloud functions</a>.
	 * <p><strong><em>
	 *   Some functions are only available from Cloud Code.
	 * </em></strong></p>
	 *
	 * @class Parse.Cloud
	 * @static
	 */

	/**
	 * Makes a call to a cloud function.
	 * @method run
	 * @param {String} name The function name.
	 * @param {Object} data The parameters to send to the cloud function.
	 * @param {Object} options A Backbone-style options object
	 * options.success, if set, should be a function to handle a successful
	 * call to a cloud function.  options.error should be a function that
	 * handles an error running the cloud function.  Both functions are
	 * optional.  Both functions take a single argument.
	 * @return {Parse.Promise} A promise that will be resolved with the result
	 * of the function.
	 */
	export function run(name, data, options) {
	  options = options || {};

	  if (typeof name !== 'string' || name.length === 0) {
	    throw new TypeError('Cloud function name must be a string.');
	  }

	  var requestOptions = {};
	  if (options.useMasterKey) {
	    requestOptions.useMasterKey = options.useMasterKey;
	  }
	  if (options.sessionToken) {
	    requestOptions.sessionToken = options.sessionToken;
	  }

	  return CoreManager.getCloudController().run(name, data, requestOptions)._thenRunCallbacks(options);
	}

	var DefaultController = {
	  run(name, data, options) {
	    var RESTController = CoreManager.getRESTController();

	    var payload = encode(data, true);

	    var requestOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      requestOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('sessionToken')) {
	      requestOptions.sessionToken = options.sessionToken;
	    }

	    var request = RESTController.request('POST', 'functions/' + name, payload, requestOptions);

	    return request.then(function (res) {
	      var decoded = decode(res);
	      if (decoded && decoded.hasOwnProperty('result')) {
	        return ParsePromise.as(decoded.result);
	      }
	      return ParsePromise.error(new ParseError(ParseError.INVALID_JSON, 'The server returned an invalid response.'));
	    })._thenRunCallbacks(options);
	  }
	};

	CoreManager.setCloudController(DefaultController);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	var config = {
	  // Defaults
	  IS_NODE: typeof process !== 'undefined' && !!process.versions && !!process.versions.node && !process.versions.electron,
	  REQUEST_ATTEMPT_LIMIT: 5,
	  SERVER_URL: 'https://api.parse.com/1',
	  LIVEQUERY_SERVER_URL: null,
	  VERSION: 'js' + '1.9.2',
	  APPLICATION_ID: null,
	  JAVASCRIPT_KEY: null,
	  MASTER_KEY: null,
	  USE_MASTER_KEY: false,
	  PERFORM_USER_REWRITE: true,
	  FORCE_REVOCABLE_SESSION: false
	};

	function requireMethods(name, methods, controller) {
	  methods.forEach(func => {
	    if (typeof controller[func] !== 'function') {
	      throw new Error(`${ name } must implement ${ func }()`);
	    }
	  });
	}

	module.exports = {
	  get: function (key) {
	    if (config.hasOwnProperty(key)) {
	      return config[key];
	    }
	    throw new Error('Configuration key not found: ' + key);
	  },

	  set: function (key, value) {
	    config[key] = value;
	  },

	  /* Specialized Controller Setters/Getters */

	  setAnalyticsController(controller) {
	    requireMethods('AnalyticsController', ['track'], controller);
	    config['AnalyticsController'] = controller;
	  },

	  getAnalyticsController() {
	    return config['AnalyticsController'];
	  },

	  setCloudController(controller) {
	    requireMethods('CloudController', ['run'], controller);
	    config['CloudController'] = controller;
	  },

	  getCloudController() {
	    return config['CloudController'];
	  },

	  setConfigController(controller) {
	    requireMethods('ConfigController', ['current', 'get'], controller);
	    config['ConfigController'] = controller;
	  },

	  getConfigController() {
	    return config['ConfigController'];
	  },

	  setFileController(controller) {
	    requireMethods('FileController', ['saveFile', 'saveBase64'], controller);
	    config['FileController'] = controller;
	  },

	  getFileController() {
	    return config['FileController'];
	  },

	  setInstallationController(controller) {
	    requireMethods('InstallationController', ['currentInstallationId'], controller);
	    config['InstallationController'] = controller;
	  },

	  getInstallationController() {
	    return config['InstallationController'];
	  },

	  setObjectController(controller) {
	    requireMethods('ObjectController', ['save', 'fetch', 'destroy'], controller);
	    config['ObjectController'] = controller;
	  },

	  getObjectController() {
	    return config['ObjectController'];
	  },

	  setObjectStateController(controller) {
	    requireMethods('ObjectStateController', ['getState', 'initializeState', 'removeState', 'getServerData', 'setServerData', 'getPendingOps', 'setPendingOp', 'pushPendingState', 'popPendingState', 'mergeFirstPendingState', 'getObjectCache', 'estimateAttribute', 'estimateAttributes', 'commitServerChanges', 'enqueueTask', 'clearAllState'], controller);

	    config['ObjectStateController'] = controller;
	  },

	  getObjectStateController() {
	    return config['ObjectStateController'];
	  },

	  setPushController(controller) {
	    requireMethods('PushController', ['send'], controller);
	    config['PushController'] = controller;
	  },

	  getPushController() {
	    return config['PushController'];
	  },

	  setQueryController(controller) {
	    requireMethods('QueryController', ['find'], controller);
	    config['QueryController'] = controller;
	  },

	  getQueryController() {
	    return config['QueryController'];
	  },

	  setRESTController(controller) {
	    requireMethods('RESTController', ['request', 'ajax'], controller);
	    config['RESTController'] = controller;
	  },

	  getRESTController() {
	    return config['RESTController'];
	  },

	  setSessionController(controller) {
	    requireMethods('SessionController', ['getSession'], controller);
	    config['SessionController'] = controller;
	  },

	  getSessionController() {
	    return config['SessionController'];
	  },

	  setStorageController(controller) {
	    if (controller.async) {
	      requireMethods('An async StorageController', ['getItemAsync', 'setItemAsync', 'removeItemAsync'], controller);
	    } else {
	      requireMethods('A synchronous StorageController', ['getItem', 'setItem', 'removeItem'], controller);
	    }
	    config['StorageController'] = controller;
	  },

	  getStorageController() {
	    return config['StorageController'];
	  },

	  setUserController(controller) {
	    requireMethods('UserController', ['setCurrentUser', 'currentUser', 'currentUserAsync', 'signUp', 'logIn', 'become', 'logOut', 'requestPasswordReset', 'upgradeToRevocableSession', 'linkWith'], controller);
	    config['UserController'] = controller;
	  },

	  getUserController() {
	    return config['UserController'];
	  },

	  setLiveQueryController(controller) {
	    requireMethods('LiveQueryController', ['subscribe', 'unsubscribe', 'open', 'close'], controller);
	    config['LiveQueryController'] = controller;
	  },

	  getLiveQueryController() {
	    return config['LiveQueryController'];
	  },

	  setHooksController(controller) {
	    requireMethods('HooksController', ['create', 'get', 'update', 'remove'], controller);
	    config['HooksController'] = controller;
	  },

	  getHooksController() {
	    return config['HooksController'];
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import CoreManager from './CoreManager';
	import decode from './decode';
	import encode from './encode';
	import escape from './escape';
	import ParseError from './ParseError';
	import ParsePromise from './ParsePromise';
	import Storage from './Storage';

	/**
	 * Parse.Config is a local representation of configuration data that
	 * can be set from the Parse dashboard.
	 *
	 * @class Parse.Config
	 * @constructor
	 */

	export default class ParseConfig {

	  constructor() {
	    this.attributes = {};
	    this._escapedAttributes = {};
	  }

	  /**
	   * Gets the value of an attribute.
	   * @method get
	   * @param {String} attr The name of an attribute.
	   */
	  get(attr) {
	    return this.attributes[attr];
	  }

	  /**
	   * Gets the HTML-escaped value of an attribute.
	   * @method escape
	   * @param {String} attr The name of an attribute.
	   */
	  escape(attr) {
	    var html = this._escapedAttributes[attr];
	    if (html) {
	      return html;
	    }
	    var val = this.attributes[attr];
	    var escaped = '';
	    if (val != null) {
	      escaped = escape(val.toString());
	    }
	    this._escapedAttributes[attr] = escaped;
	    return escaped;
	  }

	  /**
	   * Retrieves the most recently-fetched configuration object, either from
	   * memory or from local storage if necessary.
	   *
	   * @method current
	   * @static
	   * @return {Config} The most recently-fetched Parse.Config if it
	   *     exists, else an empty Parse.Config.
	   */
	  static current() {
	    var controller = CoreManager.getConfigController();
	    return controller.current();
	  }

	  /**
	   * Gets a new configuration object from the server.
	   * @method get
	   * @static
	   * @param {Object} options A Backbone-style options object.
	   * Valid options are:<ul>
	   *   <li>success: Function to call when the get completes successfully.
	   *   <li>error: Function to call when the get fails.
	   * </ul>
	   * @return {Parse.Promise} A promise that is resolved with a newly-created
	   *     configuration object when the get completes.
	   */
	  static get(options) {
	    options = options || {};

	    var controller = CoreManager.getConfigController();
	    return controller.get()._thenRunCallbacks(options);
	  }
	}

	var currentConfig = null;

	var CURRENT_CONFIG_KEY = 'currentConfig';

	function decodePayload(data) {
	  try {
	    var json = JSON.parse(data);
	    if (json && typeof json === 'object') {
	      return decode(json);
	    }
	  } catch (e) {
	    return null;
	  }
	}

	var DefaultController = {
	  current() {
	    if (currentConfig) {
	      return currentConfig;
	    }

	    var config = new ParseConfig();
	    var storagePath = Storage.generatePath(CURRENT_CONFIG_KEY);
	    var configData;
	    if (!Storage.async()) {
	      configData = Storage.getItem(storagePath);

	      if (configData) {
	        var attributes = decodePayload(configData);
	        if (attributes) {
	          config.attributes = attributes;
	          currentConfig = config;
	        }
	      }
	      return config;
	    }
	    // Return a promise for async storage controllers
	    return Storage.getItemAsync(storagePath).then(configData => {
	      if (configData) {
	        var attributes = decodePayload(configData);
	        if (attributes) {
	          config.attributes = attributes;
	          currentConfig = config;
	        }
	      }
	      return config;
	    });
	  },

	  get() {
	    var RESTController = CoreManager.getRESTController();

	    return RESTController.request('GET', 'config', {}, {}).then(response => {
	      if (!response || !response.params) {
	        var error = new ParseError(ParseError.INVALID_JSON, 'Config JSON response invalid.');
	        return ParsePromise.error(error);
	      }

	      var config = new ParseConfig();
	      config.attributes = {};
	      for (var attr in response.params) {
	        config.attributes[attr] = decode(response.params[attr]);
	      }
	      currentConfig = config;
	      return Storage.setItemAsync(Storage.generatePath(CURRENT_CONFIG_KEY), JSON.stringify(response.params)).then(() => {
	        return config;
	      });
	    });
	  }
	};

	CoreManager.setConfigController(DefaultController);

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	/**
	 * Constructs a new Parse.Error object with the given code and message.
	 * @class Parse.Error
	 * @constructor
	 * @param {Number} code An error code constant from <code>Parse.Error</code>.
	 * @param {String} message A detailed description of the error.
	 */
	export default class ParseError {
	  constructor(code, message) {
	    this.code = code;
	    this.message = message;
	  }
	}

	/**
	 * Error code indicating some error other than those enumerated here.
	 * @property OTHER_CAUSE
	 * @static
	 * @final
	 */
	ParseError.OTHER_CAUSE = -1;

	/**
	 * Error code indicating that something has gone wrong with the server.
	 * If you get this error code, it is Parse's fault. Contact us at
	 * https://parse.com/help
	 * @property INTERNAL_SERVER_ERROR
	 * @static
	 * @final
	 */
	ParseError.INTERNAL_SERVER_ERROR = 1;

	/**
	 * Error code indicating the connection to the Parse servers failed.
	 * @property CONNECTION_FAILED
	 * @static
	 * @final
	 */
	ParseError.CONNECTION_FAILED = 100;

	/**
	 * Error code indicating the specified object doesn't exist.
	 * @property OBJECT_NOT_FOUND
	 * @static
	 * @final
	 */
	ParseError.OBJECT_NOT_FOUND = 101;

	/**
	 * Error code indicating you tried to query with a datatype that doesn't
	 * support it, like exact matching an array or object.
	 * @property INVALID_QUERY
	 * @static
	 * @final
	 */
	ParseError.INVALID_QUERY = 102;

	/**
	 * Error code indicating a missing or invalid classname. Classnames are
	 * case-sensitive. They must start with a letter, and a-zA-Z0-9_ are the
	 * only valid characters.
	 * @property INVALID_CLASS_NAME
	 * @static
	 * @final
	 */
	ParseError.INVALID_CLASS_NAME = 103;

	/**
	 * Error code indicating an unspecified object id.
	 * @property MISSING_OBJECT_ID
	 * @static
	 * @final
	 */
	ParseError.MISSING_OBJECT_ID = 104;

	/**
	 * Error code indicating an invalid key name. Keys are case-sensitive. They
	 * must start with a letter, and a-zA-Z0-9_ are the only valid characters.
	 * @property INVALID_KEY_NAME
	 * @static
	 * @final
	 */
	ParseError.INVALID_KEY_NAME = 105;

	/**
	 * Error code indicating a malformed pointer. You should not see this unless
	 * you have been mucking about changing internal Parse code.
	 * @property INVALID_POINTER
	 * @static
	 * @final
	 */
	ParseError.INVALID_POINTER = 106;

	/**
	 * Error code indicating that badly formed JSON was received upstream. This
	 * either indicates you have done something unusual with modifying how
	 * things encode to JSON, or the network is failing badly.
	 * @property INVALID_JSON
	 * @static
	 * @final
	 */
	ParseError.INVALID_JSON = 107;

	/**
	 * Error code indicating that the feature you tried to access is only
	 * available internally for testing purposes.
	 * @property COMMAND_UNAVAILABLE
	 * @static
	 * @final
	 */
	ParseError.COMMAND_UNAVAILABLE = 108;

	/**
	 * You must call Parse.initialize before using the Parse library.
	 * @property NOT_INITIALIZED
	 * @static
	 * @final
	 */
	ParseError.NOT_INITIALIZED = 109;

	/**
	 * Error code indicating that a field was set to an inconsistent type.
	 * @property INCORRECT_TYPE
	 * @static
	 * @final
	 */
	ParseError.INCORRECT_TYPE = 111;

	/**
	 * Error code indicating an invalid channel name. A channel name is either
	 * an empty string (the broadcast channel) or contains only a-zA-Z0-9_
	 * characters and starts with a letter.
	 * @property INVALID_CHANNEL_NAME
	 * @static
	 * @final
	 */
	ParseError.INVALID_CHANNEL_NAME = 112;

	/**
	 * Error code indicating that push is misconfigured.
	 * @property PUSH_MISCONFIGURED
	 * @static
	 * @final
	 */
	ParseError.PUSH_MISCONFIGURED = 115;

	/**
	 * Error code indicating that the object is too large.
	 * @property OBJECT_TOO_LARGE
	 * @static
	 * @final
	 */
	ParseError.OBJECT_TOO_LARGE = 116;

	/**
	 * Error code indicating that the operation isn't allowed for clients.
	 * @property OPERATION_FORBIDDEN
	 * @static
	 * @final
	 */
	ParseError.OPERATION_FORBIDDEN = 119;

	/**
	 * Error code indicating the result was not found in the cache.
	 * @property CACHE_MISS
	 * @static
	 * @final
	 */
	ParseError.CACHE_MISS = 120;

	/**
	 * Error code indicating that an invalid key was used in a nested
	 * JSONObject.
	 * @property INVALID_NESTED_KEY
	 * @static
	 * @final
	 */
	ParseError.INVALID_NESTED_KEY = 121;

	/**
	 * Error code indicating that an invalid filename was used for ParseFile.
	 * A valid file name contains only a-zA-Z0-9_. characters and is between 1
	 * and 128 characters.
	 * @property INVALID_FILE_NAME
	 * @static
	 * @final
	 */
	ParseError.INVALID_FILE_NAME = 122;

	/**
	 * Error code indicating an invalid ACL was provided.
	 * @property INVALID_ACL
	 * @static
	 * @final
	 */
	ParseError.INVALID_ACL = 123;

	/**
	 * Error code indicating that the request timed out on the server. Typically
	 * this indicates that the request is too expensive to run.
	 * @property TIMEOUT
	 * @static
	 * @final
	 */
	ParseError.TIMEOUT = 124;

	/**
	 * Error code indicating that the email address was invalid.
	 * @property INVALID_EMAIL_ADDRESS
	 * @static
	 * @final
	 */
	ParseError.INVALID_EMAIL_ADDRESS = 125;

	/**
	 * Error code indicating a missing content type.
	 * @property MISSING_CONTENT_TYPE
	 * @static
	 * @final
	 */
	ParseError.MISSING_CONTENT_TYPE = 126;

	/**
	 * Error code indicating a missing content length.
	 * @property MISSING_CONTENT_LENGTH
	 * @static
	 * @final
	 */
	ParseError.MISSING_CONTENT_LENGTH = 127;

	/**
	 * Error code indicating an invalid content length.
	 * @property INVALID_CONTENT_LENGTH
	 * @static
	 * @final
	 */
	ParseError.INVALID_CONTENT_LENGTH = 128;

	/**
	 * Error code indicating a file that was too large.
	 * @property FILE_TOO_LARGE
	 * @static
	 * @final
	 */
	ParseError.FILE_TOO_LARGE = 129;

	/**
	 * Error code indicating an error saving a file.
	 * @property FILE_SAVE_ERROR
	 * @static
	 * @final
	 */
	ParseError.FILE_SAVE_ERROR = 130;

	/**
	 * Error code indicating that a unique field was given a value that is
	 * already taken.
	 * @property DUPLICATE_VALUE
	 * @static
	 * @final
	 */
	ParseError.DUPLICATE_VALUE = 137;

	/**
	 * Error code indicating that a role's name is invalid.
	 * @property INVALID_ROLE_NAME
	 * @static
	 * @final
	 */
	ParseError.INVALID_ROLE_NAME = 139;

	/**
	 * Error code indicating that an application quota was exceeded.  Upgrade to
	 * resolve.
	 * @property EXCEEDED_QUOTA
	 * @static
	 * @final
	 */
	ParseError.EXCEEDED_QUOTA = 140;

	/**
	 * Error code indicating that a Cloud Code script failed.
	 * @property SCRIPT_FAILED
	 * @static
	 * @final
	 */
	ParseError.SCRIPT_FAILED = 141;

	/**
	 * Error code indicating that a Cloud Code validation failed.
	 * @property VALIDATION_ERROR
	 * @static
	 * @final
	 */
	ParseError.VALIDATION_ERROR = 142;

	/**
	 * Error code indicating that invalid image data was provided.
	 * @property INVALID_IMAGE_DATA
	 * @static
	 * @final
	 */
	ParseError.INVALID_IMAGE_DATA = 143;

	/**
	 * Error code indicating an unsaved file.
	 * @property UNSAVED_FILE_ERROR
	 * @static
	 * @final
	 */
	ParseError.UNSAVED_FILE_ERROR = 151;

	/**
	 * Error code indicating an invalid push time.
	 * @property INVALID_PUSH_TIME_ERROR
	 * @static
	 * @final
	 */
	ParseError.INVALID_PUSH_TIME_ERROR = 152;

	/**
	 * Error code indicating an error deleting a file.
	 * @property FILE_DELETE_ERROR
	 * @static
	 * @final
	 */
	ParseError.FILE_DELETE_ERROR = 153;

	/**
	 * Error code indicating that the application has exceeded its request
	 * limit.
	 * @property REQUEST_LIMIT_EXCEEDED
	 * @static
	 * @final
	 */
	ParseError.REQUEST_LIMIT_EXCEEDED = 155;

	/**
	 * Error code indicating an invalid event name.
	 * @property INVALID_EVENT_NAME
	 * @static
	 * @final
	 */
	ParseError.INVALID_EVENT_NAME = 160;

	/**
	 * Error code indicating that the username is missing or empty.
	 * @property USERNAME_MISSING
	 * @static
	 * @final
	 */
	ParseError.USERNAME_MISSING = 200;

	/**
	 * Error code indicating that the password is missing or empty.
	 * @property PASSWORD_MISSING
	 * @static
	 * @final
	 */
	ParseError.PASSWORD_MISSING = 201;

	/**
	 * Error code indicating that the username has already been taken.
	 * @property USERNAME_TAKEN
	 * @static
	 * @final
	 */
	ParseError.USERNAME_TAKEN = 202;

	/**
	 * Error code indicating that the email has already been taken.
	 * @property EMAIL_TAKEN
	 * @static
	 * @final
	 */
	ParseError.EMAIL_TAKEN = 203;

	/**
	 * Error code indicating that the email is missing, but must be specified.
	 * @property EMAIL_MISSING
	 * @static
	 * @final
	 */
	ParseError.EMAIL_MISSING = 204;

	/**
	 * Error code indicating that a user with the specified email was not found.
	 * @property EMAIL_NOT_FOUND
	 * @static
	 * @final
	 */
	ParseError.EMAIL_NOT_FOUND = 205;

	/**
	 * Error code indicating that a user object without a valid session could
	 * not be altered.
	 * @property SESSION_MISSING
	 * @static
	 * @final
	 */
	ParseError.SESSION_MISSING = 206;

	/**
	 * Error code indicating that a user can only be created through signup.
	 * @property MUST_CREATE_USER_THROUGH_SIGNUP
	 * @static
	 * @final
	 */
	ParseError.MUST_CREATE_USER_THROUGH_SIGNUP = 207;

	/**
	 * Error code indicating that an an account being linked is already linked
	 * to another user.
	 * @property ACCOUNT_ALREADY_LINKED
	 * @static
	 * @final
	 */
	ParseError.ACCOUNT_ALREADY_LINKED = 208;

	/**
	 * Error code indicating that the current session token is invalid.
	 * @property INVALID_SESSION_TOKEN
	 * @static
	 * @final
	 */
	ParseError.INVALID_SESSION_TOKEN = 209;

	/**
	 * Error code indicating that a user cannot be linked to an account because
	 * that account's id could not be found.
	 * @property LINKED_ID_MISSING
	 * @static
	 * @final
	 */
	ParseError.LINKED_ID_MISSING = 250;

	/**
	 * Error code indicating that a user with a linked (e.g. Facebook) account
	 * has an invalid session.
	 * @property INVALID_LINKED_SESSION
	 * @static
	 * @final
	 */
	ParseError.INVALID_LINKED_SESSION = 251;

	/**
	 * Error code indicating that a service being linked (e.g. Facebook or
	 * Twitter) is unsupported.
	 * @property UNSUPPORTED_SERVICE
	 * @static
	 * @final
	 */
	ParseError.UNSUPPORTED_SERVICE = 252;

	/**
	 * Error code indicating that there were multiple errors. Aggregate errors
	 * have an "errors" property, which is an array of error objects with more
	 * detail about each error that occurred.
	 * @property AGGREGATE_ERROR
	 * @static
	 * @final
	 */
	ParseError.AGGREGATE_ERROR = 600;

	/**
	 * Error code indicating the client was unable to read an input file.
	 * @property FILE_READ_ERROR
	 * @static
	 * @final
	 */
	ParseError.FILE_READ_ERROR = 601;

	/**
	 * Error code indicating a real error code is unavailable because
	 * we had to use an XDomainRequest object to allow CORS requests in
	 * Internet Explorer, which strips the body from HTTP responses that have
	 * a non-2XX status code.
	 * @property X_DOMAIN_REQUEST
	 * @static
	 * @final
	 */
	ParseError.X_DOMAIN_REQUEST = 602;

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * -weak
	 */

	import parseDate from './parseDate';
	import ParseUser from './ParseUser';

	var PUBLIC_KEY = "*";

	var initialized = false;
	var requestedPermissions;
	var initOptions;
	var provider = {
	  authenticate(options) {
	    if (typeof FB === 'undefined') {
	      options.error(this, 'Facebook SDK not found.');
	    }
	    FB.login(response => {
	      if (response.authResponse) {
	        if (options.success) {
	          options.success(this, {
	            id: response.authResponse.userID,
	            access_token: response.authResponse.accessToken,
	            expiration_date: new Date(response.authResponse.expiresIn * 1000 + new Date().getTime()).toJSON()
	          });
	        }
	      } else {
	        if (options.error) {
	          options.error(this, response);
	        }
	      }
	    }, {
	      scope: requestedPermissions
	    });
	  },

	  restoreAuthentication(authData) {
	    if (authData) {
	      var expiration = parseDate(authData.expiration_date);
	      var expiresIn = expiration ? (expiration.getTime() - new Date().getTime()) / 1000 : 0;

	      var authResponse = {
	        userID: authData.id,
	        accessToken: authData.access_token,
	        expiresIn: expiresIn
	      };
	      var newOptions = {};
	      if (initOptions) {
	        for (var key in initOptions) {
	          newOptions[key] = initOptions[key];
	        }
	      }
	      newOptions.authResponse = authResponse;

	      // Suppress checks for login status from the browser.
	      newOptions.status = false;

	      // If the user doesn't match the one known by the FB SDK, log out.
	      // Most of the time, the users will match -- it's only in cases where
	      // the FB SDK knows of a different user than the one being restored
	      // from a Parse User that logged in with username/password.
	      var existingResponse = FB.getAuthResponse();
	      if (existingResponse && existingResponse.userID !== authResponse.userID) {
	        FB.logout();
	      }

	      FB.init(newOptions);
	    }
	    return true;
	  },

	  getAuthType() {
	    return 'facebook';
	  },

	  deauthenticate() {
	    this.restoreAuthentication(null);
	  }
	};

	/**
	 * Provides a set of utilities for using Parse with Facebook.
	 * @class Parse.FacebookUtils
	 * @static
	 */
	var FacebookUtils = {
	  /**
	   * Initializes Parse Facebook integration.  Call this function after you
	   * have loaded the Facebook Javascript SDK with the same parameters
	   * as you would pass to<code>
	   * <a href=
	   * "https://developers.facebook.com/docs/reference/javascript/FB.init/">
	   * FB.init()</a></code>.  Parse.FacebookUtils will invoke FB.init() for you
	   * with these arguments.
	   *
	   * @method init
	   * @param {Object} options Facebook options argument as described here:
	   *   <a href=
	   *   "https://developers.facebook.com/docs/reference/javascript/FB.init/">
	   *   FB.init()</a>. The status flag will be coerced to 'false' because it
	   *   interferes with Parse Facebook integration. Call FB.getLoginStatus()
	   *   explicitly if this behavior is required by your application.
	   */
	  init(options) {
	    if (typeof FB === 'undefined') {
	      throw new Error('The Facebook JavaScript SDK must be loaded before calling init.');
	    }
	    initOptions = {};
	    if (options) {
	      for (var key in options) {
	        initOptions[key] = options[key];
	      }
	    }
	    if (initOptions.status && typeof console !== 'undefined') {
	      var warn = console.warn || console.log || function () {};
	      warn.call(console, 'The "status" flag passed into' + ' FB.init, when set to true, can interfere with Parse Facebook' + ' integration, so it has been suppressed. Please call' + ' FB.getLoginStatus() explicitly if you require this behavior.');
	    }
	    initOptions.status = false;
	    FB.init(initOptions);
	    ParseUser._registerAuthenticationProvider(provider);
	    initialized = true;
	  },

	  /**
	   * Gets whether the user has their account linked to Facebook.
	   *
	   * @method isLinked
	   * @param {Parse.User} user User to check for a facebook link.
	   *     The user must be logged in on this device.
	   * @return {Boolean} <code>true</code> if the user has their account
	   *     linked to Facebook.
	   */
	  isLinked(user) {
	    return user._isLinked('facebook');
	  },

	  /**
	   * Logs in a user using Facebook. This method delegates to the Facebook
	   * SDK to authenticate the user, and then automatically logs in (or
	   * creates, in the case where it is a new user) a Parse.User.
	   *
	   * @method logIn
	   * @param {String, Object} permissions The permissions required for Facebook
	   *    log in.  This is a comma-separated string of permissions.
	   *    Alternatively, supply a Facebook authData object as described in our
	   *    REST API docs if you want to handle getting facebook auth tokens
	   *    yourself.
	   * @param {Object} options Standard options object with success and error
	   *    callbacks.
	   */
	  logIn(permissions, options) {
	    if (!permissions || typeof permissions === 'string') {
	      if (!initialized) {
	        throw new Error('You must initialize FacebookUtils before calling logIn.');
	      }
	      requestedPermissions = permissions;
	      return ParseUser._logInWith('facebook', options);
	    } else {
	      var newOptions = {};
	      if (options) {
	        for (var key in options) {
	          newOptions[key] = options[key];
	        }
	      }
	      newOptions.authData = permissions;
	      return ParseUser._logInWith('facebook', newOptions);
	    }
	  },

	  /**
	   * Links Facebook to an existing PFUser. This method delegates to the
	   * Facebook SDK to authenticate the user, and then automatically links
	   * the account to the Parse.User.
	   *
	   * @method link
	   * @param {Parse.User} user User to link to Facebook. This must be the
	   *     current user.
	   * @param {String, Object} permissions The permissions required for Facebook
	   *    log in.  This is a comma-separated string of permissions.
	   *    Alternatively, supply a Facebook authData object as described in our
	   *    REST API docs if you want to handle getting facebook auth tokens
	   *    yourself.
	   * @param {Object} options Standard options object with success and error
	   *    callbacks.
	   */
	  link(user, permissions, options) {
	    if (!permissions || typeof permissions === 'string') {
	      if (!initialized) {
	        throw new Error('You must initialize FacebookUtils before calling link.');
	      }
	      requestedPermissions = permissions;
	      return user._linkWith('facebook', options);
	    } else {
	      var newOptions = {};
	      if (options) {
	        for (var key in options) {
	          newOptions[key] = options[key];
	        }
	      }
	      newOptions.authData = permissions;
	      return user._linkWith('facebook', newOptions);
	    }
	  },

	  /**
	   * Unlinks the Parse.User from a Facebook account.
	   *
	   * @method unlink
	   * @param {Parse.User} user User to unlink from Facebook. This must be the
	   *     current user.
	   * @param {Object} options Standard options object with success and error
	   *    callbacks.
	   */
	  unlink: function (user, options) {
	    if (!initialized) {
	      throw new Error('You must initialize FacebookUtils before calling unlink.');
	    }
	    return user._unlinkFrom('facebook', options);
	  }
	};

	export default FacebookUtils;

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import CoreManager from './CoreManager';
	import ParsePromise from './ParsePromise';

	var dataUriRegexp = /^data:([a-zA-Z]*\/[a-zA-Z+.-]*);(charset=[a-zA-Z0-9\-\/\s]*,)?base64,/;

	function b64Digit(number) {
	  if (number < 26) {
	    return String.fromCharCode(65 + number);
	  }
	  if (number < 52) {
	    return String.fromCharCode(97 + (number - 26));
	  }
	  if (number < 62) {
	    return String.fromCharCode(48 + (number - 52));
	  }
	  if (number === 62) {
	    return '+';
	  }
	  if (number === 63) {
	    return '/';
	  }
	  throw new TypeError('Tried to encode large digit ' + number + ' in base64.');
	}

	/**
	 * A Parse.File is a local representation of a file that is saved to the Parse
	 * cloud.
	 * @class Parse.File
	 * @constructor
	 * @param name {String} The file's name. This will be prefixed by a unique
	 *     value once the file has finished saving. The file name must begin with
	 *     an alphanumeric character, and consist of alphanumeric characters,
	 *     periods, spaces, underscores, or dashes.
	 * @param data {Array} The data for the file, as either:
	 *     1. an Array of byte value Numbers, or
	 *     2. an Object like { base64: "..." } with a base64-encoded String.
	 *     3. a File object selected with a file upload control. (3) only works
	 *        in Firefox 3.6+, Safari 6.0.2+, Chrome 7+, and IE 10+.
	 *        For example:<pre>
	 * var fileUploadControl = $("#profilePhotoFileUpload")[0];
	 * if (fileUploadControl.files.length > 0) {
	 *   var file = fileUploadControl.files[0];
	 *   var name = "photo.jpg";
	 *   var parseFile = new Parse.File(name, file);
	 *   parseFile.save().then(function() {
	 *     // The file has been saved to Parse.
	 *   }, function(error) {
	 *     // The file either could not be read, or could not be saved to Parse.
	 *   });
	 * }</pre>
	 * @param type {String} Optional Content-Type header to use for the file. If
	 *     this is omitted, the content type will be inferred from the name's
	 *     extension.
	 */
	export default class ParseFile {

	  constructor(name, data, type) {
	    var specifiedType = type || '';

	    this._name = name;

	    if (data !== undefined) {
	      if (Array.isArray(data)) {
	        this._source = {
	          format: 'base64',
	          base64: ParseFile.encodeBase64(data),
	          type: specifiedType
	        };
	      } else if (typeof File !== 'undefined' && data instanceof File) {
	        this._source = {
	          format: 'file',
	          file: data,
	          type: specifiedType
	        };
	      } else if (data && typeof data.base64 === 'string') {
	        const base64 = data.base64;
	        var commaIndex = base64.indexOf(',');

	        if (commaIndex !== -1) {
	          var matches = dataUriRegexp.exec(base64.slice(0, commaIndex + 1));
	          // if data URI with type and charset, there will be 4 matches.
	          this._source = {
	            format: 'base64',
	            base64: base64.slice(commaIndex + 1),
	            type: matches[1]
	          };
	        } else {
	          this._source = {
	            format: 'base64',
	            base64: base64,
	            type: specifiedType
	          };
	        }
	      } else {
	        throw new TypeError('Cannot create a Parse.File with that data.');
	      }
	    }
	  }

	  /**
	   * Gets the name of the file. Before save is called, this is the filename
	   * given by the user. After save is called, that name gets prefixed with a
	   * unique identifier.
	   * @method name
	   * @return {String}
	   */
	  name() {
	    return this._name;
	  }

	  /**
	   * Gets the url of the file. It is only available after you save the file or
	   * after you get the file from a Parse.Object.
	   * @method url
	   * @param {Object} options An object to specify url options
	   * @return {String}
	   */
	  url(options) {
	    options = options || {};
	    if (!this._url) {
	      return;
	    }
	    if (options.forceSecure) {
	      return this._url.replace(/^http:\/\//i, 'https://');
	    } else {
	      return this._url;
	    }
	  }

	  /**
	   * Saves the file to the Parse cloud.
	   * @method save
	   * @param {Object} options A Backbone-style options object.
	   * @return {Parse.Promise} Promise that is resolved when the save finishes.
	   */
	  save(options) {
	    options = options || {};
	    var controller = CoreManager.getFileController();
	    if (!this._previousSave) {
	      if (this._source.format === 'file') {
	        this._previousSave = controller.saveFile(this._name, this._source).then(res => {
	          this._name = res.name;
	          this._url = res.url;
	          return this;
	        });
	      } else {
	        this._previousSave = controller.saveBase64(this._name, this._source).then(res => {
	          this._name = res.name;
	          this._url = res.url;
	          return this;
	        });
	      }
	    }
	    if (this._previousSave) {
	      return this._previousSave._thenRunCallbacks(options);
	    }
	  }

	  toJSON() {
	    return {
	      __type: 'File',
	      name: this._name,
	      url: this._url
	    };
	  }

	  equals(other) {
	    if (this === other) {
	      return true;
	    }
	    // Unsaved Files are never equal, since they will be saved to different URLs
	    return other instanceof ParseFile && this.name() === other.name() && this.url() === other.url() && typeof this.url() !== 'undefined';
	  }

	  static fromJSON(obj) {
	    if (obj.__type !== 'File') {
	      throw new TypeError('JSON object does not represent a ParseFile');
	    }
	    var file = new ParseFile(obj.name);
	    file._url = obj.url;
	    return file;
	  }

	  static encodeBase64(bytes) {
	    var chunks = [];
	    chunks.length = Math.ceil(bytes.length / 3);
	    for (var i = 0; i < chunks.length; i++) {
	      var b1 = bytes[i * 3];
	      var b2 = bytes[i * 3 + 1] || 0;
	      var b3 = bytes[i * 3 + 2] || 0;

	      var has2 = i * 3 + 1 < bytes.length;
	      var has3 = i * 3 + 2 < bytes.length;

	      chunks[i] = [b64Digit(b1 >> 2 & 0x3F), b64Digit(b1 << 4 & 0x30 | b2 >> 4 & 0x0F), has2 ? b64Digit(b2 << 2 & 0x3C | b3 >> 6 & 0x03) : '=', has3 ? b64Digit(b3 & 0x3F) : '='].join('');
	    }

	    return chunks.join('');
	  }
	}

	var DefaultController = {
	  saveFile: function (name, source) {
	    if (source.format !== 'file') {
	      throw new Error('saveFile can only be used with File-type sources.');
	    }
	    // To directly upload a File, we use a REST-style AJAX request
	    var headers = {
	      'X-Parse-Application-ID': CoreManager.get('APPLICATION_ID'),
	      'X-Parse-JavaScript-Key': CoreManager.get('JAVASCRIPT_KEY'),
	      'Content-Type': source.type || (source.file ? source.file.type : null)
	    };
	    var url = CoreManager.get('SERVER_URL');
	    if (url[url.length - 1] !== '/') {
	      url += '/';
	    }
	    url += 'files/' + name;
	    return CoreManager.getRESTController().ajax('POST', url, source.file, headers);
	  },

	  saveBase64: function (name, source) {
	    if (source.format !== 'base64') {
	      throw new Error('saveBase64 can only be used with Base64-type sources.');
	    }
	    var data = {
	      base64: source.base64
	    };
	    if (source.type) {
	      data._ContentType = source.type;
	    }

	    return CoreManager.getRESTController().request('POST', 'files/' + name, data);
	  }
	};

	CoreManager.setFileController(DefaultController);

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import ParsePromise from './ParsePromise';

	/**
	 * Creates a new GeoPoint with any of the following forms:<br>
	 *   <pre>
	 *   new GeoPoint(otherGeoPoint)
	 *   new GeoPoint(30, 30)
	 *   new GeoPoint([30, 30])
	 *   new GeoPoint({latitude: 30, longitude: 30})
	 *   new GeoPoint()  // defaults to (0, 0)
	 *   </pre>
	 * @class Parse.GeoPoint
	 * @constructor
	 *
	 * <p>Represents a latitude / longitude point that may be associated
	 * with a key in a ParseObject or used as a reference point for geo queries.
	 * This allows proximity-based queries on the key.</p>
	 *
	 * <p>Only one key in a class may contain a GeoPoint.</p>
	 *
	 * <p>Example:<pre>
	 *   var point = new Parse.GeoPoint(30.0, -20.0);
	 *   var object = new Parse.Object("PlaceObject");
	 *   object.set("location", point);
	 *   object.save();</pre></p>
	 */
	export default class ParseGeoPoint {

	  constructor(arg1, arg2) {
	    if (Array.isArray(arg1)) {
	      ParseGeoPoint._validate(arg1[0], arg1[1]);
	      this._latitude = arg1[0];
	      this._longitude = arg1[1];
	    } else if (typeof arg1 === 'object') {
	      ParseGeoPoint._validate(arg1.latitude, arg1.longitude);
	      this._latitude = arg1.latitude;
	      this._longitude = arg1.longitude;
	    } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
	      ParseGeoPoint._validate(arg1, arg2);
	      this._latitude = arg1;
	      this._longitude = arg2;
	    } else {
	      this._latitude = 0;
	      this._longitude = 0;
	    }
	  }

	  /**
	   * North-south portion of the coordinate, in range [-90, 90].
	   * Throws an exception if set out of range in a modern browser.
	   * @property latitude
	   * @type Number
	   */
	  get latitude() {
	    return this._latitude;
	  }

	  set latitude(val) {
	    ParseGeoPoint._validate(val, this.longitude);
	    this._latitude = val;
	  }

	  /**
	   * East-west portion of the coordinate, in range [-180, 180].
	   * Throws if set out of range in a modern browser.
	   * @property longitude
	   * @type Number
	   */
	  get longitude() {
	    return this._longitude;
	  }

	  set longitude(val) {
	    ParseGeoPoint._validate(this.latitude, val);
	    this._longitude = val;
	  }

	  /**
	   * Returns a JSON representation of the GeoPoint, suitable for Parse.
	   * @method toJSON
	   * @return {Object}
	   */
	  toJSON() {
	    ParseGeoPoint._validate(this._latitude, this._longitude);
	    return {
	      __type: 'GeoPoint',
	      latitude: this._latitude,
	      longitude: this._longitude
	    };
	  }

	  equals(other) {
	    return other instanceof ParseGeoPoint && this.latitude === other.latitude && this.longitude === other.longitude;
	  }

	  /**
	   * Returns the distance from this GeoPoint to another in radians.
	   * @method radiansTo
	   * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
	   * @return {Number}
	   */
	  radiansTo(point) {
	    var d2r = Math.PI / 180.0;
	    var lat1rad = this.latitude * d2r;
	    var long1rad = this.longitude * d2r;
	    var lat2rad = point.latitude * d2r;
	    var long2rad = point.longitude * d2r;

	    var sinDeltaLatDiv2 = Math.sin((lat1rad - lat2rad) / 2);
	    var sinDeltaLongDiv2 = Math.sin((long1rad - long2rad) / 2);
	    // Square of half the straight line chord distance between both points.
	    var a = sinDeltaLatDiv2 * sinDeltaLatDiv2 + Math.cos(lat1rad) * Math.cos(lat2rad) * sinDeltaLongDiv2 * sinDeltaLongDiv2;
	    a = Math.min(1.0, a);
	    return 2 * Math.asin(Math.sqrt(a));
	  }

	  /**
	   * Returns the distance from this GeoPoint to another in kilometers.
	   * @method kilometersTo
	   * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
	   * @return {Number}
	   */
	  kilometersTo(point) {
	    return this.radiansTo(point) * 6371.0;
	  }

	  /**
	   * Returns the distance from this GeoPoint to another in miles.
	   * @method milesTo
	   * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
	   * @return {Number}
	   */
	  milesTo(point) {
	    return this.radiansTo(point) * 3958.8;
	  }

	  /**
	   * Throws an exception if the given lat-long is out of bounds.
	   */
	  static _validate(latitude, longitude) {
	    if (latitude !== latitude || longitude !== longitude) {
	      throw new TypeError('GeoPoint latitude and longitude must be valid numbers');
	    }
	    if (latitude < -90.0) {
	      throw new TypeError('GeoPoint latitude out of bounds: ' + latitude + ' < -90.0.');
	    }
	    if (latitude > 90.0) {
	      throw new TypeError('GeoPoint latitude out of bounds: ' + latitude + ' > 90.0.');
	    }
	    if (longitude < -180.0) {
	      throw new TypeError('GeoPoint longitude out of bounds: ' + longitude + ' < -180.0.');
	    }
	    if (longitude > 180.0) {
	      throw new TypeError('GeoPoint longitude out of bounds: ' + longitude + ' > 180.0.');
	    }
	  }

	  /**
	   * Creates a GeoPoint with the user's current location, if available.
	   * Calls options.success with a new GeoPoint instance or calls options.error.
	   * @method current
	   * @param {Object} options An object with success and error callbacks.
	   * @static
	   */
	  static current(options) {
	    var promise = new ParsePromise();
	    navigator.geolocation.getCurrentPosition(function (location) {
	      promise.resolve(new ParseGeoPoint(location.coords.latitude, location.coords.longitude));
	    }, function (error) {
	      promise.reject(error);
	    });

	    return promise._thenRunCallbacks(options);
	  }
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import ParseObject from './ParseObject';

	export default class Installation extends ParseObject {
	  constructor(attributes) {
	    super('_Installation');
	    if (attributes && typeof attributes === 'object') {
	      if (!this.set(attributes || {})) {
	        throw new Error('Can\'t create an invalid Session');
	      }
	    }
	  }
	}

	ParseObject.registerSubclass('_Installation', Installation);

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import CoreManager from './CoreManager';
	import canBeSerialized from './canBeSerialized';
	import decode from './decode';
	import encode from './encode';
	import equals from './equals';
	import escape from './escape';
	import ParseACL from './ParseACL';
	import parseDate from './parseDate';
	import ParseError from './ParseError';
	import ParseFile from './ParseFile';
	import { opFromJSON, Op, SetOp, UnsetOp, IncrementOp, AddOp, AddUniqueOp, RemoveOp, RelationOp } from './ParseOp';
	import ParsePromise from './ParsePromise';
	import ParseQuery from './ParseQuery';
	import ParseRelation from './ParseRelation';
	import * as SingleInstanceStateController from './SingleInstanceStateController';
	import unique from './unique';
	import * as UniqueInstanceStateController from './UniqueInstanceStateController';
	import unsavedChildren from './unsavedChildren';

	// Mapping of class names to constructors, so we can populate objects from the
	// server with appropriate subclasses of ParseObject
	var classMap = {};

	// Global counter for generating unique local Ids
	var localCount = 0;
	// Global counter for generating unique Ids for non-single-instance objects
	var objectCount = 0;
	// On web clients, objects are single-instance: any two objects with the same Id
	// will have the same attributes. However, this may be dangerous default
	// behavior in a server scenario
	var singleInstance = !CoreManager.get('IS_NODE');
	if (singleInstance) {
	  CoreManager.setObjectStateController(SingleInstanceStateController);
	} else {
	  CoreManager.setObjectStateController(UniqueInstanceStateController);
	}

	function getServerUrlPath() {
	  var serverUrl = CoreManager.get('SERVER_URL');
	  if (serverUrl[serverUrl.length - 1] !== '/') {
	    serverUrl += '/';
	  }
	  var url = serverUrl.replace(/https?:\/\//, '');
	  return url.substr(url.indexOf('/'));
	}

	/**
	 * Creates a new model with defined attributes.
	 *
	 * <p>You won't normally call this method directly.  It is recommended that
	 * you use a subclass of <code>Parse.Object</code> instead, created by calling
	 * <code>extend</code>.</p>
	 *
	 * <p>However, if you don't want to use a subclass, or aren't sure which
	 * subclass is appropriate, you can use this form:<pre>
	 *     var object = new Parse.Object("ClassName");
	 * </pre>
	 * That is basically equivalent to:<pre>
	 *     var MyClass = Parse.Object.extend("ClassName");
	 *     var object = new MyClass();
	 * </pre></p>
	 *
	 * @class Parse.Object
	 * @constructor
	 * @param {String} className The class name for the object
	 * @param {Object} attributes The initial set of data to store in the object.
	 * @param {Object} options The options for this object instance.
	 */
	export default class ParseObject {
	  /**
	   * The ID of this object, unique within its class.
	   * @property id
	   * @type String
	   */
	  constructor(className, attributes, options) {
	    // Enable legacy initializers
	    if (typeof this.initialize === 'function') {
	      this.initialize.apply(this, arguments);
	    }

	    var toSet = null;
	    this._objCount = objectCount++;
	    if (typeof className === 'string') {
	      this.className = className;
	      if (attributes && typeof attributes === 'object') {
	        toSet = attributes;
	      }
	    } else if (className && typeof className === 'object') {
	      this.className = className.className;
	      toSet = {};
	      for (var attr in className) {
	        if (attr !== 'className') {
	          toSet[attr] = className[attr];
	        }
	      }
	      if (attributes && typeof attributes === 'object') {
	        options = attributes;
	      }
	    }
	    if (toSet && !this.set(toSet, options)) {
	      throw new Error('Can\'t create an invalid Parse Object');
	    }
	  }

	  /** Prototype getters / setters **/

	  get attributes() {
	    let stateController = CoreManager.getObjectStateController();
	    return Object.freeze(stateController.estimateAttributes(this._getStateIdentifier()));
	  }

	  /**
	   * The first time this object was saved on the server.
	   * @property createdAt
	   * @type Date
	   */
	  get createdAt() {
	    return this._getServerData().createdAt;
	  }

	  /**
	   * The last time this object was updated on the server.
	   * @property updatedAt
	   * @type Date
	   */
	  get updatedAt() {
	    return this._getServerData().updatedAt;
	  }

	  /** Private methods **/

	  /**
	   * Returns a local or server Id used uniquely identify this object
	   */
	  _getId() {
	    if (typeof this.id === 'string') {
	      return this.id;
	    }
	    if (typeof this._localId === 'string') {
	      return this._localId;
	    }
	    var localId = 'local' + String(localCount++);
	    this._localId = localId;
	    return localId;
	  }

	  /**
	   * Returns a unique identifier used to pull data from the State Controller.
	   */
	  _getStateIdentifier() {
	    if (singleInstance) {
	      let id = this.id;
	      if (!id) {
	        id = this._getId();
	      }
	      return {
	        id: id,
	        className: this.className
	      };
	    } else {
	      return this;
	    }
	  }

	  _getServerData() {
	    let stateController = CoreManager.getObjectStateController();
	    return stateController.getServerData(this._getStateIdentifier());
	  }

	  _clearServerData() {
	    var serverData = this._getServerData();
	    var unset = {};
	    for (var attr in serverData) {
	      unset[attr] = undefined;
	    }
	    let stateController = CoreManager.getObjectStateController();
	    stateController.setServerData(this._getStateIdentifier(), unset);
	  }

	  _getPendingOps() {
	    let stateController = CoreManager.getObjectStateController();
	    return stateController.getPendingOps(this._getStateIdentifier());
	  }

	  _clearPendingOps() {
	    var pending = this._getPendingOps();
	    var latest = pending[pending.length - 1];
	    var keys = Object.keys(latest);
	    keys.forEach(key => {
	      delete latest[key];
	    });
	  }

	  _getDirtyObjectAttributes() {
	    var attributes = this.attributes;
	    var stateController = CoreManager.getObjectStateController();
	    var objectCache = stateController.getObjectCache(this._getStateIdentifier());
	    var dirty = {};
	    for (var attr in attributes) {
	      var val = attributes[attr];
	      if (val && typeof val === 'object' && !(val instanceof ParseObject) && !(val instanceof ParseFile) && !(val instanceof ParseRelation)) {
	        // Due to the way browsers construct maps, the key order will not change
	        // unless the object is changed
	        try {
	          var json = encode(val, false, true);
	          var stringified = JSON.stringify(json);
	          if (objectCache[attr] !== stringified) {
	            dirty[attr] = val;
	          }
	        } catch (e) {
	          // Error occurred, possibly by a nested unsaved pointer in a mutable container
	          // No matter how it happened, it indicates a change in the attribute
	          dirty[attr] = val;
	        }
	      }
	    }
	    return dirty;
	  }

	  _toFullJSON(seen) {
	    var json = this.toJSON(seen);
	    json.__type = 'Object';
	    json.className = this.className;
	    return json;
	  }

	  _getSaveJSON() {
	    var pending = this._getPendingOps();
	    var dirtyObjects = this._getDirtyObjectAttributes();
	    var json = {};

	    for (var attr in dirtyObjects) {
	      json[attr] = new SetOp(dirtyObjects[attr]).toJSON();
	    }
	    for (attr in pending[0]) {
	      json[attr] = pending[0][attr].toJSON();
	    }
	    return json;
	  }

	  _getSaveParams() {
	    var method = this.id ? 'PUT' : 'POST';
	    var body = this._getSaveJSON();
	    var path = 'classes/' + this.className;
	    if (this.id) {
	      path += '/' + this.id;
	    } else if (this.className === '_User') {
	      path = 'users';
	    }
	    return {
	      method,
	      body,
	      path
	    };
	  }

	  _finishFetch(serverData) {
	    if (!this.id && serverData.objectId) {
	      this.id = serverData.objectId;
	    }
	    let stateController = CoreManager.getObjectStateController();
	    stateController.initializeState(this._getStateIdentifier());
	    var decoded = {};
	    for (var attr in serverData) {
	      if (attr === 'ACL') {
	        decoded[attr] = new ParseACL(serverData[attr]);
	      } else if (attr !== 'objectId') {
	        decoded[attr] = decode(serverData[attr]);
	        if (decoded[attr] instanceof ParseRelation) {
	          decoded[attr]._ensureParentAndKey(this, attr);
	        }
	      }
	    }
	    if (decoded.createdAt && typeof decoded.createdAt === 'string') {
	      decoded.createdAt = parseDate(decoded.createdAt);
	    }
	    if (decoded.updatedAt && typeof decoded.updatedAt === 'string') {
	      decoded.updatedAt = parseDate(decoded.updatedAt);
	    }
	    if (!decoded.updatedAt && decoded.createdAt) {
	      decoded.updatedAt = decoded.createdAt;
	    }
	    stateController.commitServerChanges(this._getStateIdentifier(), decoded);
	  }

	  _setExisted(existed) {
	    let stateController = CoreManager.getObjectStateController();
	    let state = stateController.getState(this._getStateIdentifier());
	    if (state) {
	      state.existed = existed;
	    }
	  }

	  _migrateId(serverId) {
	    if (this._localId && serverId) {
	      if (singleInstance) {
	        let stateController = CoreManager.getObjectStateController();
	        let oldState = stateController.removeState(this._getStateIdentifier());
	        this.id = serverId;
	        delete this._localId;
	        if (oldState) {
	          stateController.initializeState(this._getStateIdentifier(), oldState);
	        }
	      } else {
	        this.id = serverId;
	        delete this._localId;
	      }
	    }
	  }

	  _handleSaveResponse(response, status) {
	    var changes = {};

	    var stateController = CoreManager.getObjectStateController();
	    var pending = stateController.popPendingState(this._getStateIdentifier());
	    for (var attr in pending) {
	      if (pending[attr] instanceof RelationOp) {
	        changes[attr] = pending[attr].applyTo(undefined, this, attr);
	      } else if (!(attr in response)) {
	        // Only SetOps and UnsetOps should not come back with results
	        changes[attr] = pending[attr].applyTo(undefined);
	      }
	    }
	    for (attr in response) {
	      if ((attr === 'createdAt' || attr === 'updatedAt') && typeof response[attr] === 'string') {
	        changes[attr] = parseDate(response[attr]);
	      } else if (attr === 'ACL') {
	        changes[attr] = new ParseACL(response[attr]);
	      } else if (attr !== 'objectId') {
	        changes[attr] = decode(response[attr]);
	        if (changes[attr] instanceof UnsetOp) {
	          changes[attr] = undefined;
	        }
	      }
	    }
	    if (changes.createdAt && !changes.updatedAt) {
	      changes.updatedAt = changes.createdAt;
	    }

	    this._migrateId(response.objectId);

	    if (status !== 201) {
	      this._setExisted(true);
	    }

	    stateController.commitServerChanges(this._getStateIdentifier(), changes);
	  }

	  _handleSaveError() {
	    this._getPendingOps();

	    let stateController = CoreManager.getObjectStateController();
	    stateController.mergeFirstPendingState(this._getStateIdentifier());
	  }

	  /** Public methods **/

	  initialize() {}
	  // NOOP


	  /**
	   * Returns a JSON version of the object suitable for saving to Parse.
	   * @method toJSON
	   * @return {Object}
	   */
	  toJSON(seen) {
	    var seenEntry = this.id ? this.className + ':' + this.id : this;
	    var seen = seen || [seenEntry];
	    var json = {};
	    var attrs = this.attributes;
	    for (var attr in attrs) {
	      if ((attr === 'createdAt' || attr === 'updatedAt') && attrs[attr].toJSON) {
	        json[attr] = attrs[attr].toJSON();
	      } else {
	        json[attr] = encode(attrs[attr], false, false, seen);
	      }
	    }
	    var pending = this._getPendingOps();
	    for (var attr in pending[0]) {
	      json[attr] = pending[0][attr].toJSON();
	    }

	    if (this.id) {
	      json.objectId = this.id;
	    }
	    return json;
	  }

	  /**
	   * Determines whether this ParseObject is equal to another ParseObject
	   * @method equals
	   * @return {Boolean}
	   */
	  equals(other) {
	    if (this === other) {
	      return true;
	    }
	    return other instanceof ParseObject && this.className === other.className && this.id === other.id && typeof this.id !== 'undefined';
	  }

	  /**
	   * Returns true if this object has been modified since its last
	   * save/refresh.  If an attribute is specified, it returns true only if that
	   * particular attribute has been modified since the last save/refresh.
	   * @method dirty
	   * @param {String} attr An attribute name (optional).
	   * @return {Boolean}
	   */
	  dirty(attr) {
	    if (!this.id) {
	      return true;
	    }
	    var pendingOps = this._getPendingOps();
	    var dirtyObjects = this._getDirtyObjectAttributes();
	    if (attr) {
	      if (dirtyObjects.hasOwnProperty(attr)) {
	        return true;
	      }
	      for (var i = 0; i < pendingOps.length; i++) {
	        if (pendingOps[i].hasOwnProperty(attr)) {
	          return true;
	        }
	      }
	      return false;
	    }
	    if (Object.keys(pendingOps[0]).length !== 0) {
	      return true;
	    }
	    if (Object.keys(dirtyObjects).length !== 0) {
	      return true;
	    }
	    return false;
	  }

	  /**
	   * Returns an array of keys that have been modified since last save/refresh
	   * @method dirtyKeys
	   * @return {Array of string}
	   */
	  dirtyKeys() {
	    var pendingOps = this._getPendingOps();
	    var keys = {};
	    for (var i = 0; i < pendingOps.length; i++) {
	      for (var attr in pendingOps[i]) {
	        keys[attr] = true;
	      }
	    }
	    var dirtyObjects = this._getDirtyObjectAttributes();
	    for (var attr in dirtyObjects) {
	      keys[attr] = true;
	    }
	    return Object.keys(keys);
	  }

	  /**
	   * Gets a Pointer referencing this Object.
	   * @method toPointer
	   * @return {Object}
	   */
	  toPointer() {
	    if (!this.id) {
	      throw new Error('Cannot create a pointer to an unsaved ParseObject');
	    }
	    return {
	      __type: 'Pointer',
	      className: this.className,
	      objectId: this.id
	    };
	  }

	  /**
	   * Gets the value of an attribute.
	   * @method get
	   * @param {String} attr The string name of an attribute.
	   */
	  get(attr) {
	    return this.attributes[attr];
	  }

	  /**
	   * Gets a relation on the given class for the attribute.
	   * @method relation
	   * @param String attr The attribute to get the relation for.
	   */
	  relation(attr) {
	    var value = this.get(attr);
	    if (value) {
	      if (!(value instanceof ParseRelation)) {
	        throw new Error('Called relation() on non-relation field ' + attr);
	      }
	      value._ensureParentAndKey(this, attr);
	      return value;
	    }
	    return new ParseRelation(this, attr);
	  }

	  /**
	   * Gets the HTML-escaped value of an attribute.
	   * @method escape
	   * @param {String} attr The string name of an attribute.
	   */
	  escape(attr) {
	    var val = this.attributes[attr];
	    if (val == null) {
	      return '';
	    }

	    if (typeof val !== 'string') {
	      if (typeof val.toString !== 'function') {
	        return '';
	      }
	      val = val.toString();
	    }
	    return escape(val);
	  }

	  /**
	   * Returns <code>true</code> if the attribute contains a value that is not
	   * null or undefined.
	   * @method has
	   * @param {String} attr The string name of the attribute.
	   * @return {Boolean}
	   */
	  has(attr) {
	    var attributes = this.attributes;
	    if (attributes.hasOwnProperty(attr)) {
	      return attributes[attr] != null;
	    }
	    return false;
	  }

	  /**
	   * Sets a hash of model attributes on the object.
	   *
	   * <p>You can call it with an object containing keys and values, or with one
	   * key and value.  For example:<pre>
	   *   gameTurn.set({
	   *     player: player1,
	   *     diceRoll: 2
	   *   }, {
	   *     error: function(gameTurnAgain, error) {
	   *       // The set failed validation.
	   *     }
	   *   });
	   *
	   *   game.set("currentPlayer", player2, {
	   *     error: function(gameTurnAgain, error) {
	   *       // The set failed validation.
	   *     }
	   *   });
	   *
	   *   game.set("finished", true);</pre></p>
	   *
	   * @method set
	   * @param {String} key The key to set.
	   * @param {} value The value to give it.
	   * @param {Object} options A set of options for the set.
	   *     The only supported option is <code>error</code>.
	   * @return {Boolean} true if the set succeeded.
	   */
	  set(key, value, options) {
	    var changes = {};
	    var newOps = {};
	    if (key && typeof key === 'object') {
	      changes = key;
	      options = value;
	    } else if (typeof key === 'string') {
	      changes[key] = value;
	    } else {
	      return this;
	    }

	    options = options || {};
	    var readonly = [];
	    if (typeof this.constructor.readOnlyAttributes === 'function') {
	      readonly = readonly.concat(this.constructor.readOnlyAttributes());
	    }
	    for (var k in changes) {
	      if (k === 'createdAt' || k === 'updatedAt') {
	        // This property is read-only, but for legacy reasons we silently
	        // ignore it
	        continue;
	      }
	      if (readonly.indexOf(k) > -1) {
	        throw new Error('Cannot modify readonly attribute: ' + k);
	      }
	      if (options.unset) {
	        newOps[k] = new UnsetOp();
	      } else if (changes[k] instanceof Op) {
	        newOps[k] = changes[k];
	      } else if (changes[k] && typeof changes[k] === 'object' && typeof changes[k].__op === 'string') {
	        newOps[k] = opFromJSON(changes[k]);
	      } else if (k === 'objectId' || k === 'id') {
	        if (typeof changes[k] === 'string') {
	          this.id = changes[k];
	        }
	      } else if (k === 'ACL' && typeof changes[k] === 'object' && !(changes[k] instanceof ParseACL)) {
	        newOps[k] = new SetOp(new ParseACL(changes[k]));
	      } else {
	        newOps[k] = new SetOp(changes[k]);
	      }
	    }

	    // Calculate new values
	    var currentAttributes = this.attributes;
	    var newValues = {};
	    for (var attr in newOps) {
	      if (newOps[attr] instanceof RelationOp) {
	        newValues[attr] = newOps[attr].applyTo(currentAttributes[attr], this, attr);
	      } else if (!(newOps[attr] instanceof UnsetOp)) {
	        newValues[attr] = newOps[attr].applyTo(currentAttributes[attr]);
	      }
	    }

	    // Validate changes
	    if (!options.ignoreValidation) {
	      var validation = this.validate(newValues);
	      if (validation) {
	        if (typeof options.error === 'function') {
	          options.error(this, validation);
	        }
	        return false;
	      }
	    }

	    // Consolidate Ops
	    var pendingOps = this._getPendingOps();
	    var last = pendingOps.length - 1;
	    var stateController = CoreManager.getObjectStateController();
	    for (var attr in newOps) {
	      var nextOp = newOps[attr].mergeWith(pendingOps[last][attr]);
	      stateController.setPendingOp(this._getStateIdentifier(), attr, nextOp);
	    }

	    return this;
	  }

	  /**
	   * Remove an attribute from the model. This is a noop if the attribute doesn't
	   * exist.
	   * @method unset
	   * @param {String} attr The string name of an attribute.
	   */
	  unset(attr, options) {
	    options = options || {};
	    options.unset = true;
	    return this.set(attr, null, options);
	  }

	  /**
	   * Atomically increments the value of the given attribute the next time the
	   * object is saved. If no amount is specified, 1 is used by default.
	   *
	   * @method increment
	   * @param attr {String} The key.
	   * @param amount {Number} The amount to increment by (optional).
	   */
	  increment(attr, amount) {
	    if (typeof amount === 'undefined') {
	      amount = 1;
	    }
	    if (typeof amount !== 'number') {
	      throw new Error('Cannot increment by a non-numeric amount.');
	    }
	    return this.set(attr, new IncrementOp(amount));
	  }

	  /**
	   * Atomically add an object to the end of the array associated with a given
	   * key.
	   * @method add
	   * @param attr {String} The key.
	   * @param item {} The item to add.
	   */
	  add(attr, item) {
	    return this.set(attr, new AddOp([item]));
	  }

	  /**
	   * Atomically add an object to the array associated with a given key, only
	   * if it is not already present in the array. The position of the insert is
	   * not guaranteed.
	   *
	   * @method addUnique
	   * @param attr {String} The key.
	   * @param item {} The object to add.
	   */
	  addUnique(attr, item) {
	    return this.set(attr, new AddUniqueOp([item]));
	  }

	  /**
	   * Atomically remove all instances of an object from the array associated
	   * with a given key.
	   *
	   * @method remove
	   * @param attr {String} The key.
	   * @param item {} The object to remove.
	   */
	  remove(attr, item) {
	    return this.set(attr, new RemoveOp([item]));
	  }

	  /**
	   * Returns an instance of a subclass of Parse.Op describing what kind of
	   * modification has been performed on this field since the last time it was
	   * saved. For example, after calling object.increment("x"), calling
	   * object.op("x") would return an instance of Parse.Op.Increment.
	   *
	   * @method op
	   * @param attr {String} The key.
	   * @returns {Parse.Op} The operation, or undefined if none.
	   */
	  op(attr) {
	    var pending = this._getPendingOps();
	    for (var i = pending.length; i--;) {
	      if (pending[i][attr]) {
	        return pending[i][attr];
	      }
	    }
	  }

	  /**
	   * Creates a new model with identical attributes to this one, similar to Backbone.Model's clone()
	   * @method clone
	   * @return {Parse.Object}
	   */
	  clone() {
	    let clone = new this.constructor();
	    if (!clone.className) {
	      clone.className = this.className;
	    }
	    let attributes = this.attributes;
	    if (typeof this.constructor.readOnlyAttributes === 'function') {
	      let readonly = this.constructor.readOnlyAttributes() || [];
	      // Attributes are frozen, so we have to rebuild an object,
	      // rather than delete readonly keys
	      let copy = {};
	      for (let a in attributes) {
	        if (readonly.indexOf(a) < 0) {
	          copy[a] = attributes[a];
	        }
	      }
	      attributes = copy;
	    }
	    if (clone.set) {
	      clone.set(attributes);
	    }
	    return clone;
	  }

	  /**
	   * Creates a new instance of this object. Not to be confused with clone()
	   * @method newInstance
	   * @return {Parse.Object}
	   */
	  newInstance() {
	    let clone = new this.constructor();
	    if (!clone.className) {
	      clone.className = this.className;
	    }
	    clone.id = this.id;
	    if (singleInstance) {
	      // Just return an object with the right id
	      return clone;
	    }

	    let stateController = CoreManager.getObjectStateController();
	    if (stateController) {
	      stateController.duplicateState(this._getStateIdentifier(), clone._getStateIdentifier());
	    }
	    return clone;
	  }

	  /**
	   * Returns true if this object has never been saved to Parse.
	   * @method isNew
	   * @return {Boolean}
	   */
	  isNew() {
	    return !this.id;
	  }

	  /**
	   * Returns true if this object was created by the Parse server when the
	   * object might have already been there (e.g. in the case of a Facebook
	   * login)
	   * @method existed
	   * @return {Boolean}
	   */
	  existed() {
	    if (!this.id) {
	      return false;
	    }
	    let stateController = CoreManager.getObjectStateController();
	    let state = stateController.getState(this._getStateIdentifier());
	    if (state) {
	      return state.existed;
	    }
	    return false;
	  }

	  /**
	   * Checks if the model is currently in a valid state.
	   * @method isValid
	   * @return {Boolean}
	   */
	  isValid() {
	    return !this.validate(this.attributes);
	  }

	  /**
	   * You should not call this function directly unless you subclass
	   * <code>Parse.Object</code>, in which case you can override this method
	   * to provide additional validation on <code>set</code> and
	   * <code>save</code>.  Your implementation should return
	   *
	   * @method validate
	   * @param {Object} attrs The current data to validate.
	   * @return {} False if the data is valid.  An error object otherwise.
	   * @see Parse.Object#set
	   */
	  validate(attrs) {
	    if (attrs.hasOwnProperty('ACL') && !(attrs.ACL instanceof ParseACL)) {
	      return new ParseError(ParseError.OTHER_CAUSE, 'ACL must be a Parse ACL.');
	    }
	    for (var key in attrs) {
	      if (!/^[A-Za-z][0-9A-Za-z_]*$/.test(key)) {
	        return new ParseError(ParseError.INVALID_KEY_NAME);
	      }
	    }
	    return false;
	  }

	  /**
	   * Returns the ACL for this object.
	   * @method getACL
	   * @returns {Parse.ACL} An instance of Parse.ACL.
	   * @see Parse.Object#get
	   */
	  getACL() {
	    var acl = this.get('ACL');
	    if (acl instanceof ParseACL) {
	      return acl;
	    }
	    return null;
	  }

	  /**
	   * Sets the ACL to be used for this object.
	   * @method setACL
	   * @param {Parse.ACL} acl An instance of Parse.ACL.
	   * @param {Object} options Optional Backbone-like options object to be
	   *     passed in to set.
	   * @return {Boolean} Whether the set passed validation.
	   * @see Parse.Object#set
	   */
	  setACL(acl, options) {
	    return this.set('ACL', acl, options);
	  }

	  /**
	   * Clears any changes to this object made since the last call to save()
	   * @method revert
	   */
	  revert() {
	    this._clearPendingOps();
	  }

	  /**
	   * Clears all attributes on a model
	   * @method clear
	   */
	  clear() {
	    var attributes = this.attributes;
	    var erasable = {};
	    var readonly = ['createdAt', 'updatedAt'];
	    if (typeof this.constructor.readOnlyAttributes === 'function') {
	      readonly = readonly.concat(this.constructor.readOnlyAttributes());
	    }
	    for (var attr in attributes) {
	      if (readonly.indexOf(attr) < 0) {
	        erasable[attr] = true;
	      }
	    }
	    return this.set(erasable, { unset: true });
	  }

	  /**
	   * Fetch the model from the server. If the server's representation of the
	   * model differs from its current attributes, they will be overriden.
	   *
	   * @method fetch
	   * @param {Object} options A Backbone-style callback object.
	   * Valid options are:<ul>
	   *   <li>success: A Backbone-style success callback.
	   *   <li>error: An Backbone-style error callback.
	   *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
	   *     be used for this request.
	   *   <li>sessionToken: A valid session token, used for making a request on
	   *       behalf of a specific user.
	   * </ul>
	   * @return {Parse.Promise} A promise that is fulfilled when the fetch
	   *     completes.
	   */
	  fetch(options) {
	    options = options || {};
	    var fetchOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      fetchOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('sessionToken')) {
	      fetchOptions.sessionToken = options.sessionToken;
	    }
	    var controller = CoreManager.getObjectController();
	    return controller.fetch(this, true, fetchOptions)._thenRunCallbacks(options);
	  }

	  /**
	   * Set a hash of model attributes, and save the model to the server.
	   * updatedAt will be updated when the request returns.
	   * You can either call it as:<pre>
	   *   object.save();</pre>
	   * or<pre>
	   *   object.save(null, options);</pre>
	   * or<pre>
	   *   object.save(attrs, options);</pre>
	   * or<pre>
	   *   object.save(key, value, options);</pre>
	   *
	   * For example, <pre>
	   *   gameTurn.save({
	   *     player: "Jake Cutter",
	   *     diceRoll: 2
	   *   }, {
	   *     success: function(gameTurnAgain) {
	   *       // The save was successful.
	   *     },
	   *     error: function(gameTurnAgain, error) {
	   *       // The save failed.  Error is an instance of Parse.Error.
	   *     }
	   *   });</pre>
	   * or with promises:<pre>
	   *   gameTurn.save({
	   *     player: "Jake Cutter",
	   *     diceRoll: 2
	   *   }).then(function(gameTurnAgain) {
	   *     // The save was successful.
	   *   }, function(error) {
	   *     // The save failed.  Error is an instance of Parse.Error.
	   *   });</pre>
	   *
	   * @method save
	   * @param {Object} options A Backbone-style callback object.
	   * Valid options are:<ul>
	   *   <li>success: A Backbone-style success callback.
	   *   <li>error: An Backbone-style error callback.
	   *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
	   *     be used for this request.
	   *   <li>sessionToken: A valid session token, used for making a request on
	   *       behalf of a specific user.
	   * </ul>
	   * @return {Parse.Promise} A promise that is fulfilled when the save
	   *     completes.
	   */
	  save(arg1, arg2, arg3) {
	    var attrs;
	    var options;
	    if (typeof arg1 === 'object' || typeof arg1 === 'undefined') {
	      attrs = arg1;
	      if (typeof arg2 === 'object') {
	        options = arg2;
	      }
	    } else {
	      attrs = {};
	      attrs[arg1] = arg2;
	      options = arg3;
	    }

	    // Support save({ success: function() {}, error: function() {} })
	    if (!options && attrs) {
	      options = {};
	      if (typeof attrs.success === 'function') {
	        options.success = attrs.success;
	        delete attrs.success;
	      }
	      if (typeof attrs.error === 'function') {
	        options.error = attrs.error;
	        delete attrs.error;
	      }
	    }

	    if (attrs) {
	      var validation = this.validate(attrs);
	      if (validation) {
	        if (options && typeof options.error === 'function') {
	          options.error(this, validation);
	        }
	        return ParsePromise.error(validation);
	      }
	      this.set(attrs, options);
	    }

	    options = options || {};
	    var saveOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      saveOptions.useMasterKey = !!options.useMasterKey;
	    }
	    if (options.hasOwnProperty('sessionToken') && typeof options.sessionToken === 'string') {
	      saveOptions.sessionToken = options.sessionToken;
	    }

	    var controller = CoreManager.getObjectController();
	    var unsaved = unsavedChildren(this);
	    return controller.save(unsaved, saveOptions).then(() => {
	      return controller.save(this, saveOptions);
	    })._thenRunCallbacks(options, this);
	  }

	  /**
	   * Destroy this model on the server if it was already persisted.
	   * If `wait: true` is passed, waits for the server to respond
	   * before removal.
	   *
	   * @method destroy
	   * @param {Object} options A Backbone-style callback object.
	   * Valid options are:<ul>
	   *   <li>success: A Backbone-style success callback
	   *   <li>error: An Backbone-style error callback.
	   *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
	   *     be used for this request.
	   *   <li>sessionToken: A valid session token, used for making a request on
	   *       behalf of a specific user.
	   * </ul>
	   * @return {Parse.Promise} A promise that is fulfilled when the destroy
	   *     completes.
	   */
	  destroy(options) {
	    options = options || {};
	    var destroyOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      destroyOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('sessionToken')) {
	      destroyOptions.sessionToken = options.sessionToken;
	    }
	    if (!this.id) {
	      return ParsePromise.as()._thenRunCallbacks(options);
	    }
	    return CoreManager.getObjectController().destroy(this, destroyOptions)._thenRunCallbacks(options);
	  }

	  /** Static methods **/

	  static _clearAllState() {
	    let stateController = CoreManager.getObjectStateController();
	    stateController.clearAllState();
	  }

	  /**
	   * Fetches the given list of Parse.Object.
	   * If any error is encountered, stops and calls the error handler.
	   *
	   * <pre>
	   *   Parse.Object.fetchAll([object1, object2, ...], {
	   *     success: function(list) {
	   *       // All the objects were fetched.
	   *     },
	   *     error: function(error) {
	   *       // An error occurred while fetching one of the objects.
	   *     },
	   *   });
	   * </pre>
	   *
	   * @method fetchAll
	   * @param {Array} list A list of <code>Parse.Object</code>.
	   * @param {Object} options A Backbone-style callback object.
	   * @static
	   * Valid options are:<ul>
	   *   <li>success: A Backbone-style success callback.
	   *   <li>error: An Backbone-style error callback.
	   * </ul>
	   */
	  static fetchAll(list, options) {
	    var options = options || {};

	    var queryOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      queryOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('sessionToken')) {
	      queryOptions.sessionToken = options.sessionToken;
	    }
	    return CoreManager.getObjectController().fetch(list, true, queryOptions)._thenRunCallbacks(options);
	  }

	  /**
	   * Fetches the given list of Parse.Object if needed.
	   * If any error is encountered, stops and calls the error handler.
	   *
	   * <pre>
	   *   Parse.Object.fetchAllIfNeeded([object1, ...], {
	   *     success: function(list) {
	   *       // Objects were fetched and updated.
	   *     },
	   *     error: function(error) {
	   *       // An error occurred while fetching one of the objects.
	   *     },
	   *   });
	   * </pre>
	   *
	   * @method fetchAllIfNeeded
	   * @param {Array} list A list of <code>Parse.Object</code>.
	   * @param {Object} options A Backbone-style callback object.
	   * @static
	   * Valid options are:<ul>
	   *   <li>success: A Backbone-style success callback.
	   *   <li>error: An Backbone-style error callback.
	   * </ul>
	   */
	  static fetchAllIfNeeded(list, options) {
	    var options = options || {};

	    var queryOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      queryOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('sessionToken')) {
	      queryOptions.sessionToken = options.sessionToken;
	    }
	    return CoreManager.getObjectController().fetch(list, false, queryOptions)._thenRunCallbacks(options);
	  }

	  /**
	   * Destroy the given list of models on the server if it was already persisted.
	   *
	   * <p>Unlike saveAll, if an error occurs while deleting an individual model,
	   * this method will continue trying to delete the rest of the models if
	   * possible, except in the case of a fatal error like a connection error.
	   *
	   * <p>In particular, the Parse.Error object returned in the case of error may
	   * be one of two types:
	   *
	   * <ul>
	   *   <li>A Parse.Error.AGGREGATE_ERROR. This object's "errors" property is an
	   *       array of other Parse.Error objects. Each error object in this array
	   *       has an "object" property that references the object that could not be
	   *       deleted (for instance, because that object could not be found).</li>
	   *   <li>A non-aggregate Parse.Error. This indicates a serious error that
	   *       caused the delete operation to be aborted partway through (for
	   *       instance, a connection failure in the middle of the delete).</li>
	   * </ul>
	   *
	   * <pre>
	   *   Parse.Object.destroyAll([object1, object2, ...], {
	   *     success: function() {
	   *       // All the objects were deleted.
	   *     },
	   *     error: function(error) {
	   *       // An error occurred while deleting one or more of the objects.
	   *       // If this is an aggregate error, then we can inspect each error
	   *       // object individually to determine the reason why a particular
	   *       // object was not deleted.
	   *       if (error.code === Parse.Error.AGGREGATE_ERROR) {
	   *         for (var i = 0; i < error.errors.length; i++) {
	   *           console.log("Couldn't delete " + error.errors[i].object.id +
	   *             "due to " + error.errors[i].message);
	   *         }
	   *       } else {
	   *         console.log("Delete aborted because of " + error.message);
	   *       }
	   *     },
	   *   });
	   * </pre>
	   *
	   * @method destroyAll
	   * @param {Array} list A list of <code>Parse.Object</code>.
	   * @param {Object} options A Backbone-style callback object.
	   * @static
	   * Valid options are:<ul>
	   *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
	   *     be used for this request.
	   *   <li>sessionToken: A valid session token, used for making a request on
	   *       behalf of a specific user.
	   * </ul>
	   * @return {Parse.Promise} A promise that is fulfilled when the destroyAll
	   *     completes.
	   */
	  static destroyAll(list, options) {
	    var options = options || {};

	    var destroyOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      destroyOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('sessionToken')) {
	      destroyOptions.sessionToken = options.sessionToken;
	    }
	    return CoreManager.getObjectController().destroy(list, destroyOptions)._thenRunCallbacks(options);
	  }

	  /**
	   * Saves the given list of Parse.Object.
	   * If any error is encountered, stops and calls the error handler.
	   *
	   * <pre>
	   *   Parse.Object.saveAll([object1, object2, ...], {
	   *     success: function(list) {
	   *       // All the objects were saved.
	   *     },
	   *     error: function(error) {
	   *       // An error occurred while saving one of the objects.
	   *     },
	   *   });
	   * </pre>
	   *
	   * @method saveAll
	   * @param {Array} list A list of <code>Parse.Object</code>.
	   * @param {Object} options A Backbone-style callback object.
	   * @static
	   * Valid options are:<ul>
	   *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
	   *     be used for this request.
	   *   <li>sessionToken: A valid session token, used for making a request on
	   *       behalf of a specific user.
	   * </ul>
	   */
	  static saveAll(list, options) {
	    var options = options || {};

	    var saveOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      saveOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('sessionToken')) {
	      saveOptions.sessionToken = options.sessionToken;
	    }
	    return CoreManager.getObjectController().save(list, saveOptions)._thenRunCallbacks(options);
	  }

	  /**
	   * Creates a reference to a subclass of Parse.Object with the given id. This
	   * does not exist on Parse.Object, only on subclasses.
	   *
	   * <p>A shortcut for: <pre>
	   *  var Foo = Parse.Object.extend("Foo");
	   *  var pointerToFoo = new Foo();
	   *  pointerToFoo.id = "myObjectId";
	   * </pre>
	   *
	   * @method createWithoutData
	   * @param {String} id The ID of the object to create a reference to.
	   * @static
	   * @return {Parse.Object} A Parse.Object reference.
	   */
	  static createWithoutData(id) {
	    var obj = new this();
	    obj.id = id;
	    return obj;
	  }

	  /**
	   * Creates a new instance of a Parse Object from a JSON representation.
	   * @method fromJSON
	   * @param {Object} json The JSON map of the Object's data
	   * @param {boolean} override In single instance mode, all old server data
	   *   is overwritten if this is set to true
	   * @static
	   * @return {Parse.Object} A Parse.Object reference
	   */
	  static fromJSON(json, override) {
	    if (!json.className) {
	      throw new Error('Cannot create an object without a className');
	    }
	    var constructor = classMap[json.className];
	    var o = constructor ? new constructor() : new ParseObject(json.className);
	    var otherAttributes = {};
	    for (var attr in json) {
	      if (attr !== 'className' && attr !== '__type') {
	        otherAttributes[attr] = json[attr];
	      }
	    }
	    if (override) {
	      // id needs to be set before clearServerData can work
	      if (otherAttributes.objectId) {
	        o.id = otherAttributes.objectId;
	      }
	      let preserved = null;
	      if (typeof o._preserveFieldsOnFetch === 'function') {
	        preserved = o._preserveFieldsOnFetch();
	      }
	      o._clearServerData();
	      if (preserved) {
	        o._finishFetch(preserved);
	      }
	    }
	    o._finishFetch(otherAttributes);
	    if (json.objectId) {
	      o._setExisted(true);
	    }
	    return o;
	  }

	  /**
	   * Registers a subclass of Parse.Object with a specific class name.
	   * When objects of that class are retrieved from a query, they will be
	   * instantiated with this subclass.
	   * This is only necessary when using ES6 subclassing.
	   * @method registerSubclass
	   * @param {String} className The class name of the subclass
	   * @param {Class} constructor The subclass
	   */
	  static registerSubclass(className, constructor) {
	    if (typeof className !== 'string') {
	      throw new TypeError('The first argument must be a valid class name.');
	    }
	    if (typeof constructor === 'undefined') {
	      throw new TypeError('You must supply a subclass constructor.');
	    }
	    if (typeof constructor !== 'function') {
	      throw new TypeError('You must register the subclass constructor. ' + 'Did you attempt to register an instance of the subclass?');
	    }
	    classMap[className] = constructor;
	    if (!constructor.className) {
	      constructor.className = className;
	    }
	  }

	  /**
	   * Creates a new subclass of Parse.Object for the given Parse class name.
	   *
	   * <p>Every extension of a Parse class will inherit from the most recent
	   * previous extension of that class. When a Parse.Object is automatically
	   * created by parsing JSON, it will use the most recent extension of that
	   * class.</p>
	   *
	   * <p>You should call either:<pre>
	   *     var MyClass = Parse.Object.extend("MyClass", {
	   *         <i>Instance methods</i>,
	   *         initialize: function(attrs, options) {
	   *             this.someInstanceProperty = [],
	   *             <i>Other instance properties</i>
	   *         }
	   *     }, {
	   *         <i>Class properties</i>
	   *     });</pre>
	   * or, for Backbone compatibility:<pre>
	   *     var MyClass = Parse.Object.extend({
	   *         className: "MyClass",
	   *         <i>Instance methods</i>,
	   *         initialize: function(attrs, options) {
	   *             this.someInstanceProperty = [],
	   *             <i>Other instance properties</i>
	   *         }
	   *     }, {
	   *         <i>Class properties</i>
	   *     });</pre></p>
	   *
	   * @method extend
	   * @param {String} className The name of the Parse class backing this model.
	   * @param {Object} protoProps Instance properties to add to instances of the
	   *     class returned from this method.
	   * @param {Object} classProps Class properties to add the class returned from
	   *     this method.
	   * @return {Class} A new subclass of Parse.Object.
	   */
	  static extend(className, protoProps, classProps) {
	    if (typeof className !== 'string') {
	      if (className && typeof className.className === 'string') {
	        return ParseObject.extend(className.className, className, protoProps);
	      } else {
	        throw new Error('Parse.Object.extend\'s first argument should be the className.');
	      }
	    }
	    var adjustedClassName = className;

	    if (adjustedClassName === 'User' && CoreManager.get('PERFORM_USER_REWRITE')) {
	      adjustedClassName = '_User';
	    }

	    var parentProto = ParseObject.prototype;
	    if (this.hasOwnProperty('__super__') && this.__super__) {
	      parentProto = this.prototype;
	    } else if (classMap[adjustedClassName]) {
	      parentProto = classMap[adjustedClassName].prototype;
	    }
	    var ParseObjectSubclass = function (attributes, options) {
	      this.className = adjustedClassName;
	      this._objCount = objectCount++;
	      // Enable legacy initializers
	      if (typeof this.initialize === 'function') {
	        this.initialize.apply(this, arguments);
	      }

	      if (attributes && typeof attributes === 'object') {
	        if (!this.set(attributes || {}, options)) {
	          throw new Error('Can\'t create an invalid Parse Object');
	        }
	      }
	    };
	    ParseObjectSubclass.className = adjustedClassName;
	    ParseObjectSubclass.__super__ = parentProto;

	    ParseObjectSubclass.prototype = Object.create(parentProto, {
	      constructor: {
	        value: ParseObjectSubclass,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });

	    if (protoProps) {
	      for (var prop in protoProps) {
	        if (prop !== 'className') {
	          Object.defineProperty(ParseObjectSubclass.prototype, prop, {
	            value: protoProps[prop],
	            enumerable: false,
	            writable: true,
	            configurable: true
	          });
	        }
	      }
	    }

	    if (classProps) {
	      for (var prop in classProps) {
	        if (prop !== 'className') {
	          Object.defineProperty(ParseObjectSubclass, prop, {
	            value: classProps[prop],
	            enumerable: false,
	            writable: true,
	            configurable: true
	          });
	        }
	      }
	    }

	    ParseObjectSubclass.extend = function (name, protoProps, classProps) {
	      if (typeof name === 'string') {
	        return ParseObject.extend.call(ParseObjectSubclass, name, protoProps, classProps);
	      }
	      return ParseObject.extend.call(ParseObjectSubclass, adjustedClassName, name, protoProps);
	    };
	    ParseObjectSubclass.createWithoutData = ParseObject.createWithoutData;

	    classMap[adjustedClassName] = ParseObjectSubclass;
	    return ParseObjectSubclass;
	  }

	  /**
	   * Enable single instance objects, where any local objects with the same Id
	   * share the same attributes, and stay synchronized with each other.
	   * This is disabled by default in server environments, since it can lead to
	   * security issues.
	   * @method enableSingleInstance
	   */
	  static enableSingleInstance() {
	    singleInstance = true;
	    CoreManager.setObjectStateController(SingleInstanceStateController);
	  }

	  /**
	   * Disable single instance objects, where any local objects with the same Id
	   * share the same attributes, and stay synchronized with each other.
	   * When disabled, you can have two instances of the same object in memory
	   * without them sharing attributes.
	   * @method disableSingleInstance
	   */
	  static disableSingleInstance() {
	    singleInstance = false;
	    CoreManager.setObjectStateController(UniqueInstanceStateController);
	  }
	}

	var DefaultController = {
	  fetch(target, forceFetch, options) {
	    if (Array.isArray(target)) {
	      if (target.length < 1) {
	        return ParsePromise.as([]);
	      }
	      var objs = [];
	      var ids = [];
	      var className = null;
	      var results = [];
	      var error = null;
	      target.forEach((el, i) => {
	        if (error) {
	          return;
	        }
	        if (!className) {
	          className = el.className;
	        }
	        if (className !== el.className) {
	          error = new ParseError(ParseError.INVALID_CLASS_NAME, 'All objects should be of the same class');
	        }
	        if (!el.id) {
	          error = new ParseError(ParseError.MISSING_OBJECT_ID, 'All objects must have an ID');
	        }
	        if (forceFetch || Object.keys(el._getServerData()).length === 0) {
	          ids.push(el.id);
	          objs.push(el);
	        }
	        results.push(el);
	      });
	      if (error) {
	        return ParsePromise.error(error);
	      }
	      var query = new ParseQuery(className);
	      query.containedIn('objectId', ids);
	      query._limit = ids.length;
	      return query.find(options).then(objects => {
	        var idMap = {};
	        objects.forEach(o => {
	          idMap[o.id] = o;
	        });
	        for (var i = 0; i < objs.length; i++) {
	          var obj = objs[i];
	          if (!obj || !obj.id || !idMap[obj.id]) {
	            if (forceFetch) {
	              return ParsePromise.error(new ParseError(ParseError.OBJECT_NOT_FOUND, 'All objects must exist on the server.'));
	            }
	          }
	        }
	        if (!singleInstance) {
	          // If single instance objects are disabled, we need to replace the
	          for (var i = 0; i < results.length; i++) {
	            var obj = results[i];
	            if (obj && obj.id && idMap[obj.id]) {
	              var id = obj.id;
	              obj._finishFetch(idMap[id].toJSON());
	              results[i] = idMap[id];
	            }
	          }
	        }
	        return ParsePromise.as(results);
	      });
	    } else {
	      var RESTController = CoreManager.getRESTController();
	      return RESTController.request('GET', 'classes/' + target.className + '/' + target._getId(), {}, options).then((response, status, xhr) => {
	        if (target instanceof ParseObject) {
	          target._clearPendingOps();
	          target._clearServerData();
	          target._finishFetch(response);
	        }
	        return target;
	      });
	    }
	  },

	  destroy(target, options) {
	    var RESTController = CoreManager.getRESTController();
	    if (Array.isArray(target)) {
	      if (target.length < 1) {
	        return ParsePromise.as([]);
	      }
	      var batches = [[]];
	      target.forEach(obj => {
	        if (!obj.id) {
	          return;
	        }
	        batches[batches.length - 1].push(obj);
	        if (batches[batches.length - 1].length >= 20) {
	          batches.push([]);
	        }
	      });
	      if (batches[batches.length - 1].length === 0) {
	        // If the last batch is empty, remove it
	        batches.pop();
	      }
	      var deleteCompleted = ParsePromise.as();
	      var errors = [];
	      batches.forEach(batch => {
	        deleteCompleted = deleteCompleted.then(() => {
	          return RESTController.request('POST', 'batch', {
	            requests: batch.map(obj => {
	              return {
	                method: 'DELETE',
	                path: getServerUrlPath() + 'classes/' + obj.className + '/' + obj._getId(),
	                body: {}
	              };
	            })
	          }, options).then(results => {
	            for (var i = 0; i < results.length; i++) {
	              if (results[i] && results[i].hasOwnProperty('error')) {
	                var err = new ParseError(results[i].error.code, results[i].error.error);
	                err.object = batch[i];
	                errors.push(err);
	              }
	            }
	          });
	        });
	      });
	      return deleteCompleted.then(() => {
	        if (errors.length) {
	          var aggregate = new ParseError(ParseError.AGGREGATE_ERROR);
	          aggregate.errors = errors;
	          return ParsePromise.error(aggregate);
	        }
	        return ParsePromise.as(target);
	      });
	    } else if (target instanceof ParseObject) {
	      return RESTController.request('DELETE', 'classes/' + target.className + '/' + target._getId(), {}, options).then(() => {
	        return ParsePromise.as(target);
	      });
	    }
	    return ParsePromise.as(target);
	  },

	  save(target, options) {
	    var RESTController = CoreManager.getRESTController();
	    var stateController = CoreManager.getObjectStateController();
	    if (Array.isArray(target)) {
	      if (target.length < 1) {
	        return ParsePromise.as([]);
	      }

	      var unsaved = target.concat();
	      for (var i = 0; i < target.length; i++) {
	        if (target[i] instanceof ParseObject) {
	          unsaved = unsaved.concat(unsavedChildren(target[i], true));
	        }
	      }
	      unsaved = unique(unsaved);

	      var filesSaved = ParsePromise.as();
	      var pending = [];
	      unsaved.forEach(el => {
	        if (el instanceof ParseFile) {
	          filesSaved = filesSaved.then(() => {
	            return el.save();
	          });
	        } else if (el instanceof ParseObject) {
	          pending.push(el);
	        }
	      });

	      return filesSaved.then(() => {
	        var objectError = null;
	        return ParsePromise._continueWhile(() => {
	          return pending.length > 0;
	        }, () => {
	          var batch = [];
	          var nextPending = [];
	          pending.forEach(el => {
	            if (batch.length < 20 && canBeSerialized(el)) {
	              batch.push(el);
	            } else {
	              nextPending.push(el);
	            }
	          });
	          pending = nextPending;
	          if (batch.length < 1) {
	            return ParsePromise.error(new ParseError(ParseError.OTHER_CAUSE, 'Tried to save a batch with a cycle.'));
	          }

	          // Queue up tasks for each object in the batch.
	          // When every task is ready, the API request will execute
	          var batchReturned = new ParsePromise();
	          var batchReady = [];
	          var batchTasks = [];
	          batch.forEach((obj, index) => {
	            var ready = new ParsePromise();
	            batchReady.push(ready);

	            stateController.pushPendingState(obj._getStateIdentifier());
	            batchTasks.push(stateController.enqueueTask(obj._getStateIdentifier(), function () {
	              ready.resolve();
	              return batchReturned.then((responses, status) => {
	                if (responses[index].hasOwnProperty('success')) {
	                  obj._handleSaveResponse(responses[index].success, status);
	                } else {
	                  if (!objectError && responses[index].hasOwnProperty('error')) {
	                    var serverError = responses[index].error;
	                    objectError = new ParseError(serverError.code, serverError.error);
	                    // Cancel the rest of the save
	                    pending = [];
	                  }
	                  obj._handleSaveError();
	                }
	              });
	            }));
	          });

	          ParsePromise.when(batchReady).then(() => {
	            // Kick off the batch request
	            return RESTController.request('POST', 'batch', {
	              requests: batch.map(obj => {
	                var params = obj._getSaveParams();
	                params.path = getServerUrlPath() + params.path;
	                return params;
	              })
	            }, options);
	          }).then((response, status, xhr) => {
	            batchReturned.resolve(response, status);
	          });

	          return ParsePromise.when(batchTasks);
	        }).then(() => {
	          if (objectError) {
	            return ParsePromise.error(objectError);
	          }
	          return ParsePromise.as(target);
	        });
	      });
	    } else if (target instanceof ParseObject) {
	      // copying target lets Flow guarantee the pointer isn't modified elsewhere
	      var targetCopy = target;
	      var task = function () {
	        var params = targetCopy._getSaveParams();
	        return RESTController.request(params.method, params.path, params.body, options).then((response, status) => {
	          targetCopy._handleSaveResponse(response, status);
	        }, error => {
	          targetCopy._handleSaveError();
	          return ParsePromise.error(error);
	        });
	      };

	      stateController.pushPendingState(target._getStateIdentifier());
	      return stateController.enqueueTask(target._getStateIdentifier(), task).then(() => {
	        return target;
	      }, error => {
	        return ParsePromise.error(error);
	      });
	    }
	    return ParsePromise.as();
	  }
	};

	CoreManager.setObjectController(DefaultController);

/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	var isPromisesAPlusCompliant = true;

	/**
	 * A Promise is returned by async methods as a hook to provide callbacks to be
	 * called when the async task is fulfilled.
	 *
	 * <p>Typical usage would be like:<pre>
	 *    query.find().then(function(results) {
	 *      results[0].set("foo", "bar");
	 *      return results[0].saveAsync();
	 *    }).then(function(result) {
	 *      console.log("Updated " + result.id);
	 *    });
	 * </pre></p>
	 *
	 * @class Parse.Promise
	 * @constructor
	 */
	export default class ParsePromise {
	  constructor(executor) {
	    this._resolved = false;
	    this._rejected = false;
	    this._resolvedCallbacks = [];
	    this._rejectedCallbacks = [];

	    if (typeof executor === 'function') {
	      executor(this.resolve.bind(this), this.reject.bind(this));
	    }
	  }

	  /**
	   * Marks this promise as fulfilled, firing any callbacks waiting on it.
	   * @method resolve
	   * @param {Object} result the result to pass to the callbacks.
	   */
	  resolve(...results) {
	    if (this._resolved || this._rejected) {
	      throw new Error('A promise was resolved even though it had already been ' + (this._resolved ? 'resolved' : 'rejected') + '.');
	    }
	    this._resolved = true;
	    this._result = results;
	    for (var i = 0; i < this._resolvedCallbacks.length; i++) {
	      this._resolvedCallbacks[i].apply(this, results);
	    }

	    this._resolvedCallbacks = [];
	    this._rejectedCallbacks = [];
	  }

	  /**
	   * Marks this promise as fulfilled, firing any callbacks waiting on it.
	   * @method reject
	   * @param {Object} error the error to pass to the callbacks.
	   */
	  reject(error) {
	    if (this._resolved || this._rejected) {
	      throw new Error('A promise was rejected even though it had already been ' + (this._resolved ? 'resolved' : 'rejected') + '.');
	    }
	    this._rejected = true;
	    this._error = error;
	    for (var i = 0; i < this._rejectedCallbacks.length; i++) {
	      this._rejectedCallbacks[i](error);
	    }
	    this._resolvedCallbacks = [];
	    this._rejectedCallbacks = [];
	  }

	  /**
	   * Adds callbacks to be called when this promise is fulfilled. Returns a new
	   * Promise that will be fulfilled when the callback is complete. It allows
	   * chaining. If the callback itself returns a Promise, then the one returned
	   * by "then" will not be fulfilled until that one returned by the callback
	   * is fulfilled.
	   * @method then
	   * @param {Function} resolvedCallback Function that is called when this
	   * Promise is resolved. Once the callback is complete, then the Promise
	   * returned by "then" will also be fulfilled.
	   * @param {Function} rejectedCallback Function that is called when this
	   * Promise is rejected with an error. Once the callback is complete, then
	   * the promise returned by "then" with be resolved successfully. If
	   * rejectedCallback is null, or it returns a rejected Promise, then the
	   * Promise returned by "then" will be rejected with that error.
	   * @return {Parse.Promise} A new Promise that will be fulfilled after this
	   * Promise is fulfilled and either callback has completed. If the callback
	   * returned a Promise, then this Promise will not be fulfilled until that
	   * one is.
	   */
	  then(resolvedCallback, rejectedCallback) {
	    var promise = new ParsePromise();

	    var wrappedResolvedCallback = function (...results) {
	      if (typeof resolvedCallback === 'function') {
	        if (isPromisesAPlusCompliant) {
	          try {
	            results = [resolvedCallback.apply(this, results)];
	          } catch (e) {
	            results = [ParsePromise.error(e)];
	          }
	        } else {
	          results = [resolvedCallback.apply(this, results)];
	        }
	      }
	      if (results.length === 1 && ParsePromise.is(results[0])) {
	        results[0].then(function () {
	          promise.resolve.apply(promise, arguments);
	        }, function (error) {
	          promise.reject(error);
	        });
	      } else {
	        promise.resolve.apply(promise, results);
	      }
	    };

	    var wrappedRejectedCallback = function (error) {
	      var result = [];
	      if (typeof rejectedCallback === 'function') {
	        if (isPromisesAPlusCompliant) {
	          try {
	            result = [rejectedCallback(error)];
	          } catch (e) {
	            result = [ParsePromise.error(e)];
	          }
	        } else {
	          result = [rejectedCallback(error)];
	        }
	        if (result.length === 1 && ParsePromise.is(result[0])) {
	          result[0].then(function () {
	            promise.resolve.apply(promise, arguments);
	          }, function (error) {
	            promise.reject(error);
	          });
	        } else {
	          if (isPromisesAPlusCompliant) {
	            promise.resolve.apply(promise, result);
	          } else {
	            promise.reject(result[0]);
	          }
	        }
	      } else {
	        promise.reject(error);
	      }
	    };

	    var runLater = function (fn) {
	      fn.call();
	    };
	    if (isPromisesAPlusCompliant) {
	      if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
	        runLater = function (fn) {
	          process.nextTick(fn);
	        };
	      } else if (typeof setTimeout === 'function') {
	        runLater = function (fn) {
	          setTimeout(fn, 0);
	        };
	      }
	    }

	    if (this._resolved) {
	      runLater(() => {
	        wrappedResolvedCallback.apply(this, this._result);
	      });
	    } else if (this._rejected) {
	      runLater(() => {
	        wrappedRejectedCallback(this._error);
	      });
	    } else {
	      this._resolvedCallbacks.push(wrappedResolvedCallback);
	      this._rejectedCallbacks.push(wrappedRejectedCallback);
	    }

	    return promise;
	  }

	  /**
	   * Add handlers to be called when the promise
	   * is either resolved or rejected
	   * @method always
	   */
	  always(callback) {
	    return this.then(callback, callback);
	  }

	  /**
	   * Add handlers to be called when the Promise object is resolved
	   * @method done
	   */
	  done(callback) {
	    return this.then(callback);
	  }

	  /**
	   * Add handlers to be called when the Promise object is rejected
	   * Alias for catch().
	   * @method fail
	   */
	  fail(callback) {
	    return this.then(null, callback);
	  }

	  /**
	   * Add handlers to be called when the Promise object is rejected
	   * @method catch
	   */
	  catch(callback) {
	    return this.then(null, callback);
	  }

	  /**
	   * Run the given callbacks after this promise is fulfilled.
	   * @method _thenRunCallbacks
	   * @param optionsOrCallback {} A Backbone-style options callback, or a
	   * callback function. If this is an options object and contains a "model"
	   * attributes, that will be passed to error callbacks as the first argument.
	   * @param model {} If truthy, this will be passed as the first result of
	   * error callbacks. This is for Backbone-compatability.
	   * @return {Parse.Promise} A promise that will be resolved after the
	   * callbacks are run, with the same result as this.
	   */
	  _thenRunCallbacks(optionsOrCallback, model) {
	    var options = {};
	    if (typeof optionsOrCallback === 'function') {
	      options.success = function (result) {
	        optionsOrCallback(result, null);
	      };
	      options.error = function (error) {
	        optionsOrCallback(null, error);
	      };
	    } else if (typeof optionsOrCallback === 'object') {
	      if (typeof optionsOrCallback.success === 'function') {
	        options.success = optionsOrCallback.success;
	      }
	      if (typeof optionsOrCallback.error === 'function') {
	        options.error = optionsOrCallback.error;
	      }
	    }

	    return this.then(function (...results) {
	      if (options.success) {
	        options.success.apply(this, results);
	      }
	      return ParsePromise.as.apply(ParsePromise, arguments);
	    }, function (error) {
	      if (options.error) {
	        if (typeof model !== 'undefined') {
	          options.error(model, error);
	        } else {
	          options.error(error);
	        }
	      }
	      // By explicitly returning a rejected Promise, this will work with
	      // either jQuery or Promises/A+ semantics.
	      return ParsePromise.error(error);
	    });
	  }

	  /**
	   * Adds a callback function that should be called regardless of whether
	   * this promise failed or succeeded. The callback will be given either the
	   * array of results for its first argument, or the error as its second,
	   * depending on whether this Promise was rejected or resolved. Returns a
	   * new Promise, like "then" would.
	   * @method _continueWith
	   * @param {Function} continuation the callback.
	   */
	  _continueWith(continuation) {
	    return this.then(function (...args) {
	      return continuation(args, null);
	    }, function (error) {
	      return continuation(null, error);
	    });
	  }

	  /**
	   * Returns true iff the given object fulfils the Promise interface.
	   * @method is
	   * @param {Object} promise The object to test
	   * @static
	   * @return {Boolean}
	   */
	  static is(promise) {
	    return promise != null && typeof promise.then === 'function';
	  }

	  /**
	   * Returns a new promise that is resolved with a given value.
	   * @method as
	   * @param value The value to resolve the promise with
	   * @static
	   * @return {Parse.Promise} the new promise.
	   */
	  static as(...values) {
	    var promise = new ParsePromise();
	    promise.resolve.apply(promise, values);
	    return promise;
	  }

	  /**
	   * Returns a new promise that is resolved with a given value.
	   * If that value is a thenable Promise (has a .then() prototype
	   * method), the new promise will be chained to the end of the
	   * value.
	   * @method resolve
	   * @param value The value to resolve the promise with
	   * @static
	   * @return {Parse.Promise} the new promise.
	   */
	  static resolve(value) {
	    return new ParsePromise((resolve, reject) => {
	      if (ParsePromise.is(value)) {
	        value.then(resolve, reject);
	      } else {
	        resolve(value);
	      }
	    });
	  }

	  /**
	   * Returns a new promise that is rejected with a given error.
	   * @method error
	   * @param error The error to reject the promise with
	   * @static
	   * @return {Parse.Promise} the new promise.
	   */
	  static error(...errors) {
	    var promise = new ParsePromise();
	    promise.reject.apply(promise, errors);
	    return promise;
	  }

	  /**
	   * Returns a new promise that is rejected with a given error.
	   * This is an alias for Parse.Promise.error, for compliance with
	   * the ES6 implementation.
	   * @method reject
	   * @param error The error to reject the promise with
	   * @static
	   * @return {Parse.Promise} the new promise.
	   */
	  static reject(...errors) {
	    return ParsePromise.error.apply(null, errors);
	  }

	  /**
	   * Returns a new promise that is fulfilled when all of the input promises
	   * are resolved. If any promise in the list fails, then the returned promise
	   * will be rejected with an array containing the error from each promise.
	   * If they all succeed, then the returned promise will succeed, with the
	   * results being the results of all the input
	   * promises. For example: <pre>
	   *   var p1 = Parse.Promise.as(1);
	   *   var p2 = Parse.Promise.as(2);
	   *   var p3 = Parse.Promise.as(3);
	   *
	   *   Parse.Promise.when(p1, p2, p3).then(function(r1, r2, r3) {
	   *     console.log(r1);  // prints 1
	   *     console.log(r2);  // prints 2
	   *     console.log(r3);  // prints 3
	   *   });</pre>
	   *
	   * The input promises can also be specified as an array: <pre>
	   *   var promises = [p1, p2, p3];
	   *   Parse.Promise.when(promises).then(function(results) {
	   *     console.log(results);  // prints [1,2,3]
	   *   });
	   * </pre>
	   * @method when
	   * @param {Array} promises a list of promises to wait for.
	   * @static
	   * @return {Parse.Promise} the new promise.
	   */
	  static when(promises) {
	    var objects;
	    var arrayArgument = Array.isArray(promises);
	    if (arrayArgument) {
	      objects = promises;
	    } else {
	      objects = arguments;
	    }

	    var total = objects.length;
	    var hadError = false;
	    var results = [];
	    var returnValue = arrayArgument ? [results] : results;
	    var errors = [];
	    results.length = objects.length;
	    errors.length = objects.length;

	    if (total === 0) {
	      return ParsePromise.as.apply(this, returnValue);
	    }

	    var promise = new ParsePromise();

	    var resolveOne = function () {
	      total--;
	      if (total <= 0) {
	        if (hadError) {
	          promise.reject(errors);
	        } else {
	          promise.resolve.apply(promise, returnValue);
	        }
	      }
	    };

	    var chain = function (object, index) {
	      if (ParsePromise.is(object)) {
	        object.then(function (result) {
	          results[index] = result;
	          resolveOne();
	        }, function (error) {
	          errors[index] = error;
	          hadError = true;
	          resolveOne();
	        });
	      } else {
	        results[i] = object;
	        resolveOne();
	      }
	    };
	    for (var i = 0; i < objects.length; i++) {
	      chain(objects[i], i);
	    }

	    return promise;
	  }

	  /**
	   * Returns a new promise that is fulfilled when all of the promises in the
	   * iterable argument are resolved. If any promise in the list fails, then
	   * the returned promise will be immediately rejected with the reason that
	   * single promise rejected. If they all succeed, then the returned promise
	   * will succeed, with the results being the results of all the input
	   * promises. If the iterable provided is empty, the returned promise will
	   * be immediately resolved.
	   * 
	   * For example: <pre>
	   *   var p1 = Parse.Promise.as(1);
	   *   var p2 = Parse.Promise.as(2);
	   *   var p3 = Parse.Promise.as(3);
	   *
	   *   Parse.Promise.all([p1, p2, p3]).then(function([r1, r2, r3]) {
	   *     console.log(r1);  // prints 1
	   *     console.log(r2);  // prints 2
	   *     console.log(r3);  // prints 3
	   *   });</pre>
	   *
	   * @method all
	   * @param {Iterable} promises an iterable of promises to wait for.
	   * @static
	   * @return {Parse.Promise} the new promise.
	   */
	  static all(promises) {
	    let total = 0;
	    let objects = [];

	    for (let p of promises) {
	      objects[total++] = p;
	    }

	    if (total === 0) {
	      return ParsePromise.as([]);
	    }

	    let hadError = false;
	    let promise = new ParsePromise();
	    let resolved = 0;
	    let results = [];
	    objects.forEach((object, i) => {
	      if (ParsePromise.is(object)) {
	        object.then(result => {
	          if (hadError) {
	            return false;
	          }
	          results[i] = result;
	          resolved++;
	          if (resolved >= total) {
	            promise.resolve(results);
	          }
	        }, error => {
	          // Reject immediately
	          promise.reject(error);
	          hadError = true;
	        });
	      } else {
	        results[i] = object;
	        resolved++;
	        if (!hadError && resolved >= total) {
	          promise.resolve(results);
	        }
	      }
	    });

	    return promise;
	  }

	  /**
	   * Returns a new promise that is immediately fulfilled when any of the
	   * promises in the iterable argument are resolved or rejected. If the
	   * first promise to complete is resolved, the returned promise will be
	   * resolved with the same value. Likewise, if the first promise to
	   * complete is rejected, the returned promise will be rejected with the
	   * same reason.
	   *
	   * @method race
	   * @param {Iterable} promises an iterable of promises to wait for.
	   * @static
	   * @return {Parse.Promise} the new promise.
	   */
	  static race(promises) {
	    let completed = false;
	    let promise = new ParsePromise();
	    for (let p of promises) {
	      if (ParsePromise.is(p)) {
	        p.then(result => {
	          if (completed) {
	            return;
	          }
	          completed = true;
	          promise.resolve(result);
	        }, error => {
	          if (completed) {
	            return;
	          }
	          completed = true;
	          promise.reject(error);
	        });
	      } else if (!completed) {
	        completed = true;
	        promise.resolve(p);
	      }
	    }

	    return promise;
	  }

	  /**
	   * Runs the given asyncFunction repeatedly, as long as the predicate
	   * function returns a truthy value. Stops repeating if asyncFunction returns
	   * a rejected promise.
	   * @method _continueWhile
	   * @param {Function} predicate should return false when ready to stop.
	   * @param {Function} asyncFunction should return a Promise.
	   * @static
	   */
	  static _continueWhile(predicate, asyncFunction) {
	    if (predicate()) {
	      return asyncFunction().then(function () {
	        return ParsePromise._continueWhile(predicate, asyncFunction);
	      });
	    }
	    return ParsePromise.as();
	  }

	  static isPromisesAPlusCompliant() {
	    return isPromisesAPlusCompliant;
	  }

	  static enableAPlusCompliant() {
	    isPromisesAPlusCompliant = true;
	  }

	  static disableAPlusCompliant() {
	    isPromisesAPlusCompliant = false;
	  }
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import CoreManager from './CoreManager';
	import ParseQuery from './ParseQuery';

	/**
	 * Contains functions to deal with Push in Parse.
	 * @class Parse.Push
	 * @static
	 */

	/**
	 * Sends a push notification.
	 * @method send
	 * @param {Object} data -  The data of the push notification.  Valid fields
	 * are:
	 *   <ol>
	 *     <li>channels - An Array of channels to push to.</li>
	 *     <li>push_time - A Date object for when to send the push.</li>
	 *     <li>expiration_time -  A Date object for when to expire
	 *         the push.</li>
	 *     <li>expiration_interval - The seconds from now to expire the push.</li>
	 *     <li>where - A Parse.Query over Parse.Installation that is used to match
	 *         a set of installations to push to.</li>
	 *     <li>data - The data to send as part of the push</li>
	 *   <ol>
	 * @param {Object} options An object that has an optional success function,
	 * that takes no arguments and will be called on a successful push, and
	 * an error function that takes a Parse.Error and will be called if the push
	 * failed.
	 * @return {Parse.Promise} A promise that is fulfilled when the push request
	 *     completes.
	 */
	export function send(data, options) {
	  options = options || {};

	  if (data.where && data.where instanceof ParseQuery) {
	    data.where = data.where.toJSON().where;
	  }

	  if (data.push_time && typeof data.push_time === 'object') {
	    data.push_time = data.push_time.toJSON();
	  }

	  if (data.expiration_time && typeof data.expiration_time === 'object') {
	    data.expiration_time = data.expiration_time.toJSON();
	  }

	  if (data.expiration_time && data.expiration_interval) {
	    throw new Error('expiration_time and expiration_interval cannot both be set.');
	  }

	  return CoreManager.getPushController().send(data, {
	    useMasterKey: options.useMasterKey
	  })._thenRunCallbacks(options);
	}

	var DefaultController = {
	  send(data, options) {
	    var RESTController = CoreManager.getRESTController();

	    var request = RESTController.request('POST', 'push', data, { useMasterKey: !!options.useMasterKey });

	    return request._thenRunCallbacks(options);
	  }
	};

	CoreManager.setPushController(DefaultController);

/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import CoreManager from './CoreManager';
	import encode from './encode';
	import ParseError from './ParseError';
	import ParseGeoPoint from './ParseGeoPoint';
	import ParseObject from './ParseObject';
	import ParsePromise from './ParsePromise';

	/**
	 * Converts a string into a regex that matches it.
	 * Surrounding with \Q .. \E does this, we just need to escape any \E's in
	 * the text separately.
	 */
	function quote(s) {
	  return '\\Q' + s.replace('\\E', '\\E\\\\E\\Q') + '\\E';
	}

	/**
	 * Creates a new parse Parse.Query for the given Parse.Object subclass.
	 * @class Parse.Query
	 * @constructor
	 * @param {} objectClass An instance of a subclass of Parse.Object, or a Parse className string.
	 *
	 * <p>Parse.Query defines a query that is used to fetch Parse.Objects. The
	 * most common use case is finding all objects that match a query through the
	 * <code>find</code> method. For example, this sample code fetches all objects
	 * of class <code>MyClass</code>. It calls a different function depending on
	 * whether the fetch succeeded or not.
	 *
	 * <pre>
	 * var query = new Parse.Query(MyClass);
	 * query.find({
	 *   success: function(results) {
	 *     // results is an array of Parse.Object.
	 *   },
	 *
	 *   error: function(error) {
	 *     // error is an instance of Parse.Error.
	 *   }
	 * });</pre></p>
	 *
	 * <p>A Parse.Query can also be used to retrieve a single object whose id is
	 * known, through the get method. For example, this sample code fetches an
	 * object of class <code>MyClass</code> and id <code>myId</code>. It calls a
	 * different function depending on whether the fetch succeeded or not.
	 *
	 * <pre>
	 * var query = new Parse.Query(MyClass);
	 * query.get(myId, {
	 *   success: function(object) {
	 *     // object is an instance of Parse.Object.
	 *   },
	 *
	 *   error: function(object, error) {
	 *     // error is an instance of Parse.Error.
	 *   }
	 * });</pre></p>
	 *
	 * <p>A Parse.Query can also be used to count the number of objects that match
	 * the query without retrieving all of those objects. For example, this
	 * sample code counts the number of objects of the class <code>MyClass</code>
	 * <pre>
	 * var query = new Parse.Query(MyClass);
	 * query.count({
	 *   success: function(number) {
	 *     // There are number instances of MyClass.
	 *   },
	 *
	 *   error: function(error) {
	 *     // error is an instance of Parse.Error.
	 *   }
	 * });</pre></p>
	 */
	export default class ParseQuery {

	  constructor(objectClass) {
	    if (typeof objectClass === 'string') {
	      if (objectClass === 'User' && CoreManager.get('PERFORM_USER_REWRITE')) {
	        this.className = '_User';
	      } else {
	        this.className = objectClass;
	      }
	    } else if (objectClass instanceof ParseObject) {
	      this.className = objectClass.className;
	    } else if (typeof objectClass === 'function') {
	      if (typeof objectClass.className === 'string') {
	        this.className = objectClass.className;
	      } else {
	        var obj = new objectClass();
	        this.className = obj.className;
	      }
	    } else {
	      throw new TypeError('A ParseQuery must be constructed with a ParseObject or class name.');
	    }

	    this._where = {};
	    this._include = [];
	    this._limit = -1; // negative limit is not sent in the server request
	    this._skip = 0;
	    this._extraOptions = {};
	  }

	  /**
	   * Adds constraint that at least one of the passed in queries matches.
	   * @method _orQuery
	   * @param {Array} queries
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  _orQuery(queries) {
	    var queryJSON = queries.map(q => {
	      return q.toJSON().where;
	    });

	    this._where.$or = queryJSON;
	    return this;
	  }

	  /**
	   * Helper for condition queries
	   */
	  _addCondition(key, condition, value) {
	    if (!this._where[key] || typeof this._where[key] === 'string') {
	      this._where[key] = {};
	    }
	    this._where[key][condition] = encode(value, false, true);
	    return this;
	  }

	  /**
	   * Returns a JSON representation of this query.
	   * @method toJSON
	   * @return {Object} The JSON representation of the query.
	   */
	  toJSON() {
	    var params = {
	      where: this._where
	    };

	    if (this._include.length) {
	      params.include = this._include.join(',');
	    }
	    if (this._select) {
	      params.keys = this._select.join(',');
	    }
	    if (this._limit >= 0) {
	      params.limit = this._limit;
	    }
	    if (this._skip > 0) {
	      params.skip = this._skip;
	    }
	    if (this._order) {
	      params.order = this._order.join(',');
	    }
	    for (var key in this._extraOptions) {
	      params[key] = this._extraOptions[key];
	    }

	    return params;
	  }

	  /**
	   * Constructs a Parse.Object whose id is already known by fetching data from
	   * the server.  Either options.success or options.error is called when the
	   * find completes.
	   *
	   * @method get
	   * @param {String} objectId The id of the object to be fetched.
	   * @param {Object} options A Backbone-style options object.
	   * Valid options are:<ul>
	   *   <li>success: A Backbone-style success callback
	   *   <li>error: An Backbone-style error callback.
	   *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
	   *     be used for this request.
	   *   <li>sessionToken: A valid session token, used for making a request on
	   *       behalf of a specific user.
	   * </ul>
	   *
	   * @return {Parse.Promise} A promise that is resolved with the result when
	   * the query completes.
	   */
	  get(objectId, options) {
	    this.equalTo('objectId', objectId);

	    var firstOptions = {};
	    if (options && options.hasOwnProperty('useMasterKey')) {
	      firstOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options && options.hasOwnProperty('sessionToken')) {
	      firstOptions.sessionToken = options.sessionToken;
	    }

	    return this.first(firstOptions).then(response => {
	      if (response) {
	        return response;
	      }

	      var errorObject = new ParseError(ParseError.OBJECT_NOT_FOUND, 'Object not found.');
	      return ParsePromise.error(errorObject);
	    })._thenRunCallbacks(options, null);
	  }

	  /**
	   * Retrieves a list of ParseObjects that satisfy this query.
	   * Either options.success or options.error is called when the find
	   * completes.
	   *
	   * @method find
	   * @param {Object} options A Backbone-style options object. Valid options
	   * are:<ul>
	   *   <li>success: Function to call when the find completes successfully.
	   *   <li>error: Function to call when the find fails.
	   *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
	   *     be used for this request.
	   *   <li>sessionToken: A valid session token, used for making a request on
	   *       behalf of a specific user.
	   * </ul>
	   *
	   * @return {Parse.Promise} A promise that is resolved with the results when
	   * the query completes.
	   */
	  find(options) {
	    options = options || {};

	    let findOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      findOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('sessionToken')) {
	      findOptions.sessionToken = options.sessionToken;
	    }

	    let controller = CoreManager.getQueryController();

	    return controller.find(this.className, this.toJSON(), findOptions).then(response => {
	      return response.results.map(data => {
	        // In cases of relations, the server may send back a className
	        // on the top level of the payload
	        let override = response.className || this.className;
	        if (!data.className) {
	          data.className = override;
	        }
	        return ParseObject.fromJSON(data, true);
	      });
	    })._thenRunCallbacks(options);
	  }

	  /**
	   * Counts the number of objects that match this query.
	   * Either options.success or options.error is called when the count
	   * completes.
	   *
	   * @method count
	   * @param {Object} options A Backbone-style options object. Valid options
	   * are:<ul>
	   *   <li>success: Function to call when the count completes successfully.
	   *   <li>error: Function to call when the find fails.
	   *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
	   *     be used for this request.
	   *   <li>sessionToken: A valid session token, used for making a request on
	   *       behalf of a specific user.
	   * </ul>
	   *
	   * @return {Parse.Promise} A promise that is resolved with the count when
	   * the query completes.
	   */
	  count(options) {
	    options = options || {};

	    var findOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      findOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('sessionToken')) {
	      findOptions.sessionToken = options.sessionToken;
	    }

	    var controller = CoreManager.getQueryController();

	    var params = this.toJSON();
	    params.limit = 0;
	    params.count = 1;

	    return controller.find(this.className, params, findOptions).then(result => {
	      return result.count;
	    })._thenRunCallbacks(options);
	  }

	  /**
	   * Retrieves at most one Parse.Object that satisfies this query.
	   *
	   * Either options.success or options.error is called when it completes.
	   * success is passed the object if there is one. otherwise, undefined.
	   *
	   * @method first
	   * @param {Object} options A Backbone-style options object. Valid options
	   * are:<ul>
	   *   <li>success: Function to call when the find completes successfully.
	   *   <li>error: Function to call when the find fails.
	   *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
	   *     be used for this request.
	   *   <li>sessionToken: A valid session token, used for making a request on
	   *       behalf of a specific user.
	   * </ul>
	   *
	   * @return {Parse.Promise} A promise that is resolved with the object when
	   * the query completes.
	   */
	  first(options) {
	    options = options || {};

	    var findOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      findOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('sessionToken')) {
	      findOptions.sessionToken = options.sessionToken;
	    }

	    var controller = CoreManager.getQueryController();

	    var params = this.toJSON();
	    params.limit = 1;

	    return controller.find(this.className, params, findOptions).then(response => {
	      var objects = response.results;
	      if (!objects[0]) {
	        return undefined;
	      }
	      if (!objects[0].className) {
	        objects[0].className = this.className;
	      }
	      return ParseObject.fromJSON(objects[0], true);
	    })._thenRunCallbacks(options);
	  }

	  /**
	   * Iterates over each result of a query, calling a callback for each one. If
	   * the callback returns a promise, the iteration will not continue until
	   * that promise has been fulfilled. If the callback returns a rejected
	   * promise, then iteration will stop with that error. The items are
	   * processed in an unspecified order. The query may not have any sort order,
	   * and may not use limit or skip.
	   * @method each
	   * @param {Function} callback Callback that will be called with each result
	   *     of the query.
	   * @param {Object} options A Backbone-style options object. Valid options
	   * are:<ul>
	   *   <li>success: Function to call when the iteration completes successfully.
	   *   <li>error: Function to call when the iteration fails.
	   *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
	   *     be used for this request.
	   *   <li>sessionToken: A valid session token, used for making a request on
	   *       behalf of a specific user.
	   * </ul>
	   * @return {Parse.Promise} A promise that will be fulfilled once the
	   *     iteration has completed.
	   */
	  each(callback, options) {
	    options = options || {};

	    if (this._order || this._skip || this._limit >= 0) {
	      return ParsePromise.error('Cannot iterate on a query with sort, skip, or limit.')._thenRunCallbacks(options);
	    }

	    new ParsePromise();


	    var query = new ParseQuery(this.className);
	    // We can override the batch size from the options.
	    // This is undocumented, but useful for testing.
	    query._limit = options.batchSize || 100;
	    query._include = this._include.map(i => {
	      return i;
	    });
	    if (this._select) {
	      query._select = this._select.map(s => {
	        return s;
	      });
	    }

	    query._where = {};
	    for (var attr in this._where) {
	      var val = this._where[attr];
	      if (Array.isArray(val)) {
	        query._where[attr] = val.map(v => {
	          return v;
	        });
	      } else if (val && typeof val === 'object') {
	        var conditionMap = {};
	        query._where[attr] = conditionMap;
	        for (var cond in val) {
	          conditionMap[cond] = val[cond];
	        }
	      } else {
	        query._where[attr] = val;
	      }
	    }

	    query.ascending('objectId');

	    var findOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      findOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('sessionToken')) {
	      findOptions.sessionToken = options.sessionToken;
	    }

	    var finished = false;
	    return ParsePromise._continueWhile(() => {
	      return !finished;
	    }, () => {
	      return query.find(findOptions).then(results => {
	        var callbacksDone = ParsePromise.as();
	        results.forEach(result => {
	          callbacksDone = callbacksDone.then(() => {
	            return callback(result);
	          });
	        });

	        return callbacksDone.then(() => {
	          if (results.length >= query._limit) {
	            query.greaterThan('objectId', results[results.length - 1].id);
	          } else {
	            finished = true;
	          }
	        });
	      });
	    })._thenRunCallbacks(options);
	  }

	  /** Query Conditions **/

	  /**
	   * Adds a constraint to the query that requires a particular key's value to
	   * be equal to the provided value.
	   * @method equalTo
	   * @param {String} key The key to check.
	   * @param value The value that the Parse.Object must contain.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  equalTo(key, value) {
	    if (typeof value === 'undefined') {
	      return this.doesNotExist(key);
	    }

	    this._where[key] = encode(value, false, true);
	    return this;
	  }

	  /**
	   * Adds a constraint to the query that requires a particular key's value to
	   * be not equal to the provided value.
	   * @method notEqualTo
	   * @param {String} key The key to check.
	   * @param value The value that must not be equalled.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  notEqualTo(key, value) {
	    return this._addCondition(key, '$ne', value);
	  }

	  /**
	   * Adds a constraint to the query that requires a particular key's value to
	   * be less than the provided value.
	   * @method lessThan
	   * @param {String} key The key to check.
	   * @param value The value that provides an upper bound.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  lessThan(key, value) {
	    return this._addCondition(key, '$lt', value);
	  }

	  /**
	   * Adds a constraint to the query that requires a particular key's value to
	   * be greater than the provided value.
	   * @method greaterThan
	   * @param {String} key The key to check.
	   * @param value The value that provides an lower bound.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  greaterThan(key, value) {
	    return this._addCondition(key, '$gt', value);
	  }

	  /**
	   * Adds a constraint to the query that requires a particular key's value to
	   * be less than or equal to the provided value.
	   * @method lessThanOrEqualTo
	   * @param {String} key The key to check.
	   * @param value The value that provides an upper bound.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  lessThanOrEqualTo(key, value) {
	    return this._addCondition(key, '$lte', value);
	  }

	  /**
	   * Adds a constraint to the query that requires a particular key's value to
	   * be greater than or equal to the provided value.
	   * @method greaterThanOrEqualTo
	   * @param {String} key The key to check.
	   * @param value The value that provides an lower bound.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  greaterThanOrEqualTo(key, value) {
	    return this._addCondition(key, '$gte', value);
	  }

	  /**
	   * Adds a constraint to the query that requires a particular key's value to
	   * be contained in the provided list of values.
	   * @method containedIn
	   * @param {String} key The key to check.
	   * @param {Array} values The values that will match.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  containedIn(key, value) {
	    return this._addCondition(key, '$in', value);
	  }

	  /**
	   * Adds a constraint to the query that requires a particular key's value to
	   * not be contained in the provided list of values.
	   * @method notContainedIn
	   * @param {String} key The key to check.
	   * @param {Array} values The values that will not match.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  notContainedIn(key, value) {
	    return this._addCondition(key, '$nin', value);
	  }

	  /**
	   * Adds a constraint to the query that requires a particular key's value to
	   * contain each one of the provided list of values.
	   * @method containsAll
	   * @param {String} key The key to check.  This key's value must be an array.
	   * @param {Array} values The values that will match.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  containsAll(key, values) {
	    return this._addCondition(key, '$all', values);
	  }

	  /**
	   * Adds a constraint for finding objects that contain the given key.
	   * @method exists
	   * @param {String} key The key that should exist.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  exists(key) {
	    return this._addCondition(key, '$exists', true);
	  }

	  /**
	   * Adds a constraint for finding objects that do not contain a given key.
	   * @method doesNotExist
	   * @param {String} key The key that should not exist
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  doesNotExist(key) {
	    return this._addCondition(key, '$exists', false);
	  }

	  /**
	   * Adds a regular expression constraint for finding string values that match
	   * the provided regular expression.
	   * This may be slow for large datasets.
	   * @method matches
	   * @param {String} key The key that the string to match is stored in.
	   * @param {RegExp} regex The regular expression pattern to match.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  matches(key, regex, modifiers) {
	    this._addCondition(key, '$regex', regex);
	    if (!modifiers) {
	      modifiers = '';
	    }
	    if (regex.ignoreCase) {
	      modifiers += 'i';
	    }
	    if (regex.multiline) {
	      modifiers += 'm';
	    }
	    if (modifiers.length) {
	      this._addCondition(key, '$options', modifiers);
	    }
	    return this;
	  }

	  /**
	   * Adds a constraint that requires that a key's value matches a Parse.Query
	   * constraint.
	   * @method matchesQuery
	   * @param {String} key The key that the contains the object to match the
	   *                     query.
	   * @param {Parse.Query} query The query that should match.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  matchesQuery(key, query) {
	    var queryJSON = query.toJSON();
	    queryJSON.className = query.className;
	    return this._addCondition(key, '$inQuery', queryJSON);
	  }

	  /**
	   * Adds a constraint that requires that a key's value not matches a
	   * Parse.Query constraint.
	   * @method doesNotMatchQuery
	   * @param {String} key The key that the contains the object to match the
	   *                     query.
	   * @param {Parse.Query} query The query that should not match.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  doesNotMatchQuery(key, query) {
	    var queryJSON = query.toJSON();
	    queryJSON.className = query.className;
	    return this._addCondition(key, '$notInQuery', queryJSON);
	  }

	  /**
	   * Adds a constraint that requires that a key's value matches a value in
	   * an object returned by a different Parse.Query.
	   * @method matchesKeyInQuery
	   * @param {String} key The key that contains the value that is being
	   *                     matched.
	   * @param {String} queryKey The key in the objects returned by the query to
	   *                          match against.
	   * @param {Parse.Query} query The query to run.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  matchesKeyInQuery(key, queryKey, query) {
	    var queryJSON = query.toJSON();
	    queryJSON.className = query.className;
	    return this._addCondition(key, '$select', {
	      key: queryKey,
	      query: queryJSON
	    });
	  }

	  /**
	   * Adds a constraint that requires that a key's value not match a value in
	   * an object returned by a different Parse.Query.
	   * @method doesNotMatchKeyInQuery
	   * @param {String} key The key that contains the value that is being
	   *                     excluded.
	   * @param {String} queryKey The key in the objects returned by the query to
	   *                          match against.
	   * @param {Parse.Query} query The query to run.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  doesNotMatchKeyInQuery(key, queryKey, query) {
	    var queryJSON = query.toJSON();
	    queryJSON.className = query.className;
	    return this._addCondition(key, '$dontSelect', {
	      key: queryKey,
	      query: queryJSON
	    });
	  }

	  /**
	   * Adds a constraint for finding string values that contain a provided
	   * string.  This may be slow for large datasets.
	   * @method contains
	   * @param {String} key The key that the string to match is stored in.
	   * @param {String} substring The substring that the value must contain.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  contains(key, value) {
	    if (typeof value !== 'string') {
	      throw new Error('The value being searched for must be a string.');
	    }
	    return this._addCondition(key, '$regex', quote(value));
	  }

	  /**
	   * Adds a constraint for finding string values that start with a provided
	   * string.  This query will use the backend index, so it will be fast even
	   * for large datasets.
	   * @method startsWith
	   * @param {String} key The key that the string to match is stored in.
	   * @param {String} prefix The substring that the value must start with.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  startsWith(key, value) {
	    if (typeof value !== 'string') {
	      throw new Error('The value being searched for must be a string.');
	    }
	    return this._addCondition(key, '$regex', '^' + quote(value));
	  }

	  /**
	   * Adds a constraint for finding string values that end with a provided
	   * string.  This will be slow for large datasets.
	   * @method endsWith
	   * @param {String} key The key that the string to match is stored in.
	   * @param {String} suffix The substring that the value must end with.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  endsWith(key, value) {
	    if (typeof value !== 'string') {
	      throw new Error('The value being searched for must be a string.');
	    }
	    return this._addCondition(key, '$regex', quote(value) + '$');
	  }

	  /**
	   * Adds a proximity based constraint for finding objects with key point
	   * values near the point given.
	   * @method near
	   * @param {String} key The key that the Parse.GeoPoint is stored in.
	   * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  near(key, point) {
	    if (!(point instanceof ParseGeoPoint)) {
	      // Try to cast it as a GeoPoint
	      point = new ParseGeoPoint(point);
	    }
	    return this._addCondition(key, '$nearSphere', point);
	  }

	  /**
	   * Adds a proximity based constraint for finding objects with key point
	   * values near the point given and within the maximum distance given.
	   * @method withinRadians
	   * @param {String} key The key that the Parse.GeoPoint is stored in.
	   * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
	   * @param {Number} maxDistance Maximum distance (in radians) of results to
	   *   return.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  withinRadians(key, point, distance) {
	    this.near(key, point);
	    return this._addCondition(key, '$maxDistance', distance);
	  }

	  /**
	   * Adds a proximity based constraint for finding objects with key point
	   * values near the point given and within the maximum distance given.
	   * Radius of earth used is 3958.8 miles.
	   * @method withinMiles
	   * @param {String} key The key that the Parse.GeoPoint is stored in.
	   * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
	   * @param {Number} maxDistance Maximum distance (in miles) of results to
	   *     return.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  withinMiles(key, point, distance) {
	    return this.withinRadians(key, point, distance / 3958.8);
	  }

	  /**
	   * Adds a proximity based constraint for finding objects with key point
	   * values near the point given and within the maximum distance given.
	   * Radius of earth used is 6371.0 kilometers.
	   * @method withinKilometers
	   * @param {String} key The key that the Parse.GeoPoint is stored in.
	   * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
	   * @param {Number} maxDistance Maximum distance (in kilometers) of results
	   *     to return.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  withinKilometers(key, point, distance) {
	    return this.withinRadians(key, point, distance / 6371.0);
	  }

	  /**
	   * Adds a constraint to the query that requires a particular key's
	   * coordinates be contained within a given rectangular geographic bounding
	   * box.
	   * @method withinGeoBox
	   * @param {String} key The key to be constrained.
	   * @param {Parse.GeoPoint} southwest
	   *     The lower-left inclusive corner of the box.
	   * @param {Parse.GeoPoint} northeast
	   *     The upper-right inclusive corner of the box.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  withinGeoBox(key, southwest, northeast) {
	    if (!(southwest instanceof ParseGeoPoint)) {
	      southwest = new ParseGeoPoint(southwest);
	    }
	    if (!(northeast instanceof ParseGeoPoint)) {
	      northeast = new ParseGeoPoint(northeast);
	    }
	    this._addCondition(key, '$within', { '$box': [southwest, northeast] });
	    return this;
	  }

	  /** Query Orderings **/

	  /**
	   * Sorts the results in ascending order by the given key.
	   *
	   * @method ascending
	   * @param {(String|String[]|...String} key The key to order by, which is a
	   * string of comma separated values, or an Array of keys, or multiple keys.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  ascending(...keys) {
	    this._order = [];
	    return this.addAscending.apply(this, keys);
	  }

	  /**
	   * Sorts the results in ascending order by the given key,
	   * but can also add secondary sort descriptors without overwriting _order.
	   *
	   * @method addAscending
	   * @param {(String|String[]|...String} key The key to order by, which is a
	   * string of comma separated values, or an Array of keys, or multiple keys.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  addAscending(...keys) {
	    if (!this._order) {
	      this._order = [];
	    }
	    keys.forEach(key => {
	      if (Array.isArray(key)) {
	        key = key.join();
	      }
	      this._order = this._order.concat(key.replace(/\s/g, '').split(','));
	    });

	    return this;
	  }

	  /**
	   * Sorts the results in descending order by the given key.
	   *
	   * @method descending
	   * @param {(String|String[]|...String} key The key to order by, which is a
	   * string of comma separated values, or an Array of keys, or multiple keys.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  descending(...keys) {
	    this._order = [];
	    return this.addDescending.apply(this, keys);
	  }

	  /**
	   * Sorts the results in descending order by the given key,
	   * but can also add secondary sort descriptors without overwriting _order.
	   *
	   * @method addDescending
	   * @param {(String|String[]|...String} key The key to order by, which is a
	   * string of comma separated values, or an Array of keys, or multiple keys.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  addDescending(...keys) {
	    if (!this._order) {
	      this._order = [];
	    }
	    keys.forEach(key => {
	      if (Array.isArray(key)) {
	        key = key.join();
	      }
	      this._order = this._order.concat(key.replace(/\s/g, '').split(',').map(k => {
	        return '-' + k;
	      }));
	    });

	    return this;
	  }

	  /** Query Options **/

	  /**
	   * Sets the number of results to skip before returning any results.
	   * This is useful for pagination.
	   * Default is to skip zero results.
	   * @method skip
	   * @param {Number} n the number of results to skip.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  skip(n) {
	    if (typeof n !== 'number' || n < 0) {
	      throw new Error('You can only skip by a positive number');
	    }
	    this._skip = n;
	    return this;
	  }

	  /**
	   * Sets the limit of the number of results to return. The default limit is
	   * 100, with a maximum of 1000 results being returned at a time.
	   * @method limit
	   * @param {Number} n the number of results to limit to.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  limit(n) {
	    if (typeof n !== 'number') {
	      throw new Error('You can only set the limit to a numeric value');
	    }
	    this._limit = n;
	    return this;
	  }

	  /**
	   * Includes nested Parse.Objects for the provided key.  You can use dot
	   * notation to specify which fields in the included object are also fetched.
	   * @method include
	   * @param {String} key The name of the key to include.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  include(...keys) {
	    keys.forEach(key => {
	      if (Array.isArray(key)) {
	        this._include = this._include.concat(key);
	      } else {
	        this._include.push(key);
	      }
	    });
	    return this;
	  }

	  /**
	   * Restricts the fields of the returned Parse.Objects to include only the
	   * provided keys.  If this is called multiple times, then all of the keys
	   * specified in each of the calls will be included.
	   * @method select
	   * @param {Array} keys The names of the keys to include.
	   * @return {Parse.Query} Returns the query, so you can chain this call.
	   */
	  select(...keys) {
	    if (!this._select) {
	      this._select = [];
	    }
	    keys.forEach(key => {
	      if (Array.isArray(key)) {
	        this._select = this._select.concat(key);
	      } else {
	        this._select.push(key);
	      }
	    });
	    return this;
	  }

	  /**
	   * Subscribe this query to get liveQuery updates
	   * @method subscribe
	   * @return {LiveQuerySubscription} Returns the liveQuerySubscription, it's an event emitter
	   * which can be used to get liveQuery updates.
	   */
	  subscribe() {
	    let controller = CoreManager.getLiveQueryController();
	    return controller.subscribe(this);
	  }

	  /**
	   * Constructs a Parse.Query that is the OR of the passed in queries.  For
	   * example:
	   * <pre>var compoundQuery = Parse.Query.or(query1, query2, query3);</pre>
	   *
	   * will create a compoundQuery that is an or of the query1, query2, and
	   * query3.
	   * @method or
	   * @param {...Parse.Query} var_args The list of queries to OR.
	   * @static
	   * @return {Parse.Query} The query that is the OR of the passed in queries.
	   */
	  static or(...queries) {
	    var className = null;
	    queries.forEach(q => {
	      if (!className) {
	        className = q.className;
	      }

	      if (className !== q.className) {
	        throw new Error('All queries must be for the same class.');
	      }
	    });

	    var query = new ParseQuery(className);
	    query._orQuery(queries);
	    return query;
	  }
	}

	var DefaultController = {
	  find(className, params, options) {
	    var RESTController = CoreManager.getRESTController();

	    return RESTController.request('GET', 'classes/' + className, params, options);
	  }
	};

	CoreManager.setQueryController(DefaultController);

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import { RelationOp } from './ParseOp';
	import ParseObject from './ParseObject';
	import ParseQuery from './ParseQuery';

	/**
	 * Creates a new Relation for the given parent object and key. This
	 * constructor should rarely be used directly, but rather created by
	 * Parse.Object.relation.
	 * @class Parse.Relation
	 * @constructor
	 * @param {Parse.Object} parent The parent of this relation.
	 * @param {String} key The key for this relation on the parent.
	 *
	 * <p>
	 * A class that is used to access all of the children of a many-to-many
	 * relationship.  Each instance of Parse.Relation is associated with a
	 * particular parent object and key.
	 * </p>
	 */
	export default class ParseRelation {

	  constructor(parent, key) {
	    this.parent = parent;
	    this.key = key;
	    this.targetClassName = null;
	  }

	  /**
	   * Makes sure that this relation has the right parent and key.
	   */
	  _ensureParentAndKey(parent, key) {
	    this.key = this.key || key;
	    if (this.key !== key) {
	      throw new Error('Internal Error. Relation retrieved from two different keys.');
	    }
	    if (this.parent) {
	      if (this.parent.className !== parent.className) {
	        throw new Error('Internal Error. Relation retrieved from two different Objects.');
	      }
	      if (this.parent.id) {
	        if (this.parent.id !== parent.id) {
	          throw new Error('Internal Error. Relation retrieved from two different Objects.');
	        }
	      } else if (parent.id) {
	        this.parent = parent;
	      }
	    } else {
	      this.parent = parent;
	    }
	  }

	  /**
	   * Adds a Parse.Object or an array of Parse.Objects to the relation.
	   * @method add
	   * @param {} objects The item or items to add.
	   */
	  add(objects) {
	    if (!Array.isArray(objects)) {
	      objects = [objects];
	    }

	    var change = new RelationOp(objects, []);
	    var parent = this.parent;
	    if (!parent) {
	      throw new Error('Cannot add to a Relation without a parent');
	    }
	    parent.set(this.key, change);
	    this.targetClassName = change._targetClassName;
	    return parent;
	  }

	  /**
	   * Removes a Parse.Object or an array of Parse.Objects from this relation.
	   * @method remove
	   * @param {} objects The item or items to remove.
	   */
	  remove(objects) {
	    if (!Array.isArray(objects)) {
	      objects = [objects];
	    }

	    var change = new RelationOp([], objects);
	    if (!this.parent) {
	      throw new Error('Cannot remove from a Relation without a parent');
	    }
	    this.parent.set(this.key, change);
	    this.targetClassName = change._targetClassName;
	  }

	  /**
	   * Returns a JSON version of the object suitable for saving to disk.
	   * @method toJSON
	   * @return {Object}
	   */
	  toJSON() {
	    return {
	      __type: 'Relation',
	      className: this.targetClassName
	    };
	  }

	  /**
	   * Returns a Parse.Query that is limited to objects in this
	   * relation.
	   * @method query
	   * @return {Parse.Query}
	   */
	  query() {
	    var query;
	    var parent = this.parent;
	    if (!parent) {
	      throw new Error('Cannot construct a query for a Relation without a parent');
	    }
	    if (!this.targetClassName) {
	      query = new ParseQuery(parent.className);
	      query._extraOptions.redirectClassNameForKey = this.key;
	    } else {
	      query = new ParseQuery(this.targetClassName);
	    }
	    query._addCondition('$relatedTo', 'object', {
	      __type: 'Pointer',
	      className: parent.className,
	      objectId: parent.id
	    });
	    query._addCondition('$relatedTo', 'key', this.key);

	    return query;
	  }
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import ParseACL from './ParseACL';
	import ParseError from './ParseError';
	import ParseObject from './ParseObject';

	/**
	 * Represents a Role on the Parse server. Roles represent groupings of
	 * Users for the purposes of granting permissions (e.g. specifying an ACL
	 * for an Object). Roles are specified by their sets of child users and
	 * child roles, all of which are granted any permissions that the parent
	 * role has.
	 *
	 * <p>Roles must have a name (which cannot be changed after creation of the
	 * role), and must specify an ACL.</p>
	 * @class Parse.Role
	 * @constructor
	 * @param {String} name The name of the Role to create.
	 * @param {Parse.ACL} acl The ACL for this role. Roles must have an ACL.
	 * A Parse.Role is a local representation of a role persisted to the Parse
	 * cloud.
	 */
	export default class ParseRole extends ParseObject {
	  constructor(name, acl) {
	    super('_Role');
	    if (typeof name === 'string' && acl instanceof ParseACL) {
	      this.setName(name);
	      this.setACL(acl);
	    }
	  }

	  /**
	   * Gets the name of the role.  You can alternatively call role.get("name")
	   *
	   * @method getName
	   * @return {String} the name of the role.
	   */
	  getName() {
	    const name = this.get('name');
	    if (name == null || typeof name === 'string') {
	      return name;
	    }
	    return '';
	  }

	  /**
	   * Sets the name for a role. This value must be set before the role has
	   * been saved to the server, and cannot be set once the role has been
	   * saved.
	   *
	   * <p>
	   *   A role's name can only contain alphanumeric characters, _, -, and
	   *   spaces.
	   * </p>
	   *
	   * <p>This is equivalent to calling role.set("name", name)</p>
	   *
	   * @method setName
	   * @param {String} name The name of the role.
	   * @param {Object} options Standard options object with success and error
	   *     callbacks.
	   */
	  setName(name, options) {
	    return this.set('name', name, options);
	  }

	  /**
	   * Gets the Parse.Relation for the Parse.Users that are direct
	   * children of this role. These users are granted any privileges that this
	   * role has been granted (e.g. read or write access through ACLs). You can
	   * add or remove users from the role through this relation.
	   *
	   * <p>This is equivalent to calling role.relation("users")</p>
	   *
	   * @method getUsers
	   * @return {Parse.Relation} the relation for the users belonging to this
	   *     role.
	   */
	  getUsers() {
	    return this.relation('users');
	  }

	  /**
	   * Gets the Parse.Relation for the Parse.Roles that are direct
	   * children of this role. These roles' users are granted any privileges that
	   * this role has been granted (e.g. read or write access through ACLs). You
	   * can add or remove child roles from this role through this relation.
	   *
	   * <p>This is equivalent to calling role.relation("roles")</p>
	   *
	   * @method getRoles
	   * @return {Parse.Relation} the relation for the roles belonging to this
	   *     role.
	   */
	  getRoles() {
	    return this.relation('roles');
	  }

	  validate(attrs, options) {
	    var isInvalid = super.validate(attrs, options);
	    if (isInvalid) {
	      return isInvalid;
	    }

	    if ('name' in attrs && attrs.name !== this.getName()) {
	      var newName = attrs.name;
	      if (this.id && this.id !== attrs.objectId) {
	        // Check to see if the objectId being set matches this.id
	        // This happens during a fetch -- the id is set before calling fetch
	        // Let the name be set in this case
	        return new ParseError(ParseError.OTHER_CAUSE, 'A role\'s name can only be set before it has been saved.');
	      }
	      if (typeof newName !== 'string') {
	        return new ParseError(ParseError.OTHER_CAUSE, 'A role\'s name must be a String.');
	      }
	      if (!/^[0-9a-zA-Z\-_ ]+$/.test(newName)) {
	        return new ParseError(ParseError.OTHER_CAUSE, 'A role\'s name can be only contain alphanumeric characters, _, ' + '-, and spaces.');
	      }
	    }
	    return false;
	  }
	}

	ParseObject.registerSubclass('_Role', ParseRole);

/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import CoreManager from './CoreManager';
	import isRevocableSession from './isRevocableSession';
	import ParseObject from './ParseObject';
	import ParsePromise from './ParsePromise';
	import ParseUser from './ParseUser';

	/**
	 * @class Parse.Session
	 * @constructor
	 *
	 * <p>A Parse.Session object is a local representation of a revocable session.
	 * This class is a subclass of a Parse.Object, and retains the same
	 * functionality of a Parse.Object.</p>
	 */
	export default class ParseSession extends ParseObject {
	  constructor(attributes) {
	    super('_Session');
	    if (attributes && typeof attributes === 'object') {
	      if (!this.set(attributes || {})) {
	        throw new Error('Can\'t create an invalid Session');
	      }
	    }
	  }

	  /**
	   * Returns the session token string.
	   * @method getSessionToken
	   * @return {String}
	   */
	  getSessionToken() {
	    const token = this.get('sessionToken');
	    if (typeof token === 'string') {
	      return token;
	    }
	    return '';
	  }

	  static readOnlyAttributes() {
	    return ['createdWith', 'expiresAt', 'installationId', 'restricted', 'sessionToken', 'user'];
	  }

	  /**
	   * Retrieves the Session object for the currently logged in session.
	   * @method current
	   * @static
	   * @return {Parse.Promise} A promise that is resolved with the Parse.Session
	   *   object after it has been fetched. If there is no current user, the
	   *   promise will be rejected.
	   */
	  static current(options) {
	    options = options || {};
	    var controller = CoreManager.getSessionController();

	    var sessionOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      sessionOptions.useMasterKey = options.useMasterKey;
	    }
	    return ParseUser.currentAsync().then(user => {
	      if (!user) {
	        return ParsePromise.error('There is no current user.');
	      }
	      user.getSessionToken();

	      sessionOptions.sessionToken = user.getSessionToken();
	      return controller.getSession(sessionOptions);
	    });
	  }

	  /**
	   * Determines whether the current session token is revocable.
	   * This method is useful for migrating Express.js or Node.js web apps to
	   * use revocable sessions. If you are migrating an app that uses the Parse
	   * SDK in the browser only, please use Parse.User.enableRevocableSession()
	   * instead, so that sessions can be automatically upgraded.
	   * @method isCurrentSessionRevocable
	   * @static
	   * @return {Boolean}
	   */
	  static isCurrentSessionRevocable() {
	    var currentUser = ParseUser.current();
	    if (currentUser) {
	      return isRevocableSession(currentUser.getSessionToken() || '');
	    }
	    return false;
	  }
	}

	ParseObject.registerSubclass('_Session', ParseSession);

	var DefaultController = {
	  getSession(options) {
	    var RESTController = CoreManager.getRESTController();
	    var session = new ParseSession();

	    return RESTController.request('GET', 'sessions/me', {}, options).then(sessionData => {
	      session._finishFetch(sessionData);
	      session._setExisted(true);
	      return session;
	    });
	  }
	};

	CoreManager.setSessionController(DefaultController);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import CoreManager from './CoreManager';
	import ParsePromise from './ParsePromise';

	var Storage = {
	  async() {
	    var controller = CoreManager.getStorageController();
	    return !!controller.async;
	  },

	  getItem(path) {
	    var controller = CoreManager.getStorageController();
	    if (controller.async === 1) {
	      throw new Error('Synchronous storage is not supported by the current storage controller');
	    }
	    return controller.getItem(path);
	  },

	  getItemAsync(path) {
	    var controller = CoreManager.getStorageController();
	    if (controller.async === 1) {
	      return controller.getItemAsync(path);
	    }
	    return ParsePromise.as(controller.getItem(path));
	  },

	  setItem(path, value) {
	    var controller = CoreManager.getStorageController();
	    if (controller.async === 1) {
	      throw new Error('Synchronous storage is not supported by the current storage controller');
	    }
	    return controller.setItem(path, value);
	  },

	  setItemAsync(path, value) {
	    var controller = CoreManager.getStorageController();
	    if (controller.async === 1) {
	      return controller.setItemAsync(path, value);
	    }
	    return ParsePromise.as(controller.setItem(path, value));
	  },

	  removeItem(path) {
	    var controller = CoreManager.getStorageController();
	    if (controller.async === 1) {
	      throw new Error('Synchronous storage is not supported by the current storage controller');
	    }
	    return controller.removeItem(path);
	  },

	  removeItemAsync(path) {
	    var controller = CoreManager.getStorageController();
	    if (controller.async === 1) {
	      return controller.removeItemAsync(path);
	    }
	    return ParsePromise.as(controller.removeItem(path));
	  },

	  generatePath(path) {
	    if (!CoreManager.get('APPLICATION_ID')) {
	      throw new Error('You need to call Parse.initialize before using Parse.');
	    }
	    if (typeof path !== 'string') {
	      throw new Error('Tried to get a Storage path that was not a String.');
	    }
	    if (path[0] === '/') {
	      path = path.substr(1);
	    }
	    return 'Parse/' + CoreManager.get('APPLICATION_ID') + '/' + path;
	  },

	  _clear() {
	    var controller = CoreManager.getStorageController();
	    if (controller.hasOwnProperty('clear')) {
	      controller.clear();
	    }
	  }
	};

	module.exports = Storage;

	CoreManager.setStorageController(__webpack_require__(20));

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import ParsePromise from './ParsePromise';
	// RN packager nonsense
	import { AsyncStorage } from 'react-native/Libraries/react-native/react-native.js';

	var StorageController = {
	  async: 1,

	  getItemAsync(path) {
	    var p = new ParsePromise();
	    AsyncStorage.getItem(path, function (err, value) {
	      if (err) {
	        p.reject(err);
	      } else {
	        p.resolve(value);
	      }
	    });
	    return p;
	  },

	  setItemAsync(path, value) {
	    var p = new ParsePromise();
	    AsyncStorage.setItem(path, value, function (err) {
	      if (err) {
	        p.reject(err);
	      } else {
	        p.resolve(value);
	      }
	    });
	    return p;
	  },

	  removeItemAsync(path) {
	    var p = new ParsePromise();
	    AsyncStorage.removeItem(path, function (err) {
	      if (err) {
	        p.reject(err);
	      } else {
	        p.resolve();
	      }
	    });
	    return p;
	  },

	  clear() {
	    AsyncStorage.clear();
	  }
	};

	module.exports = StorageController;

/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import CoreManager from './CoreManager';
	import isRevocableSession from './isRevocableSession';
	import ParseError from './ParseError';
	import ParseObject from './ParseObject';
	import ParsePromise from './ParsePromise';
	import ParseSession from './ParseSession';
	import Storage from './Storage';

	var CURRENT_USER_KEY = 'currentUser';
	var canUseCurrentUser = !CoreManager.get('IS_NODE');
	var currentUserCacheMatchesDisk = false;
	var currentUserCache = null;

	var authProviders = {};

	/**
	 * @class Parse.User
	 * @constructor
	 *
	 * <p>A Parse.User object is a local representation of a user persisted to the
	 * Parse cloud. This class is a subclass of a Parse.Object, and retains the
	 * same functionality of a Parse.Object, but also extends it with various
	 * user specific methods, like authentication, signing up, and validation of
	 * uniqueness.</p>
	 */
	export default class ParseUser extends ParseObject {
	  constructor(attributes) {
	    super('_User');
	    if (attributes && typeof attributes === 'object') {
	      if (!this.set(attributes || {})) {
	        throw new Error('Can\'t create an invalid Parse User');
	      }
	    }
	  }

	  /**
	   * Request a revocable session token to replace the older style of token.
	   * @method _upgradeToRevocableSession
	   * @param {Object} options A Backbone-style options object.
	   * @return {Parse.Promise} A promise that is resolved when the replacement
	   *   token has been fetched.
	   */
	  _upgradeToRevocableSession(options) {
	    options = options || {};

	    var upgradeOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      upgradeOptions.useMasterKey = options.useMasterKey;
	    }

	    var controller = CoreManager.getUserController();
	    return controller.upgradeToRevocableSession(this, upgradeOptions)._thenRunCallbacks(options);
	  }

	  /**
	   * Unlike in the Android/iOS SDKs, logInWith is unnecessary, since you can
	   * call linkWith on the user (even if it doesn't exist yet on the server).
	   * @method _linkWith
	   */
	  _linkWith(provider, options) {
	    var authType;
	    if (typeof provider === 'string') {
	      authType = provider;
	      provider = authProviders[provider];
	    } else {
	      authType = provider.getAuthType();
	    }
	    if (options && options.hasOwnProperty('authData')) {
	      var authData = this.get('authData') || {};
	      if (typeof authData !== 'object') {
	        throw new Error('Invalid type: authData field should be an object');
	      }
	      authData[authType] = options.authData;

	      var controller = CoreManager.getUserController();
	      return controller.linkWith(this, authData)._thenRunCallbacks(options, this);
	    } else {
	      var promise = new ParsePromise();
	      provider.authenticate({
	        success: (provider, result) => {
	          var opts = {};
	          opts.authData = result;
	          if (options.success) {
	            opts.success = options.success;
	          }
	          if (options.error) {
	            opts.error = options.error;
	          }
	          this._linkWith(provider, opts).then(() => {
	            promise.resolve(this);
	          }, error => {
	            promise.reject(error);
	          });
	        },
	        error: (provider, error) => {
	          if (typeof options.error === 'function') {
	            options.error(this, error);
	          }
	          promise.reject(error);
	        }
	      });
	      return promise;
	    }
	  }

	  /**
	   * Synchronizes auth data for a provider (e.g. puts the access token in the
	   * right place to be used by the Facebook SDK).
	   * @method _synchronizeAuthData
	   */
	  _synchronizeAuthData(provider) {
	    if (!this.isCurrent() || !provider) {
	      return;
	    }
	    var authType;
	    if (typeof provider === 'string') {
	      authType = provider;
	      provider = authProviders[authType];
	    } else {
	      authType = provider.getAuthType();
	    }
	    var authData = this.get('authData');
	    if (!provider || !authData || typeof authData !== 'object') {
	      return;
	    }
	    var success = provider.restoreAuthentication(authData[authType]);
	    if (!success) {
	      this._unlinkFrom(provider);
	    }
	  }

	  /**
	   * Synchronizes authData for all providers.
	   * @method _synchronizeAllAuthData
	   */
	  _synchronizeAllAuthData() {
	    var authData = this.get('authData');
	    if (typeof authData !== 'object') {
	      return;
	    }

	    for (var key in authData) {
	      this._synchronizeAuthData(key);
	    }
	  }

	  /**
	   * Removes null values from authData (which exist temporarily for
	   * unlinking)
	   * @method _cleanupAuthData
	   */
	  _cleanupAuthData() {
	    if (!this.isCurrent()) {
	      return;
	    }
	    var authData = this.get('authData');
	    if (typeof authData !== 'object') {
	      return;
	    }

	    for (var key in authData) {
	      if (!authData[key]) {
	        delete authData[key];
	      }
	    }
	  }

	  /**
	   * Unlinks a user from a service.
	   * @method _unlinkFrom
	   */
	  _unlinkFrom(provider, options) {
	    if (typeof provider === 'string') {
	      provider = authProviders[provider];
	    } else {
	      provider.getAuthType();
	    }
	    return this._linkWith(provider, { authData: null }).then(() => {
	      this._synchronizeAuthData(provider);
	      return ParsePromise.as(this);
	    })._thenRunCallbacks(options);
	  }

	  /**
	   * Checks whether a user is linked to a service.
	   * @method _isLinked
	   */
	  _isLinked(provider) {
	    var authType;
	    if (typeof provider === 'string') {
	      authType = provider;
	    } else {
	      authType = provider.getAuthType();
	    }
	    var authData = this.get('authData') || {};
	    if (typeof authData !== 'object') {
	      return false;
	    }
	    return !!authData[authType];
	  }

	  /**
	   * Deauthenticates all providers.
	   * @method _logOutWithAll
	   */
	  _logOutWithAll() {
	    var authData = this.get('authData');
	    if (typeof authData !== 'object') {
	      return;
	    }

	    for (var key in authData) {
	      this._logOutWith(key);
	    }
	  }

	  /**
	   * Deauthenticates a single provider (e.g. removing access tokens from the
	   * Facebook SDK).
	   * @method _logOutWith
	   */
	  _logOutWith(provider) {
	    if (!this.isCurrent()) {
	      return;
	    }
	    if (typeof provider === 'string') {
	      provider = authProviders[provider];
	    }
	    if (provider && provider.deauthenticate) {
	      provider.deauthenticate();
	    }
	  }

	  /**
	   * Class instance method used to maintain specific keys when a fetch occurs.
	   * Used to ensure that the session token is not lost.
	   */
	  _preserveFieldsOnFetch() {
	    return {
	      sessionToken: this.get('sessionToken')
	    };
	  }

	  /**
	   * Returns true if <code>current</code> would return this user.
	   * @method isCurrent
	   * @return {Boolean}
	   */
	  isCurrent() {
	    var current = ParseUser.current();
	    return !!current && current.id === this.id;
	  }

	  /**
	   * Returns get("username").
	   * @method getUsername
	   * @return {String}
	   */
	  getUsername() {
	    const username = this.get('username');
	    if (username == null || typeof username === 'string') {
	      return username;
	    }
	    return '';
	  }

	  /**
	   * Calls set("username", username, options) and returns the result.
	   * @method setUsername
	   * @param {String} username
	   * @param {Object} options A Backbone-style options object.
	   * @return {Boolean}
	   */
	  setUsername(username) {
	    // Strip anonymity, even we do not support anonymous user in js SDK, we may
	    // encounter anonymous user created by android/iOS in cloud code.
	    var authData = this.get('authData');
	    if (authData && typeof authData === 'object' && authData.hasOwnProperty('anonymous')) {
	      // We need to set anonymous to null instead of deleting it in order to remove it from Parse.
	      authData.anonymous = null;
	    }
	    this.set('username', username);
	  }

	  /**
	   * Calls set("password", password, options) and returns the result.
	   * @method setPassword
	   * @param {String} password
	   * @param {Object} options A Backbone-style options object.
	   * @return {Boolean}
	   */
	  setPassword(password) {
	    this.set('password', password);
	  }

	  /**
	   * Returns get("email").
	   * @method getEmail
	   * @return {String}
	   */
	  getEmail() {
	    const email = this.get('email');
	    if (email == null || typeof email === 'string') {
	      return email;
	    }
	    return '';
	  }

	  /**
	   * Calls set("email", email, options) and returns the result.
	   * @method setEmail
	   * @param {String} email
	   * @param {Object} options A Backbone-style options object.
	   * @return {Boolean}
	   */
	  setEmail(email) {
	    this.set('email', email);
	  }

	  /**
	   * Returns the session token for this user, if the user has been logged in,
	   * or if it is the result of a query with the master key. Otherwise, returns
	   * undefined.
	   * @method getSessionToken
	   * @return {String} the session token, or undefined
	   */
	  getSessionToken() {
	    const token = this.get('sessionToken');
	    if (token == null || typeof token === 'string') {
	      return token;
	    }
	    return '';
	  }

	  /**
	   * Checks whether this user is the current user and has been authenticated.
	   * @method authenticated
	   * @return (Boolean) whether this user is the current user and is logged in.
	   */
	  authenticated() {
	    var current = ParseUser.current();
	    return !!this.get('sessionToken') && !!current && current.id === this.id;
	  }

	  /**
	   * Signs up a new user. You should call this instead of save for
	   * new Parse.Users. This will create a new Parse.User on the server, and
	   * also persist the session on disk so that you can access the user using
	   * <code>current</code>.
	   *
	   * <p>A username and password must be set before calling signUp.</p>
	   *
	   * <p>Calls options.success or options.error on completion.</p>
	   *
	   * @method signUp
	   * @param {Object} attrs Extra fields to set on the new user, or null.
	   * @param {Object} options A Backbone-style options object.
	   * @return {Parse.Promise} A promise that is fulfilled when the signup
	   *     finishes.
	   */
	  signUp(attrs, options) {
	    options = options || {};

	    var signupOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      signupOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('installationId')) {
	      signupOptions.installationId = options.installationId;
	    }

	    var controller = CoreManager.getUserController();
	    return controller.signUp(this, attrs, signupOptions)._thenRunCallbacks(options, this);
	  }

	  /**
	   * Logs in a Parse.User. On success, this saves the session to disk,
	   * so you can retrieve the currently logged in user using
	   * <code>current</code>.
	   *
	   * <p>A username and password must be set before calling logIn.</p>
	   *
	   * <p>Calls options.success or options.error on completion.</p>
	   *
	   * @method logIn
	   * @param {Object} options A Backbone-style options object.
	   * @return {Parse.Promise} A promise that is fulfilled with the user when
	   *     the login is complete.
	   */
	  logIn(options) {
	    options = options || {};

	    var loginOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      loginOptions.useMasterKey = options.useMasterKey;
	    }
	    if (options.hasOwnProperty('installationId')) {
	      loginOptions.installationId = options.installationId;
	    }

	    var controller = CoreManager.getUserController();
	    return controller.logIn(this, loginOptions)._thenRunCallbacks(options, this);
	  }

	  /**
	   * Wrap the default save behavior with functionality to save to local
	   * storage if this is current user.
	   */
	  save(...args) {
	    return super.save.apply(this, args).then(() => {
	      if (this.isCurrent()) {
	        return CoreManager.getUserController().updateUserOnDisk(this);
	      }
	      return this;
	    });
	  }

	  /**
	   * Wrap the default destroy behavior with functionality that logs out
	   * the current user when it is destroyed
	   */
	  destroy(...args) {
	    return super.destroy.apply(this, args).then(() => {
	      if (this.isCurrent()) {
	        return CoreManager.getUserController().removeUserFromDisk();
	      }
	      return this;
	    });
	  }

	  /**
	   * Wrap the default fetch behavior with functionality to save to local
	   * storage if this is current user.
	   */
	  fetch(...args) {
	    return super.fetch.apply(this, args).then(() => {
	      if (this.isCurrent()) {
	        return CoreManager.getUserController().updateUserOnDisk(this);
	      }
	      return this;
	    });
	  }

	  static readOnlyAttributes() {
	    return ['sessionToken'];
	  }

	  /**
	   * Adds functionality to the existing Parse.User class
	   * @method extend
	   * @param {Object} protoProps A set of properties to add to the prototype
	   * @param {Object} classProps A set of static properties to add to the class
	   * @static
	   * @return {Class} The newly extended Parse.User class
	   */
	  static extend(protoProps, classProps) {
	    if (protoProps) {
	      for (var prop in protoProps) {
	        if (prop !== 'className') {
	          Object.defineProperty(ParseUser.prototype, prop, {
	            value: protoProps[prop],
	            enumerable: false,
	            writable: true,
	            configurable: true
	          });
	        }
	      }
	    }

	    if (classProps) {
	      for (var prop in classProps) {
	        if (prop !== 'className') {
	          Object.defineProperty(ParseUser, prop, {
	            value: classProps[prop],
	            enumerable: false,
	            writable: true,
	            configurable: true
	          });
	        }
	      }
	    }

	    return ParseUser;
	  }

	  /**
	   * Retrieves the currently logged in ParseUser with a valid session,
	   * either from memory or localStorage, if necessary.
	   * @method current
	   * @static
	   * @return {Parse.Object} The currently logged in Parse.User.
	   */
	  static current() {
	    if (!canUseCurrentUser) {
	      return null;
	    }
	    var controller = CoreManager.getUserController();
	    return controller.currentUser();
	  }

	  /**
	   * Retrieves the currently logged in ParseUser from asynchronous Storage.
	   * @method currentAsync
	   * @static
	   * @return {Parse.Promise} A Promise that is resolved with the currently
	   *   logged in Parse User
	   */
	  static currentAsync() {
	    if (!canUseCurrentUser) {
	      return ParsePromise.as(null);
	    }
	    var controller = CoreManager.getUserController();
	    return controller.currentUserAsync();
	  }

	  /**
	   * Signs up a new user with a username (or email) and password.
	   * This will create a new Parse.User on the server, and also persist the
	   * session in localStorage so that you can access the user using
	   * {@link #current}.
	   *
	   * <p>Calls options.success or options.error on completion.</p>
	   *
	   * @method signUp
	   * @param {String} username The username (or email) to sign up with.
	   * @param {String} password The password to sign up with.
	   * @param {Object} attrs Extra fields to set on the new user.
	   * @param {Object} options A Backbone-style options object.
	   * @static
	   * @return {Parse.Promise} A promise that is fulfilled with the user when
	   *     the signup completes.
	   */
	  static signUp(username, password, attrs, options) {
	    attrs = attrs || {};
	    attrs.username = username;
	    attrs.password = password;
	    var user = new ParseUser(attrs);
	    return user.signUp({}, options);
	  }

	  /**
	   * Logs in a user with a username (or email) and password. On success, this
	   * saves the session to disk, so you can retrieve the currently logged in
	   * user using <code>current</code>.
	   *
	   * <p>Calls options.success or options.error on completion.</p>
	   *
	   * @method logIn
	   * @param {String} username The username (or email) to log in with.
	   * @param {String} password The password to log in with.
	   * @param {Object} options A Backbone-style options object.
	   * @static
	   * @return {Parse.Promise} A promise that is fulfilled with the user when
	   *     the login completes.
	   */
	  static logIn(username, password, options) {
	    if (typeof username !== 'string') {
	      return ParsePromise.error(new ParseError(ParseError.OTHER_CAUSE, 'Username must be a string.'));
	    } else if (typeof password !== 'string') {
	      return ParsePromise.error(new ParseError(ParseError.OTHER_CAUSE, 'Password must be a string.'));
	    }
	    var user = new ParseUser();
	    user._finishFetch({ username: username, password: password });
	    return user.logIn(options);
	  }

	  /**
	   * Logs in a user with a session token. On success, this saves the session
	   * to disk, so you can retrieve the currently logged in user using
	   * <code>current</code>.
	   *
	   * <p>Calls options.success or options.error on completion.</p>
	   *
	   * @method become
	   * @param {String} sessionToken The sessionToken to log in with.
	   * @param {Object} options A Backbone-style options object.
	   * @static
	   * @return {Parse.Promise} A promise that is fulfilled with the user when
	   *     the login completes.
	   */
	  static become(sessionToken, options) {
	    if (!canUseCurrentUser) {
	      throw new Error('It is not memory-safe to become a user in a server environment');
	    }
	    options = options || {};

	    var becomeOptions = {
	      sessionToken: sessionToken
	    };
	    if (options.hasOwnProperty('useMasterKey')) {
	      becomeOptions.useMasterKey = options.useMasterKey;
	    }

	    var controller = CoreManager.getUserController();
	    return controller.become(becomeOptions)._thenRunCallbacks(options);
	  }

	  static logInWith(provider, options) {
	    return ParseUser._logInWith(provider, options);
	  }

	  /**
	   * Logs out the currently logged in user session. This will remove the
	   * session from disk, log out of linked services, and future calls to
	   * <code>current</code> will return <code>null</code>.
	   * @method logOut
	   * @static
	   * @return {Parse.Promise} A promise that is resolved when the session is
	   *   destroyed on the server.
	   */
	  static logOut() {
	    if (!canUseCurrentUser) {
	      throw new Error('There is no current user user on a node.js server environment.');
	    }

	    var controller = CoreManager.getUserController();
	    return controller.logOut();
	  }

	  /**
	   * Requests a password reset email to be sent to the specified email address
	   * associated with the user account. This email allows the user to securely
	   * reset their password on the Parse site.
	   *
	   * <p>Calls options.success or options.error on completion.</p>
	   *
	   * @method requestPasswordReset
	   * @param {String} email The email address associated with the user that
	   *     forgot their password.
	   * @param {Object} options A Backbone-style options object.
	   * @static
	   */
	  static requestPasswordReset(email, options) {
	    options = options || {};

	    var requestOptions = {};
	    if (options.hasOwnProperty('useMasterKey')) {
	      requestOptions.useMasterKey = options.useMasterKey;
	    }

	    var controller = CoreManager.getUserController();
	    return controller.requestPasswordReset(email, requestOptions)._thenRunCallbacks(options);
	  }

	  /**
	   * Allow someone to define a custom User class without className
	   * being rewritten to _User. The default behavior is to rewrite
	   * User to _User for legacy reasons. This allows developers to
	   * override that behavior.
	   *
	   * @method allowCustomUserClass
	   * @param {Boolean} isAllowed Whether or not to allow custom User class
	   * @static
	   */
	  static allowCustomUserClass(isAllowed) {
	    CoreManager.set('PERFORM_USER_REWRITE', !isAllowed);
	  }

	  /**
	   * Allows a legacy application to start using revocable sessions. If the
	   * current session token is not revocable, a request will be made for a new,
	   * revocable session.
	   * It is not necessary to call this method from cloud code unless you are
	   * handling user signup or login from the server side. In a cloud code call,
	   * this function will not attempt to upgrade the current token.
	   * @method enableRevocableSession
	   * @param {Object} options A Backbone-style options object.
	   * @static
	   * @return {Parse.Promise} A promise that is resolved when the process has
	   *   completed. If a replacement session token is requested, the promise
	   *   will be resolved after a new token has been fetched.
	   */
	  static enableRevocableSession(options) {
	    options = options || {};
	    CoreManager.set('FORCE_REVOCABLE_SESSION', true);
	    if (canUseCurrentUser) {
	      var current = ParseUser.current();
	      if (current) {
	        return current._upgradeToRevocableSession(options);
	      }
	    }
	    return ParsePromise.as()._thenRunCallbacks(options);
	  }

	  /**
	   * Enables the use of become or the current user in a server
	   * environment. These features are disabled by default, since they depend on
	   * global objects that are not memory-safe for most servers.
	   * @method enableUnsafeCurrentUser
	   * @static
	   */
	  static enableUnsafeCurrentUser() {
	    canUseCurrentUser = true;
	  }

	  /**
	   * Disables the use of become or the current user in any environment.
	   * These features are disabled on servers by default, since they depend on
	   * global objects that are not memory-safe for most servers.
	   * @method disableUnsafeCurrentUser
	   * @static
	   */
	  static disableUnsafeCurrentUser() {
	    canUseCurrentUser = false;
	  }

	  static _registerAuthenticationProvider(provider) {
	    authProviders[provider.getAuthType()] = provider;
	    // Synchronize the current user with the auth provider.
	    ParseUser.currentAsync().then(current => {
	      if (current) {
	        current._synchronizeAuthData(provider.getAuthType());
	      }
	    });
	  }

	  static _logInWith(provider, options) {
	    var user = new ParseUser();
	    return user._linkWith(provider, options);
	  }

	  static _clearCache() {
	    currentUserCache = null;
	    currentUserCacheMatchesDisk = false;
	  }

	  static _setCurrentUserCache(user) {
	    currentUserCache = user;
	  }
	}

	ParseObject.registerSubclass('_User', ParseUser);

	var DefaultController = {
	  updateUserOnDisk(user) {
	    var path = Storage.generatePath(CURRENT_USER_KEY);
	    var json = user.toJSON();
	    json.className = '_User';
	    return Storage.setItemAsync(path, JSON.stringify(json)).then(() => {
	      return user;
	    });
	  },

	  removeUserFromDisk() {
	    let path = Storage.generatePath(CURRENT_USER_KEY);
	    currentUserCacheMatchesDisk = true;
	    currentUserCache = null;
	    return Storage.removeItemAsync(path);
	  },

	  setCurrentUser(user) {
	    currentUserCache = user;
	    user._cleanupAuthData();
	    user._synchronizeAllAuthData();
	    return DefaultController.updateUserOnDisk(user);
	  },

	  currentUser() {
	    if (currentUserCache) {
	      return currentUserCache;
	    }
	    if (currentUserCacheMatchesDisk) {
	      return null;
	    }
	    if (Storage.async()) {
	      throw new Error('Cannot call currentUser() when using a platform with an async ' + 'storage system. Call currentUserAsync() instead.');
	    }
	    var path = Storage.generatePath(CURRENT_USER_KEY);
	    var userData = Storage.getItem(path);
	    currentUserCacheMatchesDisk = true;
	    if (!userData) {
	      currentUserCache = null;
	      return null;
	    }
	    userData = JSON.parse(userData);
	    if (!userData.className) {
	      userData.className = '_User';
	    }
	    if (userData._id) {
	      if (userData.objectId !== userData._id) {
	        userData.objectId = userData._id;
	      }
	      delete userData._id;
	    }
	    if (userData._sessionToken) {
	      userData.sessionToken = userData._sessionToken;
	      delete userData._sessionToken;
	    }
	    var current = ParseObject.fromJSON(userData);
	    currentUserCache = current;
	    current._synchronizeAllAuthData();
	    return current;
	  },

	  currentUserAsync() {
	    if (currentUserCache) {
	      return ParsePromise.as(currentUserCache);
	    }
	    if (currentUserCacheMatchesDisk) {
	      return ParsePromise.as(null);
	    }
	    var path = Storage.generatePath(CURRENT_USER_KEY);
	    return Storage.getItemAsync(path).then(userData => {
	      currentUserCacheMatchesDisk = true;
	      if (!userData) {
	        currentUserCache = null;
	        return ParsePromise.as(null);
	      }
	      userData = JSON.parse(userData);
	      if (!userData.className) {
	        userData.className = '_User';
	      }
	      if (userData._id) {
	        if (userData.objectId !== userData._id) {
	          userData.objectId = userData._id;
	        }
	        delete userData._id;
	      }
	      if (userData._sessionToken) {
	        userData.sessionToken = userData._sessionToken;
	        delete userData._sessionToken;
	      }
	      var current = ParseObject.fromJSON(userData);
	      currentUserCache = current;
	      current._synchronizeAllAuthData();
	      return ParsePromise.as(current);
	    });
	  },

	  signUp(user, attrs, options) {
	    var username = attrs && attrs.username || user.get('username');
	    var password = attrs && attrs.password || user.get('password');

	    if (!username || !username.length) {
	      return ParsePromise.error(new ParseError(ParseError.OTHER_CAUSE, 'Cannot sign up user with an empty name.'));
	    }
	    if (!password || !password.length) {
	      return ParsePromise.error(new ParseError(ParseError.OTHER_CAUSE, 'Cannot sign up user with an empty password.'));
	    }

	    return user.save(attrs, options).then(() => {
	      // Clear the password field
	      user._finishFetch({ password: undefined });

	      if (canUseCurrentUser) {
	        return DefaultController.setCurrentUser(user);
	      }
	      return user;
	    });
	  },

	  logIn(user, options) {
	    var RESTController = CoreManager.getRESTController();
	    var stateController = CoreManager.getObjectStateController();
	    var auth = {
	      username: user.get('username'),
	      password: user.get('password')
	    };
	    return RESTController.request('GET', 'login', auth, options).then((response, status) => {
	      user._migrateId(response.objectId);
	      user._setExisted(true);
	      stateController.setPendingOp(user._getStateIdentifier(), 'username', undefined);
	      stateController.setPendingOp(user._getStateIdentifier(), 'password', undefined);
	      response.password = undefined;
	      user._finishFetch(response);
	      if (!canUseCurrentUser) {
	        // We can't set the current user, so just return the one we logged in
	        return ParsePromise.as(user);
	      }
	      return DefaultController.setCurrentUser(user);
	    });
	  },

	  become(options) {
	    var user = new ParseUser();
	    var RESTController = CoreManager.getRESTController();
	    return RESTController.request('GET', 'users/me', {}, options).then((response, status) => {
	      user._finishFetch(response);
	      user._setExisted(true);
	      return DefaultController.setCurrentUser(user);
	    });
	  },

	  logOut() {
	    return DefaultController.currentUserAsync().then(currentUser => {
	      var path = Storage.generatePath(CURRENT_USER_KEY);
	      var promise = Storage.removeItemAsync(path);
	      var RESTController = CoreManager.getRESTController();
	      if (currentUser !== null) {
	        var currentSession = currentUser.getSessionToken();
	        if (currentSession && isRevocableSession(currentSession)) {
	          promise = promise.then(() => {
	            return RESTController.request('POST', 'logout', {}, { sessionToken: currentSession });
	          });
	        }
	        currentUser._logOutWithAll();
	        currentUser._finishFetch({ sessionToken: undefined });
	      }
	      currentUserCacheMatchesDisk = true;
	      currentUserCache = null;

	      return promise;
	    });
	  },

	  requestPasswordReset(email, options) {
	    var RESTController = CoreManager.getRESTController();
	    return RESTController.request('POST', 'requestPasswordReset', { email: email }, options);
	  },

	  upgradeToRevocableSession(user, options) {
	    var token = user.getSessionToken();
	    if (!token) {
	      return ParsePromise.error(new ParseError(ParseError.SESSION_MISSING, 'Cannot upgrade a user with no session token'));
	    }

	    options.sessionToken = token;

	    var RESTController = CoreManager.getRESTController();
	    return RESTController.request('POST', 'upgradeToRevocableSession', {}, options).then(result => {
	      var session = new ParseSession();
	      session._finishFetch(result);
	      user._finishFetch({ sessionToken: session.getSessionToken() });
	      if (user.isCurrent()) {
	        return DefaultController.setCurrentUser(user);
	      }
	      return ParsePromise.as(user);
	    });
	  },

	  linkWith(user, authData) {
	    return user.save({ authData }).then(() => {
	      if (canUseCurrentUser) {
	        return DefaultController.setCurrentUser(user);
	      }
	      return user;
	    });
	  }
	};

	CoreManager.setUserController(DefaultController);

/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	import EventEmitter from './EventEmitter';
	import LiveQueryClient from './LiveQueryClient';
	import CoreManager from './CoreManager';
	import ParsePromise from './ParsePromise';

	function open() {
	  const LiveQueryController = CoreManager.getLiveQueryController();
	  LiveQueryController.open();
	}

	function close() {
	  const LiveQueryController = CoreManager.getLiveQueryController();
	  LiveQueryController.close();
	}

	/**
	 *
	 * We expose three events to help you monitor the status of the WebSocket connection:
	 *
	 * <p>Open - When we establish the WebSocket connection to the LiveQuery server, you'll get this event.
	 * 
	 * <pre>
	 * Parse.LiveQuery.on('open', () => {
	 * 
	 * });</pre></p>
	 *
	 * <p>Close - When we lose the WebSocket connection to the LiveQuery server, you'll get this event.
	 * 
	 * <pre>
	 * Parse.LiveQuery.on('close', () => {
	 * 
	 * });</pre></p>
	 *
	 * <p>Error - When some network error or LiveQuery server error happens, you'll get this event.
	 * 
	 * <pre>
	 * Parse.LiveQuery.on('error', (error) => {
	 * 
	 * });</pre></p>
	 * 
	 * @class Parse.LiveQuery
	 * @static
	 * 
	 */
	let LiveQuery = new EventEmitter();

	/**
	 * After open is called, the LiveQuery will try to send a connect request
	 * to the LiveQuery server.
	 * 
	 * @method open
	 */
	LiveQuery.open = open;

	/**
	 * When you're done using LiveQuery, you can call Parse.LiveQuery.close().
	 * This function will close the WebSocket connection to the LiveQuery server,
	 * cancel the auto reconnect, and unsubscribe all subscriptions based on it.
	 * If you call query.subscribe() after this, we'll create a new WebSocket
	 * connection to the LiveQuery server.
	 * 
	 * @method close
	 */

	LiveQuery.close = close;
	// Register a default onError callback to make sure we do not crash on error
	LiveQuery.on('error', () => {});

	export default LiveQuery;

	function getSessionToken() {
	  const controller = CoreManager.getUserController();
	  return controller.currentUserAsync().then(currentUser => {
	    return currentUser ? currentUser.getSessionToken() : undefined;
	  });
	}

	function getLiveQueryClient() {
	  return CoreManager.getLiveQueryController().getDefaultLiveQueryClient();
	}

	let defaultLiveQueryClient;
	const DefaultLiveQueryController = {
	  setDefaultLiveQueryClient(liveQueryClient) {
	    defaultLiveQueryClient = liveQueryClient;
	  },
	  getDefaultLiveQueryClient() {
	    if (defaultLiveQueryClient) {
	      return ParsePromise.as(defaultLiveQueryClient);
	    }

	    return getSessionToken().then(sessionToken => {
	      let liveQueryServerURL = CoreManager.get('LIVEQUERY_SERVER_URL');

	      if (liveQueryServerURL && liveQueryServerURL.indexOf('ws') !== 0) {
	        throw new Error('You need to set a proper Parse LiveQuery server url before using LiveQueryClient');
	      }

	      // If we can not find Parse.liveQueryServerURL, we try to extract it from Parse.serverURL
	      if (!liveQueryServerURL) {
	        const tempServerURL = CoreManager.get('SERVER_URL');
	        let protocol = 'ws://';
	        // If Parse is being served over SSL/HTTPS, ensure LiveQuery Server uses 'wss://' prefix
	        if (tempServerURL.indexOf('https') === 0) {
	          protocol = 'wss://';
	        }
	        const host = tempServerURL.replace(/^https?:\/\//, '');
	        liveQueryServerURL = protocol + host;
	        CoreManager.set('LIVEQUERY_SERVER_URL', liveQueryServerURL);
	      }

	      const applicationId = CoreManager.get('APPLICATION_ID');
	      const javascriptKey = CoreManager.get('JAVASCRIPT_KEY');
	      const masterKey = CoreManager.get('MASTER_KEY');
	      // Get currentUser sessionToken if possible
	      defaultLiveQueryClient = new LiveQueryClient({
	        applicationId,
	        serverURL: liveQueryServerURL,
	        javascriptKey,
	        masterKey,
	        sessionToken
	      });
	      // Register a default onError callback to make sure we do not crash on error
	      // Cannot create these events on a nested way because of EventEmiiter from React Native
	      defaultLiveQueryClient.on('error', error => {
	        LiveQuery.emit('error', error);
	      });
	      defaultLiveQueryClient.on('open', () => {
	        LiveQuery.emit('open');
	      });
	      defaultLiveQueryClient.on('close', () => {
	        LiveQuery.emit('close');
	      });

	      return defaultLiveQueryClient;
	    });
	  },
	  open() {
	    getLiveQueryClient().then(liveQueryClient => {
	      this.resolve(liveQueryClient.open());
	    });
	  },
	  close() {
	    getLiveQueryClient().then(liveQueryClient => {
	      this.resolve(liveQueryClient.close());
	    });
	  },
	  subscribe(query) {
	    let subscriptionWrap = new EventEmitter();

	    getLiveQueryClient().then(liveQueryClient => {
	      if (liveQueryClient.shouldOpen()) {
	        liveQueryClient.open();
	      }
	      let promiseSessionToken = getSessionToken();
	      // new event emitter
	      return promiseSessionToken.then(sessionToken => {

	        let subscription = liveQueryClient.subscribe(query, sessionToken);
	        // enter, leave create, etc

	        subscriptionWrap.id = subscription.id;
	        subscriptionWrap.query = subscription.query;
	        subscriptionWrap.sessionToken = subscription.sessionToken;
	        subscriptionWrap.unsubscribe = subscription.unsubscribe;
	        // Cannot create these events on a nested way because of EventEmiiter from React Native
	        subscription.on('open', () => {
	          subscriptionWrap.emit('open');
	        });
	        subscription.on('create', object => {
	          subscriptionWrap.emit('create', object);
	        });
	        subscription.on('update', object => {
	          subscriptionWrap.emit('update', object);
	        });
	        subscription.on('enter', object => {
	          subscriptionWrap.emit('enter', object);
	        });
	        subscription.on('leave', object => {
	          subscriptionWrap.emit('leave', object);
	        });
	        subscription.on('delete', object => {
	          subscriptionWrap.emit('delete', object);
	        });

	        this.resolve();
	      });
	    });
	    return subscriptionWrap;
	  },
	  unsubscribe(subscription) {
	    getLiveQueryClient().then(liveQueryClient => {
	      this.resolve(liveQueryClient.unsubscribe(subscription));
	    });
	  },
	  _clearCachedDefaultClient() {
	    defaultLiveQueryClient = null;
	  }
	};

	CoreManager.setLiveQueryController(DefaultLiveQueryController);

/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015-present, Parse, LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	import EventEmitter from './EventEmitter';
	import ParsePromise from './ParsePromise';
	import ParseObject from './ParseObject';
	import LiveQuerySubscription from './LiveQuerySubscription';

	// The LiveQuery client inner state
	const CLIENT_STATE = {
	  INITIALIZED: 'initialized',
	  CONNECTING: 'connecting',
	  CONNECTED: 'connected',
	  CLOSED: 'closed',
	  RECONNECTING: 'reconnecting',
	  DISCONNECTED: 'disconnected'
	};

	// The event type the LiveQuery client should sent to server
	const OP_TYPES = {
	  CONNECT: 'connect',
	  SUBSCRIBE: 'subscribe',
	  UNSUBSCRIBE: 'unsubscribe',
	  ERROR: 'error'
	};

	// The event we get back from LiveQuery server
	const OP_EVENTS = {
	  CONNECTED: 'connected',
	  SUBSCRIBED: 'subscribed',
	  UNSUBSCRIBED: 'unsubscribed',
	  ERROR: 'error',
	  CREATE: 'create',
	  UPDATE: 'update',
	  ENTER: 'enter',
	  LEAVE: 'leave',
	  DELETE: 'delete'
	};

	// The event the LiveQuery client should emit
	const CLIENT_EMMITER_TYPES = {
	  CLOSE: 'close',
	  ERROR: 'error',
	  OPEN: 'open'
	};

	// The event the LiveQuery subscription should emit
	const SUBSCRIPTION_EMMITER_TYPES = {
	  OPEN: 'open',
	  CLOSE: 'close',
	  ERROR: 'error',
	  CREATE: 'create',
	  UPDATE: 'update',
	  ENTER: 'enter',
	  LEAVE: 'leave',
	  DELETE: 'delete'
	};

	let generateInterval = k => {
	  return Math.random() * Math.min(30, Math.pow(2, k) - 1) * 1000;
	};

	/**
	 * Creates a new LiveQueryClient.
	 * Extends events.EventEmitter
	 * <a href="https://nodejs.org/api/events.html#events_class_eventemitter">cloud functions</a>.
	 * 
	 * A wrapper of a standard WebSocket client. We add several useful methods to 
	 * help you connect/disconnect to LiveQueryServer, subscribe/unsubscribe a ParseQuery easily.
	 *
	 * javascriptKey and masterKey are used for verifying the LiveQueryClient when it tries
	 * to connect to the LiveQuery server
	 * 
	 * @class Parse.LiveQueryClient
	 * @constructor
	 * @param {Object} options
	 * @param {string} options.applicationId - applicationId of your Parse app
	 * @param {string} options.serverURL - <b>the URL of your LiveQuery server</b>
	 * @param {string} options.javascriptKey (optional)
	 * @param {string} options.masterKey (optional) Your Parse Master Key. (Node.js only!)
	 * @param {string} options.sessionToken (optional)
	 *
	 *
	 * We expose three events to help you monitor the status of the LiveQueryClient.
	 *
	 * <pre>
	 * let Parse = require('parse/node');
	 * let LiveQueryClient = Parse.LiveQueryClient;
	 * let client = new LiveQueryClient({
	 *   applicationId: '',
	 *   serverURL: '',
	 *   javascriptKey: '',
	 *   masterKey: ''
	 *  });
	 * </pre>
	 * 
	 * Open - When we establish the WebSocket connection to the LiveQuery server, you'll get this event.
	 * <pre>
	 * client.on('open', () => {
	 * 
	 * });</pre>
	 *
	 * Close - When we lose the WebSocket connection to the LiveQuery server, you'll get this event.
	 * <pre>
	 * client.on('close', () => {
	 * 
	 * });</pre>
	 *
	 * Error - When some network error or LiveQuery server error happens, you'll get this event.
	 * <pre>
	 * client.on('error', (error) => {
	 * 
	 * });</pre>
	 * 
	 * 
	 */
	export default class LiveQueryClient extends EventEmitter {

	  constructor({
	    applicationId,
	    serverURL,
	    javascriptKey,
	    masterKey,
	    sessionToken
	  }) {
	    super();

	    if (!serverURL || serverURL.indexOf('ws') !== 0) {
	      throw new Error('You need to set a proper Parse LiveQuery server url before using LiveQueryClient');
	    }

	    this.reconnectHandle = null;
	    this.attempts = 1;;
	    this.id = 0;
	    this.requestId = 1;
	    this.serverURL = serverURL;
	    this.applicationId = applicationId;
	    this.javascriptKey = javascriptKey;
	    this.masterKey = masterKey;
	    this.sessionToken = sessionToken;
	    this.connectPromise = new ParsePromise();
	    this.subscriptions = new Map();
	    this.state = CLIENT_STATE.INITIALIZED;
	  }

	  shouldOpen() {
	    return this.state === CLIENT_STATE.INITIALIZED || this.state === CLIENT_STATE.DISCONNECTED;
	  }

	  /**
	   * Subscribes to a ParseQuery
	   * 
	   * If you provide the sessionToken, when the LiveQuery server gets ParseObject's 
	   * updates from parse server, it'll try to check whether the sessionToken fulfills 
	   * the ParseObject's ACL. The LiveQuery server will only send updates to clients whose 
	   * sessionToken is fit for the ParseObject's ACL. You can check the LiveQuery protocol
	   * <a href="https://github.com/ParsePlatform/parse-server/wiki/Parse-LiveQuery-Protocol-Specification">here</a> for more details. The subscription you get is the same subscription you get 
	   * from our Standard API.
	   * 
	   * @method subscribe
	   * @param {Object} query - the ParseQuery you want to subscribe to
	   * @param {string} sessionToken (optional) 
	   * @return {Object} subscription
	   */
	  subscribe(query, sessionToken) {
	    if (!query) {
	      return;
	    }
	    let where = query.toJSON().where;
	    let className = query.className;
	    let subscribeRequest = {
	      op: OP_TYPES.SUBSCRIBE,
	      requestId: this.requestId,
	      query: {
	        className,
	        where
	      }
	    };

	    if (sessionToken) {
	      subscribeRequest.sessionToken = sessionToken;
	    }

	    let subscription = new LiveQuerySubscription(this.requestId, query, sessionToken);
	    this.subscriptions.set(this.requestId, subscription);
	    this.requestId += 1;
	    this.connectPromise.then(() => {
	      this.socket.send(JSON.stringify(subscribeRequest));
	    });

	    // adding listener so process does not crash
	    // best practice is for developer to register their own listener
	    subscription.on('error', () => {});

	    return subscription;
	  }

	  /**
	   * After calling unsubscribe you'll stop receiving events from the subscription object.
	   * 
	   * @method unsubscribe
	   * @param {Object} subscription - subscription you would like to unsubscribe from.
	   */
	  unsubscribe(subscription) {
	    if (!subscription) {
	      return;
	    }

	    this.subscriptions.delete(subscription.id);
	    let unsubscribeRequest = {
	      op: OP_TYPES.UNSUBSCRIBE,
	      requestId: subscription.id
	    };
	    this.connectPromise.then(() => {
	      this.socket.send(JSON.stringify(unsubscribeRequest));
	    });
	  }

	  /**
	   * After open is called, the LiveQueryClient will try to send a connect request
	   * to the LiveQuery server.
	   * 
	   * @method open
	   */
	  open() {
	    let WebSocketImplementation = this._getWebSocketImplementation();
	    if (!WebSocketImplementation) {
	      this.emit(CLIENT_EMMITER_TYPES.ERROR, 'Can not find WebSocket implementation');
	      return;
	    }

	    if (this.state !== CLIENT_STATE.RECONNECTING) {
	      this.state = CLIENT_STATE.CONNECTING;
	    }

	    // Get WebSocket implementation
	    this.socket = new WebSocketImplementation(this.serverURL);

	    // Bind WebSocket callbacks
	    this.socket.onopen = () => {
	      this._handleWebSocketOpen();
	    };

	    this.socket.onmessage = event => {
	      this._handleWebSocketMessage(event);
	    };

	    this.socket.onclose = () => {
	      this._handleWebSocketClose();
	    };

	    this.socket.onerror = error => {
	      this._handleWebSocketError(error);
	    };
	  }

	  resubscribe() {
	    this.subscriptions.forEach((subscription, requestId) => {
	      let query = subscription.query;
	      let where = query.toJSON().where;
	      let className = query.className;
	      let sessionToken = subscription.sessionToken;
	      let subscribeRequest = {
	        op: OP_TYPES.SUBSCRIBE,
	        requestId,
	        query: {
	          className,
	          where
	        }
	      };

	      if (sessionToken) {
	        subscribeRequest.sessionToken = sessionToken;
	      }

	      this.connectPromise.then(() => {
	        this.socket.send(JSON.stringify(subscribeRequest));
	      });
	    });
	  }

	  /**
	   * This method will close the WebSocket connection to this LiveQueryClient, 
	   * cancel the auto reconnect and unsubscribe all subscriptions based on it.
	   * 
	   * @method close
	   */
	  close() {
	    if (this.state === CLIENT_STATE.INITIALIZED || this.state === CLIENT_STATE.DISCONNECTED) {
	      return;
	    }
	    this.state = CLIENT_STATE.DISCONNECTED;
	    this.socket.close();
	    // Notify each subscription about the close
	    for (let subscription of this.subscriptions.values()) {
	      subscription.emit(SUBSCRIPTION_EMMITER_TYPES.CLOSE);
	    }
	    this._handleReset();
	    this.emit(CLIENT_EMMITER_TYPES.CLOSE);
	  }

	  _getWebSocketImplementation() {
	    return WebSocket;
	  }

	  // ensure we start with valid state if connect is called again after close
	  _handleReset() {
	    this.attempts = 1;;
	    this.id = 0;
	    this.requestId = 1;
	    this.connectPromise = new ParsePromise();
	    this.subscriptions = new Map();
	  }

	  _handleWebSocketOpen() {
	    this.attempts = 1;
	    let connectRequest = {
	      op: OP_TYPES.CONNECT,
	      applicationId: this.applicationId,
	      javascriptKey: this.javascriptKey,
	      masterKey: this.masterKey,
	      sessionToken: this.sessionToken
	    };
	    this.socket.send(JSON.stringify(connectRequest));
	  }

	  _handleWebSocketMessage(event) {
	    let data = event.data;
	    if (typeof data === 'string') {
	      data = JSON.parse(data);
	    }
	    let subscription = null;
	    if (data.requestId) {
	      subscription = this.subscriptions.get(data.requestId);
	    }
	    switch (data.op) {
	      case OP_EVENTS.CONNECTED:
	        if (this.state === CLIENT_STATE.RECONNECTING) {
	          this.resubscribe();
	        }
	        this.emit(CLIENT_EMMITER_TYPES.OPEN);
	        this.id = data.clientId;
	        this.connectPromise.resolve();
	        this.state = CLIENT_STATE.CONNECTED;
	        break;
	      case OP_EVENTS.SUBSCRIBED:
	        if (subscription) {
	          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.OPEN);
	        }
	        break;
	      case OP_EVENTS.ERROR:
	        if (data.requestId) {
	          if (subscription) {
	            subscription.emit(SUBSCRIPTION_EMMITER_TYPES.ERROR, data.error);
	          }
	        } else {
	          this.emit(CLIENT_EMMITER_TYPES.ERROR, data.error);
	        }
	        break;
	      case OP_EVENTS.UNSUBSCRIBED:
	        // We have already deleted subscription in unsubscribe(), do nothing here
	        break;
	      default:
	        // create, update, enter, leave, delete cases
	        let className = data.object.className;
	        // Delete the extrea __type and className fields during transfer to full JSON
	        delete data.object.__type;
	        delete data.object.className;
	        let parseObject = new ParseObject(className);
	        parseObject._finishFetch(data.object);
	        if (!subscription) {
	          break;
	        }
	        subscription.emit(data.op, parseObject);
	    }
	  }

	  _handleWebSocketClose() {
	    if (this.state === CLIENT_STATE.DISCONNECTED) {
	      return;
	    }
	    this.state = CLIENT_STATE.CLOSED;
	    this.emit(CLIENT_EMMITER_TYPES.CLOSE);
	    // Notify each subscription about the close
	    for (let subscription of this.subscriptions.values()) {
	      subscription.emit(SUBSCRIPTION_EMMITER_TYPES.CLOSE);
	    }
	    this._handleReconnect();
	  }

	  _handleWebSocketError(error) {
	    this.emit(CLIENT_EMMITER_TYPES.ERROR, error);
	    for (let subscription of this.subscriptions.values()) {
	      subscription.emit(SUBSCRIPTION_EMMITER_TYPES.ERROR);
	    }
	    this._handleReconnect();
	  }

	  _handleReconnect() {
	    // if closed or currently reconnecting we stop attempting to reconnect
	    if (this.state === CLIENT_STATE.DISCONNECTED) {
	      return;
	    }

	    this.state = CLIENT_STATE.RECONNECTING;
	    let time = generateInterval(this.attempts);

	    // handle case when both close/error occur at frequent rates we ensure we do not reconnect unnecessarily.
	    // we're unable to distinguish different between close/error when we're unable to reconnect therefore
	    // we try to reonnect in both cases
	    // server side ws and browser WebSocket behave differently in when close/error get triggered

	    if (this.reconnectHandle) {
	      clearTimeout(this.reconnectHandle);
	    }

	    this.reconnectHandle = setTimeout((() => {
	      this.attempts++;
	      this.connectPromise = new ParsePromise();
	      this.open();
	    }).bind(this), time);
	  }
	}

/***/ }
/******/ ])));