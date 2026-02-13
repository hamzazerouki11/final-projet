(function () {
  "use strict";

  function safeParse(value, fallback) {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function safeStringify(value) {
    try {
      return JSON.stringify(value);
    } catch (error) {
      return null;
    }
  }

  var storage = {
    get: function (key, fallback) {
      return safeParse(window.localStorage.getItem(key), fallback);
    },
    set: function (key, value) {
      var serialized = safeStringify(value);
      if (serialized !== null) {
        window.localStorage.setItem(key, serialized);
      }
    },
    remove: function (key) {
      window.localStorage.removeItem(key);
    }
  };

  window.GymStorage = storage;
})();
