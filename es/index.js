// Flag to track so we only show the warning once and don't spam the console.
var warningShown = false;
var granifyMiddleware = function granifyMiddleware(store) {
  return function (next) {
    return function (action) {
      var result = next(action);
      var currentState = store.getState();

      if (!window.Granify || !window.Granify._functionsAvailable) {
        // possibly have a queue until Granify is ready
        return result;
      }

      // We do not have the correct version of Granify Enabled on the site
      if (typeof window.Granify.trackRedux !== 'function') {
        if (!warningShown) {
          warningShown = true;

          /* eslint-disable */
          console.warn('Please ensure the latest version of Granify is running. Contact support for more information');
          /* eslint-enable */
        }

        return result;
      }

      // Send to external Granify Method
      window.Granify.trackRedux(action, currentState);

      return result;
    };
  };
};

export default granifyMiddleware;