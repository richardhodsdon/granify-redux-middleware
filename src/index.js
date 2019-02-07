const granifyMiddleware = store => next => action => {
  const result = next(action);
  const currentState = store.getState();

  if (!window.Granify || !window.Granify._functionsAvailable) {
    // possibly have a queue until Granify is ready
    return result;
  }

  // We do not have the correct version of Granify Enabled on the site
  if (typeof window.Granify.trackReduxAction !== 'function') {
    /* eslint-disable */
    console.warn(
      'Please ensure the latest version of Granify is running. Contact support for more information'
    );

    return result;
  }
  /* eslint-enable */

  // Send to external Granify Method
  window.Granify.trackReduxAction(action, currentState);

  return result;
};

export default granifyMiddleware;
